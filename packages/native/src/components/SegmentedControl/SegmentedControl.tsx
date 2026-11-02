import {
  isValidElement,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  Animated,
  Easing,
  Pressable,
  Text,
  View,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewProps,
  type ViewStyle,
} from "react-native";
import { useTheme } from "../../theme/MinervaProvider";
import { part } from "../../internal/parts";
import {
  controlHeight,
  duration,
  hitSlopFor,
  shadowStyle,
  weight,
} from "../../internal/styles";
import { useControllable } from "../../internal/useControllable";

/** Density of a SegmentedControl */
export type SegmentedControlSize = "small" | "medium" | "large";

/**
 * Color of a SegmentedControl: `neutral` shows a raised surface thumb on a
 * muted track, `primary` a solid primary thumb
 */
export type SegmentedControlColor = "neutral" | "primary";

/** A segment of a SegmentedControl */
export interface SegmentedControlOptionObject<T extends string = string> {
  /** Value of the segment */
  value: T;
  /**
   * Visible label (a string is rendered as text)
   * @default the value (unless an icon is given)
   */
  label?: ReactNode;
  /** Icon shown before the label (alone for an icon-only segment) */
  icon?: ReactNode;
  /**
   * Blocks this segment
   * @default false
   */
  disabled?: boolean;
  /** Accessible name; required for an icon-only segment */
  "aria-label"?: string;
}

/** A segment: a plain string (value and label) or an option object */
export type SegmentedControlOption<T extends string = string> =
  T | SegmentedControlOptionObject<T>;

export interface SegmentedControlProps<T extends string = string> extends Omit<
  ViewProps,
  "style" | "children"
> {
  /** The segments: strings or option objects */
  options: readonly SegmentedControlOption<NoInfer<T>>[];
  /** Selected value (controlled; pair with onChange) */
  value?: NoInfer<T>;
  /** Initially selected value (uncontrolled) */
  defaultValue?: NoInfer<T>;
  /** Called with the selected value */
  onChange?: (value: T) => void;
  /**
   * Segment density
   * @default "medium"
   */
  size?: SegmentedControlSize;
  /**
   * Thumb color
   * @default "neutral"
   */
  color?: SegmentedControlColor;
  /**
   * Fills the width of the container with equal-width segments (otherwise
   * each segment is as wide as its content)
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Blocks every segment
   * @default false
   */
  disabled?: boolean;
  /** Accessible label of the group */
  "aria-label"?: string;
  /** Style of the track */
  style?: StyleProp<ViewStyle>;
}

const normalize = <T extends string>(
  option: SegmentedControlOption<T>,
): SegmentedControlOptionObject<T> =>
  typeof option === "string" ? { value: option } : option;

interface Box {
  x: number;
  width: number;
}

/**
 * SegmentedControl: a single-choice segmented switch for modes and filters
 * (a `radiogroup` of `radio` segments with a thumb sliding under the
 * selected one; token duration, instant with reduced motion). Use Tabs when
 * each choice has its own content panel.
 */
