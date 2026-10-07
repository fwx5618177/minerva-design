/**
 * Server-safe theme helpers (`@minerva/lib-core/theme-utils`): types, cookie
 * names, cookie parsing and the no-flash init script.
 *
 * Implemented in `@minerva/core` (framework-agnostic, no `"use client"`) and
 * re-exported here, so React Server Components (e.g. a root layout) can read
 * the theme cookies and inline the init script. Keep this entry free of React.
 *
 *   import { THEME_INIT_SCRIPT } from "@minerva/lib-core/theme-utils";
 *
 *   <html suppressHydrationWarning>
 *     <head>
 *       <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
 *     </head>
 *     ...
 */
export {
  PALETTES,
  PALETTE_COOKIE_NAME,
  THEME_COOKIE_MAX_AGE,
  THEME_COOKIE_NAME,
  THEME_INIT_SCRIPT,
  createThemeInitScript,
  isPalette,
  isThemeMode,
  parsePaletteCookie,
  parseThemeCookie,
  parseThemeCookies,
  readCookieValue,
  serializeThemeCookie,
} from "@minerva/core";
export type {
  Palette,
  ResolvedThemeMode,
  ThemeCookies,
  ThemeInitScriptOptions,
  ThemeMode,
} from "@minerva/core";
