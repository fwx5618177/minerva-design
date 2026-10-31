// Stroke tessellation for the GPU backends: every segment becomes a quad,
// every join a round wedge, every open end a half disc (round caps), so the
// triangles cover exactly the SVG stroke with round caps and joins. The
// pieces overlap; the backends draw each icon once per pixel (depth test).

import { flattenIconPath, type IconPolyline } from "./path";
import type { IconDefinition } from "./types";

/** Options of `tessellateIcon` */
export interface IconMeshOptions {
  /** Stroke width on the 24×24 grid @default 2 */
  strokeWidth?: number;
  /** Largest distance between the mesh and the exact outline, in grid units @default 0.05 */
  tolerance?: number;
}

const EPSILON = 1e-6;

/** Polyline points without consecutive duplicates (and without a closing duplicate) */
const cleanPoints = (line: IconPolyline): number[] => {
  const src = line.points;
  const out: number[] = [];
  for (let i = 0; i < src.length; i += 2) {
    const x = src[i]!;
    const y = src[i + 1]!;
    const n = out.length;
    if (
      n &&
      Math.abs(out[n - 2]! - x) < EPSILON &&
      Math.abs(out[n - 1]! - y) < EPSILON
    ) {
      continue;
    }
    out.push(x, y);
  }
  if (line.closed && out.length > 4) {
    const n = out.length;
    if (
      Math.abs(out[0]! - out[n - 2]!) < EPSILON &&
      Math.abs(out[1]! - out[n - 1]!) < EPSILON
    ) {
      out.length = n - 2;
    }
  }
  return out;
};

/**
 * Triangles (`[x0, y0, x1, y1, x2, y2, …]`, on the 24×24 grid) covering the
 * stroke of an icon, round caps and joins included.
 */
export function tessellateIcon(
  icon: IconDefinition,
  options: IconMeshOptions = {},
): Float32Array {
  const half = Math.max(0, options.strokeWidth ?? 2) / 2;
  const tolerance = Math.max(1e-3, options.tolerance ?? 0.05);
  if (half === 0) return new Float32Array(0);
  // angle per fan triangle keeping the chord within the tolerance
  const step =
    tolerance >= half
      ? Math.PI / 2
      : Math.min(
          Math.PI / 2,
          Math.max(Math.PI / 64, 2 * Math.acos(1 - tolerance / half)),
        );
  const out: number[] = [];

  const fan = (cx: number, cy: number, from: number, sweep: number) => {
    const n = Math.max(1, Math.ceil(Math.abs(sweep) / step));
    let px = cx + Math.cos(from) * half;
    let py = cy + Math.sin(from) * half;
    for (let s = 1; s <= n; s++) {
      const a = from + (sweep * s) / n;
      const qx = cx + Math.cos(a) * half;
      const qy = cy + Math.sin(a) * half;
      out.push(cx, cy, px, py, qx, qy);
      px = qx;
      py = qy;
    }
  };

  for (const d of icon.paths) {
    for (const line of flattenIconPath(d, tolerance)) {
      // a lone moveto draws nothing
      if (line.points.length < 4) continue;
      const p = cleanPoints(line);
      const count = p.length / 2;
      if (count === 1) {
        // zero-length subpath: a dot (round caps)
        fan(p[0]!, p[1]!, 0, Math.PI * 2);
        continue;
      }
      const closed = line.closed && count > 2;
      const segments = closed ? count : count - 1;
      const dirs: number[] = [];
      for (let s = 0; s < segments; s++) {
        const a = s * 2;
        const b = ((s + 1) % count) * 2;
        const x0 = p[a]!;
        const y0 = p[a + 1]!;
        const x1 = p[b]!;
        const y1 = p[b + 1]!;
        const len = Math.hypot(x1 - x0, y1 - y0);
        const dx = (x1 - x0) / len;
        const dy = (y1 - y0) / len;
        dirs.push(dx, dy);
        const nx = -dy * half;
        const ny = dx * half;
        out.push(
          x0 + nx,
          y0 + ny,
          x0 - nx,
          y0 - ny,
          x1 + nx,
          y1 + ny,
          x1 + nx,
          y1 + ny,
          x0 - nx,
          y0 - ny,
          x1 - nx,
          y1 - ny,
        );
      }
      // round joins, on the outer side of each turn
      const first = closed ? 0 : 1;
      const last = closed ? count - 1 : count - 2;
      for (let v = first; v <= last; v++) {
        const inSeg = (v - 1 + segments) % segments;
        const outSeg = v % segments;
        const d0x = dirs[inSeg * 2]!;
        const d0y = dirs[inSeg * 2 + 1]!;
        const d1x = dirs[outSeg * 2]!;
        const d1y = dirs[outSeg * 2 + 1]!;
        const cross = d0x * d1y - d0y * d1x;
        const dot = d0x * d1x + d0y * d1y;
        const cx = p[v * 2]!;
        const cy = p[v * 2 + 1]!;
        if (Math.abs(cross) < 1e-9) {
          // straight on: nothing to fill; U-turn: the whole round end
          if (dot < 0) fan(cx, cy, 0, Math.PI * 2);
          continue;
        }
        const side = cross > 0 ? -1 : 1;
        const a0 = Math.atan2(side * d0x, -side * d0y);
        let sweep = Math.atan2(side * d1x, -side * d1y) - a0;
        if (sweep > Math.PI) sweep -= Math.PI * 2;
        else if (sweep < -Math.PI) sweep += Math.PI * 2;
        fan(cx, cy, a0, sweep);
      }
      if (!closed) {
        // round caps: half discs facing away from the line
        const sx = dirs[0]!;
        const sy = dirs[1]!;
        fan(p[0]!, p[1]!, Math.atan2(-sy, -sx) - Math.PI / 2, Math.PI);
        const ex = dirs[dirs.length - 2]!;
        const ey = dirs[dirs.length - 1]!;
        fan(
          p[(count - 1) * 2]!,
          p[(count - 1) * 2 + 1]!,
          Math.atan2(ey, ex) - Math.PI / 2,
          Math.PI,
        );
      }
    }
  }
  return new Float32Array(out);
}

const meshes = new WeakMap<IconDefinition, Map<string, Float32Array>>();

/** Cached mesh of an icon for a stroke width and a tolerance */
export const iconMesh = (
  icon: IconDefinition,
  strokeWidth: number,
  tolerance: number,
): Float32Array => {
  let byKey = meshes.get(icon);
  if (!byKey) {
    byKey = new Map();
    meshes.set(icon, byKey);
  }
  const key = `${strokeWidth}|${tolerance}`;
  let mesh = byKey.get(key);
  if (!mesh) {
    mesh = tessellateIcon(icon, { strokeWidth, tolerance });
    byKey.set(key, mesh);
  }
  return mesh;
};

/**
 * Tolerance (grid units) for an icon drawn `pixels` device pixels wide:
 * about a quarter of a device pixel, in a few buckets so meshes are shared.
 */
export const toleranceFor = (pixels: number): number => {
  const scale = pixels / 24;
  const exact = 0.25 / Math.max(scale, 0.25);
  // powers of two: 0.0078 .. 1
  return Math.min(1, Math.max(1 / 128, 2 ** Math.floor(Math.log2(exact))));
};
