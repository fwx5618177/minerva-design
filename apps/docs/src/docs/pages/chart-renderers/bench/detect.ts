// What the browser offers for each backend: the GPU behind it, the API
// version and a few limits. Every probe releases its context right away
// (browsers cap the live WebGL contexts of a page).
import type { ChartRendererKind } from "minerva-design/charts";

export interface BackendDetails {
  /** GPU (or driver) name, when the browser exposes it */
  device: string | null;
  /** API and shading language versions */
  version: string | null;
  /** Largest 2D texture, in pixels */
  maxTexture: number | null;
  /** WebGPU: largest buffer, in bytes */
  maxBuffer: number | null;
  /** WebGL 1: whether instancing (ANGLE_instanced_arrays) is there */
  instancing: boolean | null;
}

const empty: BackendDetails = {
  device: null,
  version: null,
  maxTexture: null,
  maxBuffer: null,
  instancing: null,
};

const glDetails = (kind: "webgl2" | "webgl"): BackendDetails | null => {
  let gl: WebGLRenderingContext | WebGL2RenderingContext | null;
  try {
    const canvas = document.createElement("canvas");
    gl =
      kind === "webgl2"
        ? canvas.getContext("webgl2")
        : canvas.getContext("webgl");
  } catch {
    gl = null;
  }
  if (!gl) return null;
  const info = gl.getExtension("WEBGL_debug_renderer_info");
  const device: unknown = info
    ? gl.getParameter(info.UNMASKED_RENDERER_WEBGL)
    : gl.getParameter(gl.RENDERER);
  const details: BackendDetails = {
    ...empty,
    device: device ? String(device) : null,
    version: `${String(gl.getParameter(gl.VERSION))} · ${String(
      gl.getParameter(gl.SHADING_LANGUAGE_VERSION),
    )}`,
    maxTexture: Number(gl.getParameter(gl.MAX_TEXTURE_SIZE)) || null,
    instancing:
      kind === "webgl" ? !!gl.getExtension("ANGLE_instanced_arrays") : true,
  };
  gl.getExtension("WEBGL_lose_context")?.loseContext();
  return details;
};

interface Adapter {
  info?: { vendor?: string; architecture?: string; description?: string };
  limits?: { maxTextureDimension2D?: number; maxBufferSize?: number };
}

const webGpuDetails = async (): Promise<BackendDetails | null> => {
  const gpu = (
    navigator as Navigator & {
      gpu?: { requestAdapter: () => Promise<Adapter | null> };
    }
  ).gpu;
  if (!gpu) return null;
  let adapter: Adapter | null;
  try {
    adapter = await gpu.requestAdapter();
  } catch {
    adapter = null;
  }
  if (!adapter) return null;
  const { vendor, architecture, description } = adapter.info ?? {};
  const name = [vendor, architecture].filter(Boolean).join(" · ");
  return {
    ...empty,
    device: description || name || null,
    version: "WebGPU · WGSL",
    maxTexture: adapter.limits?.maxTextureDimension2D ?? null,
    maxBuffer: adapter.limits?.maxBufferSize ?? null,
  };
};

export type DetailsByBackend = Record<ChartRendererKind, BackendDetails | null>;

let probed: Promise<DetailsByBackend> | null = null;

/** Details of every backend (null: it cannot start here), probed once */
export const probeDetails = (): Promise<DetailsByBackend> => {
  if (!probed) {
    probed = webGpuDetails().then((webgpu) => ({
      webgpu,
      webgl2: glDetails("webgl2"),
      webgl: glDetails("webgl"),
      canvas2d: { ...empty, version: "CanvasRenderingContext2D" },
    }));
  }
  return probed;
};
