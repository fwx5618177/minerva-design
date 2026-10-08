import type { ReactNode } from "react";
import {
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewProps,
  type ViewStyle,
} from "react-native";
import { useI18n, useTheme } from "../../theme/MinervaProvider";
import { part } from "../../internal/parts";
import { colorRole, weight, type NativeColor } from "../../internal/styles";

export type BadgeVariant = "solid" | "subtle" | "outline";
export type BadgeSize = "small" | "medium" | "large";
export type BadgePosition =
  "top-right" | "top-left" | "bottom-right" | "bottom-left";

export interface BadgeProps extends Omit<ViewProps, "style" | "children"> {
  /**
   * Content of the badge: a count (capped at `max`) or a short text. When
   * omitted, `children` is the badge content of a standalone badge
   */
  content?: ReactNode;
  /**
   * Counts above it show as `{max}+`
   * @default 99
   */
  max?: number;
  /**
   * Renders a small dot instead of content
   * @default false
   */
  dot?: boolean;
  /**
   * Shows the badge when the count is 0
   * @default false
   */
  showZero?: boolean;
  /**
   * Semantic color of the badge
   * @default "primary"
   */
  color?: NativeColor;
  /**
   * Visual style: `solid` (filled), `subtle` (tinted background) or
   * `outline` (bordered)
   * @default "solid"
   */
  variant?: BadgeVariant;
  /**
   * Badge size
   * @default "medium"
   */
  size?: BadgeSize;
  /**
   * Corner of the children the badge is placed on (ignored by standalone
   * badges)
   * @default "top-right"
   */
  position?: BadgePosition;
  /** Extra offset `[x, y]` of an attached badge, in dp (x moves inwards) */
  offset?: [number, number];
  /** Icon displayed before the content */
  icon?: ReactNode;
  /**
   * The element the badge is attached to. Without `content` / `dot`, a
   * string child is the content of a standalone badge
   */
  children?: ReactNode;
  /** Accessible label of the badge, e.g. "5 unread messages" */
  "aria-label"?: string;
  /** Style of the root view */
  style?: StyleProp<ViewStyle>;
  /** Style of the badge itself */
  badgeStyle?: StyleProp<ViewStyle>;
  /** Style of the content text */
  textStyle?: StyleProp<TextStyle>;
}

const isText = (node: ReactNode) =>
  typeof node === "string" || typeof node === "number";

/**
 * Badge: a count, short text or dot, standalone or on a corner of its
 * children (an icon, an avatar...). Announced as a status with its content
 * (dots: the localized "Badge").
 */
export function Badge({
  content,
  max = 99,
  dot = false,
  showZero = false,
  color = "primary",
  variant = "solid",
  size = "medium",
  position = "top-right",
  offset,
  icon,
  children,
  "aria-label": ariaLabel,
  accessibilityLabel,
  style,
  badgeStyle,
  textStyle,
  ...rest
}: BadgeProps) {
  const { tokens: t, fonts } = useTheme();
  const { t: tr } = useI18n();
  const role = colorRole(t, color);

  // `<Badge>New</Badge>`: standalone badge whose content is the text child
  const standalone =
    children === undefined ||
    children === null ||
    (content === undefined && !dot && isText(children));
  const value = content === undefined && standalone ? children : content;

  const display = typeof value === "number" && value > max ? `${max}+` : value;
  const hidden =
    !dot &&
    (value === undefined ||
      value === null ||
      value === false ||
      value === "" ||
      (value === 0 && !showZero));

  const height =
    size === "small"
      ? t.space["4"]
      : size === "large"
        ? t.space["6"]
        : t.space["5"];
  const dotSize =
    size === "small"
      ? t.space["1-5"]
      : size === "large"
        ? t.space["2-5"]
        : t.space["2"];
  const fontSize =
    size === "small"
      ? Math.round(t.fontSize.xs * 0.85)
      : size === "large"
        ? t.fontSize.sm
        : t.fontSize.xs;

  const colors: ViewStyle =
    variant === "solid"
      ? { backgroundColor: role.solid, borderColor: role.solid }
      : variant === "subtle"
        ? { backgroundColor: role.subtle, borderColor: role.subtle }
        : {
            backgroundColor: t.colors["surface-color"],
            borderColor: role.border,
          };
  const foreground =
    variant === "solid"
      ? role.onSolid
      : color === "neutral"
        ? t.colors["text-color"]
        : role.text;

  const label =
    accessibilityLabel ??
    ariaLabel ??
    (dot || !isText(display) ? tr("badge.default") : String(display));

  const attached = !standalone;
  const vertical = position.startsWith("top") ? "top" : "bottom";
  const horizontal = position.endsWith("right") ? "right" : "left";
  const anchor = (dot ? dotSize : height) / 2;
  const [dx, dy] = offset ?? [0, 0];
  const placement: ViewStyle | null = attached
    ? {
        position: "absolute",
        zIndex: 1,
        [vertical]: -anchor + dy,
        [horizontal]: -anchor + dx,
        // a ring separating a filled badge from the element below
        ...(variant === "outline"
          ? null
          : { borderColor: t.colors["surface-color"] }),
      }
    : null;

  const badge = hidden ? null : (
    <View
      role="status"
      accessible
      accessibilityLabel={label}
      {...part("badge", "badge", {
        color,
        variant,
        size,
        dot,
        position: attached ? position : undefined,
      })}
      {...(attached ? null : rest)}
      style={[
        dot
          ? { width: dotSize, height: dotSize, borderRadius: dotSize }
          : {
              minWidth: height,
              height,
              borderRadius: height,
              paddingHorizontal: t.space[size === "large" ? "2" : "1-5"],
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: t.space["1"],
            },
        { borderWidth: 1 },
        colors,
        placement,
        !attached && { alignSelf: "flex-start" },
        badgeStyle,
        !attached && style,
      ]}
    >
      {dot ? null : (
        <>
          {icon}
          {isText(display) ? (
            <Text
              numberOfLines={1}
              allowFontScaling={false}
              style={[
                {
                  color: foreground,
                  fontSize,
                  lineHeight: Math.round(fontSize * 1.2),
                  fontWeight: weight(t, "semibold"),
                  fontVariant: ["tabular-nums"],
                  ...(fonts.sans ? { fontFamily: fonts.sans } : null),
                },
                textStyle,
              ]}
              {...part("badge", "content")}
            >
              {display}
            </Text>
          ) : (
            display
          )}
        </>
      )}
    </View>
  );

  if (!attached) return badge;
  return (
    <View
      {...part("badge", "root", { position })}
      {...rest}
      style={[{ position: "relative", alignSelf: "flex-start" }, style]}
    >
      {children}
      {badge}
    </View>
  );
}
