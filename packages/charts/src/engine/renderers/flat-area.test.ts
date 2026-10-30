import { describe, expect, it } from "vitest";
import { createCanvas2dPainter } from "./canvas2d";
import { itemParams } from "./gl";
import { GLSL1_AREA, GLSL_AREA, WGSL_AREA } from "./shaders";
import { GAP, type AreaItem, type RenderFrame } from "./types";

// `flat` areas (uniform fill, no vertical fade): arrowheads and other shapes

const frame: RenderFrame = {
  transform: { xScale: 0.01, xOffset: -1, yScale: 0.01, yOffset: -1 },
  width: 200,
  height: 200,
  dpr: 1,
};

const area = (flat?: boolean): AreaItem => ({
  kind: "area",
  key: "a",
  version: 1,
  color: [0.2, 0.4, 0.6, 1],
  // a triangle, a gap, a second triangle
  points: Float32Array.from([
    0,
    0,
    0,
    5,
    10,
    0,
    10,
    0,
    0,
    GAP,
    GAP,
    GAP,
    20,
    0,
    0,
    25,
    10,
    0,
    30,
    0,
    0,
  ]),
  count: 7,
  opacity: 0.8,
  sorted: false,
  flat,
});

/** A 2D context recording the fill styles and the gradients */
const recorder = () => {
  const fills: unknown[] = [];
  let gradients = 0;
  let closed = 0;
  const ctx = new Proxy({} as Record<string | symbol, unknown>, {
    get(target, key) {
      if (key in target) return target[key];
      if (key === "createLinearGradient")
        return () => {
          gradients++;
          return { addColorStop() {} };
        };
      if (key === "closePath") return () => closed++;
      if (key === "fill") return () => fills.push(target.fillStyle);
      return () => {};
    },
    set(target, key, value) {
      target[key] = value;
      return true;
    },
  }) as unknown as CanvasRenderingContext2D;
  return { ctx, fills, gradients: () => gradients, closed: () => closed };
};

describe("flat areas", () => {
  it("pass the flag to the GPU programs", () => {
    expect(itemParams(area(true), frame)).toEqual([1, 0.8, 0, 0]);
    expect(itemParams(area(), frame)).toEqual([0, 0.8, 0, 0]);
    // every backend switches its vertical fade off with params.x
    expect(WGSL_AREA).toContain("u.params.x > 0.5");
    expect(GLSL_AREA.vertex).toContain("u_params.x > 0.5");
    expect(GLSL1_AREA.vertex).toContain("u_params.x > 0.5");
  });

  it("fill with a solid color on Canvas2D", () => {
    const flat = recorder();
    createCanvas2dPainter(flat.ctx).paint([area(true)], frame);
    expect(flat.gradients()).toBe(0);
    expect(flat.fills).toEqual(["rgba(51,102,153,0.8)"]);
    // both runs are closed shapes of one fill
    expect(flat.closed()).toBe(2);
    const faded = recorder();
    createCanvas2dPainter(faded.ctx).paint([area(false)], frame);
    expect(faded.gradients()).toBe(1);
  });
});
