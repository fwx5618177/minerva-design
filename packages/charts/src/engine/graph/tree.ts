// Tree layouts: tidy tree (Buchheim / Walker, linear time, d3-hierarchy's
// formulation with size-aware separation), radial tree, two-sided mind map
// and org chart. Collapsed nodes hide their descendants. No DOM.

import { indexGraph } from "./force";
import type {
  GraphDirection,
  GraphEdge,
  GraphNode,
  GraphTreeLayoutOptions,
  GraphTreeLayoutResult,
} from "./types";

export type TreeType = "tree" | "radial" | "mindmap" | "org";

export interface TreeInput {
  n: number;
  source: ArrayLike<number>;
  target: ArrayLike<number>;
  width: ArrayLike<number>;
  height: ArrayLike<number>;
  type: TreeType;
  direction: GraphDirection;
  /** Index of the root, -1 = nodes without a parent */
  root: number;
  levelGap: number;
  siblingGap: number;
  collapsed: ReadonlySet<number>;
  /** Org charts: leaf children are stacked in a column under their parent */
  compact?: boolean;
}

/** Shift of stacked org chart cards to the right of their parent (room for the connector) */
export const STACK_SHIFT = 18;

/** Default gap between levels of each tree type */
export const TREE_LEVEL_GAP: Record<TreeType, number> = {
  tree: 56,
  radial: 90,
  mindmap: 40,
  org: 44,
};

interface TN {
  i: number;
  parent: TN | null;
  children: TN[];
  A: TN | null;
  a: TN;
  z: number;
  m: number;
  c: number;
  s: number;
  t: TN | null;
  idx: number;
  depth: number;
}

const tn = (i: number, depth: number): TN => {
  const node = {
    i,
    parent: null,
    children: [],
    A: null,
    z: 0,
    m: 0,
    c: 0,
    s: 0,
    t: null,
    idx: 0,
    depth,
  } as unknown as TN;
  node.a = node;
  return node;
};

const nextLeft = (v: TN) => (v.children.length ? v.children[0] : v.t);
const nextRight = (v: TN) =>
  v.children.length ? v.children[v.children.length - 1] : v.t;

const moveSubtree = (wm: TN, wp: TN, shift: number) => {
  const change = shift / (wp.idx - wm.idx);
  wp.c -= change;
  wp.s += shift;
  wm.c += change;
  wp.z += shift;
  wp.m += shift;
};

const executeShifts = (v: TN) => {
  let shift = 0;
  let change = 0;
  for (let i = v.children.length - 1; i >= 0; i--) {
    const w = v.children[i];
    w.z += shift;
    w.m += shift;
    shift += w.s + (change += w.c);
  }
};

const nextAncestor = (vim: TN, v: TN, ancestor: TN) =>
  vim.a.parent === v.parent ? vim.a : ancestor;

/**
 * Tidy layout of the tree below `root` (whose `parent` must be set to a
 * holder node): writes the breadth coordinate of every node in `out`
 */
