import { ort, floatTensor, intTensor } from "../onnx/session";
import { Tensor, positions, range } from "./tensor";
import { geometry, speech } from "./geometry";
import type { Encoded } from "./duration";

/** Prepare integer alignment once; the acoustic and pitch networks share a session. */
export function acousticInputs(encoded: Encoded, durations: number[]) {
  const { phoneIds: ids, wordIds, wordFeatures, features } = encoded;
  const P = ids.length,
    W = wordFeatures.length,
    geo = geometry(ids, durations),
    T = geo.phoneIndex.length,
    G = geo.units;
  const counts = Array(W).fill(0),
    first = Array(W).fill(P);
  wordIds.forEach((w, i) => {
    counts[w]++;
    first[w] = Math.min(first[w], i);
  });
  const maxWord = Math.max(...wordIds, 1),
    period = Math.max(2 * (T - 1), 1);
  const f = floatTensor,
    i = intTensor;
  return {
    ids: i(ids, [P]),
    features: f(features.flat(), [P, 8]),
    word_ids: i(wordIds, [P]),
    word_features: f(wordFeatures.flat(), [W, 384]),
    log_duration: f(
      durations.map((d) => Math.log1p(d) / 4),
      [P, 1],
    ),
    phone_index: i(geo.phoneIndex, [T]),
    fraction: f(geo.fraction, [T, 1]),
    speech: f(
      ids.map((id) => Number(speech(id))),
      [P, 1],
    ),
    phone_positions96: f(positions(P, 96).data, [P, 96]),
    phone_positions24: f(positions(P, 24).data, [P, 24]),
    word_positions: f(positions(W, 24).data, [W, 24]),
    extra: f(
      wordIds.flatMap((w, index) => [
        0,
        index / Math.max(P - 1, 1),
        w / maxWord,
        w > 0 ? (index - first[w]) / Math.max(counts[w] - 1, 1) : 0,
        Math.log1p(counts[w]) / 3,
      ]),
      [P, 5],
    ),
    word_assignment: f(
      range(W).flatMap((w) => wordIds.map((v) => Number(v === w))),
      [W, P],
    ),
    word_mask: f(
      counts.map((c) => Number(c > 0)),
      [W, 1],
    ),
    word_feature_mask: f(
      range(W).map((w) => Number(w > 0)),
      [W, 1],
    ),
    neighbors: i(
      ids.flatMap((_, p) =>
        [-2, -1, 0, 1, 2].map((offset) => ids[p + offset] ?? 49),
      ),
      [P, 5],
    ),
    phone_ones: f(
      ids.map(() => 1),
      [P, 1],
    ),
    unit_assignment: f(
      range(G).flatMap((g) => geo.groups.map((v) => Number(v === g))),
      [G, P],
    ),
    unit_position: f(
      range(G).map((g) => (2 * g) / Math.max(G - 1, 1) - 1),
      [G, 1],
    ),
    frame_groups: i(geo.frameGroups, [T]),
    unit_fraction: f(
      geo.knotIndex.map((k, j) => ((k % 2) + geo.knotAlpha[j]) / 2),
      [T, 1],
    ),
    knot_index: i(geo.knotIndex, [T]),
    knot_alpha: f(geo.knotAlpha, [T, 1]),
    pitch_reflect_index: i(
      range(T + 30).map((j) => {
        const p = (((j - 15) % period) + period) % period;
        return Math.min(p, period - p);
      }),
      [T + 30],
    ),
  };
}
export class Acoustic {
  constructor(readonly session: ort.InferenceSession) {}
  async forward(encoded: Encoded, durations: number[]) {
    const feeds = acousticInputs(encoded, durations);
    const out = await this.session.run(feeds);
    try {
      return {
        condition: new Tensor(
          Number(out.condition.dims[0]),
          384,
          out.condition.data as Float32Array,
        ),
        f0: new Tensor(Number(out.f0.dims[0]), 1, out.f0.data as Float32Array),
      };
    } finally {
      Object.values(out).forEach((t) => t.dispose());
      Object.values(feeds).forEach((t) => t.dispose());
    }
  }
}
