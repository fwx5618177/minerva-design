import React from "react";
import { cn } from "../../utils/cn";
import type { BadgeProps } from "./types";
import styles from "./badge.module.scss";
import useI18n from "../../hooks/useI18n";
import { hooks } from "../../internal/stylingHooks";

const isTextLike = (node: React.ReactNode): node is string | number =>
  typeof node === "string" || typeof node === "number";

/**
 * Badge: a small count or status indicator.
 *
 * - With element children the badge is attached to a corner of them
 *   (`position`), inside a relatively positioned wrapper.
 * - Without children, or with plain text / number children, it is a
 *   standalone badge rendered inline in the normal flow.
 */
export const Badge = ({
  children,
  color = "primary",
  variant = "solid",
  size = "medium",
  className = "",
  "aria-label": ariaLabel,
  icon,
  content,
  position = "top-right",
  dot = false,
  borderRadius,
  borderWidth,
  role = "status",
  style,
  ref,
  ...rest
}: BadgeProps) => {
  const { t } = useI18n();
  const hasChildren =
    children !== undefined && children !== null && children !== false;
  // Text children are the badge's own content (rendered once, inline).
  const textChildren = hasChildren && isTextLike(children);
  const standalone = !hasChildren || (textChildren && content === undefined);

  let badgeContent: React.ReactNode = null;
  if (!dot) {
    if (content !== undefined) badgeContent = content;
    else if (textChildren) badgeContent = children;
    else if (hasChildren) badgeContent = t("badge.default");
  }

  const states = { size, variant, color };
  const badge = (
    <span
      ref={standalone ? (ref as React.Ref<HTMLSpanElement>) : undefined}
      className={cn(
        styles.badge,
        styles[color],
        styles[variant],
        styles[size],
        standalone ? styles.standalone : styles[position],
        dot && styles.dot,
        className,
      )}
      aria-label={ariaLabel}
      role={role}
      {...rest}
      style={{
        borderRadius,
        borderWidth,
        ...style,
      }}
      {...hooks("badge", standalone ? "root" : "badge", states)}
    >
      {icon && (
        <span className={styles.icon} {...hooks("badge", "icon")}>
          {icon}
        </span>
      )}
      {badgeContent}
    </span>
  );

  if (standalone) return badge;

  return (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      className={styles.badgeWrapper}
      {...hooks("badge", "root", states)}
    >
      <div className={styles.content}>{children}</div>
      {badge}
    </div>
  );
};

export default React.memo(Badge);
