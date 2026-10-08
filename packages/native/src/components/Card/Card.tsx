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
import { useTheme } from "../../theme/MinervaProvider";
import { part } from "../../internal/parts";
import { shadowStyle, textStyle, weight } from "../../internal/styles";

export type CardVariant =
  "default" | "elevated" | "filled" | "ghost" | "outline";
export type CardPadding = "none" | "small" | "medium" | "large";

export interface CardProps extends Omit<ViewProps, "style" | "children"> {
  /**
   * Visual style: bordered (`default`, `outline` with a stronger border),
   * shadowed (`elevated`), a muted block (`filled`) or borderless (`ghost`)
   * @default "default"
   */
  variant?: CardVariant;
  /**
   * Inner padding of the header, body and footer
   * @default "medium"
   */
  padding?: CardPadding;
  /**
   * Pressable card (`accessibilityRole="button"`, pressed feedback);
   * implied by `onPress`
   * @default false
   */
  interactive?: boolean;
  /** Called when an interactive card is pressed */
  onPress?: (event: GestureResponderEvent) => void;
  /**
   * Disables an interactive card
   * @default false
   */
  disabled?: boolean;
  /** Title of the header */
  title?: ReactNode;
  /** Supporting text under the title */
  description?: ReactNode;
  /** Content at the end of the header (action, tag, menu button...) */
  extra?: ReactNode;
  /** Media shown flush at the top of the card (e.g. an Image) */
  cover?: ReactNode;
  /** Footer below a hairline (actions, meta) */
  footer?: ReactNode;
  /** Body content */
  children?: ReactNode;
  /** Style of the card */
  style?: StyleProp<ViewStyle>;
  /** Style of the body */
  contentStyle?: StyleProp<ViewStyle>;
  /** Style of the title text */
  titleStyle?: StyleProp<TextStyle>;
}

const PAD = { none: "0", small: "3", medium: "4", large: "6" } as const;

const isText = (node: ReactNode) =>
  typeof node === "string" || typeof node === "number";

/**
 * Card: a surface grouping related content (cover, header with title /
 * description / extra, body, footer). Interactive cards are buttons with a
 * pressed state.
 */
export function Card({
  variant = "default",
  padding = "medium",
  interactive = false,
  onPress,
  disabled = false,
  title,
  description,
  extra,
  cover,
  footer,
  children,
  style,
  contentStyle,
  titleStyle,
  accessibilityState,
  ...rest
}: CardProps) {
  const { tokens: t, fonts } = useTheme();
  const pad = t.space[PAD[padding]];
  const pressable = interactive || onPress !== undefined;
  const font = fonts.sans;

  const surface = (pressed: boolean): ViewStyle => {
    const base: ViewStyle = {
      borderRadius: variant === "ghost" ? t.radius.lg : t.radius.xl,
      overflow: variant === "elevated" ? "visible" : "hidden",
    };
    switch (variant) {
      case "default":
        return {
          ...base,
          backgroundColor: pressed
            ? t.colors["hover-color"]
            : t.colors["surface-color"],
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: t.colors["border-color"],
        };
      case "outline":
        return {
          ...base,
          backgroundColor: pressed ? t.colors["hover-color"] : "transparent",
          borderWidth: 1,
          borderColor: t.colors["border-strong-color"],
        };
      case "elevated":
        return {
          ...base,
          backgroundColor: pressed
            ? t.colors["surface-muted-color"]
            : t.colors["surface-elevated-color"],
          ...shadowStyle(pressed ? t.shadows.sm : t.shadows.md),
        };
      case "filled":
        return {
          ...base,
          backgroundColor: pressed
            ? t.colors["hover-color"]
            : t.colors["surface-muted-color"],
        };
      case "ghost":
        return {
          ...base,
          backgroundColor: pressed ? t.colors["hover-color"] : "transparent",
        };
    }
  };

  const header =
    title !== undefined || description !== undefined || extra !== undefined ? (
      <View
        {...part("card", "header")}
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          gap: t.space["3"],
          paddingHorizontal: pad,
          paddingTop: pad,
        }}
      >
        <View style={{ flex: 1, gap: t.space["1"] }}>
          {isText(title) ? (
            <Text
              accessibilityRole="header"
              style={[
                {
                  ...textStyle(t, "lg", font),
                  fontWeight: weight(t, "semibold"),
                },
                titleStyle,
              ]}
              {...part("card", "title")}
            >
              {title}
            </Text>
          ) : (
            title
          )}
          {isText(description) ? (
            <Text
              style={{
                ...textStyle(t, "sm", font),
                color: t.colors["text-secondary-color"],
              }}
              {...part("card", "description")}
            >
              {description}
            </Text>
          ) : (
            description
          )}
        </View>
        {extra !== undefined ? (
          <View {...part("card", "extra")}>{extra}</View>
        ) : null}
      </View>
    ) : null;

  const body =
    children !== undefined && children !== null ? (
      <View
        {...part("card", "body")}
        style={[{ paddingHorizontal: pad, paddingTop: pad }, contentStyle]}
      >
        {isText(children) ? (
          <Text style={textStyle(t, "md", font)}>{children}</Text>
        ) : (
          children
        )}
      </View>
    ) : null;

  const footerView =
    footer !== undefined ? (
      <View
        {...part("card", "footer")}
        style={{
          marginTop: pad,
          paddingHorizontal: pad,
          paddingTop: padding === "none" ? 0 : t.space["3"],
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: t.colors["border-color"],
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: t.space["2"],
        }}
      >
        {isText(footer) ? (
          <Text
            style={{
              ...textStyle(t, "sm", font),
              color: t.colors["text-secondary-color"],
            }}
          >
            {footer}
          </Text>
        ) : (
          footer
        )}
      </View>
    ) : null;

  const content = (
    <>
      {cover !== undefined ? (
        <View
          {...part("card", "cover")}
          style={
            variant === "elevated"
              ? {
                  overflow: "hidden",
                  borderTopLeftRadius: t.radius.xl,
                  borderTopRightRadius: t.radius.xl,
                }
              : undefined
          }
        >
          {cover}
        </View>
      ) : null}
      {header}
      {body}
      {footerView}
      {/* bottom padding of the last section */}
      <View style={{ height: pad }} />
    </>
  );

  const rootPart = part("card", "root", {
    variant,
    padding,
    interactive: pressable,
    disabled: pressable && disabled,
  });

  if (pressable) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ ...accessibilityState, disabled }}
        aria-disabled={disabled}
        disabled={disabled}
        onPress={onPress}
        {...rootPart}
        {...rest}
        style={({ pressed }) => [
          surface(pressed && !disabled),
          { opacity: disabled ? 0.5 : 1 },
          style,
        ]}
      >
        {content}
      </Pressable>
    );
  }
  return (
    <View
      accessibilityState={accessibilityState}
      {...rootPart}
      {...rest}
      style={[surface(false), style]}
    >
      {content}
    </View>
  );
}
