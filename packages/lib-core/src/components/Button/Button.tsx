import React from "react";
import { cn } from "../../utils/cn";
import styles from "./button.module.scss";
import type { ButtonProps } from "./types";

/**
 * Button: a native <button> with a semantic `color`, a visual `variant`
 * (solid, outline, ghost, link), sizes, shapes, icons and a loading state.
 * Extra HTML attributes are forwarded; `ref` reaches the <button>.
 */
const Button = ({
  onClick,
  children,
  className = "",
  color = "primary",
  variant = "solid",
  size = "medium",
  ariaLabel,
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

  const spinner = <span className={styles.loadingSpinner} aria-hidden />;

  let content: React.ReactNode;
  if (loading && loadingText !== undefined) {
    content = (
      <>
        {spinner}
        <span className={styles.label}>{loadingText}</span>
      </>
    );
  } else {
    const hidden = loading && styles.hidden;
    content = (
      <>
        {loading && spinner}
        {startIcon != null && (
          <span className={cn(styles.icon, hidden)}>{startIcon}</span>
        )}
        <span className={cn(styles.label, hidden)}>{children}</span>
        {endIcon != null && (
          <span className={cn(styles.icon, hidden)}>{endIcon}</span>
        )}
      </>
    );
  }

  return (
    <button
      ref={ref}
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
    >
      {content}
    </button>
  );
};

export default Button;
