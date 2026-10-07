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
}

export interface CardTitleProps {
  /** Title text, rendered as an <h3> */
  children: React.ReactNode;
  /**
   * Additional class name
   * @default ""
   */
  className?: string;
}

export interface CardDescriptionProps {
  /** Secondary text shown below the title */
  children: React.ReactNode;
  /**
   * Additional class name
   * @default ""
   */
  className?: string;
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
}
