import type { ReactNode } from "react";
import {
  StyleSheet,
  Text,
  View,
  type DimensionValue,
  type StyleProp,
  type TextStyle,
  type ViewProps,
  type ViewStyle,
} from "react-native";
import { useTheme } from "../../theme/MinervaProvider";
import { part } from "../../internal/parts";
import { shadowStyle } from "../../internal/styles";

export type DividerOrientation = "horizontal" | "vertical";
export type DividerVariant = "solid" | "dashed" | "dotted";

export interface DividerProps extends Omit<ViewProps, "style" | "children"> {
  /**
   * Divider direction
   * @default "horizontal"
   */
  orientation?: DividerOrientation;
  /**
   * Line style
   * @default "solid"
   */
  variant?: DividerVariant;
  /**
   * Line thickness in dp (1 renders a device hairline)
   * @default 1
   */
  thickness?: number;
  /**
   * Margin around the divider in dp (top / bottom when horizontal, left /
   * right when vertical)
   * @default 16
   */
  spacing?: number;
  /** Length of the line (width when horizontal, height when vertical) */
  length?: DimensionValue;
  /**
   * Position of the text of a horizontal divider
   * @default "center"
   */
  textAlign?: "left" | "center" | "right";
  /**
   * Adds a subtle shadow
   * @default false
   */
  elevation?: boolean;
  /** Text (or element) shown within a horizontal divider */
  children?: ReactNode;
  /** Style of the root view */
  style?: StyleProp<ViewStyle>;
  /** Style of the text */
  textStyle?: StyleProp<TextStyle>;
}

/**
 * Divider: a token-colored separator line (horizontal or vertical; solid,
 * dashed or dotted), optionally with a text label. `role="separator"`.
 */
export function Divider({
  orientation = "horizontal",
  variant = "solid",
  thickness = 1,
  spacing = 16,
  length,
  textAlign = "center",
  elevation = false,
  children,
  style,
  textStyle,
  ...rest
}: DividerProps) {
  const { tokens: t, fonts } = useTheme();
  const color = t.colors["border-color"];
  const vertical = orientation === "vertical";
  const size = thickness === 1 ? StyleSheet.hairlineWidth : thickness;

  // dashed / dotted: a bordered box clipped to one of its sides (iOS only
  // draws dashed borders on boxes with a border on every side)
  const line = (flex?: number, key?: string) => (
    <View
      key={key}
      {...part("divider", "line")}
      style={[
        vertical
          ? { width: size, height: length ?? "100%", alignSelf: "stretch" }
          : flex !== undefined
            ? { height: size, flex }
            : { height: size, width: length ?? "100%" },
        { overflow: "hidden" },
        variant === "solid" ? { backgroundColor: color } : null,
      ]}
    >
      {variant === "solid" ? null : (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: vertical ? -size : 0,
            bottom: vertical ? 0 : -size,
            borderWidth: Math.max(1, size),
            borderColor: color,
            borderStyle: variant,
          }}
        />
      )}
    </View>
  );

  const margin: ViewStyle = vertical
    ? { marginHorizontal: spacing }
    : { marginVertical: spacing };
  const hasText =
    !vertical &&
    children !== undefined &&
    children !== null &&
    children !== false;

  return (
    <View
      role="separator"
      aria-orientation={orientation}
      {...part("divider", "root", { orientation, variant })}
      {...rest}
      style={[
        margin,
        vertical
          ? {
              alignSelf: "stretch",
              minHeight: length === undefined ? t.space["4"] : undefined,
            }
          : { alignSelf: "stretch" },
        hasText && {
          flexDirection: "row",
          alignItems: "center",
          gap: t.space["3"],
        },
        elevation && shadowStyle(t.shadows.sm),
        style,
      ]}
    >
      {hasText ? (
        <>
          {line(
            textAlign === "left" ? 0.1 : textAlign === "right" ? 0.9 : 1,
            "start",
          )}
          {typeof children === "string" || typeof children === "number" ? (
            <Text
              style={[
                {
                  color: t.colors["text-secondary-color"],
                  fontSize: t.fontSize.sm,
                  ...(fonts.sans ? { fontFamily: fonts.sans } : null),
                },
                textStyle,
              ]}
              {...part("divider", "text")}
            >
              {children}
            </Text>
          ) : (
            children
          )}
          {line(
            textAlign === "left" ? 0.9 : textAlign === "right" ? 0.1 : 1,
            "end",
          )}
        </>
      ) : (
        line()
      )}
    </View>
  );
}
