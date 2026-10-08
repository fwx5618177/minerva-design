// Evaluation of the CSS values used by the tokens, without a CSS engine:
// `var()` substitution, lengths (px / rem / em / vw / vh, calc(), min(),
// max(), clamp()), box-shadow lists, transitions and easing curves.
import { formatColor, parseColor, splitTopLevel } from "./color";

/** Context of length evaluation. */
export interface LengthContext {
  /** px per rem / em */
  rootFontSize: number;
  /** px per 100vw */
  viewportWidth: number;
  /** px per 100vh */
  viewportHeight: number;
}

/** Index of the `)` closing the `(` at `open`, or -1. */
function closingParen(text: string, open: number): number {
  let depth = 0;
  for (let i = open; i < text.length; i++) {
    if (text[i] === "(") depth++;
    else if (text[i] === ")" && --depth === 0) return i;
  }
  return -1;
}

/**
 * Replaces every `var(--name[, fallback])` of `text` using `lookup` (which
 * returns the substituted value of a token, or `undefined`). Returns
 * `undefined` when a reference cannot be resolved and has no fallback (the
 * CSS "guaranteed-invalid" value).
 */
export function substituteVars(
  text: string,
  lookup: (name: string) => string | undefined,
): string | undefined {
  let out = "";
  let index = 0;
  for (;;) {
    const start = text.indexOf("var(", index);
    if (start < 0) return out + text.slice(index);
    const end = closingParen(text, start + 3);
    if (end < 0) return undefined;
    const [name, ...rest] = splitTopLevel(text.slice(start + 4, end));
    const fallback = rest.length ? rest.join(",") : undefined;
    const value =
      (name.startsWith("--") ? lookup(name.slice(2)) : undefined) ??
      (fallback === undefined ? undefined : substituteVars(fallback, lookup));
    if (value === undefined) return undefined;
    out += text.slice(index, start) + value;
    index = end + 1;
  }
}

// ---- Lengths ----

type Num = { value: number; length: boolean };

/** Tiny recursive-descent evaluator of length expressions. */
class LengthParser {
  private i = 0;
  constructor(
    private readonly text: string,
    private readonly context: LengthContext,
  ) {}

  parse(): number | undefined {
    const result = this.sum();
    this.space();
    if (!result || this.i !== this.text.length) return undefined;
    // a unitless number is a length only when it is 0
    return result.length || result.value === 0 ? result.value : undefined;
  }

  private space() {
    while (/\s/.test(this.text[this.i] ?? "")) this.i++;
  }

  private sum(): Num | undefined {
    let left = this.product();
    for (;;) {
      this.space();
      const op = this.text[this.i];
      if (!left || (op !== "+" && op !== "-")) return left;
      this.i++;
      const right = this.product();
      if (!right || right.length !== left.length) return undefined;
      left = {
        value: op === "+" ? left.value + right.value : left.value - right.value,
        length: left.length,
      };
    }
  }

  private product(): Num | undefined {
    let left = this.atom();
    for (;;) {
      this.space();
      const op = this.text[this.i];
      if (!left || (op !== "*" && op !== "/")) return left;
      this.i++;
      const right = this.atom();
      if (!right) return undefined;
      if (op === "*") {
        if (left.length && right.length) return undefined;
        left = {
          value: left.value * right.value,
          length: left.length || right.length,
        };
      } else {
        if (right.length || right.value === 0) return undefined;
        left = { value: left.value / right.value, length: left.length };
      }
    }
  }

  private args(): Num[] | undefined {
    const values: Num[] = [];
    for (;;) {
      const value = this.sum();
      if (!value) return undefined;
      values.push(value);
      this.space();
      const char = this.text[this.i++];
      if (char === ")") return values;
      if (char !== ",") return undefined;
    }
  }

