// SVG path data: parsing (every command, absolute or relative, normalized to
// absolute M / L / C / Q / Z) and adaptive flattening into polylines, the
// input of the GPU stroke tessellation.

/** An absolute path command (H/V become L, S/T become C/Q, arcs become cubic curves) */
export type IconPathCommand =
  | { type: "M"; x: number; y: number }
  | { type: "L"; x: number; y: number }
  | {
      type: "C";
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      x: number;
      y: number;
    }
  | { type: "Q"; x1: number; y1: number; x: number; y: number }
  | { type: "Z" };

/** A flattened subpath: `points` is `[x0, y0, x1, y1, …]` */
export interface IconPolyline {
  points: number[];
  /** Ends with Z (the last point joins the first) */
  closed: boolean;
}

const ARITY: Record<string, number> = {
  m: 2,
  l: 2,
  h: 1,
  v: 1,
  c: 6,
  s: 4,
  q: 4,
  t: 2,
  a: 7,
  z: 0,
};

const isSpace = (c: string) =>
  c === " " ||
  c === "," ||
  c === "\t" ||
  c === "\n" ||
  c === "\r" ||
  c === "\f";

const NUMBER = /[+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?/y;

/**
 * Parses SVG path data into absolute commands. Strict mode throws a
 * SyntaxError on malformed data; otherwise, like browsers, the path is kept
 * up to the error.
 */
export function parseIconPath(d: string, strict = true): IconPathCommand[] {
  const out: IconPathCommand[] = [];
  let i = 0;
  const fail = (message: string) => {
    if (strict) {
      throw new SyntaxError(`Invalid path data at ${i}: ${message} in "${d}"`);
    }
  };
  const skip = () => {
    while (i < d.length && isSpace(d[i]!)) i++;
  };
  const number = (): number | null => {
    skip();
    NUMBER.lastIndex = i;
    const match = NUMBER.exec(d);
    if (!match) return null;
    i += match[0].length;
    return Number(match[0]);
  };
  const flag = (): number | null => {
    skip();
    const c = d[i];
    if (c !== "0" && c !== "1") return null;
    i++;
    return c === "1" ? 1 : 0;
  };

  let x = 0;
  let y = 0;
  let startX = 0;
  let startY = 0;
  // reflected control points of S / T
  let lastCubic: [number, number] | null = null;
  let lastQuad: [number, number] | null = null;
  let command = "";

  skip();
  if (i < d.length && d[i] !== "M" && d[i] !== "m") {
    fail("a path must start with M");
    return out;
  }

  while (true) {
    skip();
    if (i >= d.length) break;
    const c = d[i]!;
    if (/[a-zA-Z]/.test(c)) {
      if (ARITY[c.toLowerCase()] === undefined) {
        fail(`unknown command "${c}"`);
        return out;
      }
      command = c;
      i++;
    } else if (!command || command === "z" || command === "Z") {
      fail(`unexpected "${c}"`);
      return out;
    }
    // after M, extra coordinate pairs are implicit L (l after m)
    const lower = command.toLowerCase();
    const relative = command === lower;
    const args: number[] = [];
    for (let k = 0; k < ARITY[lower]!; k++) {
      const value = lower === "a" && (k === 3 || k === 4) ? flag() : number();
      if (value === null || !Number.isFinite(value)) {
        fail(`expected ${ARITY[lower]} numbers after "${command}"`);
        return out;
      }
      args.push(value);
    }
    const ox = relative ? x : 0;
    const oy = relative ? y : 0;
    let cubic: [number, number] | null = null;
    let quad: [number, number] | null = null;

    switch (lower) {
      case "m":
        x = ox + args[0]!;
        y = oy + args[1]!;
        startX = x;
        startY = y;
        out.push({ type: "M", x, y });
        command = relative ? "l" : "L";
        break;
      case "l":
        x = ox + args[0]!;
        y = oy + args[1]!;
        out.push({ type: "L", x, y });
        break;
      case "h":
        x = ox + args[0]!;
        out.push({ type: "L", x, y });
        break;
      case "v":
        y = oy + args[0]!;
        out.push({ type: "L", x, y });
        break;
      case "c": {
        const [a, b, e, f, g, h] = args as [
          number,
          number,
          number,
          number,
          number,
          number,
        ];
        out.push({
          type: "C",
          x1: ox + a,
          y1: oy + b,
          x2: ox + e,
          y2: oy + f,
          x: ox + g,
          y: oy + h,
        });
        cubic = [ox + e, oy + f];
        x = ox + g;
        y = oy + h;
        break;
      }
      case "s": {
        const [e, f, g, h] = args as [number, number, number, number];
        const x1 = lastCubic ? 2 * x - lastCubic[0] : x;
        const y1 = lastCubic ? 2 * y - lastCubic[1] : y;
        out.push({
          type: "C",
          x1,
          y1,
          x2: ox + e,
          y2: oy + f,
          x: ox + g,
          y: oy + h,
        });
        cubic = [ox + e, oy + f];
        x = ox + g;
        y = oy + h;
        break;
      }
      case "q": {
        const [a, b, g, h] = args as [number, number, number, number];
        out.push({ type: "Q", x1: ox + a, y1: oy + b, x: ox + g, y: oy + h });
        quad = [ox + a, oy + b];
        x = ox + g;
        y = oy + h;
        break;
      }
      case "t": {
        const x1: number = lastQuad ? 2 * x - lastQuad[0] : x;
        const y1: number = lastQuad ? 2 * y - lastQuad[1] : y;
        x = ox + args[0]!;
        y = oy + args[1]!;
        out.push({ type: "Q", x1, y1, x, y });
        quad = [x1, y1];
        break;
      }
      case "a": {
        const [rx, ry, rotation, large, sweep, ex, ey] = args as [
          number,
          number,
          number,
          number,
          number,
          number,
          number,
        ];
        const tx = ox + ex;
        const ty = oy + ey;
        arcToCubics(
          x,
          y,
          rx,
          ry,
          rotation,
          large === 1,
          sweep === 1,
          tx,
          ty,
          out,
        );
        x = tx;
        y = ty;
        break;
      }
      default:
        // z
        out.push({ type: "Z" });
        x = startX;
        y = startY;
        break;
    }
    lastCubic = cubic;
    lastQuad = quad;
  }
  return out;
}

/** Elliptical arc (SVG endpoint parameterization) as cubic curves of at most 90° */
function arcToCubics(
  x0: number,
  y0: number,
  rxIn: number,
  ryIn: number,
  rotationDeg: number,
  large: boolean,
  sweep: boolean,
  x: number,
  y: number,
  out: IconPathCommand[],
) {
  if (x0 === x && y0 === y) return;
  let rx = Math.abs(rxIn);
  let ry = Math.abs(ryIn);
  if (rx === 0 || ry === 0) {
    out.push({ type: "L", x, y });
    return;
  }
  const phi = (rotationDeg * Math.PI) / 180;
  const cos = Math.cos(phi);
  const sin = Math.sin(phi);
  const dx = (x0 - x) / 2;
  const dy = (y0 - y) / 2;
  const x1p = cos * dx + sin * dy;
  const y1p = -sin * dx + cos * dy;
  // radii too small for the endpoints: scale them up (SVG spec F.6.6)
  const lambda = (x1p * x1p) / (rx * rx) + (y1p * y1p) / (ry * ry);
  if (lambda > 1) {
    const s = Math.sqrt(lambda);
    rx *= s;
    ry *= s;
  }
  const num = rx * rx * ry * ry - rx * rx * y1p * y1p - ry * ry * x1p * x1p;
  const den = rx * rx * y1p * y1p + ry * ry * x1p * x1p;
  let coef = Math.sqrt(Math.max(0, num / den));
  if (large === sweep) coef = -coef;
  const cxp = (coef * rx * y1p) / ry;
  const cyp = (-coef * ry * x1p) / rx;
  const cx = cos * cxp - sin * cyp + (x0 + x) / 2;
  const cy = sin * cxp + cos * cyp + (y0 + y) / 2;
  const angle = (ux: number, uy: number, vx: number, vy: number) => {
    const a = Math.atan2(ux * vy - uy * vx, ux * vx + uy * vy);
    return a;
  };
  const ux = (x1p - cxp) / rx;
  const uy = (y1p - cyp) / ry;
  const vx = (-x1p - cxp) / rx;
  const vy = (-y1p - cyp) / ry;
  const theta = angle(1, 0, ux, uy);
  let delta = angle(ux, uy, vx, vy);
  if (!sweep && delta > 0) delta -= 2 * Math.PI;
  else if (sweep && delta < 0) delta += 2 * Math.PI;

  const segments = Math.max(
    1,
    Math.ceil(Math.abs(delta) / (Math.PI / 2) - 1e-9),
  );
  const step = delta / segments;
  const k = (4 / 3) * Math.tan(step / 4);
  const point = (t: number): [number, number] => {
    const ex = rx * Math.cos(t);
    const ey = ry * Math.sin(t);
    return [cos * ex - sin * ey + cx, sin * ex + cos * ey + cy];
  };
  const tangent = (t: number): [number, number] => {
    const ex = -rx * Math.sin(t);
    const ey = ry * Math.cos(t);
    return [cos * ex - sin * ey, sin * ex + cos * ey];
  };
  let t = theta;
  for (let s = 0; s < segments; s++) {
    const t2 = t + step;
    const [px, py] = point(t);
    const [qx, qy] = s === segments - 1 ? [x, y] : point(t2);
    const [ax, ay] = tangent(t);
    const [bx, by] = tangent(t2);
    out.push({
      type: "C",
      x1: px + k * ax,
      y1: py + k * ay,
      x2: qx - k * bx,
      y2: qy - k * by,
      x: qx,
      y: qy,
    });
    t = t2;
  }
}

const parsed = new Map<string, IconPathCommand[]>();

/** Lenient, cached parse used by the renderers */
export const commandsOf = (d: string): IconPathCommand[] => {
  let commands = parsed.get(d);
  if (!commands) {
    commands = parseIconPath(d, false);
    if (parsed.size > 4096) parsed.clear();
    parsed.set(d, commands);
  }
  return commands;
};

/**
 * Number of line segments for a curve, Wang's formula: the polyline stays
 * within `tolerance` of the curve. `l` is the largest second difference of
 * the control points, `factor` n(n-1)/8 for a curve of degree n.
 */
const segmentsFor = (l: number, factor: number, tolerance: number) =>
  Math.min(256, Math.max(1, Math.ceil(Math.sqrt((factor * l) / tolerance))));

/**
 * Flattens path data into polylines that stay within `tolerance` (in path
 * units) of the curves. Each subpath gives one polyline.
 */
export function flattenIconPath(d: string, tolerance = 0.05): IconPolyline[] {
  const tol = Math.max(1e-4, tolerance);
  const lines: IconPolyline[] = [];
  let current: IconPolyline | null = null;
  let x = 0;
  let y = 0;
  let startX = 0;
  let startY = 0;
  const begin = (px: number, py: number) => {
    current = { points: [px, py], closed: false };
    lines.push(current);
  };
  const push = (px: number, py: number) => {
    if (!current) begin(x, y);
    current!.points.push(px, py);
  };
  for (const c of commandsOf(d)) {
    switch (c.type) {
      case "M":
        begin(c.x, c.y);
        x = startX = c.x;
        y = startY = c.y;
        break;
      case "L":
        push(c.x, c.y);
        x = c.x;
        y = c.y;
        break;
      case "Q": {
        const l = Math.hypot(x - 2 * c.x1 + c.x, y - 2 * c.y1 + c.y);
        const n = segmentsFor(l, 0.25, tol);
        for (let s = 1; s <= n; s++) {
          const t = s / n;
          const u = 1 - t;
          push(
            u * u * x + 2 * u * t * c.x1 + t * t * c.x,
            u * u * y + 2 * u * t * c.y1 + t * t * c.y,
          );
        }
        x = c.x;
        y = c.y;
        break;
      }
      case "C": {
        const l = Math.max(
          Math.hypot(x - 2 * c.x1 + c.x2, y - 2 * c.y1 + c.y2),
          Math.hypot(c.x1 - 2 * c.x2 + c.x, c.y1 - 2 * c.y2 + c.y),
        );
        const n = segmentsFor(l, 0.75, tol);
        for (let s = 1; s <= n; s++) {
          const t = s / n;
          const u = 1 - t;
          push(
            u * u * u * x +
              3 * u * u * t * c.x1 +
              3 * u * t * t * c.x2 +
              t * t * t * c.x,
            u * u * u * y +
              3 * u * u * t * c.y1 +
              3 * u * t * t * c.y2 +
              t * t * t * c.y,
          );
        }
        x = c.x;
        y = c.y;
        break;
      }
      default:
        // Z: the next drawing command starts a new subpath at the start point
        if (current) (current as IconPolyline).closed = true;
        current = null;
        x = startX;
        y = startY;
        break;
    }
  }
  return lines;
}
