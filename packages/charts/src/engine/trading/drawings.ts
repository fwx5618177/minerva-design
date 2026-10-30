// Drawings: geometry in CSS pixels, handles, hit tests and Canvas2D
// painting. Anchors are stored as (time, price) so drawings stay on their
// bars when the chart scrolls, zooms or receives new bars; a drawing lives
// in a pane (the price pane or an indicator pane) and uses its scale.

import type {
  TradingDrawing,
  TradingDrawingPoint,
  TradingDrawingTool,
  TradingLineStyle,
} from "./types";

/** Converts between anchors and the pixels of a pane */
export interface DrawingMapper {
  /** x (CSS px) of a logical bar index */
  x(index: number): number;
  /** y (CSS px) of a price */
  y(price: number): number;
  /** Logical index of a time (extrapolated outside the bars) */
  index(time: number): number;
  /** Plot rectangle of the pane */
  left: number;
  right: number;
  top: number;
  bottom: number;
}

export interface Point {
  x: number;
  y: number;
}

/** Rectangle in CSS pixels (text boxes, measured when painted) */
export interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

type DrawingType = Exclude<TradingDrawingTool, "cursor">;

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

/** Clicks that create a drawing (positions get a default target and stop) */
export const anchorCount = (tool: DrawingType): number => {
  switch (tool) {
    case "horizontalLine":
    case "verticalLine":
    case "text":
    case "longPosition":
    case "shortPosition":
      return 1;
    case "parallelChannel":
    case "pitchfork":
      return 3;
    default:
      return 2;
  }
};

/** Drawings with an area that `fill` can turn off */
export const isFillable = (type: DrawingType): boolean =>
  type === "rectangle" ||
  type === "parallelChannel" ||
  type === "pitchfork" ||
  type === "fibRetracement" ||
  type === "text";

export const isPosition = (type: DrawingType): boolean =>
  type === "longPosition" || type === "shortPosition";

export const screenPoints = (
  drawing: TradingDrawing,
  m: DrawingMapper,
): Point[] =>
  drawing.points.map((p) => ({ x: m.x(m.index(p.time)), y: m.y(p.price) }));

/** Lines of a parallel channel: the base line and the parallel through the third anchor */
const channelLines = (a: Point, b: Point, c: Point) => {
  const dx = b.x - a.x;
  const t = dx ? (c.x - a.x) / dx : 0;
  const dy = c.y - (a.y + t * (b.y - a.y));
  return {
    base: [a, b] as const,
    parallel: [
      { x: a.x, y: a.y + dy },
      { x: b.x, y: b.y + dy },
    ] as const,
  };
};

/** Median line of a pitchfork: from the pivot through the middle of the other anchors */
const pitchforkLines = (a: Point, b: Point, c: Point) => {
  const mid = { x: (b.x + c.x) / 2, y: (b.y + c.y) / 2 };
  const dir = { x: mid.x - a.x, y: mid.y - a.y };
  return {
    median: [a, mid] as const,
    upper: [b, { x: b.x + dir.x, y: b.y + dir.y }] as const,
    lower: [c, { x: c.x + dir.x, y: c.y + dir.y }] as const,
  };
};

/** Pixels of a position drawing: the box and its three prices */
const positionGeometry = (pts: Point[]) => {
  const [entry, target, stop] = pts;
  if (!entry || !target || !stop) return null;
  const x0 = Math.min(entry.x, target.x);
  const x1 = Math.max(entry.x, target.x);
  return { x0, x1, entry: entry.y, target: target.y, stop: stop.y };
};

/** Handles of a drawing, in the order `moveHandle` understands */
export const handlePoints = (
  drawing: TradingDrawing,
  m: DrawingMapper,
  box?: Box,
): Point[] => {
  const pts = screenPoints(drawing, m);
  if (isPosition(drawing.type)) {
    const g = positionGeometry(pts);
    const entry = pts[0];
    if (!g || !entry) return pts.slice(0, 1);
    const edge = pts[1] ? pts[1].x : entry.x;
    return [
      { x: entry.x, y: g.entry },
      { x: entry.x, y: g.target },
      { x: entry.x, y: g.stop },
      { x: edge, y: g.entry },
    ];
  }
  if (drawing.type === "parallelChannel") {
    const [a, b, c] = pts;
    if (!a || !b || !c) return pts;
    const { parallel } = channelLines(a, b, c);
    return [
      a,
      b,
      {
        x: (parallel[0].x + parallel[1].x) / 2,
        y: (parallel[0].y + parallel[1].y) / 2,
      },
    ];
  }
  if (drawing.type === "text" && box && pts[0]) return [pts[0]];
  return pts;
};

