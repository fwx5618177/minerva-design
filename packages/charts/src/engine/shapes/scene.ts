// Drawable scene of a shape chart: resolved geometry, colors and texts,
// produced by the (DOM-free) layouts and consumed by draw / hit testing.

import { mix, parseColor, toCss, type Rgba } from "../color";

import { font } from "../overlay";
import type { ChartTheme } from "../theme";
import type { ChartPadding } from "../types";
import type {
  ShapeChartLabels,
  ShapeChartType,
  ShapeHoverEvent,
} from "./types";

export const TAU = Math.PI * 2;

/** Rectangle in CSS pixels */
export interface ShapeRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface NodeBase {
  /** Index of the item the node belongs to (hover, dimming); none for decorations */
  hit?: number;
  /**
   * Other items whose hover also emphasizes the node (the flows of a hovered
   * sankey node, the ancestors of a hovered sunburst sector); hit testing
   * only uses `hit`
   */
  also?: readonly number[];
  /** Opacity multiplier */
  alpha?: number;
  /** Offset applied while the node's item is hovered (pie slices pop out) */
  shift?: [number, number];
}

/** Annular sector (pie slice, donut segment, ring) */
export interface SectorNode extends NodeBase {
  kind: "sector";
  cx: number;
  cy: number;
  r0: number;
  r1: number;
  /** Canvas angles (radians, clockwise from 3 o'clock) */
  a0: number;
  a1: number;
  /** Gap with the neighbours, in pixels */
  pad: number;
  /** Corner radius, in pixels */
  corner: number;
  fill: string;
}

/** Polygon (radar grid / series, funnel stage); `hole` is cut out */
export interface PolygonNode extends NodeBase {
  kind: "polygon";
  /** Flat x, y list */
  points: number[];
  hole?: number[];
  fill?: string;
  stroke?: string;
  lineWidth?: number;
  /** Corner radius, in pixels */
  radius?: number;
  /** Fill / stroke width when hovered */
  hoverFill?: string;
  hoverLineWidth?: number;
  /** Lightens the shape when hovered */
  brighten?: boolean;
}

export interface RectNode extends NodeBase {
  kind: "rect";
  x: number;
  y: number;
  width: number;
  height: number;
  radius: number;
  fill: string;
  brighten?: boolean;
  /** Outline drawn inside the rectangle while its item is hovered */
  hoverStroke?: string;
  /** Distance (px) around the rectangle still picked by hit testing (default 0) */
  hitPad?: number;
}

/** Stroked arc (gauge track / value) */
export interface ArcNode extends NodeBase {
  kind: "arc";
  cx: number;
  cy: number;
  r: number;
  a0: number;
  a1: number;
  width: number;
  color: string;
  cap: "round" | "butt";
  /** Distance (px) beyond the stroke still picked by hit testing (default 4) */
  hitPad?: number;
}

/** Dot; without fill nor stroke it is only a hit area */
export interface CircleNode extends NodeBase {
  kind: "circle";
  cx: number;
  cy: number;
  r: number;
  fill?: string;
  stroke?: string;
  lineWidth?: number;
  /** Radar: indicator of the vertex */
  indicator?: number;
  /** Radius and halo color when the vertex is hovered */
  hoverR?: number;
  halo?: string;
}

export interface LineNode extends NodeBase {
  kind: "line";
  points: number[];
  color: string;
  width: number;
  dash?: number[];
}

export interface TextNode extends NodeBase {
  kind: "text";
  x: number;
  y: number;
  text: string;
  font: string;
  color: string;
  align: "left" | "center" | "right";
  baseline: "top" | "middle" | "bottom" | "alphabetic";
  /** Radar: indicator of the label */
  indicator?: number;
  hoverColor?: string;
  hoverFont?: string;
  /** Rotation around (x, y), radians clockwise */
  rotate?: number;
  /** Outline drawn behind the text so it reads over other marks */
  halo?: string;
}

/**
 * Sankey flow: a horizontal S-curve (cubic Bézier) of constant thickness
 * from (x0, y0) to (x1, y1), filled with a gradient from `color0` to `color1`
 */
export interface LinkNode extends NodeBase {
  kind: "link";
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  /** Thickness, in pixels */
  width: number;
  color0: string;
  color1: string;
  /** Opacity while the link (or one of its `also` items) is hovered */
  activeAlpha?: number;
}

/**
 * Chord ribbon: the source arc (s0 to s1) and the target arc (t0 to t1) at
 * radius `r`, joined by quadratic curves through the center, filled with a
 * gradient from `color0` to `color1`; `head` > 0 replaces the target arc with
 * an arrowhead of that length
 */
