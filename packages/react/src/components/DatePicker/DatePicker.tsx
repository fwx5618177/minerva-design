import React, { useEffect, useId, useRef, useState } from "react";
import {
  addDays,
  dayKey,
  localDate,
  monthStart,
  parseDayKey,
  sameMonth,
} from "@minerva/core";
import { cn } from "../../utils/cn";
import {
  IconCalendar,
  IconChevronLeft,
  IconChevronRight,
  IconX,
} from "../../internal/icons";
import { Input } from "../Input";
import { IconButton } from "../IconButton";
import { FloatingPanel } from "../../internal/FloatingPanel";
import { useLayerParent } from "../../internal/useDismissableLayer";
import { adjacentTabbable, tabLeavesPanel } from "../../internal/tabbing";
import { useControllableState } from "../../internal/useControllableState";
import { warnControlledProps } from "../../internal/devWarnings";
import { useMergedRefs } from "../../internal/mergeRefs";
import useI18n from "../../hooks/useI18n";
import { pickDataAttributes } from "../../internal/dataAttributes";
import { logicalArrowKey } from "../../internal/direction";
import {
  FormControlContext,
  useFormControlContext,
  useFormControlProps,
} from "../FormControl/context";
import type { DatePickerProps } from "./types";
import { hooks } from "../../internal/stylingHooks";
import styles from "./datePicker.module.scss";

const WEEKDAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;

/**
 * DatePicker: type a `"YYYY-MM-DD"` date or pick a day from a popup month
 * calendar grid. Works controlled (`value` + `onChange`) or uncontrolled
 * (`defaultValue`). Inside a FormControl the input picks up the field's id,
 * label, description, invalid, required, disabled and read-only state
 * (explicit props win).
 */
