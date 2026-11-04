// Canvas2D layers around the data: background (areas, grid, axes, tick
// labels) and foreground (reference lines, annotation and point labels).

import { mix, relativeLuminance, toCss, type Rgba } from "./color";
import type { AxisTicks } from "./axis";
import { screenRect, toScreen, type Rect, type Scales } from "./layout";
import type { AxisModel } from "./model";
import type { ChartTheme } from "./theme";
import type { ChartLabelPosition } from "./types";

export interface ResolvedRect {
  type: "rect";
  x0?: number;
  x1?: number;
  y0?: number;
  y1?: number;
  color: Rgba;
  opacity: number;
  label?: string;
  labelPosition: ChartLabelPosition;
  labelColor: Rgba;
  badge?: string;
  detail?: string;
  description?: string;
}

export interface ResolvedLine {
  type: "line";
  axis: "x" | "y";
  value: number;
  color: Rgba;
  width: number;
  dash: number[];
  label?: string;
}

export interface ResolvedText {
  type: "text";
  x?: number;
  y?: number;
  text: string;
  anchor: "center" | "top" | "bottom" | "left" | "right";
  color: Rgba;
  weight: number;
}

export type ResolvedAnnotation = ResolvedRect | ResolvedLine | ResolvedText;

export interface PointLabel {
  /** Source point identity, retained when placement truncates the text. */
  point?: { seriesIndex: number; index: number };
  x: number;
  y: number;
  /** Radius of the dot */
  r: number;
  text: string;
  /**
   * Fixed side (bar values: above / below, left / right of horizontal
   * bars; `inside` the `bar`); any free side around the dot otherwise
   */
  placement?: "above" | "below" | "left" | "right" | "inside";
  /** `inside` labels: the bar, in CSS pixels */
  bar?: Rect;
  /** `inside` labels: at the start of the bar (horizontal bars) or centered */
  align?: "start" | "center";
  /**
   * Text color contrasting with a solid bar (`inside` labels), drawn
   * without a halo; the text color of the theme with a halo otherwise
   */
  color?: string;
  /**
   * Cell the label stays in (`labelCells`: the quadrant of the dot), in CSS
   * pixels: on the side of the dot with more room, cut with an ellipsis
   * when it does not fit
   */
  bounds?: Rect;
  /**
   * Placed (it keeps its room) but not drawn: a card over the chart names
   * the point
   */
  hidden?: boolean;
}

/** Padding of the labels inside the bars, CSS pixels */
const INSIDE_PAD = 6;

/**
 * Color of a text written on a bar of color `fill` (alpha included) over
 * `background`: white or near-black, whichever contrasts more; `undefined`
 * for translucent bars (the theme text color with a halo reads better)
 */
export const insideLabelColor = (
  fill: Rgba,
  background: Rgba,
): string | undefined => {
  const alpha = fill[3];
  if (alpha < 0.6) return undefined;
  const seen = mix(background, fill, alpha);
  const l = relativeLuminance(seen);
  // WCAG contrast with white (L = 1) and with #111827 (L ≈ 0.012)
  return 1.05 / (l + 0.05) >= (l + 0.05) / 0.062
    ? "#ffffff"
    : "rgba(17, 24, 39, 0.92)";
};

export const font = (theme: ChartTheme, size = theme.fontSize, weight = 400) =>
  `${weight} ${size}px ${theme.fontFamily}`;

const crisp = (v: number) => Math.round(v) + 0.5;

