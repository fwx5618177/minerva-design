// Number formatting of tick labels and tooltip values.

import { stepDecimals } from "./scale";

const UNITS: readonly [number, string][] = [
  [1e12, "T"],
  [1e9, "B"],
  [1e6, "M"],
  [1e3, "k"],
];

const trim = (text: string) =>
  text.includes(".") ? text.replace(/\.?0+$/, "") : text;

/** `1234567` -> `1.23M`, `0.5` -> `0.5`; `-0` is printed as `0` */
export const formatCompact = (value: number, maxDecimals = 2): string => {
  if (!Number.isFinite(value)) return String(value);
  if (Object.is(value, -0) || value === 0) return "0";
  const abs = Math.abs(value);
  for (const [unit, suffix] of UNITS) {
    if (abs >= unit) return trim((value / unit).toFixed(maxDecimals)) + suffix;
  }
  if (abs < 1e-4) return value.toExponential(1);
  const decimals = Math.min(6, Math.max(maxDecimals, stepDecimals(abs) + 2));
  return trim(value.toFixed(decimals));
};

/**
 * Formatter of the ticks of a linear axis: enough decimals to tell the
 * ticks apart; compact units (k, M, ...) when the values are large.
 */
export const tickFormatter = (step: number, maxAbs: number) => {
  if (maxAbs >= 1e4) {
    const unit = UNITS.find(([u]) => maxAbs >= u)?.[0] ?? 1;
    const decimals = Math.min(3, stepDecimals(step / unit));
    return (value: number) => formatCompact(value, decimals);
  }
  const decimals = stepDecimals(step);
  return (value: number) => {
    const text = value.toFixed(decimals);
    return /^-0(\.0*)?$/.test(text) ? text.slice(1) : text;
  };
};

/** Value of a tooltip: up to 4 significant decimals */
export const formatValue = (value: number): string => {
  if (!Number.isFinite(value)) return "–";
  const abs = Math.abs(value);
  if (abs >= 1e6) return formatCompact(value, 2);
  if (Number.isInteger(value)) return value.toLocaleString("en-US");
  return trim(value.toFixed(abs >= 100 ? 2 : abs >= 1 ? 3 : 4));
};