export interface RibbonNode extends NodeBase {
  kind: "ribbon";
  cx: number;
  cy: number;
  r: number;
  /** Canvas angles (radians, clockwise from 3 o'clock) */
  s0: number;
  s1: number;
  t0: number;
  t1: number;
  /** Arrowhead length, in pixels (0 = none) */
  head: number;
  color0: string;
  color1: string;
  /** Opacity while the ribbon (or one of its `also` items) is hovered */
  activeAlpha?: number;
}

/** Radar: dashed guide from the center to the hovered indicator */
export interface GuideNode extends NodeBase {
  kind: "guide";
  cx: number;
  cy: number;
  /** End of each spoke */
  ends: [number, number][];
  color: string;
}

export type ShapeNode =
  | SectorNode
  | PolygonNode
  | RectNode
  | ArcNode
  | CircleNode
  | LineNode
  | TextNode
  | GuideNode
  | LinkNode
  | RibbonNode;

/** A row of the default tooltip */
export interface ShapeTooltipRow {
  name: string;
  value: string;
  color?: string;
  strong?: boolean;
}

/** Something the pointer / keyboard can focus */
export interface ShapeItem {
  index: number;
  name: string;
  value: number;
  percent: number;
  /** `percent` formatted for screen readers (`percentFormat`) */
  share?: string;
  color: string;
  path?: string[];
  /** Anchor of the tooltip when focused with the keyboard */
  x: number;
  y: number;
  /** Rows of the default tooltip */
  rows: ShapeTooltipRow[];
  /** Radar: one entry per indicator */
  indicators?: {
    name: string;
    value: number;
    percent: number;
    x: number;
    y: number;
  }[];
  /** Extra fields of the hover event (calendar date, sankey link / chord ribbon ends) */
  event?: Pick<ShapeHoverEvent, "date" | "source" | "target" | "reverseValue">;
  /** Sunburst: path focused when the item is activated (click, Enter) */
  drill?: string[];
}

/** What is hovered: an item (and a radar indicator) */
export interface ShapeHover {
  index: number;
  indicator?: number;
}

export interface ShapeLegendEntry {
  /** Index passed to `toggle` */
  index: number;
  name: string;
  color: string;
  hidden: boolean;
}

export interface ShapeScene {
  type: ShapeChartType;
  /** Size of the whole drawing */
  width: number;
  height: number;
  nodes: ShapeNode[];
  /** Focusable items, in keyboard order */
  items: ShapeItem[];
  /** Opacity of the other marks while one is hovered */
  dim: number;
  /** Entry animation of funnels / treemaps: fade and scale around a point */
  enter?: { alpha: number; scale: number; cx: number; cy: number };
  /**
   * Arrow-key moves in a grid of items (calendar heatmap), in positions of
   * `items`: `next` for Left / Right, `down` for Up / Down; no wrapping
   */
  steps?: { next: number; down: number };
  /** Radar geometry used by hit testing (and to keep the tooltip off the labels) */
  radar?: {
    cx: number;
    cy: number;
    radius: number;
    angles: number[];
    series: { index: number; points: number[] }[];
    /** Boxes of the indicator labels */
    labels?: ShapeRect[];
  };
  /** No data to draw (placeholder shown) */
  empty: boolean;
  /** Built-in texts of the chart's locale (accessible descriptions) */
  labels?: ShapeChartLabels;
  /** Resolved locale of the chart */
  locale?: string;
}

/** Measures a text in a CSS font */
export type MeasureText = (text: string, font: string) => number;

/** Approximate width of a text without a canvas (tests, SSR) */
export const estimateText: MeasureText = (text, f) => {
  const size = /(\d+(?:\.\d+)?)px/.exec(f);
  return text.length * (size ? Number(size[1]) : 12) * 0.6;
};

/** What the layouts of every type get */
export interface LayoutContext {
  theme: ChartTheme;
  measure: MeasureText;
  hidden: ReadonlySet<number>;
  /** Entry progress, eased (1 when done) */
  enter: number;
  /** Displayed (animated) value of a key */
  value(key: string, target: number): number;
  format(value: number): string;
  /** Formats a share (0-1): `percentFormat` or a locale percent with one decimal */
  percent(share: number): string;
  /** Built-in texts (locale and `texts` overrides) */
  labels: ShapeChartLabels;
  /** Resolved locale */
  locale: string;
  /** Color of the `i`-th mark (custom `color` or the palette) */
  color(css: string | undefined, i: number): Rgba;
  /** Drawing area, padding excluded */
  area: ShapeRect;
  /** Sunburst: names from the root to the focused node */
  focus: readonly string[];
}

