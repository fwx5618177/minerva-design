/** An event shown in a MonthCalendar */
export interface MonthCalendarEvent {
  /** Unique id of the event */
  id: string;
  /** Local day of the event, "YYYY-MM-DD" (no time or timezone) */
  date: string;
  /** Title of the event */
  title: string;
}

/**
 * Density of a MonthCalendar: "small" (compact cells, events as a dot),
 * "medium" or "large" (comfortable cells, the day number at the top)
 */
export type MonthCalendarSize = "small" | "medium" | "large";

/**
 * Props of `MonthCalendar` (same names and defaults as the React
 * `MonthCalendarProps`, except the selected day: `v-model` (`modelValue`)
 * instead of `value`). The displayed month is `v-model:month`. Attributes
 * fall through to the root `<section>`.
 */
export interface MonthCalendarProps {
  /** Displayed month (controlled, `v-model:month`; any day of the month) */
  month?: Date;
  /**
   * Initially displayed month (uncontrolled)
   * @default the current month
   */
  defaultMonth?: Date;
  /** Selected day, "YYYY-MM-DD" (controlled, `v-model`) */
  modelValue?: string;
  /** Initially selected day, "YYYY-MM-DD" (uncontrolled) */
  defaultValue?: string;
  /**
   * Events; each day shows how many it has
   * @default []
   */
  events?: readonly MonthCalendarEvent[];
  /**
   * First day of a highlighted range, "YYYY-MM-DD" (display only; pair with
   * rangeEnd)
   */
  rangeStart?: string;
  /**
   * Last day of a highlighted range, "YYYY-MM-DD" (display only; pair with
   * rangeStart)
   */
  rangeEnd?: string;
  /**
   * Cell density: compact ("small"), default ("medium") or comfortable
   * ("large")
   * @default "medium"
   */
  size?: MonthCalendarSize;
  /**
   * Blocks navigation, selection and event clicks
   * @default false
   */
  disabled?: boolean;
  /**
   * Lists the events of the selected day below the grid
   * @default true
   */
  showSelectedDayEvents?: boolean;
  /**
   * Accessible label of the calendar
   * @default "Month calendar" (translated)
   */
  "aria-label"?: string;
  /**
   * Label of the previous-month button
   * @default "Previous month" (translated)
   */
  previousMonthLabel?: string;
  /**
   * Label of the next-month button
   * @default "Next month" (translated)
   */
  nextMonthLabel?: string;
  /**
   * Label of the button that returns to the current month
   * @default "Today" (translated)
   */
  todayLabel?: string;
  /**
   * Locale of the month heading (Intl.DateTimeFormat)
   * @default the library language
   */
  locale?: string;
  /**
   * Column headers, Monday first (7 labels)
   * @default "Mon" ... "Sun" (translated)
   */
  weekdayLabels?: readonly string[];
  /**
   * Accessible label of a day button; receives the day ("YYYY-MM-DD") and its
   * number of events
   * @default "<day>, <n> events" (translated)
   */
  getDayLabel?: (day: string, eventCount: number) => string;
  /**
   * Accessible label of the selected day's event list
   * @default "Events on <day>" (translated)
   */
  getEventsLabel?: (day: string) => string;
  /**
   * Text shown when the selected day has no events
   * @default "No events" (translated)
   */
  emptyEventsText?: string;
}
