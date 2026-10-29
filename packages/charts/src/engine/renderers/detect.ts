// Backend selection: WebGPU -> WebGL2 -> Canvas2D.

import type { ChartRendererKind, ChartRendererPreference } from "../types";
import { createCanvas2dRenderer } from "./canvas2d";
import type { ChartRenderer, RendererLostHandler } from "./types";
import { createWebGl2Renderer } from "./webgl2";
import { createWebGpuRenderer } from "./webgpu";

export const RENDERER_ORDER: readonly ChartRendererKind[] = [
  "webgpu",
  "webgl2",
  "canvas2d",
];

/** Backends to try for a preference, best first */
export const rendererCandidates = (
  preference: ChartRendererPreference,
  exclude: ReadonlySet<ChartRendererKind> = new Set(),
): ChartRendererKind[] => {
  const start = preference === "auto" ? 0 : RENDERER_ORDER.indexOf(preference);
  return RENDERER_ORDER.slice(Math.max(0, start)).filter(
    (k) => !exclude.has(k),
  );
};

const create = async (
  kind: ChartRendererKind,
  canvas: HTMLCanvasElement,
  onLost: RendererLostHandler,
  requireHardware: boolean,
): Promise<ChartRenderer | null> => {
  switch (kind) {
    case "webgpu":
      return createWebGpuRenderer(canvas, onLost, requireHardware);
    case "webgl2":
      return createWebGl2Renderer(canvas, onLost, requireHardware);
    default:
      return createCanvas2dRenderer(canvas);
  }
};

/**
 * Creates the first backend that works. A canvas only ever gets one kind
 * of context, so every attempt uses a fresh canvas from `makeCanvas`.
 * With `auto`, GPU backends running in software (no hardware acceleration)
 * are skipped: the decimating Canvas2D backend is much faster there.
 */
export const createRenderer = async (
  preference: ChartRendererPreference,
  makeCanvas: () => HTMLCanvasElement,
  onLost: (kind: ChartRendererKind) => void,
  exclude?: ReadonlySet<ChartRendererKind>,
): Promise<ChartRenderer | null> => {
  for (const kind of rendererCandidates(preference, exclude)) {
    let renderer: ChartRenderer | null;
    try {
      renderer = await create(
        kind,
        makeCanvas(),
        () => onLost(kind),
        preference === "auto" || preference !== kind,
      );
    } catch {
      renderer = null;
    }
    if (renderer) return renderer;
  }
  return null;
};
