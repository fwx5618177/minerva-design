// Tooltips of every chart family: the shared translucent look and a
// placement that keeps the tooltip off what it describes (the hovered marks
// and the pointer). `placeTooltip` is pure (canvas hosts use it too); the
// DOM helpers measure the element and may let it overflow the stage.

import { luminance, parseColor, resolveColor, toCss, type Rgba } from "./color";
import type { Rect } from "./layout";

export interface TooltipSize {
  width: number;
  height: number;
}

/**
 * Sides tried first: beside the marks (right, then left), above / below
 * them (above first), or one given side then its opposite
 */
export type TooltipPrefer =
  "side" | "vertical" | "right" | "left" | "top" | "bottom";

export interface TooltipPlacementInput {
  /** Pointer or focused point (stage pixels): the tooltip is aligned on it and never covers it */
  anchor: { x: number; y: number };
  /** Box of the hovered marks (stage pixels) the tooltip must not cover */
  avoid?: Rect | null;
  size: TooltipSize;
  stage: TooltipSize;
  /**
   * Area (stage pixels) the tooltip may overflow the stage into when it
   * fits nowhere inside, e.g. the visible part of the viewport
   */
  bounds?: Rect | null;
  prefer?: TooltipPrefer;
  /** Distance between the tooltip and the avoided box */
  gap?: number;
  /** Distance kept from the edges of the stage and of the bounds */
  margin?: number;
  /**
   * Boxes (stage pixels) the tooltip must not cover either, e.g. the other
   * task bars of a Gantt chart. With obstacles, the closest free spot to
   * the anchor wins (beside the marks, else anywhere in the stage, else
   * overflowing into `bounds`); with no free spot, the one covering the
   * obstacles the least, still off `avoid` and the pointer.
   */
  obstacles?: readonly Rect[] | null;
}

export interface TooltipPlacement {
  /** Top-left corner, stage pixels */
  x: number;
  y: number;
  /**
   * `stage`: inside the stage, off the marks; `bounds`: off the marks,
   * overflowing the stage; `none`: no room off the marks, the spot
   * covering them the least
   */
  fit: "stage" | "bounds" | "none";
}

type Side = "right" | "left" | "bottom" | "top";

const ORDER: Record<TooltipPrefer, readonly Side[]> = {
  side: ["right", "left", "bottom", "top"],
  vertical: ["top", "bottom", "right", "left"],
  right: ["right", "left", "bottom", "top"],
  left: ["left", "right", "bottom", "top"],
  top: ["top", "bottom", "right", "left"],
  bottom: ["bottom", "top", "right", "left"],
};

const inset = (r: Rect, m: number): Rect => ({
  x: r.x + m,
  y: r.y + m,
  width: Math.max(0, r.width - m * 2),
  height: Math.max(0, r.height - m * 2),
});

const intersection = (a: Rect, b: Rect): Rect => {
  const x = Math.max(a.x, b.x);
  const y = Math.max(a.y, b.y);
  return {
    x,
    y,
    width: Math.max(0, Math.min(a.x + a.width, b.x + b.width) - x),
    height: Math.max(0, Math.min(a.y + a.height, b.y + b.height) - y),
  };
};

/** Smallest rectangle holding both */
export const unionRect = (a: Rect | null, b: Rect): Rect => {
  if (!a) return { x: b.x, y: b.y, width: b.width, height: b.height };
  const x = Math.min(a.x, b.x);
  const y = Math.min(a.y, b.y);
  return {
    x,
    y,
    width: Math.max(a.x + a.width, b.x + b.width) - x,
    height: Math.max(a.y + a.height, b.y + b.height) - y,
  };
};

/** Area covered by both rectangles */
export const overlapArea = (a: Rect, b: Rect): number => {
  const r = intersection(a, b);
  return r.width * r.height;
};

const grow = (r: Rect, dx: number, dy = dx): Rect => ({
  x: r.x - dx,
  y: r.y - dy,
  width: r.width + dx * 2,
  height: r.height + dy * 2,
});

