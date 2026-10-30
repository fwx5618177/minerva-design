// Technical indicators on columns of numbers (Float64Array out, NaN while
// an indicator warms up). Every kernel computes the outputs from index
// `from` on, assuming the outputs before it are up to date: the chart
// recomputes only the last bar on each tick, even with a million bars.

import type {
  TradingBar,
  TradingBarColumns,
  TradingBarsInput,
  TradingTimeframe,
} from "./types";

type Values = ArrayLike<number>;

const finite = Number.isFinite;

/** Output array of `n` values, NaN-filled */
const nanArray = (n: number) => new Float64Array(n).fill(NaN);

const periodOf = (period: number) => Math.max(1, Math.floor(period) || 1);

// ---------------------------------------------------------------- kernels

/** Simple moving average of `src[0..n)` into `out`, from index `from` */
export const smaInto = (
  src: Values,
  n: number,
  period: number,
  out: Float64Array,
  from = 0,
): void => {
  const p = periodOf(period);
  let sum = 0;
  let valid = 0;
  // the window ending just before `from` (the loop below drops its oldest value)
  for (let j = Math.max(0, from - p); j < from; j++) {
    const v = src[j];
    if (finite(v)) {
      sum += v;
      valid++;
    }
  }
  for (let i = from; i < n; i++) {
    const v = src[i];
    if (finite(v)) {
      sum += v;
      valid++;
    }
    if (i >= p) {
      const old = src[i - p];
      if (finite(old)) {
        sum -= old;
        valid--;
      }
    }
    out[i] = valid === p ? sum / p : NaN;
  }
};

/** Mean of `src[i-p+1..i]`, NaN unless the window is complete */
const windowMean = (src: Values, i: number, p: number) => {
  if (i < p - 1) return NaN;
  let sum = 0;
  for (let k = i - p + 1; k <= i; k++) {
    const v = src[k];
    if (!finite(v)) return NaN;
    sum += v;
  }
  return sum / p;
};

/**
 * Exponential smoothing with factor `alpha`, seeded with the simple
 * average of the first complete window (the TradingView convention)
 */
const smoothInto = (
  src: Values,
  n: number,
  p: number,
  alpha: number,
  out: Float64Array,
  from: number,
) => {
  for (let i = from; i < n; i++) {
    const v = src[i];
    const prev = i > 0 ? out[i - 1] : NaN;
    if (!finite(v)) out[i] = NaN;
    else if (finite(prev)) out[i] = prev + alpha * (v - prev);
    else out[i] = windowMean(src, i, p);
  }
};

/** Exponential moving average (alpha = 2 / (period + 1)) */
export const emaInto = (
  src: Values,
  n: number,
  period: number,
  out: Float64Array,
  from = 0,
): void => {
  const p = periodOf(period);
  smoothInto(src, n, p, 2 / (p + 1), out, from);
};

/** Wilder's moving average (alpha = 1 / period), used by RSI and ATR */
export const rmaInto = (
  src: Values,
  n: number,
  period: number,
  out: Float64Array,
  from = 0,
): void => {
  const p = periodOf(period);
  smoothInto(src, n, p, 1 / p, out, from);
};

/** Linearly weighted moving average (the newest bar weighs `period`) */
export const wmaInto = (
  src: Values,
  n: number,
  period: number,
  out: Float64Array,
  from = 0,
): void => {
  const p = periodOf(period);
  const denominator = (p * (p + 1)) / 2;
  const direct = (i: number) => {
    if (i < p - 1) return NaN;
    let num = 0;
    for (let k = 0; k < p; k++) {
      const v = src[i - k];
      if (!finite(v)) return NaN;
      num += (p - k) * v;
    }
    return num;
  };
  // numerator of the previous index and the sum of its window
  let num = from > 0 ? direct(from - 1) : NaN;
  let sum = from > 0 ? windowMean(src, from - 1, p) * p : NaN;
  for (let i = from; i < n; i++) {
    const v = src[i];
    if (finite(num) && finite(sum) && finite(v)) {
      num = num - sum + p * v;
      sum = sum + v - (i >= p ? src[i - p] : 0);
    } else {
      num = direct(i);
      sum = windowMean(src, i, p) * p;
    }
    out[i] = finite(num) ? num / denominator : NaN;
  }
};

