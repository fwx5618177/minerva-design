// Scale tokens: spacing, radius, typography, layering, motion, rhythm,
// controls and focus (the second `:root` block of tokens.css).
//
// Unlike the color tokens these do not change with the theme (palettes may
// override the font families; the design axes switch the control, radius,
// shadow and type values). Components consume them as CSS variables; numeric
// `gap` / `padding` props resolve to `var(--space-<n>)`.
import {
  clamp,
  cubicBezier,
  mergeBlocks,
  px,
  ref,
  rem,
  transition,
  type TokenBlock,
} from "./expr";
import {
  mediumRadiusScale,
  standardDensity,
  standardFontSizes,
} from "./design";

/** Spacing steps (rem; fractional keys use "-": `0-5` = 0.5). */
export const spaceTokens = {
  "space-0": rem(0),
  "space-0-5": rem(0.125),
  "space-1": rem(0.25),
  "space-1-5": rem(0.375),
  "space-2": rem(0.5),
  "space-2-5": rem(0.625),
  "space-3": rem(0.75),
  "space-4": rem(1),
  "space-5": rem(1.25),
  "space-6": rem(1.5),
  "space-7": rem(1.75),
  "space-8": rem(2),
  "space-10": rem(2.5),
  "space-12": rem(3),
  "space-14": rem(3.5),
  "space-16": rem(4),
  "space-20": rem(5),
  "space-24": rem(6),
} as const satisfies TokenBlock;

/** Font family stacks of the default look (palettes override them). */
export const fontFamilyTokens = {
  "font-family-sans":
    'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "PingFang SC", "Microsoft YaHei", sans-serif',
  "font-family-display": ref("font-family-sans"),
  "font-family-mono":
    'ui-monospace, "SF Mono", "JetBrains Mono", Menlo, Consolas, monospace',
} as const satisfies TokenBlock;

/** The scales `:root` block. */
export const scaleTokens: TokenBlock = mergeBlocks<TokenBlock>(
  spaceTokens,
  // ---- Radius (sm / md / lg live with the theme tokens) ----
  { "radius-none": px(0) },
  mediumRadiusScale,
  { "radius-full": px(9999) },
  // ---- Typography ----
  fontFamilyTokens,
  standardFontSizes,
  {
    "font-weight-regular": 400,
    "font-weight-medium": 500,
    "font-weight-semibold": 600,
    "font-weight-bold": 700,
    "line-height-tight": 1.2,
    "line-height-base": 1.5,
    "line-height-relaxed": 1.7,
    // ---- Layering ----
    "z-base": 0,
    "z-raised": 10,
    "z-dropdown": 1000,
    "z-sticky": 1100,
    "z-overlay": 1300,
    "z-modal": 1400,
    "z-popover": 1500,
    "z-toast": 1700,
    // ---- Motion ----
    "transition-fast": transition(120, "ease-out"),
    "transition-base": transition(200, "ease-out"),
    "transition-slow": transition(360, "ease-out"),
    "ease-out": cubicBezier(0.22, 1, 0.36, 1),
    "ease-spring": cubicBezier(0.34, 1.56, 0.64, 1),
    "ease-in": cubicBezier(0.5, 0, 0.75, 0),
    // ---- Rhythm & elevation ----
    "rhythm-section": clamp(rem(3), 6, rem(5)),
    "rhythm-block": clamp(rem(1.5), 3, rem(2.5)),
    "rhythm-tight": rem(0.75),
    "elevation-flat": "none",
    "elevation-subtle": ref("shadow-sm"),
    "elevation-raised": ref("shadow-md"),
    "elevation-floating": ref("shadow-lg"),
  },
  // ---- Controls & rows (density) ----
  standardDensity,
  {
    // ---- Focus ----
    "focus-ring-width": px(2),
    "focus-ring-offset": px(2),
  },
);
