// Process-wide chart defaults. Charts whose `renderer` option is unset or
// "auto" use the default backend preference set here, so an app (or a docs
// site) can switch every chart between WebGPU, WebGL2, WebGL and Canvas2D
// in one place.

import type { ChartRendererPreference } from "./types";

type RendererListener = (preference: ChartRendererPreference) => void;

interface DefaultsState {
  renderer: ChartRendererPreference;
  listeners: Set<RendererListener>;
}

// Kept on globalThis so that every copy of the engine on a page (the React
// build, a Web Components bundle, ...) shares the same default.
const KEY = Symbol.for("minerva-design.charts.defaults");

/**
 * Lets a page choose the default before any copy of the engine has loaded
 * (e.g. a tiny boot script restoring a saved choice without importing the
 * charts): `globalThis[Symbol.for("minerva-design.charts.defaultRenderer")]
 * = "canvas2d"`. Read once, when the first engine copy creates the shared
 * state; afterwards use `setDefaultChartRenderer`. Invalid values mean "auto".
 */
const SEED = Symbol.for("minerva-design.charts.defaultRenderer");

const state = (): DefaultsState => {
  const host = globalThis as unknown as Record<symbol, unknown>;
  let current = host[KEY] as DefaultsState | undefined;
  if (!current) {
    const seed = host[SEED];
    current = {
      renderer: PREFERENCES.find((option) => option === seed) ?? "auto",
      listeners: new Set(),
    };
    host[KEY] = current;
  }
  return current;
};

const PREFERENCES: readonly ChartRendererPreference[] = [
  "auto",
  "webgpu",
  "webgl2",
  "webgl",
  "canvas2d",
];

/**
 * Sets the backend used by charts with `renderer` unset or "auto". Mounted
 * charts follow the change live (they recreate their renderer); charts with
 * an explicit backend are unaffected. "auto" restores the automatic
 * WebGPU -> WebGL2 -> WebGL -> Canvas2D detection.
 */
export const setDefaultChartRenderer = (
  preference: ChartRendererPreference,
): void => {
  const next = PREFERENCES.includes(preference) ? preference : "auto";
  const current = state();
  if (current.renderer === next) return;
  current.renderer = next;
  for (const listener of [...current.listeners]) {
    // a failing listener must not keep the others (other copies of the
    // engine, other frameworks) from hearing about the change
    try {
      listener(next);
    } catch (error) {
      queueMicrotask(() => {
        throw error;
      });
    }
  }
};

/** The backend preference charts with `renderer: "auto"` start from */
export const getDefaultChartRenderer = (): ChartRendererPreference =>
  state().renderer;

/** Calls `listener` whenever the default renderer changes; returns an unsubscribe function */
export const subscribeDefaultChartRenderer = (
  listener: RendererListener,
): (() => void) => {
  const { listeners } = state();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

/**
 * The preference a chart actually uses: its own, else the global default.
 * A backend forced through the default counts as forced (it may run on a
 * software GPU), exactly like a chart's own `renderer` option.
 */
export const resolveRendererPreference = (
  preference: ChartRendererPreference | undefined,
): ChartRendererPreference =>
  !preference || preference === "auto" ? getDefaultChartRenderer() : preference;
