// Model -> GPU items (points, meshes, line segments) and the CPU data the
// hover picking needs. Items keep their version (no re-upload) while their
// signature is unchanged.

import { packColor, toCss, type Rgba } from "../color";
import { linearTicks } from "../scale";
import { contourSegments } from "./contours";
import { lutIndex, type ColorLut } from "./colormap";
import {
  toWorld,
  type AxisModel,
  type BarModel,
  type LineModel,
  type Model3D,
  type ScatterModel,
  type SeriesModel,
  type SurfaceModel,
} from "./model";
import {
  POINT_DISC,
  POINT_GLOW,
  POINT_SPHERE,
  POINT_STRIDE,
  SEGMENT_STRIDE,
  VERTEX_STRIDE,
  type Item3D,
  type LinesItem,
  type MeshItem,
  type PointsItem,
} from "./render-types";
import type {
  Surface3DContourOptions,
  Surface3DWireframeOptions,
} from "./types";

/** Colors the geometry needs, resolved by the chart */
export interface GeometryColors {
  /** Color of every series (option or palette) */
  series: Rgba[];
  /** Resolves a CSS color of the data */
  resolve: (value: string) => Rgba;
  /** Sampled color scale */
  lut: ColorLut;
  /** Default wireframe color */
  wire: Rgba;
}

/** Limits of the CPU (Canvas2D) backend */
export interface GeometryBudget {
  /** Largest surface grid side drawn (resampled above) */
  maxGridSide: number;
  /**
   * Largest number of scatter dots drawn (every series together): above,
   * the clouds keep 1 point out of n, and only the kept points can be
   * hovered
   */
  maxPoints: number;
}

export const GPU_BUDGET: GeometryBudget = {
  maxGridSide: 2048,
  maxPoints: Infinity,
};
export const CPU_BUDGET: GeometryBudget = {
  maxGridSide: 72,
  maxPoints: 40_000,
};

/** Picking data of a point cloud (scatter dots, line vertices) */
export interface PointTarget {
  kind: "points";
  series: number;
  /** World positions, stride `stride` floats */
  positions: Float32Array;
  stride: number;
  count: number;
  /** Diameters in CSS pixels (stride as positions, offset 3) or `null` */
  sized: boolean;
  defaultSize: number;
  /** Index in the series data of every drawn point (`null`: identity) */
  source: Uint32Array | null;
  /** Packed colors (offset 4 of the stride) or the series color */
  packed: Uint32Array | null;
}

/** Picking data of a surface: its (possibly resampled) world grid */
export interface SurfaceTarget {
  kind: "surface";
  series: number;
  rows: number;
  cols: number;
  /** World positions of the sampled vertices (x, y, z) */
  positions: Float32Array;
  /** Rows / columns of the data grid the samples come from */
  rowIndex: Int32Array;
  colIndex: Int32Array;
}

/** Picking data of bars: one world box per bar */
export interface BarTarget {
  kind: "bars";
  series: number;
  count: number;
  /** min x, y, z, max x, y, z per bar */
  boxes: Float32Array;
}

export type PickTarget = PointTarget | SurfaceTarget | BarTarget;

export interface Geometry {
  items: Item3D[];
  targets: PickTarget[];
  /** Total number of drawn points / cells / bars (summary) */
  counts: number[];
}

// -------------------------------------------------------------- utilities

let nextId = 1;
const ids = new WeakMap<object, number>();
/** Stable identity number of an object (data arrays) */
export const objectId = (value: object | null | undefined): number => {
  if (!value) return 0;
  let id = ids.get(value);
  if (id === undefined) {
    id = nextId++;
    ids.set(value, id);
  }
  return id;
};

const colorKey = (c: Rgba) => c.map((v) => v.toFixed(4)).join(",");

const domainKey = (a: AxisModel) =>
  `${a.domain[0]},${a.domain[1]},${a.half},${a.categories?.length ?? -1}`;

const isFiniteNumber = (v: number) =>
  v === v && v !== Infinity && v !== -Infinity;

/** Packs the scale color of `value` (NaN -> fallback) */
const scaleColor = (
  lut: ColorLut,
  domain: [number, number] | null,
  value: number,
  fallback: number,
) => {
  if (!domain || !isFiniteNumber(value)) return fallback;
  return lut.packed[lutIndex(value, domain[0], domain[1])];
};

