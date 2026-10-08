// Shared look of the text-entry controls (Input, Textarea, NumberInput,
// SearchBar): the bordered / filled frame with its focus and error colors,
// the text style, the round clear button and the focus state.
import { useCallback, useState } from "react";
import {
  Platform,
  Pressable,
  type NativeSyntheticEvent,
  type TargetedEvent,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import type { ResolvedTokens } from "@minerva/core";
import { Icon } from "./Icon";
import { part } from "./parts";
import {
  controlFontSize,
  controlHeight,
  controlPaddingX,
  hitSlopFor,
  type NativeSize,
} from "./styles";

/** Visual style of the text fields */
export type FieldVariant = "outline" | "filled" | "unstyled";

export interface FrameState {
  variant: FieldVariant;
  size: NativeSize;
  focused: boolean;
  invalid: boolean;
  disabled: boolean;
  readOnly?: boolean;
  /** Grows with its content (Textarea): no fixed height */
  multiline?: boolean;
}

/** Corner radius of a field size */
export const fieldRadius = (t: ResolvedTokens, size: NativeSize): number =>
  size === "small" ? t.radius.md : t.radius.lg;

/**
 * Frame (wrapper) style of a text field: control height, horizontal
 * padding, border colored by the focus (`--primary-color`) and error
 * (`--danger-color`) states, fill of the `filled` variant.
 */
export function frameStyle(t: ResolvedTokens, s: FrameState): ViewStyle {
  const c = t.colors;
  const unstyled = s.variant === "unstyled";
  const border = s.invalid
    ? c["danger-color"]
    : s.focused && !s.readOnly
      ? c["primary-color"]
      : s.variant === "outline"
        ? c["border-strong-color"]
        : "transparent";
  const background = unstyled
    ? "transparent"
    : s.disabled
      ? c["surface-muted-color"]
      : s.variant === "filled" && !s.focused
        ? c["surface-muted-color"]
        : c["surface-color"];
  return {
    flexDirection: "row",
    alignItems: s.multiline ? "flex-start" : "center",
    minHeight: unstyled ? undefined : controlHeight(t, s.size),
    paddingHorizontal: unstyled ? 0 : controlPaddingX(t, s.size) * 0.6,
    gap: t.space["2"],
    borderWidth: unstyled ? 0 : 1,
    borderColor: border,
    borderRadius: unstyled ? 0 : fieldRadius(t, s.size),
    backgroundColor: background,
    opacity: s.disabled ? 0.6 : 1,
  };
}

/** Text style of the editable text of a field */
export function fieldTextStyle(
  t: ResolvedTokens,
  size: NativeSize,
  disabled: boolean,
  fontFamily?: string,
): TextStyle {
  const fontSize = controlFontSize(t, size);
  return {
    flex: 1,
    minWidth: 0,
    color: disabled ? t.colors["text-disabled-color"] : t.colors["text-color"],
    fontSize,
    paddingVertical: t.space["2"],
    paddingHorizontal: 0,
    ...(fontFamily ? { fontFamily } : null),
  };
}

/** Focus state of a text field, chained with the user's handlers */
export function useFocusState(
  onFocus?: (event: NativeSyntheticEvent<TargetedEvent>) => void,
  onBlur?: (event: NativeSyntheticEvent<TargetedEvent>) => void,
) {
  const [focused, setFocused] = useState(false);
  const handleFocus = useCallback(
    (event: NativeSyntheticEvent<TargetedEvent>) => {
      setFocused(true);
      onFocus?.(event);
    },
    [onFocus],
  );
  const handleBlur = useCallback(
    (event: NativeSyntheticEvent<TargetedEvent>) => {
      setFocused(false);
      onBlur?.(event);
    },
    [onBlur],
  );
  return { focused, onFocus: handleFocus, onBlur: handleBlur };
}

export interface ClearButtonProps {
  component: string;
  label: string;
  onPress: () => void;
  t: ResolvedTokens;
  /** Glyph circle size @default 18 */
  size?: number;
}

/** Round "x" button clearing a field (44pt touch target through hitSlop) */
export function ClearButton({
  component,
  label,
  onPress,
  t,
  size = 18,
}: ClearButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      hitSlop={hitSlopFor(t, size, size)}
      {...part(component, "clear")}
      style={({ pressed }) => ({
        width: size,
        height: size,
        borderRadius: size / 2,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: pressed
          ? t.colors["text-secondary-color"]
          : t.colors["text-muted-color"],
      })}
    >
      <Icon name="close" size={size * 0.5} color={t.colors["surface-color"]} />
    </Pressable>
  );
}

/**
 * Web-only states of a TextInput React Native's props lack
 * (`aria-invalid`, `aria-required`, the DOM `disabled`): rendered by
 * react-native-web, not passed on iOS / Android.
 */
export const ariaStates = (states: {
  invalid?: boolean;
  required?: boolean;
  disabled?: boolean;
}): object =>
  Platform.OS === "web"
    ? {
        "aria-invalid": states.invalid || undefined,
        "aria-required": states.required || undefined,
        disabled: states.disabled || undefined,
      }
    : {};
