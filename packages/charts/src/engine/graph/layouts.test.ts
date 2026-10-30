import { describe, expect, it } from "vitest";
import { arcLayout, circularLayout } from "./circular";
import {
  countCrossings,
  criticalPath,
  dagLayout,
  layeredLayout,
  longestPath,
} from "./dag";
import {
  createForceSimulation,
  forceKernel,
  forceInit,
  forceLayout,
  indexGraph,
} from "./force";
import {
  arcPath,
  arrowHead,
  boundaryDistance,
  dashPath,
  distanceToPath,
  endDirection,
  orthogonalPath,
  pathLength,
  pointAt,
  quadraticPath,
  roundCorners,
  splinePath,
  trimPath,
} from "./geometry";
import { GRAPH_LABELS, fill, graphLocale } from "./labels";
import { buildModel, lineage, neighborhood } from "./model";
import { tidyTreeLayout, treeLayout } from "./tree";
import type { GraphEdge, GraphNode } from "./types";

const nodes = (count: number, group?: (i: number) => string): GraphNode[] =>
  Array.from({ length: count }, (_, i) => ({ id: `n${i}`, group: group?.(i) }));

const edge = (a: number, b: number): GraphEdge => ({
  source: `n${a}`,
  target: `n${b}`,
});

/** Random graph with a seed (communities of 10 nodes) */
const community = (count: number, seed = 3) => {
  let s = seed;
  const rnd = () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
  const edges: GraphEdge[] = [];
  for (let i = 1; i < count; i++) {
    const base = Math.floor(i / 10) * 10;
    edges.push(edge(i, base + Math.floor(rnd() * (i - base || 1))));
    if (rnd() < 0.1) edges.push(edge(i, Math.floor(rnd() * i)));
  }
  return { nodes: nodes(count, (i) => `g${Math.floor(i / 10) % 5}`), edges };
};

