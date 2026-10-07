import React, { createContext, useId } from "react";
import { cn } from "../../utils/cn";
import { useControllableState } from "../../internal/useControllableState";
import type { RadioGroupProps } from "./types";
import styles from "./radio.module.scss";
import { useFormControlContext } from "../FormControl/context";

export const RadioGroupContext = createContext<{
  value?: string | number | null;
  onChange: (
    value: string | number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  disabled?: boolean;
  name: string;
  size?: "small" | "medium" | "large";
  color?: RadioGroupProps["color"];
} | null>(null);

/**
 * RadioGroup: a set of radios of which one can be selected.
 * Supports controlled (`value`) and uncontrolled (`defaultValue`) usage.
 */
const RadioGroup = ({
  value,
  defaultValue,
  name,
  label,
  ariaLabel,
  onChange,
  disabled,
  children,
  className = "",
  direction = "vertical",
  size,
  error = false,
  helperText,
  required,
  color,
  ref,
}: RadioGroupProps) => {
  const [selected, setSelected] = useControllableState<
    string | number | null | undefined
  >({ value, defaultValue });
  const generatedName = useId();
  const labelId = useId();
  const helperId = useId();
  // FormControl wiring; explicit props win over the field's state.
  const fc = useFormControlContext();
  const isDisabled = disabled ?? fc?.disabled ?? false;
  const isRequired = required ?? fc?.required ?? false;
  const isError = error || !!fc?.invalid;
  const describedBy =
    [
      helperText ? helperId : null,
      fc?.invalid && fc.hasErrorMessage ? fc.errorId : null,
      fc && !fc.invalid && fc.hasHelperText ? fc.helperId : null,
    ]
      .filter(Boolean)
      .join(" ") || undefined;
  const labelledBy = label
    ? labelId
    : !ariaLabel && fc
      ? fc.labelId
      : undefined;

  const handleChange = (
    val: string | number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (isDisabled) return;
    setSelected(val);
    onChange?.(val, event);
  };

  return (
    <div
      ref={ref}
      className={cn(
        styles.radioGroupWrapper,
        isError && styles.error,
        className,
      )}
    >
      {label && (
        <div id={labelId} className={styles.groupLabel}>
          {label}
        </div>
      )}
      <RadioGroupContext.Provider
        value={{
          value: selected,
          onChange: handleChange,
          disabled: isDisabled,
          name: name ?? generatedName,
          size,
          color,
        }}
      >
        <div
          className={cn(styles.radioGroup, styles[direction])}
          role="radiogroup"
          aria-labelledby={labelledBy}
          aria-label={label ? undefined : ariaLabel}
          aria-describedby={describedBy}
          aria-required={isRequired}
          aria-invalid={isError}
          aria-disabled={isDisabled || undefined}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
      {helperText && (
        <div
          id={helperId}
          className={cn(styles.helperText, isError && styles.errorText)}
        >
          {helperText}
        </div>
      )}
    </div>
  );
};

export default React.memo(RadioGroup);
