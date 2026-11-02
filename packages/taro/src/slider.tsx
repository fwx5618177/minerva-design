import Taro from "@tarojs/taro";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { View, Text, Input } from "@tarojs/components";
import {
  closestSliderThumb,
  cn,
  getSliderKeyValue,
  getSliderMarks,
  isSliderMarkActive,
  normalizeSliderValue,
  setSliderThumb,
  sliderPercent,
  sliderRatioAt,
  sliderValueFromRatio,
  sliderValues,
  sliderValuesEqual,
  type SliderMark,
  type SliderScale,
  type SliderValue,
} from "@minerva/core";
import { useFieldState } from "./forms";
import { Part, useValue, type NativeProps } from "./shared";
import { useI18n } from "./theme";

export type { SliderMark, SliderValue };

export interface SliderProps extends Omit<NativeProps, "children"> {
  /** Value (controlled): a number, or `[start, end]` with `range` */
  value?: SliderValue;
  /** Initial value (uncontrolled); defaults to min, or [min, max] with range */
  defaultValue?: SliderValue;
  /** Two thumbs selecting `[start, end]` (default false) */
  range?: boolean;
  /** Smallest value (default 0) */
  min?: number;
  /** Largest value (default 100) */
  max?: number;
  /** Step between two values; `null` snaps to the marks only (default 1) */
  step?: number | null;
  /** Ticks: `{ value, label? }[]`, or `true` for one tick per step */
  marks?: SliderMark[] | boolean;
  /** Snaps to the closest mark instead of the step (default false) */
  snapToMarks?: boolean;
  /** Called with the new value while dragging and on each key press */
  onChange?: (value: SliderValue) => void;
  /** Called with the final value on touch release (or key press on H5) */
  onChangeEnd?: (value: SliderValue) => void;
  /** Blocks interaction (inherited from FormControl) */
  disabled?: boolean;
  /** Shows the value but blocks changes (inherited from FormControl) */
  readOnly?: boolean;
  /** Thumb and track size (default "medium") */
  size?: "small" | "medium" | "large";
  /** Accent of the filled track and the thumbs (default "primary") */
  color?: "primary" | "success" | "info" | "warning" | "danger";
  /** Shows the value after the track (default false) */
  showValue?: boolean;
  /** Shows the value above the thumb while it is dragged (default false) */
  tooltip?: boolean;
  /** Formats a value for the labels and aria-valuetext */
  formatValue?: (value: number) => string;
  /**
   * Direction of the track (default "horizontal"). A vertical track runs
   * from min (bottom) to max (top); its length is `--slider-length`
   * (default 160px)
   */
  orientation?: "horizontal" | "vertical";
  /** Name of the hidden form input(s) (H5 and native forms) */
  name?: string;
  /** aria-valuetext of a thumb (index 0, or 1 for the end thumb) */
  getAriaValueText?: (value: number, index: number) => string;
}

interface Rect {
  left: number;
  top: number;
  width: number;
  height: number;
}

type TouchPoint = {
  clientX?: number;
  pageX?: number;
  x?: number;
  clientY?: number;
  pageY?: number;
  y?: number;
};
/** The touch position on the slider axis (x, or y when vertical) */
const touchAt = (event: unknown, vertical: boolean): number | undefined => {
  const { touches, changedTouches } = event as {
    touches?: TouchPoint[];
    changedTouches?: TouchPoint[];
  };
  const touch = touches?.[0] ?? changedTouches?.[0];
  return vertical
    ? (touch?.clientY ?? touch?.pageY ?? touch?.y)
    : (touch?.clientX ?? touch?.pageX ?? touch?.x);
};

/**
 * Slider: picks a number, or a `[start, end]` range with `range`, on a
 * track (a custom touch implementation, not the host `<slider>`, for marks,
 * ranges and theming). Touch the track to move the closest thumb, then
 * drag; `onChange` follows the drag and `onChangeEnd` fires on release. The
 * track is measured with `createSelectorQuery`. `orientation="vertical"`
 * runs the track bottom (min) to top (max). On H5 each thumb is a
 * focusable `role="slider"` with arrow / PageUp / PageDown / Home / End keys.
 */