describe("force layout", () => {
  it("is deterministic for a seed", () => {
    const g = community(80);
    const a = forceLayout(g.nodes, g.edges, { seed: 7 });
    const b = forceLayout(g.nodes, g.edges, { seed: 7 });
    expect(Array.from(a.x)).toEqual(Array.from(b.x));
    expect(Array.from(a.y)).toEqual(Array.from(b.y));
    expect(a.x.every(Number.isFinite)).toBe(true);
  });

  it("leaves no overlapping nodes after the collisions", () => {
    const g = community(120);
    const radius = 9;
    const result = forceLayout(g.nodes, g.edges, {
      radius: () => radius,
      charge: -5,
      linkDistance: 2,
      collide: 1,
    });
    let overlaps = 0;
    for (let i = 0; i < 120; i++) {
      for (let j = i + 1; j < 120; j++) {
        const d = Math.hypot(
          result.x[i] - result.x[j],
          result.y[i] - result.y[j],
        );
        if (d < radius * 2 - 1e-6) overlaps++;
      }
    }
    expect(overlaps).toBe(0);
  });

  it("keeps linked nodes closer than unlinked ones and pins fixed nodes", () => {
    const list: GraphNode[] = [
      { id: "a", x: 100, y: 50, fixed: true },
      { id: "b" },
      { id: "c" },
      { id: "d" },
    ];
    const result = forceLayout(list, [
      { source: "a", target: "b" },
      { source: "b", target: "c" },
      { source: "x", target: "c" },
    ]);
    expect(result.x[0]).toBe(100);
    expect(result.y[0]).toBe(50);
    const ab = Math.hypot(result.x[0] - result.x[1], result.y[0] - result.y[1]);
    const ad = Math.hypot(result.x[0] - result.x[3], result.y[0] - result.y[3]);
    expect(ab).toBeLessThan(ad);
  });

  it("steps, drags, releases and reheats a simulation", () => {
    const g = community(30);
    const sim = createForceSimulation(g.nodes, g.edges, {
      collide: false,
      linkStrength: 0.5,
      iterations: 20,
    });
    expect(sim.alpha()).toBe(1);
    expect(sim.tick()).toBe(true);
    sim.drag(3, 500, 500);
    sim.tick(5);
    expect(sim.x[3]).toBe(500);
    // a dragged simulation stays warm
    sim.tick(200);
    expect(sim.done()).toBe(false);
    sim.release(3);
    while (sim.tick(50));
    expect(sim.done()).toBe(true);
    expect(sim.tick()).toBe(false);
    sim.reheat();
    expect(sim.alpha()).toBeCloseTo(0.3);
    sim.reheat(0.1);
    expect(sim.alpha()).toBeCloseTo(0.3);
    sim.release(99);
    sim.drag(-1, 0, 0);
    sim.settle();
  });

  it("handles coincident and empty inputs", () => {
    const list: GraphNode[] = Array.from({ length: 6 }, (_, i) => ({
      id: `p${i}`,
      x: 0,
      y: 0,
    }));
    const result = forceLayout(list, [], { collide: 0 });
    expect(
      new Set(Array.from(result.x, (v) => v.toFixed(3))).size,
    ).toBeGreaterThan(1);
    expect(forceLayout([], []).x.length).toBe(0);
    expect(
      forceLayout([{ id: "solo" }], [], { charge: 0, gravity: 0 }).x.length,
    ).toBe(1);
  });

  it("weights links with values", () => {
    const list = nodes(4);
    const result = forceLayout(list, [
      { ...edge(0, 1), value: 10 },
      { ...edge(1, 2), value: 1 },
      { ...edge(2, 3), value: -1 },
    ]);
    expect(result.x.every(Number.isFinite)).toBe(true);
  });

  it("serializes into a self-contained kernel", () => {
    const kernel = new Function(
      `return (${forceKernel.toString()})();`,
    )() as ReturnType<typeof forceKernel>;
    const { source, target } = indexGraph(nodes(3), [edge(0, 1)]);
    const sim = kernel({
      n: 3,
      x: new Float64Array(3).fill(NaN),
      y: new Float64Array(3).fill(NaN),
      radius: new Float64Array(3).fill(4),
      fixed: new Uint8Array(3),
      source,
      target,
      weight: new Float64Array(1).fill(1),
      linkDistance: 30,
      linkStrength: NaN,
      charge: -30,
      theta: 0.9,
      gravity: 0.1,
      collide: 1,
      velocityDecay: 0.4,
      iterations: 50,
      seed: 0,
      alpha: 0,
      aspect: 2,
    });
    while (sim.tick(10));
    expect(sim.x.every(Number.isFinite)).toBe(true);
  });

  it("turns a fresh layout's long axis toward the long side of the view", () => {
    // a chain is long and thin: its axis follows the aspect of the view
    const list = nodes(16);
    const chain = Array.from({ length: 15 }, (_, i) => edge(i, i + 1));
    const { source, target } = indexGraph(list, chain);
    const run = (aspect: number, alpha = 1, pin = -1) => {
      const fixed = new Uint8Array(16);
      const x = new Float64Array(16).fill(NaN);
      const y = new Float64Array(16).fill(NaN);
      if (pin >= 0) {
        fixed[pin] = 1;
        x[pin] = 0;
        y[pin] = 0;
      }
      const sim = forceKernel()({
        ...forceInit(16, source, target, { gravity: 0 }, { aspect, alpha }),
        x,
        y,
        fixed,
      });
      while (sim.tick(20));
      const span = (v: Float64Array) => Math.max(...v) - Math.min(...v);
      return { w: span(sim.x), h: span(sim.y), x: Array.from(sim.x) };
    };
    const wide = run(2);
    expect(wide.w).toBeGreaterThan(wide.h * 1.5);
    const tall = run(0.5);
    expect(tall.h).toBeGreaterThan(tall.w * 1.5);
    // deterministic
    expect(run(2).x).toEqual(wide.x);
    // square views, refined layouts and pinned nodes are left as they are
    const square = run(1);
    expect(run(2, 0.5).x).toEqual(run(1, 0.5).x);
    expect(run(2, 1, 0).x).toEqual(run(1, 1, 0).x);
    expect(square.x).not.toEqual(wide.x);
    // a round layout has no axis to turn
    const ring = Array.from({ length: 12 }, (_, i) => edge(i, (i + 1) % 12));
    const r = indexGraph(nodes(12), ring);
    const sim = forceKernel()(
      forceInit(12, r.source, r.target, {}, { aspect: 3 }),
    );
    while (sim.tick(20));
    expect(sim.x.every(Number.isFinite)).toBe(true);
  });
});

