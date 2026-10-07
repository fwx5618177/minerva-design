import type { HTMLAttributes, ReactNode, Ref } from "react";

export interface PageProps extends HTMLAttributes<HTMLDivElement> {
  /** Ref to the page div */
  ref?: Ref<HTMLDivElement>;
  /** Maximum width: numbers are pixels, strings are CSS lengths (`style` wins) */
  maxWidth?: string | number;
}

export interface PageHeaderProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "title"
> {
  /** Ref to the header element */
  ref?: Ref<HTMLElement>;
  /** Heading content */
  title: ReactNode;
  /** Supporting text under the heading; omitted when empty (0 is rendered) */
  description?: ReactNode;
  /** Actions shown next to the heading (wrap below it on narrow widths) */
  actions?: ReactNode;
}

export interface PageSectionProps extends PageHeaderProps {
  /** Decorative icon before the title, hidden from assistive technology */
  icon?: ReactNode;
}

/** Spacing density of a Toolbar */
export type ToolbarDensity = "default" | "compact";

export interface ToolbarProps extends HTMLAttributes<HTMLDivElement> {
  /** Ref to the toolbar div (or to the slotted child with `asChild`) */
  ref?: Ref<HTMLDivElement>;
  /**
   * Wraps controls onto multiple lines; `false` keeps one bounded row
   * @default true
   */
  wrap?: boolean;
  /**
   * Gap between controls: `default` (space-3) or `compact` (space-1, with
   * centered direct-child vertical dividers)
   * @default "default"
   */
  density?: ToolbarDensity;
  /**
   * Applies the toolbar props, classes and ref to its single child (e.g. a Card)
   * instead of rendering a wrapper div
   * @default false
   */
  asChild?: boolean;
}

export interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Ref to the card div */
  ref?: Ref<HTMLDivElement>;
  /** Metric name */
  label: ReactNode;
  /** Metric value (0 is rendered) */
  value: ReactNode;
  /** Decorative icon, hidden from assistive technology */
  icon?: ReactNode;
  /** Explanatory text under the value */
  description?: ReactNode;
}
