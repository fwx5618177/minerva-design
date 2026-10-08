import type { Component } from "vue";

/** Visual style of a Card */
export type CardVariant =
  "default" | "outline" | "elevated" | "filled" | "ghost";

/** Inner spacing preset of a Card or of one of its sections */
export type CardPadding = "none" | "small" | "medium" | "large";

/**
 * Props of `Card` (same names and defaults as React). Root attributes
 * (`href`, `target`, `rel`, `disabled`...) fall through to the root element;
 * with `as="a"` the `href` is sanitized and `target="_blank"` gets a safe `rel`.
 */
export interface CardProps {
  /**
   * Visual style of the card: bordered (`default`, `outline`), shadowed
   * (`elevated`), a muted block (`filled`) or transparent until hovered
   * when interactive (`ghost`)
   * @default "default"
   */
  variant?: CardVariant;
  /**
   * Pads the card itself (sections then sit flush, separated by spacing and a
   * footer rule). When omitted the classic layout is used: each section pads
   * itself and has its own background and divider
   */
  padding?: CardPadding;
  /**
   * Adds hover and focus-visible feedback for clickable cards
   * (combine with `as="a"` / `as="button"`)
   * @default false
   */
  interactive?: boolean;
  /**
   * Element or component rendered as the root, e.g. "a", "button", "article"
   * @default "div"
   */
  as?: string | Component;
  /**
   * Native `type` of the root when `as="button"`
   * @default "button"
   */
  type?: "button" | "submit" | "reset";
}

/** Props of `CardHeader` */
export interface CardHeaderProps {
  /** Overrides the inner spacing of this section */
  padding?: CardPadding;
}

/** Props of `CardTitle` */
export interface CardTitleProps {
  /**
   * Heading level rendered
   * @default "h3"
   */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

/** Props of `CardDescription` (none besides the attributes) */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CardDescriptionProps {}

/** Props of `CardContent` */
export interface CardContentProps {
  /** Entrance animation of the content */
  animation?: "fadeIn" | "slideIn" | "zoomIn";
  /** Overrides the inner spacing of this section */
  padding?: CardPadding;
}

/** Props of `CardFooter` */
export interface CardFooterProps {
  /** Overrides the inner spacing of this section */
  padding?: CardPadding;
}
