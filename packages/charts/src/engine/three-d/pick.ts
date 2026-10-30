// Hover picking without the GPU: point clouds are bucketed into a screen
// grid (rebuilt lazily when the camera moved), surfaces and bars are hit
// by a ray (block bounding boxes over the surface grid, slab tests).

import type {
  BarTarget,
  PickTarget,
  PointTarget,
  SurfaceTarget,
} from "./geometry";
import {
  project,
  rayBox,
  rayTriangle,
  screenRay,
  type CameraFrame,
  type Ray,
  type Vec3,
} from "./math";

export interface PickHit {
  /** Series index */
  series: number;
  kind: PickTarget["kind"];
  /** Index of the drawn item (point, bar) or of the sampled surface vertex */
  item: number;
  /** World position of the hovered point / vertex / bar top */
  world: Vec3;
  /** Stage pixels */
  x: number;
  y: number;
  /** Normalized depth (-1 near … 1 far) */
  depth: number;
}

/** Screen-space bucket grid of the projected points of every point target */
export interface PointIndex {
  cell: number;
  cols: number;
  rows: number;
  /** Start of every cell in `refs` (length cols × rows + 1) */
  starts: Int32Array;
  /** Target index << 24 is too small for 1M points: two parallel arrays */
  refTarget: Uint16Array;
  refPoint: Int32Array;
  /** Per target: projected x, y, depth (3 floats per point; NaN when off-screen) */
  screen: Float32Array[];
}

const CELL = 24;

