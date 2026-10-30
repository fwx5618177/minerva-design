// A Canvas2D context that records instead of painting. The shape chart
// engine (@minerva/charts/canvas: layouts, animations, legend, tooltip,
// hover dimming, events) draws its frames on it; ./geometry turns the
// recorded fills, strokes and texts into views. Paths are stored in chart
// pixels (the current transform applied); arcs stay arcs so that circles,
// rings and sectors become exact rounded views.

import { measureChartText } from "../Chart/measure";

/** A color: channels 0-255, alpha 0-1 (`raw`: a CSS color that could not be parsed) */
export interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
  raw?: string;
}

/** A linear gradient in chart pixels */
export interface Gradient {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  stops: { offset: number; color: Color }[];
}

/** Fill or stroke style: a color, or a gradient (and its first color) */
export interface Paint {
  color: Color;
  gradient?: Gradient;
}

/** Straight segment to (x, y), or arc (implicitly joined by a segment to its start) */
export type Segment =
  | { t: "L"; x: number; y: number }
  | {
      t: "A";
      cx: number;
      cy: number;
      r: number;
      /** Start angle and end angle (`a1 - a0` is the signed sweep) */
      a0: number;
      a1: number;
    };

export interface Subpath {
  x: number;
  y: number;
  segs: Segment[];
  closed: boolean;
}

export interface FillOp {
  kind: "fill";
  paths: Subpath[];
  paint: Paint;
  alpha: number;
  /** Drawn with a shadow */
  shadow: boolean;
}

export interface StrokeOp {
  kind: "stroke";
  paths: Subpath[];
  paint: Paint;
  alpha: number;
  width: number;
  cap: "butt" | "round" | "square";
  join: "round" | "bevel" | "miter";
  dash: number[];
}

export interface TextOp {
  kind: "text";
  text: string;
  x: number;
  y: number;
  size: number;
  weight: number;
  align: "left" | "center" | "right";
  baseline: "top" | "middle" | "bottom" | "alphabetic";
  color: Color;
  alpha: number;
  /** Rotation around (x, y), radians clockwise */
  rotate: number;
  maxWidth?: number;
  /** Outline color (`strokeText` under the same text) */
  halo?: Color;
}

export type DrawOp = FillOp | StrokeOp | TextOp;

const TAU = Math.PI * 2;
const BLACK: Color = { r: 0, g: 0, b: 0, a: 1 };

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

const NAMED: Record<string, Color> = {
  transparent: { r: 0, g: 0, b: 0, a: 0 },
  black: BLACK,
  white: { r: 255, g: 255, b: 255, a: 1 },
};

/** Parses the colors the engine produces: `rgba()`, `rgb()`, `#hex` */
export function parseColor(value: unknown): Color {
  if (typeof value !== "string") return BLACK;
  const s = value.trim().toLowerCase();
  const named = NAMED[s];
  if (named) return named;
  const fn = /^rgba?\(([^)]*)\)$/.exec(s);
  if (fn) {
    const parts = (fn[1] ?? "")
      .split(/[\s,/]+/)
      .filter(Boolean)
      .map((p) => (p.endsWith("%") ? (parseFloat(p) / 100) * 255 : +p));
    const [r = 0, g = 0, b = 0] = parts;
    let a = parts[3] ?? 1;
    const alphaText = (fn[1] ?? "").split(/[\s,/]+/).filter(Boolean)[3];
    if (alphaText?.endsWith("%")) a = parseFloat(alphaText) / 100;
    if ([r, g, b, a].every(Number.isFinite)) return { r, g, b, a: clamp01(a) };
  }
  const hex = /^#([0-9a-f]{3,8})$/.exec(s)?.[1];
  if (hex && hex.length !== 5 && hex.length !== 7) {
    const short = hex.length <= 4;
    const at = (i: number) =>
      short
        ? parseInt((hex[i] ?? "f") + (hex[i] ?? "f"), 16)
        : parseInt(hex.slice(i * 2, i * 2 + 2) || "ff", 16);
    const n = short ? hex.length : hex.length / 2;
    return { r: at(0), g: at(1), b: at(2), a: n === 4 ? at(3) / 255 : 1 };
  }
  return { r: 0, g: 0, b: 0, a: 1, raw: value };
}