// ------------------------------------------------------------------ points

/** `0xRRGGBB` -> packed opaque color (r in the low byte) */
const packRgb = (rgb: number) =>
  (0xff000000 |
    ((rgb & 0xff) << 16) |
    (rgb & 0xff00) |
    ((rgb >>> 16) & 0xff)) >>>
  0;

const buildPoints = (
  m: ScatterModel | LineModel,
  model: Model3D,
  colors: GeometryColors,
  defaultSize: number,
  /** Keeps 1 point out of `stride` (CPU backend) */
  stride = 1,
): {
  data: ArrayBuffer;
  count: number;
  source: Uint32Array | null;
  sized: boolean;
} => {
  const { cols } = m;
  const n = Math.ceil(cols.count / stride);
  const buffer = new ArrayBuffer(n * POINT_STRIDE);
  const f32 = new Float32Array(buffer);
  const u32 = new Uint32Array(buffer);
  const seriesColor = packColor(colors.series[m.index] ?? [0.5, 0.5, 0.5, 1]);
  const byScale = m.colorBy !== "series";
  const scaleSource = m.colorBy === "value" && cols.value ? cols.value : cols.z;
  const cache = new Map<string, number>();
  let source: Uint32Array | null = null;
  if (stride > 1) source = new Uint32Array(n);
  let count = 0;
  const { x: ax, y: ay, z: az } = model;
  // inline world mapping (hot loop for 1M points)
  const sx = (2 * ax.half) / (ax.domain[1] - ax.domain[0] || 1);
  const sy = (2 * ay.half) / (ay.domain[1] - ay.domain[0] || 1);
  const sz = (2 * az.half) / (az.domain[1] - az.domain[0] || 1);
  const ox = -ax.half - ax.domain[0] * sx;
  const oy = -ay.half - ay.domain[0] * sy;
  const oz = -az.half - az.domain[0] * sz;
  for (let i = 0; i < cols.count; i += stride) {
    const x = cols.x[i];
    const y = cols.y[i];
    const z = cols.z[i];
    if (!isFiniteNumber(x) || !isFiniteNumber(y) || !isFiniteNumber(z)) {
      if (!source) {
        source = new Uint32Array(n);
        for (let k = 0; k < count; k++) source[k] = k;
      }
      continue;
    }
    if (source) source[count] = i;
    const o = count * 5;
    f32[o] = x * sx + ox;
    f32[o + 1] = y * sy + oy;
    f32[o + 2] = z * sz + oz;
    const size = cols.size ? cols.size[i] : NaN;
    f32[o + 3] = isFiniteNumber(size) ? size : defaultSize;
    const own = cols.colors?.[i];
    const rgb = cols.rgb ? cols.rgb[i] : NaN;
    let color: number;
    if (own !== undefined) {
      let packed = cache.get(own);
      if (packed === undefined) {
        packed = packColor(colors.resolve(own));
        cache.set(own, packed);
      }
      color = packed;
    } else if (isFiniteNumber(rgb)) {
      color = packRgb(rgb);
    } else if (byScale) {
      color = scaleColor(
        colors.lut,
        model.colorDomain,
        scaleSource[i],
        seriesColor,
      );
    } else {
      color = seriesColor;
    }
    u32[o + 4] = color;
    count++;
  }
  return {
    data: buffer,
    count,
    source: source ? source.subarray(0, count) : null,
    sized: !!cols.size,
  };
};

// ----------------------------------------------------------------- surface

/** Indices of the sampled rows / columns: every `step`, the last one included */
const sampleIndices = (count: number, max: number): Int32Array => {
  if (count <= max) {
    const all = new Int32Array(count);
    for (let i = 0; i < count; i++) all[i] = i;
    return all;
  }
  const out = new Int32Array(max);
  for (let i = 0; i < max; i++)
    out[i] = Math.round((i * (count - 1)) / (max - 1));
  return out;
};

interface SurfaceMesh {
  positions: Float32Array;
  rowIndex: Int32Array;
  colIndex: Int32Array;
  mesh: MeshItem | null;
}

