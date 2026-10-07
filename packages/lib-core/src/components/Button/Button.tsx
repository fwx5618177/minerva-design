import React from "react";
import classNames from "classnames";
import styles from "./button.module.scss";
import type { ButtonProps } from "./types";

/**
 * Button: a native <button> with variants, sizes, shapes and a loading state.
 * Extra HTML attributes are forwarded; `ref` reaches the <button>.
 */
const Button = ({
  onClick,
  children,
  className = "",
  variant = "primary",
  size = "medium",
  ariaLabel,
  disabled = false,
  loading = false,
  active = false,
  shape,
  borderRadius = "medium",
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
    typeof borderRadius === "number"
      ? undefined
      : styles[
          `borderRadius${borderRadius.charAt(0).toUpperCase() + borderRadius.slice(1)}`
        ];

  const customStyle = {
    ...(typeof borderRadius === "number"
      ? { borderRadius: `${borderRadius}px` }
      : {}),
    ...style,
  };

  return (
    <button
      ref={ref}
      className={classNames(
        styles.customButton,
        styles[variant],
        styles[size],
        borderRadiusClass,
        shape && styles[shape],
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
      {loading ? (
        <span className={styles.loadingWrapper}>
          <span className={styles.loadingSpinner} aria-hidden />
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
