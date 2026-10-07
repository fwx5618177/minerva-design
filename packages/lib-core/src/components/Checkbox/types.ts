export interface CheckboxProps {
  /** Checked state (controlled) */
  checked?: boolean;
  /** Initial checked state (uncontrolled) */
  defaultChecked?: boolean;
  /**
   * Disables the checkbox
   * @default false
   */
  disabled?: boolean;
  /**
   * Shows the indeterminate (partially checked) state
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
  /** Label text */
  label?: string;
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
  /** Custom icon shown when checked (controlled mode only) */
  icon?: React.ReactNode;
  /**
   * Marks the input as required
   * @default false
   */
  required?: boolean;
  /**
   * Shows the error state
   * @default false
   */
  error?: boolean;
  /**
   * Icon shown before the helper text in the error state
   * @default <FaInfoCircle />
   */
  errorIcon?: React.ReactNode;
  /** Helper or error text shown below the checkbox */
  helperText?: string;
  /**
   * Position of the label relative to the box
   * @default "end"
   */
  labelPlacement?: "start" | "end" | "top" | "bottom";
  /** Ref to the underlying <input> element */
  ref?: React.Ref<HTMLInputElement>;
}