/** New anchors after dragging handle `index` to `point` */
export const moveHandle = (
  drawing: TradingDrawing,
  index: number,
  point: TradingDrawingPoint,
): TradingDrawingPoint[] => {
  const points = [...drawing.points];
  if (isPosition(drawing.type)) {
    const [entry, target, stop] = points;
    if (!entry || !target || !stop) return points;
    switch (index) {
      case 0:
        return [point, target, stop];
      case 1:
        return [entry, { ...target, price: point.price }, stop];
      case 2:
        return [entry, target, { ...stop, price: point.price }];
      default:
        return [
          entry,
          { ...target, time: point.time },
          { ...stop, time: point.time },
        ];
    }
  }
  if (index >= 0 && index < points.length) points[index] = point;
  return points;
};

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

/** Whether `p` is inside the quadrilateral `q` (convex or not, even-odd rule) */
const inPolygon = (p: Point, q: readonly Point[]) => {
  let inside = false;
  for (let i = 0, j = q.length - 1; i < q.length; j = i++) {
    const a = q[i];
    const b = q[j];
    if (!a || !b) continue;
    if (
      a.y > p.y !== b.y > p.y &&
      p.x < ((b.x - a.x) * (p.y - a.y)) / (b.y - a.y || 1e-9) + a.x
    )
      inside = !inside;
  }
  return inside;
};

/** Part of a drawing under the pointer */
export type DrawingHit = { part: "handle"; index: number } | { part: "body" };

