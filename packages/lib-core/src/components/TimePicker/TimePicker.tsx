import React, { useState } from "react";
import { cn } from "../../utils/cn";
import { FaClock } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Input } from "../Input";
import { IconButton } from "../IconButton";
import TimePickerPanel from "./TimePickerPanel";
import type { TimePickerProps } from "./types";
import { formatTime, parseTimeInput, startOfToday } from "./utils";
import { FloatingPanel } from "../../internal/FloatingPanel";
import { useControllableState } from "../../internal/useControllableState";
import { useMergedRefs } from "../../internal/mergeRefs";
import useI18n from "../../hooks/useI18n";
import styles from "./timePicker.module.scss";

/**
 * TimePicker: type a time or pick hours / minutes / seconds from a panel.
 * Works controlled (`value` + `onChange`) or uncontrolled (`defaultValue`).
 */
const TimePicker = ({
  ref,
  value,
  defaultValue,
  onChange,
  format = "HH:mm:ss",
  use12Hours = false,
  placeholder,
  label,
  ariaLabel,
  name = "time-picker",
  disabled = false,
  clearable = true,
  size = "medium",
  className = "",
  minTime,
  maxTime,
  showSecond = true,
  hourStep = 1,
  minuteStep = 1,
  secondStep = 1,
  onOpenChange,
}: TimePickerProps) => {
  const { t } = useI18n();
  const [current, setCurrent] = useControllableState<Date | null>({
    value,
    defaultValue: defaultValue ?? null,
  });
  const [open, setOpen] = useControllableState({
    defaultValue: false,
    onChange: onOpenChange,
  });
  // Text being typed; `null` = show the formatted value
  const [draft, setDraft] = useState<string | null>(null);
  const [input, setInput] = useState<HTMLInputElement | null>(null);
  const [field, setField] = useState<HTMLDivElement | null>(null);
  const setInputRef = useMergedRefs<HTMLInputElement>(setInput, ref);

  const commit = (next: Date | null) => {
    setCurrent(next);
    onChange?.(next ?? undefined);
  };

  const handleTimeChange = (
    type: "hour" | "minute" | "second" | "ampm",
    val: number,
  ) => {
    const next = new Date(current ?? startOfToday());
    if (type === "hour") next.setHours(val);
    else if (type === "minute") next.setMinutes(val);
    else if (type === "second") next.setSeconds(val);
    else {
      const hours = next.getHours() % 12;
      next.setHours(val === 1 ? hours + 12 : hours);
    }
    setDraft(null);
    commit(next);
  };

  const handleInputChange = (text: string) => {
    setDraft(text);
    const parsed = parseTimeInput(text, format, {
      strict: true,
      base: current ?? undefined,
    });
    if (parsed) commit(parsed);
  };

  const handleInputBlur = () => {
    if (draft === null) return;
    if (draft.trim() === "") {
      if (current) commit(null);
    } else {
      const parsed = parseTimeInput(draft, format, {
        strict: false,
        base: current ?? undefined,
      });
      if (parsed && parsed.getTime() !== current?.getTime()) commit(parsed);
    }
    setDraft(null);
  };

  const handleClear = () => {
    setDraft(null);
    commit(null);
    input?.focus();
  };

  const toggle = () => {
    if (!disabled) setOpen((prev) => !prev);
  };

  const displayValue = draft ?? (current ? formatTime(current, format) : "");

  return (
    // Clicking the input toggles the panel. The handler only reacts to clicks
    // on the inner <input>, which has its own keyboard support (ArrowDown
    // opens the panel; Escape closes it), so the wrapper is not a control.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      ref={setField}
      className={cn(styles.timePicker, className)}
      onClick={(e) => {
        if (e.target === input) toggle();
      }}
    >
      <Input
        ref={setInputRef}
        value={displayValue}
        placeholder={placeholder ?? t("timePicker.placeholder")}
        aria-label={label ?? ariaLabel ?? t("timePicker.label")}
        onChange={(e) => handleInputChange(e.target.value)}
        onBlur={handleInputBlur}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" && !open) {
            e.preventDefault();
            setOpen(true);
          }
        }}
        name={name}
        disabled={disabled}
        size={size}
        suffix={
          clearable && current && !disabled ? (
            <IconButton
              icon={<IoClose aria-hidden focusable={false} />}
              size="small"
              ariaLabel={t("timePicker.clear")}
              onClick={handleClear}
              className={styles.clearButton}
            />
          ) : (
            <span className={styles.clockIcon} aria-hidden="true">
              <FaClock />
            </span>
          )
        }
      />
      <FloatingPanel
        open={open && !disabled}
        anchor={input}
        placement="bottom-start"
        // the field (input + clear button) is part of the popup layer
        branches={() => [field]}
        onDismiss={() => setOpen(false)}
        returnFocusOnEscape={() => input}
        focusable
        role="dialog"
        tabIndex={-1}
        aria-label={label ?? ariaLabel ?? t("timePicker.label")}
        className={styles.popup}
      >
        <TimePickerPanel
          value={current ?? startOfToday()}
          hasValue={current !== null}
          format={format}
          use12Hours={use12Hours}
          showSecond={showSecond}
          hourStep={hourStep}
          minuteStep={minuteStep}
          secondStep={secondStep}
          minTime={minTime}
          maxTime={maxTime}
          onTimeChange={handleTimeChange}
          visible={open}
        />
      </FloatingPanel>
    </div>
  );
};

export default React.memo(TimePicker);
