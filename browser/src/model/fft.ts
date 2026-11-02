import { Tensor } from "./tensor";

/** In-place complex butterflies used by the half-size real transform. */
class ComplexPlan {
  readonly reversed: Uint32Array;
  readonly cosine: Float64Array;
  readonly sine: Float64Array;
  readonly real: Float64Array;
  readonly imag: Float64Array;
  constructor(readonly size: number) {
    this.reversed = new Uint32Array(size);
    for (let i = 1; i < size; i++)
      this.reversed[i] =
        (this.reversed[i >>> 1] >>> 1) | (i & 1 ? size >>> 1 : 0);
    this.cosine = Float64Array.from({ length: size / 2 }, (_, i) =>
      Math.cos((2 * Math.PI * i) / size),
    );
    this.sine = Float64Array.from({ length: size / 2 }, (_, i) =>
      Math.sin((2 * Math.PI * i) / size),
    );
    this.real = new Float64Array(size);
    this.imag = new Float64Array(size);
  }
  transform(inverse = false) {
    const { size, real, imag, cosine, sine } = this;
    for (let width = 2; width <= size; width *= 2) {
      const half = width / 2,
        step = size / width;
      for (let base = 0; base < size; base += width)
        for (let j = 0; j < half; j++) {
          const k = j * step,
            c = cosine[k],
            s = inverse ? sine[k] : -sine[k];
          const a = base + j,
            b = a + half,
            rr = real[b] * c - imag[b] * s,
            ii = real[b] * s + imag[b] * c;
          real[b] = real[a] - rr;
          imag[b] = imag[a] - ii;
          real[a] += rr;
          imag[a] += ii;
        }
    }
  }
}

/** Pack even/odd real samples into one N/2-point complex transform.
 * Hermitian reconstruction produces only the N/2+1 independent bins. The
 * inverse repacks those bins and returns interleaved even/odd samples, normalized
 * to the original amplitude. Workspaces and twiddles are reused per worker.
 * Calls are synchronous; a plan must not be used reentrantly. */
class RealPlan {
  private readonly complex: ComplexPlan;
  private readonly cosine: Float64Array;
  private readonly sine: Float64Array;
  constructor(readonly size: number) {
    if (size < 2 || !Number.isInteger(Math.log2(size)))
      throw new Error("FFT size must be a power of two");
    this.complex = new ComplexPlan(size / 2);
    this.cosine = Float64Array.from({ length: size / 2 }, (_, k) =>
      Math.cos((2 * Math.PI * k) / size),
    );
    this.sine = Float64Array.from({ length: size / 2 }, (_, k) =>
      Math.sin((2 * Math.PI * k) / size),
    );
  }
  forward(
    input: Float32Array,
    real: Float32Array,
    imag: Float32Array,
    inputOffset = 0,
    outputOffset = 0,
  ) {
    const p = this.complex,
      half = this.size / 2;
    for (let j = 0; j < half; j++) {
      const index = p.reversed[j];
      p.real[index] = input[inputOffset + 2 * j];
      p.imag[index] = input[inputOffset + 2 * j + 1];
    }
    p.transform();
    real[outputOffset] = p.real[0] + p.imag[0];
    imag[outputOffset] = 0;
    real[outputOffset + half] = p.real[0] - p.imag[0];
    imag[outputOffset + half] = 0;
    for (let k = 1; k < half; k++) {
      const mirror = half - k,
        c = this.cosine[k],
        s = this.sine[k];
      // E=(Z[k]+conj(Z[M-k]))/2; O=(Z[k]-conj(Z[M-k]))/(2i).
      const evenReal = (p.real[k] + p.real[mirror]) * 0.5;
      const evenImag = (p.imag[k] - p.imag[mirror]) * 0.5;
      const oddReal = (p.imag[k] + p.imag[mirror]) * 0.5;
      const oddImag = (p.real[mirror] - p.real[k]) * 0.5;
      real[outputOffset + k] = evenReal + c * oddReal + s * oddImag;
      imag[outputOffset + k] = evenImag + c * oddImag - s * oddReal;
    }
  }
  inverse(
    real: Float32Array,
    imag: Float32Array,
    output: Float32Array,
    inputOffset = 0,
    outputOffset = 0,
  ) {
    const p = this.complex,
      half = this.size / 2;
    p.real[0] = (real[inputOffset] + real[inputOffset + half]) * 0.5;
    p.imag[0] = (real[inputOffset] - real[inputOffset + half]) * 0.5;
    for (let k = 1; k < half; k++) {
      const mirror = half - k,
        index = p.reversed[k],
        c = this.cosine[k],
        s = this.sine[k];
      const evenReal =
        (real[inputOffset + k] + real[inputOffset + mirror]) * 0.5;
      const evenImag =
        (imag[inputOffset + k] - imag[inputOffset + mirror]) * 0.5;
      const differenceReal =
        (real[inputOffset + k] - real[inputOffset + mirror]) * 0.5;
      const differenceImag =
        (imag[inputOffset + k] + imag[inputOffset + mirror]) * 0.5;
      // Undo the twiddle, then pack Z=E+iO for the inverse complex transform.
      p.real[index] = evenReal - c * differenceImag - s * differenceReal;
      p.imag[index] = evenImag + c * differenceReal - s * differenceImag;
    }
    p.transform(true);
    for (let j = 0; j < half; j++) {
      output[outputOffset + 2 * j] = p.real[j] / half;
      output[outputOffset + 2 * j + 1] = p.imag[j] / half;
    }
  }
}
const plans = new Map<number, RealPlan>();
export function fftPlan(size: number) {
  let p = plans.get(size);
  if (!p) {
    p = new RealPlan(size);
    plans.set(size, p);
  }
  return p;
}
/** Allocating batch adapters for tests and callers that need retained output. */
export function fft(input: Tensor) {
  const p = fftPlan(input.cols),
    bins = input.cols / 2 + 1;
  const real = new Tensor(input.rows, bins),
    imag = new Tensor(input.rows, bins);
  for (let row = 0; row < input.rows; row++)
    p.forward(input.data, real.data, imag.data, row * input.cols, row * bins);
  return [real, imag] as const;
}
export function ifft(real: Tensor, imag: Tensor) {
  if (real.rows !== imag.rows || real.cols !== imag.cols)
    throw new Error("FFT component shape mismatch");
  const size = (real.cols - 1) * 2,
    p = fftPlan(size),
    output = new Tensor(real.rows, size);
  for (let row = 0; row < real.rows; row++)
    p.inverse(real.data, imag.data, output.data, row * real.cols, row * size);
  return output;
}
