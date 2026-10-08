/** Container breakpoint below which a SplitLayout stacks its slots */
export type SplitLayoutCollapseBelow = "md" | "lg";

/**
 * Props of `SplitLayout` (same names and defaults as React; the aside content
 * is the `aside` slot or the `aside` text prop).
 */
export interface SplitLayoutProps {
  /**
   * Secondary text rendered after the main slot (or the `aside` slot).
   * Without both, the aside column is omitted (single full-width column);
   * `0` is valid content.
   */
  aside?: string | number | null;
  /**
   * Requested aside width in pixels in split mode (the track is
   * `min(asideWidth, 50%)`); must be finite and positive, otherwise a RangeError
   * is thrown
   * @default 320
   */
  asideWidth?: number;
  /**
   * Splits at container widths of at least 768px (`md`) or 1200px (`lg`) and
   * stacks below
   * @default "md"
   */
  collapseBelow?: SplitLayoutCollapseBelow;
  /**
   * Gap between the slots: numbers and numeric strings select spacing tokens,
   * other strings are CSS values
   * @default 6
   */
  gap?: string | number;
}
