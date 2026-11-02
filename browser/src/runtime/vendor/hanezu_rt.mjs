// Thin JS glue for hanezu_rt.wasm (no wasm-bindgen). Works in browsers, Workers and Node.
// All model weights/config are passed in by the caller as bytes.

/** True when the engine supports WebAssembly relaxed-SIMD (use hanezu_rt.relaxed.wasm, FMA GEMM). */
export function supportsRelaxedSimd() {
  // i8x16.relaxed_swizzle probe (same bytes as wasm-feature-detect)
  return WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 15, 1, 13, 0, 65, 1, 253, 15, 65, 2, 253, 15, 253, 128, 2, 11]));
}
/** File name of the best build for this engine. */
export function wasmFileName() {
  return supportsRelaxedSimd() ? "hanezu_rt.relaxed.wasm" : "hanezu_rt.wasm";
}

export class HanezuRT {
  static async create(wasmBytesOrModule) {
    const imports = { env: { hz_now: () => performance.now() } };
    const { instance } =
      wasmBytesOrModule instanceof WebAssembly.Module
        ? { instance: await WebAssembly.instantiate(wasmBytesOrModule, imports) }
        : await WebAssembly.instantiate(wasmBytesOrModule, imports);
    return new HanezuRT(instance.exports);
  }
  constructor(x) {
    this.x = x;
  }
  get mem() {
    return this.x.memory.buffer;
  }
  // -- memory helpers
  put(bytes) {
    const u8 = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    const p = this.x.hz_alloc(u8.length);
    new Uint8Array(this.mem, p, u8.length).set(u8);
    return { p, n: u8.length };
  }
  free(a) {
    this.x.hz_free(a.p, a.n);
  }
  withBuffers(arrays, fn) {
    const bufs = arrays.map((a) => this.put(a));
    try {
      return fn(...bufs.map((b) => b.p));
    } finally {
      bufs.forEach((b) => this.free(b));
    }
  }
  error() {
    const p = this.x.hz_last_error_ptr(), n = this.x.hz_last_error_len();
    return new TextDecoder().decode(new Uint8Array(this.mem, p, n));
  }
  check(handle, what) {
    if (!handle) throw new Error(`${what}: ${this.error()}`);
    return handle;
  }
  f32(ptr, len) {
    return new Float32Array(this.mem, ptr, len).slice();
  }
  // -- profiler
  profile(on) {
    this.x.hz_prof_enable(on ? 1 : 0);
    this.x.hz_prof_reset();
  }
  profileReport() {
    const n = this.x.hz_prof_report();
    const s = new TextDecoder().decode(new Uint8Array(this.mem, this.x.hz_prof_report_ptr(), n));
    const out = {};
    for (const kv of s.split(";").filter(Boolean)) {
      const [k, v] = kv.split("=");
      out[k] = Number(v.split(":")[0]);
    }
    return out;
  }

  // -- acoustic + pitch + vocoder
  loadTTS(weightBytes, configText) {
    const w = this.put(weightBytes), c = this.put(new TextEncoder().encode(configText));
    try {
      return new TTS(this, this.check(this.x.hz_tts_new(w.p, w.n, c.p, c.n), "loadTTS"));
    } finally {
      this.free(w);
      this.free(c);
    }
  }
  loadKanalizer(bytes) {
    const b = this.put(bytes);
    try {
      return new Kanalizer(this, this.check(this.x.hz_kanalizer_new(b.p, b.n), "loadKanalizer"));
    } finally {
      this.free(b);
    }
  }
  loadTsqyomi(onnxBytes) {
    const b = this.put(onnxBytes);
    try {
      return new Tsqyomi(this, this.check(this.x.hz_tsq_new(b.p, b.n), "loadTsqyomi"));
    } finally {
      this.free(b);
    }
  }
}

class TTS {
  constructor(rt, h) {
    this.rt = rt;
    this.h = h;
  }
  /** encoded: {phoneIds, features[P][8], wordIds, wordFeatures[W][384]}, durations[P]. */
  acoustic(encoded, durations) {
    const rt = this.rt, P = encoded.phoneIds.length, W = encoded.wordFeatures.length;
    const flat = (rows) => (rows instanceof Float32Array ? rows : Float32Array.from(rows.flat()));
    const frames = rt.withBuffers(
      [Int32Array.from(encoded.phoneIds), flat(encoded.features), Int32Array.from(encoded.wordIds), flat(encoded.wordFeatures), Int32Array.from(durations)],
      (ids, feats, wids, wf, dur) => rt.x.hz_tts_acoustic(this.h, ids, P, feats, wids, wf, W, dur),
    );
    if (frames < 0) throw new Error("acoustic: " + rt.error());
    return frames;
  }
  vocode() {
    const n = this.rt.x.hz_tts_vocode(this.h);
    if (n < 0) throw new Error("vocoder: " + this.rt.error());
    return this.buffer(2);
  }
  setCondition(condition, f0) {
    const rt = this.rt;
    rt.withBuffers([condition, f0], (c, f) => rt.x.hz_tts_set_condition(this.h, c, f, f0.length));
  }
  /** 0 condition, 1 f0, 2 wave, 3 carrier, 4 gains */
  buffer(which) {
    const x = this.rt.x;
    return this.rt.f32(x.hz_tts_buf(this.h, which), x.hz_tts_buf_len(this.h, which));
  }
  synthesize(encoded, durations) {
    this.acoustic(encoded, durations);
    return this.vocode();
  }
  free() {
    this.rt.x.hz_tts_free(this.h);
  }
}

const KANA = ["<sos>", "<eos>", ..."ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヲンヴー"];
class Kanalizer {
  constructor(rt, h) {
    this.rt = rt;
    this.h = h;
  }
  ids(word, maxLength = 0) {
    const rt = this.rt;
    const n = rt.withBuffers([new TextEncoder().encode(word)], (p) => rt.x.hz_kanalizer_decode(this.h, p, new TextEncoder().encode(word).length, maxLength));
    return Array.from(new Int32Array(rt.mem, rt.x.hz_kanalizer_buf(this.h), n));
  }
  read(word) {
    return this.ids(word).map((i) => KANA[i]).join("");
  }
  free() {
    this.rt.x.hz_kanalizer_free(this.h);
  }
}

class Tsqyomi {
  constructor(rt, h) {
    this.rt = rt;
    this.h = h;
    this.classes = rt.x.hz_tsq_classes(h);
  }
  /** ids: number[]; masks: boolean[][] (targets x N). Returns {logits, hidden}. */
  run(ids, masks) {
    const rt = this.rt, n = ids.length, t = masks.length;
    const r = rt.withBuffers([Int32Array.from(ids), Uint8Array.from(masks.flat(), Number)], (i, m) => rt.x.hz_tsq_run(this.h, i, n, m, t));
    if (r < 0) throw new Error("tsqyomi: " + rt.error());
    return {
      logits: rt.f32(rt.x.hz_tsq_logits(this.h), t * this.classes),
      hidden: rt.f32(rt.x.hz_tsq_hidden(this.h), n * 384),
    };
  }
  free() {
    this.rt.x.hz_tsq_free(this.h);
  }
}
