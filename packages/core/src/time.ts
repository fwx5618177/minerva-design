// Time-of-day formatting and parsing shared by the TimePicker of
// @minerva/lib-core and <minerva-time-picker> of @minerva/lib-web-components.

const TOKEN_PATTERN = /(HH|H|hh|h|mm|m|ss|s|a)/g;

const pad = (n: number) => String(n).padStart(2, "0");

/** Format a time with tokens HH / H / hh / h / mm / m / ss / s / a */
export const formatTime = (date: Date, format: string): string => {
  const hours24 = date.getHours();
  const hours12 = hours24 % 12 || 12;
  const values: Record<string, string> = {
    HH: pad(hours24),
    H: String(hours24),
    hh: pad(hours12),
    h: String(hours12),
    mm: pad(date.getMinutes()),
    m: String(date.getMinutes()),
    ss: pad(date.getSeconds()),
    s: String(date.getSeconds()),
    a: hours24 >= 12 ? "PM" : "AM",
  };
  return format.replace(TOKEN_PATTERN, (token) => values[token]);
};

/**
 * Parse text typed into the picker.
 * - strict: the text must match the format exactly (used while typing, so a
 *   half-typed "12:3" is not committed as 12:03)
 * - lenient: numbers may omit leading zeros ("1:2:3"), used on blur
 * Returns `undefined` when the text is not a valid time. The date part of the
 * result is `base` (defaults to today).
 */
export const parseTimeInput = (
  text: string,
  format: string,
  { strict, base }: { strict: boolean; base?: Date },
): Date | undefined => {
  const value = text.trim();
  if (!value) return undefined;
  const tokens: string[] = format.match(TOKEN_PATTERN) ?? [];
  if (strict) {
    const source = format
      .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      .replace(TOKEN_PATTERN, (token) =>
        token === "a"
          ? "\\s*([AaPp][Mm])"
          : `(\\d{${token.length === 2 ? 2 : "1,2"}})`,
      );
    if (!new RegExp(`^${source}$`).test(value)) return undefined;
  }
  const numbers = value.match(/\d+/g) ?? [];
  const period = value.match(/[AaPp][Mm]/)?.[0]?.toUpperCase();
  const numericTokens = tokens.filter((t) => t !== "a");
  if (numbers.length !== numericTokens.length) return undefined;
  const twelveHour = numericTokens.some((t) => t.startsWith("h"));
  if (twelveHour && tokens.includes("a") && !period) return undefined;

  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  numericTokens.forEach((token, i) => {
    const n = Number(numbers[i]);
    if (token.startsWith("H") || token.startsWith("h")) hours = n;
    else if (token.startsWith("m")) minutes = n;
    else seconds = n;
  });
  if (twelveHour) {
    if (hours < 1 || hours > 12) return undefined;
    if (period === "PM" && hours < 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
  }
  if (hours > 23 || minutes > 59 || seconds > 59) return undefined;
  const date = new Date(base ?? new Date());
  date.setHours(hours, minutes, seconds, 0);
  return date;
};

/** Today at 00:00:00, the base for times picked without a value */
export const startOfToday = (): Date => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
};

const VALUE_PATTERN = /^(\d{1,2}):(\d{2})(?::(\d{2}))?$/;

/**
 * Parses a value / min / max string: 24-hour `HH:mm` or `HH:mm:ss` (the
 * format of `<input type="time">`). `null` for an empty or invalid string.
 */
export const parseTimeValue = (
  text: string | null | undefined,
): Date | null => {
  const match = VALUE_PATTERN.exec((text ?? "").trim());
  if (!match) return null;
  const [hours, minutes, seconds] = [match[1], match[2], match[3] ?? "0"].map(
    Number,
  );
  if (hours > 23 || minutes > 59 || seconds > 59) return null;
  const date = startOfToday();
  date.setHours(hours, minutes, seconds, 0);
  return date;
};

/** The value string of `date`: `HH:mm:ss`, or `HH:mm` without seconds. */
export const toTimeValue = (date: Date, withSeconds: boolean): string =>
  formatTime(date, withSeconds ? "HH:mm:ss" : "HH:mm");

/** Seconds since midnight (compares times of day). */
export const secondsOfDay = (date: Date): number =>
  date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();

/** Whether a display format contains a seconds token (`ss` / `s`) */
export const formatHasSeconds = (format: string): boolean =>
  /(^|[^a-zA-Z])s{1,2}([^a-zA-Z]|$)/.test(format);

/**
 * The single source of truth of the seconds column: the format actually
 * used. Hiding seconds (`showSecond={false}` / `hide-second`) removes the
 * seconds token (and its separator) from the format, so the column, the
 * displayed text, parsing and the value always agree:
 * `"HH:mm:ss"` -> `"HH:mm"`, `"hh:mm:ss a"` -> `"hh:mm a"`.
 */
export const resolveTimeFormat = (format: string, showSecond: boolean) =>
  showSecond ? format : format.replace(/[:.\s]?s{1,2}(?![a-zA-Z])/, "");
