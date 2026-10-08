// Shared layout of the labelled toggles (Checkbox, Radio): the control box
// and its label placed at start / end / top / bottom, the label text style
// and the group container (CheckboxGroup, RadioGroup).
import type { ReactNode } from "react";
import {
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import type { ResolvedTokens } from "@minerva/core";
import { part } from "./parts";
import { controlFontSize, textStyle, weight, type NativeSize } from "./styles";

export type LabelPlacement = "start" | "end" | "top" | "bottom";

/** Size of the checkbox / radio box per control size */
export const TOGGLE_BOX = { small: 16, medium: 20, large: 24 } as const;

/** Flex layout of a control and its label */
export const placementStyle = (placement: LabelPlacement): ViewStyle => ({
  flexDirection:
    placement === "start"
      ? "row-reverse"
      : placement === "top"
        ? "column-reverse"
        : placement === "bottom"
          ? "column"
          : "row",
  alignItems: "center",
  alignSelf: "flex-start",
});

/** Label text of a toggle (a string label becomes Text) */
export function ToggleLabel({
  t,
  component,
  size,
  disabled,
  fontFamily,
  style,
  children,
}: {
  t: ResolvedTokens;
  component: string;
  size: NativeSize;
  disabled: boolean;
  fontFamily?: string;
  style?: StyleProp<TextStyle>;
  children: ReactNode;
}) {
  if (children === undefined || children === null || children === false) {
    return null;
  }
  if (typeof children !== "string" && typeof children !== "number") {
    return <View {...part(component, "label")}>{children}</View>;
  }
  return (
    <Text
      style={[
        {
          ...textStyle(t, controlFontSize(t, size), fontFamily),
          color: disabled
            ? t.colors["text-disabled-color"]
            : t.colors["text-color"],
        },
        style,
      ]}
      {...part(component, "label")}
    >
      {children}
    </Text>
  );
}

/** Container of CheckboxGroup / RadioGroup: label + options (not accessible) */
export function ToggleGroupFrame({
  t,
  component,
  role,
  label,
  accessibilityLabel,
  direction,
  disabled,
  fontFamily,
  style,
  rest,
  children,
}: {
  t: ResolvedTokens;
  component: string;
  role: "group" | "radiogroup";
  label?: ReactNode;
  accessibilityLabel?: string;
  direction: "vertical" | "horizontal";
  disabled: boolean;
  fontFamily?: string;
  style?: StyleProp<ViewStyle>;
  rest: object;
  children: ReactNode;
}) {
  return (
    <View
      role={role}
      accessibilityLabel={
        accessibilityLabel ?? (typeof label === "string" ? label : undefined)
      }
      accessibilityState={{ disabled }}
      {...part(component, "root", { direction, disabled })}
      {...rest}
      style={[{ gap: t.space["2"] }, style]}
    >
      {label !== undefined && label !== null ? (
        typeof label === "string" ? (
          <Text
            style={{
              ...textStyle(t, "sm", fontFamily),
              color: t.colors["text-secondary-color"],
              fontWeight: weight(t, "medium"),
            }}
            {...part(component, "label")}
          >
            {label}
          </Text>
        ) : (
          <View {...part(component, "label")}>{label}</View>
        )
      ) : null}
      <View
        style={
          direction === "horizontal"
            ? {
                flexDirection: "row",
                flexWrap: "wrap",
                columnGap: t.space["5"],
                rowGap: t.space["3"],
              }
            : { flexDirection: "column", gap: t.space["3"] }
        }
        {...part(component, "items")}
      >
        {children}
      </View>
    </View>
  );
}
