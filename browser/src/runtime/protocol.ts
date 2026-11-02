import type { Asset } from "./assets";
export interface Chunk {
  text: string;
  start: number;
  end: number;
}
export type Request = {
  type: "synthesize";
  text: string;
  speed: number;
  assets: Asset[];
};
export type Reply =
  | { type: "chunks"; chunks: Chunk[] }
  | { type: "progress"; index: number; state: "active" | "done" }
  | { type: "audio"; samples: Float32Array<ArrayBuffer>; sampleRate: number }
  | { type: "error"; message: string }
  | { type: "status"; message: string };
