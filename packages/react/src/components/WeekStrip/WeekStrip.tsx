import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../utils/cn";
import { IconChevronLeft, IconChevronRight } from "../../internal/icons";
import { useControllableState } from "../../internal/useControllableState";
import { warnControlledProps } from "../../internal/devWarnings";
import { addDays, dayKey, parseDayKey, weekStart } from "@minerva/core";
import useI18n from "../../hooks/useI18n";
import { logicalArrowKey } from "../../internal/direction";
import { hooks } from "../../internal/stylingHooks";
import styles from "./weekStrip.module.scss";
import type { WeekStripMarker, WeekStripProps } from "./types";

const WEEKDAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;

const markerCount = (marker: WeekStripMarker | undefined) =>
  typeof marker === "number" && Number.isFinite(marker) && marker > 0
    ? Math.floor(marker)
    : 0;

/**
 * WeekStrip: the seven days of a week in a row (a horizontal `listbox` of
 * day `option`s). Select a day by click, Enter or Space; today carries
 * `aria-current="date"`; days can show a count badge or a dot (`markers`).
 * Keyboard: a roving tab stop, ArrowLeft / ArrowRight move by a day (into
 * the previous / next week), Home / End jump to the ends of the week and
 * PageUp / PageDown move by a week. `showNavigation` adds previous / next
 * week buttons and the month of the week.
 */
