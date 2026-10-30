// Layered (Sugiyama) layout of directed graphs: cycle breaking (DFS),
// longest-path layering with a balancing pass, dummy nodes on long edges,
// barycenter / median crossing reduction with transposition, and
// coordinate assignment by weighted isotonic regression (long edges stay
// straight). Index-based core + id-based public wrappers, no DOM.

import { indexGraph } from "./force";
import type {
  GraphDagLayoutOptions,
  GraphDagLayoutResult,
  GraphCriticalPath,
  GraphDirection,
  GraphEdge,
  GraphNode,
} from "./types";

export interface LayeredInput {
  n: number;
  source: ArrayLike<number>;
  target: ArrayLike<number>;
  /** Width / height of each node */
  width: ArrayLike<number>;
  height: ArrayLike<number>;
  direction: GraphDirection;
  layerGap: number;
  nodeGap: number;
  sweeps: number;
}

/** Crossings between two consecutive layers (Fenwick tree, O(E log V)) */
const bilayerCrossings = (
  edges: [number, number][],
  lowerSize: number,
): number => {
  if (edges.length < 2) return 0;
  edges.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const tree = new Int32Array(lowerSize + 1);
  let crossings = 0;
  let seen = 0;
  for (const [, q] of edges) {
    // edges already inserted that end to the right of q
    let le = 0;
    for (let i = q + 1; i > 0; i -= i & -i) le += tree[i];
    crossings += seen - le;
    for (let i = q + 1; i <= lowerSize; i += i & -i) tree[i]++;
    seen++;
  }
  return crossings;
};

/**
 * Edge crossings of a layered drawing: `order[l]` lists the nodes of layer
 * `l` from left to right, `edges` are `[a, b]` pairs between consecutive
 * layers (other pairs are ignored)
 */
export const countCrossings = (
  order: readonly (readonly number[])[],
  edges: readonly (readonly [number, number])[],
): number => {
  const layerOf = new Map<number, number>();
  const pos = new Map<number, number>();
  order.forEach((layer, l) =>
    layer.forEach((v, i) => {
      layerOf.set(v, l);
      pos.set(v, i);
    }),
  );
  const between: [number, number][][] = order.map(() => []);
  for (const [a, b] of edges) {
    const la = layerOf.get(a);
    const lb = layerOf.get(b);
    if (la === undefined || lb === undefined) continue;
    if (lb === la + 1) between[la].push([pos.get(a)!, pos.get(b)!]);
    else if (la === lb + 1) between[lb].push([pos.get(b)!, pos.get(a)!]);
  }
  let total = 0;
  between.forEach((list, l) => {
    if (l + 1 < order.length)
      total += bilayerCrossings(list, order[l + 1].length);
  });
  return total;
};

/** Weighted isotonic regression (pool adjacent violators), in place */
const isotonic = (
  target: Float64Array,
  weight: Float64Array,
  count: number,
): void => {
  const blockW = new Float64Array(count);
  const blockV = new Float64Array(count);
  const blockN = new Int32Array(count);
  let top = 0;
  for (let i = 0; i < count; i++) {
    blockW[top] = weight[i];
    blockV[top] = target[i];
    blockN[top] = 1;
    top++;
    while (top > 1 && blockV[top - 2] > blockV[top - 1]) {
      const w = blockW[top - 2] + blockW[top - 1];
      blockV[top - 2] =
        (blockV[top - 2] * blockW[top - 2] +
          blockV[top - 1] * blockW[top - 1]) /
        w;
      blockW[top - 2] = w;
      blockN[top - 2] += blockN[top - 1];
      top--;
    }
  }
  let i = 0;
  for (let b = 0; b < top; b++) {
    for (let k = 0; k < blockN[b]; k++) target[i++] = blockV[b];
  }
};

