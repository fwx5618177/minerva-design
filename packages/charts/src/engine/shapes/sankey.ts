// Sankey layout: nodes in columns (longest path from the sources), heights
// proportional to their flow, vertical positions relaxed toward the weighted
// center of their neighbours (fewer crossings, straighter flows), links as
// S-curves of constant thickness with a gradient from the source color.

import { mix, toCss, type Rgba } from "../color";
import { font } from "../overlay";
import { interpolate } from "./labels";
import {
  clamp,
  ellipsize,
  emptyLayout,
  finite,
  positive,
  sum,
  uniqueKeys,
  type LayoutContext,
  type LayoutResult,
  type ShapeItem,
  type ShapeNode,
} from "./scene";
import type { SankeyChartOptions } from "./types";

/** A link that takes part in the layout */
export interface SankeyEdge {
  /** Index in `options.links` */
  link: number;
  source: number;
  target: number;
  /** Target value (negative values count as 0) */
  value: number;
  color?: string;
}

/** Nodes (declared first, then the ones only named by links) and valid links */
export interface SankeyGraph {
  names: string[];
  colors: (string | undefined)[];
  columns: (number | undefined)[];
  edges: SankeyEdge[];
}

/**
 * Resolves the links' ends (names or indexes), appends the nodes only named
 * by links, drops self links, invalid ends and the links closing a cycle.
 */
export const resolveSankey = (o: SankeyChartOptions): SankeyGraph => {
  const names: string[] = [];
  const colors: (string | undefined)[] = [];
  const columns: (number | undefined)[] = [];
  const byName = new Map<string, number>();
  for (const node of o.nodes ?? []) {
    byName.set(node.name, byName.get(node.name) ?? names.length);
    names.push(node.name);
    colors.push(node.color);
    columns.push(
      typeof node.column === "number" && Number.isFinite(node.column)
        ? Math.max(0, Math.round(node.column))
        : undefined,
    );
  }
  const declared = names.length;
  const resolve = (end: string | number): number => {
    if (typeof end === "number")
      return Number.isInteger(end) && end >= 0 && end < declared ? end : -1;
    if (typeof end !== "string") return -1;
    const known = byName.get(end);
    if (known !== undefined) return known;
    byName.set(end, names.length);
    names.push(end);
    colors.push(undefined);
    columns.push(undefined);
    return names.length - 1;
  };
  const out: number[][] = [];
  const reaches = (from: number, to: number) => {
    const seen = new Set<number>([from]);
    const stack = [from];
    while (stack.length) {
      const n = stack.pop() as number;
      if (n === to) return true;
      for (const m of out[n] ?? [])
        if (!seen.has(m)) {
          seen.add(m);
          stack.push(m);
        }
    }
    return false;
  };
  const edges: SankeyEdge[] = [];
  (o.links ?? []).forEach((l, i) => {
    if (!l) return;
    const source = resolve(l.source);
    const target = resolve(l.target);
    if (source < 0 || target < 0 || source === target) return;
    if (reaches(target, source)) return;
    (out[source] ??= []).push(target);
    edges.push({
      link: i,
      source,
      target,
      value: positive(l.value),
      ...(l.color ? { color: l.color } : {}),
    });
  });
  return { names, colors, columns, edges };
};

const edgeKeys = (g: SankeyGraph) =>
  uniqueKeys(
    g.edges.map((e) => `${g.names[e.source]}\u2192${g.names[e.target]}`),
  );

/** Target values of the links (0 when an end is hidden) */
export const sankeyValues = (
  o: SankeyChartOptions,
  hidden: ReadonlySet<number>,
  out: Map<string, number>,
) => {
  const g = resolveSankey(o);
  edgeKeys(g).forEach((key, k) => {
    const e = g.edges[k];
    out.set(key, hidden.has(e.source) || hidden.has(e.target) ? 0 : e.value);
  });
};

