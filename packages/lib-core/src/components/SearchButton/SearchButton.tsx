import React from "react";
import classNames from "classnames";
import { FaSearch } from "react-icons/fa";
import styles from "./searchButton.module.scss";
import type { SearchButtonProps } from "./types";
import useI18n from "../../hooks/useI18n";

/**
 * SearchButton: a button with a search icon and optional text.
 * Icon-only buttons are labelled "Search" (localized) unless `ariaLabel` is given;
 * `ref` reaches the <button>.
 */
const SearchButton = ({
  onClick,
  className = "",
  ariaLabel,
  disabled = false,
  shape = "circle",
  variant = "primary",
  animation = "none",
  size = "medium",
  color,
  iconColor = "var(--text-inverse-color)", // text color on the primary fill
  bgColor,
  loading = false,
  children,
  type,
  ref,
}: SearchButtonProps) => {
  const { t } = useI18n();
  const hasChildren =
    children !== undefined && children !== null && children !== false;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (loading) {
      // also cancels the implicit form submission of a submit button
      event.preventDefault();
      return;
    }
    if (!disabled) onClick?.(event);
  };

  // Buttons with text are always square.
  const adjustedShape = hasChildren ? "square" : shape;

  return (
    <button
      ref={ref}
      type={type}
      className={classNames(
        styles.searchButton,
        styles[adjustedShape],
        styles[variant],
        styles[size],
        animation !== "none" && styles[animation],
        loading && styles.loading,
        className,
      )}
      onClick={handleClick}
      aria-label={
        ariaLabel ?? (hasChildren ? undefined : t("searchButton.search"))
      }
      disabled={disabled}
      aria-busy={loading || undefined}
      style={{
        backgroundColor: bgColor,
        color: color,
        fill: iconColor,
      }}
    >
      {loading ? (
        <span className={styles.loader} aria-hidden />
      ) : (
        <FaSearch className={styles.icon} color={iconColor} aria-hidden />
      )}
      {hasChildren && <span className={styles.children}>{children}</span>}
    </button>
  );
};

export default React.memo(SearchButton);
