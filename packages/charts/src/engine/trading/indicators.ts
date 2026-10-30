// Technical indicators on columns of numbers (Float64Array out, NaN while
// an indicator warms up). Every kernel computes the outputs from index
// `from` on, assuming the outputs before it are up to date: the chart
// recomputes only the last bar on each tick, even with a million bars.

import { offsetOf, zoneOffset, type UtcOffset } from "./format";
import type {
  TradingBar,
  TradingBarColumns,
  TradingBarsInput,
  TradingTimeframe,
  TradingVolumeProfile,
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

/**
 * Highest (or lowest) value of the window ending at each index, NaN while
 * the window is incomplete or holds a NaN. A monotonic queue of indices
 * makes it O(1) per bar whatever the period (Ichimoku uses 52 bars).
 */
const extremeInto = (
  src: Values,
  n: number,
  p: number,
  out: Float64Array,
  from: number,
  highest: boolean,
) => {
  const queue = new Int32Array(p + 1);
  let head = 0;
  let tail = 0;
  let lastNaN = -1;
  const better = (a: number, b: number) => (highest ? a >= b : a <= b);
  const push = (i: number) => {
    const v = src[i];
    if (!finite(v)) {
      lastNaN = i;
      head = tail = 0;
      return;
    }
    while (tail > head && better(v, src[queue[(tail - 1) % (p + 1)]])) tail--;
    queue[tail % (p + 1)] = i;
    tail++;
    while (queue[head % (p + 1)] <= i - p) head++;
  };
  // the window ending just before `from`
  for (let i = Math.max(0, from - p + 1); i < from; i++) push(i);
  for (let i = from; i < n; i++) {
    push(i);
    out[i] =
      i < p - 1 || lastNaN > i - p || tail === head
        ? NaN
        : src[queue[head % (p + 1)]];
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
  utcOffset: UtcOffset = 0,
): number => {
  if (reset === "none") return 0;
  const t = time + offsetOf(utcOffset, time) * 60_000;
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
  utcOffset: UtcOffset,
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

/** On-balance volume: the volume added on up closes, subtracted on down closes */
export const obvInto = (
  close: Values,
  volume: Values,
  n: number,
  out: Float64Array,
  from = 0,
): void => {
  for (let i = from; i < n; i++) {
    if (i === 0) {
      out[i] = 0;
      continue;
    }
    const v = finite(volume[i]) ? volume[i] : 0;
    const prev = finite(out[i - 1]) ? out[i - 1] : 0;
    const change = close[i] - close[i - 1];
    out[i] = prev + (change > 0 ? v : change < 0 ? -v : 0);
  }
};

/** Typical price (high + low + close) / 3 */
const typicalInto = (
  high: Values,
  low: Values,
  close: Values,
  n: number,
  out: Float64Array,
  from: number,
) => {
  for (let i = from; i < n; i++) out[i] = (high[i] + low[i] + close[i]) / 3;
};

/** Commodity channel index: distance of the typical price from its average, in mean deviations / 0.015 */
export const cciInto = (
  high: Values,
  low: Values,
  close: Values,
  n: number,
  period: number,
  out: Float64Array,
  typical: Float64Array,
  mean: Float64Array,
  from = 0,
): void => {
  const p = periodOf(period);
  typicalInto(high, low, close, n, typical, from);
  smaInto(typical, n, p, mean, from);
  for (let i = from; i < n; i++) {
    const m = mean[i];
    if (!finite(m)) {
      out[i] = NaN;
      continue;
    }
    let deviation = 0;
    for (let k = i - p + 1; k <= i; k++) deviation += Math.abs(typical[k] - m);
    deviation /= p;
    out[i] = deviation === 0 ? 0 : (typical[i] - m) / (0.015 * deviation);
  }
};

/** Williams %R (−100 to 0): the close within the range of the window, from its high */
export const williamsRInto = (
  high: Values,
  low: Values,
  close: Values,
  n: number,
  period: number,
  out: Float64Array,
  highest: Float64Array,
  lowest: Float64Array,
  from = 0,
): void => {
  const p = periodOf(period);
  extremeInto(high, n, p, highest, from, true);
  extremeInto(low, n, p, lowest, from, false);
  for (let i = from; i < n; i++) {
    const hh = highest[i];
    const ll = lowest[i];
    out[i] =
      !finite(hh) || !finite(ll)
        ? NaN
        : hh === ll
          ? -50
          : ((hh - close[i]) / (hh - ll)) * -100;
  }
};

/** Money flow index (0-100): an RSI of the typical price weighted by the volume */
export const mfiInto = (
  high: Values,
  low: Values,
  close: Values,
  volume: Values,
  n: number,
  period: number,
  out: Float64Array,
  typical: Float64Array,
  from = 0,
): void => {
  const p = periodOf(period);
  typicalInto(high, low, close, n, typical, Math.max(0, from - p - 1));
  for (let i = from; i < n; i++) {
    if (i < p) {
      out[i] = NaN;
      continue;
    }
    let positive = 0;
    let negative = 0;
    let ok = true;
    for (let k = i - p + 1; k <= i; k++) {
      const flow = typical[k] * (finite(volume[k]) ? volume[k] : 0);
      if (!finite(flow) || !finite(typical[k - 1])) {
        ok = false;
        break;
      }
      if (typical[k] > typical[k - 1]) positive += flow;
      else if (typical[k] < typical[k - 1]) negative += flow;
    }
    out[i] = !ok
      ? NaN
      : negative === 0
        ? positive === 0
          ? 50
          : 100
        : 100 - 100 / (1 + positive / negative);
  }
};

/** Working columns of the stochastic RSI */
export interface StochRsiWork {
  rsi: Float64Array;
  gain: Float64Array;
  loss: Float64Array;
  highest: Float64Array;
  lowest: Float64Array;
  raw: Float64Array;
}

/** Stochastic RSI: the stochastic of the RSI, smoothed into K and D */
export const stochRsiInto = (
  close: Values,
  n: number,
  rsiPeriod: number,
  stochPeriod: number,
  kPeriod: number,
  dPeriod: number,
  k: Float64Array,
  d: Float64Array,
  work: StochRsiWork,
  from = 0,
): void => {
  const p = periodOf(stochPeriod);
  rsiInto(close, n, rsiPeriod, work.rsi, work.gain, work.loss, from);
  extremeInto(work.rsi, n, p, work.highest, from, true);
  extremeInto(work.rsi, n, p, work.lowest, from, false);
  for (let i = from; i < n; i++) {
    const hh = work.highest[i];
    const ll = work.lowest[i];
    work.raw[i] =
      !finite(hh) || !finite(ll)
        ? NaN
        : hh === ll
          ? 50
          : ((work.rsi[i] - ll) / (hh - ll)) * 100;
  }
  smaInto(work.raw, n, kPeriod, k, from);
  smaInto(k, n, dPeriod, d, from);
};

/** Working columns of the DMI */
export interface DmiWork {
  tr: Float64Array;
  plusDm: Float64Array;
  minusDm: Float64Array;
  smoothTr: Float64Array;
  smoothPlus: Float64Array;
  smoothMinus: Float64Array;
  dx: Float64Array;
}

/** Directional movement index (Wilder): +DI, −DI and the ADX */
export const dmiInto = (
  high: Values,
  low: Values,
  close: Values,
  n: number,
  period: number,
  adxPeriod: number,
  plus: Float64Array,
  minus: Float64Array,
  adx: Float64Array,
  work: DmiWork,
  from = 0,
): void => {
  for (let i = from; i < n; i++) {
    if (i === 0) {
      work.tr[i] = work.plusDm[i] = work.minusDm[i] = NaN;
      continue;
    }
    const up = high[i] - high[i - 1];
    const down = low[i - 1] - low[i];
    work.plusDm[i] = up > down && up > 0 ? up : 0;
    work.minusDm[i] = down > up && down > 0 ? down : 0;
    const pc = close[i - 1];
    work.tr[i] = Math.max(
      high[i] - low[i],
      Math.abs(high[i] - pc),
      Math.abs(low[i] - pc),
    );
  }
  rmaInto(work.tr, n, period, work.smoothTr, from);
  rmaInto(work.plusDm, n, period, work.smoothPlus, from);
  rmaInto(work.minusDm, n, period, work.smoothMinus, from);
  for (let i = from; i < n; i++) {
    const tr = work.smoothTr[i];
    plus[i] = tr ? (100 * work.smoothPlus[i]) / tr : NaN;
    minus[i] = tr ? (100 * work.smoothMinus[i]) / tr : NaN;
    const sum = plus[i] + minus[i];
    work.dx[i] = !finite(sum)
      ? NaN
      : sum === 0
        ? 0
        : (100 * Math.abs(plus[i] - minus[i])) / sum;
  }
  rmaInto(work.dx, n, adxPeriod, adx, from);
};

/** Working columns of the parabolic SAR */
export interface PsarWork {
  /** Extreme point of the trend */
  ep: Float64Array;
  /** Acceleration factor */
  af: Float64Array;
  /** 1 rising, −1 falling */
  trend: Float64Array;
}

/** Parabolic stop and reverse (Wilder) */
export const psarInto = (
  high: Values,
  low: Values,
  n: number,
  start: number,
  increment: number,
  maximum: number,
  out: Float64Array,
  work: PsarWork,
  from = 0,
): void => {
  const { ep, af, trend } = work;
  for (let i = from; i < n; i++) {
    if (i === 0) {
      out[i] = ep[i] = af[i] = trend[i] = NaN;
      continue;
    }
    if (!finite(trend[i - 1])) {
      // the first two bars set the direction
      const up = high[i] + low[i] >= high[i - 1] + low[i - 1];
      out[i] = up
        ? Math.min(low[i - 1], low[i])
        : Math.max(high[i - 1], high[i]);
      ep[i] = up
        ? Math.max(high[i - 1], high[i])
        : Math.min(low[i - 1], low[i]);
      af[i] = start;
      trend[i] = finite(out[i]) ? (up ? 1 : -1) : NaN;
      continue;
    }
    const prevEp = ep[i - 1];
    const prevAf = af[i - 1];
    let sar = out[i - 1] + prevAf * (prevEp - out[i - 1]);
    const before = i >= 2 ? i - 2 : i - 1;
    if (trend[i - 1] === 1) {
      sar = Math.min(sar, low[i - 1], low[before]);
      if (low[i] < sar) {
        trend[i] = -1;
        sar = Math.max(prevEp, high[i]);
        ep[i] = low[i];
        af[i] = start;
      } else {
        trend[i] = 1;
        ep[i] = Math.max(prevEp, high[i]);
        af[i] =
          high[i] > prevEp ? Math.min(prevAf + increment, maximum) : prevAf;
      }
    } else {
      sar = Math.max(sar, high[i - 1], high[before]);
      if (high[i] > sar) {
        trend[i] = 1;
        sar = Math.min(prevEp, low[i]);
        ep[i] = high[i];
        af[i] = start;
      } else {
        trend[i] = -1;
        ep[i] = Math.min(prevEp, low[i]);
        af[i] =
          low[i] < prevEp ? Math.min(prevAf + increment, maximum) : prevAf;
      }
    }
    out[i] = sar;
  }
};

/** Working columns of the SuperTrend */
export interface SupertrendWork {
  tr: Float64Array;
  atr: Float64Array;
  upper: Float64Array;
  lower: Float64Array;
}

/**
 * SuperTrend: a trailing band `multiplier` ATRs from the median price,
 * below the bars in an uptrend (`direction` 1), above them in a downtrend (−1)
 */
export const supertrendInto = (
  high: Values,
  low: Values,
  close: Values,
  n: number,
  period: number,
  multiplier: number,
  out: Float64Array,
  direction: Float64Array,
  work: SupertrendWork,
  from = 0,
): void => {
  const { tr, atr: range, upper, lower } = work;
  trueRangeInto(high, low, close, n, tr, from);
  rmaInto(tr, n, period, range, from);
  for (let i = from; i < n; i++) {
    const a = range[i];
    if (!finite(a)) {
      out[i] = direction[i] = upper[i] = lower[i] = NaN;
      continue;
    }
    const mid = (high[i] + low[i]) / 2;
    let up = mid + multiplier * a;
    let down = mid - multiplier * a;
    const pu = i > 0 ? upper[i - 1] : NaN;
    const pl = i > 0 ? lower[i - 1] : NaN;
    const pc = i > 0 ? close[i - 1] : NaN;
    // the bands only tighten while the trend holds
    if (finite(pl) && !(down > pl || pc < pl)) down = pl;
    if (finite(pu) && !(up < pu || pc > pu)) up = pu;
    upper[i] = up;
    lower[i] = down;
    const pd = i > 0 ? direction[i - 1] : NaN;
    const d = !finite(pd)
      ? -1
      : pd === -1
        ? close[i] > up
          ? 1
          : -1
        : close[i] < down
          ? -1
          : 1;
    direction[i] = d;
    out[i] = d === 1 ? down : up;
  }
};

/** Midpoint of the highest high and the lowest low of a window */
const midpointInto = (
  high: Values,
  low: Values,
  n: number,
  period: number,
  out: Float64Array,
  highest: Float64Array,
  lowest: Float64Array,
  from: number,
) => {
  const p = periodOf(period);
  extremeInto(high, n, p, highest, from, true);
  extremeInto(low, n, p, lowest, from, false);
  for (let i = from; i < n; i++) out[i] = (highest[i] + lowest[i]) / 2;
};

/** Working columns of Ichimoku */
export interface IchimokuWork {
  highest: Float64Array;
  lowest: Float64Array;
}

/**
 * Ichimoku lines at each bar (unshifted): conversion (Tenkan), base
 * (Kijun), leading span A and B (drawn `displacement − 1` bars ahead)
 */
export const ichimokuInto = (
  high: Values,
  low: Values,
  n: number,
  conversionPeriod: number,
  basePeriod: number,
  spanBPeriod: number,
  conversion: Float64Array,
  base: Float64Array,
  spanA: Float64Array,
  spanB: Float64Array,
  work: IchimokuWork,
  from = 0,
): void => {
  const { highest, lowest } = work;
  midpointInto(
    high,
    low,
    n,
    conversionPeriod,
    conversion,
    highest,
    lowest,
    from,
  );
  midpointInto(high, low, n, basePeriod, base, highest, lowest, from);
  midpointInto(high, low, n, spanBPeriod, spanB, highest, lowest, from);
  for (let i = from; i < n; i++) spanA[i] = (conversion[i] + base[i]) / 2;
};

/** Donchian channel: highest high, lowest low and their midpoint */
export const donchianInto = (
  high: Values,
  low: Values,
  n: number,
  period: number,
  upper: Float64Array,
  lower: Float64Array,
  middle: Float64Array,
  from = 0,
): void => {
  const p = periodOf(period);
  extremeInto(high, n, p, upper, from, true);
  extremeInto(low, n, p, lower, from, false);
  for (let i = from; i < n; i++) middle[i] = (upper[i] + lower[i]) / 2;
};

/** Keltner channel: an EMA of the close ± `multiplier` ATRs */
export const keltnerInto = (
  high: Values,
  low: Values,
  close: Values,
  n: number,
  period: number,
  multiplier: number,
  atrPeriod: number,
  middle: Float64Array,
  upper: Float64Array,
  lower: Float64Array,
  work: { tr: Float64Array; atr: Float64Array },
  from = 0,
): void => {
  emaInto(close, n, period, middle, from);
  trueRangeInto(high, low, close, n, work.tr, from);
  rmaInto(work.tr, n, atrPeriod, work.atr, from);
  for (let i = from; i < n; i++) {
    upper[i] = middle[i] + multiplier * work.atr[i];
    lower[i] = middle[i] - multiplier * work.atr[i];
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
 * restarting each `reset` period (UTC, or shifted by `utcOffset` minutes,
 * or in the IANA `timeZone`); without `time`, a single cumulative average
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
    timeZone?: string;
  } = {},
): Float64Array => {
  const n = close.length;
  const out = nanArray(n);
  const zone = options.timeZone;
  vwapInto(
    high,
    low,
    close,
    volume,
    options.time ?? null,
    n,
    options.reset ?? "day",
    options.utcOffset ?? (zone ? (time: number) => zoneOffset(time, zone) : 0),
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

/** On-balance volume: the running sum of the volume, signed by the close change */
export const obv = (close: Values, volume: Values): Float64Array => {
  const out = nanArray(close.length);
  obvInto(close, volume, close.length, out);
  return out;
};

/** Commodity channel index (typically between −100 and +100 in a range) */
export const cci = (
  high: Values,
  low: Values,
  close: Values,
  period = 20,
): Float64Array => {
  const n = close.length;
  const out = nanArray(n);
  cciInto(high, low, close, n, period, out, nanArray(n), nanArray(n));
  return out;
};

/** Williams %R, from −100 (close at the lowest low) to 0 (at the highest high) */
export const williamsR = (
  high: Values,
  low: Values,
  close: Values,
  period = 14,
): Float64Array => {
  const n = close.length;
  const out = nanArray(n);
  williamsRInto(high, low, close, n, period, out, nanArray(n), nanArray(n));
  return out;
};

/** Money flow index (0-100): a volume-weighted RSI of the typical price */
export const mfi = (
  high: Values,
  low: Values,
  close: Values,
  volume: Values,
  period = 14,
): Float64Array => {
  const n = close.length;
  const out = nanArray(n);
  mfiInto(high, low, close, volume, n, period, out, nanArray(n));
  return out;
};

/** Stochastic RSI (0-100): the stochastic of the RSI, smoothed into K and D */
export const stochRsi = (
  close: Values,
  options: {
    rsiPeriod?: number;
    stochPeriod?: number;
    kPeriod?: number;
    dPeriod?: number;
  } = {},
): { k: Float64Array; d: Float64Array } => {
  const n = close.length;
  const k = nanArray(n);
  const d = nanArray(n);
  stochRsiInto(
    close,
    n,
    options.rsiPeriod ?? 14,
    options.stochPeriod ?? 14,
    options.kPeriod ?? 3,
    options.dPeriod ?? 3,
    k,
    d,
    {
      rsi: nanArray(n),
      gain: nanArray(n),
      loss: nanArray(n),
      highest: nanArray(n),
      lowest: nanArray(n),
      raw: nanArray(n),
    },
  );
  return { k, d };
};

/** Directional movement (Wilder): +DI, −DI and the average directional index */
export const dmi = (
  high: Values,
  low: Values,
  close: Values,
  period = 14,
  adxPeriod = 14,
): { plus: Float64Array; minus: Float64Array; adx: Float64Array } => {
  const n = close.length;
  const plus = nanArray(n);
  const minus = nanArray(n);
  const adx = nanArray(n);
  dmiInto(high, low, close, n, period, adxPeriod, plus, minus, adx, {
    tr: nanArray(n),
    plusDm: nanArray(n),
    minusDm: nanArray(n),
    smoothTr: nanArray(n),
    smoothPlus: nanArray(n),
    smoothMinus: nanArray(n),
    dx: nanArray(n),
  });
  return { plus, minus, adx };
};

/**
 * Parabolic SAR (Wilder): a trailing stop below the bars in an uptrend,
 * above them in a downtrend, accelerating with each new extreme
 */
export const psar = (
  high: Values,
  low: Values,
  options: { start?: number; increment?: number; maximum?: number } = {},
): Float64Array => {
  const n = high.length;
  const out = nanArray(n);
  const start = options.start ?? 0.02;
  psarInto(
    high,
    low,
    n,
    start,
    options.increment ?? start,
    options.maximum ?? 0.2,
    out,
    { ep: nanArray(n), af: nanArray(n), trend: nanArray(n) },
  );
  return out;
};

/**
 * SuperTrend: the trailing band (`value`) and the trend (`direction`: 1 up,
 * −1 down)
 */
export const supertrend = (
  high: Values,
  low: Values,
  close: Values,
  period = 10,
  multiplier = 3,
): { value: Float64Array; direction: Float64Array } => {
  const n = close.length;
  const value = nanArray(n);
  const direction = nanArray(n);
  supertrendInto(high, low, close, n, period, multiplier, value, direction, {
    tr: nanArray(n),
    atr: nanArray(n),
    upper: nanArray(n),
    lower: nanArray(n),
  });
  return { value, direction };
};

/**
 * Ichimoku Kinkō Hyō, aligned on the bars that compute them: the leading
 * spans are plotted `displacement − 1` bars ahead and the lagging span is
 * the close plotted `displacement − 1` bars back
 */
export const ichimoku = (
  high: Values,
  low: Values,
  options: {
    conversionPeriod?: number;
    basePeriod?: number;
    spanBPeriod?: number;
  } = {},
): {
  conversion: Float64Array;
  base: Float64Array;
  spanA: Float64Array;
  spanB: Float64Array;
} => {
  const n = high.length;
  const out = {
    conversion: nanArray(n),
    base: nanArray(n),
    spanA: nanArray(n),
    spanB: nanArray(n),
  };
  ichimokuInto(
    high,
    low,
    n,
    options.conversionPeriod ?? 9,
    options.basePeriod ?? 26,
    options.spanBPeriod ?? 52,
    out.conversion,
    out.base,
    out.spanA,
    out.spanB,
    { highest: nanArray(n), lowest: nanArray(n) },
  );
  return out;
};

/** Keltner channel: EMA of the close ± `multiplier` average true ranges */
export const keltner = (
  high: Values,
  low: Values,
  close: Values,
  options: { period?: number; multiplier?: number; atrPeriod?: number } = {},
): { middle: Float64Array; upper: Float64Array; lower: Float64Array } => {
  const n = close.length;
  const out = { middle: nanArray(n), upper: nanArray(n), lower: nanArray(n) };
  keltnerInto(
    high,
    low,
    close,
    n,
    options.period ?? 20,
    options.multiplier ?? 2,
    options.atrPeriod ?? 10,
    out.middle,
    out.upper,
    out.lower,
    { tr: nanArray(n), atr: nanArray(n) },
  );
  return out;
};

/** Donchian channel: highest high, lowest low and their midpoint over `period` bars */
export const donchian = (
  high: Values,
  low: Values,
  period = 20,
): { upper: Float64Array; lower: Float64Array; middle: Float64Array } => {
  const n = high.length;
  const out = { upper: nanArray(n), lower: nanArray(n), middle: nanArray(n) };
  donchianInto(high, low, n, period, out.upper, out.lower, out.middle);
  return out;
};

/**
 * Volume profile: the volume of bars `from..to` (inclusive) spread over
 * `rows` price rows (each bar evenly over its low-high range), split by
 * rising / falling bars, with the point of control and the value area
 * (the rows around it holding `valueArea` of the volume, 70% by default)
 */
export const volumeProfile = (
  bars: {
    open: Values;
    high: Values;
    low: Values;
    close: Values;
    volume: Values;
  },
  options: {
    from?: number;
    to?: number;
    rows?: number;
    valueArea?: number;
  } = {},
): TradingVolumeProfile => {
  const count = bars.close.length;
  const from = Math.max(0, Math.floor(options.from ?? 0));
  const to = Math.min(count - 1, Math.floor(options.to ?? count - 1));
  const rows = Math.max(1, Math.floor(options.rows ?? 24));
  let lo = Infinity;
  let hi = -Infinity;
  for (let i = from; i <= to; i++) {
    if (bars.low[i] < lo) lo = bars.low[i];
    if (bars.high[i] > hi) hi = bars.high[i];
  }
  const up = new Float64Array(rows);
  const down = new Float64Array(rows);
  const empty = {
    low: lo,
    high: hi,
    step: 0,
    up,
    down,
    total: 0,
    poc: -1,
    valueAreaFrom: -1,
    valueAreaTo: -1,
  };
  if (!finite(lo) || !finite(hi)) return empty;
  if (hi === lo) {
    hi += Math.abs(lo) * 1e-6 || 1e-6;
    lo -= Math.abs(lo) * 1e-6 || 1e-6;
  }
  const step = (hi - lo) / rows;
  let total = 0;
  for (let i = from; i <= to; i++) {
    const v = bars.volume[i];
    const l = bars.low[i];
    const h = bars.high[i];
    if (!(v > 0) || !finite(l) || !finite(h)) continue;
    const target = bars.close[i] >= bars.open[i] ? up : down;
    total += v;
    const r0 = Math.min(rows - 1, Math.max(0, Math.floor((l - lo) / step)));
    const r1 = Math.min(rows - 1, Math.max(0, Math.floor((h - lo) / step)));
    if (r0 === r1 || h <= l) {
      target[r0] += v;
      continue;
    }
    const span = h - l;
    for (let r = r0; r <= r1; r++) {
      const bottom = lo + r * step;
      const overlap = Math.min(h, bottom + step) - Math.max(l, bottom);
      if (overlap > 0) target[r] += (v * overlap) / span;
    }
  }
  if (!(total > 0)) return { ...empty, low: lo, high: hi, step };
  let poc = 0;
  for (let r = 1; r < rows; r++)
    if (up[r] + down[r] > up[poc] + down[poc]) poc = r;
  // grow the value area from the point of control toward the larger side
  const wanted = total * Math.min(1, Math.max(0, options.valueArea ?? 0.7));
  let a = poc;
  let b = poc;
  let inside = up[poc] + down[poc];
  while (inside < wanted && (a > 0 || b < rows - 1)) {
    const below = a > 0 ? up[a - 1] + down[a - 1] : -1;
    const above = b < rows - 1 ? up[b + 1] + down[b + 1] : -1;
    if (above >= below) {
      b++;
      inside += up[b] + down[b];
    } else {
      a--;
      inside += up[a] + down[a];
    }
  }
  return {
    low: lo,
    high: hi,
    step,
    up,
    down,
    total,
    poc,
    valueAreaFrom: a,
    valueAreaTo: b,
  };
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

/**
 * Key of the bucket of `time` in the shifted (displayed) time: weeks start
 * on Monday, months on the 1st. Comparing keys rather than UTC starts keeps
 * a day whole when its offset changes (daylight saving).
 */
export const bucketKey = (
  time: number,
  tf: ParsedTimeframe,
  utcOffset: UtcOffset = 0,
): number => {
  const t = time + offsetOf(utcOffset, time) * 60_000;
  if (tf.unit === "month") {
    const date = new Date(t);
    const months = date.getUTCFullYear() * 12 + date.getUTCMonth();
    return months - (months % tf.count);
  }
  if (tf.count % (7 * DAY) === 0) {
    // Monday-aligned weeks (the epoch is a Thursday)
    return Math.floor((t - 4 * DAY) / tf.count);
  }
  return Math.floor(t / tf.count);
};

/** Start of the bucket of `time` (weeks start on Monday, months on the 1st) */
export const bucketStart = (
  time: number,
  tf: ParsedTimeframe,
  utcOffset: UtcOffset = 0,
): number => {
  const key = bucketKey(time, tf, utcOffset);
  const shifted =
    tf.unit === "month"
      ? Date.UTC(Math.floor(key / 12), key % 12, 1)
      : tf.count % (7 * DAY) === 0
        ? key * tf.count + 4 * DAY
        : key * tf.count;
  // the offset at the start itself (it may differ from the one at `time`)
  const guess = shifted - offsetOf(utcOffset, time) * 60_000;
  return shifted - offsetOf(utcOffset, guess) * 60_000;
};

const isColumns = (bars: TradingBarsInput): bars is TradingBarColumns =>
  !Array.isArray(bars);

/**
 * Aggregates bars into a longer timeframe (`"5m"` bars into `"1H"`, ...):
 * first open, highest high, lowest low, last close, summed volume. Buckets
 * are aligned on UTC, or shifted by `timeZone` (minutes from UTC, or an
 * IANA time zone such as `"America/New_York"`); weeks start on Monday.
 * Columns in, columns out (Float64Array).
 */
export function resampleBars(
  bars: readonly TradingBar[],
  timeframe: TradingTimeframe,
  timeZone?: number | string,
): TradingBar[];
export function resampleBars(
  bars: TradingBarColumns,
  timeframe: TradingTimeframe,
  timeZone?: number | string,
): TradingBarColumns;
export function resampleBars(
  bars: TradingBarsInput,
  timeframe: TradingTimeframe,
  timeZone: number | string = 0,
): TradingBar[] | TradingBarColumns {
  const tf = parseTimeframe(timeframe);
  if (!tf) throw new Error(`Invalid timeframe: ${String(timeframe)}`);
  const offset: UtcOffset =
    typeof timeZone === "string"
      ? (time: number) => zoneOffset(time, timeZone)
      : timeZone;
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
  let currentKey = NaN;
  for (let i = 0; i < n; i++) {
    const bar = get(i);
    const key = bucketKey(bar.time, tf, offset);
    if (!current || key !== currentKey) {
      if (current) out.push(current);
      currentKey = key;
      current = {
        time: bucketStart(bar.time, tf, offset),
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
