// Tooltips of every chart family: the shared translucent look and a
// placement that keeps the tooltip off what it describes (the hovered marks
// and the pointer). `placeTooltip` is pure (canvas hosts use it too); the
// DOM helpers measure the element and may let it overflow the stage.

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

/** Start of a `len` long span at `v`, moved into [lo, hi] (at `lo` when longer) */
const clampSpan = (v: number, len: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(v, hi - len));

// half a pixel of slack: rounded sizes must not fail the fit
const inside = (area: Rect, x: number, y: number, w: number, h: number) =>
  x >= area.x - 0.5 &&
  y >= area.y - 0.5 &&
  x + w <= area.x + area.width + 0.5 &&
  y + h <= area.y + area.height + 0.5;

/**
 * Top-left corner of a tooltip that covers neither the hovered marks
 * (`avoid`) nor the pointer. Candidates sit beside the avoided box, in the
 * order of `prefer`, centered on the pointer across that side and slid
 * into the area. The first one inside the stage wins; else, with `bounds`,
 * the candidate inside the bounds that covers the least of the stage (a
 * tooltip above a tiny sparkline rather than over it); else the clamped
 * spot covering the marks the least.
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

const SURFACE = "var(--surface-elevated-color, var(--background-color, #fff))";
const GLASS = `color-mix(in srgb, ${SURFACE} 80%, transparent)`;
const BLUR = "blur(12px) saturate(160%)";

/** Transition of the tooltip moves (none when reduced motion is preferred) */
export const TOOLTIP_TRANSITION = "transform 80ms ease-out";

/** Opacity of the fill of canvas-drawn tooltips (a canvas cannot blur what is below) */
export const CANVAS_TOOLTIP_ALPHA = 0.86;

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
  border:
    "1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 70%, transparent)",
  background: SURFACE,
  color: "var(--text-color, #1f2937)",
  // the light inner edge reads on dark themes, the shadow on light ones
  boxShadow:
    "0 12px 32px -8px rgba(15, 23, 42, 0.2), 0 4px 10px -4px rgba(15, 23, 42, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.06)",
};

/**
 * Styles a tooltip element: translucent over a blurred backdrop where
 * supported. Unsupported inline values are ignored, so the opaque
 * background set first stays on older browsers.
 */
export const styleTooltip = <T extends HTMLElement>(
  el: T,
  style: Partial<CSSStyleDeclaration> = {},
): T => {
  Object.assign(el.style, TOOLTIP_LOOK, style);
  el.style.background = GLASS;
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
    // fixed in the top layer: viewport pixels
    const r = stage.getBoundingClientRect();
    x += r.left + stage.clientLeft;
    y += r.top + stage.clientTop;
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
