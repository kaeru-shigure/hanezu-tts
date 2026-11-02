import { Pipeline, cacheReader } from "./pipeline";
import type { Request, Reply } from "./protocol";

let pipeline: Promise<Pipeline> | undefined;
const emit = (reply: Reply) =>
  globalThis.postMessage(
    reply,
    reply.type === "audio" ? { transfer: [reply.samples.buffer] } : {},
  );
async function synthesize(data: Request) {
  try {
    emit({ type: "status", message: "辞書とモデルを準備しています" });
    pipeline ??= Pipeline.load(cacheReader(data.assets)).catch((error) => {
      pipeline = undefined;
      throw error;
    });
    await (await pipeline).synthesize(data.text, data.speed, emit);
  } catch (error) {
    console.error(error instanceof Error ? error.stack : error);
    emit({
      type: "error",
      message: error instanceof Error ? error.message : String(error),
    });
  }
}
// Frontend rule state and the WASM model buffers belong to one request at a time.
let pending = Promise.resolve();
globalThis.onmessage = ({ data }: MessageEvent<Request>) => {
  if (data.type === "synthesize")
    pending = pending.then(() => synthesize(data));
};