/** Column of every node (`align` and the explicit `column`s) */
export const sankeyColumns = (
  g: SankeyGraph,
  align: SankeyChartOptions["align"] = "justify",
): number[] => {
  const n = g.names.length;
  const outs: number[][] = Array.from({ length: n }, () => []);
  const ins: number[][] = Array.from({ length: n }, () => []);
  for (const e of g.edges) {
    outs[e.source].push(e.target);
    ins[e.target].push(e.source);
  }
  // longest path from the sources (depth) and to the sinks (height)
  const order: number[] = [];
  const pending = ins.map((l) => l.length);
  const queue: number[] = [];
  pending.forEach((p, i) => {
    if (!p) queue.push(i);
  });
  while (queue.length) {
    const i = queue.shift() as number;
    order.push(i);
    for (const t of outs[i]) if (--pending[t] === 0) queue.push(t);
  }
  const depth = new Array<number>(n).fill(0);
  for (const i of order)
    for (const t of outs[i]) depth[t] = Math.max(depth[t], depth[i] + 1);
  const height = new Array<number>(n).fill(0);
  for (let k = order.length - 1; k >= 0; k--) {
    const i = order[k];
    for (const t of outs[i]) height[i] = Math.max(height[i], height[t] + 1);
  }
  const last = Math.max(0, ...depth);
  const columns = depth.map((d, i) => {
    switch (align) {
      case "left":
        return d;
      case "right":
        return last - height[i];
      case "center":
        return ins[i].length
          ? d
          : outs[i].length
            ? Math.min(...outs[i].map((t) => depth[t])) - 1
            : 0;
      default:
        return outs[i].length ? d : last;
    }
  });
  g.columns.forEach((col, i) => {
    if (col !== undefined) columns[i] = col;
  });
  return columns;
};

interface LaidNode {
  i: number;
  col: number;
  value: number;
  x0: number;
  x1: number;
  y0: number;
  y1: number;
  /** Links leaving / entering the node (indexes in `edges`) */
  outs: number[];
  ins: number[];
}

interface LaidEdge {
  k: number;
  source: LaidNode;
  target: LaidNode;
  value: number;
  width: number;
  y0: number;
  y1: number;
}

/** Vertical positions (d3-sankey's initialization, relaxation and collision passes) */
const relax = (
  columns: LaidNode[][],
  edges: LaidEdge[],
  top: number,
  bottom: number,
  py: number,
  iterations: number,
) => {
  const outsOf = (n: LaidNode) => n.outs.map((k) => edges[k]);
  const insOf = (n: LaidNode) => n.ins.map((k) => edges[k]);

  const reorder = (n: LaidNode) => {
    n.outs.sort((a, b) => edges[a].target.y0 - edges[b].target.y0);
    n.ins.sort((a, b) => edges[a].source.y0 - edges[b].source.y0);
  };
  /** Top of `target` for which the link from `source` would be horizontal */
  const targetTop = (source: LaidNode, target: LaidNode) => {
    let y = source.y0 - ((source.outs.length - 1) * py) / 2;
    for (const e of outsOf(source)) {
      if (e.target === target) break;
      y += e.width + py;
    }
    for (const e of insOf(target)) {
      if (e.source === source) break;
      y -= e.width;
    }
    return y;
  };
  const sourceTop = (source: LaidNode, target: LaidNode) => {
    let y = target.y0 - ((target.ins.length - 1) * py) / 2;
    for (const e of insOf(target)) {
      if (e.source === source) break;
      y += e.width + py;
    }
    for (const e of outsOf(source)) {
      if (e.target === target) break;
      y -= e.width;
    }
    return y;
  };
  const down = (nodes: LaidNode[], y: number, from: number, alpha: number) => {
    for (let i = from; i < nodes.length; i++) {
      const n = nodes[i];
      const dy = (y - n.y0) * alpha;
      if (dy > 1e-6) {
        n.y0 += dy;
        n.y1 += dy;
      }
      y = n.y1 + py;
    }
  };
  const up = (nodes: LaidNode[], y: number, from: number, alpha: number) => {
    for (let i = from; i >= 0; i--) {
      const n = nodes[i];
      const dy = (n.y1 - y) * alpha;
      if (dy > 1e-6) {
        n.y0 -= dy;
        n.y1 -= dy;
      }
      y = n.y0 - py;
    }
  };
  const collide = (nodes: LaidNode[], alpha: number) => {
    const mid = nodes.length >> 1;
    const subject = nodes[mid];
    if (!subject) return;
    up(nodes, subject.y0 - py, mid - 1, alpha);
    down(nodes, subject.y1 + py, mid + 1, alpha);
    up(nodes, bottom, nodes.length - 1, alpha);
    down(nodes, top, 0, alpha);
  };
  const byY = (a: LaidNode, b: LaidNode) => a.y0 - b.y0;

  // initial positions: stacked in the data order, the free space spread out
  for (const nodes of columns) {
    let y = top;
    for (const n of nodes) {
      const h = n.y1 - n.y0;
      n.y0 = y;
      n.y1 = y + h;
      y = n.y1 + py;
    }
    const extra = (bottom - y + py) / (nodes.length + 1);
    nodes.forEach((n, i) => {
      n.y0 += extra * (i + 1);
      n.y1 += extra * (i + 1);
    });
  }
  for (const nodes of columns) nodes.forEach(reorder);

  for (let it = 0; it < iterations; it++) {
    const alpha = Math.pow(0.99, it);
    const beta = Math.max(1 - alpha, (it + 1) / iterations);
    // right to left: nodes move toward their targets
    for (let c = columns.length - 2; c >= 0; c--) {
      const nodes = columns[c];
      for (const n of nodes) {
        let y = 0;
        let w = 0;
        for (const e of outsOf(n)) {
          const v = e.value * (e.target.col - n.col);
          y += sourceTop(n, e.target) * v;
          w += v;
        }
        if (!(w > 0)) continue;
        const dy = (y / w - n.y0) * alpha;
        n.y0 += dy;
        n.y1 += dy;
        reorder(n);
      }
      nodes.sort(byY);
      collide(nodes, beta);
    }
    // left to right: nodes move toward their sources
    for (let c = 1; c < columns.length; c++) {
      const nodes = columns[c];
      for (const n of nodes) {
        let y = 0;
        let w = 0;
        for (const e of insOf(n)) {
          const v = e.value * (n.col - e.source.col);
          y += targetTop(e.source, n) * v;
          w += v;
        }
        if (!(w > 0)) continue;
        const dy = (y / w - n.y0) * alpha;
        n.y0 += dy;
        n.y1 += dy;
        reorder(n);
      }
      nodes.sort(byY);
      collide(nodes, beta);
    }
  }
  for (const nodes of columns) nodes.forEach(reorder);
};

