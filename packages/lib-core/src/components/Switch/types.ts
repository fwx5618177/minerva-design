import type { Ref } from "react";
import type { ColorScheme } from "@minerva/core";
import type { DataAttributes } from "../../internal/dataAttributes";

/** Appearance of a Switch */
export type SwitchVariant = "slider" | "segmented";

/** `data-*` attributes are forwarded to the root element. */
export interface SwitchProps extends DataAttributes {
  /** Whether the switch is on (controlled) */
  checked?: boolean;
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
   * Semantic color of the "on" state (checked thumb and track, active side
   * label / segment)
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
  /** Label displayed next to the switch */
  label?: React.ReactNode;
  /** Label content (alternative to `label`; used when `label` is not set) */
  children?: React.ReactNode;
  /**
   * Label of the "off" state. With onLabel, both labels are rendered as
   * buttons on each side of the slider (they replace `label`) or as the
   * segments of the segmented variant
   */
  offLabel?: React.ReactNode;
  /** Label of the "on" state (see offLabel) */
  onLabel?: React.ReactNode;
  /**
   * Accessible label, required when the switch has no visible label. Set on
   * the switch input (on the segment group for the segmented variant)
   */
  "aria-label"?: string;
  /**
   * id(s) of the element(s) labelling the switch (on the segment group for the
   * segmented variant). Defaults to the enclosing FormControl's label for the
   * segmented variant
   */
  "aria-labelledby"?: string;
  /**
   * Extra id(s) of elements describing the switch, merged with the enclosing
   * FormControl's helper / error text
   */
  "aria-describedby"?: string;
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
  /** Additional class name */
  className?: string;
  /** Inline styles of the root element */
  style?: React.CSSProperties;
  /** Inline styles of the track */
  trackStyle?: React.CSSProperties;
  /** Inline styles of the thumb */
  thumbStyle?: React.CSSProperties;
  /** Called when the state changes */
  onChange?: (
    checked: boolean,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  /** Called when the switch receives focus */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Called when the switch loses focus */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Custom icon */
  icon?: React.ReactNode;
  /**
   * Icon position: inside the thumb ("start") or after the switch ("end")
   * @default "start"
   */
  iconPlacement?: "start" | "end";
  /** Ref to the underlying <input role="switch"> element */
  ref?: Ref<HTMLInputElement>;
}