/** Opaque CSS color (the alpha goes to an `opacity`) */
export const opaqueCss = (c: Color) =>
  c.raw ?? `rgb(${Math.round(c.r)}, ${Math.round(c.g)}, ${Math.round(c.b)})`;

/** CSS color with an extra alpha */
export const cssWithAlpha = (c: Color, alpha: number) =>
  c.raw ??
  `rgba(${Math.round(c.r)}, ${Math.round(c.g)}, ${Math.round(c.b)}, ${+clamp01(c.a * alpha).toFixed(3)})`;

/** Color of a paint at a point (gradients: projected on their axis) */
export function paintAt(paint: Paint, x: number, y: number): Color {
  const g = paint.gradient;
  if (!g || g.stops.length < 2) return paint.color;
  const dx = g.x1 - g.x0;
  const dy = g.y1 - g.y0;
  const len2 = dx * dx + dy * dy;
  const t = len2 > 0 ? clamp01(((x - g.x0) * dx + (y - g.y0) * dy) / len2) : 0;
  const stops = g.stops;
  let i = 0;
  while (i < stops.length - 2 && (stops[i + 1]?.offset ?? 1) < t) i++;
  const a = stops[i];
  const b = stops[i + 1];
  if (!a || !b) return paint.color;
  const span = b.offset - a.offset;
  const k = span > 0 ? clamp01((t - a.offset) / span) : 0;
  const mix = (u: number, v: number) => u + (v - u) * k;
  if (a.color.raw || b.color.raw) return k < 0.5 ? a.color : b.color;
  return {
    r: mix(a.color.r, b.color.r),
    g: mix(a.color.g, b.color.g),
    b: mix(a.color.b, b.color.b),
    a: mix(a.color.a, b.color.a),
  };
}

type Matrix = [number, number, number, number, number, number];

interface State {
  m: Matrix;
  alpha: number;
  fill: Paint;
  stroke: Paint;
  lineWidth: number;
  cap: StrokeOp["cap"];
  join: StrokeOp["join"];
  font: string;
  align: TextOp["align"];
  baseline: TextOp["baseline"];
  dash: number[];
  shadowColor: string;
  shadowBlur: number;
  shadowOffsetX: number;
  shadowOffsetY: number;
}

const FONT =
  /^\s*(?:(?:italic|oblique|normal)\s+)?(?:(\d{3}|bold|normal)\s+)?([\d.]+)px/;

/** Size (px) and weight of a CSS font */
export function parseFont(font: string): { size: number; weight: number } {
  const match = FONT.exec(font);
  const w = match?.[1];
  const weight = w === "bold" ? 700 : w && w !== "normal" ? +w : 400;
  return { size: match ? Number(match[2]) : 10, weight };
}

const GRADIENT = Symbol("gradient");

interface RecordedGradient {
  [GRADIENT]: Gradient;
  addColorStop(offset: number, color: string): void;
}

const isGradient = (v: unknown): v is RecordedGradient =>
  typeof v === "object" && v !== null && GRADIENT in v;

const toPaint = (value: unknown): Paint => {
  if (isGradient(value)) {
    const gradient = value[GRADIENT];
    return { color: gradient.stops[0]?.color ?? BLACK, gradient };
  }
  return { color: parseColor(value) };
};

const fromPaint = (paint: Paint): unknown =>
  paint.color.raw ??
  `rgba(${paint.color.r}, ${paint.color.g}, ${paint.color.b}, ${paint.color.a})`;

const normalizeTextAlign = (v: string): TextOp["align"] =>
  v === "center" ? "center" : v === "right" || v === "end" ? "right" : "left";

const normalizeBaseline = (v: string): TextOp["baseline"] =>
  v === "top" || v === "hanging"
    ? "top"
    : v === "middle"
      ? "middle"
      : v === "bottom" || v === "ideographic"
        ? "bottom"
        : "alphabetic";

/** Signed sweep of a canvas `arc()` */
export function arcSweep(start: number, end: number, ccw: boolean): number {
  if (!ccw) {
    if (end - start >= TAU) return TAU;
    let s = (end - start) % TAU;
    if (s < 0) s += TAU;
    return s;
  }
  if (start - end >= TAU) return -TAU;
  let s = (start - end) % TAU;
  if (s < 0) s += TAU;
  return -s;
}

export interface Recorder {
  /** The 2D context handed to the engine */
  readonly context: unknown;
  /** Operations of the last frame (a new array per frame) */
  ops(): DrawOp[];
}

