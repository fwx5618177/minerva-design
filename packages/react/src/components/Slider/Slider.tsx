import React, { useLayoutEffect, useRef, useState } from "react";
import {
  closestSliderThumb,
  getSliderKeyValue,
  getSliderMarks,
  isSliderMarkActive,
  normalizeSliderValue,
  setSliderThumb,
  sliderPercent,
  sliderValueFromRatio,
  sliderValues,
  sliderValuesEqual,
  type SliderScale,
  type SliderValue,
} from "@minerva/core";
import { cn } from "../../utils/cn";
import { useControllableState } from "../../internal/useControllableState";
import { warnControlledProps } from "../../internal/devWarnings";
import { getDirection, logicalArrowKey } from "../../internal/direction";
import { pickDataAttributes } from "../../internal/dataAttributes";
import { hooks } from "../../internal/stylingHooks";
import useI18n from "../../hooks/useI18n";
import {
  useFormControlContext,
  useFormControlProps,
} from "../FormControl/context";
import styles from "./slider.module.scss";
import type { SliderProps } from "./types";

const defaultFormat = (v: number) => String(v);

/**
 * Slider: picks a number (or a `[start, end]` range with `range`) on a
 * track. Each thumb is a `role="slider"`: ArrowRight / ArrowUp add a step
 * (ArrowLeft increases in RTL), PageUp / PageDown move by 10%, Home / End
 * jump to the bounds. Clicking the track moves the closest thumb there;
 * dragging captures the pointer. `onChange` follows the drag, `onChangeEnd`
 * fires once on release (or after a key press): save there.
 */
