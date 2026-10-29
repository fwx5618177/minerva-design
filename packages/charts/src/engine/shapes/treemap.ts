// Treemap layout: squarified rectangles, parent headers, a palette color per
// top-level node and lighter shades for its children.

import { mix, toCss, type Rgba } from "../color";
import { font } from "../overlay";
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
  textOn,
  uniqueKeys,
  type LayoutContext,
  type LayoutResult,
  type ShapeItem,
  type ShapeNode,
  type ShapeRect,
} from "./scene";
import type { TreemapChartOptions, TreemapNode } from "./types";

const HEADER = 20;

/**
 * Squarified treemap (Bruls et al.): rectangles of areas proportional to
 * `values` (best sorted descending) filling `rect`, with aspect ratios close to 1.
 */
export const squarify = (
  values: readonly number[],
  rect: ShapeRect,
): ShapeRect[] => {
  const out: ShapeRect[] = values.map(() => ({
    x: rect.x,
    y: rect.y,
    width: 0,
    height: 0,
  }));
  const total = sum(values.map((v) => Math.max(0, v)));
  if (total <= 0 || rect.width <= 0 || rect.height <= 0) return out;
  const scale = (rect.width * rect.height) / total;
  const areas = values.map((v) => Math.max(0, v) * scale);
  let { x, y, width: w, height: h } = rect;

  const worst = (s: number, min: number, max: number, side: number) => {
    const s2 = s * s;
    const side2 = side * side;
    return Math.max((side2 * max) / s2, s2 / (side2 * min));
  };
  const place = (row: number[], s: number) => {
    if (w >= h) {
      const cw = h > 0 ? Math.min(w, s / h) : 0;
      let yy = y;
      for (const i of row) {
        const hh = cw > 0 ? areas[i] / cw : 0;
        out[i] = { x, y: yy, width: cw, height: hh };
        yy += hh;
      }
      x += cw;
      w = Math.max(0, w - cw);
    } else {
      const rh = w > 0 ? Math.min(h, s / w) : 0;
      let xx = x;
      for (const i of row) {
        const ww = rh > 0 ? areas[i] / rh : 0;
        out[i] = { x: xx, y, width: ww, height: rh };
        xx += ww;
      }
      y += rh;
      h = Math.max(0, h - rh);
    }
  };

  let row: number[] = [];
  let rowSum = 0;
  let rowMin = Infinity;
  let rowMax = 0;
  areas.forEach((a, i) => {
    if (a <= 0) return;
    if (row.length) {
      const side = Math.min(w, h);
      const next = worst(
        rowSum + a,
        Math.min(rowMin, a),
        Math.max(rowMax, a),
        side,
      );
      if (next > worst(rowSum, rowMin, rowMax, side)) {
        place(row, rowSum);
        row = [];
        rowSum = 0;
        rowMin = Infinity;
        rowMax = 0;
      }
    }
    row.push(i);
    rowSum += a;
    rowMin = Math.min(rowMin, a);
    rowMax = Math.max(rowMax, a);
  });
  if (row.length) place(row, rowSum);
  return out;
};

interface Built {
  node: TreemapNode;
  key: string;
  path: string[];
  top: number;
  /** Index in the flattened leaves (leaves only) */
  leaf: number;
  target: number;
  children: Built[];
}

/** Tree with the target values; hidden top-level nodes count 0 */
const build = (
  o: TreemapChartOptions,
  hidden: ReadonlySet<number>,
): Built[] => {
  let leafCount = 0;
  const walk = (
    nodes: readonly TreemapNode[],
    parentKey: string,
    parentPath: string[],
    top: number,
  ): Built[] => {
    const keys = uniqueKeys(nodes.map((nd) => nd.name));
    return nodes.map((node, j) => {
      const t = parentPath.length ? top : j;
      const key = `${parentKey}/${keys[j]}`;
      const path = [...parentPath, node.name];
      if (node.children?.length) {
        const children = walk(node.children, key, path, t);
        return {
          node,
          key,
          path,
          top: t,
          leaf: -1,
          target: sum(children.map((ch) => ch.target)),
          children,
        };
      }
      return {
        node,
        key,
        path,
        top: t,
        leaf: leafCount++,
        target: hidden.has(t) ? 0 : positive(node.value),
        children: [],
      };
    });
  };
  return walk(o.data, "", [], 0);
};

export const treemapValues = (
  o: TreemapChartOptions,
  hidden: ReadonlySet<number>,
  out: Map<string, number>,
) => {
  const visit = (nodes: Built[]) =>
    nodes.forEach((b) => {
      if (b.children.length) visit(b.children);
      else out.set(b.key, b.target);
    });
  visit(build(o, hidden));
};

/** Leaves in the flattened order (the hover / click `index`) */
export const treemapLeaves = (data: readonly TreemapNode[]) => {
  const leaves: { node: TreemapNode; path: string[] }[] = [];
  const visit = (nodes: readonly TreemapNode[], path: string[]) =>
    nodes.forEach((node) => {
      const p = [...path, node.name];
      if (node.children?.length) visit(node.children, p);
      else leaves.push({ node, path: p });
    });
  visit(data, []);
  return leaves;
};

