// Force-directed layout: Barnes–Hut many-body (flat quadtree), links (d3
// semantics), gravity, centering and collisions (hash grid), with alpha
// cooling and a deterministic seed. `forceKernel` is self-contained (no
// reference to anything outside its body): it is serialized into the Web
// Worker of large graphs (see worker.ts).

import type {
  GraphForceLayoutOptions,
  GraphForceSimulation,
  GraphEdge,
  GraphLayoutResult,
  GraphNode,
} from "./types";

/** Data of a simulation (index-based, transferable to a worker) */
export interface ForceKernelInit {
  n: number;
  /** Initial positions (NaN = automatic) */
  x: Float64Array;
  y: Float64Array;
  radius: Float64Array;
  /** 1 = pinned at its initial position */
  fixed: Uint8Array;
  source: Int32Array;
  target: Int32Array;
  /** Strength multiplier per link */
  weight: Float64Array;
  linkDistance: number;
  /** NaN = 1 / min(degree) */
  linkStrength: number;
  charge: number;
  theta: number;
  gravity: number;
  /** Extra spacing of the collisions; negative disables them */
  collide: number;
  velocityDecay: number;
  iterations: number;
  seed: number;
  /** Starting temperature (1 for a new layout, lower to refine one) */
  alpha: number;
  /** Width / height of the view: gravity stretches the layout to it */
  aspect: number;
}

export type ForceKernel = (init: ForceKernelInit) => GraphForceSimulation;

