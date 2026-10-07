import React from "react";
import styles from "./progressIndicator.module.scss";
import type { ProgressIndicatorProps } from "./types";
import useI18n from "../../hooks/useI18n";
import { FaSpinner, FaWaveSquare, FaCircleNotch } from "react-icons/fa";

/**
 * ProgressIndicator component
 * @param type - The type of progress indicator (spinner, bar, wave, circle, dottedBar)
 * @param size - The size of the progress indicator (small, medium, large)
 * @param icon - Optional icon to be displayed
 * @param ariaLabel - The aria-label attribute for the progress indicator, used for accessibility
 * @param className - Additional classes to be added to the progress indicator
 * @param width - The width of the progress indicator
 * @param full - Whether the progress indicator should take full width
 * @param ref - Ref to the root <div> element
 * @returns A progress indicator component
 */
const ProgressIndicator = ({
  type = "spinner",
  size = "medium",
  icon,
  ariaLabel,
  className = "",
  width,
  full = false,
  ref,
}: ProgressIndicatorProps) => {
  const { t } = useI18n();
  const indicatorMap = {
    spinner: (
      <FaSpinner
        className={`${styles.spinner} ${styles[size]}`}
        aria-hidden="true"
      />
    ),
    bar: (
      <div className={`${styles.barContainer} ${styles[size]}`}>
        <div className={styles.bar}></div>
      </div>
    ),
    wave: (
      <div className={`${styles.waveContainer} ${styles[size]}`}>
        <FaWaveSquare className={styles.wave} aria-hidden="true" />
      </div>
    ),
    circle: (
      <FaCircleNotch
        className={`${styles.circle} ${styles[size]}`}
        aria-hidden="true"
      />
    ),
    dottedBar: (
      <div className={`${styles.dottedBarContainer} ${styles[size]}`}>
        <div className={styles.dottedBar}></div>
      </div>
    ),
  };

  const widthClass = full
    ? styles.fullWidth
    : !width
      ? styles.defaultWidth
      : "";

  return (
    // Indeterminate progressbar (no aria-valuenow). Not focusable: it is not
    // interactive and is often rendered inside buttons (IconButton, Chip).
    <div
      ref={ref}
      className={`${styles.progressIndicator} ${className} ${widthClass}`}
      aria-label={ariaLabel ?? t("common.loading")}
      role="progressbar"
      style={{ width: width && !full ? width : undefined }}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {indicatorMap[type] || null}
    </div>
  );
};

export default React.memo(ProgressIndicator);
