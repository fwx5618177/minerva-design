import type { Ref } from "react";

export interface CardProps {
  /** Card content, usually CardHeader, CardContent and CardFooter */
  children: React.ReactNode;
  /**
   * Visual style of the card
   * @default "default"
   */
  variant?: "default" | "outlined" | "shadow" | "elevated" | "filled";
  /**
   * Hides the CardHeader and/or CardFooter (noHeader, noFooter, noHeaderFooter)
   * @default "default"
   */
  type?: "default" | "noHeader" | "noFooter" | "noHeaderFooter";
  /**
   * Additional class name
   * @default ""
   */
  className?: string;
  /** Ref to the root <div> element */
  ref?: Ref<HTMLDivElement>;
}

export interface CardHeaderProps {
  /** Header content, usually CardTitle and CardDescription */
  children: React.ReactNode;
  /**
   * Additional class name
   * @default ""
   */
  className?: string;
  /** Header background color */
  bgColor?: string;
  /** Header text color */
  textColor?: string;
  /** Ref to the root <div> element */
  ref?: Ref<HTMLDivElement>;
}

export interface CardTitleProps {
  /** Title text, rendered as an <h3> */
  children: React.ReactNode;
  /**
   * Additional class name
   * @default ""
   */
  className?: string;
  /** Ref to the root <h3> element */
  ref?: Ref<HTMLHeadingElement>;
}

export interface CardDescriptionProps {
  /** Secondary text shown below the title */
  children: React.ReactNode;
  /**
   * Additional class name
   * @default ""
   */
  className?: string;
  /** Ref to the root <p> element */
  ref?: Ref<HTMLParagraphElement>;
}

export interface CardContentProps {
  /** Main content of the card */
  children: React.ReactNode;
  /**
   * Additional class name
   * @default ""
   */
  className?: string;
  /** Content background color */
  bgColor?: string;
  /** Content text color */
  textColor?: string;
  /** Entrance animation of the content */
  animation?: "fadeIn" | "slideIn" | "zoomIn";
  /** Ref to the root <div> element */
  ref?: Ref<HTMLDivElement>;
}

export interface CardFooterProps {
  /** Footer content, e.g. actions */
  children: React.ReactNode;
  /**
   * Additional class name
   * @default ""
   */
  className?: string;
  /** Footer background color */
  bgColor?: string;
  /** Footer text color */
  textColor?: string;
  /** Ref to the root <div> element */
  ref?: Ref<HTMLDivElement>;
}
