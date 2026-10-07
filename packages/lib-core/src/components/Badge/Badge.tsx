import React from "react";
import type { BadgeProps } from "./types";
import styles from "./badge.module.scss";

/**
 * Badge component
 * @param children - The content of the badge
 * @param variant - The style of the badge (primary, secondary, success, danger, warning, info, light, dark)
 * @param size - The size of the badge (small, medium, large)
 * @param className - Additional classes to be added to the badge
 * @param ariaLabel - The aria-label attribute for the badge, used for accessibility
 * @param bgColor - Custom background color for the badge
 * @param textColor - Custom text color for the badge
 * @param icon - The icon to be displayed (can be a TSX SVG component, image URL, or other ReactNode)
 * @param content - The content to be displayed inside the badge
 * @param position - The position of the badge (top-right, top-left, bottom-right, bottom-left)
 * @param dot - Whether to display the badge as a dot
 * @param borderRadius - Custom border radius for the badge
 * @param borderWidth - Custom border width for the badge
 * @param borderColor - Custom border color for the badge
 * @returns A badge component
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "primary",
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
}) => {
  const isValidElement = React.isValidElement(children);
  const badgeContent = dot
    ? null
    : (content ?? (!isValidElement ? children : "Badge"));

  return (
    <div className={styles.badgeWrapper}>
      {children && <div className={styles.content}>{children}</div>}
      <span
        className={`
          ${styles.badge} 
          ${styles[variant]} 
          ${styles[size]} 
          ${styles[position]}
          ${dot ? styles.dot : ""}
          ${className}
        `}
        aria-label={ariaLabel}
        role="status"
        style={{
          backgroundColor: bgColor,
          color: textColor,
          borderRadius,
          borderWidth,
          borderColor,
        }}
      >
        {icon && <span className={styles.icon}>{icon}</span>}
        {badgeContent}
      </span>
    </div>
  );
};

export default React.memo(Badge);
