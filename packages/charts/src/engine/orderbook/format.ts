// Number, time and color helpers shared by the order book widgets.

import type { ChartTheme } from "../theme";
import type { Rgba } from "../color";
import {
  compactUnits,
  numberFormat as intlNumberFormat,
  resolveLocale,
} from "../locale";
import type { OrderBookCommonOptions } from "./types";

/** Cached `Intl.NumberFormat` with fixed decimals (page language when `locale` is omitted) */
export const numberFormat = (
  locale: string | undefined,
  decimals: number,
): Intl.NumberFormat => {
  const d = Math.max(0, Math.min(12, Math.round(decimals)));
  return intlNumberFormat(resolveLocale(locale), {
    minimumFractionDigits: d,
    maximumFractionDigits: d,
  });
};

/**
 * Compact number in the units of the language (12.4k, 1.25 M, 3.2万, 1.5億),
 * with the locale's decimal separator
 */
export const formatCompactNumber = (
  value: number,
  locale?: string,
  maxDecimals = 2,
): string => {
  if (!Number.isFinite(value)) return "–";
  const resolved = resolveLocale(locale);
  const abs = Math.abs(value);
  for (const [unit, suffix] of compactUnits(resolved)) {
    if (abs >= unit)
      return (
        intlNumberFormat(resolved, {
          maximumFractionDigits: maxDecimals,
        }).format(value / unit) + suffix
      );
  }
  return intlNumberFormat(resolved, {
    maximumFractionDigits: abs >= 100 ? 0 : abs >= 1 ? 2 : 4,
  }).format(value);
};

/** Signed percentage of a fraction (`+0.125%`), in the locale */
export const formatPercent = (
  fraction: number,
  locale?: string,
  decimals = 2,
  signed = true,
): string => {
  if (!Number.isFinite(fraction)) return "–";
  const d = Math.max(0, Math.min(6, Math.round(decimals)));
  return intlNumberFormat(resolveLocale(locale), {
    style: "percent",
    minimumFractionDigits: d,
    maximumFractionDigits: d,
    signDisplay: signed ? "exceptZero" : "auto",
  }).format(fraction);
};

export interface Formatters {
  price: (value: number) => string;
  size: (value: number) => string;
  /** Large totals: compact (12.4k, 124万) above a million */
  total: (value: number) => string;
  /** Notional values: compact above ten thousand */
  notional: (value: number) => string;
  /** Axis values: always compact when large */
  compact: (value: number) => string;
  /** Fixed decimals in the locale (basis points, shares) */
  fixed: (value: number, decimals: number) => string;
  /** Percentage of a fraction (signed by default) */
  percent: (fraction: number, decimals?: number, signed?: boolean) => string;
  /** Resolved locale (`locale` option or page language) */
  locale: string;
  priceDecimals: number;
  sizeDecimals: number;
}

/** Formatters of the options, with inferred decimals as fallbacks */
export const createFormatters = (
  options: OrderBookCommonOptions,
  inferredPrice: number,
  inferredSize: number,
): Formatters => {
  const locale = resolveLocale(options.locale);
  const priceDecimals = options.pricePrecision ?? inferredPrice;
  const sizeDecimals = options.sizePrecision ?? inferredSize;
  const priceFormat = numberFormat(locale, priceDecimals);
  const sizeFormat = numberFormat(locale, sizeDecimals);
  const finite =
    (fn: (value: number) => string) =>
    (value: number): string =>
      Number.isFinite(value) ? fn(value) : "–";
  const size = finite(options.formatSize ?? ((v) => sizeFormat.format(v)));
  const compact = (v: number) => formatCompactNumber(v, locale, 2);
  return {
    price: finite(options.formatPrice ?? ((v) => priceFormat.format(v))),
    size,
    total: finite((v) => (Math.abs(v) >= 1e6 ? compact(v) : size(v))),
    notional: finite((v) =>
      Math.abs(v) >= 1e4 ? compact(v) : numberFormat(locale, 2).format(v),
    ),
    compact: finite(compact),
    fixed: (v, decimals) =>
      Number.isFinite(v) ? numberFormat(locale, decimals).format(v) : "–",
    percent: (fraction, decimals = 2, signed = true) =>
      formatPercent(fraction, locale, decimals, signed),
    locale,
    priceDecimals,
    sizeDecimals,
  };
};

const pad = (value: number, length = 2) => String(value).padStart(length, "0");

/** `HH:MM:SS` or `HH:MM:SS.mmm`, local time */
export const formatClock = (time: number, milliseconds = true): string => {
  const d = new Date(time);
  if (Number.isNaN(d.getTime())) return "–";
  const base = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  return milliseconds ? `${base}.${pad(d.getMilliseconds(), 3)}` : base;
};

export const DEFAULT_UP = "var(--success-color, #16a34a)";
export const DEFAULT_DOWN = "var(--danger-color, #dc2626)";
const UP_FALLBACK: Rgba = [0.09, 0.64, 0.29, 1];
const DOWN_FALLBACK: Rgba = [0.86, 0.15, 0.15, 1];

/** Colors of the bids / buys (`up`) and asks / sells (`down`) */
export const sideColors = (
  theme: ChartTheme,
  options: OrderBookCommonOptions,
): { up: Rgba; down: Rgba } => {
  const resolve = (value: string, fallback: Rgba) =>
    theme.resolve ? theme.resolve(value, fallback) : fallback;
  const redUp = options.colorConvention === "red-up";
  return {
    up: resolve(
      options.upColor ?? (redUp ? DEFAULT_DOWN : DEFAULT_UP),
      redUp ? DOWN_FALLBACK : UP_FALLBACK,
    ),
    down: resolve(
      options.downColor ?? (redUp ? DEFAULT_UP : DEFAULT_DOWN),
      redUp ? UP_FALLBACK : DOWN_FALLBACK,
    ),
  };
};

/** Canvas font of the options */
export const fontOf = (
  theme: ChartTheme,
  options: OrderBookCommonOptions,
  weight: number | string = 400,
  size?: number,
): string =>
  `${weight} ${size ?? options.fontSize ?? 12}px ${options.fontFamily ?? theme.fontFamily}`;

/** Exponential smoothing factor for a frame of `dt` ms */
export const ease = (dt: number, tau: number): number =>
  tau <= 0 ? 1 : 1 - Math.exp(-Math.max(0, dt) / tau);

export const clamp = (value: number, min: number, max: number): number =>
  value < min ? min : value > max ? max : value;

/** Rounded rectangle path (`roundRect` is missing in older browsers) */
export const roundRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) => {
  const radius = Math.max(0, Math.min(r, w / 2, h / 2));
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
};