export type LayoutResult = Omit<
  ShapeScene,
  "type" | "width" | "height" | "labels" | "locale"
>;

export const clamp = (v: number, lo: number, hi: number) =>
  v < lo ? lo : v > hi ? hi : v;

/** Non-negative finite number */
export const positive = (v: number | undefined) =>
  typeof v === "number" && Number.isFinite(v) && v > 0 ? v : 0;

export const finite = (v: number | undefined, fallback = 0) =>
  typeof v === "number" && Number.isFinite(v) ? v : fallback;

export const sum = (values: readonly number[]) => {
  let s = 0;
  for (const v of values) s += v;
  return s;
};

export const easeOutCubic = (t: number) => 1 - Math.pow(1 - clamp(t, 0, 1), 3);

/** Angle brought into (-π/2, π/2] so that text rotated by it reads left to right */
export const upright = (a: number) => {
  let r = a % TAU;
  if (r > Math.PI) r -= TAU;
  if (r <= -Math.PI) r += TAU;
  if (r > Math.PI / 2) r -= Math.PI;
  else if (r <= -Math.PI / 2) r += Math.PI;
  return r;
};

export const inset = (rect: ShapeRect, padding?: ChartPadding): ShapeRect => {
  const top = padding?.top ?? 8;
  const right = padding?.right ?? 8;
  const bottom = padding?.bottom ?? 8;
  const left = padding?.left ?? 8;
  return {
    x: rect.x + left,
    y: rect.y + top,
    width: Math.max(0, rect.width - left - right),
    height: Math.max(0, rect.height - top - bottom),
  };
};

/** Shortens a text with an ellipsis so it fits in `max` pixels ("" if nothing fits) */
export const ellipsize = (
  text: string,
  max: number,
  font: string,
  measure: MeasureText,
): string => {
  if (measure(text, font) <= max) return text;
  if (measure("…", font) > max) return "";
  let lo = 0;
  let hi = text.length;
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if (measure(text.slice(0, mid) + "…", font) <= max) lo = mid;
    else hi = mid - 1;
  }
  return lo ? text.slice(0, lo).trimEnd() + "…" : "";
};

/** Characters that must not start a line (closing brackets and punctuation) */
const NO_LINE_START = /^[)\]}、。，．：；！？）」』】》〉,.:;!?%…]/;

/** Greedy line breaking at `max` pixels, without a line limit */
const breakLines = (
  text: string,
  max: number,
  font: string,
  measure: MeasureText,
): string[] | null => {
  const lines: string[] = [];
  let rest = text.trim();
  while (rest) {
    if (measure(rest, font) <= max) {
      lines.push(rest);
      break;
    }
    // longest prefix that fits
    let lo = 0;
    let hi = rest.length;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (measure(rest.slice(0, mid), font) <= max) lo = mid;
      else hi = mid - 1;
    }
    if (!lo) return null;
    let cut = lo;
    if (rest[lo] !== " ") {
      const space = rest.lastIndexOf(" ", lo);
      if (space > lo * 0.4) cut = space;
      // keep closing punctuation with the word before it
      else while (cut > 1 && NO_LINE_START.test(rest.slice(cut))) cut--;
    }
    lines.push(rest.slice(0, cut).trimEnd());
    rest = rest.slice(cut).trimStart();
  }
  return lines;
};

/**
 * Breaks a text into at most `maxLines` lines of `max` pixels, at spaces when
 * possible (anywhere otherwise, e.g. CJK, never before closing punctuation);
 * a text that fits is balanced across its lines, one that does not ends the
 * last line with an ellipsis
 */
export const wrapText = (
  text: string,
  max: number,
  font: string,
  measure: MeasureText,
  maxLines = 2,
): string[] => {
  const whole = text.trim();
  if (!whole || maxLines < 1) return [];
  const lines = breakLines(whole, max, font, measure);
  if (!lines) {
    const last = ellipsize(whole, max, font, measure);
    return last ? [last] : [];
  }
  if (lines.length > maxLines) {
    const head = lines.slice(0, maxLines - 1);
    // the text after the kept lines (each line is a prefix of the rest)
    let rest = whole;
    for (const line of head) rest = rest.slice(line.length).trimStart();
    const tail = ellipsize(rest, max, font, measure);
    return tail ? [...head, tail] : head;
  }
  if (lines.length < 2) return lines;
  // balance: the narrowest width that still needs as many lines
  const total = measure(whole, font);
  const lo = total / lines.length;
  for (let k = 0; k <= 8; k++) {
    const width = lo + ((max - lo) * k) / 8;
    const balanced = breakLines(whole, width, font, measure);
    if (balanced && balanced.length <= lines.length) return balanced;
  }
  return lines;
};