export function Slider({
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
  disabled: disabledProp,
  readOnly: readOnlyProp,
  size = "medium",
  color = "primary",
  showValue = false,
  tooltip = false,
  formatValue = String,
  orientation = "horizontal",
  name,
  getAriaValueText,
  ...props
}: SliderProps) {
  const field = useFieldState();
  const { t } = useI18n();
  const disabled = disabledProp ?? field.disabled ?? false;
  const readOnly = readOnlyProp ?? field.readOnly ?? false;
  const blocked = disabled || readOnly;
  const vertical = orientation === "vertical";
  const markList = getSliderMarks(marks, min, max, step);
  const scale: SliderScale = { min, max, step, marks: markList, snapToMarks };
  const [raw, setRaw] = useValue<SliderValue | undefined>(
    valueProp,
    defaultValue,
  );
  const value = normalizeSliderValue(raw, range, scale);
  const values = sliderValues(value);
  const [dragging, setDragging] = useState<number | null>(null);
  const generated = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const rootId = props.id ?? `mn-slider-${generated}`;
  const controlId = `${rootId}-control`;
  const rect = useRef<Rect | null>(null);
  const gesture = useRef<{ index: number; latest: SliderValue } | null>(null);

  const measure = (done: (rect: Rect) => void) => {
    const accept = (r: Partial<Rect> | null | undefined) => {
      const length = vertical ? r?.height : r?.width;
      if (r && typeof length === "number" && length > 0)
        done({
          left: r.left ?? 0,
          top: r.top ?? 0,
          width: r.width ?? 0,
          height: r.height ?? 0,
        });
    };
    const query = Taro.createSelectorQuery?.();
    if (query) {
      query
        .select(`#${controlId}`)
        .boundingClientRect((result) => accept(result as Partial<Rect>))
        .exec();
      return;
    }
    if (typeof document === "undefined") return;
    accept(document.getElementById(controlId)?.getBoundingClientRect());
  };
  const withRect = (fn: (rect: Rect) => void) => {
    const cached = rect.current;
    if (cached) fn(cached);
    measure((measured) => {
      rect.current = measured;
      if (!cached) fn(measured);
    });
  };

  const commit = (next: SliderValue, from: SliderValue) => {
    if (sliderValuesEqual(next, from)) return false;
    setRaw(next);
    onChange?.(next);
    return true;
  };
  const valueAt = (point: number, box: Rect) =>
    sliderValueFromRatio(
      vertical
        ? sliderRatioAt(point, box.top, box.height, true)
        : sliderRatioAt(point, box.left, box.width),
      scale,
    );

  const onTouchStart = (event: unknown) => {
    if (blocked) return;
    const x = touchAt(event, vertical);
    if (x === undefined) return;
    withRect((box) => {
      const pointed = valueAt(x, box);
      const index = closestSliderThumb(value, pointed);
      const next = setSliderThumb(value, index, pointed);
      gesture.current = { index, latest: next };
      setDragging(index);
      commit(next, value);
    });
  };
  const onTouchMove = (event: unknown) => {
    const current = gesture.current;
    const x = touchAt(event, vertical);
    if (!current || !rect.current || x === undefined) return;
    const next = setSliderThumb(
      current.latest,
      current.index,
      valueAt(x, rect.current),
    );
    if (commit(next, current.latest)) current.latest = next;
  };
  const onTouchEnd = () => {
    const current = gesture.current;
    if (!current) return;
    gesture.current = null;
    setDragging(null);
    onChangeEnd?.(current.latest);
  };

  // H5 keyboard (the native hosts have no keyboard focus on views)
  const keyHandler = useRef<(event: KeyboardEvent) => void>(() => {});
  keyHandler.current = (event: KeyboardEvent) => {
    if (blocked) return;
    const target = (event.target as HTMLElement).closest<HTMLElement>(
      "[data-index]",
    );
    if (!target) return;
    const index = Number(target.dataset.index);
    const next = getSliderKeyValue(event.key, values[index], scale);
    if (next === null) return;
    event.preventDefault();
    const updated = setSliderThumb(value, index, next);
    if (commit(updated, value)) onChangeEnd?.(updated);
  };
  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.getElementById(rootId);
    if (!root) return;
    const listener = (event: KeyboardEvent) => keyHandler.current(event);
    root.addEventListener("keydown", listener);
    return () => root.removeEventListener("keydown", listener);
  }, [rootId]);

  const position = (v: number) => sliderPercent(v, min, max);
  const start = range ? position(values[0]) : 0;
  const end = position(values[values.length - 1]);
  // Position along the track: from the left, or the bottom when vertical
  const at = (percent: number): CSSProperties =>
    vertical ? { bottom: `${percent}%` } : { left: `${percent}%` };
  const rangeStyle: CSSProperties = vertical
    ? { bottom: `${start}%`, height: `${end - start}%` }
    : { left: `${start}%`, width: `${end - start}%` };
  const labelOf = (index: number) => {
    const label = props["aria-label"];
    if (!range) return label;
    const suffix = t(index === 0 ? "slider.minimum" : "slider.maximum");
    return label ? `${label} ${suffix}` : suffix;
  };
  const labelledBy = props["aria-labelledby"];

  return (
    <Part
      name="slider"
      {...props}
      id={rootId}
      aria-label={undefined}
      aria-labelledby={undefined}
      data-size={size}
      data-color={color}
      data-orientation={orientation}
      data-variant={range ? "range" : "single"}
      data-disabled={disabled ? "" : undefined}
      data-readonly={readOnly ? "" : undefined}
      data-invalid={field.invalid ? "" : undefined}
      data-dragging={dragging !== null ? "" : undefined}
      className={cn(
        `mn-size-${size}`,
        `mn-color-${color}`,
        vertical && "mn-vertical",
        markList.some((m) => m.label) && "mn-labelled",
        disabled && "mn-disabled",
        readOnly && "mn-readonly",
        dragging !== null && "mn-dragging",
        props.className,
      )}
    >
      <View
        id={controlId}
        className="mn-slider__control"
        data-minerva="slider"
        data-part="control"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
      >
        <View
          className="mn-slider__rail"
          data-minerva="slider"
          data-part="rail"
        />
        <View
          className="mn-slider__range"
          data-minerva="slider"
          data-part="range"
          style={rangeStyle}
        />
        {markList.map((mark) => {
          const active = isSliderMarkActive(mark.value, value);
          return (
            <View
              key={mark.value}
              aria-hidden
              className={cn("mn-slider__mark", active && "mn-active")}
              data-minerva="slider"
              data-part="mark"
              data-state={active ? "active" : "inactive"}
              style={at(position(mark.value))}
            >
              {mark.label ? (
                <Text
                  className={cn(
                    "mn-slider__mark-label",
                    position(mark.value) <= 0 && "mn-start",
                    position(mark.value) >= 100 && "mn-end",
                  )}
                  data-minerva="slider"
                  data-part="mark-label"
                >
                  {mark.label}
                </Text>
              ) : null}
            </View>
          );
        })}
        {values.map((v, index) => (
          <View
            key={index}
            {...{ role: "slider", tabIndex: disabled ? -1 : 0 }}
            id={index === 0 ? field.id : undefined}
            aria-label={labelOf(index)}
            aria-labelledby={labelledBy}
            aria-valuemin={range && index === 1 ? values[0] : min}
            aria-valuemax={range && index === 0 ? values[1] : max}
            aria-valuenow={v}
            aria-valuetext={
              getAriaValueText ? getAriaValueText(v, index) : formatValue(v)
            }
            aria-orientation={orientation}
            aria-disabled={disabled || undefined}
            aria-readonly={readOnly || undefined}
            aria-invalid={field.invalid || undefined}
            className={cn(
              "mn-slider__thumb",
              dragging === index && "mn-dragging",
            )}
            data-minerva="slider"
            data-part="thumb"
            data-index={index}
            data-dragging={dragging === index ? "" : undefined}
            data-disabled={disabled ? "" : undefined}
            style={at(position(v))}
          >
            {tooltip && dragging === index ? (
              <Text
                aria-hidden
                className="mn-slider__tooltip"
                data-minerva="slider"
                data-part="tooltip"
              >
                {formatValue(v)}
              </Text>
            ) : null}
          </View>
        ))}
      </View>
      {showValue ? (
        <Text
          aria-hidden
          className="mn-slider__value"
          data-minerva="slider"
          data-part="value"
        >
          {values.map((v) => formatValue(v)).join(" – ")}
        </Text>
      ) : null}
      {name
        ? values.map((v, index) => (
            <Input
              key={index}
              className="mn-slider__input"
              data-minerva="slider"
              data-part="input"
              name={name}
              value={String(v)}
              disabled={disabled}
              style={{ display: "none" }}
            />
          ))
        : null}
    </Part>
  );
}
