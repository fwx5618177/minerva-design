import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ElementType,
  HTMLAttributes,
  Ref,
} from "react";

/** Visual style of a Card */
export type CardVariant =
  "default" | "outline" | "elevated" | "filled" | "ghost";

/** Inner spacing preset of a Card or of one of its sections */
export type CardPadding = "none" | "small" | "medium" | "large";

/**
 * Attributes accepted by the Card root: container attributes plus the anchor
 * and button attributes needed when it is rendered with `as="a"` / `as="button"`.
 */
type CardRootAttributes = Omit<
  HTMLAttributes<HTMLElement>,
  "children" | "color" | "type"
> &
  Pick<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "href" | "target" | "rel" | "download"
  > &
  Pick<ButtonHTMLAttributes<HTMLButtonElement>, "disabled" | "form" | "type">;

export interface CardProps extends CardRootAttributes {
  /** Card content, usually CardHeader, CardContent and CardFooter */
  children?: React.ReactNode;
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
  as?: ElementType;
  /**
   * Native `type` of the root when `as="button"`
   * @default "button"
   */
  type?: "button" | "submit" | "reset";
  /**
   * Additional class name
   * @default ""
   */
  className?: string;
  /** Ref to the root element */
  ref?: Ref<HTMLElement>;
}

export interface CardHeaderProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  /** Header content, usually CardTitle and CardDescription */
  children?: React.ReactNode;
  /**
   * Additional class name
   * @default ""
   */
  className?: string;
  /** Overrides the inner spacing of this section */
  padding?: CardPadding;
  /** Ref to the root <div> element */
  ref?: Ref<HTMLDivElement>;
}

export interface CardTitleProps extends Omit<
  HTMLAttributes<HTMLHeadingElement>,
  "children"
> {
  /** Title text */
  children?: React.ReactNode;
  /**
   * Heading level rendered
   * @default "h3"
   */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  /**
   * Additional class name
   * @default ""
   */
  className?: string;
  /** Ref to the heading element */
  ref?: Ref<HTMLHeadingElement>;
}

export interface CardDescriptionProps extends Omit<
  HTMLAttributes<HTMLParagraphElement>,
  "children"
> {
  /** Secondary text shown below the title */
  children?: React.ReactNode;
  /**
   * Additional class name
   * @default ""
   */
  className?: string;
  /** Ref to the root <p> element */
  ref?: Ref<HTMLParagraphElement>;
}

export interface CardContentProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  /** Main content of the card */
  children?: React.ReactNode;
  /**
   * Additional class name
   * @default ""
   */
  className?: string;
  /** Entrance animation of the content */
  animation?: "fadeIn" | "slideIn" | "zoomIn";
  /** Overrides the inner spacing of this section */
  padding?: CardPadding;
  /** Ref to the root <div> element */
  ref?: Ref<HTMLDivElement>;
}

export interface CardFooterProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  /** Footer content, e.g. actions */
  children?: React.ReactNode;
  /**
   * Additional class name
   * @default ""
   */
  className?: string;
  /** Overrides the inner spacing of this section */
  padding?: CardPadding;
  /** Ref to the root <div> element */
  ref?: Ref<HTMLDivElement>;
}
