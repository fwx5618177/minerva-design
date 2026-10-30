// Ticks and value labels of an axis for its visible range.

import { formatCompact, formatValue, tickFormatter } from "./format";
import type { AxisModel } from "./model";
import { linearTicks, tickStep } from "./scale";
import { formatTime, timeTicks, type TimeUnit } from "./time";
import type { Range } from "./viewport";

export interface AxisTicks {
  values: number[];
  labels: string[];
  /** Full label of any value (tooltips) */
  formatValue: (value: number) => string;
}

/**
 * @param count approximate number of ticks (numeric / time axes) or the
 *   maximum number of labels (category axes)
 */
export const axisTicks = (
  axis: AxisModel,
  range: Range,
  count: number,
): AxisTicks => {
  const [min, max] = range[0] <= range[1] ? range : [range[1], range[0]];
  if (axis.type === "category") {
    const n = axis.categories.length;
    const first = Math.max(0, Math.ceil(min - 1e-9));
    const last = Math.min(n - 1, Math.floor(max + 1e-9));
    const visible = Math.max(0, last - first + 1);
    const step = Math.max(1, Math.ceil(visible / Math.max(1, count)));
    const values: number[] = [];
    for (let i = first - (first % step); i <= last; i += step) {
      if (i >= first) values.push(i);
    }
    const name = (v: number) => {
      const i = Math.round(v);
      return axis.format ? axis.format(i) : (axis.categories[i] ?? String(i));
    };
    return { values, labels: values.map(name), formatValue: name };
  }
  if (axis.type === "time") {
    const { locale, timeZone = "local" } = axis;
    const ticks = timeTicks(min, max, count, locale, timeZone);
    const unit: TimeUnit =
      ticks.unit === "day" || ticks.unit === "month" || ticks.unit === "year"
        ? "day"
        : ticks.unit;
    const full =
      axis.format ?? ((v: number) => formatTime(v, unit, locale, timeZone));
    return {
      values: ticks.values,
      labels: ticks.values.map(axis.format ?? ticks.format),
      formatValue: full,
    };
  }
  const values = linearTicks(min, max, count);
  const step = tickStep(min, max, count);
  if (axis.type === "log") return logTicks(axis, min, max, count);
  const tick =
    axis.format ??
    tickFormatter(step, Math.max(Math.abs(min), Math.abs(max)), axis.locale);
  return {
    values,
    labels: values.map(tick),
    formatValue:
      axis.format ?? ((value: number) => formatValue(value, axis.locale)),
  };
};

/**
 * Ticks of a log axis (`min` / `max` are exponents): every decade, with 2
 * and 5 between them on short ranges, every few decades on long ones;
 * labelled with the values (`1k`, `10k`)
 */
const logTicks = (
  axis: AxisModel,
  min: number,
  max: number,
  count: number,
): AxisTicks => {
  const span = max - min;
  const values: number[] = [];
  const raw: number[] = [];
  const push = (v: number) => {
    const e = Math.log10(v);
    if (e >= min - 1e-9 && e <= max + 1e-9) {
      values.push(e);
      raw.push(v);
    }
  };
  if (span < 1) {
    // less than a decade: plain ticks of the values
    for (const v of linearTicks(10 ** min, 10 ** max, count))
      if (v > 0) push(v);
  } else {
    const every = Math.max(1, Math.ceil(span / Math.max(1, count)));
    const between = span * 3 <= count * 1.6 ? [2, 5] : [];
    for (let e = Math.floor(min); e <= Math.ceil(max); e++) {
      if (e % every !== 0) continue;
      const decade = Number((10 ** e).toPrecision(12));
      push(decade);
      for (const m of between) push(Number((m * decade).toPrecision(12)));
    }
  }
  const label =
    axis.format ?? ((v: number) => formatCompact(v, 2, axis.locale));
  return {
    values,
    labels: raw.map(label),
    formatValue:
      axis.format ?? ((value: number) => formatValue(value, axis.locale)),
  };
};
