import React from "react";
import type {
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps,
} from "./types";
import styles from "./card.module.scss";

/**
 * Card component
 * @param children - The content of the card
 * @param variant - The style of the card (default, outlined, shadow, elevated, filled)
 * @param type - The type of the card (default, noHeader, noFooter, noHeaderFooter)
 * @param className - Additional classes to be added to the card
 * @param ref - Ref to the root <div> element
 * @returns A card component
 */
export const Card = ({
  children,
  variant = "default",
  type = "default",
  className = "",
  ref,
}: CardProps) => {
  const cardClasses = `${styles.card} ${styles[variant]} ${styles[type]} ${className}`;
  return (
    <div ref={ref} className={cardClasses}>
      {children}
    </div>
  );
};

/**
 * CardHeader component
 * @param children - The content of the card header
 * @param className - Additional classes to be added to the card header
 * @param bgColor - Background color of the card header
 * @param textColor - Text color of the card header
 * @returns A card header component
 */
export const CardHeader = ({
  children,
  className = "",
  bgColor,
  textColor,
  ref,
}: CardHeaderProps) => {
  const headerStyle = {
    backgroundColor: bgColor,
    color: textColor,
  };
  return (
    <div
      ref={ref}
      className={`${styles.cardHeader} ${className}`}
      style={headerStyle}
    >
      {children}
    </div>
  );
};

/**
 * CardTitle component
 * @param children - The content of the card title
 * @param className - Additional classes to be added to the card title
 * @returns A card title component
 */
export const CardTitle = ({
  children,
  className = "",
  ref,
}: CardTitleProps) => {
  return (
    <h3 ref={ref} className={`${styles.cardTitle} ${className}`}>
      {children}
    </h3>
  );
};

/**
 * CardDescription component
 * @param children - The content of the card description
 * @param className - Additional classes to be added to the card description
 * @returns A card description component
 */
export const CardDescription = ({
  children,
  className = "",
  ref,
}: CardDescriptionProps) => {
  return (
    <p ref={ref} className={`${styles.cardDescription} ${className}`}>
      {children}
    </p>
  );
};

/**
 * CardContent component
 * @param children - The content of the card content
 * @param className - Additional classes to be added to the card content
 * @param bgColor - Background color of the card content
 * @param textColor - Text color of the card content
 * @param animation - Animation effect for the card content
 * @returns A card content component
 */
export const CardContent = ({
  children,
  className = "",
  bgColor,
  textColor,
  animation,
  ref,
}: CardContentProps) => {
  const contentStyle = {
    backgroundColor: bgColor,
    color: textColor,
  };
  const contentClasses = `${styles.cardContent} ${animation ? styles[animation] : ""} ${className}`;
  return (
    <div ref={ref} className={contentClasses} style={contentStyle}>
      {children}
    </div>
  );
};

/**
 * CardFooter component
 * @param children - The content of the card footer
 * @param className - Additional classes to be added to the card footer
 * @param bgColor - Background color of the card footer
 * @param textColor - Text color of the card footer
 * @returns A card footer component
 */
export const CardFooter = ({
  children,
  className = "",
  bgColor,
  textColor,
  ref,
}: CardFooterProps) => {
  const footerStyle = {
    backgroundColor: bgColor,
    color: textColor,
  };
  return (
    <div
      ref={ref}
      className={`${styles.cardFooter} ${className}`}
      style={footerStyle}
    >
      {children}
    </div>
  );
};

export default React.memo(Card);
