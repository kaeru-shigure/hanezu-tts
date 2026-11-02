/** Inflate the local HZP1 transport into the compact HZD1 runtime layout.
 * The 103 MB MeCab dictionary is never reconstructed. CSV features are decoded
 * by the native core only for nodes owned by the current lattice.
 */
export async function decodeDictionary(
  compressed: Uint8Array<ArrayBuffer>,
): Promise<Uint8Array<ArrayBuffer>> {
  const bytes = new Uint8Array(
    await new Response(
      new Blob([compressed])
        .stream()
        .pipeThrough(new DecompressionStream("gzip")),
    ).arrayBuffer(),
  );
  const invalid = () => new Error("日本語辞書の形式が不正です。");
  if (bytes.length < 64) throw invalid();
  const header = new DataView(bytes.buffer);
  const h = (index: number) => header.getUint32(index * 4, true);
  if (
    h(0) !== 0x31505a48 ||
    h(1) !== 1 ||
    h(10) !== bytes.length ||
    !h(2) ||
    !h(3) ||
    !h(4) ||
    !h(5) ||
    !h(7) ||
    !h(8) ||
    !h(9) ||
    h(7) > 65536 ||
    h(8) > 65536 ||
    Array.from({ length: 5 }, (_, i) => h(i + 11)).some(Boolean)
  )
    throw invalid();
  const [count, nodes, labels, grammars, suffixes] = [
    h(2),
    h(5),
    h(6),
    h(7),
    h(8),
  ];
  const blocks = [
    [nodes + 1, 4],
    [nodes + 1, 4],
    [nodes, 4],
    [Math.ceil(labels / 4), 4],
    [count, 16],
    [count, 12],
    [grammars, 4],
    [suffixes, 4],
  ];
  if (
    64 + blocks.reduce((sum, [rows, width]) => sum + rows * width, 0) + h(9) !==
    bytes.length
  )
    throw invalid();
  let position = 64;
  for (const [index, [rows, width]] of blocks.entries()) {
    const size = rows * width;
    if (index !== 3) {
      const planes = bytes.slice(position, position + size);
      for (let byte = 0; byte < width; byte++)
        for (let row = 0; row < rows; row++)
          bytes[position + row * width + byte] = planes[byte * rows + row];
      if (index < 2) {
        let value = 0;
        for (let row = 0; row < rows; row++) {
          const offset = position + row * 4;
          value += header.getUint32(offset, true);
          if (value > 0xffffffff) throw invalid();
          header.setUint32(offset, value, true);
        }
      }
    }
    position += size;
  }
  header.setUint32(0, 0x31445a48, true); // HZD1
  return bytes;
}
