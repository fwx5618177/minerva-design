import type { Ref, TextareaHTMLAttributes } from "react";

export type TextareaVariant = "outline" | "filled" | "unstyled";
export type TextareaSize = "small" | "medium" | "large";

export interface TextareaProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "size"
> {
  /**
   * Visual style
   * @default "outline"
   */
  variant?: TextareaVariant;
  /**
   * Font size and minimum height
   * @default "medium"
   */
  size?: TextareaSize;
  /**
   * Error state (also set by an invalid FormControl); sets aria-invalid
   * @default false
   */
  invalid?: boolean;
  /** Ref to the <textarea> element */
  ref?: Ref<HTMLTextAreaElement>;
}
