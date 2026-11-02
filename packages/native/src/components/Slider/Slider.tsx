import { useRef, useState } from "react";
import {
  I18nManager,
  Text,
  View,
  type AccessibilityActionEvent,
  type GestureResponderEvent,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewProps,
  type ViewStyle,
} from "react-native";
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
  type SliderMark,
  type SliderScale,
  type SliderValue,
} from "@minerva/core";
import { useFormControlProps } from "../../internal/FormControlContext";
import { bindFormControl } from "../../internal/formControl";
import { part } from "../../internal/parts";
import {
  colorRole,
  hitSlopFor,
  shadowStyle,
  weight,
  type NativeSize,
  type SemanticColor,
} from "../../internal/styles";
import { useControllable } from "../../internal/useControllable";
import { useI18n, useTheme } from "../../theme/MinervaProvider";

export type { SliderMark, SliderValue };
export type SliderSize = NativeSize;

export interface SliderProps extends Omit<ViewProps, "style"> {
  /** Value (controlled): a number, or `[start, end]` with `range` */
  value?: SliderValue;
  /** Initial value (uncontrolled); defaults to min, or [min, max] with range */
  defaultValue?: SliderValue;
  /**
   * Two thumbs selecting `[start, end]`; the thumbs cannot cross
   * @default false
   */
  range?: boolean;
  /**
   * Smallest value
   * @default 0
   */
  min?: number;
  /**
   * Largest value
   * @default 100
   */
  max?: number;
  /**
   * Step between two values; `null` snaps to the marks only
   * @default 1
   */
  step?: number | null;
  /** Ticks of the scale: `{ value, label? }[]`, or `true` for one tick per step */
  marks?: SliderMark[] | boolean;
  /**
   * Snaps the value to the closest mark (instead of the step)
   * @default false
   */
  snapToMarks?: boolean;
  /** Called with the new value while dragging and on each adjustment */
  onChange?: (value: SliderValue) => void;
  /**
   * Called with the final value when the gesture ends (release, screen
   * reader adjustment): save here
   */
  onChangeEnd?: (value: SliderValue) => void;
  /**
   * Disables the slider (inherited from an enclosing FormField)
   * @default false
   */
  disabled?: boolean;
  /**
   * The user cannot change the value (inherited from an enclosing FormField)
   * @default false
   */
  readOnly?: boolean;
  /** Error state (inherited from an enclosing FormField) */
  invalid?: boolean;
  /**
   * Thumb and track size (thumbs are 20 / 24 / 28 dp: touch targets)
   * @default "medium"
   */
  size?: SliderSize;
  /**
   * Semantic color of the filled track and the thumbs
   * @default "primary"
   */
  color?: SemanticColor;
  /**
   * Shows the value after the track
   * @default false
   */
  showValue?: boolean;
  /**
   * Shows the value in a bubble above the thumb while it is dragged
   * @default false
   */
  tooltip?: boolean;
  /** Formats a value for the value label, the tooltip and the accessibility value */
  formatValue?: (value: number) => string;
  /** Accessibility value text of a thumb (index 0, or 1 for the end thumb) */
  getAriaValueText?: (value: number, index: number) => string;
  /** Style of the root view */
  style?: StyleProp<ViewStyle>;
}

const TRACK = { small: 4, medium: 6, large: 8 } as const;
const THUMB = { small: 20, medium: 24, large: 28 } as const;

/**
 * Slider: picks a number, or a `[start, end]` range with `range`, on a
 * track. Touch: press anywhere on the track to move the closest thumb, then
 * drag (the gesture keeps the responder, a parent ScrollView does not steal
 * it). `onChange` follows the drag, `onChangeEnd` fires once on release.
 * Screen readers: each thumb is `adjustable` (increment / decrement step).
 */
