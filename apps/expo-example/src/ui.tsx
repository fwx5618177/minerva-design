// Small layout helpers shared by the showcase screens. Colors and spacing
// come from the theme tokens (useTheme), never from literals.
import type { ReactNode } from "react";
import {
  ScrollView,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import { NavBar, useTheme } from "minerva-design/native";
import { useNavigation } from "./navigation";

/** A text glyph used as an icon (the example ships no icon font) */
export function Glyph({
  children,
  color,
  size = 18,
}: {
  children: string;
  color?: string;
  size?: number;
}) {
  const { colors } = useTheme();
  return (
    <Text
      accessibilityElementsHidden
      importantForAccessibility="no"
      style={{
        color: color ?? colors["text-color"],
        fontSize: size,
        lineHeight: size * 1.2,
      }}
    >
      {children}
    </Text>
  );
}

/** Body text in the theme's colors */
export function Paragraph({
  children,
  muted,
  style,
}: {
  children: ReactNode;
  muted?: boolean;
  style?: StyleProp<TextStyle>;
}) {
  const { colors, tokens } = useTheme();
  return (
    <Text
      style={[
        {
          color: muted ? colors["text-secondary-color"] : colors["text-color"],
          fontSize: tokens.fontSize.sm,
          lineHeight: tokens.fontSize.sm * 1.5,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

/** A labelled block of one screen: a heading, a hint and the examples */
export function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  const { colors, tokens } = useTheme();
  return (
    <View style={{ gap: tokens.space["3"] }}>
      <View style={{ gap: tokens.space["1"] }}>
        <Text
          accessibilityRole="header"
          style={{
            color: colors["text-color"],
            fontSize: tokens.fontSize.md,
            fontWeight: "600",
          }}
        >
          {title}
        </Text>
        {description ? <Paragraph muted>{description}</Paragraph> : null}
      </View>
      {children}
    </View>
  );
}

/** Children laid out in a wrapping row */
export function Row({
  children,
  style,
}: {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  const { tokens } = useTheme();
  return (
    <View
      style={[
        {
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          gap: tokens.space["2"],
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

/** A category screen: NavBar with a back button over a scrolling column */
export function Screen({
  title,
  children,
  right,
  scroll = true,
}: {
  title: string;
  children: ReactNode;
  right?: ReactNode;
  scroll?: boolean;
}) {
  const { colors, tokens } = useTheme();
  const { pop } = useNavigation();
  const content = { padding: tokens.space["4"], gap: tokens.space["8"] };
  return (
    <View style={{ flex: 1, backgroundColor: colors["canvas-color"] }}>
      <NavBar title={title} leftArrow onBack={() => pop()} right={right} />
      {scroll ? (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[
            content,
            { paddingBottom: tokens.space["16"] },
          ]}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[{ flex: 1 }, content]}>{children}</View>
      )}
    </View>
  );
}
