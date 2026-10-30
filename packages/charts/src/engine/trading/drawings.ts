// Drawings of the price pane: geometry in CSS pixels, hit tests and
// Canvas2D painting. Anchors are stored as (time, price) so drawings stay
// on their bars when the chart scrolls, zooms or receives new bars.

import type {
  TradingDrawing,
  TradingDrawingPoint,
  TradingDrawingTool,
  TradingLineStyle,
} from "./types";

/** Converts between anchors and the pixels of the price pane */
export interface DrawingMapper {
  /** x (CSS px) of a logical bar index */
  x(index: number): number;
  /** y (CSS px) of a price */
  y(price: number): number;
  /** Logical index of a time (extrapolated outside the bars) */
  index(time: number): number;
  /** Plot rectangle of the price pane */
  left: number;
  right: number;
  top: number;
  bottom: number;
}

export interface Point {
  x: number;
  y: number;
}

/** Fibonacci retracement levels */
export const FIB_LEVELS = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1];
const FIB_COLORS = [
  "#787b86",
  "#f23645",
  "#ff9800",
  "#4caf50",
  "#089981",
  "#2962ff",
  "#787b86",
];

/** Number of anchors of a tool */
export const anchorCount = (tool: Exclude<TradingDrawingTool, "cursor">) =>
  tool === "horizontalLine" || tool === "verticalLine" ? 1 : 2;

export const screenPoints = (
  drawing: TradingDrawing,
  m: DrawingMapper,
): Point[] =>
  drawing.points.map((p) => ({ x: m.x(m.index(p.time)), y: m.y(p.price) }));

const distanceToSegment = (
  p: Point,
  a: Point,
  b: Point,
  extendStart: boolean,
  extendEnd: boolean,
) => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len2 = dx * dx + dy * dy;
  if (len2 === 0) return Math.hypot(p.x - a.x, p.y - a.y);
  let t = ((p.x - a.x) * dx + (p.y - a.y) * dy) / len2;
  if (!extendStart) t = Math.max(0, t);
  if (!extendEnd) t = Math.min(1, t);
  return Math.hypot(p.x - (a.x + t * dx), p.y - (a.y + t * dy));
};

/** Part of a drawing under the pointer */
export type DrawingHit = { part: "handle"; index: number } | { part: "body" };

export const hitDrawing = (
  drawing: TradingDrawing,
  m: DrawingMapper,
  p: Point,
  tolerance = 6,
): DrawingHit | null => {
  const pts = screenPoints(drawing, m);
  for (let i = 0; i < pts.length; i++) {
    const q = pts[i];
    if (Math.hypot(q.x - p.x, q.y - p.y) <= tolerance + 2)
      return { part: "handle", index: i };
  }
  const [a, b] = pts;
  if (!a) return null;
  const near = (d: number) =>
    d <= tolerance ? { part: "body" as const } : null;
  switch (drawing.type) {
    case "horizontalLine":
      return near(Math.abs(p.y - a.y));
    case "verticalLine":
      return near(Math.abs(p.x - a.x));
    case "trendLine":
      return b ? near(distanceToSegment(p, a, b, false, false)) : null;
    case "ray":
      return b ? near(distanceToSegment(p, a, b, false, true)) : null;
    case "extendedLine":
      return b ? near(distanceToSegment(p, a, b, true, true)) : null;
    case "fibRetracement": {
      if (!b) return null;
      const x0 = Math.min(a.x, b.x);
      const x1 = Math.max(a.x, b.x);
      if (p.x < x0 - tolerance || p.x > x1 + tolerance) return null;
      for (const level of FIB_LEVELS) {
        const y = b.y + (a.y - b.y) * level;
        if (Math.abs(p.y - y) <= tolerance) return { part: "body" };
      }
      return null;
    }
    default: {
      // rectangle, measure: inside or on the outline
      if (!b) return null;
      const x0 = Math.min(a.x, b.x) - tolerance;
      const x1 = Math.max(a.x, b.x) + tolerance;
      const y0 = Math.min(a.y, b.y) - tolerance;
      const y1 = Math.max(a.y, b.y) + tolerance;
      return p.x >= x0 && p.x <= x1 && p.y >= y0 && p.y <= y1
        ? { part: "body" }
        : null;
    }
  }
};

