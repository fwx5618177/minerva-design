import React, { useId, useLayoutEffect, useRef } from "react";
import classNames from "classnames";
import { FaInfoCircle } from "react-icons/fa";
import { useMergedRefs } from "../../internal/mergeRefs";
import { useControllableState } from "../../internal/useControllableState";
import styles from "./checkbox.module.scss";
import type { CheckboxProps } from "./types";

/**
 * Checkbox: a native checkbox with label, helper text and indeterminate state.
 * `ref` reaches the <input>.
 */
const Checkbox = ({
  checked,
  defaultChecked = false,
  disabled = false,
  indeterminate = false,
  name,
  onChange,
  shape = "square",
  size = "medium",
  label,
  ariaLabel,
  className = "",
  checkmarkColor,
  boxColor,
  boxBorderColor,
  icon,
  required = false,
  error = false,
  errorIcon = <FaInfoCircle />,
  helperText,
  labelPlacement = "end",
  ref,
}: CheckboxProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const mergedRef = useMergedRefs(inputRef, ref);
  const helperId = useId();
  const [isChecked, setIsChecked] = useControllableState({
    value: checked,
    defaultValue: defaultChecked,
  });

  // `indeterminate` only exists as a DOM property.
  useLayoutEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // A click clears the native indeterminate flag; the prop is the source of
    // truth, so re-apply it (the parent clears it when it wants to).
    event.currentTarget.indeterminate = indeterminate;
    setIsChecked(event.target.checked);
    onChange?.(event.target.checked, event);
  };

  const checkmarkStyle = {
    ...(boxColor && { backgroundColor: boxColor }),
    ...(boxBorderColor && { borderColor: boxBorderColor }),
    ...(checkmarkColor && { "--checkmark-color": checkmarkColor }),
  } as React.CSSProperties;

  const labelClasses = classNames(
    styles.checkbox,
    styles[size],
    styles[shape],
    styles[
      `label${labelPlacement.charAt(0).toUpperCase()}${labelPlacement.slice(1)}`
    ],
    disabled && styles.disabled,
    error && styles.error,
    className,
  );

  return (
    <div className={classNames(styles.checkboxWrapper, error && styles.error)}>
      <label className={labelClasses}>
        <input
          ref={mergedRef}
          type="checkbox"
          className={styles.input}
          checked={isChecked}
          disabled={disabled}
          name={name}
          onChange={handleChange}
          required={required}
          aria-label={ariaLabel}
          aria-invalid={error || undefined}
          aria-describedby={helperText ? helperId : undefined}
        />
        <span className={styles.checkmark} style={checkmarkStyle}>
          {icon && isChecked && !indeterminate && icon}
        </span>
        {label && <span className={styles.label}>{label}</span>}
      </label>
      {helperText && (
        <div className={styles.helperTextWrapper}>
          {error && (
            <span className={styles.errorIcon} aria-hidden>
              {errorIcon}
            </span>
          )}
          <span
            id={helperId}
            className={classNames(styles.helperText, error && styles.errorText)}
          >
            {helperText}
          </span>
        </div>
      )}
    </div>
  );
};

export default React.memo(Checkbox);
