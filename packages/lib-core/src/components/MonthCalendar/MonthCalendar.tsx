import React, { useEffect, useId, useRef, useState } from "react";
import { cn } from "../../utils/cn";
import { LuCalendarDays, LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useControllableState } from "../../internal/useControllableState";
import useI18n from "../../hooks/useI18n";
import styles from "./monthCalendar.module.scss";
import type { MonthCalendarEvent, MonthCalendarProps } from "./types";

const WEEKDAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;
const NO_EVENTS: readonly MonthCalendarEvent[] = [];

function localDate(year: number, month: number, day: number) {
  // setFullYear keeps years < 100 intact (the Date constructor maps them to 19xx).
  const date = new Date(0);
  date.setFullYear(year, month, day);
  date.setHours(0, 0, 0, 0);
  return date;
}

function dayKey(date: Date) {
  return `${String(date.getFullYear()).padStart(4, "0")}-${String(
    date.getMonth() + 1,
  ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function addDays(date: Date, days: number) {
  return localDate(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

function monthStart(date: Date, offset = 0) {
  return localDate(date.getFullYear(), date.getMonth() + offset, 1);
}

function sameMonth(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

/**
 * MonthCalendar: a Monday-first, six-week month grid. Each day shows its
 * number of events; selecting a day lists its events below the grid. Fully
 * keyboard operable (arrows, Home / End, PageUp / PageDown, Shift+Page for
 * years, Enter / Space to select) with a roving tab stop.
 */
const MonthCalendar = ({
  month: monthProp,
  defaultMonth,
  onMonthChange,
  value: valueProp,
  defaultValue,
  onChange,
  events = NO_EVENTS,
  onEventClick,
  disabled = false,
  showSelectedDayEvents = true,
  ariaLabel,
  previousMonthLabel,
  nextMonthLabel,
  todayLabel,
  emptyEventsText,
  locale,
  weekdayLabels,
  getDayLabel,
  getEventsLabel,
  className,
  ref,
}: MonthCalendarProps) => {
  const { t, language } = useI18n();
  const headingId = useId();
  const [month, setMonth] = useControllableState<Date>({
    value: monthProp,
    defaultValue: () => monthStart(defaultMonth ?? new Date()),
    onChange: onMonthChange,
  });
  const [value, setValue] = useControllableState<string | undefined>({
    value: valueProp,
    defaultValue,
    onChange: (next) => {
      if (next !== undefined) onChange?.(next);
    },
  });
  const [focusedKey, setFocusedKey] = useState("");
  const buttons = useRef(new Map<string, HTMLButtonElement>());
  const pendingFocus = useRef<string | null>(null);

  const first = monthStart(month);
  const start = addDays(first, -((first.getDay() + 6) % 7));
  const days = Array.from({ length: 42 }, (_, index) => addDays(start, index));
  const visibleKeys = days.map(dayKey);
  const today = new Date();
  const todayKey = dayKey(today);
  // Roving tab stop: the focused day, else the selection, today, the 1st.
  const activeKey = [
    focusedKey,
    value,
    sameMonth(today, month) ? todayKey : "",
    dayKey(first),
  ].find((key) => key && visibleKeys.includes(key));
  const monthKey = dayKey(first);
  const counts = new Map<string, number>();
  for (const event of events)
    counts.set(event.date, (counts.get(event.date) ?? 0) + 1);
  const selectedEvents = events.filter((event) => event.date === value);

  // After keyboard navigation (possibly into another month), focus the day
  // once its button exists.
  useEffect(() => {
    if (disabled || !pendingFocus.current) return;
    const button = buttons.current.get(pendingFocus.current);
    if (button) {
      pendingFocus.current = null;
      button.focus();
    }
  }, [monthKey, focusedKey, disabled]);

  const goToMonth = (date: Date) => setMonth(monthStart(date));

  const select = (date: Date) => {
    if (disabled) return;
    setValue(dayKey(date));
    if (!sameMonth(date, month)) goToMonth(date);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    date: Date,
  ) => {
    if (disabled) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (!event.repeat) select(date);
      return;
    }
    let target: Date;
    const weekday = (date.getDay() + 6) % 7;
    switch (event.key) {
      case "ArrowLeft":
        target = addDays(date, -1);
        break;
      case "ArrowRight":
        target = addDays(date, 1);
        break;
      case "ArrowUp":
        target = addDays(date, -7);
        break;
      case "ArrowDown":
        target = addDays(date, 7);
        break;
      case "Home":
        target = addDays(date, -weekday);
        break;
      case "End":
        target = addDays(date, 6 - weekday);
        break;
      case "PageUp":
      case "PageDown": {
        const offset =
          (event.key === "PageUp" ? -1 : 1) * (event.shiftKey ? 12 : 1);
        const next = monthStart(date, offset);
        const lastDay = addDays(monthStart(next, 1), -1).getDate();
        target = localDate(
          next.getFullYear(),
          next.getMonth(),
          Math.min(date.getDate(), lastDay),
        );
        break;
      }
      default:
        return;
    }
    event.preventDefault();
    pendingFocus.current = dayKey(target);
    setFocusedKey(dayKey(target));
    if (!sameMonth(target, month)) goToMonth(target);
  };

  const heading = new Intl.DateTimeFormat(locale ?? language, {
    year: "numeric",
    month: "long",
  }).format(first);

  return (
    <section
      ref={ref}
      className={cn(styles.monthCalendar, className)}
      aria-label={ariaLabel ?? t("monthCalendar.label")}
    >
      <div className={styles.toolbar}>
        <h2 id={headingId} className={styles.heading} aria-live="polite">
          {heading}
        </h2>
        <div className={styles.navigation}>
          <button
            type="button"
            className={cn(styles.navButton, styles.iconButton)}
            aria-label={previousMonthLabel ?? t("monthCalendar.previousMonth")}
            disabled={disabled}
            onClick={() => goToMonth(monthStart(month, -1))}
          >
            <LuChevronLeft aria-hidden focusable={false} />
          </button>
          <button
            type="button"
            className={styles.navButton}
            disabled={disabled}
            onClick={() => goToMonth(new Date())}
          >
            <LuCalendarDays aria-hidden focusable={false} />
            {todayLabel ?? t("monthCalendar.today")}
          </button>
          <button
            type="button"
            className={cn(styles.navButton, styles.iconButton)}
            aria-label={nextMonthLabel ?? t("monthCalendar.nextMonth")}
            disabled={disabled}
            onClick={() => goToMonth(monthStart(month, 1))}
          >
            <LuChevronRight aria-hidden focusable={false} />
          </button>
        </div>
      </div>
      <div role="grid" aria-labelledby={headingId} className={styles.grid}>
        <div role="row" className={styles.week}>
          {WEEKDAYS.map((day, index) => (
            <div role="columnheader" key={day} className={styles.weekday}>
              {weekdayLabels?.[index] ?? t(`monthCalendar.weekdays.${day}`)}
            </div>
          ))}
        </div>
        {Array.from({ length: 6 }, (_, week) => (
          <div role="row" className={styles.week} key={week}>
            {days.slice(week * 7, week * 7 + 7).map((date) => {
              const key = dayKey(date);
              const count = counts.get(key) ?? 0;
              const selected = value === key;
              return (
                <div
                  role="gridcell"
                  aria-selected={selected}
                  key={key}
                  className={styles.cell}
                >
                  <button
                    type="button"
                    className={styles.day}
                    ref={(element) => {
                      if (element) buttons.current.set(key, element);
                      else buttons.current.delete(key);
                    }}
                    data-date={key}
                    data-outside={!sameMonth(date, month) || undefined}
                    aria-label={
                      getDayLabel
                        ? getDayLabel(key, count)
                        : count
                          ? t("monthCalendar.dayWithEvents", {
                              date: key,
                              count,
                            })
                          : key
                    }
                    aria-pressed={selected}
                    aria-current={key === todayKey ? "date" : undefined}
                    disabled={disabled}
                    tabIndex={!disabled && key === activeKey ? 0 : -1}
                    onFocus={() => setFocusedKey(key)}
                    onClick={() => select(date)}
                    onKeyDown={(event) => handleKeyDown(event, date)}
                  >
                    <span>{date.getDate()}</span>
                    <span className={styles.count} aria-hidden>
                      {count ? (count > 99 ? "99+" : count) : " "}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      {showSelectedDayEvents && value && (
        <section
          className={styles.events}
          aria-label={
            getEventsLabel
              ? getEventsLabel(value)
              : t("monthCalendar.eventsLabel", { date: value })
          }
        >
          <h3 className={styles.eventsHeading}>{value}</h3>
          {selectedEvents.length ? (
            <ul className={styles.eventList}>
              {selectedEvents.map((event) => (
                <li key={event.id} className={styles.eventItem}>
                  {onEventClick ? (
                    <button
                      type="button"
                      className={styles.eventButton}
                      disabled={disabled}
                      onClick={() => onEventClick(event)}
                    >
                      {event.title}
                    </button>
                  ) : (
                    <span>{event.title}</span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.empty}>
              {emptyEventsText ?? t("monthCalendar.noEvents")}
            </p>
          )}
        </section>
      )}
    </section>
  );
};

export { MonthCalendar };
export default MonthCalendar;