export function SegmentedControl<T extends string = string>({
  options,
  value: valueProp,
  defaultValue,
  onChange,
  size = "medium",
  color = "neutral",
  fullWidth = false,
  disabled = false,
  "aria-label": ariaLabel,
  accessibilityLabel,
  style,
  ...rest
}: SegmentedControlProps<T>) {
  const { tokens: t, fonts } = useTheme();
  const [value, setValue] = useControllable<T | undefined>(
    valueProp,
    defaultValue,
    (next) => {
      if (next !== undefined) onChange?.(next);
    },
  );
  const items = options.map(normalize);
  const selectedIndex = items.findIndex((item) => item.value === value);
  const [boxes, setBoxes] = useState<Record<number, Box>>({});
  const [x] = useState(() => new Animated.Value(0));
  const [width] = useState(() => new Animated.Value(0));
  const placed = useRef(false);
  const ms = duration(t, "base");
  const target = selectedIndex >= 0 ? boxes[selectedIndex] : undefined;

  useEffect(() => {
    if (!target) return;
    // The first placement (and reduced motion) jumps; later moves slide.
    if (!placed.current || ms <= 0) {
      placed.current = true;
      x.setValue(target.x);
      width.setValue(target.width);
      return;
    }
    const animation = Animated.parallel([
      Animated.timing(x, {
        toValue: target.x,
        duration: ms,
        easing: Easing.out(Easing.quad),
        useNativeDriver: false,
      }),
      Animated.timing(width, {
        toValue: target.width,
        duration: ms,
        easing: Easing.out(Easing.quad),
        useNativeDriver: false,
      }),
    ]);
    animation.start();
    return () => animation.stop();
  }, [target, ms, x, width]);

  const pad = 2;
  const height = controlHeight(t, size);
  const inner = height - pad * 2;
  const fontSize =
    size === "small"
      ? t.fontSize.xs
      : size === "large"
        ? t.fontSize.md
        : t.fontSize.sm;
  const paddingX =
    size === "small"
      ? t.space["2"]
      : size === "large"
        ? t.space["4"]
        : t.space["3"];
  const primary = color === "primary";
  const thumbColor = primary
    ? t.colors["primary-color"]
    : t.colors["surface-elevated-color"];
  const selectedText = primary
    ? t.colors["text-inverse-color"]
    : t.colors["text-color"];
  const radius = t.radius.md;

  const onLayout = (index: number) => (event: LayoutChangeEvent) => {
    const { x: left, width: w } = event.nativeEvent.layout;
    setBoxes((prev) =>
      prev[index]?.x === left && prev[index]?.width === w
        ? prev
        : { ...prev, [index]: { x: left, width: w } },
    );
  };

  return (
    <View
      role="radiogroup"
      accessibilityLabel={accessibilityLabel ?? ariaLabel}
      accessibilityState={{ disabled }}
      {...part("segmented-control", "root", { size, color, disabled })}
      {...rest}
      style={[
        {
          flexDirection: "row",
          alignSelf: fullWidth ? "stretch" : "flex-start",
          padding: pad,
          borderRadius: radius,
          backgroundColor: t.colors["surface-muted-color"],
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      <Animated.View
        pointerEvents="none"
        importantForAccessibility="no-hide-descendants"
        accessibilityElementsHidden
        {...part("segmented-control", "indicator")}
        style={[
          {
            position: "absolute",
            top: pad,
            bottom: pad,
            left: 0,
            width,
            transform: [{ translateX: x }],
            borderRadius: Math.max(2, radius - pad),
            backgroundColor: thumbColor,
            opacity: target ? 1 : 0,
          },
          primary ? null : shadowStyle(t.shadows.sm),
        ]}
      />
      {items.map((item, index) => {
        const checked = index === selectedIndex;
        const itemDisabled = disabled || Boolean(item.disabled);
        const label =
          item.label ?? (item.icon !== undefined ? undefined : item.value);
        const textColor = checked
          ? selectedText
          : t.colors["text-secondary-color"];
        return (
          <Pressable
            key={item.value}
            accessibilityRole="radio"
            accessibilityLabel={
              item["aria-label"] ??
              (typeof label === "string" ? label : undefined)
            }
            accessibilityState={{ checked, disabled: itemDisabled }}
            aria-checked={checked}
            aria-disabled={itemDisabled}
            disabled={itemDisabled}
            onPress={() => {
              if (!checked) setValue(item.value);
            }}
            onLayout={onLayout(index)}
            hitSlop={hitSlopFor(t, inner)}
            {...part("segmented-control", "item", {
              selected: checked,
              disabled: itemDisabled,
            })}
            style={({ pressed }) => ({
              flexGrow: fullWidth ? 1 : 0,
              flexBasis: fullWidth ? 0 : "auto",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: t.space["1"],
              minHeight: inner,
              paddingHorizontal: paddingX,
              borderRadius: Math.max(2, radius - pad),
              opacity: item.disabled && !disabled ? 0.5 : pressed ? 0.7 : 1,
            })}
          >
            {item.icon !== undefined && item.icon !== null ? (
              <View
                importantForAccessibility="no-hide-descendants"
                accessibilityElementsHidden
                {...part("segmented-control", "icon")}
              >
                {isValidElement(item.icon) ? (
                  item.icon
                ) : (
                  <Text style={{ color: textColor, fontSize }}>
                    {item.icon}
                  </Text>
                )}
              </View>
            ) : null}
            {label !== undefined && label !== null ? (
              isValidElement(label) ? (
                <View {...part("segmented-control", "label")}>{label}</View>
              ) : (
                <Text
                  numberOfLines={1}
                  {...part("segmented-control", "label")}
                  style={{
                    color: textColor,
                    fontSize,
                    fontWeight: weight(t, "medium"),
                    ...(fonts.sans ? { fontFamily: fonts.sans } : null),
                  }}
                >
                  {label}
                </Text>
              )
            ) : null}
          </Pressable>
        );
      })}
    </View>
  );
}

export default SegmentedControl;
