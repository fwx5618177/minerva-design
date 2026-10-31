// Edge geometry in layout units: curves sampled into polylines, trimming at
// the node boundaries, arrowheads and dashes. Polylines are flat
// `[x0, y0, x1, y1, …]` arrays.

/** Points of a cubic Bézier (the start point excluded) */
export const cubicPoints = (
  out: number[],
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number,
): void => {
  const length =
    Math.hypot(x1 - x0, y1 - y0) +
    Math.hypot(x2 - x1, y2 - y1) +
    Math.hypot(x3 - x2, y3 - y2);
  const segments = Math.max(4, Math.min(28, Math.ceil(length / 10)));
  for (let i = 1; i <= segments; i++) {
    const t = i / segments;
    const u = 1 - t;
    const a = u * u * u;
    const b = 3 * u * u * t;
    const c = 3 * u * t * t;
    const d = t * t * t;
    out.push(
      a * x0 + b * x1 + c * x2 + d * x3,
      a * y0 + b * y1 + c * y2 + d * y3,
    );
  }
};

/** Points of a quadratic Bézier (the start point included) */
export const quadraticPath = (
  x0: number,
  y0: number,
  cx: number,
  cy: number,
  x1: number,
  y1: number,
): number[] => {
  const out = [x0, y0];
  cubicPoints(
    out,
    x0,
    y0,
    x0 + ((cx - x0) * 2) / 3,
    y0 + ((cy - y0) * 2) / 3,
    x1 + ((cx - x1) * 2) / 3,
    y1 + ((cy - y1) * 2) / 3,
    x1,
    y1,
  );
  return out;
};

/**
 * Smooth path through waypoints whose tangents follow the flow axis
 * (vertical for top → bottom layouts): C1 at every waypoint
 */
export const splinePath = (
  points: readonly number[],
  vertical: boolean,
): number[] => {
  const out = [points[0], points[1]];
  for (let i = 2; i < points.length; i += 2) {
    const x0 = points[i - 2];
    const y0 = points[i - 1];
    const x1 = points[i];
    const y1 = points[i + 1];
    if (vertical) {
      const my = (y0 + y1) / 2;
      cubicPoints(out, x0, y0, x0, my, x1, my, x1, y1);
    } else {
      const mx = (x0 + x1) / 2;
      cubicPoints(out, x0, y0, mx, y0, mx, y1, x1, y1);
    }
  }
  return out;
};

/** Rounded corner from the end of `out` through (cx, cy) towards (nx, ny) */
const corner = (
  out: number[],
  cx: number,
  cy: number,
  nx: number,
  ny: number,
  radius: number,
) => {
  const px = out[out.length - 2];
  const py = out[out.length - 1];
  const inLen = Math.hypot(cx - px, cy - py);
  const outLen = Math.hypot(nx - cx, ny - cy);
  const r = Math.min(radius, inLen / 2, outLen / 2);
  if (r < 0.5) {
    out.push(cx, cy);
    return;
  }
  const ax = cx - ((cx - px) / inLen) * r;
  const ay = cy - ((cy - py) / inLen) * r;
  const bx = cx + ((nx - cx) / outLen) * r;
  const by = cy + ((ny - cy) / outLen) * r;
  out.push(ax, ay);
  // quadratic arc around the corner
  for (let i = 1; i <= 4; i++) {
    const t = i / 4;
    const u = 1 - t;
    out.push(
      u * u * ax + 2 * u * t * cx + t * t * bx,
      u * u * ay + 2 * u * t * cy + t * t * by,
    );
  }
};

/**
 * Orthogonal path through waypoints: along the flow axis to the middle,
 * across, then along the axis again, with rounded corners. `lane` moves the
 * crossing segments of a route that sits `lane` units off to the + side of
 * the cross axis: such routes turn earlier when heading to the + side (later
 * otherwise), so parallel routes nest instead of crossing each other
 */
