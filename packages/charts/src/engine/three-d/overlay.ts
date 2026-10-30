// 2D overlay of the 3D charts: the far walls of the axis box with their grid
// lines (below the data), then the tick labels, axis titles, color bar and
// hover highlight (above the data). Text is always horizontal (screen
// aligned) so it stays readable whatever the camera.

import { toCss, type Rgba } from "../color";
import { linearTicks } from "../scale";
import type { ColorLut } from "./colormap";
import { project, type CameraFrame, type Vec3 } from "./math";
import { toWorld, type AxisModel, type Model3D } from "./model";

export interface OverlayStyle {
  text: string;
  muted: string;
  grid: string;
  axis: string;
  /** Tint of the walls */
  wall: string;
  /** Background (rings of the hover marker) */
  background: string;
  font: string;
  fontSize: number;
}

export const overlayStyle = (
  theme: {
    text: Rgba;
    textMuted: Rgba;
    grid: Rgba;
    axis: Rgba;
    background: Rgba;
    fontFamily: string;
    fontSize: number;
  },
  dark: boolean,
): OverlayStyle => ({
  text: toCss(theme.text),
  muted: toCss(theme.textMuted),
  grid: toCss(theme.grid),
  axis: toCss(theme.axis),
  wall: toCss(theme.text, dark ? 0.045 : 0.025),
  background: toCss(theme.background),
  font: theme.fontFamily,
  fontSize: theme.fontSize,
});

type Axes = Pick<Model3D, "x" | "y" | "z">;

const AXES: readonly ("x" | "y" | "z")[] = ["x", "y", "z"];

/** World positions of the grid lines of an axis (category axes: between the categories) */
export const gridPositions = (axis: AxisModel): number[] => {
  if (axis.categories) {
    const out: number[] = [];
    for (let i = 0; i < axis.categories.length - 1; i++)
      out.push(toWorld(axis, i + 0.5));
    return out;
  }
  return axis.ticks
    .filter((t) => t > axis.domain[0] && t < axis.domain[1])
    .map((t) => toWorld(axis, t));
};

/** Side (-1 / 1) of the far wall perpendicular to every axis */
export const farWalls = (frame: CameraFrame): [number, number, number] => [
  frame.eye[0] >= 0 ? -1 : 1,
  frame.eye[1] >= 0 ? -1 : 1,
  frame.eye[2] >= 0 ? -1 : 1,
];

const half = (axes: Axes): Vec3 => [axes.x.half, axes.y.half, axes.z.half];

const at = (axis: number, value: number, rest: Vec3): Vec3 => {
  const p: Vec3 = [rest[0], rest[1], rest[2]];
  p[axis] = value;
  return p;
};

/** Far walls, their grid lines and borders */
export const drawWalls = (
  ctx: CanvasRenderingContext2D,
  frame: CameraFrame,
  axes: Axes,
  style: OverlayStyle,
): void => {
  const h = half(axes);
  const walls = farWalls(frame);
  const P = (p: Vec3) => project(frame, p[0], p[1], p[2]);
  ctx.lineWidth = 1;
  for (let a = 0; a < 3; a++) {
    const b = (a + 1) % 3;
    const c = (a + 2) % 3;
    const base: Vec3 = [0, 0, 0];
    base[a] = walls[a] * h[a];
    const corner = (sb: number, sc: number) => {
      const p: Vec3 = [base[0], base[1], base[2]];
      p[b] = sb * h[b];
      p[c] = sc * h[c];
      return P(p);
    };
    const quad = [corner(-1, -1), corner(1, -1), corner(1, 1), corner(-1, 1)];
    ctx.beginPath();
    quad.forEach((q, i) => (i ? ctx.lineTo(q.x, q.y) : ctx.moveTo(q.x, q.y)));
    ctx.closePath();
    ctx.fillStyle = style.wall;
    ctx.fill();
    // grid lines of the two axes spanning the wall
    ctx.beginPath();
    for (const [along, across] of [
      [b, c],
      [c, b],
    ] as const) {
      const axis = axes[AXES[along]!];
      if (!axis.grid) continue;
      for (const w of gridPositions(axis)) {
        const p0 = at(along, w, base);
        const p1 = at(along, w, base);
        p0[across] = -h[across];
        p1[across] = h[across];
        const s0 = P(p0);
        const s1 = P(p1);
        ctx.moveTo(s0.x, s0.y);
        ctx.lineTo(s1.x, s1.y);
      }
    }
    ctx.strokeStyle = style.grid;
    ctx.stroke();
    ctx.beginPath();
    quad.forEach((q, i) => (i ? ctx.lineTo(q.x, q.y) : ctx.moveTo(q.x, q.y)));
    ctx.closePath();
    ctx.strokeStyle = style.axis;
    ctx.stroke();
  }
};

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

