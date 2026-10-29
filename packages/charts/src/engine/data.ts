// Normalization of series data into columns (Float64Array).

import type { ChartAxisType, ChartSeriesData, ChartXValue } from "./types";

export interface SeriesColumns {
  x: Float64Array;
  /** NaN where the value is missing */
  y: Float64Array;
  size: Float32Array | null;
  colors: (string | undefined)[] | null;
  labels: (string | undefined)[] | null;
  /** Candlesticks: open / high / low (y is the close) */
  open: Float64Array | null;
  high: Float64Array | null;
  low: Float64Array | null;
  /** Heatmaps: values of the cells */
  value: Float64Array | null;
  count: number;
  /** x is non-decreasing (binary search, decimation) */
  sorted: boolean;
  /** Extent of the finite points (NaN when there is none); high / low included */
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  /** Extent of the finite `value`s (NaN when there is none) */
  valueMin: number;
  valueMax: number;
}

type XResolver = (value: ChartXValue, index: number) => number;
/** Converts a y value (a category name on category y axes) to a number */
export type YResolver = (value: unknown) => number;

type Extra = Pick<
  SeriesColumns,
  "size" | "colors" | "labels" | "open" | "high" | "low" | "value"
>;

const isColumns = (
  data: ChartSeriesData,
): data is {
  x?: ArrayLike<number> | readonly ChartXValue[];
  y: ArrayLike<number> | readonly (number | string | null)[];
  size?: ArrayLike<number>;
  open?: ArrayLike<number>;
  high?: ArrayLike<number>;
  low?: ArrayLike<number>;
  value?: ArrayLike<number> | readonly (number | null)[];
} =>
  typeof data === "object" &&
  data !== null &&
  !("length" in data) &&
  "y" in data;

/** Converts an x value to a number for the axis type */
export const xResolver = (
  type: ChartAxisType,
  categoryIndex: (name: string) => number,
): XResolver => {
  return (value, index) => {
    if (typeof value === "number") return value;
    if (value instanceof Date) return value.getTime();
    if (typeof value === "string") {
      if (type === "category") return categoryIndex(value);
      if (type === "time") return Date.parse(value);
      const n = Number(value);
      return Number.isNaN(n) ? index : n;
    }
    return index;
  };
};

const toNumber = (v: unknown): number =>
  typeof v === "number" ? v : v === null || v === undefined ? NaN : Number(v);

/** Category names used by string y values (heatmap rows), in order of appearance */
export const collectYCategories = (
  datas: readonly ChartSeriesData[],
): string[] => {
  const seen = new Set<string>();
  for (const data of datas) {
    if (isColumns(data)) {
      const ys = data.y;
      if (!ArrayBuffer.isView(ys)) {
        for (let i = 0; i < ys.length; i++) {
          const v = ys[i];
          if (typeof v === "string") seen.add(v);
        }
      }
      continue;
    }
    const list = data as ArrayLike<unknown>;
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      const v = Array.isArray(item)
        ? item[1]
        : item && typeof item === "object"
          ? (item as { y?: unknown }).y
          : undefined;
      if (typeof v === "string") seen.add(v);
    }
  }
  return [...seen];
};

/** Category names used by string x values, in order of appearance */
export const collectCategories = (
  datas: readonly ChartSeriesData[],
): string[] => {
  const seen = new Set<string>();
  const add = (v: unknown) => {
    if (typeof v === "string") seen.add(v);
  };
  for (const data of datas) {
    if (isColumns(data)) {
      const xs = data.x;
      if (xs && !ArrayBuffer.isView(xs)) {
        for (let i = 0; i < xs.length; i++) add(xs[i]);
      }
      continue;
    }
    const list = data as ArrayLike<unknown>;
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      if (Array.isArray(item)) add(item[0]);
      else if (item && typeof item === "object")
        add((item as { x?: unknown }).x);
    }
  }
  return [...seen];
};

const finalize = (
  x: Float64Array,
  y: Float64Array,
  count: number,
  extra: Extra,
): SeriesColumns => {
  let xMin = Infinity;
  let xMax = -Infinity;
  let yMin = Infinity;
  let yMax = -Infinity;
  let sorted = true;
  let prev = -Infinity;
  const { high, low, value } = extra;
  for (let i = 0; i < count; i++) {
    const xi = x[i];
    if (!Number.isFinite(xi)) {
      y[i] = NaN;
      continue;
    }
    if (xi < prev) sorted = false;
    prev = xi;
    const yi = y[i];
    if (!Number.isFinite(yi)) continue;
    if (xi < xMin) xMin = xi;
    if (xi > xMax) xMax = xi;
    if (yi < yMin) yMin = yi;
    if (yi > yMax) yMax = yi;
    if (high) {
      const h = high[i];
      if (h > yMax) yMax = h;
      if (h < yMin) yMin = h;
    }
    if (low) {
      const l = low[i];
      if (l < yMin) yMin = l;
      if (l > yMax) yMax = l;
    }
  }
  let valueMin = Infinity;
  let valueMax = -Infinity;
  if (value) {
    for (let i = 0; i < count; i++) {
      const v = value[i];
      if (!Number.isFinite(v)) continue;
      if (v < valueMin) valueMin = v;
      if (v > valueMax) valueMax = v;
    }
  }
  const empty = xMin > xMax;
  return {
    x,
    y,
    count,
    sorted,
    xMin: empty ? NaN : xMin,
    xMax: empty ? NaN : xMax,
    yMin: empty ? NaN : yMin,
    yMax: empty ? NaN : yMax,
    valueMin: valueMin > valueMax ? NaN : valueMin,
    valueMax: valueMin > valueMax ? NaN : valueMax,
    ...extra,
  };
};

