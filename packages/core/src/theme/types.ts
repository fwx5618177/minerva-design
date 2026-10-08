/**
 * Theme object types shared by every Minerva package: the base / semantic /
 * per-component design tokens and the values accepted as a theme.
 */

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
  /** Destructive / danger status color (danger variants). */
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

/**
 * Semantic color of a component: the single vocabulary of every `color` prop
 * (Button, Badge, Alert, Tag, Tooltip, Toast, ...). `neutral` is the gray /
 * text-colored scheme; the others map to the `--<name>-color` theme tokens.
 * Components accepting only some of them type their prop with
 * `Extract<ColorScheme, ...>`. It is never a raw CSS color.
 */
export type ColorScheme =
  "primary" | "neutral" | "success" | "warning" | "danger" | "info";

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
 * `minerva-design/tokens.css` (`theme/tokens/default-theme.scss`), derived from the base `ThemeProps` keys with
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
 * Accepted theme values: "auto" / "system" (follow `prefers-color-scheme`),
 * a built-in theme name, a theme object, or a `{ light, dark }` pair.
 */
export type Theme =
  | "auto"
  | "system"
  | CustomBilingualTheme
  | SupportTheme
  | ThemeMap
  | DefaultTheme;
