import React, { useId, useLayoutEffect, useRef } from "react";
import classNames from "classnames";
import { FaInfoCircle } from "react-icons/fa";
import { useMergedRefs } from "../../internal/mergeRefs";
import { useControllableState } from "../../internal/useControllableState";
import {
  useFormControlContext,
  useFormControlProps,
} from "../FormControl/context";
import styles from "./checkbox.module.scss";
import type { CheckboxProps } from "./types";

/** `ui-*` styling hooks (stable class names shared with @novel-isr/ui). */
const UI_SIZE = { small: "sm", medium: "md", large: "lg" } as const;
const UI_COLOR = {
  primary: "brand",
  success: "success",
  info: "info",
  warning: "warning",
  danger: "danger",
} as const;

/**
 * Checkbox: a native checkbox with label, helper text and indeterminate state.
 * Inside a FormControl it picks up the field's id, description, invalid,
 * required and disabled state. `ref` reaches the <input>.
 */
const Checkbox = ({
  checked,
  defaultChecked = false,
  disabled,
  indeterminate = false,
  name,
  onChange,
  shape = "square",
  size = "medium",
  label,
  children,
  color = "primary",
  id,
  value,
  ariaDescribedBy,
  ariaLabel,
  className = "",
  checkmarkColor,
  boxColor,
  boxBorderColor,
  icon,
  required,
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

  // FormControl wiring. An explicit `disabled` / `required` prop wins over
  // the FormControl's state (so `disabled={false}` can opt out).
  const fc = useFormControlContext();
  const field = useFormControlProps({
    id,
    "aria-describedby":
      [helperText ? helperId : null, ariaDescribedBy]
        .filter(Boolean)
        .join(" ") || undefined,
  });
  const isDisabled = disabled ?? fc?.disabled ?? false;
  const isRequired = required ?? fc?.required ?? false;
  const isError = error || !!fc?.invalid;
  const isReadOnly = !!fc?.readOnly;

  // `indeterminate` only exists as a DOM property.
  useLayoutEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
    // A read-only field (FormControl readOnly) keeps its state.
    if (isReadOnly) event.preventDefault();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isReadOnly) return;
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

  const state = indeterminate
    ? "indeterminate"
    : isChecked
      ? "checked"
      : "unchecked";
  const content = label ?? children;

  const labelClasses = classNames(
    styles.checkbox,
    styles[size],
    styles[shape],
    styles[
      `label${labelPlacement.charAt(0).toUpperCase()}${labelPlacement.slice(1)}`
    ],
    color !== "primary" &&
      styles[`color${color.charAt(0).toUpperCase()}${color.slice(1)}`],
    isDisabled && styles.disabled,
    isError && styles.error,
    "ui-checkbox-root",
    `ui-checkbox-size-${UI_SIZE[size]}`,
    `ui-checkbox-color-${UI_COLOR[color]}`,
    isError && "ui-checkbox-error",
    className,
  );

  return (
    <div
      className={classNames(styles.checkboxWrapper, isError && styles.error)}
    >
      <label className={labelClasses} data-disabled={isDisabled || undefined}>
        <input
          ref={mergedRef}
          type="checkbox"
          className={classNames(styles.input, "ui-checkbox-control")}
          id={field.id}
          value={value}
          checked={isChecked}
          disabled={isDisabled}
          name={name}
          onClick={handleClick}
          onChange={handleChange}
          required={isRequired}
          data-state={state}
          aria-checked={indeterminate ? "mixed" : undefined}
          aria-label={ariaLabel}
          aria-invalid={isError || undefined}
          aria-readonly={field["aria-readonly"]}
          aria-describedby={field["aria-describedby"]}
        />
        <span
          className={classNames(styles.checkmark, "ui-checkbox-indicator")}
          style={checkmarkStyle}
          data-state={state}
        >
          {icon && isChecked && !indeterminate && icon}
        </span>
        {content != null && content !== false && content !== "" && (
          <span className={classNames(styles.label, "ui-checkbox-text")}>
            {content}
          </span>
        )}
      </label>
      {helperText && (
        <div className={styles.helperTextWrapper}>
          {isError && (
            <span className={styles.errorIcon} aria-hidden>
              {errorIcon}
            </span>
          )}
          <span
            id={helperId}
            className={classNames(
              styles.helperText,
              isError && styles.errorText,
            )}
          >
            {helperText}
          </span>
        </div>
      )}
    </div>
  );
};

export default React.memo(Checkbox);
