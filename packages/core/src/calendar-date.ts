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
