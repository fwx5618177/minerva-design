// Ticks and labels of time axes (timestamps in ms). Calendar steps follow
// the local time or UTC (`timeZone`); labels use `Intl.DateTimeFormat` of a
// locale (month / weekday names), or ISO-like texts without a locale.

import { dateFormat } from "./locale";
import { linearTicks, tickStep } from "./scale";

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const MONTH = 30 * DAY;
const YEAR = 365 * DAY;

export type TimeUnit =
  "millisecond" | "second" | "minute" | "hour" | "day" | "month" | "year";

/** Time zone of the calendar of a time axis */
export type TimeZone = "local" | "utc";

interface Interval {
  unit: TimeUnit;
  step: number;
  /** Approximate duration (ms) */
  ms: number;
}

const INTERVALS: Interval[] = [
  { unit: "second", step: 1, ms: SECOND },
  { unit: "second", step: 5, ms: 5 * SECOND },
  { unit: "second", step: 15, ms: 15 * SECOND },
  { unit: "second", step: 30, ms: 30 * SECOND },
  { unit: "minute", step: 1, ms: MINUTE },
  { unit: "minute", step: 5, ms: 5 * MINUTE },
  { unit: "minute", step: 15, ms: 15 * MINUTE },
  { unit: "minute", step: 30, ms: 30 * MINUTE },
  { unit: "hour", step: 1, ms: HOUR },
  { unit: "hour", step: 3, ms: 3 * HOUR },
  { unit: "hour", step: 6, ms: 6 * HOUR },
  { unit: "hour", step: 12, ms: 12 * HOUR },
  { unit: "day", step: 1, ms: DAY },
  { unit: "day", step: 2, ms: 2 * DAY },
  { unit: "day", step: 7, ms: 7 * DAY },
  { unit: "month", step: 1, ms: MONTH },
  { unit: "month", step: 3, ms: 3 * MONTH },
  { unit: "month", step: 6, ms: 6 * MONTH },
];

const pad = (n: number, width = 2) => String(n).padStart(width, "0");

/** Calendar fields of a timestamp */
interface Parts {
  year: number;
  /** 0-11 */
  month: number;
  date: number;
  /** 0 = Sunday */
  day: number;
  hours: number;
  minutes: number;
  seconds: number;
  ms: number;
}

const partsOf = (t: number, utc: boolean): Parts => {
  const d = new Date(t);
  return utc
    ? {
        year: d.getUTCFullYear(),
        month: d.getUTCMonth(),
        date: d.getUTCDate(),
        day: d.getUTCDay(),
        hours: d.getUTCHours(),
        minutes: d.getUTCMinutes(),
        seconds: d.getUTCSeconds(),
        ms: d.getUTCMilliseconds(),
      }
    : {
        year: d.getFullYear(),
        month: d.getMonth(),
        date: d.getDate(),
        day: d.getDay(),
        hours: d.getHours(),
        minutes: d.getMinutes(),
        seconds: d.getSeconds(),
        ms: d.getMilliseconds(),
      };
};

/** Timestamp of calendar fields (out of range fields carry over) */
const timeOf = (
  utc: boolean,
  year: number,
  month: number,
  date = 1,
  hours = 0,
  minutes = 0,
  seconds = 0,
): number => {
  if (utc) {
    const t = Date.UTC(year, month, date, hours, minutes, seconds);
    // years 0-99 are mapped to 1900-1999 by Date.UTC
    if (year >= 0 && year < 100) {
      const d = new Date(t);
      d.setUTCFullYear(d.getUTCFullYear() - 1900);
      return d.getTime();
    }
    return t;
  }
  const d = new Date(year, month, date, hours, minutes, seconds);
  if (year >= 0 && year < 100) d.setFullYear(d.getFullYear() - 1900);
  return d.getTime();
};

const chooseInterval = (span: number, count: number): Interval => {
  const target = span / Math.max(1, count);
  if (target < SECOND * 0.75) {
    return { unit: "millisecond", step: tickStep(0, span, count), ms: 1 };
  }
  for (const interval of INTERVALS) {
    if (interval.ms >= target * 0.75) return interval;
  }
  const years = Math.max(1, tickStep(0, span / YEAR, count));
  return {
    unit: "year",
    step: Math.round(years),
    ms: Math.round(years) * YEAR,
  };
};

/** Start of the tick sequence: `t` floored to the unit, aligned on the step */
const floorTo = (t: number, { unit, step }: Interval, utc: boolean): number => {
  const p = partsOf(t, utc);
  switch (unit) {
    case "second":
      return timeOf(
        utc,
        p.year,
        p.month,
        p.date,
        p.hours,
        p.minutes,
        p.seconds - (p.seconds % step),
      );
    case "minute":
      return timeOf(
        utc,
        p.year,
        p.month,
        p.date,
        p.hours,
        p.minutes - (p.minutes % step),
      );
    case "hour":
      return timeOf(utc, p.year, p.month, p.date, p.hours - (p.hours % step));
    case "day":
      // weeks start on Monday
      return timeOf(
        utc,
        p.year,
        p.month,
        p.date - (step === 7 ? (p.day + 6) % 7 : 0),
      );
    case "month":
      return timeOf(utc, p.year, p.month - (p.month % step));
    case "year":
      return timeOf(utc, p.year - (p.year % step), 0);
    default:
      return t;
  }
};

