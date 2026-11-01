// The primary / accent colors of each built-in palette: the base
// `primaryColorTokens` / `accentFollowsPrimary` need, without the full
// `palettes` token tables (~25 kB minified) for renderers under a size
// budget (the `<minerva-config>` element). Kept equal to `palettes` by
// palette-accents.test.ts.
import type { Palette, ResolvedThemeMode } from "./mode";

/** Primary and accent color of a palette in one mode. */
export interface PaletteAccent {
  "primary-color": string;
  "accent-color": string;
}

/** Primary and accent color of each built-in palette, per mode. */
export const paletteAccents: Readonly<
  Record<Palette, Readonly<Record<ResolvedThemeMode, PaletteAccent>>>
> = {
  editorial: {
    light: { "primary-color": "#1e3a5f", "accent-color": "#b04e2b" },
    dark: { "primary-color": "#7a9bc4", "accent-color": "#eaa180" },
  },
  tech: {
    light: { "primary-color": "#2364c4", "accent-color": "#2364c4" },
    dark: { "primary-color": "#5c8ee6", "accent-color": "#5c8ee6" },
  },
  graphite: {
    light: { "primary-color": "#315fce", "accent-color": "#315fce" },
    dark: { "primary-color": "#7b9cff", "accent-color": "#7b9cff" },
  },
  cool: {
    light: { "primary-color": "#2864c7", "accent-color": "#2864c7" },
    dark: { "primary-color": "#79a9ff", "accent-color": "#79a9ff" },
  },
};
