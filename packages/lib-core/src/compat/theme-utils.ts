/**
 * `@minerva/lib-core/compat/theme-utils` — @novel-isr/ui's server-safe
 * `theme-utils` entry (no "use client"): same names, same defaults (the
 * "editorial" palette is always applied).
 */
import {
  PALETTES,
  PALETTE_COOKIE_NAME,
  THEME_COOKIE_MAX_AGE,
  THEME_COOKIE_NAME,
  createThemeInitScript,
  isPalette,
  parseThemeCookie as parseMode,
  type Palette,
  type ResolvedThemeMode,
  type ThemeMode,
} from "../theme-utils";

export type Theme = ThemeMode;
export type ResolvedTheme = ResolvedThemeMode;
export type { Palette };
export {
  PALETTES,
  PALETTE_COOKIE_NAME,
  THEME_COOKIE_MAX_AGE,
  THEME_COOKIE_NAME,
};

/** Default palette of @novel-isr/ui. */
export const DEFAULT_PALETTE: Palette = "editorial";

/** Raw cookie value -> valid Theme; invalid / missing values fall back to "system". */
export function parseThemeCookie(
  value: string | undefined,
  fallback: Theme = "system",
): Theme {
  return parseMode(value, fallback);
}

/** Raw cookie value -> valid Palette; invalid / missing values fall back to the default. */
export function parsePaletteCookie(
  value: string | undefined,
  fallback: Palette = DEFAULT_PALETTE,
): Palette {
  return isPalette(value) ? value : fallback;
}

/** Inline init script with @novel-isr/ui's defaults (system mode, editorial palette). */
export const THEME_INIT_SCRIPT: string = createThemeInitScript({
  defaultPalette: DEFAULT_PALETTE,
});
