export interface InteractiveIconState {
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
  /** Called with the new state after each toggle */
  onChange?: (isActive: boolean) => void;
  /**
   * Initial active state (the component manages its state internally)
   * @default false
   */
  initialState?: boolean;
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
