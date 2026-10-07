import React, { createContext, forwardRef, useState } from "react";
import classNames from "classnames";
import { RadioGroupProps } from "./types";
import styles from "./radio.module.scss";

export const RadioGroupContext = createContext<{
  value?: string | number;
  onChange?: (
    value: string | number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  disabled?: boolean;
  name?: string;
  size?: "small" | "medium" | "large";
  color?: string;
} | null>(null);

/**
 * RadioGroup Component
 * @description A group of radio buttons that allows users to select one option from multiple choices
 *
 * @param {string | number} value - The value of the currently selected radio button
 * @param {string | number} defaultValue - The default value of the radio group
 * @param {string} name - The name attribute of the radio group
 * @param {function} onChange - Callback fired when the value changes
 * @param {boolean} disabled - Whether the radio group is disabled
 * @param {ReactNode} children - The content of the component
 * @param {string} className - Additional class name
 * @param {"horizontal" | "vertical"} direction - The direction of the radio group
 * @param {"small" | "medium" | "large"} size - The size of the radio buttons
 * @param {boolean} error - Whether to show error state
 * @param {string} helperText - Helper text to display below the group
 * @param {boolean} required - Whether the radio group is required
 * @param {string} color - The color of the radio buttons
 */
const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      value,
      defaultValue,
      name,
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
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue);

    const handleChange = (
      val: string | number,
      event: React.ChangeEvent<HTMLInputElement>,
    ) => {
      if (disabled) return;

      if (value === undefined) {
        setInternalValue(val);
      }
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
        <RadioGroupContext.Provider
          value={{
            value: value ?? internalValue,
            onChange: handleChange,
            disabled,
            name,
            size,
            color,
          }}
        >
          <div
            className={classNames(styles.radioGroup, styles[direction])}
            role="radiogroup"
            aria-required={required}
            aria-invalid={error}
          >
            {children}
          </div>
        </RadioGroupContext.Provider>
        {helperText && (
          <div
            className={classNames(styles.helperText, error && styles.errorText)}
          >
            {helperText}
          </div>
        )}
      </div>
    );
  },
);

RadioGroup.displayName = "RadioGroup";

export default React.memo(RadioGroup);
