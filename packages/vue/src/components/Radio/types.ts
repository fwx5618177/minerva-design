import type { ColorScheme } from "@minerva/core";

/** Semantic colors of a radio */
export type RadioColor = Extract<
  ColorScheme,
  "primary" | "success" | "warning" | "danger"
>;

/**
 * Props of `Radio` (same names and defaults as the React `RadioProps`; the
 * standalone `checked` is `v-model`). `class`, `style` and `data-*`
 * attributes go to the root wrapper; other attributes (`aria-*`) and
 * listeners go to the native `<input>`.
 */
export interface RadioProps {
  /** Whether the radio is checked (controlled, `v-model`). Ignored inside a RadioGroup */
  modelValue?: boolean;
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
  color?: RadioColor;
  /** Label displayed next to the radio (or the `label` / default slot) */
  label?: string;
  /** Id of the native `<input>` (e.g. for an external `<label for>`) */
  id?: string;
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
  /** Message shown below the radio when error is true (linked with aria-describedby) */
  errorMessage?: string;
  /** Helper text shown below the radio (linked with aria-describedby) */
  helperText?: string;
}

/**
 * Props of `RadioGroup` (same names and defaults as the React
 * `RadioGroupProps`; the value is `v-model`). `class`, `style` and `data-*`
 * attributes go to the root wrapper; `aria-*` go to the element with
 * role="radiogroup".
 */
export interface RadioGroupProps {
  /** Value of the selected radio (controlled, `v-model`; `null` = controlled with no selection) */
  modelValue?: string | number | null;
  /** Initially selected value (uncontrolled) */
  defaultValue?: string | number;
  /**
   * Name shared by all radios of the group (a unique name is generated when
   * omitted, so arrow-key navigation always works)
   */
  name?: string;
  /** Visible label of the group, also its accessible name (or the `label` slot) */
  label?: string;
  /** id of the element with role="radiogroup" */
  id?: string;
  /**
   * Disables every radio in the group (inherited from an enclosing
   * FormControl when not set)
   * @default false
   */
  disabled?: boolean;
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
  color?: RadioColor;
}
