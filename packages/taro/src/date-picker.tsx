import { useEffect, useRef, useState } from "react";
import { View, Text } from "@tarojs/components";
import { addDays, dayKey, monthStart, parseDayKey } from "@minerva/core";
import { Button, Input } from "./components";
import { useFieldState } from "./forms";
import { Part, type NativeProps } from "./shared";
import { useI18n } from "./theme";
export interface DatePickerProps extends NativeProps {
  value?: string | null;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onOpenChange?: (open: boolean) => void;
  minDate?: string;
  maxDate?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  invalid?: boolean;
  clearable?: boolean;
  placeholder?: string;
  label?: string;
  name?: string;
  locale?: string;
  size?: "small" | "medium" | "large";
}
export function DatePicker({
  value,
  defaultValue = "",
  onChange,
  onOpenChange,
  minDate,
  maxDate,
  disabled,
  readOnly,
  required,
  invalid,
  clearable = true,
  placeholder,
  label,
  name = "date-picker",
  locale,
  size = "medium",
  ...props
}: DatePickerProps) {
  const field = useFieldState(),
    { t, language } = useI18n();
  const locked = (disabled ?? field.disabled) || (readOnly ?? field.readOnly);
  const [local, setLocal] = useState(defaultValue);
  const current = value === undefined ? local : (value ?? "");
  const [draft, setDraft] = useState<string | null>(null);
  const [open, updateOpen] = useState(false);
  const [month, setMonth] = useState(() =>
    monthStart(parseDayKey(current) ?? new Date()),
  );
  const touching = useRef(false);
  const setOpen = (next: boolean) => {
    if ((next && locked) || next === open) return;
    updateOpen(next);
    onOpenChange?.(next);
    if (next) setMonth(monthStart(parseDayKey(current) ?? new Date()));
  };
  useEffect(() => {
    setDraft(null);
  }, [value]);
  useEffect(() => {
    if (locked) setOpen(false);
  }, [locked]);
  const allowed = (key: string) =>
    (!minDate || key >= minDate) && (!maxDate || key <= maxDate);
  const commit = (next: string) => {
    if (locked) return;
    if (value === undefined) setLocal(next);
    onChange?.(next);
  };
  const blur = () => {
    if (touching.current) {
      touching.current = false;
      return;
    }
    if (locked || draft === null) return;
    const parsed = parseDayKey(draft.trim(), false);
    if (!draft.trim()) {
      if (current) commit("");
    } else if (parsed) {
      const key = dayKey(parsed);
      if (allowed(key) && key !== current) {
        commit(key);
        setMonth(monthStart(parsed));
      }
    }
    setDraft(null);
  };
  const choose = (key: string) => {
    touching.current = false;
    if (locked || !allowed(key)) return;
    setDraft(null);
    commit(key);
    setOpen(false);
  };
  const first = monthStart(month),
    start = addDays(first, -((first.getDay() + 6) % 7));
  const accessibleName = label ?? props["aria-label"] ?? t("datePicker.label");
  return (
    <Part
      name="date-picker"
      {...props}
      style={{ position: "relative", ...props.style }}
    >
      {label && <Text>{label}</Text>}
      <Input
        id={props.id ?? field.id}
        value={draft ?? current}
        name={name}
        size={size}
        aria-label={accessibleName}
        aria-labelledby={props["aria-labelledby"]}
        aria-describedby={props["aria-describedby"]}
        placeholder={placeholder ?? t("datePicker.placeholder")}
        disabled={disabled ?? field.disabled}
        readOnly={readOnly ?? field.readOnly}
        required={required ?? field.required}
        invalid={invalid ?? field.invalid}
        onClick={() => setOpen(!open)}
        onBlur={blur}
        onConfirm={() => {
          blur();
          setOpen(false);
        }}
        onChange={(text) => {
          if (locked) return;
          setDraft(text);
          if (!text) commit("");
          else {
            const parsed = parseDayKey(text, true);
            if (parsed && allowed(dayKey(parsed))) {
              commit(dayKey(parsed));
              setMonth(monthStart(parsed));
            }
          }
        }}
      />
      {clearable && current && !locked && (
        <Button
          variant="ghost"
          aria-label={t("datePicker.clear")}
          onTouchStart={() => {
            touching.current = true;
          }}
          onTouchCancel={() => {
            touching.current = false;
          }}
          onClick={() => {
            touching.current = false;
            setDraft(null);
            commit("");
          }}
        >
          ×
        </Button>
      )}
      {open && !locked && (
        <>
          <View className="mn-time-backdrop" onClick={() => setOpen(false)} />
          <View
            className="mn-calendar mn-time-panel"
            {...{ role: "dialog" }}
            aria-label={accessibleName}
            style={{
              display: "block",
              width: "320px",
              maxWidth: "calc(100vw - 32px)",
            }}
          >
            <View className="mn-row">
              <Button
                variant="ghost"
                aria-label={t("monthCalendar.previousMonth")}
                onClick={() => setMonth(monthStart(month, -1))}
              >
                ‹
              </Button>
              <Text>
                {new Intl.DateTimeFormat(locale ?? language, {
                  month: "long",
                  year: "numeric",
                }).format(month)}
              </Text>
              <Button
                variant="ghost"
                aria-label={t("monthCalendar.nextMonth")}
                onClick={() => setMonth(monthStart(month, 1))}
              >
                ›
              </Button>
            </View>
            <View className="mn-calendar-grid" {...{ role: "grid" }}>
              {["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map((day) => (
                <Text key={day} {...{ role: "columnheader" }}>
                  {t(`monthCalendar.weekdays.${day}`)}
                </Text>
              ))}
              {Array.from({ length: 42 }, (_, i) => addDays(start, i)).map(
                (date) => {
                  const key = dayKey(date);
                  return (
                    <Button
                      key={key}
                      role="gridcell"
                      variant="ghost"
                      className="mn-calendar-day"
                      aria-label={key}
                      aria-selected={key === current}
                      active={key === current}
                      disabled={!allowed(key)}
                      onTouchStart={() => {
                        touching.current = true;
                      }}
                      onTouchCancel={() => {
                        touching.current = false;
                      }}
                      onClick={() => choose(key)}
                    >
                      {date.getDate()}
                    </Button>
                  );
                },
              )}
            </View>
            <Button
              variant="ghost"
              disabled={!allowed(dayKey(new Date()))}
              onClick={() => choose(dayKey(new Date()))}
            >
              {t("datePicker.today")}
            </Button>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              {t("modal.close")}
            </Button>
          </View>
        </>
      )}
    </Part>
  );
}
