import type { ColorScheme } from "@minerva/core";
import type { FocusTarget } from "../../internal/focus-after-removal";

export type AlertSize = "small" | "medium" | "large";
export type { FocusTarget };

/**
 * Props of `Alert` (same names and defaults as React; `onClose` / `onExpand`
 * are the `close` / `expand` emits, `expanded` is `v-model:expanded`).
 */
export interface AlertProps {
  /** Alert title (or the `title` slot) */
  title?: string;
  /**
   * Semantic (status) color, which also sets the default icon and the role
   * @default "info"
   */
  color?: Extract<ColorScheme, "info" | "success" | "warning" | "danger">;
  /**
   * Visual style: `subtle` (tinted background), `outline` (transparent
   * background with a colored border) or `solid` (filled with the color)
   * @default "subtle"
   */
  variant?: "subtle" | "outline" | "solid";
  /**
   * Alert size
   * @default "medium"
   */
  size?: AlertSize;
  /**
   * Shows the status icon of the color (or the `icon` slot)
   * @default true
   */
  showIcon?: boolean;
  /**
   * Shows a close button
   * @default false
   */
  closable?: boolean;
  /**
   * Plays an entrance animation
   * @default true
   */
  animation?: boolean;
  /**
   * Entrance animation name
   * @default "slideIn"
   */
  animationName?: "slideIn" | "fadeIn" | "bounce" | "zoom";
  /**
   * Banner mode, suited to page-level notices at the top of a page
   * @default false
   */
  banner?: boolean;
  /**
   * Adds a drop shadow
   * @default false
   */
  elevation?: boolean;
  /**
   * Rounds the corners
   * @default true
   */
  rounded?: boolean;
  /** Custom corner radius (a number is in px) */
  borderRadius?: number | string;
  /**
   * Lets the content be expanded and collapsed (requires a title)
   * @default false
   */
  collapsible?: boolean;
  /** Whether the content is expanded (controlled, `v-model:expanded`) */
  expanded?: boolean;
  /**
   * Whether the content is initially expanded (uncontrolled)
   * @default true
   */
  defaultExpanded?: boolean;
  /**
   * Accessible label of the close button
   * @default "Close" (localized)
   */
  closeLabel?: string;
  /**
   * Accessible label of the toggle while the content is collapsed
   * @default "Expand" (localized)
   */
  expandLabel?: string;
  /**
   * Accessible label of the toggle while the content is expanded
   * @default "Collapse" (localized)
   */
  collapseLabel?: string;
  /**
   * Accessible label of the status icon
   * @default "{color} icon", e.g. "info icon" (localized)
   */
  iconLabel?: string;
  /**
   * Element receiving focus after the alert is closed with its close button:
   * an element, a ref or a getter. Without it focus moves to the next
   * focusable element after the alert (else the previous one, else its
   * container), never to <body>
   */
  returnFocus?: FocusTarget;
  /**
   * ARIA role of the alert. Danger and warning interrupt ("alert"), info
   * and success are polite ("status")
   * @default "alert" for danger / warning, "status" otherwise
   */
  role?: string;
}
