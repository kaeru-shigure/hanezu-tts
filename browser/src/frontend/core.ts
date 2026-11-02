import {
  dict,
  __kwargtrans__ as kw,
} from "./rules/org.transcrypt.__runtime__.js";
import { KNOWN_SYMBOL_FEATURES } from "./rules/_known_symbols.js";
import * as rules from "./rules/native_rules.js";
export type RecordValue = Record<string, any>;
export interface Core {
  FS: {
    mkdir(path: string): void;
    writeFile(path: string, bytes: Uint8Array): void;
  };
  initialize(path: string): void;
  normalize(text: string): string;
  analyze(text: string): {
    normalized_text: string;
    nodes: RecordValue[];
    best: number[];
    connections: RecordValue[];
  };
  pronunciation(features: string[]): RecordValue[];
  digit(features: RecordValue[]): RecordValue[];
  accent(features: RecordValue[]): RecordValue[];
  labels(features: RecordValue[]): string[];
  unvoiced(features: RecordValue[]): RecordValue[];
  phones(features: RecordValue[]): {
    phones: string[][];
    moras: number[];
    absorbed: Record<string, [number, number]>;
  };
}
/** Convert only the compiler ABI boundary. Application/model code uses plain TS. */
export function ruleValue(value: any): any {
  if (Array.isArray(value)) return value.map(ruleValue);
  if (value && typeof value === "object")
    return dict(
      Object.fromEntries(
        Object.entries(value).map(([k, v]) => [k, ruleValue(v)]),
      ),
    );
  return value;
}
const nonPause = new Set([
  ..."「」『』（）()【】［］[]〈〉《》〔〕｛｝{}\"'”“’‘",
]);
export class JTalk {
  readonly userdic_reading_protection: boolean[] = [];
  constructor(readonly core: Core) {}
  normalize_for_mecab = (text: string) =>
    this.core.normalize(text.replace(/\0/g, ""));
  private graph(text: string) {
    return this.core.analyze(text.replace(/\0/g, ""));
  }
  private morph(
    node: RecordValue,
    nodes: RecordValue[],
    edges: RecordValue[],
  ): RecordValue {
    const previous = nodes[node.prev],
      link =
        edges.find(
          (e) =>
            e.left_node_id === node.prev && e.right_node_id === node.node_id,
        )?.cost ?? node.node_cost - (previous?.node_cost ?? 0);
    return {
      ...node,
      features: [node.surface, ...node.feature.split(",")],
      link_cost: link,
    };
  }
  private splitSymbols(morph: RecordValue) {
    const surface = [...morph.surface];
    if (
      !morph.is_unknown ||
      surface.length <= 1 ||
      surface.some((c) => /[\p{L}\p{N}]/u.test(c))
    )
      return [morph];
    return surface.map((c, i) => {
      const symbol = KNOWN_SYMBOL_FEATURES[c],
        feature = symbol?.[3] ?? morph.features.slice(1).join(",");
      return {
        ...morph,
        surface: c,
        features: [c, ...feature.split(",")],
        char_span: [morph.char_span[0] + i, morph.char_span[0] + i + 1],
        left_id: symbol?.[0] ?? morph.left_id,
        right_id: symbol?.[1] ?? morph.right_id,
        word_cost: symbol?.[2] ?? morph.word_cost,
        link_cost: i === 0 ? morph.link_cost : 0,
        is_unknown: !symbol,
        is_ignored: feature.includes("記号,空白"),
        dictionary_index: symbol ? 0 : morph.dictionary_index,
      };
    });
  }
  run_mecab_detailed = (text: string) => {
    const graph = this.graph(text),
      morphs = graph.best.flatMap((i) =>
        this.splitSymbols(
          this.morph(graph.nodes[i], graph.nodes, graph.connections),
        ),
      ),
      features = graph.best.map((i) =>
        [graph.nodes[i].surface, graph.nodes[i].feature].join(","),
      );
    return ruleValue([
      rules._mark_numeral_space_boundaries(
        features.flatMap((f) => rules._expand_symbol_feature(f)),
      ),
      morphs,
    ]);
  };
  run_mecab = (text: string) => this.run_mecab_detailed(text)[0];
  analyze_mecab_candidates = (text: string, spans: number[][]) => {
    const graph = this.graph(text),
      nodes: RecordValue[] = [],
      paths: RecordValue[] = [],
      features: string[] = [],
      morphs: RecordValue[] = [],
      featureIndices: (number | null)[] = [];
    const previousByStart = new Map<number, number>(),
      nextByEnd = new Map<number, number>();
    for (const i of graph.best) {
      const node = graph.nodes[i];
      previousByStart.set(node.char_span[0], node.prev);
      nextByEnd.set(node.char_span[1], node.next);
      const morph = this.morph(node, graph.nodes, graph.connections);
      for (const part of this.splitSymbols(morph)) {
        morphs.push(part);
        featureIndices.push(
          !morph.is_ignored && !part.is_ignored ? features.length : null,
        );
      }
      if (!morph.is_ignored) features.push(morph.features.join(","));
    }
    for (const node of graph.nodes) {
      if (
        node.stat >= 2 ||
        !spans.some(
          (s) => s[0] === node.char_span[0] && s[1] === node.char_span[1],
        )
      )
        continue;
      const columns = [node.surface, ...node.feature.split(",")];
      if (columns.length <= 9) continue;
      const left = previousByStart.get(node.char_span[0]),
        right = nextByEnd.get(node.char_span[1]);
      const lc = graph.connections.find(
          (e) => e.left_node_id === left && e.right_node_id === node.node_id,
        ),
        rc = graph.connections.find(
          (e) => e.left_node_id === node.node_id && e.right_node_id === right,
        );
      if (!lc || !rc || right === undefined) continue;
      const feature = columns.join(","),
        pronunciation = columns[9];
      nodes.push({
        ...node,
        feature,
        pronunciation,
        is_reading_protected: false,
      });
      paths.push({
        path_id: paths.length,
        node_ids: [node.node_id],
        char_span: node.char_span,
        surface: node.surface,
        pronunciation,
        features: [feature],
        left_boundary_cost: lc.cost,
        right_boundary_cost: rc.cost - graph.nodes[right].word_cost,
        right_link_cost: rc.cost,
        boundary_cost: lc.cost + rc.cost - graph.nodes[right].word_cost,
      });
    }
    const ids = new Set(nodes.map((n) => n.node_id));
    return ruleValue({
      normalized_text: graph.normalized_text,
      features: rules._mark_numeral_space_boundaries(
        graph.best.map((i) =>
          [graph.nodes[i].surface, graph.nodes[i].feature].join(","),
        ),
      ),
      morphs,
      feature_index_by_morph: featureIndices,
      nodes,
      paths,
      connections: graph.connections.filter(
        (e) => ids.has(e.left_node_id) && ids.has(e.right_node_id),
      ),
    });
  };
  run_njd_from_mecab = (features: string[], options: RecordValue = {}) => {
    const expanded = features.flatMap((feature) => {
      const cols = feature.split(","),
        chars = [...cols[0]];
      if (
        cols.length !== 8 ||
        chars.length <= 1 ||
        !chars.every((c) =>
          "０１２３４５６７８９〇零一二三四五六七八九−－ー‐‑‒–—-".includes(c),
        ) ||
        !chars.some((c) =>
          "０１２３４５６７８９零一二三四五六七八九".includes(c),
        )
      )
        return [feature];
      return chars.map((c) => {
        if ("−－ー‐‑‒–—-".includes(c))
          return `${c},記号,一般,*,*,*,*,${c},、,、,0/0,*`;
        let i = "０１２３４５６７８９".indexOf(c);
        if (i < 0) i = c === "零" ? 0 : "〇一二三四五六七八九".indexOf(c);
        const reading = [
            "ゼロ",
            "イチ",
            "ニ",
            "サン",
            "ヨン",
            "ゴ",
            "ロク",
            "ナナ",
            "ハチ",
            "キュー",
          ][i],
          mora = [2, 2, 1, 2, 2, 1, 2, 2, 2, 2][i];
        return `${c},名詞,数,*,*,*,*,${c},${reading},${reading},0/${mora},C3`;
      });
    });
    let njd = ruleValue(this.core.pronunciation(expanded));
    if (options.restore_unknown_katakana)
      njd = rules._restore_unknown_katakana_features(njd, features);
    njd = rules._apply_original_rule_before_chaining(
      njd,
      kw({ modify_numeral_reading: options.modify_numeral_reading ?? true }),
    );
    const bounded: RecordValue[] = [];
    njd.forEach((current: RecordValue, i: number) => {
      if (
        i > 0 &&
        current.pos_group1 === "数" &&
        njd[i - 1].pos_group1 === "数" &&
        current.chain_flag === 0
      )
        bounded.push({
          ...current,
          string: "",
          orig: "",
          read: "*",
          pron: "空白境界",
          pos_group1: "一般",
          pos_group3: "空白境界",
          acc: 0,
          mora_size: 0,
          chain_rule: "*",
        });
      bounded.push(current);
    });
    let after = false;
    const digits: RecordValue[] = [];
    for (const current of this.core.digit(bounded)) {
      if (current.pos_group3 === "空白境界") {
        after = true;
        continue;
      }
      if (after) {
        current.chain_flag =
          ["十", "百", "千"].includes(digits.at(-1)?.string) &&
          ["万", "億", "兆", "京"].includes(current.string)
            ? 1
            : 0;
        after = false;
      }
      digits.push(current);
    }
    return ruleValue(this.core.accent(digits));
  };
  run_frontend = (text: string) =>
    this.run_njd_from_mecab(this.run_mecab(text));
  make_phoneme_mapping = (features: RecordValue[]) => {
    const { phones, moras, absorbed } = this.core.phones(features);
    const mapping: RecordValue[] = features.map((f, i) => ({
      ...f,
      surface: f.string,
      accent_nucleus: f.acc,
      mora_count: moras[i],
      is_reading_rewritten: f.is_reading_rewritten ?? false,
      phonemes:
        ["、", "？", "！"].includes(f.pron) &&
        f.pos_group3 !== "数の区切り" &&
        !nonPause.has(f.string)
          ? ["pau"]
          : phones[i],
    }));
    for (const [key, [previous, count]] of Object.entries(absorbed)) {
      const entry = mapping[Number(key)],
        before = mapping[previous];
      before.mora_count -= count;
      entry.mora_count += count;
      if (count === [...entry.pron].length || !entry.phonemes.length) continue;
      if (before.phonemes.includes("pau") || before.phonemes.length <= count)
        continue;
      entry.phonemes = [...before.phonemes.slice(-count), ...entry.phonemes];
      before.phonemes = before.phonemes.slice(0, -count);
    }
    const merged: RecordValue[] = [];
    for (const [index, entry] of mapping.entries()) {
      const absorption = absorbed[index],
        long = /^ー+$/.test(entry.pron),
        previous = absorption ? mapping[absorption[0]] : undefined,
        count = absorption?.[1] ?? 0;
      if (/^[ヽヾゝゞ]/.test(entry.surface) && long && previous) {
        entry.phonemes = previous.phonemes.slice(-count);
        previous.phonemes = previous.phonemes.slice(0, -count);
      }
      if (!entry.phonemes.length && long && merged.length && previous) {
        const prev = merged.at(-1)!;
        if (prev.pos_group1 === "顔文字" || previous !== prev) {
          if (
            !previous.phonemes.includes("pau") &&
            previous.phonemes.length > count
          ) {
            entry.phonemes = previous.phonemes.slice(-count);
            previous.phonemes = previous.phonemes.slice(0, -count);
          }
          merged.push(entry);
          continue;
        }
        if (prev.phonemes.length && !prev.phonemes.includes("pau")) {
          prev.surface += entry.surface;
          prev.mora_count += entry.mora_count;
          if (/^ー+$/.test(entry.orig)) prev.orig += entry.orig;
          prev.read += entry.read;
          prev.pron += entry.pron;
          prev.is_reading_rewritten ||= entry.is_reading_rewritten;
          continue;
        }
      }
      merged.push(entry);
    }
    return ruleValue(merged);
  };
}
