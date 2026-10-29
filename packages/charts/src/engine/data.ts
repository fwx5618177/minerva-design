// Normalization of series data into columns (Float64Array).

import type { ChartAxisType, ChartSeriesData, ChartXValue } from "./types";

export interface SeriesColumns {
  x: Float64Array;
  /** NaN where the value is missing */
  y: Float64Array;
  size: Float32Array | null;
  colors: (string | undefined)[] | null;
  labels: (string | undefined)[] | null;
  count: number;
  /** x is non-decreasing (binary search, decimation) */
  sorted: boolean;
  /** Extent of the finite points (NaN when there is none) */
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
}

type XResolver = (value: ChartXValue, index: number) => number;

const isColumns = (
  data: ChartSeriesData,
): data is {
  x?: ArrayLike<number> | readonly ChartXValue[];
  y: ArrayLike<number> | readonly (number | null)[];
  size?: ArrayLike<number>;
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
  extra: Pick<SeriesColumns, "size" | "colors" | "labels">,
): SeriesColumns => {
  let xMin = Infinity;
  let xMax = -Infinity;
  let yMin = Infinity;
  let yMax = -Infinity;
  let sorted = true;
  let prev = -Infinity;
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
    ...extra,
  };
};

/** Turns any supported data form into columns */
export const normalizeData = (
  data: ChartSeriesData,
  resolveX: XResolver,
): SeriesColumns => {
  const none = { size: null, colors: null, labels: null };
  if (isColumns(data)) {
    const count = data.y.length;
    const x = new Float64Array(count);
    const y = new Float64Array(count);
    const xs = data.x;
    for (let i = 0; i < count; i++) {
      y[i] = toNumber(data.y[i]);
      x[i] = xs ? resolveX(xs[i] as ChartXValue, i) : i;
    }
    let size: Float32Array | null = null;
    if (data.size) {
      size = new Float32Array(count);
      for (let i = 0; i < count; i++) size[i] = toNumber(data.size[i]);
    }
    return finalize(x, y, count, { ...none, size });
  }

  const list = data as ArrayLike<unknown>;
  const count = list.length;
  const x = new Float64Array(count);
  const y = new Float64Array(count);
  let size: Float32Array | null = null;
  let colors: (string | undefined)[] | null = null;
  let labels: (string | undefined)[] | null = null;

  for (let i = 0; i < count; i++) {
    const item = list[i];
    if (item === null || item === undefined || typeof item === "number") {
      x[i] = i;
      y[i] = toNumber(item);
    } else if (Array.isArray(item)) {
      x[i] = resolveX(item[0] as ChartXValue, i);
      y[i] = toNumber(item[1]);
    } else if (typeof item === "object") {
      const d = item as {
        x?: ChartXValue;
        y?: number | null;
        size?: number;
        color?: string;
        label?: string;
      };
      x[i] = d.x === undefined ? i : resolveX(d.x, i);
      y[i] = toNumber(d.y);
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
    } else {
      x[i] = i;
      y[i] = NaN;
    }
  }
  return finalize(x, y, count, { size, colors, labels });
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
