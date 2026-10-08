/** Size preset of an Empty state */
export type EmptySize = "small" | "medium" | "large";

/**
 * Props of `Empty` (same names and defaults as React; rich content: the
 * `icon`, `title`, `description`, `action`, `secondary-action` slots and the
 * default slot as the footer).
 */
export interface EmptyProps {
  /**
   * `null` or `false` render no icon at all (the `icon` slot replaces the
   * default one)
   */
  icon?: null | false;
  /** Heading of the empty state (or the `title` slot); also becomes its accessible name */
  title?: string;
  /**
   * Description text (or the `description` slot); `null` hides it
   * @default "No Data" (localized)
   */
  description?: string | null;
  /**
   * Switches to the unframed sized layout (transparent background, size-based
   * padding, icon and font sizes). Omit it for the classic surface layout
   */
  size?: EmptySize;
  /**
   * Uses the built-in SVG illustration instead of the default icon
   * @default false
   */
  useSvg?: boolean;
  /** Width of the container (a number is in px) */
  width?: string | number;
  /** Height of the container (a number is in px) */
  height?: string | number;
  /**
   * Adds a drop shadow
   * @default false
   */
  showShadow?: boolean;
}
