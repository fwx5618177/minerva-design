import React from "react";
import classNames from "classnames";
import styles from "./button.module.scss";
import type { ButtonProps } from "./types";

/**
 * Button: a native <button> with colors, fill styles (appearance), sizes,
 * shapes, icons and a loading state.
 * Extra HTML attributes are forwarded; `ref` reaches the <button>.
 */
const Button = ({
  onClick,
  children,
  className = "",
  variant = "primary",
  appearance,
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

  const modern = appearance !== undefined;
  // The classic look always had a medium radius; the token-based look uses
  // the theme radius unless a radius is asked for explicitly.
  const radius = borderRadius ?? (modern ? undefined : "medium");
  const borderRadiusClass =
    typeof radius === "string"
      ? styles[
          `borderRadius${radius.charAt(0).toUpperCase() + radius.slice(1)}`
        ]
      : undefined;

  const customStyle = {
    ...(typeof radius === "number" ? { borderRadius: `${radius}px` } : {}),
    ...style,
  };

  // Structured content (icon / label slots) whenever a new capability is used;
  // otherwise the historical markup is kept as is.
  const structured =
    modern || startIcon != null || endIcon != null || loadingText !== undefined;
  const showLoadingText = loading && loadingText !== undefined;
  const spinner = <span className={styles.loadingSpinner} aria-hidden />;

  let content: React.ReactNode;
  if (!structured) {
    content = loading ? (
      <span className={styles.loadingWrapper}>
        {spinner}
        {children}
      </span>
    ) : (
      children
    );
  } else if (showLoadingText) {
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
          <span className={classNames(styles.icon, hidden)}>{startIcon}</span>
        )}
        <span className={classNames(styles.label, hidden)}>{children}</span>
        {endIcon != null && (
          <span className={classNames(styles.icon, hidden)}>{endIcon}</span>
        )}
      </>
    );
  }

  return (
    <button
      ref={ref}
      className={classNames(
        styles.customButton,
        styles[variant],
        styles[size],
        borderRadiusClass,
        shape && styles[shape],
        modern && styles.modern,
        modern && styles[`appearance-${appearance}`],
        structured && styles.structured,
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
