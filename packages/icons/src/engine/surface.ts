// createIconSurface: single icons on their own small <canvas>, drawn by a GPU
// backend shared by the whole page. Browsers cap the live WebGL contexts
// (about 16), so a context per icon is not an option: every frame, the icons
// that changed are packed into an atlas, drawn by one backend per renderer
// preference in one pass, then copied into their canvases (drawImage).
// Canvas2D draws straight into each canvas.

import { drawIcon } from "./canvas2d";
import { resolveColor } from "./color";
import { subscribeDefaultIconRenderer } from "./defaults";
import { cssColor } from "./renderers/canvas2d";
import { createIconBackend } from "./renderers/detect";
import type { FrameItem, IconBackend } from "./renderers/types";
import { observeTheme } from "./theme";
import type {
  IconRendererKind,
  IconRendererPreference,
  IconSurface,
  IconSurfaceOptions,
} from "./types";

/** Atlas side in device pixels (a WebGL canvas of 2048² is safe everywhere) */
const ATLAS = 2048;
/** Empty pixels around each icon of the atlas (MSAA bleeds a little) */
const GAP = 2;
/** A pool without icons keeps its backend this long (remounts, route changes) */
const IDLE_MS = 2000;

interface SurfaceState {
  canvas: HTMLCanvasElement;
  options: IconSurfaceOptions;
  pool: Pool;
  reported: IconRendererKind | null;
}

interface Pool {
  preference: IconRendererPreference;
  surfaces: Set<SurfaceState>;
  dirty: Set<SurfaceState>;
  backend: IconBackend | null;
  generation: number;
  exclude: Set<IconRendererKind>;
  losses: Map<IconRendererKind, number>;
  unfollow: () => void;
  idle: ReturnType<typeof setTimeout> | null;
}

const pools = new Map<IconRendererPreference, Pool>();
let frame: number | ReturnType<typeof setTimeout> | null = null;
let unwatchTheme: (() => void) | null = null;

const ratioOf = (state: SurfaceState) =>
  state.options.pixelRatio ??
  (typeof devicePixelRatio === "number" ? devicePixelRatio : 1);

const pixelsOf = (state: SurfaceState) =>
  Math.max(1, Math.round((state.options.size ?? 24) * ratioOf(state)));

const schedule = () => {
  if (frame !== null) return;
  frame =
    typeof requestAnimationFrame === "function"
      ? requestAnimationFrame(flush)
      : setTimeout(flush, 16);
};

const markAll = () => {
  for (const pool of pools.values()) {
    for (const state of pool.surfaces) pool.dirty.add(state);
  }
  schedule();
};

const report = (state: SurfaceState, kind: IconRendererKind) => {
  state.canvas.dataset.renderer = kind;
  if (state.reported !== kind) {
    state.reported = kind;
    state.options.onRendererChange?.(kind);
  }
};

const itemOf = (state: SurfaceState, x: number, y: number): FrameItem => {
  const { icon, color, strokeWidth = 2, opacity = 1 } = state.options;
  const rgba = resolveColor(color, state.canvas);
  return {
    icon,
    x,
    y,
    size: pixelsOf(state),
    rotation: 0,
    strokeWidth,
    color: [
      rgba[0],
      rgba[1],
      rgba[2],
      rgba[3] * Math.min(1, Math.max(0, opacity)),
    ],
  };
};

const context2d = (canvas: HTMLCanvasElement, pixels: number) => {
  if (canvas.width !== pixels) canvas.width = pixels;
  if (canvas.height !== pixels) canvas.height = pixels;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, pixels, pixels);
  return ctx;
};

const drawDirect = (state: SurfaceState) => {
  const pixels = pixelsOf(state);
  const ctx = context2d(state.canvas, pixels);
  if (!ctx) return;
  const item = itemOf(state, 0, 0);
  drawIcon(ctx, item.icon, {
    size: pixels,
    strokeWidth: item.strokeWidth,
    color: cssColor(item.color),
  });
};

/** Draws a batch on the shared backend and copies each icon to its canvas */
const drawAtlas = (
  backend: IconBackend,
  batch: { state: SurfaceState; x: number; y: number; pixels: number }[],
  width: number,
  height: number,
) => {
  backend.render({
    width,
    height,
    dpr: 1,
    items: batch.map(({ state, x, y }) => itemOf(state, x, y)),
  });
  for (const { state, x, y, pixels } of batch) {
    const ctx = context2d(state.canvas, pixels);
    ctx?.drawImage(backend.canvas, x, y, pixels, pixels, 0, 0, pixels, pixels);
  }
};

