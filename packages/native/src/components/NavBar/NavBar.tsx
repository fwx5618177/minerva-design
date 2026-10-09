import type { ReactNode } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type GestureResponderEvent,
  type StyleProp,
  type TextStyle,
  type ViewProps,
  type ViewStyle,
} from "react-native";
import { useI18n, useInsets, useTheme } from "../../theme/MinervaProvider";
import { Icon } from "../../internal/Icon";
import { part } from "../../internal/parts";
import { hitSlopFor, textStyle, weight } from "../../internal/styles";

export interface NavBarProps extends Omit<ViewProps, "style" | "children"> {
  /** Title in the middle (a string is rendered as a header Text) */
  title?: ReactNode;
  /** Text of the left (back) button */
  leftText?: ReactNode;
  /**
   * Shows a back chevron in the left button
   * @default false
   */
  leftArrow?: boolean;
  /** Custom left content, replacing the back button */
  left?: ReactNode;
  /** Text of the right button (pressable with `onPressRight`) */
  rightText?: ReactNode;
  /** Custom right content (e.g. icon buttons), replacing `rightText` */
  right?: ReactNode;
  /** Called by the left (back) button */
  onBack?: (event: GestureResponderEvent) => void;
  /** Called by the right text button */
  onPressRight?: (event: GestureResponderEvent) => void;
  /**
   * Accessible label of the back button
   * @default `leftText` when a string, else the "navBar.back" message
   */
  backLabel?: string;
  /**
   * Pads the bar with the top safe-area inset (status bar / notch) of
   * `MinervaProvider`
   * @default true
   */
  safeAreaInsetTop?: boolean;
  /**
   * Hairline border under the bar
   * @default true
   */
  border?: boolean;
  /** Style of the bar */
  style?: StyleProp<ViewStyle>;
  /** Style of the title text */
  titleStyle?: StyleProp<TextStyle>;
}

/**
 * Top app bar of a screen: a back button (chevron and / or text), a
 * centered title (`header` role) and right actions. Pads itself with the
 * top safe-area inset and shows a hairline border.
 */
export function NavBar({
  title,
  leftText,
  leftArrow = false,
  left,
  rightText,
  right,
  onBack,
  onPressRight,
  backLabel,
  safeAreaInsetTop = true,
  border = true,
  style,
  titleStyle,
  accessibilityLabel,
  ...rest
}: NavBarProps) {
  const { tokens: t, fonts } = useTheme();
  const { t: translate } = useI18n();
  const insets = useInsets();
  const height = t.sizes["control-height-lg"];
  const buttonHeight = height - t.space["2"] * 2;
  const sans = fonts.sans;
  const accent = t.colors["primary-color"];
  const sideText = (pressed: boolean): TextStyle => ({
    ...textStyle(t, "md", sans),
    color: accent,
    opacity: pressed ? 0.6 : 1,
  });
  const titleText =
    typeof title === "string" || typeof title === "number"
      ? String(title)
      : undefined;
  const hasBack = leftArrow || leftText !== undefined;
  const leftLabel =
    backLabel ??
    (typeof leftText === "string" ? leftText : translate("navBar.back"));

  return (
    <View
      role="toolbar"
      accessibilityLabel={accessibilityLabel ?? titleText}
      {...part("nav-bar", "root")}
      {...rest}
      style={[
        {
          backgroundColor: t.colors["surface-color"],
          paddingTop: safeAreaInsetTop ? insets.top : 0,
          borderBottomWidth: border ? StyleSheet.hairlineWidth : 0,
          borderBottomColor: t.colors["border-color"],
        },
        style,
      ]}
    >
      <View
        style={{
          height,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: t.space["2"],
        }}
      >
        <View
          style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
          {...part("nav-bar", "left")}
        >
          {left ??
            (hasBack ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={leftLabel}
                onPress={onBack}
                hitSlop={hitSlopFor(t, buttonHeight, buttonHeight)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  minHeight: buttonHeight,
                  minWidth: buttonHeight,
                  paddingHorizontal: t.space["2"],
                  gap: t.space["1"],
                }}
                {...part("nav-bar", "back")}
              >
                {({ pressed }) => (
                  <>
                    {leftArrow && (
                      <Icon
                        name="chevron-left"
                        size={18}
                        color={accent}
                        style={{ opacity: pressed ? 0.6 : 1 }}
                      />
                    )}
                    {leftText !== undefined &&
                      (typeof leftText === "string" ||
                      typeof leftText === "number" ? (
                        <Text numberOfLines={1} style={sideText(pressed)}>
                          {leftText}
                        </Text>
                      ) : (
                        leftText
                      ))}
                  </>
                )}
              </Pressable>
            ) : null)}
        </View>
        <View
          style={{ flex: 2, alignItems: "center", justifyContent: "center" }}
        >
          {titleText !== undefined ? (
            <Text
              accessibilityRole="header"
              numberOfLines={1}
              style={[
                textStyle(t, "lg", sans),
                { fontWeight: weight(t, "semibold") },
                titleStyle,
              ]}
              {...part("nav-bar", "title")}
            >
              {titleText}
            </Text>
          ) : (
            title
          )}
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
          {...part("nav-bar", "right")}
        >
          {right ??
            (rightText !== undefined ? (
              <Pressable
                accessibilityRole="button"
                onPress={onPressRight}
                hitSlop={hitSlopFor(t, buttonHeight, buttonHeight)}
                style={{
                  minHeight: buttonHeight,
                  minWidth: buttonHeight,
                  justifyContent: "center",
                  paddingHorizontal: t.space["2"],
                }}
                {...part("nav-bar", "right-button")}
              >
                {({ pressed }) =>
                  typeof rightText === "string" ||
                  typeof rightText === "number" ? (
                    <Text numberOfLines={1} style={sideText(pressed)}>
                      {rightText}
                    </Text>
                  ) : (
                    rightText
                  )
                }
              </Pressable>
            ) : null)}
        </View>
      </View>
    </View>
  );
}
