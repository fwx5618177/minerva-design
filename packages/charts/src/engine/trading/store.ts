// Bars in growable Float64Array columns, and a pyramid of aggregated
// levels (2, 4, 8, ... bars per group) drawn when the chart is zoomed out
// so far that a bar is narrower than a pixel: a million bars cost the
// same to draw as a thousand.

import type { TradingBar, TradingBarColumns, TradingBarsInput } from "./types";

/** OHLCV columns; only the first `length` entries are meaningful */
export interface OhlcColumns {
  time: Float64Array;
  open: Float64Array;
  high: Float64Array;
  low: Float64Array;
  close: Float64Array;
  volume: Float64Array;
}

export interface BarStore extends OhlcColumns {
  length: number;
  /** Size of the columns */
  capacity: number;
  /** Some bar has a volume */
  hasVolume: boolean;
}

const KEYS = ["time", "open", "high", "low", "close", "volume"] as const;

const isColumns = (bars: TradingBarsInput): bars is TradingBarColumns =>
  !Array.isArray(bars);

export const inputLength = (bars: TradingBarsInput): number =>
  isColumns(bars)
    ? Math.min(
        bars.time.length,
        bars.open.length,
        bars.high.length,
        bars.low.length,
        bars.close.length,
      )
    : bars.length;

const allocate = (capacity: number): OhlcColumns => ({
  time: new Float64Array(capacity),
  open: new Float64Array(capacity),
  high: new Float64Array(capacity),
  low: new Float64Array(capacity),
  close: new Float64Array(capacity),
  volume: new Float64Array(capacity),
});

export const createStore = (): BarStore => ({
  ...allocate(16),
  length: 0,
  capacity: 16,
  hasVolume: false,
});

/** Grows the columns to hold at least `size` bars (doubling) */
const reserve = (store: BarStore, size: number) => {
  if (size <= store.capacity) return;
  let capacity = store.capacity;
  while (capacity < size) capacity *= 2;
  const next = allocate(capacity);
  for (const key of KEYS) next[key].set(store[key].subarray(0, store.length));
  Object.assign(store, next);
  store.capacity = capacity;
};

/** Writes `count` bars of `bars` at `at` */
const write = (
  store: BarStore,
  bars: TradingBarsInput,
  at: number,
  count: number,
) => {
  if (isColumns(bars)) {
    for (let i = 0; i < count; i++) {
      store.time[at + i] = bars.time[i];
      store.open[at + i] = bars.open[i];
      store.high[at + i] = bars.high[i];
      store.low[at + i] = bars.low[i];
      store.close[at + i] = bars.close[i];
    }
    const volume = bars.volume;
    if (volume) {
      for (let i = 0; i < count; i++) {
        const v = volume[i];
        store.volume[at + i] = Number.isFinite(v) ? v : 0;
      }
      store.hasVolume = true;
    } else {
      store.volume.fill(0, at, at + count);
    }
    return;
  }
  for (let i = 0; i < count; i++) writeBar(store, at + i, bars[i]);
};

const writeBar = (store: BarStore, i: number, bar: TradingBar) => {
  store.time[i] = bar.time;
  store.open[i] = bar.open;
  store.high[i] = bar.high;
  store.low[i] = bar.low;
  store.close[i] = bar.close;
  const v = bar.volume;
  if (v !== undefined && Number.isFinite(v)) {
    store.volume[i] = v;
    store.hasVolume = true;
  } else {
    store.volume[i] = 0;
  }
};

/** Replaces every bar */
export const setBars = (store: BarStore, bars: TradingBarsInput): void => {
  const n = inputLength(bars);
  store.length = 0;
  store.hasVolume = false;
  reserve(store, n);
  write(store, bars, 0, n);
  store.length = n;
};

/**
 * Appends the bars newer than the last one (a bar at the time of the last
 * one replaces it). Returns the index of the first changed bar, or -1.
 */
export const appendBars = (store: BarStore, bars: TradingBarsInput): number => {
  const n = inputLength(bars);
  let first = -1;
  for (let i = 0; i < n; i++) {
    const at = updateBar(store, barAt(bars, i));
    if (at >= 0 && (first < 0 || at < first)) first = at;
  }
  return first;
};

/** The `i`-th bar of an input */
export const barAt = (bars: TradingBarsInput, i: number): TradingBar => {
  if (!isColumns(bars)) return bars[i];
  return {
    time: bars.time[i],
    open: bars.open[i],
    high: bars.high[i],
    low: bars.low[i],
    close: bars.close[i],
    ...(bars.volume ? { volume: bars.volume[i] } : {}),
  };
};

/**
 * Streams a bar: replaces the last bar at the same time, appends a newer
 * one. Returns its index; -1 (ignored) when older than the last bar.
 */
