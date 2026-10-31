import { describe, expect, it } from "vitest";
import { flattenIconPath } from "./path";
import { iconMesh, tessellateIcon, toleranceFor } from "./tessellate";
import { icons } from "./registry";
import type { IconDefinition } from "./types";

const inTriangle = (
  px: number,
  py: number,
  t: Float32Array,
  i: number,
): boolean => {
  const [ax, ay, bx, by, cx, cy] = [
    t[i]!,
    t[i + 1]!,
    t[i + 2]!,
    t[i + 3]!,
    t[i + 4]!,
    t[i + 5]!,
  ];
  const d1 = (px - bx) * (ay - by) - (ax - bx) * (py - by);
  const d2 = (px - cx) * (by - cy) - (bx - cx) * (py - cy);
  const d3 = (px - ax) * (cy - ay) - (cx - ax) * (py - ay);
  const negative = d1 < 0 || d2 < 0 || d3 < 0;
  const positive = d1 > 0 || d2 > 0 || d3 > 0;
  return !(negative && positive);
};

const covered = (mesh: Float32Array, x: number, y: number) => {
  for (let i = 0; i < mesh.length; i += 6) {
    if (inTriangle(x, y, mesh, i)) return true;
  }
  return false;
};

const segmentDistance = (
  px: number,
  py: number,
  ax: number,
  ay: number,
  bx: number,
  by: number,
) => {
  const dx = bx - ax;
  const dy = by - ay;
  const len = dx * dx + dy * dy;
  const t = len
    ? Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / len))
    : 0;
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
};

/** Distance from a point to the (finely flattened) stroke centerline */
const distanceTo = (icon: IconDefinition, x: number, y: number) => {
  let best = Infinity;
  for (const d of icon.paths) {
    for (const line of flattenIconPath(d, 0.002)) {
      const p = line.closed
        ? [...line.points, line.points[0]!, line.points[1]!]
        : line.points;
      if (p.length === 2)
        best = Math.min(best, Math.hypot(x - p[0]!, y - p[1]!));
      for (let i = 2; i < p.length; i += 2) {
        best = Math.min(
          best,
          segmentDistance(x, y, p[i - 2]!, p[i - 1]!, p[i]!, p[i + 1]!),
        );
      }
    }
  }
  return best;
};

/** Samples the grid: inside the stroke must be covered, outside must not */
const checkCoverage = (
  icon: IconDefinition,
  strokeWidth: number,
  tolerance: number,
) => {
  const mesh = tessellateIcon(icon, { strokeWidth, tolerance });
  const half = strokeWidth / 2;
  const errors: string[] = [];
  for (let y = 0.25; y < 24; y += 0.5) {
    for (let x = 0.25; x < 24; x += 0.5) {
      const distance = distanceTo(icon, x, y);
      const hit = covered(mesh, x, y);
      if (distance < half - tolerance - 0.01 && !hit)
        errors.push(`missing ${x},${y}`);
      // a flattened curve sags by up to the tolerance, on both sides
      if (distance > half + tolerance + 0.01 && hit)
        errors.push(`extra ${x},${y}`);
    }
  }
  return errors;
};

const icon = (name: string, ...paths: string[]): IconDefinition => ({
  name,
  paths,
});

describe("tessellateIcon", () => {
  it("covers a straight line with round caps exactly", () => {
    expect(checkCoverage(icon("line", "M4 12h16"), 2, 0.02)).toEqual([]);
    expect(checkCoverage(icon("line", "M4 4L20 18"), 4, 0.02)).toEqual([]);
  });

  it("covers round joins, sharp turns and U-turns", () => {
    expect(checkCoverage(icon("check", "M4 12l5 5L20 6"), 3, 0.02)).toEqual([]);
    expect(checkCoverage(icon("zigzag", "M3 20L12 4L21 20"), 2, 0.02)).toEqual(
      [],
    );
    expect(checkCoverage(icon("u-turn", "M6 6h12H8"), 2, 0.02)).toEqual([]);
  });

  it("covers closed shapes and curves", () => {
    expect(checkCoverage(icon("box", "M4 4h16v16H4z"), 2, 0.02)).toEqual([]);
    expect(
      checkCoverage(
        icon("circle", "M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"),
        2,
        0.02,
      ),
    ).toEqual([]);
  });

  it("draws dots as discs", () => {
    expect(checkCoverage(icon("dot", "M12 12h.01"), 2, 0.02)).toEqual([]);
    expect(checkCoverage(icon("zero", "M12 12h0"), 2, 0.02)).toEqual([]);
    // a lone moveto draws nothing
    expect(tessellateIcon(icon("move", "M12 12")).length).toBe(0);
  });

  it("matches the exact stroke of built-in icons", () => {
    for (const name of ["search", "settings", "heart", "cloud", "star"]) {
      const builtIn = icons.find((i) => i.name === name)!;
      expect(checkCoverage(builtIn, 2, 0.05), name).toEqual([]);
    }
  });

  it("tessellates every built-in icon into whole triangles", () => {
    for (const builtIn of icons) {
      const mesh = tessellateIcon(builtIn);
      expect(mesh.length % 6, builtIn.name).toBe(0);
      expect(mesh.length, builtIn.name).toBeGreaterThan(0);
      expect(mesh.every(Number.isFinite), builtIn.name).toBe(true);
    }
  });

  it("caches meshes per icon, stroke width and tolerance", () => {
    const a = icons[0]!;
    expect(iconMesh(a, 2, 0.05)).toBe(iconMesh(a, 2, 0.05));
    expect(iconMesh(a, 2, 0.05)).not.toBe(iconMesh(a, 1.5, 0.05));
    expect(tessellateIcon(a, { strokeWidth: 0 }).length).toBe(0);
  });

  it("refines curves for larger icons, in shared buckets", () => {
    expect(toleranceFor(24)).toBeGreaterThan(toleranceFor(96));
    expect(toleranceFor(96)).toBeGreaterThan(toleranceFor(512));
    expect(toleranceFor(40)).toBe(toleranceFor(41));
    expect(toleranceFor(4096)).toBeGreaterThanOrEqual(1 / 128);
  });
});