/** The layered layout on index data */
export const layeredLayout = (input: LayeredInput): GraphDagLayoutResult => {
  const { n, direction } = input;
  const horizontal = direction === "LR" || direction === "RL";
  const breadth = horizontal ? input.height : input.width;
  const depth = horizontal ? input.width : input.height;
  const E = input.source.length;

  // ---------------------------------------------------- 1. cycles
  const out: number[][] = Array.from({ length: n }, () => []);
  const indeg = new Int32Array(n);
  for (let e = 0; e < E; e++) {
    const s = input.source[e];
    const t = input.target[e];
    if (s === t || s < 0 || t < 0 || s >= n || t >= n) continue;
    out[s].push(e);
    indeg[t]++;
  }
  const reversedEdge = new Uint8Array(E);
  const color = new Uint8Array(n);
  const visit = (start: number) => {
    const stack: [number, number][] = [[start, 0]];
    color[start] = 1;
    while (stack.length) {
      const top = stack[stack.length - 1];
      const [v, k] = top;
      if (k >= out[v].length) {
        color[v] = 2;
        stack.pop();
        continue;
      }
      top[1]++;
      const e = out[v][k];
      const w = input.target[e];
      if (color[w] === 1) reversedEdge[e] = 1;
      else if (color[w] === 0) {
        color[w] = 1;
        stack.push([w, 0]);
      }
    }
  };
  for (let v = 0; v < n; v++) if (!indeg[v] && !color[v]) visit(v);
  for (let v = 0; v < n; v++) if (!color[v]) visit(v);

  // acyclic, deduplicated edges
  const pairKey = new Map<number, number>();
  const accA: number[] = [];
  const accB: number[] = [];
  const chainOf = new Int32Array(E).fill(-1);
  for (let e = 0; e < E; e++) {
    const s = input.source[e];
    const t = input.target[e];
    if (s === t || s < 0 || t < 0 || s >= n || t >= n) continue;
    const a = reversedEdge[e] ? t : s;
    const b = reversedEdge[e] ? s : t;
    const key = a * n + b;
    let id = pairKey.get(key);
    if (id === undefined) {
      id = accA.length;
      pairKey.set(key, id);
      accA.push(a);
      accB.push(b);
    }
    chainOf[e] = id;
  }
  const A = accA.length;

  // ---------------------------------------------------- 2. layers
  const succ: number[][] = Array.from({ length: n }, () => []);
  const pred: number[][] = Array.from({ length: n }, () => []);
  for (let k = 0; k < A; k++) {
    succ[accA[k]].push(accB[k]);
    pred[accB[k]].push(accA[k]);
  }
  const topo: number[] = [];
  const remaining = Int32Array.from(pred, (p) => p.length);
  for (let v = 0; v < n; v++) if (!remaining[v]) topo.push(v);
  for (let i = 0; i < topo.length; i++) {
    for (const w of succ[topo[i]]) if (--remaining[w] === 0) topo.push(w);
  }
  const layer = new Int32Array(n);
  for (const v of topo) {
    for (const u of pred[v]) layer[v] = Math.max(layer[v], layer[u] + 1);
  }
  let maxLayer = 0;
  for (let v = 0; v < n; v++) maxLayer = Math.max(maxLayer, layer[v]);
  const layerCount = new Int32Array(maxLayer + 1);
  for (let v = 0; v < n; v++) layerCount[layer[v]]++;
  // balancing: move nodes within their feasible range (shorter edges, then emptier layers)
  for (let i = topo.length - 1; i >= 0; i--) {
    const v = topo[i];
    let lo = 0;
    for (const u of pred[v]) lo = Math.max(lo, layer[u] + 1);
    let hi = maxLayer;
    for (const w of succ[v]) hi = Math.min(hi, layer[w] - 1);
    if (!succ[v].length) hi = layer[v];
    if (hi <= lo) continue;
    const ins = pred[v].length;
    const outs = succ[v].length;
    let best = layer[v];
    if (outs > ins) best = hi;
    else if (ins > outs) best = lo;
    else {
      for (let l = lo; l <= hi; l++) {
        if (layerCount[l] < layerCount[best] - 1) best = l;
      }
    }
    if (best !== layer[v]) {
      layerCount[layer[v]]--;
      layerCount[best]++;
      layer[v] = best;
    }
  }

  // ---------------------------------------------------- 3. dummies
  // virtual nodes: 0..n-1 real, n.. dummies
  const vLayer: number[] = Array.from(layer);
  const vPred: number[][] = Array.from({ length: n }, () => []);
  const vSucc: number[][] = Array.from({ length: n }, () => []);
  const vWeight: number[][] = Array.from({ length: n }, () => []);
  const chains: number[][] = [];
  const link = (p: number, q: number, w: number) => {
    vSucc[p].push(q);
    vPred[q].push(p);
    vWeight[q].push(w);
  };
  for (let k = 0; k < A; k++) {
    const a = accA[k];
    const b = accB[k];
    const chain: number[] = [a];
    let prev = a;
    for (let l = layer[a] + 1; l < layer[b]; l++) {
      const d = vLayer.length;
      vLayer.push(l);
      vPred.push([]);
      vSucc.push([]);
      vWeight.push([]);
      link(prev, d, prev >= n ? 8 : 2);
      chain.push(d);
      prev = d;
    }
    link(prev, b, prev >= n ? 2 : 1);
    chain.push(b);
    chains.push(chain);
  }
  const N = vLayer.length;
  const L = maxLayer + 1;

  // ---------------------------------------------------- 4. ordering
  const layers: number[][] = Array.from({ length: L }, () => []);
  const placed = new Uint8Array(N);
  const place = (v: number) => {
    if (placed[v]) return;
    placed[v] = 1;
    layers[vLayer[v]].push(v);
  };
  // depth-first from the sources keeps related nodes together
  const firstOrder: number[] = [];
  const seen = new Uint8Array(N);
  const roots = topo.filter((v) => !vPred[v].length);
  for (const r of roots.length ? roots : [0]) {
    if (r >= N || seen[r]) continue;
    const stack = [r];
    while (stack.length) {
      const v = stack.pop()!;
      if (seen[v]) continue;
      seen[v] = 1;
      firstOrder.push(v);
      for (let k = vSucc[v].length - 1; k >= 0; k--) stack.push(vSucc[v][k]);
    }
  }
  for (const v of firstOrder) place(v);
  for (let v = 0; v < N; v++) place(v);

  const pos = new Float64Array(N);
  const updatePos = (list: number[]) => list.forEach((v, i) => (pos[v] = i));
  layers.forEach(updatePos);

  const totalCrossings = () => {
    let total = 0;
    for (let l = 0; l + 1 < L; l++) {
      const pairs: [number, number][] = [];
      for (const v of layers[l])
        for (const w of vSucc[v]) pairs.push([pos[v], pos[w]]);
      total += bilayerCrossings(pairs, layers[l + 1].length);
    }
    return total;
  };

  const initial = totalCrossings();
  let best = initial;
  let bestLayers = layers.map((l) => l.slice());
  const key = new Float64Array(N);
  const reorder = (l: number, useMedian: boolean, up: boolean) => {
    const list = layers[l];
    for (const v of list) {
      const nb = up ? vSucc[v] : vPred[v];
      if (!nb.length) {
        key[v] = -1;
        continue;
      }
      if (useMedian) {
        const p = nb.map((w) => pos[w]).sort((a, b) => a - b);
        const mid = p.length >> 1;
        key[v] = p.length % 2 ? p[mid] : (p[mid - 1] + p[mid]) / 2;
      } else {
        let s = 0;
        for (const w of nb) s += pos[w];
        key[v] = s / nb.length;
      }
    }
    // nodes without neighbors keep their slot
    const fixedSlots = list.map((v) => key[v] < 0);
    const movable = list
      .filter((v) => key[v] >= 0)
      .sort((a, b) => key[a] - key[b] || pos[a] - pos[b]);
    let k = 0;
    for (let i = 0; i < list.length; i++) {
      if (!fixedSlots[i]) list[i] = movable[k++];
    }
    updatePos(list);
  };

  const sweeps = Math.max(0, Math.floor(input.sweeps));
  for (let s = 0; s < sweeps && best > 0; s++) {
    const median = s % 4 >= 2;
    if (s % 2 === 0) for (let l = 1; l < L; l++) reorder(l, median, false);
    else for (let l = L - 2; l >= 0; l--) reorder(l, median, true);
    const c = totalCrossings();
    if (c < best) {
      best = c;
      bestLayers = layers.map((l) => l.slice());
    }
  }
  bestLayers.forEach((list, l) => {
    layers[l] = list;
    updatePos(list);
  });

  // transposition of neighbors while it helps (small graphs)
  if (N <= 3000 && best > 0) {
    const pairCrossings = (u: number, v: number) => {
      let c = 0;
      for (const nb of [vPred, vSucc]) {
        for (const a of nb[u]) for (const b of nb[v]) if (pos[a] > pos[b]) c++;
      }
      return c;
    };
    for (let pass = 0, improved = true; improved && pass < 8; pass++) {
      improved = false;
      for (const list of layers) {
        for (let i = 0; i + 1 < list.length; i++) {
          const u = list[i];
          const v = list[i + 1];
          if (pairCrossings(v, u) < pairCrossings(u, v)) {
            list[i] = v;
            list[i + 1] = u;
            pos[u] = i + 1;
            pos[v] = i;
            improved = true;
          }
        }
      }
    }
    best = totalCrossings();
  }

  // ---------------------------------------------------- 5. coordinates
  const size = (v: number) => (v < n ? breadth[v] : 0);
  const gapOf = (a: number, b: number) =>
    a < n && b < n ? input.nodeGap : input.nodeGap * 0.5;
  const bx = new Float64Array(N);
  for (const list of layers) {
    let cursor = 0;
    list.forEach((v, i) => {
      if (i)
        cursor += (size(list[i - 1]) + size(v)) / 2 + gapOf(list[i - 1], v);
      bx[v] = cursor;
    });
    const shift = cursor / 2;
    for (const v of list) bx[v] -= shift;
  }
  const target = new Float64Array(N);
  const weight = new Float64Array(N);
  const offset = new Float64Array(N);
  // weights of the edges seen from both ends
  const succWeight: number[][] = Array.from({ length: N }, () => []);
  for (let q = 0; q < N; q++) {
    vPred[q].forEach((p, k) => {
      succWeight[p][vSucc[p].indexOf(q)] = vWeight[q][k];
    });
  }
  const align = (list: number[], mode: "down" | "up" | "both") => {
    const count = list.length;
    if (!count) return;
    for (let i = 0; i < count; i++) {
      const v = list[i];
      let sw = 0;
      let sx = 0;
      if (mode !== "up") {
        vPred[v].forEach((p, k) => {
          sw += vWeight[v][k];
          sx += vWeight[v][k] * bx[p];
        });
      }
      if (mode !== "down") {
        vSucc[v].forEach((q, k) => {
          const w = succWeight[v][k] ?? 1;
          sw += w;
          sx += w * bx[q];
        });
      }
      offset[i] = i
        ? offset[i - 1] +
          (size(list[i - 1]) + size(v)) / 2 +
          gapOf(list[i - 1], v)
        : 0;
      target[i] = (sw ? sx / sw : bx[v]) - offset[i];
      weight[i] = sw || 0.05;
    }
    isotonic(target, weight, count);
    for (let i = 0; i < count; i++) bx[list[i]] = target[i] + offset[i];
  };
  for (let iter = 0; iter < 10; iter++) {
    if (iter % 2 === 0) for (let l = 1; l < L; l++) align(layers[l], "down");
    else for (let l = L - 2; l >= 0; l--) align(layers[l], "up");
  }
  for (let l = 0; l < L; l++) align(layers[l], "both");

  // layer depths
  const layerDepth = new Float64Array(L);
  for (let v = 0; v < n; v++)
    layerDepth[layer[v]] = Math.max(layerDepth[layer[v]], depth[v]);
  const layerPos = new Float64Array(L);
  for (let l = 1; l < L; l++) {
    layerPos[l] =
      layerPos[l - 1] +
      layerDepth[l - 1] / 2 +
      input.layerGap +
      layerDepth[l] / 2;
  }

  // ---------------------------------------------------- 6. output
  const toOut = (b: number, d: number): [number, number] => {
    switch (direction) {
      case "BT":
        return [b, -d];
      case "LR":
        return [d, b];
      case "RL":
        return [-d, b];
      default:
        return [b, d];
    }
  };
  const x = new Float64Array(n);
  const y = new Float64Array(n);
  for (let v = 0; v < n; v++) {
    const [px, py] = toOut(bx[v], layerPos[layer[v]]);
    x[v] = px;
    y[v] = py;
  }
  const routes: number[][] = [];
  const reversed: number[] = [];
  for (let e = 0; e < E; e++) {
    const id = chainOf[e];
    if (id < 0) {
      routes.push([]);
      continue;
    }
    if (reversedEdge[e]) reversed.push(e);
    const chain = chains[id];
    const pts: number[] = [];
    chain.forEach((v, i) => {
      const d = layerPos[vLayer[v]];
      let dd = d;
      if (i === 0) dd = d + depth[v] / 2;
      else if (i === chain.length - 1) dd = d - depth[v] / 2;
      const [px, py] = toOut(bx[v], dd);
      pts.push(px, py);
    });
    if (reversedEdge[e]) {
      const flipped: number[] = [];
      for (let i = pts.length - 2; i >= 0; i -= 2)
        flipped.push(pts[i], pts[i + 1]);
      routes.push(flipped);
    } else {
      routes.push(pts);
    }
  }
  const order = layers.map((list) =>
    list.map((v) => (v < n ? v : -1 - (v - n))),
  );
  return {
    x,
    y,
    layer,
    order,
    routes,
    reversed,
    crossings: { initial, final: best },
  };
};

