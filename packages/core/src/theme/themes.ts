import type { ComponentTheme, ThemeName } from "./types";

/**
 * Semantic token defaults, expressed in terms of the base tokens. These are the
 * same values declared on `:root` in `tokens/default-theme.scss`; the light
 * theme uses them as-is so they keep following the base colors.
 */
const derivedSemantic = {
  "surface-color": "var(--background-color)",
  "surface-muted-color":
    "color-mix(in srgb, var(--foreground-color) 6%, var(--background-color))",
  "surface-elevated-color": "var(--background-color)",
  "overlay-color": "color-mix(in srgb, #000000 45%, transparent)",
  "border-strong-color":
    "color-mix(in srgb, var(--foreground-color) 35%, var(--background-color))",
  "text-color": "var(--foreground-color)",
  "text-secondary-color":
    "color-mix(in srgb, var(--foreground-color) 75%, var(--background-color))",
  "text-disabled-color":
    "color-mix(in srgb, var(--foreground-color) 45%, var(--background-color))",
  "text-inverse-color": "#ffffff",
  "focus-ring-color":
    "color-mix(in srgb, var(--primary-color) 45%, transparent)",
} as const satisfies Partial<ComponentTheme>;

export const light: ComponentTheme = {
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
  ...derivedSemantic,
};

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
