import type { ColorScheme } from "@minerva/core";

/**
 * Props of `Checkbox` (same names and defaults as the React `CheckboxProps`;
 * `checked` is `v-model`). `class`, `style` and `data-*` attributes go to the
 * `<label>` wrapping the box; other attributes (`aria-*`) and listeners go to
 * the native `<input>`.
 */
export interface CheckboxProps {
  /** Checked state (controlled, `v-model`) */
  modelValue?: boolean;
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
  /** Label text (or the `label` / default slot) */
  label?: string;
  /**
   * Semantic color of the checked / indeterminate box
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
  /** Helper or error text shown below the checkbox (linked with aria-describedby) */
  helperText?: string;
  /**
   * Position of the label relative to the box
   * @default "end"
   */
  labelPlacement?: "start" | "end" | "top" | "bottom";
}
