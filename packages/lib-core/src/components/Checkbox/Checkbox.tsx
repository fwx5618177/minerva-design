import React, { useId, useLayoutEffect, useRef } from "react";
import { cn } from "../../utils/cn";
import { IconCircleInfoFilled } from "../../internal/icons";
import { useMergedRefs } from "../../internal/mergeRefs";
import { pickDataAttributes } from "../../internal/dataAttributes";
import { useControllableState } from "../../internal/useControllableState";
import { warnControlledProps } from "../../internal/devWarnings";
import {
  useFormControlContext,
  useFormControlProps,
} from "../FormControl/context";
import { hooks } from "../../internal/stylingHooks";
import styles from "./checkbox.module.scss";
import type { CheckboxProps } from "./types";

/**
 * Checkbox: a native checkbox with label, helper text and indeterminate state.
 * Inside a FormControl it picks up the field's id, description, invalid,
 * required and disabled state. `ref` reaches the <input>.
 */
const Checkbox = ({
  checked,
  defaultChecked,
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
  "aria-describedby": ariaDescribedBy,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  className = "",
  style,
  icon,
  required,
  error = false,
  errorIcon = <IconCircleInfoFilled />,
  helperText,
  labelPlacement = "end",
  ref,
  ...rest
}: CheckboxProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const mergedRef = useMergedRefs(inputRef, ref);
  const helperId = useId();
  const [isChecked, setIsChecked] = useControllableState({
    value: checked,
    defaultValue: defaultChecked ?? false,
    name: "Checkbox",
    prop: "checked",
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

  if (process.env.NODE_ENV !== "production") {
    warnControlledProps("Checkbox", {
      prop: "checked",
      value: checked,
      defaultProp: "defaultChecked",
      defaultValue: defaultChecked,
      handlerProp: "onChange",
      handler: onChange,
      locked: isDisabled || isReadOnly,
      lockHint: "set `disabled`",
    });
  }
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

  const content = label ?? children;

  const labelClasses = cn(
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
    className,
  );

  return (
    <div
      className={cn(styles.checkboxWrapper, isError && styles.error)}
      {...hooks("checkbox", "root", {
        state: indeterminate
          ? "indeterminate"
          : isChecked
            ? "checked"
            : "unchecked",
        disabled: isDisabled,
        invalid: isError,
        readonly: isReadOnly,
        required: isRequired,
        size,
        color,
        shape,
      })}
    >
      <label
        className={labelClasses}
        style={style}
        {...pickDataAttributes(rest)}
      >
        <input
          ref={mergedRef}
          type="checkbox"
          className={styles.input}
          id={field.id}
          value={value}
          checked={isChecked}
          disabled={isDisabled}
          name={name}
          onClick={handleClick}
          onChange={handleChange}
          required={isRequired}
          aria-checked={indeterminate ? "mixed" : undefined}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-invalid={isError || undefined}
          aria-readonly={field["aria-readonly"]}
          aria-describedby={field["aria-describedby"]}
          {...hooks("checkbox", "input")}
        />
        <span className={styles.checkmark} {...hooks("checkbox", "control")}>
          {icon && isChecked && !indeterminate && icon}
        </span>
        {content != null && content !== false && content !== "" && (
          <span className={styles.label} {...hooks("checkbox", "label")}>
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
            className={cn(styles.helperText, isError && styles.errorText)}
            {...hooks("checkbox", "helper-text")}
          >
            {helperText}
          </span>
        </div>
      )}
    </div>
  );
};

export default React.memo(Checkbox);
