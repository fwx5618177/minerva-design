import React, { useId } from "react";
import type { ReactNode } from "react";
import {
  IconCircleNotch,
  IconSpinner,
  IconWaveSquare,
} from "../../internal/icons";
import { cn } from "../../utils/cn";
import useI18n from "../../hooks/useI18n";
import type { ProgressIndicatorProps } from "./types";
import { hooks } from "../../internal/stylingHooks";
import styles from "./progressIndicator.module.scss";

const defaultFormat = (value: number, max: number): ReactNode =>
  `${Math.round((value / max) * 100)}%`;

/**
 * ProgressIndicator: a loading indicator (spinner, circle, wave, bar or dotted
 * bar). Without `value` it is an indeterminate `progressbar` (no
 * aria-valuenow), named by `aria-label`, by its visible `label`, or by the
 * localized "Loading". With `value`, the bar and circle variants become
 * determinate: a filled bar / arc, aria-valuenow/min/max and an optional
 * formatted value (`showValue`). It is never focusable, so it can sit inside
 * buttons. Set `decorative` when a surrounding element already announces the
 * loading state.
 */
const ProgressIndicator = ({
  variant = "spinner",
  size = "medium",
  color = "primary",
  value,
  max = 100,
  showValue = false,
  format,
  icon,
  label,
  "aria-label": ariaLabel,
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
  const indicator = hooks("progress", "indicator");

  const determinate =
    typeof value === "number" && (variant === "bar" || variant === "circle");
  const safeMax = Number.isFinite(max) && max > 0 ? max : 100;
  const current = determinate
    ? Math.min(Math.max(Number.isNaN(value) ? 0 : value, 0), safeMax)
    : 0;
  const percent = (current / safeMax) * 100;
  const formatted = determinate
    ? (format ?? defaultFormat)(current, safeMax)
    : null;

  const indicatorMap = {
    spinner: (
      <IconSpinner
        className={cn(styles.spinner, styles[size])}
        aria-hidden
        {...indicator}
      />
    ),
    bar: (
      <div className={cn(styles.barContainer, styles[size])} {...indicator}>
        <div
          className={cn(styles.bar, determinate && styles.determinate)}
          style={determinate ? { width: `${percent}%` } : undefined}
        ></div>
      </div>
    ),
    wave: (
      <div className={cn(styles.waveContainer, styles[size])} {...indicator}>
        <IconWaveSquare className={styles.wave} aria-hidden />
      </div>
    ),
    circle: determinate ? (
      <svg
        className={cn(styles.ring, styles[size])}
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
        aria-hidden
        focusable="false"
        {...indicator}
      >
        <circle className={styles.ringTrack} cx="12" cy="12" r="10" />
        <circle
          className={styles.ringArc}
          cx="12"
          cy="12"
          r="10"
          pathLength={100}
          strokeDasharray={`${percent} 100`}
        />
      </svg>
    ) : (
      <IconCircleNotch
        className={cn(styles.circle, styles[size])}
        aria-hidden
        {...indicator}
      />
    ),
    dottedBar: (
      <div
        className={cn(styles.dottedBarContainer, styles[size])}
        {...indicator}
      >
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
  const valueText =
    format && (typeof formatted === "string" || typeof formatted === "number")
      ? String(formatted)
      : undefined;

  const a11y = decorative
    ? { "aria-hidden": true as const }
    : {
        // Not focusable: it is not interactive and is often rendered inside
        // buttons. Indeterminate progressbars have no aria-valuenow.
        role: "progressbar",
        "aria-label":
          ariaLabel ??
          (hasLabel
            ? undefined
            : t(determinate ? "progress.label" : "common.loading")),
        "aria-labelledby": ariaLabel || !hasLabel ? undefined : labelId,
        ...(determinate && {
          "aria-valuemin": 0,
          "aria-valuemax": safeMax,
          "aria-valuenow": current,
          "aria-valuetext": valueText,
        }),
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
      {...hooks("progress", "root", {
        variant: variant === "dottedBar" ? "dotted-bar" : variant,
        size,
        color,
      })}
    >
      {icon && (
        <span className={styles.icon} {...hooks("progress", "icon")}>
          {icon}
        </span>
      )}
      {indicatorMap[variant] ?? null}
      {determinate && showValue && (
        <span
          className={styles.value}
          aria-hidden
          {...hooks("progress", "value")}
        >
          {formatted}
        </span>
      )}
      {hasLabel && (
        <span
          id={labelId}
          className={styles.label}
          {...hooks("progress", "label")}
        >
          {label}
        </span>
      )}
    </div>
  );
};

export default React.memo(ProgressIndicator);