const LABEL_GAP = 6;
const LABEL_LINE = 16;

export const layoutSankey = (
  o: SankeyChartOptions,
  c: LayoutContext,
): LayoutResult => {
  const { theme, area, measure, hidden } = c;
  const g = resolveSankey(o);
  const keys = edgeKeys(g);
  const n = g.names.length;
  const targets = g.edges.map((e) =>
    hidden.has(e.source) || hidden.has(e.target) ? 0 : e.value,
  );
  const shown = targets.map((t, k) => Math.max(0, c.value(keys[k], t)));
  if (sum(shown) <= 1e-9) return emptyLayout(c);

  const columnOf = sankeyColumns(g, o.align);
  const inT = new Array<number>(n).fill(0);
  const outT = new Array<number>(n).fill(0);
  const inV = new Array<number>(n).fill(0);
  const outV = new Array<number>(n).fill(0);
  g.edges.forEach((e, k) => {
    outT[e.source] += targets[k];
    inT[e.target] += targets[k];
    outV[e.source] += shown[k];
    inV[e.target] += shown[k];
  });

  // nodes with a flow, by column (empty columns removed)
  const laid: (LaidNode | null)[] = g.names.map((_, i) => {
    const value = Math.max(inV[i], outV[i]);
    return value > 1e-9
      ? {
          i,
          col: columnOf[i],
          value,
          x0: 0,
          x1: 0,
          y0: 0,
          y1: 0,
          outs: [],
          ins: [],
        }
      : null;
  });
  const used = [
    ...new Set(laid.filter((l) => l).map((l) => (l as LaidNode).col)),
  ].sort((a, b) => a - b);
  const rank = new Map(used.map((col, k) => [col, k]));
  const columns: LaidNode[][] = used.map(() => []);
  for (const l of laid)
    if (l) {
      l.col = rank.get(l.col) ?? 0;
      columns[l.col].push(l);
    }
  const edges: LaidEdge[] = [];
  g.edges.forEach((e, k) => {
    const source = laid[e.source];
    const target = laid[e.target];
    if (!source || !target || shown[k] <= 1e-9) return;
    source.outs.push(edges.length);
    target.ins.push(edges.length);
    edges.push({
      k,
      source,
      target,
      value: shown[k],
      width: 0,
      y0: 0,
      y1: 0,
    });
  });

  // geometry
  const nodeWidth = clamp(finite(o.nodeWidth, 12), 1, 64);
  const ncols = columns.length;
  const top = area.y + 2;
  const bottom = area.y + area.height - 2;
  const height = Math.max(1, bottom - top);
  const maxCount = Math.max(1, ...columns.map((col) => col.length));
  const py = Math.min(
    Math.max(0, finite(o.nodePadding, 12)),
    maxCount > 1 ? (height * 0.5) / (maxCount - 1) : Infinity,
  );
  const ky = Math.min(
    ...columns.map(
      (col) =>
        (height - (col.length - 1) * py) /
        Math.max(1e-9, sum(col.map((l) => l.value))),
    ),
  );
  const step = ncols > 1 ? (area.width - nodeWidth) / (ncols - 1) : 0;
  columns.forEach((col, k) => {
    const x0 =
      ncols > 1 ? area.x + k * step : area.x + (area.width - nodeWidth) / 2;
    for (const l of col) {
      l.x0 = x0;
      l.x1 = x0 + nodeWidth;
      l.y0 = 0;
      l.y1 = l.value * ky;
    }
  });
  for (const e of edges) e.width = e.value * ky;
  relax(
    columns,
    edges,
    top,
    bottom,
    py,
    Math.round(clamp(finite(o.iterations, 32), 0, 200)),
  );
  // where the links leave / reach the nodes
  for (const col of columns)
    for (const l of col) {
      let y = l.y0;
      for (const k of l.outs) {
        edges[k].y0 = y + edges[k].width / 2;
        y += edges[k].width;
      }
      y = l.y0;
      for (const k of l.ins) {
        edges[k].y1 = y + edges[k].width / 2;
        y += edges[k].width;
      }
    }

  // colors
  const colors: Rgba[] = g.names.map((_, i) => c.color(g.colors[i], i));
  const css = colors.map((col) => toCss(col));
  const neutral = mix(theme.grid, theme.textMuted, 0.45);
  const mode = o.linkColor ?? "gradient";
  const opacity = clamp(finite(o.linkOpacity, 0.4), 0.02, 1);
  const activeAlpha = Math.min(1, opacity + 0.3);

  const nodes: ShapeNode[] = [];
  const items: ShapeItem[] = [];
  const linkIndex = (e: LaidEdge) => n + g.edges[e.k].link;
  const linksOf = (l: LaidNode) => [
    ...l.ins.map((k) => linkIndex(edges[k])),
    ...l.outs.map((k) => linkIndex(edges[k])),
  ];

  // links: widest first, so the thin ones stay on top (and hoverable)
  const drawn = edges.slice().sort((a, b) => b.width - a.width);
  for (const e of drawn) {
    const own = g.edges[e.k].color;
    let c0: string;
    let c1: string;
    if (own) c0 = c1 = toCss(c.color(own, e.source.i));
    else if (mode === "source") c0 = c1 = css[e.source.i];
    else if (mode === "target") c0 = c1 = css[e.target.i];
    else if (mode === "neutral") c0 = c1 = toCss(neutral);
    else {
      c0 = css[e.source.i];
      c1 = css[e.target.i];
    }
    nodes.push({
      kind: "link",
      x0: e.source.x1,
      y0: e.y0,
      x1: e.target.x0,
      y1: e.y1,
      width: e.width,
      color0: c0,
      color1: c1,
      alpha: opacity,
      activeAlpha,
      hit: linkIndex(e),
      also: [e.source.i, e.target.i],
    });
  }

  // node bars
  for (const col of columns)
    for (const l of col)
      nodes.push({
        kind: "rect",
        x: l.x0,
        y: l.y0,
        width: l.x1 - l.x0,
        height: Math.max(1, l.y1 - l.y0),
        radius: Math.min(2, nodeWidth / 2),
        fill: css[l.i],
        hit: l.i,
        also: linksOf(l),
        brighten: true,
      });

  // labels: right of the nodes, left of the last column; the biggest first
  if (o.labels !== false) {
    const nameFont = font(theme, 12, 500);
    const valueFont = font(theme, 12);
    const halo = toCss(theme.background, 0.8);
    const boxes: { x0: number; x1: number; y0: number; y1: number }[] = [];
    const room =
      ncols > 1 ? Math.max(0, step - nodeWidth - LABEL_GAP * 2) : area.width;
    // the last column first (its labels have a single side), then the biggest
    const order = columns
      .flat()
      .slice()
      .sort(
        (a, b) =>
          Number(b.col === ncols - 1) - Number(a.col === ncols - 1) ||
          b.value - a.value,
      );
    for (const l of order) {
      const last = ncols > 1 && l.col === ncols - 1;
      let value =
        o.labelValues === false ? "" : c.format(Math.max(inT[l.i], outT[l.i]));
      let valueW = value ? measure(value, valueFont) : 0;
      let name = ellipsize(
        g.names[l.i],
        room - (value ? valueW + 6 : 0),
        nameFont,
        measure,
      );
      if (!name && value) {
        value = "";
        valueW = 0;
        name = ellipsize(g.names[l.i], room, nameFont, measure);
      }
      if (!name) continue;
      const nameW = measure(name, nameFont);
      const width = nameW + (value ? 6 + valueW : 0);
      // candidates: the preferred side (inward for the last column), then
      // the other one when it stays in the drawing; each nudged along the bar
      const sides = last ? [true, false] : [false, true];
      const reach = Math.max(0, (l.y1 - l.y0) / 2 - LABEL_LINE / 2 + 2);
      const offsets = [0];
      for (let d = 6; d <= reach; d += 6) offsets.push(d, -d);
      let box: { x0: number; x1: number; y0: number; y1: number } | null = null;
      for (const left of sides) {
        const x = left ? l.x0 - LABEL_GAP : l.x1 + LABEL_GAP;
        const x0 = left ? x - width : x;
        if (x0 < area.x - 2 || x0 + width > area.x + area.width + 2) continue;
        for (const dy of offsets) {
          const y = (l.y0 + l.y1) / 2 + dy;
          const candidate = {
            x0,
            x1: x0 + width,
            y0: y - LABEL_LINE / 2,
            y1: y + LABEL_LINE / 2,
          };
          if (
            candidate.y0 < area.y - 4 ||
            candidate.y1 > area.y + area.height + 4 ||
            boxes.some(
              (b) =>
                b.x0 < candidate.x1 &&
                candidate.x0 < b.x1 &&
                b.y0 < candidate.y1 &&
                candidate.y0 < b.y1,
            )
          )
            continue;
          box = candidate;
          break;
        }
        if (box) break;
      }
      if (!box) continue;
      boxes.push(box);
      const y = (box.y0 + box.y1) / 2;
      const also = linksOf(l);
      nodes.push({
        kind: "text",
        x: box.x0,
        y,
        text: name,
        font: nameFont,
        color: toCss(theme.text),
        align: "left",
        baseline: "middle",
        halo,
        hit: l.i,
        also,
      });
      if (value)
        nodes.push({
          kind: "text",
          x: box.x1,
          y,
          text: value,
          font: valueFont,
          color: toCss(theme.textMuted),
          align: "right",
          baseline: "middle",
          halo,
          hit: l.i,
          also,
        });
    }
  }

  // items: nodes by column and position, then links
  const entering = sum(g.names.map((_, i) => (inT[i] <= 0 ? outT[i] : 0)));
  for (const col of columns)
    for (const l of col.slice().sort((a, b) => a.y0 - b.y0)) {
      const value = Math.max(inT[l.i], outT[l.i]);
      if (value <= 0) continue;
      const percent = entering > 0 ? value / entering : 0;
      items.push({
        index: l.i,
        name: g.names[l.i],
        value,
        percent,
        share: c.percent(percent),
        color: css[l.i],
        x: (l.x0 + l.x1) / 2,
        y: (l.y0 + l.y1) / 2,
        rows: [
          { name: c.labels.value, value: c.format(value) },
          ...(inT[l.i] > 0
            ? [{ name: c.labels.incoming, value: c.format(inT[l.i]) }]
            : []),
          ...(outT[l.i] > 0
            ? [{ name: c.labels.outgoing, value: c.format(outT[l.i]) }]
            : []),
        ],
      });
    }
  const linkItems = edges
    .slice()
    .sort(
      (a, b) =>
        a.source.col - b.source.col || a.y0 - b.y0 || a.target.y0 - b.target.y0,
    );
  for (const e of linkItems) {
    const ge = g.edges[e.k];
    const value = targets[e.k];
    if (value <= 0) continue;
    const source = g.names[ge.source];
    const target = g.names[ge.target];
    const ofSource = outT[ge.source] > 0 ? value / outT[ge.source] : 0;
    const ofTarget = inT[ge.target] > 0 ? value / inT[ge.target] : 0;
    items.push({
      index: linkIndex(e),
      name: `${source} \u2192 ${target}`,
      value,
      percent: ofSource,
      share: c.percent(ofSource),
      color: css[ge.source],
      x: (e.source.x1 + e.target.x0) / 2,
      y: (e.y0 + e.y1) / 2,
      rows: [
        { name: c.labels.value, value: c.format(value) },
        {
          name: interpolate(c.labels.ofName, { name: source }),
          value: c.percent(ofSource),
        },
        {
          name: interpolate(c.labels.ofName, { name: target }),
          value: c.percent(ofTarget),
        },
      ],
      event: { source, target },
    });
  }

  const enter = clamp(c.enter, 0, 1);
  return {
    nodes,
    items,
    dim: 0.3,
    empty: false,
    ...(enter < 1
      ? {
          enter: {
            alpha: enter,
            scale: 0.97 + 0.03 * enter,
            cx: area.x + area.width / 2,
            cy: area.y + area.height / 2,
          },
        }
      : {}),
  };
};
