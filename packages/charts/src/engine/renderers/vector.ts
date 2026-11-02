// Vector layer of the shape charts on the GPU: a recorder with the subset of
// the CanvasRenderingContext2D API that drawShapeScene uses. Fills and
// strokes are flattened and tessellated into triangles (device pixels,
// premultiplied colors) for the WebGPU / WebGL backends; text goes to a 2D
// overlay canvas drawn above the geometry.
//
// Any path is drawn exactly like Canvas2D does it, without a polygon
// triangulator: convex fills are plain fans; other fills write their fans
// to the stencil (nonzero winding) and are then covered where the stencil is
// set; strokes are covered once per sample so overlapping joins never blend
// twice.

import { resolveColor, type Rgba } from "../color";

/** Bytes per vertex: x f32, y f32 (device px), premultiplied rgba unorm8x4 */
export const VECTOR_STRIDE = 12;

/**
 * - `direct`: triangles drawn as they are
 * - `nonzero`: a fill with the nonzero rule (stencil fans, then cover)
 * - `once`: overlapping triangles (strokes) colored once per sample
 */
export type VectorMode = "direct" | "nonzero" | "once";

export interface VectorDraw {
  mode: VectorMode;
  /** First vertex */
  first: number;
  /** Vertex count (a multiple of 3) */
  count: number;
}

export interface VectorBatch {
  /** `count` vertices of VECTOR_STRIDE bytes */
  data: ArrayBuffer;
  count: number;
  draws: VectorDraw[];
}

type Matrix = [number, number, number, number, number, number];

interface Gradient {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  stops: { offset: number; color: Rgba }[];
  addColorStop(offset: number, color: string): void;
}

type Paint = string | Gradient;

interface State {
  matrix: Matrix;
  fillStyle: Paint;
  strokeStyle: Paint;
  lineWidth: number;
  lineCap: CanvasLineCap;
  lineJoin: CanvasLineJoin;
  miterLimit: number;
  globalAlpha: number;
  shadowColor: string;
  shadowBlur: number;
  shadowOffsetX: number;
  shadowOffsetY: number;
  dash: number[];
  lineDashOffset: number;
  font: string;
  textAlign: CanvasTextAlign;
  textBaseline: CanvasTextBaseline;
}

interface Subpath {
  /** Device px, interleaved x, y */
  points: number[];
  closed: boolean;
}

/** Flattening tolerance, device px */
const TOLERANCE = 0.1;
/** Layers of the approximated shadow blur */
const SHADOW_LAYERS = 5;

const colorCache = new Map<string, Rgba>();

/** Straight RGBA of a CSS color (any syntax the browser knows) */
export const vectorColor = (value: string): Rgba => {
  let c = colorCache.get(value);
  if (!c) {
    c = resolveColor(value, null, [0, 0, 0, 1]);
    if (colorCache.size > 512) colorCache.clear();
    colorCache.set(value, c);
  }
  return c;
};

const multiply = (m: Matrix, n: Matrix): Matrix => [
  m[0] * n[0] + m[2] * n[1],
  m[1] * n[0] + m[3] * n[1],
  m[0] * n[2] + m[2] * n[3],
  m[1] * n[2] + m[3] * n[3],
  m[0] * n[4] + m[2] * n[5] + m[4],
  m[1] * n[4] + m[3] * n[5] + m[5],
];

const invert = (m: Matrix): Matrix => {
  const det = m[0] * m[3] - m[1] * m[2] || 1e-12;
  return [
    m[3] / det,
    -m[1] / det,
    -m[2] / det,
    m[0] / det,
    (m[2] * m[5] - m[3] * m[4]) / det,
    (m[1] * m[4] - m[0] * m[5]) / det,
  ];
};

/** Turns of a closed polygon are all on the same side and add up to one turn */
export const isConvex = (p: readonly number[]): boolean => {
  const n = p.length >> 1;
  if (n < 3) return false;
  let sign = 0;
  let turn = 0;
  for (let i = 0; i < n; i++) {
    const a = (i + n - 1) % n;
    const b = (i + 1) % n;
    const ux = p[i * 2] - p[a * 2];
    const uy = p[i * 2 + 1] - p[a * 2 + 1];
    const vx = p[b * 2] - p[i * 2];
    const vy = p[b * 2 + 1] - p[i * 2 + 1];
    const cross = ux * vy - uy * vx;
    if (Math.abs(cross) > 1e-9) {
      const s = cross > 0 ? 1 : -1;
      if (sign && s !== sign) return false;
      sign = s;
    }
    turn += Math.atan2(cross, ux * vx + uy * vy);
  }
  return Math.abs(Math.abs(turn) - Math.PI * 2) < 0.01;
};

