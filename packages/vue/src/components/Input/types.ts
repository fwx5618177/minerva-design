export type InputVariant = "outline" | "filled" | "unstyled";
export type InputSize = "small" | "medium" | "large";

/**
 * Props of `Input` (same names and defaults as the React `InputProps`; the
 * value is `v-model`). The `class` goes to the wrapper; every other
 * attribute and listener (`placeholder`, `@input`, `@blur`...) goes to the
 * native `<input>`.
 */
export interface InputProps {
  /** Current text (controlled, `v-model`). Omit for an uncontrolled field */
  modelValue?: string | number;
  /** Initial text of an uncontrolled field */
  defaultValue?: string | number;
  /** @default "text" */
  type?: string;
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
  /** Disables the field (also set by FormControl). @default false */
  disabled?: boolean;
  /** Read-only field (also set by FormControl). @default false */
  readOnly?: boolean;
  /** Marks the field as required. @default false */
  required?: boolean;
  /** id of the input (defaults to the enclosing FormControl's id) */
  id?: string;
  /** Maximum length (also shown by the character count) */
  maxLength?: number;
  /** Content before the text, e.g. "@" (or the `prefix` slot) */
  prefix?: string;
  /** Content after the text, e.g. a unit (or the `suffix` slot) */
  suffix?: string;
  /**
   * Shows a clear button while the field has a value (not when disabled or
   * read-only). Clearing emits an empty value and keeps focus in the field
   * @default false
   */
  clearable?: boolean;
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
}
