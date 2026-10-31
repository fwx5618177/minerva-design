// Process-wide icon defaults: icon canvases and canvas icons whose renderer
// is unset or "auto" use the backend preference set here, so an app can
// switch them all between WebGPU, WebGL2, WebGL and Canvas2D in one place.

import type { IconRendererPreference } from "./types";

type RendererListener = (preference: IconRendererPreference) => void;

interface DefaultsState {
  renderer: IconRendererPreference;
  listeners: Set<RendererListener>;
}

// on globalThis so every copy of the package on a page shares the default
const KEY = Symbol.for("minerva-design.icons.defaults");

/**
 * Lets a page choose the default before the package loads:
 * `globalThis[Symbol.for("minerva-design.icons.defaultRenderer")] = "webgl2"`.
 * Read once, when the first copy creates the shared state; afterwards use
 * `setDefaultIconRenderer`. Invalid values mean "auto".
 */
const SEED = Symbol.for("minerva-design.icons.defaultRenderer");

/** Every renderer preference, "auto" first */
export const ICON_RENDERER_PREFERENCES: readonly IconRendererPreference[] = [
  "auto",
  "webgpu",
  "webgl2",
  "webgl",
  "canvas2d",
];

const state = (): DefaultsState => {
  const host = globalThis as unknown as Record<symbol, unknown>;
  let current = host[KEY] as DefaultsState | undefined;
  if (!current) {
    const seed = host[SEED];
    current = {
      renderer:
        ICON_RENDERER_PREFERENCES.find((option) => option === seed) ?? "auto",
      listeners: new Set(),
    };
    host[KEY] = current;
  }
  return current;
};

/**
 * Sets the backend of icon canvases with `renderer` unset or "auto"; mounted
 * ones switch live. "auto" restores the WebGPU -> WebGL2 -> WebGL -> Canvas2D
 * detection. SVG icons are not affected.
 */
export const setDefaultIconRenderer = (
  preference: IconRendererPreference,
): void => {
  const next = ICON_RENDERER_PREFERENCES.includes(preference)
    ? preference
    : "auto";
  const current = state();
  if (current.renderer === next) return;
  current.renderer = next;
  for (const listener of [...current.listeners]) {
    try {
      listener(next);
    } catch (error) {
      queueMicrotask(() => {
        throw error;
      });
    }
  }
};

/** The backend preference canvases with `renderer: "auto"` start from */
export const getDefaultIconRenderer = (): IconRendererPreference =>
  state().renderer;

/** Calls `listener` whenever the default renderer changes; returns an unsubscribe function */
export const subscribeDefaultIconRenderer = (
  listener: RendererListener,
): (() => void) => {
  const { listeners } = state();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

/** The preference actually used: the canvas' own, else the global default */
export const resolveIconRenderer = (
  preference: IconRendererPreference | undefined,
): IconRendererPreference =>
  !preference || preference === "auto" ? getDefaultIconRenderer() : preference;
