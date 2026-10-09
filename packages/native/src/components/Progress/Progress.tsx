import { useEffect, useState, type ReactNode } from "react";
import {
  Animated,
  Easing,
  Platform,
  Text,
  View,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewProps,
  type ViewStyle,
} from "react-native";
import { useI18n, useTheme } from "../../theme/MinervaProvider";
import { part } from "../../internal/parts";
import {
  colorRole,
  textStyle,
  weight,
  type NativeColor,
} from "../../internal/styles";

export type ProgressVariant = "line" | "circle";
export type ProgressSize = "small" | "medium" | "large";

export interface ProgressProps extends Omit<ViewProps, "style" | "children"> {
  /**
   * Completion, from 0 to 100 (clamped); ignored while `indeterminate`
   * @default 0
   */
  value?: number;
  /**
   * Shape: a horizontal bar or a ring
   * @default "line"
   */
  variant?: ProgressVariant;
  /**
   * Color of the filled part
   * @default "primary"
   */
  color?: NativeColor;
  /**
   * Thickness of the bar / diameter of the ring
   * @default "medium"
   */
  size?: ProgressSize;
  /** Thickness of the bar or ring stroke in dp, overriding the size */
  strokeWidth?: number;
  /**
   * Shows the value as text (after the bar, inside the ring)
   * @default false
   */
  showValue?: boolean;
  /** Formats the shown value @default `${value}%` */
  format?: (value: number) => ReactNode;
  /** Visible label above the bar (beside the ring); also the accessible name */
  label?: ReactNode;
  /**
   * Unknown completion: an animated looping indicator without a value
   * @default false
   */
  indeterminate?: boolean;
  /** Style of the root view */
  style?: StyleProp<ViewStyle>;
}

const LINE = { small: 4, medium: 6, large: 10 } as const;
const RING = { small: 40, medium: 64, large: 96 } as const;
const RING_STROKE = { small: 4, medium: 6, large: 8 } as const;
const FONT = { small: "xs", medium: "sm", large: "md" } as const;
const nativeDriver = Platform.OS !== "web";

const clamp = (v: number) =>
  Math.min(100, Math.max(0, Number.isFinite(v) ? v : 0));

/** Endless 0 -> 1 loop (none under reduced motion) */
function useLoop(active: boolean, ms: number): Animated.Value {
  const [anim] = useState(() => new Animated.Value(0));
  useEffect(() => {
    if (!active || ms <= 0) return;
    const loop = Animated.loop(
      Animated.timing(anim, {
        toValue: 1,
        duration: ms,
        easing: Easing.linear,
        useNativeDriver: nativeDriver,
      }),
    );
    loop.start();
    return () => {
      loop.stop();
      anim.setValue(0);
    };
  }, [active, ms, anim]);
  return anim;
}

/**
 * A determinate or indeterminate progress indicator: a line or a ring (two
 * clipped half rings, no SVG), with an optional value text. Announced as a
 * progress bar with its value (min 0, max 100).
 */
