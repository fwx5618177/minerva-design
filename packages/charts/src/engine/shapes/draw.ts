// Draws a ShapeScene on any CanvasRenderingContext2D (browser, OffscreenCanvas,
// mini-programs). Only uses the widely available path APIs: arc, arcTo,
// quadraticCurveTo (no roundRect, no Path2D, no fill rules).

import { toCss } from "../color";
import { font } from "../overlay";
import type { ChartTheme } from "../theme";
import type { ShapeLegendBox, ShapeTooltipBox } from "./layout";
import {
  TAU,
  type PolygonNode,
  type SectorNode,
  type ShapeHover,
  type ShapeScene,
} from "./scene";

const SHADOW = "rgba(15, 23, 42, 0.18)";
const BRIGHTEN = "rgba(255, 255, 255, 0.14)";

/** Gap of a sector, reduced so thin slices keep most of their arc */
export const sectorPad = (node: SectorNode) =>
  Math.max(0, Math.min(node.pad, (node.r1 * (node.a1 - node.a0)) / 3));

/** Angle offset of a point at distance `r` from a radial edge moved by `half` px */
export const padAngleAt = (half: number, r: number) =>
  r > 0 ? Math.asin(Math.min(1, half / r)) : Math.PI / 2;

/** Annular sector with pixel gaps and rounded corners */
export const sectorPath = (
  ctx: CanvasRenderingContext2D,
  node: SectorNode,
  dx = 0,
  dy = 0,
) => {
  const cx = node.cx + dx;
  const cy = node.cy + dy;
  const { r0, r1, a0, a1 } = node;
  const span = a1 - a0;
  ctx.beginPath();
  if (span <= 0 || r1 <= r0) return;
  if (span >= TAU - 1e-6) {
    ctx.moveTo(cx + r1, cy);
    ctx.arc(cx, cy, r1, 0, TAU);
    if (r0 > 0) {
      ctx.moveTo(cx + r0, cy);
      ctx.arc(cx, cy, r0, TAU, 0, true);
    }
    ctx.closePath();
    return;
  }
  const half = sectorPad(node) / 2;
  // point at distance `r` on the start (side 1) or end (side -1) edge
  const edge = (a: number, side: 1 | -1, r: number): [number, number] => {
    const t = a + side * padAngleAt(half, r);
    return [cx + r * Math.cos(t), cy + r * Math.sin(t)];
  };
  const polar = (a: number, r: number): [number, number] => [
    cx + r * Math.cos(a),
    cy + r * Math.sin(a),
  ];

  const po = padAngleAt(half, r1);
  const outerSpan = Math.max(0, span - 2 * po);
  const pi = r0 > 0 ? padAngleAt(half, r0) : 0;
  const innerSpan = r0 > 0 ? span - 2 * pi : 0;
  const hasInner = r0 > 0 && innerSpan > 1e-4;
  const thick = r1 - r0;
  const co = Math.max(
    0,
    Math.min(node.corner, thick / 2, (r1 * outerSpan) / 2 - 0.01),
  );
  const ci = hasInner
    ? Math.max(0, Math.min(node.corner, thick / 2, (r0 * innerSpan) / 2 - 0.01))
    : 0;

  // outer edge
  if (co > 0.5) {
    const s = edge(a0, 1, r1 - co);
    ctx.moveTo(s[0], s[1]);
    const c = edge(a0, 1, r1);
    const e = polar(a0 + po + co / r1, r1);
    ctx.quadraticCurveTo(c[0], c[1], e[0], e[1]);
    ctx.arc(cx, cy, r1, a0 + po + co / r1, a1 - po - co / r1);
    const c2 = edge(a1, -1, r1);
    const e2 = edge(a1, -1, r1 - co);
    ctx.quadraticCurveTo(c2[0], c2[1], e2[0], e2[1]);
  } else {
    const s = polar(a0 + po, r1);
    ctx.moveTo(s[0], s[1]);
    ctx.arc(cx, cy, r1, a0 + po, a1 - po);
  }

  // inner edge (or apex)
  if (hasInner) {
    if (ci > 0.5) {
      const s = edge(a1, -1, r0 + ci);
      ctx.lineTo(s[0], s[1]);
      const c = edge(a1, -1, r0);
      const e = polar(a1 - pi - ci / r0, r0);
      ctx.quadraticCurveTo(c[0], c[1], e[0], e[1]);
      ctx.arc(cx, cy, r0, a1 - pi - ci / r0, a0 + pi + ci / r0, true);
      const c2 = edge(a0, 1, r0);
      const e2 = edge(a0, 1, r0 + ci);
      ctx.quadraticCurveTo(c2[0], c2[1], e2[0], e2[1]);
    } else {
      const s = polar(a1 - pi, r0);
      ctx.lineTo(s[0], s[1]);
      ctx.arc(cx, cy, r0, a1 - pi, a0 + pi, true);
    }
  } else if (half <= 0) {
    ctx.lineTo(cx, cy);
  } else if (span < Math.PI) {
    // the two offset edges meet on the bisector
    const d = half / Math.sin(span / 2);
    const m = (a0 + a1) / 2;
    ctx.lineTo(cx + d * Math.cos(m), cy + d * Math.sin(m));
  } else {
    ctx.lineTo(
      cx + half * Math.cos(a1 - Math.PI / 2),
      cy + half * Math.sin(a1 - Math.PI / 2),
    );
    ctx.lineTo(
      cx + half * Math.cos(a0 + Math.PI / 2),
      cy + half * Math.sin(a0 + Math.PI / 2),
    );
  }
  ctx.closePath();
};

