import type { HTMLAttributes, Ref } from "react";

export interface KeyValueEntry {
  /** Stable id of the row (React key, error lookup); keep it across edits */
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

export interface KeyValueEditorProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "onChange" | "defaultValue"
> {
  /** Rows (controlled); omit for an uncontrolled editor */
  entries?: KeyValueEntry[];
  /**
   * Initial rows of an uncontrolled editor
   * @default []
   */
  defaultEntries?: KeyValueEntry[];
  /** Called with the next rows after an edit, an addition or a removal */
  onChange?: (entries: KeyValueEntry[]) => void;
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
  /** Ref to the container <div> */
  ref?: Ref<HTMLDivElement>;
}
