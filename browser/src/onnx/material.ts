import type { ExternalLayout, Segment } from "./external";

export const MATERIAL_ONNX_PACK_FILE = "onnx/matonnxpack.bin";
export interface MaterialOnnxModel {
  name: string;
  graph: Uint8Array<ArrayBuffer>;
  layout: ExternalLayout;
}
export interface MaterialOnnxPack {
  version: 1;
  models: ReadonlyMap<string, MaterialOnnxModel>;
}

/** Read the fixed-width little-endian tables documented in browser/README.md.
 * Graphs remain views of the pack; neither protobuf nor JSON parsing is needed. */
export function readMaterialOnnxPack(
  bytes: Uint8Array<ArrayBuffer>,
): MaterialOnnxPack {
  const fail = (reason: string): never => {
    throw new Error(`Invalid MaterialOnnxPack: ${reason}`);
  };
  if (bytes.length < 64) fail("truncated header");
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const u32 = (offset: number) => view.getUint32(offset, true);
  const magic = [77, 65, 84, 79, 78, 78, 88, 0]; // MATONNX\0
  if (magic.some((byte, i) => bytes[i] !== byte)) fail("magic");
  if (u32(8) !== 1) fail("unsupported version");
  if (u32(12) !== bytes.length) fail("file size");
  let end = 64;
  const section = (field: number, stride: number) => {
    const offset = u32(field),
      count = u32(field + 4);
    if (offset !== end || count > Math.floor((bytes.length - offset) / stride))
      fail("table bounds");
    end = offset + count * stride;
    return { offset, count };
  };
  const models = section(16, 44),
    tensors = section(24, 32),
    segments = section(32, 24),
    dimensions = section(40, 4),
    strings = section(48, 1),
    graphs = section(56, 1);
  if (end !== bytes.length || models.count === 0)
    fail("empty or incomplete pack");
  const decoder = new TextDecoder("utf-8", { fatal: true });
  const string = (offset: number, length: number): string => {
    if (
      !length ||
      offset < strings.offset ||
      offset + length > strings.offset + strings.count
    )
      fail("string bounds");
    return decoder.decode(bytes.subarray(offset, offset + length));
  };
  const result = new Map<string, MaterialOnnxModel>();
  let nextTensor = 0,
    nextSegment = 0,
    nextDimension = 0,
    nextGraph = graphs.offset;
  for (let m = 0; m < models.count; m++) {
    const p = models.offset + m * 44;
    const name = string(u32(p), u32(p + 4));
    const source = string(u32(p + 8), u32(p + 12));
    const file = string(u32(p + 16), u32(p + 20));
    const graphOffset = u32(p + 24),
      graphLength = u32(p + 28);
    const size = u32(p + 32),
      firstTensor = u32(p + 36),
      tensorCount = u32(p + 40);
    if (result.has(name)) fail("duplicate model name");
    if (
      graphOffset !== nextGraph ||
      !graphLength ||
      graphOffset + graphLength > end
    )
      fail("graph bounds");
    if (
      !size ||
      !tensorCount ||
      firstTensor !== nextTensor ||
      firstTensor + tensorCount > tensors.count
    )
      fail("model tensor range");
    const layout: ExternalLayout = { file, source, bytes: size, tensors: [] };
    const names = new Set<string>();
    let previousEnd = 0;
    for (let t = 0; t < tensorCount; t++) {
      const q = tensors.offset + nextTensor++ * 32;
      const tensorName = string(u32(q), u32(q + 4));
      const offset = u32(q + 8),
        length = u32(q + 12);
      const firstDimension = u32(q + 16),
        dimensionCount = u32(q + 20);
      const firstSegment = u32(q + 24),
        segmentCount = u32(q + 28);
      if (names.has(tensorName)) fail("duplicate tensor name");
      names.add(tensorName);
      if (offset % 4 || offset < previousEnd || offset + length > size)
        fail("tensor bounds");
      if (
        firstDimension !== nextDimension ||
        firstDimension + dimensionCount > dimensions.count
      )
        fail("dimension range");
      const shape: number[] = [];
      let elements = 1;
      for (let d = 0; d < dimensionCount; d++) {
        const dimension = u32(dimensions.offset + nextDimension++ * 4);
        if (!dimension) fail("empty dimension");
        shape.push(dimension);
        elements *= dimension;
      }
      if (!Number.isSafeInteger(elements) || elements * 4 !== length)
        fail("tensor shape/size mismatch");
      if (
        !segmentCount ||
        firstSegment !== nextSegment ||
        firstSegment + segmentCount > segments.count
      )
        fail("segment range");
      const recipe: Segment[] = [];
      let count = 0;
      for (let s = 0; s < segmentCount; s++) {
        const r = segments.offset + nextSegment++ * 24;
        const kind = u32(r),
          sourceOffset = u32(r + 4),
          sourceLength = u32(r + 8);
        const start = u32(r + 12),
          length = u32(r + 16);
        const value = view.getFloat32(r + 20, true);
        if (!length) fail("empty segment");
        if (kind === 0) {
          if (value !== 0) fail("source segment value");
          recipe.push({
            source: string(sourceOffset, sourceLength),
            start,
            length,
          });
        } else if (kind === 1) {
          if (sourceOffset || sourceLength || start || !Number.isFinite(value))
            fail("fill segment");
          recipe.push({ value, length });
        } else fail("segment kind");
        count += length;
      }
      if (count !== elements) fail("segment size mismatch");
      layout.tensors.push({
        name: tensorName,
        shape,
        offset,
        bytes: length,
        segments: recipe,
      });
      previousEnd = offset + length;
    }
    if (previousEnd !== size) fail("external data size");
    result.set(name, {
      name,
      graph: bytes.subarray(graphOffset, graphOffset + graphLength),
      layout,
    });
    nextGraph += graphLength;
  }
  if (
    nextTensor !== tensors.count ||
    nextSegment !== segments.count ||
    nextDimension !== dimensions.count ||
    nextGraph !== end
  )
    fail("unreferenced records");
  return { version: 1, models: result };
}
