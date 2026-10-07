import { ReactNode } from "react";

export type TooltipPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end";

export type TooltipShape = "default" | "rounded" | "thought" | "square";

export type TooltipVariant =
  "light" | "dark" | "info" | "success" | "warning" | "error";

export type TooltipAnimation =
  "fade" | "scale" | "shift-away" | "shift-toward" | "perspective";

export interface TooltipProps {
  /** Content displayed inside the tooltip */
  content: ReactNode;
  /** The element that triggers the tooltip; prefer a focusable element */
  children: ReactNode;
  /** Whether the tooltip is shown (controlled) */
  open?: boolean;
  /**
   * Initial open state (uncontrolled)
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Placement relative to the trigger
   * @default "top"
   */
  placement?: TooltipPlacement;
  /**
   * Color variant
   * @default "dark"
   */
  variant?: TooltipVariant;
  /**
   * Shape of the tooltip
   * @default "default"
   */
  shape?: TooltipShape;
  /**
   * Show / hide animation
   * @default "fade"
   */
  animation?: TooltipAnimation;
  /**
   * Delay before showing on hover, in milliseconds
   * @default 200
   */
  enterDelay?: number;
  /**
   * Delay before hiding on mouse leave, in milliseconds
   * @default 0
   */
  leaveDelay?: number;
  /**
   * Offset from the trigger as [x, y] in pixels
   * @default [0, 8]
   */
  offset?: [number, number];
  /**
   * Makes the tooltip follow the mouse cursor
   * @default false
   */
  followCursor?: boolean;
  /** Custom background color (CSS gradients are supported) */
  bgColor?: string;
  /** Custom text color */
  textColor?: string;
  /**
   * z-index of the tooltip
   * @default 1500
   */
  zIndex?: number;
  /**
   * Shows an arrow pointing at the trigger
   * @default false
   */
  arrow?: boolean;
  /**
   * Disables the tooltip
   * @default false
   */
  disabled?: boolean;
  /**
   * Additional class name of the trigger wrapper
   * @default ""
   */
  className?: string;
  /** Called when the tooltip opens from hover or focus */
  onOpen?: () => void;
  /** Called when the tooltip closes from mouse leave, blur or Escape */
  onClose?: () => void;
  /** Accessible label of the tooltip element */
  ariaLabel?: string;
}

/** Imperative handle exposed through `ref` */
export interface TooltipRef {
  /** Opens the tooltip */
  open: () => void;
  /** Closes the tooltip */
  close: () => void;
  /** Toggles the tooltip */
  toggle: () => void;
}
