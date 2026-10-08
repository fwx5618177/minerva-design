import { useId, useRef, useState, type ChangeEvent } from "react";
import { IconEye, IconEyeOff, IconX } from "../../internal/icons";
import { cn } from "../../utils/cn";
import { isAriaInvalid } from "../../internal/forms-field";
import { useMergedRefs } from "../../internal/mergeRefs";
import {
  warnControlledProps,
  warnLengthBounds,
} from "../../internal/devWarnings";
import { useControlledSwitchWarning } from "../../internal/useControllableState";
import { useFormControlProps } from "../FormControl/context";
import { hooks } from "../../internal/stylingHooks";
import useI18n from "../../hooks/useI18n";
import type { InputProps } from "./types";
import styles from "./input.module.scss";

/** Set the value like a user edit, so React fires onChange with it. */
const setNativeValue = (input: HTMLInputElement, value: string) => {
  const setter = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    "value",
  )?.set;
  setter?.call(input, value);
  input.dispatchEvent(new Event("input", { bubbles: true }));
};

/**
 * Input: a single-line text input with optional prefix / suffix, clear
 * button, character count and password visibility toggle.
 * Inside a FormControl it picks up the id, aria wiring, invalid, required,
 * disabled and read-only state. Native attributes go to the <input>;
 * `className` goes to the wrapper and `ref` reaches the <input>.
 */
export const Input = ({
  variant = "outline",
  size = "medium",
  invalid = false,
  prefix,
  suffix,
  clearable = false,
  onClear,
  clearLabel,
  showCharCount = false,
  showPasswordLabel,
  hidePasswordLabel,
  type = "text",
  onChange,
  className,
  ref,
  ...rest
}: InputProps) => {
  const { t } = useI18n();
  const inputRef = useRef<HTMLInputElement>(null);
  const mergedRef = useMergedRefs(inputRef, ref);
  const countId = useId();
  const field = useFormControlProps({
    ...rest,
    "aria-describedby":
      [rest["aria-describedby"], showCharCount ? countId : null]
        .filter(Boolean)
        .join(" ") || undefined,
  });
  const isInvalid = invalid || isAriaInvalid(field["aria-invalid"]);
  const isDisabled = !!field.disabled;
  const isReadOnly = !!field.readOnly;

  // The current text is tracked for the clear button and the counter; a
  // controlled value always wins.
  const [uncontrolledValue, setUncontrolledValue] = useState(() =>
    String(rest.defaultValue ?? ""),
  );
  const isControlled = rest.value !== undefined;
  const currentValue = isControlled
    ? String(rest.value ?? "")
    : uncontrolledValue;
  useControlledSwitchWarning(isControlled, "Input");
  if (process.env.NODE_ENV !== "production") {
    // Both `value` and `defaultValue`: React itself warns (native <input>).
    warnControlledProps("Input", {
      prop: "value",
      value: rest.value,
      handlerProp: "onChange",
      handler: onChange,
      locked: isDisabled || isReadOnly,
      lockHint: "set `readOnly`",
    });
    warnLengthBounds("Input", rest.minLength, rest.maxLength);
  }

  const [passwordVisible, setPasswordVisible] = useState(false);
  const isPassword = type === "password";

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setUncontrolledValue(e.target.value);
    onChange?.(e);
  };

  const handleClear = () => {
    const input = inputRef.current;
    if (!input) return;
    setNativeValue(input, "");
    onClear?.();
    // The clear button disappears; keep focus in the field.
    input.focus();
  };

  const showClear =
    clearable && currentValue !== "" && !isDisabled && !isReadOnly;
  const passwordLabel = passwordVisible
    ? (hidePasswordLabel ?? t("input.hidePassword"))
    : (showPasswordLabel ?? t("input.showPassword"));

  return (
    <div
      className={cn(
        styles.root,
        styles[variant],
        styles[size],
        isInvalid && styles.invalid,
        isDisabled && styles.disabled,
        className,
      )}
      // Lets layouts such as Toolbar size text fields (see page.module.scss)
      data-component="input"
      {...hooks("input", "root", {
        disabled: isDisabled,
        invalid: isInvalid,
        readonly: isReadOnly,
        required: !!(field.required || field["aria-required"]),
        size,
        variant,
      })}
    >
      {prefix != null && prefix !== false && (
        <span
          className={cn(styles.addon, styles.start)}
          {...hooks("input", "prefix")}
        >
          {prefix}
        </span>
      )}
      <input
        ref={mergedRef}
        className={styles.field}
        suppressHydrationWarning
        {...field}
        type={isPassword && passwordVisible ? "text" : type}
        onChange={handleChange}
        aria-invalid={invalid ? true : field["aria-invalid"]}
        {...hooks("input", "input")}
      />
      {showClear && (
        <button
          type="button"
          className={styles.action}
          onClick={handleClear}
          aria-label={clearLabel ?? t("input.clear")}
          {...hooks("input", "clear-button")}
        >
          <IconX aria-hidden focusable={false} />
        </button>
      )}
      {isPassword && (
        <button
          type="button"
          className={styles.action}
          onClick={() => setPasswordVisible((visible) => !visible)}
          aria-label={passwordLabel}
          disabled={isDisabled}
          {...hooks("input", "password-toggle")}
        >
          {passwordVisible ? (
            <IconEyeOff aria-hidden focusable={false} />
          ) : (
            <IconEye aria-hidden focusable={false} />
          )}
        </button>
      )}
      {showCharCount && (
        <span
          id={countId}
          className={styles.count}
          {...hooks("input", "count")}
        >
          {rest.maxLength != null && rest.maxLength >= 0
            ? `${currentValue.length} / ${rest.maxLength}`
            : currentValue.length}
        </span>
      )}
      {suffix != null && suffix !== false && (
        <span
          className={cn(styles.addon, styles.end)}
          {...hooks("input", "suffix")}
        >
          {suffix}
        </span>
      )}
    </div>
  );
};

export default Input;
