// @novel-isr/ui compatibility: display group.
//
// Card/CardHeader/CardBody/CardFooter/CardTitle/CardDescription, Divider,
// Skeleton/SkeletonText, EmptyState and Spinner were merged into Minerva's
// Card, Divider, Skeleton, Empty and Spinner; the adapters below map novel's
// prop names / values (sizes "xs".."xl" / "compact".."lg", `colorScheme`,
// `noAnimation`, card `type`...) onto them and pin novel's English built-in
// labels (the compat entry switches lib-core to zh). LoadingState gets the same
// treatment. TextLink, DescriptionList, List/ListItem, CodeBlock and Prose were
// ported with novel's API unchanged and are re-exported directly.
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  CSSProperties,
  ElementType,
  HTMLAttributes,
  ReactNode,
  Ref,
} from "react";
import {
  Card as MinervaCard,
  CardContent,
  CardFooter as MinervaCardFooter,
  CardHeader as MinervaCardHeader,
  type CardPadding as MinervaCardPadding,
  type CardVariant as MinervaCardVariant,
} from "../components/Card";
import MinervaDivider from "../components/Divider";
import MinervaSkeleton from "../components/Skeleton";
import { SkeletonText as MinervaSkeletonText } from "../components/Skeleton";
import type { SkeletonVariant as MinervaSkeletonVariant } from "../components/Skeleton";
import MinervaEmpty from "../components/Empty";
import type { EmptySize } from "../components/Empty";
import MinervaSpinner from "../components/Spinner";
import type {
  SpinnerColor,
  SpinnerSize as MinervaSpinnerSize,
} from "../components/Spinner";
import MinervaLoadingState from "../components/LoadingState";
import type { LoadingStateSize as MinervaLoadingStateSize } from "../components/LoadingState";
import type { CodeBlockProps as MinervaCodeBlockProps } from "../components/CodeBlock";

/**
 * Drops props that novel-isr-ui accepted but never rendered (its JSX children
 * replaced them) or whose name means something else in Minerva.
 */
function omit<T extends object, K extends keyof T>(
  props: T,
  ...keys: K[]
): Omit<T, K> {
  const out = { ...props };
  for (const key of keys) delete out[key];
  return out;
}

// ── Card ────────────────────────────────────────────────────────────────────

export type CardVariant = "outline" | "elevated" | "subtle" | "ghost";
export type CardPadding = "none" | "sm" | "md" | "lg";

type CardCommonAttributes = HTMLAttributes<HTMLElement> &
  Pick<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "href" | "target" | "rel" | "download"
  > &
  Pick<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "disabled" | "form">;

export interface CardProps extends Omit<CardCommonAttributes, "color"> {
  as?: ElementType;
  /** outline (default) / elevated / subtle / ghost */
  variant?: CardVariant;
  /** Inner spacing; sections can override it */
  padding?: CardPadding;
  /** Hover / focus feedback for clickable cards */
  interactive?: boolean;
  ref?: Ref<HTMLElement>;
}

const CARD_VARIANT: Record<CardVariant, MinervaCardVariant> = {
  outline: "outlined",
  elevated: "elevated",
  subtle: "subtle",
  ghost: "ghost",
};
const CARD_PADDING: Record<CardPadding, MinervaCardPadding> = {
  none: "none",
  sm: "small",
  md: "medium",
  lg: "large",
};
const cardPadding = (padding: CardPadding | undefined) =>
  padding ? CARD_PADDING[padding] : undefined;

export const Card = ({
  variant = "outline",
  padding = "md",
  type,
  ...rest
}: CardProps) => (
  <MinervaCard
    {...rest}
    variant={CARD_VARIANT[variant]}
    padding={CARD_PADDING[padding]}
    htmlType={type}
  />
);

export interface CardSectionProps extends HTMLAttributes<HTMLDivElement> {
  /** Overrides the padding of this section */
  padding?: CardPadding;
  ref?: Ref<HTMLDivElement>;
}

export const CardHeader = ({ padding, ...rest }: CardSectionProps) => (
  <MinervaCardHeader {...rest} padding={cardPadding(padding)} />
);

export const CardBody = ({ padding, ...rest }: CardSectionProps) => (
  <CardContent {...rest} padding={cardPadding(padding)} />
);

export const CardFooter = ({ padding, ...rest }: CardSectionProps) => (
  <MinervaCardFooter {...rest} padding={cardPadding(padding)} />
);

export { CardTitle, CardDescription } from "../components/Card";
export type { CardTitleProps } from "../components/Card";

// ── Divider ─────────────────────────────────────────────────────────────────

export type DividerOrientation = "horizontal" | "vertical";

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: DividerOrientation;
  ref?: Ref<HTMLDivElement>;
}

/** Flush (no margin) divider; vertical ones stretch to the flex container */
export const Divider = ({
  orientation = "horizontal",
  ...rest
}: DividerProps) => (
  <MinervaDivider
    {...rest}
    orientation={orientation}
    spacing={0}
    flexItem={orientation === "vertical"}
    length={orientation === "vertical" ? "100%" : undefined}
  />
);

// ── Skeleton / SkeletonText ─────────────────────────────────────────────────

export type SkeletonVariant = "text" | "rect" | "circle";

