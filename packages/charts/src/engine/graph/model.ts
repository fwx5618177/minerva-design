// Index structures of the graph data: ids, valid edges, adjacency (CSR),
// degrees, groups.

import type { GraphEdge, GraphGroup, GraphNode } from "./types";

export interface GraphGroupModel {
  id: string;
  name: string;
  color?: string;
  /** Hidden by its `hidden` option */
  hidden: boolean;
  /** Number of nodes */
  count: number;
}

export interface GraphModel {
  nodes: readonly GraphNode[];
  n: number;
  /** Index of each node in the input (duplicate ids are skipped) */
  nodeInput: Int32Array;
  index: Map<string, number>;
  /** Valid edges (both ends known) */
  edges: GraphEdge[];
  /** Index of each valid edge in the input */
  edgeInput: Int32Array;
  m: number;
  source: Int32Array;
  target: Int32Array;
  /** Undirected adjacency: node → edges (CSR) */
  adjStart: Int32Array;
  adjEdge: Int32Array;
  inDegree: Int32Array;
  outDegree: Int32Array;
  groups: GraphGroupModel[];
  /** Group index of each node, -1 = none */
  groupOf: Int32Array;
  /** Value range of the nodes with a value */
  valueRange: [number, number] | null;
  /** Value range of the edges with a value */
  edgeValueRange: [number, number] | null;
  /** Nodes ordered by importance (value, then degree) */
  rank: Int32Array;
  /**
   * Parallel edges (same pair of nodes, either direction): offset of the
   * edge among them, centered on 0 and measured to the left of its own
   * direction; NaN for a single edge. Self-loops: index among the loops of
   * their node.
   */
  bend: Float64Array;
  /** Whether some edge is a self-loop */
  hasLoops: boolean;
}

const range = (values: (number | undefined)[]): [number, number] | null => {
  let min = Infinity;
  let max = -Infinity;
  for (const v of values) {
    if (v === undefined || !Number.isFinite(v)) continue;
    if (v < min) min = v;
    if (v > max) max = v;
  }
  return min <= max ? [min, max] : null;
};

export const buildModel = (
  nodes: readonly GraphNode[],
  edgesIn: readonly GraphEdge[],
  groupsIn: readonly GraphGroup[] | undefined,
): GraphModel => {
  const index = new Map<string, number>();
  const unique: GraphNode[] = [];
  const nodeInput: number[] = [];
  nodes.forEach((node, k) => {
    if (!node || typeof node.id !== "string" || index.has(node.id)) return;
    index.set(node.id, unique.length);
    unique.push(node);
    nodeInput.push(k);
  });
  const n = unique.length;
  const edges: GraphEdge[] = [];
  const input: number[] = [];
  const s: number[] = [];
  const t: number[] = [];
  edgesIn.forEach((edge, k) => {
    const a = index.get(edge?.source);
    const b = index.get(edge?.target);
    if (a === undefined || b === undefined) return;
    edges.push(edge);
    input.push(k);
    s.push(a);
    t.push(b);
  });
  const m = edges.length;
  const source = Int32Array.from(s);
  const target = Int32Array.from(t);
  const inDegree = new Int32Array(n);
  const outDegree = new Int32Array(n);
  const adjStart = new Int32Array(n + 1);
  for (let e = 0; e < m; e++) {
    outDegree[source[e]]++;
    inDegree[target[e]]++;
    adjStart[source[e] + 1]++;
    adjStart[target[e] + 1]++;
  }
  for (let i = 0; i < n; i++) adjStart[i + 1] += adjStart[i];
  const adjEdge = new Int32Array(m * 2);
  const cursor = adjStart.slice(0, n);
  for (let e = 0; e < m; e++) {
    adjEdge[cursor[source[e]]++] = e;
    adjEdge[cursor[target[e]]++] = e;
  }

  const groups: GraphGroupModel[] = [];
  const groupIndex = new Map<string, number>();
  for (const g of groupsIn ?? []) {
    if (!g || groupIndex.has(g.id)) continue;
    groupIndex.set(g.id, groups.length);
    groups.push({
      id: g.id,
      name: g.name ?? g.id,
      color: g.color,
      hidden: !!g.hidden,
      count: 0,
    });
  }
  const groupOf = new Int32Array(n).fill(-1);
  unique.forEach((node, i) => {
    if (node.group === undefined || node.group === null) return;
    const id = String(node.group);
    let g = groupIndex.get(id);
    if (g === undefined) {
      g = groups.length;
      groupIndex.set(id, g);
      groups.push({ id, name: id, hidden: false, count: 0 });
    }
    groups[g].count++;
    groupOf[i] = g;
  });

  const degree = (i: number) => inDegree[i] + outDegree[i];
  const rank = Int32Array.from({ length: n }, (_, i) => i).sort((a, b) => {
    const va = unique[a].value;
    const vb = unique[b].value;
    const fa = Number.isFinite(va) ? va! : -Infinity;
    const fb = Number.isFinite(vb) ? vb! : -Infinity;
    return fb - fa || degree(b) - degree(a) || a - b;
  });

  return {
    nodes: unique,
    n,
    nodeInput: Int32Array.from(nodeInput),
    index,
    edges,
    edgeInput: Int32Array.from(input),
    m,
    source,
    target,
    adjStart,
    adjEdge,
    inDegree,
    outDegree,
    groups,
    groupOf,
    valueRange: range(unique.map((node) => node.value)),
    edgeValueRange: range(edges.map((edge) => edge.value)),
    rank,
    ...bends(n, source, target),
  };
};