/** Whether two rectangles share some area (touching edges do not) */
const overlaps = (a: Rect, b: Rect) =>
  Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x) > 0.01 &&
  Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y) > 0.01;

/** Distance from a point to a rectangle (0 inside) */
export const pointRectDistance = (px: number, py: number, r: Rect): number =>
  Math.hypot(
    Math.max(r.x - px, 0, px - (r.x + r.width)),
    Math.max(r.y - py, 0, py - (r.y + r.height)),
  );

/** Start of a `len` long span at `v`, moved into [lo, hi] (at `lo` when longer) */
const clampSpan = (v: number, len: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(v, hi - len));

// half a pixel of slack: rounded sizes must not fail the fit
const inside = (area: Rect, x: number, y: number, w: number, h: number) =>
  x >= area.x - 0.5 &&
  y >= area.y - 0.5 &&
  x + w <= area.x + area.width + 0.5 &&
  y + h <= area.y + area.height + 0.5;

// ------------------------------------------------------------ obstacles

/** Obstacles queried by box (bucketed when there are many) */
export interface RectIndex {
  /** Whether `box` shares some area with an obstacle */
  hits(box: Rect): boolean;
  /** Area of `box` covered by the obstacles (overlapping ones add up) */
  cover(box: Rect): number;
}

const LINEAR_INDEX = 32;
const indexes = new WeakMap<readonly Rect[], RectIndex>();

/**
 * Index of `rects` for many box queries: a plain list for a few, else a
 * uniform grid of buckets over their extent. Cached per array.
 */
export const rectIndex = (rects: readonly Rect[]): RectIndex => {
  const cached = indexes.get(rects);
  if (cached) return cached;
  const list = rects.filter((r) => r.width > 0 && r.height > 0);
  let index: RectIndex;
  if (list.length <= LINEAR_INDEX) {
    index = {
      hits: (box) => list.some((r) => overlaps(box, r)),
      cover: (box) => list.reduce((sum, r) => sum + overlapArea(box, r), 0),
    };
  } else {
    let x0 = Infinity;
    let y0 = Infinity;
    let x1 = -Infinity;
    let y1 = -Infinity;
    for (const r of list) {
      x0 = Math.min(x0, r.x);
      y0 = Math.min(y0, r.y);
      x1 = Math.max(x1, r.x + r.width);
      y1 = Math.max(y1, r.y + r.height);
    }
    // about two obstacles per bucket, at most 128 x 128 buckets
    const cell = Math.max(
      4,
      Math.sqrt(((x1 - x0) * (y1 - y0) * 2) / list.length),
      (x1 - x0) / 128,
      (y1 - y0) / 128,
    );
    const cols = Math.max(1, Math.ceil((x1 - x0) / cell));
    const rows = Math.max(1, Math.ceil((y1 - y0) / cell));
    const buckets: number[][] = Array.from({ length: cols * rows }, () => []);
    const col = (x: number) =>
      Math.max(0, Math.min(cols - 1, Math.floor((x - x0) / cell)));
    const row = (y: number) =>
      Math.max(0, Math.min(rows - 1, Math.floor((y - y0) / cell)));
    list.forEach((r, i) => {
      for (let b = row(r.y); b <= row(r.y + r.height); b++)
        for (let a = col(r.x); a <= col(r.x + r.width); a++)
          buckets[b * cols + a].push(i);
    });
    const stamps = new Uint32Array(list.length);
    let stamp = 0;
    /** Calls `visit` once per obstacle near `box` until it returns `true` */
    const near = (box: Rect, visit: (r: Rect) => boolean | void) => {
      if (
        box.x > x1 ||
        box.y > y1 ||
        box.x + box.width < x0 ||
        box.y + box.height < y0
      )
        return;
      if (++stamp === 0xffffffff) {
        stamps.fill(0);
        stamp = 1;
      }
      for (let b = row(box.y); b <= row(box.y + box.height); b++)
        for (let a = col(box.x); a <= col(box.x + box.width); a++)
          for (const i of buckets[b * cols + a]) {
            if (stamps[i] === stamp) continue;
            stamps[i] = stamp;
            if (visit(list[i])) return;
          }
    };
    index = {
      hits: (box) => {
        let hit = false;
        near(box, (r) => (hit = overlaps(box, r)));
        return hit;
      },
      cover: (box) => {
        let sum = 0;
        near(box, (r) => {
          sum += overlapArea(box, r);
        });
        return sum;
      },
    };
  }
  indexes.set(rects, index);
  return index;
};

