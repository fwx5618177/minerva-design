// Design tokens for mini-programs (WeChat / Taro / uni-app): `tokens.mini.css`.
//
// Mini-program style engines (WXSS, Skyline) support CSS variables but not
// attribute selectors, `color-mix()`, `@layer` or `:where()` / `:is()`, and
// `rem` is not tied to a configurable root size. So the tokens are scoped by
// classes and pre-resolved with `resolveTokens` (colors as hex / rgba, lengths
// in px):
//
//   page, .mn-root            defaults (light, standard design)
//   .mn-theme-dark            Minerva's dark mode (no palette)
//   .mn-palette-<p>           palette <p>, light
//   .mn-palette-<p>-dark      palette <p>, dark
//   .mn-density-<v>  .mn-radius-<v>  .mn-shadow-<v>  .mn-font-scale-<v>
//
// One color class at a time (`miniTokenClassNames` builds the list); every
// class goes on an element that also carries `mn-root` (the tokens are
// recomputed there, like `[data-minerva-theme-scope]` on the web).
//
// Color classes only declare what differs from the defaults and never touch
// the tokens of the design axes: the shadows of a palette are declared as
// `--mn-shadow-standard-*` / `--mn-shadow-subtle-*`, which the shadow axis
// selects (`--shadow-sm: var(--mn-shadow-standard-sm)`). So the palette files
// can be loaded after the base file in any order without specificity tricks.
import {
  DENSITIES,
  FONT_SCALES,
  RADIUS_SCALES,
  SHADOW_SCALES,
  resolveDesign,
  type DesignOptions,
  type ResolvedDesign,
} from "../theme/design";
import { PALETTES, type Palette, type ResolvedThemeMode } from "../theme/mode";
import { serializeRules, type CssRule } from "./css";
import { densityTokens, fontScaleTokens, radiusTokens } from "./design";
import { toCss } from "./expr";
import { scaleTokens } from "./scales";
import { resolveTokens, tokenKind, type ResolveTokensOptions } from "./resolve";

/** Class prefix of the mini-program tokens. */
export const MINI_CLASS_PREFIX = "mn-";

/** Selector of the default tokens. */
export const MINI_ROOT_SELECTOR = `page, .${MINI_CLASS_PREFIX}root`;

const SHADOW_STEPS = ["sm", "md", "lg", "xl"] as const;

const cls = (...parts: string[]) => `${MINI_CLASS_PREFIX}${parts.join("-")}`;

/** Class of a mode x palette (`null` palette: Minerva's default colors). */
export const miniColorClass = (
  mode: ResolvedThemeMode,
  palette: Palette | null,
): string | null =>
  palette
    ? cls("palette", palette, ...(mode === "dark" ? ["dark"] : []))
    : mode === "dark"
      ? cls("theme", "dark")
      : null;

/** Kebab-case class segment of an axis (`fontScale` -> `font-scale`). */
const axisClass = (axis: keyof Omit<ResolvedDesign, "preset">, value: string) =>
  cls(axis === "fontScale" ? "font-scale" : axis, value);

/** Standard axis values (declared by the root block: no class needed). */
const STANDARD: Omit<ResolvedDesign, "preset"> = {
  density: "standard",
  radius: "medium",
  shadow: "standard",
  fontScale: "standard",
};

/**
 * Class list of a mini-program token scope, e.g. for the root `<view>` of a
 * page: `mn-root` plus the color class and the non-standard design axes.
 *
 *   miniTokenClassNames({ mode: "dark", palette: "tech", design: { preset: "touch" } })
 *   // "mn-root mn-palette-tech-dark mn-density-comfortable mn-radius-large"
 */
export function miniTokenClassNames({
  mode = "light",
  palette,
  design,
}: Pick<ResolveTokensOptions, "mode" | "palette"> & {
  design?: DesignOptions | ResolvedDesign;
} = {}): string {
  const resolved = resolveDesign(design);
  const chosen =
    palette === undefined
      ? resolveTokens({ design: resolved }).palette
      : palette;
  const classes = [cls("root")];
  const color = miniColorClass(mode, chosen);
  if (color) classes.push(color);
  for (const axis of Object.keys(STANDARD) as Array<keyof typeof STANDARD>) {
    if (resolved[axis] !== STANDARD[axis]) {
      classes.push(axisClass(axis, resolved[axis]));
    }
  }
  return classes.join(" ");
}

const shadowVar = (scale: "standard" | "subtle", step: string) =>
  `mn-shadow-${scale}-${step}`;

/**
 * The tokens that vary with the mode x palette (colors, font stacks and the
 * standard / subtle shadows), resolved.
 */
function colorTokens(
  mode: ResolvedThemeMode,
  palette: Palette | null,
): Map<string, string> {
  const standard = resolveTokens({ mode, palette });
  const subtle = resolveTokens({ mode, palette, design: { shadow: "subtle" } });
  const out = new Map<string, string>();
  for (const [name, css] of Object.entries(standard.css)) {
    const kind = tokenKind(name);
    if (kind === "color" || name.startsWith("font-family-")) out.set(name, css);
  }
  for (const step of SHADOW_STEPS) {
    out.set(shadowVar("standard", step), standard.css[`shadow-${step}`]);
    out.set(shadowVar("subtle", step), subtle.css[`shadow-${step}`]);
  }
  return out;
}

