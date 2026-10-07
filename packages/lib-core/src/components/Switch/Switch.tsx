import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { useControllableState } from "../../internal/useControllableState";
import { useMergedRefs } from "../../internal/mergeRefs";
import {
  useFormControlContext,
  useFormControlProps,
} from "../FormControl/context";
import type { SwitchProps } from "./types";
import styles from "./switch.module.scss";

const RIPPLE_DURATION = 400;

const placementClass = {
  start: styles.labelStart,
  end: styles.labelEnd,
  top: styles.labelTop,
  bottom: styles.labelBottom,
} as const;

/** Colors styled by a role class; any other value is used as a CSS color. */
const THEME_COLORS = new Set([
  "primary",
  "secondary",
  "success",
  "info",
  "warning",
  "error",
]);

const hasContent = (node: React.ReactNode) =>
  node != null && node !== false && node !== "";

/**
 * Switch: toggles between two mutually exclusive states.
 * Renders a native checkbox with role="switch"; `ref` reaches the <input>.
 * `offLabel` + `onLabel` add clickable labels on both sides of the slider, or
 * build a two-segment control with `variant="segmented"`.
 */
const Switch = ({
  checked,
  defaultChecked = false,
  disabled,
  size = "medium",
  color = "primary",
  shape = "round",
  variant = "slider",
  label,
  children,
  offLabel,
  onLabel,
  ariaLabel,
  name,
  id,
  value,
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
  const inputRef = useRef<HTMLInputElement>(null);
  const mergedRef = useMergedRefs(inputRef, ref);

  useEffect(() => () => clearTimeout(rippleTimer.current), []);

  // FormControl wiring; an explicit `disabled` wins (so `false` opts out).
  const fc = useFormControlContext();
  const field = useFormControlProps({ id });
  const isDisabled = disabled ?? fc?.disabled ?? false;
  const readOnly = !!fc?.readOnly;
  const blocked = isDisabled || loading || readOnly;

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

  // Clicks reach the input also when the wrapping label is clicked, and the
  // Space key fires a click too: the ripple follows every toggle.
  const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
    if (readOnly) {
      event.preventDefault();
      return;
    }
    if (!ripple || blocked) return;
    clearTimeout(rippleTimer.current);
    setRippleActive(true);
    rippleTimer.current = setTimeout(
      () => setRippleActive(false),
      RIPPLE_DURATION,
    );
  };

  // Side labels / segments set a state directly: they click the input so the
  // regular change event (and onChange) fires.
  const setState = (next: boolean) => {
    if (blocked || next === isChecked) return;
    inputRef.current?.click();
  };

  const bilateral = hasContent(offLabel) && hasContent(onLabel);
  const segmented = variant === "segmented" && bilateral;
  const isThemeColor = THEME_COLORS.has(color);

  const input = (
    <input
      ref={mergedRef}
      type="checkbox"
      role={segmented ? undefined : "switch"}
      className={segmented ? styles.hiddenInput : undefined}
      id={segmented ? id : field.id}
      name={name}
      value={value}
      aria-label={segmented ? undefined : ariaLabel}
      aria-checked={segmented ? undefined : isChecked}
      aria-disabled={segmented ? undefined : isDisabled || loading || undefined}
      aria-busy={loading || undefined}
      aria-invalid={segmented ? undefined : field["aria-invalid"]}
      aria-required={segmented ? undefined : field["aria-required"]}
      aria-readonly={segmented ? undefined : field["aria-readonly"]}
      aria-describedby={segmented ? undefined : field["aria-describedby"]}
      aria-hidden={segmented || undefined}
      tabIndex={segmented ? -1 : undefined}
      checked={isChecked}
      disabled={isDisabled || loading}
      onChange={handleChange}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );

  if (segmented) {
    return (
      <span
        role="group"
        aria-label={ariaLabel}
        className={classNames(
          styles.segmented,
          styles[size],
          isThemeColor && styles[color],
          blocked && styles.disabled,
          className,
        )}
        style={labelStyle}
      >
        {input}
        {[false, true].map((segmentState) => {
          const active = isChecked === segmentState;
          return (
            <button
              key={String(segmentState)}
              type="button"
              className={classNames(
                styles.segment,
                active && styles.segmentActive,
              )}
              disabled={blocked}
              aria-pressed={active}
              onClick={() => setState(segmentState)}
            >
              {segmentState ? onLabel : offLabel}
            </button>
          );
        })}
      </span>
    );
  }

  const switchClasses = classNames(
    styles.switch,
    styles[size],
    !bilateral && placementClass[labelPlacement],
    {
      [styles.checked]: isChecked,
      [styles.checkedLarge]: isChecked && size === "large",
      [styles.disabled]: isDisabled,
      [styles.loading]: loading,
      [styles.square]: shape === "square",
      [styles.ripple]: ripple && rippleActive,
      [styles[color]]: isThemeColor,
      [styles.bilateral]: bilateral,
    },
    className,
  );

  const computedThumbStyle = {
    ...(isChecked && !isDisabled && !isThemeColor
      ? { backgroundColor: color, color }
      : {}),
    ...customThumbStyle,
  };

  const control = (
    <span className={styles.switchBase}>
      {input}
      <span className={styles.track} style={trackStyle} />
      <span className={styles.thumb} style={computedThumbStyle}>
        {iconPlacement === "start" && icon && (
          <span className={styles.icon}>{icon}</span>
        )}
      </span>
      {ripple && <span className={styles.rippleEffect} />}
    </span>
  );
  const iconNode =
    iconPlacement === "end" && icon ? (
      <span className={styles.icon}>{icon}</span>
    ) : null;

  if (bilateral) {
    const side = (sideState: boolean) => {
      const active = isChecked === sideState;
      return (
        <button
          type="button"
          className={classNames(styles.side, active && styles.sideActive)}
          disabled={blocked}
          onClick={() => setState(sideState)}
        >
          {sideState ? onLabel : offLabel}
        </button>
      );
    };
    // A <span> root: the side buttons must not sit inside the input's label.
    return (
      <span className={switchClasses} style={labelStyle}>
        {side(false)}
        {control}
        {side(true)}
        {iconNode}
      </span>
    );
  }

  const content = label ?? children;
  const labelNode = hasContent(content) ? (
    <span className={styles.label}>{content}</span>
  ) : null;
  // Label before the control for start/top, after it for end/bottom; the
  // placement class only changes the flex direction (row vs column).
  const labelFirst = labelPlacement === "start" || labelPlacement === "top";

  return (
    // The label wraps the input, so clicking anywhere on it toggles the switch.
    <label className={switchClasses} style={labelStyle}>
      {labelFirst && labelNode}
      {control}
      {iconNode}
      {!labelFirst && labelNode}
    </label>
  );
};

export default Switch;
