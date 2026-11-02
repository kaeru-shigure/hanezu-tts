/** Load only the duration tree; neural parameters are loaded by hanezu-rt. */
export function halfToFloat(bits: number): number {
  const sign = bits & 0x8000 ? -1 : 1,
    exponent = (bits >>> 10) & 31,
    mantissa = bits & 1023;
  return (
    sign *
    (exponent === 31
      ? mantissa
        ? NaN
        : Infinity
      : exponent
        ? 2 ** (exponent - 15) * (1 + mantissa / 1024)
        : mantissa * 2 ** -24)
  );
}
export interface Weight {
  shape: number[];
  data: Float32Array | Float64Array | Int32Array | Uint8Array;
}
export class Weights {
  readonly values = new Map<string, Weight>();
  readonly metadata: Record<string, string>;
  constructor(bytes: Uint8Array<ArrayBuffer>, prefix = "table.duration.") {
    const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength),
      length = Number(view.getBigUint64(0, true));
    if (length > bytes.length - 8)
      throw new Error("Invalid safetensors header");
    const header = JSON.parse(
      new TextDecoder().decode(bytes.subarray(8, 8 + length)),
    );
    this.metadata = header.__metadata__ ?? {};
    for (const [name, value] of Object.entries(header)) {
      if (name === "__metadata__" || !name.startsWith(prefix)) continue;
      const {
        dtype,
        shape,
        data_offsets: [start, end],
      } = value as {
        dtype: string;
        shape: number[];
        data_offsets: [number, number];
      };
      const raw = bytes.slice(8 + length + start, 8 + length + end).buffer;
      const data =
        dtype === "F32"
          ? new Float32Array(raw)
          : dtype === "F16"
            ? Float32Array.from(new Uint16Array(raw), halfToFloat)
            : dtype === "F64"
              ? new Float64Array(raw)
              : dtype === "I32"
                ? new Int32Array(raw)
                : dtype === "U8"
                  ? new Uint8Array(raw)
                  : null;
      if (!data || data.length !== shape.reduce((a, b) => a * b, 1))
        throw new Error(`Unsupported tensor ${name}: ${dtype}`);
      this.values.set(name, { shape, data });
    }
  }
  get(name: string) {
    const value = this.values.get(name);
    if (!value) throw new Error(`Missing weight ${name}`);
    return value;
  }
}
