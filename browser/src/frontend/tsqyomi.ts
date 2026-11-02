import { Tokenizer } from "@huggingface/tokenizers";
import type { RuntimeTsqyomi } from "../runtime/vendor/hanezu_rt.mjs";
import { ruleValue } from "./core";

type Span = [number, number];
interface Target {
  char_span: Span;
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
interface Context {
  text: string;
  targets: Span[];
  sourceSpans: Span[];
  cursor: number;
  output?: {
    logits: Map<string, Float32Array>;
    hidden: Float32Array;
    spans: Span[];
  };
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
/** Reading selection and word pooling share the encoder output for one chunk. */
export class Tsqyomi {
  readonly tokenizer: Tokenizer;
  readonly metadata: any;
  private context?: Context;
  constructor(
    readonly model: RuntimeTsqyomi,
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
    this.context = undefined;
  }
  prepare(text: string, targets: Span[], sourceSpans: Span[]) {
    if ([...text].length !== sourceSpans.length)
      throw new Error("TSqyomi: character alignment mismatch");
    this.context = { text, targets, sourceSpans, cursor: 0 };
  }
  /** Keep code-point spans even for unknown characters expanded to UTF-8 byte tokens. */
  private pieces(text: string, offset = 0) {
    const ids: number[] = [],
      spans: Span[] = [];
    let cursor = offset;
    for (const token of this.tokenizer.tokenize(text, {
      add_special_tokens: false,
    })) {
      const id = this.tokenizer.token_to_id(token);
      if (id !== undefined) {
        const end = cursor + [...token].length;
        ids.push(id);
        spans.push([cursor, end]);
        cursor = end;
      } else {
        // tokenizers.js 0.2 omits Unigram byte_fallback for out-of-vocabulary characters.
        for (const char of token) {
          for (const byte of new TextEncoder().encode(char)) {
            const byteId = this.tokenizer.token_to_id(
              `<0x${byte.toString(16).toUpperCase().padStart(2, "0")}>`,
            );
            if (byteId === undefined)
              throw new Error("Missing tokenizer byte token");
            ids.push(byteId);
            spans.push([cursor, cursor + 1]);
          }
          cursor++;
        }
      }
    }
    if (cursor !== offset + [...text].length)
      throw new Error("TSqyomi: tokenizer character alignment mismatch");
    return { ids, spans };
  }
  tokens(text: string, special = false) {
    const ids = this.pieces(text).ids;
    return special
      ? [this.config.leading_token_id, ...ids, this.config.trailing_token_id]
      : ids;
  }
  private shared(context: Context) {
    if (context.output) return context.output;
    const chars = [...context.text],
      content: number[] = [],
      tokenSpans: Span[] = [];
    const boundaries = [
      ...new Set([0, chars.length, ...context.targets.flat()]),
    ].sort((a, b) => a - b);
    for (let i = 0; i < boundaries.length - 1; i++) {
      const piece = this.pieces(
        chars.slice(boundaries[i], boundaries[i + 1]).join(""),
        boundaries[i],
      );
      content.push(...piece.ids);
      tokenSpans.push(...piece.spans);
    }
    const positions = context.targets.map(([start, end]) =>
      tokenSpans.flatMap(([a, b], i) => (a < end && b > start ? [i] : [])),
    );
    if (positions.some((p) => !p.length))
      throw new Error("TSqyomi: tokenizer lost target span");
    const hidden = new Float32Array(content.length * 384),
      logits = new Map<string, Float32Array>();
    const capacity = this.config.model_max_length - 2;
    if (capacity < 1) throw new Error("TSqyomi: invalid context window");
    // A normal chunk takes one encoder call. Unusually long byte-token inputs use
    // disjoint windows, each shared by reading selection and semantic pooling.
    for (let start = 0; start < content.length; ) {
      let end = Math.min(content.length, start + capacity);
      for (const p of positions) if (p[0] < end && p.at(-1)! >= end) end = p[0];
      if (end <= start)
        throw new Error("TSqyomi: target exceeds context window");
      const ids = [
        this.config.leading_token_id,
        ...content.slice(start, end),
        this.config.trailing_token_id,
      ];
      const indices = positions.flatMap((p, i) =>
        p[0] >= start && p.at(-1)! < end ? [i] : [],
      );
      const masks = indices.map((i) => {
        const set = new Set(positions[i].map((p) => p - start + 1));
        return ids.map((_, j) => set.has(j));
      });
      const out = this.model.run(
        ids,
        masks.length ? masks : [ids.map(() => true)],
      );
      hidden.set(
        Float32Array.from(
          out.hidden.subarray(384, (ids.length - 1) * 384),
          half,
        ),
        start * 384,
      );
      indices.forEach((i, row) =>
        logits.set(
          context.targets[i].join(","),
          out.logits.slice(
            row * this.model.classes,
            (row + 1) * this.model.classes,
          ),
        ),
      );
      start = end;
    }
    const spans = tokenSpans.map(
      ([start, end]): Span => [
        context.sourceSpans[start][0],
        context.sourceSpans[end - 1][1],
      ],
    );
    return (context.output = { logits, hidden, spans });
  }
  predict = async (
    text: string,
    targets: Target[],
  ): Promise<{ pronunciation: string; scores: number[] }[]> => {
    if (!targets.length) return [];
    const context = this.context;
    if (!context) throw new Error("TSqyomi: context has not been prepared");
    // Reading rules process sentence segments in source order. Use code points,
    // including supplementary characters, for both global and segment offsets.
    const chars = [...context.text],
      segment = [...text];
    let offset = context.cursor;
    while (
      offset <= chars.length - segment.length &&
      chars.slice(offset, offset + segment.length).join("") !== text
    )
      offset++;
    if (offset > chars.length - segment.length)
      throw new Error("TSqyomi: reading segment alignment failed");
    context.cursor = offset + segment.length;
    const out = this.shared(context);
    return targets.map((target) => {
      const logits = out.logits.get(
        target.char_span.map((p) => p + offset).join(","),
      );
      if (!logits) throw new Error("TSqyomi: missing prepared reading target");
      const indices =
        this.config.class_index_by_surface_and_pronunciation[target.surface];
      const scores = target.pronunciations.map((pron) => {
        const canonical = pron
          .replace(/ヲ/g, "オ")
          .replace(/ヅ/g, "ズ")
          .replace(/ヂ/g, "ジ");
        const index = indices[canonical];
        if (index === undefined)
          throw new Error(`Unknown reading class: ${target.surface}/${pron}`);
        return logits[index];
      });
      return {
        pronunciation:
          target.pronunciations[scores.indexOf(Math.max(...scores))],
        scores,
      };
    });
  };
  async wordContext(
    words: { surface: string; char_span: Span }[],
  ): Promise<number[][]> {
    const context = this.context;
    let hidden: Float32Array, spans: number[][];
    if (context?.output) {
      const out = context.output;
      hidden = out.hidden;
      spans = words.map(({ char_span: [start, end] }) =>
        start < end
          ? out.spans.flatMap(([a, b], i) => (a < end && b > start ? [i] : []))
          : [],
      );
    } else {
      // Without ambiguous readings, preserve the model's per-word tokenization.
      const ids: number[] = [];
      spans = words.map((word) => {
        const pieces = this.tokens(word.surface);
        const span = pieces.map((_, i) => ids.length + i + 1);
        ids.push(...pieces);
        return span;
      });
      const tokens = [
        this.config.leading_token_id,
        ...ids,
        this.config.trailing_token_id,
      ];
      if (tokens.length > this.config.model_max_length) {
        if (!context) throw new Error("TSqyomi: context has not been prepared");
        this.shared(context);
        return this.wordContext(words);
      }
      hidden = Float32Array.from(
        this.model.run(tokens, [tokens.map(() => true)]).hidden,
        half,
      );
    }
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
