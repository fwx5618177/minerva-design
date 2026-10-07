import type { CSSProperties, Ref } from "react";
import type { ColorScheme } from "@minerva/core";
import type { DataAttributes } from "../../internal/dataAttributes";

/**
 * `className`, `style` and `data-*` attributes go to the root wrapper; `id`,
 * `name` and `aria-*` go to the native <input>.
 */
export interface RadioProps extends DataAttributes {
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
  "aria-label"?: string;
  /** id(s) of the element(s) labelling the radio */
  "aria-labelledby"?: string;
  /** Id of the native <input> (e.g. for an external <label htmlFor>) */
  id?: string;
  /** Extra ids describing the radio (merged with its helper / error text) */
  "aria-describedby"?: string;
  /**
   * Additional class name of the root wrapper
   * @default ""
   */
  className?: string;
  /** Inline styles of the root wrapper */
  style?: CSSProperties;
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
   * @default a filled info-circle icon
   */
  errorIcon?: React.ReactNode;
  /** Message shown below the radio when error is true (linked with aria-describedby) */
  errorMessage?: string;
  /** Helper text shown below the radio (linked with aria-describedby) */
  helperText?: string;
  /** Ref to the native <input type="radio"> element */
  ref?: Ref<HTMLInputElement>;
}

/**
 * `className`, `style` and `data-*` attributes go to the root wrapper; `id`
 * and `aria-*` go to the element with role="radiogroup".
 */
export interface RadioGroupProps extends DataAttributes {
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
  "aria-label"?: string;
  /**
   * id(s) of the element(s) labelling the group (takes precedence over the
   * visible `label` and the enclosing FormControl label)
   */
  "aria-labelledby"?: string;
  /** Extra ids describing the group (merged with its helper / error text) */
  "aria-describedby"?: string;
  /** id of the element with role="radiogroup" */
  id?: string;
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
   * Additional class name of the root wrapper
   * @default ""
   */
  className?: string;
  /** Inline styles of the root wrapper */
  style?: CSSProperties;
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
