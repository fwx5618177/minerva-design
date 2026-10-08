// Default (light) color tokens: the `:root, [data-minerva-theme-scope]` block
// of tokens.css.
//
// The base tokens are the `light` theme (../theme/themes.ts builds it from
// them). Semantic tokens are formulas over the base tokens (`color-mix()`
// in CSS), so they follow any theme automatically, custom ones included.
// Themes may still set them explicitly (the built-in dark themes do for
// surfaces and text).
//
// The scope elements of nested ConfigProviders (`[data-minerva-theme-scope]`)
// redeclare every token: custom properties resolve their `var()` references
// where they are declared, so the derived tokens must be recomputed from the
// scope's own base tokens.
import type { ThemeProps } from "../theme/types";
import { mediumRadiusTheme } from "./design";
import {
  mergeBlocks,
  mix,
  ref,
  shadow,
  type TokenBlock,
  type TokenValue,
} from "./expr";

/** Base tokens (`ThemeProps`) of the default light theme. */
export const baseTokens = {
  "primary-color": "#2563eb",
  "secondary-color": "#475569",
  "success-color": "#15803d",
  "danger-color": "#dc2626",
  "warning-color": "#b45309",
  "info-color": "#0e7490",
  "light-color": "#f7f7f7",
  "dark-color": "#4a4a4a",
  "background-color": "#ffffff",
  "foreground-color": "#1f2937",
  "border-color": "#d9dde3",
  "text-gray": "#6b7280",
  "primary-gradient-start": "#6a11cb",
  "primary-gradient-end": "#2575fc",
  "secondary-gradient-start": "#42e695",
  "secondary-gradient-end": "#3bb2b8",
  "highlight-color": "#ffeb3b",
  "shadow-color": "rgba(15, 23, 42, 0.16)",
  "muted-color": "#64748b",
  "link-color": "#1d4ed8",
  "link-hover-color": "#1e40af",
  "link-active-color": "#1e3a8a",
  "link-visited-color": "#6d28d9",
} as const satisfies ThemeProps;

const fg = ref("foreground-color");
const bg = ref("background-color");
const surface = ref("surface-color");
const shadowColor = ref("shadow-color");

/** Semantic tokens derived from the base tokens. */
export const semanticTokens = {
  // ---- Surfaces ----
  "surface-color": bg,
  "surface-muted-color": mix(fg, 6, bg),
  "surface-elevated-color": bg,
  "surface-subtle-color": mix(fg, 3, bg),
  "canvas-color": ref("surface-subtle-color"),
  "control-color": ref("surface-subtle-color"),
  "hover-color": ref("surface-muted-color"),
  "selected-color": mix(ref("primary-color"), 14, surface),
  "overlay-color": mix("#000000", 45, "transparent"),
  // ---- Borders ----
  "border-strong-color": mix(fg, 35, bg),
  // ---- Text ----
  "text-color": fg,
  "text-secondary-color": mix(fg, 75, bg),
  "text-muted-color": mix(fg, 62, bg),
  "text-disabled-color": mix(fg, 45, bg),
  "text-inverse-color": "#ffffff",
  // ---- Misc ----
  "focus-ring-color": mix(ref("primary-color"), 45, "transparent"),
  "shadow-sm": shadow({ x: 0, y: 1, blur: 2, color: shadowColor }),
  "shadow-md": shadow({ x: 0, y: 4, blur: 12, color: shadowColor }),
  "shadow-lg": shadow({ x: 0, y: 12, blur: 32, color: shadowColor }),
  "shadow-xl": shadow({ x: 0, y: 20, blur: 48, color: shadowColor }),
  "accent-color": ref("primary-color"),
} as const satisfies TokenBlock;

/** Colors with hover / active / subtle / border / text role tokens. */
export const ROLE_COLORS = [
  "primary",
  "secondary",
  "success",
  "warning",
  "danger",
  "info",
  "accent",
] as const;

/** Role tokens of one color: `--<color>-color-<role>`. */
/*#__NO_SIDE_EFFECTS__*/
export const roleTokens = (color: string): Record<string, TokenValue> => {
  const c = ref(`${color}-color`);
  return {
    [`${color}-color-hover`]: mix(c, 85, fg),
    [`${color}-color-active`]: mix(c, 72, fg),
    [`${color}-color-subtle`]: mix(c, 12, surface),
    [`${color}-color-border`]: mix(c, 40, surface),
    [`${color}-color-text`]: mix(c, 80, fg),
  };
};

/** Role tokens of every role color. */
/*#__NO_SIDE_EFFECTS__*/
function allRoleTokens(): Record<string, TokenValue> {
  return mergeBlocks({}, ...ROLE_COLORS.map(roleTokens));
}

/** The `:root, [data-minerva-theme-scope]` block (default light theme). */
export const defaultThemeTokens: TokenBlock = mergeBlocks<TokenBlock>(
  baseTokens,
  semanticTokens,
  // default radii, declared with the theme tokens
  mediumRadiusTheme,
  allRoleTokens(),
);