const column = (
  values: ArrayLike<unknown> | undefined,
  count: number,
): Float64Array | null => {
  if (!values) return null;
  if (values instanceof Float64Array && values.length >= count) {
    return values.length === count ? values : values.subarray(0, count);
  }
  const out = new Float64Array(count);
  for (let i = 0; i < count; i++) out[i] = toNumber(values[i]);
  return out;
};

/** Turns any supported data form into columns */
export const normalizeData = (
  data: ChartSeriesData,
  resolveX: XResolver,
  resolveY: YResolver = toNumber,
): SeriesColumns => {
  const none: Extra = {
    size: null,
    colors: null,
    labels: null,
    open: null,
    high: null,
    low: null,
    value: null,
  };
  if (isColumns(data)) {
    const count = data.y.length;
    const x = new Float64Array(count);
    const xs = data.x;
    if (!xs) {
      for (let i = 0; i < count; i++) x[i] = i;
    } else if (ArrayBuffer.isView(xs) && xs.length >= count) {
      // typed arrays: a plain copy (the hot path of large data sets)
      x.set(
        (xs.length === count
          ? xs
          : (xs as unknown as Float64Array).subarray(
              0,
              count,
            )) as ArrayLike<number>,
      );
    } else {
      for (let i = 0; i < count; i++) x[i] = resolveX(xs[i] as ChartXValue, i);
    }
    const ys = data.y;
    let y: Float64Array;
    if (ArrayBuffer.isView(ys)) {
      // finalize writes NaN at invalid x: copy so the input is never changed
      y = new Float64Array(count);
      y.set(ys as ArrayLike<number>);
    } else {
      y = new Float64Array(count);
      for (let i = 0; i < count; i++) y[i] = resolveY(ys[i]);
    }
    let size: Float32Array | null = null;
    if (data.size) {
      size = new Float32Array(count);
      for (let i = 0; i < count; i++) size[i] = toNumber(data.size[i]);
    }
    return finalize(x, y, count, {
      ...none,
      size,
      open: column(data.open, count),
      high: column(data.high, count),
      low: column(data.low, count),
      value: column(data.value, count),
    });
  }

  const list = data as ArrayLike<unknown>;
  const count = list.length;
  const x = new Float64Array(count);
  const y = new Float64Array(count);
  let size: Float32Array | null = null;
  let colors: (string | undefined)[] | null = null;
  let labels: (string | undefined)[] | null = null;
  let open: Float64Array | null = null;
  let high: Float64Array | null = null;
  let low: Float64Array | null = null;
  let value: Float64Array | null = null;
  const nanColumn = () => new Float64Array(count).fill(NaN);

  for (let i = 0; i < count; i++) {
    const item = list[i];
    if (item === null || item === undefined || typeof item === "number") {
      x[i] = i;
      y[i] = toNumber(item);
    } else if (Array.isArray(item)) {
      x[i] = resolveX(item[0] as ChartXValue, i);
      y[i] = resolveY(item[1]);
    } else if (typeof item === "object") {
      const d = item as {
        x?: ChartXValue;
        y?: number | string | null;
        size?: number;
        color?: string;
        label?: string;
        open?: number;
        high?: number;
        low?: number;
        value?: number | null;
      };
      x[i] = d.x === undefined ? i : resolveX(d.x, i);
      y[i] = resolveY(d.y);
      if (d.size !== undefined) {
        size ??= new Float32Array(count).fill(NaN);
        size[i] = d.size;
      }
      if (d.color !== undefined) {
        colors ??= new Array<string | undefined>(count);
        colors[i] = d.color;
      }
      if (d.label !== undefined) {
        labels ??= new Array<string | undefined>(count);
        labels[i] = d.label;
      }
      if (d.open !== undefined) (open ??= nanColumn())[i] = toNumber(d.open);
      if (d.high !== undefined) (high ??= nanColumn())[i] = toNumber(d.high);
      if (d.low !== undefined) (low ??= nanColumn())[i] = toNumber(d.low);
      if (d.value !== undefined) (value ??= nanColumn())[i] = toNumber(d.value);
    } else {
      x[i] = i;
      y[i] = NaN;
    }
  }
  return finalize(x, y, count, {
    size,
    colors,
    labels,
    open,
    high,
    low,
    value,
  });
};

/** First index whose x is >= value (sorted x) */
export const lowerBound = (
  x: ArrayLike<number>,
  count: number,
  value: number,
): number => {
  let lo = 0;
  let hi = count;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (x[mid] < value) lo = mid + 1;
    else hi = mid;
  }
  return lo;
};

/** Index of the point with the closest x and a finite y (sorted x), -1 if none */
export const nearestIndex = (
  x: ArrayLike<number>,
  y: ArrayLike<number>,
  count: number,
  value: number,
): number => {
  if (count === 0) return -1;
  const i = lowerBound(x, count, value);
  let left = i - 1;
  let right = i;
  while (left >= 0 && !Number.isFinite(y[left])) left--;
  while (right < count && !Number.isFinite(y[right])) right++;
  if (left < 0) return right < count ? right : -1;
  if (right >= count) return left;
  return value - x[left] <= x[right] - value ? left : right;
};
