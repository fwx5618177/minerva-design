import { isValidElement, type ReactNode } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  type GestureResponderEvent,
  type PressableProps,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import { useTheme } from "../../theme/MinervaProvider";
import { part } from "../../internal/parts";
import {
  colorRole,
  controlFontSize,
  hitSlopFor,
  weight,
  type NativeColor,
} from "../../internal/styles";

export type ButtonVariant = "solid" | "outline" | "ghost" | "link";
export type ButtonSize = "xsmall" | "small" | "medium" | "large" | "xlarge";

export interface ButtonProps extends Omit<
  PressableProps,
  "children" | "style" | "disabled" | "onPress"
> {
  /** Label: a string (rendered as Text) or any element */
  children?: ReactNode;
  /**
   * Semantic color of the button
   * @default "primary"
   */
  color?: NativeColor;
  /**
   * Visual style: `solid` (filled), `outline` (border only), `ghost`
   * (transparent, tinted while pressed) or `link` (text link look)
   * @default "solid"
   */
  variant?: ButtonVariant;
  /**
   * Button size (heights from the `--control-height-*` tokens)
   * @default "medium"
   */
  size?: ButtonSize;
  /**
   * Disables the button
   * @default false
   */
  disabled?: boolean;
  /**
   * Shows a spinner and ignores presses (`accessibilityState.busy`)
   * @default false
   */
  loading?: boolean;
  /** Text shown instead of the label while loading */
  loadingText?: ReactNode;
  /** Element rendered before the label */
  startIcon?: ReactNode;
  /** Element rendered after the label */
  endIcon?: ReactNode;
  /**
   * Stretches the button to the full width of its container
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Renders the button in its pressed / active state
   * @default false
   */
  active?: boolean;
  /**
   * Preset shape: `rounded` (theme radius), `square` (no radius) or
   * `circle` (pill; a square button when the label is an icon)
   * @default "rounded"
   */
  shape?: "square" | "rounded" | "circle";
  /** Called on press (not while disabled or loading) */
  onPress?: (event: GestureResponderEvent) => void;
  /** Style of the pressable container */
  style?: StyleProp<ViewStyle>;
  /** Style of the label text */
  textStyle?: StyleProp<TextStyle>;
}

const HEIGHT_STEP = {
  xsmall: "xs",
  small: "sm",
  medium: "md",
  large: "lg",
  xlarge: "xl",
} as const;

/**
 * A pressable button: solid / outline / ghost / link variants in every
 * semantic color, five sizes from the control-height tokens, loading and
 * disabled states. Small sizes extend their touch area to the minimum touch
 * target (`hitSlop`).
 */
export function Button({
  children,
  color = "primary",
  variant = "solid",
  size = "medium",
  disabled = false,
  loading = false,
  loadingText,
  startIcon,
  endIcon,
  fullWidth = false,
  active = false,
  shape = "rounded",
  onPress,
  style,
  textStyle,
  accessibilityLabel,
  accessibilityState,
  hitSlop,
  ...rest
}: ButtonProps) {
  const { tokens: t, fonts } = useTheme();
  const role = colorRole(t, color);
  const height = t.sizes[`control-height-${HEIGHT_STEP[size]}`];
  const paddingX = t.sizes[`control-padding-x-${HEIGHT_STEP[size]}`];
  const fontSize =
    size === "xsmall"
      ? t.fontSize.xs
      : size === "xlarge"
        ? t.fontSize.xl
        : controlFontSize(t, size === "large" ? "large" : size);
  const inactive = disabled || loading;
  const label = loading && loadingText !== undefined ? loadingText : children;
  const textual = typeof label === "string" || typeof label === "number";
  const iconOnly = !textual && isValidElement(label) && !startIcon && !endIcon;

  const radius =
    shape === "square"
      ? 0
      : shape === "circle"
        ? height
        : size === "xsmall" || size === "small"
          ? t.radius.md
          : t.radius.lg;

  const fill = (pressed: boolean): ViewStyle => {
    const down = pressed || active;
    switch (variant) {
      case "solid":
        return {
          backgroundColor: down ? role.pressed : role.solid,
          borderColor: down ? role.pressed : role.solid,
        };
      case "outline":
        return {
          backgroundColor: down ? role.subtle : "transparent",
          borderColor: role.border,
        };
      case "ghost":
        return {
          backgroundColor: down ? role.subtle : "transparent",
          borderColor: "transparent",
        };
      case "link":
        return { backgroundColor: "transparent", borderColor: "transparent" };
    }
  };
  const foreground =
    variant === "solid"
      ? role.onSolid
      : color === "neutral"
        ? t.colors["text-color"]
        : variant === "link"
          ? role.solid
          : role.text;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{
        ...accessibilityState,
        disabled: inactive,
        busy: loading,
        selected: active || undefined,
      }}
      disabled={inactive}
      onPress={onPress}
      hitSlop={hitSlop ?? hitSlopFor(t, height, iconOnly ? height : undefined)}
      {...part("button", "root", {
        color,
        variant: `variant-${variant}`,
        size,
        disabled: inactive,
        loading,
      })}
      {...rest}
      style={({ pressed }) => [
        {
          minHeight: variant === "link" ? undefined : height,
          minWidth: iconOnly ? height : undefined,
          paddingHorizontal: variant === "link" ? 0 : iconOnly ? 0 : paddingX,
          borderRadius: radius,
          borderWidth: variant === "link" ? 0 : 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          alignSelf: fullWidth ? "stretch" : "flex-start",
          gap: t.space["2"],
          opacity: disabled ? 0.5 : 1,
        },
        fill(pressed && !inactive),
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={foreground}
          {...part("button", "spinner")}
        />
      ) : (
        startIcon
      )}
      {textual ? (
        <Text
          numberOfLines={1}
          style={[
            {
              color: foreground,
              fontSize,
              fontWeight: weight(t, "semibold"),
              textDecorationLine: variant === "link" ? "underline" : "none",
              ...(fonts.sans ? { fontFamily: fonts.sans } : null),
            },
            textStyle,
          ]}
          {...part("button", "label")}
        >
          {label}
        </Text>
      ) : loading && iconOnly ? null : (
        label
      )}
      {loading ? null : endIcon}
    </Pressable>
  );
}