const buildSurface = (
  m: SurfaceModel,
  model: Model3D,
  colors: GeometryColors,
  budget: GeometryBudget,
  key: string,
  version: number,
): SurfaceMesh => {
  const { grid } = m;
  const rowIndex = sampleIndices(grid.rows, budget.maxGridSide);
  const colIndex = sampleIndices(grid.cols, budget.maxGridSide);
  const rows = rowIndex.length;
  const cols = colIndex.length;
  const n = rows * cols;
  const positions = new Float32Array(n * 3);
  for (let r = 0; r < rows; r++) {
    const gy = toWorld(model.y, grid.y[rowIndex[r]]);
    for (let c = 0; c < cols; c++) {
      const gx = toWorld(model.x, grid.x[colIndex[c]]);
      const h = grid.z[rowIndex[r] * grid.cols + colIndex[c]];
      const o = (r * cols + c) * 3;
      positions[o] = gx;
      positions[o + 1] = gy;
      positions[o + 2] = isFiniteNumber(h) ? toWorld(model.z, h) : NaN;
    }
  }
  if (m.series.fill === false) {
    return { positions, rowIndex, colIndex, mesh: null };
  }
  const buffer = new ArrayBuffer(n * VERTEX_STRIDE);
  const f32 = new Float32Array(buffer);
  const u32 = new Uint32Array(buffer);
  const seriesColor = packColor(colors.series[m.index] ?? [0.5, 0.5, 0.5, 1]);
  const byValue = m.colorBy === "value" && grid.value;
  const P = (r: number, c: number, k: number) =>
    positions[(r * cols + c) * 3 + k];
  const finite = (r: number, c: number) =>
    r >= 0 && r < rows && c >= 0 && c < cols && isFiniteNumber(P(r, c, 2));
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const v = r * cols + c;
      const o = v * 7;
      f32[o] = P(r, c, 0);
      f32[o + 1] = P(r, c, 1);
      f32[o + 2] = isFiniteNumber(P(r, c, 2)) ? P(r, c, 2) : 0;
      // normal: cross product of the central (or one-sided) differences
      const c0 = finite(r, c - 1) ? c - 1 : c;
      const c1 = finite(r, c + 1) ? c + 1 : c;
      const r0 = finite(r - 1, c) ? r - 1 : r;
      const r1 = finite(r + 1, c) ? r + 1 : r;
      let nx = 0;
      let ny = 0;
      let nz = 1;
      if (finite(r, c) && c0 !== c1 && r0 !== r1) {
        const ux = P(r, c1, 0) - P(r, c0, 0);
        const uz = P(r, c1, 2) - P(r, c0, 2);
        const vy = P(r1, c, 1) - P(r0, c, 1);
        const vz = P(r1, c, 2) - P(r0, c, 2);
        // u = (ux, 0, uz), v = (0, vy, vz): u × v
        nx = -uz * vy;
        ny = -ux * vz;
        nz = ux * vy;
        const len = Math.hypot(nx, ny, nz) || 1;
        nx /= len;
        ny /= len;
        nz /= len;
        if (nz < 0) {
          nx = -nx;
          ny = -ny;
          nz = -nz;
        }
      }
      f32[o + 3] = nx;
      f32[o + 4] = ny;
      f32[o + 5] = nz;
      const gi = rowIndex[r] * grid.cols + colIndex[c];
      u32[o + 6] =
        m.colorBy === "series"
          ? seriesColor
          : scaleColor(
              colors.lut,
              model.colorDomain,
              byValue ? grid.value![gi] : grid.z[gi],
              seriesColor,
            );
    }
  }
  const indices = new Uint32Array((rows - 1) * (cols - 1) * 6);
  let k = 0;
  for (let r = 0; r < rows - 1; r++) {
    for (let c = 0; c < cols - 1; c++) {
      if (
        !finite(r, c) ||
        !finite(r, c + 1) ||
        !finite(r + 1, c) ||
        !finite(r + 1, c + 1)
      ) {
        continue;
      }
      const a = r * cols + c;
      const b = a + 1;
      const d = a + cols;
      const e = d + 1;
      indices[k++] = a;
      indices[k++] = b;
      indices[k++] = e;
      indices[k++] = a;
      indices[k++] = e;
      indices[k++] = d;
    }
  }
  return {
    positions,
    rowIndex,
    colIndex,
    mesh: {
      kind: "mesh",
      key,
      version,
      opacity: m.opacity,
      vertices: buffer,
      vertexCount: n,
      indices: indices.subarray(0, k),
    },
  };
};

