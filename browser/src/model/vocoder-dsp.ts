import { Tensor, clamp } from "./tensor";
import { fftPlan } from "./fft";
function search(values: Float64Array, value: number, right = false) {
  let lo = 0,
    hi = values.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (values[mid] < value || (right && values[mid] === value)) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}
export function events(cycles: Float64Array) {
  const groups = new Map<
    number,
    { center: number; start: number; cycle: number }[]
  >();
  const invert = (value: number) => {
    if (value < cycles[0]) return (value - cycles[0]) / (cycles[1] - cycles[0]);
    if (value > cycles[cycles.length - 1])
      return (
        cycles.length -
        1 +
        (value - cycles[cycles.length - 1]) /
          (cycles[cycles.length - 1] - cycles[cycles.length - 2])
      );
    const right = search(cycles, value);
    return right === 0
      ? 0
      : right -
          1 +
          (value - cycles[right - 1]) / (cycles[right] - cycles[right - 1]);
  };
  for (
    let cycle = Math.floor(cycles[0]);
    cycle <= Math.ceil(cycles[cycles.length - 1]);
    cycle++
  ) {
    const lo = search(cycles, cycle - 1, true),
      hi = search(cycles, cycle + 1);
    if (hi <= lo) continue;
    const n = 2 ** Math.ceil(Math.log2(Math.max(1024, hi - lo))),
      start = Math.floor((lo + hi) / 2) - n / 2;
    const rows = groups.get(n) ?? [];
    rows.push({ center: invert(cycle), start, cycle });
    groups.set(n, rows);
  }
  return groups;
}

export function noise(samples: number) {
  const output = new Float32Array(samples);
  for (let i = 0; i < samples; i++) {
    const index = i + 1,
      a = Math.sin(index * 12.9898) * 43758.5453,
      b = Math.sin(index * 78.233) * 12345.6789;
    output[i] =
      Math.sqrt(-2 * Math.log(clamp(a - Math.floor(a), 1e-6, 1 - 1e-6))) *
      Math.cos(2 * Math.PI * (b - Math.floor(b)));
  }
  return output;
}
export function upsample(f0: Float32Array, factor: number) {
  const output = new Float32Array(f0.length * factor);
  for (let i = 0; i < output.length; i++) {
    const p = clamp((i + 0.5) / factor - 0.5, 0, f0.length - 1),
      lo = Math.floor(p),
      hi = Math.min(lo + 1, f0.length - 1),
      a = Math.fround(p - lo);
    output[i] =
      Math.fround(f0[lo] * Math.fround(1 - a)) + Math.fround(f0[hi] * a);
  }
  return output;
}
export function excitation(f0: Tensor) {
  const length = f0.rows * 256,
    sampleF0 = upsample(f0.data, 256),
    cycles = new Float64Array(length),
    harmonic = new Float32Array(length),
    nz = noise(length),
    source = new Float32Array(length);
  let cycle = 0.371;
  for (let i = 0; i < length; i++) {
    cycle += Math.fround(sampleF0[i] / 22050);
    cycles[i] = cycle;
    const phase = Math.fround((2 * Math.PI * cycle) % (2 * Math.PI));
    let sum = 0,
      power = 0;
    for (let k = 1; k <= 64; k++) {
      if (k * sampleF0[i] >= 11025) continue;
      const weight = Math.fround(1 / k);
      sum = Math.fround(
        sum + Math.fround(weight * Math.sin(Math.fround(k * phase))),
      );
      power = Math.fround(power + Math.fround(weight * weight));
    }
    harmonic[i] = sum * Math.sqrt(2 / Math.max(power, 1e-8));
    source[i] = 0.1 * harmonic[i] + 0.01 * nz[i];
  }
  return { cycles, harmonic, noise: nz, source };
}
type Excitation = ReturnType<typeof excitation>;

// Double coefficients preserve the original window-product rounding. Event
// windows depend on pitch and are still recomputed for each event.
const carrierHann = Float64Array.from(
  { length: 1024 },
  (_, j) => 0.5 - 0.5 * Math.cos((2 * Math.PI * j) / 1024),
);

/** One event's buffers per FFT size, independent of utterance/event count. */
class Workspace {
  readonly transform;
  readonly frame: Float32Array;
  readonly rendered: Float32Array;
  readonly window: Float64Array;
  readonly harmonicReal: Float32Array;
  readonly harmonicImag: Float32Array;
  readonly noiseReal: Float32Array;
  readonly noiseImag: Float32Array;
  readonly harmonicGain: Float32Array;
  readonly noiseGain: Float32Array;
  readonly angle: Float32Array;
  constructor(readonly size: number) {
    this.transform = fftPlan(size);
    this.frame = new Float32Array(size);
    this.rendered = new Float32Array(size);
    this.window = new Float64Array(size);
    const bins = size / 2 + 1;
    this.harmonicReal = new Float32Array(bins);
    this.harmonicImag = new Float32Array(bins);
    this.noiseReal = new Float32Array(bins);
    this.noiseImag = new Float32Array(bins);
    this.harmonicGain = new Float32Array(bins);
    this.noiseGain = new Float32Array(bins);
    this.angle = new Float32Array(bins);
  }
}
function interpolate(
  values: Tensor,
  center: number,
  size: number,
  output: Float32Array,
) {
  const pos = clamp(Math.fround(center) / 256, 0, values.rows - 1),
    lo = Math.floor(pos),
    hi = Math.min(lo + 1, values.rows - 1),
    a = pos - lo;
  for (let k = 0; k < output.length; k++) {
    const freq = (k * 1024) / size,
      left = Math.floor(freq),
      right = Math.min(left + 1, 512),
      b = freq - left;
    const l = values.at(lo, left) * (1 - a) + values.at(hi, left) * a,
      h = values.at(lo, right) * (1 - a) + values.at(hi, right) * a;
    output[k] = l * (1 - b) + h * b;
  }
}

