import { useFormControlProps } from "../../internal/FormControlContext";
import { useEffect, useState, type ReactNode } from "react";
import {
  ActivityIndicator,
  Animated,
  Easing,
  Platform,
  Pressable,
  Text,
  View,
  type PressableProps,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import { createSwitchMachine } from "@minerva/core";
import { useTheme } from "../../theme/MinervaProvider";
import { bindFormControl } from "../../internal/formControl";
import { part } from "../../internal/parts";
import {
  colorRole,
  controlHeight,
  duration,
  hitSlopFor,
  shadowStyle,
  weight,
  type NativeSize,
  type SemanticColor,
} from "../../internal/styles";
import {
  ToggleLabel,
  placementStyle,
  type LabelPlacement,
} from "../../internal/toggleControl";
import { useMachine } from "../../internal/useMachine";

export type SwitchSize = NativeSize;
export type SwitchColor = SemanticColor;
export type SwitchShape = "round" | "square";
export type SwitchLabelPlacement = LabelPlacement;

export interface SwitchProps extends Omit<
  PressableProps,
  "children" | "style" | "disabled" | "onPress"
> {
  /** Whether the switch is on (controlled) */
  checked?: boolean;
  /**
   * Initial state (uncontrolled)
   * @default false
   */
  defaultChecked?: boolean;
  /** Called with the requested state */
  onChange?: (checked: boolean) => void;
  /**
   * Disables the switch
   * @default false
   */
  disabled?: boolean;
  /**
   * Shows a spinner in the thumb and blocks interaction
   * (`accessibilityState.busy`)
   * @default false
   */
  loading?: boolean;
  /**
   * Switch size (track height from the control-height tokens)
   * @default "medium"
   */
  size?: SwitchSize;
  /**
   * Semantic color of the "on" track
   * @default "primary"
   */
  color?: SwitchColor;
  /**
   * Shape of the track and thumb
   * @default "round"
   */
  shape?: SwitchShape;
  /** Label displayed next to the switch (a string also names it) */
  label?: ReactNode;
  /**
   * Position of the label relative to the switch
   * @default "end"
   */
  labelPlacement?: SwitchLabelPlacement;
  /** Text shown inside the track while on (e.g. "ON") */
  onLabel?: ReactNode;
  /** Text shown inside the track while off (e.g. "OFF") */
  offLabel?: ReactNode;
  /** Value of the switch (reported by forms) */
  value?: string;
  /** Style of the pressable root */
  style?: StyleProp<ViewStyle>;
  /** Style of the track */
  trackStyle?: StyleProp<ViewStyle>;
  /** Style of the thumb */
  thumbStyle?: StyleProp<ViewStyle>;
  /** Style of the label text */
  labelStyle?: StyleProp<TextStyle>;
}

const nativeDriver = Platform.OS !== "web";

/**
 * An on / off switch on the switch machine of @minerva/core, drawn with
 * views (themed by the tokens, unlike RN's platform Switch): animated
 * thumb (token duration, instant with reduced motion), on / off texts in
 * the track, loading state, semantic colors, three sizes.
 */
export function Switch(props: SwitchProps) {
  const {
    checked,
    defaultChecked = false,
    onChange,
    disabled = false,
    loading = false,
    size = "medium",
    color = "primary",
    shape = "round",
    label,
    labelPlacement = "end",
    onLabel,
    offLabel,
    value,
    style,
    trackStyle,
    thumbStyle,
    labelStyle,
    accessibilityState,
    hitSlop,
    ...rest
  } = useFormControlProps(props);
  const { tokens: t, fonts } = useTheme();
  const inactive = disabled || loading;
  const [state, send] = useMachine(createSwitchMachine, {
    checked,
    defaultChecked,
    disabled: inactive,
    onCheckedChange: onChange,
  });
  const on = state.checked;
  const [progress] = useState(() => new Animated.Value(on ? 1 : 0));
  const [trackWidth, setTrackWidth] = useState<number | null>(null);
  const ms = duration(t, "fast");

  useEffect(() => {
    const to = on ? 1 : 0;
    if (ms <= 0) {
      progress.setValue(to);
      return;
    }
    const animation = Animated.timing(progress, {
      toValue: to,
      duration: ms,
      easing: Easing.out(Easing.quad),
      useNativeDriver: nativeDriver,
    });
    animation.start();
    return () => animation.stop();
  }, [on, ms, progress]);

  const role = colorRole(t, color);
  const height = Math.round(controlHeight(t, size) * 0.64);
  const pad = 2;
  const thumb = height - pad * 2;
  const hasTexts = onLabel !== undefined || offLabel !== undefined;
  const baseWidth = Math.round(height * 1.75);
  const width = Math.max(baseWidth, trackWidth ?? 0);
  const travel = width - thumb - pad * 2;
  const radius = shape === "round" ? height / 2 : t.radius.sm;
  const thumbRadius =
    shape === "round" ? thumb / 2 : Math.max(2, t.radius.sm - pad);
  const textStyle: TextStyle = {
    color: on ? role.onSolid : t.colors["text-secondary-color"],
    fontSize: size === "large" ? t.fontSize.sm : t.fontSize.xs,
    fontWeight: weight(t, "medium"),
    ...(fonts.sans ? { fontFamily: fonts.sans } : null),
  };
  const trackText = on ? onLabel : offLabel;

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{
        ...accessibilityState,
        checked: on,
        disabled: inactive,
        busy: loading,
      }}
      aria-checked={on}
      aria-disabled={inactive}
      aria-busy={loading}
      disabled={inactive}
      onPress={() => send({ type: "TOGGLE" })}
      hitSlop={hitSlop ?? hitSlopFor(t, height, width)}
      {...part("switch", "root", {
        checked: on,
        disabled,
        loading,
        size,
        color,
        shape,
        value,
      })}
      {...rest}
      style={[
        placementStyle(labelPlacement),
        { gap: t.space["2-5"], opacity: disabled ? 0.5 : 1 },
        style,
      ]}
    >
      {({ pressed }) => (
        <>
          <View
            onLayout={
              hasTexts
                ? (event) => setTrackWidth(event.nativeEvent.layout.width)
                : undefined
            }
            style={[
              {
                minWidth: baseWidth,
                height,
                borderRadius: radius,
                backgroundColor: t.colors["border-strong-color"],
                overflow: "hidden",
                justifyContent: "center",
                paddingLeft: on ? t.space["2"] : thumb + pad + t.space["1"],
                paddingRight: on ? thumb + pad + t.space["1"] : t.space["2"],
              },
              trackStyle,
            ]}
            {...part("switch", "track", { checked: on })}
          >
            <Animated.View
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: pressed ? role.pressed : role.solid,
                opacity: progress,
              }}
              {...part("switch", "fill")}
            />
            {hasTexts ? (
              <View
                accessible={false}
                importantForAccessibility="no-hide-descendants"
                accessibilityElementsHidden
                {...part("switch", "track-label")}
              >
                {typeof trackText === "string" ||
                typeof trackText === "number" ? (
                  <Text numberOfLines={1} style={textStyle}>
                    {trackText}
                  </Text>
                ) : (
                  trackText
                )}
              </View>
            ) : null}
            <Animated.View
              style={[
                {
                  position: "absolute",
                  top: pad,
                  left: pad,
                  width: thumb,
                  height: thumb,
                  borderRadius: thumbRadius,
                  backgroundColor: t.colors["surface-elevated-color"],
                  alignItems: "center",
                  justifyContent: "center",
                  transform: [
                    {
                      translateX: progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, travel],
                      }),
                    },
                  ],
                  ...shadowStyle(t.shadows.sm),
                },
                thumbStyle,
              ]}
              {...part("switch", "thumb")}
            >
              {loading ? (
                <ActivityIndicator
                  size="small"
                  color={on ? role.solid : t.colors["text-muted-color"]}
                  style={{ transform: [{ scale: thumb / 24 }] }}
                  {...part("switch", "spinner")}
                />
              ) : null}
            </Animated.View>
          </View>
          <ToggleLabel
            t={t}
            component="switch"
            size={size}
            disabled={disabled}
            fontFamily={fonts.sans}
            style={labelStyle}
          >
            {label}
          </ToggleLabel>
        </>
      )}
    </Pressable>
  );
}

bindFormControl(Switch, {
  valuePropName: "checked",
  emptyValue: false,
  commitOnChange: true,
  invalidPropName: null,
  requiredKey: "validation.checkMissing",
});
