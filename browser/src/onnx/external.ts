/** Packing recipes are generated locally with the static ONNX graphs.
 * Only external tensor bytes are produced in the browser. */
export type Segment =
  | { source: string; start: number; length: number }
  | { value: number; length: number };
export interface ExternalLayout {
  file: string;
  source: string;
  bytes: number;
  tensors: {
    name: string;
    shape: number[];
    offset: number;
    bytes: number;
    segments: Segment[];
  }[];
}
interface HeaderTensor {
  dtype: string;
  shape: number[];
  data_offsets: [number, number];
}
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
export function packExternal(
  layout: ExternalLayout,
  source: Uint8Array<ArrayBuffer>,
): Uint8Array<ArrayBuffer> {
  if (!Number.isSafeInteger(layout.bytes) || layout.bytes < 1)
    throw new Error("Unsupported external weight layout");
  const output = new Uint8Array(layout.bytes);
  if (source.length < 8) throw new Error("Invalid safetensors header");
  const view = new DataView(
    source.buffer,
    source.byteOffset,
    source.byteLength,
  );
  const base = 8 + Number(view.getBigUint64(0, true));
  if (!Number.isSafeInteger(base) || base < 8 || base > source.byteLength)
    throw new Error("Invalid safetensors header");
  const header: Record<string, HeaderTensor> = JSON.parse(
    new TextDecoder().decode(source.subarray(8, base)),
  );
  let previousEnd = 0;
  for (const tensor of layout.tensors) {
    if (
      !Number.isSafeInteger(tensor.offset) ||
      !Number.isSafeInteger(tensor.bytes) ||
      tensor.bytes < 0 ||
      tensor.offset < previousEnd ||
      tensor.offset % 4 ||
      tensor.offset + tensor.bytes > output.length
    )
      throw new Error(`Invalid external tensor offset: ${tensor.name}`);
    let cursor = tensor.offset;
    for (const segment of tensor.segments) {
      const count = segment.length,
        bytes = count * 4;
      if (
        !Number.isSafeInteger(count) ||
        count < 0 ||
        cursor + bytes > tensor.offset + tensor.bytes
      )
        throw new Error(`Invalid tensor segment: ${tensor.name}`);
      const target = new Float32Array(output.buffer, cursor, count);
      if (!("source" in segment)) target.fill(segment.value);
      else {
        const tensorSource = header[segment.source];
        if (!tensorSource || !["F16", "F32"].includes(tensorSource.dtype))
          throw new Error(`Missing float tensor: ${segment.source}`);
        const itemBytes = tensorSource.dtype === "F16" ? 2 : 4,
          start = segment.start;
        const [lo, hi] = tensorSource.data_offsets;
        if (
          !Number.isSafeInteger(start) ||
          start < 0 ||
          lo < 0 ||
          hi + base > source.length ||
          lo + (start + count) * itemBytes > hi
        )
          throw new Error(`Invalid safetensors range: ${segment.source}`);
        const offset = base + lo + start * itemBytes;
        if (itemBytes === 4)
          output.set(source.subarray(offset, offset + bytes), cursor);
        else
          for (let i = 0; i < count; i++)
            target[i] = halfToFloat(view.getUint16(offset + i * 2, true));
      }
      cursor += bytes;
    }
    if (cursor !== tensor.offset + tensor.bytes)
      throw new Error(`External tensor size mismatch: ${tensor.name}`);
    previousEnd = cursor;
  }
  return output;
}
