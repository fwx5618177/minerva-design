import type { ReactNode } from "react";
import type {
  ComponentTheme,
  CustomBilingualTheme,
  Density,
  DesignPreset,
  FontScale,
  RadiusScale,
  ResolvedDesign,
  ShadowScale,
  DefaultTheme,
  Palette,
  ResolvedThemeMode,
  SupportTheme,
  ThemeMap,
  ThemeMode,
  ThemeName,
  SupportedLanguage,
} from "@minerva/core";

// Theme object types live in @minerva/core (framework-agnostic); re-exported
// here so `minerva-design` keeps exposing them.
export type {
  ThemeProps,
  ThemeColorRole,
  ThemeRoleTokens,
  SemanticThemeProps,
  ComponentThemeProps,
  ComponentTheme,
  SupportTheme,
  DefaultTheme,
  ThemeName,
  CustomBilingualTheme,
  ThemeMap,
  Theme,
} from "@minerva/core";

/**
 * Accepted `theme` values: "auto" / "system" (follow `prefers-color-scheme`),
 * a built-in theme name, a theme object, or a `{ light, dark }` pair. Same
 * union as `Theme` (spelled out so the docs show it on `ConfigProvider`).
 */
export type ConfigProviderThemeProps =
  | "auto"
  | "system"
  | CustomBilingualTheme
  | SupportTheme
  | ThemeMap
  | DefaultTheme;

// Design axes (implemented in @minerva/core); re-exported so
// `minerva-design` exposes them.
export type {
  Density,
  DesignOptions,
  DesignPreset,
  FontScale,
  RadiusScale,
  ResolvedDesign,
  ShadowScale,
} from "@minerva/core";

// Languages with built-in translations (the message bundles live in
// @minerva/core); re-exported so `minerva-design` keeps exposing the type.
export type { SupportedLanguage } from "@minerva/core";

/** Locale settings of the React library's built-in texts */
export type Locale = {
  /**
   * Language of the React library's built-in texts
   * @default "en"
   */
  language?: SupportedLanguage;
};

/** Value of `ConfigContext`, returned by `useConfig()` */
export interface ConfigContextProps {
  /** Theme as configured (may be "auto" or a light/dark pair) */
  theme?: ConfigProviderThemeProps;
  /** Theme that is currently applied after resolving "auto" / light-dark pairs */
  resolvedTheme?: ThemeName | ComponentTheme;
  /** Current locale of the React library's built-in texts */
  locale?: Locale;
  /**
   * Color mode of the theme: "light" / "dark" for those themes, "system" for
   * "auto" / "system" / `{ light, dark }` pairs, `undefined` for other themes
   */
  mode?: ThemeMode;
  /**
   * Applied color mode (`data-theme` on `<html>`, or on the scope element of a
   * nested provider), when it can be determined
   */
  resolvedMode?: ResolvedThemeMode;
  /**
   * Active palette (`data-palette` on `<html>`, or on the scope element of a
   * nested provider), `null` for Minerva's default look
   */
  palette?: Palette | null;
  /**
   * Applied design axes (`data-density` / `data-radius` / `data-shadow` /
   * `data-font-scale`) and the preset they come from
   */
  design?: ResolvedDesign;
  /** Change the theme (persisted to the `theme` cookie when `persist` is on) */
  setTheme?: (theme: ConfigProviderThemeProps) => void;
  /** Change the palette (persisted to the `palette` cookie when `persist` is on) */
  setPalette?: (palette: Palette | null) => void;
}

