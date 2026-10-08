import type { TextareaProps } from "../Textarea/types";

export interface JsonFieldProps extends Omit<
  TextareaProps,
  "value" | "defaultValue" | "onChange"
> {
  /** JSON text (controlled); omit for an uncontrolled field */
  value?: string;
  /**
   * Initial text of an uncontrolled field
   * @default ""
   */
  defaultValue?: string;
  /** Called with the new text on every edit and after formatting */
  onChange?: (value: string) => void;
  /**
   * Hides the format button; syntax feedback stays visible and associated
   * @default false
   */
  hideToolbar?: boolean;
  /**
   * Spaces per indentation level when formatting (0 to 10; 0 compacts the JSON)
   * @default 2
   */
  indent?: number;
  /**
   * Accessible label of the format button
   * @default "Format JSON" (localized)
   */
  formatLabel?: string;
  /**
   * Status text for valid JSON
   * @default "Valid JSON" (localized)
   */
  validLabel?: string;
  /**
   * Status text prefix for invalid JSON (followed by the parser error)
   * @default "Invalid JSON" (localized)
   */
  invalidLabel?: string;
  /**
   * Rows of the textarea
   * @default 8
   */
  rows?: number;
  /** Class name of the outer wrapper */
  className?: string;
}
