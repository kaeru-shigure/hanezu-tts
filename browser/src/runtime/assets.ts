/** Download locations and sizes for the browser's dictionaries and models. */
import { wasmFileName } from "./vendor/hanezu_rt.mjs";
export interface Asset {
  id: string;
  file: string;
  part: number;
  label: string;
  group: string;
  url: string;
  bytes: number;
}
export interface Manifest {
  version: string;
  assets: Asset[];
}
export const CACHE_NAME = "hanezu-assets-v1";
const DOWNLOAD_PROGRESS_INTERVAL_MS = 1000 / 25;
const MODEL_REVISION = "419fe1f98ee69e3af5db4bf74f4a65c1fefb65fa";
const MODEL_BYTES = { "config.json": 4485, "weight.safetensors": 6964120 };
type ModelFile = keyof typeof MODEL_BYTES;
export type ReadFile = ((name: string) => Promise<Uint8Array<ArrayBuffer>>) & {
  sourceURL?: (name: string) => string | undefined;
  redownload?: (name: ModelFile) => Promise<Uint8Array<ArrayBuffer>>;
};
const modelURL = (name: ModelFile) =>
  `https://huggingface.co/kaeru-shigure/hanezu-tts/resolve/${MODEL_REVISION}/${name}`;

export async function readModelFile(read: ReadFile, name: ModelFile) {
  const bytes = await read(name);
  const sourceURL = read.sourceURL?.(name);
  const source = sourceURL ? new URL(sourceURL) : undefined;
  const matches =
    source?.origin === "https://huggingface.co"
      ? source.pathname === new URL(modelURL(name)).pathname
      : bytes.byteLength === MODEL_BYTES[name];
  if (matches) return bytes;
  if (read.redownload) return read.redownload(name);
  const response = await fetch(modelURL(name), { cache: "no-store" });
  if (!response.ok) throw new Error(`${name}: HTTP ${response.status}`);
  const downloaded = new Uint8Array(await response.arrayBuffer());
  if (downloaded.byteLength !== MODEL_BYTES[name])
    throw new Error(`${name}: ファイルサイズが一致しません。`);
  return downloaded;
}
export async function loadManifest(): Promise<Manifest> {
  const response = await fetch(
    new URL("assets/manifest.json", document.baseURI),
    { cache: "no-store" },
  );
  if (!response.ok)
    throw new Error(
      "読み上げ用データの一覧を取得できませんでした。ページを再読み込みしてください。",
    );
  const manifest = (await response.json()) as Manifest;
  if (
    !manifest.version ||
    !Array.isArray(manifest.assets) ||
    !manifest.assets.length
  )
    throw new Error("配信データの一覧が不正です。");
  // Keep only the prebuilt WASM supported by this engine in the download/cache UI.
  const runtimeFile = `runtime/${wasmFileName()}`;
  manifest.assets = manifest.assets.filter(
    (asset) =>
      !asset.file.startsWith("runtime/hanezu_rt") || asset.file === runtimeFile,
  );
  if (process.env.NODE_ENV === "development") {
    await Promise.all(
      manifest.assets
        .filter(
          (asset) =>
            asset.file === "config.json" || asset.file === "weight.safetensors",
        )
        .map(async (asset) => {
          asset.url = `models/${asset.file}?v=${manifest.version}`;
          const response = await fetch(new URL(asset.url, document.baseURI), {
            method: "HEAD",
            cache: "no-store",
          });
          const bytes = Number(response.headers.get("content-length"));
          if (!response.ok || !Number.isSafeInteger(bytes) || bytes <= 0)
            throw new Error(
              `${asset.label}: ローカルモデルのサイズを取得できません。`,
            );
          asset.bytes = bytes;
        }),
    );
  }
  return manifest;
}
export const assetURL = (asset: Asset) =>
  new URL(asset.url, globalThis.location.href).href;
