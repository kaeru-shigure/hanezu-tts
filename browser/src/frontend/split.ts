import type { Chunk } from "../runtime/protocol";
interface Mapped {
  char: string;
  start: number;
  end: number;
}
export interface EnglishReader {
  dictionary?: { [key: string]: string };
  accepts(word: string): boolean;
  read(word: string): string | Promise<string>;
}
// Python's Unicode whitespace also contains NEXT LINE and information separators.
const whitespace = /[\s\u0085\u001c-\u001f]/u;
const horizontal = /[^\S\n]|[\u0085\u001c-\u001f]/u;
const delimiter = /[、。！？!?\n「」『』()]/;
const englishPattern = /[A-Z]+(?=[A-Z][a-z]|[^A-Za-z]|$)|[A-Z]?[a-z]+/g;
export async function splitInput(
  input: string,
  english: EnglishReader,
  limit = 256,
): Promise<Chunk[]> {
  if (!Number.isInteger(limit) || limit < 1)
    throw new Error("Invalid chunk limit");
  let chars: Mapped[] = [];
  for (const segment of new Intl.Segmenter("ja", {
    granularity: "grapheme",
  }).segment(input)) {
    const normalized = [...segment.segment.normalize("NFKC")],
      end = segment.index + segment.segment.length;
    // Keep source offsets in UTF-16 for textarea slicing; count model text in Unicode code points.
    normalized.forEach((char, i) =>
      chars.push({
        char,
        start:
          segment.index +
          Math.floor((i * segment.segment.length) / normalized.length),
        end:
          segment.index +
          Math.floor(((i + 1) * segment.segment.length) / normalized.length),
      }),
    );
  }
  const collapsed: Mapped[] = [];
  for (const item of chars) {
    if (horizontal.test(item.char)) {
      if (collapsed.at(-1)?.char === " ")
        collapsed[collapsed.length - 1].end = item.end;
      else collapsed.push({ ...item, char: " " });
    } else collapsed.push(item);
  }
  while (collapsed.length && whitespace.test(collapsed[0].char))
    collapsed.shift();
  while (collapsed.length && whitespace.test(collapsed.at(-1)!.char))
    collapsed.pop();
  chars = [];
  for (let i = 0; i < collapsed.length; ) {
    if (!/[A-Za-z]/.test(collapsed[i].char)) {
      chars.push(collapsed[i++]);
      continue;
    }
    let j = i;
    while (j < collapsed.length && /[A-Za-z]/.test(collapsed[j].char)) j++;
    const run = collapsed
      .slice(i, j)
      .map((v) => v.char)
      .join("");
    for (const match of run.matchAll(englishPattern)) {
      const word = match[0],
        source = collapsed.slice(
          i + match.index,
          i + match.index + word.length,
        );
      let reading: string | undefined;
      if (word.toUpperCase() !== word) {
        const key = word.toLowerCase();
        if (english.dictionary && Object.hasOwn(english.dictionary, key))
          reading = english.dictionary[key];
        else if (english.accepts(word)) reading = await english.read(word);
      }
      if (reading !== undefined) {
        const letters = [...reading];
        letters.forEach((char, k) => {
          const a = Math.floor((k * source.length) / letters.length),
            b = Math.floor(((k + 1) * source.length) / letters.length);
          chars.push({
            char,
            start: source[a]?.start ?? source.at(-1)!.end,
            end: b > 0 ? source[b - 1].end : source[0].start,
          });
        });
      } else chars.push(...source);
    }
    i = j;
  }
  const result: Chunk[] = [];
  let cursor = 0;
  const append = (part: Mapped[]) => {
    const flat: Mapped[] = [];
    for (const x of part) {
      if (whitespace.test(x.char)) {
        if (flat.at(-1)?.char === " ") flat[flat.length - 1].end = x.end;
        else flat.push({ ...x, char: " " });
      } else flat.push(x);
    }
    while (flat[0]?.char === " ") flat.shift();
    while (flat.at(-1)?.char === " ") flat.pop();
    while (flat.length) {
      let cut = Math.min(limit, flat.length);
      if (flat.length > limit) {
        let comma = -1;
        for (let i = 0; i < limit; i++)
          if ("、,，".includes(flat[i].char)) comma = i;
        if (comma > 0) cut = comma + 1;
      }
      const chunk = flat.splice(0, cut);
      while (chunk[0]?.char === " ") chunk.shift();
      while (chunk.at(-1)?.char === " ") chunk.pop();
      if (chunk.length)
        result.push({
          text: chunk.map((x) => x.char).join(""),
          start: chunk[0].start,
          end: chunk.at(-1)!.end,
        });
    }
  };
  while (cursor < chars.length) {
    let end = cursor;
    while (end < chars.length && !delimiter.test(chars[end].char)) end++;
    const content = chars.slice(cursor, end);
    while (end < chars.length && delimiter.test(chars[end].char)) end++;
    if (content.some((c) => !whitespace.test(c.char)))
      append(chars.slice(cursor, end));
    cursor = end;
  }
  return result;
}
export interface NGramData {
  weights: number[];
  threshold: number;
  valid_chars: string[];
  models: Record<string, Record<string, Record<string, number>>>;
}
export class NGram {
  readonly valid: Set<string>;
  constructor(readonly data: NGramData) {
    this.valid = new Set([...data.valid_chars, " "]);
  }
  accepts = (word: string) => {
    const clean = [...word.toLowerCase()]
      .filter((c) => this.valid.has(c))
      .join("");
    const scores = Object.entries(this.data.models).map(([width, freq]) => {
      const n = Number(width),
        value = `^${clean}$`.padStart(n, "^");
      let score = 0,
        count = 0;
      for (let i = 0; i <= value.length - n; i++) {
        const gram = value.slice(i, i + n),
          prob = freq[gram.slice(0, -1)]?.[gram.at(-1)!];
        if (prob === undefined) return -Infinity;
        score += Math.log(prob + 1e-10);
        count++;
      }
      return count ? score / count : -Infinity;
    });
    const total = this.data.weights.length
      ? scores.reduce((sum, score, i) => sum + score * this.data.weights[i], 0)
      : scores.reduce((a, b) => a + b, 0) / scores.length;
    return total > this.data.threshold;
  };
}