const Slider = ({
  value: valueProp,
  defaultValue,
  range = false,
  min = 0,
  max = 100,
  step = 1,
  marks,
  snapToMarks = false,
  onChange,
  onChangeEnd,
  disabled,
  readOnly: readOnlyProp,
  size = "medium",
  color = "primary",
  showValue = false,
  tooltip = false,
  formatValue = defaultFormat,
  orientation = "horizontal",
  name,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  getAriaValueText,
  className,
  style,
  ref,
  ...rest
}: SliderProps) => {
  const { t } = useI18n();
  const fc = useFormControlContext();
  const field = useFormControlProps({
    id: undefined as string | undefined,
    "aria-describedby": ariaDescribedBy,
  });
  const isDisabled = disabled ?? fc?.disabled ?? false;
  const readOnly = readOnlyProp ?? fc?.readOnly ?? false;
  const blocked = isDisabled || readOnly;
  const vertical = orientation === "vertical";

  const markList = getSliderMarks(marks, min, max, step);
  const scale: SliderScale = { min, max, step, marks: markList, snapToMarks };

  if (process.env.NODE_ENV !== "production") {
    warnControlledProps("Slider", {
      prop: "value",
      value: valueProp,
      defaultProp: "defaultValue",
      defaultValue,
      handlerProp: "onChange",
      handler: onChange,
      locked: blocked,
      lockHint: "set `disabled` or `readOnly`",
    });
  }

  const [rawValue, setValue] = useControllableState<SliderValue | undefined>({
    value: valueProp,
    defaultValue,
    name: "Slider",
  });
  const value = normalizeSliderValue(rawValue, range, scale);
  const values = sliderValues(value);

  const controlRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<(HTMLSpanElement | null)[]>([]);
  // Latest value of the interaction (a controlled parent may lag a render)
  const latest = useRef<SliderValue>(value);
  useLayoutEffect(() => {
    latest.current = value;
  });
  const [dragging, setDragging] = useState<number | null>(null);

  const update = (next: SliderValue) => {
    if (sliderValuesEqual(next, latest.current)) return false;
    latest.current = next;
    setValue(next);
    onChange?.(next);
    return true;
  };

  const valueAtPointer = (event: React.PointerEvent) => {
    const rect = controlRef.current!.getBoundingClientRect();
    let ratio: number;
    if (vertical) {
      ratio = rect.height ? (rect.bottom - event.clientY) / rect.height : 0;
    } else {
      ratio = rect.width ? (event.clientX - rect.left) / rect.width : 0;
      if (getDirection(controlRef.current) === "rtl") ratio = 1 - ratio;
    }
    return sliderValueFromRatio(ratio, scale);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (blocked || event.button !== 0) return;
    event.preventDefault();
    const pointed = valueAtPointer(event);
    const thumbIndex = (event.target as HTMLElement).closest<HTMLElement>(
      "[data-index]",
    )?.dataset.index;
    const index =
      thumbIndex !== undefined
        ? Number(thumbIndex)
        : closestSliderThumb(latest.current, pointed);
    event.currentTarget.setPointerCapture?.(event.pointerId);
    setDragging(index);
    thumbRefs.current[index]?.focus();
    if (thumbIndex === undefined)
      update(setSliderThumb(latest.current, index, pointed));
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragging === null) return;
    update(setSliderThumb(latest.current, dragging, valueAtPointer(event)));
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragging === null) return;
    if (event.currentTarget.hasPointerCapture?.(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
    setDragging(null);
    onChangeEnd?.(latest.current);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLSpanElement>,
    index: number,
  ) => {
    if (blocked) return;
    const key = vertical
      ? event.key
      : logicalArrowKey(event.key, event.currentTarget);
    const next = getSliderKeyValue(key, values[index], scale);
    if (next === null) return;
    event.preventDefault();
    if (update(setSliderThumb(latest.current, index, next)))
      onChangeEnd?.(latest.current);
  };

  const labelOf = (index: number) => {
    if (!range) return ariaLabel;
    const suffix = t(index === 0 ? "slider.minimum" : "slider.maximum");
    return ariaLabel ? `${ariaLabel} ${suffix}` : suffix;
  };
  // FormControl label: referenced by the thumbs unless they are named
  const labelledBy =
    ariaLabelledBy ?? (fc && !ariaLabel ? fc.labelId : undefined);

  const position = (v: number) => sliderPercent(v, min, max);
  const start = range ? position(values[0]) : 0;
  const end = position(values[values.length - 1]);
  const at = (percent: number): React.CSSProperties =>
    vertical ? { bottom: `${percent}%` } : { insetInlineStart: `${percent}%` };
  const rangeStyle: React.CSSProperties = vertical
    ? { bottom: `${start}%`, height: `${end - start}%` }
    : { insetInlineStart: `${start}%`, width: `${end - start}%` };

  const hasMarkLabels = markList.some((m) => m.label);
  const valueText = values.map(formatValue).join(" – ");

  return (
    <div
      {...pickDataAttributes(rest)}
      ref={ref}
      className={cn(
        styles.slider,
        styles[size],
        styles[color],
        vertical && styles.vertical,
        hasMarkLabels && styles.labelled,
        isDisabled && styles.disabled,
        readOnly && styles.readOnly,
        dragging !== null && styles.dragging,
        className,
      )}
      style={style}
      {...hooks("slider", "root", {
        disabled: isDisabled,
        readonly: readOnly,
        invalid: !!fc?.invalid,
        dragging: dragging !== null,
        size,
        color,
        orientation,
        variant: range ? "range" : "single",
      })}
    >
      <div
        ref={controlRef}
        className={styles.control}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        {...hooks("slider", "control")}
      >
        <span className={styles.rail} {...hooks("slider", "rail")} />
        <span
          className={styles.range}
          style={rangeStyle}
          {...hooks("slider", "range")}
        />
        {markList.map((mark) => {
          const active = isSliderMarkActive(mark.value, value);
          return (
            <span
              key={mark.value}
              className={cn(styles.mark, active && styles.markActive)}
              style={at(position(mark.value))}
              aria-hidden
              {...hooks("slider", "mark", {
                state: active ? "active" : "inactive",
              })}
            >
              {mark.label && (
                <span
                  className={cn(
                    styles.markLabel,
                    mark.value <= min && styles.markLabelStart,
                    mark.value >= max && styles.markLabelEnd,
                  )}
                  {...hooks("slider", "mark-label")}
                >
                  {mark.label}
                </span>
              )}
            </span>
          );
        })}
        {values.map((v, index) => {
          const thumbDragging = dragging === index;
          return (
            <span
              key={index}
              ref={(node) => {
                thumbRefs.current[index] = node;
              }}
              data-index={index}
              role="slider"
              tabIndex={isDisabled ? -1 : 0}
              id={index === 0 ? field.id : undefined}
              className={cn(
                styles.thumb,
                thumbDragging && styles.thumbDragging,
              )}
              style={at(position(v))}
              aria-label={labelOf(index)}
              aria-labelledby={labelledBy}
              aria-describedby={field["aria-describedby"]}
              aria-valuemin={range && index === 1 ? values[0] : min}
              aria-valuemax={range && index === 0 ? values[1] : max}
              aria-valuenow={v}
              aria-valuetext={
                getAriaValueText ? getAriaValueText(v, index) : formatValue(v)
              }
              aria-orientation={orientation}
              aria-disabled={isDisabled || undefined}
              aria-readonly={readOnly || undefined}
              aria-invalid={field["aria-invalid"]}
              onKeyDown={(event) => handleKeyDown(event, index)}
              {...hooks("slider", "thumb", {
                dragging: thumbDragging,
                disabled: isDisabled,
              })}
            >
              {tooltip && (
                <span
                  className={styles.tooltip}
                  aria-hidden
                  {...hooks("slider", "tooltip")}
                >
                  {formatValue(v)}
                </span>
              )}
            </span>
          );
        })}
      </div>
      {showValue && (
        <span
          className={styles.value}
          aria-hidden
          {...hooks("slider", "value")}
        >
          {valueText}
        </span>
      )}
      {name &&
        values.map((v, index) => (
          <input
            key={index}
            type="hidden"
            name={name}
            value={v}
            disabled={isDisabled}
            {...hooks("slider", "input")}
          />
        ))}
    </div>
  );
};

export default Slider;
