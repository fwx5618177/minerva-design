// Number formatting of tick labels and tooltip values. Without a `locale`
// the output is the historical one (English units, `.` decimals); with a
// locale, the units and separators of its language (`1,5 k`, `2.5万`).

import { compactUnits, numberFormat } from "./locale";
import { stepDecimals } from "./scale";

const UNITS: readonly [number, string][] = [
  [1e12, "T"],
  [1e9, "B"],
  [1e6, "M"],
  [1e3, "k"],
];

const unitCache = new Map<string, readonly [number, string][]>();

/** Compact units of a locale (English without one) */
const unitsOf = (locale?: string) => {
  if (!locale) return UNITS;
  let units = unitCache.get(locale);
  if (!units) {
    units = compactUnits(locale);
    unitCache.set(locale, units);
  }
  return units;
};

const trim = (text: string) =>
  text.includes(".") ? text.replace(/\.?0+$/, "") : text;

const decimalFormats = new Map<string, Intl.NumberFormat>();

/** `value` with at most `decimals` decimals in a locale (no trailing zeros) */
const localized = (value: number, decimals: number, locale: string) => {
  // hot path (ticks, tooltips): cheaper key than `numberFormat`'s JSON
  const key = `${locale}|${decimals}`;
  let format = decimalFormats.get(key);
  if (!format) {
    format = numberFormat(locale, { maximumFractionDigits: decimals });
    decimalFormats.set(key, format);
  }
  return format.format(value);
};

/**
 * `1234567` -> `1.23M`, `0.5` -> `0.5`; `-0` is printed as `0`. With a
 * `locale`: its compact units and separators (`123.46万` in Chinese,
 * `1,23 M` in French).
 */
export const formatCompact = (
  value: number,
  maxDecimals = 2,
  locale?: string,
): string => {
  if (!Number.isFinite(value)) return String(value);
  if (Object.is(value, -0) || value === 0) return "0";
  const abs = Math.abs(value);
  for (const [unit, suffix] of unitsOf(locale)) {
    if (abs >= unit)
      return locale
        ? localized(value / unit, maxDecimals, locale) + suffix
        : trim((value / unit).toFixed(maxDecimals)) + suffix;
  }
  if (abs < 1e-4) return value.toExponential(1);
  const decimals = Math.min(6, Math.max(maxDecimals, stepDecimals(abs) + 2));
  return locale
    ? localized(value, decimals, locale)
    : trim(value.toFixed(decimals));
};

/**
 * Formatter of the ticks of a linear axis: enough decimals to tell the
 * ticks apart; compact units (k, M, ... or 万, 亿 with a `locale`) when the
 * values are large.
 */
export const tickFormatter = (
  step: number,
  maxAbs: number,
  locale?: string,
) => {
  if (maxAbs >= 1e4) {
    const unit = unitsOf(locale).find(([u]) => maxAbs >= u)?.[0] ?? 1;
    const decimals = Math.min(3, stepDecimals(step / unit));
    return (value: number) => formatCompact(value, decimals, locale);
  }
  const decimals = stepDecimals(step);
  if (locale) {
    const format = numberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      // ticks stay below 10 000 here: `5000`, not `5,000`
      useGrouping: false,
    });
    return (value: number) => {
      const rounded = Number(value.toFixed(decimals));
      return format.format(rounded === 0 ? 0 : rounded);
    };
  }
  return (value: number) => {
    const text = value.toFixed(decimals);
    return /^-0(\.0*)?$/.test(text) ? text.slice(1) : text;
  };
};

/**
 * Value of a tooltip: up to 4 significant decimals, thousands separators
 * (of the `locale`, English without it)
 */
export const formatValue = (value: number, locale?: string): string => {
  if (!Number.isFinite(value)) return "–";
  const abs = Math.abs(value);
  if (abs >= 1e6) return formatCompact(value, 2, locale);
  const decimals = Number.isInteger(value)
    ? 0
    : abs >= 100
      ? 2
      : abs >= 1
        ? 3
        : 4;
  if (locale) return localized(value, decimals, locale);
  if (decimals === 0) return value.toLocaleString("en-US");
  return trim(value.toFixed(decimals));
};

/** `formatValue` bound to a locale */
export const valueFormatter = (locale: string) => (value: number) =>
  formatValue(value, locale);

const MINUTE = 60_000;
const HOUR = 3_600_000;
const DAY = 86_400_000;

/**
 * Length of a time range in its natural unit, in the words of a locale:
 * whole weeks (`4 weeks`, `4周`), else days (`26 days`, `26 jours`), hours
 * or minutes
 */
export const formatDuration = (ms: number, locale: string): string => {
  if (!Number.isFinite(ms)) return "–";
  const abs = Math.abs(ms);
  const days = abs / DAY;
  const weeks = days / 7;
  const [value, unit] =
    days >= 7 && Math.abs(weeks - Math.round(weeks)) < 1e-6
      ? [Math.round(weeks), "week"]
      : days >= 1
        ? [Math.round(days * 10) / 10, "day"]
        : abs >= HOUR
          ? [Math.round((abs / HOUR) * 10) / 10, "hour"]
          : [Math.round(abs / MINUTE), "minute"];
  try {
    return numberFormat(locale, {
      style: "unit",
      unit,
      unitDisplay: "long",
      maximumFractionDigits: 1,
    }).format(value);
  } catch {
    // engines without unit formatting (old mini-program runtimes)
    return `${value} ${unit}${value === 1 ? "" : "s"}`;
  }
};

/**
 * `12.5` -> `12.5%` (`12,5 %` in French): one decimal at most, exactly one
 * with `fixed` (`75.0%`)
 */
export const formatPercent = (
  value: number,
  locale?: string,
  fixed = false,
): string =>
  locale
    ? numberFormat(locale, {
        style: "percent",
        minimumFractionDigits: fixed ? 1 : 0,
        maximumFractionDigits: 1,
      }).format(value / 100)
    : `${fixed ? value.toFixed(1) : +value.toFixed(1)}%`;