const overlaps = (a: Rect, b: Rect, pad = 2) =>
  a.x < b.x + b.w + pad &&
  b.x < a.x + a.w + pad &&
  a.y < b.y + b.h + pad &&
  b.y < a.y + a.h + pad;

/** Edge (fixed coordinates of the two other axes) carrying the labels of an axis */
export const labelEdge = (
  frame: CameraFrame,
  axes: Axes,
  axis: number,
): Vec3 => {
  const h = half(axes);
  const eye = frame.eye;
  if (axis === 0) return [0, (eye[1] >= 0 ? 1 : -1) * h[1], -h[2]];
  if (axis === 1) return [(eye[0] >= 0 ? 1 : -1) * h[0], 0, -h[2]];
  // vertical axis: the leftmost vertical edge on screen
  let best: Vec3 = [-h[0], -h[1], 0];
  let left = Infinity;
  for (const sx of [-1, 1]) {
    for (const sy of [-1, 1]) {
      const p = project(frame, sx * h[0], sy * h[1], 0);
      if (p.x < left) {
        left = p.x;
        best = [sx * h[0], sy * h[1], 0];
      }
    }
  }
  return best;
};

/** Area the labels and titles must stay in (CSS pixels of the stage) */
export interface OverlayBounds {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

/** Tick labels and titles of the three axes */
export const drawAxes = (
  ctx: CanvasRenderingContext2D,
  frame: CameraFrame,
  axes: Axes,
  style: OverlayStyle,
  bounds: OverlayBounds = {
    left: 0,
    top: 0,
    right: frame.width,
    bottom: frame.height,
  },
): void => {
  const center = project(frame, 0, 0, 0);
  const placed: Rect[] = [];
  const size = style.fontSize;
  const labelFont = `${size}px ${style.font}`;
  const titleFont = `600 ${size + 1}px ${style.font}`;
  for (let a = 0; a < 3; a++) {
    const axis = axes[AXES[a]!];
    if (!axis.visible) continue;
    const edge = labelEdge(frame, axes, a);
    const e0 = project(frame, ...at(a, -axis.half, edge));
    const e1 = project(frame, ...at(a, axis.half, edge));
    let dx = e1.x - e0.x;
    let dy = e1.y - e0.y;
    const length = Math.hypot(dx, dy);
    // seen end-on: no room for labels
    if (length < 24) continue;
    dx /= length;
    dy /= length;
    let ox = -dy;
    let oy = dx;
    const mx = (e0.x + e1.x) / 2;
    const my = (e0.y + e1.y) / 2;
    if (ox * (mx - center.x) + oy * (my - center.y) < 0) {
      ox = -ox;
      oy = -oy;
    }
    // vertical axis: labels go sideways
    if (a === 2) {
      ox = mx < center.x ? -1 : 1;
      oy = 0;
    }
    const align: CanvasTextAlign =
      ox > 0.35 ? "left" : ox < -0.35 ? "right" : "center";
    const baseline: CanvasTextBaseline =
      oy > 0.35 ? "top" : oy < -0.35 ? "bottom" : "middle";
    ctx.font = labelFont;
    ctx.textAlign = align;
    ctx.textBaseline = baseline;
    const gap = 8;
    const labels = axis.ticks.map((tick, i) => {
      const s = project(frame, ...at(a, toWorld(axis, tick), edge));
      const text = axis.labels[i] ?? "";
      const w = ctx.measureText(text).width;
      const x = s.x + ox * gap;
      const y = s.y + oy * gap;
      const rx = align === "left" ? x : align === "right" ? x - w : x - w / 2;
      const ry =
        baseline === "top"
          ? y
          : baseline === "bottom"
            ? y - size
            : y - size / 2;
      return { tick: s, text, x, y, rect: { x: rx, y: ry, w, h: size } };
    });
    // thin the labels until they do not overlap
    let step = 1;
    for (; step < labels.length; step++) {
      const kept = labels.filter((_, i) => i % step === 0);
      if (
        kept.every(
          (l, i) => !kept.slice(0, i).some((o) => overlaps(l.rect, o.rect)),
        )
      ) {
        break;
      }
    }
    let extent = 0;
    ctx.beginPath();
    labels.forEach((l, i) => {
      if (i % step) return;
      if (placed.some((o) => overlaps(l.rect, o))) return;
      placed.push(l.rect);
      ctx.moveTo(l.tick.x, l.tick.y);
      ctx.lineTo(l.tick.x + ox * 4, l.tick.y + oy * 4);
      extent = Math.max(
        extent,
        Math.abs(ox) * l.rect.w + Math.abs(oy) * l.rect.h,
      );
    });
    ctx.strokeStyle = style.axis;
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = style.muted;
    labels.forEach((l, i) => {
      if (i % step || !placed.includes(l.rect)) return;
      ctx.fillText(l.text, l.x, l.y);
    });
    if (!axis.title) continue;
    const distance = gap + extent + 10;
    let tx = mx + ox * distance;
    let ty = my + oy * distance;
    ctx.font = titleFont;
    ctx.fillStyle = style.text;
    const tw = ctx.measureText(axis.title).width;
    const th = size + 1;
    if (a === 2) {
      tx = Math.max(bounds.left + th, Math.min(bounds.right - th, tx));
      ty = Math.max(bounds.top + tw / 2, Math.min(bounds.bottom - tw / 2, ty));
      ctx.save();
      ctx.translate(tx, ty);
      ctx.rotate(-Math.PI / 2);
      ctx.textAlign = "center";
      ctx.textBaseline = ox < 0 ? "bottom" : "top";
      ctx.fillText(axis.title, 0, 0);
      ctx.restore();
    } else {
      // keep the whole title inside the bounds
      const left =
        align === "left" ? tx : align === "right" ? tx - tw : tx - tw / 2;
      const top =
        baseline === "top" ? ty : baseline === "bottom" ? ty - th : ty - th / 2;
      tx +=
        Math.max(0, bounds.left - left) - Math.max(0, left + tw - bounds.right);
      ty +=
        Math.max(0, bounds.top - top) - Math.max(0, top + th - bounds.bottom);
      ctx.textAlign = align;
      ctx.textBaseline = baseline;
      ctx.fillText(axis.title, tx, ty);
    }
  }
};

/** Vertical color bar with its ticks and title */
export const drawColorBar = (
  ctx: CanvasRenderingContext2D,
  rect: Rect,
  lut: ColorLut,
  domain: readonly [number, number],
  format: (value: number) => string,
  title: string,
  style: OverlayStyle,
  /** Right end of the stage: the title is shifted left to fit */
  right = Infinity,
): void => {
  const gradient = ctx.createLinearGradient(0, rect.y + rect.h, 0, rect.y);
  const samples = 24;
  for (let i = 0; i <= samples; i++) {
    const c = lut.rgba[Math.round((i / samples) * (lut.rgba.length - 1))];
    if (c) gradient.addColorStop(i / samples, toCss(c));
  }
  ctx.fillStyle = gradient;
  ctx.beginPath();
  if (typeof ctx.roundRect === "function")
    ctx.roundRect(rect.x, rect.y, rect.w, rect.h, 3);
  else ctx.rect(rect.x, rect.y, rect.w, rect.h);
  ctx.fill();
  ctx.strokeStyle = style.axis;
  ctx.lineWidth = 1;
  ctx.stroke();
  const [min, max] = domain;
  const span = max - min || 1;
  ctx.font = `${style.fontSize}px ${style.font}`;
  ctx.fillStyle = style.muted;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  const ticks = linearTicks(min, max, Math.max(2, Math.round(rect.h / 40)));
  ctx.beginPath();
  for (const t of ticks) {
    const y = rect.y + rect.h - ((t - min) / span) * rect.h;
    if (y < rect.y - 0.5 || y > rect.y + rect.h + 0.5) continue;
    ctx.moveTo(rect.x + rect.w, y);
    ctx.lineTo(rect.x + rect.w + 4, y);
    ctx.fillText(format(t), rect.x + rect.w + 7, y);
  }
  ctx.strokeStyle = style.axis;
  ctx.stroke();
  if (title) {
    ctx.font = `600 ${style.fontSize}px ${style.font}`;
    ctx.fillStyle = style.text;
    ctx.textAlign = "left";
    ctx.textBaseline = "bottom";
    const w = ctx.measureText(title).width;
    ctx.fillText(
      title,
      Math.max(4, Math.min(rect.x, right - 4 - w)),
      rect.y - 8,
    );
  }
};

/** Highlight of the hovered item */
export type HighlightShape =
  | { kind: "point"; x: number; y: number; radius: number; color: string }
  | { kind: "box"; min: Vec3; max: Vec3; color: string }
  | { kind: "vertex"; world: Vec3; color: string };

export const drawHighlight = (
  ctx: CanvasRenderingContext2D,
  frame: CameraFrame,
  axes: Axes,
  shape: HighlightShape,
  style: OverlayStyle,
): void => {
  ctx.save();
  if (shape.kind === "point") {
    ctx.beginPath();
    ctx.arc(shape.x, shape.y, shape.radius + 3, 0, Math.PI * 2);
    ctx.lineWidth = 3;
    ctx.strokeStyle = style.background;
    ctx.stroke();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = style.text;
    ctx.stroke();
  } else if (shape.kind === "box") {
    const { min, max } = shape;
    const corner = (i: number) =>
      project(
        frame,
        i & 1 ? max[0] : min[0],
        i & 2 ? max[1] : min[1],
        i & 4 ? max[2] : min[2],
      );
    const pts = Array.from({ length: 8 }, (_, i) => corner(i));
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      for (const bit of [1, 2, 4]) {
        if (i & bit) continue;
        const a = pts[i]!;
        const b = pts[i | bit]!;
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
      }
    }
    ctx.lineJoin = "round";
    ctx.lineWidth = 3.5;
    ctx.strokeStyle = style.background;
    ctx.stroke();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = style.text;
    ctx.stroke();
  } else {
    const [x, y, z] = shape.world;
    const top = project(frame, x, y, z);
    const floor = project(frame, x, y, -axes.z.half);
    ctx.beginPath();
    ctx.setLineDash([3, 3]);
    ctx.moveTo(top.x, top.y);
    ctx.lineTo(floor.x, floor.y);
    ctx.lineWidth = 1;
    ctx.strokeStyle = style.text;
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.arc(floor.x, floor.y, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = style.text;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(top.x, top.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = shape.color;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = style.background;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(top.x, top.y, 7, 0, Math.PI * 2);
    ctx.lineWidth = 1.25;
    ctx.strokeStyle = style.text;
    ctx.stroke();
  }
  ctx.restore();
};
