import { describe, expect, it } from "vitest";
import { flattenIconPath, parseIconPath } from "./path";

describe("parseIconPath", () => {
  it("normalizes relative, H/V and implicit line commands to absolute", () => {
    expect(parseIconPath("m2 3 4 0h2v-1L1 1z")).toEqual([
      { type: "M", x: 2, y: 3 },
      { type: "L", x: 6, y: 3 },
      { type: "L", x: 8, y: 3 },
      { type: "L", x: 8, y: 2 },
      { type: "L", x: 1, y: 1 },
      { type: "Z" },
    ]);
  });

  it("reflects control points of S and T", () => {
    const [, c, s] = parseIconPath("M0 0C1 1 2 1 3 0S5 -1 6 0");
    expect(c).toMatchObject({ type: "C", x2: 2, y2: 1 });
    expect(s).toMatchObject({ type: "C", x1: 4, y1: -1, x: 6, y: 0 });
    const [, q, t] = parseIconPath("M0 0Q1 2 2 0T4 0");
    expect(q).toMatchObject({ type: "Q", x1: 1, y1: 2 });
    expect(t).toMatchObject({ type: "Q", x1: 3, y1: -2, x: 4, y: 0 });
  });

  it("converts arcs to cubic curves, compact flags included", () => {
    const commands = parseIconPath("M3 12a9 9 0 1018 0");
    expect(commands.slice(1).every((c) => c.type === "C")).toBe(true);
    expect(commands[commands.length - 1]).toMatchObject({ x: 21, y: 12 });
  });

  it("accepts numbers without separators and exponents", () => {
    expect(parseIconPath("M.5.5l1e1-2")).toEqual([
      { type: "M", x: 0.5, y: 0.5 },
      { type: "L", x: 10.5, y: -1.5 },
    ]);
  });

  it("throws in strict mode, keeps the valid start otherwise", () => {
    expect(() => parseIconPath("M0 0L1")).toThrow(SyntaxError);
    expect(() => parseIconPath("L0 0")).toThrow(SyntaxError);
    expect(() => parseIconPath("M0 0X1 1")).toThrow(SyntaxError);
    expect(parseIconPath("M0 0L1 1L2", false)).toEqual([
      { type: "M", x: 0, y: 0 },
      { type: "L", x: 1, y: 1 },
    ]);
  });
});

describe("flattenIconPath", () => {
  it("flattens a circle within the tolerance", () => {
    for (const tolerance of [0.2, 0.05, 0.01]) {
      const [line] = flattenIconPath(
        "M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0",
        tolerance,
      );
      const points = line!.points;
      for (let i = 0; i < points.length; i += 2) {
        const r = Math.hypot(points[i]! - 12, points[i + 1]! - 12);
        expect(Math.abs(r - 9)).toBeLessThan(1e-6 + 0.01);
      }
      // chord midpoints stay within the tolerance of the circle
      for (let i = 2; i < points.length; i += 2) {
        const mx = (points[i - 2]! + points[i]!) / 2;
        const my = (points[i - 1]! + points[i + 1]!) / 2;
        expect(9 - Math.hypot(mx - 12, my - 12)).toBeLessThan(tolerance * 1.2);
      }
    }
    // finer tolerance, more points
    const coarse = flattenIconPath("M3 12a9 9 0 1 0 18 0", 0.2)[0]!.points;
    const fine = flattenIconPath("M3 12a9 9 0 1 0 18 0", 0.01)[0]!.points;
    expect(fine.length).toBeGreaterThan(coarse.length);
  });

  it("splits subpaths and marks closed ones", () => {
    const lines = flattenIconPath("M1 1h4v4zM10 10l2 2");
    expect(lines).toHaveLength(2);
    expect(lines[0]).toEqual({ points: [1, 1, 5, 1, 5, 5], closed: true });
    expect(lines[1]).toEqual({ points: [10, 10, 12, 12], closed: false });
  });

  it("starts a new subpath at the start point after Z", () => {
    const lines = flattenIconPath("M2 2h4zl0 4");
    expect(lines[1]).toEqual({ points: [2, 2, 2, 6], closed: false });
  });
});
