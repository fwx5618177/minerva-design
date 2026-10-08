import type {
  ComponentTheme,
  CustomBilingualTheme,
  DefaultTheme,
  Theme,
  ThemeMap,
  ThemeName,
} from "@minerva/core";
import { isThemeName, themeKeys, themes } from "@minerva/core";

const DARK_SCHEME_QUERY = "(prefers-color-scheme: dark)";

/**
 * Read the user's preferred color scheme. Falls back to "light" when
 * `matchMedia` is unavailable (SSR, old browsers, some test environments).
 */
export const getSystemTheme = (): DefaultTheme => {
  if (typeof window === "undefined" || !window.matchMedia) return "light";
  return window.matchMedia(DARK_SCHEME_QUERY).matches ? "dark" : "light";
};

export const isBilingualTheme = (
  theme: unknown,
): theme is CustomBilingualTheme =>
  typeof theme === "object" &&
  theme !== null &&
  "light" in theme &&
  "dark" in theme &&
  typeof (theme as CustomBilingualTheme).light === "object" &&
  typeof (theme as CustomBilingualTheme).dark === "object";

/**
 * Resolve any accepted theme value to a concrete theme object.
 * - "auto" and light/dark pairs follow `systemTheme`
 * - built-in names are looked up in `themes`
 * - plain objects are used as-is
 */
export const resolveTheme = (
  theme: Theme,
  systemTheme: DefaultTheme = getSystemTheme(),
): ComponentTheme | ThemeMap => {
  if (theme === "auto" || theme === "system") return themes[systemTheme];
  if (typeof theme === "string") {
    if (!isThemeName(theme)) {
      throw new Error(
        `Unsupported theme "${theme}", expected one of: auto, system, ${Object.keys(themes).join(", ")}`,
      );
    }
    return themes[theme];
  }
  if (isBilingualTheme(theme)) return theme[systemTheme];
  return theme;
};

/** Keys written by the last `generateCSSVariables` call, per target. */
const appliedKeys = new WeakMap<CSSStyleDeclaration, Set<string>>();

/**
 * Write every theme entry as a CSS custom property (`--<key>`).
 *
 * Variables written by a previous call on the same target (and any built-in
 * theme key) that the new theme does not define are removed, so switching from
 * e.g. a dark theme that sets `--surface-color` to a custom theme that does not
 * falls back to the stylesheet default instead of keeping a stale value.
 *
 * @param themeStyles {CSSStyleDeclaration} - Target style declaration
 * @param theme {ComponentTheme | ThemeMap} - Theme object
 */
export const generateCSSVariables = (
  themeStyles: CSSStyleDeclaration,
  theme: ComponentTheme | ThemeMap,
) => {
  const next = new Set<string>();
  Object.entries(theme).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") next.add(key);
  });

  const stale = new Set([
    ...(appliedKeys.get(themeStyles) ?? []),
    ...themeKeys,
  ]);
  stale.forEach((key) => {
    if (!next.has(key)) themeStyles.removeProperty(`--${key}`);
  });

  next.forEach((key) => {
    themeStyles.setProperty(
      `--${key}`,
      String((theme as Record<string, string>)[key]),
    );
  });
  appliedKeys.set(themeStyles, next);
};

/**
 * Apply theme styles to the document root
 * @param theme {Theme | ThemeName} - Theme name or object
 * @param systemTheme {DefaultTheme} - Scheme used for "auto" and light/dark pairs
 */
export const applyThemeStyles = (
  theme: Theme | ThemeName,
  systemTheme?: DefaultTheme,
) => {
  generateCSSVariables(
    document.documentElement.style,
    resolveTheme(theme, systemTheme),
  );
};
