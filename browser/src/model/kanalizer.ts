export function parseKanalizerDataset(text: string): { [key: string]: string } {
  const dictionary: { [key: string]: string } = Object.create(null);
  for (const line of text.split(/\r?\n/)) {
    if (!line.trim()) continue;
    const entry: { word: string; kata: string[] } = JSON.parse(line);
    dictionary[entry.word.toLowerCase()] = entry.kata[0];
  }
  return dictionary;
}
