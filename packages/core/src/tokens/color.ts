// sRGB colors for platforms without CSS color functions: parsing of the color
// syntaxes used by the tokens, `color-mix(in srgb, ...)` per CSS Color 5, and
// serialization to hex / rgba() strings (React Native, mini-programs).

/** An sRGB color: channels 0-255 (unrounded), alpha 0-1. */
export interface Rgba {
  r: number;
  g: number;
  b: number;
  a: number;
}

/** CSS basic named colors (+ `transparent`) */
const NAMED: Record<string, string> = {
  black: "#000000",
  silver: "#c0c0c0",
  gray: "#808080",
  grey: "#808080",
  white: "#ffffff",
  maroon: "#800000",
  red: "#ff0000",
  purple: "#800080",
  fuchsia: "#ff00ff",
  magenta: "#ff00ff",
  green: "#008000",
  lime: "#00ff00",
  olive: "#808000",
  yellow: "#ffff00",
  navy: "#000080",
  blue: "#0000ff",
  teal: "#008080",
  aqua: "#00ffff",
  cyan: "#00ffff",
  orange: "#ffa500",
  transparent: "#00000000",
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

function parseHex(hex: string): Rgba | undefined {
  if (!/^[\da-f]+$/i.test(hex)) return undefined;
  const digits =
    hex.length === 3 || hex.length === 4
      ? hex.replace(/./g, (d) => d + d)
      : hex;
  if (digits.length !== 6 && digits.length !== 8) return undefined;
  const channel = (i: number) => parseInt(digits.slice(i, i + 2), 16);
  return {
    r: channel(0),
    g: channel(2),
    b: channel(4),
    a: digits.length === 8 ? channel(6) / 255 : 1,
  };
}

/** A number or percentage component (`pct` = value of 100%). */
function component(text: string, pct: number): number | undefined {
  const match = /^(-?(?:\d+\.?\d*|\.\d+))(%?)$/.exec(text);
  if (!match) return undefined;
  const value = Number(match[1]);
  return match[2] ? (value / 100) * pct : value;
}

function parseRgbFunction(args: string): Rgba | undefined {
  // rgb(r, g, b[, a]) or rgb(r g b[ / a])
  const parts = args.includes(",")
    ? args.split(",").map((p) => p.trim())
    : args
        .replace("/", " / ")
        .trim()
        .split(/\s+/)
        .filter((p) => p !== "/");
  if (parts.length !== 3 && parts.length !== 4) return undefined;
  const [r, g, b] = parts.slice(0, 3).map((p) => component(p, 255));
  const a = parts.length === 4 ? component(parts[3], 1) : 1;
  if ([r, g, b, a].some((v) => v === undefined || Number.isNaN(v))) {
    return undefined;
  }
  return {
    r: clamp(r!, 0, 255),
    g: clamp(g!, 0, 255),
    b: clamp(b!, 0, 255),
    a: clamp(a!, 0, 1),
  };
}

/** Splits `text` on top-level commas (outside parentheses). */
export function splitTopLevel(text: string, separator = ","): string[] {
  const parts: string[] = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === "(") depth++;
    else if (char === ")") depth--;
    else if (depth === 0 && char === separator) {
      parts.push(text.slice(start, i).trim());
      start = i + 1;
    }
  }
  parts.push(text.slice(start).trim());
  return parts;
}

/** `<color> [<percentage>]` of a color-mix() argument */
function mixArgument(
  text: string,
): { color: Rgba; pct: number | undefined } | undefined {
  const trailing = /^(.+?)\s+(-?[\d.]+)%$/s.exec(text);
  const leading = /^(-?[\d.]+)%\s+(.+)$/s.exec(text);
  const [colorText, pctText] = trailing
    ? [trailing[1], trailing[2]]
    : leading
      ? [leading[2], leading[1]]
      : [text, undefined];
  const color = parseColor(colorText);
  if (!color) return undefined;
  return { color, pct: pctText === undefined ? undefined : Number(pctText) };
}

/**
 * Parses a CSS color: `#rgb`, `#rgba`, `#rrggbb`, `#rrggbbaa`, `rgb()` /
 * `rgba()` (legacy comma or modern space syntax), the basic named colors,
 * `transparent` and `color-mix(in srgb, ...)` (nested mixes included).
 * Returns `undefined` for anything else (system colors, other color spaces).
 */