const DatePicker = ({
  ref,
  value,
  defaultValue,
  onChange,
  placeholder,
  label,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  id,
  required: requiredProp,
  readOnly: readOnlyProp,
  invalid: invalidProp,
  name = "date-picker",
  disabled: disabledProp,
  clearable = true,
  size = "medium",
  minDate,
  maxDate,
  locale,
  className = "",
  style,
  onOpenChange,
  ...rest
}: DatePickerProps) => {
  const { t, language } = useI18n();
  const headingId = useId();
  const fc = useFormControlContext();
  const fieldProps = useFormControlProps({
    id,
    "aria-describedby": ariaDescribedBy,
  });
  const disabled = disabledProp ?? fc?.disabled ?? false;
  const readOnly = readOnlyProp ?? fc?.readOnly ?? false;
  const required = requiredProp ?? fc?.required ?? false;
  const invalid = invalidProp ?? fc?.invalid ?? false;
  const accessibleName = label ?? ariaLabel ?? t("datePicker.label");
  const labelledBy =
    ariaLabelledBy ?? (fc && !label && !ariaLabel ? fc.labelId : undefined);

  if (process.env.NODE_ENV !== "production") {
    warnControlledProps("DatePicker", {
      prop: "value",
      value: value === null ? "" : value,
      defaultProp: "defaultValue",
      defaultValue,
      handlerProp: "onChange",
      handler: onChange,
      locked: disabled || readOnly,
      lockHint: "set `disabled` / `readOnly`",
    });
  }

  const normalizedValue = value === null ? "" : value;
  const [current, setCurrent] = useControllableState<string>({
    value: normalizedValue,
    defaultValue: defaultValue ?? "",
    name: "DatePicker",
  });
  const [open, setOpen] = useControllableState({
    defaultValue: false,
    onChange: onOpenChange,
    name: "DatePicker",
    prop: "open",
  });

  const [draft, setDraft] = useState<string | null>(null);
  const [input, setInput] = useState<HTMLInputElement | null>(null);
  const [field, setField] = useState<HTMLDivElement | null>(null);
  const setInputRef = useMergedRefs<HTMLInputElement>(setInput, ref);
  const panelRef = useRef<HTMLDivElement>(null);
  const tabContainer = useLayerParent();

  const initialDate = parseDayKey(current || "") ?? new Date();
  const [month, setMonth] = useState<Date>(() => monthStart(initialDate));
  const [focusedKey, setFocusedKey] = useState("");
  const [focusPanelOnOpen, setFocusPanelOnOpen] = useState(false);
  const cells = useRef(new Map<string, HTMLDivElement>());
  const pendingFocus = useRef<string | null>(null);

  const isDayDisabled = (key: string) => {
    if (minDate && key < minDate) return true;
    if (maxDate && key > maxDate) return true;
    return false;
  };

  const commit = (next: string) => {
    setCurrent(next);
    onChange?.(next);
  };

  const syncMonthFromValue = (val: string) => {
    const parsed = parseDayKey(val);
    if (parsed) setMonth(monthStart(parsed));
  };

  const handleInputChange = (text: string) => {
    setDraft(text);
    if (text === "") {
      commit("");
      return;
    }
    const parsed = parseDayKey(text, true);
    if (parsed) {
      const key = dayKey(parsed);
      if (!isDayDisabled(key)) {
        commit(key);
        setMonth(monthStart(parsed));
      }
    }
  };

  const handleInputBlur = () => {
    if (draft === null) return;
    const trimmed = draft.trim();
    if (trimmed === "") {
      if (current) commit("");
    } else {
      const parsed = parseDayKey(trimmed, false);
      if (parsed) {
        const key = dayKey(parsed);
        if (!isDayDisabled(key) && key !== current) {
          commit(key);
          setMonth(monthStart(parsed));
        }
      }
    }
    setDraft(null);
  };

  const handleClear = () => {
    setDraft(null);
    commit("");
    input?.focus();
  };

  const selectDate = (date: Date) => {
    const key = dayKey(date);
    if (disabled || readOnly || isDayDisabled(key)) return;
    setDraft(null);
    commit(key);
    setMonth(monthStart(date));
    setOpen(false);
    input?.focus();
  };

  const toggle = () => {
    if (disabled || readOnly) return;
    setFocusPanelOnOpen(false);
    if (!open) syncMonthFromValue(current);
    setOpen((prev) => !prev);
  };

  const first = monthStart(month);
  const start = addDays(first, -((first.getDay() + 6) % 7));
  const days = Array.from({ length: 42 }, (_, index) => addDays(start, index));
  const visibleKeys = days.map(dayKey);
  const today = new Date();
  const todayKey = dayKey(today);
  const activeKey = [
    focusedKey,
    current,
    sameMonth(today, month) ? todayKey : "",
    dayKey(first),
  ].find((key) => key && visibleKeys.includes(key));
  const monthKey = dayKey(first);

  useEffect(() => {
    if (!open || disabled || !pendingFocus.current) return;
    const cell = cells.current.get(pendingFocus.current);
    if (cell) {
      pendingFocus.current = null;
      cell.focus();
    }
  }, [open, monthKey, focusedKey, disabled]);

  const handleDayKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    date: Date,
  ) => {
    if (disabled || readOnly) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (!event.repeat) selectDate(date);
      return;
    }
    let target: Date;
    const weekday = (date.getDay() + 6) % 7;
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
    const nextKey = dayKey(target);
    pendingFocus.current = nextKey;
    setFocusedKey(nextKey);
    if (!sameMonth(target, month)) setMonth(monthStart(target));
  };

  const handlePanelKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const panel = event.currentTarget;
    if (
      !input ||
      event.key !== "Tab" ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      !tabLeavesPanel(panel, event.target as Element, event.shiftKey)
    )
      return;
    event.preventDefault();
    const next = event.shiftKey
      ? input
      : (adjacentTabbable(
          input,
          tabContainer ?? input.ownerDocument.body,
          false,
        ) ?? input);
    next.focus();
    setOpen(false);
  };

  const heading = new Intl.DateTimeFormat(locale ?? language, {
    year: "numeric",
    month: "long",
  }).format(first);

  const displayValue = draft ?? current;

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      {...pickDataAttributes(rest)}
      {...hooks("date-picker", "root", {
        state: open && !disabled && !readOnly ? "open" : "closed",
        disabled,
        readonly: readOnly,
        invalid,
        size,
      })}
      ref={setField}
      className={cn(styles.datePicker, className)}
      style={style}
      onClick={(e) => {
        if (e.target === input) toggle();
      }}
    >
      <FormControlContext.Provider value={null}>
        <Input
          ref={setInputRef}
          value={displayValue}
          placeholder={placeholder ?? t("datePicker.placeholder")}
          id={fieldProps.id}
          aria-label={accessibleName}
          aria-labelledby={labelledBy}
          aria-describedby={fieldProps["aria-describedby"]}
          aria-invalid={invalid || undefined}
          aria-readonly={readOnly || undefined}
          required={required}
          readOnly={readOnly}
          onChange={(e) => handleInputChange(e.target.value)}
          onBlur={handleInputBlur}
          onKeyDown={(e) => {
            if (e.key !== "ArrowDown") return;
            e.preventDefault();
            if (!open) {
              syncMonthFromValue(current);
              const focusTarget = current || todayKey;
              setFocusedKey(focusTarget);
              setFocusPanelOnOpen(true);
              setOpen(true);
            } else {
              panelRef.current
                ?.querySelector<HTMLElement>('[role="gridcell"][tabindex="0"]')
                ?.focus();
            }
          }}
          name={name}
          disabled={disabled}
          size={size}
          suffix={
            clearable && current && !disabled && !readOnly ? (
              <IconButton
                icon={<IconX aria-hidden focusable={false} />}
                size="small"
                aria-label={t("datePicker.clear")}
                onClick={handleClear}
                className={styles.clearButton}
              />
            ) : (
              <span
                className={styles.calendarIcon}
                aria-hidden="true"
                {...hooks("date-picker", "icon")}
              >
                <IconCalendar />
              </span>
            )
          }
        />
      </FormControlContext.Provider>
      <FloatingPanel
        ref={panelRef}
        open={open && !disabled && !readOnly}
        anchor={input}
        placement="bottom-start"
        branches={() => [field]}
        onDismiss={() => setOpen(false)}
        returnFocusOnEscape={() => input}
        focusable
        role="dialog"
        tabIndex={-1}
        aria-label={accessibleName}
        aria-labelledby={labelledBy}
        className={styles.popup}
        onKeyDown={handlePanelKeyDown}
        {...hooks("date-picker", "content", { state: "open" })}
      >
        <div className={styles.panel}>
          <div className={styles.header}>
            <h2 id={headingId} className={styles.heading} aria-live="polite">
              {heading}
            </h2>
            <div className={styles.navGroup}>
              <button
                type="button"
                className={styles.navButton}
                aria-label={t("monthCalendar.previousMonth")}
                onClick={() => setMonth(monthStart(month, -1))}
              >
                <IconChevronLeft aria-hidden focusable={false} />
              </button>
              <button
                type="button"
                className={styles.navButton}
                aria-label={t("monthCalendar.nextMonth")}
                onClick={() => setMonth(monthStart(month, 1))}
              >
                <IconChevronRight aria-hidden focusable={false} />
              </button>
            </div>
          </div>
          <div role="grid" aria-labelledby={headingId} className={styles.grid}>
            <div role="row" className={styles.week}>
              {WEEKDAYS.map((day) => (
                <div role="columnheader" key={day} className={styles.weekday}>
                  {t(`monthCalendar.weekdays.${day}`)}
                </div>
              ))}
            </div>
            {Array.from({ length: 6 }, (_, week) => (
              <div role="row" className={styles.week} key={week}>
                {days.slice(week * 7, week * 7 + 7).map((date) => {
                  const key = dayKey(date);
                  const selected = current === key;
                  const outside = !sameMonth(date, month);
                  const isToday = key === todayKey;
                  const dayDisabled = isDayDisabled(key);
                  return (
                    <div
                      role="gridcell"
                      key={key}
                      className={styles.day}
                      ref={(element) => {
                        if (element) {
                          cells.current.set(key, element);
                          if (
                            (focusPanelOnOpen && key === activeKey) ||
                            pendingFocus.current === key
                          ) {
                            pendingFocus.current = null;
                            element.focus();
                          }
                        } else {
                          cells.current.delete(key);
                        }
                      }}
                      data-date={key}
                      data-outside={outside ? "" : undefined}
                      aria-label={key}
                      aria-selected={selected}
                      aria-current={isToday ? "date" : undefined}
                      aria-disabled={dayDisabled || undefined}
                      tabIndex={!dayDisabled && key === activeKey ? 0 : -1}
                      onFocus={() => setFocusedKey(key)}
                      onClick={() => selectDate(date)}
                      onKeyDown={(event) => handleDayKeyDown(event, date)}
                    >
                      {date.getDate()}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          <div className={styles.footer}>
            <button
              type="button"
              className={styles.footerButton}
              disabled={isDayDisabled(todayKey)}
              onClick={() => selectDate(today)}
            >
              {t("datePicker.today")}
            </button>
            {clearable && current && (
              <button
                type="button"
                className={styles.footerButton}
                onClick={() => {
                  handleClear();
                  setOpen(false);
                }}
              >
                {t("datePicker.clear")}
              </button>
            )}
          </div>
        </div>
      </FloatingPanel>
    </div>
  );
};

export { DatePicker };
export default React.memo(DatePicker);
