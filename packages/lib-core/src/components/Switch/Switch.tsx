import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { useControllableState } from "../../internal/useControllableState";
import type { SwitchProps } from "./types";
import styles from "./switch.module.scss";

const RIPPLE_DURATION = 400;

const placementClass = {
  start: styles.labelStart,
  end: styles.labelEnd,
  top: styles.labelTop,
  bottom: styles.labelBottom,
} as const;

/**
 * Switch: toggles between two mutually exclusive states.
 * Renders a native checkbox with role="switch"; `ref` reaches the <input>.
 */
const Switch = ({
  checked,
  defaultChecked = false,
  disabled = false,
  size = "medium",
  color = "primary",
  shape = "round",
  label,
  ariaLabel,
  name,
  labelPlacement = "end",
  loading = false,
  ripple = true,
  className,
  labelStyle,
  trackStyle,
  thumbStyle: customThumbStyle,
  onChange,
  onFocus,
  onBlur,
  icon,
  iconPlacement = "start",
  ref,
}: SwitchProps) => {
  const [isChecked, setIsChecked] = useControllableState({
    value: checked,
    defaultValue: defaultChecked,
  });
  const [rippleActive, setRippleActive] = useState(false);
  const rippleTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  useEffect(() => () => clearTimeout(rippleTimer.current), []);

  const blocked = disabled || loading;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (blocked) return;
    setIsChecked(event.target.checked);
    onChange?.(event.target.checked, event);
  };

  // Native checkboxes toggle on Space only; the switch pattern also allows Enter.
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    if (blocked) return;
    event.currentTarget.click();
  };

  const handleRipple = () => {
    if (!ripple || blocked) return;
    clearTimeout(rippleTimer.current);
    setRippleActive(true);
    rippleTimer.current = setTimeout(
      () => setRippleActive(false),
      RIPPLE_DURATION,
    );
  };

  const isThemeColor = Object.prototype.hasOwnProperty.call(styles, color);

  const switchClasses = classNames(
    styles.switch,
    styles[size],
    placementClass[labelPlacement],
    {
      [styles.checked]: isChecked,
      [styles.checkedLarge]: isChecked && size === "large",
      [styles.disabled]: disabled,
      [styles.loading]: loading,
      [styles.square]: shape === "square",
      [styles.ripple]: ripple && rippleActive,
      [styles[color]]: isThemeColor,
    },
    className,
  );

  const computedThumbStyle = {
    ...(isChecked && !disabled && !isThemeColor
      ? { backgroundColor: color, color }
      : {}),
    ...customThumbStyle,
  };

  const labelNode = label ? (
    <span className={styles.label}>{label}</span>
  ) : null;
  const iconNode = icon ? <span className={styles.icon}>{icon}</span> : null;
  // Label before the control for start/top, after it for end/bottom; the
  // placement class only changes the flex direction (row vs column).
  const labelFirst = labelPlacement === "start" || labelPlacement === "top";

  return (
    // The label wraps the input, so clicking anywhere on it toggles the
    // switch; the click handler only drives the decorative ripple.
    <label className={switchClasses} style={labelStyle} onClick={handleRipple}>
      {labelFirst && labelNode}
      <span className={styles.switchBase}>
        <input
          ref={ref}
          type="checkbox"
          role="switch"
          name={name}
          aria-label={ariaLabel}
          aria-checked={isChecked}
          aria-disabled={blocked || undefined}
          aria-busy={loading || undefined}
          checked={isChecked}
          disabled={blocked}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        <span className={styles.track} style={trackStyle} />
        <span className={styles.thumb} style={computedThumbStyle}>
          {iconPlacement === "start" && iconNode}
        </span>
        {ripple && <span className={styles.rippleEffect} />}
      </span>
      {iconPlacement === "end" && iconNode}
      {!labelFirst && labelNode}
    </label>
  );
};

export default Switch;
