import { afterEach, describe, expect, it, vi } from "vitest";
import type { Rect } from "./layout";
import { parseColor } from "./color";
import {
  CANVAS_TOOLTIP_ALPHA,
  findTooltipSpot,
  overlapArea,
  placeTooltip,
  positionTooltip,
  prefersReducedMotion,
  rectIndex,
  releaseTooltip,
  styleTooltip,
  themeTooltip,
  TOOLTIP_ALPHA,
  TOOLTIP_TRANSITION,
  tooltipBounds,
  tooltipColors,
  unionRect,
  type TooltipPlacement,
} from "./tooltip";

const STAGE = { width: 600, height: 300 };
const SIZE = { width: 150, height: 80 };

const boxOf = (p: TooltipPlacement, size = SIZE): Rect => ({
  x: p.x,
  y: p.y,
  width: size.width,
  height: size.height,
});

const insideRect = (r: Rect, area: Rect) =>
  r.x >= area.x &&
  r.y >= area.y &&
  r.x + r.width <= area.x + area.width &&
  r.y + r.height <= area.y + area.height;

describe("placeTooltip", () => {
  it("goes beside the hovered marks, centered on the pointer", () => {
    const avoid = { x: 200, y: 100, width: 20, height: 120 };
    const p = placeTooltip({
      anchor: { x: 210, y: 150 },
      avoid,
      size: SIZE,
      stage: STAGE,
      gap: 12,
    });
    expect(p).toEqual({ x: 232, y: 110, fit: "stage" });
    expect(overlapArea(boxOf(p), avoid)).toBe(0);
  });

  it("flips to the left near the right edge and slides along the side", () => {
    const p = placeTooltip({
      anchor: { x: 560, y: 290 },
      avoid: { x: 550, y: 280, width: 20, height: 16 },
      size: SIZE,
      stage: STAGE,
      gap: 12,
    });
    expect(p.fit).toBe("stage");
    expect(p.x).toBe(550 - 12 - 150);
    // centered on the pointer it would cross the bottom edge (margin 4)
    expect(p.y).toBe(300 - 80 - 4);
  });

  it("puts the tooltip above / below the hovered row of horizontal charts", () => {
    // a Gantt task bar across the stage
    const avoid = { x: 40, y: 120, width: 520, height: 24 };
    const above = placeTooltip({
      anchor: { x: 300, y: 132 },
      avoid,
      size: SIZE,
      stage: STAGE,
      prefer: "vertical",
      gap: 10,
    });
    expect(above).toEqual({ x: 225, y: 120 - 10 - 80, fit: "stage" });
    // first row: no room above, below it
    const below = placeTooltip({
      anchor: { x: 300, y: 20 },
      avoid: { ...avoid, y: 8 },
      size: SIZE,
      stage: STAGE,
      prefer: "vertical",
      gap: 10,
    });
    expect(below.fit).toBe("stage");
    expect(below.y).toBe(8 + 24 + 10);
  });

  it("tries a given side first", () => {
    const avoid = { x: 300, y: 140, width: 10, height: 10 };
    const input = {
      anchor: { x: 305, y: 145 },
      avoid,
      size: SIZE,
      stage: STAGE,
    };
    expect(placeTooltip({ ...input, prefer: "left" }).x).toBeLessThan(300);
    expect(placeTooltip({ ...input, prefer: "right" }).x).toBeGreaterThan(310);
    expect(placeTooltip({ ...input, prefer: "bottom" }).y).toBeGreaterThan(150);
  });

  it("never covers the marks nor the pointer when there is room", () => {
    for (let i = 0; i < 200; i++) {
      const x = (i * 37) % 560;
      const y = (i * 53) % 260;
      const avoid = { x, y, width: 8 + (i % 30), height: 8 + ((i * 7) % 40) };
      const anchor = { x: x + avoid.width / 2, y: y + avoid.height / 2 };
      const p = placeTooltip({ anchor, avoid, size: SIZE, stage: STAGE });
      expect(p.fit).toBe("stage");
      const box = boxOf(p);
      expect(overlapArea(box, avoid)).toBe(0);
      expect(insideRect(box, { x: 4, y: 4, width: 592, height: 292 })).toBe(
        true,
      );
    }
  });

  it("keeps a pointer-only anchor uncovered", () => {
    const p = placeTooltip({
      anchor: { x: 100, y: 100 },
      size: SIZE,
      stage: STAGE,
      gap: 16,
    });
    expect(p).toEqual({ x: 116, y: 60, fit: "stage" });
  });

  describe("on a tooltip larger than the chart (sparkline)", () => {
    const stage = { width: 160, height: 48 };
    const dot = { x: 68, y: 8, width: 24, height: 24 };
    const anchor = { x: 80, y: 20 };
    const size = { width: 130, height: 58 };

    it("overflows into the bounds, above the chart, covering none of it", () => {
      const p = placeTooltip({
        anchor,
        avoid: dot,
        size,
        stage,
        // the stage is 200px from the top of the viewport
        bounds: { x: -300, y: -200, width: 1000, height: 800 },
      });
      expect(p.fit).toBe("bounds");
      expect(p.y + size.height).toBeLessThanOrEqual(0);
      // centered on the pointer, slid into the width of the stage
      expect(p.x).toBe(15);
      expect(overlapArea(boxOf(p, size), dot)).toBe(0);
    });

    it("goes below when the viewport has no room above", () => {
      const p = placeTooltip({
        anchor,
        avoid: dot,
        size,
        stage,
        bounds: { x: -300, y: -20, width: 1000, height: 800 },
      });
      expect(p.fit).toBe("bounds");
      expect(p.y).toBe(dot.y + dot.height + 12);
    });

    it("covers the marks the least when it cannot leave the stage", () => {
      // a dot at the end of the line: left of it, clamped into the stage
      const end = { x: 130, y: 12, width: 24, height: 24 };
      const p = placeTooltip({
        anchor: { x: 142, y: 24 },
        avoid: end,
        size,
        stage,
      });
      expect(p.fit).toBe("none");
      expect(p.x).toBe(4);
      expect(overlapArea(boxOf(p, size), end)).toBe(4 * 24);
    });
  });

  it("stays in the stage when the bounds are empty", () => {
    const p = placeTooltip({
      anchor: { x: 100, y: 100 },
      size: SIZE,
      stage: STAGE,
      bounds: { x: 0, y: 0, width: 0, height: 0 },
    });
    expect(p.fit).toBe("stage");
  });
});

