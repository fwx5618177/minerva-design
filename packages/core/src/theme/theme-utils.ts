/**
 * Server-safe theme helpers: types, cookie names, cookie parsing and the
 * no-flash init script.
 *
 * This module has no framework import and no DOM access at load time. It is
 * exported from `@minerva/core` and re-exported by the server-safe
 * `@minerva/lib-core/theme-utils` entry, so React Server Components (e.g. a
 * root layout) can read the theme cookies and inline the init script.
 *
 * Theme model (two orthogonal axes):
 *   mode     "light" | "dark" | "system"   (system follows prefers-color-scheme)
 *   palette  "editorial" | "tech" | "graphite" | "cool" | none (Minerva's default look)
 *
 * Both are reflected on `<html>` as `data-theme` (resolved light / dark) and
 * `data-palette`, which select the palette token blocks of `style.css`.
 *
 *   import { THEME_INIT_SCRIPT } from "@minerva/lib-core/theme-utils";
 *
 *   <html suppressHydrationWarning>
 *     <head>
 *       <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
 *     </head>
 *     ...
 */

import { designAttributes, presetPalette, type DesignOptions } from "./design";

/** Color mode chosen by the user ("system" follows the OS). */
export type ThemeMode = "light" | "dark" | "system";

/** Color mode actually applied. */
export type ResolvedThemeMode = "light" | "dark";

/** Built-in palettes (orthogonal to the light / dark mode). */
export const PALETTES = ["editorial", "tech", "graphite", "cool"] as const;

/** A built-in palette name. */
export type Palette = (typeof PALETTES)[number];

/** Cookie storing the {@link ThemeMode}. */
export const THEME_COOKIE_NAME = "theme";

/** Cookie storing the {@link Palette}. */
export const PALETTE_COOKIE_NAME = "palette";

/** Cookie lifetime: one year, in seconds. */
export const THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export const isThemeMode = (value: unknown): value is ThemeMode =>
  value === "light" || value === "dark" || value === "system";

export const isPalette = (value: unknown): value is Palette =>
  typeof value === "string" && (PALETTES as readonly string[]).includes(value);

/** Parse a raw `theme` cookie value; invalid / missing values give `fallback`. */
export function parseThemeCookie(
  value: string | undefined | null,
  fallback: ThemeMode = "system",
): ThemeMode {
  return isThemeMode(value) ? value : fallback;
}

/**
 * Parse a raw `palette` cookie value; invalid / missing values give `fallback`
 * (`null` = no palette, Minerva's default look).
 */
export function parsePaletteCookie<F extends Palette | null = null>(
  value: string | undefined | null,
  fallback: F = null as F,
): Palette | F {
  return isPalette(value) ? value : fallback;
}

/**
 * Read one cookie from a `Cookie` header / `document.cookie` string.
 * Returns `undefined` when absent. Values are URI-decoded.
 */
export function readCookieValue(
  cookieHeader: string | undefined | null,
  name: string,
): string | undefined {
  if (!cookieHeader) return undefined;
  for (const part of cookieHeader.split(";")) {
    const index = part.indexOf("=");
    if (index === -1) continue;
    if (part.slice(0, index).trim() !== name) continue;
    const raw = part.slice(index + 1).trim();
    try {
      return decodeURIComponent(raw);
    } catch {
      return raw;
    }
  }
  return undefined;
}

/** Theme preferences parsed from a request's `Cookie` header. */
export interface ThemeCookies {
  theme: ThemeMode;
  palette: Palette | null;
}

/** Parse both theme cookies from a `Cookie` header (server side). */
export function parseThemeCookies(
  cookieHeader: string | undefined | null,
  defaults: { theme?: ThemeMode; palette?: Palette | null } = {},
): ThemeCookies {
  return {
    theme: parseThemeCookie(
      readCookieValue(cookieHeader, THEME_COOKIE_NAME),
      defaults.theme ?? "system",
    ),
    palette: parsePaletteCookie(
      readCookieValue(cookieHeader, PALETTE_COOKIE_NAME),
      defaults.palette ?? null,
    ),
  };
}

/** `Set-Cookie`-style string for a theme preference (client or server). */
export function serializeThemeCookie(name: string, value: string): string {
  return `${name}=${encodeURIComponent(value)}; path=/; max-age=${THEME_COOKIE_MAX_AGE}; SameSite=Lax`;
}

export interface ThemeInitScriptOptions {
  /** Mode used when the cookie is missing / invalid. @default "system" */
  defaultTheme?: ThemeMode;
  /**
   * Palette used when the cookie is missing / invalid and `<html>` has no
   * valid `data-palette` yet. `null` leaves `data-palette` unset (Minerva's
   * default look). @default null
   */
  defaultPalette?: Palette | null;
  /**
   * Design axes (preset / density / radius / shadow / font scale) written on
   * `<html>` as data attributes before the first paint. The preset's palette
   * is used as `defaultPalette` unless one is given.
   */
  design?: DesignOptions;
}

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Build the inline, render-blocking init script. Before hydration it reads the
 * `theme` / `palette` cookies (falling back to `prefers-color-scheme` and the
 * defaults) and writes `data-theme`, `data-palette` and `color-scheme` on
 * `<html>`, so the first paint already uses the right tokens (no flash).
 */
export function createThemeInitScript(
  options: ThemeInitScriptOptions = {},
): string {
  const defaultTheme = parseThemeCookie(options.defaultTheme);
  const fallbackPalette =
    options.defaultPalette === undefined
      ? presetPalette(options.design?.preset)
      : options.defaultPalette;
  const defaultPalette = isPalette(fallbackPalette) ? fallbackPalette : "";
  const design = options.design
    ? Object.entries(designAttributes(options.design))
        .map(([name, value]) => `d.setAttribute('${name}','${value}');`)
        .join("")
    : "";
  const palettes = `[${PALETTES.map((p) => `'${p}'`).join(",")}]`;
  const themeRe = `/(?:^|; )${escapeRegExp(THEME_COOKIE_NAME)}=([^;]+)/`;
  const paletteRe = `/(?:^|; )${escapeRegExp(PALETTE_COOKIE_NAME)}=([^;]+)/`;
  return (
    `(function(){try{var d=document.documentElement,c=document.cookie,P=${palettes};` +
    `var tm=c.match(${themeRe});var t=tm?tm[1]:'${defaultTheme}';` +
    `if(t!=='light'&&t!=='dark'&&t!=='system')t='${defaultTheme}';` +
    `if(t==='system')t=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';` +
    `d.dataset.theme=t;d.style.colorScheme=t;` +
    `var hp=d.dataset.palette;var f=P.indexOf(hp)>-1?hp:'${defaultPalette}';` +
    `var pm=c.match(${paletteRe});var p=pm?pm[1]:f;if(P.indexOf(p)<0)p=f;` +
    `if(p)d.dataset.palette=p;else delete d.dataset.palette;${design}}catch(e){}})();`
  );
}

/**
 * Default init script: cookie mode (else system), cookie palette (else the
 * `data-palette` already rendered on `<html>`, else none).
 */
export const THEME_INIT_SCRIPT: string =
  /* @__PURE__ */ createThemeInitScript();
