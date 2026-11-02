import type { Encoded } from "../../model/duration";

export function supportsRelaxedSimd(): boolean;
export function wasmFileName(): "hanezu_rt.wasm" | "hanezu_rt.relaxed.wasm";
export interface RuntimeTTS {
  acoustic(encoded: Encoded, durations: number[]): number;
  vocode(): Float32Array<ArrayBuffer>;
  synthesize(encoded: Encoded, durations: number[]): Float32Array<ArrayBuffer>;
  buffer(which: number): Float32Array<ArrayBuffer>;
  free(): void;
}
export interface RuntimeKanalizer {
  read(word: string): string;
  free(): void;
}
export interface RuntimeTsqyomi {
  readonly classes: number;
  run(
    ids: number[],
    masks: boolean[][],
  ): {
    logits: Float32Array<ArrayBuffer>;
    hidden: Float32Array<ArrayBuffer>;
  };
  free(): void;
}
export class HanezuRT {
  static create(
    bytes: Uint8Array<ArrayBuffer> | WebAssembly.Module,
  ): Promise<HanezuRT>;
  loadTTS(weights: Uint8Array<ArrayBuffer>, config: string): RuntimeTTS;
  loadKanalizer(weights: Uint8Array<ArrayBuffer>): RuntimeKanalizer;
  loadTsqyomi(model: Uint8Array<ArrayBuffer>): RuntimeTsqyomi;
}