/** Most spots tried by a sweep of an area */
const MAX_SPOTS = 4000;

export interface TooltipSpotSearch {
  /** Area the whole tooltip must lie in */
  area: Rect;
  size: TooltipSize;
  /** Spots tried first (they win ties), skipped when outside the area */
  seeds?: readonly { x: number; y: number }[];
  /** Whether a box is not allowed */
  blocked(box: Rect): boolean;
  /** Cost of a box (lower is better), cheap: computed before `blocked` */
  score(box: Rect): number;
  /** Distance between the spots of the sweep, 8px by default (more on large areas) */
  step?: number;
}

/**
 * Lowest scoring spot (top-left corner) of the area that is not blocked:
 * the seeds, then a sweep of the area on a grid; `null` when every spot is
 * blocked or the tooltip is larger than the area
 */
export const findTooltipSpot = (
  search: TooltipSpotSearch,
): { x: number; y: number } | null => {
  const { area, blocked, score } = search;
  const { width: w, height: h } = search.size;
  const spanX = area.width - w;
  const spanY = area.height - h;
  if (spanX < -0.5 || spanY < -0.5) return null;
  let best: { x: number; y: number } | null = null;
  let bestScore = Infinity;
  const visit = (x: number, y: number) => {
    if (!inside(area, x, y, w, h)) return;
    const box = { x, y, width: w, height: h };
    const s = score(box);
    if (s >= bestScore - 0.01 || blocked(box)) return;
    best = { x, y };
    bestScore = s;
  };
  for (const s of search.seeds ?? []) visit(s.x, s.y);
  const sx = Math.max(0, spanX);
  const sy = Math.max(0, spanY);
  const step = Math.max(
    search.step ?? 8,
    Math.sqrt(((sx + 1) * (sy + 1)) / MAX_SPOTS),
  );
  for (let j = 0; ; j++) {
    const y = area.y + Math.min(j * step, sy);
    for (let i = 0; ; i++) {
      visit(area.x + Math.min(i * step, sx), y);
      if (i * step >= sx) break;
    }
    if (j * step >= sy) break;
  }
  return best;
};

/**
 * Placement among obstacles: the free spot (off `avoid`, the pointer and
 * every obstacle) closest to the anchor in the stage, else in the bounds;
 * else the spot covering the obstacles the least
 */
const placeAmong = (
  input: TooltipPlacementInput,
  obstacles: RectIndex,
  avoid: Rect,
  stageRect: Rect,
  inner: Rect,
  bounds: Rect | null,
  seeds: (areas: readonly Rect[]) => { x: number; y: number }[],
  gap: number,
): TooltipPlacement | null => {
  const { anchor, size } = input;
  // spots beside the marks keep `gap` from them; the sweep keeps it too
  const zone = grow(avoid, Math.max(0, gap - 1));
  const near = (box: Rect) => pointRectDistance(anchor.x, anchor.y, box);
  const free = (box: Rect) => !overlaps(box, zone) && !obstacles.hits(box);
  const search = (area: Rect, areas: readonly Rect[]) =>
    findTooltipSpot({
      area,
      size,
      seeds: seeds(areas),
      blocked: (box) => !free(box),
      score: near,
    });

  const inStage = search(inner, [inner]);
  if (inStage) return { ...inStage, fit: "stage" };

  // around the stage (above / below the plot), in the visible bounds
  const around = bounds
    ? intersection(bounds, grow(stageRect, size.width + gap, size.height + gap))
    : null;
  if (around && around.width > 0 && around.height > 0) {
    const out = search(around, [inner, bounds!]);
    if (out) return { ...out, fit: "bounds" };
  }

  // no free spot: the one covering the obstacles the least, off the marks
  let best: { x: number; y: number } | null = null;
  for (const area of around ? [inner, around] : [inner]) {
    best =
      findTooltipSpot({
        area,
        size,
        seeds: seeds([area]),
        blocked: (box) => overlaps(box, zone),
        score: (box) => obstacles.cover(box) + near(box) * 0.01,
      }) ?? best;
    if (best) break;
  }
  return best ? { ...best, fit: "none" } : null;
};

