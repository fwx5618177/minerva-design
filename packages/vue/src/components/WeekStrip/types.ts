/**
 * Marker of a WeekStrip day: a number shows a count badge (0 shows
 * nothing), true shows a dot
 */
export type WeekStripMarker = number | boolean;

/** Density of a WeekStrip */
export type WeekStripSize = "small" | "medium" | "large";

/**
 * Props of `WeekStrip` (same names and defaults as the React
 * `WeekStripProps`, except the selected day: `v-model` (`modelValue`)
 * instead of `value`). The displayed week is `v-model:week`. Attributes
 * fall through to the root `<div>`.
 */
export interface WeekStripProps {
  /** Selected day, "YYYY-MM-DD" (controlled, `v-model`) */
  modelValue?: string;
  /** Initially selected day, "YYYY-MM-DD" (uncontrolled) */
  defaultValue?: string;
  /** Displayed week (controlled, `v-model:week`; any day of the week) */
  week?: Date;
  /**
   * Initially displayed week (uncontrolled; any day of the week). While the
   * week is uncontrolled it follows the selected day.
   * @default the week of the selected day, else of today
   */
  defaultWeek?: Date;
  /**
   * First day of the week: 0 = Sunday, 1 = Monday ... 6 = Saturday
   * @default 1
   */
  firstDayOfWeek?: number;
  /**
   * The day marked as today, "YYYY-MM-DD" (e.g. a server date or a fixed
   * date in tests)
   * @default the current local day
   */
  today?: string;
  /**
   * Per-day markers keyed by "YYYY-MM-DD": a number shows a count badge
   * (99+ above 99), true shows a dot
   */
  markers?: Readonly<Record<string, WeekStripMarker>>;
  /**
   * Accessible label of a day; receives the day ("YYYY-MM-DD") and its marker
   * @default "<long date>, <n> items" (translated)
   */
  getDayLabel?: (day: string, marker: WeekStripMarker | undefined) => string;
  /**
   * Shows previous / next week buttons around the month of the week
   * @default false
   */
  showNavigation?: boolean;
  /**
   * Label of the previous-week button
   * @default "Previous week" (translated)
   */
  previousWeekLabel?: string;
  /**
   * Label of the next-week button
   * @default "Next week" (translated)
   */
  nextWeekLabel?: string;
  /**
   * Weekday names, Monday first (7 labels), whatever firstDayOfWeek is
   * @default "Mon" ... "Sun" (translated)
   */
  weekdayLabels?: readonly string[];
  /**
   * Locale of the dates (Intl.DateTimeFormat)
   * @default the library language
   */
  locale?: string;
  /**
   * Blocks selection and navigation
   * @default false
   */
  disabled?: boolean;
  /**
   * Cell density
   * @default "medium"
   */
  size?: WeekStripSize;
  /**
   * Accessible label of the day list
   * @default "Week" (translated)
   */
  "aria-label"?: string;
}
