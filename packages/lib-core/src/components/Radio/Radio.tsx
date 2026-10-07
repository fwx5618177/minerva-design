import React, { useContext, useId } from "react";
import classNames from "classnames";
import { FaInfoCircle } from "react-icons/fa";
import styles from "./radio.module.scss";
import type { RadioProps } from "./types";
import { RadioGroupContext } from "./RadioGroup";

/**
 * Radio: a native radio input. Inside a RadioGroup, the group drives its
 * checked state, name, size, color and disabled state. `ref` reaches the
 * <input>.
 */
const Radio = ({
  checked,
  defaultChecked,
  disabled = false,
  name,
  value,
  onChange,
  size = "medium",
  type = "default",
  label,
  ariaLabel,
  className = "",
  color,
  bgColor,
  required = false,
  error = false,
  errorIcon = <FaInfoCircle />,
  errorMessage,
  helperText,
  ref,
}: RadioProps) => {
  const group = useContext(RadioGroupContext);
  const helperId = useId();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    if (group) {
      if (value !== undefined) group.onChange(value, e);
    } else {
      onChange?.(e.target.checked, e);
    }
  };

  const isChecked = group
    ? group.value !== undefined && group.value === value
    : checked;
  const isDisabled = group ? group.disabled || disabled : disabled;
  const radioName = group ? group.name : name;
  const radioSize = group ? group.size || size : size;
  const radioColor = group ? group.color || color : color;
  const helper = error ? errorMessage : helperText;

  return (
    <div
      className={classNames(
        styles.radioWrapper,
        styles[radioSize],
        styles[type],
        error && styles.error,
        className,
      )}
    >
      <label
        className={classNames(styles.radio, isDisabled && styles.disabled)}
      >
        <input
          type="radio"
          ref={ref}
          name={radioName}
          value={value}
          checked={isChecked}
          defaultChecked={group ? undefined : defaultChecked}
          disabled={isDisabled}
          onChange={handleChange}
          required={required}
          aria-label={ariaLabel}
          aria-invalid={error || undefined}
          aria-describedby={helper ? helperId : undefined}
          className={styles.input}
        />
        <span
          className={styles.radioMark}
          style={{
            backgroundColor: bgColor,
            color: radioColor,
          }}
        />
        {label && <span className={styles.label}>{label}</span>}
      </label>
      {helper && (
        <div className={styles.helperTextWrapper}>
          {error && errorMessage && (
            <span className={styles.errorIcon} aria-hidden>
              {errorIcon}
            </span>
          )}
          <span
            id={helperId}
            className={classNames(styles.helperText, error && styles.errorText)}
          >
            {helper}
          </span>
        </div>
      )}
    </div>
  );
};

export default React.memo(Radio);
