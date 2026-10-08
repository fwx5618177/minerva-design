// Concrete token values for platforms without CSS variables / color-mix()
// (React Native, mini-programs, canvas / native drawing): applies the same
// cascade as tokens.css for a mode x palette x design, substitutes `var()`
// references and evaluates colors, lengths, shadows and motion.
import {
  presetPalette,
  resolveDesign,
  type DesignOptions,
  type ResolvedDesign,
} from "../theme/design";
import type { Palette, ResolvedThemeMode } from "../theme/mode";
import { palettes } from "../theme/palettes";
import { dark } from "../theme/themes";
import type { ComponentTheme } from "../theme/types";
import { reducedMotionTokens } from "./accessibility";
import { formatColor, parseColor } from "./color";
import { defaultThemeTokens } from "./default-theme";
import {
  densityTokens,
  fontScaleTokens,
  radiusTokens,
  shadowTokens,
} from "./design";
import { toCss, type TokenValue } from "./expr";
import { scaleTokens } from "./scales";
import {
  evaluateEasing,
  evaluateLength,
  evaluateShadow,
  evaluateTransition,
  round,
  substituteVars,
  type LengthContext,
  type ResolvedShadow,
  type ResolvedTransition,
} from "./values";

/** Options of `resolveTokens`. */
export interface ResolveTokensOptions {
  /** @default "light" */
  mode?: ResolvedThemeMode;
  /**
   * Built-in palette (`null`: Minerva's default look). Defaults to the
   * preset's palette.
   */
  palette?: Palette | null;
  /** Design preset and axes (see `resolveDesign`) */
  design?: DesignOptions | ResolvedDesign;
  /**
   * Token overrides (name without `--`, e.g. a custom theme object), applied
   * last like the inline variables of `applyThemeStyles`. Values may
   * reference other tokens (`var(--x)`) and use `color-mix()` / `calc()`.
   */
  overrides?:
    Readonly<Record<string, TokenValue | undefined>> | Partial<ComponentTheme>;
  /** Applies the `prefers-reduced-motion` tokens (instant transitions) */
  reducedMotion?: boolean;
  /** px per rem @default 16 */
  rootFontSize?: number;
  /** Viewport width in px (for `vw` / `clamp()` tokens) @default 375 */
  viewportWidth?: number;
  /** Viewport height in px (for `vh`) @default 667 */
  viewportHeight?: number;
}

/**
 * Every token as a concrete value. Scale groups are keyed without their
 * prefix (`space["1-5"]` is `--space-1-5`, `radius.sm` is `--radius-sm`);
 * `colors` and `sizes` keep the full token name.
 */
export interface ResolvedTokens {
  mode: ResolvedThemeMode;
  palette: Palette | null;
  design: ResolvedDesign;
  /** Colors as `#rrggbb` or `rgba(r, g, b, a)` (see `formatColor`) */
  colors: Record<string, string>;
  /** `--space-*` in px */
  space: Record<string, number>;
  /** `--radius-*` in px */
  radius: Record<string, number>;
  /** `--font-size-*` in px */
  fontSize: Record<string, number>;
  /** `--line-height-*` (unitless multipliers) */
  lineHeight: Record<string, number>;
  /** `--font-weight-*` */
  fontWeight: Record<string, number>;
  /** `--font-family-*` (CSS font stacks) */
  fontFamily: Record<string, string>;
  /** `--z-*` */
  zIndex: Record<string, number>;
  /** `--shadow-*` */
  shadows: Record<string, ResolvedShadow>;
  /** `--elevation-*` */
  elevation: Record<string, ResolvedShadow>;
  /** `--transition-*` */
  transitions: Record<string, ResolvedTransition>;
  /** `--ease-*`: cubic-bezier control points */
  easings: Record<string, [number, number, number, number]>;
  /** Other lengths in px: control heights / paddings, rows, rhythm, focus ring, touch target */
  sizes: Record<string, number>;
  /** `--touch-target-min` in px: minimum size of a touch target */
  touchTargetMin: number;
  /**
   * Every token as CSS text without `var()` / `color-mix()`: lengths in px,
   * normalized colors, resolved shadows (what `tokens.mini.css` declares)
   */
  css: Record<string, string>;
  /** Tokens that could not be evaluated (cycle, unknown syntax) */
  unresolved: string[];
}

type Kind =
  "color" | "length" | "number" | "string" | "shadow" | "transition" | "easing";

type Group = Exclude<
  {
    [K in keyof ResolvedTokens]: ResolvedTokens[K] extends Record<
      string,
      unknown
    >
      ? K
      : never;
  }[keyof ResolvedTokens],
  "css" | "design" | "unresolved"
>;

/**
 * Token families: kind, result group and the prefix stripped from the group
 * keys (first match wins; anything else is a color).
 */
const FAMILIES: ReadonlyArray<
  readonly [test: RegExp, kind: Kind, group: Group, prefix: string]
> = [
  [/^space-/, "length", "space", "space-"],
  [/^radius-/, "length", "radius", "radius-"],
  [/^font-size-/, "length", "fontSize", "font-size-"],
  [/^line-height-/, "number", "lineHeight", "line-height-"],
  [/^font-weight-/, "number", "fontWeight", "font-weight-"],
  [/^font-family-/, "string", "fontFamily", "font-family-"],
  [/^z-/, "number", "zIndex", "z-"],
  [/^shadow-color$/, "color", "colors", ""],
  [/^shadow-/, "shadow", "shadows", "shadow-"],
  [/^elevation-/, "shadow", "elevation", "elevation-"],
  [/^transition-/, "transition", "transitions", "transition-"],
  [/^ease-/, "easing", "easings", "ease-"],
  [
    /^(control-(height|padding)-|row-padding-|rhythm-|focus-ring-(width|offset)$|touch-target-)/,
    "length",
    "sizes",
    "",
  ],
];

