import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  applyPosition,
  autoPosition,
  computeAnchoredPosition,
  fromCamelPlacement,
  getTransformOrigin,
  parsePlacement,
  toCamelPlacement,
  toPlacement,
  type AnchoredPositionResult,
} from "./positioning";

const VIEWPORT = { width: 1000, height: 800 };

const rect = (x: number, y: number, width: number, height: number) =>
  ({
    x,
    y,
    left: x,
    top: y,
    width,
    height,
    right: x + width,
    bottom: y + height,
    toJSON: () => ({}),
  }) as DOMRect;

function sized(width: number, height: number) {
  const el = document.createElement("div");
  el.style.width = `${width}px`;
  el.style.height = `${height}px`;
  vi.spyOn(el, "offsetWidth", "get").mockReturnValue(width);
  vi.spyOn(el, "offsetHeight", "get").mockReturnValue(height);
  document.body.appendChild(el);
  return el;
}

function anchorAt(x: number, y: number, width = 100, height = 30) {
  const el = sized(width, height);
  vi.spyOn(el, "getBoundingClientRect").mockReturnValue(
    rect(x, y, width, height),
  );
  return el;
}

beforeEach(() => {
  const html = document.documentElement;
  vi.spyOn(html, "clientWidth", "get").mockReturnValue(VIEWPORT.width);
  vi.spyOn(html, "clientHeight", "get").mockReturnValue(VIEWPORT.height);
});

afterEach(() => {
  vi.restoreAllMocks();
  document.body.innerHTML = "";
});

describe("computeAnchoredPosition", () => {
  it("places below the anchor with the default 8px offset (fixed strategy)", async () => {
    const anchor = anchorAt(100, 100);
    const floating = sized(200, 100);
    const result = await computeAnchoredPosition(anchor, floating);
    expect(result.strategy).toBe("fixed");
    expect(result.placement).toBe("bottom");
    expect(result.y).toBe(138);
    expect(result.x).toBe(50);
    expect(result.rects?.reference.width).toBe(100);
    expect(result.availableHeight).toBeGreaterThan(0);
    expect(result.availableWidth).toBeGreaterThan(0);
  });

  it("flips to the opposite side when there is no room", async () => {
    const anchor = anchorAt(400, 740);
    const floating = sized(200, 100);
    const result = await computeAnchoredPosition(anchor, floating, {
      placement: "bottom-start",
    });
    expect(result.placement).toBe("top-start");
    expect(result.y).toBe(740 - 8 - 100);
    expect(result.x).toBe(400);
  });

  it("does not flip with flip: false and honours custom offsets", async () => {
    const anchor = anchorAt(400, 740);
    const floating = sized(200, 100);
    const result = await computeAnchoredPosition(anchor, floating, {
      placement: "bottom-start",
      flip: false,
      shift: false,
      offset: { mainAxis: 4, crossAxis: 10 },
    });
    expect(result.placement).toBe("bottom-start");
    expect(result.y).toBe(774);
    expect(result.x).toBe(410);
  });

  it("shifts inside the viewport (8px padding)", async () => {
    const anchor = anchorAt(0, 100, 20, 20);
    const floating = sized(200, 50);
    const result = await computeAnchoredPosition(anchor, floating);
    expect(result.x).toBe(8);
  });

  it("honours a custom collision padding for shift and flip", async () => {
    // Wide enough anchor so limitShift does not cap the shift
    const anchor = anchorAt(0, 100, 60, 20);
    const floating = sized(200, 50);
    const result = await computeAnchoredPosition(anchor, floating, {
      padding: 24,
    });
    expect(result.x).toBe(24);

    // 50px floating + 8px gap fits below an anchor ending at 730 with the
    // default 8px padding (800 - 8), but not with 40px padding: flips up.
    const low = anchorAt(400, 700, 100, 30);
    const fits = await computeAnchoredPosition(low, sized(100, 50));
    expect(fits.placement).toBe("bottom");
    const flipped = await computeAnchoredPosition(low, sized(100, 50), {
      padding: 40,
    });
    expect(flipped.placement).toBe("top");
  });

  it("matches the anchor width and fits the viewport height", async () => {
    const anchor = anchorAt(100, 100, 150, 30);
    const floating = sized(100, 100);
    const result = await computeAnchoredPosition(anchor, floating, {
      matchAnchorWidth: "min",
      fitViewportHeight: true,
    });
    expect(floating.style.minWidth).toBe("150px");
    expect(floating.style.maxHeight).toBe(`${result.availableHeight}px`);
    expect(floating.style.maxWidth).toBe(`${result.availableWidth}px`);

    const exact = sized(100, 100);
    await computeAnchoredPosition(anchor, exact, { matchAnchorWidth: "exact" });
    expect(exact.style.width).toBe("150px");
    expect(exact.style.maxHeight).toBe("");

    const plain = sized(100, 100);
    await computeAnchoredPosition(anchor, plain);
    expect(plain.style.maxWidth).toBe("");
  });

  it("positions the arrow along the anchor", async () => {
    const anchor = anchorAt(300, 100, 100, 30);
    const floating = sized(200, 100);
    const arrow = sized(10, 10);
    floating.appendChild(arrow);
    const result = await computeAnchoredPosition(anchor, floating, {
      arrowElement: arrow,
    });
    expect(result.arrow.x).toBe(95);
    expect(result.arrow.y).toBeUndefined();
    expect(result.middlewareData.arrow).toBeDefined();
  });

  it("accepts virtual elements", async () => {
    const floating = sized(50, 50);
    const result = await computeAnchoredPosition(
      { getBoundingClientRect: () => rect(500, 300, 0, 0) },
      floating,
      { placement: "right-start" },
    );
    expect(result.placement).toBe("right-start");
    expect(result.x).toBe(508);
    expect(result.y).toBe(300);
  });
});