/** Stable keys of named values: the name, `name#2` for duplicates */
export const uniqueKeys = (names: readonly string[]) => {
  const seen = new Map<string, number>();
  return names.map((name) => {
    const n = (seen.get(name) ?? 0) + 1;
    seen.set(name, n);
    return n === 1 ? name : `${name}#${n}`;
  });
};

const LIGHT_INK: Rgba = [1, 1, 1, 0.96];
const DARK_INK: Rgba = [15 / 255, 23 / 255, 42 / 255, 0.88];

const channel = (v: number) =>
  v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);

/** WCAG relative luminance of an opaque color */
export const relativeLuminance = (c: Rgba) =>
  0.2126 * channel(c[0]) + 0.7152 * channel(c[1]) + 0.0722 * channel(c[2]);

/** `top` composited over the opaque `bottom` */
export const over = (top: Rgba, bottom: Rgba): Rgba => {
  const a = clamp(top[3], 0, 1);
  return [
    top[0] * a + bottom[0] * (1 - a),
    top[1] * a + bottom[1] * (1 - a),
    top[2] * a + bottom[2] * (1 - a),
    1,
  ];
};

/** WCAG contrast ratio (1-21) of `ink` drawn on the opaque `fill` */
export const contrastRatio = (ink: Rgba, fill: Rgba) => {
  const a = relativeLuminance(over(ink, fill));
  const b = relativeLuminance(fill);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
};

const WHITE: Rgba = [1, 1, 1, 1];

/** Light or dark ink, whichever contrasts more with the fill, and its contrast */
export const inkOn = (
  fill: Rgba,
  backdrop: Rgba = WHITE,
): { ink: Rgba; css: string; contrast: number } => {
  const solid = over(fill, over(backdrop, WHITE));
  const light = contrastRatio(LIGHT_INK, solid);
  const dark = contrastRatio(DARK_INK, solid);
  return light >= dark
    ? { ink: LIGHT_INK, css: toCss(LIGHT_INK), contrast: light }
    : { ink: DARK_INK, css: toCss(DARK_INK), contrast: dark };
};

/** Readable text color on a fill (WCAG contrast) */
export const textOn = (fill: Rgba, backdrop?: Rgba) =>
  inkOn(fill, backdrop).css;

/**
 * Fill adjusted so that its best ink reaches `target` contrast: darkened
 * under white text, lightened under dark text (at most `limit` of the way)
 */
export const readableFill = (fill: Rgba, target = 4.5, limit = 0.3): Rgba => {
  let best = inkOn(fill);
  if (best.contrast >= target) return fill;
  const toward: Rgba =
    best.ink === LIGHT_INK ? [0, 0, 0, fill[3]] : [1, 1, 1, fill[3]];
  for (let t = 0.04; t <= limit + 1e-9; t += 0.04) {
    const next = mix(fill, toward, t);
    best = inkOn(next);
    if (best.contrast >= target) return next;
  }
  return mix(fill, toward, limit);
};

/** Resolves a custom color with the theme resolver (static parsing otherwise) */
export const resolveWith = (
  theme: ChartTheme,
  css: string | undefined,
  fallback: Rgba,
): Rgba => {
  if (!css) return fallback;
  return theme.resolve
    ? theme.resolve(css, fallback)
    : (parseColor(css) ?? fallback);
};

/** Placeholder of a chart without data: a muted ring and "No data" (localized) */
export const emptyLayout = (c: LayoutContext): LayoutResult => {
  const { area, theme } = c;
  const cx = area.x + area.width / 2;
  const cy = area.y + area.height / 2;
  const r1 = Math.max(0, Math.min(area.width, area.height) / 2 - 6);
  return {
    nodes: [
      {
        kind: "sector",
        cx,
        cy,
        r0: r1 * 0.66,
        r1,
        a0: 0,
        a1: TAU,
        pad: 0,
        corner: 0,
        fill: toCss(theme.grid, 0.8),
      },
      {
        kind: "text",
        x: cx,
        y: cy,
        text: c.labels.noData,
        font: font(theme, 12),
        color: toCss(theme.textMuted),
        align: "center",
        baseline: "middle",
      },
    ],
    items: [],
    dim: 1,
    empty: true,
  };
};
