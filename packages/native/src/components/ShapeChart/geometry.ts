// Turns the recorded canvas operations into view primitives, without any
// drawing module:
// - circles, rings and rounded rectangles are views with a border radius;
// - a region bounded by arcs of one center (pie slice, donut segment, gauge
//   arc) is a disc / ring view clipped by half-planes: its outline with the
//   arcs replaced by polylines outside the outer circle and inside the inner
//   one, split in convex pieces;
// - other fills (radar areas, funnel stages, rounded polygons) are split in
//   convex pieces too, each the intersection of half-planes;
// - a half-plane is a square view with `overflow: hidden`, rotated so that
//   one side lies on the edge: nesting one per edge clips the piece. Edges
//   shared by two pieces overlap by half a pixel and translucent shapes are
//   drawn opaque in a group with the opacity, so no seam shows;
// - strokes are thin rotated views (round caps / joins: rounded ends), arcs
//   are bands, dashes are split like the canvas does;
// - texts keep the canvas anchor, alignment, baseline and rotation.

import {
  cssWithAlpha,
  opaqueCss,
  paintAt,
  type Color,
  type DrawOp,
  type FillOp,
  type Quad,
  type Segment,
  type StrokeOp,
  type Subpath,
  type TextOp,
} from "./recorder";

const TAU = Math.PI * 2;
/** Overlap of the pieces of one shape, in pixels */
const SEAM = 0.5;
/** Most views of one shape's half-planes */
const MAX_PIECES = 160;

export type Pt = [number, number];

/** A drawable view */
export type Prim =
  | {
      t: "box";
      x: number;
      y: number;
      w: number;
      h: number;
      color?: string;
      radius?: number;
      borderWidth?: number;
      borderColor?: string;
      /** Rotation around the center, radians */
      rotate?: number;
      shadow?: boolean;
    }
  | {
      /** Square clipping its children (`overflow: hidden`), rotated around its center */
      t: "clip";
      x: number;
      y: number;
      size: number;
      rotate: number;
      children: Prim[];
    }
  | { t: "group"; opacity: number; children: Prim[] }
  | {
      t: "text";
      text: string;
      x: number;
      y: number;
      size: number;
      weight: number;
      align: TextOp["align"];
      baseline: TextOp["baseline"];
      color: string;
      rotate: number;
      maxWidth?: number;
      halo?: string;
    };

/** Clipping base of a convex piece: everything, or a disc / ring */
type Base =
  | { t: "plane" }
  | { t: "disc"; cx: number; cy: number; r0: number; r1: number };

interface Piece {
  pts: Pt[];
  /** Per edge (pts[i] -> pts[i + 1]): shared with another piece of the shape */
  internal: boolean[];
  /** Outline half-planes trimming the overlap of the shared edges */
  guards: Plane[];
}

/** Half-plane n·p >= d (n: unit normal pointing inside) */
interface Plane {
  n: Pt;
  d: number;
}

const side = (plane: Plane, p: Pt) =>
  plane.n[0] * p[0] + plane.n[1] * p[1] - plane.d;

/** Half-plane of the line a-b containing `inside`, grown by `grow` px */
const planeOf = (a: Pt, b: Pt, inside: Pt, grow: number): Plane | null => {
  const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
  if (len < 1e-6) return null;
  let n: Pt = [-(b[1] - a[1]) / len, (b[0] - a[0]) / len];
  if (n[0] * (inside[0] - a[0]) + n[1] * (inside[1] - a[1]) < 0)
    n = [-n[0], -n[1]];
  return { n, d: n[0] * a[0] + n[1] * a[1] - grow };
};

const centroid = (pts: readonly Pt[]): Pt => [
  pts.reduce((s, p) => s + p[0], 0) / Math.max(1, pts.length),
  pts.reduce((s, p) => s + p[1], 0) / Math.max(1, pts.length),
];