/**
 * Records the drawing calls of a Canvas2D context. `clearRect` of the whole
 * canvas starts a new frame.
 */
export function createRecorder(): Recorder {
  let frame: DrawOp[] = [];
  const initial = (): State => ({
    m: [1, 0, 0, 1, 0, 0],
    alpha: 1,
    fill: { color: BLACK },
    stroke: { color: BLACK },
    lineWidth: 1,
    cap: "butt",
    join: "miter",
    font: "10px sans-serif",
    align: "left",
    baseline: "alphabetic",
    dash: [],
    shadowColor: "rgba(0, 0, 0, 0)",
    shadowBlur: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
  });
  let state = initial();
  const stack: State[] = [];
  let paths: Subpath[] = [];
  let current: Subpath | null = null;
  let pen: [number, number] | null = null;
  let pendingHalo: TextOp | null = null;

  const map = (x: number, y: number): [number, number] => {
    const [a, b, c, d, e, f] = state.m;
    return [a * x + c * y + e, b * x + d * y + f];
  };
  /** Uniform scale and rotation of the transform */
  const scaleOf = () => {
    const [a, b, c, d] = state.m;
    return Math.sqrt(Math.abs(a * d - b * c)) || 0;
  };
  const rotationOf = () => Math.atan2(state.m[1], state.m[0]);
  const multiply = (n: Matrix) => {
    const [a, b, c, d, e, f] = state.m;
    state.m = [
      a * n[0] + c * n[1],
      b * n[0] + d * n[1],
      a * n[2] + c * n[3],
      b * n[2] + d * n[3],
      a * n[4] + c * n[5] + e,
      b * n[4] + d * n[5] + f,
    ];
  };

  const moveTo = (x: number, y: number) => {
    const [px, py] = map(x, y);
    current = { x: px, y: py, segs: [], closed: false };
    paths.push(current);
    pen = [x, y];
  };
  const ensure = (x: number, y: number) => {
    if (!current) moveTo(x, y);
  };
  const lineTo = (x: number, y: number) => {
    if (!current) {
      moveTo(x, y);
      return;
    }
    const [px, py] = map(x, y);
    current.segs.push({ t: "L", x: px, y: py });
    pen = [x, y];
  };
  const arc = (
    x: number,
    y: number,
    r: number,
    start: number,
    end: number,
    ccw = false,
  ) => {
    const sweep = arcSweep(start, end, ccw);
    const sx = x + r * Math.cos(start);
    const sy = y + r * Math.sin(start);
    const ex = x + r * Math.cos(start + sweep);
    const ey = y + r * Math.sin(start + sweep);
    if (!current) moveTo(sx, sy);
    if (r <= 0 || sweep === 0) {
      lineTo(sx, sy);
      return;
    }
    const [cx, cy] = map(x, y);
    const rot = rotationOf();
    current?.segs.push({
      t: "A",
      cx,
      cy,
      r: r * scaleOf(),
      a0: start + rot,
      a1: start + sweep + rot,
    });
    pen = [ex, ey];
  };
  const curve = (point: (t: number) => [number, number], steps: number) => {
    for (let i = 1; i <= steps; i++) {
      const [x, y] = point(i / steps);
      lineTo(x, y);
    }
  };
  /** Segments of a flattened curve: ~6px each, 2 for the small corner roundings */
  const curveSteps = (length: number) =>
    Math.max(2, Math.min(32, Math.ceil((length * scaleOf()) / 6)));

  const paint = (kind: "fill" | "stroke") => {
    const list = paths.filter((p) => p.segs.length || p.closed);
    if (!list.length) return;
    // a copy: the engine may keep drawing on the same path
    const copy = list.map((p) => ({ ...p, segs: [...p.segs] }));
    if (kind === "fill") {
      const shadow =
        state.shadowBlur > 0 &&
        parseColor(state.shadowColor).a > 0 &&
        !parseColor(state.shadowColor).raw;
      frame.push({
        kind: "fill",
        paths: copy,
        paint: state.fill,
        alpha: state.alpha,
        shadow,
      });
    } else {
      frame.push({
        kind: "stroke",
        paths: copy,
        paint: state.stroke,
        alpha: state.alpha,
        width: state.lineWidth * scaleOf(),
        cap: state.cap,
        join: state.join,
        dash: state.dash.map((v) => v * scaleOf()),
      });
    }
  };

  const text = (value: string, x: number, y: number, maxWidth?: number) => {
    const [px, py] = map(x, y);
    const { size, weight } = parseFont(state.font);
    const s = scaleOf();
    return {
      kind: "text" as const,
      text: String(value),
      x: px,
      y: py,
      size: size * s,
      weight,
      align: state.align,
      baseline: state.baseline,
      color: state.fill.color,
      alpha: state.alpha,
      rotate: rotationOf(),
      maxWidth:
        maxWidth !== undefined && Number.isFinite(maxWidth)
          ? maxWidth * s
          : undefined,
    };
  };

  const context = {
    canvas: null,
    get globalAlpha() {
      return state.alpha;
    },
    set globalAlpha(v: number) {
      if (Number.isFinite(v)) state.alpha = clamp01(v);
    },
    get fillStyle(): unknown {
      return state.fill.gradient ? null : fromPaint(state.fill);
    },
    set fillStyle(v: unknown) {
      state.fill = toPaint(v);
    },
    get strokeStyle(): unknown {
      return state.stroke.gradient ? null : fromPaint(state.stroke);
    },
    set strokeStyle(v: unknown) {
      state.stroke = toPaint(v);
    },
    get lineWidth() {
      return state.lineWidth;
    },
    set lineWidth(v: number) {
      if (Number.isFinite(v) && v > 0) state.lineWidth = v;
    },
    get lineCap() {
      return state.cap;
    },
    set lineCap(v: string) {
      state.cap = v === "round" ? "round" : v === "square" ? "square" : "butt";
    },
    get lineJoin() {
      return state.join;
    },
    set lineJoin(v: string) {
      state.join = v === "round" ? "round" : v === "bevel" ? "bevel" : "miter";
    },
    get font() {
      return state.font;
    },
    set font(v: string) {
      state.font = v;
    },
    get textAlign() {
      return state.align;
    },
    set textAlign(v: string) {
      state.align = normalizeTextAlign(v);
    },
    get textBaseline() {
      return state.baseline;
    },
    set textBaseline(v: string) {
      state.baseline = normalizeBaseline(v);
    },
    get shadowColor() {
      return state.shadowColor;
    },
    set shadowColor(v: string) {
      state.shadowColor = v;
    },
    get shadowBlur() {
      return state.shadowBlur;
    },
    set shadowBlur(v: number) {
      state.shadowBlur = v;
    },
    get shadowOffsetX() {
      return state.shadowOffsetX;
    },
    set shadowOffsetX(v: number) {
      state.shadowOffsetX = v;
    },
    get shadowOffsetY() {
      return state.shadowOffsetY;
    },
    set shadowOffsetY(v: number) {
      state.shadowOffsetY = v;
    },
    lineDashOffset: 0,
    miterLimit: 10,
    globalCompositeOperation: "source-over",
    imageSmoothingEnabled: true,
    direction: "inherit",
    save() {
      stack.push({ ...state, dash: [...state.dash] });
    },
    restore() {
      const previous = stack.pop();
      if (previous) state = previous;
    },
    setTransform(
      a:
        | number
        | { a: number; b: number; c: number; d: number; e: number; f: number },
      b = 0,
      c = 0,
      d = 1,
      e = 0,
      f = 0,
    ) {
      state.m =
        typeof a === "object"
          ? [a.a, a.b, a.c, a.d, a.e, a.f]
          : [a, b, c, d, e, f];
    },
    resetTransform() {
      state.m = [1, 0, 0, 1, 0, 0];
    },
    transform(
      a: number,
      b: number,
      c: number,
      d: number,
      e: number,
      f: number,
    ) {
      multiply([a, b, c, d, e, f]);
    },
    translate(x: number, y: number) {
      multiply([1, 0, 0, 1, x, y]);
    },
    scale(x: number, y: number) {
      multiply([x, 0, 0, y, 0, 0]);
    },
    rotate(angle: number) {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      multiply([cos, sin, -sin, cos, 0, 0]);
    },
    beginPath() {
      paths = [];
      current = null;
      pen = null;
    },
    closePath() {
      if (!current) return;
      current.closed = true;
      const start = current;
      // drawing goes on from the start of the closed subpath
      current = { x: start.x, y: start.y, segs: [], closed: false };
      paths.push(current);
    },
    moveTo,
    lineTo,
    arc,
    ellipse(
      x: number,
      y: number,
      rx: number,
      ry: number,
      rotation: number,
      start: number,
      end: number,
      ccw = false,
    ) {
      if (Math.abs(rx - ry) < 1e-6 && rotation === 0) {
        arc(x, y, rx, start, end, ccw);
        return;
      }
      const sweep = arcSweep(start, end, ccw);
      const cos = Math.cos(rotation);
      const sin = Math.sin(rotation);
      const at = (t: number): [number, number] => {
        const a = start + sweep * t;
        const ex = rx * Math.cos(a);
        const ey = ry * Math.sin(a);
        return [x + ex * cos - ey * sin, y + ex * sin + ey * cos];
      };
      const [sx, sy] = at(0);
      if (!current) moveTo(sx, sy);
      else lineTo(sx, sy);
      curve(at, curveSteps(Math.abs(sweep) * Math.max(rx, ry)));
    },
    arcTo(x1: number, y1: number, x2: number, y2: number, r: number) {
      ensure(x1, y1);
      const [x0, y0] = pen ?? [x1, y1];
      const ax = x0 - x1;
      const ay = y0 - y1;
      const bx = x2 - x1;
      const by = y2 - y1;
      const la = Math.hypot(ax, ay);
      const lb = Math.hypot(bx, by);
      const cross = ax * by - ay * bx;
      if (r <= 0 || la < 1e-9 || lb < 1e-9 || Math.abs(cross) < 1e-9) {
        lineTo(x1, y1);
        return;
      }
      const cos = (ax * bx + ay * by) / (la * lb);
      const half = Math.acos(Math.max(-1, Math.min(1, cos))) / 2;
      const dist = r / Math.tan(half);
      const t0x = x1 + (ax / la) * dist;
      const t0y = y1 + (ay / la) * dist;
      const t1x = x1 + (bx / lb) * dist;
      const t1y = y1 + (by / lb) * dist;
      // center: along the bisector, at r / sin(half)
      const ux = ax / la + bx / lb;
      const uy = ay / la + by / lb;
      const lu = Math.hypot(ux, uy);
      const cd = r / Math.sin(half);
      const cx = x1 + (ux / lu) * cd;
      const cy = y1 + (uy / lu) * cd;
      lineTo(t0x, t0y);
      const a0 = Math.atan2(t0y - cy, t0x - cx);
      const a1 = Math.atan2(t1y - cy, t1x - cx);
      arc(cx, cy, r, a0, a1, cross > 0);
    },
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number) {
      ensure(cpx, cpy);
      const [x0, y0] = pen ?? [cpx, cpy];
      curve(
        (t) => {
          const u = 1 - t;
          return [
            u * u * x0 + 2 * u * t * cpx + t * t * x,
            u * u * y0 + 2 * u * t * cpy + t * t * y,
          ];
        },
        curveSteps(
          Math.hypot(cpx - x0, cpy - y0) + Math.hypot(x - cpx, y - cpy),
        ),
      );
    },
    bezierCurveTo(
      c1x: number,
      c1y: number,
      c2x: number,
      c2y: number,
      x: number,
      y: number,
    ) {
      ensure(c1x, c1y);
      const [x0, y0] = pen ?? [c1x, c1y];
      curve(
        (t) => {
          const u = 1 - t;
          const a = u * u * u;
          const b = 3 * u * u * t;
          const c = 3 * u * t * t;
          const d = t * t * t;
          return [
            a * x0 + b * c1x + c * c2x + d * x,
            a * y0 + b * c1y + c * c2y + d * y,
          ];
        },
        curveSteps(
          Math.hypot(c1x - x0, c1y - y0) +
            Math.hypot(c2x - c1x, c2y - c1y) +
            Math.hypot(x - c2x, y - c2y),
        ),
      );
    },
    rect(x: number, y: number, w: number, h: number) {
      moveTo(x, y);
      lineTo(x + w, y);
      lineTo(x + w, y + h);
      lineTo(x, y + h);
      context.closePath();
    },
    roundRect(x: number, y: number, w: number, h: number, radii?: unknown) {
      const r = Math.max(
        0,
        Math.min(
          typeof radii === "number"
            ? radii
            : Array.isArray(radii) && typeof radii[0] === "number"
              ? radii[0]
              : 0,
          Math.abs(w) / 2,
          Math.abs(h) / 2,
        ),
      );
      if (r <= 0) {
        context.rect(x, y, w, h);
        return;
      }
      moveTo(x + r, y);
      context.arcTo(x + w, y, x + w, y + h, r);
      context.arcTo(x + w, y + h, x, y + h, r);
      context.arcTo(x, y + h, x, y, r);
      context.arcTo(x, y, x + w, y, r);
      context.closePath();
    },
    fill() {
      paint("fill");
    },
    stroke() {
      paint("stroke");
    },
    clip() {
      // views are not clipped by paths (the engine only clips decorations)
    },
    fillRect(x: number, y: number, w: number, h: number) {
      const saved = { paths, current, pen };
      paths = [];
      context.rect(x, y, w, h);
      paint("fill");
      ({ paths, current, pen } = saved);
    },
    strokeRect(x: number, y: number, w: number, h: number) {
      const saved = { paths, current, pen };
      paths = [];
      context.rect(x, y, w, h);
      paint("stroke");
      ({ paths, current, pen } = saved);
    },
    clearRect(x: number, y: number, w: number, h: number) {
      const [x0, y0] = map(x, y);
      const [x1, y1] = map(x + w, y + h);
      // clearing (most of) the canvas starts a frame
      if (x0 <= 1 && y0 <= 1 && x1 - x0 > 1 && y1 - y0 > 1) {
        frame = [];
        pendingHalo = null;
      }
    },
    fillText(value: string, x: number, y: number, maxWidth?: number) {
      const op: TextOp = text(value, x, y, maxWidth);
      const halo = pendingHalo;
      pendingHalo = null;
      if (halo && halo.text === op.text && halo.x === op.x && halo.y === op.y) {
        const at = frame.indexOf(halo);
        if (at >= 0) frame.splice(at, 1);
        op.halo = halo.color;
      }
      frame.push(op);
    },
    strokeText(value: string, x: number, y: number, maxWidth?: number) {
      const op: TextOp = {
        ...text(value, x, y, maxWidth),
        color: state.stroke.color,
      };
      pendingHalo = op;
      frame.push(op);
    },
    measureText(value: string) {
      const width = measureChartText(String(value), state.font);
      const { size } = parseFont(state.font);
      return {
        width,
        actualBoundingBoxAscent: size * 0.8,
        actualBoundingBoxDescent: size * 0.2,
        actualBoundingBoxLeft: 0,
        actualBoundingBoxRight: width,
        fontBoundingBoxAscent: size * 0.9,
        fontBoundingBoxDescent: size * 0.25,
      };
    },
    setLineDash(segments: number[]) {
      state.dash = Array.isArray(segments)
        ? segments.filter((v) => Number.isFinite(v) && v >= 0)
        : [];
    },
    getLineDash() {
      return [...state.dash];
    },
    createLinearGradient(x0: number, y0: number, x1: number, y1: number) {
      const [ax, ay] = map(x0, y0);
      const [bx, by] = map(x1, y1);
      const gradient: Gradient = { x0: ax, y0: ay, x1: bx, y1: by, stops: [] };
      const recorded: RecordedGradient = {
        [GRADIENT]: gradient,
        addColorStop(offset: number, color: string) {
          gradient.stops.push({
            offset: clamp01(offset),
            color: parseColor(color),
          });
          gradient.stops.sort((p, q) => p.offset - q.offset);
        },
      };
      return recorded;
    },
    createRadialGradient(x0: number, y0: number) {
      // approximated by its colors along x
      return context.createLinearGradient(x0, y0, x0 + 1, y0);
    },
    createConicGradient(_angle: number, x: number, y: number) {
      return context.createLinearGradient(x, y, x + 1, y);
    },
    createPattern() {
      return null;
    },
    drawImage() {
      // not supported by views
    },
    isPointInPath() {
      return false;
    },
    isPointInStroke() {
      return false;
    },
    getTransform() {
      const [a, b, c, d, e, f] = state.m;
      return { a, b, c, d, e, f };
    },
    reset() {
      state = initial();
      stack.length = 0;
      paths = [];
      current = null;
      pen = null;
      frame = [];
    },
  };

  return {
    context,
    ops: () => frame,
  };
}