export const orthogonalPath = (
  points: readonly number[],
  vertical: boolean,
  radius: number,
  lane = 0,
): number[] => {
  const corners: number[] = [points[0], points[1]];
  for (let i = 2; i < points.length; i += 2) {
    const x0 = points[i - 2];
    const y0 = points[i - 1];
    const x1 = points[i];
    const y1 = points[i + 1];
    const across = vertical ? x1 - x0 : y1 - y0;
    if (Math.abs(across) > 0.5) {
      const along = vertical ? y1 - y0 : x1 - x0;
      const limit = Math.max(0, Math.abs(along) / 2 - radius);
      const shift = Math.max(
        -limit,
        Math.min(limit, -lane * Math.sign(across) * Math.sign(along)),
      );
      if (vertical) {
        const my = (y0 + y1) / 2 + shift;
        corners.push(x0, my, x1, my);
      } else {
        const mx = (x0 + x1) / 2 + shift;
        corners.push(mx, y0, mx, y1);
      }
    }
    corners.push(x1, y1);
  }
  return roundCorners(corners, radius);
};

/** Polyline with rounded corners */
export const roundCorners = (
  corners: readonly number[],
  radius: number,
): number[] => {
  const out = [corners[0], corners[1]];
  const last = corners.length - 2;
  for (let i = 2; i < last; i += 2) {
    corner(
      out,
      corners[i],
      corners[i + 1],
      corners[i + 2],
      corners[i + 3],
      radius,
    );
  }
  if (last >= 2) out.push(corners[last], corners[last + 1]);
  return out;
};

/** Upper half circle between two points of the x axis (arc diagrams) */
export const arcPath = (
  ax: number,
  bx: number,
  y: number,
  rise = 1,
): number[] => {
  const cx = (ax + bx) / 2;
  const r = Math.abs(bx - ax) / 2;
  const segments = 2 * Math.max(4, Math.min(32, Math.ceil(r / 12)));
  const out: number[] = [];
  const from = ax < bx ? Math.PI : 0;
  const to = ax < bx ? 0 : Math.PI;
  for (let i = 0; i <= segments; i++) {
    const a = from + ((to - from) * i) / segments;
    out.push(cx + r * Math.cos(a), y - r * rise * Math.sin(a));
  }
  return out;
};

/**
 * Self-loop of a node at (x, y): a teardrop leaving the boundary at
 * `start` units from the center and coming back at `end` units, centered on
 * the direction `angle`, reaching about `size` units beyond the boundary
 */
export const loopPath = (
  x: number,
  y: number,
  angle: number,
  start: number,
  end: number,
  size: number,
): number[] => {
  const open = 0.42;
  const wide = 0.8;
  const reach = Math.max(start, end) + size * 2.2;
  const a0 = angle - open;
  const a1 = angle + open;
  const out = [x + Math.cos(a0) * start, y + Math.sin(a0) * start];
  cubicPoints(
    out,
    out[0],
    out[1],
    x + Math.cos(angle - wide) * reach,
    y + Math.sin(angle - wide) * reach,
    x + Math.cos(angle + wide) * reach,
    y + Math.sin(angle + wide) * reach,
    x + Math.cos(a1) * end,
    y + Math.sin(a1) * end,
  );
  return out;
};

/**
 * Self-loop on a side of a w × h box centered at (x, y): the side hit by the
 * direction `angle`, with feet `spread` units apart along the side (clamped
 * to it), reaching `reach` units beyond it. The end stops `endGap` units off
 * the side (room for an arrowhead pointing into the box)
 */
export const boxLoopPath = (
  x: number,
  y: number,
  w: number,
  h: number,
  angle: number,
  reach: number,
  spread: number,
  endGap = 0,
): number[] => {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  const leftRight = Math.abs(c) * h >= Math.abs(s) * w;
  const nx = leftRight ? (c < 0 ? -1 : 1) : 0;
  const ny = leftRight ? 0 : s < 0 ? -1 : 1;
  // tangent: the normal turned a quarter clockwise
  const tx = -ny;
  const ty = nx;
  const half = leftRight ? h / 2 : w / 2;
  const depth = leftRight ? w / 2 : h / 2;
  const sp = Math.min(spread / 2, half * 0.85);
  const dist = boundaryDistance(true, w, h, c, s);
  const u = Math.max(
    -(half - sp),
    Math.min(half - sp, c * dist * tx + s * dist * ty),
  );
  const ax = x + nx * depth + tx * (u - sp);
  const ay = y + ny * depth + ty * (u - sp);
  const bx = x + nx * (depth + endGap) + tx * (u + sp);
  const by = y + ny * (depth + endGap) + ty * (u + sp);
  const lift = reach * 1.33;
  const out = [ax, ay];
  cubicPoints(
    out,
    ax,
    ay,
    ax + nx * lift - tx * sp * 0.6,
    ay + ny * lift - ty * sp * 0.6,
    bx + nx * lift + tx * sp * 0.6,
    by + ny * lift + ty * sp * 0.6,
    bx,
    by,
  );
  return out;
};

