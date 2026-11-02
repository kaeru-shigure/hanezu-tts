import { Frontend } from "../frontend/frontend";
import { JTalk, type Core } from "../frontend/core";
import { decodeDictionary } from "../frontend/dictionary";
import { Tsqyomi } from "../frontend/tsqyomi";
import { UnknownReadings, recoverUnknown } from "../frontend/unknown";
import { NGram, splitInput, type EnglishReader } from "../frontend/split";
import { Weights } from "../model/safetensors";
import { Kanalizer, parseKanalizerDataset } from "../model/kanalizer";
import { Duration } from "../model/duration";
import { Acoustic } from "../model/acoustic";
import { Vocoder } from "../model/vocoder";
import { configureRuntime, sessionLoader } from "../onnx/session";
import type { Reply } from "./protocol";

type ReadFile = (name: string) => Promise<Uint8Array<ArrayBuffer>>;
export { cacheReader } from "./assets";
async function loadModule(bytes: Uint8Array<ArrayBuffer>) {
  const url = URL.createObjectURL(
    new Blob([bytes], { type: "text/javascript" }),
  );
  try {
    return await import(/* webpackIgnore: true */ url);
  } finally {
    URL.revokeObjectURL(url);
  }
}

/** A single Worker owns all models. No inference-time network requests. */
export class Pipeline {
  private constructor(
    readonly frontend: Frontend,
    readonly english: EnglishReader,
    readonly duration: Duration,
    readonly acoustic: Acoustic,
    readonly vocoder: Vocoder,
  ) {}
  static async load(read: ReadFile, moduleLoader = loadModule) {
    const json = async (name: string) =>
      JSON.parse(new TextDecoder().decode(await read(name)));
    const config = await json("config.json");
    configureRuntime();
    const loadSession = sessionLoader(read);
    if (
      config.format !== "hanezu-tts-v1" ||
      config.contract.frontend.engine_revision !==
        "e7713f2d6d91f392f595df5e8998ff2b62c3b6f5" ||
      config.contract.audio.sample_rate !== 22050 ||
      config.contract.audio.hop_length !== 256
    )
      throw new Error("音声モデルの契約がこのブラウザ実装と一致しません。");
    const module = await moduleLoader(await read("openjtalk-js.mjs"));
    const core: Core = await module.default();
    core.FS.mkdir("/dict");
    core.FS.writeFile(
      "/dict/sys.dic",
      await decodeDictionary(await read("openjtalk/system.hzd.gz")),
    );
    for (const file of ["unk.dic", "matrix.bin", "char.bin"])
      core.FS.writeFile("/dict/" + file, await read("openjtalk/" + file));
    core.initialize("/dict");
    const tsqyomi = new Tsqyomi(
      await loadSession("tsqyomi"),
      await json("tsqyomi/tokenizer.json"),
      await json("tsqyomi/metadata.json"),
    );
    const unknownReadings = new UnknownReadings(
      await json("unknown-kanji.json"),
    );
    const unihan = await json("unihan.json");
    const frontend = new Frontend(
      new JTalk(core),
      tsqyomi,
      config.contract.frontend.phones,
      (njd) => recoverUnknown(njd, unknownReadings, unihan),
    );
    const ngram = new NGram(await json("ngram.json"));
    const kanalizer = new Kanalizer(await loadSession("kanalizer"));
    const weights = new Weights(await read("weight.safetensors"));
    return new Pipeline(
      frontend,
      {
        dictionary: parseKanalizerDataset(
          new TextDecoder().decode(await read("kanalizer-dataset.jsonl")),
        ),
        accepts: ngram.accepts,
        read: (word) => kanalizer.read(word),
      },
      new Duration(weights, config.model.duration),
      new Acoustic(await loadSession("acoustic")),
      new Vocoder(await loadSession("vocoder")),
    );
  }
  async synthesize(text: string, speed: number, emit: (reply: Reply) => void) {
    if (!Number.isFinite(speed) || speed < 0.25 || speed > 4)
      throw new Error("速度は 0.25〜4.00 の範囲で指定してください。");
    const chunks = await splitInput(text, this.english);
    if (!chunks.length) throw new Error("読み上げる文章を入力してください。");
    emit({ type: "chunks", chunks });
    const audio: Float32Array<ArrayBuffer>[] = [];
    for (const [index, chunk] of chunks.entries()) {
      emit({ type: "progress", index, state: "active" });
      const encoded = await this.frontend.encode(chunk.text);
      const frames = this.duration.predict(encoded, speed);
      const { condition, f0 } = await this.acoustic.forward(encoded, frames);
      const wave = await this.vocoder.forward(condition, f0);
      if (!wave.length || wave.some((value) => !Number.isFinite(value)))
        throw new Error("音声の生成結果が不正です。");
      audio.push(wave);
      emit({ type: "progress", index, state: "done" });
    }
    const samples = new Float32Array(
      audio.reduce((sum, wave) => sum + wave.length, 0),
    );
    let offset = 0;
    for (const wave of audio) {
      samples.set(wave, offset);
      offset += wave.length;
    }
    emit({ type: "audio", samples, sampleRate: 22050 });
  }
}
