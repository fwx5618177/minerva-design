import React, { useContext, useId } from "react";
import classNames from "classnames";
import { FaInfoCircle } from "react-icons/fa";
import styles from "./radio.module.scss";
import type { RadioProps } from "./types";
import { RadioGroupContext } from "./RadioGroup";
import { useFormControlContext } from "../FormControl/context";

/** `ui-*` styling hooks (stable class names shared with @novel-isr/ui). */
const UI_SIZE = { small: "sm", medium: "md", large: "lg" } as const;

/**
 * Radio: a native radio input. Inside a RadioGroup, the group drives its
 * checked state, name, size, color and disabled state. `ref` reaches the
 * <input>.
 */
const Radio = ({
  checked,
  defaultChecked,
  disabled,
  name,
  value,
  onChange,
  size = "medium",
  type = "default",
  label,
  children,
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
  const fc = useFormControlContext();
  const helperId = useId();
  // An explicit `disabled` wins over an enclosing FormControl's state.
  const ownDisabled = disabled ?? fc?.disabled ?? false;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (ownDisabled) return;

    if (group) {
      if (value !== undefined) group.onChange(value, e);
    } else {
      onChange?.(e.target.checked, e);
    }
  };

  const isChecked = group
    ? group.value !== undefined && group.value === value
    : checked;
  const isDisabled = group ? group.disabled || ownDisabled : ownDisabled;
  const radioName = group ? group.name : name;
  const radioSize = group ? group.size || size : size;
  const radioColor = group ? group.color || color : color;
  const helper = error ? errorMessage : helperText;
  const content = label ?? children;

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
        className={classNames(
          styles.radio,
          isDisabled && styles.disabled,
          "ui-radio-root",
          `ui-radio-size-${UI_SIZE[radioSize]}`,
        )}
        data-disabled={isDisabled || undefined}
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
          aria-describedby={helper ? helperId : undefined}
          className={classNames(styles.input, "ui-radio-control")}
          data-state={isChecked ? "checked" : "unchecked"}
        />
        <span
          className={styles.radioMark}
          style={{
            backgroundColor: bgColor,
            color: radioColor,
          }}
        />
        {content != null && content !== false && content !== "" && (
          <span className={styles.label}>{content}</span>
        )}
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
