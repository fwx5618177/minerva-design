// Sunburst layout: the hierarchy as concentric rings around a center circle.
// Drilling into a node animates the angular window (the node's share of the
// root) and the depth: its children open to the full circle while the
// ancestors slide into the center. Labels follow the arc or the radius,
// whichever fits.

import { mix, toCss, type Rgba } from "../color";
import { font } from "../overlay";
import { interpolate } from "./labels";
import {
  clamp,
  ellipsize,
  emptyLayout,
  finite,
  positive,
  readableFill,
  relativeLuminance,
  resolveWith,
  sum,
  TAU,
  textOn,
  uniqueKeys,
  upright,
  type LayoutContext,
  type LayoutResult,
  type ShapeItem,
  type ShapeNode,
} from "./scene";
import type { SunburstChartOptions, TreemapNode } from "./types";

/** Thinnest ring, in pixels (fewer levels are shown below) */
const MIN_RING = 18;

interface SNode {
  node: TreemapNode;
  key: string;
  path: string[];
  /** Index of the top-level ancestor (legend) */
  top: number;
  /** Depth-first index (hover `index`) */
  index: number;
  /** 1 for the top-level nodes */
  depth: number;
  target: number;
  parent: SNode | null;
  children: SNode[];
}

/** Tree with the target values; hidden top-level nodes count 0 */
const build = (
  data: readonly TreemapNode[],
  hidden: ReadonlySet<number>,
): SNode[] => {
  let count = 0;
  const walk = (
    nodes: readonly TreemapNode[],
    parent: SNode | null,
    top: number,
  ): SNode[] => {
    const keys = uniqueKeys(nodes.map((nd) => nd.name));
    return nodes.map((node, j) => {
      const t = parent ? top : j;
      const b: SNode = {
        node,
        key: `${parent?.key ?? ""}/${keys[j]}`,
        path: [...(parent?.path ?? []), node.name],
        top: t,
        index: count++,
        depth: (parent?.depth ?? 0) + 1,
        target: 0,
        parent,
        children: [],
      };
      if (node.children?.length) {
        b.children = walk(node.children, b, t);
        b.target = sum(b.children.map((ch) => ch.target));
      } else b.target = hidden.has(t) ? 0 : positive(node.value);
      return b;
    });
  };
  return walk(data ?? [], null, 0);
};

/**
 * The deepest node of `path` that can be focused (a parent with a value),
 * `null` for the root
 */
const focusOf = (tree: SNode[], path: readonly string[]): SNode | null => {
  let list = tree;
  let found: SNode | null = null;
  for (const name of path) {
    const next = list.find(
      (b) => b.node.name === name && b.children.length && b.target > 0,
    );
    if (!next) break;
    found = next;
    list = next.children;
  }
  return found;
};

/** Valid part of a drill path (names from the root to a focusable parent) */
export const resolveSunburstPath = (
  o: SunburstChartOptions,
  path: readonly string[],
  hidden: ReadonlySet<number>,
): string[] => focusOf(build(o.data, hidden), path)?.path ?? [];

const deepest = (list: readonly SNode[]): number =>
  list.reduce(
    (d, b) =>
      b.target > 0
        ? Math.max(d, b.children.length ? deepest(b.children) : b.depth)
        : d,
    0,
  );

/** Angular window of the focused node (shares of the root) and depths */
const view = (tree: SNode[], focus: SNode | null, levels?: number) => {
  const total = sum(tree.map((b) => b.target));
  const depth = focus ? focus.depth : 0;
  let a0 = 0;
  let a1 = 1;
  if (focus && total > 0) {
    // start: shares of the previous siblings of every ancestor
    let f = 0;
    for (let p: SNode | null = focus; p; p = p.parent) {
      const siblings: SNode[] = p.parent ? p.parent.children : tree;
      for (const s of siblings) {
        if (s === p) break;
        f += s.target;
      }
    }
    a0 = f / total;
    a1 = a0 + focus.target / total;
  }
  const below = Math.max(1, deepest(focus ? focus.children : tree) - depth);
  const wanted =
    typeof levels === "number" && levels >= 1 ? Math.floor(levels) : below;
  return { a0, a1, depth, levels: Math.min(wanted, below) };
};

export const sunburstValues = (
  o: SunburstChartOptions,
  hidden: ReadonlySet<number>,
  focusPath: readonly string[],
  out: Map<string, number>,
) => {
  const tree = build(o.data, hidden);
  const visit = (nodes: SNode[]) =>
    nodes.forEach((b) => {
      if (b.children.length) visit(b.children);
      else out.set(b.key, b.target);
    });
  visit(tree);
  const v = view(tree, focusOf(tree, focusPath), o.levels);
  out.set("@a0", v.a0);
  out.set("@a1", v.a1);
  out.set("@d", v.depth);
  out.set("@levels", v.levels);
};

