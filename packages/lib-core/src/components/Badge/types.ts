import type { Ref } from "react";

export interface BadgeProps {
  /**
   * Element the badge is attached to. Without children (or with plain text /
   * number children, used as the content) the badge renders inline in the
   * normal flow instead of being positioned on a corner
   */
  children?: React.ReactNode;
  /**
   * Additional class name of the badge
   * @default ""
   */
  className?: string;
  /**
   * Color scheme of the badge
   * @default "primary"
   */
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "error"
    | "info"
    | "light"
    | "dark";
  /**
   * Badge size
   * @default "medium"
   */
  size?: "small" | "medium" | "large";
  /** Content displayed inside the badge (count, short text...) */
  content?: string | number;
  /**
   * Corner of the children the badge is placed on (ignored by standalone badges)
   * @default "top-right"
   */
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  /**
   * Renders a small dot instead of content
   * @default false
   */
  dot?: boolean;
  /** Custom background color */
  bgColor?: string;
  /** Custom text color */
  textColor?: string;
  /** Custom border radius (CSS value) */
  borderRadius?: string;
  /** Custom border width (CSS value) */
  borderWidth?: string;
  /** Custom border color */
  borderColor?: string;
  /** Accessible label of the badge, e.g. "5 unread messages" */
  ariaLabel?: string;
  /** Icon displayed before the content */
  icon?: React.ReactNode;
  /** Ref to the root element: the wrapper when attached to children, otherwise the badge itself */
  ref?: Ref<HTMLElement>;
}