export const updateBar = (store: BarStore, bar: TradingBar): number => {
  const n = store.length;
  if (!Number.isFinite(bar.time)) return -1;
  if (n > 0) {
    const last = store.time[n - 1];
    if (bar.time < last) return -1;
    if (bar.time === last) {
      writeBar(store, n - 1, bar);
      return n - 1;
    }
  }
  reserve(store, n + 1);
  writeBar(store, n, bar);
  store.length = n + 1;
  return n;
};

/** Inserts the bars older than the first one; returns how many were added */
export const prependBars = (
  store: BarStore,
  bars: TradingBarsInput,
): number => {
  const n = inputLength(bars);
  const first = store.length ? store.time[0] : Infinity;
  // keep only the bars strictly older than the current first bar
  let count = 0;
  const time = isColumns(bars) ? bars.time : null;
  while (
    count < n &&
    (time ? time[count] : (bars as readonly TradingBar[])[count].time) < first
  ) {
    count++;
  }
  if (!count) return 0;
  const length = store.length;
  const previous: OhlcColumns = {
    time: store.time.slice(0, length),
    open: store.open.slice(0, length),
    high: store.high.slice(0, length),
    low: store.low.slice(0, length),
    close: store.close.slice(0, length),
    volume: store.volume.slice(0, length),
  };
  store.length = 0;
  reserve(store, length + count);
  write(store, bars, 0, count);
  for (const key of KEYS) store[key].set(previous[key], count);
  store.length = length + count;
  return count;
};

/** Bar at an index as an object */
export const readBar = (columns: OhlcColumns, i: number): TradingBar => ({
  time: columns.time[i],
  open: columns.open[i],
  high: columns.high[i],
  low: columns.low[i],
  close: columns.close[i],
  volume: columns.volume[i],
});

/** First index whose time is >= `time` (binary search) */
export const lowerBoundTime = (
  time: Float64Array,
  n: number,
  value: number,
): number => {
  let lo = 0;
  let hi = n;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (time[mid] < value) lo = mid + 1;
    else hi = mid;
  }
  return lo;
};

/**
 * Index of the bar containing `time`: the last bar opening at or before it
 * (0 before the first bar)
 */
export const indexOfTime = (
  time: Float64Array,
  n: number,
  value: number,
): number => {
  const i = lowerBoundTime(time, n, value);
  if (i < n && time[i] === value) return i;
  return Math.max(0, i - 1);
};

// ---------------------------------------------------------------- pyramid

/** Bars aggregated `size` by `size`, aligned on index 0 */
export interface LodLevel extends OhlcColumns {
  size: number;
  /** Groups up to date */
  valid: number;
}

/** Aggregated levels, built lazily; level k groups 2^k bars */
export interface Pyramid {
  levels: (LodLevel | undefined)[];
}

export const createPyramid = (): Pyramid => ({ levels: [] });

/** Marks the groups containing bars from `from` on as stale */
export const invalidatePyramid = (pyramid: Pyramid, from: number): void => {
  for (const level of pyramid.levels) {
    if (level)
      level.valid = Math.min(level.valid, Math.floor(from / level.size));
  }
};

/**
 * Level `k` (k >= 1) of `src` (the first `n` bars), computed from level
 * k - 1 for the stale groups only
 */
export const pyramidLevel = (
  pyramid: Pyramid,
  src: OhlcColumns,
  n: number,
  k: number,
): LodLevel => {
  const size = 2 ** k;
  const groups = Math.ceil(n / size);
  let level = pyramid.levels[k];
  if (!level || level.time.length < groups) {
    const capacity = Math.max(16, Math.ceil(groups * 1.5));
    const next: LodLevel = { ...allocate(capacity), size, valid: 0 };
    if (level) {
      for (const key of KEYS)
        next[key].set(level[key].subarray(0, level.valid));
      next.valid = level.valid;
    }
    level = next;
    pyramid.levels[k] = level;
  }
  if (level.valid >= groups) return level;
  // the source of level k: level k - 1 (pairs) or the bars (k = 1)
  const prev = k > 1 ? pyramidLevel(pyramid, src, n, k - 1) : src;
  const prevCount = k > 1 ? Math.ceil(n / (size / 2)) : n;
  // the last group of a level may be partial: always recompute it
  const from = Math.max(0, Math.min(level.valid, groups - 1));
  for (let g = from; g < groups; g++) {
    const a = g * 2;
    const b = a + 1;
    level.time[g] = prev.time[a];
    level.open[g] = prev.open[a];
    if (b < prevCount) {
      level.high[g] = Math.max(prev.high[a], prev.high[b]);
      level.low[g] = Math.min(prev.low[a], prev.low[b]);
      level.close[g] = prev.close[b];
      level.volume[g] = prev.volume[a] + prev.volume[b];
    } else {
      level.high[g] = prev.high[a];
      level.low[g] = prev.low[a];
      level.close[g] = prev.close[a];
      level.volume[g] = prev.volume[a];
    }
  }
  // complete groups stay valid; the partial last one is redone next time
  level.valid = n % size === 0 ? groups : groups - 1;
  return level;
};
