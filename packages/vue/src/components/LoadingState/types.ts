/** Minimum-height preset of a LoadingState (64 / 160 / 240 px) */
export type LoadingStateSize = "small" | "medium" | "large";

/** Props of `LoadingState` (same names and defaults as React). */
export interface LoadingStateProps {
  /**
   * Visible text, which is also what the status region announces
   * @default "Loading..." (localized)
   */
  label?: string;
  /**
   * Minimum height: small for a section, medium for a page or route, large for
   * tall content such as a calendar
   * @default "medium"
   */
  size?: LoadingStateSize;
}