describe("dag layout", () => {
  const chainEdges = [
    edge(0, 1),
    edge(1, 2),
    edge(0, 3),
    edge(3, 4),
    edge(2, 4),
    edge(0, 4),
  ];

  it("puts every edge target on a later layer", () => {
    const result = dagLayout(nodes(5), chainEdges);
    for (const e of chainEdges) {
      const s = Number(e.source.slice(1));
      const t = Number(e.target.slice(1));
      expect(result.layer[t]).toBeGreaterThan(result.layer[s]);
      expect(result.y[t]).toBeGreaterThan(result.y[s]);
    }
    // the long edge 0 → 4 goes through dummy nodes
    const flat = result.order.flat();
    expect(flat.some((v) => v < 0)).toBe(true);
    const route = result.routes[5];
    expect(route.length).toBeGreaterThan(4);
  });

  it("breaks cycles and ignores self loops / unknown ids", () => {
    const list = nodes(3);
    const edges = [
      edge(0, 1),
      edge(1, 2),
      edge(2, 0),
      edge(1, 1),
      { source: "n0", target: "zz" },
    ];
    const result = dagLayout(list, edges);
    expect(result.reversed.length).toBe(1);
    expect(result.routes[3]).toEqual([]);
    expect(result.routes[4]).toEqual([]);
    // the reversed edge still starts at its source
    const r = result.routes[result.reversed[0]];
    const s = Number(edges[result.reversed[0]].source.slice(1));
    expect(Math.abs(r[0] - result.x[s])).toBeLessThan(1e-6);
  });

  it("reduces crossings", () => {
    // two layers wired in reverse order
    const count = 8;
    const list = nodes(count * 2);
    const edges: GraphEdge[] = [];
    for (let i = 0; i < count; i++) {
      edges.push(edge(i, count * 2 - 1 - i));
      edges.push(edge(i, count + ((i * 3) % count)));
    }
    const result = dagLayout(list, edges, { sweeps: 6 });
    expect(result.crossings.final).toBeLessThan(result.crossings.initial);
    // countCrossings agrees with the result
    const pairs = edges.map(
      (e) => [Number(e.source.slice(1)), Number(e.target.slice(1))] as const,
    );
    expect(countCrossings(result.order, pairs)).toBe(result.crossings.final);
    expect(
      countCrossings(
        [
          [0, 1],
          [2, 3],
        ],
        [
          [0, 3],
          [1, 2],
          [3, 0],
          [7, 1],
        ],
      ),
    ).toBe(2);
  });

  it("keeps nodes of a layer apart", () => {
    const g = community(60);
    const result = dagLayout(g.nodes, g.edges, {
      size: () => [40, 20],
      nodeGap: 10,
    });
    for (const layer of result.order) {
      const real = layer
        .filter((v) => v >= 0)
        .map((v) => result.x[v])
        .sort((a, b) => a - b);
      for (let i = 1; i < real.length; i++)
        expect(real[i] - real[i - 1]).toBeGreaterThanOrEqual(50 - 1e-6);
    }
  });

  it("supports every direction", () => {
    const tb = dagLayout(nodes(5), chainEdges, { direction: "TB" });
    const bt = dagLayout(nodes(5), chainEdges, { direction: "BT" });
    const lr = dagLayout(nodes(5), chainEdges, { direction: "LR" });
    const rl = dagLayout(nodes(5), chainEdges, { direction: "RL" });
    expect(bt.y[4]).toBeLessThan(bt.y[0]);
    expect(lr.x[4]).toBeGreaterThan(lr.x[0]);
    expect(rl.x[4]).toBeLessThan(rl.x[0]);
    expect(lr.y[1]).toBeCloseTo(tb.x[1]);
  });

  it("balances sources next to their successors", () => {
    // n3 only feeds the last layer: it moves down
    const result = layeredLayout({
      n: 4,
      source: [0, 1, 3],
      target: [1, 2, 2],
      width: [10, 10, 10, 10],
      height: [10, 10, 10, 10],
      direction: "TB",
      layerGap: 20,
      nodeGap: 10,
      sweeps: 0,
    });
    expect(result.layer[3]).toBe(1);
  });

  it("finds the critical path", () => {
    const list: GraphNode[] = [
      { id: "a", value: 1 },
      { id: "b", value: 5 },
      { id: "c", value: 1 },
      { id: "d", value: 1 },
    ];
    const path = criticalPath(list, [
      { source: "a", target: "b" },
      { source: "a", target: "c" },
      { source: "b", target: "d" },
      { source: "c", target: "d" },
    ]);
    expect(path.nodes).toEqual(["a", "b", "d"]);
    expect(path.edges).toEqual([0, 2]);
    expect(path.length).toBe(7);
    expect(criticalPath([], []).nodes).toEqual([]);
    expect(longestPath(2, [0, 1, 0], [1, 0, 0], () => 1).nodes.length).toBe(0);
  });
});

