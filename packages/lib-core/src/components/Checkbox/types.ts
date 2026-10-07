import type { CSSProperties, Ref } from "react";
import type { ColorScheme } from "@minerva/core";
import type { DataAttributes } from "../../internal/dataAttributes";

/**
 * `className`, `style` and `data-*` attributes go to the <label> wrapping the
 * box; `id`, `name` and `aria-*` go to the native <input>.
 */
export interface CheckboxProps extends DataAttributes {
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
   * Semantic color of the checked / indeterminate box. For a custom look, set
   * the CSS custom properties `--checkbox-checked-color`,
   * `--checkbox-checkmark-color`, `--checkbox-box-color` and
   * `--checkbox-border-color` on `className` or an ancestor
   * @default "primary"
   */
  color?: Extract<
    ColorScheme,
    "primary" | "success" | "info" | "warning" | "danger"
  >;
  /** id of the input (defaults to the enclosing FormControl's id) */
  id?: string;
  /** Value submitted with the form when checked */
  value?: string;
  /** Extra ids of elements describing the checkbox (aria-describedby) */
  "aria-describedby"?: string;
  /** Accessible label, required when there is no visible label */
  "aria-label"?: string;
  /** id(s) of the element(s) labelling the checkbox */
  "aria-labelledby"?: string;
  /**
   * Additional class name of the label element
   * @default ""
   */
  className?: string;
  /** Inline styles of the label element */
  style?: CSSProperties;
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
   * @default a filled info-circle icon
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
