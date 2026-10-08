/**
 * Server-safe theme helpers (`minerva-design/theme-utils`): types, cookie
 * names, cookie parsing, the no-flash init script and the design axes
 * (`designAttributes()` for the `<html>` of a server-rendered root layout).
 *
 * Implemented in `minerva-design/core` (framework-agnostic, no `"use client"`) and
 * re-exported here, so React Server Components (e.g. a root layout) can read
 * the theme cookies and inline the init script. Keep this entry free of React.
 *
 *   import { THEME_INIT_SCRIPT } from "minerva-design/theme-utils";
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
  isPalette,
  isThemeMode,
} from "@minerva/core";
export {
  PALETTE_COOKIE_NAME,
  THEME_COOKIE_MAX_AGE,
  THEME_COOKIE_NAME,
  THEME_INIT_SCRIPT,
  THEME_INIT_SCRIPT_HASH,
  createThemeInitScript,
  cspHash,
  parsePaletteCookie,
  parseThemeCookie,
  parseThemeCookies,
  readCookieValue,
  serializeThemeCookie,
} from "@minerva/dom";
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
  ThemeMode,
} from "@minerva/core";
export type { ThemeCookies, ThemeInitScriptOptions } from "@minerva/dom";