/** Closed polygon with rounded corners (adds a subpath) */
const polygonSubpath = (
  ctx: CanvasRenderingContext2D,
  points: readonly number[],
  radius: number,
  reverse: boolean,
  dx: number,
  dy: number,
) => {
  const n = points.length >> 1;
  if (n < 2) return;
  const px = (i: number) => {
    const k = reverse ? n - 1 - i : i;
    return points[k * 2] + dx;
  };
  const py = (i: number) => {
    const k = reverse ? n - 1 - i : i;
    return points[k * 2 + 1] + dy;
  };
  if (radius <= 0 || n < 3) {
    ctx.moveTo(px(0), py(0));
    for (let i = 1; i < n; i++) ctx.lineTo(px(i), py(i));
    ctx.closePath();
    return;
  }
  // start in the middle of the last edge so every corner is rounded
  ctx.moveTo((px(n - 1) + px(0)) / 2, (py(n - 1) + py(0)) / 2);
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    const p = (i + n - 1) % n;
    const lenPrev = Math.hypot(px(i) - px(p), py(i) - py(p));
    const lenNext = Math.hypot(px(j) - px(i), py(j) - py(i));
    const r = Math.min(radius, lenPrev / 2, lenNext / 2);
    if (r > 0.01) ctx.arcTo(px(i), py(i), px(j), py(j), r);
    else ctx.lineTo(px(i), py(i));
  }
  ctx.closePath();
};

const polygonPath = (
  ctx: CanvasRenderingContext2D,
  node: PolygonNode,
  dx = 0,
  dy = 0,
) => {
  ctx.beginPath();
  polygonSubpath(ctx, node.points, node.radius ?? 0, false, dx, dy);
  // reversed winding cuts the hole with the default nonzero rule
  if (node.hole) polygonSubpath(ctx, node.hole, 0, true, dx, dy);
};

/** Rounded rectangle path (no `ctx.roundRect`) */
export const roundRectPath = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  radius: number,
) => {
  const r = Math.max(0, Math.min(radius, w / 2, h / 2));
  ctx.beginPath();
  if (r <= 0.01) {
    ctx.moveTo(x, y);
    ctx.lineTo(x + w, y);
    ctx.lineTo(x + w, y + h);
    ctx.lineTo(x, y + h);
    ctx.closePath();
    return;
  }
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

const setDash = (ctx: CanvasRenderingContext2D, dash: number[]) => {
  if (typeof ctx.setLineDash === "function") ctx.setLineDash(dash);
};

const circle = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
) => {
  ctx.beginPath();
  ctx.arc(x, y, Math.max(0, r), 0, TAU);
};

/**
 * Draws a scene in CSS pixels (the caller sets the pixel-ratio transform and
 * clears the canvas). `hover` emphasizes an item and dims the others.
 */
