import React, { useEffect, useState } from "react";
import { FaCheck, FaTimes, FaExclamation, FaInfo } from "react-icons/fa";
import styles from "./statusIndicator.module.scss";
import type { StatusIndicatorProps } from "./types";
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
 * @param ref - Ref to the root (wrapper) <div> element
 * @returns A status indicator component
 */
const StatusIndicator = ({
  className = "",
  ariaLabel,
  disabled = false,
  status = "success",
  shape = "circle",
  type,
  showLabel = false,
  size = "medium",
  color,
  ref,
}: StatusIndicatorProps) => {
  const { t } = useI18n();
  // Click feedback: `clickCount` restarts the timer on every click
  const [clicked, setClicked] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    if (!clicked) return;
    const timer = setTimeout(() => setClicked(false), 1000);
    return () => clearTimeout(timer);
  }, [clicked, clickCount]);

  const iconMap = {
    success: <FaCheck className={styles.icon} aria-hidden="true" />,
    error: <FaTimes className={styles.icon} aria-hidden="true" />,
    warning: <FaExclamation className={styles.icon} aria-hidden="true" />,
    info: <FaInfo className={styles.icon} aria-hidden="true" />,
  };

  const typeTextMap: Partial<
    Record<NonNullable<StatusIndicatorProps["type"]>, string>
  > = {
    online: t("status.online"),
    offline: t("status.offline"),
    away: t("status.away"),
    busy: t("status.busy"),
  };

  const handleClick = () => {
    if (disabled) return;
    setClicked(true);
    setClickCount((count) => count + 1);
  };

  const typeText = type ? typeTextMap[type] : undefined;

  const customStyle =
    type === "custom" && color ? { backgroundColor: color } : {};

  return (
    <div ref={ref} className={styles.wrapper}>
      {/* role="status" is a non-interactive live region, so it is neither
          focusable nor disabled-able. The click only plays a decorative
          feedback animation (no state or action is exposed), so there is no
          functionality a keyboard equivalent would need to provide. */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
      <div
        className={[
          styles.statusIndicator,
          styles[status],
          styles[shape],
          type ? styles[type] : "",
          styles[size],
          clicked ? styles.clicked : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        // Fall back to the presence text (e.g. "Online") as accessible name
        aria-label={ariaLabel ?? typeText}
        role="status"
        data-disabled={disabled}
        onClick={handleClick}
        style={customStyle}
      >
        {iconMap[status]}
        <div className={styles.stars}></div>
      </div>
      {showLabel && typeText && (
        <span className={styles.label}>{typeText}</span>
      )}
    </div>
  );
};

export default React.memo(StatusIndicator);
