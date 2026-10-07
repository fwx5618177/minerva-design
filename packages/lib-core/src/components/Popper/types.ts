/**
 * Popper placement options
 */
export type PopperPlacement =
  | "top"
  | "topStart"
  | "topEnd"
  | "bottom"
  | "bottomStart"
  | "bottomEnd"
  | "left"
  | "leftStart"
  | "leftEnd"
  | "right"
  | "rightStart"
  | "rightEnd";

/**
 * Popper variant options
 */
export type PopperVariant =
  "default" | "primary" | "secondary" | "success" | "warning" | "error";

/**
 * Popper type options - simplified to most common use cases
 */
export type PopperType =
  | "default" // generic popup
  | "menu" // menu (role="menu")
  | "select" // select dropdown
  | "tooltip"; // tooltip

/**
 * Popper size options
 */
export type PopperSize = "auto" | "small" | "medium" | "large";

/**
 * Position offset configuration
 */
export interface PopperOffset {
  /** Horizontal offset in pixels */
  x: number;
  /** Vertical offset in pixels */
  y: number;
}

/**
 * Animation configuration
 */
export interface PopperAnimation {
  /** Duration in milliseconds */
  duration: number;
  /** CSS timing function */
  easing: string;
}

/**
 * Popper component props
 */
export interface PopperProps {
  /** Element the popper is positioned against */
  anchorEl: HTMLElement | null;
  /** Whether the popper is visible (controlled) */
  visible: boolean;
  /** Popper content */
  children: React.ReactNode;
  /**
   * Placement relative to the anchor
   * @default "bottom"
   */
  placement?: PopperPlacement;
  /**
   * Color variant
   * @default "default"
   */
  variant?: PopperVariant;
  /**
   * Functional type; "menu" sets role="menu", otherwise role="dialog"
   * @default "default"
   */
  type?: PopperType;
  /**
   * Position offset in pixels
   * @default { x: 0, y: 8 }
   */
  offset?: PopperOffset;
  /**
   * Transition settings
   * @default { duration: 200, easing: "ease" }
   */
  animation?: PopperAnimation;
  /**
   * Shows an arrow pointing at the anchor
   * @default false
   */
  arrow?: boolean;
  /**
   * z-index of the popper
   * @default 1000
   */
  zIndex?: number;
  /** Called on mousedown outside both the popper and the anchor */
  onClickAway?: (event: MouseEvent) => void;
  /**
   * Additional class name
   * @default ""
   */
  className?: string;
  /**
   * tabIndex of the popper element
   * @default 0
   */
  tabIndex?: number;
  /** Accessible label of the popper */
  ariaLabel?: string;
  /**
   * Custom colors and dimensions
   * @default {}
   */
  popperStyle?: PopperCustomStyle;
  /**
   * Preset size; "auto" fits the content
   * @default "auto"
   */
  size?: PopperSize;
  /**
   * Allows text to wrap onto multiple lines
   * @default false
   */
  multiline?: boolean;
  /**
   * Anchor interaction that requests a visibility change via onVisibleChange
   * @default "click"
   */
  trigger?: PopperTrigger;
  /** Called with the requested visibility when the trigger fires */
  onVisibleChange?: (visible: boolean) => void;
  /**
   * Lets the content scroll when it overflows
   * @default true
   */
  scrollable?: boolean;
  /** Fixed width, overriding the size preset */
  width?: number | string;
  /** Fixed height, overriding the size preset */
  height?: number | string;
}

export interface PopperCustomStyle {
  /** Background color */
  backgroundColor?: string;
  /** Text color */
  color?: string;
  /** Width */
  width?: number | string;
  /** Height */
  height?: number | string;
  /** Max width */
  maxWidth?: number | string;
  /** Max height */
  maxHeight?: number | string;
  /** Min width */
  minWidth?: number | string;
  /** Min height */
  minHeight?: number | string;
  /** Padding */
  padding?: number | string;
  /** Border color */
  borderColor?: string;
}

export type PopperTrigger =
  "hover" | "click" | "contextMenu" | "focus" | "manual";
