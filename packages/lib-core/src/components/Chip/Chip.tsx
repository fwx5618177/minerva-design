import React from "react";
import classNames from "classnames";
import { FaTimes } from "react-icons/fa";
import { ProgressIndicator } from "../ProgressIndicator";
import styles from "./chip.module.scss";
import useI18n from "../../hooks/useI18n";
import type { ChipProps } from "./types";

/**
 * Chip: a compact element for an attribute, filter or action.
 *
 * The root is a plain element. When `clickable`, the content is a native
 * <button>; the delete control (shown with `onDelete`) is a sibling <button>,
 * so interactive elements are never nested.
 */
const Chip = ({
  label,
  variant = "filled",
  color = "default",
  size = "medium",
  icon,
  avatar,
  onDelete,
  onClick,
  disabled = false,
  className = "",
  deleteIcon,
  deleteLabel,
  clickable = false,
  loading = false,
  selected,
  ref,
}: ChipProps) => {
  const { t } = useI18n();
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onDelete?.(e);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) onClick?.(e);
  };

  const content = loading ? (
    <span className={styles.loadingWrapper}>
      <ProgressIndicator width="auto" type="spinner" size="small" />
      <span>{label}</span>
    </span>
  ) : (
    <>
      {icon && <span className={styles.icon}>{icon}</span>}
      {avatar && <span className={styles.avatar}>{avatar}</span>}
      <span className={styles.label}>{label}</span>
    </>
  );

  return (
    <div
      ref={ref}
      className={classNames(
        styles.chip,
        styles[variant],
        styles[color],
        styles[size],
        disabled && styles.disabled,
        clickable && styles.clickable,
        selected && styles.selected,
        loading && styles.loading,
        className,
      )}
      aria-busy={loading || undefined}
    >
      {clickable ? (
        <button
          type="button"
          className={styles.action}
          onClick={handleClick}
          disabled={disabled}
          aria-pressed={selected}
        >
          {content}
        </button>
      ) : (
        content
      )}
      {onDelete && !disabled && !loading && (
        <button
          type="button"
          className={styles.deleteIcon}
          onClick={handleDelete}
          aria-label={deleteLabel ?? t("chip.remove", { label })}
        >
          {deleteIcon || <FaTimes size={16} aria-hidden focusable={false} />}
        </button>
      )}
    </div>
  );
};

export default React.memo(Chip);
