import { describe, expect, it } from "vitest";
import {
  dashPolyline,
  isConvex,
  packPremultiplied,
  VECTOR_STRIDE,
  VectorRecorder,
  type VectorBatch,
} from "./vector";

/** Vertices of a batch: x, y and the unpacked premultiplied rgba (0-255) */
const vertices = (batch: VectorBatch) => {
  const f32 = new Float32Array(batch.data, 0, batch.count * 3);
  const u8 = new Uint8Array(batch.data, 0, batch.count * VECTOR_STRIDE);
  return Array.from({ length: batch.count }, (_, i) => ({
    x: f32[i * 3],
    y: f32[i * 3 + 1],
    rgba: [...u8.subarray(i * 12 + 8, i * 12 + 12)],
  }));
};

/** Signed area covered by the triangles of a draw (fans of convex shapes) */
const area = (batch: VectorBatch, index = 0) => {
  const v = vertices(batch);
  const d = batch.draws[index];
  let sum = 0;
  for (let i = d.first; i < d.first + d.count; i += 3) {
    const [a, b, c] = [v[i], v[i + 1], v[i + 2]];
    sum += ((b.x - a.x) * (c.y - a.y) - (c.x - a.x) * (b.y - a.y)) / 2;
  }
  return Math.abs(sum);
};

const ctx = (r: VectorRecorder) => r as unknown as CanvasRenderingContext2D;

