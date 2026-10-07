import type { CSSProperties, Ref } from "react";
import type { DataAttributes } from "../../internal/dataAttributes";

export type TagInputSize = "small" | "medium" | "large";

/** `data-*` attributes are forwarded to the wrapper. */
export interface TagInputProps extends DataAttributes {
  /** Selected tags (controlled); omit for an uncontrolled field */
  value?: readonly string[];
  /**
   * Initial tags of an uncontrolled field
   * @default []
   */
  defaultValue?: readonly string[];
  /** Called with the next tags after an addition, a removal or clearing */
  onChange?: (value: string[]) => void;
  /**
   * Suggestions; already selected tags are hidden and duplicates merged
   * @default []
   */
  options?: readonly string[];
  /**
   * Adds the typed draft as a tag when the input loses focus
   * @default true
   */
  commitOnBlur?: boolean;
  /**
   * Keys that commit the draft: a literal string (e.g. "," or ";") splits the
   * typed or pasted text into tags; "Enter" commits on the Enter key (and also
   * splits pasted text on line breaks)
   * @default [",", "Enter"]
   */
  separators?: readonly string[];
  /** Id of the text input (defaults to the FormControl id) */
  id?: string;
  /** Submits every selected tag under this name (hidden inputs); the draft is not submitted */
  name?: string;
  /** Placeholder of the text input */
  placeholder?: string;
  /** Accessible name of the text input when there is no FormControl label */
  "aria-label"?: string;
  /** Ids of the elements labelling the text input (wins over the FormControl label) */
  "aria-labelledby"?: string;
  /** Extra ids describing the text input */
  "aria-describedby"?: string;
  /**
   * Disables the field (also set by FormControl)
   * @default false
   */
  disabled?: boolean;
  /**
   * Shows the tags without editing controls (also set by FormControl)
   * @default false
   */
  readOnly?: boolean;
  /**
   * Error state (also set by an invalid FormControl)
   * @default false
   */
  invalid?: boolean;
  /**
   * Size of the text input
   * @default "medium"
   */
  size?: TagInputSize;
  /**
   * Text of the suggestion list when nothing matches
   * @default "No matches" (localized)
   */
  emptyText?: string;
  /**
   * Accessible label of the add button
   * @default "Add tag" (localized)
   */
  addLabel?: string;
  /**
   * Accessible label of the clear button
   * @default "Clear tags" (localized)
   */
  clearLabel?: string;
  /**
   * Accessible label of a tag's remove button
   * @default tag => `Remove ${tag}` (localized)
   */
  removeLabel?: (tag: string) => string;
  /**
   * Text of the "create this tag" suggestion
   * @default tag => `Add "${tag}"` (localized)
   */
  createLabel?: (tag: string) => string;
  /** Class name of the wrapper */
  className?: string;
  /** Inline style of the wrapper */
  style?: CSSProperties;
  /** Ref to the text <input> */
  ref?: Ref<HTMLInputElement>;
}
