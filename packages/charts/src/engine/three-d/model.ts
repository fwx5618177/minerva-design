// Options -> model: data columns (cached per data object), axis domains,
// ticks and the world mapping of the 3D charts. The box spans
// [-half, half] on every axis; the largest side is 2 world units.

import { ensureSpan, linearTicks, niceDomain, tickStep } from "../scale";
import { locale3D, type Locale3D } from "./labels";
import type {
  Bar3DDatum,
  Bar3DSeries,
  Chart3DAxisOptions,
  Chart3DColorBy,
  Chart3DColumnData,
  Chart3DOptions,
  Chart3DPoint,
  Chart3DPointData,
  Chart3DSeries,
  Chart3DSeriesType,
  Line3DSeries,
  Scatter3DSeries,
  Surface3DData,
  Surface3DSeries,
} from "./types";

export type AxisKey = "x" | "y" | "z";

export interface Extent {
  min: number;
  max: number;
}

const emptyExtent = (): Extent => ({ min: Infinity, max: -Infinity });

const extentOf = (values: ArrayLike<number>, count = values.length) => {
  let min = Infinity;
  let max = -Infinity;
  for (let i = 0; i < count; i++) {
    const v = values[i];
    if (v < min) min = v;
    if (v > max) max = v;
  }
  return { min, max };
};

const merge = (target: Extent, other: Extent) => {
  if (other.min < target.min) target.min = other.min;
  if (other.max > target.max) target.max = other.max;
};

// ------------------------------------------------------------------ points

/** Columns of a scatter / line series */
export interface PointColumns {
  count: number;
  x: ArrayLike<number>;
  y: ArrayLike<number>;
  z: ArrayLike<number>;
  size: ArrayLike<number> | null;
  value: ArrayLike<number> | null;
  colors: readonly (string | undefined)[] | null;
  labels: readonly (string | undefined)[] | null;
  extent: Record<AxisKey | "value", Extent>;
}

const isColumns = (data: Chart3DPointData): data is Chart3DColumnData =>
  !Array.isArray(data) &&
  typeof (data as Chart3DColumnData).x === "object" &&
  (data as Chart3DColumnData).x !== null;

const pointCache = new WeakMap<object, PointColumns>();

/** Columns of points written as objects, tuples or columns (cached per data object) */
export const pointColumns = (data: Chart3DPointData): PointColumns => {
  const cached = pointCache.get(data);
  if (cached) return cached;
  let columns: Omit<PointColumns, "extent">;
  if (isColumns(data)) {
    const count = Math.min(data.x.length, data.y.length, data.z.length);
    columns = {
      count,
      x: data.x,
      y: data.y,
      z: data.z,
      size: data.size ?? null,
      value: data.value ?? null,
      colors: null,
      labels: data.label ?? null,
    };
  } else {
    const list = data as readonly (
      Chart3DPoint | readonly [number, number, number]
    )[];
    const count = list.length;
    const x = new Float64Array(count);
    const y = new Float64Array(count);
    const z = new Float64Array(count);
    let size: Float32Array | null = null;
    let value: Float64Array | null = null;
    let colors: (string | undefined)[] | null = null;
    let labels: (string | undefined)[] | null = null;
    for (let i = 0; i < count; i++) {
      const item = list[i];
      if (Array.isArray(item)) {
        const tuple = item as readonly [number, number, number];
        x[i] = tuple[0] ?? NaN;
        y[i] = tuple[1] ?? NaN;
        z[i] = tuple[2] ?? NaN;
        continue;
      }
      const point = item as Chart3DPoint;
      x[i] = point.x;
      y[i] = point.y;
      z[i] = point.z;
      if (point.size !== undefined) {
        size ??= new Float32Array(count).fill(NaN);
        size[i] = point.size;
      }
      if (point.value !== undefined) {
        value ??= new Float64Array(count).fill(NaN);
        value[i] = point.value;
      }
      if (point.color !== undefined) {
        colors ??= new Array<string | undefined>(count);
        colors[i] = point.color;
      }
      if (point.label !== undefined) {
        labels ??= new Array<string | undefined>(count);
        labels[i] = point.label;
      }
    }
    columns = { count, x, y, z, size, value, colors, labels };
  }
  const result: PointColumns = {
    ...columns,
    extent: {
      x: extentOf(columns.x, columns.count),
      y: extentOf(columns.y, columns.count),
      z: extentOf(columns.z, columns.count),
      value: columns.value
        ? extentOf(columns.value, columns.count)
        : emptyExtent(),
    },
  };
  pointCache.set(data, result);
  return result;
};