/** Removes repeated points (and the closing point equal to the first one) */
const dedupe = (p: readonly number[], closed: boolean): number[] => {
  const out: number[] = [];
  for (let i = 0; i < p.length; i += 2) {
    const n = out.length;
    if (
      n &&
      Math.abs(out[n - 2] - p[i]) < 1e-3 &&
      Math.abs(out[n - 1] - p[i + 1]) < 1e-3
    )
      continue;
    out.push(p[i], p[i + 1]);
  }
  if (
    closed &&
    out.length >= 4 &&
    Math.abs(out[0] - out[out.length - 2]) < 1e-3 &&
    Math.abs(out[1] - out[out.length - 1]) < 1e-3
  )
    out.length -= 2;
  return out;
};

/** Splits a polyline along a dash pattern (device px) */
export const dashPolyline = (
  p: readonly number[],
  dash: readonly number[],
  offset = 0,
): number[][] => {
  const total = dash.reduce((s, d) => s + d, 0);
  if (!(total > 0) || p.length < 4) return [p.slice()];
  const out: number[][] = [];
  let k = 0;
  let left = dash[0];
  let skip = ((offset % total) + total) % total;
  while (skip > 0) {
    if (skip >= left) {
      skip -= left;
      k = (k + 1) % dash.length;
      left = dash[k];
    } else {
      left -= skip;
      skip = 0;
    }
  }
  let current: number[] | null = k % 2 === 0 ? [p[0], p[1]] : null;
  for (let i = 2; i < p.length; i += 2) {
    let x0 = p[i - 2];
    let y0 = p[i - 1];
    const x1 = p[i];
    const y1 = p[i + 1];
    let len = Math.hypot(x1 - x0, y1 - y0);
    while (len > 0) {
      const step = Math.min(left, len);
      const t = step / len;
      const x = x0 + (x1 - x0) * t;
      const y = y0 + (y1 - y0) * t;
      if (current) current.push(x, y);
      len -= step;
      left -= step;
      x0 = x;
      y0 = y;
      if (left <= 1e-9) {
        if (current) {
          if (current.length >= 4) out.push(current);
          current = null;
        } else current = [x, y];
        k = (k + 1) % dash.length;
        left = dash[k];
      }
    }
  }
  if (current && current.length >= 4) out.push(current);
  return out;
};

/** Growable vertex store */
class Vertices {
  buffer = new ArrayBuffer(VECTOR_STRIDE * 1024);
  f32 = new Float32Array(this.buffer);
  u32 = new Uint32Array(this.buffer);
  count = 0;

  reserve(more: number) {
    const need = (this.count + more) * VECTOR_STRIDE;
    if (need <= this.buffer.byteLength) return;
    let size = this.buffer.byteLength;
    while (size < need) size *= 2;
    const next = new ArrayBuffer(size);
    new Uint8Array(next).set(
      new Uint8Array(this.buffer, 0, this.count * VECTOR_STRIDE),
    );
    this.buffer = next;
    this.f32 = new Float32Array(next);
    this.u32 = new Uint32Array(next);
  }

  push(x: number, y: number, color: number) {
    this.reserve(1);
    const i = this.count * 3;
    this.f32[i] = x;
    this.f32[i + 1] = y;
    this.u32[i + 2] = color;
    this.count++;
  }
}

/** Premultiplied rgba packed for unorm8x4 (little endian: r in the low byte) */
export const packPremultiplied = (c: Rgba, alpha: number): number => {
  const a = Math.max(0, Math.min(1, c[3] * alpha));
  const ch = (v: number) =>
    Math.round(Math.max(0, Math.min(1, v)) * a * 255) & 0xff;
  return (
    (ch(c[0]) |
      (ch(c[1]) << 8) |
      (ch(c[2]) << 16) |
      ((Math.round(a * 255) & 0xff) << 24)) >>>
    0
  );
};

/** Colors a device-space vertex */
type Shader = (x: number, y: number) => number;

const DEFAULT_STATE = (matrix: Matrix): State => ({
  matrix,
  fillStyle: "#000",
  strokeStyle: "#000",
  lineWidth: 1,
  lineCap: "butt",
  lineJoin: "miter",
  miterLimit: 10,
  globalAlpha: 1,
  shadowColor: "rgba(0, 0, 0, 0)",
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  dash: [],
  lineDashOffset: 0,
  font: "10px sans-serif",
  textAlign: "start",
  textBaseline: "alphabetic",
});

