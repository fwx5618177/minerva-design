import React, { useState, useCallback, useMemo } from "react";
import { Popper } from "../Popper";
import { TextField } from "../TextField";
import { IconButton } from "../IconButton";
import TimePickerPanel from "./TimePickerPanel";
import { TimePickerProps } from "./types";
import { formatTime, isValidTime, parseTime } from "./utils";
import styles from "./timePicker.module.scss";
import { FaClock } from "react-icons/fa";

const TimePicker: React.FC<TimePickerProps> = ({
  value,
  defaultValue,
  onChange,
  format = "HH:mm:ss",
  use12Hours = false,
  placeholder = "Select time",
  disabled = false,
  clearable = true,
  size = "medium",
  className = "",
  minTime,
  maxTime,
  showSecond = true,
  hourStep = 1,
  minuteStep = 1,
  secondStep = 1,
}) => {
  const [currentValue, setCurrentValue] = useState<Date | undefined>(
    value || defaultValue,
  );
  const [inputValue, setInputValue] = useState<string>(
    currentValue ? formatTime(currentValue, format) : "",
  );
  const [visible, setVisible] = useState(false);
  // Stored in state so Popper re-renders with the element once it mounts
  const [inputEl, setInputEl] = useState<HTMLInputElement | null>(null);

  const handleVisibleChange = useCallback(
    (newVisible: boolean) => {
      if (!disabled) {
        setVisible(newVisible);
      }
    },
    [disabled],
  );

  const timeChangeMap = useMemo(
    () => ({
      hour: (val: number) => {
        const newDate = new Date(currentValue || new Date());
        newDate.setHours(val);
        return newDate;
      },
      minute: (val: number) => {
        const newDate = new Date(currentValue || new Date());
        newDate.setMinutes(val);
        return newDate;
      },
      second: (val: number) => {
        const newDate = new Date(currentValue || new Date());
        newDate.setSeconds(val);
        return newDate;
      },
      ampm: (val: number) => {
        const newDate = new Date(currentValue || new Date());
        const hours = newDate.getHours();
        const isPM = val === 1;
        newDate.setHours(isPM ? (hours % 12) + 12 : hours % 12);
        return newDate;
      },
    }),
    [currentValue],
  );

  const handleTimeChange = useCallback(
    (type: keyof typeof timeChangeMap, val: number) => {
      const newDate = timeChangeMap[type](val);
      setCurrentValue(newDate);
      setInputValue(formatTime(newDate, format));
      onChange?.(newDate);
    },
    [timeChangeMap, onChange, format],
  );

  const handleInputChange = useCallback(
    (value: string) => {
      setInputValue(value);
      const parsedDate = parseTime(value, format);

      if (isValidTime(parsedDate, format)) {
        setCurrentValue(parsedDate);
        onChange?.(parsedDate);
      }
    },
    [format, onChange],
  );

  const handleInputBlur = useCallback(() => {
    if (currentValue) {
      setInputValue(formatTime(currentValue, format));
    } else {
      setInputValue("");
    }
  }, [currentValue, format]);

  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrentValue(undefined);
      setInputValue("");
      onChange?.(undefined);
    },
    [onChange],
  );

  return (
    <div className={`${styles.timePicker} ${className}`}>
      <Popper
        visible={visible}
        onVisibleChange={handleVisibleChange}
        trigger="click"
        placement="bottomStart"
        type="select"
        size={size}
        anchorEl={inputEl}
      >
        <TimePickerPanel
          value={currentValue}
          format={format}
          use12Hours={use12Hours}
          showSecond={showSecond}
          hourStep={hourStep}
          minuteStep={minuteStep}
          secondStep={secondStep}
          minTime={minTime}
          maxTime={maxTime}
          onTimeChange={handleTimeChange}
          visible={visible}
        />
      </Popper>
      <TextField
        ref={setInputEl}
        value={inputValue}
        placeholder={placeholder}
        label=""
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        name="time-picker"
        disabled={disabled}
        size={size}
        suffix={
          clearable && currentValue && !disabled ? (
            <IconButton
              icon={<FaClock />}
              size="small"
              onClick={handleClear}
              className={styles.clearButton}
            />
          ) : (
            <IconButton
              icon={<FaClock />}
              size="small"
              className={styles.clockIcon}
            />
          )
        }
      />
    </div>
  );
};

export default React.memo(TimePicker);