// ----------------------------------------------------------------- surface

/** A surface grid with its coordinates */
export interface SurfaceGrid {
  rows: number;
  cols: number;
  z: ArrayLike<number>;
  x: ArrayLike<number>;
  y: ArrayLike<number>;
  value: ArrayLike<number> | null;
  extent: Record<AxisKey | "value", Extent>;
}

const gridCache = new WeakMap<object, SurfaceGrid>();

const indices = (count: number) => {
  const out = new Float64Array(count);
  for (let i = 0; i < count; i++) out[i] = i;
  return out;
};

export const surfaceGrid = (data: Surface3DData): SurfaceGrid => {
  const cached = gridCache.get(data);
  if (cached) return cached;
  const cols = Math.max(0, Math.floor(data.cols));
  const rows = Math.max(0, Math.floor(data.rows));
  const valid = rows >= 2 && cols >= 2 && data.z.length >= rows * cols;
  const x = data.x && data.x.length >= cols ? data.x : indices(cols);
  const y = data.y && data.y.length >= rows ? data.y : indices(rows);
  const value =
    data.value && data.value.length >= rows * cols ? data.value : null;
  const grid: SurfaceGrid = {
    rows: valid ? rows : 0,
    cols: valid ? cols : 0,
    z: data.z,
    x,
    y,
    value,
    extent: {
      x: valid ? extentOf(x, cols) : emptyExtent(),
      y: valid ? extentOf(y, rows) : emptyExtent(),
      z: valid ? extentOf(data.z, rows * cols) : emptyExtent(),
      value: valid && value ? extentOf(value, rows * cols) : emptyExtent(),
    },
  };
  gridCache.set(data, grid);
  return grid;
};

// -------------------------------------------------------------------- bars

/** Bars of a series resolved to category indices */
export interface BarColumns {
  count: number;
  /** Category index on x / y */
  xi: Int32Array;
  yi: Int32Array;
  /** Bottom and top of every bar (stacked on the series before) */
  z0: Float64Array;
  z1: Float64Array;
  /** Height of the datum itself */
  z: Float64Array;
  /** Index of the datum in the series data */
  source: Int32Array;
  value: Float64Array | null;
  colors: (string | undefined)[] | null;
  labels: (string | undefined)[] | null;
  /** `z`: bottoms and tops (stacks included), `height`: the heights of the data */
  extent: Record<"z" | "height" | "value", Extent>;
}

type BarInput = Bar3DSeries["data"][number];

const barDatum = (item: BarInput): Bar3DDatum =>
  Array.isArray(item)
    ? {
        x: (
          item as readonly [string | number, string | number, number | null]
        )[0],
        y: (
          item as readonly [string | number, string | number, number | null]
        )[1],
        z: (
          item as readonly [string | number, string | number, number | null]
        )[2],
      }
    : (item as Bar3DDatum);

/** Category axis of the bars: names given by the axis or collected from the data */
export class CategoryIndex {
  readonly names: string[];
  private readonly lookup = new Map<string, number>();
  private readonly fixed: boolean;

  constructor(categories: readonly string[] | undefined) {
    this.names = categories ? [...categories] : [];
    this.fixed = !!categories;
    this.names.forEach((name, i) => this.lookup.set(name, i));
  }