/** Props of `ConfigProvider` */
export interface ConfigContextProviderProps {
  /**
   * Theme to apply: "auto" (follows `prefers-color-scheme`), a built-in theme
   * name, a theme object, or a `{ light, dark }` pair. The root provider
   * applies it to `<html>`; a nested provider inherits its parent's theme
   * unless set, and applies an override to its own subtree only.
   * @default "auto" (nested: the parent's theme)
   */
  theme?: ConfigProviderThemeProps;
  /**
   * Palette applied with the light / dark / system themes ("editorial",
   * "tech", "graphite", "cool"); `null` keeps Minerva's default look. The root
   * provider sets `data-palette` on `<html>`; a nested provider inherits its
   * parent's palette unless set, and scopes an override to its subtree.
   * Palette tokens come from `style.css`.
   * @default null (nested: the parent's palette)
   */
  palette?: Palette | null;
  /**
   * Persist theme and palette changes in the `theme` / `palette` cookies and
   * restore them after hydration (pair with `THEME_INIT_SCRIPT` for SSR).
   * Root provider only: ignored by nested providers.
   * @default false
   */
  persist?: boolean;
  /** Called after `setTheme` changes the theme */
  onThemeChange?: (theme: ConfigProviderThemeProps) => void;
  /** Called after `setPalette` changes the palette */
  onPaletteChange?: (palette: Palette | null) => void;
  /**
   * Language of the React library's built-in texts. The root provider sets it globally;
   * a nested provider inherits its parent's language unless set, and applies
   * an override to its subtree only.
   * @default { language: "en" } (nested: the parent's locale)
   */
  locale?: Locale;
  /**
   * Design preset: a named combination of the design axes below and a default
   * palette. "minerva" (default look), "editorial" (restrained,
   * reading-oriented: editorial palette, comfortable density, small radius,
   * subtle shadows, large type) or "compact" (dense, data-heavy screens).
   * Explicit axes and `palette` win over the preset. A nested provider
   * inherits its parent's design unless set; a nested preset resets every
   * axis it does not set.
   * @default "minerva" (nested: the parent's design)
   */
  preset?: DesignPreset;
  /**
   * Spacing density of controls (heights, paddings) and rows (menus, lists,
   * tables): `data-density`
   * @default "standard" (or the preset's)
   */
  density?: Density;
  /**
   * Corner radius scale (`--radius-sm` ... `--radius-2xl`): `data-radius`
   * @default "medium" (or the preset's)
   */
  radius?: RadiusScale;
  /**
   * Elevation shadows (`--shadow-sm` ... `--shadow-xl`): `data-shadow`.
   * "standard" keeps the theme / palette shadows
   * @default "standard" (or the preset's)
   */
  shadow?: ShadowScale;
  /**
   * Type scale (`--font-size-*`, line heights): `data-font-scale`. "large"
   * is reading-oriented
   * @default "standard" (or the preset's)
   */
  fontScale?: FontScale;
  /** Application content */
  children: ReactNode;
}

/** Value returned by `useTheme()` */
export interface ThemeContextValue {
  /** Mode chosen by the user ("system" follows the OS) */
  theme: ThemeMode;
  /** Mode actually applied ("light" / "dark") */
  resolvedTheme: ResolvedThemeMode;
  /** Active palette, `null` for Minerva's default look */
  palette: Palette | null;
  /** Change the mode (writes the `theme` cookie unless storage is disabled) */
  setTheme: (theme: ThemeMode) => void;
  /** Change the palette (writes the `palette` cookie unless storage is disabled) */
  setPalette: (palette: Palette | null) => void;
}

/** Props of `ThemeProvider` */
export interface ThemeProviderProps {
  /**
   * Initial mode. For SSR pass the value parsed from the request cookie so
   * the server markup matches the client.
   * @default "system" (nested: the parent's theme)
   */
  defaultTheme?: ThemeMode;
  /**
   * Initial palette (`null` = Minerva's default look). For SSR pass the
   * parsed `palette` cookie.
   * @default null (nested: the parent's palette)
   */
  defaultPalette?: Palette | null;
  /**
   * Do not read / write the theme cookies (tests, embedded previews). Nested
   * providers never use the cookies.
   * @default false
   */
  disableStorage?: boolean;
  /** Language of the React library's built-in texts */
  locale?: Locale;
  /** Called when the mode changes */
  onThemeChange?: (theme: ThemeMode) => void;
  /** Called when the palette changes */
  onPaletteChange?: (palette: Palette | null) => void;
  /** Application content */
  children: ReactNode;
}
