/** Visual style of a TextLink */
export type TextLinkVariant = "default" | "subtle" | "action";

/**
 * Props of `TextLink` (same names and defaults as React). Anchor attributes
 * (`href`, `target`, `rel`...) fall through to the `<a>`: the `href` is
 * sanitized and `target="_blank"` gets a safe `rel`.
 */
export interface TextLinkProps {
  /**
   * Merges the link styling onto its single child element (e.g. a
   * `<RouterLink>`) instead of rendering an extra `<a>`
   * @default false
   */
  asChild?: boolean;
  /**
   * default: underlined inline link; subtle: quiet link with a trailing chevron;
   * action: full-width row link with a bottom rule (settings lists, menus)
   * @default "default"
   */
  variant?: TextLinkVariant;
}