/**
 * Records path drawing as GPU triangles. Pass it to drawing code written for
 * CanvasRenderingContext2D (`recorder as unknown as CanvasRenderingContext2D`);
 * text calls are forwarded to `text` with the same transform and style.
 */
export class VectorRecorder {
  private vertices = new Vertices();
  private draws: VectorDraw[] = [];
  private state: State;
  private stack: State[] = [];
  private subpaths: Subpath[] = [];
  /** Current point, user space */
  private cx = 0;
  private cy = 0;
  private hasPoint = false;
  private text: CanvasRenderingContext2D | null;

  constructor(text: CanvasRenderingContext2D | null = null, pixelRatio = 1) {
    this.text = text;
    this.state = DEFAULT_STATE([pixelRatio, 0, 0, pixelRatio, 0, 0]);
  }

  /** Starts a new frame (keeps the buffers) */
  reset(text: CanvasRenderingContext2D | null, pixelRatio: number) {
    this.text = text;
    this.vertices.count = 0;
    this.draws = [];
    this.stack = [];
    this.subpaths = [];
    this.hasPoint = false;
    this.state = DEFAULT_STATE([pixelRatio, 0, 0, pixelRatio, 0, 0]);
  }

  /** Geometry recorded since the last reset */
  finish(): VectorBatch {
    return {
      data: this.vertices.buffer,
      count: this.vertices.count,
      draws: this.draws.slice(),
    };
  }

  // ------------------------------------------------------------ state

  get fillStyle(): Paint {
    return this.state.fillStyle;
  }
  set fillStyle(v: Paint) {
    this.state.fillStyle = v;
  }
  get strokeStyle(): Paint {
    return this.state.strokeStyle;
  }
  set strokeStyle(v: Paint) {
    this.state.strokeStyle = v;
  }
  get lineWidth() {
    return this.state.lineWidth;
  }
  set lineWidth(v: number) {
    if (Number.isFinite(v) && v > 0) this.state.lineWidth = v;
  }
  get lineCap() {
    return this.state.lineCap;
  }
  set lineCap(v: CanvasLineCap) {
    this.state.lineCap = v;
  }
  get lineJoin() {
    return this.state.lineJoin;
  }
  set lineJoin(v: CanvasLineJoin) {
    this.state.lineJoin = v;
  }
  get miterLimit() {
    return this.state.miterLimit;
  }
  set miterLimit(v: number) {
    if (Number.isFinite(v) && v > 0) this.state.miterLimit = v;
  }
  get globalAlpha() {
    return this.state.globalAlpha;
  }
  set globalAlpha(v: number) {
    if (Number.isFinite(v) && v >= 0 && v <= 1) this.state.globalAlpha = v;
  }
  get shadowColor() {
    return this.state.shadowColor;
  }
  set shadowColor(v: string) {
    this.state.shadowColor = v;
  }
  get shadowBlur() {
    return this.state.shadowBlur;
  }
  set shadowBlur(v: number) {
    if (Number.isFinite(v) && v >= 0) this.state.shadowBlur = v;
  }
  get shadowOffsetX() {
    return this.state.shadowOffsetX;
  }
  set shadowOffsetX(v: number) {
    if (Number.isFinite(v)) this.state.shadowOffsetX = v;
  }
  get shadowOffsetY() {
    return this.state.shadowOffsetY;
  }
  set shadowOffsetY(v: number) {
    if (Number.isFinite(v)) this.state.shadowOffsetY = v;
  }
  get lineDashOffset() {
    return this.state.lineDashOffset;
  }
  set lineDashOffset(v: number) {
    if (Number.isFinite(v)) this.state.lineDashOffset = v;
  }
  get font() {
    return this.state.font;
  }
  set font(v: string) {
    this.state.font = v;
  }
  get textAlign() {
    return this.state.textAlign;
  }
  set textAlign(v: CanvasTextAlign) {
    this.state.textAlign = v;
  }
  get textBaseline() {
    return this.state.textBaseline;
  }
  set textBaseline(v: CanvasTextBaseline) {
    this.state.textBaseline = v;
  }

  setLineDash(dash: number[]) {
    if (dash.some((d) => !Number.isFinite(d) || d < 0)) return;
    this.state.dash = dash.length % 2 ? [...dash, ...dash] : [...dash];
  }