/** Segment buffer from a flat list of world coordinates (6 per segment) and packed colors */
const segmentBuffer = (coords: number[], packed: number[]) => {
  const count = packed.length;
  const buffer = new ArrayBuffer(count * SEGMENT_STRIDE);
  const f32 = new Float32Array(buffer);
  const u32 = new Uint32Array(buffer);
  for (let i = 0; i < count; i++) {
    const o = i * 7;
    for (let j = 0; j < 6; j++) f32[o + j] = coords[i * 6 + j];
    u32[o + 6] = packed[i];
  }
  return { buffer, count };
};

const MAX_WIRES = 64;

/** 0, step, 2 step, … and the last index */
export const stepped = (count: number, step: number): number[] => {
  const out: number[] = [];
  for (let i = 0; i < count; i += step) out.push(i);
  if (count > 0 && out[out.length - 1] !== count - 1) out.push(count - 1);
  return out;
};

const buildWireframe = (
  mesh: SurfaceMesh,
  options: Surface3DWireframeOptions,
  color: number,
  key: string,
  version: number,
): LinesItem => {
  const rows = mesh.rowIndex.length;
  const cols = mesh.colIndex.length;
  const P = mesh.positions;
  const coords: number[] = [];
  const packed: number[] = [];
  const rowStep = Math.max(
    1,
    Math.round(options.step ?? Math.ceil(rows / MAX_WIRES)),
  );
  const colStep = Math.max(
    1,
    Math.round(options.step ?? Math.ceil(cols / MAX_WIRES)),
  );
  const segment = (a: number, b: number) => {
    if (!isFiniteNumber(P[a * 3 + 2]) || !isFiniteNumber(P[b * 3 + 2])) return;
    coords.push(
      P[a * 3],
      P[a * 3 + 1],
      P[a * 3 + 2],
      P[b * 3],
      P[b * 3 + 1],
      P[b * 3 + 2],
    );
    packed.push(color);
  };
  for (const r of stepped(rows, rowStep)) {
    for (let c = 0; c < cols - 1; c++) segment(r * cols + c, r * cols + c + 1);
  }
  for (const c of stepped(cols, colStep)) {
    for (let r = 0; r < rows - 1; r++)
      segment(r * cols + c, (r + 1) * cols + c);
  }
  const { buffer, count } = segmentBuffer(coords, packed);
  return {
    kind: "lines",
    key,
    version,
    opacity: 1,
    data: buffer,
    count,
    width: options.width ?? 1,
    bias: 0.0015,
  };
};

/** Levels of the contour lines */
export const contourLevels = (
  options: Surface3DContourOptions,
  min: number,
  max: number,
): number[] => {
  if (options.levels) return options.levels.filter(isFiniteNumber);
  if (!(max > min)) return [];
  const count = Math.max(1, Math.round(options.count ?? 10));
  const nice = linearTicks(min, max, count).filter((v) => v > min && v < max);
  if (nice.length >= Math.max(2, count / 2)) return nice;
  return Array.from(
    { length: count },
    (_, i) => min + ((i + 0.5) * (max - min)) / count,
  );
};

const buildContours = (
  m: SurfaceModel,
  model: Model3D,
  colors: GeometryColors,
  options: Surface3DContourOptions,
  key: string,
  version: number,
): LinesItem | null => {
  const { grid } = m;
  const levels = contourLevels(options, grid.extent.z.min, grid.extent.z.max);
  if (!levels.length) return null;
  const floor = options.floor ?? true;
  const onSurface = options.surface ?? false;
  if (!floor && !onSurface) return null;
  const fixed = options.color ? packColor(colors.resolve(options.color)) : null;
  const floorZ = -model.z.half + 0.002;
  // the color of a level follows the scale when the surface is colored by height
  const domain =
    model.colorDomain && m.colorBy !== "value"
      ? model.colorDomain
      : ([grid.extent.z.min, grid.extent.z.max] as [number, number]);
  const coords: number[] = [];
  const packed: number[] = [];
  const xAt = (c: number) => {
    const i = Math.floor(c);
    const f = c - i;
    const a = grid.x[Math.min(i, grid.cols - 1)];
    const b = grid.x[Math.min(i + 1, grid.cols - 1)];
    return toWorld(model.x, a + (b - a) * f);
  };
  const yAt = (r: number) => {
    const i = Math.floor(r);
    const f = r - i;
    const a = grid.y[Math.min(i, grid.rows - 1)];
    const b = grid.y[Math.min(i + 1, grid.rows - 1)];
    return toWorld(model.y, a + (b - a) * f);
  };
  const segments: number[] = [];
  for (const level of levels) {
    segments.length = 0;
    contourSegments(grid.z, grid.rows, grid.cols, level, segments);
    if (!segments.length) continue;
    const color =
      fixed ?? colors.lut.packed[lutIndex(level, domain[0], domain[1])];
    const lz = toWorld(model.z, level);
    for (let i = 0; i < segments.length; i += 4) {
      const x0 = xAt(segments[i]);
      const y0 = yAt(segments[i + 1]);
      const x1 = xAt(segments[i + 2]);
      const y1 = yAt(segments[i + 3]);
      if (floor) {
        coords.push(x0, y0, floorZ, x1, y1, floorZ);
        packed.push(color);
      }
      if (onSurface) {
        coords.push(x0, y0, lz, x1, y1, lz);
        packed.push(color);
      }
    }
  }
  if (!packed.length) return null;
  const { buffer, count } = segmentBuffer(coords, packed);
  return {
    kind: "lines",
    key,
    version,
    opacity: 1,
    data: buffer,
    count,
    width: options.width ?? 1,
    bias: 0.002,
  };
};

