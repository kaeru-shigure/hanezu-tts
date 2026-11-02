export function encodeWav(samples: Float32Array, sampleRate: number): Blob {
  const buffer = new ArrayBuffer(44 + samples.length * 2),
    view = new DataView(buffer);
  const text = (offset: number, value: string) =>
    [...value].forEach((char, i) =>
      view.setUint8(offset + i, char.charCodeAt(0)),
    );
  text(0, "RIFF");
  view.setUint32(4, 36 + samples.length * 2, true);
  text(8, "WAVE");
  text(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  text(36, "data");
  view.setUint32(40, samples.length * 2, true);
  samples.forEach((value, i) => {
    if (!Number.isFinite(value)) throw new Error("音声に非有限値があります。");
    const x = Math.max(-1, Math.min(1, value));
    view.setInt16(44 + i * 2, Math.round(x * (x < 0 ? 32768 : 32767)), true);
  });
  return new Blob([buffer], { type: "audio/wav" });
}
