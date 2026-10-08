// Design axes token blocks: the values selected by `data-density`,
// `data-radius`, `data-shadow` and `data-font-scale` (see ../theme/design.ts
// for the axes and presets). The `:root` scales use the "standard" /
// "medium" values.
import type {
  Density,
  FontScale,
  RadiusScale,
  ShadowScale,
} from "../theme/design";
import {
  mergeBlocks,
  mix,
  px,
  ref,
  rem,
  shadow,
  type TokenBlock,
} from "./expr";

/*#__NO_SIDE_EFFECTS__*/
const space = (step: string) => ref(`space-${step}`);

/** "standard" density (also the `:root` values) */
export const standardDensity = {
  "control-height-xs": rem(1.5),
  "control-height-sm": rem(2),
  "control-height-md": rem(2.5),
  "control-height-lg": rem(3),
  "control-height-xl": rem(3.5),
  "control-padding-x-xs": space("2"),
  "control-padding-x-sm": space("3"),
  "control-padding-x-md": space("4"),
  "control-padding-x-lg": space("5"),
  "control-padding-x-xl": space("6"),
  "row-padding-y": space("2"),
  "row-padding-x": space("3"),
  "touch-target-min": px(32),
} as const satisfies TokenBlock;

/**
 * "medium" radius scale, in the two halves `tokens.css` declares on `:root`:
 * sm / md / lg with the theme tokens, xl / 2xl with the scales.
 */
export const mediumRadiusTheme = {
  "radius-sm": px(4),
  "radius-md": px(6),
  "radius-lg": px(8),
} as const satisfies TokenBlock;
export const mediumRadiusScale = {
  "radius-xl": px(12),
  "radius-2xl": px(16),
} as const satisfies TokenBlock;

/** "standard" font sizes (also the `:root` values) */
export const standardFontSizes = {
  "font-size-xs": rem(0.75),
  "font-size-sm": rem(0.8125),
  "font-size-md": rem(0.875),
  "font-size-lg": rem(1),
  "font-size-xl": rem(1.125),
  "font-size-2xl": rem(1.375),
  "font-size-3xl": rem(1.75),
  "font-size-4xl": rem(2.25),
  "font-size-5xl": rem(3),
  "font-size-6xl": rem(3.75),
} as const satisfies TokenBlock;

/** Density: control heights / paddings, row paddings, touch target. */
export const densityTokens: Record<Density, TokenBlock> = {
  standard: standardDensity,
  compact: {
    "control-height-xs": rem(1.25),
    "control-height-sm": rem(1.75),
    "control-height-md": rem(2),
    "control-height-lg": rem(2.5),
    "control-height-xl": rem(3),
    "control-padding-x-xs": space("1-5"),
    "control-padding-x-sm": space("2"),
    "control-padding-x-md": space("3"),
    "control-padding-x-lg": space("4"),
    "control-padding-x-xl": space("5"),
    "row-padding-y": space("1"),
    "row-padding-x": space("2"),
    // WCAG 2.2 target size (minimum), 2.5.8
    "touch-target-min": px(24),
  },
  comfortable: {
    "control-height-xs": rem(1.75),
    "control-height-sm": rem(2.25),
    "control-height-md": rem(2.75),
    "control-height-lg": rem(3.25),
    "control-height-xl": rem(3.75),
    "control-padding-x-xs": space("2-5"),
    "control-padding-x-sm": space("3"),
    "control-padding-x-md": space("5"),
    "control-padding-x-lg": space("6"),
    "control-padding-x-xl": space("7"),
    "row-padding-y": space("3"),
    "row-padding-x": space("4"),
    // Apple HIG / WCAG 2.5.5 target size (enhanced): the `touch` preset
    "touch-target-min": px(44),
  },
};

/** Corner radius scale. */
export const radiusTokens: Record<RadiusScale, TokenBlock> = {
  none: {
    "radius-sm": px(0),
    "radius-md": px(0),
    "radius-lg": px(0),
    "radius-xl": px(0),
    "radius-2xl": px(0),
  },
  small: {
    "radius-sm": px(2),
    "radius-md": px(3),
    "radius-lg": px(4),
    "radius-xl": px(6),
    "radius-2xl": px(8),
  },
  medium: mergeBlocks<TokenBlock>(mediumRadiusTheme, mediumRadiusScale),
  large: {
    "radius-sm": px(6),
    "radius-md": px(10),
    "radius-lg": px(14),
    "radius-xl": px(18),
    "radius-2xl": px(24),
  },
};

/*#__NO_SIDE_EFFECTS__*/
const faded = (amount: number) =>
  mix(ref("shadow-color"), amount, "transparent");

/** Shadow scale ("standard" keeps the theme / palette shadows: no block). */
export const shadowTokens: Record<
  Exclude<ShadowScale, "standard">,
  TokenBlock
> = {
  none: {
    "shadow-sm": shadow(),
    "shadow-md": shadow(),
    "shadow-lg": shadow(),
    "shadow-xl": shadow(),
  },
  subtle: {
    "shadow-sm": shadow({ x: 0, y: 1, blur: 1, color: faded(45) }),
    "shadow-md": shadow({ x: 0, y: 2, blur: 6, color: faded(45) }),
    "shadow-lg": shadow({ x: 0, y: 6, blur: 16, color: faded(50) }),
    "shadow-xl": shadow({ x: 0, y: 10, blur: 24, color: faded(55) }),
  },
};

const smallFontSizes = {
  "font-size-xs": rem(0.6875),
  "font-size-sm": rem(0.75),
  "font-size-md": rem(0.8125),
  "font-size-lg": rem(0.9375),
  "font-size-xl": rem(1.0625),
  "font-size-2xl": rem(1.25),
  "font-size-3xl": rem(1.5),
  "font-size-4xl": rem(2),
  "font-size-5xl": rem(2.625),
  "font-size-6xl": rem(3.25),
} as const satisfies TokenBlock;

const largeFontSizes = {
  "font-size-xs": rem(0.8125),
  "font-size-sm": rem(0.875),
  "font-size-md": rem(1),
  "font-size-lg": rem(1.125),
  "font-size-xl": rem(1.25),
  "font-size-2xl": rem(1.5),
  "font-size-3xl": rem(2),
  "font-size-4xl": rem(2.5),
  "font-size-5xl": rem(3.25),
  "font-size-6xl": rem(4),
} as const satisfies TokenBlock;

/** Font sizes of each type scale. */
export const fontSizeTokens: Record<FontScale, TokenBlock> = {
  small: smallFontSizes,
  standard: standardFontSizes,
  large: largeFontSizes,
};

const smallLineHeights = { "line-height-base": 1.45 } as const;
const standardLineHeights = {
  "line-height-base": 1.5,
  "line-height-relaxed": 1.7,
} as const;
const largeLineHeights = {
  "line-height-base": 1.6,
  "line-height-relaxed": 1.8,
} as const;

/** Line heights of each type scale ("small" keeps the relaxed one). */
export const lineHeightTokens: Record<FontScale, TokenBlock> = {
  small: smallLineHeights,
  standard: standardLineHeights,
  large: largeLineHeights,
};

/** Type scale: font sizes and line heights. */
export const fontScaleTokens: Record<FontScale, TokenBlock> = {
  small: mergeBlocks<TokenBlock>(smallFontSizes, smallLineHeights),
  standard: mergeBlocks<TokenBlock>(standardFontSizes, standardLineHeights),
  large: mergeBlocks<TokenBlock>(largeFontSizes, largeLineHeights),
};
