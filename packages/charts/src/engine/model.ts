// Options -> chart model: normalized data, colors, bar layout and the full
// ranges of the axes. Pure (no DOM besides color resolution).

import { resolveColor, toCss, type Rgba } from "./color";
import {
  collectCategories,
  normalizeData,
  xResolver,
  type SeriesColumns,
} from "./data";
import { ensureSpan, niceDomain } from "./scale";
import { GridIndex } from "./spatial";
import type { ChartTheme } from "./theme";
import type {
  ChartAxisOptions,
  ChartAxisType,
  ChartOptions,
  ChartSeriesData,
  ChartSeriesType,
} from "./types";
import type { Range } from "./viewport";

export interface AxisModel {
  type: ChartAxisType;
  reverse: boolean;
  categories: string[];
  title?: string;
  format?: (value: number) => string;
  grid: boolean;
  visible: boolean;
  tickCount?: number;
}

export interface SeriesModel {
  index: number;
  /** Key of the GPU resources and of the data cache */
  key: string;
  id: string;
  name: string;
  type: ChartSeriesType;
  color: Rgba;
  colorCss: string;
  lineWidth: number;
  pointSize: number;
  opacity: number;
  hidden: boolean;
  showLabels: boolean;
  cols: SeriesColumns;
  /** Bars: x offset of the series inside a group and half of the bar width */
  barOffset: number;
  barHalfWidth: number;
  /** Bars: bottom / top of every bar (stacks included) */
  barBase: Float64Array | null;
  barTop: Float64Array | null;
  /** Scatter: resolved per-point colors */
  pointColors: (Rgba | undefined)[] | null;
}

export interface ChartModel {
  series: SeriesModel[];
  x: AxisModel;
  y: AxisModel;
  /** Full ranges (zoomed out) */
  base: { x: Range; y: Range };
  allScatter: boolean;
  zoom: { x: boolean; y: boolean };
  tooltipMode: "nearest" | "axis";
  /** Y value the areas are filled to */
  baseline: number;
  /** Smallest zoomed spans */
  minSpan: { x: number; y: number };
}

export interface DataCacheEntry {
  data: ChartSeriesData;
  resolverKey: string;
  cols: SeriesColumns;
}

export type DataCache = Map<string, DataCacheEntry>;

const firstX = (data: ChartSeriesData): unknown => {
  if (typeof data === "object" && data !== null && !("length" in data)) {
    const xs = (data as { x?: ArrayLike<unknown> }).x;
    return xs && xs.length ? xs[0] : undefined;
  }
  const list = data as ArrayLike<unknown>;
  for (let i = 0; i < Math.min(list.length, 8); i++) {
    const item = list[i];
    if (Array.isArray(item)) return item[0];
    if (item && typeof item === "object") return (item as { x?: unknown }).x;
  }
  return undefined;
};

/** Axis type when not given: dates -> time, strings -> category */
export const detectXType = (
  datas: readonly ChartSeriesData[],
): ChartAxisType => {
  for (const data of datas) {
    const x = firstX(data);
    if (x instanceof Date) return "time";
    if (typeof x === "string") return "category";
  }
  return "linear";
};

const axisModel = (
  options: ChartAxisOptions | undefined,
  type: ChartAxisType,
  categories: string[],
  gridDefault: boolean,
): AxisModel => ({
  type,
  reverse: !!options?.reverse,
  categories,
  title: options?.title,
  format: options?.format,
  grid: options?.grid ?? gridDefault,
  visible: options?.visible ?? true,
  tickCount: options?.tickCount,
});

const extent = (values: ArrayLike<number>): Range => {
  let min = Infinity;
  let max = -Infinity;
  for (let i = 0; i < values.length; i++) {
    const v = values[i];
    if (!Number.isFinite(v)) continue;
    if (v < min) min = v;
    if (v > max) max = v;
  }
  return [min, max];
};

/** Smallest positive gap between consecutive x values (bar width on numeric axes) */
const smallestStep = (cols: SeriesColumns[]): number => {
  let step = Infinity;
  for (const c of cols) {
    const xs = c.sorted ? c.x : Float64Array.from(c.x).sort();
    for (let i = 1; i < c.count; i++) {
      const d = xs[i] - xs[i - 1];
      if (d > 0 && d < step) step = d;
    }
  }
  return step;
};