/**
 * Top-left corner of a tooltip that covers neither the hovered marks
 * (`avoid`) nor the pointer. Candidates sit beside the avoided box, in the
 * order of `prefer`, centered on the pointer across that side and slid
 * into the area. The first one inside the stage wins; else, with `bounds`,
 * the candidate inside the bounds that covers the least of the stage (a
 * tooltip above a tiny sparkline rather than over it); else the clamped
 * spot covering the marks the least. With `obstacles`, see
 * `TooltipPlacementInput.obstacles`.
 */
export const placeTooltip = (
  input: TooltipPlacementInput,
): TooltipPlacement => {
  const { anchor, prefer = "side", gap = 12, margin = 4 } = input;
  const { width: w, height: h } = input.size;
  const pointer: Rect = { x: anchor.x, y: anchor.y, width: 0, height: 0 };
  const avoid = unionRect(input.avoid ?? null, pointer);
  const stageRect: Rect = {
    x: 0,
    y: 0,
    width: input.stage.width,
    height: input.stage.height,
  };
  const bounds =
    input.bounds && input.bounds.width > 0 && input.bounds.height > 0
      ? inset(input.bounds, margin)
      : null;
  const stageArea = inset(stageRect, margin);
  const visible = bounds ? intersection(stageArea, bounds) : stageArea;
  // a stage scrolled out of sight keeps its own area
  const inner = visible.width > 0 && visible.height > 0 ? visible : stageArea;
  const order = ORDER[prefer];

  const beside = (side: Side, areas: readonly Rect[]) => {
    let x: number;
    let y: number;
    if (side === "right" || side === "left") {
      x = side === "right" ? avoid.x + avoid.width + gap : avoid.x - gap - w;
      y = anchor.y - h / 2;
      for (const r of areas) y = clampSpan(y, h, r.y, r.y + r.height);
    } else {
      y = side === "bottom" ? avoid.y + avoid.height + gap : avoid.y - gap - h;
      x = anchor.x - w / 2;
      for (const r of areas) x = clampSpan(x, w, r.x, r.x + r.width);
    }
    return { x, y };
  };

  if (input.obstacles?.length) {
    const placed = placeAmong(
      input,
      rectIndex(input.obstacles),
      avoid,
      stageRect,
      inner,
      bounds,
      (areas) => order.map((side) => beside(side, areas)),
      gap,
    );
    if (placed) return placed;
  }

  for (const side of order) {
    const p = beside(side, [inner]);
    if (inside(inner, p.x, p.y, w, h)) return { ...p, fit: "stage" };
  }

  if (bounds) {
    let best: { x: number; y: number } | null = null;
    let bestCover = Infinity;
    for (const side of order) {
      // across the side: inside the stage when it is wide enough
      const p = beside(side, [inner, bounds]);
      if (!inside(bounds, p.x, p.y, w, h)) continue;
      const cover = overlapArea(
        { x: p.x, y: p.y, width: w, height: h },
        stageRect,
      );
      if (cover < bestCover - 0.5) {
        best = p;
        bestCover = cover;
      }
    }
    if (best) return { ...best, fit: "bounds" };
  }

  // no room off the marks: beside them or in a corner, whichever covers
  // them the least (inside the stage first)
  let best = { x: inner.x, y: inner.y };
  let bestCover = Infinity;
  for (const area of bounds ? [inner, bounds] : [inner]) {
    const spots = [
      ...order.map((side) => beside(side, [area])),
      { x: area.x, y: area.y },
      { x: area.x + area.width - w, y: area.y },
      { x: area.x, y: area.y + area.height - h },
      { x: area.x + area.width - w, y: area.y + area.height - h },
    ];
    for (const s of spots) {
      const x = clampSpan(s.x, w, area.x, area.x + area.width);
      const y = clampSpan(s.y, h, area.y, area.y + area.height);
      const cover = overlapArea({ x, y, width: w, height: h }, avoid);
      if (cover < bestCover - 0.5) {
        best = { x, y };
        bestCover = cover;
      }
    }
  }
  return { ...best, fit: "none" };
};

