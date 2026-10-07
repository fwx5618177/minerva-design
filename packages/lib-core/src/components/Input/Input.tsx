import { cn } from "../../utils/cn";
import { isAriaInvalid } from "../../internal/forms-field";
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
        className,
      )}
      // Lets layouts such as Toolbar size text fields (see page.module.scss)
      data-component="input"
    >
      {prefix != null && prefix !== false && (
        <span className={cn(styles.addon, styles.start)}>{prefix}</span>
      )}
      <input
        ref={ref}
        className={styles.field}
        suppressHydrationWarning
        {...field}
        aria-invalid={invalid ? true : field["aria-invalid"]}
      />
      {suffix != null && suffix !== false && (
        <span className={cn(styles.addon, styles.end)}>{suffix}</span>
      )}
    </div>
  );
};

export default Input;
