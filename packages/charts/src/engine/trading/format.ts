// Formatting of prices, volumes and times, and the labels of the time axis.
// `locale` is resolved by the caller (`resolveLocale`) on hot paths.

import {
  compactUnits,
  numberFormat as sharedNumberFormat,
  resolveLocale,
} from "../locale";

export const MINUTE = 60_000;
export const HOUR = 3_600_000;
export const DAY = 86_400_000;

const numberFormat = (
  locale: string | undefined,
  options: Intl.NumberFormatOptions,
): Intl.NumberFormat => sharedNumberFormat(resolveLocale(locale), options);

const RED_UP_REGIONS = new Set(["CN", "TW", "JP", "KR"]);
const RED_UP_LANGUAGES = new Set(["zh", "ja", "ko"]);

/**
 * Whether the markets of `locale` show rising prices in red (`colorConvention:
 * "auto"`): regions CN, TW, JP and KR, or Chinese / Japanese / Korean without a
 * region (`zh-Hant` too; `zh-HK` / `zh-SG` follow the global convention)
 */
export const redUpLocale = (locale: string): boolean => {
  const parts = locale.split(/[-_]/);
  const region = parts
    .slice(1)
    .find((part) => /^([A-Za-z]{2}|\d{3})$/.test(part));
  if (region) return RED_UP_REGIONS.has(region.toUpperCase());
  return RED_UP_LANGUAGES.has((parts[0] ?? "").toLowerCase());
};

/** Decimals needed by the prices (0-8), detected from a sample of them */
export const detectPrecision = (
  values: ArrayLike<number>,
  from: number,
  to: number,
): number => {
  let decimals = 0;
  const start = Math.max(0, to - 300, from);
  for (let i = start; i < to; i++) {
    const v = Math.abs(values[i]);
    if (!Number.isFinite(v)) continue;
    while (decimals < 8) {
      const scaled = v * 10 ** decimals;
      if (Math.abs(scaled - Math.round(scaled)) < 1e-8 * Math.max(1, scaled))
        break;
      decimals++;
    }
  }
  return decimals;
};

/** Price formatter: fixed decimals, grouped digits of `locale` */
export const priceFormatter = (
  precision: number,
  locale: string | undefined,
): ((value: number) => string) => {
  const p = Math.max(0, Math.min(12, Math.round(precision)));
  const format = numberFormat(locale, {
    minimumFractionDigits: p,
    maximumFractionDigits: p,
  });
  return (value) =>
    Number.isFinite(value) ? typographicMinus(format.format(value)) : "–";
};

/** The minus sign (U+2212) instead of the hyphen-minus of `Intl` */
export const typographicMinus = (text: string): string =>
  text.replace("-", "−");

/** `12345678` -> `12.35M` (`1234.57万` in Chinese and Japanese) */
export const formatVolume = (value: number, locale?: string): string => {
  if (!Number.isFinite(value)) return "–";
  const format = numberFormat(locale, { maximumFractionDigits: 2 });
  const abs = Math.abs(value);
  for (const [unit, suffix] of compactUnits(locale)) {
    // 999,999 shows as 1M, not 1,000k
    if (abs >= unit * 0.999995)
      return typographicMinus(`${format.format(value / unit)}${suffix}`);
  }
  return typographicMinus(format.format(value));
};

/** `+1.25%` */
export const formatPercent = (
  value: number,
  locale?: string,
  decimals = 2,
): string => {
  if (!Number.isFinite(value)) return "–";
  const text = numberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(Math.abs(value));
  const zero = Math.abs(value) < 0.5 * 10 ** -decimals;
  return `${zero ? "" : value > 0 ? "+" : "−"}${text}%`;
};

/** Any value with `decimals` decimals (indicator panes) */
export const formatFixed = (
  value: number,
  decimals: number,
  locale?: string,
): string =>
  Number.isFinite(value)
    ? typographicMinus(
        numberFormat(locale, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }).format(value),
      )
    : "–";

// ------------------------------------------------------------------ times

const dateFormats = new Map<string, Intl.DateTimeFormat>();