// ------------------------------------------------------------------- DOM

const BLUR = "blur(12px) saturate(160%)";

/** Transition of the tooltip moves (none when reduced motion is preferred) */
export const TOOLTIP_TRANSITION = "transform 80ms ease-out";

/** Opacity of the fill of the DOM tooltips (a backdrop blur may add to it) */
export const TOOLTIP_ALPHA = 0.8;

/** Opacity of the fill of canvas-drawn tooltips (a canvas cannot blur what is below) */
export const CANVAS_TOOLTIP_ALPHA = 0.86;

/** Colors a tooltip is drawn with (any field may be missing or unresolved) */
export interface TooltipThemeColors {
  /** Surface of the tooltip */
  background?: Rgba | null;
  /** Border color */
  axis?: Rgba | null;
  /** Text color: tells a dark theme when the surface is unknown */
  text?: Rgba | null;
}

export interface TooltipColors {
  /** Translucent `rgba()` fill */
  background: string;
  /** Translucent `rgba()` border color */
  border: string;
}

const LIGHT_SURFACE: Rgba = [1, 1, 1, 1];
const DARK_SURFACE: Rgba = [17 / 255, 24 / 255, 39 / 255, 1];
const LIGHT_EDGE: Rgba = [229 / 255, 231 / 255, 235 / 255, 1];
const DARK_EDGE: Rgba = [55 / 255, 65 / 255, 81 / 255, 1];

const opaque = (c: Rgba): Rgba => [c[0], c[1], c[2], 1];
const usable = (c: Rgba | null | undefined): c is Rgba =>
  !!c && c.every(Number.isFinite) && c[3] >= 0.5;

/**
 * Translucent fill and border of a tooltip from the chart theme: always
 * `rgba()` values with an alpha below 1 (`alpha` for the fill), on every
 * browser and canvas. An unknown or transparent surface falls back to a
 * translucent white, or a dark gray when the text is light.
 */
export const tooltipColors = (
  theme: TooltipThemeColors | null | undefined,
  alpha = TOOLTIP_ALPHA,
): TooltipColors => {
  const text = theme?.text;
  const bg = theme?.background;
  const axis = theme?.axis;
  const dark = usable(bg)
    ? luminance(bg) < 0.5
    : usable(text) && luminance(text) > 0.6;
  const surface = usable(bg) ? bg : dark ? DARK_SURFACE : LIGHT_SURFACE;
  const edge = usable(axis) ? axis : dark ? DARK_EDGE : LIGHT_EDGE;
  const a = Math.min(0.95, Math.max(0.05, alpha));
  return {
    background: toCss(opaque(surface), a),
    border: toCss(opaque(edge), 0.7),
  };
};

const UNRESOLVED: Rgba = [NaN, NaN, NaN, NaN];

/**
 * Tooltip colors of the Minerva CSS variables seen by `element`
 * (`--surface-elevated-color`, `--surface-color`, `--background-color`,
 * `--border-color`, `--text-color`), for hosts without a chart theme
 */
const readTooltipColors = (element: Element): TooltipThemeColors => {
  const win = element.ownerDocument?.defaultView;
  let style: CSSStyleDeclaration | null = null;
  try {
    style = win?.getComputedStyle(element) ?? null;
  } catch {
    style = null;
  }
  const pick = (names: readonly string[]): Rgba | null => {
    for (const name of names) {
      const value = style?.getPropertyValue(name).trim();
      if (!value) continue;
      const c = resolveColor(value, element, UNRESOLVED);
      if (c !== UNRESOLVED) return c;
    }
    return null;
  };
  return {
    background: pick([
      "--surface-elevated-color",
      "--surface-color",
      "--background-color",
    ]),
    axis: pick(["--border-color"]),
    text: pick(["--text-color"]) ?? parseColor(style?.color ?? ""),
  };
};