  getLineDash() {
    return [...this.state.dash];
  }

  save() {
    this.stack.push({
      ...this.state,
      matrix: [...this.state.matrix],
      dash: [...this.state.dash],
    });
  }

  restore() {
    const s = this.stack.pop();
    if (s) this.state = s;
  }

  translate(x: number, y: number) {
    this.state.matrix = multiply(this.state.matrix, [1, 0, 0, 1, x, y]);
  }

  scale(x: number, y: number) {
    this.state.matrix = multiply(this.state.matrix, [x, 0, 0, y, 0, 0]);
  }

  rotate(angle: number) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    this.state.matrix = multiply(this.state.matrix, [c, s, -s, c, 0, 0]);
  }

  transform(a: number, b: number, c: number, d: number, e: number, f: number) {
    this.state.matrix = multiply(this.state.matrix, [a, b, c, d, e, f]);
  }

  createLinearGradient(x0: number, y0: number, x1: number, y1: number) {
    const gradient: Gradient = {
      x0,
      y0,
      x1,
      y1,
      stops: [],
      addColorStop(offset: number, color: string) {
        const o = Math.max(0, Math.min(1, offset));
        gradient.stops.push({ offset: o, color: vectorColor(color) });
        gradient.stops.sort((a, b) => a.offset - b.offset);
      },
    };
    return gradient as unknown as CanvasGradient;
  }

  // ------------------------------------------------------------- paths

  /** Device-space length of one user unit (uniform scales) */
  private unit() {
    const m = this.state.matrix;
    return Math.sqrt(Math.abs(m[0] * m[3] - m[1] * m[2])) || 1;
  }

  private current(): Subpath {
    let sp = this.subpaths[this.subpaths.length - 1];
    if (!sp) {
      sp = { points: [], closed: false };
      this.subpaths.push(sp);
    }
    return sp;
  }

  /** Adds a user-space point to the current subpath */
  private add(x: number, y: number) {
    const m = this.state.matrix;
    this.current().points.push(
      m[0] * x + m[2] * y + m[4],
      m[1] * x + m[3] * y + m[5],
    );
    this.cx = x;
    this.cy = y;
    this.hasPoint = true;
  }

  beginPath() {
    this.subpaths = [];
    this.hasPoint = false;
  }

  moveTo(x: number, y: number) {
    this.subpaths.push({ points: [], closed: false });
    this.add(x, y);
  }

  lineTo(x: number, y: number) {
    if (!this.hasPoint) this.moveTo(x, y);
    else this.add(x, y);
  }

  closePath() {
    const sp = this.subpaths[this.subpaths.length - 1];
    if (!sp || sp.points.length < 2) return;
    sp.closed = true;
    // the next segment starts a new subpath at the first point
    const m = invert(this.state.matrix);
    const x = sp.points[0];
    const y = sp.points[1];
    this.subpaths.push({ points: [x, y], closed: false });
    this.cx = m[0] * x + m[2] * y + m[4];
    this.cy = m[1] * x + m[3] * y + m[5];
  }

  rect(x: number, y: number, w: number, h: number) {
    this.moveTo(x, y);
    this.add(x + w, y);
    this.add(x + w, y + h);
    this.add(x, y + h);
    this.closePath();
  }

  /** Points along a circle from `a0`, `sweep` radians (signed) */
  private arcPoints(
    x: number,
    y: number,
    r: number,
    a0: number,
    sweep: number,
  ) {
    const rd = r * this.unit();
    const step =
      rd > TOLERANCE
        ? Math.max(
            0.01,
            Math.min(Math.PI / 8, 2 * Math.acos(1 - TOLERANCE / rd)),
          )
        : Math.PI / 2;
    const n = Math.max(1, Math.ceil(Math.abs(sweep) / step));
    for (let i = 1; i <= n; i++) {
      const a = a0 + (sweep * i) / n;
      this.add(x + r * Math.cos(a), y + r * Math.sin(a));
    }
  }

  arc(
    x: number,
    y: number,
    r: number,
    a0: number,
    a1: number,
    anticlockwise = false,
  ) {
    if (!(r >= 0)) return;
    const TAU = Math.PI * 2;
    let sweep: number;
    if (!anticlockwise && a1 - a0 >= TAU) sweep = TAU;
    else if (anticlockwise && a0 - a1 >= TAU) sweep = -TAU;
    else {
      sweep = (a1 - a0) % TAU;
      if (!anticlockwise && sweep < 0) sweep += TAU;
      if (anticlockwise && sweep > 0) sweep -= TAU;
    }
    const sx = x + r * Math.cos(a0);
    const sy = y + r * Math.sin(a0);
    if (this.hasPoint) this.lineTo(sx, sy);
    else this.moveTo(sx, sy);
    if (sweep !== 0) this.arcPoints(x, y, r, a0, sweep);
  }

  arcTo(x1: number, y1: number, x2: number, y2: number, r: number) {
    if (!this.hasPoint) this.moveTo(x1, y1);
    const x0 = this.cx;
    const y0 = this.cy;
    const ux = x0 - x1;
    const uy = y0 - y1;
    const vx = x2 - x1;
    const vy = y2 - y1;
    const lu = Math.hypot(ux, uy);
    const lv = Math.hypot(vx, vy);
    const cross = ux * vy - uy * vx;
    if (r <= 0 || lu < 1e-9 || lv < 1e-9 || Math.abs(cross) < 1e-9) {
      this.lineTo(x1, y1);
      return;
    }
    const cos = Math.max(-1, Math.min(1, (ux * vx + uy * vy) / (lu * lv)));
    const half = Math.acos(cos) / 2;
    const dist = r / Math.tan(half);
    const t1x = x1 + (ux / lu) * dist;
    const t1y = y1 + (uy / lu) * dist;
    const t2x = x1 + (vx / lv) * dist;
    const t2y = y1 + (vy / lv) * dist;
    const bx = ux / lu + vx / lv;
    const by = uy / lu + vy / lv;
    const bl = Math.hypot(bx, by);
    const d = r / Math.sin(half);
    const ox = x1 + (bx / bl) * d;
    const oy = y1 + (by / bl) * d;
    this.lineTo(t1x, t1y);
    const a0 = Math.atan2(t1y - oy, t1x - ox);
    const a1 = Math.atan2(t2y - oy, t2x - ox);
    let sweep = a1 - a0;
    if (sweep > Math.PI) sweep -= Math.PI * 2;
    if (sweep < -Math.PI) sweep += Math.PI * 2;
    this.arcPoints(ox, oy, r, a0, sweep);
  }

  quadraticCurveTo(qx: number, qy: number, x: number, y: number) {
    if (!this.hasPoint) this.moveTo(qx, qy);
    const x0 = this.cx;
    const y0 = this.cy;
    const dd = Math.hypot(x0 - 2 * qx + x, y0 - 2 * qy + y) * this.unit();
    const n = Math.max(
      1,
      Math.min(128, Math.ceil(Math.sqrt(dd / (8 * TOLERANCE)))),
    );
    for (let i = 1; i <= n; i++) {
      const t = i / n;
      const s = 1 - t;
      this.add(
        s * s * x0 + 2 * s * t * qx + t * t * x,
        s * s * y0 + 2 * s * t * qy + t * t * y,
      );
    }
  }

  bezierCurveTo(
    c1x: number,
    c1y: number,
    c2x: number,
    c2y: number,
    x: number,
    y: number,
  ) {
    if (!this.hasPoint) this.moveTo(c1x, c1y);
    const x0 = this.cx;
    const y0 = this.cy;
    const dd =
      Math.max(
        Math.hypot(x0 - 2 * c1x + c2x, y0 - 2 * c1y + c2y),
        Math.hypot(c1x - 2 * c2x + x, c1y - 2 * c2y + y),
      ) * this.unit();
    const n = Math.max(
      1,
      Math.min(160, Math.ceil(Math.sqrt((0.75 * dd) / TOLERANCE))),
    );
    for (let i = 1; i <= n; i++) {
      const t = i / n;
      const s = 1 - t;
      this.add(
        s * s * s * x0 +
          3 * s * s * t * c1x +
          3 * s * t * t * c2x +
          t * t * t * x,
        s * s * s * y0 +
          3 * s * s * t * c1y +
          3 * s * t * t * c2y +
          t * t * t * y,
      );
    }
  }

  // ----------------------------------------------------------- painting

  /** Vertex colors of a paint at the current alpha */
  private shader(paint: Paint, alpha: number): Shader | null {
    if (typeof paint === "string") {
      const c = vectorColor(paint);
      if (c[3] * alpha <= 0.001) return null;
      const packed = packPremultiplied(c, alpha);
      return () => packed;
    }
    const g = paint;
    if (!g.stops.length) return null;
    if (g.stops.length === 1) {
      const packed = packPremultiplied(g.stops[0].color, alpha);
      return () => packed;
    }
    const inv = invert(this.state.matrix);
    const dx = g.x1 - g.x0;
    const dy = g.y1 - g.y0;
    const len2 = dx * dx + dy * dy;
    const stops = g.stops;
    return (x, y) => {
      const ux = inv[0] * x + inv[2] * y + inv[4];
      const uy = inv[1] * x + inv[3] * y + inv[5];
      const t = len2 > 0 ? ((ux - g.x0) * dx + (uy - g.y0) * dy) / len2 : 0;
      let k = 0;
      while (k < stops.length - 1 && stops[k + 1].offset < t) k++;
      const a = stops[k];
      const b = stops[Math.min(k + 1, stops.length - 1)];
      const span = b.offset - a.offset;
      const f =
        span > 0
          ? Math.max(0, Math.min(1, (t - a.offset) / span))
          : t < a.offset
            ? 0
            : 1;
      const c: Rgba = [
        a.color[0] + (b.color[0] - a.color[0]) * f,
        a.color[1] + (b.color[1] - a.color[1]) * f,
        a.color[2] + (b.color[2] - a.color[2]) * f,
        a.color[3] + (b.color[3] - a.color[3]) * f,
      ];
      return packPremultiplied(c, alpha);
    };
  }

  private emit(mode: VectorMode, first: number) {
    const count = this.vertices.count - first;
    if (count <= 0) return;
    const last = this.draws[this.draws.length - 1];
    // consecutive plain triangles share one draw
    if (
      mode === "direct" &&
      last?.mode === "direct" &&
      last.first + last.count === first
    )
      last.count += count;
    else this.draws.push({ mode, first, count });
  }

  private triangle(
    shade: Shader,
    ax: number,
    ay: number,
    bx: number,
    by: number,
    cx: number,
    cy: number,
    dx = 0,
    dy = 0,
  ) {
    const v = this.vertices;
    v.reserve(3);
    v.push(ax + dx, ay + dy, shade(ax, ay));
    v.push(bx + dx, by + dy, shade(bx, by));
    v.push(cx + dx, cy + dy, shade(cx, cy));
  }

  /** Closed polygons of the current path */
  private polygons(): number[][] {
    const out: number[][] = [];
    for (const sp of this.subpaths) {
      const p = dedupe(sp.points, true);
      if (p.length >= 6) out.push(p);
    }
    return out;
  }

  private fillPolygons(
    polygons: readonly number[][],
    shade: Shader,
    dx = 0,
    dy = 0,
  ) {
    if (!polygons.length) return;
    const convex = polygons.length === 1 && isConvex(polygons[0]);
    const first = this.vertices.count;
    for (const p of polygons) {
      for (let i = 2; i + 3 < p.length; i += 2)
        this.triangle(
          shade,
          p[0],
          p[1],
          p[i],
          p[i + 1],
          p[i + 2],
          p[i + 3],
          dx,
          dy,
        );
    }
    this.emit(convex ? "direct" : "nonzero", first);
  }

  /** Approximated drop shadow: the shape plus soft rings fading outwards */
  private shadow(polygons: readonly number[][], closed: boolean) {
    const s = this.state;
    const color = vectorColor(s.shadowColor);
    const alpha = color[3] * s.globalAlpha;
    if (
      alpha <= 0.002 ||
      (!s.shadowBlur && !s.shadowOffsetX && !s.shadowOffsetY)
    )
      return;
    const dx = s.shadowOffsetX;
    const dy = s.shadowOffsetY;
    const blur = s.shadowBlur;
    const solid = blur > 0 ? alpha * 0.35 : alpha;
    const packed = packPremultiplied([color[0], color[1], color[2], 1], solid);
    if (closed) this.fillPolygons(polygons, () => packed, dx, dy);
    if (blur <= 0) return;
    // every ring covers the shape edge out to blur * k / N: the sum fades
    // from `alpha` at the edge to 0 at `blur`
    const layer = 1 - Math.pow(1 - alpha * 0.65, 1 / SHADOW_LAYERS);
    const shade = (() => {
      const c = packPremultiplied([color[0], color[1], color[2], 1], layer);
      return () => c;
    })();
    for (let k = 1; k <= SHADOW_LAYERS; k++) {
      const half = (blur * k) / SHADOW_LAYERS;
      const first = this.vertices.count;
      for (const p of polygons)
        this.strokePolyline(p, closed, half, shade, "round", "round", dx, dy);
      this.emit("once", first);
    }
  }

  fill() {
    const shade = this.shader(this.state.fillStyle, this.state.globalAlpha);
    const polygons = this.polygons();
    if (!polygons.length) return;
    this.shadow(polygons, true);
    if (shade) this.fillPolygons(polygons, shade);
  }

  fillRect(x: number, y: number, w: number, h: number) {
    const saved = this.subpaths;
    const point = this.hasPoint;
    const [cx, cy] = [this.cx, this.cy];
    this.subpaths = [];
    this.rect(x, y, w, h);
    this.fill();
    this.subpaths = saved;
    this.hasPoint = point;
    this.cx = cx;
    this.cy = cy;
  }

  stroke() {
    const s = this.state;
    let width = s.lineWidth * this.unit();
    let alpha = s.globalAlpha;
    // hairlines: a 1px line with the coverage of the thinner one
    if (width < 1) {
      alpha *= width;
      width = 1;
    }
    const shade = this.shader(s.strokeStyle, alpha);
    if (!shade) return;
    const dash = s.dash.map((d) => d * this.unit());
    const first = this.vertices.count;
    for (const sp of this.subpaths) {
      const p = dedupe(sp.points, sp.closed);
      if (p.length < 2) continue;
      if (p.length === 2) {
        // a zero-length segment (not a lone moveTo): round caps show a dot
        if (sp.points.length >= 4 && s.lineCap === "round")
          this.disc(shade, p[0], p[1], width / 2);
        continue;
      }
      if (dash.length && dash.some((d) => d > 0)) {
        const line = sp.closed ? [...p, p[0], p[1]] : p;
        for (const piece of dashPolyline(
          line,
          dash,
          s.lineDashOffset * this.unit(),
        ))
          this.strokePolyline(
            piece,
            false,
            width / 2,
            shade,
            s.lineCap,
            s.lineJoin,
          );
      } else
        this.strokePolyline(
          p,
          sp.closed,
          width / 2,
          shade,
          s.lineCap,
          s.lineJoin,
        );
    }
    this.emit("once", first);
  }

  private disc(shade: Shader, x: number, y: number, r: number, dx = 0, dy = 0) {
    const n = Math.max(8, Math.min(64, Math.ceil(r * 1.5)));
    let px = x + r;
    let py = y;
    for (let i = 1; i <= n; i++) {
      const a = (i / n) * Math.PI * 2;
      const qx = x + r * Math.cos(a);
      const qy = y + r * Math.sin(a);
      this.triangle(shade, x, y, px, py, qx, qy, dx, dy);
      px = qx;
      py = qy;
    }
  }

  /** Quads along the segments, joins at the vertices, caps at the ends */
  private strokePolyline(
    p: readonly number[],
    closed: boolean,
    hw: number,
    shade: Shader,
    cap: CanvasLineCap,
    join: CanvasLineJoin,
    dx = 0,
    dy = 0,
  ) {
    const n = p.length >> 1;
    if (n < 2) return;
    const segs = closed ? n : n - 1;
    const normal = (i: number): [number, number, number, number] => {
      const j = (i + 1) % n;
      const vx = p[j * 2] - p[i * 2];
      const vy = p[j * 2 + 1] - p[i * 2 + 1];
      const l = Math.hypot(vx, vy) || 1;
      return [-vy / l, vx / l, vx / l, vy / l];
    };
    for (let i = 0; i < segs; i++) {
      const j = (i + 1) % n;
      let ax = p[i * 2];
      let ay = p[i * 2 + 1];
      let bx = p[j * 2];
      let by = p[j * 2 + 1];
      const [nx, ny, tx, ty] = normal(i);
      if (!closed && cap === "square") {
        if (i === 0) {
          ax -= tx * hw;
          ay -= ty * hw;
        }
        if (i === segs - 1) {
          bx += tx * hw;
          by += ty * hw;
        }
      }
      const ox = nx * hw;
      const oy = ny * hw;
      this.triangle(
        shade,
        ax + ox,
        ay + oy,
        bx + ox,
        by + oy,
        bx - ox,
        by - oy,
        dx,
        dy,
      );
      this.triangle(
        shade,
        ax + ox,
        ay + oy,
        bx - ox,
        by - oy,
        ax - ox,
        ay - oy,
        dx,
        dy,
      );
    }
    // joins
    const from = closed ? 0 : 1;
    const to = closed ? n : n - 1;
    for (let i = from; i < to; i++) {
      const prev = (i + n - 1) % n;
      const [n0x, n0y, t0x, t0y] = normal(prev);
      const [n1x, n1y, t1x, t1y] = normal(i);
      const x = p[i * 2];
      const y = p[i * 2 + 1];
      const cross = t0x * t1y - t0y * t1x;
      const dot = t0x * t1x + t0y * t1y;
      if (Math.abs(cross) < 1e-6 && dot > 0) continue;
      // outer side: away from the turn
      const side = cross > 0 ? -1 : 1;
      const ax = x + n0x * hw * side;
      const ay = y + n0y * hw * side;
      const bx = x + n1x * hw * side;
      const by = y + n1y * hw * side;
      const angle = Math.atan2(Math.abs(cross), dot);
      if (join === "round" && angle * hw > 0.5) {
        const a0 = Math.atan2(ay - y, ax - x);
        let sweep = Math.atan2(by - y, bx - x) - a0;
        if (sweep > Math.PI) sweep -= Math.PI * 2;
        if (sweep < -Math.PI) sweep += Math.PI * 2;
        const steps = Math.max(
          1,
          Math.ceil(
            Math.abs(sweep) /
              Math.max(0.05, 2 * Math.acos(Math.max(0, 1 - TOLERANCE / hw))),
          ),
        );
        let px = ax;
        let py = ay;
        for (let k = 1; k <= steps; k++) {
          const a = a0 + (sweep * k) / steps;
          const qx = x + hw * Math.cos(a);
          const qy = y + hw * Math.sin(a);
          this.triangle(shade, x, y, px, py, qx, qy, dx, dy);
          px = qx;
          py = qy;
        }
      } else if (join === "miter") {
        const mx = n0x + n1x;
        const my = n0y + n1y;
        const ml = Math.hypot(mx, my);
        const cosHalf = ml / 2;
        if (ml > 1e-6 && 1 / cosHalf <= this.state.miterLimit) {
          const k = (hw / cosHalf) * side;
          const tipx = x + (mx / ml) * k;
          const tipy = y + (my / ml) * k;
          this.triangle(shade, x, y, ax, ay, tipx, tipy, dx, dy);
          this.triangle(shade, x, y, tipx, tipy, bx, by, dx, dy);
        } else this.triangle(shade, x, y, ax, ay, bx, by, dx, dy);
      } else this.triangle(shade, x, y, ax, ay, bx, by, dx, dy);
    }
    if (!closed && cap === "round") {
      this.disc(shade, p[0], p[1], hw, dx, dy);
      this.disc(shade, p[(n - 1) * 2], p[(n - 1) * 2 + 1], hw, dx, dy);
    }
  }

  // --------------------------------------------------------------- text

  private syncText(): CanvasRenderingContext2D | null {
    const t = this.text;
    if (!t) return null;
    const s = this.state;
    const m = s.matrix;
    t.setTransform(m[0], m[1], m[2], m[3], m[4], m[5]);
    t.globalAlpha = s.globalAlpha;
    t.font = s.font;
    t.textAlign = s.textAlign;
    t.textBaseline = s.textBaseline;
    t.lineWidth = s.lineWidth;
    t.lineJoin = s.lineJoin;
    return t;
  }

  private textPaint(paint: Paint): string | CanvasGradient {
    if (typeof paint === "string") return paint;
    const t = this.text;
    if (!t) return "#000";
    const g = t.createLinearGradient(paint.x0, paint.y0, paint.x1, paint.y1);
    for (const stop of paint.stops) {
      const [r, gg, b, a] = stop.color;
      g.addColorStop(
        stop.offset,
        `rgba(${Math.round(r * 255)}, ${Math.round(gg * 255)}, ${Math.round(b * 255)}, ${a})`,
      );
    }
    return g;
  }

  fillText(text: string, x: number, y: number, maxWidth?: number) {
    const t = this.syncText();
    if (!t) return;
    t.fillStyle = this.textPaint(this.state.fillStyle);
    if (maxWidth === undefined) t.fillText(text, x, y);
    else t.fillText(text, x, y, maxWidth);
  }

  strokeText(text: string, x: number, y: number, maxWidth?: number) {
    const t = this.syncText();
    if (!t) return;
    t.strokeStyle = this.textPaint(this.state.strokeStyle);
    if (maxWidth === undefined) t.strokeText(text, x, y);
    else t.strokeText(text, x, y, maxWidth);
  }

  measureText(text: string): TextMetrics {
    const t = this.text;
    if (t) {
      t.font = this.state.font;
      return t.measureText(text);
    }
    return { width: text.length * 6 } as TextMetrics;
  }
}