/** Path of a rounded box with half-height corners */
const pill = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
) => {
  const r = Math.min(h / 2, w / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
};

/** Box of a text annotation, kept inside the plot */
export const textBox = (
  a: ResolvedText,
  s: Scales,
  width: number,
  height: number,
): Rect => {
  const { plot } = s;
  const at = toScreen(s, a.x ?? 0, a.y ?? 0);
  const free = s.horizontal
    ? { x: a.y === undefined, y: a.x === undefined }
    : { x: a.x === undefined, y: a.y === undefined };
  const px = free.x ? plot.x + plot.width / 2 : at.x;
  const py = free.y ? plot.y + plot.height / 2 : at.y;
  const gap = 6;
  let x = px - width / 2;
  let y = py - height / 2;
  if (a.anchor === "top") y = py + gap;
  else if (a.anchor === "bottom") y = py - gap - height;
  else if (a.anchor === "left") x = px + gap;
  else if (a.anchor === "right") x = px - gap - width;
  x = Math.max(plot.x + gap, Math.min(x, plot.x + plot.width - gap - width));
  y = Math.max(plot.y + 2, Math.min(y, plot.y + plot.height - 2 - height));
  return { x, y, width, height };
};

/** Screen box of an area annotation, clipped to the plot */
export const rectOf = (a: ResolvedRect, s: Scales): Rect => {
  const { plot } = s;
  // clamp every edge to the plot first: an open edge maps to ±Infinity and
  // `Infinity - Infinity` would make the size NaN (nothing drawn)
  const [xLo, xHi] = s.horizontal
    ? [plot.y, plot.y + plot.height]
    : [plot.x, plot.x + plot.width];
  const [yLo, yHi] = s.horizontal
    ? [plot.x, plot.x + plot.width]
    : [plot.y, plot.y + plot.height];
  const along = (px: number, lo: number, hi: number) =>
    px < lo ? lo : px > hi ? hi : px;
  return screenRect(
    s,
    along(s.xToPx(a.x0 ?? -Infinity), xLo, xHi),
    along(s.xToPx(a.x1 ?? Infinity), xLo, xHi),
    along(s.yToPx(a.y0 ?? -Infinity), yLo, yHi),
    along(s.yToPx(a.y1 ?? Infinity), yLo, yHi),
  );
};

/** A text of the title block of an area: badge, label, detail or description */
export interface AreaText {
  kind: "badge" | "label" | "detail" | "description";
  text: string;
  /** Box of the text (the pill of a badge), CSS pixels */
  x: number;
  y: number;
  width: number;
  height: number;
  /** Font size and weight */
  size: number;
  weight: number;
}

/** Title block of an area annotation, in its `labelPosition` corner */
export interface AreaTitle {
  parts: AreaText[];
  /** Box around the parts (the point labels avoid it) */
  box: Rect;
}

/** Whether an area annotation has a title block */
export const hasAreaTitle = (a: ResolvedRect): boolean =>
  !!(a.label || a.badge || a.detail || a.description);

/** Text cut with an ellipsis to fit `max` pixels ("" when nothing fits) */
const fitText = (
  text: string,
  max: number,
  width: (text: string) => number,
): string => {
  if (width(text) <= max) return text;
  const chars = Array.from(text);
  let lo = 0;
  let hi = chars.length;
  while (lo < hi) {
    const mid = Math.ceil((lo + hi) / 2);
    if (width(`${chars.slice(0, mid).join("")}…`) <= max) lo = mid;
    else hi = mid - 1;
  }
  return lo > 0 ? `${chars.slice(0, lo).join("").trimEnd()}…` : "";
};

/**
 * Layout of the title block of an area: `[badge] label detail` on the first
 * line, the description under it; the block sits in the `labelPosition`
 * corner, 10px from the edges, and the texts are cut to the area width
 */
export const areaTitleLayout = (
  a: ResolvedRect,
  r: Rect,
  fontSize: number,
  measure: (text: string, size: number, weight: number) => number,
): AreaTitle | null => {
  if (!hasAreaTitle(a) || r.width <= 0 || r.height <= 0) return null;
  const pad = 10;
  const lineHeight = fontSize + 4;
  const max = Math.max(0, r.width - pad * 2);
  const labelSize = fontSize + 1;
  const badgeSize = Math.max(9, fontSize - 1);
  const gap = 6;
  const badge = a.badge
    ? fitText(a.badge, Math.max(0, max - 10), (t) => measure(t, badgeSize, 700))
    : "";
  const badgeWidth = badge ? measure(badge, badgeSize, 700) + 10 : 0;
  let detail = a.detail ?? "";
  let detailWidth = detail ? measure(detail, fontSize, 500) : 0;
  const room = () =>
    max - (badge ? badgeWidth + gap : 0) - (detail ? detailWidth + gap : 0);
  // a narrow area keeps the title rather than the detail
  if (detail && a.label && room() < 32) {
    detail = "";
    detailWidth = 0;
  }
  if (detail && room() < 0) {
    detail = fitText(
      detail,
      Math.max(0, max - (badge ? badgeWidth + gap : 0)),
      (t) => measure(t, fontSize, 500),
    );
    detailWidth = detail ? measure(detail, fontSize, 500) : 0;
  }
  const label = a.label
    ? fitText(a.label, Math.max(0, room()), (t) => measure(t, labelSize, 600))
    : "";
  const line: AreaText[] = [];
  if (badge)
    line.push({
      kind: "badge",
      text: badge,
      x: 0,
      y: 0,
      width: badgeWidth,
      height: lineHeight,
      size: badgeSize,
      weight: 700,
    });
  if (label)
    line.push({
      kind: "label",
      text: label,
      x: 0,
      y: 0,
      width: measure(label, labelSize, 600),
      height: lineHeight,
      size: labelSize,
      weight: 600,
    });
  if (detail)
    line.push({
      kind: "detail",
      text: detail,
      x: 0,
      y: 0,
      width: detailWidth,
      height: lineHeight,
      size: fontSize,
      weight: 500,
    });
  const description = a.description
    ? fitText(a.description, max, (t) => measure(t, fontSize, 400))
    : "";
  const lineWidth =
    line.reduce((sum, p) => sum + p.width, 0) +
    Math.max(0, line.length - 1) * gap;
  const descriptionWidth = description
    ? measure(description, fontSize, 400)
    : 0;
  if (!line.length && !description) return null;
  const height =
    (line.length ? lineHeight : 0) +
    (description ? lineHeight + (line.length ? 2 : 0) : 0);
  const pos = a.labelPosition;
  const top = pos.startsWith("top")
    ? r.y + pad
    : pos.startsWith("bottom")
      ? r.y + r.height - pad - height
      : r.y + (r.height - height) / 2;
  const startOf = (width: number) =>
    pos.endsWith("left")
      ? r.x + pad
      : pos.endsWith("right")
        ? r.x + r.width - pad - width
        : r.x + (r.width - width) / 2;
  const parts: AreaText[] = [];
  let x = startOf(lineWidth);
  for (const p of line) {
    parts.push({ ...p, x, y: top });
    x += p.width + gap;
  }
  if (description)
    parts.push({
      kind: "description",
      text: description,
      x: startOf(descriptionWidth),
      y: top + (line.length ? lineHeight + 2 : 0),
      width: descriptionWidth,
      height: lineHeight,
      size: fontSize,
      weight: 400,
    });
  const width = Math.max(lineWidth, descriptionWidth);
  return {
    parts,
    box: { x: startOf(width), y: top, width, height },
  };
};

/**
 * Where a reference line goes: `vertical` lines run at screen x `at`,
 * horizontal ones at screen y `at`
 */
export const lineOf = (
  a: ResolvedLine,
  s: Scales,
): { vertical: boolean; at: number } => {
  const vertical = (a.axis === "x") !== s.horizontal;
  return {
    vertical,
    at: a.axis === "x" ? s.xToPx(a.value) : s.yToPx(a.value),
  };
};

export interface BackgroundInput {
  width: number;
  height: number;
  scales: Scales;
  x: AxisModel;
  y: AxisModel;
  xTicks: AxisTicks;
  yTicks: AxisTicks;
  /** Right axis (dual axis charts) */
  y2?: AxisModel | null;
  y2Ticks?: AxisTicks | null;
  theme: ChartTheme;
  annotations: readonly ResolvedAnnotation[];
}

export const drawBackground = (
  ctx: CanvasRenderingContext2D,
  input: BackgroundInput,
) => {
  const { scales, theme, xTicks, yTicks } = input;
  const { plot } = scales;
  // horizontal charts: the value axis along the bottom, the x axis on the left
  const x = scales.horizontal ? input.y : input.x;
  const y = scales.horizontal ? input.x : input.y;
  const bottomTicks = scales.horizontal ? yTicks : xTicks;
  const leftTicks = scales.horizontal ? xTicks : yTicks;
  const bottomPx = scales.horizontal ? scales.yToPx : scales.xToPx;
  const leftPx = scales.horizontal ? scales.xToPx : scales.yToPx;
  ctx.clearRect(0, 0, input.width, input.height);

  // areas
  ctx.save();
  ctx.beginPath();
  ctx.rect(plot.x, plot.y, plot.width, plot.height);
  ctx.clip();
  for (const a of input.annotations) {
    if (a.type !== "rect") continue;
    const r = rectOf(a, scales);
    if (r.width <= 0 || r.height <= 0) continue;
    ctx.fillStyle = toCss(a.color, a.opacity);
    ctx.fillRect(r.x, r.y, r.width, r.height);
  }
  ctx.restore();

  // grid
  ctx.lineWidth = 1;
  ctx.strokeStyle = toCss(theme.grid);
  ctx.beginPath();
  if (y.grid) {
    for (const v of leftTicks.values) {
      const py = crisp(leftPx(v));
      if (py < plot.y - 1 || py > plot.y + plot.height + 1) continue;
      ctx.moveTo(plot.x, py);
      ctx.lineTo(plot.x + plot.width, py);
    }
  }
  if (x.grid) {
    for (const v of bottomTicks.values) {
      const px = crisp(bottomPx(v));
      if (px < plot.x - 1 || px > plot.x + plot.width + 1) continue;
      ctx.moveTo(px, plot.y);
      ctx.lineTo(px, plot.y + plot.height);
    }
  }
  ctx.stroke();

  const line = Math.ceil(theme.fontSize * 1.4);
  ctx.font = font(theme);
  ctx.fillStyle = toCss(theme.textMuted);

  // x axis
  if (x.visible) {
    ctx.strokeStyle = toCss(theme.axis);
    ctx.beginPath();
    const base = crisp(plot.y + plot.height);
    ctx.moveTo(plot.x, base);
    ctx.lineTo(plot.x + plot.width, base);
    ctx.stroke();
    ctx.textBaseline = "top";
    ctx.textAlign = "center";
    let lastRight = -Infinity;
    // left to right (reversed axes list their ticks right to left)
    const order = bottomTicks.values
      .map((v, i) => ({ px: bottomPx(v), text: bottomTicks.labels[i] }))
      .sort((a, b) => a.px - b.px);
    for (const { px, text } of order) {
      if (px < plot.x - 0.5 || px > plot.x + plot.width + 0.5) continue;
      const w = ctx.measureText(text).width;
      const left = Math.max(0, Math.min(input.width - w, px - w / 2));
      if (left < lastRight + 6) continue;
      lastRight = left + w;
      ctx.fillText(text, left + w / 2, plot.y + plot.height + 7);
    }
    if (x.title) {
      ctx.font = font(theme, theme.fontSize + 1, 500);
      ctx.fillStyle = toCss(theme.text, 0.8);
      ctx.fillText(
        x.title,
        plot.x + plot.width / 2,
        plot.y + plot.height + line + 10,
      );
    }
  }

  // y axis
  if (y.visible) {
    ctx.font = font(theme);
    ctx.fillStyle = toCss(theme.textMuted);
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    let lastBottom = -Infinity;
    // top to bottom: category rows of horizontal charts never overlap
    const rows = leftTicks.values
      .map((v, i) => ({ py: leftPx(v), text: leftTicks.labels[i] }))
      .sort((a, b) => a.py - b.py);
    const rowHeight = theme.fontSize + 2;
    for (const { py, text } of rows) {
      if (py < plot.y - 0.5 || py > plot.y + plot.height + 0.5) continue;
      if (scales.horizontal) {
        if (py - rowHeight / 2 < lastBottom) continue;
        lastBottom = py + rowHeight / 2;
      }
      ctx.fillText(text, plot.x - 8, py);
    }
    if (y.title) {
      ctx.save();
      ctx.font = font(theme, theme.fontSize + 1, 500);
      ctx.fillStyle = toCss(theme.text, 0.8);
      ctx.translate(line / 2 + 4, plot.y + plot.height / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.textAlign = "center";
      ctx.fillText(y.title, 0, 0);
      ctx.restore();
    }
  }

  // right axis
  const y2 = scales.horizontal ? null : input.y2;
  const y2Ticks = input.y2Ticks;
  if (y2 && y2Ticks && y2.visible) {
    const right = plot.x + plot.width;
    ctx.font = font(theme);
    ctx.fillStyle = toCss(theme.textMuted);
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    y2Ticks.values.forEach((v, i) => {
      const py = scales.yToPx(v);
      if (py < plot.y - 0.5 || py > plot.y + plot.height + 0.5) return;
      ctx.fillText(y2Ticks.labels[i], right + 8, py);
    });
    if (y2.title) {
      ctx.save();
      ctx.font = font(theme, theme.fontSize + 1, 500);
      ctx.fillStyle = toCss(theme.text, 0.8);
      ctx.translate(input.width - line / 2 - 4, plot.y + plot.height / 2);
      ctx.rotate(Math.PI / 2);
      ctx.textAlign = "center";
      ctx.fillText(y2.title, 0, 0);
      ctx.restore();
    }
  }
};

const overlaps = (a: Rect, b: Rect) =>
  a.x < b.x + b.width &&
  b.x < a.x + a.width &&
  a.y < b.y + b.height &&
  b.y < a.y + a.height;

const inside = (r: Rect, plot: Rect) =>
  r.x >= plot.x &&
  r.y >= plot.y &&
  r.x + r.width <= plot.x + plot.width &&
  r.y + r.height <= plot.y + plot.height;

/** Text with a halo in the background color (readable over data) */
const haloText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  color: string,
  halo: string,
) => {
  ctx.lineWidth = 3;
  ctx.lineJoin = "round";
  ctx.strokeStyle = halo;
  ctx.strokeText(text, x, y);
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
};

/**
 * Box of a label inside its bar (the visible part of it): the text cut with
 * an ellipsis to fit, at the start of horizontal bars and centered in
 * vertical ones; `null` when the bar is too small
 */
const insideBox = (
  label: PointLabel,
  plot: Rect,
  measure: (text: string) => number,
  height: number,
): { label: PointLabel; box: Rect } | null => {
  const bar = label.bar;
  if (!bar) return null;
  const x0 = Math.max(bar.x, plot.x);
  const x1 = Math.min(bar.x + bar.width, plot.x + plot.width);
  const y0 = Math.max(bar.y, plot.y);
  const y1 = Math.min(bar.y + bar.height, plot.y + plot.height);
  if (y1 - y0 < height - 2) return null;
  const text = fitText(label.text, x1 - x0 - INSIDE_PAD * 2, measure);
  if (!text) return null;
  const w = measure(text);
  const x = label.align === "start" ? x0 + INSIDE_PAD : (x0 + x1) / 2 - w / 2;
  return {
    label: text === label.text ? label : { ...label, text },
    box: { x, y: (y0 + y1) / 2 - height / 2, width: w, height },
  };
};

/** Room kept between a label and the edges of its cell, CSS pixels */
const CELL_PAD = 2;
/** Room kept between two labels of a cell (they never touch), CSS pixels */
const LABEL_GAP = { x: 4, y: 2 };

/** Distance from a point to the nearest point of a box */
const distanceTo = (x: number, y: number, r: Rect) =>
  Math.hypot(
    Math.max(r.x - x, 0, x - (r.x + r.width)),
    Math.max(r.y - y, 0, y - (r.y + r.height)),
  );

/** A dot of a cell label: its label is told apart from the others by it */
type Dot = Pick<PointLabel, "x" | "y" | "r">;

/**
 * Box of a label kept inside a cell of the plot (`bounds`): beside the dot
 * on the side with more room in the cell (moved up or down into the cell
 * near its edges), else above or below it (moved sideways into the cell),
 * else beside it half a line up or down;
 * cut with an ellipsis to the room left when the whole text fits nowhere;
 * `null` when no free slot is left. A slot is free when it keeps a gap to
 * the other labels and its own dot is the nearest one (it covers no other
 * dot): a crowded cell never pairs a name with the wrong dot
 */
const cellBox = (
  label: PointLabel,
  bounds: Rect,
  plot: Rect,
  measure: (text: string) => number,
  height: number,
  occupied: readonly Rect[],
  dots: readonly Dot[] = [],
): { label: PointLabel; box: Rect } | null => {
  const x0 = Math.max(bounds.x, plot.x) + CELL_PAD;
  const x1 = Math.min(bounds.x + bounds.width, plot.x + plot.width) - CELL_PAD;
  const y0 = Math.max(bounds.y, plot.y) + CELL_PAD;
  const y1 =
    Math.min(bounds.y + bounds.height, plot.y + plot.height) - CELL_PAD;
  if (x1 - x0 <= 0 || y1 - y0 < height) return null;
  // a hair of slack: a text cut to the exact room ends on the edge
  const slack = {
    x: x0 - 0.01,
    y: y0 - 0.01,
    width: x1 - x0 + 0.02,
    height: y1 - y0 + 0.02,
  };
  // the other dots: those at the very spot of this one count as its own
  const others = dots.filter(
    (d) => Math.abs(d.x - label.x) >= 0.5 || Math.abs(d.y - label.y) >= 0.5,
  );
  const free = (c: Rect) => {
    if (!inside(c, slack)) return false;
    const spaced = {
      x: c.x - LABEL_GAP.x,
      y: c.y - LABEL_GAP.y,
      width: c.width + LABEL_GAP.x * 2,
      height: c.height + LABEL_GAP.y * 2,
    };
    if (occupied.some((o) => overlaps(o, spaced))) return false;
    const own = distanceTo(label.x, label.y, c);
    return others.every((d) => {
      const far = distanceTo(d.x, d.y, c);
      return far >= d.r + 2 && far > own;
    });
  };
  const gap = label.r + 4;
  // centered on the dot, moved into the cell near its top or bottom edge
  const sideY = Math.min(Math.max(label.y - height / 2, y0), y1 - height);
  const room = { right: x1 - (label.x + gap), left: label.x - gap - x0 };
  const sides: ("right" | "left")[] =
    room.right >= room.left ? ["right", "left"] : ["left", "right"];
  const beside = (side: "right" | "left", w: number): Rect[] => [
    {
      x: side === "right" ? label.x + gap : label.x - gap - w,
      y: sideY,
      width: w,
      height,
    },
  ];
  // beside the dot, raised or lowered by half a line: a crowded cell gets
  // more slots still next to their own dot
  const corners = (side: "right" | "left", w: number): Rect[] =>
    [label.y - height - 1, label.y + 1].map((y) => ({
      x: side === "right" ? label.x + gap : label.x - gap - w,
      y: Math.min(Math.max(y, y0), y1 - height),
      width: w,
      height,
    }));
  const stacked = (w: number): Rect[] => {
    // slid sideways into the cell near its edges (still over the dot)
    const x = Math.min(Math.max(label.x - w / 2, x0), x1 - w);
    return [
      { x, y: label.y - gap - height, width: w, height },
      { x, y: label.y + gap, width: w, height },
    ];
  };
  const w = measure(label.text);
  const whole = [
    ...beside(sides[0]!, w),
    ...beside(sides[1]!, w),
    ...stacked(w),
    ...corners(sides[0]!, w),
    ...corners(sides[1]!, w),
  ];
  const box = whole.find(free);
  if (box) return { label, box };
  // the whole text fits nowhere: cut it to the room beside the dot or above
  // / below it, keeping the longest text (the roomiest side on ties)
  const cuts: [number, (w: number) => Rect[]][] = [
    [
      room[sides[0]!],
      (cw) => [...beside(sides[0]!, cw), ...corners(sides[0]!, cw)],
    ],
    [
      room[sides[1]!],
      (cw) => [...beside(sides[1]!, cw), ...corners(sides[1]!, cw)],
    ],
    [x1 - x0, stacked],
  ];
  let best: { label: PointLabel; box: Rect } | null = null;
  // a cut keeps enough of the name to tell it (else the label is skipped,
  // like an overlapping one: the tooltip still names the point)
  const total = Array.from(label.text).length;
  const keep = Math.min(4, Math.ceil(total * 0.4));
  for (const [max, boxes] of cuts) {
    const text = fitText(label.text, max, measure);
    if (!text || (best && text.length <= best.label.text.length)) continue;
    if (Array.from(text).length - 1 < keep) continue;
    const cut = boxes(measure(text)).find(free);
    if (cut) best = { label: { ...label, text }, box: cut };
  }
  return best;
};

/** Greedy placement: right, left, above, below the dot; skipped when no slot is free */
export const placeLabels = (
  labels: readonly PointLabel[],
  plot: Rect,
  measure: (text: string) => number,
  height: number,
  occupied: Rect[] = [],
): { label: PointLabel; box: Rect }[] => {
  const placed: { label: PointLabel; box: Rect }[] = [];
  // the dots of the labels kept in cells (labels placed later included)
  const dots = labels.filter((label) => label.bounds);
  for (const label of labels) {
    if (label.placement === "inside") {
      const fit = insideBox(label, plot, measure, height);
      if (fit) placed.push(fit);
      continue;
    }
    if (label.bounds) {
      const fit = cellBox(
        label,
        label.bounds,
        plot,
        measure,
        height,
        occupied,
        dots,
      );
      if (!fit) continue;
      occupied.push(fit.box);
      placed.push(fit);
      continue;
    }
    const w = measure(label.text);
    const gap = label.r + 4;
    const above = {
      x: label.x - w / 2,
      y: label.y - gap - height,
      width: w,
      height,
    };
    const below = { x: label.x - w / 2, y: label.y + gap, width: w, height };
    const right = {
      x: label.x + gap,
      y: label.y - height / 2,
      width: w,
      height,
    };
    const left = {
      x: label.x - gap - w,
      y: label.y - height / 2,
      width: w,
      height,
    };
    const candidates: Rect[] =
      label.placement === "above"
        ? [above]
        : label.placement === "below"
          ? [below]
          : label.placement === "right"
            ? [right, left]
            : label.placement === "left"
              ? [left, right]
              : [
                  {
                    x: label.x + gap,
                    y: label.y - height / 2,
                    width: w,
                    height,
                  },
                  {
                    x: label.x - gap - w,
                    y: label.y - height / 2,
                    width: w,
                    height,
                  },
                  above,
                  below,
                ];
    const box = candidates.find(
      (c) => inside(c, plot) && !occupied.some((o) => overlaps(o, c)),
    );
    if (!box) continue;
    occupied.push(box);
    placed.push({ label, box });
  }
  return placed;
};

export interface ForegroundInput {
  width: number;
  height: number;
  scales: Scales;
  theme: ChartTheme;
  annotations: readonly ResolvedAnnotation[];
  pointLabels: readonly PointLabel[];
  /**
   * Clears the canvas first (off when the layers share one canvas)
   * @default true
   */
  clear?: boolean;
  /** Lines between consecutive bars (waterfall connectors), drawn first */
  connectors?: readonly {
    x0: number;
    y0: number;
    x1: number;
    y1: number;
    color: string;
    width: number;
    dash: readonly number[];
  }[];
  /** Dependency arrows (Gantt charts), drawn over the connectors */
  arrows?: readonly ArrowPath[];
}

/** An elbow arrow in stage pixels (see `dependencyArrows`) */
export interface ArrowPath {
  points: readonly { x: number; y: number }[];
  head: readonly { x: number; y: number }[];
  color: string;
  width: number;
}

/** Elbow arrows: polylines with rounded corners and filled heads */
export const drawArrows = (
  ctx: CanvasRenderingContext2D,
  arrows: readonly ArrowPath[],
) => {
  for (const a of arrows) {
    const pts = a.points;
    const first = pts[0];
    if (!first) continue;
    ctx.strokeStyle = a.color;
    ctx.fillStyle = a.color;
    ctx.lineWidth = a.width;
    ctx.lineJoin = "round";
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(first.x, first.y);
    for (let i = 1; i < pts.length; i++) {
      const p = pts[i]!;
      const next = pts[i + 1];
      const prev = pts[i - 1]!;
      if (next && typeof ctx.arcTo === "function") {
        // rounded elbow, at most half of the shorter leg
        const r = Math.min(
          4,
          Math.hypot(p.x - prev.x, p.y - prev.y) / 2,
          Math.hypot(next.x - p.x, next.y - p.y) / 2,
        );
        ctx.arcTo(p.x, p.y, next.x, next.y, r);
      } else {
        ctx.lineTo(p.x, p.y);
      }
    }
    ctx.stroke();
    const [tip, b0, b1] = a.head;
    if (tip && b0 && b1) {
      ctx.beginPath();
      ctx.moveTo(tip.x, tip.y);
      ctx.lineTo(b0.x, b0.y);
      ctx.lineTo(b1.x, b1.y);
      ctx.closePath();
      ctx.fill();
    }
  }
};

export const drawForeground = (
  ctx: CanvasRenderingContext2D,
  input: ForegroundInput,
) => {
  const { scales, theme } = input;
  const { plot } = scales;
  if (input.clear !== false) ctx.clearRect(0, 0, input.width, input.height);
  ctx.save();
  ctx.beginPath();
  ctx.rect(plot.x, plot.y, plot.width, plot.height);
  ctx.clip();

  for (const c of input.connectors ?? []) {
    ctx.strokeStyle = c.color;
    ctx.lineWidth = c.width;
    ctx.setLineDash([...c.dash]);
    ctx.beginPath();
    // crisp hairlines along the pixel grid
    const along = c.y0 === c.y1;
    const x0 = along ? c.x0 : crisp(c.x0);
    const y0 = along ? crisp(c.y0) : c.y0;
    ctx.moveTo(x0, y0);
    ctx.lineTo(along ? c.x1 : x0, along ? y0 : c.y1);
    ctx.stroke();
  }
  ctx.setLineDash([]);
  if (input.arrows?.length) drawArrows(ctx, input.arrows);

  const halo = toCss(theme.background, 0.9);
  const occupied: Rect[] = [];
  const labelHeight = theme.fontSize + 4;

  for (const a of input.annotations) {
    if (a.type !== "line") continue;
    const color = toCss(a.color);
    ctx.strokeStyle = color;
    ctx.lineWidth = a.width;
    ctx.setLineDash(a.dash);
    ctx.beginPath();
    const where = lineOf(a, scales);
    if (!where.vertical) {
      const py = crisp(where.at);
      ctx.moveTo(plot.x, py);
      ctx.lineTo(plot.x + plot.width, py);
      ctx.stroke();
      if (a.label) {
        ctx.setLineDash([]);
        ctx.font = font(theme, theme.fontSize, 500);
        ctx.textAlign = "right";
        ctx.textBaseline = "bottom";
        haloText(ctx, a.label, plot.x + plot.width - 6, py - 3, color, halo);
      }
    } else {
      const px = crisp(where.at);
      ctx.moveTo(px, plot.y);
      ctx.lineTo(px, plot.y + plot.height);
      ctx.stroke();
      if (a.label) {
        ctx.setLineDash([]);
        ctx.font = font(theme, theme.fontSize, 500);
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        haloText(ctx, a.label, px + 5, plot.y + 5, color, halo);
      }
    }
  }
  ctx.setLineDash([]);

  // labels of areas
  for (const a of input.annotations) {
    if (a.type !== "rect" || !hasAreaTitle(a)) continue;
    const title = areaTitleLayout(
      a,
      rectOf(a, scales),
      theme.fontSize,
      (text, size, weight) => {
        ctx.font = font(theme, size, weight);
        return ctx.measureText(text).width;
      },
    );
    if (!title) continue;
    const color = toCss(a.labelColor);
    const muted = toCss(theme.textMuted);
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    for (const p of title.parts) {
      const cy = p.y + p.height / 2;
      if (p.kind === "badge") {
        const h = p.height - 2;
        pill(ctx, p.x, cy - h / 2, p.width, h);
        ctx.fillStyle = toCss(a.labelColor, 0.16);
        ctx.fill();
        ctx.font = font(theme, p.size, p.weight);
        ctx.fillStyle = color;
        ctx.fillText(p.text, p.x + 5, cy);
        continue;
      }
      ctx.font = font(theme, p.size, p.weight);
      ctx.fillStyle = p.kind === "label" ? color : muted;
      ctx.fillText(p.text, p.x, cy);
    }
    occupied.push(title.box);
  }

  // free texts
  for (const a of input.annotations) {
    if (a.type !== "text" || !a.text) continue;
    ctx.font = font(theme, theme.fontSize, a.weight);
    const box = textBox(a, scales, ctx.measureText(a.text).width, labelHeight);
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    haloText(ctx, a.text, box.x, box.y + box.height / 2, toCss(a.color), halo);
    occupied.push(box);
  }

  // point labels
  let placed: { label: PointLabel; box: Rect }[] = [];
  if (input.pointLabels.length) {
    ctx.font = font(theme);
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    const textColor = toCss(theme.text, 0.85);
    placed = placeLabels(
      input.pointLabels,
      plot,
      (t) => ctx.measureText(t).width,
      labelHeight - 2,
      occupied,
    );
    for (const { label, box } of placed) {
      if (label.hidden) continue;
      const y = box.y + box.height / 2;
      if (label.color) {
        ctx.fillStyle = label.color;
        ctx.fillText(label.text, box.x, y);
      } else haloText(ctx, label.text, box.x, y, textColor, halo);
    }
  }
  ctx.restore();
  return placed;
};
