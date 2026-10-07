import type { HTMLAttributes, ReactNode, Ref } from "react";

/** Container breakpoint below which a SplitLayout stacks its slots */
export type SplitLayoutCollapseBelow = "md" | "lg";

export interface SplitLayoutProps extends HTMLAttributes<HTMLDivElement> {
  /** Ref to the outer div */
  ref?: Ref<HTMLDivElement>;
  /**
   * Secondary content rendered after the main slot. `null`, `undefined` and
   * `false` omit the slot (single full-width column); `0` is valid content.
   */
  aside: ReactNode;
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
