export type SkeletonVariant =
  "text" | "circular" | "rectangular" | "rounded" | "button" | "image" | "card";

export type SkeletonAnimation = "pulse" | "wave" | "false";

export interface SkeletonProps {
  /**
   * Shape of the placeholder
   * @default "text"
   */
  variant?: SkeletonVariant;
  /**
   * Loading animation; "false" disables it
   * @default "pulse"
   */
  animation?: SkeletonAnimation;
  /** Width of each line (numbers are pixels) */
  width?: number | string;
  /** Height of each line (numbers are pixels) */
  height?: number | string;
  /** Additional class name */
  className?: string;
  /** Real content, rendered once loading is false */
  children?: React.ReactNode;
  /**
   * Shows the placeholder; set to false to render children
   * @default true
   */
  loading?: boolean;
  /** Custom corner radius of each line */
  borderRadius?: number | string;
  /** Inline styles applied to each line */
  style?: React.CSSProperties;
  /**
   * Number of lines to render
   * @default 1
   */
  lines?: number;
  /**
   * Shows an avatar placeholder
   * @default false
   */
  avatar?: boolean;
  /**
   * Avatar size (numbers are pixels)
   * @default 40
   */
  avatarSize?: number | string;
  /**
   * Avatar shape
   * @default "circle"
   */
  avatarShape?: "circle" | "square";
  /**
   * Highlights the card variant as active
   * @default false
   */
  active?: boolean;
  /**
   * Shows a paragraph placeholder (replaces the lines)
   * @default false
   */
  paragraph?: boolean;
  /**
   * Shows a title placeholder (replaces the lines)
   * @default false
   */
  title?: boolean;
}