  private atom(): Num | undefined {
    this.space();
    const rest = this.text.slice(this.i);
    const fn = /^(calc|min|max|clamp)?\(/.exec(rest);
    if (fn) {
      this.i += fn[0].length;
      const args = this.args();
      if (!args || args.some((a) => a.length !== args[0].length)) {
        return undefined;
      }
      const values = args.map((a) => a.value);
      const length = args[0].length;
      switch (fn[1]) {
        case "min":
          return { value: Math.min(...values), length };
        case "max":
          return { value: Math.max(...values), length };
        case "clamp":
          return values.length === 3
            ? {
                value: Math.max(values[0], Math.min(values[1], values[2])),
                length,
              }
            : undefined;
        default:
          return values.length === 1 ? args[0] : undefined;
      }
    }
    const number = /^(-?(?:\d+\.?\d*|\.\d+))(px|rem|em|vw|vh)?/.exec(rest);
    if (!number) return undefined;
    this.i += number[0].length;
    const value = Number(number[1]);
    const { rootFontSize, viewportWidth, viewportHeight } = this.context;
    const scale = {
      px: 1,
      rem: rootFontSize,
      em: rootFontSize,
      vw: viewportWidth / 100,
      vh: viewportHeight / 100,
    };
    return number[2]
      ? { value: value * scale[number[2] as keyof typeof scale], length: true }
      : { value, length: false };
  }
}

/**
 * A length in px: `0`, `<n>px|rem|em|vw|vh` and `calc()` / `min()` / `max()`
 * / `clamp()` of those. `undefined` when not a length.
 */
export const evaluateLength = (
  text: string,
  context: LengthContext,
): number | undefined => new LengthParser(text.trim(), context).parse();

/** Rounds to 4 decimals (removes floating point noise). */
export const round = (value: number) => Math.round(value * 1e4) / 1e4;

// ---- Shadows ----

/** One resolved `box-shadow` layer (px, normalized color). */
export interface ResolvedShadowLayer {
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
  inset: boolean;
}

/**
 * A resolved shadow: the layers, the CSS text and React Native's shadow props
 * (from the first layer): `color` is opaque and `opacity` carries its alpha,
 * `radius` is half the blur, `elevation` (Android) the rounded half blur.
 */
export interface ResolvedShadow {
  css: string;
  layers: ResolvedShadowLayer[];
  color: string;
  offset: { width: number; height: number };
  opacity: number;
  radius: number;
  elevation: number;
}

const noShadow = (): ResolvedShadow => ({
  css: "none",
  layers: [],
  color: "#000000",
  offset: { width: 0, height: 0 },
  opacity: 0,
  radius: 0,
  elevation: 0,
});

const pxCss = (value: number) => `${round(value)}px`;

/** Parses a `box-shadow` value (`undefined` when invalid). */
export function evaluateShadow(
  text: string,
  context: LengthContext,
): ResolvedShadow | undefined {
  if (text.trim() === "none") return noShadow();
  const layers: ResolvedShadowLayer[] = [];
  for (const layerText of splitTopLevel(text)) {
    const parts = splitTopLevel(layerText.replace(/\s+/g, " "), " ");
    const inset = parts.includes("inset");
    const lengths: number[] = [];
    const rest: string[] = [];
    for (const part of parts) {
      if (part === "inset") continue;
      const length = rest.length ? undefined : evaluateLength(part, context);
      if (length === undefined) rest.push(part);
      else lengths.push(length);
    }
    const color = parseColor(rest.length ? rest.join(" ") : "black");
    if (lengths.length < 2 || lengths.length > 4 || !color) return undefined;
    const [x, y, blur = 0, spread = 0] = lengths;
    layers.push({ x, y, blur, spread, color: formatColor(color), inset });
  }
  const css = layers
    .map((l) =>
      [
        ...(l.inset ? ["inset"] : []),
        pxCss(l.x),
        pxCss(l.y),
        pxCss(l.blur),
        ...(l.spread ? [pxCss(l.spread)] : []),
        l.color,
      ].join(" "),
    )
    .join(", ");
  const first = layers[0];
  const color = parseColor(first.color)!;
  return {
    css,
    layers,
    color: formatColor({ ...color, a: 1 }),
    offset: { width: first.x, height: first.y },
    opacity: round(color.a),
    radius: round(first.blur / 2),
    elevation: Math.round(first.blur / 2),
  };
}

// ---- Motion ----

/** A resolved transition shorthand (`120ms ease-out`). */
export interface ResolvedTransition {
  css: string;
  /** Milliseconds */
  duration: number;
  easing: string;
}

/** Parses `<duration> [<easing>]` (`undefined` when invalid). */
export function evaluateTransition(
  text: string,
): ResolvedTransition | undefined {
  const match = /^(\d*\.?\d+)(ms|s)(?:\s+(.+))?$/.exec(text.trim());
  if (!match) return undefined;
  const duration = Number(match[1]) * (match[2] === "s" ? 1000 : 1);
  return { css: text.trim(), duration, easing: match[3] ?? "ease" };
}

/** Control points of the CSS easing keywords. */
const EASINGS: Record<string, [number, number, number, number]> = {
  linear: [0, 0, 1, 1],
  ease: [0.25, 0.1, 0.25, 1],
  "ease-in": [0.42, 0, 1, 1],
  "ease-out": [0, 0, 0.58, 1],
  "ease-in-out": [0.42, 0, 0.58, 1],
};

/** Control points of a `cubic-bezier()` or easing keyword. */
export function evaluateEasing(
  text: string,
): [number, number, number, number] | undefined {
  const value = text.trim();
  if (value in EASINGS) return [...EASINGS[value]];
  const match = /^cubic-bezier\((.*)\)$/.exec(value);
  const points = match?.[1].split(",").map(Number);
  return points?.length === 4 && points.every(Number.isFinite)
    ? (points as [number, number, number, number])
    : undefined;
}
