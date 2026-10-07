import type { HTMLAttributes, Ref } from "react";

/** Size preset of an Empty state */
export type EmptySize = "small" | "medium" | "large";

export interface EmptyProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "title" | "color"
> {
  /**
   * Custom icon, replacing the default one. Pass `null` or `false` to render
   * no icon at all
   */
  icon?: React.ReactNode;
  /** Heading of the empty state; also becomes its accessible name */
  title?: React.ReactNode;
  /**
   * Description text; `null` hides it
   * @default "No Data" (localized)
   */
  description?: React.ReactNode;
  /** Primary call to action (a Button, a link or a group of them) */
  action?: React.ReactNode;
  /** Secondary action rendered after `action` */
  secondaryAction?: React.ReactNode;
  /**
   * Switches to the unframed sized layout (transparent background, size-based
   * padding, icon and font sizes). Omit it for the classic surface layout
   */
  size?: EmptySize;
  /** Additional class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Footer content, e.g. an action button */
  children?: React.ReactNode;
  /**
   * Uses the built-in SVG illustration instead of the default icon
   * @default false
   */
  useSvg?: boolean;
  /** Width of the container */
  width?: string | number;
  /** Height of the container */
  height?: string | number;
  /**
   * Adds a drop shadow
   * @default false
   */
  showShadow?: boolean;
  /** Ref to the root <div> element */
  ref?: Ref<HTMLDivElement>;
}
