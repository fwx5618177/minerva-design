import type { ReactNode } from "react";
import type { Palette, ResolvedThemeMode, ThemeMode } from "../theme-utils";

/**
 * Base design tokens. Every key is written to the document root as a CSS
 * custom property named `--<key>` (e.g. `"primary-color"` -> `--primary-color`)
 * by `applyThemeStyles` / `ConfigProvider`.
 *
 * Components never read these values directly from JS: their styles consume
 * the CSS variables, so switching theme is a pure CSS-variable swap. Most
 * semantic tokens (see `ComponentThemeProps`) are derived from these keys with
 * `color-mix()`, so a custom theme only has to provide the base keys below.
 */
export interface ThemeProps {
  /** Brand / accent color: primary buttons, active states, focus rings. */
  "primary-color": string;
  /** Neutral accent used by `secondary` variants. */
  "secondary-color": string;
  /** Positive status color (success variants). */
  "success-color": string;
  /** Destructive / error status color (danger and error variants). */
  "danger-color": string;
  /** Warning status color. */
  "warning-color": string;
  /** Informational status color. */
  "info-color": string;
  /** A light neutral (legacy; light variants). */
  "light-color": string;
  /** A dark neutral (legacy; dark variants). */
  "dark-color": string;
  /** Page background. Default for `--surface-color`. */
  "background-color": string;
  /** Main text color. Default for `--text-color`. */
  "foreground-color": string;
  /** Default border / divider color. */
  "border-color": string;
  /** Secondary, low-emphasis text (should keep >= 4.5:1 on the background). */
  "text-gray": string;
  "primary-gradient-start": string;
  "primary-gradient-end": string;
  "secondary-gradient-start": string;
  "secondary-gradient-end": string;
  /** Highlight / mark color. */
  "highlight-color": string;
  /** Base shadow color used by `--shadow-sm|md|lg`. */
  "shadow-color": string;
  /** Muted UI color (placeholders, icons, inactive controls). */
  "muted-color": string;
  "link-color": string;
  "link-hover-color": string;
  "link-active-color": string;
  "link-visited-color": string;
}

/** Status / accent roles that get a full set of derived tokens. */
export type ThemeColorRole =
  | "primary"
  | "accent"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info";

/**
 * Derived tokens for each role `R` (`--R-color-hover`, `--R-color-active`, ...).
 * - `hover` / `active`: R mixed toward `--foreground-color` (darkens in light
 *   themes, lightens in dark themes)
 * - `subtle`: soft tinted background (~12% R over `--surface-color`)
 * - `border`: tinted border (~40% R over `--surface-color`)
 * - `text`: R-toned text that stays readable on `subtle` backgrounds
 */
export type ThemeRoleTokens = {
  [
    K in
      | `${ThemeColorRole}-color-hover`
      | `${ThemeColorRole}-color-active`
      | `${ThemeColorRole}-color-subtle`
      | `${ThemeColorRole}-color-border`
      | `${ThemeColorRole}-color-text`
  ]?: string;
};

/**
 * Optional semantic tokens. All of them have defaults declared on `:root` in
 * `styles/default-theme.scss`, derived from the base `ThemeProps` keys with
 * `color-mix()`, so they follow any theme (including custom ones). Set them in
 * a theme only when the derived value is not what you want (the built-in dark
 * themes set explicit surface and text colors, for example).
 */
