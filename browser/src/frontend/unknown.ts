import type { RecordValue } from "./core";
import { split_kana_mora } from "./rules/utils.js";

/** Sudachi readings only for surfaces that leave unreadable OpenJTalk kanji. */
export class UnknownReadings {
  readonly maximumLength: number;
  readonly entries: ReadonlyMap<string, readonly string[]>;
  constructor(dictionary: Record<string, string[]>) {
    this.entries = new Map(Object.entries(dictionary));
    this.maximumLength = Math.max(
      0,
      ...Object.keys(dictionary).map((surface) => [...surface].length),
    );
  }
}

const vowels = Object.fromEntries(
  [
    ["アカサタナハマヤラワガザダバパャァ", "a"],
    ["イキシチニヒミリヰギジヂビピィ", "i"],
    ["ウクスツヌフムユルグズヅブプヴュゥ", "u"],
    ["エケセテネヘメレヱゲゼデベペェ", "e"],
    ["オコソトノホモヨロヲゴゾドボポョォ", "o"],
  ].flatMap(([kana, vowel]) => [...kana].map((char) => [char, vowel])),
);
function isKanji(char: string) {
  const code = char.codePointAt(0)!;
  return (
    (code >= 0x3400 && code <= 0x4dbf) ||
    (code >= 0x4e00 && code <= 0x9fff) ||
    (code >= 0xf900 && code <= 0xfaff) ||
    (code >= 0x20000 && code <= 0x3ffff)
  );
}
function pronunciation(reading: string) {
  let previous: string | undefined;
  return (split_kana_mora(reading) as string[])
    .map((mora) => {
      if (["oウ", "oオ", "uウ", "eイ"].includes(previous + mora)) return "ー";
      if (mora !== "ー") previous = vowels[mora.at(-1)!];
      return mora;
    })
    .join("");
}

/** Recover unreadable kanji from a local reading lookup, then Unihan. */
export function recoverUnknown(
  njd: RecordValue[],
  dictionary: UnknownReadings,
  unihan: Record<string, string>,
) {
  const indices = njd.flatMap((feature, i) =>
    feature.pos === "記号" &&
    feature.pos_group1 === "読点" &&
    [...feature.string].some(isKanji)
      ? [i]
      : [],
  );
  if (!indices.length) return njd;
  function contextualReading(index: number) {
    const unknown = njd[index].string;
    const maximum = dictionary.maximumLength;
    let longest = 0;
    const matches = new Set<string>();
    for (let start = index; start >= 0; start--) {
      const before = njd.slice(start, index),
        prefix = before.map((f) => f.read).join("");
      let surface = before.map((f) => f.string).join("");
      if ([...(surface + unknown)].length > maximum) break;
      for (let end = index + 1; end <= njd.length; end++) {
        surface += njd[end - 1].string;
        const length = [...surface].length;
        if (length > maximum) break;
        if (length < longest) continue;
        const candidates = dictionary.entries.get(surface);
        if (!candidates) continue;
        const suffix = njd
          .slice(index + 1, end)
          .map((f) => f.read)
          .join("");
        for (const reading of candidates) {
          if (!reading.startsWith(prefix) || !reading.endsWith(suffix))
            continue;
          const extracted = reading.slice(
            prefix.length,
            reading.length - suffix.length,
          );
          if (!extracted) continue;
          if (length > longest) {
            longest = length;
            matches.clear();
          }
          matches.add(extracted);
        }
      }
    }
    return matches.size === 1 ? [...matches][0] : undefined;
  }
  for (const index of indices) {
    const feature = njd[index];
    let reading = contextualReading(index);
    if (reading === undefined) {
      const parts = [...feature.string].map(
        (char) => unihan[char] ?? (isKanji(char) ? undefined : char),
      );
      if (!parts.length || parts.some((part) => part === undefined)) continue;
      reading = parts.join("");
    }
    const pron = pronunciation(reading);
    Object.assign(feature, {
      read: reading,
      pron,
      pos: "名詞",
      pos_group1: "一般",
      pos_group2: "*",
      pos_group3: "*",
      mora_size: split_kana_mora(pron).length,
      acc: 0,
      chain_flag: -1,
    });
  }
  return njd;
}