export const drawShapeScene = (
  ctx: CanvasRenderingContext2D,
  scene: ShapeScene,
  hover: ShapeHover | null,
) => {
  ctx.save();
  const enter = scene.enter;
  const base = enter ? Math.max(0, Math.min(1, enter.alpha)) : 1;
  if (enter && enter.scale !== 1) {
    ctx.translate(enter.cx, enter.cy);
    ctx.scale(enter.scale, enter.scale);
    ctx.translate(-enter.cx, -enter.cy);
  }
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  for (const node of scene.nodes) {
    const owned = node.hit !== undefined;
    const active = !!hover && owned && node.hit === hover.index;
    let alpha = base * (node.alpha ?? 1);
    if (hover && owned && !active) alpha *= scene.dim;
    if (alpha <= 0.002) continue;
    ctx.globalAlpha = alpha;
    const dx = active && node.shift ? node.shift[0] : 0;
    const dy = active && node.shift ? node.shift[1] : 0;

    switch (node.kind) {
      case "sector": {
        sectorPath(ctx, node, dx, dy);
        ctx.fillStyle = node.fill;
        if (active) {
          ctx.save();
          ctx.shadowColor = SHADOW;
          ctx.shadowBlur = 14;
          ctx.shadowOffsetY = 4;
          ctx.fill();
          ctx.restore();
        } else ctx.fill();
        break;
      }
      case "polygon": {
        polygonPath(ctx, node, dx, dy);
        const fill = active && node.hoverFill ? node.hoverFill : node.fill;
        if (fill) {
          ctx.fillStyle = fill;
          ctx.fill();
          if (active && node.brighten) {
            ctx.fillStyle = BRIGHTEN;
            ctx.fill();
          }
        }
        if (node.stroke) {
          ctx.strokeStyle = node.stroke;
          ctx.lineWidth =
            active && node.hoverLineWidth
              ? node.hoverLineWidth
              : (node.lineWidth ?? 1);
          ctx.stroke();
        }
        break;
      }
      case "rect": {
        roundRectPath(
          ctx,
          node.x + dx,
          node.y + dy,
          node.width,
          node.height,
          node.radius,
        );
        ctx.fillStyle = node.fill;
        ctx.fill();
        if (active && node.brighten) {
          ctx.fillStyle = BRIGHTEN;
          ctx.fill();
        }
        break;
      }
      case "arc": {
        if (node.a1 - node.a0 <= 1e-6 || node.width <= 0) break;
        ctx.beginPath();
        ctx.arc(node.cx + dx, node.cy + dy, node.r, node.a0, node.a1);
        ctx.lineCap = node.cap;
        ctx.lineWidth = node.width;
        ctx.strokeStyle = node.color;
        ctx.stroke();
        ctx.lineCap = "round";
        break;
      }
      case "circle": {
        if (!node.fill && !node.stroke) break;
        const focused =
          active &&
          (node.indicator === undefined || node.indicator === hover?.indicator);
        const r = focused && node.hoverR ? node.hoverR : node.r;
        const x = node.cx + dx;
        const y = node.cy + dy;
        if (focused && node.halo) {
          circle(ctx, x, y, r + 5);
          ctx.fillStyle = node.halo;
          ctx.fill();
        }
        circle(ctx, x, y, r);
        if (node.fill) {
          ctx.fillStyle = node.fill;
          ctx.fill();
        }
        if (node.stroke) {
          ctx.strokeStyle = node.stroke;
          ctx.lineWidth = node.lineWidth ?? 1;
          ctx.stroke();
        }
        break;
      }
      case "line": {
        const p = node.points;
        if (p.length < 4) break;
        ctx.beginPath();
        ctx.moveTo(p[0] + dx, p[1] + dy);
        // the last point stays: leader lines bend to their fixed label
        for (let i = 2; i < p.length; i += 2)
          ctx.lineTo(
            p[i] + (i === p.length - 2 ? 0 : dx),
            p[i + 1] + (i === p.length - 2 ? 0 : dy),
          );
        ctx.strokeStyle = node.color;
        ctx.lineWidth = node.width;
        if (node.dash) setDash(ctx, node.dash);
        ctx.stroke();
        if (node.dash) setDash(ctx, []);
        break;
      }
      case "text": {
        const focused =
          node.indicator !== undefined && hover?.indicator === node.indicator;
        ctx.font = focused && node.hoverFont ? node.hoverFont : node.font;
        ctx.fillStyle =
          focused && node.hoverColor ? node.hoverColor : node.color;
        ctx.textAlign = node.align;
        ctx.textBaseline = node.baseline;
        ctx.fillText(node.text, node.x + dx, node.y + dy);
        break;
      }
      case "guide": {
        const k = hover?.indicator;
        if (k === undefined || !node.ends[k]) break;
        ctx.globalAlpha = base;
        ctx.beginPath();
        ctx.moveTo(node.cx, node.cy);
        ctx.lineTo(node.ends[k][0], node.ends[k][1]);
        ctx.strokeStyle = node.color;
        ctx.lineWidth = 1;
        setDash(ctx, [3, 3]);
        ctx.stroke();
        setDash(ctx, []);
        break;
      }
      default:
        break;
    }
  }
  ctx.restore();
};

