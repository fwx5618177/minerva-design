import React, { useMemo } from "react";
import { cn } from "../../utils/cn";
import { IconButtonProps } from "./types";
import { Tooltip } from "../Tooltip";
import { ProgressIndicator } from "../ProgressIndicator";
import useI18n from "../../hooks/useI18n";
import { useControllableState } from "../../internal/useControllableState";
import styles from "./iconButton.module.scss";

/**
 * IconButton: a button that only contains an icon.
 *
 * - `label` (or `ariaLabel`) names the button; `label` is also shown as a
 *   tooltip on hover / focus.
 * - `color` picks the semantic color (neutral by default), `variant` the
 *   visual style (ghost by default). The CSS custom properties
 *   `--icon-button-color`, `--icon-button-hover-bg`,
 *   `--icon-button-pressed-color` and `--icon-button-pressed-bg` override
 *   the resolved colors.
 * - The icon is given via `icon` or as children and hidden from assistive
 *   technologies (the button's name describes it).
 * - `pressed` / `defaultPressed` make it a toggle button (aria-pressed), e.g.
 *   favorite, mute or bold; keep the label stable, the state is announced.
 */
const IconButton = ({
  ref,
  icon,
  children,
  label,
  color = "neutral",
  variant = "ghost",
  size = "medium",
  shape = "circle",
  disabled = false,
  loading = false,
  pressed,
  defaultPressed,
  onPressedChange,
  className = "",
  tooltip,
  showTooltip,
  onClick,
  tabIndex = 0,
  ariaLabel,
  ...props
}: IconButtonProps) => {
  const { t } = useI18n();
  const isToggle =
    pressed !== undefined ||
    defaultPressed !== undefined ||
    onPressedChange !== undefined;
  const [isPressed, setPressed] = useControllableState({
    value: pressed,
    defaultValue: defaultPressed ?? false,
    onChange: onPressedChange,
  });
  const glyph = icon ?? children;

  const buttonContent = (
    <button
      type="button"
      ref={ref}
      className={cn(
        styles.iconButton,
        styles[color],
        styles[`variant-${variant}`],
        styles[size],
        styles[shape],
        disabled && styles.disabled,
        loading && styles.loading,
        isToggle && isPressed && styles.pressed,
        className,
      )}
      disabled={disabled || loading}
      onClick={(e) => {
        onClick?.(e);
        if (isToggle && !e.defaultPrevented) setPressed(!isPressed);
      }}
      aria-pressed={isToggle ? isPressed : undefined}
      tabIndex={disabled ? -1 : tabIndex}
      aria-label={label ?? ariaLabel ?? t("iconButton.default")}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? (
        <ProgressIndicator size={size} variant="spinner" color="current" />
      ) : children !== undefined && icon === undefined ? (
        // Children icons are wrapped so they are always hidden from AT
        <span className={styles.glyph} aria-hidden="true">
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
