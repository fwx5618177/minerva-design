import React from "react";
import classNames from "classnames";
import type { BadgeProps } from "./types";
import styles from "./badge.module.scss";
import useI18n from "../../hooks/useI18n";

/** Color names used by the stable `ui-badge-color-*` styling hooks */
const COLOR_HOOK: Record<NonNullable<BadgeProps["variant"]>, string> = {
  primary: "brand",
  secondary: "secondary",
  success: "success",
  danger: "danger",
  warning: "warning",
  error: "danger",
  info: "info",
  light: "light",
  dark: "dark",
  neutral: "gray",
};

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
  variant = "primary",
  appearance = "solid",
  size = "medium",
  className = "",
  ariaLabel,
  bgColor,
  textColor,
  icon,
  content,
  position = "top-right",
  dot = false,
  borderRadius,
  borderWidth,
  borderColor,
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

  const badge = (
    <span
      ref={standalone ? (ref as React.Ref<HTMLSpanElement>) : undefined}
      className={classNames(
        styles.badge,
        styles[variant],
        styles[size],
        standalone ? styles.standalone : styles[position],
        appearance !== "solid" && styles[appearance],
        dot && styles.dot,
        // Stable styling hooks (not used for styling by the library)
        "ui-badge",
        `ui-badge-variant-${dot ? "dot" : appearance}`,
        `ui-badge-color-${COLOR_HOOK[variant]}`,
        className,
      )}
      aria-label={ariaLabel}
      role={role}
      {...rest}
      style={{
        backgroundColor: bgColor,
        color: textColor,
        borderRadius,
        borderWidth,
        borderColor,
        ...style,
      }}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {badgeContent}
    </span>
  );

  if (standalone) return badge;

  return (
    <div ref={ref as React.Ref<HTMLDivElement>} className={styles.badgeWrapper}>
      <div className={styles.content}>{children}</div>
      {badge}
    </div>
  );
};

export default React.memo(Badge);