/** Legend drawn on a canvas (dots, muted names, struck-through when hidden) */
export const drawShapeLegend = (
  ctx: CanvasRenderingContext2D,
  theme: ChartTheme,
  boxes: readonly ShapeLegendBox[],
) => {
  ctx.save();
  ctx.font = font(theme, 12);
  ctx.textBaseline = "middle";
  ctx.textAlign = "left";
  for (const box of boxes) {
    const cy = box.y + box.height / 2;
    ctx.globalAlpha = box.hidden ? 0.45 : 1;
    ctx.fillStyle = box.color;
    circle(ctx, box.x + 4.5, cy, 4.5);
    ctx.fill();
    ctx.fillStyle = toCss(theme.textMuted);
    ctx.fillText(box.name, box.x + 15, cy, Math.max(1, box.width - 15));
    if (box.hidden) ctx.fillRect(box.x + 15, cy, box.width - 15, 1);
  }
  ctx.restore();
};

/** Tooltip drawn on a canvas, styled like the DOM tooltip */
export const drawShapeTooltip = (
  ctx: CanvasRenderingContext2D,
  theme: ChartTheme,
  box: ShapeTooltipBox,
) => {
  const { padding, lineHeight } = box;
  ctx.save();
  ctx.globalAlpha = 1;
  ctx.save();
  ctx.shadowColor = SHADOW;
  ctx.shadowBlur = 16;
  ctx.shadowOffsetY = 6;
  roundRectPath(ctx, box.x, box.y, box.width, box.height, 8);
  ctx.fillStyle = toCss(theme.background);
  ctx.fill();
  ctx.restore();
  roundRectPath(
    ctx,
    box.x + 0.5,
    box.y + 0.5,
    box.width - 1,
    box.height - 1,
    8,
  );
  ctx.strokeStyle = toCss(theme.axis);
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.textBaseline = "middle";
  let y = box.y + padding + lineHeight / 2;
  const left = box.x + padding + 2;
  const right = box.x + box.width - padding - 2;
  if (box.text) {
    ctx.font = font(theme, 12);
    ctx.fillStyle = toCss(theme.text);
    ctx.textAlign = "left";
    for (const line of box.text) {
      ctx.fillText(line, left, y);
      y += lineHeight;
    }
  } else if (box.content) {
    const { content } = box;
    let x = left;
    if (content.color) {
      ctx.fillStyle = content.color;
      circle(ctx, x + 4, y, 4);
      ctx.fill();
      x += 14;
    }
    ctx.font = font(theme, 12, 600);
    ctx.fillStyle = toCss(theme.text);
    ctx.textAlign = "left";
    ctx.fillText(content.title, x, y);
    y += lineHeight;
    for (const row of content.rows) {
      x = left;
      if (row.color) {
        ctx.fillStyle = row.color;
        circle(ctx, x + 4, y, 4);
        ctx.fill();
        x += 14;
      }
      ctx.font = font(theme, 12, row.strong ? 600 : 400);
      ctx.textAlign = "left";
      ctx.fillStyle = toCss(row.strong ? theme.text : theme.textMuted);
      ctx.fillText(row.name, x, y);
      ctx.font = font(theme, 12, 600);
      ctx.textAlign = "right";
      ctx.fillStyle = toCss(theme.text);
      ctx.fillText(row.value, right, y);
      y += lineHeight;
    }
  }
  ctx.restore();
};