const pt = (list: readonly Pt[], i: number) => list[i] as Pt;
const cross3 = (a: Pt, b: Pt, c: Pt) =>
  (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
const dist = (a: Pt, b: Pt) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const polar = (cx: number, cy: number, r: number, a: number): Pt => [
  cx + r * Math.cos(a),
  cy + r * Math.sin(a),
];
const rotate = (v: Pt, a: number): Pt => {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return [v[0] * c - v[1] * s, v[0] * s + v[1] * c];
};

export const area = (P: readonly Pt[]) => {
  let s = 0;
  for (let i = 0; i < P.length; i++) {
    const a = pt(P, i);
    const b = pt(P, (i + 1) % P.length);
    s += a[0] * b[1] - b[0] * a[1];
  }
  return s / 2;
};

// ---------------------------------------------------------------- paths

/** Segment of a subpath with explicit ends (implicit joins and closing included) */
type Item =
  | { t: "L"; from: Pt; to: Pt; q?: Quad }
  | { t: "A"; cx: number; cy: number; r: number; a0: number; a1: number };

/** Items of a filled (implicitly closed) or stroked subpath, zero-length segments dropped */
function itemsOf(sub: Subpath, close: boolean): Item[] {
  const out: Item[] = [];
  let at: Pt = [sub.x, sub.y];
  const line = (to: Pt, q?: Quad) => {
    if (dist(at, to) > 1e-3)
      out.push(q ? { t: "L", from: at, to, q } : { t: "L", from: at, to });
    at = to;
  };
  for (const s of sub.segs) {
    if (s.t === "L") line([s.x, s.y], s.q);
    else {
      line(polar(s.cx, s.cy, s.r, s.a0));
      out.push({ ...s });
      at = polar(s.cx, s.cy, s.r, s.a1);
    }
  }
  if (close) line([sub.x, sub.y]);
  return out;
}

/** Points of a subpath, arcs flattened to `tolerance` px */
function flatten(items: readonly Item[], start: Pt, tolerance = 0.2): Pt[] {
  const out: Pt[] = [start];
  for (const it of items) {
    if (it.t === "L") out.push(it.to);
    else {
      const sweep = it.a1 - it.a0;
      const step =
        it.r > tolerance
          ? Math.max(0.04, 2 * Math.acos(Math.max(-1, 1 - tolerance / it.r)))
          : Math.PI / 2;
      const n = Math.min(128, Math.max(1, Math.ceil(Math.abs(sweep) / step)));
      out.push(polar(it.cx, it.cy, it.r, it.a0));
      for (let k = 1; k <= n; k++)
        out.push(polar(it.cx, it.cy, it.r, it.a0 + (sweep * k) / n));
    }
  }
  return dedupe(out);
}

/** Drops repeated points (and the closing copy of the first) */
function dedupe(P: readonly Pt[], closed = true): Pt[] {
  const out: Pt[] = [];
  for (const p of P) {
    const last = out[out.length - 1];
    if (!last || dist(last, p) > 1e-3) out.push(p);
  }
  if (
    closed &&
    out.length > 1 &&
    dist(pt(out, 0), pt(out, out.length - 1)) <= 1e-3
  )
    out.pop();
  return out;
}

/** Drops the vertices between collinear edges */
function simplify(P: readonly Pt[]): Pt[] {
  let list = dedupe(P);
  let changed = true;
  while (changed && list.length > 3) {
    changed = false;
    for (let i = 0; i < list.length; i++) {
      const a = pt(list, (i - 1 + list.length) % list.length);
      const b = pt(list, i);
      const c = pt(list, (i + 1) % list.length);
      const scale = Math.max(dist(a, b), dist(b, c), 1e-9);
      const turn = cross3(a, b, c) / scale;
      const forward =
        (b[0] - a[0]) * (c[0] - b[0]) + (b[1] - a[1]) * (c[1] - b[1]) > 0;
      if (Math.abs(turn) < 1e-4 && forward) {
        list = list.filter((_, k) => k !== i);
        changed = true;
        break;
      }
    }
  }
  return list;
}

type ArcItem = Extract<Item, { t: "A" }>;

const isFull = (it: Item | undefined): it is ArcItem =>
  it?.t === "A" && Math.abs(it.a1 - it.a0) >= TAU - 1e-6;

// ---------------------------------------------------------- decomposition

/** Ear clipping of a simple polygon: triangles as indexes */
export function triangulate(P: readonly Pt[]): number[][] {
  const n = P.length;
  if (n < 3) return [];
  let idx = P.map((_, i) => i);
  if (area(P) < 0) idx = idx.reverse();
  const tris: number[][] = [];
  const inside = (p: Pt, a: Pt, b: Pt, c: Pt) =>
    cross3(a, b, p) > 1e-9 && cross3(b, c, p) > 1e-9 && cross3(c, a, p) > 1e-9;
  let guard = 0;
  while (idx.length > 3 && guard++ < n * n + 10) {
    let found = false;
    for (let k = 0; k < idx.length; k++) {
      const ia = idx[(k - 1 + idx.length) % idx.length] as number;
      const ib = idx[k] as number;
      const ic = idx[(k + 1) % idx.length] as number;
      const a = pt(P, ia);
      const b = pt(P, ib);
      const c = pt(P, ic);
      if (cross3(a, b, c) <= 1e-9) continue;
      let blocked = false;
      for (const iv of idx) {
        if (iv === ia || iv === ib || iv === ic) continue;
        const v = pt(P, iv);
        if (dist(v, a) < 1e-6 || dist(v, b) < 1e-6 || dist(v, c) < 1e-6)
          continue;
        if (inside(v, a, b, c)) {
          blocked = true;
          break;
        }
      }
      if (blocked) continue;
      tris.push([ia, ib, ic]);
      idx.splice(k, 1);
      found = true;
      break;
    }
    if (!found) {
      // degenerate (self-touching) outline: drop the flattest vertex
      let best = 0;
      let flat = Infinity;
      for (let k = 0; k < idx.length; k++) {
        const t = Math.abs(
          cross3(
            pt(P, idx[(k - 1 + idx.length) % idx.length] as number),
            pt(P, idx[k] as number),
            pt(P, idx[(k + 1) % idx.length] as number),
          ),
        );
        if (t < flat) {
          flat = t;
          best = k;
        }
      }
      idx.splice(best, 1);
    }
  }
  if (idx.length === 3) {
    const [ia, ib, ic] = idx as [number, number, number];
    if (cross3(pt(P, ia), pt(P, ib), pt(P, ic)) > 1e-9) tris.push([ia, ib, ic]);
  }
  return tris;
}

const convex = (V: readonly Pt[], poly: readonly number[]) => {
  for (let i = 0; i < poly.length; i++) {
    const a = pt(V, poly[(i - 1 + poly.length) % poly.length] as number);
    const b = pt(V, poly[i] as number);
    const c = pt(V, poly[(i + 1) % poly.length] as number);
    if (cross3(a, b, c) < -1e-7 * Math.max(1, dist(a, b) * dist(b, c)))
      return false;
  }
  return true;
};

/**
 * Merges triangles (indexes into V, positively oriented) into convex
 * pieces across their shared edges (Hertel-Mehlhorn)
 */
export function mergeConvex(
  V: readonly Pt[],
  tris: readonly number[][],
): Piece[] {
  const polys = tris.map((t) =>
    area(t.map((i) => pt(V, i))) < 0 ? [...t].reverse() : [...t],
  );
  let merged = true;
  while (merged) {
    merged = false;
    outer: for (let p = 0; p < polys.length; p++) {
      const A = polys[p] as number[];
      for (let i = 0; i < A.length; i++) {
        const a = A[i] as number;
        const b = A[(i + 1) % A.length] as number;
        for (let q = p + 1; q < polys.length; q++) {
          const B = polys[q] as number[];
          const j = B.findIndex(
            (v, k) => v === b && B[(k + 1) % B.length] === a,
          );
          if (j < 0) continue;
          // A from b around to a, then B strictly between a and b
          const ia = (i + 1) % A.length;
          const fromB: number[] = [];
          for (let k = 0; k < A.length; k++)
            fromB.push(A[(ia + k) % A.length] as number);
          const rest: number[] = [];
          for (let k = 2; k < B.length; k++)
            rest.push(B[(j + k) % B.length] as number);
          const candidate = [...fromB, ...rest];
          if (!convex(V, candidate)) continue;
          polys[p] = candidate;
          polys.splice(q, 1);
          merged = true;
          break outer;
        }
      }
    }
  }
  const edges = new Set<string>();
  for (const poly of polys)
    for (let i = 0; i < poly.length; i++)
      edges.add(`${poly[i]},${poly[(i + 1) % poly.length]}`);
  const internalOf = (poly: readonly number[]) =>
    poly.map((v, i) => edges.has(`${poly[(i + 1) % poly.length]},${v}`));
  // outline edges, with a point inside their piece
  const outline: { a: number; b: number; ref: Pt }[] = [];
  for (const poly of polys) {
    const ref = centroid(poly.map((i) => pt(V, i)));
    internalOf(poly).forEach((shared, i) => {
      if (!shared)
        outline.push({
          a: poly[i] as number,
          b: poly[(i + 1) % poly.length] as number,
          ref,
        });
    });
  }
  return polys.map((poly) => {
    const pts = poly.map((i) => pt(V, i));
    const internal = internalOf(poly);
    // the outline edges at the ends of the shared ones cut the overlap
    // where it would stick out of the shape (acute corners)
    const ends = new Set<number>();
    internal.forEach((shared, i) => {
      if (!shared) return;
      ends.add(poly[i] as number);
      ends.add(poly[(i + 1) % poly.length] as number);
    });
    const own = new Set(
      poly.map((v, i) => `${v},${poly[(i + 1) % poly.length]}`),
    );
    const guards: Plane[] = [];
    for (const e of outline) {
      if (!(ends.has(e.a) || ends.has(e.b)) || own.has(`${e.a},${e.b}`))
        continue;
      const plane = planeOf(pt(V, e.a), pt(V, e.b), e.ref, 0);
      if (plane && pts.every((p) => side(plane, p) >= -1e-6))
        guards.push(plane);
    }
    return { pts, internal, guards };
  });
}

/** Convex pieces of a simple polygon */
export function convexPieces(P: readonly Pt[]): Piece[] {
  const V = simplify(P);
  if (V.length < 3) return [];
  return mergeConvex(V, triangulate(V));
}

/** Convex pieces of a band between an outline and a hole around the same point */
function bandPieces(outer: readonly Pt[], hole: readonly Pt[]): Piece[] {
  const O = simplify(outer);
  const H = simplify(hole);
  if (O.length < 3 || H.length < 3) return convexPieces(outer);
  const sign = (P: Pt[]) => (area(P) < 0 ? [...P].reverse() : P);
  const o = sign(O);
  const h = sign(H);
  const c: Pt = [
    h.reduce((s, p) => s + p[0], 0) / h.length,
    h.reduce((s, p) => s + p[1], 0) / h.length,
  ];
  const unwrap = (P: Pt[]) => {
    const angles = P.map((p) => Math.atan2(p[1] - c[1], p[0] - c[0]));
    let first = 0;
    angles.forEach((a, i) => {
      if (a < (angles[first] as number)) first = i;
    });
    const order = P.map((_, k) => (first + k) % P.length);
    const out: number[] = [];
    let previous = -Infinity;
    for (const i of order) {
      let a = angles[i] as number;
      while (a < previous) a += TAU;
      out.push(a);
      previous = a;
    }
    out.push((out[0] as number) + TAU);
    return { order, angles: out };
  };
  const uo = unwrap(o);
  const uh = unwrap(h);
  const V: Pt[] = [...o, ...h];
  const oi = (k: number) => uo.order[k % o.length] as number;
  const hi = (k: number) => o.length + (uh.order[k % h.length] as number);
  const tris: number[][] = [];
  let i = 0;
  let j = 0;
  while (i < o.length || j < h.length) {
    const nextO = i < o.length ? (uo.angles[i + 1] as number) : Infinity;
    const nextH = j < h.length ? (uh.angles[j + 1] as number) : Infinity;
    if (nextO <= nextH) {
      tris.push([oi(i), oi(i + 1), hi(j)]);
      i++;
    } else {
      tris.push([oi(i), hi(j + 1), hi(j)]);
      j++;
    }
  }
  return mergeConvex(
    V,
    tris.filter((t) => Math.abs(area(t.map((k) => pt(V, k)))) > 1e-6),
  );
}

// -------------------------------------------------------------- clipping

/**
 * Views filling `base` clipped by half-planes: one rotated square with
 * `overflow: hidden` per plane, nested, its top side on the plane's line.
 * `ref` is a point of the drawn region, `extent` bounds the distance from
 * it to any point of the region.
 */
function clipViews(
  planes: readonly Plane[],
  base: Base,
  color: string,
  ref: Pt,
  extent: number,
): Prim[] {
  const kept: Plane[] = [];
  for (const plane of planes) {
    if (base.t === "disc") {
      const inset = side(plane, [base.cx, base.cy]);
      if (inset >= base.r1 - 1e-3) continue; // the whole disc is inside
      if (inset <= -base.r1) return []; // nothing left
    }
    kept.push(plane);
  }
  if (base.t === "plane" && !kept.length) return [];
  // whole pixels: the layout keeps the size (and the center it turns around)
  const size = Math.ceil(2 * extent + 8);
  const half = size / 2;

  const root: Prim[] = [];
  let into = root;
  let origin: Pt = [0, 0];
  let theta = 0;
  for (const { n, d } of kept) {
    const angle = Math.atan2(-n[0], n[1]);
    const u: Pt = [n[1], -n[0]];
    const off = n[0] * ref[0] + n[1] * ref[1] - d;
    const q: Pt = [ref[0] - off * n[0], ref[1] - off * n[1]];
    const o: Pt = [q[0] - half * u[0], q[1] - half * u[1]];
    const rel = angle - theta;
    const local = rotate([o[0] - origin[0], o[1] - origin[1]], -theta);
    const rh = rotate([half, half], rel);
    const clip: Prim = {
      t: "clip",
      x: local[0] - half + rh[0],
      y: local[1] - half + rh[1],
      size,
      rotate: rel,
      children: [],
    };
    into.push(clip);
    into = clip.children;
    origin = o;
    theta = angle;
  }
  if (base.t === "disc") {
    const c = rotate([base.cx - origin[0], base.cy - origin[1]], -theta);
    into.push({
      t: "box",
      x: c[0] - base.r1,
      y: c[1] - base.r1,
      w: base.r1 * 2,
      h: base.r1 * 2,
      radius: base.r1,
      ...(base.r0 > 0.25
        ? { borderWidth: base.r1 - base.r0, borderColor: color }
        : { color }),
    });
  } else into.push({ t: "box", x: 0, y: 0, w: size, h: size, color });
  return root;
}

/** Views drawing a convex piece of a shape */
function pieceViews(piece: Piece, base: Base, color: string): Prim[] {
  const { pts } = piece;
  if (pts.length < 3) return [];
  const ref = centroid(pts);
  const planes: Plane[] = [];
  pts.forEach((a, i) => {
    const b = pt(pts, (i + 1) % pts.length);
    const plane = planeOf(a, b, ref, piece.internal[i] ? SEAM : 0);
    if (plane) planes.push(plane);
  });
  planes.push(...piece.guards);
  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;
  for (const p of pts) {
    x0 = Math.min(x0, p[0]);
    y0 = Math.min(y0, p[1]);
    x1 = Math.max(x1, p[0]);
    y1 = Math.max(y1, p[1]);
  }
  if (base.t === "disc") {
    x0 = Math.max(x0, base.cx - base.r1);
    y0 = Math.max(y0, base.cy - base.r1);
    x1 = Math.min(x1, base.cx + base.r1);
    y1 = Math.min(y1, base.cy + base.r1);
  }
  if (!(x1 > x0 && y1 > y0)) return [];
  // the centroid may lie outside the disc: distances from it, generously;
  // the squares must also reach the guards (pieces cut in gradient bands are
  // much smaller than the outline they keep)
  let extent = 2 * Math.hypot(x1 - x0, y1 - y0) + SEAM;
  for (const guard of piece.guards)
    extent = Math.max(extent, side(guard, ref) + SEAM);
  return clipViews(planes, base, color, ref, extent);
}

// ------------------------------------------------------------ recognition

interface RoundRect {
  x: number;
  y: number;
  w: number;
  h: number;
  r: number;
}

/** An axis-aligned (rounded) rectangle */
function asRoundRect(items: readonly Item[]): RoundRect | null {
  const arcs = items.filter((it) => it.t === "A");
  if (arcs.length !== 0 && arcs.length !== 4) return null;
  let r = 0;
  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;
  const grow = (x: number, y: number) => {
    x0 = Math.min(x0, x);
    y0 = Math.min(y0, y);
    x1 = Math.max(x1, x);
    y1 = Math.max(y1, y);
  };
  for (const it of items) {
    if (it.t === "L") {
      const dx = Math.abs(it.to[0] - it.from[0]);
      const dy = Math.abs(it.to[1] - it.from[1]);
      if (dx > 1e-3 && dy > 1e-3) return null;
      grow(it.from[0], it.from[1]);
      grow(it.to[0], it.to[1]);
    } else {
      if (Math.abs(Math.abs(it.a1 - it.a0) - Math.PI / 2) > 0.02) return null;
      if (r && Math.abs(it.r - r) > 0.01) return null;
      r = it.r;
      grow(it.cx - it.r, it.cy - it.r);
      grow(it.cx + it.r, it.cy + it.r);
    }
  }
  if (!(x1 > x0 && y1 > y0)) return null;
  for (const it of items) {
    if (it.t === "A") {
      const nearX =
        Math.abs(it.cx - (x0 + r)) < 0.05 || Math.abs(it.cx - (x1 - r)) < 0.05;
      const nearY =
        Math.abs(it.cy - (y0 + r)) < 0.05 || Math.abs(it.cy - (y1 - r)) < 0.05;
      if (!nearX || !nearY) return null;
    } else {
      // every straight side lies on the box
      const onX = (x: number) =>
        Math.abs(x - x0) < 0.05 || Math.abs(x - x1) < 0.05;
      const onY = (y: number) =>
        Math.abs(y - y0) < 0.05 || Math.abs(y - y1) < 0.05;
      const vertical = Math.abs(it.to[0] - it.from[0]) <= 1e-3;
      if (vertical ? !onX(it.from[0]) : !onY(it.from[1])) return null;
    }
  }
  if (!arcs.length && items.length < 4) return null;
  return { x: x0, y: y0, w: x1 - x0, h: y1 - y0, r };
}

/**
 * A region bounded by arcs of one center (and straight / curved sides inside
 * the ring of those arcs): its ring and the outline to clip it with
 */
function asConcentric(
  items: readonly Item[],
): { base: Extract<Base, { t: "disc" }>; outline: Pt[] } | null {
  const arcs = items.filter((it): it is ArcItem => it.t === "A");
  const first = arcs[0];
  if (!first) return null;
  const { cx, cy } = first;
  let r1 = 0;
  for (const a of arcs) {
    if (Math.hypot(a.cx - cx, a.cy - cy) > 0.5) return null;
    r1 = Math.max(r1, a.r);
  }
  let r0 = 0;
  for (const a of arcs) {
    if (Math.abs(a.r - r1) <= 0.5) continue;
    if (r0 && Math.abs(a.r - r0) > 0.5) return null;
    r0 = a.r;
  }
  const c: Pt = [cx, cy];
  for (const it of items)
    if (it.t === "L")
      for (const p of [it.from, it.to]) {
        const d = dist(p, c);
        if (d > r1 + 0.5 || (r0 > 0 && d < r0 - 0.5)) return null;
      }
  const base = { t: "disc", cx, cy, r0, r1 } as const;
  return { base, outline: ringOutline(items, base) };
}

/** Outline of a region of a ring, its arcs replaced by polylines the ring view rounds */
function ringOutline(
  items: readonly Item[],
  { cx, cy, r1 }: Extract<Base, { t: "disc" }>,
): Pt[] {
  const outline: Pt[] = [];
  for (const it of items) {
    if (it.t === "L") {
      outline.push(it.from, it.to);
      continue;
    }
    const sweep = it.a1 - it.a0;
    if (Math.abs(it.r - r1) <= 0.5) {
      // tangents outside the outer circle: the disc does the rounding
      const n = Math.max(1, Math.ceil(Math.abs(sweep) / (Math.PI / 4)));
      const step = sweep / n;
      const far = r1 / Math.cos(step / 2);
      outline.push(polar(cx, cy, r1, it.a0));
      for (let k = 0; k < n; k++) {
        outline.push(polar(cx, cy, far, it.a0 + (k + 0.5) * step));
        outline.push(polar(cx, cy, r1, it.a0 + (k + 1) * step));
      }
    } else {
      // chords inside the inner circle: the ring does the rounding
      const n = Math.max(1, Math.ceil(Math.abs(sweep) / (Math.PI / 2)));
      for (let k = 0; k <= n; k++)
        outline.push(polar(cx, cy, it.r, it.a0 + (sweep * k) / n));
    }
  }
  return outline;
}

const ringBox = (
  cx: number,
  cy: number,
  r1: number,
  r0: number,
  color: string,
): Prim => ({
  t: "box",
  x: cx - r1,
  y: cy - r1,
  w: r1 * 2,
  h: r1 * 2,
  radius: r1,
  ...(r0 > 0.25 ? { borderWidth: r1 - r0, borderColor: color } : { color }),
});

/**
 * A sector of a ring between two straight sides (pie slices, donut segments,
 * gauge arcs, with or without gaps): the ring clipped by the two sides (two
 * halves split on the bisector past half a turn). Rounded corners are
 * handled by `roundedWedge`. `null` when the outline is something else.
 */
function wedgeViews(
  items: readonly Item[],
  base: Extract<Base, { t: "disc" }>,
  color: string,
  /** Grows the straight sides (round caps cover them) */
  grow = 0,
): Prim[] | null {
  const { cx, cy, r0, r1 } = base;
  const c: Pt = [cx, cy];
  const arcs = items.filter((it): it is ArcItem => it.t === "A");
  const outer = arcs.filter((a) => Math.abs(a.r - r1) <= 0.5);
  const arc = outer[0];
  if (!arc || outer.length !== 1 || arcs.length - outer.length > 1) return null;
  const a0 = Math.min(arc.a0, arc.a1);
  const a1 = Math.max(arc.a0, arc.a1);
  const span = a1 - a0;
  if (span >= TAU - 1e-3) return null;
  // the straight sides: radial segments, by the end of the arc they are at
  const gap = (a: number, b: number) => {
    const d = Math.abs(a - b) % TAU;
    return Math.min(d, TAU - d);
  };
  let start: Extract<Item, { t: "L" }> | null = null;
  let end: Extract<Item, { t: "L" }> | null = null;
  const length = (s: Extract<Item, { t: "L" }>) => dist(s.from, s.to);
  for (const it of items) {
    if (it.t !== "L" || length(it) < 0.3) continue;
    const far = dist(it.from, c) > dist(it.to, c) ? it.from : it.to;
    const rf = dist(far, c);
    if (rf < 0.5) continue;
    const dx = (it.to[0] - it.from[0]) / length(it);
    const dy = (it.to[1] - it.from[1]) / length(it);
    const rx = (far[0] - cx) / rf;
    const ry = (far[1] - cy) / rf;
    if (Math.abs(dx * ry - dy * rx) > 0.14) continue; // not radial (8°)
    const phi = Math.atan2(far[1] - cy, far[0] - cx);
    if (gap(phi, a0) <= gap(phi, a1)) {
      if (!start || length(it) > length(start)) start = it;
    } else if (!end || length(it) > length(end)) end = it;
  }
  if (!start || !end) return null;
  const mid = (a0 + a1) / 2;
  const rm = r0 > 0 ? (r0 + r1) / 2 : r1 / 2;
  const probe = polar(cx, cy, rm, mid);
  const hs = planeOf(start.from, start.to, probe, grow);
  const he = planeOf(end.from, end.to, probe, grow);
  if (!hs || !he || side(hs, probe) <= 0 || side(he, probe) <= 0) return null;
  const extent = 2 * r1 + SEAM;
  if (span <= Math.PI - 1e-3)
    return clipViews([hs, he], base, color, probe, extent);
  // past half a turn: the halves on each side of the bisector
  const axis: Pt = [cx + Math.cos(mid), cy + Math.sin(mid)];
  const p1 = polar(cx, cy, rm, a0 + span / 4);
  const p2 = polar(cx, cy, rm, a1 - span / 4);
  const m1 = planeOf(c, axis, p1, SEAM);
  const m2 = planeOf(c, axis, p2, SEAM);
  if (!m1 || !m2) return null;
  return [
    ...clipViews([hs, m1], base, color, p1, extent),
    ...clipViews([he, m2], base, color, p2, extent),
  ];
}

/** A rounded corner: a circle tangent to a straight side and to a ring circle */
interface Fillet {
  o: Pt;
  r: number;
  /** Tangent points on the side and on the circle */
  side: Pt;
  ring: Pt;
}

/**
 * The fillet of the corner between a side (the line through `p`, `n` its
 * normal pointing inside) and the circle of radius `R` around `c` (the
 * fillet inside it for the outer edge, outside it for the inner one),
 * touching the side at `p`, its radius at most `limit`. `null` when too
 * small to show.
 */
function filletAt(
  c: Pt,
  p: Pt,
  n: Pt,
  R: number,
  outer: boolean,
  limit: number,
): Fillet | null {
  const rel: Pt = [p[0] - c[0], p[1] - c[1]];
  const sn = rel[0] * n[0] + rel[1] * n[1];
  let u: Pt = [n[1], -n[0]];
  if (rel[0] * u[0] + rel[1] * u[1] < 0) u = [-u[0], -u[1]];
  const s2 = rel[0] * rel[0] + rel[1] * rel[1];
  const den = 2 * (outer ? R + sn : R - sn);
  if (den <= 1e-6) return null;
  const r = Math.min(limit, (outer ? R * R - s2 : s2 - R * R) / den);
  if (!(r > 0.5)) return null;
  // |center - c| = R ∓ r, the center at r from the side
  const reach = outer ? R - r : R + r;
  const t2 = reach * reach - (sn + r) * (sn + r);
  if (t2 <= 0) return null;
  const t = Math.sqrt(t2);
  const at = (k: number): Pt => [
    c[0] + t * u[0] + k * n[0],
    c[1] + t * u[1] + k * n[1],
  ];
  const o = at(sn + r);
  const scale = R / reach;
  return {
    o,
    r,
    side: at(sn),
    ring: [c[0] + (o[0] - c[0]) * scale, c[1] + (o[1] - c[1]) * scale],
  };
}

/**
 * The rounded corners of a sector (pie, donut and sunburst slices with a
 * corner radius). The canvas path rounds each corner with a quadratic curve
 * from a side to an arc (control point on the arc's circle), its radius
 * already clamped to half the thickness and to the arc length: here a
 * circle tangent to the side at the same point and to the arc's circle,
 * within 7% of the radius of that curve. The outline with the corners cut
 * by the chords of the fillets is clipped as convex pieces of the ring, and
 * a disc per fillet covers its chord (both sides of the chord are painted:
 * no seam). `null` without such corners or when something does not match
 * (the caller then clips the flattened outline).
 */
function roundedWedge(
  items: readonly Item[],
  base: Extract<Base, { t: "disc" }>,
  color: string,
): Prim[] | null {
  const { cx, cy, r0, r1 } = base;
  const c: Pt = [cx, cy];
  const limit = (r1 - r0) / 2;
  /** Radius of the ring circle `p` is on, 0 if none */
  const circleOf = (p: Pt) => {
    const d = dist(p, c);
    if (Math.abs(d - r1) <= 0.5) return r1;
    return r0 > 0 && Math.abs(d - r0) <= 0.5 ? r0 : 0;
  };
  interface Corner {
    fillet: Fillet;
    plane: Plane;
    /** The curve goes from the side to the circle */
    sideFirst: boolean;
  }
  const corners = new Map<Quad, Corner>();
  for (const it of items) {
    if (it.t !== "L" || !it.q || corners.has(it.q)) continue;
    const q = it.q;
    const R = circleOf(q.ctrl);
    if (!R) return null;
    const sideFirst = circleOf(q.from) !== R;
    const S = sideFirst ? q.from : q.to;
    const E = sideFirst ? q.to : q.from;
    if (circleOf(E) !== R || circleOf(S) === R) return null;
    const plane = planeOf(S, q.ctrl, E, 0);
    const fillet = plane && filletAt(c, S, plane.n, R, R === r1, limit);
    if (!plane || !fillet) return null;
    corners.set(q, { fillet, plane, sideFirst });
  }
  if (!corners.size) return null;

  // the outline: each curve replaced by the chord of its fillet
  const outline: Item[] = [];
  let last: Quad | undefined;
  for (const it of items) {
    const q = it.t === "L" ? it.q : undefined;
    if (q !== last && q) {
      const { fillet, sideFirst } = corners.get(q) as Corner;
      const [from, to] = sideFirst
        ? [fillet.side, fillet.ring]
        : [fillet.ring, fillet.side];
      outline.push({ t: "L", from, to });
    } else if (!q) outline.push(it);
    last = q;
  }
  // the arcs now end at the fillets
  const wrap = (a: number) => a - TAU * Math.round(a / TAU);
  const angle = (p: Pt) => Math.atan2(p[1] - cy, p[0] - cx);
  const ends = (it: Item): [Pt, Pt] =>
    it.t === "L"
      ? [it.from, it.to]
      : [polar(it.cx, it.cy, it.r, it.a0), polar(it.cx, it.cy, it.r, it.a1)];
  const n = outline.length;
  const arcs = outline.map((it, i): Item => {
    if (it.t !== "A") return it;
    const before = ends(outline[(i - 1 + n) % n] as Item)[1];
    const after = ends(outline[(i + 1) % n] as Item)[0];
    const a0 =
      Math.abs(dist(before, c) - it.r) <= 0.5
        ? it.a0 + wrap(angle(before) - it.a0)
        : it.a0;
    const a1 =
      Math.abs(dist(after, c) - it.r) <= 0.5
        ? it.a1 + wrap(angle(after) - it.a1)
        : it.a1;
    return { ...it, a0, a1 };
  });
  if (
    arcs.some(
      (it, i) =>
        it.t === "A" &&
        (it.a1 - it.a0) *
          ((outline[i] as ArcItem).a1 - (outline[i] as ArcItem).a0) <
          0,
    )
  )
    return null;

  const views = piecesViews(convexPieces(ringOutline(arcs, base)), base, color);
  const planes = [...corners.values()].map((k) => k.plane);
  // a slice of at most half a turn is the intersection of its sides: there
  // the other side may cut a fillet (thin slices)
  const convex = [...corners.values()].every(({ fillet }) =>
    planes.every((p) => side(p, fillet.side) >= -0.5),
  );
  for (const { fillet: f } of corners.values())
    views.push(
      ...clipViews(
        convex ? planes : [],
        { t: "disc", cx: f.o[0], cy: f.o[1], r0: 0, r1: f.r },
        color,
        f.o,
        2 * f.r + SEAM,
      ),
    );
  return views;
}

const roundBox = (r: RoundRect, color: string, shadow: boolean): Prim => ({
  t: "box",
  x: r.x,
  y: r.y,
  w: r.w,
  h: r.h,
  color,
  ...(r.r > 0 ? { radius: r.r } : null),
  ...(shadow ? { shadow } : null),
});

function piecesViews(
  pieces: readonly Piece[],
  base: Base,
  color: string,
): Prim[] {
  const out: Prim[] = [];
  for (const piece of pieces.slice(0, MAX_PIECES))
    out.push(...pieceViews(piece, base, color));
  return out;
}

/** Views filling the subpaths with one opaque color (nonzero rule) */
export function regionViews(
  paths: readonly Subpath[],
  color: string,
  shadow = false,
): Prim[] {
  const subs = paths
    .map((sub) => ({ start: [sub.x, sub.y] as Pt, items: itemsOf(sub, true) }))
    .filter((s) => s.items.length > 0);
  if (!subs.length) return [];

  // full circles: a disc, or a ring with the hole
  if (subs.every((s) => s.items.length === 1 && isFull(s.items[0]))) {
    const circles = subs.map((s) => s.items[0] as ArcItem);
    const [a, b] = circles;
    if (
      a &&
      b &&
      circles.length === 2 &&
      Math.hypot(a.cx - b.cx, a.cy - b.cy) < 0.5 &&
      Math.abs(a.r - b.r) > 0.25 &&
      a.a1 - a.a0 > 0 !== b.a1 - b.a0 > 0
    )
      return [
        ringBox(a.cx, a.cy, Math.max(a.r, b.r), Math.min(a.r, b.r), color),
      ];
    return circles.map((c) => ringBox(c.cx, c.cy, c.r, 0, color));
  }

  const firstSub = subs[0];
  if (subs.length === 1 && firstSub) {
    const box = asRoundRect(firstSub.items);
    if (box) return [roundBox(box, color, shadow)];
    const ring = asConcentric(firstSub.items);
    const views =
      ring &&
      (roundedWedge(firstSub.items, ring.base, color) ??
        wedgeViews(firstSub.items, ring.base, color));
    if (views) return views;
  }

  const out: Prim[] = [];
  for (const part of regionParts(subs))
    out.push(...piecesViews(part.pieces, part.base, color));
  return out;
}

interface Part {
  pieces: Piece[];
  base: Base;
}

/** Convex pieces of closed subpaths (nonzero rule), on their clipping base */
function regionParts(subs: readonly { start: Pt; items: Item[] }[]): Part[] {
  const firstSub = subs[0];
  if (subs.length === 1 && firstSub) {
    const ring = asConcentric(firstSub.items);
    if (ring) return [{ pieces: convexPieces(ring.outline), base: ring.base }];
  }
  const polys = subs.map((s) => flatten(s.items, s.start));
  // an outline and a hole wound the other way (radar rings)
  const [outer, hole] = polys;
  if (
    polys.length === 2 &&
    outer &&
    hole &&
    area(outer) * area(hole) < 0 &&
    contains(outer, hole)
  )
    return [{ pieces: bandPieces(outer, hole), base: { t: "plane" } }];
  return polys.map((poly) => ({
    pieces: convexPieces(poly),
    base: { t: "plane" },
  }));
}

/** Most bands of a gradient fill */
const MAX_BANDS = 8;
/** Most convex pieces of a gradient fill, all bands together */
const MAX_BAND_PIECES = 240;

/**
 * Keeps the part of a convex piece where `t(p) = n·p` lies in [lo, hi]; the
 * new edges are shared with the neighbor bands (they overlap by the seam)
 */
function clipPiece(piece: Piece, n: Pt, lo: number, hi: number): Piece | null {
  let pts = piece.pts;
  let internal = piece.internal;
  const cut = (inside: (p: Pt) => number) => {
    const P: Pt[] = [];
    const I: boolean[] = [];
    pts.forEach((a, i) => {
      const b = pt(pts, (i + 1) % pts.length);
      const sa = inside(a);
      const sb = inside(b);
      const flag = internal[i] ?? false;
      const at = (): Pt => {
        const k = sa / (sa - sb);
        return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k];
      };
      if (sa >= 0) {
        P.push(a);
        I.push(flag);
        if (sb < 0) {
          P.push(at());
          I.push(true);
        }
      } else if (sb >= 0) {
        P.push(at());
        I.push(flag);
      }
    });
    pts = P;
    internal = I;
  };
  const t = (p: Pt) => n[0] * p[0] + n[1] * p[1];
  if (Number.isFinite(lo)) cut((p) => t(p) - lo);
  if (Number.isFinite(hi)) cut((p) => hi - t(p));
  // repeated points: the kept one takes the flag of the edge leaving the run
  const kept: Pt[] = [];
  const flags: boolean[] = [];
  pts.forEach((p, i) => {
    const last = kept[kept.length - 1];
    if (last && dist(last, p) <= 1e-3)
      flags[flags.length - 1] = internal[i] ?? true;
    else {
      kept.push(p);
      flags.push(internal[i] ?? true);
    }
  });
  while (
    kept.length > 1 &&
    dist(pt(kept, 0), pt(kept, kept.length - 1)) <= 1e-3
  ) {
    kept.pop();
    flags.pop();
  }
  if (kept.length < 3 || Math.abs(area(kept)) < 0.05) return null;
  return { pts: kept, internal: flags, guards: piece.guards };
}

