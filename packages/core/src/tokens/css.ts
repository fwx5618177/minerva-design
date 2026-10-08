// `tokens.css` (published as `minerva-design/tokens.css`), generated from the
// token data. The output is byte-identical to what the former Sass sources
// compiled to (`tokens.golden.css` test).
//
// Order matters: default (light) color tokens, scale tokens, then the palette
// blocks ([data-palette] x [data-theme]), which must come after :root, then
// the design axes ([data-density] / [data-radius] / [data-shadow] /
// [data-font-scale]), which win over both, and the user preference media
// queries.
import { DESIGN_ATTRIBUTES } from "../theme/design";
import { PALETTES } from "../theme/mode";
import { palettes } from "../theme/palettes";
import { dark } from "../theme/themes";
import type { ComponentTheme } from "../theme/types";
import { forcedColorsTokens, reducedMotionTokens } from "./accessibility";
import { defaultThemeTokens } from "./default-theme";
import {
  densityTokens,
  fontScaleTokens,
  radiusTokens,
  shadowTokens,
} from "./design";
import { toCss, type TokenBlock } from "./expr";
import { scaleTokens } from "./scales";

/** One style rule: selectors and `property: value` declarations. */
export interface CssRule {
  selectors: readonly string[];
  declarations: ReadonlyArray<readonly [property: string, value: string]>;
}

/** Declarations of a token block (`--name: value`). */
export const tokenDeclarations = (
  /** A token block or a theme object */
  block: TokenBlock | ComponentTheme,
  /** Rewrites each value (e.g. quote normalization) */
  map: (css: string) => string = (css) => css,
): CssRule["declarations"] =>
  Object.entries(block as TokenBlock).map(([name, value]) => [
    `--${name}`,
    map(toCss(value)),
  ]);

/** Serializes rules in the expanded style (`depth` = nesting depth). */
export function serializeRules(rules: readonly CssRule[], depth = 0): string[] {
  const pad = "  ".repeat(depth);
  return rules.map(
    ({ selectors, declarations }) =>
      `${pad}${selectors.join(`,\n${pad}`)} {\n${declarations
        .map(([property, value]) => `${pad}  ${property}: ${value};`)
        .join("\n")}\n${pad}}`,
  );
}

/** `@media <query> { <rules> }` */
const mediaBlock = (query: string, rules: readonly CssRule[]) =>
  `@media ${query} {\n${serializeRules(rules, 1).join("\n\n")}\n}`;

/** `[name=value]` (unquoted: every value is an identifier) */
const attr = (name: string, value?: string) =>
  value === undefined ? `[${name}]` : `[${name}=${value}]`;

/** Font stacks are written with double quotes in the stylesheet. */
const doubleQuotes = (css: string) => css.replace(/'/g, '"');

const ROOT = [":root", "[data-minerva-theme-scope]"];

/** Visually hidden but available to assistive technology. */
const srOnly = (): CssRule => ({
  selectors: [".minerva-sr-only"],
  declarations: (
    [
      ["position", "absolute"],
      ["width", "1px"],
      ["height", "1px"],
      ["padding", "0"],
      ["margin", "-1px"],
      ["overflow", "hidden"],
      ["clip", "rect(0, 0, 0, 0)"],
      ["white-space", "nowrap"],
      ["border", "0"],
    ] as const
  ).map(([property, value]) => [property, `${value} !important`] as const),
});

/** Palette blocks: light (also the default mode) and dark of each palette. */
function paletteRules(): CssRule[] {
  const theme = attr.bind(null, "data-theme");
  return PALETTES.flatMap((name) => {
    const palette = attr("data-palette", name);
    return [
      {
        selectors: [
          `${palette}${theme("light")}`,
          `${palette}:not(${theme("dark")})`,
        ],
        declarations: tokenDeclarations(palettes[name].light, doubleQuotes),
      },
      {
        selectors: [`${palette}${theme("dark")}`],
        declarations: tokenDeclarations(palettes[name].dark, doubleQuotes),
      },
    ];
  });
}

/** Design axes blocks; selectors doubled to outrank the palette blocks. */
function designRules(): CssRule[] {
  const axes: Array<
    [keyof typeof DESIGN_ATTRIBUTES, Record<string, TokenBlock>]
  > = [
    ["density", densityTokens],
    ["radius", radiusTokens],
    ["shadow", shadowTokens],
    ["fontScale", fontScaleTokens],
  ];
  return axes.flatMap(([axis, blocks]) => {
    const name = DESIGN_ATTRIBUTES[axis];
    return Object.entries(blocks).map(([value, block]) => ({
      selectors: [`${attr(name, value)}${attr(name)}`],
      declarations: tokenDeclarations(block),
    }));
  });
}

/** Options of `generateTokensCss`. */
export interface GenerateTokensCssOptions {
  /**
   * Cascade layer wrapping the stylesheet (`false`: unlayered, as consumed by
   * bundlers that layer the CSS themselves)
   * @default "minerva"
   */
  layer?: string | false;
}

/**
 * The design tokens stylesheet (`minerva-design/tokens.css`), ending with a
 * newline.
 */
export function generateTokensCss({
  layer = "minerva",
}: GenerateTokensCssOptions = {}): string {
  const rules: CssRule[] = [
    { selectors: ROOT, declarations: tokenDeclarations(defaultThemeTokens) },
    { selectors: [":root"], declarations: tokenDeclarations(scaleTokens) },
    srOnly(),
    ...paletteRules(),
    // Minerva's own dark mode without a palette: lets the init script (which
    // only sets data-theme) render the dark theme before hydration.
    {
      selectors: [`${attr("data-theme", "dark")}:not(${attr("data-palette")})`],
      declarations: tokenDeclarations(dark),
    },
    ...designRules(),
  ];
  const onRoot = (block: TokenBlock): CssRule[] => [
    { selectors: [":root"], declarations: tokenDeclarations(block) },
  ];
  const media = [
    mediaBlock("(prefers-reduced-motion: reduce)", onRoot(reducedMotionTokens)),
    mediaBlock("(forced-colors: active)", onRoot(forcedColorsTokens)),
  ].join("\n");
  const body = [...serializeRules(rules), media].join("\n\n");
  return layer ? `@layer ${layer} {\n${body}\n}\n` : `${body}\n`;
}
