import React from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./searchButton.module.scss";
import { SearchButtonProps } from "./types";

/**
 * SearchButton component
 * @param onClick - Function to be called when the button is clicked
 * @param className - Additional classes to be added to the button
 * @param ariaLabel - The aria-label attribute for the button, used for accessibility
 * @param disabled - Whether the button is disabled
 * @param shape - The shape of the button (circle, square, rounded)
 * @param variant - The style of the button (primary, warning, error, success, info)
 * @param animation - The animation of the button (none, expand, shrink，shake)
 * @param size - The size of the button (small, medium, large)
 * @param color - The color of text
 * @param iconColor - The color of the icon
 * @param bgColor - The background color of the button
 * @param loading - Whether the button is in loading state
 * @param children - The content of the button
 * @returns A search button component
 */
const SearchButton: React.FC<SearchButtonProps> = ({
  onClick,
  className = "",
  ariaLabel,
  disabled = false,
  shape = "circle", // 默认值为 circle
  variant = "primary", // 默认值为 primary
  animation = "none", // 默认值为 none
  size = "medium", // 默认值为 medium
  color, // 添加 color 属性
  iconColor = "var(--text-inverse-color)", // text color on the primary fill
  bgColor, // 添加 bgColor 属性
  loading = false, // 添加 loading 属性
  children, // 添加 children 属性
}) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && !loading && onClick) {
      onClick(event);
    }
  };

  // 动态调整形状
  const adjustedShape = children ? "square" : shape;

  return (
    <button
      className={`${styles.searchButton} ${styles[adjustedShape]} ${styles[variant]} ${styles[size]} ${animation !== "none" ? styles[animation] : ""} ${loading ? styles.loading : ""} ${className}`}
      onClick={handleClick}
      aria-label={ariaLabel}
      disabled={disabled}
      aria-busy={loading || undefined}
      style={{
        backgroundColor: bgColor,
        color: color,
        fill: iconColor,
      }}
    >
      {loading ? (
        <div className={styles.loader}></div>
      ) : (
        <FaSearch className={styles.icon} color={iconColor} />
      )}
      {children && <span className={styles.children}>{children}</span>}
    </button>
  );
};

export default React.memo(SearchButton);
