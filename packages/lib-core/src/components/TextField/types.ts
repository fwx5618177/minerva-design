import type { Ref } from "react";

export interface TextFieldProps {
  /** Name of the input; also used as its id (unless id is set) to link the label */
  name: string;
  /** Id of the input; defaults to name */
  id?: string;
  /**
   * Floating label. Hidden when a placeholder is set or the field is
   * read-only; it then remains the input's accessible name
   */
  label: string;
  /** Current value (controlled); omit for an uncontrolled field */
  value?: string;
  /**
   * Initial value of an uncontrolled field
   * @default ""
   */
  defaultValue?: string;
  /** Placeholder text, replaces the floating label */
  placeholder?: string;
  /**
   * Error message shown below the field (linked with aria-describedby); switches
   * it to the error state, focuses the input and shakes it briefly
   */
  helperText?: string;
  /** Icon shown inside the field */
  icon?: React.ReactNode;
  /**
   * Side of the icon; with type="password" a right icon becomes a show/hide toggle
   * @default "left"
   */
  iconPosition?: "left" | "right";
  /** Custom border color */
  borderColor?: string;
  /**
   * Hides the border
   * @default false
   */
  hideBorder?: boolean;
  /**
   * Minimal style with only a bottom border
   * @default false
   */
  minimal?: boolean;
  /**
   * Corner radius (any CSS length)
   * @default "0.25rem"
   */
  borderRadius?: string;
  /**
   * Native input type
   * @default "text"
   */
  type?: string;
  /**
   * Shows the number of characters
   * @default false
   */
  showCharCount?: boolean;
  /**
   * Shows a clear button when the field has a value
   * @default false
   */
  clearable?: boolean;
  /**
   * Takes the full width of the container (overrides width)
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Width of the field (any CSS length)
   * @default "300px"
   */
  width?: string;
  /**
   * Disables the field
   * @default false
   */
  disabled?: boolean;
  /** Accessible label of the input (defaults to label) */
  ariaLabel?: string;
  /**
   * Accessible label of the clear button
   * @default "Clear" (localized)
   */
  clearLabel?: string;
  /**
   * Accessible label of the password toggle while the password is hidden
   * @default "Show password" (localized)
   */
  showPasswordLabel?: string;
  /**
   * Accessible label of the password toggle while the password is visible
   * @default "Hide password" (localized)
   */
  hidePasswordLabel?: string;
  /**
   * Makes the field read-only
   * @default false
   */
  readOnly?: boolean;
  /**
   * Field size
   * @default "medium"
   */
  size?: "small" | "medium" | "large";
  /** Content shown at the end of the field, e.g. a unit */
  suffix?: React.ReactNode;
  /** Called with the new value on every change; pass value as well to control the field */
  onChange?: (value: string) => void;
  /** Called when the input loses focus */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Called when the input gains focus */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Called on key down in the input */
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  /** Additional class name of the container */
  className?: string;
  /** Ref to the underlying <input> element */
  ref?: Ref<HTMLInputElement>;
}
