// Canvas2D layers around the data: background (areas, grid, axes, tick
// labels) and foreground (reference lines, annotation and point labels).

import { toCss, type Rgba } from "./color";
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
  x: number;
  y: number;
  /** Radius of the dot */
  r: number;
  text: string;
  /**
   * Fixed side (bar values: above / below, left / right of horizontal
   * bars); any free side around the dot otherwise
   */
  placement?: "above" | "below" | "left" | "right";
}

export const font = (theme: ChartTheme, size = theme.fontSize, weight = 400) =>
  `${weight} ${size}px ${theme.fontFamily}`;

const crisp = (v: number) => Math.round(v) + 0.5;

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

/** Greedy placement: right, left, above, below the dot; skipped when no slot is free */
export const placeLabels = (
  labels: readonly PointLabel[],
  plot: Rect,
  measure: (text: string) => number,
  height: number,
  occupied: Rect[] = [],
): { label: PointLabel; box: Rect }[] => {
  const placed: { label: PointLabel; box: Rect }[] = [];
  for (const label of labels) {
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
}

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
  ctx.font = font(theme, theme.fontSize + 1, 600);
  for (const a of input.annotations) {
    if (a.type !== "rect" || !a.label) continue;
    const r = rectOf(a, scales);
    if (r.width <= 0 || r.height <= 0) continue;
    const pad = 10;
    const w = ctx.measureText(a.label).width;
    const pos = a.labelPosition;
    const tx = pos.endsWith("left")
      ? r.x + pad
      : pos.endsWith("right")
        ? r.x + r.width - pad - w
        : r.x + (r.width - w) / 2;
    const ty = pos.startsWith("top")
      ? r.y + pad
      : pos.startsWith("bottom")
        ? r.y + r.height - pad - labelHeight
        : r.y + (r.height - labelHeight) / 2;
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillStyle = toCss(a.labelColor);
    ctx.fillText(a.label, tx, ty);
    occupied.push({ x: tx, y: ty, width: w, height: labelHeight });
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
  if (input.pointLabels.length) {
    ctx.font = font(theme);
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    const textColor = toCss(theme.text, 0.85);
    const placed = placeLabels(
      input.pointLabels,
      plot,
      (t) => ctx.measureText(t).width,
      labelHeight - 2,
      occupied,
    );
    for (const { label, box } of placed) {
      haloText(ctx, label.text, box.x, box.y + box.height / 2, textColor, halo);
    }
  }
  ctx.restore();
};
