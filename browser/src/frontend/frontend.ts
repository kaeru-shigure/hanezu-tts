import * as kaomoji from "./rules/_kaomoji.js";
import * as utils from "./rules/utils.js";
import { modify_context_reading } from "./rules/_context_reading.js";
import { restore_loanword_kana } from "./rules/_loanword.js";
import { make_phoneme_mapping } from "./rules/_mapping.js";
import { select_mecab_features_with_tsqyomi } from "./rules/reading_rules.js";
import { set_model } from "./rules/model_bridge.js";
import { __kwargtrans__ as kw } from "./rules/org.transcrypt.__runtime__.js";
import { JTalk, type RecordValue } from "./core";
import { Tsqyomi } from "./tsqyomi";
import type { Encoded } from "../model/duration";
export function canonicalBoundaries(text: string) {
  let result = "",
    cursor = 0;
  const questions = new Set<number>();
  for (const match of text.matchAll(
    /[!?！？。]+(?:[」』"'）)\]】]*[!?！？。]+)*[」』"'）)\]】]*/g,
  )) {
    result += text.slice(cursor, match.index);
    if (/[?？]/.test(match[0])) questions.add([...result].length);
    result += "。";
    cursor = match.index! + match[0].length;
  }
  return { text: result + text.slice(cursor), questions };
}
function emitted(words: RecordValue[]) {
  const output: [string, number][] = [];
  words.forEach((w, i) => {
    const phones = w.phonemes.length
      ? w.phonemes
      : w.pron === "、"
        ? ["pau"]
        : [];
    for (const p of phones) {
      if (p === "sp" || (p === "pau" && output.at(-1)?.[0] === "pau")) continue;
      output.push([p, i + 1]);
    }
  });
  while (output[0]?.[0] === "pau") output.shift();
  while (output.at(-1)?.[0] === "pau") output.pop();
  return output;
}
export class Frontend {
  constructor(
    readonly jtalk: JTalk,
    readonly tsqyomi: Tsqyomi,
    readonly phones: string[],
    readonly recoverUnknown: (
      njd: RecordValue[],
      text: string,
    ) => RecordValue[],
  ) {}
  async encode(input: string): Promise<Encoded> {
    if (!input || [...input].length > 256)
      throw new Error("Frontend input must have 1–256 characters");
    const { text, questions } = canonicalBoundaries(input);
    this.tsqyomi.clear();
    set_model(this.tsqyomi);
    const normalized = utils.normalize_roman_numerals(
      utils.normalize_unknown_itaiji(text, kw({ inference_jtalk: this.jtalk })),
      kw({ inference_jtalk: this.jtalk }),
    );
    let [features, morphs] = await select_mecab_features_with_tsqyomi(
      normalized,
      kw({ include_morphs: true, jtalk: this.jtalk }),
    );
    if (kaomoji.find_kaomoji_parts(text).length)
      features = kaomoji.exclude_kaomoji_from_numeral_processing(
        text,
        normalized,
        features,
        morphs,
        "None",
        kw({ jtalk: this.jtalk }),
      );
    let njd = this.jtalk.run_njd_from_mecab(features, {
      restore_unknown_katakana: true,
      modify_numeral_reading: true,
    });
    [njd, morphs] = kaomoji.silence_kaomoji(
      text,
      normalized,
      njd,
      morphs,
      "None",
      kw({ jtalk: this.jtalk }),
    );
    utils.fill_missing_feature_flags(njd);
    utils.fill_missing_morph_flags(morphs);
    const before = njd.map((f: RecordValue) => [f.read, f.pron]);
    for (const f of njd)
      if (f.pos === "フィラー" && f.acc > f.mora_size) f.acc = 0;
    njd = utils.suppress_unnatural_auxiliary_u_long_vowel(njd);
    njd = modify_context_reading(njd);
    njd = utils.modify_old_province_yomi(njd);
    njd = restore_loanword_kana(njd);
    njd = this.recoverUnknown(njd, normalized);
    const rewritten: number[] = [];
    njd.forEach((f: RecordValue, i: number) => {
      if (f.read !== before[i][0]) f.is_reading_rewritten = true;
      if (f.read !== before[i][0] || f.pron !== before[i][1]) rewritten.push(i);
    });
    if (rewritten.length) {
      for (const i of rewritten) {
        njd[i].pron = njd[i].pron.replace(/’/g, "");
        if (i > 0) njd[i - 1].pron = njd[i - 1].pron.replace(/’$/, "");
      }
      const revoiced = this.jtalk.core.unvoiced(njd);
      for (const i of rewritten)
        for (const j of [i - 1, i]) if (j >= 0) njd[j].pron = revoiced[j].pron;
    }
    njd = utils.retreat_acc_nuc(njd);
    njd = utils.modify_acc_after_chaining(njd);
    const beforeOdori = new Map(njd.map((f: RecordValue) => [f, f.read]));
    njd = utils.process_odori_features(njd, kw({ jtalk: this.jtalk }));
    for (const f of njd)
      if (beforeOdori.get(f) !== f.read) f.is_reading_rewritten = true;
    const labels = this.jtalk.core.labels(
        njd.filter((f: RecordValue) => f.pron !== ""),
      ),
      words = make_phoneme_mapping(
        njd,
        morphs,
        kw({ caller_text: text, inference_jtalk: this.jtalk }),
      ),
      phoneNames = labels.map((l) => {
        const match = /-([^+]+)\+/.exec(l);
        if (!match) throw new Error("Invalid OpenJTalk label");
        return match[1];
      });
    if (!labels.length) throw new Error("読み上げられる文字がありません。");
    const pairs = emitted(words),
      aligned =
        JSON.stringify(["sil", ...pairs.map((p) => p[0]), "sil"]) ===
        JSON.stringify(phoneNames),
      wordIds = phoneNames.map(() => 0);
    let wordFeatures: number[][] = [Array(384).fill(0)];
    if (aligned) {
      pairs.forEach((p, i) => (wordIds[i + 1] = p[1]));
      wordFeatures = (await this.tsqyomi.wordContext(words)).slice(
        0,
        Math.max(...wordIds) + 1,
      );
    }
    const boundaries: [number, number][] = pairs.flatMap(([p, w], i) =>
      p === "pau" && words[w - 1].surface.includes("。")
        ? [[i + 1, words[w - 1].char_span[0]] as [number, number]]
        : [],
    );
    if (boundaries.length && !aligned)
      throw new Error("Sentence boundary alignment failed");
    let end = Math.max(
      -1,
      ...words
        .filter((w: RecordValue) => w.surface.includes("。"))
        .map((w: RecordValue) => w.char_span[0]),
    );
    if (words.length && pairs.length)
      end =
        words
          .slice(pairs.at(-1)![1])
          .find((w: RecordValue) => w.surface.includes("。"))?.char_span[0] ??
        -1;
    boundaries.push([phoneNames.length - 1, end]);
    const phoneIds = phoneNames.map((p) => {
      const id = this.phones.indexOf(p);
      if (id <= 0) throw new Error(`Unknown phone ${p}`);
      return id;
    });
    for (const [i, position] of boundaries) {
      if (!["sil", "pau"].includes(phoneNames[i]))
        throw new Error("Boundary must replace pause");
      phoneIds[i] = this.phones.indexOf(questions.has(position) ? "?" : "sil");
      wordIds[i] = 0;
    }
    const context = labels.map((label, i) => {
      const a = /\/A:(-?\d+)\+(\d+)\+(\d+)/.exec(label),
        f = /\/F:(\d+)_(\d+)/.exec(label),
        p = phoneNames[i];
      return [
        Math.max(-20, Math.min(Number(a?.[1] ?? 0), 20)) / 20,
        Math.min(Number(a?.[2] ?? 0), 30) / 30,
        Math.min(Number(a?.[3] ?? 0), 30) / 30,
        Math.min(Number(f?.[1] ?? 0), 30) / 30,
        Math.min(Number(f?.[2] ?? 0), 30) / 30,
        Number(["A", "I", "U", "E", "O"].includes(p)),
        Number(
          [
            "a",
            "i",
            "u",
            "e",
            "o",
            "A",
            "I",
            "U",
            "E",
            "O",
            "N",
            "cl",
          ].includes(p),
        ),
        Number(["sil", "pau", "?"].includes(p)),
      ].map(Math.fround);
    });
    this.tsqyomi.clear();
    return {
      phoneIds,
      features: context,
      wordIds,
      wordFeatures,
      words: words.map((w: RecordValue) => ({
        pos: w.pos,
        pos_group1: w.pos_group1,
        is_unknown: w.is_unknown,
      })),
    };
  }
}
