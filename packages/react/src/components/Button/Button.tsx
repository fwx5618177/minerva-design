import React from "react";
import { cn } from "../../utils/cn";
import { hooks } from "../../internal/stylingHooks";
import styles from "./button.module.scss";
import type { ButtonProps } from "./types";

/**
 * Button: a native <button> with a semantic `color`, a visual `variant`
 * (solid, outline, ghost, link), sizes, shapes, icons and a loading state.
 * Extra HTML attributes are forwarded; `ref` reaches the <button>.
 * `type` defaults to "button" so a Button inside a form never submits it by
 * accident; pass `type="submit"` for submit buttons.
 */
const Button = ({
  onClick,
  children,
  className = "",
  color = "primary",
  variant = "solid",
  size = "medium",
  "aria-label": ariaLabel,
  disabled = false,
  loading = false,
  loadingText,
  startIcon,
  endIcon,
  fullWidth = false,
  active = false,
  shape,
  borderRadius,
  style,
  ref,
  type = "button",
  ...restProps
}: ButtonProps) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (loading) {
      // Busy buttons stay focusable (aria-disabled) but must not activate,
      // including the implicit form submission of type="submit".
      event.preventDefault();
      return;
    }
    if (!disabled) onClick?.(event);
  };

  const borderRadiusClass =
    typeof borderRadius === "string"
      ? styles[
          `borderRadius${borderRadius.charAt(0).toUpperCase() + borderRadius.slice(1)}`
        ]
      : undefined;

  const customStyle = {
    ...(typeof borderRadius === "number"
      ? { borderRadius: `${borderRadius}px` }
      : {}),
    ...style,
  };

  const spinner = (
    <span
      className={styles.loadingSpinner}
      aria-hidden
      {...hooks("button", "spinner")}
    />
  );

  let content: React.ReactNode;
  if (loading && loadingText !== undefined) {
    content = (
      <>
        {spinner}
        <span className={styles.label} {...hooks("button", "label")}>
          {loadingText}
        </span>
      </>
    );
  } else {
    const hidden = loading && styles.hidden;
    content = (
      <>
        {loading && spinner}
        {startIcon != null && (
          <span
            className={cn(styles.icon, hidden)}
            {...hooks("button", "start-icon")}
          >
            {startIcon}
          </span>
        )}
        <span
          className={cn(styles.label, hidden)}
          {...hooks("button", "label")}
        >
          {children}
        </span>
        {endIcon != null && (
          <span
            className={cn(styles.icon, hidden)}
            {...hooks("button", "end-icon")}
          >
            {endIcon}
          </span>
        )}
      </>
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        styles.customButton,
        styles[color],
        styles[`variant-${variant}`],
        styles[size],
        borderRadiusClass,
        shape && styles[shape],
        fullWidth && styles.fullWidth,
        active && styles.active,
        loading && styles.loading,
        className,
      )}
      onClick={handleClick}
      aria-label={ariaLabel}
      aria-busy={loading || undefined}
      aria-disabled={loading || undefined}
      disabled={disabled}
      style={customStyle}
      {...restProps}
      {...hooks("button", "root", {
        state: active ? "active" : "inactive",
        disabled,
        loading,
        size,
        variant,
        color,
        shape,
      })}
    >
      {content}
    </button>
  );
};

export default Button;
