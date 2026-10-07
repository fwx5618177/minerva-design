import React, { forwardRef, useContext } from "react";
import classNames from "classnames";
import { FaInfoCircle } from "react-icons/fa";
import styles from "./radio.module.scss";
import { RadioProps } from "./types";
import { RadioGroupContext } from "./RadioGroup";

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      checked,
      defaultChecked,
      disabled = false,
      name,
      value,
      onChange,
      size = "medium",
      type = "default",
      label,
      className = "",
      color,
      bgColor,
      required = false,
      error = false,
      errorIcon = <FaInfoCircle />,
      errorMessage,
      helperText,
    },
    ref,
  ) => {
    const group = useContext(RadioGroupContext);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;

      if (group) {
        group.onChange?.(value!, e);
      } else {
        onChange?.(e.target.checked, e);
      }
    };

    const isChecked = group ? group.value === value : checked;
    const isDisabled = group ? group.disabled || disabled : disabled;
    const radioName = group ? group.name : name;
    const radioSize = group ? group.size || size : size;
    const radioColor = group ? group.color || color : color;

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
        {(errorMessage || helperText) && (
          <div className={styles.helperTextWrapper}>
            {error && errorMessage && (
              <span className={styles.errorIcon}>{errorIcon}</span>
            )}
            <span
              className={classNames(
                styles.helperText,
                error && styles.errorText,
              )}
            >
              {error ? errorMessage : helperText}
            </span>
          </div>
        )}
      </div>
    );
  },
);

Radio.displayName = "Radio";

export default React.memo(Radio);