export const buildModel = (
  options: ChartOptions,
  theme: ChartTheme,
  hidden: ReadonlySet<string>,
  cache: DataCache,
  element: Element | null,
): ChartModel => {
  const input = options.series;
  const datas = input.map((s) => s.data);
  const xType = options.xAxis?.type ?? detectXType(datas);
  const categories =
    xType === "category"
      ? [...(options.xAxis?.categories ?? collectCategories(datas))]
      : [];
  const categoryMap = new Map(categories.map((c, i) => [c, i]));
  const resolveX = xResolver(xType, (name) => categoryMap.get(name) ?? NaN);
  const resolverKey = `${xType}|${categories.join("\u0001")}`;

  const usedKeys = new Set<string>();
  const series: SeriesModel[] = input.map((s, index) => {
    let key = s.id ?? `#${index}`;
    while (usedKeys.has(key)) key += "'";
    usedKeys.add(key);
    let entry = cache.get(key);
    if (!entry || entry.data !== s.data || entry.resolverKey !== resolverKey) {
      entry = {
        data: s.data,
        resolverKey,
        cols: normalizeData(s.data, resolveX),
      };
      cache.set(key, entry);
    }
    const type = s.type ?? "line";
    const color = s.color
      ? resolveColor(
          s.color,
          element,
          theme.palette[index % theme.palette.length],
        )
      : theme.palette[index % theme.palette.length];
    const cols = entry.cols;
    let pointColors: (Rgba | undefined)[] | null = null;
    if (type === "scatter" && cols.colors) {
      const resolved = new Map<string, Rgba>();
      pointColors = cols.colors.map((c) => {
        if (c === undefined) return undefined;
        let rgba = resolved.get(c);
        if (!rgba) resolved.set(c, (rgba = resolveColor(c, element, color)));
        return rgba;
      });
    }
    const id = s.id ?? String(index);
    return {
      index,
      key,
      id,
      name: s.name ?? `Series ${index + 1}`,
      type,
      color,
      colorCss: toCss(color),
      lineWidth: s.lineWidth ?? 2,
      pointSize: s.pointSize ?? 8,
      opacity:
        s.opacity ?? (type === "area" ? 0.28 : type === "scatter" ? 0.78 : 1),
      hidden: !!s.hidden || hidden.has(id),
      showLabels: !!s.showLabels,
      cols,
      barOffset: 0,
      barHalfWidth: 0,
      barBase: null,
      barTop: null,
      pointColors,
    };
  });

  const visible = series.filter((s) => !s.hidden);
  const allScatter =
    series.length > 0 && series.every((s) => s.type === "scatter");

  // Bars: groups (one slot per stack) and stacking
  const bars = visible.filter((s) => s.type === "bar");
  const band =
    xType === "category"
      ? 1
      : (() => {
          const step = smallestStep(bars.map((s) => s.cols));
          return Number.isFinite(step) ? step : 1;
        })();
  if (bars.length) {
    const slots = new Map<string, number>();
    for (const s of bars) {
      const stack = input[s.index].stack ?? `\u0000${s.key}`;
      if (!slots.has(stack)) slots.set(stack, slots.size);
    }
    const group = band * (slots.size > 1 ? 0.78 : 0.62);
    const slotWidth = group / slots.size;
    const sums = new Map<string, Map<number, [number, number]>>();
    for (const s of bars) {
      const stack = input[s.index].stack ?? `\u0000${s.key}`;
      const slot = slots.get(stack) ?? 0;
      s.barOffset = -group / 2 + slotWidth * (slot + 0.5);
      s.barHalfWidth = (slotWidth / 2) * (slots.size > 1 ? 0.86 : 1);
      let totals = sums.get(stack);
      if (!totals) sums.set(stack, (totals = new Map()));
      const { x, y, count } = s.cols;
      s.barBase = new Float64Array(count);
      s.barTop = new Float64Array(count);
      for (let i = 0; i < count; i++) {
        const v = y[i];
        if (!Number.isFinite(v)) {
          s.barBase[i] = NaN;
          s.barTop[i] = NaN;
          continue;
        }
        const t = totals.get(x[i]) ?? [0, 0];
        const base = v >= 0 ? t[0] : t[1];
        s.barBase[i] = base;
        s.barTop[i] = base + v;
        if (v >= 0) t[0] += v;
        else t[1] += v;
        totals.set(x[i], t);
      }
    }
  }

  // X range
  const xOpts = options.xAxis;
  let xRange: Range;
  if (xType === "category") {
    xRange = [-0.5, Math.max(1, categories.length) - 0.5];
  } else {
    const values: number[] = [];
    for (const s of visible) {
      values.push(s.cols.xMin, s.cols.xMax);
      if (s.type === "bar") {
        values.push(s.cols.xMin - band / 2, s.cols.xMax + band / 2);
      }
    }
    xRange = ensureSpan(
      ...extent(values),
      xType === "time" ? [Date.now() - 86400000, Date.now()] : [0, 1],
    );
    if (allScatter) {
      const pad = (xRange[1] - xRange[0]) * 0.04;
      xRange = [xRange[0] - pad, xRange[1] + pad];
    }
    const nice = xOpts?.nice ?? (allScatter && xType === "linear");
    if (nice && xType === "linear") {
      xRange = niceDomain(xRange[0], xRange[1], xOpts?.tickCount ?? 6);
    }
  }
  if (xOpts?.min !== undefined) xRange[0] = xOpts.min;
  if (xOpts?.max !== undefined) xRange[1] = xOpts.max;
  xRange = ensureSpan(xRange[0], xRange[1]);

  // Y range
  const yOpts = options.yAxis;
  const yValues: number[] = [];
  for (const s of visible) {
    if (s.type === "bar" && s.barBase && s.barTop) {
      yValues.push(...extent(s.barBase), ...extent(s.barTop));
    } else {
      yValues.push(s.cols.yMin, s.cols.yMax);
    }
  }
  if (bars.length || yOpts?.zero) yValues.push(0);
  let yRange = ensureSpan(...extent(yValues));
  if (allScatter) {
    const pad = (yRange[1] - yRange[0]) * 0.06;
    yRange = [yRange[0] - pad, yRange[1] + pad];
  }
  if ((yOpts?.nice ?? true) && (yOpts?.type ?? "linear") === "linear") {
    yRange = niceDomain(yRange[0], yRange[1], yOpts?.tickCount ?? 5);
  }
  if (bars.length && !yOpts?.zero) {
    // bars start at zero: no padding below / above it
    if (yRange[0] < 0 && extent(yValues)[0] >= 0) yRange[0] = 0;
  }
  if (yOpts?.min !== undefined) yRange[0] = yOpts.min;
  if (yOpts?.max !== undefined) yRange[1] = yOpts.max;
  yRange = ensureSpan(yRange[0], yRange[1]);

  const zoomOption =
    options.interaction === false
      ? false
      : options.interaction === true || options.interaction === undefined
        ? true
        : (options.interaction.zoom ?? true);
  const zoomAxes =
    zoomOption === false
      ? { x: false, y: false }
      : zoomOption === true
        ? { x: true, y: allScatter }
        : { x: zoomOption.includes("x"), y: zoomOption.includes("y") };

  const tooltip =
    typeof options.tooltip === "object" ? options.tooltip : undefined;

  return {
    series,
    x: axisModel(xOpts, xType, categories, false),
    y: axisModel(yOpts, yOpts?.type === "time" ? "time" : "linear", [], true),
    base: { x: xRange, y: yRange },
    allScatter,
    zoom: zoomAxes,
    tooltipMode: tooltip?.mode ?? (allScatter ? "nearest" : "axis"),
    baseline: Math.min(Math.max(0, yRange[0]), yRange[1]),
    minSpan: {
      x: xType === "category" ? 1 : (xRange[1] - xRange[0]) * 1e-7,
      y: (yRange[1] - yRange[0]) * 1e-7,
    },
  };
};

const grids = new WeakMap<SeriesColumns, GridIndex>();

/** Spatial index of a scatter series, built on first use and kept with its data */
export const gridOf = (s: SeriesModel): GridIndex => {
  let grid = grids.get(s.cols);
  if (!grid) {
    grid = new GridIndex(s.cols.x, s.cols.y, s.cols.count);
    grids.set(s.cols, grid);
  }
  return grid;
};
