import type { ComponentTheme, ThemeName } from "./types";
import { baseTokens, semanticTokens } from "../tokens/default-theme";
import { mergeBlocks, toCss, type TokenValue } from "../tokens/expr";

/** CSS text of some tokens of a block. */
/*#__NO_SIDE_EFFECTS__*/
function pickCss<K extends string>(
  block: Record<K, TokenValue>,
  keys: readonly K[],
): Record<K, string> {
  const out = {} as Record<K, string>;
  for (const key of keys) out[key] = toCss(block[key]);
  return out;
}

/**
 * Semantic token defaults, expressed in terms of the base tokens: the same
 * formulas as the `:root` block of `tokens.css` (../tokens/default-theme.ts).
 * The light theme uses them as-is so they keep following the base colors.
 */
const derivedSemantic = /* @__PURE__ */ pickCss(semanticTokens, [
  "surface-color",
  "surface-muted-color",
  "surface-elevated-color",
  "overlay-color",
  "border-strong-color",
  "text-color",
  "text-secondary-color",
  "text-disabled-color",
  "text-inverse-color",
  "focus-ring-color",
] as const);

export const light: ComponentTheme = /* @__PURE__ */ mergeBlocks<
  Partial<ComponentTheme>
>(baseTokens, derivedSemantic) as ComponentTheme;

export const dark: ComponentTheme = {
  "primary-color": "#818cf8",
  "secondary-color": "#94a3b8",
  "success-color": "#4ade80",
  "danger-color": "#f87171",
  "warning-color": "#fbbf24",
  "info-color": "#22d3ee",
  "light-color": "#2d3748",
  "dark-color": "#f8f9fa",
  "background-color": "#1a202c",
  "foreground-color": "#f1f5f9",
  "border-color": "#3a4556",
  "text-gray": "#a0aec0",
  "primary-gradient-start": "#6a11cb",
  "primary-gradient-end": "#2575fc",
  "secondary-gradient-start": "#42e695",
  "secondary-gradient-end": "#3bb2b8",
  "highlight-color": "#ffeb3b",
  "shadow-color": "rgba(0, 0, 0, 0.5)",
  "muted-color": "#94a3b8",
  "link-color": "#63b3ed",
  "link-hover-color": "#90cdf4",
  "link-active-color": "#bee3f8",
  "link-visited-color": "#b794f4",
  "surface-color": "#212937",
  "surface-muted-color": "#2a3342",
  "surface-elevated-color": "#262f3e",
  "overlay-color": "rgba(0, 0, 0, 0.6)",
  "border-strong-color": "#5a677d",
  "text-color": "#f1f5f9",
  "text-secondary-color": "#cbd5e0",
  "text-disabled-color": "#718096",
  "text-inverse-color": "#111827",
  "focus-ring-color": "rgba(129, 140, 248, 0.55)",
};

export const githubDark: ComponentTheme = {
  "primary-color": "#58a6ff",
  "secondary-color": "#8b949e",
  "success-color": "#3fb950",
  "danger-color": "#f85149",
  "warning-color": "#d29922",
  "info-color": "#39c5cf",
  "light-color": "#161b22",
  "dark-color": "#e6edf3",
  "background-color": "#0d1117",
  "foreground-color": "#e6edf3",
  "border-color": "#30363d",
  "text-gray": "#8b949e",
  "primary-gradient-start": "#58a6ff",
  "primary-gradient-end": "#1f6feb",
  "secondary-gradient-start": "#1f6feb",
  "secondary-gradient-end": "#58a6ff",
  "highlight-color": "#bb800926",
  "shadow-color": "rgba(1, 4, 9, 0.8)",
  "muted-color": "#8b949e",
  "link-color": "#58a6ff",
  "link-hover-color": "#79c0ff",
  "link-active-color": "#a5d6ff",
  "link-visited-color": "#bc8cff",
  "surface-color": "#161b22",
  "surface-muted-color": "#21262d",
  "surface-elevated-color": "#1c2128",
  "overlay-color": "rgba(1, 4, 9, 0.7)",
  "border-strong-color": "#484f58",
  "text-color": "#e6edf3",
  "text-secondary-color": "#8b949e",
  "text-disabled-color": "#6e7681",
  "text-inverse-color": "#0d1117",
  "focus-ring-color": "rgba(31, 111, 235, 0.6)",
};

/** Union of the keys of `themes` (pure: dropped when `themeKeys` is unused). */
function uniqueKeys(...themes: object[]): string[] {
  const keys = new Set<string>();
  for (const theme of themes) for (const key in theme) keys.add(key);
  return Array.from(keys);
}

/**
 * Every CSS custom property name (without the leading `--`) that a built-in
 * theme may write. Used to clear stale inline variables when switching themes.
 */
export const themeKeys: readonly string[] = /* @__PURE__ */ uniqueKeys(
  light,
  dark,
  githubDark,
);

/**
 * Built-in themes, keyed by the name accepted by `ConfigProvider`'s `theme` prop.
 * This map is the single source of truth for theme name -> theme values.
 */
export const themes = {
  light,
  dark,
  "github-dark": githubDark,
} as const satisfies Record<ThemeName, ComponentTheme>;

export const isThemeName = (value: unknown): value is ThemeName =>
  typeof value === "string" &&
  Object.prototype.hasOwnProperty.call(themes, value);
