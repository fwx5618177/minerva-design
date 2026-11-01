// Brand color (`primaryColor`) of the web renderers as CSS variables: the
// token block of core's `primaryColorTokens`, serialized like tokens.css.
import {
  primaryColorTokens,
  tokenToCss,
  type PrimaryColorPair,
  type ResolvedThemeMode,
  type ThemeMap,
} from "@minerva/core";

/** Theme / palette tokens a brand color is applied over */
type BaseTheme = object | null | undefined;

/**
 * The brand color of `mode` as theme entries (`{ "primary-color": ...,
 * "primary-color-hover": "color-mix(...)", ... }`), ready for
 * `generateCSSVariables` or an inline `style`. `base` is the theme or
 * palette it is applied over (keeps a palette's distinct accent).
 */
export function primaryColorTheme(
  pair: PrimaryColorPair,
  mode: ResolvedThemeMode,
  base?: BaseTheme,
): ThemeMap {
  return Object.fromEntries(
    Object.entries(primaryColorTokens(pair[mode], base)).map(([key, value]) => [
      key,
      tokenToCss(value),
    ]),
  ) as ThemeMap;
}

/** Options of `primaryColorCss`. */
export interface PrimaryColorCssOptions {
  /**
   * Element the rules target
   * @default ":root"
   */
  selector?: string;
  /** Theme / palette each mode is applied over */
  base?: Partial<Record<ResolvedThemeMode, BaseTheme>>;
}

/**
 * A style sheet applying a brand color before any script runs (server
 * rendering): the light values on `selector`, the dark ones when it has
 * `data-theme="dark"` (set by `THEME_INIT_SCRIPT` / the root provider).
 * Colors are normalized by `resolvePrimaryColor`, so the text is safe to
 * inline in a `<style>` element.
 */
export function primaryColorCss(
  pair: PrimaryColorPair,
  { selector = ":root", base }: PrimaryColorCssOptions = {},
): string {
  const block = (mode: ResolvedThemeMode) =>
    Object.entries(primaryColorTheme(pair, mode, base?.[mode]))
      .map(([key, value]) => `--${key}:${String(value)}`)
      .join(";");
  return `${selector}:not([data-theme=dark]){${block("light")}}${selector}[data-theme=dark]{${block("dark")}}`;
}