export const layoutSunburst = (
  o: SunburstChartOptions,
  c: LayoutContext,
): LayoutResult => {
  const { theme, area, measure, hidden } = c;
  const tree = build(o.data, hidden);
  const total = sum(tree.map((b) => b.target));
  // displayed (animated) values
  const shown = new Map<SNode, number>();
  const measureShown = (b: SNode): number => {
    const v = b.children.length
      ? sum(b.children.map(measureShown))
      : Math.max(0, c.value(b.key, b.target));
    shown.set(b, v);
    return v;
  };
  const shownTotal = sum(tree.map(measureShown));
  if (total <= 0 && shownTotal <= 1e-9) return emptyLayout(c);

  const focus = focusOf(tree, c.focus);
  const target = view(tree, focus, o.levels);
  let w0 = c.value("@a0", target.a0);
  let w1 = c.value("@a1", target.a1);
  if (!(w1 - w0 > 1e-6)) {
    w0 = 0;
    w1 = 1;
  }
  const d = c.value("@d", target.depth);
  const cx = area.x + area.width / 2;
  const cy = area.y + area.height / 2;
  const R = Math.max(4, Math.min(area.width, area.height) / 2 - 2);
  const R0 = R * clamp(finite(o.innerRadius, 0.26), 0, 0.8);
  const fit = Math.max(1, Math.floor((R - R0) / MIN_RING));
  const levels = Math.max(1, c.value("@levels", target.levels));
  const ring = (R - R0) / Math.min(levels, fit);
  const enter = clamp(c.enter, 0, 1);
  const start = (finite(o.startAngle) * Math.PI) / 180 - Math.PI / 2;
  const angle = (f: number) =>
    start + clamp((f - w0) / (w1 - w0), 0, 1) * TAU * enter;
  const pad = Math.max(0, finite(o.padAngle, 1));
  const corner = Math.max(0, finite(o.cornerRadius, 2));
  const mode = o.labels ?? "auto";
  const labelFont = font(theme, 11);
  const dark = relativeLuminance(theme.background) < 0.2;

  const nodes: ShapeNode[] = [];
  const labels: ShapeNode[] = [];
  const items: ShapeItem[] = [];
  const colorOf = new Map<SNode, Rgba>();
  const subtree = (b: SNode): number[] => [
    b.index,
    ...b.children.flatMap(subtree),
  ];
  const ancestors = (b: SNode) => {
    const out: number[] = [];
    for (let p = b.parent; p; p = p.parent) out.push(p.index);
    return out;
  };

  const label = (
    name: string,
    a0: number,
    a1: number,
    r0: number,
    r1: number,
    fill: Rgba,
    b: SNode,
    also: number[],
  ) => {
    if (mode === "none") return;
    const span = a1 - a0;
    const thick = r1 - r0;
    const rm = (r0 + r1) / 2;
    const m = (a0 + a1) / 2;
    const size = 11;
    const full = measure(name, labelFont);
    // tangential: straight text across the middle of the sector, its sag kept in the ring
    let tangential = 0;
    if (mode !== "radial" && thick >= size + 4) {
      const sag = (thick - size) / 2 - 1;
      const chord = 2 * rm * Math.acos(clamp(1 - sag / rm, -1, 1));
      tangential = Math.max(0, Math.min(span * rm - 8, chord));
    }
    // radial: along the radius, the sector wide enough at its inner end
    let radial = 0;
    if (mode !== "tangential" && span * (r0 + 4) >= size + 2)
      radial = Math.max(0, thick - 10);
    const useTangential =
      tangential > 0 &&
      (full <= tangential || tangential >= radial || mode === "tangential");
    const room = useTangential ? tangential : radial;
    if (room <= 0) return;
    const text = ellipsize(name, room, labelFont, measure);
    if (!text || (text !== name && text.length < 4)) return;
    labels.push({
      kind: "text",
      x: cx + rm * Math.cos(m),
      y: cy + rm * Math.sin(m),
      text,
      font: labelFont,
      color: textOn(fill),
      align: "center",
      baseline: "middle",
      rotate: upright(useTangential ? m + Math.PI / 2 : m),
      hit: b.index,
      also,
    });
  };

  const visit = (list: SNode[], parentColor: Rgba | null) => {
    list.forEach((b, j) => {
      const color = parentColor
        ? b.node.color
          ? resolveWith(theme, b.node.color, parentColor)
          : mix(parentColor, theme.background, 0.14 + (j % 3) * 0.06)
        : c.color(b.node.color, b.top);
      colorOf.set(b, color);
      if (b.children.length) visit(b.children, color);
    });
  };
  visit(tree, null);

  // fractions from the displayed values
  const fracStart = new Map<SNode, number>();
  const place = (list: SNode[], from: number) => {
    let f = from;
    for (const b of list) {
      fracStart.set(b, f);
      if (b.children.length) place(b.children, f);
      f += (shown.get(b) ?? 0) / Math.max(1e-12, shownTotal);
    }
  };
  place(tree, 0);

  const sectors = (list: SNode[]) => {
    for (const b of list) {
      const v = shown.get(b) ?? 0;
      if (v <= 1e-9) continue;
      const f0 = fracStart.get(b) ?? 0;
      const f1 = f0 + v / Math.max(1e-12, shownTotal);
      const a0 = angle(f0);
      const a1 = angle(f1);
      const rel = b.depth - d;
      const r0 = Math.max(R0, R0 + (rel - 1) * ring);
      const r1 = Math.min(R, R0 + rel * ring);
      if (a1 - a0 > 1e-4 && r1 - r0 > 0.5) {
        const base = colorOf.get(b) ?? theme.primary;
        const fill = readableFill(
          dark ? mix(base, theme.background, 0.12) : base,
          3,
        );
        const also = [...ancestors(b), ...subtree(b).slice(1)];
        nodes.push({
          kind: "sector",
          cx,
          cy,
          r0,
          r1,
          a0,
          a1,
          pad,
          corner,
          fill: toCss(fill),
          hit: b.index,
          also,
        });
        label(b.node.name, a0, a1, r0, r1, fill, b, also);
        if (b.target > 0) {
          const percent = total > 0 ? b.target / total : 0;
          const parent = b.parent?.target ?? 0;
          const rm = (r0 + r1) / 2;
          const m = (a0 + a1) / 2;
          items.push({
            index: b.index,
            name: b.node.name,
            value: b.target,
            percent,
            share: c.percent(percent),
            color: toCss(fill),
            path: b.path,
            x: cx + rm * Math.cos(m),
            y: cy + rm * Math.sin(m),
            rows: [
              { name: c.labels.value, value: c.format(b.target) },
              { name: c.labels.share, value: c.percent(percent) },
              ...(b.parent && parent > 0
                ? [
                    {
                      name: interpolate(c.labels.ofName, {
                        name: b.parent.node.name,
                      }),
                      value: c.percent(b.target / parent),
                    },
                  ]
                : []),
            ],
            ...(b.children.length ? { drill: b.path } : {}),
          });
        }
      }
      if (b.children.length && r1 < R - 0.5) sectors(b.children);
    }
  };
  sectors(tree);
  nodes.push(...labels);

  // center: the focused node (click to go up) or the total
  const rc = R0 - 3;
  if (rc >= 14) {
    const valueSize = clamp(rc * 0.3, 12, 24);
    if (focus) {
      const base = colorOf.get(focus) ?? theme.primary;
      const fill = toCss(mix(base, theme.background, 0.84));
      const css = toCss(base);
      const also = focus.children.flatMap(subtree);
      nodes.push({
        kind: "circle",
        cx,
        cy,
        r: rc,
        fill,
        stroke: toCss(base, 0.5),
        lineWidth: 1,
        hit: focus.index,
        also,
      });
      const nameFont = font(theme, clamp(rc * 0.2, 11, 14), 600);
      const name = ellipsize(focus.node.name, rc * 1.6, nameFont, measure);
      const value = c.format(focus.target);
      const showValue = rc >= 30;
      const nameY = showValue ? cy - 2 : cy + 4;
      // chevron: "go up"
      const chevronY = nameY - (showValue ? 18 : 12);
      if (rc >= 24)
        nodes.push({
          kind: "line",
          points: [
            cx - 5,
            chevronY + 3,
            cx,
            chevronY - 2,
            cx + 5,
            chevronY + 3,
          ],
          color: toCss(theme.textMuted),
          width: 1.5,
          hit: focus.index,
          also,
        });
      if (name)
        nodes.push({
          kind: "text",
          x: cx,
          y: nameY,
          text: name,
          font: nameFont,
          color: toCss(theme.text),
          align: "center",
          baseline: "middle",
          hit: focus.index,
          also,
        });
      if (showValue)
        nodes.push({
          kind: "text",
          x: cx,
          y: cy + 16,
          text: ellipsize(value, rc * 1.6, font(theme, 12), measure),
          font: font(theme, 12),
          color: toCss(theme.textMuted),
          align: "center",
          baseline: "middle",
          hit: focus.index,
          also,
        });
      const percent = total > 0 ? focus.target / total : 0;
      items.push({
        index: focus.index,
        name: focus.node.name,
        value: focus.target,
        percent,
        share: c.percent(percent),
        color: css,
        path: focus.path,
        x: cx,
        y: cy,
        rows: [
          { name: c.labels.value, value: c.format(focus.target) },
          { name: c.labels.share, value: c.percent(percent) },
        ],
        drill: focus.path.slice(0, -1),
      });
    } else if (total > 0) {
      const valueFont = font(theme, valueSize, 600);
      const text = ellipsize(c.format(total), rc * 1.7, valueFont, measure);
      if (text)
        nodes.push({
          kind: "text",
          x: cx,
          y: cy,
          text,
          font: valueFont,
          color: toCss(theme.text),
          align: "center",
          baseline: "middle",
        });
    }
  }
  items.sort((a, b) => a.index - b.index);

  return { nodes, items, dim: 0.35, empty: false };
};