/** Used sequentially by the model's Worker. Returned audio owns its buffer. */
export class VocoderDSP {
  private readonly workspaces = new Map<number, Workspace>();
  private workspace(size: number) {
    let workspace = this.workspaces.get(size);
    if (!workspace) {
      workspace = new Workspace(size);
      this.workspaces.set(size, workspace);
    }
    return workspace;
  }
  carrier(source: Float32Array, frames: number) {
    const workspace = this.workspace(1024),
      { frame, transform, harmonicReal: real, harmonicImag: imag } = workspace;
    const output = new Tensor(frames, 513);
    for (let t = 0; t < frames; t++) {
      for (let j = 0; j < 1024; j++) {
        const index = t * 256 + j - 512;
        frame[j] =
          (index < 0 || index >= source.length ? 0 : source[index]) *
          carrierHann[j];
      }
      transform.forward(frame, real, imag);
      for (let k = 0; k < 513; k++) {
        // Keep the old float32 power boundaries before the log / neural network.
        const power = Math.fround(
          Math.fround(real[k] * real[k]) + Math.fround(imag[k] * imag[k]),
        );
        output.data[t * 513 + k] = Math.log(Math.max(Math.sqrt(power), 1e-5));
      }
    }
    return output;
  }
  render(
    source: Excitation,
    harmonicGain: Tensor,
    noiseGain: Tensor,
    phase: Tensor,
  ) {
    const { cycles, harmonic, noise } = source,
      length = cycles.length;
    const output = new Float32Array(length),
      denominator = new Float32Array(length);
    for (const [size, group] of events(cycles)) {
      const w = this.workspace(size),
        bins = size / 2 + 1;
      for (const event of group) {
        // The event window is pitch-dependent. Retain double precision for the
        // overlap denominator, and the original float32 boundary for signal samples.
        for (let j = 0; j < size; j++) {
          const index = event.start + j,
            valid = index >= 0 && index < length;
          const delta = valid ? cycles[index] - event.cycle : 2;
          w.window[j] =
            valid && Math.abs(delta) < 1
              ? Math.cos(Math.PI * 0.5 * delta) ** 2
              : 0;
          w.frame[j] = valid ? harmonic[index] * Math.fround(w.window[j]) : 0;
        }
        w.transform.forward(w.frame, w.harmonicReal, w.harmonicImag);
        for (let j = 0; j < size; j++) {
          const index = event.start + j;
          w.frame[j] =
            index >= 0 && index < length
              ? noise[index] * Math.fround(w.window[j])
              : 0;
        }
        w.transform.forward(w.frame, w.noiseReal, w.noiseImag);
        interpolate(harmonicGain, event.center, size, w.harmonicGain);
        interpolate(noiseGain, event.center, size, w.noiseGain);
        interpolate(phase, event.center, size, w.angle);
        for (let k = 0; k < bins; k++) {
          const real = Math.fround(
            Math.fround(w.harmonicReal[k] * w.harmonicGain[k]) +
              Math.fround(w.noiseReal[k] * w.noiseGain[k]),
          );
          const imag = Math.fround(
            Math.fround(w.harmonicImag[k] * w.harmonicGain[k]) +
              Math.fround(w.noiseImag[k] * w.noiseGain[k]),
          );
          const cosine = Math.fround(Math.cos(w.angle[k])),
            sine = Math.fround(Math.sin(w.angle[k]));
          // Reuse the harmonic buffers for the combined, phase-rotated spectrum.
          w.harmonicReal[k] =
            Math.fround(real * cosine) - Math.fround(imag * sine);
          w.harmonicImag[k] =
            k === 0 || k === bins - 1
              ? 0
              : Math.fround(real * sine) + Math.fround(imag * cosine);
        }
        w.transform.inverse(w.harmonicReal, w.harmonicImag, w.rendered);
        for (let j = 0; j < size; j++) {
          const index = event.start + j;
          if (index < 0 || index >= length) continue;
          output[index] += Math.fround(
            w.rendered[j] * Math.fround(w.window[j]),
          );
          denominator[index] += w.window[j] * w.window[j];
        }
      }
    }
    for (let i = 0; i < length; i++)
      output[i] /= Math.max(denominator[i], 1e-8);
    return output;
  }
}
