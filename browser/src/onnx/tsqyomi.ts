export const TSQYOMI_HIDDEN =
  "/backbone/final_norm/LayerNormalization_output_0";

function varint(bytes: Uint8Array, start: number, end: number) {
  let value = 0;
  for (let i = start; i < Math.min(start + 8, end); i++) {
    value += (bytes[i] & 127) * 2 ** ((i - start) * 7);
    if (!Number.isSafeInteger(value)) break;
    if (bytes[i] < 128) return { value, end: i + 1 };
  }
  throw new Error("Invalid ONNX varint");
}

/** Skip protobuf payloads, including weights, without decoding or rewriting them. */
function* fields(bytes: Uint8Array, start = 0, end = bytes.length) {
  while (start < end) {
    const tag = varint(bytes, start, end),
      wire = tag.value % 8;
    let data = tag.end,
      next: number;
    if (wire === 0) next = varint(bytes, data, end).end;
    else if (wire === 2) {
      const length = varint(bytes, data, end);
      data = length.end;
      next = data + length.value;
    } else if (wire === 1 || wire === 5) next = data + (wire === 1 ? 8 : 4);
    else throw new Error("Unsupported ONNX wire type");
    if (tag.value < 8 || next > end) throw new Error("Invalid ONNX field");
    yield {
      number: Math.floor(tag.value / 8),
      wire,
      start: tag.end,
      data,
      end: next,
    };
    start = next;
  }
}

function encodeVarint(value: number) {
  const bytes: number[] = [];
  do {
    const part = value % 128;
    value = Math.floor(value / 128);
    bytes.push(part + (value ? 128 : 0));
  } while (value);
  return Uint8Array.from(bytes);
}

function join(parts: Uint8Array[]) {
  const result = new Uint8Array(
    parts.reduce((sum, part) => sum + part.length, 0),
  );
  let offset = 0;
  for (const part of parts) {
    result.set(part, offset);
    offset += part.length;
  }
  return result;
}

/** Expose the existing F16 context in memory; the cached upstream ONNX stays intact. */
export function withTsqyomiContext(model: Uint8Array<ArrayBuffer>) {
  const graph = [...fields(model)].find((f) => f.number === 7 && f.wire === 2);
  if (!graph) throw new Error("TSqyomi: missing ONNX graph");
  const decoder = new TextDecoder();
  let info: Uint8Array | undefined;
  for (const field of fields(model, graph.data, graph.end)) {
    // GraphProto.output (12) and value_info (13) share ValueInfoProto's schema.
    if (field.wire !== 2 || (field.number !== 12 && field.number !== 13))
      continue;
    const name = [...fields(model, field.data, field.end)].find(
      (f) => f.number === 1 && f.wire === 2,
    );
    if (
      !name ||
      decoder.decode(model.subarray(name.data, name.end)) !== TSQYOMI_HIDDEN
    )
      continue;
    if (field.number === 12) return model;
    info = model.subarray(field.data, field.end);
  }
  if (!info) throw new Error("TSqyomi: missing context output type");
  const output = join([
    Uint8Array.of(12 * 8 + 2),
    encodeVarint(info.length),
    info,
  ]);
  return join([
    model.subarray(0, graph.start),
    encodeVarint(graph.end - graph.data + output.length),
    model.subarray(graph.data, graph.end),
    output,
    model.subarray(graph.end),
  ]);
}