describe("placeTooltip with obstacles (Gantt rows)", () => {
  const box = (
    p: TooltipPlacement,
    size: { width: number; height: number },
  ) => ({
    x: p.x,
    y: p.y,
    width: size.width,
    height: size.height,
  });
  /** One bar per 20px row, staggered in time, on a 600 x 400 stage */
  const rows = (n: number, from = 40): Rect[] =>
    Array.from({ length: n }, (_, i) => ({
      x: 60 + ((i * 37) % 300),
      y: from + i * 20 + 4,
      width: 140,
      height: 12,
    }));

  it("puts a tall tooltip on no other bar when there is free space", () => {
    const bars = rows(16);
    const hovered = bars[7];
    const size = { width: 120, height: 140 };
    const p = placeTooltip({
      anchor: { x: hovered.x + 40, y: hovered.y + 6 },
      avoid: hovered,
      size,
      stage: { width: 600, height: 400 },
      prefer: "vertical",
      obstacles: bars,
    });
    expect(p.fit).toBe("stage");
    const b = box(p, size);
    for (const bar of bars) expect(overlapArea(b, bar)).toBe(0);
    expect(overlapArea(b, hovered)).toBe(0);
    expect(b.x).toBeGreaterThanOrEqual(0);
    expect(b.x + b.width).toBeLessThanOrEqual(600);
    expect(b.y + b.height).toBeLessThanOrEqual(400);
  });

  it("picks the free spot closest to the pointer", () => {
    // the beside spots all hit a bar; a free gap sits right below
    const bars: Rect[] = [
      { x: 0, y: 100, width: 400, height: 12 },
      { x: 0, y: 60, width: 400, height: 12 },
      { x: 0, y: 200, width: 400, height: 12 },
    ];
    const size = { width: 80, height: 60 };
    const p = placeTooltip({
      anchor: { x: 200, y: 106 },
      avoid: bars[0],
      size,
      stage: { width: 400, height: 300 },
      obstacles: bars,
    });
    expect(p.fit).toBe("stage");
    // between the hovered bar and the next one below
    expect(p.y).toBeGreaterThanOrEqual(112);
    expect(p.y + size.height).toBeLessThanOrEqual(200);
    for (const bar of bars) expect(overlapArea(box(p, size), bar)).toBe(0);
  });

  it("overflows into the bounds when the plot is full of bars", () => {
    const stage = { width: 400, height: 300 };
    // bars filling every row: no free spot of the size inside
    const bars: Rect[] = Array.from({ length: 15 }, (_, i) => ({
      x: 0,
      y: i * 20,
      width: 400,
      height: 16,
    }));
    const size = { width: 100, height: 60 };
    const input = {
      anchor: { x: 200, y: 148 },
      avoid: bars[7],
      size,
      stage,
      obstacles: bars,
    };
    const p = placeTooltip({
      ...input,
      bounds: { x: -200, y: -200, width: 800, height: 700 },
    });
    expect(p.fit).toBe("bounds");
    const b = box(p, size);
    for (const bar of bars) expect(overlapArea(b, bar)).toBe(0);
    // it leaves the stage (partly at least)
    expect(
      b.y < 0 || b.x < 0 || b.y + b.height > 300 || b.x + b.width > 400,
    ).toBe(true);

    // no bounds: the least covering spot, still off the hovered bar
    const none = placeTooltip(input);
    expect(none.fit).toBe("none");
    expect(overlapArea(box(none, size), bars[7])).toBe(0);
    expect(
      none.x <= 200 &&
        200 <= none.x + size.width &&
        none.y <= 148 &&
        148 <= none.y + size.height,
    ).toBe(false);
  });

  it("indexes many obstacles in buckets", () => {
    const many: Rect[] = Array.from({ length: 3000 }, (_, i) => ({
      x: (i % 60) * 10,
      y: Math.floor(i / 60) * 10,
      width: 6,
      height: 6,
    }));
    const index = rectIndex(many);
    expect(rectIndex(many)).toBe(index);
    expect(index.hits({ x: 0, y: 0, width: 2, height: 2 })).toBe(true);
    expect(index.hits({ x: 6.5, y: 6.5, width: 3, height: 3 })).toBe(false);
    expect(index.cover({ x: 0, y: 0, width: 20, height: 10 })).toBe(72);
    expect(index.hits({ x: 1000, y: 1000, width: 5, height: 5 })).toBe(false);
    const spot = findTooltipSpot({
      area: { x: 0, y: 0, width: 600, height: 500 },
      size: { width: 3, height: 3 },
      blocked: index.hits,
      score: (r) => Math.hypot(r.x - 300, r.y - 250),
    });
    expect(spot).not.toBeNull();
    expect(index.hits({ ...spot!, width: 3, height: 3 })).toBe(false);
  });
});

