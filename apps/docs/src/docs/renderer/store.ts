// The docs-wide chart renderer: persisted in localStorage and applied through
// the engine's global default, which every chart on the page reads (React,
// Vue, Angular and the Web Components share it, see setDefaultChartRenderer).
import { useSyncExternalStore } from "react";
import {
  getDefaultChartRenderer,
  setDefaultChartRenderer,
  subscribeDefaultChartRenderer,
  type ChartRendererPreference,
} from "minerva-design/charts/core";

export const RENDERER_STORAGE_KEY = "minerva-docs-chart-renderer";

export const RENDERER_OPTIONS: readonly ChartRendererPreference[] = [
  "auto",
  "webgpu",
  "webgl2",
  "webgl",
  "canvas2d",
];

export const parseRenderer = (
  value: string | null | undefined,
): ChartRendererPreference | null =>
  RENDERER_OPTIONS.find((option) => option === value) ?? null;

const readStored = (): ChartRendererPreference => {
  try {
    return parseRenderer(localStorage.getItem(RENDERER_STORAGE_KEY)) ?? "auto";
  } catch {
    return "auto";
  }
};

let restored = false;

/** Applies the stored choice once, before the first chart of the page starts */
export const restoreChartRenderer = () => {
  if (restored) return;
  restored = true;
  setDefaultChartRenderer(readStored());
};

/** Sets the renderer of every chart of the docs and remembers it */
export function setChartRenderer(next: ChartRendererPreference) {
  setDefaultChartRenderer(next);
  try {
    if (next === "auto") localStorage.removeItem(RENDERER_STORAGE_KEY);
    else localStorage.setItem(RENDERER_STORAGE_KEY, next);
  } catch {
    // storage unavailable (private mode): the choice lasts for this visit
  }
}

/** Forgets the restored state (tests) */
export const resetChartRenderer = () => {
  restored = false;
  setDefaultChartRenderer("auto");
};

const subscribe = (listener: () => void) => {
  const unsubscribe = subscribeDefaultChartRenderer(listener);
  // another tab changed it
  const onStorage = (event: StorageEvent) => {
    if (event.key === RENDERER_STORAGE_KEY) {
      setDefaultChartRenderer(parseRenderer(event.newValue) ?? "auto");
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    unsubscribe();
    window.removeEventListener("storage", onStorage);
  };
};

/** The docs-wide renderer (the engine's global default) */
export const useChartRenderer = (): ChartRendererPreference =>
  useSyncExternalStore(subscribe, getDefaultChartRenderer, () => "auto");
