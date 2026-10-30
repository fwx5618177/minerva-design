// Circular layout (nodes on a circle, grouped) and arc diagram (nodes on a
// line, edges as arcs). No DOM.

import { indexGraph } from "./force";
import type {
  GraphCircularLayoutOptions,
  GraphCircularLayoutResult,
  GraphEdge,
  GraphNode,
} from "./types";

export interface CircularInput {
  n: number;
  source: ArrayLike<number>;
  target: ArrayLike<number>;
  /** Group index of each node (-1 = none) */
  group: ArrayLike<number>;
  order: "group" | "degree" | "none";
  spacing: number;
}

/** Placement order of the nodes */
const placementOrder = (input: CircularInput): number[] => {
  const { n } = input;
  const degree = new Int32Array(n);
  for (let e = 0; e < input.source.length; e++) {
    const s = input.source[e];
    const t = input.target[e];
    if (s < 0 || t < 0 || s >= n || t >= n) continue;
    degree[s]++;
    degree[t]++;
  }
  const order = Array.from({ length: n }, (_, i) => i);
  if (input.order === "none") return order;
  const groupKey = (i: number) => {
    const g = input.group[i];
    return g < 0 ? Number.MAX_SAFE_INTEGER : g;
  };
  return order.sort((a, b) =>
    input.order === "group"
      ? groupKey(a) - groupKey(b) || a - b
      : degree[b] - degree[a] || a - b,
  );
};

export const circularPositions = (
  input: CircularInput,
): GraphCircularLayoutResult => {
  const order = placementOrder(input);
  const { n } = input;
  const radius = Math.max(40, (n * input.spacing) / (2 * Math.PI));
  const x = new Float64Array(n);
  const y = new Float64Array(n);
  const angle = new Float64Array(n);
  // a small gap between groups makes them readable
  const groupBreaks: number[] = [];
  order.forEach((v, k) => {
    if (k && input.group[v] !== input.group[order[k - 1]]) groupBreaks.push(k);
  });
  const useBreaks = input.order === "group" && groupBreaks.length > 0;
  const slots = n + (useBreaks ? groupBreaks.length + 1 : 0);
  let slot = 0;
  order.forEach((v, k) => {
    if (useBreaks && groupBreaks.includes(k)) slot++;
    const a = (slot / Math.max(1, slots)) * Math.PI * 2 - Math.PI / 2;
    angle[v] = a;
    x[v] = n > 1 ? radius * Math.cos(a) : 0;
    y[v] = n > 1 ? radius * Math.sin(a) : 0;
    slot++;
  });
  return { x, y, angle, order, radius: n > 1 ? radius : 0 };
};

export const arcPositions = (
  input: CircularInput,
): GraphCircularLayoutResult => {
  const order = placementOrder(input);
  const { n } = input;
  const x = new Float64Array(n);
  const y = new Float64Array(n);
  const width = (n - 1) * input.spacing;
  order.forEach((v, k) => {
    x[v] = k * input.spacing - width / 2;
  });
  return { x, y, angle: new Float64Array(n), order, radius: 0 };
};

const inputOf = (
  nodes: readonly GraphNode[],
  edges: readonly GraphEdge[],
  options: GraphCircularLayoutOptions,
): CircularInput => {
  const { source, target } = indexGraph(nodes, edges);
  const groups = new Map<string, number>();
  const group = nodes.map((node) => {
    if (node.group === undefined) return -1;
    let g = groups.get(node.group);
    if (g === undefined) groups.set(node.group, (g = groups.size));
    return g;
  });
  return {
    n: nodes.length,
    source,
    target,
    group,
    order: options.order ?? "group",
    spacing: options.spacing ?? 18,
  };
};

/** Nodes on a circle, ordered by group (or degree) */
export const circularLayout = (
  nodes: readonly GraphNode[],
  edges: readonly GraphEdge[],
  options: GraphCircularLayoutOptions = {},
): GraphCircularLayoutResult =>
  circularPositions(inputOf(nodes, edges, options));

/** Nodes on a horizontal line (arc diagram), ordered by group (or degree) */
export const arcLayout = (
  nodes: readonly GraphNode[],
  edges: readonly GraphEdge[],
  options: GraphCircularLayoutOptions = {},
): GraphCircularLayoutResult => arcPositions(inputOf(nodes, edges, options));
