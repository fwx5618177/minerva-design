import { cn } from "../../utils/cn";
import { isAriaInvalid } from "../../internal/forms-field";
import { warnLengthBounds } from "../../internal/devWarnings";
import { useFormControlProps } from "../FormControl/context";
import { hooks } from "../../internal/stylingHooks";
import type { TextareaProps } from "./types";
import styles from "./textarea.module.scss";

/**
 * Textarea: multi-line text input sharing Input's look. Manual resizing is
 * disabled (set `rows` or layout dimensions instead). FormControl-aware;
 * `ref` reaches the <textarea>.
 */
export const Textarea = ({
  variant = "outline",
  size = "medium",
  invalid = false,
  className,
  ref,
  ...rest
}: TextareaProps) => {
  const field = useFormControlProps(rest);
  if (process.env.NODE_ENV !== "production") {
    // Controlled `value` misuse is reported by React (native <textarea>).
    warnLengthBounds("Textarea", rest.minLength, rest.maxLength);
  }
  const isInvalid = invalid || isAriaInvalid(field["aria-invalid"]);

  return (
    <textarea
      ref={ref}
      className={cn(
        styles.textarea,
        styles[variant],
        styles[size],
        isInvalid && styles.invalid,
        className,
      )}
      {...field}
      aria-invalid={invalid ? true : field["aria-invalid"]}
      style={{ ...field.style, resize: "none" }}
      {...hooks("textarea", "root", {
        disabled: !!field.disabled,
        invalid: isInvalid,
        readonly: !!field.readOnly,
        required: !!(field.required || field["aria-required"]),
        size,
        variant,
      })}
    />
  );
};

export default Textarea;
