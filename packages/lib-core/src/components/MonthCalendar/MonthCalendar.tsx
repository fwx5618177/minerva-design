import React, { useEffect, useId, useRef, useState } from "react";
import { cn } from "../../utils/cn";
import {
  IconCalendar,
  IconChevronLeft,
  IconChevronRight,
} from "../../internal/icons";
import { useControllableState } from "../../internal/useControllableState";
import { warnControlledProps } from "../../internal/devWarnings";
import {
  addDays,
  dayKey,
  localDate,
  monthStart,
  sameMonth,
} from "@minerva/core";
import useI18n from "../../hooks/useI18n";
import { logicalArrowKey } from "../../internal/direction";
import { hooks } from "../../internal/stylingHooks";
import styles from "./monthCalendar.module.scss";
import type { MonthCalendarEvent, MonthCalendarProps } from "./types";

const WEEKDAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;
const NO_EVENTS: readonly MonthCalendarEvent[] = [];

/**
 * MonthCalendar: a Monday-first, six-week month grid. Each day shows its
 * number of events; selecting a day lists its events below the grid. Fully
 * keyboard operable (arrows, Home / End, PageUp / PageDown, Shift+Page for
 * years, Enter / Space to select) with a roving tab stop. APG date grid:
 * each day is a focusable `gridcell` carrying `aria-selected` (no inner
 * button), so the selection is announced once.
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
  "aria-label": ariaLabel,
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
  if (process.env.NODE_ENV !== "production") {
    warnControlledProps("MonthCalendar", {
      prop: "month",
      value: monthProp,
      defaultProp: "defaultMonth",
      defaultValue: defaultMonth,
      handlerProp: "onMonthChange",
      handler: onMonthChange,
      locked: disabled,
      lockHint: "set `disabled`",
    });
  }
  const [month, setMonth] = useControllableState<Date>({
    value: monthProp,
    defaultValue: () => monthStart(defaultMonth ?? new Date()),
    onChange: onMonthChange,
    name: "MonthCalendar",
    prop: "month",
  });
  if (process.env.NODE_ENV !== "production") {
    warnControlledProps("MonthCalendar", {
      prop: "value",
      value: valueProp,
      defaultProp: "defaultValue",
      defaultValue,
      handlerProp: "onChange",
      handler: onChange,
      locked: disabled,
      lockHint: "set `disabled`",
    });
  }
  const [value, setValue] = useControllableState<string | undefined>({
    value: valueProp,
    defaultValue,
    onChange: (next) => {
      if (next !== undefined) onChange?.(next);
    },
    name: "MonthCalendar",
  });
  const [focusedKey, setFocusedKey] = useState("");
  const cells = useRef(new Map<string, HTMLDivElement>());
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
  // once its cell exists.
  useEffect(() => {
    if (disabled || !pendingFocus.current) return;
    const cell = cells.current.get(pendingFocus.current);
    if (cell) {
      pendingFocus.current = null;
      cell.focus();
    }
  }, [monthKey, focusedKey, disabled]);

  const goToMonth = (date: Date) => setMonth(monthStart(date));

  const select = (date: Date) => {
    if (disabled) return;
    setValue(dayKey(date));
    if (!sameMonth(date, month)) goToMonth(date);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
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
    // RTL: the week runs right to left, so ArrowLeft is the next day.
    switch (logicalArrowKey(event.key, event.currentTarget)) {
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
      {...hooks("month-calendar", "root", { disabled })}
    >
      <div className={styles.toolbar}>
        <h2
          id={headingId}
          className={styles.heading}
          aria-live="polite"
          {...hooks("month-calendar", "heading")}
        >
          {heading}
        </h2>
        <div className={styles.navigation}>
          <button
            type="button"
            className={cn(styles.navButton, styles.iconButton)}
            aria-label={previousMonthLabel ?? t("monthCalendar.previousMonth")}
            disabled={disabled}
            {...hooks("month-calendar", "nav-button")}
            onClick={() => goToMonth(monthStart(month, -1))}
          >
            <IconChevronLeft aria-hidden focusable={false} />
          </button>
          <button
            type="button"
            className={styles.navButton}
            disabled={disabled}
            {...hooks("month-calendar", "nav-button")}
            onClick={() => goToMonth(new Date())}
          >
            <IconCalendar aria-hidden focusable={false} />
            {todayLabel ?? t("monthCalendar.today")}
          </button>
          <button
            type="button"
            className={cn(styles.navButton, styles.iconButton)}
            aria-label={nextMonthLabel ?? t("monthCalendar.nextMonth")}
            disabled={disabled}
            {...hooks("month-calendar", "nav-button")}
            onClick={() => goToMonth(monthStart(month, 1))}
          >
            <IconChevronRight aria-hidden focusable={false} />
          </button>
        </div>
      </div>
      <div
        role="grid"
        aria-labelledby={headingId}
        aria-disabled={disabled || undefined}
        className={styles.grid}
        {...hooks("month-calendar", "grid")}
      >
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
                // APG date grid: the cell itself is the focusable,
                // selectable element (roving tabindex, aria-selected).
                <div
                  role="gridcell"
                  key={key}
                  className={styles.day}
                  {...hooks("month-calendar", "day")}
                  ref={(element) => {
                    if (element) cells.current.set(key, element);
                    else cells.current.delete(key);
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
                  aria-selected={selected}
                  aria-current={key === todayKey ? "date" : undefined}
                  aria-disabled={disabled || undefined}
                  tabIndex={!disabled && key === activeKey ? 0 : -1}
                  onFocus={() => setFocusedKey(key)}
                  onClick={() => select(date)}
                  onKeyDown={(event) => handleKeyDown(event, date)}
                >
                  <span>{date.getDate()}</span>
                  <span className={styles.count} aria-hidden>
                    {count ? (count > 99 ? "99+" : count) : " "}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      {showSelectedDayEvents && value && (
        <section
          className={styles.events}
          {...hooks("month-calendar", "events")}
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
                      {...hooks("month-calendar", "event")}
                      disabled={disabled}
                      onClick={() => onEventClick(event)}
                    >
                      {event.title}
                    </button>
                  ) : (
                    <span {...hooks("month-calendar", "event")}>
                      {event.title}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.empty} {...hooks("month-calendar", "empty")}>
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
