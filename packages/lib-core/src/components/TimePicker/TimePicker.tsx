import React, { useState } from "react";
import classNames from "classnames";
import { FaClock } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Popper } from "../Popper";
import { TextField } from "../TextField";
import { IconButton } from "../IconButton";
import TimePickerPanel from "./TimePickerPanel";
import type { TimePickerProps } from "./types";
import { formatTime, parseTimeInput, startOfToday } from "./utils";
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
    <div
      className={classNames(styles.timePicker, className)}
      // clicking the input toggles the panel
      onClick={(e) => {
        if (e.target === input) toggle();
      }}
    >
      <TextField
        ref={setInputRef}
        value={displayValue}
        placeholder={placeholder ?? t("timePicker.placeholder")}
        label={label ?? ""}
        ariaLabel={label ? undefined : (ariaLabel ?? t("timePicker.label"))}
        onChange={handleInputChange}
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
      <Popper
        visible={open && !disabled}
        onVisibleChange={setOpen}
        onClickAway={() => setOpen(false)}
        trigger="manual"
        placement="bottomStart"
        type="select"
        size={size}
        tabIndex={-1}
        ariaLabel={label ?? ariaLabel ?? t("timePicker.label")}
        anchorEl={input}
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
      </Popper>
    </div>
  );
};

export default React.memo(TimePicker);
