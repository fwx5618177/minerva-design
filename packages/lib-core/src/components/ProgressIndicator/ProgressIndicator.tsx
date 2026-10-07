import React, { useId } from "react";
import { FaSpinner, FaWaveSquare, FaCircleNotch } from "react-icons/fa";
import { cn } from "../../utils/cn";
import useI18n from "../../hooks/useI18n";
import type { ProgressIndicatorProps } from "./types";
import styles from "./progressIndicator.module.scss";

/**
 * ProgressIndicator: the indeterminate loading indicator (spinner, circle,
 * wave, bar or dotted bar). It is a `progressbar` without a value, named by
 * `ariaLabel`, by its visible `label`, or by the localized "Loading". It is
 * never focusable, so it can sit inside buttons. Set `decorative` when a
 * surrounding element already announces the loading state.
 */
const ProgressIndicator = ({
  variant = "spinner",
  size = "medium",
  color = "primary",
  icon,
  label,
  ariaLabel,
  decorative = false,
  className = "",
  width,
  full = false,
  style,
  ref,
  ...rest
}: ProgressIndicatorProps) => {
  const { t } = useI18n();
  const labelId = useId();
  const indicatorMap = {
    spinner: (
      <FaSpinner className={cn(styles.spinner, styles[size])} aria-hidden />
    ),
    bar: (
      <div className={cn(styles.barContainer, styles[size])}>
        <div className={styles.bar}></div>
      </div>
    ),
    wave: (
      <div className={cn(styles.waveContainer, styles[size])}>
        <FaWaveSquare className={styles.wave} aria-hidden />
      </div>
    ),
    circle: (
      <FaCircleNotch className={cn(styles.circle, styles[size])} aria-hidden />
    ),
    dottedBar: (
      <div className={cn(styles.dottedBarContainer, styles[size])}>
        <div className={styles.dottedBar}></div>
      </div>
    ),
  };

  const isBar = variant === "bar" || variant === "dottedBar";
  const widthClass = full
    ? styles.fullWidth
    : !width && isBar
      ? styles.defaultWidth
      : "";
  const hasLabel = label !== undefined && label !== null && label !== "";

  const a11y = decorative
    ? { "aria-hidden": true as const }
    : {
        // Indeterminate progressbar (no aria-valuenow). Not focusable: it is
        // not interactive and is often rendered inside buttons.
        role: "progressbar",
        "aria-label": ariaLabel ?? (hasLabel ? undefined : t("common.loading")),
        "aria-labelledby": ariaLabel || !hasLabel ? undefined : labelId,
      };

  return (
    <div
      ref={ref}
      className={cn(
        styles.progressIndicator,
        styles[color],
        widthClass,
        className,
      )}
      style={{ ...style, width: width && !full ? width : style?.width }}
      {...a11y}
      {...rest}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {indicatorMap[variant] ?? null}
      {hasLabel && (
        <span id={labelId} className={styles.label}>
          {label}
        </span>
      )}
    </div>
  );
};

export default React.memo(ProgressIndicator);