/** Formats shifted times with the UTC getters (the offset is applied before) */
export const dateFormat = (
  locale: string | undefined,
  options: Intl.DateTimeFormatOptions,
): Intl.DateTimeFormat => {
  const key = `${locale ?? ""}|${JSON.stringify(options)}`;
  let format = dateFormats.get(key);
  if (!format) {
    const full = { ...options, timeZone: "UTC" };
    try {
      format = new Intl.DateTimeFormat(resolveLocale(locale), full);
    } catch {
      format = new Intl.DateTimeFormat("en", full);
    }
    dateFormats.set(key, format);
  }
  return format;
};

/** Offset of the displayed time from UTC, in minutes, at `time` */
export const offsetAt = (time: number, utcOffset: number | undefined) =>
  utcOffset ?? -new Date(Number.isFinite(time) ? time : 0).getTimezoneOffset();

/** Offset from UTC in minutes: fixed, or a function of the time (time zones) */
export type UtcOffset = number | ((time: number) => number);

export const offsetOf = (offset: UtcOffset, time: number): number =>
  typeof offset === "number" ? offset : offset(time);

const zoneFormats = new Map<string, Intl.DateTimeFormat | null>();
const zoneOffsets = new Map<string, Map<number, number>>();
const QUARTER = 15 * MINUTE;

/** Whether `timeZone` is a time zone known to `Intl` (`"UTC"`, `"Asia/Shanghai"`) */
export const isTimeZone = (timeZone: string): boolean =>
  zoneFormat(timeZone) !== null;

const zoneFormat = (timeZone: string) => {
  let format = zoneFormats.get(timeZone);
  if (format === undefined) {
    try {
      format = new Intl.DateTimeFormat("en-US", {
        timeZone,
        hourCycle: "h23",
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
    } catch {
      format = null;
    }
    zoneFormats.set(timeZone, format);
  }
  return format;
};

/**
 * Offset of an IANA time zone from UTC at `time`, in minutes (daylight
 * saving included). Cached per quarter of an hour: zones change their
 * offset on quarter hours, and the time axis asks for every bar.
 */
export const zoneOffset = (time: number, timeZone: string): number => {
  const format = zoneFormat(timeZone);
  if (!format || !Number.isFinite(time))
    return -new Date(Number.isFinite(time) ? time : 0).getTimezoneOffset();
  let cache = zoneOffsets.get(timeZone);
  if (!cache) zoneOffsets.set(timeZone, (cache = new Map()));
  const bucket = Math.floor(time / QUARTER);
  let offset = cache.get(bucket);
  if (offset === undefined) {
    const at = bucket * QUARTER;
    const parts: Record<string, number> = {};
    for (const part of format.formatToParts(at))
      if (part.type !== "literal") parts[part.type] = Number(part.value);
    const local = Date.UTC(
      parts.year ?? 1970,
      (parts.month ?? 1) - 1,
      parts.day ?? 1,
      (parts.hour ?? 0) % 24,
      parts.minute ?? 0,
    );
    offset = Math.round((local - at) / MINUTE);
    if (cache.size > 50_000) cache.clear();
    cache.set(bucket, offset);
  }
  return offset;
};

/** Time shifted so that the UTC getters read the displayed time */
export const shiftTime = (time: number, utcOffset: number | undefined) =>
  time + offsetAt(time, utcOffset) * MINUTE;

/**
 * Weight of the boundary between two consecutive (shifted) bar times: the
 * largest calendar unit that changes (year 70, month 60, day 50, hours
 * 43-46, minutes 31-34, seconds 21-24, 10 otherwise)
 */
export const boundaryWeight = (prev: number, time: number): number => {
  if (!Number.isFinite(prev)) return 70;
  const a = new Date(prev);
  const b = new Date(time);
  if (a.getUTCFullYear() !== b.getUTCFullYear()) return 70;
  if (a.getUTCMonth() !== b.getUTCMonth()) return 60;
  if (a.getUTCDate() !== b.getUTCDate()) return 50;
  const steps: readonly [number, number][] = [
    [12 * HOUR, 46],
    [6 * HOUR, 45],
    [3 * HOUR, 44],
    [HOUR, 43],
    [30 * MINUTE, 34],
    [15 * MINUTE, 33],
    [5 * MINUTE, 32],
    [MINUTE, 31],
    [30_000, 24],
    [15_000, 23],
    [5_000, 22],
    [1_000, 21],
  ];
  for (const [unit, weight] of steps) {
    if (Math.floor(prev / unit) !== Math.floor(time / unit)) return weight;
  }
  return 10;
};

/** A label of the time axis */
export interface TimeTick {
  /** x in CSS pixels */
  x: number;
  text: string;
  /** Larger unit (new day of an intraday chart, new month / year) */
  bold: boolean;
}

/** Text of a tick of weight `weight` at the shifted time `time` */
export const tickText = (
  time: number,
  weight: number,
  locale: string | undefined,
  intraday: boolean,
): string => {
  if (weight >= 70) return dateFormat(locale, { year: "numeric" }).format(time);
  if (weight >= 60) return dateFormat(locale, { month: "short" }).format(time);
  if (weight >= 50) {
    return intraday
      ? dateFormat(locale, { month: "short", day: "numeric" }).format(time)
      : dateFormat(locale, { day: "numeric" }).format(time);
  }
  if (weight >= 30)
    return dateFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).format(time);
  return dateFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).format(time);
};

