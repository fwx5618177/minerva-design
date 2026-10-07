import type { Ref } from "react";

export interface RadioProps {
  /** Whether the radio is checked (controlled). Ignored inside a RadioGroup */
  checked?: boolean;
  /** Initial checked state (uncontrolled). Ignored inside a RadioGroup */
  defaultChecked?: boolean;
  /**
   * Disables the radio
   * @default false
   */
  disabled?: boolean;
  /** Native name attribute. Inside a RadioGroup the group's name is used */
  name?: string;
  /** Value of the radio; identifies it within a RadioGroup */
  value?: string | number;
  /** Called when the checked state changes (standalone radios only; inside a group use RadioGroup's onChange) */
  onChange?: (
    checked: boolean,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  /**
   * Radio size. Overridden by the RadioGroup size
   * @default "medium"
   */
  size?: "small" | "medium" | "large";
  /**
   * Color scheme of the radio
   * @default "default"
   */
  type?: "default" | "primary" | "success" | "warning" | "error";
  /** Text label displayed next to the radio */
  label?: string;
  /** Accessible label, required when there is no visible label */
  ariaLabel?: string;
  /**
   * Additional class name
   * @default ""
   */
  className?: string;
  /** Custom color of the radio mark. Overridden by the RadioGroup color */
  color?: string;
  /** Custom background color of the radio mark */
  bgColor?: string;
  /**
   * Marks the input as required
   * @default false
   */
  required?: boolean;
  /**
   * Shows the error state (errorMessage replaces helperText)
   * @default false
   */
  error?: boolean;
  /**
   * Icon shown before the error message
   * @default <FaInfoCircle />
   */
  errorIcon?: React.ReactNode;
  /** Message shown below the radio when error is true (linked with aria-describedby) */
  errorMessage?: string;
  /** Helper text shown below the radio (linked with aria-describedby) */
  helperText?: string;
  /** Ref to the native <input type="radio"> element */
  ref?: Ref<HTMLInputElement>;
}

export interface RadioGroupProps {
  /** Value of the selected radio (controlled) */
  value?: string | number;
  /** Initially selected value (uncontrolled) */
  defaultValue?: string | number;
  /**
   * Name shared by all radios of the group (a unique name is generated when
   * omitted, so arrow-key navigation always works)
   */
  name?: string;
  /** Visible label of the group; also its accessible name */
  label?: React.ReactNode;
  /** Accessible label of the group when there is no visible label */
  ariaLabel?: string;
  /** Called with the newly selected value */
  onChange?: (
    value: string | number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  /**
   * Disables every radio in the group
   * @default false
   */
  disabled?: boolean;
  /** Radio elements */
  children?: React.ReactNode;
  /**
   * Additional class name
   * @default ""
   */
  className?: string;
  /**
   * Layout direction of the radios
   * @default "vertical"
   */
  direction?: "horizontal" | "vertical";
  /**
   * Size applied to every radio in the group
   * @default "medium"
   */
  size?: "small" | "medium" | "large";
  /**
   * Shows the error state
   * @default false
   */
  error?: boolean;
  /** Helper text shown below the group (linked with aria-describedby) */
  helperText?: string;
  /**
   * Marks the group as required (aria-required)
   * @default false
   */
  required?: boolean;
  /**
   * Color applied to every radio in the group
   * @default "var(--primary-color)"
   */
  color?: string;
  /** Ref to the root wrapper element */
  ref?: Ref<HTMLDivElement>;
}
