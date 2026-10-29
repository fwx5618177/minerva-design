// Canvas2D layers around the data: background (areas, grid, axes, tick
// labels) and foreground (reference lines, annotation and point labels).

import { toCss, type Rgba } from "./color";
import type { AxisTicks } from "./axis";
import type { Rect, Scales } from "./layout";
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
  /** Fixed side (bar values); any free side around the dot otherwise */
  placement?: "above" | "below";
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
  const px = a.x === undefined ? plot.x + plot.width / 2 : s.xToPx(a.x);
  const py = a.y === undefined ? plot.y + plot.height / 2 : s.yToPx(a.y);
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

const rectOf = (a: ResolvedRect, s: Scales): Rect => {
  const { plot } = s;
  const xa = a.x0 === undefined ? -Infinity : s.xToPx(a.x0);
  const xb = a.x1 === undefined ? Infinity : s.xToPx(a.x1);
  const ya = a.y0 === undefined ? Infinity : s.yToPx(a.y0);
  const yb = a.y1 === undefined ? -Infinity : s.yToPx(a.y1);
  const left = Math.max(plot.x, Math.min(xa, xb));
  const right = Math.min(plot.x + plot.width, Math.max(xa, xb));
  const top = Math.max(plot.y, Math.min(ya, yb));
  const bottom = Math.min(plot.y + plot.height, Math.max(ya, yb));
  return { x: left, y: top, width: right - left, height: bottom - top };
};

export interface BackgroundInput {
  width: number;
  height: number;
  scales: Scales;
  x: AxisModel;
  y: AxisModel;
  xTicks: AxisTicks;
  yTicks: AxisTicks;
  theme: ChartTheme;
  annotations: readonly ResolvedAnnotation[];
}

export const drawBackground = (
  ctx: CanvasRenderingContext2D,
  input: BackgroundInput,
) => {
  const { scales, theme, x, y, xTicks, yTicks } = input;
  const { plot } = scales;
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
    for (const v of yTicks.values) {
      const py = crisp(scales.yToPx(v));
      if (py < plot.y - 1 || py > plot.y + plot.height + 1) continue;
      ctx.moveTo(plot.x, py);
      ctx.lineTo(plot.x + plot.width, py);
    }
  }
  if (x.grid) {
    for (const v of xTicks.values) {
      const px = crisp(scales.xToPx(v));
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
    const order = xTicks.values
      .map((v, i) => ({ px: scales.xToPx(v), text: xTicks.labels[i] }))
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
    yTicks.values.forEach((v, i) => {
      const py = scales.yToPx(v);
      if (py < plot.y - 0.5 || py > plot.y + plot.height + 0.5) return;
      ctx.fillText(yTicks.labels[i], plot.x - 8, py);
    });
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
    const candidates: Rect[] =
      label.placement === "above"
        ? [above]
        : label.placement === "below"
          ? [below]
          : [
              { x: label.x + gap, y: label.y - height / 2, width: w, height },
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
    if (a.axis === "y") {
      const py = crisp(scales.yToPx(a.value));
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
      const px = crisp(scales.xToPx(a.value));
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
