import type { HTMLAttributes, Ref } from "react";

/** Minimum-height preset of a LoadingState (64 / 160 / 240 px) */
export type LoadingStateSize = "small" | "medium" | "large";

export interface LoadingStateProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
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
  /** Ref to the root <div> element */
  ref?: Ref<HTMLDivElement>;
}
