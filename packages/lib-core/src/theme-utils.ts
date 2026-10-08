/**
 * Server-safe theme helpers (`@minerva/lib-core/theme-utils`): types, cookie
 * names, cookie parsing, the no-flash init script and the design axes
 * (`designAttributes()` for the `<html>` of a server-rendered root layout).
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
 *
 * Strict Content-Security-Policy: render the request's nonce on the script
 * (`<script nonce={nonce} ...>`), or allow its hash: `script-src 'self'
 * ${THEME_INIT_SCRIPT_HASH}` (`cspHash(createThemeInitScript(options))` for
 * a customised script).
 */
export {
  DENSITIES,
  DESIGN_ATTRIBUTES,
  DESIGN_PRESETS,
  FONT_SCALES,
  RADIUS_SCALES,
  SHADOW_SCALES,
  designAttributes,
  designPresets,
  resolveDesign,
  PALETTES,
  PALETTE_COOKIE_NAME,
  THEME_COOKIE_MAX_AGE,
  THEME_COOKIE_NAME,
  THEME_INIT_SCRIPT,
  THEME_INIT_SCRIPT_HASH,
  createThemeInitScript,
  cspHash,
  isPalette,
  isThemeMode,
  parsePaletteCookie,
  parseThemeCookie,
  parseThemeCookies,
  readCookieValue,
  serializeThemeCookie,
} from "@minerva/core";
export type {
  Density,
  DesignOptions,
  DesignPreset,
  DesignPresetDefinition,
  FontScale,
  RadiusScale,
  ResolvedDesign,
  ShadowScale,
  Palette,
  ResolvedThemeMode,
  ThemeCookies,
  ThemeInitScriptOptions,
  ThemeMode,
} from "@minerva/core";
