import React, { useEffect, useRef, forwardRef } from "react";
import classNames from "classnames";
import { FaInfoCircle } from "react-icons/fa";
import styles from "./checkbox.module.scss";
import { CheckboxProps } from "./types";

/**
 * Checkbox component
 * @param checked - Controlled checked state
 * @param defaultChecked - Default checked state for uncontrolled component
 * @param disabled - Whether the checkbox is disabled
 * @param indeterminate - Whether the checkbox is in indeterminate state
 * @param name - Name attribute of the input element
 * @param onChange - Callback fired when the state changes
 * @param shape - Shape of the checkbox (square or circle)
 * @param size - Size of the checkbox
 * @param label - Label text
 * @param className - Additional class name
 * @param checkmarkColor - Custom color for the checkmark
 * @param boxColor - Custom color for the checkbox
 * @param boxBorderColor - Custom border color for the checkbox
 * @param icon - Custom icon to display when checked
 * @param required - Whether the checkbox is required
 * @param error - Whether to show error state
 * @param errorIcon - Custom error icon
 * @param helperText - Helper text to display below checkbox
 * @param labelPlacement - Placement of the label
 */
const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked,
      defaultChecked,
      disabled = false,
      indeterminate = false,
      name,
      onChange,
      shape = "square",
      size = "medium",
      label,
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
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);

    React.useImperativeHandle(ref, () => inputRef.current!, []);

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      <div
        className={classNames(styles.checkboxWrapper, error && styles.error)}
      >
        <label className={labelClasses}>
          <input
            ref={inputRef}
            type="checkbox"
            className={styles.input}
            checked={checked}
            defaultChecked={defaultChecked}
            disabled={disabled}
            name={name}
            onChange={handleChange}
            required={required}
          />
          <span className={styles.checkmark} style={checkmarkStyle}>
            {icon && checked && !indeterminate && icon}
          </span>
          {label && <span className={styles.label}>{label}</span>}
        </label>
        {helperText && (
          <div className={styles.helperTextWrapper}>
            {error && <span className={styles.errorIcon}>{errorIcon}</span>}
            <span
              className={classNames(
                styles.helperText,
                error && styles.errorText,
              )}
            >
              {helperText}
            </span>
          </div>
        )}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";

export default React.memo(Checkbox);