/**
 * Views filling the subpaths with a linear gradient: bands across its axis,
 * each of the color at its middle, overlapping their neighbors by the seam.
 * `null` when one color is enough.
 */
function gradientViews(
  paths: readonly Subpath[],
  colorAt: (p: Pt) => string,
  g: { x0: number; y0: number; x1: number; y1: number },
  delta: number,
): Prim[] | null {
  const len = Math.hypot(g.x1 - g.x0, g.y1 - g.y0);
  if (len < 2 || delta < 8) return null;
  const n: Pt = [(g.x1 - g.x0) / len, (g.y1 - g.y0) / len];
  const t0 = n[0] * g.x0 + n[1] * g.y0;
  const subs = paths
    .map((sub) => ({ start: [sub.x, sub.y] as Pt, items: itemsOf(sub, true) }))
    .filter((s) => s.items.length > 0);
  const parts = regionParts(subs);
  let lo = Infinity;
  let hi = -Infinity;
  for (const part of parts)
    for (const piece of part.pieces)
      for (const p of piece.pts) {
        const t = n[0] * p[0] + n[1] * p[1] - t0;
        lo = Math.min(lo, t);
        hi = Math.max(hi, t);
      }
  // the colors only change between the ends of the axis
  const a = Math.min(Math.max(0, lo), hi);
  const b = Math.min(Math.max(len, lo), hi);
  const count = Math.min(
    MAX_BANDS,
    Math.ceil(delta / 20),
    Math.floor((b - a) / 6),
  );
  if (count < 2) return null;
  const out: Prim[] = [];
  let budget = MAX_BAND_PIECES;
  for (let k = 0; k < count && budget > 0; k++) {
    const from = k === 0 ? -Infinity : t0 + a + ((b - a) * k) / count;
    const to =
      k === count - 1 ? Infinity : t0 + a + ((b - a) * (k + 1)) / count;
    const mid = t0 + a + ((b - a) * (k + 0.5)) / count;
    const color = colorAt([n[0] * mid, n[1] * mid]);
    for (const part of parts)
      for (const piece of part.pieces) {
        if (budget <= 0) break;
        const ts = piece.pts.map((p) => n[0] * p[0] + n[1] * p[1]);
        if (Math.max(...ts) <= from || Math.min(...ts) >= to) continue;
        const band = clipPiece(piece, n, from, to);
        if (!band) continue;
        budget--;
        out.push(...pieceViews(band, part.base, color));
      }
  }
  return out;
}

