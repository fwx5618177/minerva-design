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
    className={cn(styles.page, className)}
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
  <header className={cn(styles.header, className)} {...props}>
    <div className={styles.heading}>
      <h1>{title}</h1>
      {hasContent(description) && <p>{description}</p>}
    </div>
    {hasContent(actions) && <div className={styles.actions}>{actions}</div>}
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
      className={cn(styles.section, className)}
      {...props}
    >
      <div className={styles.sectionHeader}>
        <div className={styles.heading}>
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
        {hasContent(actions) && <div className={styles.actions}>{actions}</div>}
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
  <div className={cn(styles.statCard, className)} {...props}>
    {hasContent(icon) && (
      <span className={styles.statIcon} aria-hidden="true">
        {icon}
      </span>
    )}
    <div className={styles.statContent}>
      <dl>
        <dt>{label}</dt>
        <dd>{value}</dd>
      </dl>
      {description != null && (
        <p className={styles.statDescription}>{description}</p>
      )}
    </div>
  </div>
);

export default Page;
