// Brand (primary) color: the `primaryColor` option of the theme providers.
//
// - `resolvePrimaryColor` validates / normalizes the option to a light / dark
//   pair; a single color gets its dark-mode value from `derivePrimaryDark`.
// - `primaryColorTokens` is the token block a brand color sets: the primary
//   color and every token the default theme derives from it, with the same
//   formulas as `tokens.css` (default-theme.ts), so the web renderers can
//   write it as CSS variables and the native ones evaluate it
//   (`resolveTokens({ primaryColor })`).
//
// Platform-neutral: pure functions, no DOM.
import { dark } from "../theme/themes";

import { formatColor, parseColor, type Rgba } from "./color";
import { defaultThemeTokens } from "./default-theme";
import type { TokenValue } from "./expr";

/** Brand color per color mode. */
export interface PrimaryColorPair {
  light: string;
  dark: string;
}

/**
 * Brand color: one CSS color for both modes (the dark-mode value is derived
 * with `derivePrimaryDark`), or one per mode.
 */
export type PrimaryColor = string | PrimaryColorPair;

// ---- Contrast (WCAG 2.x) ----

const linear = (channel: number) => {
  const c = channel / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};

const gamma = (c: number) =>
  255 * (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);

/** WCAG relative luminance of an sRGB color (alpha ignored), 0-1. */
export function relativeLuminance({ r, g, b }: Rgba): number {
  return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);
}

/**
 * WCAG contrast ratio (1-21) of two colors (any `parseColor` syntax; alpha
 * ignored). `undefined` when a color cannot be parsed.
 */
export function contrastRatio(a: string, b: string): number | undefined {
  const ca = parseColor(a);
  const cb = parseColor(b);
  if (!ca || !cb) return undefined;
  const [hi, lo] = [relativeLuminance(ca), relativeLuminance(cb)].sort(
    (x, y) => y - x,
  );
  return (hi + 0.05) / (lo + 0.05);
}

// ---- OKLab (Björn Ottosson) ----

type Lab = [l: number, a: number, b: number];

function toOklab({ r, g, b }: Rgba): Lab {
  const [R, G, B] = [linear(r), linear(g), linear(b)];
  const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B);
  const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B);
  const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
}