  /** Index of a category name (numbers are indices when the categories are given) */
  index(value: string | number): number {
    if (typeof value === "number" && this.fixed) {
      return Number.isInteger(value) && value >= 0 && value < this.names.length
        ? value
        : -1;
    }
    const name = String(value);
    const found = this.lookup.get(name);
    if (found !== undefined) return found;
    if (this.fixed) return -1;
    this.names.push(name);
    this.lookup.set(name, this.names.length - 1);
    return this.names.length - 1;
  }
}

/** Bars of every bar series, stacked in series order where cells coincide */
export const barColumns = (
  series: readonly Bar3DSeries[],
  xCategories: CategoryIndex,
  yCategories: CategoryIndex,
): BarColumns[] => {
  const positive = new Map<number, number>();
  const negative = new Map<number, number>();
  return series.map((s) => {
    const data = s.data as readonly BarInput[];
    const n = data.length;
    const xi = new Int32Array(n);
    const yi = new Int32Array(n);
    const z0 = new Float64Array(n);
    const z1 = new Float64Array(n);
    const z = new Float64Array(n);
    const source = new Int32Array(n);
    let value: Float64Array | null = null;
    let colors: (string | undefined)[] | null = null;
    let labels: (string | undefined)[] | null = null;
    const zExtent = emptyExtent();
    const heightExtent = emptyExtent();
    const valueExtent = emptyExtent();
    let count = 0;
    for (let i = 0; i < n; i++) {
      const d = barDatum(data[i]);
      const cx = xCategories.index(d.x);
      const cy = yCategories.index(d.y);
      const h = d.z;
      if (cx < 0 || cy < 0 || h === null || !Number.isFinite(h)) continue;
      const key = cy * 1_000_003 + cx;
      const stack = h >= 0 ? positive : negative;
      const base = s.hidden ? 0 : (stack.get(key) ?? 0);
      if (!s.hidden) stack.set(key, base + h);
      xi[count] = cx;
      yi[count] = cy;
      z0[count] = base;
      z1[count] = base + h;
      z[count] = h;
      source[count] = i;
      if (d.value !== undefined) {
        value ??= new Float64Array(n).fill(NaN);
        value[count] = d.value;
        merge(valueExtent, { min: d.value, max: d.value });
      }
      if (d.color !== undefined) {
        colors ??= new Array<string | undefined>(n);
        colors[count] = d.color;
      }
      if (d.label !== undefined) {
        labels ??= new Array<string | undefined>(n);
        labels[count] = d.label;
      }
      merge(zExtent, {
        min: Math.min(base, base + h),
        max: Math.max(base, base + h),
      });
      merge(heightExtent, { min: h, max: h });
      count++;
    }
    return {
      count,
      xi,
      yi,
      z0,
      z1,
      z,
      source,
      value,
      colors,
      labels,
      extent: { z: zExtent, height: heightExtent, value: valueExtent },
    };
  });
};

// -------------------------------------------------------------------- axes

export interface AxisModel {
  key: AxisKey;
  title: string;
  /** Category names (category axis) or `null` */
  categories: string[] | null;
  domain: [number, number];
  /** Half extent of the axis in world units */
  half: number;
  ticks: number[];
  labels: string[];
  /** Full label of any value (tooltips) */
  format: (value: number) => string;
  grid: boolean;
  visible: boolean;
}

/** World coordinate of a data value */
export const toWorld = (axis: AxisModel, value: number): number => {
  const [min, max] = axis.domain;
  return (((value - min) / (max - min || 1)) * 2 - 1) * axis.half;
};

/** Data value of a world coordinate */
export const fromWorld = (axis: AxisModel, world: number): number => {
  const [min, max] = axis.domain;
  return min + ((world / axis.half + 1) / 2) * (max - min);
};

