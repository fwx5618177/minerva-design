// Color parsing to straight (non-premultiplied) RGBA in 0-1.

export type Rgba = readonly [number, number, number, number];

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

const parseHex = (hex: string): Rgba | null => {
  const h = hex.slice(1);
  if (!/^[0-9a-f]+$/i.test(h)) return null;
  const expand = h.length === 3 || h.length === 4;
  if (!expand && h.length !== 6 && h.length !== 8) return null;
  const channel = (i: number) =>
    expand
      ? parseInt(h[i] + h[i], 16) / 255
      : parseInt(h.slice(i * 2, i * 2 + 2), 16) / 255;
  const hasAlpha = h.length === 4 || h.length === 8;
  return [channel(0), channel(1), channel(2), hasAlpha ? channel(3) : 1];
};

const parseComponent = (part: string, scale: number): number => {
  const v = parseFloat(part);
  if (Number.isNaN(v)) return 0;
  return part.trim().endsWith("%") ? v / 100 : v / scale;
};

/** Splits `a b c / d` or `a, b, c, d` */
const splitArgs = (args: string): string[] => {
  const [main, alpha] = args.split("/");
  const parts = main.split(/[\s,]+/).filter(Boolean);
  if (alpha !== undefined) parts.push(alpha.trim());
  return parts;
};

/**
 * Parses the color syntaxes returned by `getComputedStyle` (`rgb()`,
 * `rgba()`, `color(srgb ...)`) and hex colors; `null` for anything else
 * (named colors, `oklch()`, ... are resolved by `resolveColor`).
 */
export const parseColor = (input: string): Rgba | null => {
  const value = input.trim().toLowerCase();
  if (value.startsWith("#")) return parseHex(value);
  if (value === "transparent") return [0, 0, 0, 0];
  let match = /^rgba?\((.*)\)$/.exec(value);
  if (match) {
    const parts = splitArgs(match[1]);
    if (parts.length < 3) return null;
    return [
      clamp01(parseComponent(parts[0], 255)),
      clamp01(parseComponent(parts[1], 255)),
      clamp01(parseComponent(parts[2], 255)),
      parts[3] === undefined ? 1 : clamp01(parseComponent(parts[3], 1)),
    ];
  }
  match = /^color\(srgb\s+(.*)\)$/.exec(value);
  if (match) {
    const parts = splitArgs(match[1]);
    if (parts.length < 3) return null;
    return [
      clamp01(parseComponent(parts[0], 1)),
      clamp01(parseComponent(parts[1], 1)),
      clamp01(parseComponent(parts[2], 1)),
      parts[3] === undefined ? 1 : clamp01(parseComponent(parts[3], 1)),
    ];
  }
  return null;
};

let probeContext: CanvasRenderingContext2D | null | undefined;

/** Lets the browser convert any CSS color (named, hsl, oklch, color-mix, ...) */
const parseWithCanvas = (value: string): Rgba | null => {
  if (typeof document === "undefined") return null;
  if (probeContext === undefined) {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    probeContext = canvas.getContext("2d", { willReadFrequently: true });
  }
  const ctx = probeContext;
  if (!ctx) return null;
  ctx.clearRect(0, 0, 1, 1);
  ctx.fillStyle = "#000";
  ctx.fillStyle = value;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
  if (a === 0) return [0, 0, 0, 0];
  // getImageData returns premultiplied-then-unpremultiplied values
  return [r / 255, g / 255, b / 255, a / 255];
};

/**
 * Resolves a CSS color in the context of `element`: `var(--x)`,
 * `color-mix()`, named colors, ... Falls back to `fallback` when the color
 * cannot be resolved (e.g. outside a browser).
 */