function fromOklab([L, A, B]: Lab, alpha: number): Rgba {
  const l = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3;
  const m = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3;
  const s = (L - 0.0894841775 * A - 1.291485548 * B) ** 3;
  const channel = (c: number) => Math.min(255, Math.max(0, gamma(c)));
  return {
    r: channel(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    g: channel(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    b: channel(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
    a: alpha,
  };
}

/** Options of `derivePrimaryDark`. */
export interface DerivePrimaryDarkOptions {
  /**
   * Dark surface the color must stand out on
   * @default the dark theme's `surface-color` ("#212937")
   */
  background?: string;
  /**
   * Minimum WCAG contrast ratio against `background`
   * @default 4.5
   */
  minContrast?: number;
}

/** Bisection steps of `derivePrimaryDark` (precision 2^-20 of the mix). */
const STEPS = 20;

/**
 * Dark-mode variant of a brand color: the color mixed toward white in OKLab
 * (lightness up, chroma down proportionally, hue kept) by the smallest amount
 * that reaches `minContrast` (WCAG, 4.5:1 by default) against the dark
 * theme's surface, so it stays readable as text and links and keeps the dark
 * `--text-inverse-color` readable on filled controls. A color that already
 * reaches it is returned unchanged (normalized). Deterministic; alpha is
 * kept. `undefined` when the color cannot be parsed.
 *
 *   derivePrimaryDark("#4f46e5"); // "#7b85f2"
 */
export function derivePrimaryDark(
  color: string,
  {
    background = dark["surface-color"]!,
    minContrast = 4.5,
  }: DerivePrimaryDarkOptions = {},
): string | undefined {
  const base = parseColor(color);
  const surface = parseColor(background);
  if (!base || !surface) return undefined;
  const target = relativeLuminance(surface);
  const reaches = (c: Rgba) => {
    const y = relativeLuminance(c);
    return (
      (Math.max(y, target) + 0.05) / (Math.min(y, target) + 0.05) >= minContrast
    );
  };
  // rounded like the serialized result, so the check holds for the output
  const at = (t: number): Rgba => {
    const [l, a, b] = toOklab(base);
    const mixed = fromOklab(
      [l + (1 - l) * t, a * (1 - t), b * (1 - t)],
      base.a,
    );
    return {
      ...mixed,
      r: Math.round(mixed.r),
      g: Math.round(mixed.g),
      b: Math.round(mixed.b),
    };
  };
  if (reaches(base)) return formatColor(base);
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < STEPS; i++) {
    const mid = (lo + hi) / 2;
    if (reaches(at(mid))) hi = mid;
    else lo = mid;
  }
  return formatColor(at(hi));
}

// ---- Validation ----

/** Normalized color, `undefined` when it is not a supported CSS color. */
const validColor = (value: unknown): string | undefined => {
  if (typeof value !== "string") return undefined;
  const color = parseColor(value);
  return color && formatColor(color);
};

/**
 * Validates and normalizes a `primaryColor` option to a light / dark pair:
 * a single color applies to light mode and gets its dark value from
 * `derivePrimaryDark`; a `{ light, dark }` pair is used as-is. Colors are
 * normalized (`#rrggbb` / `rgba()`). Supported syntaxes: hex, `rgb()` /
 * `rgba()`, the basic named colors and `color-mix(in srgb, ...)`.
 * Returns `null` for `null` / `undefined` (no brand color) and `undefined`
 * for an invalid value (renderers ignore it with a development warning,
 * see `invalidPrimaryColorMessage`).
 */
export function resolvePrimaryColor(
  value: unknown,
): PrimaryColorPair | null | undefined {
  if (value === null || value === undefined) return null;
  if (typeof value === "string") {
    const light = validColor(value);
    return light === undefined
      ? undefined
      : { light, dark: derivePrimaryDark(light)! };
  }
  if (typeof value === "object") {
    const pair = value as Partial<PrimaryColorPair>;
    const light = validColor(pair.light);
    const darkColor = validColor(pair.dark);
    return light !== undefined && darkColor !== undefined
      ? { light, dark: darkColor }
      : undefined;
  }
  return undefined;
}

/** Message of the development warning for an invalid `primaryColor`. */
export function invalidPrimaryColorMessage(value: unknown): string {
  let text: string;
  try {
    text = JSON.stringify(value) ?? String(value);
  } catch {
    text = String(value);
  }
  return `ignored an invalid primaryColor (${text}): expected a CSS color (hex, rgb() / rgba(), a basic named color) or a { light, dark } pair of them.`;
}

// ---- Tokens ----

/** Names of the tokens a formula references (`var(--x)`). */
function refsOf(value: TokenValue): string[] {
  if (typeof value !== "object") return [];
  switch (value.kind) {
    case "ref":
      return [value.name];
    case "mix":
      return [...refsOf(value.a), ...refsOf(value.b)];
    case "shadow":
      return value.layers.flatMap((layer) => refsOf(layer.color));
    default:
      return [];
  }
}

/** Tokens of `block` that depend on `name`, directly or transitively. */
function dependents(
  block: Readonly<Record<string, TokenValue>>,
  name: string,
): string[] {
  const found = new Set([name]);
  let grew = true;
  while (grew) {
    grew = false;
    for (const [key, value] of Object.entries(block)) {
      if (!found.has(key) && refsOf(value).some((ref) => found.has(ref))) {
        found.add(key);
        grew = true;
      }
    }
  }
  found.delete(name);
  return Object.keys(block).filter((key) => found.has(key));
}

/**
 * Every token the default theme derives from `--primary-color` (directly or
 * through `--accent-color`): the `primary` and `accent` role tokens (hover,
 * active, subtle, border, text), `selected-color`, `focus-ring-color` and
 * `accent-color`. Computed from the token formulas of `tokens.css`.
 */
export const PRIMARY_DERIVED_TOKENS: readonly string[] =
  /* @__PURE__ */ dependents(defaultThemeTokens, "primary-color");

let accentTokens: ReadonlySet<string> | undefined;

/**
 * `accent-color` and the tokens derived from it. Computed on first use: a
 * module-level `new Set([...spread])` is not tree-shakable.
 */
function accentTokenNames(): ReadonlySet<string> {
  accentTokens ??= new Set([
    "accent-color",
    ...dependents(defaultThemeTokens, "accent-color"),
  ]);
  return accentTokens;
}

/**
 * Whether a theme / palette lets its accent follow the primary color (the
 * default): its `accent-color` is unset, `var(--primary-color)` or the same
 * color as its `primary-color`. Palettes with a distinct accent (e.g.
 * "editorial") keep it when a brand color is set.
 */
export function accentFollowsPrimary(theme?: object | null): boolean {
  const tokens = (theme ?? {}) as Readonly<Record<string, unknown>>;
  const accent = tokens["accent-color"];
  if (accent === undefined || accent === null) return true;
  if (typeof accent === "object") {
    const formula = accent as { kind?: string; name?: string };
    return formula.kind === "ref" && formula.name === "primary-color";
  }
  const text = String(accent).replace(/\s+/g, "");
  if (text === "var(--primary-color)") return true;
  const primary = tokens["primary-color"];
  if (typeof primary !== "string") return false;
  const a = parseColor(String(accent));
  const p = parseColor(primary);
  return !!a && !!p && formatColor(a) === formatColor(p);
}

/**
 * Token block of a brand color (names without `--`): `primary-color` and
 * every token derived from it (`PRIMARY_DERIVED_TOKENS`), with the formulas
 * of the default theme (e.g. `--primary-color-hover` is
 * `color-mix(in srgb, var(--primary-color) 85%, var(--foreground-color))`),
 * so the derived values follow the surface / foreground of the mode or
 * palette they are applied in. The accent tokens are included only when
 * `theme` (the theme or palette the block is applied over) lets its accent
 * follow the primary color (`accentFollowsPrimary`).
 *
 * Web: write `tokenToCss(value)` as `--<name>` CSS variables. Native /
 * mini-programs: evaluate with `resolveTokens({ primaryColor })` (or pass
 * the block as `overrides`).
 */
export function primaryColorTokens(
  color: string,
  theme?: object | null,
): Record<string, TokenValue> {
  const withAccent = accentFollowsPrimary(theme);
  const block: Record<string, TokenValue> = { "primary-color": color };
  for (const name of PRIMARY_DERIVED_TOKENS) {
    if (!withAccent && accentTokenNames().has(name)) continue;
    block[name] = defaultThemeTokens[name];
  }
  return block;
}
