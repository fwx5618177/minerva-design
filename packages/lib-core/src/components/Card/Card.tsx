import React from "react";
import { cn } from "../../utils/cn";
import type {
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps,
  CardPadding,
  CardVariant,
} from "./types";
import styles from "./card.module.scss";

/** Stable `ui-card-*` hook names (shared with @novel-isr/ui) */
const HOOK_PADDING: Record<CardPadding, string> = {
  none: "none",
  small: "sm",
  medium: "md",
  large: "lg",
};
const hookVariant = (variant: CardVariant) =>
  variant === "outlined" ? "outline" : variant;

/** Module + hook classes of a section padding override */
const sectionPadding = (padding: CardPadding | undefined) =>
  padding && [
    styles[`pad-${padding}`],
    `ui-card-padding-${HOOK_PADDING[padding]}`,
  ];

const colorStyle = (
  bgColor: string | undefined,
  textColor: string | undefined,
  style: React.CSSProperties | undefined,
): React.CSSProperties => ({
  backgroundColor: bgColor,
  color: textColor,
  ...style,
});

/**
 * Card: a content container composed of CardHeader, CardContent and CardFooter.
 * `padding` switches to the padded layout (the card pads itself), `interactive`
 * adds hover / focus feedback and `as` changes the root element (e.g. a link).
 */
export const Card = ({
  children,
  variant = "default",
  type = "default",
  padding,
  interactive = false,
  as,
  htmlType,
  className = "",
  ref,
  ...rest
}: CardProps) => {
  const Tag: React.ElementType = as ?? "div";
  const pad = sectionPadding(padding);
  return (
    <Tag
      ref={ref}
      type={Tag === "button" ? (htmlType ?? "button") : undefined}
      className={cn(
        styles.card,
        styles[variant],
        styles[type],
        padding && styles.padded,
        pad && pad[0],
        interactive && styles.interactive,
        "ui-card",
        `ui-card-variant-${hookVariant(variant)}`,
        pad && pad[1],
        interactive && "ui-card-interactive",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
};

/**
 * CardHeader: top section, usually holding CardTitle and CardDescription.
 */
export const CardHeader = ({
  children,
  className = "",
  bgColor,
  textColor,
  padding,
  style,
  ref,
  ...rest
}: CardHeaderProps) => {
  const pad = sectionPadding(padding);
  return (
    <div
      ref={ref}
      className={cn(
        styles.cardHeader,
        pad && pad[0],
        "ui-card-header",
        pad && pad[1],
        className,
      )}
      style={colorStyle(bgColor, textColor, style)}
      {...rest}
    >
      {children}
    </div>
  );
};

/**
 * CardTitle: heading of the card (h3 by default).
 */
export const CardTitle = ({
  children,
  as: Heading = "h3",
  className = "",
  ref,
  ...rest
}: CardTitleProps) => {
  return (
    <Heading
      ref={ref}
      className={cn(styles.cardTitle, "ui-card-title", className)}
      {...rest}
    >
      {children}
    </Heading>
  );
};

/**
 * CardDescription: secondary text shown below the title.
 */
export const CardDescription = ({
  children,
  className = "",
  ref,
  ...rest
}: CardDescriptionProps) => {
  return (
    <p
      ref={ref}
      className={cn(styles.cardDescription, "ui-card-description", className)}
      {...rest}
    >
      {children}
    </p>
  );
};

/**
 * CardContent: main body of the card.
 */
export const CardContent = ({
  children,
  className = "",
  bgColor,
  textColor,
  animation,
  padding,
  style,
  ref,
  ...rest
}: CardContentProps) => {
  const pad = sectionPadding(padding);
  return (
    <div
      ref={ref}
      className={cn(
        styles.cardContent,
        animation && styles[animation],
        pad && pad[0],
        "ui-card-body",
        pad && pad[1],
        className,
      )}
      style={colorStyle(bgColor, textColor, style)}
      {...rest}
    >
      {children}
    </div>
  );
};

/**
 * CardFooter: bottom section, e.g. for actions.
 */
export const CardFooter = ({
  children,
  className = "",
  bgColor,
  textColor,
  padding,
  style,
  ref,
  ...rest
}: CardFooterProps) => {
  const pad = sectionPadding(padding);
  return (
    <div
      ref={ref}
      className={cn(
        styles.cardFooter,
        pad && pad[0],
        "ui-card-footer",
        pad && pad[1],
        className,
      )}
      style={colorStyle(bgColor, textColor, style)}
      {...rest}
    >
      {children}
    </div>
  );
};

export default React.memo(Card);
