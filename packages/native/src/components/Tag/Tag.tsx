import { Children, type ReactNode } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  View,
  type GestureResponderEvent,
  type StyleProp,
  type TextStyle,
  type ViewProps,
  type ViewStyle,
} from "react-native";
import { useI18n, useTheme } from "../../theme/MinervaProvider";
import { part } from "../../internal/parts";
import { Icon } from "../../internal/Icon";
import { useControllable } from "../../internal/useControllable";
import {
  colorRole,
  hitSlopFor,
  shadowStyle,
  weight,
  type NativeColor,
} from "../../internal/styles";

export type TagVariant = "solid" | "subtle" | "outline";
export type TagSize = "small" | "medium" | "large";
export type TagShape = "rounded" | "square" | "circle";

export interface TagProps extends Omit<ViewProps, "style" | "children"> {
  /** Label: a string (rendered as Text) or any element */
  children?: ReactNode;
  /**
   * Semantic color of the tag
   * @default "neutral"
   */
  color?: NativeColor;
  /**
   * Visual style: `subtle` (tinted background), `outline` (tinted
   * background with a border) or `solid` (filled)
   * @default "subtle"
   */
  variant?: TagVariant;
  /**
   * Tag size
   * @default "medium"
   */
  size?: TagSize;
  /**
   * Tag shape
   * @default "rounded"
   */
  shape?: TagShape;
  /**
   * Shows a close button
   * @default false
   */
  closable?: boolean;
  /** Called when the close button is pressed */
  onClose?: (event: GestureResponderEvent) => void;
  /** Accessible label of the close button, or a function of the tag's text */
  closeLabel?: string | ((label: string) => string);
  /** Custom close icon */
  closeIcon?: ReactNode;
  /**
   * Makes the tag pressable (`accessibilityRole="button"`); implied by
   * `onPress`, `pressed` and `defaultPressed`
   * @default false
   */
  clickable?: boolean;
  /** Called when the tag is pressed */
  onPress?: (event: GestureResponderEvent) => void;
  /**
   * Pressed (selected) state of a toggle tag, e.g. a selectable filter
   * (controlled; pair with onPressedChange)
   */
  pressed?: boolean;
  /** Initial pressed state of an uncontrolled toggle tag */
  defaultPressed?: boolean;
  /** Called with the requested pressed state of a toggle tag */
  onPressedChange?: (pressed: boolean) => void;
  /**
   * Disables the tag and its close button
   * @default false
   */
  disabled?: boolean;
  /**
   * Shows a spinner instead of the icon, marks the tag busy and blocks its
   * action; the close button is hidden
   * @default false
   */
  loading?: boolean;
  /** Icon displayed before the content */
  icon?: ReactNode;
  /** Avatar (e.g. a small Avatar) displayed before the content */
  avatar?: ReactNode;
  /**
   * Shows a shadow
   * @default false
   */
  elevation?: boolean;
  /** Style of the tag */
  style?: StyleProp<ViewStyle>;
  /** Style of the label text */
  textStyle?: StyleProp<TextStyle>;
}

const textOf = (node: ReactNode): string =>
  Children.toArray(node)
    .map((child) =>
      typeof child === "string" || typeof child === "number"
        ? String(child)
        : "",
    )
    .join("");

/**
 * Tag: a compact label (status, category, filter chip). Optionally
 * pressable, a toggle (`pressed`, announced as selected), closable (a
 * labelled close button with a 44pt touch target) or loading.
 */