function contains(outer: readonly Pt[], inner: readonly Pt[]) {
  const box = (P: readonly Pt[]) => {
    let x0 = Infinity;
    let y0 = Infinity;
    let x1 = -Infinity;
    let y1 = -Infinity;
    for (const p of P) {
      x0 = Math.min(x0, p[0]);
      y0 = Math.min(y0, p[1]);
      x1 = Math.max(x1, p[0]);
      y1 = Math.max(y1, p[1]);
    }
    return { x0, y0, x1, y1 };
  };
  const a = box(outer);
  const b = box(inner);
  return (
    b.x0 >= a.x0 - 0.5 &&
    b.y0 >= a.y0 - 0.5 &&
    b.x1 <= a.x1 + 0.5 &&
    b.y1 <= a.y1 + 0.5
  );
}

// ---------------------------------------------------------------- strokes

/** Splits a polyline into its dashes (canvas `setLineDash`) */
export function dashPolyline(
  points: readonly Pt[],
  dash: readonly number[],
): Pt[][] {
  let pattern = dash.filter((v) => Number.isFinite(v) && v >= 0);
  if (pattern.length % 2) pattern = [...pattern, ...pattern];
  const period = pattern.reduce((a, b) => a + b, 0);
  if (!pattern.length || period <= 0) return [points.slice()];
  let total = 0;
  for (let i = 1; i < points.length; i++)
    total += dist(pt(points, i - 1), pt(points, i));
  // keeps the number of views bounded
  const scale = total / period > 300 ? total / period / 300 : 1;
  const out: Pt[][] = [];
  let k = 0;
  let left = (pattern[0] as number) * scale;
  let on = true;
  let run: Pt[] = [pt(points, 0)];
  for (let i = 1; i < points.length; i++) {
    let a = pt(points, i - 1);
    const b = pt(points, i);
    let len = dist(a, b);
    while (len > 1e-9) {
      const step = Math.min(left, len);
      const t = step / len;
      const p: Pt = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
      if (on) run.push(p);
      a = p;
      len -= step;
      left -= step;
      if (left <= 1e-9) {
        if (on && run.length > 1) out.push(run);
        on = !on;
        k = (k + 1) % pattern.length;
        left = Math.max((pattern[k] as number) * scale, on ? 0 : 0.5);
        run = [p];
      }
    }
  }
  if (on && run.length > 1) out.push(run);
  return out;
}