export const hitDrawing = (
  drawing: TradingDrawing,
  m: DrawingMapper,
  p: Point,
  tolerance = 6,
  box?: Box,
): DrawingHit | null => {
  const handles = handlePoints(drawing, m, box);
  for (let i = 0; i < handles.length; i++) {
    const q = handles[i];
    if (q && Math.hypot(q.x - p.x, q.y - p.y) <= tolerance + 2)
      return { part: "handle", index: i };
  }
  const pts = screenPoints(drawing, m);
  const [a, b, c] = pts;
  if (!a) return null;
  const near = (d: number) =>
    d <= tolerance ? { part: "body" as const } : null;
  const inRect = (x0: number, y0: number, x1: number, y1: number) =>
    p.x >= Math.min(x0, x1) - tolerance &&
    p.x <= Math.max(x0, x1) + tolerance &&
    p.y >= Math.min(y0, y1) - tolerance &&
    p.y <= Math.max(y0, y1) + tolerance;
  switch (drawing.type) {
    case "horizontalLine":
      return near(Math.abs(p.y - a.y));
    case "verticalLine":
      return near(Math.abs(p.x - a.x));
    case "trendLine":
    case "arrow":
      return b ? near(distanceToSegment(p, a, b, false, false)) : null;
    case "ray":
      return b ? near(distanceToSegment(p, a, b, false, true)) : null;
    case "extendedLine":
      return b ? near(distanceToSegment(p, a, b, true, true)) : null;
    case "text": {
      const r = box ?? { x: a.x, y: a.y, w: 40, h: 22 };
      return inRect(r.x, r.y, r.x + r.w, r.y + r.h) ? { part: "body" } : null;
    }
    case "parallelChannel": {
      if (!b || !c) return null;
      const { parallel } = channelLines(a, b, c);
      if (inPolygon(p, [a, b, parallel[1], parallel[0]]))
        return { part: "body" };
      return near(
        Math.min(
          distanceToSegment(p, a, b, false, false),
          distanceToSegment(p, parallel[0], parallel[1], false, false),
        ),
      );
    }
    case "pitchfork": {
      if (!b || !c) return null;
      const lines = pitchforkLines(a, b, c);
      return near(
        Math.min(
          distanceToSegment(p, lines.median[0], lines.median[1], false, true),
          distanceToSegment(p, lines.upper[0], lines.upper[1], false, true),
          distanceToSegment(p, lines.lower[0], lines.lower[1], false, true),
          distanceToSegment(p, b, c, false, false),
        ),
      );
    }
    case "longPosition":
    case "shortPosition": {
      const g = positionGeometry(pts);
      if (!g) return null;
      const top = Math.min(g.target, g.stop);
      const bottom = Math.max(g.target, g.stop);
      return inRect(g.x0, top, g.x1, bottom) ? { part: "body" } : null;
    }
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
    default:
      // rectangle, measure: inside or on the outline
      return b && inRect(a.x, a.y, b.x, b.y) ? { part: "body" } : null;
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

/** Texts of the position tools (templates of the chart labels) */
export interface PositionTexts {
  target: string;
  stop: string;
  riskReward: string;
  profit: string;
  long: string;
  short: string;
}

/** Values and helpers the painter needs from the chart */
export interface DrawingPaintContext {
  /** Resolved CSS color of a drawing */
  color: string;
  /** Text color on the plot */
  text: string;
  /** Background of the plot (handles) */
  background: string;
  /** Up / down colors (measure, positions) */
  up: string;
  down: string;
  font: string;
  /** Font family of the text drawings */
  fontFamily: string;
  formatPrice(price: number): string;
  formatPercent(value: number): string;
  /** `"24 bars, 2d 4h"` */
  formatSpan(bars: number, ms: number): string;
  /** Readable text color on a fill */
  textOn(fill: string): string;
  /** Default text of a text drawing */
  defaultText: string;
  /** Texts of the position tools */
  position: PositionTexts;
  /** Last price (profit of the position tools) */
  last: number;
  /** Fills `{name}` placeholders */
  fill(template: string, values: Record<string, string | number>): string;
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

/**
 * Paints a drawing (the context is clipped to its pane). Returns the box of
 * a text drawing, used by the hit tests.
 */
export const paintDrawing = (
  ctx: CanvasRenderingContext2D,
  drawing: TradingDrawing,
  m: DrawingMapper,
  c: DrawingPaintContext,
  state: { selected: boolean; hovered: boolean },
): Box | null => {
  const pts = screenPoints(drawing, m);
  const [a, b, third] = pts;
  if (!a) return null;
  const width = (drawing.lineWidth ?? 1.5) + (state.hovered ? 0.5 : 0);
  const filled = drawing.fill !== false;
  let box: Box | null = null;
  ctx.save();
  ctx.lineWidth = width;
  ctx.strokeStyle = c.color;
  ctx.fillStyle = c.color;
  ctx.font = c.font;
  ctx.lineCap = "round";
  setDash(ctx, drawing.lineStyle, width);
  const line = (p: Point, q: Point) => {
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(q.x, q.y);
    ctx.stroke();
  };
  const shade = (points: readonly Point[], alpha = 0.1) => {
    if (!filled) return;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    points.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
    ctx.closePath();
    ctx.fill();
    ctx.restore();
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
    case "arrow":
      if (b) paintArrow(ctx, a, b, width);
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
        shade([
          { x, y },
          { x: x + Math.abs(b.x - a.x), y },
          { x: x + Math.abs(b.x - a.x), y: y + Math.abs(b.y - a.y) },
          { x, y: y + Math.abs(b.y - a.y) },
        ]);
        ctx.strokeRect(x, y, Math.abs(b.x - a.x), Math.abs(b.y - a.y));
      }
      break;
    case "parallelChannel":
      if (b && third) {
        const { parallel } = channelLines(a, b, third);
        shade([a, b, parallel[1], parallel[0]]);
        line(a, b);
        line(parallel[0], parallel[1]);
        // the middle line, dashed
        ctx.save();
        ctx.globalAlpha = 0.55;
        ctx.setLineDash([4, 4]);
        line(
          { x: a.x, y: (a.y + parallel[0].y) / 2 },
          { x: b.x, y: (b.y + parallel[1].y) / 2 },
        );
        ctx.restore();
      } else if (b) {
        line(a, b);
      }
      break;
    case "pitchfork":
      if (b && third) {
        const lines = pitchforkLines(a, b, third);
        const far = (p: readonly [Point, Point]) => extend(p[0], p[1], m);
        shade([b, far(lines.upper), far(lines.lower), third], 0.07);
        line(lines.median[0], far(lines.median));
        line(b, far(lines.upper));
        line(third, far(lines.lower));
        ctx.save();
        ctx.globalAlpha = 0.55;
        ctx.setLineDash([4, 4]);
        line(b, third);
        ctx.restore();
      } else if (b) {
        line(a, b);
      }
      break;
    case "fibRetracement":
      if (b) paintFib(ctx, drawing, a, b, c, filled, m);
      break;
    case "measure":
      if (b) paintMeasure(ctx, drawing, a, b, m, c);
      break;
    case "text":
      box = paintText(ctx, drawing, a, c, filled);
      break;
    case "longPosition":
    case "shortPosition":
      paintPosition(ctx, drawing, pts, m, c);
      break;
  }
  if (state.selected || state.hovered) {
    ctx.setLineDash([]);
    ctx.lineWidth = 1.5;
    for (const p of handlePoints(drawing, m, box ?? undefined)) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, state.selected ? 4.5 : 3.5, 0, Math.PI * 2);
      ctx.fillStyle = c.background;
      ctx.fill();
      ctx.strokeStyle = c.color;
      ctx.stroke();
    }
  }
  ctx.restore();
  return box;
};

