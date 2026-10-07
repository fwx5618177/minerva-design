import { useId, type ReactNode } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../utils/cn";
import type {
  PageHeaderProps,
  PageProps,
  PageSectionProps,
  StatCardProps,
  ToolbarProps,
} from "./types";
import styles from "./page.module.scss";

/** `{x && ...}` would render 0 as a bare text node; only real content counts. */
const hasContent = (node: ReactNode) =>
  node != null && typeof node !== "boolean" && node !== "";

/** Page: the padded, vertically spaced column of a screen's content. */
export const Page = ({ className, maxWidth, style, ...props }: PageProps) => (
  <div
    className={cn(styles.page, "ui-page", className)}
    style={{ maxWidth, ...style }}
    {...props}
  />
);

/** PageHeader: the page's h1 with optional description and actions. */
export const PageHeader = ({
  title,
  description,
  actions,
  className,
  ...props
}: PageHeaderProps) => (
  <header className={cn(styles.header, "ui-page-header", className)} {...props}>
    <div className={cn(styles.heading, "ui-page-heading")}>
      <h1>{title}</h1>
      {hasContent(description) && <p>{description}</p>}
    </div>
    {hasContent(actions) && (
      <div className={cn(styles.actions, "ui-page-actions")}>{actions}</div>
    )}
  </header>
);

/** PageSection: a region named by its h2 title, with optional actions. */
export const PageSection = ({
  title,
  description,
  actions,
  icon,
  children,
  className,
  ...props
}: PageSectionProps) => {
  const headingId = useId();
  return (
    <section
      aria-labelledby={headingId}
      className={cn(styles.section, "ui-page-section", className)}
      {...props}
    >
      <div className={cn(styles.sectionHeader, "ui-page-section-header")}>
        <div className={cn(styles.heading, "ui-page-heading")}>
          <h2 id={headingId}>
            {hasContent(icon) && (
              <span className={styles.sectionIcon} aria-hidden="true">
                {icon}
              </span>
            )}
            {title}
          </h2>
          {hasContent(description) && <p>{description}</p>}
        </div>
        {hasContent(actions) && (
          <div className={cn(styles.actions, "ui-page-actions")}>{actions}</div>
        )}
      </div>
      {children}
    </section>
  );
};

/**
 * Toolbar: groups related controls in a wrapping flex row (`role="group"`).
 * It adds no arrow-key navigation; consumers choosing `role="toolbar"` own it.
 */
export const Toolbar = ({
  className,
  wrap = true,
  density = "default",
  asChild = false,
  ...props
}: ToolbarProps) => {
  const Component = asChild ? Slot : "div";
  return (
    <Component
      role="group"
      className={cn(
        styles.toolbar,
        density === "compact" && styles.compact,
        !wrap && styles.nowrap,
        "ui-toolbar",
        density === "compact" && "ui-toolbar-compact",
        !wrap && "ui-toolbar-nowrap",
        className,
      )}
      {...props}
    />
  );
};

/** StatCard: a labelled metric (`dl`) with optional icon and description. */
export const StatCard = ({
  label,
  value,
  icon,
  description,
  className,
  ...props
}: StatCardProps) => (
  <div className={cn(styles.statCard, "ui-stat-card", className)} {...props}>
    {hasContent(icon) && (
      <span className={cn(styles.statIcon, "ui-stat-icon")} aria-hidden="true">
        {icon}
      </span>
    )}
    <div className={cn(styles.statContent, "ui-stat-content")}>
      <dl>
        <dt>{label}</dt>
        <dd>{value}</dd>
      </dl>
      {description != null && (
        <p className={cn(styles.statDescription, "ui-stat-description")}>
          {description}
        </p>
      )}
    </div>
  </div>
);

export default Page;
