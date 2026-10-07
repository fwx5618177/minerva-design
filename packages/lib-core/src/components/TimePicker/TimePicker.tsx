import React, { useRef, useState } from "react";
import { cn } from "../../utils/cn";
import { IconClock, IconX } from "../../internal/icons";
import { Input } from "../Input";
import { IconButton } from "../IconButton";
import TimePickerPanel from "./TimePickerPanel";
import type { TimePickerProps } from "./types";
import { formatTime, parseTimeInput, startOfToday } from "./utils";
import { FloatingPanel } from "../../internal/FloatingPanel";
import { useLayerParent } from "../../internal/useDismissableLayer";
import { adjacentTabbable, tabLeavesPanel } from "../../internal/tabbing";
import { useControllableState } from "../../internal/useControllableState";
import { useMergedRefs } from "../../internal/mergeRefs";
import useI18n from "../../hooks/useI18n";
import { pickDataAttributes } from "../../internal/dataAttributes";
import {
  FormControlContext,
  useFormControlContext,
  useFormControlProps,
} from "../FormControl/context";
import styles from "./timePicker.module.scss";

/**
 * TimePicker: type a time or pick hours / minutes / seconds from a panel.
 * Works controlled (`value` + `onChange`) or uncontrolled (`defaultValue`).
 * Inside a FormControl the input picks up the field's id, label,
 * description, invalid, required, disabled and read-only state (explicit
 * props win).
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
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  id,
  required: requiredProp,
  readOnly: readOnlyProp,
  invalid: invalidProp,
  name = "time-picker",
  disabled: disabledProp,
  clearable = true,
  size = "medium",
  className = "",
  style,
  minTime,
  maxTime,
  showSecond = true,
  hourStep = 1,
  minuteStep = 1,
  secondStep = 1,
  onOpenChange,
  ...rest
}: TimePickerProps) => {
  const { t } = useI18n();
  const fc = useFormControlContext();
  const fieldProps = useFormControlProps({
    id,
    "aria-describedby": ariaDescribedBy,
  });
  const disabled = disabledProp ?? fc?.disabled ?? false;
  const readOnly = readOnlyProp ?? fc?.readOnly ?? false;
  const required = requiredProp ?? fc?.required ?? false;
  const invalid = invalidProp ?? fc?.invalid ?? false;
  const accessibleName = label ?? ariaLabel ?? t("timePicker.label");
  // A FormLabel names the input unless `label` / `aria-label` is given; the
  // aria-label stays as fallback (aria-labelledby wins when its target
  // exists, and is ignored when it does not).
  const labelledBy =
    ariaLabelledBy ?? (fc && !label && !ariaLabel ? fc.labelId : undefined);
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
  const panelRef = useRef<HTMLDivElement>(null);
  // Tab moves on within the enclosing layer (e.g. a Modal), else the page.
  const tabContainer = useLayerParent();
  // Opened from the keyboard: the panel moves focus into its first column.
  const [focusPanelOnOpen, setFocusPanelOnOpen] = useState(false);

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
    if (disabled || readOnly) return;
    setFocusPanelOnOpen(false);
    setOpen((prev) => !prev);
  };

  // The portalled panel sits after the input in the Tab order: Tab past its
  // last column continues after the input (its clear button, then the rest
  // of the page); Shift+Tab before its first column returns to the input.
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

  const displayValue = draft ?? (current ? formatTime(current, format) : "");

  return (
    // Clicking the input toggles the panel. The handler only reacts to clicks
    // on the inner <input>, which has its own keyboard support (ArrowDown
    // opens the panel; Escape closes it), so the wrapper is not a control.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      {...pickDataAttributes(rest)}
      ref={setField}
      className={cn(styles.timePicker, className)}
      style={style}
      onClick={(e) => {
        if (e.target === input) toggle();
      }}
    >
      {/* The field state is resolved here (explicit props win over the
          FormControl), so the inner Input must not merge it again. */}
      <FormControlContext.Provider value={null}>
        <Input
          ref={setInputRef}
          value={displayValue}
          placeholder={placeholder ?? t("timePicker.placeholder")}
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
            // ArrowDown (also Alt+ArrowDown) opens the panel and moves focus
            // into it; the portalled panel is otherwise unreachable by Tab.
            if (e.key !== "ArrowDown") return;
            e.preventDefault();
            if (!open) {
              setFocusPanelOnOpen(true);
              setOpen(true);
            } else {
              panelRef.current
                ?.querySelector<HTMLElement>('[role="option"][tabindex="0"]')
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
                aria-label={t("timePicker.clear")}
                onClick={handleClear}
                className={styles.clearButton}
              />
            ) : (
              <span className={styles.clockIcon} aria-hidden="true">
                <IconClock />
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
        // the field (input + clear button) is part of the popup layer
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
          focusOnOpen={focusPanelOnOpen}
        />
      </FloatingPanel>
    </div>
  );
};

export default React.memo(TimePicker);
