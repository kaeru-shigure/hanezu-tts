import * as ort from "onnxruntime-web/all";
import { packExternal } from "./external";
import {
  MATERIAL_ONNX_PACK_FILE,
  readMaterialOnnxPack,
  type MaterialOnnxPack,
} from "./material";
import { withTsqyomiContext } from "./tsqyomi";
export { ort };
export type ReadFile = (name: string) => Promise<Uint8Array<ArrayBuffer>>;
let configured = false;
export function configureRuntime() {
  if (configured) return;
  ort.env.wasm.numThreads = 1;
  ort.env.wasm.proxy = false; // The entire application pipeline already owns a Worker.
  configured = true;
}
async function createSession(
  model: Uint8Array<ArrayBuffer>,
  options: ort.InferenceSession.SessionOptions = {},
) {
  const errors: Error[] = [];
  // WebGL uses a different ORT backend. An EP list alone does not retry model
  // loading on that backend when WebGPU session creation fails.
  for (const provider of ["wasm"] as const) {
    try {
      return await ort.InferenceSession.create(model, {
        ...options,
        executionProviders: [provider],
        graphOptimizationLevel: "all",
      });
    } catch (cause) {
      errors.push(new Error(`${provider}: ${String(cause)}`, { cause }));
    }
  }
  throw new AggregateError(
    errors,
    `ONNX Runtime の初期化に失敗しました。\n${errors.map((e) => e.message).join("\n")}`,
  );
}
export function sessionLoader(read: ReadFile) {
  let materials: Promise<MaterialOnnxPack> | undefined;
  return async (name: string) => {
    if (name === "tsqyomi")
      return createSession(
        withTsqyomiContext(await read("tsqyomi/model.onnx")),
      );
    // Share one read/parse across this pipeline's sessions, including concurrent loads.
    materials ??= read(MATERIAL_ONNX_PACK_FILE).then(readMaterialOnnxPack);
    const model = (await materials).models.get(name);
    if (!model) throw new Error(`MaterialOnnxPack model not found: ${name}`);
    const { layout, graph } = model;
    // Rebuild external weights in Worker memory; persist only the originals.
    const data = packExternal(layout, await read(layout.source));
    return createSession(graph, {
      externalData: [{ path: layout.file, data }],
    });
  };
}
export const floatTensor = (data: ArrayLike<number>, dims: number[]) =>
  new ort.Tensor(
    "float32",
    data instanceof Float32Array ? data : Float32Array.from(data),
    dims,
  );
export const intTensor = (data: ArrayLike<number>, dims: number[]) =>
  new ort.Tensor("int64", BigInt64Array.from(data, BigInt), dims);