/**
 * Picks the time labels: candidates by decreasing weight, each kept when
 * no kept label is closer than `minGap` pixels
 */
export const pickTicks = (
  candidates: readonly { x: number; weight: number; time: number }[],
  minGap: number,
): { x: number; weight: number; time: number }[] => {
  const order = candidates
    .map((_, i) => i)
    .sort((a, b) => candidates[b].weight - candidates[a].weight || a - b);
  const kept: number[] = [];
  const result: { x: number; weight: number; time: number }[] = [];
  for (const i of order) {
    const c = candidates[i];
    // binary search of the kept x positions
    let lo = 0;
    let hi = kept.length;
    while (lo < hi) {
      const mid = (lo + hi) >>> 1;
      if (kept[mid] < c.x) lo = mid + 1;
      else hi = mid;
    }
    const left = lo > 0 ? kept[lo - 1] : -Infinity;
    const right = lo < kept.length ? kept[lo] : Infinity;
    if (c.x - left < minGap || right - c.x < minGap) continue;
    kept.splice(lo, 0, c.x);
    result.push(c);
  }
  return result.sort((a, b) => a.x - b.x);
};

/** Full time of the crosshair label (`Tue 12 Mar '24 14:35`) */
export const formatCrosshairTime = (
  shifted: number,
  timeframeMs: number,
  locale: string | undefined,
): string => {
  const date: Intl.DateTimeFormatOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  if (timeframeMs >= DAY) return dateFormat(locale, date).format(shifted);
  return dateFormat(locale, {
    ...date,
    hour: "2-digit",
    minute: "2-digit",
    ...(timeframeMs < MINUTE ? { second: "2-digit" } : {}),
    hourCycle: "h23",
  }).format(shifted);
};

/**
 * Time left before a bar closes: `42`, `04:59`, `03:04:59`, `2d 04h` (the
 * day and hour templates replace `{count}`)
 */
export const formatCountdown = (
  ms: number,
  units: { days: string; hours: string } = {
    days: "{count}d",
    hours: "{count}h",
  },
): string => {
  const s = Math.max(0, Math.floor(ms / 1000));
  const pad = (v: number) => String(v).padStart(2, "0");
  if (s >= 86_400) {
    const days = String(Math.floor(s / 86_400));
    const hours = pad(Math.floor((s % 86_400) / 3600));
    return `${units.days.replace("{count}", days)} ${units.hours.replace("{count}", hours)}`;
  }
  if (s >= 3600)
    return `${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`;
  return `${pad(Math.floor(s / 60))}:${pad(s % 60)}`;
};

/** Typical duration between bars: the median of the last gaps */
export const inferTimeframe = (time: ArrayLike<number>, n: number): number => {
  const gaps: number[] = [];
  for (let i = Math.max(1, n - 64); i < n; i++) {
    const d = time[i] - time[i - 1];
    if (d > 0 && Number.isFinite(d)) gaps.push(d);
  }
  if (!gaps.length) return DAY;
  gaps.sort((a, b) => a - b);
  // the smallest frequent gap: weekends and nights make larger ones
  return gaps[Math.floor(gaps.length * 0.25)];
};