// -------------------------------------------------------------------- bars

/** Corners of the 6 faces (4 each, counterclockwise from outside) and their normals */
const FACES: readonly { n: [number, number, number]; c: number[] }[] = [
  { n: [0, 0, 1], c: [0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1] },
  { n: [0, 0, -1], c: [0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0] },
  { n: [1, 0, 0], c: [1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1] },
  { n: [-1, 0, 0], c: [0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0] },
  { n: [0, 1, 0], c: [0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0] },
  { n: [0, -1, 0], c: [0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1] },
];

const buildBars = (
  m: BarModel,
  model: Model3D,
  colors: GeometryColors,
  key: string,
  version: number,
): { mesh: MeshItem; target: BarTarget } => {
  const { bars } = m;
  const n = bars.count;
  const buffer = new ArrayBuffer(n * 24 * VERTEX_STRIDE);
  const f32 = new Float32Array(buffer);
  const u32 = new Uint32Array(buffer);
  const indices = new Uint32Array(n * 36);
  const boxes = new Float32Array(n * 6);
  const seriesColor = packColor(colors.series[m.index] ?? [0.5, 0.5, 0.5, 1]);
  const width = Math.max(0.05, Math.min(1, m.series.barWidth ?? 0.7));
  const cellX =
    (2 * model.x.half) / Math.max(1, model.x.domain[1] - model.x.domain[0]);
  const cellY =
    (2 * model.y.half) / Math.max(1, model.y.domain[1] - model.y.domain[0]);
  const hx = (cellX * width) / 2;
  const hy = (cellY * width) / 2;
  const cache = new Map<string, number>();
  let v = 0;
  let k = 0;
  for (let i = 0; i < n; i++) {
    const cx = toWorld(model.x, bars.xi[i]);
    const cy = toWorld(model.y, bars.yi[i]);
    const za = toWorld(model.z, bars.z0[i]);
    const zb = toWorld(model.z, bars.z1[i]);
    const lo: [number, number, number] = [cx - hx, cy - hy, Math.min(za, zb)];
    const hi: [number, number, number] = [cx + hx, cy + hy, Math.max(za, zb)];
    boxes.set([lo[0], lo[1], lo[2], hi[0], hi[1], hi[2]], i * 6);
    const own = bars.colors?.[i];
    let color: number;
    if (own !== undefined) {
      color = cache.get(own) ?? packColor(colors.resolve(own));
      cache.set(own, color);
    } else if (m.colorBy === "series") {
      color = seriesColor;
    } else {
      const value =
        m.colorBy === "value" && bars.value ? bars.value[i] : bars.z[i];
      color = scaleColor(colors.lut, model.colorDomain, value, seriesColor);
    }
    for (const face of FACES) {
      for (let j = 0; j < 4; j++) {
        const o = (v + j) * 7;
        f32[o] = face.c[j * 3] ? hi[0] : lo[0];
        f32[o + 1] = face.c[j * 3 + 1] ? hi[1] : lo[1];
        f32[o + 2] = face.c[j * 3 + 2] ? hi[2] : lo[2];
        f32[o + 3] = face.n[0];
        f32[o + 4] = face.n[1];
        f32[o + 5] = face.n[2];
        u32[o + 6] = color;
      }
      indices[k++] = v;
      indices[k++] = v + 1;
      indices[k++] = v + 2;
      indices[k++] = v;
      indices[k++] = v + 2;
      indices[k++] = v + 3;
      v += 4;
    }
  }
  return {
    mesh: {
      kind: "mesh",
      key,
      version,
      opacity: m.opacity,
      vertices: buffer,
      vertexCount: v,
      indices,
    },
    target: { kind: "bars", series: m.index, count: n, boxes },
  };
};