/** Length of a polyline */
export const pathLength = (points: readonly number[]): number => {
  let length = 0;
  for (let i = 2; i < points.length; i += 2)
    length += Math.hypot(
      points[i] - points[i - 2],
      points[i + 1] - points[i - 1],
    );
  return length;
};

/** Removes `start` / `end` units from the ends of a polyline */
export const trimPath = (
  points: number[],
  start: number,
  end: number,
): number[] => {
  const total = pathLength(points);
  if (total <= start + end + 1e-6) {
    // too short: a zero-length segment in the middle keeps the direction
    if (points.length < 4) return points;
    const t = start + end > 0 ? start / (start + end) : 0.5;
    const p = pointAt(points, t * total);
    return [p[0], p[1], p[0], p[1]];
  }
  const out: number[] = [];
  const startPoint = pointAt(points, start);
  const endPoint = pointAt(points, total - end);
  out.push(startPoint[0], startPoint[1]);
  let walked = 0;
  for (let i = 2; i < points.length; i += 2) {
    walked += Math.hypot(
      points[i] - points[i - 2],
      points[i + 1] - points[i - 1],
    );
    if (walked > start && walked < total - end)
      out.push(points[i], points[i + 1]);
  }
  out.push(endPoint[0], endPoint[1]);
  return out;
};

/** Point and direction at a distance along a polyline */
export const pointAt = (
  points: readonly number[],
  distance: number,
): [number, number, number, number] => {
  let walked = 0;
  for (let i = 2; i < points.length; i += 2) {
    const dx = points[i] - points[i - 2];
    const dy = points[i + 1] - points[i - 1];
    const l = Math.hypot(dx, dy);
    if (walked + l >= distance && l > 0) {
      const t = (distance - walked) / l;
      return [points[i - 2] + dx * t, points[i - 1] + dy * t, dx / l, dy / l];
    }
    walked += l;
  }
  const k = points.length - 2;
  const dx = k >= 2 ? points[k] - points[k - 2] : 1;
  const dy = k >= 2 ? points[k + 1] - points[k - 1] : 0;
  const l = Math.hypot(dx, dy) || 1;
  return [points[k], points[k + 1], dx / l, dy / l];
};

/** Direction at the end of a polyline (unit vector) */
export const endDirection = (points: readonly number[]): [number, number] => {
  for (let i = points.length - 4; i >= 0; i -= 2) {
    const dx = points[points.length - 2] - points[i];
    const dy = points[points.length - 1] - points[i + 1];
    const l = Math.hypot(dx, dy);
    if (l > 1e-9) return [dx / l, dy / l];
  }
  return [1, 0];
};

/** Distance from the center of a node to its boundary in direction (ux, uy) */
export const boundaryDistance = (
  box: boolean,
  width: number,
  height: number,
  ux: number,
  uy: number,
): number => {
  if (!box) return width / 2;
  const ax = Math.abs(ux);
  const ay = Math.abs(uy);
  const tx = ax > 1e-9 ? width / 2 / ax : Infinity;
  const ty = ay > 1e-9 ? height / 2 / ay : Infinity;
  return Math.min(tx, ty);
};

/**
 * Arrowhead at (tx, ty) pointing along (ux, uy): the outline of a narrow
 * triangle and its axis, drawn with the line width it looks solid
 */
export const arrowHead = (
  out: number[],
  tx: number,
  ty: number,
  ux: number,
  uy: number,
  length: number,
  gap: number,
): void => {
  const w = length * 0.42;
  const bx = tx - ux * length;
  const by = ty - uy * length;
  const lx = bx - uy * w;
  const ly = by + ux * w;
  const rx = bx + uy * w;
  const ry = by - ux * w;
  out.push(lx, ly, tx, ty, rx, ry, lx, ly, gap, gap);
  out.push(tx, ty, bx, by, gap, gap);
  const mx = (lx + bx) / 2;
  const my = (ly + by) / 2;
  const nx = (rx + bx) / 2;
  const ny = (ry + by) / 2;
  out.push(tx, ty, mx, my, gap, gap, tx, ty, nx, ny, gap, gap);
};

