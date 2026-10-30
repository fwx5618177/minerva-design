// Backend selection of the 3D charts: WebGPU -> WebGL2 -> WebGL -> Canvas2D.

import { resolveRendererPreference } from "../defaults";
import type { ChartRendererKind, ChartRendererPreference } from "../types";
import { createCanvas2d3D } from "./canvas2d";
import type { Renderer3D } from "./render-types";
import { createWebGl3D } from "./webgl";
import { createWebGpu3D } from "./webgpu";

const ORDER: readonly ChartRendererKind[] = [
  "webgpu",
  "webgl2",
  "webgl",
  "canvas2d",
];

/** Backends to try for a preference, best first */
export const rendererCandidates3D = (
  preference: ChartRendererPreference,
  exclude: ReadonlySet<ChartRendererKind> = new Set(),
): ChartRendererKind[] => {
  const start = preference === "auto" ? 0 : ORDER.indexOf(preference);
  return ORDER.slice(Math.max(0, start)).filter((k) => !exclude.has(k));
};

const create = async (
  kind: ChartRendererKind,
  canvas: HTMLCanvasElement,
  onLost: () => void,
  requireHardware: boolean,
): Promise<Renderer3D | null> => {
  switch (kind) {
    case "webgpu":
      return createWebGpu3D(canvas, onLost, requireHardware);
    case "webgl2":
      return createWebGl3D(canvas, 2, onLost, requireHardware);
    case "webgl":
      return createWebGl3D(canvas, 1, onLost, requireHardware);
    default:
      return createCanvas2d3D(canvas);
  }
};

/**
 * Creates the first backend that works, on a fresh canvas for every
 * attempt (a canvas only ever gets one kind of context). Under `auto` and
 * when falling back from the preferred backend, GPUs running in software
 * are skipped: Canvas2D with decimation is faster there. `auto` starts
 * from the global default (`setDefaultChartRenderer`).
 */
export const createRenderer3D = async (
  requested: ChartRendererPreference,
  makeCanvas: () => HTMLCanvasElement,
  onLost: (kind: ChartRendererKind) => void,
  exclude?: ReadonlySet<ChartRendererKind>,
): Promise<Renderer3D | null> => {
  const preference = resolveRendererPreference(requested);
  for (const kind of rendererCandidates3D(preference, exclude)) {
    let renderer: Renderer3D | null;
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
