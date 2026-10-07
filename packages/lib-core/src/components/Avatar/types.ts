export interface AvatarProps {
  /** Image URL. When omitted, the first letter of name is shown */
  src?: string;
  /**
   * Name of the person; used for the initial, alt text and accessible label
   * @default ""
   */
  name?: string;
  /**
   * Avatar shape
   * @default "circle"
   */
  shape?: "circle" | "square" | "rounded";
  /**
   * Avatar size
   * @default "medium"
   */
  size?: "small" | "medium" | "large";
  /**
   * Additional class name
   * @default ""
   */
  className?: string;
  /**
   * Uses tighter margins for overlapping avatars
   * @default false
   */
  stacked?: boolean;
}

export interface AvatarGroupProps {
  /** Number of additional avatars, shown as a "+N" indicator */
  count?: number;
  /**
   * Additional class name
   * @default ""
   */
  className?: string;
  /** Avatar elements */
  children?: React.ReactNode;
}
