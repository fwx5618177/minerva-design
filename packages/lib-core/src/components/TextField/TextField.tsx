import React, { useEffect, useId, useRef, useState } from "react";
import classNames from "classnames";
import {
  FaExclamationTriangle,
  FaTimesCircle,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useMergedRefs } from "../../internal/mergeRefs";
import { useControllableState } from "../../internal/useControllableState";
import { isAriaInvalid } from "../../internal/forms-field";
import { useFormControlProps } from "../FormControl/context";
import styles from "./textField.module.scss";
import useI18n from "../../hooks/useI18n";
import type { TextFieldProps } from "./types";

const SHAKE_DURATION = 500;

/**
 * TextField: a single-line input with a floating label, icons, clear button,
 * character count and error message. `ref` reaches the <input>.
 */
const TextField = ({
  label,
  placeholder,
  value,
  defaultValue = "",
  onChange,
  helperText,
  icon,
  iconPosition = "left",
  borderColor,
  hideBorder = false,
  minimal = false,
  borderRadius = "0.25rem",
  name,
  id,
  type = "text",
  showCharCount = false,
  clearable = false,
  fullWidth = false,
  width = "300px",
  disabled: disabledProp = false,
  invalid = false,
  required = false,
  ariaLabel,
  clearLabel,
  showPasswordLabel,
  hidePasswordLabel,
  readOnly: readOnlyProp = false,
  size = "medium",
  suffix,
  onBlur,
  onFocus,
  onKeyDown,
  className,
  ref,
  inputProps,
}: TextFieldProps) => {
  const { t } = useI18n();
  const inputRef = useRef<HTMLInputElement>(null);
  const mergedRef = useMergedRefs(inputRef, ref);
  const errorId = useId();
  // Inside a FormControl the field takes its id (FormLabel htmlFor), state
  // and aria wiring; the error message stays linked as well.
  const field = useFormControlProps({
    id,
    disabled: disabledProp,
    readOnly: readOnlyProp,
    "aria-describedby":
      [helperText ? errorId : null, inputProps?.["aria-describedby"]]
        .filter(Boolean)
        .join(" ") || undefined,
    "aria-invalid": helperText || invalid ? true : undefined,
  });
  const inputId = field.id ?? name;
  const disabled = !!field.disabled;
  const readOnly = !!field.readOnly;
  const hasError = !!helperText || isAriaInvalid(field["aria-invalid"]);

  const [currentValue, setValue] = useControllableState({
    value,
    defaultValue,
    onChange,
  });
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Shake whenever a (new) error message appears. Derived during render from
  // the previous message instead of setting state in an effect.
  const [prevHelperText, setPrevHelperText] = useState(helperText);
  const [shake, setShake] = useState(!!helperText);
  if (helperText !== prevHelperText) {
    setPrevHelperText(helperText);
    if (helperText) setShake(true);
  }

  useEffect(() => {
    if (!shake) return;
    const timer = setTimeout(() => setShake(false), SHAKE_DURATION);
    return () => clearTimeout(timer);
  }, [shake, helperText]);

  // Move focus to the field when an error message appears.
  useEffect(() => {
    if (helperText) inputRef.current?.focus();
  }, [helperText]);

  const isFilled = currentValue !== "";
  const labelVisible = !!label && !placeholder && !readOnly;

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClear = () => {
    setValue("");
    // The clear button disappears; keep focus in the field.
    inputRef.current?.focus();
  };

  const textFieldClasses = classNames(
    styles.textField,
    styles[size],
    isFocused && styles.focused,
    isFilled && styles.filled,
    minimal && styles.minimal,
    hasError && styles.error,
    hideBorder && styles.containerHideBorder,
    shake && styles.shake,
    disabled && styles.disabled,
    readOnly && styles.readonly,
  );
  const inputClasses = classNames(
    styles.input,
    hideBorder && styles.hideBorder,
  );
  const labelClasses = classNames(
    styles.label,
    (isFocused || isFilled) && styles.shrink,
  );
  const containerClass = classNames(
    styles.container,
    hideBorder && styles.containerHideBorder,
    className,
  );
  const containerStyles = {
    width: fullWidth ? "100%" : width,
    borderRadius: borderRadius,
    borderColor: borderColor,
  };

  return (
    <div className={containerClass} style={containerStyles}>
      <div className={textFieldClasses} style={{ borderColor, borderRadius }}>
        {labelVisible && (
          <label
            htmlFor={inputId}
            className={labelClasses}
            style={{
              left: icon && iconPosition === "left" ? "2.5rem" : "0.75rem",
            }}
          >
            {label}
          </label>
        )}
        <div className={styles.inputWrapper} style={{ borderRadius }}>
          {icon && iconPosition === "left" && (
            <span className={styles.iconLeft}>{icon}</span>
          )}
          <input
            {...inputProps}
            ref={mergedRef}
            id={inputId}
            type={
              type === "password"
                ? isPasswordVisible
                  ? "text"
                  : "password"
                : type
            }
            name={name}
            className={inputClasses}
            placeholder={isFocused || isFilled ? "" : placeholder}
            value={currentValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={onKeyDown}
            disabled={disabled}
            readOnly={readOnly}
            required={required || undefined}
            aria-required={field["aria-required"]}
            aria-readonly={field["aria-readonly"]}
            aria-label={
              ariaLabel ?? (labelVisible ? undefined : label || undefined)
            }
            aria-invalid={field["aria-invalid"]}
            aria-describedby={field["aria-describedby"]}
            style={{
              paddingLeft: icon && iconPosition === "left" ? "2rem" : "",
              paddingRight:
                (icon && iconPosition === "right" ? "2rem" : "") +
                (!suffix && clearable ? "2rem" : ""),
            }}
          />
          {icon && iconPosition === "right" && (
            <>
              {type !== "password" ? (
                <span className={styles.iconRight}>{icon}</span>
              ) : (
                <button
                  type="button"
                  className={`${styles.iconRight} ${styles.togglePasswordIcon}`}
                  onClick={() => setIsPasswordVisible((visible) => !visible)}
                  aria-label={
                    isPasswordVisible
                      ? (hidePasswordLabel ?? t("textField.hidePassword"))
                      : (showPasswordLabel ?? t("textField.showPassword"))
                  }
                  aria-pressed={isPasswordVisible}
                  disabled={disabled}
                >
                  {isPasswordVisible ? (
                    <FaEyeSlash aria-hidden />
                  ) : (
                    <FaEye aria-hidden />
                  )}
                </button>
              )}
            </>
          )}
          {clearable && isFilled && !readOnly && !disabled && !suffix && (
            <button
              type="button"
              className={styles.clearIcon}
              onClick={handleClear}
              aria-label={clearLabel ?? t("textField.clear")}
            >
              <FaTimesCircle aria-hidden />
            </button>
          )}
          {suffix && <span className={styles.suffix}>{suffix}</span>}
          {helperText && (
            <span className={styles.errorIcon} aria-hidden>
              <FaExclamationTriangle />
            </span>
          )}
        </div>
        {showCharCount && (
          <div className={styles.charCount}>{currentValue.length}</div>
        )}
      </div>
      {helperText && (
        <div id={errorId} className={styles.errorMessage}>
          <FaExclamationTriangle className={styles.errorIcon} aria-hidden />
          {helperText}
        </div>
      )}
    </div>
  );
};

export default React.memo(TextField);