/** Population standard deviation over the window (two passes: exact) */
export const stdevInto = (
  src: Values,
  n: number,
  period: number,
  out: Float64Array,
  from = 0,
): void => {
  const p = periodOf(period);
  for (let i = from; i < n; i++) {
    const mean = windowMean(src, i, p);
    if (!finite(mean)) {
      out[i] = NaN;
      continue;
    }
    let sq = 0;
    for (let k = i - p + 1; k <= i; k++) {
      const d = src[k] - mean;
      sq += d * d;
    }
    out[i] = Math.sqrt(sq / p);
  }
};

/** Highest value of the window ending at each index */
const extremeInto = (
  src: Values,
  n: number,
  p: number,
  out: Float64Array,
  from: number,
  highest: boolean,
) => {
  for (let i = from; i < n; i++) {
    if (i < p - 1) {
      out[i] = NaN;
      continue;
    }
    let m = highest ? -Infinity : Infinity;
    for (let k = i - p + 1; k <= i; k++) {
      const v = src[k];
      if (!finite(v)) {
        m = NaN;
        break;
      }
      if (highest ? v > m : v < m) m = v;
    }
    out[i] = m;
  }
};

/** RSI with Wilder smoothing; `gain` / `loss` hold the running averages */
export const rsiInto = (
  close: Values,
  n: number,
  period: number,
  out: Float64Array,
  gain: Float64Array,
  loss: Float64Array,
  from = 0,
): void => {
  const p = periodOf(period);
  for (let i = from; i < n; i++) {
    gain[i] = loss[i] = NaN;
    out[i] = NaN;
    if (i === 0) continue;
    const change = close[i] - close[i - 1];
    if (!finite(change)) continue;
    if (finite(gain[i - 1]) && finite(loss[i - 1])) {
      gain[i] = (gain[i - 1] * (p - 1) + Math.max(change, 0)) / p;
      loss[i] = (loss[i - 1] * (p - 1) + Math.max(-change, 0)) / p;
    } else if (i >= p) {
      let g = 0;
      let l = 0;
      let ok = true;
      for (let k = i - p + 1; k <= i; k++) {
        const c = close[k] - close[k - 1];
        if (!finite(c)) {
          ok = false;
          break;
        }
        if (c > 0) g += c;
        else l -= c;
      }
      if (!ok) continue;
      gain[i] = g / p;
      loss[i] = l / p;
    } else {
      continue;
    }
    out[i] =
      loss[i] === 0
        ? gain[i] === 0
          ? 50
          : 100
        : 100 - 100 / (1 + gain[i] / loss[i]);
  }
};

/** True range of each bar */
export const trueRangeInto = (
  high: Values,
  low: Values,
  close: Values,
  n: number,
  out: Float64Array,
  from = 0,
): void => {
  for (let i = from; i < n; i++) {
    const range = high[i] - low[i];
    if (i === 0 || !finite(close[i - 1])) {
      out[i] = range;
      continue;
    }
    const pc = close[i - 1];
    out[i] = Math.max(range, Math.abs(high[i] - pc), Math.abs(low[i] - pc));
  }
};

/** KDJ: K and D smoothed from the raw stochastic value (seeded at 50), J = 3K − 2D */
export const kdjInto = (
  high: Values,
  low: Values,
  close: Values,
  n: number,
  period: number,
  kPeriod: number,
  dPeriod: number,
  k: Float64Array,
  d: Float64Array,
  j: Float64Array,
  from = 0,
): void => {
  const p = periodOf(period);
  const m1 = periodOf(kPeriod);
  const m2 = periodOf(dPeriod);
  for (let i = from; i < n; i++) {
    k[i] = d[i] = j[i] = NaN;
    if (i < p - 1) continue;
    let hh = -Infinity;
    let ll = Infinity;
    for (let q = i - p + 1; q <= i; q++) {
      if (high[q] > hh) hh = high[q];
      if (low[q] < ll) ll = low[q];
    }
    const c = close[i];
    if (!finite(hh) || !finite(ll) || !finite(c)) continue;
    const rsv = hh === ll ? 50 : ((c - ll) / (hh - ll)) * 100;
    const pk = i > 0 && finite(k[i - 1]) ? k[i - 1] : 50;
    const pd = i > 0 && finite(d[i - 1]) ? d[i - 1] : 50;
    k[i] = ((m1 - 1) * pk + rsv) / m1;
    d[i] = ((m2 - 1) * pd + k[i]) / m2;
    j[i] = 3 * k[i] - 2 * d[i];
  }
};

