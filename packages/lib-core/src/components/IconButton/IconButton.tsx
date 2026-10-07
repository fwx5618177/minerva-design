import React, { useMemo } from "react";
import classNames from "classnames";
import { IconButtonProps } from "./types";
import { Tooltip } from "../Tooltip";
import { ProgressIndicator } from "../ProgressIndicator";
import useI18n from "../../hooks/useI18n";
import styles from "./iconButton.module.scss";

/** Short size names used by the stable `ui-button-size-*` styling hooks */
const SIZE_HOOK = {
  xsmall: "xs",
  small: "sm",
  medium: "md",
  large: "lg",
} as const;

/**
 * IconButton: a button that only contains an icon.
 *
 * - `label` (or `ariaLabel`) names the button; `label` is also shown as a
 *   tooltip on hover / focus.
 * - `variant` picks the color, `appearance` the fill style (ghost by default).
 * - The icon is given via `icon` or as children and hidden from assistive
 *   technologies (the button's name describes it).
 */
const IconButton = ({
  ref,
  icon,
  children,
  label,
  variant,
  appearance,
  size = "medium",
  shape = "circle",
  disabled = false,
  loading = false,
  active = false,
  className = "",
  tooltip,
  showTooltip,
  color,
  activeColor,
  bgColor,
  hoverColor,
  fillColor,
  onClick,
  tabIndex = 0,
  ariaLabel,
  ...props
}: IconButtonProps) => {
  const { t } = useI18n();
  const buttonStyle = useMemo(
    () =>
      ({
        color,
        backgroundColor: bgColor,
        "--active-color": activeColor,
        "--hover-color": hoverColor,
        "--fill-color": fillColor,
      }) as React.CSSProperties,
    [color, bgColor, activeColor, hoverColor, fillColor],
  );

  const colorClass =
    variant === undefined || variant === "neutral"
      ? "default"
      : variant === "danger"
        ? "error"
        : variant;
  const colorHook =
    variant === undefined || variant === "neutral"
      ? "neutral"
      : variant === "error"
        ? "danger"
        : variant;

  const glyph = icon ?? children;

  const buttonContent = (
    <button
      type="button"
      ref={ref}
      className={classNames(
        styles.iconButton,
        styles[colorClass],
        styles[size],
        styles[shape],
        appearance && appearance !== "ghost" && styles[appearance],
        disabled && styles.disabled,
        loading && styles.loading,
        active && styles.active,
        // Stable styling hooks (not used for styling by the library)
        "ui-button",
        "ui-icon-button",
        `ui-button-variant-${appearance ?? "ghost"}`,
        `ui-button-size-${SIZE_HOOK[size]}`,
        `ui-button-color-${colorHook}`,
        loading && "ui-button-loading",
        className,
      )}
      disabled={disabled || loading}
      onClick={onClick}
      tabIndex={disabled ? -1 : tabIndex}
      aria-label={label ?? ariaLabel ?? t("iconButton.default")}
      aria-busy={loading || undefined}
      data-loading={loading || undefined}
      style={buttonStyle}
      {...props}
    >
      {loading ? (
        <ProgressIndicator
          size={size === "xsmall" ? "small" : size}
          type="spinner"
        />
      ) : children !== undefined && icon === undefined ? (
        // Children icons are wrapped so they are always hidden from AT
        <span
          className={classNames(styles.glyph, "ui-button-label")}
          aria-hidden="true"
        >
          {glyph}
        </span>
      ) : (
        glyph
      )}
    </button>
  );

  const tooltipEnabled = showTooltip ?? label !== undefined;
  const tooltipContent = tooltip?.content ?? label;
  // hooks must run before any early return
  const tooltipProps = useMemo(
    () =>
      tooltipContent !== undefined
        ? {
            ...tooltip,
            content: tooltipContent,
            disabled: disabled || loading,
          }
        : null,
    [tooltip, tooltipContent, disabled, loading],
  );

  if (!tooltipEnabled || !tooltipProps) {
    return buttonContent;
  }

  return <Tooltip {...tooltipProps}>{buttonContent}</Tooltip>;
};

export default React.memo(IconButton);
