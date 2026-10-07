import type { Ref } from "react";
import type { ColorScheme } from "@minerva/core";

export interface RadioProps {
  /** Whether the radio is checked (controlled). Ignored inside a RadioGroup */
  checked?: boolean;
  /** Initial checked state (uncontrolled). Ignored inside a RadioGroup */
  defaultChecked?: boolean;
  /**
   * Disables the radio. Inherited from an enclosing FormControl when not set;
   * an explicit `false` overrides the FormControl
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
   * Radio size. Overridden by the RadioGroup size when the group sets one
   * @default "medium"
   */
  size?: "small" | "medium" | "large";
  /**
   * Semantic color of the checked radio. Overridden by the RadioGroup color
   * when the group sets one
   * @default "primary"
   */
  color?: Extract<ColorScheme, "primary" | "success" | "warning" | "danger">;
  /** Label displayed next to the radio */
  label?: React.ReactNode;
  /** Label content (alternative to `label`; used when `label` is not set) */
  children?: React.ReactNode;
  /** Accessible label, required when there is no visible label */
  ariaLabel?: string;
  /**
   * Additional class name
   * @default ""
   */
  className?: string;
  /**
   * Marks the input as required
   * @default false
   */
  required?: boolean;
  /**
   * Shows the error state (errorMessage replaces helperText and describes the
   * radio)
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
  /** Value of the selected radio (controlled; `null` = controlled with no selection) */
  value?: string | number | null;
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
   * Disables every radio in the group (inherited from an enclosing
   * FormControl when not set)
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
   * Size applied to every radio in the group; when not set each radio uses
   * its own size
   */
  size?: "small" | "medium" | "large";
  /**
   * Shows the error state (also set by an invalid enclosing FormControl)
   * @default false
   */
  error?: boolean;
  /** Helper text shown below the group (linked with aria-describedby) */
  helperText?: string;
  /**
   * Marks the group as required (aria-required; inherited from an enclosing
   * FormControl)
   * @default false
   */
  required?: boolean;
  /**
   * Semantic color applied to every radio in the group (overrides the
   * radios' own color); when not set each radio uses its own color
   */
  color?: Extract<ColorScheme, "primary" | "success" | "warning" | "danger">;
  /** Ref to the root wrapper element */
  ref?: Ref<HTMLDivElement>;
}
