// Local calendar-day math of the month calendars (no time of day, no
// timezone): every date returned is local midnight.

/**
 * Local midnight of `year` / `month` (0-based) / `day`. Out-of-range months
 * and days roll over like `Date`; years below 100 are kept as is (the `Date`
 * constructor would map them to 19xx).
 */
export function localDate(year: number, month: number, day: number): Date {
  const date = new Date(0);
  date.setFullYear(year, month, day);
  date.setHours(0, 0, 0, 0);
  return date;
}

/** The local day of `date` as `"YYYY-MM-DD"`. */
export function dayKey(date: Date): string {
  return `${String(date.getFullYear()).padStart(4, "0")}-${String(
    date.getMonth() + 1,
  ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

/** Local midnight `days` days after (or before, when negative) `date`. */
export function addDays(date: Date, days: number): Date {
  return localDate(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

/** First day of the month of `date`, shifted by `offset` months. */
export function monthStart(date: Date, offset = 0): Date {
  return localDate(date.getFullYear(), date.getMonth() + offset, 1);
}

/** Whether `a` and `b` fall in the same month of the same year. */
export function sameMonth(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

const STRICT_DAY_KEY = /^(\d{4})-(\d{2})-(\d{2})$/;
const LOOSE_DAY_KEY = /^\s*(\d{4})-(\d{1,2})-(\d{1,2})\s*$/;

/**
 * Parses a `"YYYY-MM-DD"` string (or `"YYYY-M-D"` when `strict` is `false`)
 * into local midnight, rejecting out-of-range months and days (e.g. Feb 30).
 */
export function parseDayKey(text: string, strict = true): Date | null {
  const match = (strict ? STRICT_DAY_KEY : LOOSE_DAY_KEY).exec(text);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  const date = localDate(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }
  return date;
}
