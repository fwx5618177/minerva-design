import React, { forwardRef } from "react";
import classNames from "classnames";
import { FaTimes } from "react-icons/fa";
import { ProgressIndicator } from "../ProgressIndicator";
import styles from "./chip.module.scss";
import type { ChipProps } from "./types";

/**
 * Chip component
 * @param label - The content of the chip
 * @param variant - The variant of the chip (filled, outlined, soft)
 * @param color - The color of the chip
 * @param size - The size of the chip
 * @param icon - Icon element to display at the start
 * @param avatar - Avatar element to display at the start
 * @param onDelete - Callback fired when the delete icon is clicked
 * @param onClick - Callback fired when the chip is clicked
 * @param disabled - If true, the chip will be disabled
 * @param className - Additional class name
 * @param deleteIcon - Custom delete icon
 * @param deleteLabel - Accessible label for the delete button
 * @param clickable - If true, the chip will be clickable
 * @param loading - If true, shows loading state
 * @param selected - If true, shows selected state
 */
const Chip = forwardRef<HTMLDivElement, ChipProps>(
  (
    {
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
      selected = false,
    },
    ref,
  ) => {
    const isInteractive = clickable && !disabled;

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onDelete?.(e);
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (isInteractive) {
        onClick?.(e);
      }
    };

    // Mirror native button activation: Enter on keydown, Space on keyup.
    // Keys from nested controls (the delete button) are ignored.
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!isInteractive || e.target !== e.currentTarget) return;
      if (e.key === " ") {
        e.preventDefault();
      } else if (e.key === "Enter") {
        e.preventDefault();
        e.currentTarget.click();
      }
    };

    const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!isInteractive || e.target !== e.currentTarget) return;
      if (e.key === " ") {
        e.preventDefault();
        e.currentTarget.click();
      }
    };

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
        onClick={handleClick}
        onKeyDown={clickable ? handleKeyDown : undefined}
        onKeyUp={clickable ? handleKeyUp : undefined}
        role={clickable ? "button" : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        aria-disabled={clickable && disabled ? true : undefined}
      >
        {loading ? (
          <div className={styles.loadingWrapper}>
            <ProgressIndicator width="auto" type="spinner" size="small" />
            <span>{label}</span>
          </div>
        ) : (
          <>
            {icon && <span className={styles.icon}>{icon}</span>}
            {avatar && <span className={styles.avatar}>{avatar}</span>}
            <span className={styles.label}>{label}</span>
          </>
        )}
        {onDelete && !disabled && !loading && (
          <button
            type="button"
            className={styles.deleteIcon}
            onClick={handleDelete}
            aria-label={deleteLabel ?? `Remove ${label}`}
          >
            {deleteIcon || <FaTimes size={16} aria-hidden focusable={false} />}
          </button>
        )}
      </div>
    );
  },
);

Chip.displayName = "Chip";

export default React.memo(Chip);
