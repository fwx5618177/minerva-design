/** Props of `Page` (same names as React). */
export interface PageProps {
  /** Maximum width: numbers are pixels, strings are CSS lengths (`style` wins) */
  maxWidth?: string | number;
}

/** Props of `PageHeader` (rich content: the `title` / `description` / `actions` slots). */
export interface PageHeaderProps {
  /** Heading text (or the `title` slot) */
  title?: string | number;
  /** Supporting text under the heading; omitted when empty (0 is rendered) */
  description?: string | number;
}

/** Props of `PageSection` (+ the `icon` and `actions` slots). */
export type PageSectionProps = PageHeaderProps;

/** Spacing density of a Toolbar */
export type ToolbarDensity = "default" | "compact";

/** Props of `Toolbar` (same names and defaults as React). */
export interface ToolbarProps {
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
   * Applies the toolbar attributes and classes to its single child (e.g. a
   * Card) instead of rendering a wrapper div
   * @default false
   */
  asChild?: boolean;
}

/** Props of `StatCard` (rich content: the `label` / `value` / `icon` / `description` slots). */
export interface StatCardProps {
  /** Metric name (or the `label` slot) */
  label?: string | number;
  /** Metric value (or the `value` slot; 0 is rendered) */
  value?: string | number;
  /** Explanatory text under the value (or the `description` slot) */
  description?: string | number;
}
