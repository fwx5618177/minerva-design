import type { Ref } from "react";

/** Active (checked) color of a Checkbox */
export type CheckboxColor =
  "primary" | "success" | "info" | "warning" | "danger";

export interface CheckboxProps {
  /** Checked state (controlled) */
  checked?: boolean;
  /**
   * Initial checked state (uncontrolled)
   * @default false
   */
  defaultChecked?: boolean;
  /**
   * Disables the checkbox. Inherited from an enclosing FormControl when not
   * set; an explicit `false` overrides the FormControl
   * @default false
   */
  disabled?: boolean;
  /**
   * Shows the indeterminate (partially checked) state. Controlled: it stays
   * applied until this prop changes, also after the user clicks
   * @default false
   */
  indeterminate?: boolean;
  /** Name of the input, used in forms */
  name?: string;
  /** Called with the new checked state and the change event */
  onChange?: (
    checked: boolean,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  /**
   * Box shape
   * @default "square"
   */
  shape?: "square" | "circle" | "rounded";
  /**
   * Checkbox size
   * @default "medium"
   */
  size?: "small" | "medium" | "large";
  /** Label content */
  label?: React.ReactNode;
  /** Label content (alternative to `label`; used when `label` is not set) */
  children?: React.ReactNode;
  /**
   * Color of the checked / indeterminate box (the
   * `--ui-checkbox-active-color` custom property overrides it)
   * @default "primary"
   */
  color?: CheckboxColor;
  /** id of the input (defaults to the enclosing FormControl's id) */
  id?: string;
  /** Value submitted with the form when checked */
  value?: string;
  /** Extra ids of elements describing the checkbox (aria-describedby) */
  ariaDescribedBy?: string;
  /** Accessible label, required when there is no visible label */
  ariaLabel?: string;
  /**
   * Additional class name
   * @default ""
   */
  className?: string;
  /** Custom checkmark color */
  checkmarkColor?: string;
  /** Custom box background color */
  boxColor?: string;
  /** Custom box border color */
  boxBorderColor?: string;
  /** Custom icon shown when checked */
  icon?: React.ReactNode;
  /**
   * Marks the input as required (inherited from an enclosing FormControl)
   * @default false
   */
  required?: boolean;
  /**
   * Shows the error state (also set by an invalid enclosing FormControl)
   * @default false
   */
  error?: boolean;
  /**
   * Icon shown before the helper text in the error state
   * @default <FaInfoCircle />
   */
  errorIcon?: React.ReactNode;
  /** Helper or error text shown below the checkbox (linked with aria-describedby) */
  helperText?: string;
  /**
   * Position of the label relative to the box
   * @default "end"
   */
  labelPlacement?: "start" | "end" | "top" | "bottom";
  /** Ref to the underlying <input> element */
  ref?: Ref<HTMLInputElement>;
}