// ------------------------------------------------------------------- lines

const buildLine = (
  m: LineModel,
  points: { data: ArrayBuffer; count: number; source: Uint32Array | null },
  key: string,
  version: number,
): LinesItem => {
  const f32 = new Float32Array(points.data);
  const u32 = new Uint32Array(points.data);
  const coords: number[] = [];
  const packed: number[] = [];
  const opacity = m.opacity;
  for (let i = 0; i < points.count - 1; i++) {
    // a gap in the data (NaN) breaks the line
    if (points.source && points.source[i + 1] !== points.source[i] + 1)
      continue;
    const a = i * 5;
    const b = a + 5;
    coords.push(f32[a], f32[a + 1], f32[a + 2], f32[b], f32[b + 1], f32[b + 2]);
    packed.push(u32[a + 4]);
  }
  const { buffer, count } = segmentBuffer(coords, packed);
  return {
    kind: "lines",
    key,
    version,
    opacity,
    data: buffer,
    count,
    width: m.series.lineWidth ?? 2,
    bias: 0,
  };
};

// -------------------------------------------------------------------- main

interface CacheEntry {
  signature: string;
  items: Item3D[];
  target: PickTarget[];
  count: number;
}

/** Builds the items of every visible series, reusing the unchanged ones */
export const createGeometryBuilder = () => {
  let cache = new Map<string, CacheEntry>();
  let version = 0;

  const signatureOf = (
    m: SeriesModel,
    model: Model3D,
    colors: GeometryColors,
    budget: GeometryBudget,
    lutId: number,
    stride: number,
  ): string => {
    const s = m.series as unknown as Record<string, unknown>;
    const options = JSON.stringify({
      type: m.type,
      colorBy: m.colorBy,
      opacity: m.opacity,
      pointSize: s.pointSize,
      pointStyle: s.pointStyle,
      blend: s.blend,
      lineWidth: s.lineWidth,
      perspectiveSize: s.perspectiveSize,
      wireframe: s.wireframe,
      contours: s.contours,
      fill: s.fill,
      barWidth: s.barWidth,
    });
    return [
      objectId(m.series.data as object),
      options,
      domainKey(model.x),
      domainKey(model.y),
      domainKey(model.z),
      model.colorDomain?.join() ?? "",
      colorKey(colors.series[m.index] ?? [0, 0, 0, 0]),
      colorKey(colors.wire),
      lutId,
      budget.maxGridSide,
      m.type === "scatter" ? stride : 1,
      // stacked bars depend on the other bar series
      m.type === "bar" ? stackHash(m) : "",
    ].join("|");
  };

  return (
    model: Model3D,
    colors: GeometryColors,
    budget: GeometryBudget,
    lutId: number,
  ): Geometry => {
    const next = new Map<string, CacheEntry>();
    const items: Item3D[] = [];
    const targets: PickTarget[] = [];
    const counts: number[] = [];
    // the CPU backend thins every cloud by the same stride
    let total = 0;
    for (const m of model.series)
      if (m.type === "scatter" && !m.hidden) total += m.cols.count;
    const stride = Math.max(1, Math.ceil(total / budget.maxPoints));
    for (const m of model.series) {
      const id = `${m.index}:${m.id}`;
      if (m.hidden) {
        counts.push(0);
        // keep the geometry while hidden: showing it again is instant
        const kept = cache.get(id);
        if (kept) next.set(id, kept);
        continue;
      }
      const signature = signatureOf(m, model, colors, budget, lutId, stride);
      let entry = cache.get(id);
      if (!entry || entry.signature !== signature) {
        entry = buildSeries(
          m,
          model,
          colors,
          budget,
          `s${id}`,
          ++version,
          signature,
          stride,
        );
      }
      next.set(id, entry);
      items.push(...entry.items);
      targets.push(...entry.target);
      counts.push(entry.count);
    }
    cache = next;
    return { items, targets, counts };
  };
};