const tidy = (
  root: TN,
  separation: (a: TN, b: TN) => number,
  out: Float64Array,
) => {
  const apportion = (v: TN, w: TN | null, ancestor: TN): TN => {
    if (!w) return ancestor;
    let vip: TN | null = v;
    let vop: TN = v;
    let vim: TN | null = w;
    let vom: TN = vip.parent!.children[0];
    let sip = vip.m;
    let sop = vop.m;
    let sim = vim.m;
    let som = vom.m;
    for (;;) {
      vim = nextRight(vim);
      vip = nextLeft(vip);
      if (!vim || !vip) break;
      vom = nextLeft(vom)!;
      vop = nextRight(vop)!;
      vop.a = v;
      const shift = vim.z + sim - vip.z - sip + separation(vim, vip);
      if (shift > 0) {
        moveSubtree(nextAncestor(vim, v, ancestor), v, shift);
        sip += shift;
        sop += shift;
      }
      sim += vim.m;
      sip += vip.m;
      som += vom.m;
      sop += vop.m;
    }
    if (vim && !nextRight(vop)) {
      vop.t = vim;
      vop.m += sim - sop;
    }
    if (vip && !nextLeft(vom)) {
      vom.t = vip;
      vom.m += sip - som;
      ancestor = v;
    }
    return ancestor;
  };

  const firstWalk = (v: TN) => {
    const siblings = v.parent!.children;
    const w = v.idx ? siblings[v.idx - 1] : null;
    if (v.children.length) {
      executeShifts(v);
      const midpoint =
        (v.children[0].z + v.children[v.children.length - 1].z) / 2;
      if (w) {
        v.z = w.z + separation(v, w);
        v.m = v.z - midpoint;
      } else {
        v.z = midpoint;
      }
    } else if (w) {
      v.z = w.z + separation(v, w);
    }
    v.parent!.A = apportion(v, w, v.parent!.A || siblings[0]);
  };

  // pre-order (right to left); reversed it is the post-order (left to right)
  const pre: TN[] = [];
  const stack = [root];
  while (stack.length) {
    const v = stack.pop()!;
    pre.push(v);
    for (const c of v.children) stack.push(c);
  }
  for (let k = pre.length - 1; k >= 0; k--) firstWalk(pre[k]);
  root.parent!.m = -root.z;
  // parents before children
  const order: TN[] = [root];
  for (let k = 0; k < order.length; k++) {
    const v = order[k];
    if (v.i >= 0) out[v.i] = v.z + v.parent!.m;
    v.m += v.parent!.m;
    for (const c of v.children) order.push(c);
  }
};

