import React, { useContext, useId } from "react";
import { cn } from "../../utils/cn";
import { IconCircleInfoFilled } from "../../internal/icons";
import { pickDataAttributes } from "../../internal/dataAttributes";
import { hooks } from "../../internal/stylingHooks";
import styles from "./radio.module.scss";
import type { RadioProps } from "./types";
import { RadioGroupContext } from "./RadioGroup";
import { useFormControlContext } from "../FormControl/context";

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
  label,
  children,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  id,
  "aria-describedby": ariaDescribedBy,
  className = "",
  style,
  color = "primary",
  required = false,
  error = false,
  errorIcon = <IconCircleInfoFilled />,
  errorMessage,
  helperText,
  ref,
  ...rest
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
  const radioColor = group?.color ?? color;
  const helper = error ? errorMessage : helperText;
  const content = label ?? children;

  return (
    <div
      className={cn(
        styles.radioWrapper,
        styles[radioSize],
        styles[radioColor],
        error && styles.error,
        className,
      )}
      style={style}
      {...pickDataAttributes(rest)}
      {...hooks("radio", "root", {
        // An uncontrolled radio outside a group: the DOM holds the state
        state:
          isChecked === undefined
            ? undefined
            : isChecked
              ? "checked"
              : "unchecked",
        disabled: isDisabled,
        invalid: error,
        size: radioSize,
        color: radioColor,
      })}
    >
      <label className={cn(styles.radio, isDisabled && styles.disabled)}>
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
          aria-labelledby={ariaLabelledBy}
          id={id}
          // Consumer descriptions are merged with the helper / error text.
          aria-describedby={
            [helper ? helperId : null, ariaDescribedBy]
              .filter(Boolean)
              .join(" ") || undefined
          }
          className={styles.input}
          {...hooks("radio", "input")}
        />
        <span className={styles.radioMark} {...hooks("radio", "control")} />
        {content != null && content !== false && content !== "" && (
          <span className={styles.label} {...hooks("radio", "label")}>
            {content}
          </span>
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
            className={cn(styles.helperText, error && styles.errorText)}
            {...hooks("radio", "helper-text")}
          >
            {helper}
          </span>
        </div>
      )}
    </div>
  );
};

export default React.memo(Radio);
