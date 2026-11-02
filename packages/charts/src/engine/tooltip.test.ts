import { afterEach, describe, expect, it, vi } from "vitest";
import type { Rect } from "./layout";
import {
  CANVAS_TOOLTIP_ALPHA,
  overlapArea,
  placeTooltip,
  positionTooltip,
  prefersReducedMotion,
  styleTooltip,
  TOOLTIP_TRANSITION,
  tooltipBounds,
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

  it("sets the opaque background before the translucent one", () => {
    const seen: string[] = [];
    const style = {
      set background(value: string) {
        seen.push(value);
      },
      setProperty: vi.fn(),
    };
    styleTooltip({ style } as unknown as HTMLElement);
    expect(seen).toHaveLength(2);
    expect(seen[0]).toMatch(/^var\(--surface-elevated-color/);
    expect(seen[1]).toMatch(/^color-mix\(in srgb, var\(--surface-elevated/);
    expect(style.setProperty).toHaveBeenCalledWith(
      "-webkit-backdrop-filter",
      "blur(12px) saturate(160%)",
    );
    expect(CANVAS_TOOLTIP_ALPHA).toBeLessThan(1);
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
});