export function parseColor(text: string): Rgba | undefined {
  const value = text.trim().toLowerCase();
  if (value.startsWith("#")) return parseHex(value.slice(1));
  if (value in NAMED) return parseHex(NAMED[value].slice(1));
  const fn = /^([a-z-]+)\((.*)\)$/s.exec(value);
  if (!fn) return undefined;
  const [, name, args] = fn;
  if (name === "rgb" || name === "rgba") return parseRgbFunction(args);
  if (name !== "color-mix") return undefined;
  const [space, first, second] = splitTopLevel(args);
  if (space !== "in srgb" || first === undefined || second === undefined) {
    return undefined;
  }
  const a = mixArgument(first);
  const b = mixArgument(second);
  if (!a || !b) return undefined;
  return mixRgba(a.color, b.color, a.pct, b.pct);
}

/**
 * `color-mix(in srgb, a p1%, b p2%)` on parsed colors, per CSS Color 5:
 *
 * - percentages: both omitted = 50 / 50; one omitted = 100 minus the other;
 *   both given and summing to 0 = invalid (`undefined`); a sum other than 100
 *   is scaled to 100, and a sum below 100 also multiplies the result alpha by
 *   `sum / 100`;
 * - channels are interpolated premultiplied by alpha (so `transparent` adds
 *   no color, only transparency), then un-premultiplied.
 *
 * Channels are not rounded (see `formatColor`).
 */
export function mixRgba(
  a: Rgba,
  b: Rgba,
  p1?: number,
  p2?: number,
): Rgba | undefined {
  if ([p1, p2].some((p) => p !== undefined && (p < 0 || p > 100))) {
    return undefined;
  }
  let w1 = p1 ?? (p2 === undefined ? 50 : 100 - p2);
  let w2 = p2 ?? 100 - w1;
  const sum = w1 + w2;
  if (sum === 0) return undefined;
  const multiplier = sum < 100 ? sum / 100 : 1;
  w1 /= sum;
  w2 /= sum;
  const alpha = a.a * w1 + b.a * w2;
  const channel = (c1: number, c2: number) =>
    alpha === 0 ? 0 : (c1 * a.a * w1 + c2 * b.a * w2) / alpha;
  return {
    r: channel(a.r, b.r),
    g: channel(a.g, b.g),
    b: channel(a.b, b.b),
    a: alpha * multiplier,
  };
}

const ALPHA_DECIMALS = 1000;

const hex2 = (value: number) => value.toString(16).padStart(2, "0");

/**
 * Serializes a color: `#rrggbb` (lowercase) when opaque, `rgba(r, g, b, a)`
 * otherwise. Channels are rounded half up to integers (127.5 -> 128) and
 * clamped to 0-255; alpha is rounded to 3 decimals (an alpha that rounds to 1
 * is opaque).
 */
export function formatColor({ r, g, b, a }: Rgba): string {
  const [R, G, B] = [r, g, b].map((c) => clamp(Math.round(c), 0, 255));
  const alpha = Math.round(clamp(a, 0, 1) * ALPHA_DECIMALS) / ALPHA_DECIMALS;
  return alpha === 1
    ? `#${hex2(R)}${hex2(G)}${hex2(B)}`
    : `rgba(${R}, ${G}, ${B}, ${alpha})`;
}

/**
 * `color-mix(in srgb, a <amount>%, b)` as a hex / rgba() string (see
 * `mixRgba` for the mixing rules and `formatColor` for the rounding).
 * `amountB` sets the second percentage explicitly. Returns `undefined` when a
 * color cannot be parsed or the percentages are invalid.
 */
export function colorMix(
  a: string,
  b: string,
  amount?: number,
  amountB?: number,
): string | undefined {
  const ca = parseColor(a);
  const cb = parseColor(b);
  const mixed = ca && cb ? mixRgba(ca, cb, amount, amountB) : undefined;
  return mixed && formatColor(mixed);
}

/** Normalizes any supported color to `formatColor` output. */
export function normalizeColor(text: string): string | undefined {
  const color = parseColor(text);
  return color && formatColor(color);
}
