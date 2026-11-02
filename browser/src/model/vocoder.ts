import { Tensor } from "./tensor";
import { ort, floatTensor } from "../onnx/session";
import { excitation, VocoderDSP } from "./vocoder-dsp";
export { fft, ifft } from "./fft";
export { noise, upsample, events } from "./vocoder-dsp";

export class Vocoder {
  private readonly dsp = new VocoderDSP();
  constructor(readonly session: ort.InferenceSession) {}
  async forward(condition: Tensor, f0: Tensor) {
    const source = excitation(f0),
      carrier = this.dsp.carrier(source.source, f0.rows + 1);
    const feeds = {
      condition: floatTensor(condition.data, [condition.rows, condition.cols]),
      carrier: floatTensor(carrier.data, [carrier.rows, carrier.cols]),
    };
    let result: ort.InferenceSession.ReturnType | undefined;
    try {
      result = await this.session.run(feeds);
      // Borrow ORT outputs for this synchronous DSP step; release them afterwards.
      const view = (name: string) =>
        Tensor.wrap(
          carrier.rows,
          513,
          result![name].data as Float32Array<ArrayBuffer>,
        );
      return this.dsp.render(
        source,
        view("harmonic_gain"),
        view("noise_gain"),
        view("phase"),
      );
    } finally {
      if (result) Object.values(result).forEach((t) => t.dispose());
      Object.values(feeds).forEach((t) => t.dispose());
    }
  }
}