const buildSeries = (
  m: SeriesModel,
  model: Model3D,
  colors: GeometryColors,
  budget: GeometryBudget,
  key: string,
  version: number,
  signature: string,
  /** Thinning of the scatter clouds (CPU backend) */
  stride = 1,
): CacheEntry => {
  switch (m.type) {
    case "surface": {
      const mesh = buildSurface(
        m,
        model,
        colors,
        budget,
        `${key}:mesh`,
        version,
      );
      const items: Item3D[] = [];
      if (mesh.mesh) items.push(mesh.mesh);
      const wire = m.series.wireframe;
      if (wire) {
        const o = wire === true ? {} : wire;
        const color = o.color
          ? packColor(colors.resolve(o.color))
          : packColor(colors.wire);
        items.push(buildWireframe(mesh, o, color, `${key}:wire`, version));
      }
      const contours = m.series.contours;
      if (contours) {
        const lines = buildContours(
          m,
          model,
          colors,
          contours === true ? {} : contours,
          `${key}:contours`,
          version,
        );
        if (lines) items.push(lines);
      }
      return {
        signature,
        items,
        target: [
          {
            kind: "surface",
            series: m.index,
            rows: mesh.rowIndex.length,
            cols: mesh.colIndex.length,
            positions: mesh.positions,
            rowIndex: mesh.rowIndex,
            colIndex: mesh.colIndex,
          },
        ],
        count: m.grid.rows * m.grid.cols,
      };
    }
    case "bar": {
      const { mesh, target } = buildBars(
        m,
        model,
        colors,
        `${key}:bars`,
        version,
      );
      return {
        signature,
        items: [mesh],
        target: [target],
        count: m.bars.count,
      };
    }
    case "line": {
      const size = m.series.pointSize ?? 0;
      const points = buildPoints(m, model, colors, size);
      const items: Item3D[] = [buildLine(m, points, `${key}:line`, version)];
      if (size > 0) {
        items.push({
          kind: "points",
          key: `${key}:points`,
          version,
          opacity: m.opacity,
          data: points.data,
          count: points.count,
          perspective: false,
        } satisfies PointsItem);
      }
      return {
        signature,
        items,
        target: [
          pointTarget(m.index, points, Math.max(size, m.series.lineWidth ?? 2)),
        ],
        count: points.count,
      };
    }
    default: {
      const size = m.series.pointSize ?? 6;
      const points = buildPoints(m, model, colors, size, stride);
      const style = m.series.pointStyle;
      return {
        signature,
        items: [
          {
            kind: "points",
            key: `${key}:points`,
            version,
            opacity: m.opacity,
            data: points.data,
            count: points.count,
            perspective: m.series.perspectiveSize ?? true,
            style:
              style === "glow"
                ? POINT_GLOW
                : style === "disc"
                  ? POINT_DISC
                  : POINT_SPHERE,
            additive: m.series.blend === "additive",
            thinned: stride,
          },
        ],
        target: [pointTarget(m.index, points, size)],
        // the size of the data, thinned or not
        count: stride > 1 ? m.cols.count : points.count,
      };
    }
  }
};

const pointTarget = (
  series: number,
  points: {
    data: ArrayBuffer;
    count: number;
    source: Uint32Array | null;
    sized: boolean;
  },
  defaultSize: number,
): PointTarget => ({
  kind: "points",
  series,
  positions: new Float32Array(points.data),
  stride: 5,
  count: points.count,
  sized: points.sized,
  defaultSize,
  source: points.source,
  packed: new Uint32Array(points.data),
});

const stackHash = (m: BarModel) => {
  let hash = m.bars.count;
  for (let i = 0; i < m.bars.count; i++) {
    hash = (hash * 31 + m.bars.z0[i] * 997 + m.bars.z1[i] * 13) % 1e12;
  }
  return String(hash);
};

/** CSS color of a packed color */
export const packedCss = (packed: number): string =>
  toCss([
    (packed & 0xff) / 255,
    ((packed >>> 8) & 0xff) / 255,
    ((packed >>> 16) & 0xff) / 255,
    ((packed >>> 24) & 0xff) / 255,
  ]);