const paintArrow = (
  ctx: CanvasRenderingContext2D,
  a: Point,
  b: Point,
  width: number,
) => {
  const angle = Math.atan2(b.y - a.y, b.x - a.x);
  const head = 8 + width * 2;
  const len = Math.hypot(b.x - a.x, b.y - a.y);
  // the shaft stops inside the head so the tip stays sharp
  const k = len > head ? (len - head * 0.6) / len : 0;
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(a.x + (b.x - a.x) * k, a.y + (b.y - a.y) * k);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.moveTo(b.x, b.y);
  ctx.lineTo(
    b.x - head * Math.cos(angle - 0.42),
    b.y - head * Math.sin(angle - 0.42),
  );
  ctx.lineTo(
    b.x - head * Math.cos(angle + 0.42),
    b.y - head * Math.sin(angle + 0.42),
  );
  ctx.closePath();
  ctx.fill();
};

const paintText = (
  ctx: CanvasRenderingContext2D,
  drawing: TradingDrawing,
  a: Point,
  c: DrawingPaintContext,
  filled: boolean,
): Box => {
  const size = drawing.fontSize ?? 13;
  const lines = (drawing.text || c.defaultText).split("\n");
  ctx.font = `500 ${size}px ${c.fontFamily}`;
  const lineHeight = Math.round(size * 1.35);
  const w = Math.max(...lines.map((t) => ctx.measureText(t).width)) + 18;
  const h = lines.length * lineHeight + 10;
  const box = { x: a.x, y: a.y, w, h };
  ctx.setLineDash([]);
  if (filled) {
    // a note card: the plot background, a colored border and accent
    roundRect(ctx, a.x, a.y, w, h, 5);
    ctx.globalAlpha = 0.94;
    ctx.fillStyle = c.background;
    ctx.fill();
    ctx.globalAlpha = 0.12;
    ctx.fillStyle = c.color;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.lineWidth = 1;
    ctx.strokeStyle = c.color;
    ctx.stroke();
    ctx.fillStyle = c.color;
    ctx.fillRect(a.x + 1, a.y + 4, 3, h - 8);
  }
  ctx.fillStyle = filled ? c.text : c.color;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  lines.forEach((t, i) =>
    ctx.fillText(t, a.x + 10, a.y + 5 + lineHeight * (i + 0.5)),
  );
  return box;
};

