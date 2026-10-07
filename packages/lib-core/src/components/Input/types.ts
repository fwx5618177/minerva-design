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
  /** Content before the text, e.g. an icon or "@" */
  prefix?: ReactNode;
  /** Content after the text, e.g. a unit, an icon or a button */
  suffix?: ReactNode;
  /**
   * Shows a clear button while the field has a value (not when disabled or
   * read-only). Clearing fires onChange with an empty value and keeps focus
   * in the field
   * @default false
   */
  clearable?: boolean;
  /** Called after the clear button emptied the field */
  onClear?: () => void;
  /**
   * Accessible label of the clear button
   * @default "Clear" (localized)
   */
  clearLabel?: string;
  /**
   * Shows the number of characters (and maxLength, when set) after the text;
   * the count is linked to the input with aria-describedby
   * @default false
   */
  showCharCount?: boolean;
  /**
   * Accessible label of the password visibility toggle (shown for
   * type="password") while the password is hidden
   * @default "Show password" (localized)
   */
  showPasswordLabel?: string;
  /**
   * Accessible label of the password visibility toggle while the password
   * is visible
   * @default "Hide password" (localized)
   */
  hidePasswordLabel?: string;
  /** Class name of the outer wrapper (not the <input>) */
  className?: string;
  /** Ref to the <input> element */
  ref?: Ref<HTMLInputElement>;
}
