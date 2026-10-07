import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../utils/cn";
import { useControllableState } from "../../internal/useControllableState";
import { useMergedRefs } from "../../internal/mergeRefs";
import { pickDataAttributes } from "../../internal/dataAttributes";
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
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  name,
  id,
  value,
  labelPlacement = "end",
  loading = false,
  ripple = true,
  className,
  style,
  trackStyle,
  thumbStyle,
  onChange,
  onFocus,
  onBlur,
  icon,
  iconPlacement = "start",
  ref,
  ...rest
}: SwitchProps) => {
  const dataAttributes = pickDataAttributes(rest);
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
  const field = useFormControlProps({
    id,
    "aria-describedby": ariaDescribedBy,
  });
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

  const input = (
    <input
      ref={mergedRef}
      type="checkbox"
      role={segmented ? undefined : "switch"}
      className={segmented ? styles.hiddenInput : undefined}
      id={segmented ? undefined : field.id}
      name={name}
      value={value}
      aria-label={segmented ? undefined : ariaLabel}
      aria-labelledby={segmented ? undefined : ariaLabelledBy}
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
      // The group carries the field wiring: its name (FormControl label unless
      // named explicitly) and helper / error description (the FormControl
      // error message is referenced while invalid). aria-invalid and
      // aria-required are not supported on role="group": both states are
      // exposed as data-invalid / data-required (and by the FormControl).
      <span
        role="group"
        id={field.id}
        aria-label={ariaLabel}
        aria-labelledby={
          ariaLabelledBy ?? (fc && !ariaLabel ? fc.labelId : undefined)
        }
        aria-describedby={field["aria-describedby"]}
        aria-disabled={blocked || undefined}
        data-invalid={field["aria-invalid"] || undefined}
        data-required={fc?.required || undefined}
        {...dataAttributes}
        className={cn(
          styles.segmented,
          styles[size],
          styles[color],
          blocked && styles.disabled,
          className,
        )}
        style={style}
      >
        {input}
        {[false, true].map((segmentState) => {
          const active = isChecked === segmentState;
          return (
            <button
              key={String(segmentState)}
              type="button"
              className={cn(styles.segment, active && styles.segmentActive)}
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

  const switchClasses = cn(
    styles.switch,
    styles[size],
    !bilateral && placementClass[labelPlacement],
    styles[color],
    {
      [styles.checked]: isChecked,
      [styles.checkedLarge]: isChecked && size === "large",
      [styles.disabled]: isDisabled,
      [styles.loading]: loading,
      [styles.square]: shape === "square",
      [styles.ripple]: ripple && rippleActive,
      [styles.bilateral]: bilateral,
    },
    className,
  );

  const control = (
    <span className={styles.switchBase}>
      {input}
      <span className={styles.track} style={trackStyle} />
      <span className={styles.thumb} style={thumbStyle}>
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
          className={cn(styles.side, active && styles.sideActive)}
          disabled={blocked}
          onClick={() => setState(sideState)}
        >
          {sideState ? onLabel : offLabel}
        </button>
      );
    };
    // A <span> root: the side buttons must not sit inside the input's label.
    return (
      <span className={switchClasses} style={style} {...dataAttributes}>
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
    <label className={switchClasses} style={style} {...dataAttributes}>
      {labelFirst && labelNode}
      {control}
      {iconNode}
      {!labelFirst && labelNode}
    </label>
  );
};

export default Switch;
