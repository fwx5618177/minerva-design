import type { ReactNode } from "react";
import {
  ActivityIndicator,
  Pressable,
  type GestureResponderEvent,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { useTheme } from "../../theme/MinervaProvider";
import { part } from "../../internal/parts";
import { useControllable } from "../../internal/useControllable";
import { colorRole, hitSlopFor, type NativeColor } from "../../internal/styles";

export type IconButtonVariant = "ghost" | "outline" | "solid";
export type IconButtonSize = "xsmall" | "small" | "medium" | "large";
export type IconButtonShape = "circle" | "square";
/** Renders an icon in the button's foreground color and icon size */
export type IconRender = (color: string, size: number) => ReactNode;

export interface IconButtonProps extends Omit<
  PressableProps,
  "children" | "style" | "disabled" | "onPress"
> {
  /**
   * Icon element to display (children are used when omitted), or a
   * function of the foreground color and icon size returning it
   */
  icon?: ReactNode | IconRender;
  /** Icon element (when `icon` is not set) */
  children?: ReactNode | IconRender;
  /**
   * Accessible name of the button (required: the button only shows an
   * icon)
   */
  label: string;
  /**
   * Semantic color of the button
   * @default "neutral"
   */
  color?: NativeColor;
  /**
   * Visual style: `ghost` (transparent, tinted while pressed), `solid`
   * (filled with the color) or `outline` (bordered)
   * @default "ghost"
   */
  variant?: IconButtonVariant;
  /**
   * Button size (the `--control-height-*` tokens); the touch area always
   * reaches 44pt
   * @default "medium"
   */
  size?: IconButtonSize;
  /**
   * Button shape
   * @default "circle"
   */
  shape?: IconButtonShape;
  /**
   * Disables the button
   * @default false
   */
  disabled?: boolean;
  /**
   * Replaces the icon with a spinner and ignores presses
   * @default false
   */
  loading?: boolean;
  /**
   * Pressed state of a toggle button (controlled; pair with
   * onPressedChange). Setting pressed, defaultPressed or onPressedChange
   * makes the button a toggle (`accessibilityState.selected`)
   */
  pressed?: boolean;
  /** Initial pressed state of an uncontrolled toggle button */
  defaultPressed?: boolean;
  /** Called with the requested pressed state of a toggle button */
  onPressedChange?: (pressed: boolean) => void;
  /** Called on press (not while disabled or loading) */
  onPress?: (event: GestureResponderEvent) => void;
  /** Style of the button */
  style?: StyleProp<ViewStyle>;
}

const HEIGHT_STEP = {
  xsmall: "xs",
  small: "sm",
  medium: "md",
  large: "lg",
} as const;

/**
 * IconButton: a square or round button showing only an icon, named by
 * `label`. Toggle mode (`pressed` / `defaultPressed` / `onPressedChange`)
 * announces the pressed state as selected.
 */
export function IconButton({
  icon,
  children,
  label,
  color = "neutral",
  variant = "ghost",
  size = "medium",
  shape = "circle",
  disabled = false,
  loading = false,
  pressed: pressedProp,
  defaultPressed,
  onPressedChange,
  onPress,
  style,
  accessibilityLabel,
  accessibilityState,
  hitSlop,
  ...rest
}: IconButtonProps) {
  const { tokens: t } = useTheme();
  const role = colorRole(t, color);
  const toggle =
    pressedProp !== undefined ||
    defaultPressed !== undefined ||
    onPressedChange !== undefined;
  const [on, setOn] = useControllable(
    pressedProp,
    defaultPressed ?? false,
    onPressedChange,
  );
  const active = toggle && on;
  const inactive = disabled || loading;
  const px = t.sizes[`control-height-${HEIGHT_STEP[size]}`];
  const glyph = icon ?? children;

  const fill = (down: boolean): ViewStyle => {
    switch (variant) {
      case "solid":
        return {
          backgroundColor: down || active ? role.pressed : role.solid,
          borderColor: "transparent",
        };
      case "outline":
        return {
          backgroundColor: down || active ? role.subtle : "transparent",
          borderColor: active ? role.solid : role.border,
        };
      case "ghost":
        return {
          backgroundColor: down || active ? role.subtle : "transparent",
          borderColor: "transparent",
        };
    }
  };
  const foreground =
    variant === "solid"
      ? role.onSolid
      : color === "neutral"
        ? active
          ? t.colors["primary-color"]
          : t.colors["text-color"]
        : role.text;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{
        ...accessibilityState,
        disabled: inactive,
        busy: loading,
        selected: toggle ? active : undefined,
      }}
      aria-disabled={inactive}
      aria-busy={loading}
      aria-selected={toggle ? active : undefined}
      disabled={inactive}
      onPress={(event) => {
        if (toggle) setOn(!on);
        onPress?.(event);
      }}
      hitSlop={hitSlop ?? hitSlopFor(t, px, px)}
      {...part("icon-button", "root", {
        color,
        variant,
        size,
        shape,
        pressed: active,
        disabled: inactive,
        loading,
      })}
      {...rest}
      style={({ pressed }) => [
        {
          width: px,
          height: px,
          borderRadius: shape === "circle" ? px / 2 : t.radius.md,
          borderWidth: 1,
          alignItems: "center",
          justifyContent: "center",
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
          {...part("icon-button", "spinner")}
        />
      ) : typeof glyph === "function" ? (
        glyph(foreground, Math.round(px * 0.5))
      ) : (
        glyph
      )}
    </Pressable>
  );
}