const flushPool = (pool: Pool) => {
  const { backend } = pool;
  if (!backend || !pool.dirty.size) return;
  const states = [...pool.dirty];
  pool.dirty.clear();
  if (backend.kind === "canvas2d") {
    for (const state of states) {
      drawDirect(state);
      report(state, "canvas2d");
    }
    return;
  }
  // shelf packing, tallest first so rows stay dense
  const sized = states
    .map((state) => ({ state, pixels: pixelsOf(state) }))
    .sort((a, b) => b.pixels - a.pixels);
  let batch: { state: SurfaceState; x: number; y: number; pixels: number }[] =
    [];
  let x = 0;
  let y = 0;
  let row = 0;
  let width = 0;
  const flushBatch = () => {
    // rounded up so the shared canvas is not reallocated every frame
    const round = (v: number) => Math.min(ATLAS, Math.ceil(v / 256) * 256);
    if (batch.length) drawAtlas(backend, batch, round(width), round(y + row));
    batch = [];
    x = y = row = width = 0;
  };
  for (const { state, pixels } of sized) {
    const cell = pixels + GAP * 2;
    if (cell > ATLAS) {
      // larger than the atlas: Canvas2D for this one
      drawDirect(state);
      report(state, backend.kind);
      continue;
    }
    if (x + cell > ATLAS) {
      x = 0;
      y += row;
      row = 0;
    }
    if (y + cell > ATLAS) flushBatch();
    batch.push({ state, x: x + GAP, y: y + GAP, pixels });
    x += cell;
    row = Math.max(row, cell);
    width = Math.max(width, x);
    report(state, backend.kind);
  }
  flushBatch();
};

function flush() {
  frame = null;
  for (const pool of pools.values()) flushPool(pool);
}

const startPool = (pool: Pool) => {
  const token = ++pool.generation;
  const onLost = (kind: IconRendererKind) => {
    if (pool.backend?.kind !== kind) return;
    const count = (pool.losses.get(kind) ?? 0) + 1;
    pool.losses.set(kind, count);
    if (count >= 2) pool.exclude.add(kind);
    startPool(pool);
  };
  void createIconBackend(
    pool.preference,
    () => document.createElement("canvas"),
    onLost,
    pool.exclude,
  ).then((next) => {
    if (token !== pool.generation || pools.get(pool.preference) !== pool) {
      next?.destroy();
      return;
    }
    pool.backend?.destroy();
    pool.backend = next;
    for (const state of pool.surfaces) pool.dirty.add(state);
    schedule();
  });
};

const poolFor = (preference: IconRendererPreference): Pool => {
  let pool = pools.get(preference);
  if (!pool) {
    const created: Pool = {
      preference,
      surfaces: new Set(),
      dirty: new Set(),
      backend: null,
      generation: 0,
      exclude: new Set(),
      losses: new Map(),
      // "auto" follows the global default
      unfollow:
        preference === "auto"
          ? subscribeDefaultIconRenderer(() => startPool(created))
          : () => {},
      idle: null,
    };
    pool = created;
    pools.set(preference, pool);
    unwatchTheme ??= observeTheme(markAll);
    startPool(pool);
  }
  if (pool.idle) {
    clearTimeout(pool.idle);
    pool.idle = null;
  }
  return pool;
};

const leave = (state: SurfaceState) => {
  const { pool } = state;
  pool.surfaces.delete(state);
  pool.dirty.delete(state);
  if (pool.surfaces.size || pool.idle) return;
  pool.idle = setTimeout(() => {
    pool.idle = null;
    if (pool.surfaces.size) return;
    pools.delete(pool.preference);
    pool.generation++;
    pool.unfollow();
    pool.backend?.destroy();
    pool.backend = null;
    if (!pools.size) {
      unwatchTheme?.();
      unwatchTheme = null;
    }
  }, IDLE_MS);
};

/**
 * Draws one icon into `canvas` (sized `size` × pixel ratio; give it its CSS
 * size yourself) with a GPU backend shared by every surface of the page, or
 * Canvas2D. The canvas gets `data-renderer` with the backend that drew it.
 */
export function createIconSurface(
  canvas: HTMLCanvasElement,
  options: IconSurfaceOptions,
): IconSurface {
  const preference = options.renderer ?? "auto";
  const state: SurfaceState = {
    canvas,
    options,
    pool: poolFor(preference),
    reported: null,
  };
  state.pool.surfaces.add(state);
  state.pool.dirty.add(state);
  schedule();
  let destroyed = false;
  return {
    get renderer() {
      return state.reported;
    },
    update(next) {
      if (destroyed) return;
      const nextPreference = next.renderer ?? "auto";
      state.options = next;
      if (nextPreference !== state.pool.preference) {
        leave(state);
        state.pool = poolFor(nextPreference);
        state.pool.surfaces.add(state);
      }
      state.pool.dirty.add(state);
      schedule();
    },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      leave(state);
    },
  };
}