describe("rectangles", () => {
  it("unions and intersects", () => {
    const a = { x: 0, y: 0, width: 10, height: 10 };
    const b = { x: 5, y: 5, width: 10, height: 2 };
    expect(unionRect(null, b)).toEqual(b);
    expect(unionRect(a, b)).toEqual({ x: 0, y: 0, width: 15, height: 10 });
    expect(overlapArea(a, b)).toBe(10);
    expect(overlapArea(a, { x: 20, y: 0, width: 1, height: 1 })).toBe(0);
  });
});

describe("tooltip DOM", () => {
  afterEach(() => {
    document.body.replaceChildren();
    vi.restoreAllMocks();
  });

  const setup = () => {
    const outer = document.createElement("div");
    const stage = document.createElement("div");
    const tip = styleTooltip(document.createElement("div"), {
      display: "block",
    });
    stage.appendChild(tip);
    outer.appendChild(stage);
    document.body.appendChild(outer);
    stage.getBoundingClientRect = () =>
      ({ left: 100, top: 200, width: 160, height: 48 }) as DOMRect;
    return { outer, stage, tip };
  };

  it("is always translucent, without color-mix nor an opaque fallback", () => {
    // a style object keeping every assigned value, like a browser without color-mix
    const seen: Record<string, string> = {};
    const style = new Proxy(
      { setProperty: vi.fn((name: string, v: string) => (seen[name] = v)) },
      {
        set: (_target, key, value) => {
          seen[String(key)] = String(value);
          return true;
        },
        get: (target, key) =>
          key === "setProperty" ? target.setProperty : seen[String(key)],
      },
    );
    styleTooltip({ style } as unknown as HTMLElement);
    expect(Object.values(seen).join(" ")).not.toMatch(
      /color-mix|var\(--surface/,
    );
    expect(seen.background).toBeUndefined();
    const fill = parseColor(seen.backgroundColor)!;
    expect(fill[3]).toBeCloseTo(TOOLTIP_ALPHA, 2);
    expect(fill[3]).toBeLessThan(1);
    expect(seen.border).toMatch(/^1px solid rgba\(/);
    expect(seen["-webkit-backdrop-filter"]).toBe("blur(12px) saturate(160%)");
    expect(seen.backdropFilter).toBe("blur(12px) saturate(160%)");
    expect(CANVAS_TOOLTIP_ALPHA).toBeLessThan(1);
    expect(CANVAS_TOOLTIP_ALPHA).toBeGreaterThanOrEqual(0.8);
  });

  it("keeps an rgba fill on a real element and follows theme switches", () => {
    const light = {
      background: parseColor("#ffffff"),
      axis: parseColor("#e5e7eb"),
    };
    const dark = {
      background: parseColor("#111827"),
      axis: parseColor("#374151"),
    };
    const tip = styleTooltip(document.createElement("div"), {}, light);
    const fill = () => parseColor(tip.style.backgroundColor)!;
    expect(fill()).toEqual([1, 1, 1, TOOLTIP_ALPHA]);
    themeTooltip(tip, dark);
    expect(fill()[0]).toBeCloseTo(17 / 255, 3);
    expect(fill()[3]).toBeCloseTo(TOOLTIP_ALPHA, 3);
    expect(tip.style.border).toContain("rgba(55, 65, 81, 0.7)");
    themeTooltip(tip, light);
    expect(fill()).toEqual([1, 1, 1, TOOLTIP_ALPHA]);
  });

  it("falls back to translucent colors, never opaque ones", () => {
    for (const theme of [
      null,
      {},
      { background: [0, 0, 0, 0] as const },
      { text: parseColor("#f9fafb") },
    ]) {
      const c = tooltipColors(theme as never);
      expect(parseColor(c.background)![3]).toBeLessThan(1);
      expect(parseColor(c.border)![3]).toBeLessThan(1);
    }
    // a light text tells a dark theme
    expect(tooltipColors({ text: parseColor("#f9fafb") }).background).toBe(
      "rgba(17, 24, 39, 0.8)",
    );
    expect(tooltipColors(null).background).toBe("rgba(255, 255, 255, 0.8)");
    expect(tooltipColors(null, CANVAS_TOOLTIP_ALPHA).background).toBe(
      `rgba(255, 255, 255, ${CANVAS_TOOLTIP_ALPHA})`,
    );
  });

  it("reads the CSS variables of a stage for hosts without a theme", () => {
    const stage = document.createElement("div");
    stage.style.setProperty("--surface-elevated-color", "#1f2937");
    stage.style.setProperty("--border-color", "rgb(75, 85, 99)");
    document.body.appendChild(stage);
    const tip = document.createElement("div");
    themeTooltip(tip, stage);
    expect(tip.style.backgroundColor).toBe("rgba(31, 41, 55, 0.8)");
    expect(tip.style.border).toContain("rgba(75, 85, 99, 0.7)");
    // nothing resolvable: still translucent
    const bare = document.createElement("div");
    document.body.appendChild(bare);
    themeTooltip(tip, bare);
    expect(parseColor(tip.style.backgroundColor)![3]).toBeLessThan(1);
  });

  it("places the tooltip inside its stage and animates the moves", () => {
    const { stage, tip } = setup();
    const p = positionTooltip(tip, stage, {
      anchor: { x: 300, y: 150 },
      avoid: { x: 290, y: 140, width: 20, height: 20 },
      size: SIZE,
      stage: STAGE,
      animate: true,
    });
    expect(p.fit).toBe("stage");
    expect(tip.style.transform).toBe("translate(322px, 110px)");
    expect(tip.style.transition).toBe(TOOLTIP_TRANSITION);
    expect(tip.style.position).toBe("absolute");
  });

  it("drops the transition when reduced motion is preferred", () => {
    const { stage, tip } = setup();
    vi.spyOn(window, "matchMedia").mockImplementation(
      (query: string) =>
        ({ matches: query.includes("reduce") }) as MediaQueryList,
    );
    expect(prefersReducedMotion(window)).toBe(true);
    positionTooltip(tip, stage, {
      anchor: { x: 300, y: 150 },
      size: SIZE,
      stage: STAGE,
      animate: true,
    });
    expect(tip.style.transition).toBe("none");
    expect(prefersReducedMotion(null)).toBe(false);
  });

  it("promotes a tooltip leaving the stage to the top layer, and back", () => {
    const { stage, tip } = setup();
    const show = vi.fn();
    const hide = vi.fn();
    Object.assign(tip, { showPopover: show, hidePopover: hide });
    const sparkline = {
      anchor: { x: 80, y: 20 },
      avoid: { x: 68, y: 8, width: 24, height: 24 },
      size: { width: 130, height: 58 },
      stage: { width: 160, height: 48 },
      animate: true,
    };
    const p = positionTooltip(tip, stage, sparkline);
    expect(p.fit).toBe("bounds");
    expect(show).toHaveBeenCalledTimes(1);
    expect(tip.getAttribute("popover")).toBe("manual");
    expect(tip.style.position).toBe("fixed");
    // viewport pixels: the stage is at (100, 200)
    expect(tip.style.transform).toBe(
      `translate(${100 + p.x}px, ${200 + p.y}px)`,
    );
    // the jump between the two coordinate spaces is not animated
    expect(tip.style.transition).toBe("none");

    positionTooltip(tip, stage, sparkline);
    expect(show).toHaveBeenCalledTimes(1);
    expect(tip.style.transition).toBe(TOOLTIP_TRANSITION);

    positionTooltip(tip, stage, {
      ...sparkline,
      size: { width: 20, height: 10 },
    });
    expect(hide).toHaveBeenCalledTimes(1);
    expect(tip.hasAttribute("popover")).toBe(false);
    expect(tip.style.position).toBe("absolute");
  });

  it("keeps the tooltip inside the clipping ancestors without the Popover API", () => {
    const { outer, stage } = setup();
    const computed = window.getComputedStyle.bind(window);
    vi.spyOn(window, "getComputedStyle").mockImplementation((el) =>
      el === outer
        ? ({ overflowX: "hidden", overflowY: "hidden" } as CSSStyleDeclaration)
        : computed(el),
    );
    outer.getBoundingClientRect = () =>
      ({ left: 80, top: 160, width: 300, height: 120 }) as DOMRect;
    Object.defineProperty(outer, "clientWidth", { value: 300 });
    Object.defineProperty(outer, "clientHeight", { value: 120 });
    expect(tooltipBounds(stage, false)).toEqual({
      x: -20,
      y: -40,
      width: 300,
      height: 120,
    });
    // the top layer escapes the clipping: the whole viewport
    const viewport = tooltipBounds(stage, true)!;
    expect(viewport.x).toBe(-100);
    expect(viewport.y).toBe(-200);
    expect(viewport.width).toBe(
      document.documentElement.clientWidth || window.innerWidth,
    );
  });

  describe("a promoted tooltip following the page", () => {
    const sparkline = {
      anchor: { x: 80, y: 20 },
      avoid: { x: 68, y: 8, width: 24, height: 24 },
      size: { width: 130, height: 58 },
      stage: { width: 160, height: 48 },
    };

    const promote = () => {
      const ctx = setup();
      const show = vi.fn();
      const hide = vi.fn();
      Object.assign(ctx.tip, { showPopover: show, hidePopover: hide });
      const frames: FrameRequestCallback[] = [];
      vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
        frames.push(cb);
        return frames.length;
      });
      vi.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {});
      const added = vi.spyOn(window, "addEventListener");
      const removed = vi.spyOn(window, "removeEventListener");
      const docRemoved = vi.spyOn(document, "removeEventListener");
      const p = positionTooltip(ctx.tip, ctx.stage, sparkline);
      expect(p.fit).toBe("bounds");
      expect(ctx.tip.style.position).toBe("fixed");
      const moveStage = (left: number, top: number) => {
        ctx.stage.getBoundingClientRect = () =>
          ({ left, top, width: 160, height: 48 }) as DOMRect;
      };
      const flush = () => {
        const pending = frames.splice(0);
        for (const cb of pending) cb(0);
        return pending.length;
      };
      const listening = (spy: typeof removed, type: string) =>
        spy.mock.calls.some(
          ([t, , o]) => t === type && (o as AddEventListenerOptions)?.capture,
        );
      return {
        ...ctx,
        p,
        show,
        hide,
        frames,
        added,
        removed,
        docRemoved,
        moveStage,
        flush,
        listening,
      };
    };

    it("moves with a scrolling ancestor, the page and the viewport", () => {
      const { outer, tip, p, added, moveStage, flush, frames, listening } =
        promote();
      expect(listening(added, "scroll")).toBe(true);
      expect(listening(added, "resize")).toBe(true);

      // an ancestor scrolls: its non-bubbling event is caught on capture
      moveStage(150, 120);
      outer.dispatchEvent(new Event("scroll"));
      outer.dispatchEvent(new Event("scroll"));
      // throttled to one frame
      expect(frames).toHaveLength(1);
      tip.style.transition = TOOLTIP_TRANSITION;
      expect(flush()).toBe(1);
      expect(tip.style.transform).toBe(
        `translate(${150 + p.x}px, ${120 + p.y}px)`,
      );
      expect(tip.style.transition).toBe("none");

      moveStage(90, 300);
      document.dispatchEvent(new Event("scroll"));
      flush();
      expect(tip.style.transform).toBe(
        `translate(${90 + p.x}px, ${300 + p.y}px)`,
      );

      moveStage(40, 260);
      window.dispatchEvent(new Event("resize"));
      flush();
      expect(tip.style.transform).toBe(
        `translate(${40 + p.x}px, ${260 + p.y}px)`,
      );
    });

    it("stops once the tooltip is hidden", () => {
      const { outer, tip, removed, docRemoved, moveStage, flush, listening } =
        promote();
      tip.style.display = "none";
      const before = tip.style.transform;
      moveStage(10, 10);
      outer.dispatchEvent(new Event("scroll"));
      expect(flush()).toBe(0);
      expect(tip.style.transform).toBe(before);
      expect(listening(removed, "scroll")).toBe(true);
      expect(listening(removed, "resize")).toBe(true);
      expect(listening(docRemoved, "scroll")).toBe(true);
    });

    it("stops once demoted back into the stage", () => {
      const { stage, tip, hide, removed, moveStage, flush, listening } =
        promote();
      positionTooltip(tip, stage, {
        ...sparkline,
        size: { width: 20, height: 10 },
      });
      expect(hide).toHaveBeenCalledTimes(1);
      expect(listening(removed, "scroll")).toBe(true);
      const before = tip.style.transform;
      moveStage(10, 10);
      window.dispatchEvent(new Event("scroll"));
      expect(flush()).toBe(0);
      expect(tip.style.transform).toBe(before);
    });

    it("stops once released by a destroyed chart", () => {
      const { tip, hide, removed, moveStage, flush, listening } = promote();
      releaseTooltip(tip);
      expect(hide).toHaveBeenCalledTimes(1);
      expect(tip.hasAttribute("popover")).toBe(false);
      expect(listening(removed, "scroll")).toBe(true);
      expect(listening(removed, "resize")).toBe(true);
      const before = tip.style.transform;
      moveStage(10, 10);
      window.dispatchEvent(new Event("scroll"));
      expect(flush()).toBe(0);
      expect(tip.style.transform).toBe(before);
      // releasing twice is harmless
      releaseTooltip(tip);
      expect(hide).toHaveBeenCalledTimes(1);
    });

    it("hides the tooltip of a stage scrolled out of view", () => {
      const { outer, tip, hide, moveStage, flush } = promote();
      moveStage(100, -400);
      outer.dispatchEvent(new Event("scroll"));
      flush();
      expect(tip.style.display).toBe("none");
      expect(hide).toHaveBeenCalledTimes(1);
      expect(tip.style.position).toBe("absolute");
    });
  });
});