/**
 * Colors a tooltip element after the theme: a chart theme, or the CSS
 * variables seen by an element (the stage) for hosts without one. Call it
 * again when the theme changes.
 */
export const themeTooltip = (
  tip: HTMLElement,
  source: TooltipThemeColors | Element | null,
): void => {
  const isElement =
    !!source &&
    typeof (source as Element).nodeType === "number" &&
    typeof (source as Element).getBoundingClientRect === "function";
  const colors = tooltipColors(
    isElement
      ? readTooltipColors(source as Element)
      : (source as TooltipThemeColors | null),
  );
  tip.style.backgroundColor = colors.background;
  tip.style.border = `1px solid ${colors.border}`;
};

/** Look shared by the tooltips; sizes and type stay with each host */
const TOOLTIP_LOOK: Partial<CSSStyleDeclaration> = {
  position: "absolute",
  left: "0",
  top: "0",
  // also overrides the user agent style of a popover (top layer)
  right: "auto",
  bottom: "auto",
  margin: "0",
  overflow: "visible",
  pointerEvents: "none",
  color: "var(--text-color, #1f2937)",
  // the light inner edge reads on dark themes, the shadow on light ones
  boxShadow:
    "0 12px 32px -8px rgba(15, 23, 42, 0.2), 0 4px 10px -4px rgba(15, 23, 42, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.06)",
};

/**
 * Styles a tooltip element. It is always translucent: its fill is an
 * `rgba()` of the theme (`tooltipColors`, a translucent white until
 * `themeTooltip` is called when `theme` is omitted), so no browser shows
 * it opaque; the backdrop blur is an enhancement where supported.
 */
export const styleTooltip = <T extends HTMLElement>(
  el: T,
  style: Partial<CSSStyleDeclaration> = {},
  theme?: TooltipThemeColors | null,
): T => {
  Object.assign(el.style, TOOLTIP_LOOK, style);
  const colors = tooltipColors(theme);
  el.style.backgroundColor = colors.background;
  el.style.border = `1px solid ${colors.border}`;
  el.style.backdropFilter = BLUR;
  el.style.setProperty("-webkit-backdrop-filter", BLUR);
  return el;
};

/** Whether the user prefers reduced motion (false without `matchMedia`) */
export const prefersReducedMotion = (
  win: Window | null | undefined,
): boolean => {
  // typed loosely: the React Native build has no DOM `matchMedia` typings
  const media = (
    win as
      | { matchMedia?: (query: string) => { matches: boolean } | null }
      | null
      | undefined
  )?.matchMedia;
  try {
    return !!media?.call(win, "(prefers-reduced-motion: reduce)")?.matches;
  } catch {
    return false;
  }
};

/** Tooltips currently shown in the top layer (popover) */
const promoted = new WeakSet<HTMLElement>();

const canPromote = (el: HTMLElement) =>
  typeof el.showPopover === "function" && typeof el.hidePopover === "function";

/** A promoted tooltip kept on its stage while the page scrolls / resizes */
interface Follow {
  stage: HTMLElement;
  /** Position in the stage (stage pixels) */
  x: number;
  y: number;
  detach(): void;
}

const follows = new WeakMap<HTMLElement, Follow>();

const unfollow = (tip: HTMLElement) => {
  const f = follows.get(tip);
  if (!f) return;
  follows.delete(tip);
  f.detach();
};

/** Viewport pixels of a stage position */
const toViewport = (stage: HTMLElement, x: number, y: number) => {
  const r = stage.getBoundingClientRect();
  return {
    x: x + r.left + stage.clientLeft,
    y: y + r.top + stage.clientTop,
    rect: r,
  };
};

/**
 * Keeps a promoted (fixed) tooltip at `x`, `y` of its stage when any
 * scrolling ancestor, the page or the viewport moves: scroll events are
 * caught in the capture phase, the moves throttled to one per frame. The
 * listeners go away when the tooltip is demoted, hidden or released.
 */