export const buildPointIndex = (
  targets: readonly PointTarget[],
  frame: CameraFrame,
): PointIndex => {
  const cols = Math.max(1, Math.ceil(frame.width / CELL));
  const rows = Math.max(1, Math.ceil(frame.height / CELL));
  const counts = new Int32Array(cols * rows + 1);
  const m = frame.viewProj;
  const halfW = frame.width / 2;
  const halfH = frame.height / 2;
  const screen = targets.map((t) => {
    const out = new Float32Array(t.count * 3);
    const p = t.positions;
    for (let i = 0; i < t.count; i++) {
      const o = i * t.stride;
      const x = p[o];
      const y = p[o + 1];
      const z = p[o + 2];
      const w = m[3] * x + m[7] * y + m[11] * z + m[15];
      const s = i * 3;
      if (w <= 0) {
        out[s] = NaN;
        continue;
      }
      const sx = ((m[0] * x + m[4] * y + m[8] * z + m[12]) / w + 1) * halfW;
      const sy = (1 - (m[1] * x + m[5] * y + m[9] * z + m[13]) / w) * halfH;
      if (sx < 0 || sy < 0 || sx >= frame.width || sy >= frame.height) {
        out[s] = NaN;
        continue;
      }
      out[s] = sx;
      out[s + 1] = sy;
      out[s + 2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
      counts[((sy / CELL) | 0) * cols + ((sx / CELL) | 0)]++;
    }
    return out;
  });
  const starts = new Int32Array(cols * rows + 1);
  for (let i = 0; i < cols * rows; i++) starts[i + 1] = starts[i] + counts[i];
  const total = starts[cols * rows];
  const refTarget = new Uint16Array(total);
  const refPoint = new Int32Array(total);
  const fill = starts.slice(0, cols * rows);
  screen.forEach((out, t) => {
    const n = out.length / 3;
    for (let i = 0; i < n; i++) {
      const sx = out[i * 3];
      if (sx !== sx) continue;
      const c = ((out[i * 3 + 1] / CELL) | 0) * cols + ((sx / CELL) | 0);
      const at = fill[c]++;
      refTarget[at] = t;
      refPoint[at] = i;
    }
  });
  return { cell: CELL, cols, rows, starts, refTarget, refPoint, screen };
};

/** Front-most point whose dot covers (x, y), else the closest within `slack` pixels */
export const pickPoint = (
  index: PointIndex,
  targets: readonly PointTarget[],
  x: number,
  y: number,
  slack = 4,
): { target: number; point: number; depth: number } | null => {
  let maxRadius = 0;
  for (const t of targets) {
    if (t.sized) maxRadius = Math.max(maxRadius, 32);
    else maxRadius = Math.max(maxRadius, t.defaultSize / 2);
  }
  const reach = maxRadius + slack;
  const c0 = Math.max(0, Math.floor((x - reach) / index.cell));
  const c1 = Math.min(index.cols - 1, Math.floor((x + reach) / index.cell));
  const r0 = Math.max(0, Math.floor((y - reach) / index.cell));
  const r1 = Math.min(index.rows - 1, Math.floor((y + reach) / index.cell));
  let best: { target: number; point: number; depth: number } | null = null;
  let bestCovered = false;
  let bestDistance = Infinity;
  for (let r = r0; r <= r1; r++) {
    for (let c = c0; c <= c1; c++) {
      const cell = r * index.cols + c;
      for (let k = index.starts[cell]; k < index.starts[cell + 1]; k++) {
        const t = index.refTarget[k];
        const i = index.refPoint[k];
        const s = index.screen[t];
        const target = targets[t];
        const dx = s[i * 3] - x;
        const dy = s[i * 3 + 1] - y;
        const depth = s[i * 3 + 2];
        const distance = Math.hypot(dx, dy);
        const radius = target.sized
          ? (target.positions[i * target.stride + 3] || target.defaultSize) / 2
          : target.defaultSize / 2;
        const covered = distance <= Math.max(radius, 2);
        if (!covered && distance > radius + slack) continue;
        const better = covered
          ? !bestCovered || depth < best!.depth
          : !bestCovered && distance < bestDistance;
        if (better) {
          best = { target: t, point: i, depth };
          bestCovered = covered;
          bestDistance = distance;
        }
      }
    }
  }
  return best;
};

// ---------------------------------------------------------------- surfaces

const BLOCK = 16;

interface SurfaceBlocks {
  bc: number;
  br: number;
  /** min x, y, z, max x, y, z per block */
  boxes: Float32Array;
}

const blockCache = new WeakMap<SurfaceTarget, SurfaceBlocks>();

const surfaceBlocks = (t: SurfaceTarget): SurfaceBlocks => {
  const cached = blockCache.get(t);
  if (cached) return cached;
  const bc = Math.ceil((t.cols - 1) / BLOCK);
  const br = Math.ceil((t.rows - 1) / BLOCK);
  const boxes = new Float32Array(bc * br * 6);
  const p = t.positions;
  for (let b = 0; b < br; b++) {
    for (let a = 0; a < bc; a++) {
      const lo = [Infinity, Infinity, Infinity];
      const hi = [-Infinity, -Infinity, -Infinity];
      for (let r = b * BLOCK; r <= Math.min(t.rows - 1, (b + 1) * BLOCK); r++) {
        for (
          let c = a * BLOCK;
          c <= Math.min(t.cols - 1, (a + 1) * BLOCK);
          c++
        ) {
          const o = (r * t.cols + c) * 3;
          for (let k = 0; k < 3; k++) {
            const v = p[o + k];
            if (v !== v) continue;
            if (v < lo[k]) lo[k] = v;
            if (v > hi[k]) hi[k] = v;
          }
        }
      }
      boxes.set([...lo, ...hi], (b * bc + a) * 6);
    }
  }
  const blocks = { bc, br, boxes };
  blockCache.set(t, blocks);
  return blocks;
};

/** Nearest hit of the ray on a surface: distance and nearest grid vertex */
export const raySurface = (
  ray: Ray,
  t: SurfaceTarget,
): { distance: number; vertex: number } | null => {
  const { bc, br, boxes } = surfaceBlocks(t);
  const p = t.positions;
  let best = Infinity;
  let vertex = -1;
  const tri = (a: number, b: number, c: number) => {
    const d = rayTriangle(
      ray,
      p[a * 3],
      p[a * 3 + 1],
      p[a * 3 + 2],
      p[b * 3],
      p[b * 3 + 1],
      p[b * 3 + 2],
      p[c * 3],
      p[c * 3 + 1],
      p[c * 3 + 2],
    );
    return d;
  };
  for (let b = 0; b < br; b++) {
    for (let a = 0; a < bc; a++) {
      const o = (b * bc + a) * 6;
      if (!(boxes[o] <= boxes[o + 3])) continue;
      const enter = rayBox(
        ray,
        [boxes[o], boxes[o + 1], boxes[o + 2]],
        [boxes[o + 3], boxes[o + 4], boxes[o + 5]],
      );
      if (enter >= best) continue;
      for (let r = b * BLOCK; r < Math.min(t.rows - 1, (b + 1) * BLOCK); r++) {
        for (
          let c = a * BLOCK;
          c < Math.min(t.cols - 1, (a + 1) * BLOCK);
          c++
        ) {
          const v00 = r * t.cols + c;
          const v01 = v00 + 1;
          const v10 = v00 + t.cols;
          const v11 = v10 + 1;
          if (
            p[v00 * 3 + 2] !== p[v00 * 3 + 2] ||
            p[v01 * 3 + 2] !== p[v01 * 3 + 2] ||
            p[v10 * 3 + 2] !== p[v10 * 3 + 2] ||
            p[v11 * 3 + 2] !== p[v11 * 3 + 2]
          ) {
            continue;
          }
          const d = Math.min(tri(v00, v01, v11), tri(v00, v11, v10));
          if (d < best) {
            best = d;
            // nearest corner of the cell to the hit point
            const hx = ray.origin[0] + ray.dir[0] * d;
            const hy = ray.origin[1] + ray.dir[1] * d;
            let nearest = v00;
            let nd = Infinity;
            for (const v of [v00, v01, v10, v11]) {
              const dd = (p[v * 3] - hx) ** 2 + (p[v * 3 + 1] - hy) ** 2;
              if (dd < nd) {
                nd = dd;
                nearest = v;
              }
            }
            vertex = nearest;
          }
        }
      }
    }
  }
  return vertex >= 0 ? { distance: best, vertex } : null;
};

/** Nearest bar hit by the ray */
export const rayBars = (
  ray: Ray,
  t: BarTarget,
): { distance: number; bar: number } | null => {
  let best = Infinity;
  let bar = -1;
  const b = t.boxes;
  for (let i = 0; i < t.count; i++) {
    const o = i * 6;
    const d = rayBox(
      ray,
      [b[o], b[o + 1], b[o + 2]],
      [b[o + 3], b[o + 4], b[o + 5]],
    );
    if (d < best) {
      best = d;
      bar = i;
    }
  }
  return bar >= 0 ? { distance: best, bar } : null;
};

// -------------------------------------------------------------------- main

/** Picks the front-most item under a stage pixel */
export const createPicker = () => {
  let index: PointIndex | null = null;
  let indexKey: unknown[] = [];

  return {
    /** Forgets the point index (camera, size or data changed) */
    reset() {
      index = null;
    },
    pick(
      targets: readonly PickTarget[],
      frame: CameraFrame,
      x: number,
      y: number,
    ): PickHit | null {
      const pointTargets = targets.filter(
        (t): t is PointTarget => t.kind === "points",
      );
      let best: PickHit | null = null;
      if (pointTargets.length) {
        const key = [
          frame.viewProj,
          frame.width,
          frame.height,
          ...pointTargets,
        ];
        if (
          !index ||
          key.length !== indexKey.length ||
          key.some((k, i) => k !== indexKey[i])
        ) {
          index = buildPointIndex(pointTargets, frame);
          indexKey = key;
        }
        const hit = pickPoint(index, pointTargets, x, y);
        if (hit) {
          const t = pointTargets[hit.target];
          const o = hit.point * t.stride;
          const world: Vec3 = [
            t.positions[o],
            t.positions[o + 1],
            t.positions[o + 2],
          ];
          const s = index.screen[hit.target];
          best = {
            series: t.series,
            kind: "points",
            item: hit.point,
            world,
            x: s[hit.point * 3],
            y: s[hit.point * 3 + 1],
            depth: hit.depth,
          };
        }
      }
      const ray = screenRay(frame, x, y);
      if (!ray) return best;
      for (const t of targets) {
        if (t.kind === "surface") {
          const hit = raySurface(ray, t);
          if (!hit) continue;
          const o = hit.vertex * 3;
          const world: Vec3 = [
            t.positions[o],
            t.positions[o + 1],
            t.positions[o + 2],
          ];
          const screen = project(frame, world[0], world[1], world[2]);
          // points slightly behind a surface stay pickable where they show through
          if (best && best.depth <= screen.depth + 1e-4) continue;
          best = {
            series: t.series,
            kind: "surface",
            item: hit.vertex,
            world,
            x: screen.x,
            y: screen.y,
            depth: screen.depth,
          };
        } else if (t.kind === "bars") {
          const hit = rayBars(ray, t);
          if (!hit) continue;
          const o = hit.bar * 6;
          const world: Vec3 = [
            (t.boxes[o] + t.boxes[o + 3]) / 2,
            (t.boxes[o + 1] + t.boxes[o + 4]) / 2,
            t.boxes[o + 5],
          ];
          // the hit point decides the depth, the anchor is the top of the bar
          const hx = ray.origin[0] + ray.dir[0] * hit.distance;
          const hy = ray.origin[1] + ray.dir[1] * hit.distance;
          const hz = ray.origin[2] + ray.dir[2] * hit.distance;
          const depth = project(frame, hx, hy, hz).depth;
          if (best && best.depth <= depth) continue;
          const anchor = project(frame, world[0], world[1], world[2]);
          best = {
            series: t.series,
            kind: "bars",
            item: hit.bar,
            world,
            x: anchor.x,
            y: anchor.y,
            depth,
          };
        }
      }
      return best;
    },
  };
};