/** Tree layouts on index data */
export const tidyTreeLayout = (input: TreeInput): GraphTreeLayoutResult => {
  const { n, type } = input;
  const out: number[][] = Array.from({ length: n }, () => []);
  const hasParent = new Uint8Array(n);
  for (let e = 0; e < input.source.length; e++) {
    const s = input.source[e];
    const t = input.target[e];
    if (s === t || s < 0 || t < 0 || s >= n || t >= n) continue;
    out[s].push(t);
    hasParent[t] = 1;
  }
  const parent = new Int32Array(n).fill(-1);
  const depth = new Int32Array(n);
  const children: number[][] = Array.from({ length: n }, () => []);
  const visited = new Uint8Array(n);
  const roots: number[] = [];
  const grow = (r: number) => {
    if (visited[r]) return;
    visited[r] = 1;
    roots.push(r);
    const queue = [r];
    for (let k = 0; k < queue.length; k++) {
      const v = queue[k];
      for (const w of out[v]) {
        if (visited[w]) continue;
        visited[w] = 1;
        parent[w] = v;
        depth[w] = depth[v] + 1;
        children[v].push(w);
        queue.push(w);
      }
    }
  };
  if (input.root >= 0 && input.root < n) grow(input.root);
  for (let v = 0; v < n; v++) if (!hasParent[v]) grow(v);
  for (let v = 0; v < n; v++) grow(v);

  // visible nodes (descendants of collapsed nodes are hidden)
  const visible = new Uint8Array(n);
  const shown: number[] = [];
  for (const r of roots) {
    const queue = [r];
    visible[r] = 1;
    for (let k = 0; k < queue.length; k++) {
      const v = queue[k];
      shown.push(v);
      if (input.collapsed.has(v)) continue;
      for (const c of children[v]) {
        visible[c] = 1;
        queue.push(c);
      }
    }
  }

  // org charts: the leaf children of a node form a column (compact)
  const stackedParent = new Uint8Array(n);
  const stacked = new Uint8Array(n);
  const ldepth = Int32Array.from(depth);
  if (type === "org" && input.compact !== false) {
    for (const v of shown) {
      if (input.collapsed.has(v)) continue;
      const kids = children[v];
      if (
        kids.length >= 2 &&
        kids.every((c) => input.collapsed.has(c) || !children[c].length)
      ) {
        stackedParent[v] = 1;
        kids.forEach((c) => (stacked[c] = 1));
      }
    }
  }
  for (const v of shown) {
    const p = parent[v];
    if (p < 0) continue;
    ldepth[v] = ldepth[p] + 1 + (stacked[v] ? children[p].indexOf(v) : 0);
  }

  const horizontal =
    type === "mindmap" ||
    (type === "tree" && (input.direction === "LR" || input.direction === "RL"));
  const breadth = (i: number) =>
    type === "radial"
      ? Math.max(input.width[i], input.height[i])
      : horizontal
        ? input.height[i]
        : input.width[i] + (stacked[i] ? STACK_SHIFT * 2 : 0);
  const along = (i: number) =>
    type === "radial"
      ? Math.max(input.width[i], input.height[i])
      : horizontal
        ? input.width[i]
        : input.height[i];
  const gap = input.siblingGap;
  const separation = (a: TN, b: TN) => {
    const base =
      (breadth(a.i) + breadth(b.i)) / 2 +
      gap * (a.parent === b.parent ? 1 : 1.5);
    return type === "radial" ? base / Math.max(1, a.depth) : base;
  };

  /** Builds the visible subtree of `i` (with `kids` as its children when given) */
  const build = (i: number, kids?: number[], depthOffset = 0): TN => {
    const top = tn(i, ldepth[i] + depthOffset);
    const stack: [TN, number[]][] = [
      [top, kids ?? (input.collapsed.has(i) ? [] : children[i])],
    ];
    while (stack.length) {
      const [node, list] = stack.pop()!;
      if (!kids || node !== top) {
        if (stackedParent[node.i] && list.length) {
          // a chain: every card is the only child of the previous one
          let prev = node;
          for (const c of list) {
            const child = tn(c, ldepth[c] + depthOffset);
            child.parent = prev;
            prev.children.push(child);
            prev = child;
          }
          continue;
        }
      }
      list.forEach((c, k) => {
        const child = tn(c, ldepth[c] + depthOffset);
        child.parent = node;
        child.idx = k;
        node.children.push(child);
        stack.push([child, input.collapsed.has(c) ? [] : children[c]]);
      });
    }
    return top;
  };
  const holder = (root: TN) => {
    const h = tn(-1, -1);
    h.children = [root];
    root.parent = h;
    return h;
  };

  const X = new Float64Array(n);
  const x = new Float64Array(n);
  const y = new Float64Array(n);
  const side = new Float64Array(n);
  const levelGap = input.levelGap;

  if (type === "mindmap" && roots.length) {
    const center = roots[0];
    const kids = [
      ...(input.collapsed.has(center) ? [] : children[center]),
      ...roots.slice(1),
    ];
    const leaves = (i: number): number => {
      let count = 0;
      const stack = [i];
      while (stack.length) {
        const v = stack.pop()!;
        const list = input.collapsed.has(v) ? [] : children[v];
        if (!list.length) count++;
        else stack.push(...list);
      }
      return count;
    };
    const weights = kids.map(leaves);
    const total = weights.reduce((a, b) => a + b, 0);
    let acc = 0;
    let split = 0;
    while (split < kids.length && (acc < total / 2 || split === 0)) {
      acc += weights[split++];
    }
    const sides: [number[], number][] = [
      [kids.slice(0, split), 1],
      [kids.slice(split), -1],
    ];
    const dpos = new Float64Array(n);
    for (const [list, dir] of sides) {
      if (!list.length) continue;
      const root = build(center, list);
      holder(root);
      tidy(root, separation, X);
      const base = X[center];
      // the extra roots hang below the center
      const order: TN[] = [root];
      for (let k = 0; k < order.length; k++) {
        const v = order[k];
        for (const c of v.children) {
          dpos[c.i] = dpos[v.i] + (along(v.i) + along(c.i)) / 2 + levelGap;
          x[c.i] = dir * dpos[c.i];
          y[c.i] = X[c.i] - base;
          side[c.i] = dir;
          order.push(c);
        }
      }
    }
    x[center] = 0;
    y[center] = 0;
  } else if (roots.length) {
    // several roots: a virtual parent keeps them side by side
    const multi = roots.length > 1;
    let top: TN;
    if (multi) {
      top = tn(-1, -1);
      roots.forEach((r, k) => {
        const sub = build(r);
        sub.parent = top;
        sub.idx = k;
        top.children.push(sub);
      });
    } else {
      top = build(roots[0]);
    }
    holder(top);
    tidy(top, separation, X);

    if (type === "radial") {
      let min = Infinity;
      let max = -Infinity;
      let maxDepth = 0;
      for (const v of shown) {
        min = Math.min(min, X[v]);
        max = Math.max(max, X[v]);
        maxDepth = Math.max(maxDepth, depth[v]);
      }
      let typical = 0;
      for (const v of shown) typical = Math.max(typical, breadth(v));
      const span = max - min + (typical + gap) / Math.max(1, maxDepth);
      const ring = Math.max(levelGap, span / (2 * Math.PI));
      for (const v of shown) {
        const a = span > 0 ? ((X[v] - min) / span) * Math.PI * 2 : 0;
        const r = (depth[v] + (multi ? 1 : 0)) * ring;
        side[v] = a - Math.PI / 2;
        x[v] = r * Math.cos(side[v]);
        y[v] = r * Math.sin(side[v]);
      }
    } else {
      const levels: number[] = [];
      // levels holding only the rest of card columns are packed tighter
      const tight: boolean[] = [];
      for (const v of shown) {
        const d = ldepth[v];
        levels[d] = Math.max(levels[d] ?? 0, along(v));
        const rest = !!stacked[v] && children[parent[v]].indexOf(v) > 0;
        tight[d] = (tight[d] ?? true) && rest;
      }
      const levelPos = [0];
      for (let d = 1; d < levels.length; d++) {
        levelPos[d] =
          levelPos[d - 1] +
          ((levels[d - 1] ?? 0) + (levels[d] ?? 0)) / 2 +
          (tight[d] ? Math.max(10, gap) : levelGap);
      }
      const dir = type === "org" ? "TB" : input.direction;
      for (const v of shown) {
        const b = X[v] + (stacked[v] ? STACK_SHIFT : 0);
        const d = levelPos[ldepth[v]];
        if (dir === "LR") {
          x[v] = d;
          y[v] = b;
        } else if (dir === "RL") {
          x[v] = -d;
          y[v] = b;
        } else if (dir === "BT") {
          x[v] = b;
          y[v] = -d;
        } else {
          x[v] = b;
          y[v] = d;
        }
      }
    }
  }

  // hidden nodes sit on their closest visible ancestor (collapse animations)
  for (let v = 0; v < n; v++) {
    if (visible[v]) continue;
    let a = parent[v];
    while (a >= 0 && !visible[a]) a = parent[a];
    if (a >= 0) {
      x[v] = x[a];
      y[v] = y[a];
      side[v] = side[a];
    }
  }
  return { x, y, parent, depth, visible, side, children, stacked };
};

