/** Host arrays for integer geometry and signal processing. Neural kernels run in ONNX Runtime. */
export class Tensor {
  readonly data: Float32Array<ArrayBuffer>;
  constructor(
    readonly rows: number,
    readonly cols: number,
    data?: ArrayLike<number>,
    ownership: "copy" | "borrow" = "copy",
  ) {
    this.data =
      ownership === "borrow" && data instanceof Float32Array
        ? (data as Float32Array<ArrayBuffer>)
        : data
          ? Float32Array.from(data)
          : new Float32Array(rows * cols);
    if (this.data.length !== rows * cols)
      throw new Error(
        `Tensor shape ${rows}×${cols} does not match ${this.data.length}`,
      );
  }
  /** Borrow a buffer without copying. The caller keeps it alive while this view is used. */
  static wrap(rows: number, cols: number, data: Float32Array<ArrayBuffer>) {
    return new Tensor(rows, cols, data, "borrow");
  }
  at(row: number, col = 0) {
    return this.data[row * this.cols + col];
  }
  map(fn: (value: number, row: number, col: number) => number) {
    const out = new Tensor(this.rows, this.cols);
    for (let row = 0; row < this.rows; row++)
      for (let col = 0; col < this.cols; col++) {
        const index = row * this.cols + col;
        out.data[index] = fn(this.data[index], row, col);
      }
    return out;
  }
  zip(other: Tensor | number, fn: (a: number, b: number) => number): Tensor {
    if (typeof other === "number") return this.map((v) => fn(v, other));
    if (
      (other.rows !== this.rows && other.rows !== 1 && this.rows !== 1) ||
      (other.cols !== this.cols && other.cols !== 1 && this.cols !== 1)
    )
      throw new Error("Incompatible broadcast");
    const rows = Math.max(this.rows, other.rows),
      cols = Math.max(this.cols, other.cols),
      out = new Tensor(rows, cols);
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++)
        out.data[r * cols + c] = fn(
          this.at(this.rows === 1 ? 0 : r, this.cols === 1 ? 0 : c),
          other.at(other.rows === 1 ? 0 : r, other.cols === 1 ? 0 : c),
        );
    return out;
  }
  add(x: Tensor | number) {
    return this.zip(x, (a, b) => a + b);
  }
  sub(x: Tensor | number) {
    return this.zip(x, (a, b) => a - b);
  }
  mul(x: Tensor | number) {
    return this.zip(x, (a, b) => a * b);
  }
}
export const range = (n: number) => Array.from({ length: n }, (_, i) => i);
export const clamp = (v: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, v));
export function positions(length: number, width: number) {
  const out = new Tensor(length, width);
  for (let r = 0; r < length; r++)
    for (let c = 0; c < width; c += 2) {
      const v = r * Math.exp((-Math.log(10000) * c) / width);
      out.data[r * width + c] = Math.sin(v);
      out.data[r * width + c + 1] = Math.cos(v);
    }
  return out;
}
