import { ort, intTensor } from "../onnx/session";
const TOKENS = [
  "<sos>",
  "<eos>",
  ..."ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヲンヴー",
];
export function parseKanalizerDataset(text: string): { [key: string]: string } {
  const dictionary: { [key: string]: string } = Object.create(null);
  for (const line of text.split(/\r?\n/)) {
    if (!line.trim()) continue;
    const entry: { word: string; kata: string[] } = JSON.parse(line);
    dictionary[entry.word.toLowerCase()] = entry.kata[0];
  }
  return dictionary;
}
/** One native GRU/Loop session call decodes the whole word. */
export class Kanalizer {
  constructor(readonly session: ort.InferenceSession) {}
  async read(text: string) {
    const cleaned = text.toLowerCase().replace(/[^a-z]/g, "");
    if (!cleaned) return "";
    const ids = [0, ...[...cleaned].map((c) => c.charCodeAt(0) - 95), 1];
    const result = await this.session.run({
      ids: intTensor(ids, [ids.length]),
    });
    try {
      const tokens = Array.from(result.tokens.data as BigInt64Array, Number);
      const end = tokens.indexOf(1);
      return tokens
        .slice(0, end < 0 ? undefined : end)
        .map((i) => TOKENS[i])
        .join("");
    } finally {
      Object.values(result).forEach((t) => t.dispose());
    }
  }
}