const follow = (tip: HTMLElement, stage: HTMLElement, x: number, y: number) => {
  const current = follows.get(tip);
  if (current?.stage === stage) {
    current.x = x;
    current.y = y;
    return;
  }
  unfollow(tip);
  const doc = stage.ownerDocument;
  const win = doc.defaultView;
  if (!win) return;
  let frame: number | null = null;
  let timeout = false;
  const active = () =>
    tip.isConnected && tip.style.display !== "none" && promoted.has(tip);
  const update = () => {
    frame = null;
    if (follows.get(tip) !== state) return;
    if (!active()) {
      unfollow(tip);
      return;
    }
    const p = toViewport(stage, state.x, state.y);
    const r = p.rect;
    const vw = doc.documentElement.clientWidth || win.innerWidth;
    const vh = doc.documentElement.clientHeight || win.innerHeight;
    if (
      r.left + r.width <= 0 ||
      r.top + r.height <= 0 ||
      r.left >= vw ||
      r.top >= vh
    ) {
      // the stage scrolled out of view: so does its tooltip
      tip.style.display = "none";
      setTopLayer(tip, false);
      return;
    }
    tip.style.transition = "none";
    tip.style.transform = `translate(${Math.round(p.x)}px, ${Math.round(p.y)}px)`;
  };
  const onMove = () => {
    if (!active()) {
      unfollow(tip);
      return;
    }
    if (frame !== null) return;
    if (typeof win.requestAnimationFrame === "function") {
      timeout = false;
      frame = win.requestAnimationFrame(update);
    } else {
      timeout = true;
      frame = setTimeout(update, 16) as unknown as number;
    }
  };
  // capture: the scroll events of the ancestors do not bubble
  const options = { capture: true, passive: true };
  const targets: EventTarget[] = [win, doc];
  for (const t of targets) t.addEventListener("scroll", onMove, options);
  win.addEventListener("resize", onMove, options);
  const viewport = win.visualViewport;
  viewport?.addEventListener("resize", onMove, options);
  viewport?.addEventListener("scroll", onMove, options);
  const state: Follow = {
    stage,
    x,
    y,
    detach() {
      for (const t of targets) t.removeEventListener("scroll", onMove, options);
      win.removeEventListener("resize", onMove, options);
      viewport?.removeEventListener("resize", onMove, options);
      viewport?.removeEventListener("scroll", onMove, options);
      if (frame !== null) {
        if (timeout) clearTimeout(frame);
        else win.cancelAnimationFrame?.(frame);
        frame = null;
      }
    },
  };
  follows.set(tip, state);
};

/**
 * Moves a tooltip into the top layer (out of any clipping ancestor and
 * above the page) or back into its stage; `true` when it moved
 */
const setTopLayer = (tip: HTMLElement, top: boolean): boolean => {
  if (top === promoted.has(tip)) return false;
  if (top) {
    if (!canPromote(tip) || !tip.isConnected) return false;
    try {
      tip.setAttribute("popover", "manual");
      tip.showPopover();
    } catch {
      tip.removeAttribute("popover");
      return false;
    }
    tip.style.position = "fixed";
    promoted.add(tip);
    return true;
  }
  unfollow(tip);
  try {
    tip.hidePopover();
  } catch {
    // already closed (e.g. removed from the document)
  }
  tip.removeAttribute("popover");
  tip.style.position = "absolute";
  promoted.delete(tip);
  return true;
};

/**
 * Releases a tooltip of a destroyed chart: out of the top layer, no more
 * following of the page scroll
 */
export const releaseTooltip = (tip: HTMLElement): void => {
  unfollow(tip);
  setTopLayer(tip, false);
};

/** Overflow values clipping the descendants */
const CLIPS = /hidden|clip|auto|scroll/;

/**
 * Area (stage pixels) a tooltip of `stage` can be seen in: the viewport,
 * narrowed to the ancestors clipping their overflow unless the tooltip
 * can go to the top layer (`topLayer`)
 */