export function Slider(componentProps: SliderProps) {
  const {
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
    disabled = false,
    readOnly = false,
    invalid = false,
    size = "medium",
    color = "primary",
    showValue = false,
    tooltip = false,
    formatValue = String,
    getAriaValueText,
    style,
    accessibilityLabel,
    accessibilityHint,
    ...rest
  } = useFormControlProps(componentProps);
  const { tokens: t, fonts } = useTheme();
  const { t: translate } = useI18n();
  const blocked = disabled || readOnly;

  const markList = getSliderMarks(marks, min, max, step);
  const scale: SliderScale = { min, max, step, marks: markList, snapToMarks };
  const [raw, setRaw] = useControllable<SliderValue | undefined>(
    valueProp,
    defaultValue,
  );
  const value = normalizeSliderValue(raw, range, scale);
  const values = sliderValues(value);

  const [width, setWidth] = useState(0);
  const [dragging, setDragging] = useState<number | null>(null);
  const gesture = useRef<{ index: number; latest: SliderValue } | null>(null);

  const update = (next: SliderValue, from: SliderValue) => {
    if (sliderValuesEqual(next, from)) return false;
    setRaw(next);
    onChange?.(next);
    return true;
  };

  const valueAt = (x: number) => {
    let ratio = width ? x / width : 0;
    if (I18nManager.isRTL) ratio = 1 - ratio;
    return sliderValueFromRatio(ratio, scale);
  };

  const onGrant = (event: GestureResponderEvent) => {
    const pointed = valueAt(event.nativeEvent.locationX);
    const index = closestSliderThumb(value, pointed);
    const next = setSliderThumb(value, index, pointed);
    gesture.current = { index, latest: next };
    setDragging(index);
    update(next, value);
  };

  const onMove = (event: GestureResponderEvent) => {
    const current = gesture.current;
    if (!current) return;
    const next = setSliderThumb(
      current.latest,
      current.index,
      valueAt(event.nativeEvent.locationX),
    );
    if (update(next, current.latest)) current.latest = next;
  };

  const onEnd = () => {
    const current = gesture.current;
    if (!current) return;
    gesture.current = null;
    setDragging(null);
    onChangeEnd?.(current.latest);
  };

  const onAction = (event: AccessibilityActionEvent, index: number) => {
    if (blocked) return;
    const key =
      event.nativeEvent.actionName === "increment"
        ? "ArrowRight"
        : event.nativeEvent.actionName === "decrement"
          ? "ArrowLeft"
          : null;
    if (!key) return;
    const target = getSliderKeyValue(key, values[index], scale);
    if (target === null) return;
    const next = setSliderThumb(value, index, target);
    if (update(next, value)) onChangeEnd?.(next);
  };

  const track = TRACK[size];
  const thumb = THUMB[size];
  const accent = colorRole(t, color).solid;
  const textFont = fonts.sans ? { fontFamily: fonts.sans } : null;
  const offset = (v: number) => (sliderPercent(v, min, max) / 100) * width;
  const start = range ? offset(values[0]) : 0;
  const end = offset(values[values.length - 1]);
  const hasMarkLabels = markList.some((m) => m.label);
  const labelOf = (index: number) => {
    if (!range) return accessibilityLabel;
    const suffix = translate(index === 0 ? "slider.minimum" : "slider.maximum");
    return accessibilityLabel ? `${accessibilityLabel} ${suffix}` : suffix;
  };

  return (
    <View
      {...part("slider", "root", {
        disabled,
        readonly: readOnly,
        invalid,
        dragging: dragging !== null,
        size,
        color,
        orientation: "horizontal",
        variant: range ? "range" : "single",
      })}
      {...rest}
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      <View
        onLayout={(event: LayoutChangeEvent) =>
          setWidth(event.nativeEvent.layout.width)
        }
        onStartShouldSetResponder={() => !blocked}
        onMoveShouldSetResponder={() => !blocked}
        onResponderTerminationRequest={() => false}
        onResponderGrant={onGrant}
        onResponderMove={onMove}
        onResponderRelease={onEnd}
        onResponderTerminate={onEnd}
        hitSlop={hitSlopFor(t, thumb)}
        {...part("slider", "control")}
        style={{
          flex: 1,
          height: thumb,
          justifyContent: "center",
          marginBottom: hasMarkLabels ? t.space["5"] : 0,
          marginHorizontal: thumb / 2,
        }}
      >
        <View
          pointerEvents="none"
          {...part("slider", "rail")}
          style={{
            height: track,
            borderRadius: track,
            backgroundColor: t.colors["border-color"],
          }}
        />
        <View
          pointerEvents="none"
          {...part("slider", "range")}
          style={{
            position: "absolute",
            start,
            width: Math.max(0, end - start),
            height: track,
            borderRadius: track,
            backgroundColor: accent,
          }}
        />
        {markList.map((mark) => {
          const active = isSliderMarkActive(mark.value, value);
          return (
            <View
              key={mark.value}
              pointerEvents="none"
              {...part("slider", "mark", {
                state: active ? "active" : "inactive",
              })}
              style={{
                position: "absolute",
                start: offset(mark.value) - 2,
                width: 4,
                height: 4,
                borderRadius: 2,
                backgroundColor: active
                  ? t.colors["surface-color"]
                  : t.colors["border-strong-color"],
              }}
            >
              {mark.label ? (
                <Text
                  {...part("slider", "mark-label")}
                  style={{
                    position: "absolute",
                    top: thumb / 2 + t.space["1"],
                    width: 64,
                    left: -30,
                    textAlign: "center",
                    color: t.colors["text-muted-color"],
                    fontSize: t.fontSize.xs,
                    ...textFont,
                  }}
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
            pointerEvents="box-none"
            accessible
            accessibilityRole="adjustable"
            accessibilityLabel={labelOf(index)}
            accessibilityHint={accessibilityHint}
            accessibilityState={{ disabled }}
            accessibilityValue={{
              min: range && index === 1 ? values[0] : min,
              max: range && index === 0 ? values[1] : max,
              now: v,
              text: getAriaValueText
                ? getAriaValueText(v, index)
                : formatValue(v),
            }}
            accessibilityActions={
              blocked
                ? undefined
                : [{ name: "increment" }, { name: "decrement" }]
            }
            aria-valuemin={range && index === 1 ? values[0] : min}
            aria-valuemax={range && index === 0 ? values[1] : max}
            aria-valuenow={v}
            aria-valuetext={
              getAriaValueText ? getAriaValueText(v, index) : formatValue(v)
            }
            onAccessibilityAction={(event) => onAction(event, index)}
            {...part("slider", "thumb", {
              dragging: dragging === index,
              disabled,
            })}
            style={{
              position: "absolute",
              start: offset(v) - thumb / 2,
              width: thumb,
              height: thumb,
              borderRadius: thumb / 2,
              borderWidth: 2,
              borderColor: invalid ? t.colors["danger-color"] : accent,
              backgroundColor: t.colors["surface-color"],
              ...shadowStyle(t.shadows.sm),
              transform: [{ scale: dragging === index ? 1.15 : 1 }],
            }}
          >
            {tooltip && dragging === index ? (
              <View
                pointerEvents="none"
                {...part("slider", "tooltip")}
                style={{
                  position: "absolute",
                  bottom: thumb + t.space["1"],
                  alignSelf: "center",
                  paddingHorizontal: t.space["2"],
                  paddingVertical: t.space["0-5"],
                  borderRadius: t.radius.sm,
                  backgroundColor: t.colors["text-color"],
                }}
              >
                <Text
                  style={{
                    color: t.colors["surface-color"],
                    fontSize: t.fontSize.xs,
                    ...textFont,
                  }}
                >
                  {formatValue(v)}
                </Text>
              </View>
            ) : null}
          </View>
        ))}
      </View>
      {showValue ? (
        <Text
          {...part("slider", "value")}
          importantForAccessibility="no"
          accessibilityElementsHidden
          style={{
            marginStart: t.space["2"],
            minWidth: 32,
            textAlign: "right",
            color: t.colors["text-secondary-color"],
            fontSize: size === "large" ? t.fontSize.md : t.fontSize.sm,
            fontWeight: weight(t, "medium"),
            fontVariant: ["tabular-nums"],
            ...textFont,
          }}
        >
          {values.map(formatValue).join(" – ")}
        </Text>
      ) : null}
    </View>
  );
}

bindFormControl(Slider, { emptyValue: undefined, commitOnChange: true });