const DAY = 86_400_000;

/** Session key of a time: bars with the same key are in the same VWAP period */
export const sessionKey = (
  time: number,
  reset: "day" | "week" | "month" | "none",
  utcOffset = 0,
): number => {
  if (reset === "none") return 0;
  const t = time + utcOffset * 60_000;
  const day = Math.floor(t / DAY);
  if (reset === "day") return day;
  // 1970-01-01 is a Thursday: weeks start on Monday
  if (reset === "week") return Math.floor((day + 3) / 7);
  const date = new Date(t);
  return date.getUTCFullYear() * 12 + date.getUTCMonth();
};

/** VWAP; `pv` / `vol` hold the cumulative sums of the period */
export const vwapInto = (
  high: Values,
  low: Values,
  close: Values,
  volume: Values,
  time: Values | null,
  n: number,
  reset: "day" | "week" | "month" | "none",
  utcOffset: number,
  out: Float64Array,
  pv: Float64Array,
  vol: Float64Array,
  from = 0,
): void => {
  for (let i = from; i < n; i++) {
    const tp = (high[i] + low[i] + close[i]) / 3;
    const v = finite(volume[i]) ? volume[i] : 0;
    const same =
      i > 0 &&
      (!time ||
        sessionKey(time[i], reset, utcOffset) ===
          sessionKey(time[i - 1], reset, utcOffset));
    const basePv = same && finite(pv[i - 1]) ? pv[i - 1] : 0;
    const baseV = same && finite(vol[i - 1]) ? vol[i - 1] : 0;
    pv[i] = basePv + (finite(tp) ? tp * v : 0);
    vol[i] = baseV + v;
    out[i] = vol[i] > 0 ? pv[i] / vol[i] : finite(tp) ? tp : NaN;
  }
};

/** Heikin-Ashi bars from regular bars */
export const heikinAshiInto = (
  open: Values,
  high: Values,
  low: Values,
  close: Values,
  n: number,
  out: {
    open: Float64Array;
    high: Float64Array;
    low: Float64Array;
    close: Float64Array;
  },
  from = 0,
): void => {
  for (let i = from; i < n; i++) {
    const c = (open[i] + high[i] + low[i] + close[i]) / 4;
    const prevOpen = i > 0 ? out.open[i - 1] : NaN;
    const prevClose = i > 0 ? out.close[i - 1] : NaN;
    const o =
      finite(prevOpen) && finite(prevClose)
        ? (prevOpen + prevClose) / 2
        : (open[i] + close[i]) / 2;
    out.open[i] = o;
    out.close[i] = c;
    out.high[i] = Math.max(high[i], o, c);
    out.low[i] = Math.min(low[i], o, c);
  }
};

// ------------------------------------------------------- public functions

/**
 * Simple moving average: the mean of the last `period` values (NaN until
 * `period` values are available)
 */
export const sma = (values: Values, period: number): Float64Array => {
  const out = nanArray(values.length);
  smaInto(values, values.length, period, out);
  return out;
};

/** Exponential moving average, seeded with the simple average of the first `period` values */
export const ema = (values: Values, period: number): Float64Array => {
  const out = nanArray(values.length);
  emaInto(values, values.length, period, out);
  return out;
};

/** Linearly weighted moving average: the newest value weighs `period`, the oldest 1 */
export const wma = (values: Values, period: number): Float64Array => {
  const out = nanArray(values.length);
  wmaInto(values, values.length, period, out);
  return out;
};

/** Bollinger bands: simple average ± `multiplier` population standard deviations */
export const bollinger = (
  values: Values,
  period = 20,
  multiplier = 2,
): { middle: Float64Array; upper: Float64Array; lower: Float64Array } => {
  const n = values.length;
  const middle = nanArray(n);
  const upper = nanArray(n);
  const lower = nanArray(n);
  const dev = nanArray(n);
  smaInto(values, n, period, middle);
  stdevInto(values, n, period, dev);
  for (let i = 0; i < n; i++) {
    upper[i] = middle[i] + multiplier * dev[i];
    lower[i] = middle[i] - multiplier * dev[i];
  }
  return { middle, upper, lower };
};

