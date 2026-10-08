/** Row density of a List: 56px, 40px or 72px minimum row height */
export type ListDensity = "default" | "compact" | "comfortable";

/** Props of `List` (same names and defaults as React). */
export interface ListProps {
  /**
   * Minimum row height and vertical padding (56px / 12px, 40px / 8px or
   * 72px / 16px)
   * @default "default"
   */
  density?: ListDensity;
  /**
   * Frames the list as a card (full border, rounded corners, surface
   * background) whose rows are tinted on hover and while a control inside
   * them has the focus
   * @default false
   */
  bordered?: boolean;
  /**
   * Draws token-colored separators between adjacent rows
   * @default true
   */
  dividers?: boolean;
  /**
   * List role; kept explicit so Safari / VoiceOver keep list semantics after
   * the markers are removed
   * @default "list"
   */
  role?: string;
}

/**
 * Props of `ListItem` (same names as React; rich content: the `primary`,
 * `secondary`, `icon` and `actions` slots).
 */
export interface ListItemProps {
  /** Main content (medium weight), or the `primary` slot */
  primary?: string | number;
  /** Supporting content, muted and smaller (0 is rendered), or the `secondary` slot */
  secondary?: string | number;
}
