// Applies the saved docs renderer before any chart engine loads, from the app
// entry. Deliberately imports nothing from the charts so the engine stays out
// of the entry chunk: it seeds the engine's global default, which the first
// engine copy to load (on whatever page) starts from.

export const RENDERER_STORAGE_KEY = "minerva-docs-chart-renderer";

/** Read by the engine when it creates its shared defaults (see defaults.ts) */
export const RENDERER_SEED = Symbol.for(
  "minerva-design.charts.defaultRenderer",
);

/** Same for the canvas icons (minerva-design/icons, see its defaults.ts) */
export const ICON_RENDERER_SEED = Symbol.for(
  "minerva-design.icons.defaultRenderer",
);

const BACKENDS = ["webgpu", "webgl2", "webgl", "canvas2d"];

/** Seeds the engine default with the stored renderer; returns it ("auto" if none) */
export const bootChartRenderer = (): string => {
  let stored: string | null = null;
  try {
    stored = localStorage.getItem(RENDERER_STORAGE_KEY);
  } catch {
    // storage unavailable (private mode): automatic detection
  }
  const preference = stored && BACKENDS.includes(stored) ? stored : "auto";
  const host = globalThis as unknown as Record<symbol, unknown>;
  host[RENDERER_SEED] = preference;
  host[ICON_RENDERER_SEED] = preference;
  return preference;
};
