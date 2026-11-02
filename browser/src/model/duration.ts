import { Weights } from "./safetensors";
import { moraGroups, speech, roundEven } from "./geometry";
export interface Word {
  pos: string;
  pos_group1: string;
  is_unknown: boolean;
}
export interface Encoded {
  phoneIds: number[];
  features: number[][];
  wordIds: number[];
  wordFeatures: number[][];
  words: Word[];
}
export interface DurationConfig {
  native_bounds: [number, number];
  hash_bits: number;
  vocabulary: { pos: string[]; fine: string[]; special: string[] };
}
export class Duration {
  constructor(
    readonly weights: Weights,
    readonly config: DurationConfig,
  ) {}
  features({ phoneIds: ids, features: raw, wordIds: wids, words }: Encoded) {
    const n = ids.length,
      group = moraGroups(ids),
      struct = Array.from({ length: n }, () => Array(12).fill(0));
    const starts = ids.map((id, i) =>
        Number(
          speech(id) &&
            (i === 0 || !speech(ids[i - 1]) || group[i] !== group[i - 1]),
        ),
      ),
      total = starts.reduce((a, b) => a + b, 0);
    let cumulative = 0;
    for (let i = 0; i < n; i++) {
      cumulative += starts[i];
      struct[i][6] = cumulative;
      struct[i][7] = total - cumulative + Number(speech(ids[i]));
      struct[i][8] = total;
    }
    for (const isWord of [true, false]) {
      let i = 0;
      while (i < n) {
        if (!speech(ids[i]) || (isWord && wids[i] <= 0)) {
          i++;
          continue;
        }
        let j = i + 1;
        while (j < n && speech(ids[j]) && (!isWord || wids[j] === wids[i])) j++;
        const gs = [...new Set(group.slice(i, j))];
        for (let k = i; k < j; k++) {
          const rank = gs.indexOf(group[k]) + 1,
            offset = isWord ? 0 : 3;
          struct[k].splice(offset, 3, rank, gs.length - rank + 1, gs.length);
          if (isWord) struct[k][9] = 1;
        }
        if (isWord) {
          struct[i][10] = 1;
          struct[j - 1][11] = 1;
        }
        i = j;
      }
    }
    const hashes = new Map<number, number>();
    for (let i = 0; i < n; i++)
      if (wids[i] > 0)
        hashes.set(
          wids[i],
          Math.imul((hashes.get(wids[i]) ?? 2166136261) ^ ids[i], 16777619) >>>
            0,
        );
    const manner = this.weights.get("table.duration.manner_lookup").data,
      v = this.config.vocabulary;
    return ids.map((_, i) => {
      const neighbors = [-2, -1, 0, 1, 2].map((d) => ids[i + d] ?? 0),
        x: number[] = [];
      for (const id of neighbors)
        for (let c = 0; c < 49; c++) x.push(Number(id === c));
      for (const j of [1, 2, 3])
        for (let c = 0; c < 11; c++) x.push(Number(manner[neighbors[j]] === c));
      x.push(
        ...raw[i].map((r, c) =>
          roundEven(Math.fround(r * [20, 30, 30, 30, 30, 1, 1, 1][c])),
        ),
        ...struct[i],
      );
      const word = wids[i] > 0 ? words[wids[i] - 1] : undefined;
      const pos = Math.max(0, v.pos.indexOf(word?.pos ?? ""));
      for (let c = 0; c < v.pos.length; c++) x.push(Number(pos === c));
      x.push(
        Number(word?.pos_group1 === v.special[0]),
        Number(word?.pos_group1 === v.special[1]),
        Number(word?.is_unknown ?? false),
      );
      for (const fine of v.fine) x.push(Number(word?.pos_group1 === fine));
      for (let b = 0; b < this.config.hash_bits; b++)
        x.push(((hashes.get(wids[i]) ?? 0) >>> b) & 1);
      if (x.length !== 369)
        throw new Error("Duration feature contract mismatch");
      return x;
    });
  }
  predict(encoded: Encoded, speed = 1) {
    const get = (name: string) =>
        this.weights.get(`table.duration.${name}`).data,
      feature = get("feature"),
      threshold = get("threshold"),
      left = get("left"),
      right = get("right"),
      table = get("native_table"),
      hi = this.config.native_bounds[1];
    return this.features(encoded).map((row, i) => {
      let node = 0;
      while (node >= 0)
        node = row[feature[node]] <= threshold[node] ? left[node] : right[node];
      let value = -node;
      if (value > hi)
        value = table[(value - hi - 1) * 49 + encoded.phoneIds[i]];
      return Math.max(1, roundEven(Math.fround(value / speed)));
    });
  }
}