describe("tree layout", () => {
  const treeEdges = (count: number, fanout: number) =>
    Array.from({ length: count - 1 }, (_, k) =>
      edge(Math.floor(k / fanout), k + 1),
    );

  it("has no overlaps and centers the parents", () => {
    const list = nodes(40);
    const edges = treeEdges(40, 3);
    const result = treeLayout(list, edges, {
      type: "tree",
      direction: "TB",
      size: () => [20, 10],
      siblingGap: 6,
    });
    // same depth: at least the node width + gap apart
    const byDepth = new Map<number, number[]>();
    result.depth.forEach((d, i) =>
      byDepth.set(d, [...(byDepth.get(d) ?? []), result.x[i]]),
    );
    for (const xs of byDepth.values()) {
      xs.sort((a, b) => a - b);
      for (let i = 1; i < xs.length; i++)
        expect(xs[i] - xs[i - 1]).toBeGreaterThanOrEqual(26 - 1e-6);
    }
    // parents above the middle of their children
    result.children.forEach((kids, i) => {
      if (!kids.length) return;
      const mid = (result.x[kids[0]] + result.x[kids[kids.length - 1]]) / 2;
      expect(result.x[i]).toBeCloseTo(mid, 6);
      expect(result.y[kids[0]]).toBeGreaterThan(result.y[i]);
    });
  });

  it("lays out left to right, bottom to top and right to left", () => {
    const list = nodes(7);
    const edges = treeEdges(7, 2);
    const lr = treeLayout(list, edges);
    expect(lr.x[1]).toBeGreaterThan(lr.x[0]);
    const rl = treeLayout(list, edges, { direction: "RL" });
    expect(rl.x[1]).toBeLessThan(rl.x[0]);
    const bt = treeLayout(list, edges, { direction: "BT" });
    expect(bt.y[1]).toBeLessThan(bt.y[0]);
  });

  it("hides the descendants of collapsed nodes at their ancestor", () => {
    const list = nodes(7);
    const edges = treeEdges(7, 2);
    const result = treeLayout(list, edges, { collapsed: new Set([1]) });
    expect(result.visible[3]).toBe(0);
    expect(result.x[3]).toBe(result.x[1]);
    expect(result.visible[2]).toBe(1);
  });

  it("builds radial trees, mind maps and org charts", () => {
    const list = nodes(15);
    const edges = treeEdges(15, 2);
    const radial = treeLayout(list, edges, { type: "radial" });
    expect(radial.x[0]).toBeCloseTo(0);
    expect(Math.hypot(radial.x[1], radial.y[1])).toBeGreaterThan(0);
    const mind = treeLayout(list, edges, {
      type: "mindmap",
      size: () => [40, 20],
    });
    expect(mind.side[1]).toBe(1);
    expect(mind.side[2]).toBe(-1);
    expect(mind.x[1]).toBeGreaterThan(0);
    expect(mind.x[2]).toBeLessThan(0);
    const org = treeLayout(list, edges, { type: "org" });
    expect(org.y[1]).toBeGreaterThan(org.y[0]);
    expect(Math.abs(org.x[1] - org.x[2])).toBeGreaterThanOrEqual(168);
  });

  it("stacks the leaf children of org chart nodes in a column", () => {
    const list = nodes(7);
    // n0 → n1 (→ n3, n4, n5) and n2 (→ n6)
    const edges = [
      edge(0, 1),
      edge(0, 2),
      edge(1, 3),
      edge(1, 4),
      edge(1, 5),
      edge(2, 6),
    ];
    const org = treeLayout(list, edges, { type: "org", cardSize: [100, 40] });
    expect(Array.from(org.stacked)).toEqual([0, 0, 0, 1, 1, 1, 0]);
    // one column right of the parent, top to bottom, tighter than the levels
    expect(org.x[3]).toBe(org.x[4]);
    expect(org.x[3]).toBeGreaterThan(org.x[1]);
    expect(org.y[4] - org.y[3]).toBeLessThan(org.y[3] - org.y[1]);
    expect(org.y[5]).toBeGreaterThan(org.y[4]);
    // n2 has a single child: no column
    expect(org.stacked[6]).toBe(0);
    const wide = treeLayout(list, edges, { type: "org", compact: false });
    expect(wide.stacked.every((v) => v === 0)).toBe(true);
    expect(wide.y[3]).toBe(wide.y[4]);
  });

  it("handles forests, cycles, a chosen root and extra parents", () => {
    const list = nodes(6);
    const edges = [
      edge(0, 1),
      edge(2, 3),
      edge(3, 2),
      edge(1, 4),
      edge(0, 4),
      edge(5, 5),
    ];
    const forest = treeLayout(list, edges);
    expect(forest.parent[0]).toBe(-1);
    expect(forest.parent[4]).toBe(0);
    expect(forest.visible.every((v) => v === 1)).toBe(true);
    const rooted = treeLayout(list, edges, { root: "n2" });
    expect(rooted.parent[2]).toBe(-1);
    expect(rooted.parent[3]).toBe(2);
    const radialForest = treeLayout(list, edges, { type: "radial" });
    expect(radialForest.x.every(Number.isFinite)).toBe(true);
    const mindForest = treeLayout(list, edges, { type: "mindmap" });
    expect(mindForest.x.every(Number.isFinite)).toBe(true);
    expect(treeLayout([], []).x.length).toBe(0);
  });

  it("is linear on deep chains (no recursion)", () => {
    const list = nodes(5000);
    const edges = Array.from({ length: 4999 }, (_, i) => edge(i, i + 1));
    const result = tidyTreeLayout({
      n: 5000,
      source: edges.map((_, i) => i),
      target: edges.map((_, i) => i + 1),
      width: new Float64Array(5000).fill(10),
      height: new Float64Array(5000).fill(10),
      type: "tree",
      direction: "TB",
      root: 0,
      levelGap: 10,
      siblingGap: 4,
      collapsed: new Set(),
    });
    expect(result.y[4999]).toBeGreaterThan(result.y[0]);
    expect(list.length).toBe(5000);
  });
});

