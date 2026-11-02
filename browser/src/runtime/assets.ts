/** Every download is pinned; the cache key includes its exact content identity. */
export interface Asset {
  id: string;
  file: string;
  part: number;
  label: string;
  group: string;
  url: string;
  bytes: number;
  sha256: string;
}
export interface Manifest {
  version: string;
  assets: Asset[];
}
export const CACHE_NAME = "hanezu-assets-v1";
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
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      parts.push(value);
      size += value.byteLength;
      progress(size);
    }
  } finally {
    reader.releaseLock();
  }
  signal.throwIfAborted();
  if (asset.bytes && size !== asset.bytes)
    throw new Error(`${asset.label}: ファイルサイズが一致しません。`);
  const blob = new Blob(parts);
  if (asset.sha256) {
    const hash = Array.from(
      new Uint8Array(
        await crypto.subtle.digest("SHA-256", await blob.arrayBuffer()),
      ),
      (x) => x.toString(16).padStart(2, "0"),
    ).join("");
    if (hash !== asset.sha256)
      throw new Error(`${asset.label}: ファイルの検証に失敗しました。`);
  }
  signal.throwIfAborted();
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

export function cacheReader(
  assets: Asset[],
): (name: string) => Promise<Uint8Array<ArrayBuffer>> {
  return async (name) => {
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
}