export function formatBytes(bytes: number): string {
  return bytes < 1024 * 1024
    ? `${(bytes / 1024).toFixed(0)} KB`
    : bytes < 1024 ** 3
      ? `${(bytes / 1024 ** 2).toFixed(1)} MB`
      : `${(bytes / 1024 ** 3).toFixed(2)} GB`;
}
export async function inventory(
  assets: Asset[],
): Promise<Record<string, number>> {
  const cache = await caches.open(CACHE_NAME);
  const entries = await Promise.all(
    assets.map(async (asset) => {
      const response = await cache.match(assetURL(asset));
      if (
        !response ||
        response.headers.get("x-hanezu-complete") !== "1" ||
        Number(response.headers.get("x-hanezu-size")) !== asset.bytes
      )
        return [asset.id, 0] as const;
      return [asset.id, Number(response.headers.get("x-hanezu-size"))] as const;
    }),
  );
  return Object.fromEntries(entries);
}
export async function cachedBytes(
  asset: Asset,
): Promise<Uint8Array<ArrayBuffer>> {
  const response = await (await caches.open(CACHE_NAME)).match(assetURL(asset));
  if (!response || response.headers.get("x-hanezu-complete") !== "1")
    throw new Error(`${asset.label} をダウンロードしてください。`);
  return new Uint8Array(await response.arrayBuffer());
}
export async function downloadAsset(
  asset: Asset,
  signal: AbortSignal,
  progress: (bytes: number) => void,
): Promise<void> {
  const response = await fetch(assetURL(asset), { signal, cache: "no-store" });
  if (!response.ok || !response.body)
    throw new Error(`${asset.label}: HTTP ${response.status}`);
  const reader = response.body.getReader();
  const parts: Uint8Array<ArrayBuffer>[] = [];
  let size = 0;
  let lastProgressAt = -Infinity;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      parts.push(value);
      size += value.byteLength;
      const now = performance.now();
      if (now - lastProgressAt >= DOWNLOAD_PROGRESS_INTERVAL_MS) {
        lastProgressAt = now;
        progress(size);
      }
    }
  } finally {
    reader.releaseLock();
  }
  signal.throwIfAborted();
  if (asset.bytes && size !== asset.bytes)
    throw new Error(`${asset.label}: ファイルサイズが一致しません。`);
  progress(size);
  const blob = new Blob(parts);
  await (
    await caches.open(CACHE_NAME)
  ).put(
    assetURL(asset),
    new Response(blob, {
      headers: {
        "x-hanezu-complete": "1",
        "x-hanezu-size": String(size),
        "content-type":
          response.headers.get("content-type") ?? "application/octet-stream",
      },
    }),
  );
}
export async function deleteAsset(asset: Asset): Promise<void> {
  await (await caches.open(CACHE_NAME)).delete(assetURL(asset));
}

export function cacheReader(assets: Asset[]): ReadFile {
  const read: ReadFile = async (name) => {
    const parts = assets
      .filter((asset) => asset.file === name)
      .sort((a, b) => a.part - b.part);
    if (!parts.length || parts.some((part, i) => part.part !== i))
      throw new Error(`配信データが不足しています: ${name}`);
    if (parts.length === 1) return cachedBytes(parts[0]);
    const joined = new Uint8Array(
      parts.reduce((sum, part) => sum + part.bytes, 0),
    );
    let offset = 0;
    for (const part of parts) {
      const bytes = await cachedBytes(part);
      joined.set(bytes, offset);
      offset += bytes.length;
    }
    return joined;
  };
  read.sourceURL = (name) => {
    const parts = assets.filter((asset) => asset.file === name);
    return parts.length === 1 ? assetURL(parts[0]) : undefined;
  };
  read.redownload = async (name) => {
    const asset = assets.find((asset) => asset.file === name);
    if (!asset) throw new Error(`配信データが不足しています: ${name}`);
    const pinned = { ...asset, url: modelURL(name), bytes: MODEL_BYTES[name] };
    await downloadAsset(pinned, new AbortController().signal, () => {});
    Object.assign(asset, pinned);
    return cachedBytes(pinned);
  };
  return read;
}
