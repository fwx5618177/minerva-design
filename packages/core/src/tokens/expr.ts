// Token values as data. A token is either a plain CSS value (string / number)
// or a small formula object (a `var()` reference, an sRGB `color-mix()`, a
// length, a shadow list, a transition...). Formulas serialize to exactly the
// CSS text of `tokens.css` (`toCss`) and are evaluated by `resolveTokens` for
// platforms without CSS variables / color-mix() (React Native, mini-programs).
//
// Platform-neutral: pure data and string building.

/** `var(--name)`: the value of another token. */
export interface TokenRef {
  kind: "ref";
  /** Token name without the leading `--` */
  name: string;
}

/** `color-mix(in srgb, a p%, b)` */
export interface TokenMix {
  kind: "mix";
  a: TokenValue;
  /** Percentage of `a` (0-100); `b` gets the rest */
  amount: number;
  b: TokenValue;
}

/** A length: `0` (unitless zero), `<n>px` or `<n>rem`. */
export interface TokenLength {
  kind: "length";
  value: number;
  unit: "px" | "rem";
}

/** `clamp(min, <n>vw, max)`: a viewport-relative fluid length. */
export interface TokenClamp {
  kind: "clamp";
  min: TokenLength;
  /** Preferred value, in `vw` */
  vw: number;
  max: TokenLength;
}

/** One layer of a `box-shadow`. */
export interface TokenShadowLayer {
  x: number;
  y: number;
  blur: number;
  /** Written only when set (`0 1px 2px 0 <color>` vs `0 1px 2px <color>`) */
  spread?: number;
  color: TokenValue;
}

/** A `box-shadow` value (`none` when there is no layer). */
export interface TokenShadow {
  kind: "shadow";
  layers: TokenShadowLayer[];
}

/** `<duration>ms <easing>` */
export interface TokenTransition {
  kind: "transition";
  /** Milliseconds */
  duration: number;
  easing: string;
}

/** `cubic-bezier(x1, y1, x2, y2)` */
export interface TokenCubicBezier {
  kind: "cubic-bezier";
  points: readonly [number, number, number, number];
}

/** A token formula (data, not an opaque string). */
export type TokenFormula =
  | TokenRef
  | TokenMix
  | TokenLength
  | TokenClamp
  | TokenShadow
  | TokenTransition
  | TokenCubicBezier;

/** A token value: plain CSS text, a number or a formula. */
export type TokenValue = string | number | TokenFormula;

/** An ordered block of token declarations (`name` without `--`). */
export type TokenBlock = Readonly<Record<string, TokenValue>>;

// ---- Constructors ----
// Pure (`__NO_SIDE_EFFECTS__`): the token tables built with them at module
// level are dropped by bundlers when unused.

/*#__NO_SIDE_EFFECTS__*/
export const ref = (name: string): TokenRef => ({ kind: "ref", name });

/*#__NO_SIDE_EFFECTS__*/
export const mix = (
  a: TokenValue,
  amount: number,
  b: TokenValue,
): TokenMix => ({
  kind: "mix",
  a,
  amount,
  b,
});

/*#__NO_SIDE_EFFECTS__*/
export const rem = (value: number): TokenLength => ({
  kind: "length",
  value,
  unit: "rem",
});

/*#__NO_SIDE_EFFECTS__*/
export const px = (value: number): TokenLength => ({
  kind: "length",
  value,
  unit: "px",
});

/*#__NO_SIDE_EFFECTS__*/
export const clamp = (
  min: TokenLength,
  vw: number,
  max: TokenLength,
): TokenClamp => ({ kind: "clamp", min, vw, max });

/*#__NO_SIDE_EFFECTS__*/
export const shadow = (...layers: TokenShadowLayer[]): TokenShadow => ({
  kind: "shadow",
  layers,
});

/*#__NO_SIDE_EFFECTS__*/
export const transition = (
  duration: number,
  easing: string,
): TokenTransition => ({ kind: "transition", duration, easing });

/*#__NO_SIDE_EFFECTS__*/
export const cubicBezier = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): TokenCubicBezier => ({ kind: "cubic-bezier", points: [x1, y1, x2, y2] });

/**
 * Merges token blocks in order (later blocks win). Pure, unlike a module-level
 * object spread, which bundlers must keep (it could run getters).
 */
/*#__NO_SIDE_EFFECTS__*/
export function mergeBlocks<T extends object>(...blocks: T[]): T {
  return Object.assign({}, ...blocks);
}

// ---- Serialization ----

const lengthCss = (value: number) => (value === 0 ? "0" : `${value}px`);

/** CSS text of a token value, exactly as written in `tokens.css`. */
/*#__NO_SIDE_EFFECTS__*/
export function toCss(value: TokenValue): string {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  switch (value.kind) {
    case "ref":
      return `var(--${value.name})`;
    case "mix":
      return `color-mix(in srgb, ${toCss(value.a)} ${value.amount}%, ${toCss(value.b)})`;
    case "length":
      return value.value === 0 ? "0" : `${value.value}${value.unit}`;
    case "clamp":
      return `clamp(${toCss(value.min)}, ${value.vw}vw, ${toCss(value.max)})`;
    case "shadow":
      return value.layers.length === 0
        ? "none"
        : value.layers
            .map((layer) =>
              [
                lengthCss(layer.x),
                lengthCss(layer.y),
                lengthCss(layer.blur),
                ...(layer.spread === undefined
                  ? []
                  : [lengthCss(layer.spread)]),
                toCss(layer.color),
              ].join(" "),
            )
            .join(", ");
    case "transition":
      return `${value.duration}ms ${value.easing}`;
    case "cubic-bezier":
      return `cubic-bezier(${value.points.join(", ")})`;
  }
}