export function Progress({
  value = 0,
  variant = "line",
  color = "primary",
  size = "medium",
  strokeWidth,
  showValue = false,
  format,
  label,
  indeterminate = false,
  style,
  accessibilityLabel,
  ...rest
}: ProgressProps) {
  const { tokens: t, fonts, reducedMotion } = useTheme();
  const { t: translate } = useI18n();
  const pct = clamp(value);
  const fill =
    color === "neutral"
      ? t.colors["text-secondary-color"]
      : colorRole(t, color).solid;
  const track = t.colors["surface-muted-color"];
  const animate = indeterminate && !reducedMotion;
  const loop = useLoop(animate, variant === "circle" ? 900 : 1400);
  const [width, setWidth] = useState(0);
  const valueText = format ? format(pct) : `${Math.round(pct)}%`;
  const name =
    accessibilityLabel ??
    (typeof label === "string" ? label : translate("progress.label"));
  const textual = (node: ReactNode) =>
    typeof node === "string" || typeof node === "number";

  const a11y = {
    accessible: true,
    accessibilityRole: "progressbar" as const,
    accessibilityLabel: name,
    accessibilityState: { busy: indeterminate || undefined },
    "aria-busy": indeterminate || undefined,
    "aria-valuemin": indeterminate ? undefined : 0,
    "aria-valuemax": indeterminate ? undefined : 100,
    "aria-valuenow": indeterminate ? undefined : Math.round(pct),
    accessibilityValue: indeterminate
      ? undefined
      : {
          min: 0,
          max: 100,
          now: Math.round(pct),
          text: textual(valueText) ? String(valueText) : undefined,
        },
  };

  const labelNode =
    label === undefined ? null : textual(label) ? (
      <Text
        style={[
          textStyle(t, FONT[size], fonts.sans),
          { color: t.colors["text-secondary-color"] },
        ]}
        {...part("progress", "label")}
      >
        {label}
      </Text>
    ) : (
      label
    );
  const valueNode = (big: boolean) =>
    textual(valueText) ? (
      <Text
        style={[
          textStyle(
            t,
            big ? (size === "large" ? "lg" : FONT[size]) : FONT[size],
            fonts.sans,
          ),
          {
            color: t.colors["text-color"],
            fontWeight: weight(t, big ? "semibold" : "medium"),
            fontVariant: ["tabular-nums"],
          },
        ]}
        {...part("progress", "value")}
      >
        {valueText}
      </Text>
    ) : (
      valueText
    );

  if (variant === "circle") {
    const diameter = RING[size];
    const stroke = strokeWidth ?? RING_STROKE[size];
    const half = diameter / 2;
    const ring: ViewStyle = {
      position: "absolute",
      top: 0,
      width: diameter,
      height: diameter,
      borderRadius: half,
      borderWidth: stroke,
    };
    const first = indeterminate ? 90 : Math.min(pct, 50) * 3.6;
    const second = indeterminate ? 0 : Math.max(0, pct - 50) * 3.6;
    const spin = loop.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    });
    return (
      <View
        {...a11y}
        {...part("progress", "root", { variant, color, size, indeterminate })}
        {...rest}
        style={[
          { flexDirection: "row", alignItems: "center", gap: t.space["3"] },
          style,
        ]}
      >
        <Animated.View
          style={{
            width: diameter,
            height: diameter,
            transform: animate ? [{ rotate: spin }] : [],
          }}
          {...part("progress", "track")}
        >
          <View style={[ring, { left: 0, borderColor: track }]} />
          {/* right half: 0 -> 180deg */}
          <View
            style={{
              position: "absolute",
              left: half,
              top: 0,
              width: half,
              height: diameter,
              overflow: "hidden",
            }}
          >
            <View
              style={[
                ring,
                {
                  left: -half,
                  borderColor: "transparent",
                  borderBottomColor: fill,
                  borderLeftColor: fill,
                  transform: [{ rotate: `${45 + first}deg` }],
                },
              ]}
              {...part("progress", "indicator")}
            />
          </View>
          {/* left half: 180 -> 360deg */}
          <View
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: half,
              height: diameter,
              overflow: "hidden",
            }}
          >
            <View
              style={[
                ring,
                {
                  left: 0,
                  borderColor: "transparent",
                  borderTopColor: fill,
                  borderRightColor: fill,
                  transform: [{ rotate: `${45 + second}deg` }],
                },
              ]}
            />
          </View>
          {showValue && !indeterminate && (
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: diameter,
                height: diameter,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {valueNode(true)}
            </View>
          )}
        </Animated.View>
        {labelNode}
      </View>
    );
  }

  const thickness = strokeWidth ?? LINE[size];
  const segment = Math.max(width * 0.35, 24);
  const slide = loop.interpolate({
    inputRange: [0, 1],
    outputRange: [-segment, Math.max(width, segment)],
  });
  return (
    <View
      {...a11y}
      {...part("progress", "root", { variant, color, size, indeterminate })}
      {...rest}
      style={[{ gap: t.space["1-5"], alignSelf: "stretch" }, style]}
    >
      {labelNode}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: t.space["2"],
        }}
      >
        <View
          onLayout={(e: LayoutChangeEvent) =>
            setWidth(e.nativeEvent.layout.width)
          }
          style={{
            flex: 1,
            height: thickness,
            borderRadius: thickness,
            backgroundColor: track,
            overflow: "hidden",
          }}
          {...part("progress", "track")}
        >
          {indeterminate ? (
            <Animated.View
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                width: animate ? segment : "40%",
                borderRadius: thickness,
                backgroundColor: fill,
                transform: animate ? [{ translateX: slide }] : [],
              }}
              {...part("progress", "indicator")}
            />
          ) : (
            <View
              style={{
                width: `${pct}%`,
                height: "100%",
                borderRadius: thickness,
                backgroundColor: fill,
              }}
              {...part("progress", "indicator")}
            />
          )}
        </View>
        {showValue && !indeterminate && valueNode(false)}
      </View>
    </View>
  );
}
