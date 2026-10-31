// Backend selection: WebGPU -> WebGL2 -> WebGL -> Canvas2D.

import { resolveIconRenderer } from "../defaults";
import type { IconRendererKind, IconRendererPreference } from "../types";
import { createCanvas2dBackend } from "./canvas2d";
import { createGlBackend } from "./gl";
import type { BackendLostHandler, IconBackend } from "./types";
import { createWebGpuBackend } from "./webgpu";

/** Every backend, best first */
export const ICON_RENDERER_ORDER: readonly IconRendererKind[] = [
  "webgpu",
  "webgl2",
  "webgl",
  "canvas2d",
];

/** Backends to try for a preference, best first */
export const iconRendererCandidates = (
  preference: IconRendererPreference,
  exclude: ReadonlySet<IconRendererKind> = new Set(),
): IconRendererKind[] => {
  const start =
    preference === "auto" ? 0 : ICON_RENDERER_ORDER.indexOf(preference);
  return ICON_RENDERER_ORDER.slice(Math.max(0, start)).filter(
    (kind) => !exclude.has(kind),
  );
};

const create = async (
  kind: IconRendererKind,
  canvas: HTMLCanvasElement,
  onLost: BackendLostHandler,
  requireHardware: boolean,
): Promise<IconBackend | null> => {
  switch (kind) {
    case "webgpu":
      return createWebGpuBackend(canvas, onLost, requireHardware);
    case "webgl2":
      return createGlBackend(canvas, 2, onLost, requireHardware);
    case "webgl":
      return createGlBackend(canvas, 1, onLost, requireHardware);
    default:
      return createCanvas2dBackend(canvas);
  }
};

/**
 * Creates the first backend that starts, each attempt on a fresh canvas (a
 * canvas only ever gets one kind of context). With "auto", GPU backends
 * running in software are skipped (Canvas2D is faster there); a forced
 * backend may run in software, the ones after it may not.
 */
export async function createIconBackend(
  requested: IconRendererPreference | undefined,
  makeCanvas: () => HTMLCanvasElement,
  onLost: (kind: IconRendererKind) => void,
  exclude?: ReadonlySet<IconRendererKind>,
): Promise<IconBackend | null> {
  const preference = resolveIconRenderer(requested);
  for (const kind of iconRendererCandidates(preference, exclude)) {
    let backend: IconBackend | null;
    try {
      backend = await create(
        kind,
        makeCanvas(),
        () => onLost(kind),
        preference !== kind,
      );
    } catch {
      backend = null;
    }
    if (backend) return backend;
  }
  return null;
}
