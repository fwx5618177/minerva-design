import React, { useEffect, useMemo, useRef } from "react";
import { cn } from "../../utils/cn";
import type { TimePickerPanelProps, TimeUnit } from "./types";
import useI18n from "../../hooks/useI18n";
import styles from "./timePickerPanel.module.scss";

type Kind = "hour" | "minute" | "second" | "ampm";

const units = (
  count: number,
  step: number,
  start = 0,
  isDisabled: (value: number) => boolean = () => false,
): TimeUnit[] => {
  const items: TimeUnit[] = [];
  for (let i = start; i < start + count; i += Math.max(1, step)) {
    items.push({
      value: i,
      disabled: isDisabled(i),
      label: String(i).padStart(2, "0"),
    });
  }
  return items;
};

/**
 * The hour / minute / second (/ AM-PM) columns of a TimePicker. Each column is
 * a listbox: Up/Down/Home/End move, Enter/Space pick, Left/Right switch column.
 */
const TimePickerPanel = ({
  value: valueProp,
  hasValue = true,
  use12Hours,
  showSecond,
  hourStep = 1,
  minuteStep = 1,
  secondStep = 1,
  minTime,
  maxTime,
  onTimeChange,
  visible,
}: TimePickerPanelProps) => {
  const { t } = useI18n();
  const panelRef = useRef<HTMLDivElement>(null);
  const value = useMemo(() => valueProp ?? new Date(0), [valueProp]);
  const hour = value.getHours();
  const minute = value.getMinutes();
  const second = value.getSeconds();
  const isPM = hour >= 12;
  const toHour24 = (h: number) => (use12Hours ? (h % 12) + (isPM ? 12 : 0) : h);

  const hours = units(
    use12Hours ? 12 : 24,
    hourStep,
    use12Hours ? 1 : 0,
    (h) => {
      const h24 = use12Hours ? (h % 12) + (isPM ? 12 : 0) : h;
      return Boolean(
        (minTime && h24 < minTime.getHours()) ||
        (maxTime && h24 > maxTime.getHours()),
      );
    },
  );
  const minutes = units(60, minuteStep, 0, (m) =>
    Boolean(
      (minTime && hour === minTime.getHours() && m < minTime.getMinutes()) ||
      (maxTime && hour === maxTime.getHours() && m > maxTime.getMinutes()),
    ),
  );
  const seconds = units(60, secondStep, 0, (s) => {
    const atMin =
      minTime && hour === minTime.getHours() && minute === minTime.getMinutes();
    const atMax =
      maxTime && hour === maxTime.getHours() && minute === maxTime.getMinutes();
    return Boolean(
      (atMin && s < minTime.getSeconds()) ||
      (atMax && s > maxTime.getSeconds()),
    );
  });
  const periods: TimeUnit[] = [
    { value: 0, label: "AM", disabled: false },
    { value: 1, label: "PM", disabled: false },
  ];

  const columns: Array<{
    kind: Kind;
    label: string;
    items: TimeUnit[];
    selected: number;
    toValue: (v: number) => number;
  }> = [
    {
      kind: "hour",
      label: t("timePicker.hours"),
      items: hours,
      selected: use12Hours ? hour % 12 || 12 : hour,
      toValue: toHour24,
    },
    {
      kind: "minute",
      label: t("timePicker.minutes"),
      items: minutes,
      selected: minute,
      toValue: (v) => v,
    },
  ];
  if (showSecond) {
    columns.push({
      kind: "second",
      label: t("timePicker.seconds"),
      items: seconds,
      selected: second,
      toValue: (v) => v,
    });
  }
  if (use12Hours) {
    columns.push({
      kind: "ampm",
      label: t("timePicker.period"),
      items: periods,
      selected: isPM ? 1 : 0,
      toValue: (v) => v,
    });
  }

  // Scroll the selected units into view when the panel opens
  useEffect(() => {
    if (!visible) return;
    panelRef.current
      ?.querySelectorAll<HTMLElement>('[aria-selected="true"]')
      .forEach((el) => el.scrollIntoView?.({ block: "nearest" }));
  }, [visible]);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    columnIndex: number,
  ) => {
    const target = e.target as HTMLElement;
    const options = Array.from(
      e.currentTarget.querySelectorAll<HTMLElement>('[role="option"]'),
    );
    const enabled = options.filter(
      (o) => o.getAttribute("aria-disabled") !== "true",
    );
    const index = enabled.indexOf(target);
    const focusColumn = (i: number) => {
      const column =
        panelRef.current?.querySelectorAll<HTMLElement>('[role="listbox"]')[i];
      column?.querySelector<HTMLElement>('[tabindex="0"]')?.focus();
    };
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        enabled[Math.min(enabled.length - 1, index + 1)]?.focus();
        break;
      case "ArrowUp":
        e.preventDefault();
        enabled[Math.max(0, index - 1)]?.focus();
        break;
      case "Home":
        e.preventDefault();
        enabled[0]?.focus();
        break;
      case "End":
        e.preventDefault();
        enabled[enabled.length - 1]?.focus();
        break;
      case "ArrowRight":
        e.preventDefault();
        focusColumn(Math.min(columns.length - 1, columnIndex + 1));
        break;
      case "ArrowLeft":
        e.preventDefault();
        focusColumn(Math.max(0, columnIndex - 1));
        break;
      default:
        break;
    }
  };

  const pick = (kind: Kind, toValue: (v: number) => number, unit: TimeUnit) => {
    if (!unit.disabled) onTimeChange(kind, toValue(unit.value));
  };

  return (
    <div className={styles.timePickerPanel} ref={panelRef}>
      <div className={styles.timeColumns}>
        {columns.map((column, columnIndex) => {
          const firstEnabled = column.items.find((u) => !u.disabled)?.value;
          const tabStop = column.items.some(
            (u) => u.value === column.selected && !u.disabled,
          )
            ? column.selected
            : firstEnabled;
          return (
            <div
              key={column.kind}
              className={styles.timeColumn}
              role="listbox"
              aria-label={column.label}
              // Roving tabindex lives on the options; the listbox is only a
              // programmatic focus target.
              tabIndex={-1}
              onKeyDown={(e) => handleKeyDown(e, columnIndex)}
            >
              {column.items.map((unit) => {
                const selected = hasValue && unit.value === column.selected;
                return (
                  <div
                    key={unit.value}
                    role="option"
                    aria-selected={selected}
                    aria-disabled={unit.disabled || undefined}
                    tabIndex={unit.value === tabStop ? 0 : -1}
                    className={cn(styles.timeUnit, {
                      [styles.selected]: selected,
                      [styles.disabled]: unit.disabled,
                    })}
                    onClick={() => pick(column.kind, column.toValue, unit)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        pick(column.kind, column.toValue, unit);
                      }
                    }}
                  >
                    {unit.label}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(TimePickerPanel);