const segmentBox = (
  a: Pt,
  b: Pt,
  width: number,
  color: string,
  cap: StrokeOp["cap"],
): Prim => {
  const extra = cap === "butt" ? 0 : width;
  const length = dist(a, b) + extra;
  return {
    t: "box",
    x: (a[0] + b[0]) / 2 - length / 2,
    y: (a[1] + b[1]) / 2 - width / 2,
    w: length,
    h: width,
    color,
    ...(cap === "round" ? { radius: width / 2 } : null),
    rotate: Math.atan2(b[1] - a[1], b[0] - a[0]),
  };
};

const dotBox = (p: Pt, d: number, color: string): Prim => ({
  t: "box",
  x: p[0] - d / 2,
  y: p[1] - d / 2,
  w: d,
  h: d,
  radius: d / 2,
  color,
});

/** Views of a stroke; `colorAt` gives the opaque color around a point */
function strokeViews(op: StrokeOp, colorAt: (p: Pt) => string): Prim[] {
  const w = op.width;
  const subs = op.paths
    .map((sub) => ({
      start: [sub.x, sub.y] as Pt,
      items: itemsOf(sub, sub.closed),
      closed: sub.closed,
    }))
    .filter((s) => s.items.length > 0);
  if (!subs.length || !(w > 0)) return [];
  const plain = !op.paint.gradient && op.dash.length === 0;
  const first = subs[0];
  if (plain && subs.length === 1 && first) {
    const { items } = first;
    const only = items[0];
    // a circle: a ring view
    if (items.length === 1 && only && isFull(only))
      return [
        ringBox(
          only.cx,
          only.cy,
          only.r + w / 2,
          Math.max(0, only.r - w / 2),
          colorAt([only.cx, only.cy]),
        ),
      ];
    // an arc: a band (the region of its outline), with its caps
    if (items.length === 1 && only?.t === "A") {
      const ro = only.r + w / 2;
      const ri = only.r - w / 2;
      const color = colorAt([only.cx, only.cy]);
      const band: Subpath = {
        ...pointAt(only.cx, only.cy, ro, only.a0),
        closed: true,
        segs: [
          { t: "A", cx: only.cx, cy: only.cy, r: ro, a0: only.a0, a1: only.a1 },
          ri > 0.25
            ? {
                t: "A",
                cx: only.cx,
                cy: only.cy,
                r: ri,
                a0: only.a1,
                a1: only.a0,
              }
            : { t: "L", x: only.cx, y: only.cy },
        ] as Segment[],
      };
      const round = op.cap === "round";
      const ring = asConcentric(itemsOf(band, true));
      const views =
        (ring &&
          wedgeViews(
            itemsOf(band, true),
            ring.base,
            color,
            round ? SEAM : 0,
          )) ||
        regionViews([band], color);
      if (round)
        views.push(
          dotBox(polar(only.cx, only.cy, only.r, only.a0), w, color),
          dotBox(polar(only.cx, only.cy, only.r, only.a1), w, color),
        );
      return views;
    }
    // a rounded rectangle: a bordered view
    if (first.closed) {
      const box = asRoundRect(items);
      if (box)
        return [
          {
            t: "box",
            x: box.x - w / 2,
            y: box.y - w / 2,
            w: box.w + w,
            h: box.h + w,
            radius: box.r > 0 ? box.r + w / 2 : 0,
            borderWidth: w,
            borderColor: colorAt([box.x, box.y]),
          },
        ];
    }
  }
  const out: Prim[] = [];
  for (const sub of subs) {
    const flat = flatten(sub.items, sub.start, 0.25);
    const line = dedupe(sub.closed ? [...flat, pt(flat, 0)] : flat, false);
    if (line.length < 2) continue;
    const runs = op.dash.length ? dashPolyline(line, op.dash) : [line];
    for (const run of runs) {
      const n = run.length;
      const closedRun = n > 2 && dist(pt(run, 0), pt(run, n - 1)) < 1e-3;
      // joins of butt-capped strokes: thin ones and sharp corners get a
      // round dot; the gentle bends of wide strokes (sankey links) extend
      // the segments over the gap instead (a dot as wide as the stroke would
      // bulge out of a curved ribbon)
      const extend = new Array<number>(n).fill(0);
      const dots: number[] = [];
      if (op.cap !== "round" && w >= 1.5)
        for (let i = closedRun ? 0 : 1; i < n - 1; i++) {
          const prev = pt(run, i === 0 ? n - 2 : i - 1);
          const at = pt(run, i);
          const next = pt(run, i + 1);
          const l1 = dist(prev, at);
          const l2 = dist(at, next);
          const cos =
            l1 > 1e-9 && l2 > 1e-9
              ? ((at[0] - prev[0]) * (next[0] - at[0]) +
                  (at[1] - prev[1]) * (next[1] - at[1])) /
                (l1 * l2)
              : 1;
          const turn = Math.acos(Math.max(-1, Math.min(1, cos)));
          if (op.cap === "butt" && w >= 6 && turn < Math.PI / 4) {
            extend[i] = (w / 2) * Math.tan(turn / 2) + 0.5;
            if (i === 0) extend[n - 1] = extend[0] as number;
          } else dots.push(i);
        }
      for (let i = 1; i < n; i++) {
        let a = pt(run, i - 1);
        let b = pt(run, i);
        const length = dist(a, b);
        const e0 = extend[i - 1] as number;
        const e1 = extend[i] as number;
        if (length > 1e-9 && (e0 > 0 || e1 > 0)) {
          const ux = (b[0] - a[0]) / length;
          const uy = (b[1] - a[1]) / length;
          a = [a[0] - ux * e0, a[1] - uy * e0];
          b = [b[0] + ux * e1, b[1] + uy * e1];
        }
        const mid: Pt = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
        out.push(segmentBox(a, b, w, colorAt(mid), op.cap));
      }
      for (const i of dots)
        out.push(dotBox(pt(run, i), w, colorAt(pt(run, i))));
    }
  }
  return out;
}

