import { cn } from "../../utils/cn";
import { fieldSizeHook, isAriaInvalid } from "../../internal/forms-field";
import { useFormControlProps } from "../FormControl/context";
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
  const isInvalid = invalid || isAriaInvalid(field["aria-invalid"]);

  return (
    <textarea
      ref={ref}
      className={cn(
        styles.textarea,
        styles[variant],
        styles[size],
        isInvalid && styles.invalid,
        "ui-textarea",
        `ui-textarea-variant-${variant}`,
        `ui-textarea-size-${fieldSizeHook[size]}`,
        "ui-textarea-resize-none",
        isInvalid && "ui-textarea-error",
        className,
      )}
      {...field}
      aria-invalid={invalid ? true : field["aria-invalid"]}
      style={{ ...field.style, resize: "none" }}
    />
  );
};

export default Textarea;
