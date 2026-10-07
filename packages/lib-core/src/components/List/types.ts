import type { HTMLAttributes, LiHTMLAttributes, Ref } from "react";

/** Row density of a List: 56px or 40px minimum row height */
export type ListDensity = "default" | "compact";

export interface ListProps extends HTMLAttributes<HTMLUListElement> {
  /**
   * Minimum row height and vertical padding (56px / 12px or 40px / 8px)
   * @default "default"
   */
  density?: ListDensity;
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
  role?: React.AriaRole;
  /** Ref to the <ul> element */
  ref?: Ref<HTMLUListElement>;
}

export interface ListItemProps extends Omit<
  LiHTMLAttributes<HTMLLIElement>,
  "children"
> {
  /** Main content (medium weight) */
  primary: React.ReactNode;
  /** Supporting content, muted and smaller (0 is rendered) */
  secondary?: React.ReactNode;
  /** Decorative leading slot, hidden from assistive technologies */
  icon?: React.ReactNode;
  /** Trailing controls, owned by the caller (bounded to 50% of the row) */
  actions?: React.ReactNode;
  /** Ref to the <li> element */
  ref?: Ref<HTMLLIElement>;
}