/**
 * Tree layouts of a hierarchy given as parent → child edges: tidy tree,
 * radial tree, two-sided mind map or org chart. Edges that would make a
 * cycle or give a second parent are ignored.
 */
export const treeLayout = (
  nodes: readonly GraphNode[],
  edges: readonly GraphEdge[],
  options: GraphTreeLayoutOptions = {},
): GraphTreeLayoutResult => {
  const { index, source, target } = indexGraph(nodes, edges);
  const type = options.type ?? "tree";
  const width = new Float64Array(nodes.length);
  const height = new Float64Array(nodes.length);
  const card = options.cardSize ?? [168, 60];
  nodes.forEach((node, i) => {
    const [w, h] =
      options.size?.(node, i) ?? (type === "org" ? card : [16, 16]);
    width[i] = w;
    height[i] = h;
  });
  return tidyTreeLayout({
    n: nodes.length,
    source,
    target,
    width,
    height,
    type,
    direction: options.direction ?? "LR",
    root: options.root !== undefined ? (index.get(options.root) ?? -1) : -1,
    levelGap: options.levelGap ?? TREE_LEVEL_GAP[type],
    siblingGap: options.siblingGap ?? 12,
    collapsed: options.collapsed ?? new Set(),
    compact: options.compact,
  });
};