export interface SemanticThemeProps extends ThemeRoleTokens {
  /** Background of cards, inputs and other component surfaces. */
  "surface-color"?: string;
  /** Hovered rows, disabled controls, tracks. */
  "surface-muted-color"?: string;
  /** Popovers, menus, dropdowns, tooltips. */
  "surface-elevated-color"?: string;
  /** Very soft background (sidebars, table headers, code blocks). */
  "surface-subtle-color"?: string;
  /** Application background behind surfaces (e.g. AppShell canvas). */
  "canvas-color"?: string;
  /** Background of form controls (inputs, selects). */
  "control-color"?: string;
  /** Hovered rows and items. */
  "hover-color"?: string;
  /** Selected rows, items and tabs. */
  "selected-color"?: string;
  /** Secondary accent (CTAs, ratings, highlights). Defaults to the primary color. */
  "accent-color"?: string;
  /** Backdrop / modal overlay. */
  "overlay-color"?: string;
  /** Higher-contrast border (inputs, hovered borders). */
  "border-strong-color"?: string;
  /** Main text color (defaults to `--foreground-color`). */
  "text-color"?: string;
  /** Secondary text (descriptions, helper text). */
  "text-secondary-color"?: string;
  /** Low-emphasis text (captions, helper text). */
  "text-muted-color"?: string;
  /** Disabled text. */
  "text-disabled-color"?: string;
  /** Text drawn on filled role backgrounds (e.g. a primary button). */
  "text-inverse-color"?: string;
  /** Focus outline / ring color. */
  "focus-ring-color"?: string;
  /** Alias of `--danger-color`. */
  "error-color"?: string;
  "shadow-sm"?: string;
  "shadow-md"?: string;
  "shadow-lg"?: string;
  "shadow-xl"?: string;
  /** Body font stack. */
  "font-family-sans"?: string;
  /** Headings / display font stack. */
  "font-family-display"?: string;
  /** Code font stack. */
  "font-family-mono"?: string;
  "radius-sm"?: string;
  "radius-md"?: string;
  "radius-lg"?: string;
}

/**
 * Optional per-component overrides. Components fall back to the semantic
 * tokens when these are not set.
 */
export interface ComponentThemeProps extends SemanticThemeProps {
  /** Overrides the background of `success` buttons. */
  "btn-bg-color-success"?: string;
  "btn-bg-color-danger"?: string;
  "btn-bg-color-warning"?: string;
  "btn-bg-color-info"?: string;
  /** Overrides the hover background of primary buttons. */
  "btn-bg-color-hover"?: string;
  /** Overrides the active background of primary buttons. */
  "btn-bg-color-active"?: string;

  "avatar-bg-color-info"?: string;
  "avatar-bg-color-success"?: string;
  "avatar-bg-color-danger"?: string;
  "avatar-bg-color-warning"?: string;

  /** Card background (defaults to `--surface-color`). */
  "card-bg-color"?: string;
  /** Card content background (defaults to `--surface-color`). */
  "card-bg-color-content"?: string;
  /** Card border (defaults to `--border-color`). */
  "card-border-color"?: string;
}

export type ComponentTheme = Partial<ComponentThemeProps> & ThemeProps;

export type SupportTheme = "github-dark";

export type DefaultTheme = "light" | "dark";

/** Names of the built-in themes */
export type ThemeName = DefaultTheme | SupportTheme;

export type CustomBilingualTheme = {
  [key in DefaultTheme]: ComponentTheme;
};

export type ThemeMap = {
  [key in keyof ComponentTheme]: ComponentTheme[key];
};

/**
 * Accepted `theme` values: "auto" / "system" (follow `prefers-color-scheme`),
 * a built-in theme name, a theme object, or a `{ light, dark }` pair.
 */
export type ConfigProviderThemeProps =
  | "auto"
  | "system"
  | CustomBilingualTheme
  | SupportTheme
  | ThemeMap
  | DefaultTheme;

export type Theme = ConfigProviderThemeProps;

/** Languages that lib-core ships translations for */
export type SupportedLanguage = "en" | "zh" | "ja" | "fr";

/** Locale settings of lib-core's built-in texts */
export type Locale = {
  /**
   * Language of lib-core's built-in texts
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
  /** Current locale of lib-core's built-in texts */
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
   * Language of lib-core's built-in texts. The root provider sets it globally;
   * a nested provider inherits its parent's language unless set, and applies
   * an override to its subtree only.
   * @default { language: "en" } (nested: the parent's locale)
   */
  locale?: Locale;
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
  /** Language of lib-core's built-in texts */
  locale?: Locale;
  /** Called when the mode changes */
  onThemeChange?: (theme: ThemeMode) => void;
  /** Called when the palette changes */
  onPaletteChange?: (palette: Palette | null) => void;
  /** Application content */
  children: ReactNode;
}