export const setDash = (
  ctx: CanvasRenderingContext2D,
  style: TradingLineStyle | undefined,
  width: number,
) => {
  if (style === "dashed") ctx.setLineDash([6, 4]);
  else if (style === "dotted") ctx.setLineDash([Math.max(1, width), 3]);
  else ctx.setLineDash([]);
};

/** Values and helpers the painter needs from the chart */
export interface DrawingPaintContext {
  /** Resolved CSS color of a drawing */
  color: string;
  /** Text color on the plot */
  text: string;
  /** Background of the plot (handles) */
  background: string;
  /** Up / down colors (measure) */
  up: string;
  down: string;
  font: string;
  formatPrice(price: number): string;
  formatPercent(value: number): string;
  /** `"24 bars, 2d 4h"` */
  formatSpan(bars: number, ms: number): string;
  /** Readable text color on a fill */
  textOn(fill: string): string;
}

/** Point at the end of a line through `a` and `b`, far past the plot */
const extend = (a: Point, b: Point, m: DrawingMapper): Point => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy);
  if (!len) return b;
  const k = (Math.abs(m.right - m.left) + Math.abs(m.bottom - m.top)) * 4;
  return { x: a.x + (dx / len) * k, y: a.y + (dy / len) * k };
};

const roundRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) => {
  ctx.beginPath();
  if (typeof ctx.roundRect === "function") ctx.roundRect(x, y, w, h, r);
  else ctx.rect(x, y, w, h);
};

/** Paints a drawing (the context is clipped to the price pane) */
export const paintDrawing = (
  ctx: CanvasRenderingContext2D,
  drawing: TradingDrawing,
  m: DrawingMapper,
  c: DrawingPaintContext,
  state: { selected: boolean; hovered: boolean },
): void => {
  const pts = screenPoints(drawing, m);
  const [a, b] = pts;
  if (!a) return;
  const width = (drawing.lineWidth ?? 1.5) + (state.hovered ? 0.5 : 0);
  ctx.save();
  ctx.lineWidth = width;
  ctx.strokeStyle = c.color;
  ctx.fillStyle = c.color;
  ctx.font = c.font;
  setDash(ctx, drawing.lineStyle, width);
  const line = (p: Point, q: Point) => {
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(q.x, q.y);
    ctx.stroke();
  };
  switch (drawing.type) {
    case "horizontalLine":
      line({ x: m.left, y: a.y }, { x: m.right, y: a.y });
      break;
    case "verticalLine":
      line({ x: a.x, y: m.top }, { x: a.x, y: m.bottom });
      break;
    case "trendLine":
      if (b) line(a, b);
      break;
    case "ray":
      if (b) line(a, extend(a, b, m));
      break;
    case "extendedLine":
      if (b) line(extend(b, a, m), extend(a, b, m));
      break;
    case "rectangle":
      if (b) {
        const x = Math.min(a.x, b.x);
        const y = Math.min(a.y, b.y);
        const w = Math.abs(b.x - a.x);
        const h = Math.abs(b.y - a.y);
        ctx.globalAlpha = 0.12;
        ctx.fillRect(x, y, w, h);
        ctx.globalAlpha = 1;
        ctx.strokeRect(x, y, w, h);
      }
      break;
    case "fibRetracement":
      if (b) paintFib(ctx, drawing, a, b, c);
      break;
    case "measure":
      if (b) paintMeasure(ctx, drawing, a, b, m, c);
      break;
  }
  if (state.selected || state.hovered) {
    ctx.setLineDash([]);
    ctx.lineWidth = 1.5;
    for (const p of pts) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, state.selected ? 4.5 : 3.5, 0, Math.PI * 2);
      ctx.fillStyle = c.background;
      ctx.fill();
      ctx.strokeStyle = c.color;
      ctx.stroke();
    }
  }
  ctx.restore();
};