const WeekStrip = ({
  value: valueProp,
  defaultValue,
  onChange,
  week: weekProp,
  defaultWeek,
  onWeekChange,
  firstDayOfWeek = 1,
  today: todayProp,
  markers,
  getDayLabel,
  showNavigation = false,
  previousWeekLabel,
  nextWeekLabel,
  weekdayLabels,
  locale,
  disabled = false,
  size = "medium",
  "aria-label": ariaLabel,
  className,
  ref,
}: WeekStripProps) => {
  const { t, language } = useI18n();
  const todayKey =
    todayProp && parseDayKey(todayProp) ? todayProp : dayKey(new Date());
  if (process.env.NODE_ENV !== "production") {
    warnControlledProps("WeekStrip", {
      prop: "value",
      value: valueProp,
      defaultProp: "defaultValue",
      defaultValue,
      handlerProp: "onChange",
      handler: onChange,
      locked: disabled,
      lockHint: "set `disabled`",
    });
    warnControlledProps("WeekStrip", {
      prop: "week",
      value: weekProp,
      defaultProp: "defaultWeek",
      defaultValue: defaultWeek,
      handlerProp: "onWeekChange",
      handler: onWeekChange,
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
    name: "WeekStrip",
  });
  const [week, setWeek] = useControllableState<Date>({
    value: weekProp,
    defaultValue: () =>
      weekStart(
        defaultWeek ??
          parseDayKey(valueProp ?? defaultValue ?? "") ??
          parseDayKey(todayKey) ??
          new Date(),
        firstDayOfWeek,
      ),
    onChange: onWeekChange,
    name: "WeekStrip",
    prop: "week",
  });
  const [focusedKey, setFocusedKey] = useState("");
  const cells = useRef(new Map<string, HTMLDivElement>());
  const pendingFocus = useRef<string | null>(null);

  const start = weekStart(week, firstDayOfWeek);
  const startKey = dayKey(start);
  const days = Array.from({ length: 7 }, (_, index) => addDays(start, index));
  const keys = days.map(dayKey);
  // Roving tab stop: the focused day, else the selection, today, the 1st.
  const activeKey =
    [focusedKey, value, todayKey].find((key) => key && keys.includes(key)) ??
    startKey;

  const goToWeek = (date: Date) => {
    const next = weekStart(date, firstDayOfWeek);
    if (dayKey(next) !== startKey) setWeek(next);
  };

  // An uncontrolled week follows the selected day (e.g. a controlled value
  // set from outside).
  const lastValue = useRef(value);
  useEffect(() => {
    if (lastValue.current === value) return;
    lastValue.current = value;
    const date = value ? parseDayKey(value) : null;
    if (weekProp === undefined && date) goToWeek(date);
  });

  // After keyboard navigation (possibly into another week), focus the day
  // once its cell exists.
  useEffect(() => {
    if (disabled || !pendingFocus.current) return;
    const cell = cells.current.get(pendingFocus.current);
    if (cell) {
      pendingFocus.current = null;
      cell.focus();
    }
  }, [startKey, focusedKey, disabled]);

  const select = (date: Date) => {
    if (disabled) return;
    setValue(dayKey(date));
    goToWeek(date);
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
    // RTL: the week runs right to left, so ArrowLeft is the next day.
    switch (logicalArrowKey(event.key, event.currentTarget)) {
      case "ArrowLeft":
        target = addDays(date, -1);
        break;
      case "ArrowRight":
        target = addDays(date, 1);
        break;
      case "Home":
        target = start;
        break;
      case "End":
        target = days[6];
        break;
      case "PageUp":
        target = addDays(date, -7);
        break;
      case "PageDown":
        target = addDays(date, 7);
        break;
      default:
        return;
    }
    event.preventDefault();
    pendingFocus.current = dayKey(target);
    setFocusedKey(dayKey(target));
    goToWeek(target);
  };

  const lang = locale ?? language;
  const longDate = new Intl.DateTimeFormat(lang, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const monthFormat = new Intl.DateTimeFormat(lang, {
    year: "numeric",
    month: "long",
  });
  const end = days[6];
  const heading =
    start.getMonth() === end.getMonth()
      ? monthFormat.format(start)
      : `${new Intl.DateTimeFormat(lang, {
          month: "long",
          ...(start.getFullYear() !== end.getFullYear() && {
            year: "numeric",
          }),
        }).format(start)} – ${monthFormat.format(end)}`;

  const dayLabel = (key: string, date: Date) => {
    const marker = markers?.[key];
    if (getDayLabel) return getDayLabel(key, marker);
    const text = longDate.format(date);
    const count = markerCount(marker);
    if (count) return t("weekStrip.dayWithMarkers", { date: text, count });
    if (marker === true) return t("weekStrip.dayMarked", { date: text });
    return text;
  };

  const list = (
    <div
      role="listbox"
      aria-label={ariaLabel ?? t("weekStrip.label")}
      aria-orientation="horizontal"
      aria-disabled={disabled || undefined}
      className={styles.days}
      {...hooks("week-strip", "list")}
    >
      {days.map((date) => {
        const key = dayKey(date);
        const selected = value === key;
        const isToday = key === todayKey;
        const marker = markers?.[key];
        const count = markerCount(marker);
        const weekday = WEEKDAYS[(date.getDay() + 6) % 7];
        return (
          <div
            role="option"
            key={key}
            ref={(element) => {
              if (element) cells.current.set(key, element);
              else cells.current.delete(key);
            }}
            className={styles.day}
            {...hooks("week-strip", "day", {
              selected,
              today: isToday,
              disabled,
            })}
            data-date={key}
            aria-label={dayLabel(key, date)}
            aria-selected={selected}
            aria-current={isToday ? "date" : undefined}
            aria-disabled={disabled || undefined}
            tabIndex={!disabled && key === activeKey ? 0 : -1}
            onFocus={() => setFocusedKey(key)}
            onClick={() => select(date)}
            onKeyDown={(event) => handleKeyDown(event, date)}
          >
            <span className={styles.weekday} aria-hidden>
              {weekdayLabels?.[(date.getDay() + 6) % 7] ??
                t(`monthCalendar.weekdays.${weekday}`)}
            </span>
            <span className={styles.dayNumber} aria-hidden>
              {date.getDate()}
            </span>
            <span
              className={cn(
                styles.marker,
                count > 0 && styles.count,
                !count && marker === true && styles.dot,
              )}
              {...hooks("week-strip", "indicator")}
              aria-hidden
            >
              {count ? (count > 99 ? "99+" : count) : null}
            </span>
          </div>
        );
      })}
    </div>
  );

  return (
    <div
      ref={ref}
      className={cn(styles.weekStrip, styles[size], className)}
      {...hooks("week-strip", "root", { disabled, size })}
    >
      {showNavigation ? (
        <div className={styles.toolbar}>
          <button
            type="button"
            className={styles.navButton}
            aria-label={previousWeekLabel ?? t("weekStrip.previousWeek")}
            disabled={disabled}
            {...hooks("week-strip", "nav-button")}
            onClick={() => goToWeek(addDays(start, -7))}
          >
            <IconChevronLeft aria-hidden focusable={false} />
          </button>
          <span
            className={styles.heading}
            aria-live="polite"
            {...hooks("week-strip", "heading")}
          >
            {heading}
          </span>
          <button
            type="button"
            className={styles.navButton}
            aria-label={nextWeekLabel ?? t("weekStrip.nextWeek")}
            disabled={disabled}
            {...hooks("week-strip", "nav-button")}
            onClick={() => goToWeek(addDays(start, 7))}
          >
            <IconChevronRight aria-hidden focusable={false} />
          </button>
        </div>
      ) : null}
      {list}
    </div>
  );
};

export { WeekStrip };
export default WeekStrip;