/** Offsets of the parallel edges and indices of the self-loops */
const bends = (
  n: number,
  source: Int32Array,
  target: Int32Array,
): { bend: Float64Array; hasLoops: boolean } => {
  const m = source.length;
  const bend = new Float64Array(m).fill(NaN);
  const loops = new Int32Array(n);
  const pairs = new Map<number, number[]>();
  let hasLoops = false;
  for (let e = 0; e < m; e++) {
    const s = source[e];
    const t = target[e];
    if (s === t) {
      bend[e] = loops[s]++;
      hasLoops = true;
      continue;
    }
    const key = s < t ? s * n + t : t * n + s;
    const list = pairs.get(key);
    if (list) list.push(e);
    else pairs.set(key, [e]);
  }
  for (const list of pairs.values()) {
    if (list.length < 2) continue;
    list.forEach((e, k) => {
      // slots are counted on the side of the lower → higher direction
      const slot = k - (list.length - 1) / 2;
      bend[e] = source[e] < target[e] ? slot : -slot;
    });
  }
  return { bend, hasLoops };
};

/** Neighbors of a node and the edges between them */
export const neighborhood = (
  model: GraphModel,
  i: number,
  nodes: Uint8Array,
  edges: Uint8Array,
): void => {
  nodes[i] = 1;
  for (let k = model.adjStart[i]; k < model.adjStart[i + 1]; k++) {
    const e = model.adjEdge[k];
    edges[e] = 1;
    nodes[model.source[e]] = 1;
    nodes[model.target[e]] = 1;
  }
};

/** Ancestors and descendants of a node and the edges of these paths */
export const lineage = (
  model: GraphModel,
  i: number,
  nodes: Uint8Array,
  edges: Uint8Array,
): void => {
  nodes[i] = 1;
  for (const down of [true, false]) {
    const seen = new Uint8Array(model.n);
    seen[i] = 1;
    const queue = [i];
    for (let q = 0; q < queue.length; q++) {
      const v = queue[q];
      for (let k = model.adjStart[v]; k < model.adjStart[v + 1]; k++) {
        const e = model.adjEdge[k];
        const from = down ? model.source[e] : model.target[e];
        const to = down ? model.target[e] : model.source[e];
        if (from !== v) continue;
        edges[e] = 1;
        nodes[to] = 1;
        if (!seen[to]) {
          seen[to] = 1;
          queue.push(to);
        }
      }
    }
  }
};