const advance = (t: number, { unit, step }: Interval, utc: boolean): number => {
  const p = partsOf(t, utc);
  const { year, month, date, hours, minutes, seconds } = p;
  switch (unit) {
    case "second":
      return timeOf(utc, year, month, date, hours, minutes, seconds + step);
    case "minute":
      return timeOf(utc, year, month, date, hours, minutes + step, seconds);
    case "hour":
      return timeOf(utc, year, month, date, hours + step, minutes, seconds);
    case "day":
      return timeOf(utc, year, month, date + step, hours, minutes, seconds);
    case "month":
      return timeOf(utc, year, month + step, date, hours, minutes, seconds);
    case "year":
      return timeOf(utc, year + step, month, date, hours, minutes, seconds);
    default:
      return t + step;
  }
};

export interface TimeTicks {
  values: number[];
  unit: TimeUnit;
  format: (value: number) => string;
}

/**
 * Calendar-aligned ticks between two timestamps
 * @param locale labels in this locale (ISO-like labels without it)
 * @param timeZone calendar of the steps and labels
 */
export const timeTicks = (
  min: number,
  max: number,
  count: number,
  locale?: string,
  timeZone: TimeZone = "local",
): TimeTicks => {
  if (min > max) [min, max] = [max, min];
  const interval = chooseInterval(max - min, count);
  if (interval.unit === "millisecond") {
    return {
      values: linearTicks(min, max, count),
      unit: "millisecond",
      format: (v) => formatTime(v, "millisecond", locale, timeZone),
    };
  }
  const utc = timeZone === "utc";
  const values: number[] = [];
  let t = floorTo(min, interval, utc);
  while (t < min) t = advance(t, interval, utc);
  while (t <= max && values.length < 500) {
    values.push(t);
    t = advance(t, interval, utc);
  }
  const { unit } = interval;
  return {
    values,
    unit,
    format: (v) => formatTick(v, unit, locale, timeZone),
  };
};

const ymd = (p: Parts) => `${p.year}-${pad(p.month + 1)}-${pad(p.date)}`;
const hm = (p: Parts) => `${pad(p.hours)}:${pad(p.minutes)}`;

const HM: Intl.DateTimeFormatOptions = {
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
};
const HMS: Intl.DateTimeFormatOptions = { ...HM, second: "2-digit" };
const MONTH_DAY: Intl.DateTimeFormatOptions = {
  month: "short",
  day: "numeric",
};
const DATE: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
};

/** Cached formatter of a locale and time zone */
const intl = (
  locale: string,
  timeZone: TimeZone,
  options: Intl.DateTimeFormatOptions,
) =>
  dateFormat(
    locale,
    timeZone === "utc" ? { ...options, timeZone: "UTC" } : options,
  );

/** Short tick label; day boundaries show the date, year boundaries the year */
const formatTick = (
  value: number,
  unit: TimeUnit,
  locale: string | undefined,
  timeZone: TimeZone,
): string => {
  const p = partsOf(value, timeZone === "utc");
  const midnight = p.hours === 0 && p.minutes === 0 && p.seconds === 0;
  const newYear = p.month === 0 && p.date === 1;
  if (locale) {
    const f = (options: Intl.DateTimeFormatOptions) =>
      intl(locale, timeZone, options).format(value);
    switch (unit) {
      case "second":
        return f(HMS);
      case "minute":
      case "hour":
        return f(midnight ? MONTH_DAY : HM);
      case "day":
        return f(newYear ? { year: "numeric" } : MONTH_DAY);
      case "month":
        return f(p.month === 0 ? { year: "numeric" } : { month: "short" });
      default:
        return f({ year: "numeric" });
    }
  }
  switch (unit) {
    case "second":
      return `${hm(p)}:${pad(p.seconds)}`;
    case "minute":
    case "hour":
      return midnight ? `${pad(p.month + 1)}-${pad(p.date)}` : hm(p);
    case "day":
      return newYear ? String(p.year) : `${pad(p.month + 1)}-${pad(p.date)}`;
    case "month":
      return p.month === 0 ? String(p.year) : `${p.year}-${pad(p.month + 1)}`;
    default:
      return String(p.year);
  }
};

/**
 * Full label (tooltips): precision follows the unit of the ticks; dates
 * show the weekday with a `locale`
 */
export const formatTime = (
  value: number,
  unit: TimeUnit = "minute",
  locale?: string,
  timeZone: TimeZone = "local",
): string => {
  if (!Number.isFinite(value) || Number.isNaN(new Date(value).getTime()))
    return "–";
  const p = partsOf(value, timeZone === "utc");
  if (locale) {
    const f = (options: Intl.DateTimeFormatOptions) =>
      intl(locale, timeZone, options).format(value);
    switch (unit) {
      case "millisecond":
        return `${f({ ...DATE, ...HMS })}.${pad(p.ms, 3)}`;
      case "second":
        return f({ ...DATE, ...HMS });
      case "minute":
      case "hour":
        return f({ ...DATE, ...HM });
      default:
        return f({ ...DATE, weekday: "short" });
    }
  }
  switch (unit) {
    case "millisecond":
      return `${ymd(p)} ${hm(p)}:${pad(p.seconds)}.${pad(p.ms, 3)}`;
    case "second":
      return `${ymd(p)} ${hm(p)}:${pad(p.seconds)}`;
    case "minute":
    case "hour":
      return `${ymd(p)} ${hm(p)}`;
    default:
      return ymd(p);
  }
};