/** Layered (Sugiyama) layout of a directed graph */
export const dagLayout = (
  nodes: readonly GraphNode[],
  edges: readonly GraphEdge[],
  options: GraphDagLayoutOptions = {},
): GraphDagLayoutResult => {
  const { source, target, edge } = indexGraph(nodes, edges);
  const width = new Float64Array(nodes.length);
  const height = new Float64Array(nodes.length);
  nodes.forEach((node, i) => {
    const [w, h] = options.size?.(node, i) ?? [24, 24];
    width[i] = w;
    height[i] = h;
  });
  const result = layeredLayout({
    n: nodes.length,
    source,
    target,
    width,
    height,
    direction: options.direction ?? "TB",
    layerGap: options.layerGap ?? 56,
    nodeGap: options.nodeGap ?? 24,
    sweeps: options.sweeps ?? 8,
  });
  // routes / reversed indices of the input edges
  const routes: number[][] = edges.map(() => []);
  edge.forEach((k, i) => (routes[k] = result.routes[i]));
  return {
    ...result,
    routes,
    reversed: result.reversed.map((i) => edge[i]),
  };
};

/** Index version of `criticalPath` */
export const longestPath = (
  n: number,
  source: ArrayLike<number>,
  target: ArrayLike<number>,
  duration: (i: number) => number,
): { nodes: number[]; edges: number[]; length: number } => {
  const E = source.length;
  const out: number[][] = Array.from({ length: n }, () => []);
  const indeg = new Int32Array(n);
  for (let e = 0; e < E; e++) {
    if (source[e] === target[e]) continue;
    out[source[e]].push(e);
    indeg[target[e]]++;
  }
  const order: number[] = [];
  for (let v = 0; v < n; v++) if (!indeg[v]) order.push(v);
  for (let i = 0; i < order.length; i++) {
    for (const e of out[order[i]])
      if (--indeg[target[e]] === 0) order.push(target[e]);
  }
  const dist = new Float64Array(n);
  const via = new Int32Array(n).fill(-1);
  const inOrder = new Uint8Array(n);
  for (const v of order) {
    inOrder[v] = 1;
    dist[v] += duration(v);
    for (const e of out[v]) {
      const w = target[e];
      if (dist[v] > dist[w]) {
        dist[w] = dist[v];
        via[w] = e;
      }
    }
  }
  let end = -1;
  for (const v of order) if (end < 0 || dist[v] > dist[end]) end = v;
  if (end < 0) return { nodes: [], edges: [], length: 0 };
  const nodes: number[] = [end];
  const edges: number[] = [];
  for (let v = end; via[v] >= 0 && inOrder[source[via[v]]];) {
    edges.push(via[v]);
    v = source[via[v]];
    nodes.push(v);
  }
  return { nodes: nodes.reverse(), edges: edges.reverse(), length: dist[end] };
};

/**
 * Critical path of a DAG: the chain of tasks with the largest total
 * duration (node `value`, 1 when omitted). Nodes on cycles are ignored.
 */
export const criticalPath = (
  nodes: readonly GraphNode[],
  edges: readonly GraphEdge[],
): GraphCriticalPath => {
  const { source, target, edge } = indexGraph(nodes, edges);
  const result = longestPath(nodes.length, source, target, (i) => {
    const v = nodes[i].value;
    return Number.isFinite(v) && v! >= 0 ? v! : 1;
  });
  return {
    nodes: result.nodes.map((i) => nodes[i].id),
    edges: result.edges.map((i) => edge[i]),
    length: result.length,
  };
};
