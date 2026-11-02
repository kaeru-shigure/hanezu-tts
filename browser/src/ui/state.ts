import { signal, computed } from "@preact/signals";
import {
  deleteAsset,
  downloadAsset,
  inventory,
  loadManifest,
  CACHE_NAME,
  type Manifest,
  type Asset,
} from "../runtime/assets";
import type { Chunk, Reply, Request } from "../runtime/protocol";
import { encodeWav } from "../runtime/wav";
export const tab = signal<"voice" | "storage" | "model-card">("storage");
export const input = signal(
  "Anthropic社が開発したClaudeは、2023年3月14日に一般公開された。3日は雨で夜は曇りとなり、夕方にかけて雷を伴う所があるでしょう。VRChatでは、UnityベースのSDKを用いた独自コンテンツを実装できる。春の風に桜の花びらが舞っています。",
);
export const speed = signal(1);
export const manifest = signal<Manifest | null>(null);
export const stored = signal<Record<string, number>>({});
export const error = signal("");
export const status = signal("キャッシュを確認しています");
export const downloading = signal(false);
export const download = signal({ id: "", bytes: 0 });
export const busy = signal(false);
export const chunks = signal<Chunk[]>([]);
export const chunkStates = signal<Record<number, "active" | "done">>({});
export const clips = signal<
  {
    id: number;
    text: string;
    url: string;
    seconds: number;
    speed: number;
    date: string;
  }[]
>([]);
export const ready = computed(
  () =>
    !!manifest.value &&
    manifest.value.assets.every((a) => stored.value[a.id] > 0),
);
export const usedBytes = computed(() =>
  Object.values(stored.value).reduce((a, b) => a + b, 0),
);
export const totalBytes = computed(
  () => manifest.value?.assets.reduce((sum, a) => sum + a.bytes, 0) ?? 0,
);
let worker: Worker | undefined;
let controller: AbortController | undefined;
let nextClip = 1;
function fail(reason: unknown) {
  error.value = reason instanceof Error ? reason.message : String(reason);
}
export async function refresh() {
  if (manifest.value) stored.value = await inventory(manifest.value.assets);
}
export async function initialize() {
  try {
    if (!globalThis.isSecureContext || !globalThis.caches)
      throw new Error("HTTPS または localhost で開いてください。");
    manifest.value = await loadManifest();
    await refresh();
    tab.value = usedBytes.value ? "voice" : "storage";
    status.value = "";
  } catch (reason) {
    fail(reason);
    status.value = "";
  }
}
export async function downloadAll() {
  if (!manifest.value || downloading.value || busy.value) return;
  error.value = "";
  downloading.value = true;
  controller = new AbortController();
  try {
    await refresh();
    for (const asset of manifest.value.assets) {
      if (stored.value[asset.id]) continue;
      download.value = { id: asset.id, bytes: 0 };
      await downloadAsset(
        asset,
        controller.signal,
        (bytes) => (download.value = { id: asset.id, bytes }),
      );
      await refresh();
    }
  } catch (reason) {
    if (!controller.signal.aborted) fail(reason);
  } finally {
    downloading.value = false;
    download.value = { id: "", bytes: 0 };
    controller = undefined;
    await refresh();
  }
}
export function cancelDownload() {
  controller?.abort();
}
export async function removeAsset(asset: Asset) {
  if (busy.value || downloading.value) return;
  try {
    worker?.terminate();
    worker = undefined;
    await deleteAsset(asset);
    await refresh();
  } catch (reason) {
    fail(reason);
  }
}
export async function removeFile(file: string) {
  for (const asset of manifest.value?.assets.filter((a) => a.file === file) ??
    [])
    await removeAsset(asset);
}
export async function removeAllAssets() {
  if (!manifest.value || busy.value || downloading.value) return;
  try {
    worker?.terminate();
    worker = undefined;
    await caches.delete(CACHE_NAME);
    await refresh();
  } catch (reason) {
    fail(reason);
  }
}
export function removeClip(id: number) {
  const clip = clips.value.find((c) => c.id === id);
  if (clip) URL.revokeObjectURL(clip.url);
  clips.value = clips.value.filter((c) => c.id !== id);
}
export function cancelSynthesis() {
  worker?.terminate();
  worker = undefined;
  busy.value = false;
  status.value = "合成を中止しました。";
  chunkStates.value = Object.fromEntries(
    Object.entries(chunkStates.value).filter(([, s]) => s === "done"),
  );
}
export async function synthesize() {
  if (busy.value || downloading.value || !manifest.value || !input.value.trim())
    return;
  error.value = "";
  await refresh();
  if (!ready.value) {
    tab.value = "storage";
    return;
  }
  busy.value = true;
  chunks.value = [];
  chunkStates.value = {};
  status.value = "モデルを準備しています";
  const text = input.value,
    rate = speed.value;
  worker ??= new Worker(new URL("../runtime/worker.ts", import.meta.url), {
    type: "module",
  });
  worker.onerror = (event) => {
    fail(
      event.message ||
        "合成プログラムを読み込めませんでした。ネットワーク接続を確認してください。",
    );
    cancelSynthesis();
  };
  worker.onmessage = ({ data }: MessageEvent<Reply>) => {
    if (data.type === "status") status.value = data.message;
    if (data.type === "chunks") chunks.value = data.chunks;
    if (data.type === "progress") {
      chunkStates.value = { ...chunkStates.value, [data.index]: data.state };
      status.value = `${data.index + 1} / ${chunks.value.length} 区間を合成${data.state === "done" ? "しました" : "しています"}`;
    }
    if (data.type === "error") {
      error.value = data.message;
      cancelSynthesis();
    }
    if (data.type === "audio") {
      try {
        clips.value = [
          {
            id: nextClip++,
            text,
            url: URL.createObjectURL(encodeWav(data.samples, data.sampleRate)),
            seconds: data.samples.length / data.sampleRate,
            speed: rate,
            date: new Date().toLocaleTimeString("ja-JP", {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
          ...clips.value,
        ];
        status.value = "音声ができました";
      } catch (reason) {
        fail(reason);
      }
      busy.value = false;
    }
  };
  worker.postMessage({
    type: "synthesize",
    text,
    speed: rate,
    assets: manifest.value.assets,
  } satisfies Request);
}