const pointAt = (cx: number, cy: number, r: number, a: number) => {
  const [x, y] = polar(cx, cy, r, a);
  return { x, y };
};

// ------------------------------------------------------------------- ops

const wrap = (views: Prim[], opacity: number): Prim[] => {
  if (!views.length) return [];
  if (opacity >= 0.999) return views;
  return [{ t: "group", opacity, children: views }];
};

const boundsCenter = (paths: readonly Subpath[]): Pt => {
  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;
  for (const sub of paths) {
    const grow = (x: number, y: number) => {
      x0 = Math.min(x0, x);
      y0 = Math.min(y0, y);
      x1 = Math.max(x1, x);
      y1 = Math.max(y1, y);
    };
    grow(sub.x, sub.y);
    for (const s of sub.segs) {
      if (s.t === "L") grow(s.x, s.y);
      else {
        grow(s.cx - s.r, s.cy - s.r);
        grow(s.cx + s.r, s.cy + s.r);
      }
    }
  }
  return Number.isFinite(x0) ? [(x0 + x1) / 2, (y0 + y1) / 2] : [0, 0];
};

function fillOp(op: FillOp): Prim[] {
  const { paint } = op;
  const stops = paint.gradient?.stops ?? [];
  if (paint.gradient && stops.length > 1) {
    const alpha = Math.max(...stops.map((s) => s.color.a));
    const opacity = alpha * op.alpha;
    if (opacity <= 0.002) return [];
    let delta = 0;
    for (const s of stops) {
      const c = stops[0]?.color ?? s.color;
      delta = Math.max(
        delta,
        Math.abs(s.color.r - c.r),
        Math.abs(s.color.g - c.g),
        Math.abs(s.color.b - c.b),
        Math.abs(s.color.a - c.a) * 255,
      );
    }
    const views = gradientViews(
      op.paths,
      (p) => {
        const c = paintAt(paint, p[0], p[1]);
        return alpha > 0 && c.a < alpha - 1e-3
          ? cssWithAlpha(c, 1 / alpha)
          : opaqueCss(c);
      },
      paint.gradient,
      delta,
    );
    if (views) return wrap(views, opacity);
  }
  const color: Color = paintAt(paint, ...boundsCenter(op.paths));
  const opacity = color.a * op.alpha;
  if (opacity <= 0.002) return [];
  return wrap(regionViews(op.paths, opaqueCss(color), op.shadow), opacity);
}