describe("autoPosition", () => {
  it("reports updates until cleaned up", async () => {
    const anchor = anchorAt(100, 100);
    const floating = sized(100, 50);
    const onUpdate = vi.fn();
    const cleanup = autoPosition(anchor, floating, {}, onUpdate);
    await vi.waitFor(() => expect(onUpdate).toHaveBeenCalled());
    expect(onUpdate.mock.calls[0][0].placement).toBe("bottom");
    cleanup();
  });

  it("drops results resolved after cleanup", async () => {
    const anchor = anchorAt(100, 100);
    const floating = sized(100, 50);
    const onUpdate = vi.fn();
    autoPosition(
      anchor,
      floating,
      { autoUpdate: { animationFrame: false } },
      onUpdate,
    )();
    await new Promise((resolve) => setTimeout(resolve, 10));
    expect(onUpdate).not.toHaveBeenCalled();
  });
});

describe("placement helpers", () => {
  it("parse / build placements", () => {
    expect(parsePlacement("bottom-start")).toEqual({
      side: "bottom",
      align: "start",
    });
    expect(parsePlacement("left")).toEqual({ side: "left", align: "center" });
    expect(toPlacement("top", "end")).toBe("top-end");
    expect(toPlacement("right")).toBe("right");
    expect(toPlacement("right", "center")).toBe("right");
  });

  it("converts camelCase placements (lib-core compatible)", () => {
    expect(fromCamelPlacement("bottomStart")).toBe("bottom-start");
    expect(fromCamelPlacement("leftEnd")).toBe("left-end");
    expect(fromCamelPlacement("top")).toBe("top");
    expect(fromCamelPlacement("top-end")).toBe("top-end");
    expect(toCamelPlacement("bottom-start")).toBe("bottomStart");
    expect(toCamelPlacement("right")).toBe("right");
  });

  it("computes the transform origin towards the anchor", () => {
    expect(getTransformOrigin("bottom")).toBe("50% 0%");
    expect(getTransformOrigin("top-start")).toBe("0% 100%");
    expect(getTransformOrigin("right-end")).toBe("0% 100%");
    expect(getTransformOrigin("left")).toBe("100% 50%");
    expect(getTransformOrigin("bottom", { x: 20 }, 10)).toBe("25px 0%");
    expect(getTransformOrigin("left", { y: 30 })).toBe("100% 30px");
  });
});

describe("applyPosition", () => {
  it("writes position, data attributes and CSS variables", () => {
    const floating = document.createElement("div");
    const result: AnchoredPositionResult = {
      x: 12,
      y: 34,
      placement: "top-end",
      strategy: "fixed",
      middlewareData: {},
      arrow: {},
      availableWidth: 300,
      availableHeight: -5,
      rects: {
        reference: { x: 0, y: 0, width: 80, height: 20 },
        floating: { x: 0, y: 0, width: 10, height: 10 },
      },
    };
    applyPosition(floating, result);
    expect(floating.style.position).toBe("fixed");
    expect(floating.style.left).toBe("12px");
    expect(floating.style.top).toBe("34px");
    expect(floating.dataset.side).toBe("top");
    expect(floating.dataset.align).toBe("end");
    expect(floating.dataset.placement).toBe("top-end");
    const v = (name: string) => floating.style.getPropertyValue(name);
    expect(v("--minerva-transform-origin")).toBe("100% 100%");
    expect(v("--minerva-anchor-width")).toBe("80px");
    expect(v("--minerva-anchor-height")).toBe("20px");
    expect(v("--minerva-available-width")).toBe("300px");
    expect(v("--minerva-available-height")).toBe("0px");
  });

  it("skips variables that are not known", () => {
    const floating = document.createElement("div");
    applyPosition(
      floating,
      {
        x: 0,
        y: 0,
        placement: "bottom",
        strategy: "fixed",
        middlewareData: {},
        arrow: { x: 4 },
      },
      { arrowSize: 8 },
    );
    expect(floating.dataset.align).toBe("center");
    expect(floating.style.getPropertyValue("--minerva-transform-origin")).toBe(
      "8px 0%",
    );
    expect(floating.style.getPropertyValue("--minerva-anchor-width")).toBe("");
    expect(floating.style.getPropertyValue("--minerva-available-width")).toBe(
      "",
    );
  });
});