const paintFib = (
  ctx: CanvasRenderingContext2D,
  drawing: TradingDrawing,
  a: Point,
  b: Point,
  c: DrawingPaintContext,
) => {
  const x0 = Math.min(a.x, b.x);
  const x1 = Math.max(a.x, b.x);
  const p1 = drawing.points[0]?.price ?? 0;
  const p2 = drawing.points[1]?.price ?? 0;
  const ys = FIB_LEVELS.map((level) => b.y + (a.y - b.y) * level);
  // bands between levels
  for (let i = 0; i + 1 < FIB_LEVELS.length; i++) {
    ctx.globalAlpha = 0.08;
    ctx.fillStyle = drawing.color ? c.color : FIB_COLORS[i + 1];
    ctx.fillRect(
      x0,
      Math.min(ys[i], ys[i + 1]),
      x1 - x0,
      Math.abs(ys[i + 1] - ys[i]),
    );
  }
  ctx.globalAlpha = 1;
  ctx.textBaseline = "bottom";
  ctx.textAlign = "left";
  FIB_LEVELS.forEach((level, i) => {
    const y = Math.round(ys[i]) + 0.5;
    const color = drawing.color ? c.color : FIB_COLORS[i];
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x0, y);
    ctx.lineTo(x1, y);
    ctx.stroke();
    const price = p2 + (p1 - p2) * level;
    ctx.fillText(`${level} (${c.formatPrice(price)})`, x0 + 4, y - 2);
  });
  // the trend line between the anchors
  ctx.setLineDash([4, 4]);
  ctx.strokeStyle = c.color;
  ctx.globalAlpha = 0.6;
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.stroke();
  ctx.globalAlpha = 1;
};

const paintMeasure = (
  ctx: CanvasRenderingContext2D,
  drawing: TradingDrawing,
  a: Point,
  b: Point,
  m: DrawingMapper,
  c: DrawingPaintContext,
) => {
  const [p1, p2] = drawing.points as [TradingDrawingPoint, TradingDrawingPoint];
  const rising = p2.price >= p1.price;
  const color = drawing.color ? c.color : rising ? c.up : c.down;
  const x0 = Math.min(a.x, b.x);
  const x1 = Math.max(a.x, b.x);
  const y0 = Math.min(a.y, b.y);
  const y1 = Math.max(a.y, b.y);
  ctx.setLineDash([]);
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.14;
  ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
  ctx.globalAlpha = 1;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  // arrows across the box
  const midX = Math.round((x0 + x1) / 2) + 0.5;
  const midY = Math.round((y0 + y1) / 2) + 0.5;
  const arrow = (from: Point, to: Point) => {
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
    const angle = Math.atan2(to.y - from.y, to.x - from.x);
    ctx.beginPath();
    ctx.moveTo(to.x, to.y);
    ctx.lineTo(
      to.x - 6 * Math.cos(angle - 0.5),
      to.y - 6 * Math.sin(angle - 0.5),
    );
    ctx.lineTo(
      to.x - 6 * Math.cos(angle + 0.5),
      to.y - 6 * Math.sin(angle + 0.5),
    );
    ctx.closePath();
    ctx.fill();
  };
  if (y1 - y0 > 10)
    arrow({ x: midX, y: rising ? y1 : y0 }, { x: midX, y: rising ? y0 : y1 });
  if (x1 - x0 > 10)
    arrow(
      { x: a.x < b.x ? x0 : x1, y: midY },
      { x: a.x < b.x ? x1 : x0, y: midY },
    );
  // label
  const change = p2.price - p1.price;
  const percent = p1.price ? (change / p1.price) * 100 : NaN;
  const bars = Math.round(m.index(p2.time) - m.index(p1.time));
  const lines = [
    `${change >= 0 ? "+" : "−"}${c.formatPrice(Math.abs(change))} (${c.formatPercent(percent)})`,
    c.formatSpan(bars, p2.time - p1.time),
  ];
  const widths = lines.map((t) => ctx.measureText(t).width);
  const w = Math.max(...widths) + 16;
  const h = 38;
  const lx = (x0 + x1) / 2 - w / 2;
  const below = !rising;
  const ly = below ? y1 + 6 : y0 - h - 6;
  roundRect(ctx, lx, ly, w, h, 4);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.fillStyle = c.textOn(color);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(lines[0], lx + w / 2, ly + 11);
  ctx.fillText(lines[1], lx + w / 2, ly + 27);
};
