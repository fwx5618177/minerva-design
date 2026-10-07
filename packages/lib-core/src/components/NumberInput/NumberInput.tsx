import { useState, type FocusEvent, type KeyboardEvent } from "react";
import { IconChevronDown, IconChevronUp } from "../../internal/icons";
import { cn } from "../../utils/cn";
import useI18n from "../../hooks/useI18n";
import { isAriaInvalid } from "../../internal/forms-field";
import { useControllableState } from "../../internal/useControllableState";
import { useFormControlProps } from "../FormControl/context";
import type { NumberInputProps } from "./types";
import styles from "./numberInput.module.scss";

function inferPrecision(step?: number): number {
  if (!step || step >= 1) return 0;
  const s = String(step);
  const dot = s.indexOf(".");
  return dot === -1 ? 0 : s.length - dot - 1;
}

function clamp(n: number, min?: number, max?: number): number {
  let v = n;
  if (min !== undefined) v = Math.max(min, v);
  if (max !== undefined) v = Math.min(max, v);
  return v;
}

function valueToString(
  v: number | null | undefined,
  precision: number,
): string {
  if (v === null || v === undefined || Number.isNaN(v)) return "";
  return v.toFixed(precision);
}

/** Digits with an optional leading "-" and one "."; no exponent (a typing trap). */
function parseDraft(input: string): number | null {
  const trimmed = input.trim();
  if (!trimmed || !/^-?\d*(\.\d*)?$/.test(trimmed)) return null;
  const n = Number(trimmed);
  return Number.isFinite(n) ? n : null;
}

/**
 * NumberInput: numeric text field (role="spinbutton") with keyboard stepping
 * (arrows, Page Up / Down, Home / End to min / max when bounded),
 * an optional stepper, min / max clamping and fixed precision. The draft may
 * hold intermediate text ("-", "1.") while typing; it is committed on blur /
 * Enter. Mouse wheel never changes the value.
 */
export const NumberInput = ({
  value,
  defaultValue = null,
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
  const precision = precisionProp ?? inferPrecision(step);

  const [current, setCurrent] = useControllableState<number | null>({
    value,
    defaultValue,
    onChange,
  });

  const [draft, setDraft] = useState(() => valueToString(current, precision));
  // Sync the draft when the value changes from outside (derived during
  // render), unless the draft already shows that number (keeps "1." etc.).
  const [synced, setSynced] = useState({ current, precision });
  if (synced.current !== current || synced.precision !== precision) {
    setSynced({ current, precision });
    const numeric = parseDraft(draft);
    if (numeric === null || numeric !== current) {
      setDraft(valueToString(current, precision));
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
        emit(clamp(min ?? 0, min, max));
      }
      return;
    }
    const parsed = parseDraft(trimmed);
    if (parsed === null) {
      // Invalid text falls back to the last valid value.
      setDraft(valueToString(current, precision));
      return;
    }
    emit(clamp(parsed, min, max));
  };

  const adjust = (delta: number) => {
    if (isLocked) return;
    const base = parseDraft(draft) ?? current ?? 0;
    emit(clamp(base + delta, min, max));
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
  const parsedDraft = parseDraft(draftTrim);
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
      />
      {showStepper && (
        // Pointer convenience only: keyboard users step with the arrow keys.
        <div className={styles.stepper} aria-hidden="true">
          <button
            type="button"
            className={cn(styles.step, styles.stepUp)}
            tabIndex={-1}
            disabled={isLocked || (max !== undefined && (current ?? 0) >= max)}
            onClick={() => adjust(step)}
            aria-label={incrementLabel ?? t("numberInput.increment")}
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
          >
            <IconChevronDown size={12} strokeWidth={2.5} aria-hidden />
          </button>
        </div>
      )}
    </div>
  );
};

export default NumberInput;