function strokeOp(op: StrokeOp): Prim[] {
  const { paint } = op;
  let alpha = paint.color.a;
  if (paint.gradient?.stops.length)
    alpha = Math.max(...paint.gradient.stops.map((s) => s.color.a));
  const opacity = alpha * op.alpha;
  if (opacity <= 0.002) return [];
  const colorAt = (p: Pt) => {
    const c = paintAt(paint, p[0], p[1]);
    // gradient stops of different alphas: folded into the opaque color
    return paint.gradient && alpha > 0 && c.a < alpha - 1e-3
      ? cssWithAlpha(c, 1 / alpha)
      : opaqueCss(c);
  };
  return wrap(strokeViews(op, colorAt), opacity);
}

function textOp(op: TextOp): Prim[] {
  if (!op.text || op.alpha * op.color.a <= 0.002) return [];
  return [
    {
      t: "text",
      text: op.text,
      x: op.x,
      y: op.y,
      size: op.size,
      weight: op.weight,
      align: op.align,
      baseline: op.baseline,
      color: cssWithAlpha(op.color, op.alpha),
      rotate: op.rotate,
      ...(op.maxWidth !== undefined ? { maxWidth: op.maxWidth } : null),
      ...(op.halo ? { halo: cssWithAlpha(op.halo, op.alpha) } : null),
    },
  ];
}

/** Views of a recorded frame, in drawing order */
export function framePrims(ops: readonly DrawOp[]): Prim[] {
  const out: Prim[] = [];
  for (const op of ops) {
    if (op.kind === "fill") out.push(...fillOp(op));
    else if (op.kind === "stroke") out.push(...strokeOp(op));
    else out.push(...textOp(op));
  }
  return out;
}