const buildAxis = (
  key: AxisKey,
  options: Chart3DAxisOptions | undefined,
  extent: Extent,
  half: number,
  categories: string[] | null,
  includeZero: boolean,
  locale: Locale3D,
): AxisModel => {
  const o = options ?? {};
  const count = Math.max(2, o.tickCount ?? 5);
  if (categories) {
    const n = Math.max(1, categories.length);
    const name = (v: number) => {
      const i = Math.round(v);
      return o.format ? o.format(i) : (categories[i] ?? String(i));
    };
    const ticks = Array.from({ length: categories.length }, (_, i) => i);
    return {
      key,
      title: o.title ?? "",
      categories,
      domain: [-0.5, n - 0.5],
      half,
      ticks,
      labels: ticks.map(name),
      format: name,
      grid: o.grid ?? true,
      visible: o.visible ?? true,
    };
  }
  let min = o.min ?? extent.min;
  let max = o.max ?? extent.max;
  if (includeZero && o.min === undefined && min > 0) min = 0;
  if (includeZero && o.max === undefined && max < 0) max = 0;
  [min, max] = ensureSpan(min, max);
  if (o.nice ?? true) {
    const [nMin, nMax] = niceDomain(min, max, count);
    if (o.min === undefined) min = nMin;
    if (o.max === undefined) max = nMax;
  }
  const ticks = linearTicks(min, max, count);
  const step = tickStep(min, max, count);
  const tick =
    o.format ?? locale.ticks(step, Math.max(Math.abs(min), Math.abs(max)));
  return {
    key,
    title: o.title ?? "",
    categories: null,
    domain: [min, max],
    half,
    ticks,
    labels: ticks.map(tick),
    format: o.format ?? locale.value,
    grid: o.grid ?? true,
    visible: o.visible ?? true,
  };
};

// ------------------------------------------------------------------ series

export const seriesType = (series: Chart3DSeries): Chart3DSeriesType =>
  series.type ?? "scatter";

interface SeriesModelBase {
  index: number;
  id: string;
  name: string;
  hidden: boolean;
  /** Color option (resolved later with the theme) */
  color: string | undefined;
  colorBy: Chart3DColorBy;
  opacity: number;
  format: ((value: number) => string) | undefined;
}

export interface ScatterModel extends SeriesModelBase {
  type: "scatter";
  series: Scatter3DSeries;
  cols: PointColumns;
}

export interface LineModel extends SeriesModelBase {
  type: "line";
  series: Line3DSeries;
  cols: PointColumns;
}

export interface SurfaceModel extends SeriesModelBase {
  type: "surface";
  series: Surface3DSeries;
  grid: SurfaceGrid;
}

export interface BarModel extends SeriesModelBase {
  type: "bar";
  series: Bar3DSeries;
  bars: BarColumns;
}

export type SeriesModel = ScatterModel | LineModel | SurfaceModel | BarModel;

export interface Model3D {
  series: SeriesModel[];
  x: AxisModel;
  y: AxisModel;
  z: AxisModel;
  /** Range mapped to the color scale; `null` when no visible series uses it */
  colorDomain: [number, number] | null;
  /** Whether the color domain comes from the heights only (the color bar reuses the z format) */
  colorFromZ: boolean;
  /** Texts and number formats of the `locale` / `labels` options */
  locale: Locale3D;
}

const clamp01 = (v: number | undefined, fallback: number) =>
  v === undefined || !Number.isFinite(v)
    ? fallback
    : Math.max(0, Math.min(1, v));

/** Half extents of the box: `aspect` scaled so the largest side is 2 */
export const boxHalf = (
  aspect: readonly [number, number, number] | undefined,
): [number, number, number] => {
  const a = aspect ?? [1, 1, 0.7];
  const safe = a.map((v) => (Number.isFinite(v) && v > 0 ? v : 1)) as [
    number,
    number,
    number,
  ];
  const largest = Math.max(safe[0], safe[1], safe[2]);
  return [safe[0] / largest, safe[1] / largest, safe[2] / largest];
};

