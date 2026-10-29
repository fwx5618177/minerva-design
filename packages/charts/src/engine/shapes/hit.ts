// Hit testing of a ShapeScene and keyboard navigation between its items.

import { padAngleAt, sectorPad } from "./draw";
import { TAU, type ShapeHover, type ShapeNode, type ShapeScene } from "./scene";

/** Distance (px) under which a radar vertex is picked */
const VERTEX_RADIUS = 12;

/** Angle `a` brought into [from, from + 2π) */
const wrapFrom = (a: number, from: number) => {
  let d = (a - from) % TAU;
  if (d < 0) d += TAU;
  return from + d;
};

/** Whether a point is in an annular sector (gaps included, corners approximated) */
export const pointInSector = (
  x: number,
  y: number,
  s: {
    cx: number;
    cy: number;
    r0: number;
    r1: number;
    a0: number;
    a1: number;
    pad?: number;
  },
): boolean => {
  const dx = x - s.cx;
  const dy = y - s.cy;
  const d = Math.hypot(dx, dy);
  if (d > s.r1 || d < s.r0) return false;
  const span = s.a1 - s.a0;
  if (span >= TAU - 1e-6) return true;
  if (span <= 0) return false;
  const a = wrapFrom(Math.atan2(dy, dx), s.a0);
  const half = (s.pad ?? 0) / 2;
  const off = half > 0 ? padAngleAt(half, d) : 0;
  return a >= s.a0 + off && a <= s.a1 - off;
};

/** Even-odd test of a point in a polygon given as a flat x, y list */
export const pointInPolygon = (
  x: number,
  y: number,
  points: readonly number[],
): boolean => {
  const n = points.length >> 1;
  let inside = false;
  for (let i = 0, j = n - 1; i < n; j = i++) {
    const xi = points[i * 2];
    const yi = points[i * 2 + 1];
    const xj = points[j * 2];
    const yj = points[j * 2 + 1];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi)
      inside = !inside;
  }
  return inside;
};

const polygonArea = (points: readonly number[]) => {
  const n = points.length >> 1;
  let a = 0;
  for (let i = 0, j = n - 1; i < n; j = i++)
    a += points[j * 2] * points[i * 2 + 1] - points[i * 2] * points[j * 2 + 1];
  return Math.abs(a) / 2;
};

const nodeContains = (node: ShapeNode, x: number, y: number): boolean => {
  switch (node.kind) {
    case "sector":
      return pointInSector(x, y, { ...node, pad: sectorPad(node) });
    case "polygon":
      return (
        pointInPolygon(x, y, node.points) &&
        !(node.hole && pointInPolygon(x, y, node.hole))
      );
    case "rect":
      return (
        x >= node.x &&
        x <= node.x + node.width &&
        y >= node.y &&
        y <= node.y + node.height
      );
    case "circle":
      return Math.hypot(x - node.cx, y - node.cy) <= node.r;
    case "arc": {
      const d = Math.hypot(x - node.cx, y - node.cy);
      if (Math.abs(d - node.r) > node.width / 2 + 4) return false;
      if (node.a1 - node.a0 >= TAU - 1e-6) return true;
      const a = wrapFrom(Math.atan2(y - node.cy, x - node.cx), node.a0);
      return a <= node.a1;
    }
    default:
      return false;
  }
};

/** Radar: the vertex under the pointer, else the smallest polygon containing it */
const hitRadar = (
  scene: ShapeScene,
  x: number,
  y: number,
): ShapeHover | null => {
  const radar = scene.radar;
  if (!radar || !radar.series.length) return null;
  let best: ShapeHover | null = null;
  let bestD = VERTEX_RADIUS;
  for (const s of radar.series) {
    for (let k = 0; k < s.points.length >> 1; k++) {
      const d = Math.hypot(x - s.points[k * 2], y - s.points[k * 2 + 1]);
      if (d <= bestD) {
        bestD = d;
        best = { index: s.index, indicator: k };
      }
    }
  }
  if (best) return best;
  let area = Infinity;
  let index = -1;
  for (const s of radar.series) {
    if (s.points.length < 6 || !pointInPolygon(x, y, s.points)) continue;
    const a = polygonArea(s.points);
    if (a < area) {
      area = a;
      index = s.index;
    }
  }
  if (index < 0) return null;
  // nearest indicator by angle
  const a = Math.atan2(y - radar.cy, x - radar.cx);
  let indicator = 0;
  let diff = Infinity;
  radar.angles.forEach((angle, k) => {
    const d = Math.abs(wrapFrom(a - angle + Math.PI, 0) - Math.PI);
    if (d < diff) {
      diff = d;
      indicator = k;
    }
  });
  return { index, indicator };
};

/**
 * Item under a point (CSS pixels). `current` is the hovered item: its
 * popped-out geometry also counts so a moved slice keeps the hover.
 */
export const hitTestShapes = (
  scene: ShapeScene,
  x: number,
  y: number,
  current: ShapeHover | null = null,
): ShapeHover | null => {
  if (scene.empty) return null;
  if (scene.type === "radar") return hitRadar(scene, x, y);
  const enter = scene.enter;
  if (enter && enter.scale > 0 && enter.scale !== 1) {
    x = enter.cx + (x - enter.cx) / enter.scale;
    y = enter.cy + (y - enter.cy) / enter.scale;
  }
  const valid = new Set(scene.items.map((it) => it.index));
  for (let i = scene.nodes.length - 1; i >= 0; i--) {
    const node = scene.nodes[i];
    if (node.hit === undefined || !valid.has(node.hit)) continue;
    if (node.kind === "text" || node.kind === "line") continue;
    if (nodeContains(node, x, y)) return { index: node.hit };
    if (current?.index === node.hit && node.shift) {
      const [dx, dy] = node.shift;
      if (nodeContains(node, x - dx, y - dy)) return { index: node.hit };
    }
  }
  return null;
};

/** Where the tooltip of a keyboard-focused item goes */
export const hoverAnchor = (
  scene: ShapeScene,
  hover: ShapeHover,
): { x: number; y: number } | null => {
  const item = scene.items.find((it) => it.index === hover.index);
  if (!item) return null;
  const ind =
    hover.indicator !== undefined ? item.indicators?.[hover.indicator] : null;
  return ind ? { x: ind.x, y: ind.y } : { x: item.x, y: item.y };
};

/**
 * Next focused item for the arrow keys: `next` / `prev` walk the items
 * (radar: the indicators of the series), `up` / `down` the radar series.
 */
export const stepHover = (
  scene: ShapeScene,
  current: ShapeHover | null,
  direction: "next" | "prev" | "up" | "down",
): ShapeHover | null => {
  const items = scene.items;
  if (!items.length) return null;
  const pos = current
    ? items.findIndex((it) => it.index === current.index)
    : -1;
  const radar = scene.type === "radar";
  if (pos < 0) {
    const first =
      direction === "prev" || direction === "up" ? items.length - 1 : 0;
    return radar
      ? { index: items[first].index, indicator: 0 }
      : { index: items[first].index };
  }
  const forward = direction === "next" || direction === "down";
  if (radar && (direction === "next" || direction === "prev")) {
    const count = items[pos].indicators?.length ?? 1;
    const k = current?.indicator ?? 0;
    return {
      index: items[pos].index,
      indicator: (k + (forward ? 1 : -1) + count) % count,
    };
  }
  const next = items[(pos + (forward ? 1 : -1) + items.length) % items.length];
  return radar
    ? { index: next.index, indicator: current?.indicator ?? 0 }
    : { index: next.index };
};
