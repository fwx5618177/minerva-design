import type { CSSProperties } from "vue";
import type { ColorScheme } from "@minerva/core";

/** Appearance of a Switch */
export type SwitchVariant = "slider" | "segmented";

/**
 * Props of `Switch` (same names and defaults as the React `SwitchProps`;
 * `checked` is `v-model`). `class`, `style` and `data-*` attributes go to the
 * root; `aria-label`, `aria-labelledby` and `aria-describedby` to the switch
 * (to the segment group for the segmented variant); other attributes to the
 * native `<input>`.
 */
export interface SwitchProps {
  /** Whether the switch is on (controlled, `v-model`) */
  modelValue?: boolean;
  /**
   * Initial state (uncontrolled)
   * @default false
   */
  defaultChecked?: boolean;
  /**
   * Disables the switch. Inherited from an enclosing FormControl when not
   * set; an explicit `false` overrides the FormControl
   * @default false
   */
  disabled?: boolean;
  /**
   * Switch size
   * @default "medium"
   */
  size?: "small" | "medium" | "large";
  /**
   * Semantic color of the "on" state
   * @default "primary"
   */
  color?: Extract<
    ColorScheme,
    "primary" | "success" | "info" | "warning" | "danger"
  >;
  /**
   * Shape of the track and thumb
   * @default "round"
   */
  shape?: "round" | "square";
  /**
   * "slider" is the classic track + thumb; "segmented" renders two pressable
   * segments (requires offLabel and onLabel, otherwise falls back to slider)
   * @default "slider"
   */
  variant?: SwitchVariant;
  /** Label displayed next to the switch (or the `label` / default slot) */
  label?: string;
  /**
   * Label of the "off" state (or the `off-label` slot). With onLabel, both
   * labels are rendered as buttons on each side of the slider (they replace
   * `label`) or as the segments of the segmented variant
   */
  offLabel?: string;
  /** Label of the "on" state (or the `on-label` slot; see offLabel) */
  onLabel?: string;
  /** Name of the input, used in forms */
  name?: string;
  /** id of the input (defaults to the enclosing FormControl's id) */
  id?: string;
  /** Value submitted with the form when on */
  value?: string;
  /**
   * Position of the label relative to the switch
   * @default "end"
   */
  labelPlacement?: "start" | "end" | "top" | "bottom";
  /**
   * Shows a loading state and blocks interaction
   * @default false
   */
  loading?: boolean;
  /**
   * Shows a ripple effect on click
   * @default true
   */
  ripple?: boolean;
  /** Inline styles of the track */
  trackStyle?: CSSProperties;
  /** Inline styles of the thumb */
  thumbStyle?: CSSProperties;
  /**
   * Icon position (the `icon` slot): inside the thumb ("start") or after the
   * switch ("end")
   * @default "start"
   */
  iconPlacement?: "start" | "end";
}
