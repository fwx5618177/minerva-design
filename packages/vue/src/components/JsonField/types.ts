import type { TextareaProps } from "../Textarea/types";

/**
 * Props of `JsonField` (same names and defaults as the React
 * `JsonFieldProps`; the text is `v-model`). The `class` goes to the
 * wrapper; every other attribute and native listener (`name`, `id`,
 * `@focus`...) goes to the `<textarea>`.
 */
export interface JsonFieldProps extends Omit<
  TextareaProps,
  "modelValue" | "defaultValue"
> {
  /** JSON text (controlled, `v-model`); omit for an uncontrolled field */
  modelValue?: string;
  /**
   * Initial text of an uncontrolled field
   * @default ""
   */
  defaultValue?: string;
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
  /**
   * Spell checking of the textarea
   * @default false
   */
  spellCheck?: boolean;
}

/** Emits of `JsonField` */
export interface JsonFieldEmits {
  /** `v-model`: the new text */
  "update:modelValue": [value: string];
  /** The new text on every edit and after formatting */
  change: [value: string];
}
