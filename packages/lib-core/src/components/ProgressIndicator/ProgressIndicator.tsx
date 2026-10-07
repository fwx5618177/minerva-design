import React from "react";
import styles from "./progressIndicator.module.scss";
import { ProgressIndicatorProps } from "./types";
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
 * @returns A progress indicator component
 */
const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  type = "spinner",
  size = "medium",
  icon,
  ariaLabel,
  className = "",
  width,
  full = false,
}) => {
  const indicatorMap = {
    spinner: <FaSpinner className={`${styles.spinner} ${styles[size]}`} />,
    bar: (
      <div className={`${styles.barContainer} ${styles[size]}`}>
        <div className={styles.bar}></div>
      </div>
    ),
    wave: (
      <div className={`${styles.waveContainer} ${styles[size]}`}>
        <FaWaveSquare className={styles.wave} />
      </div>
    ),
    circle: <FaCircleNotch className={`${styles.circle} ${styles[size]}`} />,
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
    <div
      className={`${styles.progressIndicator} ${className} ${widthClass}`}
      aria-label={ariaLabel}
      role="progressbar"
      tabIndex={0}
      style={{ width: width && !full ? width : undefined }}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {indicatorMap[type] || null}
    </div>
  );
};

export default React.memo(ProgressIndicator);
