export type TextareaVariant = "outline" | "filled" | "unstyled";
export type TextareaSize = "small" | "medium" | "large";

/**
 * Props of `Textarea` (same names and defaults as the React `TextareaProps`;
 * the value is `v-model`). Other attributes and native listeners go to the
 * `<textarea>`.
 */
export interface TextareaProps {
  /** Current text (controlled, `v-model`). Omit for an uncontrolled field */
  modelValue?: string | number;
  /** Initial text of an uncontrolled field */
  defaultValue?: string | number;
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
  /** Disables the field (also set by FormControl). @default false */
  disabled?: boolean;
  /** Read-only field (also set by FormControl). @default false */
  readOnly?: boolean;
  /** Marks the field as required. @default false */
  required?: boolean;
  /** id of the textarea (defaults to the enclosing FormControl's id) */
  id?: string;
}