export interface SkeletonProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: SkeletonVariant;
  /** Numbers are px, strings pass through */
  width?: number | string;
  height?: number | string;
  /** Circle edge length; wins over width/height */
  size?: number | string;
  /** Disables the shimmer animation */
  noAnimation?: boolean;
  ref?: Ref<HTMLSpanElement>;
}

const SKELETON_VARIANT: Record<SkeletonVariant, MinervaSkeletonVariant> = {
  text: "text",
  rect: "rectangular",
  circle: "circular",
};
const toCss = (value: number | string | undefined) =>
  typeof value === "number" ? `${value}px` : value;

export const Skeleton = ({
  variant = "text",
  width,
  height,
  size,
  noAnimation = false,
  style,
  ...props
}: SkeletonProps) => {
  const rest = omit(props, "title", "children");
  // novel-isr-ui: sizing props win over `style`
  const sized: CSSProperties = { ...style };
  if (variant === "circle") {
    const dim = toCss(size ?? width ?? 32);
    sized.width = dim;
    sized.height = dim;
  } else {
    if (width !== undefined) sized.width = toCss(width);
    if (height !== undefined) sized.height = toCss(height);
  }
  return (
    <MinervaSkeleton
      {...rest}
      decorative
      variant={SKELETON_VARIANT[variant]}
      animation={noAnimation ? "false" : "wave"}
      style={sized}
    />
  );
};

export interface SkeletonTextProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  /** @default 3 */
  lines?: number;
  /** @default "1em" */
  lineHeight?: number | string;
  /** Numbers are px; defaults to the 2nd spacing step */
  gap?: number | string;
  /** @default true */
  shrinkLast?: boolean;
  noAnimation?: boolean;
  ref?: Ref<HTMLDivElement>;
}

export const SkeletonText = ({
  gap,
  noAnimation = false,
  ...rest
}: SkeletonTextProps) => (
  <MinervaSkeletonText
    {...rest}
    gap={typeof gap === "number" ? `${gap}px` : gap}
    animation={noAnimation ? "false" : "wave"}
  />
);

// ── EmptyState ──────────────────────────────────────────────────────────────

export type EmptyStateSize = "compact" | "default" | "lg";

export interface EmptyStateProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "title"
> {
  icon?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  /** Primary CTA area */
  action?: ReactNode;
  /** Secondary action */
  secondaryAction?: ReactNode;
  size?: EmptyStateSize;
  ref?: Ref<HTMLDivElement>;
}

const EMPTY_SIZE: Record<EmptyStateSize, EmptySize> = {
  compact: "small",
  default: "medium",
  lg: "large",
};

/** Only renders the parts that are provided (no default icon / text) */
export const EmptyState = ({
  icon,
  title,
  description,
  size = "default",
  ...rest
}: EmptyStateProps) => (
  <MinervaEmpty
    {...omit(rest, "children")}
    icon={icon || false}
    title={title || null}
    description={description || null}
    size={EMPTY_SIZE[size]}
  />
);

// ── Spinner ─────────────────────────────────────────────────────────────────

export type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";
export type SpinnerColorScheme = "brand" | "gray" | "current";

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: SpinnerSize;
  colorScheme?: SpinnerColorScheme;
  /** Visually hidden announced text */
  label?: string;
  ref?: Ref<HTMLSpanElement>;
}

const SPINNER_SIZE: Record<SpinnerSize, MinervaSpinnerSize> = {
  xs: "xsmall",
  sm: "small",
  md: "medium",
  lg: "large",
  xl: "xlarge",
};
const SPINNER_COLOR: Record<SpinnerColorScheme, SpinnerColor> = {
  brand: "primary",
  gray: "neutral",
  current: "current",
};

export const Spinner = ({
  size = "md",
  colorScheme = "brand",
  label = "Loading…",
  ...rest
}: SpinnerProps) => (
  <MinervaSpinner
    {...omit(rest, "color", "children")}
    size={SPINNER_SIZE[size]}
    color={SPINNER_COLOR[colorScheme]}
    label={label}
  />
);

// ── LoadingState ────────────────────────────────────────────────────────────

export type LoadingStateSize = "compact" | "default" | "lg";

export interface LoadingStateProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  /** @default "Loading..." */
  label?: string;
  /** @default "default" */
  size?: LoadingStateSize;
  ref?: Ref<HTMLDivElement>;
}

const LOADING_STATE_SIZE: Record<LoadingStateSize, MinervaLoadingStateSize> = {
  compact: "small",
  default: "medium",
  lg: "large",
};

export const LoadingState = ({
  label = "Loading...",
  size = "default",
  ...rest
}: LoadingStateProps) => (
  <MinervaLoadingState
    {...rest}
    label={label}
    size={LOADING_STATE_SIZE[size]}
  />
);

// ── Reading primitives (API unchanged) ──────────────────────────────────────

export { TextLink } from "../components/TextLink";
export type { TextLinkProps } from "../components/TextLink";

export { DescriptionList } from "../components/DescriptionList";
export type {
  DescriptionListItem,
  DescriptionListProps,
} from "../components/DescriptionList";

export { List, ListItem } from "../components/List";
export type { ListProps, ListItemProps } from "../components/List";

export { CodeBlock } from "../components/CodeBlock";
/** novel-isr-ui requires an explicit accessible name */
export type CodeBlockProps = MinervaCodeBlockProps & { "aria-label": string };

export { Prose } from "../components/Prose";
export type { ProseProps } from "../components/Prose";
