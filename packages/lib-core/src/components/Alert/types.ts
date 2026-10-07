import type { HTMLAttributes, Ref } from "react";
import type { ColorScheme } from "@minerva/core";

export type AlertSize = "small" | "medium" | "large";

export interface AlertProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "title" | "children" | "color"
> {
  /** Alert title */
  title?: React.ReactNode;
  /** Alert content */
  children?: React.ReactNode;
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
   * Shows the status icon of the color
   * @default true
   */
  showIcon?: boolean;
  /** Custom icon, replacing the status icon */
  icon?: React.ReactNode;
  /**
   * Shows a close button
   * @default false
   */
  closable?: boolean;
  /** Custom close icon */
  closeIcon?: React.ReactNode;
  /** Called when the close button is clicked */
  onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void;
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
  /** Additional class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Action area rendered on the right, e.g. buttons */
  action?: React.ReactNode;
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
  /** Custom corner radius */
  borderRadius?: number | string;
  /**
   * Lets the content be expanded and collapsed (requires a title)
   * @default false
   */
  collapsible?: boolean;
  /** Whether the content is expanded (controlled); use together with onExpand */
  expanded?: boolean;
  /**
   * Whether the content is initially expanded (uncontrolled)
   * @default true
   */
  defaultExpanded?: boolean;
  /** Called with the new state when the content is expanded or collapsed */
  onExpand?: (expanded: boolean) => void;
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
   * ARIA role of the alert. Danger and warning interrupt ("alert"), info
   * and success are polite ("status")
   * @default "alert" for danger / warning, "status" otherwise
   */
  role?: React.AriaRole;
  /** Ref to the root <div> element */
  ref?: Ref<HTMLDivElement>;
}
