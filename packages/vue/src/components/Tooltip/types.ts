import type { Ref } from "vue";
import type { ColorScheme } from "@minerva/core";

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
 * Visual style of a Tooltip. `solid` is a filled surface (the inverted,
 * contrasting surface for the neutral color; the semantic color with inverse
 * text otherwise), `subtle` a tinted surface with a border, `glass` a frosted
 * elevated surface that follows the theme.
 */
export type TooltipVariant = "solid" | "subtle" | "glass";

export type TooltipAnimation =
  "fade" | "scale" | "shift-away" | "shift-toward" | "perspective";

/**
 * Props of `Tooltip` (same names and defaults as the React `TooltipProps`;
 * the trigger is the default slot, rich content the `content` slot).
 */
export interface TooltipProps {
  /** Text displayed inside the tooltip (or the `content` slot) */
  content?: string;
  /** Whether the tooltip is shown (controlled, `v-model:open`) */
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
   * Semantic color of the tooltip. With the `glass` variant the color only
   * tints the border (neutral keeps the plain frosted surface)
   * @default "neutral"
   */
  color?: Extract<
    ColorScheme,
    "neutral" | "info" | "success" | "warning" | "danger"
  >;
  /**
   * Visual style: `solid` (filled; neutral is the inverted contrasting
   * surface), `subtle` (tinted surface with a border) or `glass` (frosted
   * elevated surface)
   * @default "solid"
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
   * Additional class name of the trigger wrapper (`class` works too)
   * @default ""
   */
  className?: string;
  /** Accessible label of the tooltip element (`aria-label`) */
  ariaLabel?: string;
  /**
   * Attaches the hover / focus handlers, the ref and `class` directly to the
   * single child element instead of wrapping it in a `<div>` (keeps flex
   * and grid layouts intact).
   * @default false
   */
  asChild?: boolean;
  /**
   * Additional class name of the tooltip (floating) element. To customize
   * the colors, set the `--tooltip-bg` (background, gradients allowed) and
   * `--tooltip-color` (text) custom properties on it
   */
  contentClassName?: string;
  /**
   * Ref to the tooltip (floating) element, set while it is shown: a ref
   * object or a callback (also exposed as `contentElement`)
   */
  contentRef?:
    Ref<HTMLDivElement | null> | ((element: HTMLDivElement | null) => void);
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
}

/** Imperative handle exposed through the template ref */
export interface TooltipRef {
  /** Opens the tooltip */
  open: () => void;
  /** Closes the tooltip */
  close: () => void;
  /** Toggles the tooltip */
  toggle: () => void;
}