export function Tag({
  children,
  color = "neutral",
  variant = "subtle",
  size = "medium",
  shape = "rounded",
  closable = false,
  onClose,
  closeLabel,
  closeIcon,
  clickable = false,
  onPress,
  pressed: pressedProp,
  defaultPressed,
  onPressedChange,
  disabled = false,
  loading = false,
  icon,
  avatar,
  elevation = false,
  accessibilityLabel,
  accessibilityState,
  style,
  textStyle,
  ...rest
}: TagProps) {
  const { tokens: t, fonts } = useTheme();
  const { t: tr } = useI18n();
  const toggle =
    pressedProp !== undefined ||
    defaultPressed !== undefined ||
    onPressedChange !== undefined;
  const [pressedState, setPressed] = useControllable(
    pressedProp,
    defaultPressed ?? false,
    onPressedChange,
  );
  const selected = toggle && pressedState;
  const interactive = clickable || toggle || onPress !== undefined;
  const inactive = disabled || loading;
  // a selected toggle tag looks solid
  const look: TagVariant = selected ? "solid" : variant;
  const role = colorRole(
    t,
    selected && color === "neutral" ? "primary" : color,
  );

  const height =
    size === "small"
      ? t.space["5"]
      : size === "large"
        ? t.sizes["control-height-xs"]
        : t.space["6"];
  const fontSize =
    size === "small"
      ? t.fontSize.xs
      : size === "large"
        ? t.fontSize.md
        : t.fontSize.sm;
  const radius =
    shape === "circle"
      ? height
      : shape === "square"
        ? t.radius.none
        : t.radius.sm;
  const label = textOf(children);

  const surface = (down: boolean): ViewStyle =>
    look === "solid"
      ? {
          backgroundColor: down ? role.pressed : role.solid,
          borderColor: down ? role.pressed : role.solid,
        }
      : look === "outline"
        ? {
            backgroundColor: down ? role.border : role.subtle,
            borderColor: role.border,
          }
        : {
            backgroundColor: down ? role.border : role.subtle,
            borderColor: down ? role.border : role.subtle,
          };
  const foreground =
    look === "solid"
      ? role.onSolid
      : color === "neutral"
        ? t.colors["text-color"]
        : role.text;

  const closeText =
    typeof closeLabel === "function"
      ? closeLabel(label)
      : (closeLabel ??
        (label ? tr("tag.closeWithLabel", { label }) : tr("tag.close")));
  const glyph = Math.round(fontSize * 0.85);

  const content = (
    <>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={foreground}
          style={{ transform: [{ scale: 0.7 }], width: glyph, height: glyph }}
          {...part("tag", "spinner")}
        />
      ) : (
        (avatar ?? icon)
      )}
      {typeof children === "string" || typeof children === "number" ? (
        <Text
          numberOfLines={1}
          style={[
            {
              color: foreground,
              fontSize,
              lineHeight: Math.round(fontSize * 1.3),
              fontWeight: weight(t, "medium"),
              ...(fonts.sans ? { fontFamily: fonts.sans } : null),
            },
            textStyle,
          ]}
          {...part("tag", "label")}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </>
  );

  const box = (down: boolean): StyleProp<ViewStyle> => [
    {
      minHeight: height,
      paddingHorizontal: t.space[size === "large" ? "3" : "2"],
      borderRadius: radius,
      borderWidth: 1,
      flexDirection: "row",
      alignItems: "center",
      gap: t.space["1"],
    },
    surface(down),
    elevation && shadowStyle(t.shadows.sm),
  ];

  const closeButton =
    closable && !loading ? (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={closeText}
        accessibilityState={{ disabled }}
        aria-disabled={disabled}
        disabled={disabled}
        onPress={onClose}
        hitSlop={hitSlopFor(t, height, glyph + t.space["1"] * 2)}
        {...part("tag", "close")}
        style={({ pressed }) => ({
          marginRight: -t.space["1"],
          padding: t.space["0-5"],
          borderRadius: t.radius.full,
          opacity: pressed ? 0.6 : 1,
        })}
      >
        {closeIcon ?? <Icon name="close" size={glyph} color={foreground} />}
      </Pressable>
    ) : null;

  const rootPart = part("tag", "root", {
    color,
    variant,
    size,
    shape,
    pressed: selected,
    disabled,
    loading,
  });

  if (!interactive) {
    return (
      <View
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{
          ...accessibilityState,
          disabled: disabled || undefined,
          busy: loading || undefined,
        }}
        {...rootPart}
        {...rest}
        style={[
          box(false),
          { alignSelf: "flex-start", opacity: disabled ? 0.5 : 1 },
          style,
        ]}
      >
        {content}
        {closeButton}
      </View>
    );
  }

  // Pressable tag: the label is the button, the close button its sibling
  // (a button inside a button is not reachable by screen readers)
  return (
    <View
      {...rootPart}
      {...rest}
      style={[
        { flexDirection: "row", alignSelf: "flex-start", alignItems: "center" },
        { opacity: disabled ? 0.5 : 1 },
        style,
      ]}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{
          ...accessibilityState,
          disabled: inactive,
          busy: loading,
          selected: toggle ? selected : undefined,
        }}
        aria-disabled={inactive}
        aria-busy={loading}
        aria-selected={toggle ? selected : undefined}
        disabled={inactive}
        onPress={(event) => {
          if (toggle) setPressed(!pressedState);
          onPress?.(event);
        }}
        hitSlop={hitSlopFor(t, height)}
        {...part("tag", "content")}
        style={({ pressed }) => [
          box(pressed && !inactive),
          closeButton ? { paddingRight: t.space["7"] } : null,
        ]}
      >
        {content}
      </Pressable>
      {closeButton ? (
        <View
          style={{
            position: "absolute",
            right: t.space["2"],
            top: 0,
            bottom: 0,
            justifyContent: "center",
          }}
        >
          {closeButton}
        </View>
      ) : null}
    </View>
  );
}
