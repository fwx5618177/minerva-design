import React from "react";
import { FaCheck, FaTimes, FaExclamation, FaInfo } from "react-icons/fa";
import styles from "./statusIndicator.module.scss";
import { StatusIndicatorProps } from "./types";
import useI18n from "../../hooks/useI18n";

/**
 * StatusIndicator component
 * @param className - Additional classes to be added to the indicator
 * @param ariaLabel - The aria-label attribute for the indicator, used for accessibility
 * @param disabled - Whether the indicator is disabled
 * @param status - The status of the indicator (success, error, warning, info)
 * @param shape - The shape of the indicator (circle, square, rounded)
 * @param type - The type of the indicator (online, offline, away, busy)
 * @param showLabel - Whether to show the label
 * @param size - The size of the indicator (small, medium, large)
 * @param color - The custom color of the indicator
 * @returns A status indicator component
 */
const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  className = "",
  ariaLabel,
  disabled = false,
  status = "success",
  shape = "circle",
  type,
  showLabel = false,
  size = "medium",
  color,
}) => {
  const { t } = useI18n();
  const iconMap = {
    success: <FaCheck className={styles.icon} />,
    error: <FaTimes className={styles.icon} />,
    warning: <FaExclamation className={styles.icon} />,
    info: <FaInfo className={styles.icon} />,
  };

  const typeTextMap: Partial<
    Record<NonNullable<StatusIndicatorProps["type"]>, string>
  > = {
    online: t("status.online"),
    offline: t("status.offline"),
    away: t("status.away"),
    busy: t("status.busy"),
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!disabled) {
      const target = event.currentTarget;
      target.classList.add(styles.clicked);
      setTimeout(() => {
        target.classList.remove(styles.clicked);
      }, 1000);
    }
  };

  const customStyle =
    type === "custom" && color ? { backgroundColor: color } : {};

  return (
    <div className={styles.wrapper}>
      <div
        className={`
          ${styles.statusIndicator} 
          ${styles[status]} 
          ${styles[shape]}
          ${type ? styles[type] : ""} 
          ${styles[size]}
          ${className}
        `}
        aria-label={ariaLabel}
        role="status"
        tabIndex={0}
        aria-disabled={disabled}
        onClick={handleClick}
        style={customStyle}
      >
        {iconMap[status]}
        <div className={styles.stars}></div>
      </div>
      {showLabel && type && typeTextMap[type] && (
        <span className={styles.label}>{typeTextMap[type]}</span>
      )}
    </div>
  );
};

export default React.memo(StatusIndicator);
