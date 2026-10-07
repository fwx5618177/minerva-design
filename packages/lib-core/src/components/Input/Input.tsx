import { cn } from "../../utils/cn";
import { fieldSizeHook, isAriaInvalid } from "../../internal/forms-field";
import { useFormControlProps } from "../FormControl/context";
import type { InputProps } from "./types";
import styles from "./input.module.scss";

/**
 * Input: a bare single-line text input with optional prefix / suffix.
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
  className,
  ref,
  ...rest
}: InputProps) => {
  const field = useFormControlProps(rest);
  const isInvalid = invalid || isAriaInvalid(field["aria-invalid"]);
  const isDisabled = !!field.disabled;

  return (
    <div
      className={cn(
        styles.root,
        styles[variant],
        styles[size],
        isInvalid && styles.invalid,
        isDisabled && styles.disabled,
        "ui-input-root",
        `ui-input-variant-${variant}`,
        `ui-input-size-${fieldSizeHook[size]}`,
        isInvalid && "ui-input-error",
        isDisabled && "ui-input-disabled",
        className,
      )}
      data-invalid={isInvalid || undefined}
      data-disabled={isDisabled || undefined}
    >
      {prefix != null && prefix !== false && (
        <span
          className={cn(
            styles.addon,
            styles.start,
            "ui-input-addon ui-input-addon-start",
          )}
        >
          {prefix}
        </span>
      )}
      <input
        ref={ref}
        className={cn(styles.field, "ui-input-field")}
        suppressHydrationWarning
        {...field}
        aria-invalid={invalid ? true : field["aria-invalid"]}
      />
      {suffix != null && suffix !== false && (
        <span
          className={cn(
            styles.addon,
            styles.end,
            "ui-input-addon ui-input-addon-end",
          )}
        >
          {suffix}
        </span>
      )}
    </div>
  );
};

export default Input;