export const buildModel = (
  options: Chart3DOptions,
  locale: Locale3D = locale3D(options.locale, options.labels),
): Model3D => {
  const half = boxHalf(options.aspect);
  const extent = { x: emptyExtent(), y: emptyExtent(), z: emptyExtent() };
  const barSeries = options.series.filter((s) => seriesType(s) === "bar");
  const xCategories =
    barSeries.length || options.xAxis?.categories
      ? new CategoryIndex(options.xAxis?.categories)
      : null;
  const yCategories =
    barSeries.length || options.yAxis?.categories
      ? new CategoryIndex(options.yAxis?.categories)
      : null;
  const bars =
    xCategories && yCategories
      ? barColumns(barSeries as Bar3DSeries[], xCategories, yCategories)
      : [];
  let barIndex = 0;

  const models: SeriesModel[] = options.series.map((series, index) => {
    const type = seriesType(series);
    const base = {
      index,
      id: series.id ?? String(index),
      name: series.name ?? "",
      hidden: !!series.hidden,
      color: series.color,
      format: series.format,
    };
    switch (type) {
      case "surface": {
        const s = series as Surface3DSeries;
        const grid = surfaceGrid(s.data);
        merge(extent.x, grid.extent.x);
        merge(extent.y, grid.extent.y);
        merge(extent.z, grid.extent.z);
        return {
          ...base,
          type,
          series: s,
          grid,
          colorBy: s.colorBy ?? (grid.value ? "value" : "z"),
          opacity: clamp01(s.opacity, 1),
        };
      }
      case "bar": {
        const s = series as Bar3DSeries;
        const columns = bars[barIndex++]!;
        merge(extent.z, columns.extent.z);
        return {
          ...base,
          type,
          series: s,
          bars: columns,
          colorBy: s.colorBy ?? "series",
          opacity: clamp01(s.opacity, 1),
        };
      }
      default: {
        const s = series as Scatter3DSeries | Line3DSeries;
        const cols = pointColumns(s.data);
        merge(extent.x, cols.extent.x);
        merge(extent.y, cols.extent.y);
        merge(extent.z, cols.extent.z);
        const common = {
          ...base,
          cols,
          colorBy: s.colorBy ?? (cols.value ? "value" : "series"),
          opacity: clamp01(s.opacity, 1),
        } as const;
        return type === "line"
          ? { ...common, type: "line", series: s as Line3DSeries }
          : { ...common, type: "scatter", series: s as Scatter3DSeries };
      }
    }
  });

  const x = buildAxis(
    "x",
    options.xAxis,
    extent.x,
    half[0],
    xCategories ? xCategories.names : null,
    false,
    locale,
  );
  const y = buildAxis(
    "y",
    options.yAxis,
    extent.y,
    half[1],
    yCategories ? yCategories.names : null,
    false,
    locale,
  );
  const z = buildAxis(
    "z",
    options.zAxis,
    extent.z,
    half[2],
    null,
    barSeries.length > 0,
    locale,
  );

  // color domain: the colored quantity of every visible series using the scale
  const color = emptyExtent();
  let colorFromZ = true;
  let usesScale = false;
  for (const m of models) {
    if (m.hidden || m.colorBy === "series") continue;
    usesScale = true;
    const byValue = m.colorBy === "value";
    if (m.type === "surface") {
      const e = byValue && m.grid.value ? m.grid.extent.value : m.grid.extent.z;
      if (byValue && m.grid.value) colorFromZ = false;
      merge(color, e);
    } else if (m.type === "bar") {
      const e =
        byValue && m.bars.value ? m.bars.extent.value : m.bars.extent.height;
      if (byValue && m.bars.value) colorFromZ = false;
      merge(color, e);
    } else {
      const e = byValue && m.cols.value ? m.cols.extent.value : m.cols.extent.z;
      if (byValue && m.cols.value) colorFromZ = false;
      merge(color, e);
    }
  }
  let colorDomain: [number, number] | null = null;
  if (usesScale) {
    colorDomain = options.valueRange
      ? [options.valueRange[0], options.valueRange[1]]
      : ensureSpan(color.min, color.max);
  }
  return { series: models, x, y, z, colorDomain, colorFromZ, locale };
};