const shrink = (r: ShapeRect, d: number): ShapeRect => ({
  x: r.x + d,
  y: r.y + d,
  width: Math.max(0, r.width - 2 * d),
  height: Math.max(0, r.height - 2 * d),
});

export const layoutTreemap = (
  o: TreemapChartOptions,
  c: LayoutContext,
): LayoutResult => {
  const { theme, area, measure, hidden } = c;
  const tree = build(o, hidden);
  const rootTotal = sum(tree.map((b) => b.target));
  // displayed (animated) values
  const shown = new Map<Built, number>();
  const measureShown = (b: Built): number => {
    const v = b.children.length
      ? sum(b.children.map(measureShown))
      : Math.max(0, c.value(b.key, b.target));
    shown.set(b, v);
    return v;
  };
  const shownTotal = sum(tree.map(measureShown));
  if (rootTotal <= 0 && shownTotal <= 1e-9) return emptyLayout(c);

  const gap = Math.max(0, finite(o.gap, 2));
  const headers = o.headers !== false;
  const nameFont = font(theme, 12, 500);
  const valueFont = font(theme, 11);
  const headerFont = font(theme, 11, 600);
  const nodes: ShapeNode[] = [];
  const items: ShapeItem[] = [];
  // dark themes: fills slightly toward the background so that labels read well
  const dark = relativeLuminance(theme.background) < 0.2;

  const level = (list: Built[], rect: ShapeRect, parentColor: Rgba | null) => {
    const sorted = list
      .filter((b) => (shown.get(b) ?? 0) > 1e-9)
      .sort((a, b) => (shown.get(b) ?? 0) - (shown.get(a) ?? 0));
    const rects = squarify(
      sorted.map((b) => shown.get(b) ?? 0),
      rect,
    );
    const step = Math.min(0.14, 0.5 / Math.max(1, sorted.length - 1));
    sorted.forEach((b, j) => {
      const cell = shrink(rects[j], gap / 2);
      if (cell.width < 1 || cell.height < 1) return;
      const color = parentColor
        ? b.node.color
          ? resolveWith(theme, b.node.color, parentColor)
          : mix(parentColor, theme.background, j * step)
        : c.color(b.node.color, b.top);
      if (b.children.length) {
        let content = cell;
        if (headers && cell.height > HEADER + 14 && cell.width > 36) {
          nodes.push({
            kind: "rect",
            x: cell.x,
            y: cell.y,
            width: cell.width,
            height: cell.height,
            radius: 4,
            fill: toCss(color, 0.14),
          });
          const title = ellipsize(
            b.node.name,
            cell.width - 12,
            headerFont,
            measure,
          );
          if (title)
            nodes.push({
              kind: "text",
              x: cell.x + 6,
              y: cell.y + HEADER / 2 + 1,
              text: title,
              font: headerFont,
              color: toCss(theme.text, 0.85),
              align: "left",
              baseline: "middle",
            });
          content = {
            x: cell.x + 2,
            y: cell.y + HEADER,
            width: cell.width - 4,
            height: cell.height - HEADER - 2,
          };
        }
        level(b.children, content, color);
        return;
      }
      const fill = readableFill(
        dark ? mix(color, theme.background, 0.18) : color,
      );
      const css = toCss(fill);
      nodes.push({
        kind: "rect",
        x: cell.x,
        y: cell.y,
        width: cell.width,
        height: cell.height,
        radius: Math.min(4, cell.width / 2, cell.height / 2),
        fill: css,
        hit: b.leaf,
        brighten: true,
      });
      if (cell.width >= 36 && cell.height >= 22) {
        const ink = textOn(fill);
        const name = ellipsize(b.node.name, cell.width - 12, nameFont, measure);
        if (name)
          nodes.push({
            kind: "text",
            x: cell.x + 6,
            y: cell.y + 6,
            text: name,
            font: nameFont,
            color: ink,
            align: "left",
            baseline: "top",
            hit: b.leaf,
          });
        const value = c.format(b.target);
        if (
          name &&
          cell.height >= 38 &&
          measure(value, valueFont) <= cell.width - 12
        )
          nodes.push({
            kind: "text",
            x: cell.x + 6,
            y: cell.y + 22,
            text: value,
            font: valueFont,
            color: ink,
            align: "left",
            baseline: "top",
            hit: b.leaf,
          });
      }
      if (b.target > 0) {
        const percent = rootTotal > 0 ? b.target / rootTotal : 0;
        items.push({
          index: b.leaf,
          name: b.node.name,
          value: b.target,
          percent,
          share: c.percent(percent),
          color: css,
          path: b.path,
          x: cell.x + cell.width / 2,
          y: cell.y + cell.height / 2,
          rows: [
            { name: "Value", value: c.format(b.target) },
            { name: "Share", value: c.percent(percent) },
          ],
        });
      }
    });
  };
  level(tree, area, null);
  items.sort((a, b) => a.index - b.index);

  const enter = clamp(c.enter, 0, 1);
  return {
    nodes,
    items,
    dim: 0.55,
    empty: false,
    ...(enter < 1
      ? {
          enter: {
            alpha: enter,
            scale: 0.94 + 0.06 * enter,
            cx: area.x + area.width / 2,
            cy: area.y + area.height / 2,
          },
        }
      : {}),
  };
};