describe("VectorRecorder", () => {
  it("fills a convex path with one plain draw, in device pixels", () => {
    const r = new VectorRecorder(null, 2);
    const c = ctx(r);
    c.fillStyle = "rgb(255, 0, 0)";
    c.beginPath();
    c.moveTo(0, 0);
    c.lineTo(10, 0);
    c.lineTo(10, 5);
    c.lineTo(0, 5);
    c.closePath();
    c.fill();
    const batch = r.finish();
    expect(batch.draws).toEqual([{ mode: "direct", first: 0, count: 6 }]);
    // 2x pixel ratio: 20 x 10 device px
    expect(area(batch)).toBeCloseTo(200);
    expect(vertices(batch)[0].rgba).toEqual([255, 0, 0, 255]);
  });

  it("merges consecutive plain fills into one draw", () => {
    const r = new VectorRecorder();
    const c = ctx(r);
    c.fillStyle = "#000";
    for (const x of [0, 20]) {
      c.beginPath();
      c.arc(x, 0, 5, 0, Math.PI * 2);
      c.fill();
    }
    const batch = r.finish();
    expect(batch.draws).toHaveLength(1);
    expect(batch.draws[0].mode).toBe("direct");
  });

  it("fills a donut (a hole of reversed winding) with the nonzero rule", () => {
    const r = new VectorRecorder();
    const c = ctx(r);
    c.fillStyle = "#123456";
    c.beginPath();
    c.moveTo(40, 20);
    c.arc(20, 20, 20, 0, Math.PI * 2);
    c.moveTo(30, 20);
    c.arc(20, 20, 10, Math.PI * 2, 0, true);
    c.closePath();
    c.fill();
    const batch = r.finish();
    expect(batch.draws).toHaveLength(1);
    expect(batch.draws[0].mode).toBe("nonzero");
  });

  it("flattens arcs finely enough to keep their area", () => {
    const r = new VectorRecorder();
    const c = ctx(r);
    c.fillStyle = "#000";
    c.beginPath();
    c.arc(50, 50, 40, 0, Math.PI * 2);
    c.fill();
    expect(area(r.finish())).toBeGreaterThan(Math.PI * 1600 * 0.995);
  });

  it("follows the Canvas2D arc direction rules", () => {
    const r = new VectorRecorder();
    const c = ctx(r);
    c.fillStyle = "#000";
    // clockwise from 0 to -π/2 goes the long way (three quarters)
    c.beginPath();
    c.moveTo(0, 0);
    c.arc(0, 0, 40, 0, -Math.PI / 2);
    c.closePath();
    c.fill();
    const expected = (Math.PI * 1600 * 3) / 4;
    expect(area(r.finish(), 0) / expected).toBeCloseTo(1, 2);
  });

  it("rounds corners with arcTo", () => {
    const r = new VectorRecorder();
    const c = ctx(r);
    c.fillStyle = "#000";
    c.beginPath();
    c.moveTo(5, 0);
    c.lineTo(15, 0);
    c.arcTo(20, 0, 20, 5, 5);
    c.lineTo(20, 20);
    c.lineTo(0, 20);
    c.lineTo(0, 0);
    c.closePath();
    c.fill();
    // a 20 x 20 square minus one corner of 25 - 25π/4
    expect(area(r.finish())).toBeCloseTo(400 - (25 - (25 * Math.PI) / 4), 0);
  });

  it("strokes with overlap-safe triangles and the line width", () => {
    const r = new VectorRecorder();
    const c = ctx(r);
    c.strokeStyle = "rgba(0, 0, 255, 0.5)";
    c.lineWidth = 4;
    c.lineCap = "butt";
    c.beginPath();
    c.moveTo(0, 10);
    c.lineTo(100, 10);
    c.stroke();
    const batch = r.finish();
    expect(batch.draws).toEqual([{ mode: "once", first: 0, count: 6 }]);
    expect(area(batch)).toBeCloseTo(400);
    // premultiplied
    expect(vertices(batch)[0].rgba).toEqual([0, 0, 128, 128]);
  });

  it("dashes strokes", () => {
    const r = new VectorRecorder();
    const c = ctx(r);
    c.strokeStyle = "#000";
    c.lineWidth = 2;
    c.lineCap = "butt";
    c.setLineDash([10, 10]);
    c.beginPath();
    c.moveTo(0, 0);
    c.lineTo(100, 0);
    c.stroke();
    // 5 dashes of 10 x 2
    expect(area(r.finish())).toBeCloseTo(100);
  });

  it("applies globalAlpha, save / restore and transforms", () => {
    const r = new VectorRecorder();
    const c = ctx(r);
    c.fillStyle = "#ffffff";
    c.save();
    c.globalAlpha = 0.5;
    c.translate(100, 0);
    c.scale(2, 2);
    c.beginPath();
    c.moveTo(0, 0);
    c.lineTo(1, 0);
    c.lineTo(1, 1);
    c.closePath();
    c.fill();
    c.restore();
    expect(c.globalAlpha).toBe(1);
    const v = vertices(r.finish());
    expect(v.map((p) => [p.x, p.y])).toEqual([
      [100, 0],
      [102, 0],
      [102, 2],
    ]);
    expect(v[0].rgba).toEqual([128, 128, 128, 128]);
  });

  it("colors gradient fills per vertex", () => {
    const r = new VectorRecorder();
    const c = ctx(r);
    const g = c.createLinearGradient(0, 0, 10, 0);
    g.addColorStop(0, "#000000");
    g.addColorStop(1, "#ffffff");
    c.fillStyle = g;
    c.beginPath();
    c.moveTo(0, 0);
    c.lineTo(10, 0);
    c.lineTo(10, 10);
    c.lineTo(0, 10);
    c.closePath();
    c.fill();
    const v = vertices(r.finish());
    expect(v[0].rgba).toEqual([0, 0, 0, 255]);
    expect(v[1].rgba).toEqual([255, 255, 255, 255]);
  });

  it("draws an approximated shadow below a fill", () => {
    const r = new VectorRecorder();
    const c = ctx(r);
    c.fillStyle = "#f00";
    c.shadowColor = "rgba(0, 0, 0, 0.2)";
    c.shadowBlur = 10;
    c.shadowOffsetY = 4;
    c.beginPath();
    c.arc(50, 50, 20, 0, Math.PI * 2);
    c.fill();
    const draws = r.finish().draws;
    // the offset shape, the soft rings, then the fill itself
    expect(draws.length).toBeGreaterThan(2);
    expect(draws[draws.length - 1].mode).toBe("direct");
  });

  it("forwards text to the overlay context with the transform", () => {
    const calls: unknown[][] = [];
    const text = {
      setTransform: (...args: unknown[]) =>
        calls.push(["setTransform", ...args]),
      fillText: (...args: unknown[]) => calls.push(["fillText", ...args]),
      strokeText: (...args: unknown[]) => calls.push(["strokeText", ...args]),
    } as unknown as CanvasRenderingContext2D;
    const r = new VectorRecorder(text, 2);
    const c = ctx(r);
    c.font = "12px sans-serif";
    c.fillStyle = "#333";
    c.translate(5, 0);
    c.fillText("Hello", 1, 2);
    expect(calls).toEqual([
      ["setTransform", 2, 0, 0, 2, 10, 0],
      ["fillText", "Hello", 1, 2],
    ]);
    expect(text.font).toBe("12px sans-serif");
    expect(text.fillStyle).toBe("#333");
    expect(r.finish().count).toBe(0);
  });

  it("starts over on reset", () => {
    const r = new VectorRecorder();
    const c = ctx(r);
    c.fillStyle = "#000";
    c.fillRect(0, 0, 10, 10);
    expect(r.finish().count).toBe(6);
    r.reset(null, 1);
    expect(r.finish()).toMatchObject({ count: 0, draws: [] });
  });
});

describe("vector helpers", () => {
  it("detects convex polygons", () => {
    expect(isConvex([0, 0, 10, 0, 10, 10, 0, 10])).toBe(true);
    expect(isConvex([0, 0, 10, 0, 5, 2, 10, 10, 0, 10])).toBe(false);
    // a self-intersecting star turns twice
    const star: number[] = [];
    for (let i = 0; i < 5; i++) {
      const a = (i * 4 * Math.PI) / 5;
      star.push(Math.cos(a), Math.sin(a));
    }
    expect(isConvex(star)).toBe(false);
  });

  it("splits polylines along a dash pattern", () => {
    expect(dashPolyline([0, 0, 30, 0], [10, 5])).toEqual([
      [0, 0, 10, 0],
      [15, 0, 25, 0],
    ]);
    expect(dashPolyline([0, 0, 30, 0], [10, 5], 5)).toEqual([
      [0, 0, 5, 0],
      [10, 0, 20, 0],
      [25, 0, 30, 0],
    ]);
  });

  it("packs premultiplied colors", () => {
    expect(packPremultiplied([1, 0.5, 0, 1], 0.5)).toBe(
      (128 | (64 << 8) | (0 << 16) | (128 << 24)) >>> 0,
    );
  });
});
