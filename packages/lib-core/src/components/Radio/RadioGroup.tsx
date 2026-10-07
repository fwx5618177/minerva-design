import React, { createContext, useId } from "react";
import classNames from "classnames";
import { useControllableState } from "../../internal/useControllableState";
import type { RadioGroupProps } from "./types";
import styles from "./radio.module.scss";

export const RadioGroupContext = createContext<{
  value?: string | number;
  onChange: (
    value: string | number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  disabled?: boolean;
  name: string;
  size?: "small" | "medium" | "large";
  color?: string;
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
  disabled = false,
  children,
  className = "",
  direction = "vertical",
  size = "medium",
  error = false,
  helperText,
  required = false,
  color = "var(--primary-color)",
  ref,
}: RadioGroupProps) => {
  const [selected, setSelected] = useControllableState<
    string | number | undefined
  >({ value, defaultValue });
  const generatedName = useId();
  const labelId = useId();
  const helperId = useId();

  const handleChange = (
    val: string | number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (disabled) return;
    setSelected(val);
    onChange?.(val, event);
  };

  return (
    <div
      ref={ref}
      className={classNames(
        styles.radioGroupWrapper,
        error && styles.error,
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
          disabled,
          name: name ?? generatedName,
          size,
          color,
        }}
      >
        <div
          className={classNames(styles.radioGroup, styles[direction])}
          role="radiogroup"
          aria-labelledby={label ? labelId : undefined}
          aria-label={label ? undefined : ariaLabel}
          aria-describedby={helperText ? helperId : undefined}
          aria-required={required}
          aria-invalid={error}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
      {helperText && (
        <div
          id={helperId}
          className={classNames(styles.helperText, error && styles.errorText)}
        >
          {helperText}
        </div>
      )}
    </div>
  );
};

export default React.memo(RadioGroup);
