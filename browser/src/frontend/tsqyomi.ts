import { Tokenizer } from "@huggingface/tokenizers";
import { ort, intTensor } from "../onnx/session";
import { halfToFloat } from "../onnx/external";
import { ruleValue } from "./core";
import { TSQYOMI_HIDDEN as HIDDEN } from "../onnx/tsqyomi";
interface Target {
  char_span: [number, number];
  surface: string;
  pronunciations: string[];
}
interface Metadata {
  model_max_length: number;
  leading_token_id: number;
  trailing_token_id: number;
  class_index_by_surface_and_pronunciation: Record<
    string,
    Record<string, number>
  >;
  preserve_dictionary_default_pronunciations: [string, string][];
}
const f32 = new Float32Array(1),
  u32 = new Uint32Array(f32.buffer);
/** Round to IEEE binary16, then widen. Both storage boundaries use ties-to-even. */
export function half(value: number) {
  f32[0] = value;
  const bits = u32[0],
    sign = bits >>> 31,
    exponent = (bits >>> 23) & 255,
    mantissa = bits & 0x7fffff;
  if (exponent === 255) return value;
  let e = exponent - 127;
  if (e > 15) return sign ? -Infinity : Infinity;
  if (e < -25) return sign ? -0 : 0;
  const step = 2 ** Math.max(e - 10, -24),
    scaled = Math.abs(value) / step,
    floor = Math.floor(scaled),
    fraction = scaled - floor;
  return (
    (sign ? -1 : 1) *
    (fraction > 0.5 || (fraction === 0.5 && floor % 2) ? floor + 1 : floor) *
    step
  );
}
export class Tsqyomi {
  readonly tokenizer: Tokenizer;
  readonly metadata: any;
  private hidden = new Map<string, Float32Array>();
  constructor(
    readonly model: ort.InferenceSession,
    tokenizer: Object,
    readonly config: Metadata,
  ) {
    this.tokenizer = new Tokenizer(tokenizer, {});
    const surfaces: Record<string, string[]> = {};
    for (const surface of Object.keys(
      config.class_index_by_surface_and_pronunciation,
    ))
      (surfaces[[...surface][0]] ??= []).push(surface);
    for (const list of Object.values(surfaces))
      list.sort((a, b) => [...b].length - [...a].length || (a < b ? -1 : 1));
    this.metadata = ruleValue({
      ...config,
      surfaces_by_first_character: surfaces,
      model_scored_surfaces: Object.keys(
        config.class_index_by_surface_and_pronunciation,
      ),
    });
  }
  clear() {
    this.hidden.clear();
  }
  tokens(text: string, special = false) {
    // tokenizers.js 0.2 does not apply Unigram byte_fallback. Preserve the fixed
    // model's UTF-8 byte tokens for characters absent from its vocabulary.
    return this.tokenizer
      .tokenize(text, { add_special_tokens: special })
      .flatMap((token) => {
        const id = this.tokenizer.token_to_id(token);
        if (id !== undefined) return [id];
        return [...new TextEncoder().encode(token)].map((byte) => {
          const id = this.tokenizer.token_to_id(
            `<0x${byte.toString(16).toUpperCase().padStart(2, "0")}>`,
          );
          if (id === undefined) throw new Error("Missing tokenizer byte token");
          return id;
        });
      });
  }
  private async run(ids: number[], masks: boolean[][]) {
    const length = ids.length;
    const out = await this.model.run({
      input_ids: intTensor(ids, [1, length]),
      attention_mask: intTensor(
        ids.map(() => 1),
        [1, length],
      ),
      target_mask: new ort.Tensor(
        "bool",
        Uint8Array.from(masks.flat(), Number),
        [1, masks.length, length],
      ),
    });
    try {
      const logits = Float32Array.from(
        out.reading_class_logits.data as Float32Array,
      );
      const value = out[HIDDEN];
      const hidden =
        value.type === "float16"
          ? Float32Array.from(
              new Uint16Array(
                (value.data as Uint16Array).buffer,
                (value.data as Uint16Array).byteOffset,
                (value.data as Uint16Array).length,
              ),
              halfToFloat,
            )
          : Float32Array.from(value.data as Float32Array, half);
      this.hidden.set(ids.join(","), hidden);
      return { logits, hidden };
    } finally {
      Object.values(out).forEach((t) => t.dispose());
    }
  }
  predict = async (
    text: string,
    targets: Target[],
  ): Promise<{ pronunciation: string; scores: number[] }[]> => {
    if (!targets.length) return [];
    const ordered = [...targets].sort(
        (a, b) => a.char_span[0] - b.char_span[0],
      ),
      chars = [...text],
      boundaries = [
        ...new Set([0, chars.length, ...ordered.flatMap((t) => t.char_span)]),
      ].sort((a, b) => a - b),
      content: number[] = [],
      spans: [number, number][] = [];
    for (let i = 0; i < boundaries.length - 1; i++) {
      const start = boundaries[i],
        end = boundaries[i + 1],
        ids = this.tokens(chars.slice(start, end).join(""));
      content.push(...ids);
      spans.push(...ids.map(() => [start, end] as [number, number]));
    }
    const positions = ordered.map((t) =>
      spans.flatMap(([start, end], i) =>
        start < t.char_span[1] && end > t.char_span[0] ? [i] : [],
      ),
    );
    if (positions.some((p) => !p.length))
      throw new Error("TSqyomi: tokenizer lost target span");
    const requiredStart = Math.min(...positions.map((p) => p[0])),
      requiredEnd = Math.max(...positions.map((p) => p.at(-1)!)) + 1,
      capacity = this.config.model_max_length - 2;
    if (requiredEnd - requiredStart > capacity) {
      if (targets.length === 1)
        throw new Error("TSqyomi: target exceeds context window");
      const mid = Math.floor(targets.length / 2);
      return [
        ...(await this.predict(text, targets.slice(0, mid))),
        ...(await this.predict(text, targets.slice(mid))),
      ];
    }
    let start = Math.max(
      0,
      requiredStart -
        Math.floor((capacity - (requiredEnd - requiredStart)) / 2),
    );
    start = Math.min(start, Math.max(0, content.length - capacity));
    const end = Math.min(content.length, start + capacity),
      ids = [
        this.config.leading_token_id,
        ...content.slice(start, end),
        this.config.trailing_token_id,
      ],
      masks = positions.map((p) => {
        const set = new Set(p.map((i) => i - start + 1));
        return ids.map((_, i) => set.has(i));
      });
    const { logits } = await this.run(ids, masks),
      classes = logits.length / ordered.length,
      results = new Map<string, { pronunciation: string; scores: number[] }>();
    ordered.forEach((target, i) => {
      const indices =
          this.config.class_index_by_surface_and_pronunciation[target.surface],
        scores = target.pronunciations.map((pron) => {
          const canonical = pron
              .replace(/ヲ/g, "オ")
              .replace(/ヅ/g, "ズ")
              .replace(/ヂ/g, "ジ"),
            index = indices[canonical];
          if (index === undefined)
            throw new Error(`Unknown reading class: ${target.surface}/${pron}`);
          return logits[i * classes + index];
        });
      results.set(target.char_span.join(","), {
        pronunciation:
          target.pronunciations[scores.indexOf(Math.max(...scores))],
        scores,
      });
    });
    return targets.map((t) => results.get(t.char_span.join(","))!);
  };
  async wordContext(words: any[]) {
    const ids: number[] = [],
      spans: number[][] = [];
    for (const word of words) {
      const pieces = this.tokens(word.surface);
      spans.push(pieces.map((_, i) => ids.length + i + 1));
      ids.push(...pieces);
    }
    const boundary = this.tokens("", true),
      tokens = [boundary[0], ...ids, boundary[1]];
    if (tokens.length > 512)
      throw new Error("意味特徴の入力が512トークンを超えました。");
    const hidden =
      this.hidden.get(tokens.join(",")) ??
      (await this.run(tokens, [tokens.map(() => true)])).hidden;
    return [
      Array(384).fill(0),
      ...spans.map((span) =>
        Array.from({ length: 384 }, (_, c) => {
          let value = 0;
          for (const i of span)
            value = Math.fround(value + hidden[i * 384 + c]);
          return span.length ? half(Math.fround(value / span.length)) : 0;
        }),
      ),
    ];
  }
}
