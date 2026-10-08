/**
 * Design axes: app-wide look switches, orthogonal to the color mode and the
 * palette. Each axis maps to a data attribute selecting a token block of
 * `tokens.css` (`tokens/design.scss`):
 *
 *   density    data-density     control heights / paddings, row paddings
 *   radius     data-radius      --radius-sm ... --radius-2xl
 *   shadow     data-shadow      --shadow-sm ... --shadow-xl
 *   fontScale  data-font-scale  --font-size-* and line heights
 *
 * A preset is a named combination of the four axes plus a default palette;
 * explicit axes override the preset.
 *
 * Server-safe: no framework import, no DOM access at load time.
 */
import type { Palette } from "./mode";

export const DENSITIES = ["compact", "standard", "comfortable"] as const;
/** Spacing density of controls and rows. */
export type Density = (typeof DENSITIES)[number];

export const RADIUS_SCALES = ["none", "small", "medium", "large"] as const;
/** Corner radius scale. */
export type RadiusScale = (typeof RADIUS_SCALES)[number];

export const SHADOW_SCALES = ["none", "subtle", "standard"] as const;
/** Elevation shadow scale ("standard" keeps the theme / palette shadows). */
export type ShadowScale = (typeof SHADOW_SCALES)[number];

export const FONT_SCALES = ["small", "standard", "large"] as const;
/** Type scale ("large" is reading-oriented). */
export type FontScale = (typeof FONT_SCALES)[number];

export const DESIGN_PRESETS = ["minerva", "editorial", "compact"] as const;
/** A built-in design preset. */
export type DesignPreset = (typeof DESIGN_PRESETS)[number];

/** Design axes chosen by the app; unset axes come from the preset. */
export interface DesignOptions {
  /**
   * Named combination of the axes below and a default palette:
   * "minerva" (default look), "editorial" (restrained, reading-oriented) or
   * "compact" (dense, data-heavy screens)
   * @default "minerva"
   */
  preset?: DesignPreset;
  /** Spacing density of controls and rows */
  density?: Density;
  /** Corner radius scale */
  radius?: RadiusScale;
  /** Elevation shadow scale */
  shadow?: ShadowScale;
  /** Type scale */
  fontScale?: FontScale;
}

/** Fully resolved design axes. */
export interface ResolvedDesign {
  preset: DesignPreset;
  density: Density;
  radius: RadiusScale;
  shadow: ShadowScale;
  fontScale: FontScale;
}

/** Axis values and default palette of a preset. */
export interface DesignPresetDefinition {
  density: Density;
  radius: RadiusScale;
  shadow: ShadowScale;
  fontScale: FontScale;
  /** Palette used when the app does not choose one (`null` = default look) */
  palette: Palette | null;
}

export const designPresets: Record<DesignPreset, DesignPresetDefinition> = {
  minerva: {
    density: "standard",
    radius: "medium",
    shadow: "standard",
    fontScale: "standard",
    palette: null,
  },
  editorial: {
    density: "comfortable",
    radius: "small",
    shadow: "subtle",
    fontScale: "large",
    palette: "editorial",
  },
  compact: {
    density: "compact",
    radius: "small",
    shadow: "standard",
    fontScale: "small",
    palette: null,
  },
};

const includes = <T extends string>(
  values: readonly T[],
  value: unknown,
): value is T =>
  typeof value === "string" && (values as readonly string[]).includes(value);

export const isDensity = (value: unknown): value is Density =>
  includes(DENSITIES, value);
export const isRadiusScale = (value: unknown): value is RadiusScale =>
  includes(RADIUS_SCALES, value);
export const isShadowScale = (value: unknown): value is ShadowScale =>
  includes(SHADOW_SCALES, value);
export const isFontScale = (value: unknown): value is FontScale =>
  includes(FONT_SCALES, value);
export const isDesignPreset = (value: unknown): value is DesignPreset =>
  includes(DESIGN_PRESETS, value);

/**
 * Resolves the four axes: explicit (valid) values win, the others come from
 * the preset (default "minerva"). Invalid values are ignored.
 */
export function resolveDesign(
  options: DesignOptions = {},
  base?: ResolvedDesign,
): ResolvedDesign {
  const preset = isDesignPreset(options.preset)
    ? options.preset
    : (base?.preset ?? "minerva");
  // A new preset resets the axes; otherwise unset axes follow `base`
  const from =
    base && !isDesignPreset(options.preset) ? base : designPresets[preset];
  return {
    preset,
    density: isDensity(options.density) ? options.density : from.density,
    radius: isRadiusScale(options.radius) ? options.radius : from.radius,
    shadow: isShadowScale(options.shadow) ? options.shadow : from.shadow,
    fontScale: isFontScale(options.fontScale)
      ? options.fontScale
      : from.fontScale,
  };
}

/** Default palette of a preset (`null` = Minerva's default look). */
export const presetPalette = (preset: DesignPreset | undefined) =>
  isDesignPreset(preset) ? designPresets[preset].palette : null;

/** Data attribute of each axis. */
export const DESIGN_ATTRIBUTES = {
  density: "data-density",
  radius: "data-radius",
  shadow: "data-shadow",
  fontScale: "data-font-scale",
} as const satisfies Record<Exclude<keyof ResolvedDesign, "preset">, string>;

/** Value of each axis that matches the `:root` tokens (no attribute needed). */
const STANDARD = {
  density: "standard",
  radius: "medium",
  shadow: "standard",
  fontScale: "standard",
} as const;

/**
 * Data attributes for a design, e.g. to spread on `<html>` in a server
 * rendered root layout so the first paint has the right look:
 *
 *   <html {...designAttributes({ preset: "editorial" })}>
 *
 * Standard values are omitted unless `all` is set (a nested scope must be
 * able to switch back to "standard").
 */
export function designAttributes(
  options: DesignOptions | ResolvedDesign = {},
  { all = false }: { all?: boolean } = {},
): Record<string, string> {
  const design = resolveDesign(options);
  const attributes: Record<string, string> = {};
  for (const axis of Object.keys(DESIGN_ATTRIBUTES) as Array<
    keyof typeof DESIGN_ATTRIBUTES
  >) {
    if (all || design[axis] !== STANDARD[axis]) {
      attributes[DESIGN_ATTRIBUTES[axis]] = design[axis];
    }
  }
  return attributes;
}
