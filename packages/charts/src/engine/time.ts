// Ticks and labels of time axes (timestamps in ms, local time).

import { linearTicks, tickStep } from "./scale";

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const MONTH = 30 * DAY;
const YEAR = 365 * DAY;

export type TimeUnit =
  "millisecond" | "second" | "minute" | "hour" | "day" | "month" | "year";

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
const floorTo = (t: number, { unit, step }: Interval): Date => {
  const d = new Date(t);
  switch (unit) {
    case "second":
      d.setMilliseconds(0);
      d.setSeconds(d.getSeconds() - (d.getSeconds() % step));
      break;
    case "minute":
      d.setSeconds(0, 0);
      d.setMinutes(d.getMinutes() - (d.getMinutes() % step));
      break;
    case "hour":
      d.setMinutes(0, 0, 0);
      d.setHours(d.getHours() - (d.getHours() % step));
      break;
    case "day":
      d.setHours(0, 0, 0, 0);
      // weeks start on Monday
      if (step === 7) d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
      break;
    case "month":
      d.setHours(0, 0, 0, 0);
      d.setDate(1);
      d.setMonth(d.getMonth() - (d.getMonth() % step));
      break;
    case "year":
      d.setHours(0, 0, 0, 0);
      d.setMonth(0, 1);
      d.setFullYear(d.getFullYear() - (d.getFullYear() % step));
      break;
    default:
      break;
  }
  return d;
};

const advance = (d: Date, { unit, step }: Interval) => {
  switch (unit) {
    case "second":
      d.setSeconds(d.getSeconds() + step);
      break;
    case "minute":
      d.setMinutes(d.getMinutes() + step);
      break;
    case "hour":
      d.setHours(d.getHours() + step);
      break;
    case "day":
      d.setDate(d.getDate() + step);
      break;
    case "month":
      d.setMonth(d.getMonth() + step);
      break;
    case "year":
      d.setFullYear(d.getFullYear() + step);
      break;
    default:
      break;
  }
};

export interface TimeTicks {
  values: number[];
  unit: TimeUnit;
  format: (value: number) => string;
}

/** Calendar-aligned ticks between two timestamps */
export const timeTicks = (
  min: number,
  max: number,
  count: number,
): TimeTicks => {
  if (min > max) [min, max] = [max, min];
  const interval = chooseInterval(max - min, count);
  if (interval.unit === "millisecond") {
    return {
      values: linearTicks(min, max, count),
      unit: "millisecond",
      format: (v) => formatTime(v, "millisecond"),
    };
  }
  const values: number[] = [];
  const d = floorTo(min, interval);
  while (d.getTime() < min) advance(d, interval);
  while (d.getTime() <= max && values.length < 500) {
    values.push(d.getTime());
    advance(d, interval);
  }
  const { unit } = interval;
  return { values, unit, format: (v) => formatTick(v, unit) };
};

const ymd = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const hm = (d: Date) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;

/** Short tick label; day boundaries show the date, year boundaries the year */
const formatTick = (value: number, unit: TimeUnit): string => {
  const d = new Date(value);
  const midnight =
    d.getHours() === 0 && d.getMinutes() === 0 && d.getSeconds() === 0;
  switch (unit) {
    case "second":
      return `${hm(d)}:${pad(d.getSeconds())}`;
    case "minute":
    case "hour":
      return midnight ? `${pad(d.getMonth() + 1)}-${pad(d.getDate())}` : hm(d);
    case "day":
      return d.getMonth() === 0 && d.getDate() === 1
        ? String(d.getFullYear())
        : `${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    case "month":
      return d.getMonth() === 0
        ? String(d.getFullYear())
        : `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;
    default:
      return String(d.getFullYear());
  }
};

/** Full label (tooltips): precision follows the unit of the ticks */
export const formatTime = (
  value: number,
  unit: TimeUnit = "minute",
): string => {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "–";
  switch (unit) {
    case "millisecond":
      return `${ymd(d)} ${hm(d)}:${pad(d.getSeconds())}.${pad(d.getMilliseconds(), 3)}`;
    case "second":
      return `${ymd(d)} ${hm(d)}:${pad(d.getSeconds())}`;
    case "minute":
    case "hour":
      return `${ymd(d)} ${hm(d)}`;
    default:
      return ymd(d);
  }
};