describe("circular and arc layouts", () => {
  it("places the nodes on a circle grouped by group", () => {
    const list = nodes(12, (i) => (i % 2 ? "odd" : "even"));
    const result = circularLayout(list, [edge(0, 1)]);
    const r = Math.hypot(result.x[0], result.y[0]);
    for (let i = 0; i < 12; i++)
      expect(Math.hypot(result.x[i], result.y[i])).toBeCloseTo(r);
    expect(result.order.slice(0, 6).every((i) => i % 2 === 0)).toBe(true);
    const byDegree = circularLayout(list, [edge(3, 1), edge(3, 2)], {
      order: "degree",
    });
    expect(byDegree.order[0]).toBe(3);
    const plain = circularLayout(list, [], { order: "none" });
    expect(plain.order).toEqual(list.map((_, i) => i));
    expect(circularLayout([{ id: "a" }], []).radius).toBe(0);
  });

  it("places the nodes on a line", () => {
    const list = nodes(5);
    const result = arcLayout(list, [edge(0, 4)], { spacing: 10 });
    expect(result.x[4] - result.x[0]).toBe(40);
    expect(result.y.every((v) => v === 0)).toBe(true);
  });
});

describe("geometry", () => {
  it("samples curves and paths", () => {
    const q = quadraticPath(0, 0, 50, 50, 100, 0);
    expect(q[0]).toBe(0);
    expect(q[q.length - 2]).toBeCloseTo(100);
    const s = splinePath([0, 0, 50, 100, 0, 200], true);
    expect(s[s.length - 1]).toBeCloseTo(200);
    const h = splinePath([0, 0, 100, 50], false);
    expect(h[h.length - 2]).toBeCloseTo(100);
    const o = orthogonalPath([0, 0, 100, 100, 100, 200], true, 8);
    expect(o[o.length - 1]).toBe(200);
    const oh = orthogonalPath([0, 0, 100, 100], false, 0);
    expect(oh).toContain(50);
    expect(roundCorners([0, 0, 10, 0], 4)).toEqual([0, 0, 10, 0]);
    const a = arcPath(0, 100, 0);
    expect(Math.min(...a.filter((_, i) => i % 2 === 1))).toBeCloseTo(-50);
    const back = arcPath(100, 0, 0);
    expect(back[0]).toBeCloseTo(100);
  });

  it("trims, measures and dashes polylines", () => {
    const line = [0, 0, 100, 0];
    expect(pathLength(line)).toBe(100);
    expect(trimPath(line.slice(), 10, 20)).toEqual([10, 0, 80, 0]);
    expect(trimPath([0, 0, 10, 0], 8, 8)).toEqual([5, 0, 5, 0]);
    expect(trimPath([0, 0], 1, 1)).toEqual([0, 0]);
    const bent = trimPath([0, 0, 50, 0, 50, 50], 10, 10);
    expect(bent).toEqual([10, 0, 50, 0, 50, 40]);
    expect(pointAt(line, 50).slice(0, 2)).toEqual([50, 0]);
    expect(pointAt(line, 500).slice(0, 2)).toEqual([100, 0]);
    expect(pointAt([5, 5], 1)).toEqual([5, 5, 1, 0]);
    expect(endDirection([0, 0, 0, 10])).toEqual([0, 1]);
    expect(endDirection([3, 3, 3, 3])).toEqual([1, 0]);
    const dashed = dashPath(line, 10, 10, 9);
    expect(dashed.filter((v) => v === 9).length).toBe(10);
    expect(dashPath(line, 0, 0, 9)).toEqual(line);
    const arrow: number[] = [];
    arrowHead(arrow, 0, 0, 1, 0, 8, 9);
    expect(arrow.length).toBeGreaterThan(10);
    expect(distanceToPath(line, 50, 3)).toBe(9);
    expect(distanceToPath([0, 0, 0, 0], 3, 4)).toBe(25);
  });

  it("measures the boundary of circles and boxes", () => {
    expect(boundaryDistance(false, 20, 20, 1, 0)).toBe(10);
    expect(boundaryDistance(true, 40, 20, 1, 0)).toBe(20);
    expect(boundaryDistance(true, 40, 20, 0, 1)).toBe(10);
    expect(
      boundaryDistance(true, 40, 20, Math.SQRT1_2, Math.SQRT1_2),
    ).toBeCloseTo(10 / Math.SQRT1_2);
  });
});

