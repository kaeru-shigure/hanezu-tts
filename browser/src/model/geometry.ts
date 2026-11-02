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
export function roundEven(x: number) {
  const floor = Math.floor(x),
    fraction = x - floor;
  return fraction === 0.5
    ? floor % 2 === 0
      ? floor
      : floor + 1
    : Math.round(x);
}
