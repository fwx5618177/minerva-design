// Token -> style helpers shared by the components. Every color, length,
// radius, shadow and duration comes from the resolved design tokens
// (`resolveTokens` of @minerva/core), never from literals, so the light /
// dark modes, palettes and design presets apply everywhere.
import type { ResolvedShadow, ResolvedTokens } from "@minerva/core";
import type { TextStyle, ViewStyle } from "react-native";

/** Semantic colors with a token family (`--<color>-color-*`) */
export type SemanticColor =
  "primary" | "success" | "warning" | "danger" | "info";

/** Colors of the button-like components (semantic + neutral) */
export type NativeColor = SemanticColor | "neutral";

/** Sizes of the controls */
export type NativeSize = "small" | "medium" | "large";

/** The colors of one role, from its token family */
export interface ColorRole {
  /** Fill of solid variants (`--<color>-color`) */
  solid: string;
  /** Pressed fill (`--<color>-color-active`) */
  pressed: string;
  /** Tinted background (`--<color>-color-subtle`) */
  subtle: string;
  /** Tinted border (`--<color>-color-border`) */
  border: string;
  /** Text on light / tinted backgrounds (`--<color>-color-text`) */
  text: string;
  /** Text on the solid fill (`--text-inverse-color`) */
  onSolid: string;
}

/** Colors of a role (`neutral`: the text / surface tokens) */
export function colorRole(t: ResolvedTokens, color: NativeColor): ColorRole {
  const c = t.colors;
  if (color === "neutral") {
    return {
      solid: c["text-secondary-color"],
      pressed: c["text-color"],
      subtle: c["surface-muted-color"],
      border: c["border-strong-color"],
      text: c["text-color"],
      onSolid: c["surface-color"],
    };
  }
  return {
    solid: c[`${color}-color`],
    pressed: c[`${color}-color-active`],
    subtle: c[`${color}-color-subtle`],
    border: c[`${color}-color-border`],
    text: c[`${color}-color-text`],
    onSolid: c["text-inverse-color"],
  };
}

const SIZE_STEP = { small: "sm", medium: "md", large: "lg" } as const;

/** Control height of a size (`--control-height-sm|md|lg`) */
export const controlHeight = (t: ResolvedTokens, size: NativeSize): number =>
  t.sizes[`control-height-${SIZE_STEP[size]}`];

/** Horizontal padding of a size (`--control-padding-x-sm|md|lg`) */
export const controlPaddingX = (t: ResolvedTokens, size: NativeSize): number =>
  t.sizes[`control-padding-x-${SIZE_STEP[size]}`];

/** Font size of a control size (`--font-size-sm|md|lg`) */
export const controlFontSize = (t: ResolvedTokens, size: NativeSize): number =>
  size === "small"
    ? t.fontSize.sm
    : size === "large"
      ? t.fontSize.lg
      : t.fontSize.md;

/**
 * `hitSlop` growing a target of `height` (and `width`, when known) up to
 * the minimum touch target (44pt, or `--touch-target-min` when larger).
 */
export function hitSlopFor(
  t: ResolvedTokens,
  height: number,
  width?: number,
): { top: number; bottom: number; left: number; right: number } | undefined {
  const min = Math.max(t.touchTargetMin, 44);
  const y = Math.max(0, Math.ceil((min - height) / 2));
  const x = width === undefined ? 0 : Math.max(0, Math.ceil((min - width) / 2));
  return y || x ? { top: y, bottom: y, left: x, right: x } : undefined;
}

/** React Native shadow props (iOS) and elevation (Android) of a shadow token */
export const shadowStyle = (shadow: ResolvedShadow | undefined): ViewStyle =>
  shadow && shadow.layers.length
    ? {
        shadowColor: shadow.color,
        shadowOffset: shadow.offset,
        shadowOpacity: shadow.opacity,
        shadowRadius: shadow.radius,
        elevation: shadow.elevation,
      }
    : {};

/** Base text style: color, size and line height from the tokens */
export const textStyle = (
  t: ResolvedTokens,
  size: keyof ResolvedTokens["fontSize"] | number = "md",
  fontFamily?: string,
): TextStyle => {
  const fontSize = typeof size === "number" ? size : t.fontSize[size];
  return {
    color: t.colors["text-color"],
    fontSize,
    lineHeight: Math.round(fontSize * (t.lineHeight.base ?? 1.5)),
    ...(fontFamily ? { fontFamily } : null),
  };
};

/** `fontWeight` as the string React Native expects */
export const weight = (
  t: ResolvedTokens,
  name: "regular" | "medium" | "semibold" | "bold",
): TextStyle["fontWeight"] =>
  String(t.fontWeight[name] ?? 400) as TextStyle["fontWeight"];

/** Duration of a transition token in ms (0 with reduced motion) */
export const duration = (
  t: ResolvedTokens,
  name: "fast" | "base" | "slow" = "base",
): number => t.transitions[name]?.duration ?? 0;
