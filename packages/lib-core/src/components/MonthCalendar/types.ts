import type { Ref } from "react";

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
 * Props of the MonthCalendar component: a Monday-first month grid with
 * per-day event counts, keyboard navigation and the selected day's events
 */
export interface MonthCalendarProps {
  /** Displayed month (controlled; any day of the month; pair with onMonthChange) */
  month?: Date;
  /**
   * Initially displayed month (uncontrolled)
   * @default the current month
   */
  defaultMonth?: Date;
  /** Called with the first day of the requested month, at local midnight */
  onMonthChange?: (month: Date) => void;
  /** Selected day, "YYYY-MM-DD" (controlled; pair with onChange) */
  value?: string;
  /** Initially selected day, "YYYY-MM-DD" (uncontrolled) */
  defaultValue?: string;
  /** Called with the selected day ("YYYY-MM-DD") */
  onChange?: (day: string) => void;
  /**
   * Events; each day shows how many it has
   * @default []
   */
  events?: readonly MonthCalendarEvent[];
  /** Makes the selected day's events clickable */
  onEventClick?: (event: MonthCalendarEvent) => void;
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
  ariaLabel?: string;
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
  /** Additional class name */
  className?: string;
  /** Ref to the root <section> */
  ref?: Ref<HTMLElement>;
}
