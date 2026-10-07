import React, { createContext, useId } from "react";
import { cn } from "../../utils/cn";
import { useControllableState } from "../../internal/useControllableState";
import { warnControlledProps } from "../../internal/devWarnings";
import { pickDataAttributes } from "../../internal/dataAttributes";
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
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  id,
  onChange,
  disabled,
  children,
  className = "",
  style,
  direction = "vertical",
  size,
  error = false,
  helperText,
  required,
  color,
  ref,
  ...rest
}: RadioGroupProps) => {
  const [selected, setSelected] = useControllableState<
    string | number | null | undefined
  >({ value, defaultValue, name: "RadioGroup" });
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
      ariaDescribedBy,
    ]
      .filter(Boolean)
      .join(" ") || undefined;
  if (process.env.NODE_ENV !== "production") {
    warnControlledProps("RadioGroup", {
      prop: "value",
      value,
      defaultProp: "defaultValue",
      defaultValue,
      handlerProp: "onChange",
      handler: onChange,
      locked: isDisabled,
      lockHint: "set `disabled`",
    });
  }
  const labelledBy = ariaLabelledBy
    ? ariaLabelledBy
    : label
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
      style={style}
      {...pickDataAttributes(rest)}
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
          id={id}
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