/** MACD line (fast EMA − slow EMA), its signal EMA and their difference */
export const macd = (
  values: Values,
  fast = 12,
  slow = 26,
  signal = 9,
): { macd: Float64Array; signal: Float64Array; histogram: Float64Array } => {
  const n = values.length;
  const f = nanArray(n);
  const s = nanArray(n);
  emaInto(values, n, fast, f);
  emaInto(values, n, slow, s);
  const line = nanArray(n);
  for (let i = 0; i < n; i++) line[i] = f[i] - s[i];
  const sig = nanArray(n);
  emaInto(line, n, signal, sig);
  const histogram = nanArray(n);
  for (let i = 0; i < n; i++) histogram[i] = line[i] - sig[i];
  return { macd: line, signal: sig, histogram };
};

/** Relative strength index (0-100) with Wilder smoothing */
export const rsi = (values: Values, period = 14): Float64Array => {
  const n = values.length;
  const out = nanArray(n);
  rsiInto(values, n, period, out, nanArray(n), nanArray(n));
  return out;
};

/** KDJ stochastic: K and D smoothed (seeded at 50), J = 3K − 2D */
export const kdj = (
  high: Values,
  low: Values,
  close: Values,
  period = 9,
  kPeriod = 3,
  dPeriod = 3,
): { k: Float64Array; d: Float64Array; j: Float64Array } => {
  const n = close.length;
  const k = nanArray(n);
  const d = nanArray(n);
  const j = nanArray(n);
  kdjInto(high, low, close, n, period, kPeriod, dPeriod, k, d, j);
  return { k, d, j };
};

/** Average true range with Wilder smoothing */
export const atr = (
  high: Values,
  low: Values,
  close: Values,
  period = 14,
): Float64Array => {
  const n = close.length;
  const tr = nanArray(n);
  trueRangeInto(high, low, close, n, tr);
  const out = nanArray(n);
  rmaInto(tr, n, period, out);
  return out;
};

/**
 * Volume-weighted average of the typical price (high + low + close) / 3,
 * restarting each `reset` period (UTC, or shifted by `utcOffset` minutes);
 * without `time`, a single cumulative average
 */
export const vwap = (
  high: Values,
  low: Values,
  close: Values,
  volume: Values,
  options: {
    time?: Values;
    reset?: "day" | "week" | "month" | "none";
    utcOffset?: number;
  } = {},
): Float64Array => {
  const n = close.length;
  const out = nanArray(n);
  vwapInto(
    high,
    low,
    close,
    volume,
    options.time ?? null,
    n,
    options.reset ?? "day",
    options.utcOffset ?? 0,
    out,
    nanArray(n),
    nanArray(n),
  );
  return out;
};

/** Heikin-Ashi bars: averaged bars that smooth out the noise of trends */
export const heikinAshi = (bars: {
  open: Values;
  high: Values;
  low: Values;
  close: Values;
}): {
  open: Float64Array;
  high: Float64Array;
  low: Float64Array;
  close: Float64Array;
} => {
  const n = bars.close.length;
  const out = {
    open: nanArray(n),
    high: nanArray(n),
    low: nanArray(n),
    close: nanArray(n),
  };
  heikinAshiInto(bars.open, bars.high, bars.low, bars.close, n, out);
  return out;
};

// -------------------------------------------------------------- timeframes

/** A parsed timeframe: a count of a unit, with its approximate duration */
export interface ParsedTimeframe {
  unit: "ms" | "month";
  count: number;
  /** Approximate duration in ms (30 days per month) */
  ms: number;
}

const UNIT_MS: Record<string, number> = {
  s: 1000,
  m: 60_000,
  h: 3_600_000,
  H: 3_600_000,
  d: DAY,
  D: DAY,
  w: 7 * DAY,
  W: 7 * DAY,
};

/** `"15m"` -> 15 minutes, `"1M"` -> 1 month; `null` when invalid */
export const parseTimeframe = (
  timeframe: TradingTimeframe,
): ParsedTimeframe | null => {
  if (typeof timeframe === "number") {
    return timeframe > 0
      ? { unit: "ms", count: timeframe, ms: timeframe }
      : null;
  }
  const match = /^(\d+(?:\.\d+)?)([smhHdDwWM])$/.exec(timeframe.trim());
  if (!match) return null;
  const count = Number(match[1]);
  if (!(count > 0)) return null;
  const unit = match[2];
  if (unit === "M") return { unit: "month", count, ms: count * 30 * DAY };
  return {
    unit: "ms",
    count: count * UNIT_MS[unit],
    ms: count * UNIT_MS[unit],
  };
};