/** Returns the simulation factory (self-contained: serialized into workers) */
export function forceKernel(): ForceKernel {
  return function createSim(init: ForceKernelInit): GraphForceSimulation {
    const n = init.n;
    const x = init.x;
    const y = init.y;
    const radius = init.radius;
    const vx = new Float64Array(n);
    const vy = new Float64Array(n);
    const fx = new Float64Array(n).fill(NaN);
    const fy = new Float64Array(n).fill(NaN);
    const pinned = new Uint8Array(n);
    let seed = init.seed | 0 || 1;
    const random = () => {
      // mulberry32
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    const jiggle = () => (random() - 0.5) * 1e-6;

    // phyllotaxis start (like d3), seeded jitter keeps it deterministic
    const angle = Math.PI * (3 - Math.sqrt(5));
    const spread = Math.max(10, init.linkDistance * 0.35);
    for (let i = 0; i < n; i++) {
      if (!(Number.isFinite(x[i]) && Number.isFinite(y[i]))) {
        const r = spread * Math.sqrt(0.5 + i);
        const a = i * angle;
        x[i] = r * Math.cos(a) + jiggle();
        y[i] = r * Math.sin(a) + jiggle();
      }
      if (init.fixed[i]) {
        pinned[i] = 1;
        fx[i] = x[i];
        fy[i] = y[i];
      }
    }

    // links
    const m = init.source.length;
    const src = init.source;
    const tgt = init.target;
    const count = new Int32Array(n);
    for (let l = 0; l < m; l++) {
      count[src[l]]++;
      count[tgt[l]]++;
    }
    const bias = new Float64Array(m);
    const strength = new Float64Array(m);
    for (let l = 0; l < m; l++) {
      const a = count[src[l]];
      const b = count[tgt[l]];
      bias[l] = a / (a + b);
      const base = Number.isFinite(init.linkStrength)
        ? init.linkStrength
        : 1 / Math.min(a, b);
      strength[l] = base * (init.weight[l] || 1);
    }

    let alpha = init.alpha > 0 ? init.alpha : 1;
    const alphaMin = 0.001;
    const alphaDecay = 1 - Math.pow(alphaMin, 1 / Math.max(1, init.iterations));
    let alphaTarget = 0;
    const theta2 = init.theta * init.theta;
    const charge = init.charge;
    const collidePad = init.collide;
    let maxRadius = 0;
    for (let i = 0; i < n; i++) maxRadius = Math.max(maxRadius, radius[i]);

    // ---- flat quadtree (rebuilt every tick)
    let cap = 0;
    let qx0 = new Float64Array(0);
    let qy0 = new Float64Array(0);
    let qsize = new Float64Array(0);
    let qchild = new Int32Array(0);
    let qpoint = new Int32Array(0);
    let qinner = new Uint8Array(0);
    let qmass = new Float64Array(0);
    let qcx = new Float64Array(0);
    let qcy = new Float64Array(0);
    const nextPoint = new Int32Array(n);
    let qcount = 0;

    const grow = (need: number) => {
      if (need <= cap) return;
      const next = Math.max(need, cap * 2, 64);
      const copyF = (a: Float64Array) => {
        const b = new Float64Array(next);
        b.set(a);
        return b;
      };
      qx0 = copyF(qx0);
      qy0 = copyF(qy0);
      qsize = copyF(qsize);
      qmass = copyF(qmass);
      qcx = copyF(qcx);
      qcy = copyF(qcy);
      const c = new Int32Array(next * 4);
      c.set(qchild);
      qchild = c;
      const p = new Int32Array(next);
      p.set(qpoint);
      qpoint = p;
      const q = new Uint8Array(next);
      q.set(qinner);
      qinner = q;
      cap = next;
    };

    const newQuad = (x0: number, y0: number, size: number) => {
      grow(qcount + 1);
      const q = qcount++;
      qx0[q] = x0;
      qy0[q] = y0;
      qsize[q] = size;
      qchild[q * 4] = -1;
      qchild[q * 4 + 1] = -1;
      qchild[q * 4 + 2] = -1;
      qchild[q * 4 + 3] = -1;
      qpoint[q] = -1;
      qinner[q] = 0;
      return q;
    };

    const quadrant = (q: number, px: number, py: number) => {
      const half = qsize[q] / 2;
      return (px >= qx0[q] + half ? 1 : 0) | (py >= qy0[q] + half ? 2 : 0);
    };

    const childQuad = (q: number, k: number) => {
      const half = qsize[q] / 2;
      return newQuad(
        qx0[q] + (k & 1 ? half : 0),
        qy0[q] + (k & 2 ? half : 0),
        half,
      );
    };

    const insert = (i: number) => {
      let q = 0;
      const px = x[i];
      const py = y[i];
      for (let depth = 0; ; depth++) {
        if (qinner[q]) {
          const k = quadrant(q, px, py);
          let c = qchild[q * 4 + k];
          if (c < 0) {
            c = childQuad(q, k);
            qchild[q * 4 + k] = c;
            qpoint[c] = i;
            nextPoint[i] = -1;
            return;
          }
          q = c;
          continue;
        }
        const j = qpoint[q];
        if (j < 0) {
          qpoint[q] = i;
          nextPoint[i] = -1;
          return;
        }
        if ((x[j] === px && y[j] === py) || depth > 48) {
          nextPoint[i] = j;
          qpoint[q] = i;
          return;
        }
        // split: the points of the leaf move to a child
        qpoint[q] = -1;
        qinner[q] = 1;
        const k = quadrant(q, x[j], y[j]);
        const c = childQuad(q, k);
        qchild[q * 4 + k] = c;
        qpoint[c] = j;
      }
    };

    const buildTree = () => {
      let x0 = Infinity;
      let y0 = Infinity;
      let x1 = -Infinity;
      let y1 = -Infinity;
      for (let i = 0; i < n; i++) {
        if (x[i] < x0) x0 = x[i];
        if (x[i] > x1) x1 = x[i];
        if (y[i] < y0) y0 = y[i];
        if (y[i] > y1) y1 = y[i];
      }
      const size = Math.max(x1 - x0, y1 - y0, 1) * 1.0001 + 1e-6;
      qcount = 0;
      grow(n * 2 + 8);
      newQuad(x0, y0, size);
      for (let i = 0; i < n; i++) insert(i);
      // aggregates, children before parents
      for (let q = qcount - 1; q >= 0; q--) {
        if (qinner[q]) {
          let mass = 0;
          let weight = 0;
          let sx = 0;
          let sy = 0;
          for (let k = 0; k < 4; k++) {
            const c = qchild[q * 4 + k];
            if (c < 0) continue;
            const w = Math.abs(qmass[c]);
            mass += qmass[c];
            weight += w;
            sx += w * qcx[c];
            sy += w * qcy[c];
          }
          qmass[q] = mass;
          qcx[q] = weight ? sx / weight : qx0[q];
          qcy[q] = weight ? sy / weight : qy0[q];
        } else {
          let mass = 0;
          for (let j = qpoint[q]; j >= 0; j = nextPoint[j]) mass += charge;
          qmass[q] = mass;
          qcx[q] = x[qpoint[q]];
          qcy[q] = y[qpoint[q]];
        }
      }
    };

    let stack = new Int32Array(256);
    const manyBody = () => {
      if (!charge || n < 2) return;
      buildTree();
      for (let i = 0; i < n; i++) {
        const xi = x[i];
        const yi = y[i];
        let top = 0;
        stack[top++] = 0;
        while (top) {
          const q = stack[--top];
          if (!qmass[q]) continue;
          if (qinner[q]) {
            const dx = qcx[q] - xi;
            const dy = qcy[q] - yi;
            const w = qsize[q];
            let l = dx * dx + dy * dy;
            if ((w * w) / theta2 < l) {
              if (l < 1) l = Math.sqrt(l);
              const f = (qmass[q] * alpha) / l;
              vx[i] += dx * f;
              vy[i] += dy * f;
              continue;
            }
            if (top + 4 > stack.length) {
              const s = new Int32Array(stack.length * 2);
              s.set(stack);
              stack = s;
            }
            for (let k = 0; k < 4; k++) {
              const c = qchild[q * 4 + k];
              if (c >= 0) stack[top++] = c;
            }
          } else {
            for (let j = qpoint[q]; j >= 0; j = nextPoint[j]) {
              if (j === i) continue;
              let dx = x[j] - xi;
              let dy = y[j] - yi;
              let l = dx * dx + dy * dy;
              if (dx === 0) {
                dx = jiggle();
                l += dx * dx;
              }
              if (dy === 0) {
                dy = jiggle();
                l += dy * dy;
              }
              if (l < 1) l = Math.sqrt(l);
              const f = (charge * alpha) / l;
              vx[i] += dx * f;
              vy[i] += dy * f;
            }
          }
        }
      }
    };

    const links = () => {
      const distance = init.linkDistance;
      for (let l = 0; l < m; l++) {
        const s = src[l];
        const t = tgt[l];
        if (s === t) continue;
        let dx = x[t] + vx[t] - x[s] - vx[s] || jiggle();
        let dy = y[t] + vy[t] - y[s] - vy[s] || jiggle();
        let d = Math.sqrt(dx * dx + dy * dy);
        d = ((d - distance - radius[s] - radius[t]) / d) * alpha * strength[l];
        dx *= d;
        dy *= d;
        const b = bias[l];
        vx[t] -= dx * b;
        vy[t] -= dy * b;
        vx[s] += dx * (1 - b);
        vy[s] += dy * (1 - b);
      }
    };

    const gravity = () => {
      const g = init.gravity * alpha;
      if (!g) return;
      // a stronger pull along the short side of the view
      const stretch = Math.sqrt(
        Math.max(0.25, Math.min(4, init.aspect > 0 ? init.aspect : 1)),
      );
      const gx = g / stretch;
      const gy = g * stretch;
      for (let i = 0; i < n; i++) {
        vx[i] -= x[i] * gx;
        vy[i] -= y[i] * gy;
      }
    };

    // ---- hash grid of the collisions
    let tableSize = 1;
    while (tableSize < n * 2) tableSize <<= 1;
    const cellStart = new Int32Array(tableSize + 1);
    const cellItems = new Int32Array(n);
    const cellOf = new Int32Array(n);
    const hash = (cx: number, cy: number) =>
      (Math.imul(cx, 73856093) ^ Math.imul(cy, 19349663)) & (tableSize - 1);

    /** Buckets the nodes by cell of (`px`, `py`); returns the cell size */
    const bucket = (px: Float64Array, py: Float64Array, pad: number) => {
      const cell = Math.max(1e-6, (maxRadius + pad) * 2);
      cellStart.fill(0);
      for (let i = 0; i < n; i++) {
        const h = hash(Math.floor(px[i] / cell), Math.floor(py[i] / cell));
        cellOf[i] = h;
        cellStart[h + 1]++;
      }
      for (let h = 0; h < tableSize; h++) cellStart[h + 1] += cellStart[h];
      const fillAt = cellStart.slice(0, tableSize);
      for (let i = 0; i < n; i++) cellItems[fillAt[cellOf[i]]++] = i;
      return cell;
    };

    const visited = new Int32Array(tableSize).fill(-1);

    /** Calls `pair(i, j)` (i < j) for nodes in neighboring cells */
    const eachPair = (
      px: Float64Array,
      py: Float64Array,
      pad: number,
      pair: (i: number, j: number) => void,
    ) => {
      const cell = bucket(px, py, pad);
      visited.fill(-1);
      for (let i = 0; i < n; i++) {
        const cx = Math.floor(px[i] / cell);
        const cy = Math.floor(py[i] / cell);
        for (let oy = -1; oy <= 1; oy++) {
          for (let ox = -1; ox <= 1; ox++) {
            const h = hash(cx + ox, cy + oy);
            // two neighbor cells may share a bucket: visit it once
            if (visited[h] === i) continue;
            visited[h] = i;
            for (let k = cellStart[h]; k < cellStart[h + 1]; k++) {
              const j = cellItems[k];
              if (j > i) pair(i, j);
            }
          }
        }
      }
    };

    const px = new Float64Array(n);
    const py = new Float64Array(n);
    const collide = () => {
      if (collidePad < 0 || n < 2) return;
      for (let i = 0; i < n; i++) {
        px[i] = x[i] + vx[i];
        py[i] = y[i] + vy[i];
      }
      eachPair(px, py, collidePad, (i, j) => {
        const ri = radius[i] + collidePad;
        const rj = radius[j] + collidePad;
        const r = ri + rj;
        let dx = x[i] + vx[i] - x[j] - vx[j];
        let dy = y[i] + vy[i] - y[j] - vy[j];
        let l = dx * dx + dy * dy;
        if (l >= r * r) return;
        if (dx === 0) {
          dx = jiggle();
          l += dx * dx;
        }
        if (dy === 0) {
          dy = jiggle();
          l += dy * dy;
        }
        const d = Math.sqrt(l);
        const f = ((r - d) / d) * 0.7;
        dx *= f;
        dy *= f;
        const rj2 = rj * rj;
        const share = rj2 / (ri * ri + rj2);
        vx[i] += dx * share;
        vy[i] += dy * share;
        vx[j] -= dx * (1 - share);
        vy[j] -= dy * (1 - share);
      });
    };

    const center = () => {
      let sx = 0;
      let sy = 0;
      for (let i = 0; i < n; i++) {
        if (!Number.isNaN(fx[i])) return;
        sx += x[i];
        sy += y[i];
      }
      sx /= n || 1;
      sy /= n || 1;
      for (let i = 0; i < n; i++) {
        x[i] -= sx;
        y[i] -= sy;
      }
    };

    // a fresh layout turns its long axis toward the long side of the view
    // (rigid, so the forces are unchanged): wide boxes are filled, not just
    // their middle
    const aspect = init.aspect > 0 ? init.aspect : 1;
    const orient =
      init.alpha >= 1 && n > 2 && Math.abs(Math.log(aspect)) > 0.15;
    const align = () => {
      let sxx = 0;
      let syy = 0;
      let sxy = 0;
      for (let i = 0; i < n; i++) {
        if (!Number.isNaN(fx[i])) return;
        sxx += x[i] * x[i];
        syy += y[i] * y[i];
        sxy += x[i] * y[i];
      }
      const spread2 = Math.hypot(sxx - syy, 2 * sxy);
      // a round layout has no long axis
      if (spread2 < (sxx + syy) * 0.04) return;
      const axis = 0.5 * Math.atan2(2 * sxy, sxx - syy);
      let turn = (aspect > 1 ? 0 : Math.PI / 2) - axis;
      if (turn > Math.PI / 2) turn -= Math.PI;
      if (turn < -Math.PI / 2) turn += Math.PI;
      turn *= 0.12;
      if (Math.abs(turn) < 1e-5) return;
      const c = Math.cos(turn);
      const s = Math.sin(turn);
      for (let i = 0; i < n; i++) {
        const px = x[i];
        const pvx = vx[i];
        x[i] = px * c - y[i] * s;
        y[i] = px * s + y[i] * c;
        vx[i] = pvx * c - vy[i] * s;
        vy[i] = pvx * s + vy[i] * c;
      }
    };

    const step = () => {
      alpha += (alphaTarget - alpha) * alphaDecay;
      links();
      manyBody();
      gravity();
      collide();
      const decay = 1 - init.velocityDecay;
      for (let i = 0; i < n; i++) {
        if (Number.isNaN(fx[i])) {
          vx[i] *= decay;
          vy[i] *= decay;
          x[i] += vx[i];
          y[i] += vy[i];
        } else {
          x[i] = fx[i];
          y[i] = fy[i];
          vx[i] = vy[i] = 0;
        }
      }
      center();
      if (orient) align();
    };

    const done = () => alpha < alphaMin && alphaTarget === 0;

    return {
      x,
      y,
      tick(k = 1) {
        for (let i = 0; i < k; i++) {
          if (done()) return false;
          step();
        }
        return !done();
      },
      alpha: () => alpha,
      reheat(value = 0.3) {
        alpha = Math.max(alpha, value);
      },
      drag(i, px2, py2) {
        if (i < 0 || i >= n) return;
        fx[i] = x[i] = px2;
        fy[i] = y[i] = py2;
        alphaTarget = 0.3;
        if (alpha < 0.3) alpha = 0.3;
      },
      release(i, keep) {
        alphaTarget = 0;
        if (i < 0 || i >= n || keep || pinned[i]) return;
        fx[i] = NaN;
        fy[i] = NaN;
      },
      done,
      settle() {
        // position-based passes until no two nodes overlap
        const pad = Math.max(0, collidePad);
        for (let pass = 0; pass < 80; pass++) {
          let moved = false;
          eachPair(x, y, pad, (i, j) => {
            const r = radius[i] + radius[j] + pad * 2;
            let dx = x[i] - x[j];
            let dy = y[i] - y[j];
            let l = dx * dx + dy * dy;
            if (l >= r * r * 0.9999) return;
            if (l === 0) {
              dx = random() - 0.5;
              dy = random() - 0.5;
              l = dx * dx + dy * dy;
            }
            const d = Math.sqrt(l);
            const push = (r - d) / d;
            const fi = Number.isNaN(fx[i]) ? 1 : 0;
            const fj = Number.isNaN(fx[j]) ? 1 : 0;
            if (!fi && !fj) return;
            const si = fi / (fi + fj);
            const sj = fj / (fi + fj);
            x[i] += dx * push * si * 1.001;
            y[i] += dy * push * si * 1.001;
            x[j] -= dx * push * sj * 1.001;
            y[j] -= dy * push * sj * 1.001;
            moved = true;
          });
          if (!moved) break;
        }
      },
    };
  };
}

// ------------------------------------------------------------- inputs

export const FORCE_DEFAULTS = {
  linkDistance: 60,
  charge: -160,
  theta: 0.9,
  gravity: 0.04,
  collide: 2,
  velocityDecay: 0.4,
  iterations: 300,
  seed: 1,
};

/** Kernel input from index-based data */
export const forceInit = (
  n: number,
  source: Int32Array,
  target: Int32Array,
  options: GraphForceLayoutOptions | undefined,
  extra: {
    x?: Float64Array;
    y?: Float64Array;
    radius?: Float64Array;
    fixed?: Uint8Array;
    weight?: Float64Array;
    alpha?: number;
    aspect?: number;
  } = {},
): ForceKernelInit => {
  const o = options ?? {};
  const collide =
    o.collide === false
      ? -1
      : typeof o.collide === "number"
        ? Math.max(0, o.collide)
        : FORCE_DEFAULTS.collide;
  return {
    n,
    x: extra.x ?? new Float64Array(n).fill(NaN),
    y: extra.y ?? new Float64Array(n).fill(NaN),
    radius: extra.radius ?? new Float64Array(n).fill(6),
    fixed: extra.fixed ?? new Uint8Array(n),
    source,
    target,
    weight: extra.weight ?? new Float64Array(source.length).fill(1),
    linkDistance: o.linkDistance ?? FORCE_DEFAULTS.linkDistance,
    linkStrength: o.linkStrength ?? NaN,
    charge: o.charge ?? FORCE_DEFAULTS.charge,
    theta: o.theta ?? FORCE_DEFAULTS.theta,
    gravity: o.gravity ?? FORCE_DEFAULTS.gravity,
    collide,
    velocityDecay: o.velocityDecay ?? FORCE_DEFAULTS.velocityDecay,
    iterations: o.iterations ?? FORCE_DEFAULTS.iterations,
    seed: o.seed ?? FORCE_DEFAULTS.seed,
    alpha: extra.alpha ?? 1,
    aspect: extra.aspect ?? 1,
  };
};

/** Index of the ids and the valid edges (unknown ids are skipped) */
export const indexGraph = (
  nodes: readonly GraphNode[],
  edges: readonly GraphEdge[],
): {
  index: Map<string, number>;
  source: Int32Array;
  target: Int32Array;
  edge: Int32Array;
} => {
  const index = new Map<string, number>();
  nodes.forEach((node, i) => {
    if (!index.has(node.id)) index.set(node.id, i);
  });
  const s: number[] = [];
  const t: number[] = [];
  const e: number[] = [];
  edges.forEach((edge, k) => {
    const a = index.get(edge.source);
    const b = index.get(edge.target);
    if (a === undefined || b === undefined) return;
    s.push(a);
    t.push(b);
    e.push(k);
  });
  return {
    index,
    source: Int32Array.from(s),
    target: Int32Array.from(t),
    edge: Int32Array.from(e),
  };
};

const simulationOf = (
  nodes: readonly GraphNode[],
  edges: readonly GraphEdge[],
  options: GraphForceLayoutOptions | undefined,
): GraphForceSimulation => {
  const { source, target, edge } = indexGraph(nodes, edges);
  const n = nodes.length;
  const x = new Float64Array(n).fill(NaN);
  const y = new Float64Array(n).fill(NaN);
  const fixed = new Uint8Array(n);
  const radius = new Float64Array(n);
  nodes.forEach((node, i) => {
    if (Number.isFinite(node.x) && Number.isFinite(node.y)) {
      x[i] = node.x!;
      y[i] = node.y!;
      if (node.fixed) fixed[i] = 1;
    }
    radius[i] = options?.radius?.(node, i) ?? 6;
  });
  const values = Array.from(edge, (k) => edges[k].value);
  const known = values.filter((v): v is number => Number.isFinite(v) && v! > 0);
  const mean = known.length
    ? known.reduce((a, b) => a + b, 0) / known.length
    : 1;
  const weight = Float64Array.from(values, (v) =>
    Number.isFinite(v) && v! > 0
      ? Math.max(0.5, Math.min(2, Math.sqrt(v! / mean)))
      : 1,
  );
  return forceKernel()(
    forceInit(n, source, target, options, { x, y, fixed, radius, weight }),
  );
};

/**
 * A force simulation of the nodes and edges, stepped by the caller (no DOM,
 * no timers: usable in workers and mini-programs)
 */
export const createForceSimulation = (
  nodes: readonly GraphNode[],
  edges: readonly GraphEdge[],
  options?: GraphForceLayoutOptions,
): GraphForceSimulation => simulationOf(nodes, edges, options);

/** Runs a force simulation to the end and returns the positions (synchronous) */
export const forceLayout = (
  nodes: readonly GraphNode[],
  edges: readonly GraphEdge[],
  options?: GraphForceLayoutOptions,
): GraphLayoutResult => {
  const sim = simulationOf(nodes, edges, options);
  while (sim.tick(16));
  sim.settle();
  return { x: sim.x, y: sim.y };
};