const COLOR_FAMILY = [/./, "color", "colors", ""] as const;

const family = (name: string) =>
  FAMILIES.find(([test]) => test.test(name)) ?? COLOR_FAMILY;

/** Kind of a token, from its name (anything not a scale is a color). */
export const tokenKind = (name: string): Kind => family(name)[1];

/** The cascade of token blocks for a mode x palette x design (CSS text). */
export function tokenCascade({
  mode = "light",
  palette,
  design: designOptions,
  overrides = {},
  reducedMotion = false,
}: ResolveTokensOptions = {}): {
  values: Map<string, string>;
  palette: Palette | null;
  design: ResolvedDesign;
} {
  const design = resolveDesign(designOptions);
  const chosen = palette === undefined ? presetPalette(design.preset) : palette;
  const values = new Map<string, string>();
  const apply = (block: object) => {
    for (const [name, value] of Object.entries(
      block as Record<string, TokenValue | undefined>,
    )) {
      if (value !== undefined) values.set(name, toCss(value));
    }
  };
  apply(defaultThemeTokens);
  apply(scaleTokens);
  if (chosen) apply(palettes[chosen][mode]);
  else if (mode === "dark") apply(dark);
  apply(densityTokens[design.density]);
  apply(radiusTokens[design.radius]);
  if (design.shadow !== "standard") apply(shadowTokens[design.shadow]);
  apply(fontScaleTokens[design.fontScale]);
  if (reducedMotion) apply(reducedMotionTokens);
  apply(overrides);
  return { values, palette: chosen, design };
}

const pxCss = (value: number) => `${round(value)}px`;

/** Value of one token of a kind, and its CSS text. */
function evaluate(
  kind: Kind,
  text: string,
  context: LengthContext,
): { value: unknown; css: string } | undefined {
  switch (kind) {
    case "color": {
      const color = parseColor(text);
      if (!color) return undefined;
      const css = formatColor(color);
      return { value: css, css };
    }
    case "length": {
      const length = evaluateLength(text, context);
      return length === undefined
        ? undefined
        : { value: round(length), css: pxCss(length) };
    }
    case "number": {
      const number = text.trim() === "" ? NaN : Number(text);
      return Number.isFinite(number)
        ? { value: number, css: String(number) }
        : undefined;
    }
    case "string": {
      // font stacks: double quotes, like tokens.css
      const css = text.trim().replace(/'/g, '"');
      return { value: css, css };
    }
    case "shadow": {
      const shadow = evaluateShadow(text, context);
      return shadow && { value: shadow, css: shadow.css };
    }
    case "transition": {
      const transition = evaluateTransition(text);
      return transition && { value: transition, css: transition.css };
    }
    case "easing": {
      const easing = evaluateEasing(text);
      return easing && { value: easing, css: text.trim() };
    }
  }
}

/**
 * Concrete design token values for a color mode, palette and design: what a
 * browser computes from `tokens.css`, for renderers that have no CSS
 * variables or `color-mix()` (React Native, mini-programs).
 *
 *   const t = resolveTokens({ mode: "dark", palette: "tech", design: { preset: "touch" } });
 *   t.colors["primary-color"]; // "#5c8ee6"
 *   t.space["4"];              // 16
 *   t.shadows.md;              // { css, color, offset, opacity, radius, elevation, layers }
 */
export function resolveTokens(
  options: ResolveTokensOptions = {},
): ResolvedTokens {
  const { mode = "light" } = options;
  const context: LengthContext = {
    rootFontSize: options.rootFontSize ?? 16,
    viewportWidth: options.viewportWidth ?? 375,
    viewportHeight: options.viewportHeight ?? 667,
  };
  const { values, palette, design } = tokenCascade(options);

  // var() substitution with cycle detection (a cycle is guaranteed-invalid)
  const substituted = new Map<string, string | undefined>();
  const visiting = new Set<string>();
  const lookup = (name: string): string | undefined => {
    if (substituted.has(name)) return substituted.get(name);
    const raw = values.get(name);
    if (raw === undefined || visiting.has(name)) return undefined;
    visiting.add(name);
    const value = substituteVars(raw, lookup);
    visiting.delete(name);
    substituted.set(name, value);
    return value;
  };

  const out: ResolvedTokens = {
    mode,
    palette,
    design,
    colors: {},
    space: {},
    radius: {},
    fontSize: {},
    lineHeight: {},
    fontWeight: {},
    fontFamily: {},
    zIndex: {},
    shadows: {},
    elevation: {},
    transitions: {},
    easings: {},
    sizes: {},
    touchTargetMin: 0,
    css: {},
    unresolved: [],
  };
  for (const name of values.keys()) {
    const text = lookup(name);
    const [, kind, group, prefix] = family(name);
    const value =
      text === undefined ? undefined : evaluate(kind, text, context);
    if (value === undefined) {
      out.unresolved.push(name);
      continue;
    }
    (out[group] as Record<string, unknown>)[name.slice(prefix.length)] =
      value.value;
    out.css[name] = value.css;
  }
  out.touchTargetMin = out.sizes["touch-target-min"] ?? 0;
  return out;
}