/** Start of the bucket of `time` (weeks start on Monday, months on the 1st) */
export const bucketStart = (
  time: number,
  tf: ParsedTimeframe,
  utcOffset = 0,
): number => {
  const shift = utcOffset * 60_000;
  const t = time + shift;
  if (tf.unit === "month") {
    const date = new Date(t);
    const months = date.getUTCFullYear() * 12 + date.getUTCMonth();
    const start = months - (months % tf.count);
    return Date.UTC(Math.floor(start / 12), start % 12, 1) - shift;
  }
  if (tf.count % (7 * DAY) === 0) {
    // Monday-aligned weeks (the epoch is a Thursday)
    const monday = 4 * DAY;
    return Math.floor((t - monday) / tf.count) * tf.count + monday - shift;
  }
  return Math.floor(t / tf.count) * tf.count - shift;
};

const isColumns = (bars: TradingBarsInput): bars is TradingBarColumns =>
  !Array.isArray(bars);

/**
 * Aggregates bars into a longer timeframe (`"5m"` bars into `"1H"`, ...):
 * first open, highest high, lowest low, last close, summed volume. Buckets
 * are aligned on UTC (or shifted by `utcOffset` minutes); weeks start on
 * Monday. Columns in, columns out (Float64Array).
 */
export function resampleBars(
  bars: readonly TradingBar[],
  timeframe: TradingTimeframe,
  utcOffset?: number,
): TradingBar[];
export function resampleBars(
  bars: TradingBarColumns,
  timeframe: TradingTimeframe,
  utcOffset?: number,
): TradingBarColumns;
export function resampleBars(
  bars: TradingBarsInput,
  timeframe: TradingTimeframe,
  utcOffset = 0,
): TradingBar[] | TradingBarColumns {
  const tf = parseTimeframe(timeframe);
  if (!tf) throw new Error(`Invalid timeframe: ${String(timeframe)}`);
  const columns = isColumns(bars);
  const n = columns ? bars.close.length : bars.length;
  const get = (i: number): TradingBar => {
    if (!columns) return (bars as readonly TradingBar[])[i];
    const c = bars as TradingBarColumns;
    return {
      time: c.time[i],
      open: c.open[i],
      high: c.high[i],
      low: c.low[i],
      close: c.close[i],
      volume: c.volume ? c.volume[i] : undefined,
    };
  };
  const out: TradingBar[] = [];
  let current: TradingBar | null = null;
  for (let i = 0; i < n; i++) {
    const bar = get(i);
    const start = bucketStart(bar.time, tf, utcOffset);
    if (!current || start !== current.time) {
      if (current) out.push(current);
      current = {
        time: start,
        open: bar.open,
        high: bar.high,
        low: bar.low,
        close: bar.close,
        volume: bar.volume ?? 0,
      };
    } else {
      if (bar.high > current.high) current.high = bar.high;
      if (bar.low < current.low) current.low = bar.low;
      current.close = bar.close;
      current.volume = (current.volume ?? 0) + (bar.volume ?? 0);
    }
  }
  if (current) out.push(current);
  if (!columns) return out;
  const m = out.length;
  const result = {
    time: new Float64Array(m),
    open: new Float64Array(m),
    high: new Float64Array(m),
    low: new Float64Array(m),
    close: new Float64Array(m),
    volume: new Float64Array(m),
  };
  out.forEach((bar, i) => {
    result.time[i] = bar.time;
    result.open[i] = bar.open;
    result.high[i] = bar.high;
    result.low[i] = bar.low;
    result.close[i] = bar.close;
    result.volume[i] = bar.volume ?? 0;
  });
  return result;
}

/** Highest / lowest of a window: exported for the KDJ-like studies of the chart */
export const highestInto = (
  src: Values,
  n: number,
  period: number,
  out: Float64Array,
  from = 0,
): void => extremeInto(src, n, periodOf(period), out, from, true);

export const lowestInto = (
  src: Values,
  n: number,
  period: number,
  out: Float64Array,
  from = 0,
): void => extremeInto(src, n, periodOf(period), out, from, false);