export const tooltipBounds = (
  stage: HTMLElement,
  topLayer: boolean,
): Rect | null => {
  const doc = stage.ownerDocument;
  const win = doc.defaultView;
  if (!win) return null;
  const origin = stage.getBoundingClientRect();
  const ox = origin.left + stage.clientLeft;
  const oy = origin.top + stage.clientTop;
  let left = 0;
  let top = 0;
  // without the scroll bars
  let right = doc.documentElement.clientWidth || win.innerWidth;
  let bottom = doc.documentElement.clientHeight || win.innerHeight;
  if (!topLayer) {
    // the overflow of <html> and <body> is the viewport's
    for (
      let el: HTMLElement | null = stage;
      el && el !== doc.body && el !== doc.documentElement;
      el = el.parentElement
    ) {
      const cs = win.getComputedStyle(el);
      if (!CLIPS.test(`${cs.overflowX} ${cs.overflowY}`)) continue;
      const r = el.getBoundingClientRect();
      const l = r.left + el.clientLeft;
      const t = r.top + el.clientTop;
      left = Math.max(left, l);
      top = Math.max(top, t);
      right = Math.min(right, l + el.clientWidth);
      bottom = Math.min(bottom, t + el.clientHeight);
    }
  }
  return {
    x: left - ox,
    y: top - oy,
    width: Math.max(0, right - left),
    height: Math.max(0, bottom - top),
  };
};

export interface TooltipElementOptions {
  /** Size of the tooltip, measured on the element by default */
  size?: TooltipSize;
  /** Size of the stage, its client size by default */
  stage?: TooltipSize;
  /** Animates the moves, unless the user prefers reduced motion */
  animate?: boolean;
}

/**
 * Places a shown tooltip (a child of `stage`) with `place`, called with
 * the bounds it may overflow into only when it fits nowhere inside the
 * stage. A tooltip leaving the stage goes to the top layer where the
 * Popover API exists (its ancestors may clip it); elsewhere the bounds
 * stop at the clipping ancestors.
 */
export const placeTooltipElement = (
  tip: HTMLElement,
  stage: HTMLElement,
  place: (
    size: TooltipSize,
    stage: TooltipSize,
    bounds: Rect | null,
  ) => TooltipPlacement,
  options: TooltipElementOptions = {},
): TooltipPlacement => {
  const size = options.size ?? {
    width: tip.offsetWidth,
    height: tip.offsetHeight,
  };
  const area = options.stage ?? {
    width: stage.clientWidth,
    height: stage.clientHeight,
  };
  const topLayer = canPromote(tip);
  let p = place(size, area, null);
  if (p.fit !== "stage") {
    const bounds = tooltipBounds(stage, topLayer);
    if (bounds) p = place(size, area, bounds);
  }
  const outside =
    p.x < 0 ||
    p.y < 0 ||
    p.x + size.width > area.width ||
    p.y + size.height > area.height;
  const moved = setTopLayer(tip, outside && topLayer);
  let { x, y } = p;
  if (promoted.has(tip)) {
    // fixed in the top layer: viewport pixels, following the page scroll
    const v = toViewport(stage, x, y);
    x = v.x;
    y = v.y;
    follow(tip, stage, p.x, p.y);
  }
  if (options.animate) {
    const win = stage.ownerDocument.defaultView;
    tip.style.transition =
      moved || prefersReducedMotion(win) ? "none" : TOOLTIP_TRANSITION;
  }
  tip.style.transform = `translate(${Math.round(x)}px, ${Math.round(y)}px)`;
  return p;
};

export interface TooltipElementPlacement
  extends
    Omit<TooltipPlacementInput, "size" | "stage" | "bounds">,
    TooltipElementOptions {}

/** Places a shown tooltip off the hovered marks (see `placeTooltip`) */
export const positionTooltip = (
  tip: HTMLElement,
  stage: HTMLElement,
  input: TooltipElementPlacement,
): TooltipPlacement =>
  placeTooltipElement(
    tip,
    stage,
    (size, area, bounds) =>
      placeTooltip({ ...input, size, stage: area, bounds }),
    input,
  );
