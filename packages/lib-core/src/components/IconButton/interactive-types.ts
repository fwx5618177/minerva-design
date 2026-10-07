import type { Ref } from "react";

export interface InteractiveIconState {
  /** Stable accessible name of the toggle (its state is exposed via aria-pressed) */
  label: string;
  isActive: boolean;
  activeColor: string;
  inactiveColor: string;
  activeBgColor: string;
  inactiveBgColor: string;
  activeHoverColor: string;
  inactiveHoverColor: string;
  activeFillColor: string;
  inactiveFillColor: string;
  activeTooltip: string;
  inactiveTooltip: string;
}

export interface InteractiveIconProps {
  /** Preset that defines the icon, colors and tooltips (a key of interactiveIconsMap) */
  type: InteractiveIconType;
  /** Ref to the underlying <button> element */
  ref?: Ref<HTMLButtonElement>;
  /** Active (pressed) state (controlled; pair with onChange) */
  pressed?: boolean;
  /**
   * Initial active state (uncontrolled)
   * @default false
   */
  defaultPressed?: boolean;
  /** Called with the new state after each toggle */
  onChange?: (isActive: boolean) => void;
  /**
   * Initial active state (uncontrolled)
   * @deprecated Use `defaultPressed`
   */
  initialState?: boolean;
  /**
   * Accessible name of the toggle; the pressed state is exposed separately
   * via aria-pressed, so keep it stable (e.g. "Favorite")
   * @default the preset's label, e.g. "Favorite"
   */
  ariaLabel?: string;
  /** Same as ariaLabel (standard attribute spelling) */
  "aria-label"?: string;
  /** Additional class name */
  className?: string;
  /**
   * Button size
   * @default "medium"
   */
  size?: "small" | "medium" | "large";
  /**
   * Button shape
   * @default "circle"
   */
  shape?: "circle" | "square";
  /**
   * Disables the button
   * @default false
   */
  disabled?: boolean;
}

export type InteractiveIconType =
  | "favorite"
  | "bookmark"
  | "star"
  | "like"
  | "follow"
  | "share"
  | "notification"
  | "pin"
  | "archive"
  | "lock"
  | "download"
  | "visibility"
  | "clock"
  | "rate"
  | "thumbDown"
  | "flag"
  | "close";