const paintPosition = (
  ctx: CanvasRenderingContext2D,
  drawing: TradingDrawing,
  pts: Point[],
  m: DrawingMapper,
  c: DrawingPaintContext,
) => {
  const g = positionGeometry(pts);
  const [entry, target, stop] = drawing.points;
  if (!g || !entry || !target || !stop) return;
  const long = drawing.type === "longPosition";
  const w = Math.max(1, g.x1 - g.x0);
  ctx.setLineDash([]);
  // the reward zone and the risk zone
  for (const [y, color] of [
    [g.target, c.up],
    [g.stop, c.down],
  ] as const) {
    ctx.globalAlpha = 0.16;
    ctx.fillStyle = color;
    ctx.fillRect(g.x0, Math.min(y, g.entry), w, Math.abs(y - g.entry));
    ctx.globalAlpha = 0.7;
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(g.x0, Math.round(y) + 0.5);
    ctx.lineTo(g.x1, Math.round(y) + 0.5);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  ctx.strokeStyle = c.text;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(g.x0, Math.round(g.entry) + 0.5);
  ctx.lineTo(g.x1, Math.round(g.entry) + 0.5);
  ctx.stroke();
  const dir = long ? 1 : -1;
  const change = (price: number) =>
    c.formatPercent(((price - entry.price) / entry.price) * 100);
  const reward = Math.abs(target.price - entry.price);
  const risk = Math.abs(entry.price - stop.price);
  const ratio = risk > 0 ? reward / risk : NaN;
  const texts = c.position;
  const label = (text: string, y: number, fill: string, above: boolean) => {
    ctx.font = c.font;
    const tw = ctx.measureText(text).width + 14;
    const x = Math.max(
      m.left + 2,
      Math.min(g.x0 + w / 2 - tw / 2, m.right - tw - 2),
    );
    const top = above ? y - 24 : y + 4;
    roundRect(ctx, x, top, tw, 20, 4);
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.fillStyle = c.textOn(fill);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, x + tw / 2, top + 10.5);
  };
  const targetUp = g.target < g.entry;
  label(
    c.fill(texts.target, {
      price: c.formatPrice(target.price),
      change: change(target.price),
    }),
    g.target,
    c.up,
    targetUp,
  );
  label(
    c.fill(texts.stop, {
      price: c.formatPrice(stop.price),
      change: change(stop.price),
    }),
    g.stop,
    c.down,
    !targetUp,
  );
  // the side, the ratio and the profit at the last price
  const parts = [
    long ? texts.long : texts.short,
    c.fill(texts.riskReward, {
      ratio: Number.isFinite(ratio) ? ratio.toFixed(2) : "–",
    }),
  ];
  if (Number.isFinite(c.last) && entry.price) {
    const move = (c.last - entry.price) * dir;
    const percent = c.formatPercent((move / entry.price) * 100);
    const value =
      drawing.quantity !== undefined
        ? `${move * drawing.quantity >= 0 ? "+" : "−"}${c.formatPrice(Math.abs(move * drawing.quantity))} (${percent})`
        : percent;
    parts.push(c.fill(texts.profit, { value }));
  }
  ctx.font = c.font;
  const text = parts.join("  ·  ");
  const tw = ctx.measureText(text).width + 16;
  const x = Math.max(
    m.left + 2,
    Math.min(g.x0 + w / 2 - tw / 2, m.right - tw - 2),
  );
  const center = g.entry - 10;
  roundRect(ctx, x, center, tw, 20, 4);
  ctx.fillStyle = c.text;
  ctx.fill();
  ctx.fillStyle = c.background;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, x + tw / 2, center + 10.5);
};

const paintFib = (
  ctx: CanvasRenderingContext2D,
  drawing: TradingDrawing,
  a: Point,
  b: Point,
  c: DrawingPaintContext,
  filled: boolean,
  m: DrawingMapper,
) => {
  const x0 = Math.min(a.x, b.x);
  const x1 = Math.max(a.x, b.x);
  // labels stay readable when the left anchor is scrolled out
  const labelX = Math.max(x0, m.left) + 4;
  const p1 = drawing.points[0]?.price ?? 0;
  const p2 = drawing.points[1]?.price ?? 0;
  const ys = FIB_LEVELS.map((level) => b.y + (a.y - b.y) * level);
  // bands between levels
  if (filled) {
    for (let i = 0; i + 1 < FIB_LEVELS.length; i++) {
      ctx.globalAlpha = 0.08;
      ctx.fillStyle = drawing.color ? c.color : (FIB_COLORS[i + 1] ?? c.color);
      ctx.fillRect(
        x0,
        Math.min(ys[i] ?? 0, ys[i + 1] ?? 0),
        x1 - x0,
        Math.abs((ys[i + 1] ?? 0) - (ys[i] ?? 0)),
      );
    }
  }
  ctx.globalAlpha = 1;
  ctx.textBaseline = "bottom";
  ctx.textAlign = "left";
  FIB_LEVELS.forEach((level, i) => {
    const y = Math.round(ys[i] ?? 0) + 0.5;
    const color = drawing.color ? c.color : (FIB_COLORS[i] ?? c.color);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x0, y);
    ctx.lineTo(x1, y);
    ctx.stroke();
    const price = p2 + (p1 - p2) * level;
    ctx.fillText(`${level} (${c.formatPrice(price)})`, labelX, y - 2);
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
  // flip inside the pane when the label would leave it
  let ly = below ? y1 + 6 : y0 - h - 6;
  if (ly < m.top + 2) ly = y1 + 6;
  if (ly + h > m.bottom - 2) ly = Math.max(m.top + 2, y0 - h - 6);
  roundRect(ctx, lx, ly, w, h, 4);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.fillStyle = c.textOn(color);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(lines[0] ?? "", lx + w / 2, ly + 11);
  ctx.fillText(lines[1] ?? "", lx + w / 2, ly + 27);
};
