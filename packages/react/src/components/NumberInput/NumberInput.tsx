import { useState, type FocusEvent, type KeyboardEvent } from "react";
import { IconChevronDown, IconChevronUp } from "../../internal/icons";
import {
  clampNumber,
  formatNumberValue,
  inferStepPrecision,
  parseNumberDraft,
} from "@minerva/core";
import { cn } from "../../utils/cn";
import useI18n from "../../hooks/useI18n";
import { isAriaInvalid } from "../../internal/forms-field";
import { useControllableState } from "../../internal/useControllableState";
import { warnControlledProps, warnOnce } from "../../internal/devWarnings";
import { useFormControlProps } from "../FormControl/context";
import { hooks } from "../../internal/stylingHooks";
import type { NumberInputProps } from "./types";
import styles from "./numberInput.module.scss";

/**
 * NumberInput: numeric text field (role="spinbutton") with keyboard stepping
 * (arrows, Page Up / Down, Home / End to min / max when bounded),
 * an optional stepper, min / max clamping and fixed precision. The draft may
 * hold intermediate text ("-", "1.") while typing; it is committed on blur /
 * Enter. Mouse wheel never changes the value.
 */
export const NumberInput = ({
  value,
  defaultValue: defaultValueProp,
  onChange,
  min,
  max,
  step = 1,
  precision: precisionProp,
  size = "medium",
  invalid = false,
  disabled,
  readOnly,
  showStepper = false,
  allowEmpty = true,
  className,
  incrementLabel,
  decrementLabel,
  notANumberMessage,
  belowMinMessage,
  aboveMaxMessage,
  onBlur,
  onKeyDown,
  ref,
  ...rest
}: NumberInputProps) => {
  const { t } = useI18n();
  const field = useFormControlProps({ ...rest, disabled, readOnly });
  const isDisabled = !!field.disabled;
  const isLocked = isDisabled || !!field.readOnly;
  const precision = precisionProp ?? inferStepPrecision(step);

  if (process.env.NODE_ENV !== "production") {
    if (min !== undefined && max !== undefined && min > max) {
      warnOnce(
        "NumberInput:min>max",
        `[minerva] NumberInput: \`min\` (${min}) is greater than \`max\` (${max}); clamping cannot satisfy both. Swap or fix the bounds.`,
      );
    }
    if (!(step > 0)) {
      warnOnce(
        "NumberInput:step",
        `[minerva] NumberInput: \`step\` must be a positive number, got ${step}.`,
      );
    }
    warnControlledProps("NumberInput", {
      prop: "value",
      value,
      defaultProp: "defaultValue",
      defaultValue: defaultValueProp,
      handlerProp: "onChange",
      handler: onChange,
      locked: isLocked,
      lockHint: "set `disabled` / `readOnly`",
    });
  }
  const [current, setCurrent] = useControllableState<number | null>({
    value,
    defaultValue: defaultValueProp ?? null,
    onChange,
    name: "NumberInput",
  });

  const [draft, setDraft] = useState(() =>
    formatNumberValue(current, precision),
  );
  // Sync the draft when the value changes from outside (derived during
  // render), unless the draft already shows that number (keeps "1." etc.).
  const [synced, setSynced] = useState({ current, precision });
  if (synced.current !== current || synced.precision !== precision) {
    setSynced({ current, precision });
    const numeric = parseNumberDraft(draft);
    if (numeric === null || numeric !== current) {
      setDraft(formatNumberValue(current, precision));
    }
  }

  const emit = (next: number) => {
    const rounded = Number(next.toFixed(precision));
    setCurrent(rounded);
    setDraft(rounded.toFixed(precision));
  };

  const commit = (text: string) => {
    if (isLocked) return;
    const trimmed = text.trim();
    if (trimmed === "" || trimmed === "-") {
      if (allowEmpty) {
        setCurrent(null);
        setDraft("");
      } else {
        emit(clampNumber(min ?? 0, min, max));
      }
      return;
    }
    const parsed = parseNumberDraft(trimmed);
    if (parsed === null) {
      // Invalid text falls back to the last valid value.
      setDraft(formatNumberValue(current, precision));
      return;
    }
    emit(clampNumber(parsed, min, max));
  };

  const adjust = (delta: number) => {
    if (isLocked) return;
    const base = parseNumberDraft(draft) ?? current ?? 0;
    emit(clampNumber(base + delta, min, max));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(event);
    if (isLocked || event.defaultPrevented) return;
    if (event.key === "ArrowUp") {
      event.preventDefault();
      adjust(step);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      adjust(-step);
    } else if (event.key === "PageUp" || event.key === "PageDown") {
      // WAI-ARIA spinbutton: Page Up / Down step by a larger amount (10 steps).
      event.preventDefault();
      adjust((event.key === "PageUp" ? 10 : -10) * step);
    } else if (event.key === "Home" && min !== undefined) {
      // Home / End jump to the bounds; without a bound they keep moving the caret.
      event.preventDefault();
      emit(min);
    } else if (event.key === "End" && max !== undefined) {
      event.preventDefault();
      emit(max);
    } else if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    commit(event.currentTarget.value);
    onBlur?.(event);
  };

  // Draft-level validation: not a number, or out of range.
  const draftTrim = draft.trim();
  const parsedDraft = parseNumberDraft(draftTrim);
  let errorMessage: string | undefined;
  if (draftTrim && draftTrim !== "-" && draftTrim !== ".") {
    if (parsedDraft === null) {
      errorMessage = notANumberMessage ?? t("numberInput.notANumber");
    } else if (min !== undefined && parsedDraft < min) {
      errorMessage = belowMinMessage ?? t("numberInput.belowMin", { min });
    } else if (max !== undefined && parsedDraft > max) {
      errorMessage = aboveMaxMessage ?? t("numberInput.aboveMax", { max });
    }
  }
  const internalInvalid = errorMessage !== undefined;
  const isInvalid =
    invalid || internalInvalid || isAriaInvalid(field["aria-invalid"]);

  return (
    <div
      className={cn(
        styles.root,
        styles[size],
        isInvalid && styles.invalid,
        internalInvalid && styles.shake,
        isDisabled && styles.disabled,
        className,
      )}
      title={errorMessage}
      {...hooks("number-input", "root", {
        disabled: isDisabled,
        invalid: isInvalid,
        readonly: !!field.readOnly,
        required: !!(field.required || field["aria-required"]),
        size,
      })}
    >
      <input
        ref={ref}
        inputMode="decimal"
        type="text"
        className={styles.field}
        {...field}
        // min / max / now + arrow-key stepping is the WAI-ARIA spinbutton pattern.
        role="spinbutton"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={current ?? undefined}
        aria-invalid={isInvalid || field["aria-invalid"] || undefined}
        value={draft}
        onChange={(event) => setDraft(event.currentTarget.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        {...hooks("number-input", "input")}
      />
      {showStepper && (
        // Pointer convenience only: keyboard users step with the arrow keys.
        <div
          className={styles.stepper}
          aria-hidden="true"
          {...hooks("number-input", "stepper")}
        >
          <button
            type="button"
            className={cn(styles.step, styles.stepUp)}
            tabIndex={-1}
            disabled={isLocked || (max !== undefined && (current ?? 0) >= max)}
            onClick={() => adjust(step)}
            aria-label={incrementLabel ?? t("numberInput.increment")}
            {...hooks("number-input", "increment")}
          >
            <IconChevronUp size={12} strokeWidth={2.5} aria-hidden />
          </button>
          <button
            type="button"
            className={cn(styles.step, styles.stepDown)}
            tabIndex={-1}
            disabled={isLocked || (min !== undefined && (current ?? 0) <= min)}
            onClick={() => adjust(-step)}
            aria-label={decrementLabel ?? t("numberInput.decrement")}
            {...hooks("number-input", "decrement")}
          >
            <IconChevronDown size={12} strokeWidth={2.5} aria-hidden />
          </button>
        </div>
      )}
    </div>
  );
};

export default NumberInput;