const declarations = (
  entries: Iterable<readonly [string, string]>,
): CssRule["declarations"] =>
  [...entries].map(([name, value]) => [`--${name}`, value] as const);

/** Entries of `variant` that differ from `base`. */
const diff = (variant: Map<string, string>, base: Map<string, string>) =>
  [...variant].filter(([name, value]) => base.get(name) !== value);

const HEADER = "/* Minerva design tokens for mini-programs (generated) */";

const stylesheet = (rules: CssRule[]) =>
  `${HEADER}\n${serializeRules(rules).join("\n\n")}\n`;

/** `var(--shadow-*)` when a scale token references a shadow token. */
function shadowRef(name: string): string | undefined {
  const value = scaleTokens[name];
  return typeof value === "object" &&
    value.kind === "ref" &&
    value.name.startsWith("shadow-")
    ? toCss(value)
    : undefined;
}

/** Rules of the base file: defaults, dark mode, design axes. */
function baseRules(): CssRule[] {
  const defaults = resolveTokens();
  const light = colorTokens("light", null);
  const root = new Map<string, string>();
  for (const [name, css] of Object.entries(defaults.css)) {
    if (/^shadow-(sm|md|lg|xl)$/.test(name)) {
      root.set(name, `var(--${shadowVar("standard", name.slice(7))})`);
    } else if (shadowRef(name)) {
      // `--elevation-*: var(--shadow-*)` follows the shadow axis
      root.set(name, shadowRef(name)!);
    } else {
      root.set(name, css);
    }
  }
  for (const [name, css] of light) root.set(name, css);

  const axis = <V extends string>(
    name: keyof typeof STANDARD,
    values: readonly V[],
    tokens: (value: V) => Map<string, string>,
  ): CssRule[] =>
    values.map((value) => ({
      selectors: [`.${axisClass(name, value)}`],
      declarations: declarations(tokens(value)),
    }));
  const resolvedBlock = (
    block: Record<string, unknown>,
    design: DesignOptions,
  ) => {
    const { css } = resolveTokens({ design });
    return new Map(Object.keys(block).map((name) => [name, css[name]]));
  };

  return [
    { selectors: [MINI_ROOT_SELECTOR], declarations: declarations(root) },
    {
      selectors: [`.${miniColorClass("dark", null)}`],
      declarations: declarations(diff(colorTokens("dark", null), light)),
    },
    ...axis("density", DENSITIES, (density) =>
      resolvedBlock(densityTokens[density], { density }),
    ),
    ...axis("radius", RADIUS_SCALES, (radius) =>
      resolvedBlock(radiusTokens[radius], { radius }),
    ),
    ...axis(
      "shadow",
      SHADOW_SCALES,
      (shadow) =>
        new Map(
          SHADOW_STEPS.map((step) => [
            `shadow-${step}`,
            shadow === "none" ? "none" : `var(--${shadowVar(shadow, step)})`,
          ]),
        ),
    ),
    ...axis("fontScale", FONT_SCALES, (fontScale) =>
      resolvedBlock(fontScaleTokens[fontScale], { fontScale }),
    ),
  ];
}

/** Rules of a palette file: the light and dark color classes. */
function paletteRules(palette: Palette): CssRule[] {
  const light = colorTokens("light", null);
  return (["light", "dark"] as const).map((mode) => ({
    selectors: [`.${miniColorClass(mode, palette)}`],
    declarations: declarations(diff(colorTokens(mode, palette), light)),
  }));
}

/** Options of `generateMiniTokensCss`. */
export interface GenerateMiniTokensCssOptions {
  /** Palettes to include (default: all) */
  palettes?: readonly Palette[];
}

/**
 * `tokens.mini.css`: the class-scoped, pre-resolved tokens for
 * mini-programs (base + the chosen palettes).
 */
export function generateMiniTokensCss({
  palettes = PALETTES,
}: GenerateMiniTokensCssOptions = {}): string {
  return stylesheet([...baseRules(), ...palettes.flatMap(paletteRules)]);
}

/**
 * The mini-program token files, split for package size budgets:
 *
 *   tokens.mini.css                  everything (base + every palette)
 *   tokens.mini.base.css             defaults, dark mode, design axes
 *   tokens.mini.palette-<name>.css   one palette (light + dark); load after
 *                                    the base file
 */
export function generateMiniTokensFiles(): Record<string, string> {
  return {
    "tokens.mini.css": generateMiniTokensCss(),
    "tokens.mini.base.css": generateMiniTokensCss({ palettes: [] }),
    ...Object.fromEntries(
      PALETTES.map((palette) => [
        `tokens.mini.palette-${palette}.css`,
        stylesheet(paletteRules(palette)),
      ]),
    ),
  };
}
