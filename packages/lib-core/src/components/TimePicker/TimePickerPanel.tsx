import React, { useMemo } from "react";
import { TimePickerPanelProps, TimeUnit } from "./types";
import styles from "./timePickerPanel.module.scss";

const TimePickerPanel: React.FC<TimePickerPanelProps> = ({
  value = new Date(),
  use12Hours,
  showSecond,
  hourStep = 1,
  minuteStep = 1,
  secondStep = 1,
  minTime,
  maxTime,
  onTimeChange,
}) => {
  const hours = useMemo(() => {
    const items: TimeUnit[] = [];
    const start = use12Hours ? 1 : 0;
    const end = use12Hours ? 12 : 23;

    for (let i = start; i <= end; i += hourStep) {
      // Compare the candidate hour (in 24h form) against the bounds
      const hour24 = use12Hours
        ? (i % 12) + (value.getHours() >= 12 ? 12 : 0)
        : i;
      const disabled = Boolean(
        (minTime && hour24 < minTime.getHours()) ||
        (maxTime && hour24 > maxTime.getHours()),
      );

      items.push({
        value: i,
        disabled,
        label: i.toString().padStart(2, "0"),
      });
    }
    return items;
  }, [use12Hours, hourStep, minTime, maxTime, value]);

  const minutes = useMemo(() => {
    const items: TimeUnit[] = [];
    for (let i = 0; i < 60; i += minuteStep) {
      // Minutes are only constrained within the boundary hour
      const disabled = Boolean(
        (minTime &&
          value.getHours() === minTime.getHours() &&
          i < minTime.getMinutes()) ||
        (maxTime &&
          value.getHours() === maxTime.getHours() &&
          i > maxTime.getMinutes()),
      );

      items.push({
        value: i,
        disabled,
        label: i.toString().padStart(2, "0"),
      });
    }
    return items;
  }, [minuteStep, minTime, maxTime, value]);

  const seconds = useMemo(() => {
    const items: TimeUnit[] = [];
    for (let i = 0; i < 60; i += secondStep) {
      // Seconds are only constrained within the boundary hour + minute
      const isMinBoundary =
        minTime &&
        value.getHours() === minTime.getHours() &&
        value.getMinutes() === minTime.getMinutes();
      const isMaxBoundary =
        maxTime &&
        value.getHours() === maxTime.getHours() &&
        value.getMinutes() === maxTime.getMinutes();
      const disabled = Boolean(
        (minTime && isMinBoundary && i < minTime.getSeconds()) ||
        (maxTime && isMaxBoundary && i > maxTime.getSeconds()),
      );

      items.push({
        value: i,
        disabled,
        label: i.toString().padStart(2, "0"),
      });
    }
    return items;
  }, [secondStep, minTime, maxTime, value]);

  // In 12-hour mode the hour column shows 1-12; map to/from 24h values
  const isPM = value.getHours() >= 12;
  const selectedHour = use12Hours
    ? value.getHours() % 12 || 12
    : value.getHours();
  const toHour24 = (hour: number) =>
    use12Hours ? (hour % 12) + (isPM ? 12 : 0) : hour;

  return (
    <div className={styles.timePickerPanel}>
      <div className={styles.timeColumns}>
        <div className={styles.timeColumn}>
          {hours.map((hour) => (
            <div
              key={hour.value}
              className={`
                ${styles.timeUnit}
                ${hour.value === selectedHour ? styles.selected : ""}
                ${hour.disabled ? styles.disabled : ""}
              `}
              onClick={() =>
                !hour.disabled && onTimeChange("hour", toHour24(hour.value))
              }
            >
              {hour.label}
            </div>
          ))}
        </div>

        <div className={styles.timeColumn}>
          {minutes.map((minute) => (
            <div
              key={minute.value}
              className={`
                ${styles.timeUnit}
                ${minute.value === value.getMinutes() ? styles.selected : ""}
                ${minute.disabled ? styles.disabled : ""}
              `}
              onClick={() =>
                !minute.disabled && onTimeChange("minute", minute.value)
              }
            >
              {minute.label}
            </div>
          ))}
        </div>

        {showSecond && (
          <div className={styles.timeColumn}>
            {seconds.map((second) => (
              <div
                key={second.value}
                className={`
                  ${styles.timeUnit}
                  ${second.value === value.getSeconds() ? styles.selected : ""}
                  ${second.disabled ? styles.disabled : ""}
                `}
                onClick={() =>
                  !second.disabled && onTimeChange("second", second.value)
                }
              >
                {second.label}
              </div>
            ))}
          </div>
        )}

        {use12Hours && (
          <div className={styles.timeColumn}>
            <div
              className={`
                ${styles.timeUnit}
                ${value.getHours() < 12 ? styles.selected : ""}
              `}
              onClick={() => onTimeChange("ampm", 0)}
            >
              AM
            </div>
            <div
              className={`
                ${styles.timeUnit}
                ${value.getHours() >= 12 ? styles.selected : ""}
              `}
              onClick={() => onTimeChange("ampm", 1)}
            >
              PM
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(TimePickerPanel);
