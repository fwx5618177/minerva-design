import type { AnchorHTMLAttributes, Ref } from "react";

/** Visual style of a TextLink */
export type TextLinkVariant = "default" | "subtle" | "action";

export interface TextLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Merges the link styling onto its single child element (e.g. a router
   * `<Link>`) instead of rendering an extra `<a>`
   * @default false
   */
  asChild?: boolean;
  /**
   * default: underlined inline link; subtle: quiet link with a trailing chevron;
   * action: full-width row link with a bottom rule (settings lists, menus)
   * @default "default"
   */
  variant?: TextLinkVariant;
  /** Ref to the anchor element */
  ref?: Ref<HTMLAnchorElement>;
}