/** Filled triangle as area points (x, top, bottom): two x-monotone pieces */
export const triangleArea = (
  out: number[],
  ax: number,
  ay: number,
  bx: number,
  by: number,
  cx: number,
  cy: number,
  gap: number,
): void => {
  // sort the corners by x
  let p = [ax, ay, bx, by, cx, cy];
  if (p[0] > p[2]) p = [p[2], p[3], p[0], p[1], p[4], p[5]];
  if (p[2] > p[4]) p = [p[0], p[1], p[4], p[5], p[2], p[3]];
  if (p[0] > p[2]) p = [p[2], p[3], p[0], p[1], p[4], p[5]];
  const [x1, y1, x2, y2, x3, y3] = p;
  if (!(x3 - x1 > 1e-12)) return;
  // the long side at the middle corner; the larger y is always the top, so
  // every triangle winds the same way (overlapping ones never cancel)
  const y13 = y1 + ((y3 - y1) * (x2 - x1)) / (x3 - x1);
  out.push(
    x1,
    y1,
    y1,
    x2,
    Math.max(y2, y13),
    Math.min(y2, y13),
    x3,
    y3,
    y3,
    gap,
    gap,
    gap,
  );
};

/** Corners of a filled ("stealth") arrowhead: tip, left, notch, right */
const arrowCorners = (
  tx: number,
  ty: number,
  ux: number,
  uy: number,
  length: number,
): number[] => {
  const w = length * 0.5;
  const bx = tx - ux * length;
  const by = ty - uy * length;
  return [
    tx,
    ty,
    bx - uy * w,
    by + ux * w,
    tx - ux * length * 0.72,
    ty - uy * length * 0.72,
    bx + uy * w,
    by - ux * w,
  ];
};

/**
 * Filled arrowhead at (tx, ty) pointing along (ux, uy): area triangles in
 * `fill`, its outline (anti-aliased edges) in `outline`
 */
export const filledArrow = (
  fill: number[],
  outline: number[],
  tx: number,
  ty: number,
  ux: number,
  uy: number,
  length: number,
  gap: number,
): void => {
  const [x0, y0, lx, ly, nx, ny, rx, ry] = arrowCorners(tx, ty, ux, uy, length);
  triangleArea(fill, x0, y0, lx, ly, nx, ny, gap);
  triangleArea(fill, x0, y0, nx, ny, rx, ry, gap);
  outline.push(lx, ly, x0, y0, rx, ry, nx, ny, lx, ly, gap, gap);
};

/** Splits a polyline into dashes (`dash` / `space` in layout units) */
export const dashPath = (
  points: readonly number[],
  dash: number,
  space: number,
  gap: number,
): number[] => {
  const out: number[] = [];
  const total = pathLength(points);
  const period = dash + space;
  if (period <= 0 || total <= 0) return points.slice();
  for (let start = 0; start < total; start += period) {
    const end = Math.min(total, start + dash);
    const a = pointAt(points, start);
    out.push(a[0], a[1]);
    let walked = 0;
    for (let i = 2; i < points.length; i += 2) {
      walked += Math.hypot(
        points[i] - points[i - 2],
        points[i + 1] - points[i - 1],
      );
      if (walked > start && walked < end) out.push(points[i], points[i + 1]);
    }
    const b = pointAt(points, end);
    out.push(b[0], b[1], gap, gap);
  }
  return out;
};

/** Squared distance from (px, py) to a polyline */
export const distanceToPath = (
  points: readonly number[],
  px: number,
  py: number,
): number => {
  let best = Infinity;
  for (let i = 2; i < points.length; i += 2) {
    const ax = points[i - 2];
    const ay = points[i - 1];
    const dx = points[i] - ax;
    const dy = points[i + 1] - ay;
    const l = dx * dx + dy * dy;
    const t =
      l > 0
        ? Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / l))
        : 0;
    const qx = ax + dx * t - px;
    const qy = ay + dy * t - py;
    best = Math.min(best, qx * qx + qy * qy);
  }
  return best;
};
