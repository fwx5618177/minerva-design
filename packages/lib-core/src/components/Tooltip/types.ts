import type { ReactNode, Ref } from "react";

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

/**
 * Color variant. `dark` contrasts with the theme (dark in light themes, light
 * in dark themes) and `light` uses the elevated surface. `auto` follows the
 * theme with a frosted surface; `fixedDark` / `fixedLight` keep the same
 * colors whatever the theme.
 */
export type TooltipVariant =
  | "light"
  | "dark"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "auto"
  | "fixedDark"
  | "fixedLight";

export type TooltipAnimation =
  "fade" | "scale" | "shift-away" | "shift-toward" | "perspective";

export interface TooltipProps {
  /** Imperative handle with open / close / toggle */
  ref?: Ref<TooltipRef>;
  /** Content displayed inside the tooltip */
  content: ReactNode;
  /** The element that triggers the tooltip; prefer a focusable element */
  children: ReactNode;
  /** Whether the tooltip is shown (controlled; pair with onOpenChange) */
  open?: boolean;
  /** Called with the requested open state (hover, focus, Escape, ref methods) */
  onOpenChange?: (open: boolean) => void;
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
   * Offset as [x, y] in pixels. For top/bottom placements `y` is the gap to
   * the trigger and `x` shifts along it; for left/right placements `x` is the
   * gap and `y` shifts along it. Without it the tooltip sits 8px away.
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
  /**
   * Attaches the hover / focus handlers, the ref and `className` directly to
   * the single child element instead of wrapping it in a `<div>` (keeps flex
   * and grid layouts intact). The child must accept a `ref`.
   * @default false
   */
  asChild?: boolean;
  /** Additional class name of the tooltip (floating) element */
  contentClassName?: string;
  /** Ref to the tooltip (floating) element, set while it is shown */
  contentRef?: Ref<HTMLDivElement>;
}

export interface TooltipProviderProps {
  /**
   * Default delay before showing on hover, in milliseconds, for every Tooltip
   * inside that does not set `enterDelay`
   */
  enterDelay?: number;
  /**
   * Default delay before hiding on mouse leave, in milliseconds, for every
   * Tooltip inside that does not set `leaveDelay`
   */
  leaveDelay?: number;
  /**
   * When another tooltip of the provider closed less than this many
   * milliseconds ago, the next one opens without waiting for its enter delay
   * @default 300
   */
  skipDelay?: number;
  /** Content of the provider */
  children?: ReactNode;
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
