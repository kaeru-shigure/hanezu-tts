export const speech = (id: number) => id > 2 && id < 48;
export const pause = (id: number) => id === 1 || id === 2 || id === 48;
export function moraGroups(ids: number[]) {
  let g = 0;
  return ids.map((id, i) => {
    const current = g;
    if (
      pause(id) ||
      (id >= 3 && id <= 14) ||
      pause(ids[i + 1]) ||
      i === ids.length - 1
    )
      g++;
    return current;
  });
}
export function geometry(ids: number[], durations: number[]) {
  const groups = moraGroups(ids),
    units = Math.max(...groups) + 1,
    phoneIndex: number[] = [],
    fraction: number[] = [];
  durations.forEach((d, i) => {
    for (let f = 0; f < d; f++) {
      phoneIndex.push(i);
      fraction.push(f / d);
    }
  });
  const frameGroups = phoneIndex.map((p) => groups[p]),
    lengths = Array(ids.length).fill(0),
    starts = Array(ids.length).fill(0);
  frameGroups.forEach((g) => lengths[g]++);
  for (let g = 1; g < lengths.length; g++)
    starts[g] = starts[g - 1] + lengths[g - 1];
  const positions = frameGroups.map((g, i) =>
    lengths[g] === 1 ? 0.5 : (i - starts[g]) / (lengths[g] - 1),
  );
  return {
    groups,
    units,
    phoneIndex,
    fraction,
    frameGroups,
    knotIndex: positions.map((p, i) => 2 * frameGroups[i] + Number(p > 0.5)),
    knotAlpha: positions.map((p) => (p > 0.5 ? 2 * p - 1 : 2 * p)),
  };
}
export type Geometry = ReturnType<typeof geometry>;
export function roundEven(x: number) {
  const floor = Math.floor(x),
    fraction = x - floor;
  return fraction === 0.5
    ? floor % 2 === 0
      ? floor
      : floor + 1
    : Math.round(x);
}
