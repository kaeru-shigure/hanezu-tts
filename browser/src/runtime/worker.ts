import { Pipeline, cacheReader } from "./pipeline";
import type { Request, Reply } from "./protocol";

let pipeline: Promise<Pipeline> | undefined;
const emit = (reply: Reply) =>
  globalThis.postMessage(
    reply,
    reply.type === "audio" ? { transfer: [reply.samples.buffer] } : {},
  );
globalThis.onmessage = async ({ data }: MessageEvent<Request>) => {
  if (data.type !== "synthesize") return;
  try {
    emit({ type: "status", message: "辞書とモデルを準備しています" });
    pipeline ??= Pipeline.load(cacheReader(data.assets));
    await (await pipeline).synthesize(data.text, data.speed, emit);
  } catch (error) {
    console.error(error instanceof Error ? error.stack : error);
    pipeline = undefined;
    emit({
      type: "error",
      message: error instanceof Error ? error.message : String(error),
    });
  }
};
