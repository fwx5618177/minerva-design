export interface KeyValueEntry {
  /** Stable id of the row (render key, error lookup); keep it across edits */
  id: string;
  /** Key text (whitespace and newlines are preserved) */
  key: string;
  /** Value text (whitespace and newlines are preserved) */
  value: string;
}

export interface KeyValueEntryErrors {
  /** Error message of the key field */
  key?: string;
  /** Error message of the value field */
  value?: string;
}

/**
 * Props of `KeyValueEditor` (same names and defaults as the React
 * `KeyValueEditorProps`; the React `entries` / `defaultEntries` are
 * `v-model` / `defaultValue`). Other attributes go to the container `<div>`.
 */
export interface KeyValueEditorProps {
  /** Rows (controlled, `v-model`); omit for an uncontrolled editor */
  modelValue?: KeyValueEntry[];
  /**
   * Initial rows of an uncontrolled editor
   * @default []
   */
  defaultValue?: KeyValueEntry[];
  /**
   * Disables every field and button
   * @default false
   */
  disabled?: boolean;
  /**
   * Label of the key fields (followed by the row number for screen readers)
   * @default "Key" (localized)
   */
  keyLabel?: string;
  /**
   * Label of the value fields
   * @default "Value" (localized)
   */
  valueLabel?: string;
  /**
   * Text of the add button
   * @default "Add entry" (localized)
   */
  addLabel?: string;
  /**
   * Accessible label of the remove buttons (followed by the row number)
   * @default "Remove entry" (localized)
   */
  removeLabel?: string;
  /** Field errors by entry id; validation belongs to the consumer */
  errors?: Record<string, KeyValueEntryErrors>;
}
