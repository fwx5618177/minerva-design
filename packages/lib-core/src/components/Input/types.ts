import type { InputHTMLAttributes, ReactNode, Ref } from "react";

export type InputVariant = "outline" | "filled" | "unstyled";
export type InputSize = "small" | "medium" | "large";

export interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "prefix"
> {
  /**
   * Visual style
   * @default "outline"
   */
  variant?: InputVariant;
  /**
   * Height and font size
   * @default "medium"
   */
  size?: InputSize;
  /**
   * Error state (also set by an invalid FormControl); sets aria-invalid
   * @default false
   */
  invalid?: boolean;
  /** Decorative content before the text, e.g. an icon or "@" */
  prefix?: ReactNode;
  /** Decorative content after the text, e.g. a unit */
  suffix?: ReactNode;
  /** Class name of the outer wrapper (not the <input>) */
  className?: string;
  /** Ref to the <input> element */
  ref?: Ref<HTMLInputElement>;
}
