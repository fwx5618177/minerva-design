import React from "react";
import { linkRel } from "@minerva/core";
import { cn } from "../../utils/cn";
import { safeHref } from "../../internal/safeUrl";
import type {
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps,
  CardPadding,
} from "./types";
import styles from "./card.module.scss";

/** Module class of a padding override */
const paddingClass = (padding: CardPadding | undefined) =>
  padding && styles[`pad-${padding}`];

/**
 * Card: a content container composed of CardHeader, CardContent and CardFooter
 * (omit a section to leave it out). `padding` switches to the padded layout (the card pads itself), `interactive`
 * adds hover / focus feedback and `as` changes the root element (e.g. a link).
 */
export const Card = ({
  children,
  variant = "default",
  padding,
  interactive = false,
  as,
  type,
  className = "",
  ref,
  ...rest
}: CardProps) => {
  const Tag: React.ElementType = as ?? "div";
  const link =
    Tag === "a"
      ? {
          href: safeHref("Card", rest.href),
          rel: linkRel(rest.target, rest.rel),
        }
      : undefined;
  return (
    <Tag
      ref={ref}
      type={Tag === "button" ? (type ?? "button") : undefined}
      className={cn(
        styles.card,
        styles[variant],
        padding && styles.padded,
        paddingClass(padding),
        interactive && styles.interactive,
        className,
      )}
      {...rest}
      {...link}
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
  padding,
  ref,
  ...rest
}: CardHeaderProps) => {
  return (
    <div
      ref={ref}
      className={cn(styles.cardHeader, paddingClass(padding), className)}
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
    <Heading ref={ref} className={cn(styles.cardTitle, className)} {...rest}>
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
    <p ref={ref} className={cn(styles.cardDescription, className)} {...rest}>
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
  animation,
  padding,
  ref,
  ...rest
}: CardContentProps) => {
  return (
    <div
      ref={ref}
      className={cn(
        styles.cardContent,
        animation && styles[animation],
        paddingClass(padding),
        className,
      )}
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
  padding,
  ref,
  ...rest
}: CardFooterProps) => {
  return (
    <div
      ref={ref}
      className={cn(styles.cardFooter, paddingClass(padding), className)}
      {...rest}
    >
      {children}
    </div>
  );
};

export default React.memo(Card);