export const resolveColor = (
  value: string,
  element: Element | null,
  fallback: Rgba = [0.4, 0.4, 0.4, 1],
): Rgba => {
  const direct = parseColor(value);
  if (direct) return direct;
  let computed = value;
  if (element && typeof getComputedStyle === "function") {
    const probe = element.ownerDocument.createElement("span");
    probe.style.display = "none";
    probe.style.color = value;
    element.appendChild(probe);
    computed = getComputedStyle(probe).color || value;
    probe.remove();
    const parsed = parseColor(computed);
    if (parsed) return parsed;
  }
  return parseWithCanvas(computed) ?? resolveStaticColor(value, {}, fallback);
};

/** Resolves a color to RGBA, falling back to `fallback` */
export type ColorResolver = (value: string, fallback: Rgba) => Rgba;

/** Splits the arguments of `var(--name, fallback)` (the fallback may contain commas) */
const parseVar = (
  value: string,
): { name: string; fallback?: string } | null => {
  const match = /^var\(\s*(--[\w-]+)\s*(?:,([\s\S]*))?\)$/.exec(value.trim());
  if (!match) return null;
  const fallback = match[2]?.trim();
  return { name: match[1], ...(fallback ? { fallback } : {}) };
};

/**
 * Resolves a color without a DOM (mini-programs, React Native, workers):
 * hex, `rgb()`, `transparent` and `var(--name, fallback)` looked up in
 * `variables` (nested fallbacks included).
 */
export const resolveStaticColor = (
  value: string,
  variables: Readonly<Record<string, string>> = {},
  fallback: Rgba = [0.4, 0.4, 0.4, 1],
  depth = 0,
): Rgba => {
  const direct = parseColor(value);
  if (direct) return direct;
  const ref = depth < 8 ? parseVar(value) : null;
  if (ref) {
    const defined = variables[ref.name];
    if (defined)
      return resolveStaticColor(defined, variables, fallback, depth + 1);
    if (ref.fallback)
      return resolveStaticColor(ref.fallback, variables, fallback, depth + 1);
  }
  return NAMED[value.trim().toLowerCase()] ?? fallback;
};

const NAMED: Record<string, Rgba> = {
  black: [0, 0, 0, 1],
  white: [1, 1, 1, 1],
  red: [1, 0, 0, 1],
  green: [0, 128 / 255, 0, 1],
  blue: [0, 0, 1, 1],
  gray: [128 / 255, 128 / 255, 128 / 255, 1],
  grey: [128 / 255, 128 / 255, 128 / 255, 1],
  orange: [1, 165 / 255, 0, 1],
};

/** Resolver of the DOM: CSS variables and any CSS color syntax of `element` */
export const domColorResolver =
  (element: Element | null): ColorResolver =>
  (value, fallback) =>
    resolveColor(value, element, fallback);

const hex2 = (v: number) =>
  Math.round(clamp01(v) * 255)
    .toString(16)
    .padStart(2, "0");

/** `rgba()` string usable by Canvas2D and the DOM */
export const toCss = (c: Rgba, alpha = 1): string =>
  `rgba(${Math.round(c[0] * 255)}, ${Math.round(c[1] * 255)}, ${Math.round(c[2] * 255)}, ${+(c[3] * alpha).toFixed(3)})`;

/** `#rrggbb` (alpha dropped) */
export const toHex = (c: Rgba): string =>
  `#${hex2(c[0])}${hex2(c[1])}${hex2(c[2])}`;

/** Packs a color as little-endian `unorm8x4` (r in the lowest byte) */
export const packColor = (c: Rgba): number =>
  ((Math.round(clamp01(c[3]) * 255) << 24) |
    (Math.round(clamp01(c[2]) * 255) << 16) |
    (Math.round(clamp01(c[1]) * 255) << 8) |
    Math.round(clamp01(c[0]) * 255)) >>>
  0;

/** Mixes two colors (t = 0 -> a, 1 -> b) */
export const mix = (a: Rgba, b: Rgba, t: number): Rgba => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
  a[3] + (b[3] - a[3]) * t,
];

/** Relative luminance (sRGB approximation) */
export const luminance = (c: Rgba): number =>
  0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
