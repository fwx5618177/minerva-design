// Vertical scales of the panes: linear, logarithmic or percent (change from
// a base price). Values are mapped to a "scaled" space (the price, its
// log10, or the percent change) in which the scale is linear.

import { tickStep } from "../scale";
import type { TradingScaleMode } from "./types";

export interface PaneScale {
  mode: TradingScaleMode;
  /** Fits the visible values (off after the user zoomed the scale) */
  auto: boolean;
  /** Visible range in scaled space */
  min: number;
  max: number;
  /** Base price of the percent mode */
  base: number;
  /** Pane position in CSS pixels */
  top: number;
  height: number;
  /** Empty space above / below the values, as fractions of the height */
  marginTop: number;
  marginBottom: number;
}

export const createScale = (mode: TradingScaleMode = "linear"): PaneScale => ({
  mode,
  auto: true,
  min: 0,
  max: 1,
  base: 1,
  top: 0,
  height: 1,
  marginTop: 0.1,
  marginBottom: 0.1,
});

/** Value -> scaled space (NaN when it has no place, e.g. log of <= 0) */
export const toScaled = (scale: PaneScale, value: number): number => {
  switch (scale.mode) {
    case "log":
      return value > 0 ? Math.log10(value) : NaN;
    case "percent":
      return scale.base ? (value / scale.base - 1) * 100 : NaN;
    default:
      return value;
  }
};

export const fromScaled = (scale: PaneScale, scaled: number): number => {
  switch (scale.mode) {
    case "log":
      return 10 ** scaled;
    case "percent":
      return (scaled / 100 + 1) * scale.base;
    default:
      return scaled;
  }
};

/** Inner band of the pane holding the range (CSS px) */
const band = (scale: PaneScale) => {
  const top = scale.top + scale.height * scale.marginTop;
  const h = scale.height * (1 - scale.marginTop - scale.marginBottom);
  return { top, h: Math.max(1, h) };
};

/** CSS y of a scaled value */
export const yOfScaled = (scale: PaneScale, scaled: number): number => {
  const { top, h } = band(scale);
  const span = scale.max - scale.min || 1;
  return top + ((scale.max - scaled) / span) * h;
};

/** CSS y of a value */
export const yOf = (scale: PaneScale, value: number): number =>
  yOfScaled(scale, toScaled(scale, value));

/** Scaled value at a CSS y */
export const scaledAt = (scale: PaneScale, y: number): number => {
  const { top, h } = band(scale);
  return scale.max - ((y - top) / h) * (scale.max - scale.min || 1);
};

/** Value at a CSS y */
export const valueAt = (scale: PaneScale, y: number): number =>
  fromScaled(scale, scaledAt(scale, y));

/**
 * Fits the scale to a range of scaled values; a flat range gets some room
 * around it, a missing one keeps the current range
 */
export const fitScale = (scale: PaneScale, lo: number, hi: number): void => {
  let a = lo;
  let b = hi;
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    if (!Number.isFinite(scale.min) || !Number.isFinite(scale.max)) {
      scale.min = 0;
      scale.max = 1;
    }
    return;
  }
  if (a > b) [a, b] = [b, a];
  if (b - a < 1e-12 * Math.max(1, Math.abs(a))) {
    const pad =
      scale.mode === "log" ? 0.01 : Math.max(Math.abs(a) * 0.01, 1e-8) || 1;
    a -= pad;
    b += pad;
  }
  scale.min = a;
  scale.max = b;
};

/** Zooms the range around its center (factor > 1 shows more) */
export const zoomScale = (scale: PaneScale, factor: number): void => {
  const mid = (scale.min + scale.max) / 2;
  const half = ((scale.max - scale.min) / 2) * factor;
  if (!(half > 0) || !Number.isFinite(half)) return;
  scale.min = mid - half;
  scale.max = mid + half;
  scale.auto = false;
};

/** Moves the range by a number of CSS pixels (positive: content goes down) */
export const panScale = (scale: PaneScale, dy: number): void => {
  const { h } = band(scale);
  const delta = (dy / h) * (scale.max - scale.min);
  scale.min += delta;
  scale.max += delta;
  scale.auto = false;
};

/** Rounds to 2 significant digits (1, 1.5, 2, 2.5, 3, ...) for log ticks */
const niceRound = (value: number): number => {
  if (!(value > 0)) return value;
  const power = 10 ** Math.floor(Math.log10(value));
  const m = value / power;
  const steps = [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 7, 8, 10];
  let best = steps[0];
  for (const s of steps) if (Math.abs(s - m) < Math.abs(best - m)) best = s;
  return best * power;
};

/**
 * Ticks of the scale in scaled space, about `minGap` CSS pixels apart.
 * Log ticks are rounded prices; percent ticks are round percents.
 */
export const scaleTicks = (
  scale: PaneScale,
  minGap = 36,
): { scaled: number[]; step: number } => {
  const { h } = band(scale);
  // the range covered by the whole pane, margins included
  const span = scale.max - scale.min;
  const extra = (span * scale.height) / h;
  const lo = scale.max - extra * (1 - scale.marginTop) - 1e-12;
  const hi = scale.max + extra * scale.marginTop + 1e-12;
  const count = Math.max(2, Math.floor(scale.height / minGap));
  const step = tickStep(lo, hi, count);
  if (!(step > 0)) return { scaled: [], step: 0 };
  const scaled: number[] = [];
  if (scale.mode === "log") {
    let previous = NaN;
    for (let t = Math.ceil(lo / step) * step; t <= hi; t += step) {
      const price = niceRound(10 ** t);
      const s = Math.log10(price);
      if (s === previous || s < lo || s > hi) continue;
      // keep the ticks at least half the gap apart once rounded
      if (
        scaled.length &&
        ((s - scaled[scaled.length - 1]) / extra) * scale.height < minGap * 0.5
      )
        continue;
      scaled.push(s);
      previous = s;
    }
    return { scaled, step };
  }
  const start = Math.ceil(lo / step - 1e-9);
  const end = Math.floor(hi / step + 1e-9);
  for (let i = start; i <= end && scaled.length < 200; i++)
    scaled.push(i * step);
  return { scaled, step };
};
