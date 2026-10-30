// What each forced backend would run on, probed before a benchmark: a GPU
// backend forced onto a software rasterizer (SwiftShader, llvmpipe… in VMs,
// CI and headless browsers) takes seconds per frame with a million points
// and would freeze the page.
import type { ChartRendererKind } from "minerva-design/charts/core";

/**
 * - `hardware`: the backend starts on a real GPU (Canvas2D always does)
 * - `software`: it would start on a software rasterizer
 * - `missing`: it cannot start; a forced chart falls back to the next
 *   hardware-accelerated backend, or to Canvas2D
 */
export type BackendSupport = "hardware" | "software" | "missing";

export type BackendsSupport = Record<ChartRendererKind, BackendSupport>;

/** Same test as the chart engine (renderers/gl.ts) */
const SOFTWARE_RENDERER =
  /swiftshader|llvmpipe|softpipe|software|basic render driver|microsoft basic/i;

const probeGl = (kind: "webgl2" | "webgl"): BackendSupport => {
  if (typeof document === "undefined") return "missing";
  let gl: WebGLRenderingContextBase | null;
  try {
    const canvas = document.createElement("canvas");
    gl =
      kind === "webgl2"
        ? canvas.getContext("webgl2")
        : canvas.getContext("webgl");
  } catch {
    gl = null;
  }
  if (!gl) return "missing";
  const info = gl.getExtension("WEBGL_debug_renderer_info");
  const name: unknown = info
    ? gl.getParameter(info.UNMASKED_RENDERER_WEBGL)
    : gl.getParameter(gl.RENDERER);
  // releases the context right away (browsers cap the live contexts)
  gl.getExtension("WEBGL_lose_context")?.loseContext();
  return SOFTWARE_RENDERER.test(String(name ?? "")) ? "software" : "hardware";
};

interface ProbedAdapter {
  isFallbackAdapter?: boolean;
  info?: {
    isFallbackAdapter?: boolean;
    vendor?: string;
    architecture?: string;
    description?: string;
  };
}

interface GpuNavigator {
  gpu?: { requestAdapter: () => Promise<ProbedAdapter | null> };
}

const probeWebGpu = async (): Promise<BackendSupport> => {
  const gpu =
    typeof navigator === "undefined"
      ? undefined
      : (navigator as GpuNavigator).gpu;
  if (!gpu) return "missing";
  let adapter: ProbedAdapter | null;
  try {
    adapter = await gpu.requestAdapter();
  } catch {
    adapter = null;
  }
  if (!adapter) return "missing";
  const info = adapter.info;
  const name = [info?.vendor, info?.architecture, info?.description].join(" ");
  return adapter.isFallbackAdapter ||
    info?.isFallbackAdapter ||
    SOFTWARE_RENDERER.test(name)
    ? "software"
    : "hardware";
};

let probed: Promise<BackendsSupport> | null = null;

/**
 * The backend `renderer: "auto"` starts on: the first hardware-accelerated
 * one (auto skips software GPUs), else Canvas2D
 */
export const autoPick = (support: BackendsSupport): ChartRendererKind =>
  (["webgpu", "webgl2", "webgl"] as const).find(
    (kind) => support[kind] === "hardware",
  ) ?? "canvas2d";

/** Probes the backends once per page load */
export const probeBackends = (): Promise<BackendsSupport> => {
  if (!probed) {
    probed = probeWebGpu().then((webgpu) => ({
      webgpu,
      webgl2: probeGl("webgl2"),
      webgl: probeGl("webgl"),
      canvas2d: "hardware" as const,
    }));
  }
  return probed;
};

/** Forgets the probe (tests) */
export const resetBackendsProbe = () => {
  probed = null;
};
