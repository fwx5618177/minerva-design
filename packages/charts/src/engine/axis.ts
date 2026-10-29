// Ticks and value labels of an axis for its visible range.

import { formatValue, tickFormatter } from "./format";
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
    const ticks = timeTicks(min, max, count);
    const unit: TimeUnit =
      ticks.unit === "day" || ticks.unit === "month" || ticks.unit === "year"
        ? "day"
        : ticks.unit;
    const full = axis.format ?? ((v: number) => formatTime(v, unit));
    return {
      values: ticks.values,
      labels: ticks.values.map(axis.format ?? ticks.format),
      formatValue: full,
    };
  }
  const values = linearTicks(min, max, count);
  const step = tickStep(min, max, count);
  const tick =
    axis.format ?? tickFormatter(step, Math.max(Math.abs(min), Math.abs(max)));
  return {
    values,
    labels: values.map(tick),
    formatValue: axis.format ?? formatValue,
  };
};