describe("model and labels", () => {
  it("indexes nodes, edges, groups and neighborhoods", () => {
    const model = buildModel(
      [
        { id: "a", group: "x", value: 3 },
        { id: "b", group: "y" },
        { id: "a" },
        { id: "c", value: 1 },
      ],
      [
        { source: "a", target: "b", value: 2 },
        { source: "b", target: "c" },
        { source: "c", target: "c" },
        { source: "a", target: "z" },
      ],
      [{ id: "y", name: "Why", color: "red", hidden: true }, { id: "y" }],
    );
    expect(model.n).toBe(3);
    expect(model.m).toBe(2);
    expect(model.groups.map((g) => g.id)).toEqual(["y", "x"]);
    expect(model.groups[0].hidden).toBe(true);
    expect(model.valueRange).toEqual([1, 3]);
    expect(model.edgeValueRange).toEqual([2, 2]);
    expect(model.rank[0]).toBe(0);
    expect(Array.from(model.nodeInput)).toEqual([0, 1, 3]);
    const nodesMask = new Uint8Array(3);
    const edgesMask = new Uint8Array(2);
    neighborhood(model, 0, nodesMask, edgesMask);
    expect(Array.from(nodesMask)).toEqual([1, 1, 0]);
    const all = new Uint8Array(3);
    const allEdges = new Uint8Array(2);
    lineage(model, 1, all, allEdges);
    expect(Array.from(all)).toEqual([1, 1, 1]);
    expect(Array.from(allEdges)).toEqual([1, 1]);
  });

  it("resolves the labels of a locale", () => {
    expect(fill("{a} {b}", { a: 1 })).toBe("1 {b}");
    const zh = graphLocale("zh-CN", { fit: "适配" });
    expect(zh.labels.chart).toBe(GRAPH_LABELS.zh!.chart);
    expect(zh.labels.fit).toBe("适配");
    expect(zh.count(12345)).toBe("12,345");
    expect(graphLocale("en", undefined).value(NaN)).toBe("–");
    expect(graphLocale("en", undefined).value(1.234)).toBe("1.23");
    for (const lang of ["zh", "ja", "fr"]) {
      expect(Object.keys(GRAPH_LABELS[lang]!).sort()).toEqual(
        Object.keys(GRAPH_LABELS.en).sort(),
      );
    }
  });
});
