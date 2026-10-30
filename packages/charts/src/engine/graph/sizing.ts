// Sizes of the nodes in layout units (circles from `nodeSize` / `value`,
// boxes from their measured label) and the extents the layouts reserve for
// them (labels included).

import type { GraphModel } from "./model";
import type { GraphChartOptions, GraphLayoutType } from "./types";

/** How a node is drawn: circle, box tinted with its color, box filled with its color (mind map root), org chart card */
export const NodeKind = {
  Circle: 0,
  Box: 1,
  Solid: 2,
  Card: 3,
} as const;

export interface NodeSizing {
  /** Displayed width / height (circles: diameter) */
  width: Float64Array;
  height: Float64Array;
  /** Extents reserved by the layout (labels included) */
  layoutWidth: Float64Array;
  layoutHeight: Float64Array;
  kind: Uint8Array;
  /** Font size of the text of boxes, in layout units */
  font: Float64Array;
  /** Font weight of the text of boxes */
  weight: Uint16Array;
  /** Width of the labels of circles at the label font, in CSS pixels */
  labelWidth: Float64Array;
  /** Gap between levels needed by the labels (LR trees), 0 = default */
  levelGap: number;
}

/** Measures a text with a CSS font */
export type MeasureText = (text: string, font: string) => number;

export const LABEL_FONT_SIZE = 12;

export const labelOf = (model: GraphModel, i: number): string => {
  const node = model.nodes[i];
  return node.label ?? node.id;
};

/** Shape used by a layout when nodes and options do not set one */
export const defaultBoxes = (type: GraphLayoutType): boolean =>
  type === "dag" || type === "org" || type === "mindmap";

const defaultCircle = (
  type: GraphLayoutType,
  valued: boolean,
): [number, number] => {
  switch (type) {
    case "tree":
    case "radial":
      return valued ? [6, 22] : [10, 10];
    case "circular":
      return valued ? [6, 26] : [10, 10];
    case "arc":
      return valued ? [5, 22] : [9, 9];
    default:
      return valued ? [8, 36] : [12, 12];
  }
};

export const computeSizing = (
  model: GraphModel,
  type: GraphLayoutType,
  options: GraphChartOptions,
  depth: ArrayLike<number> | null,
  measure: MeasureText,
  fontFamily: string,
): NodeSizing => {
  const n = model.n;
  const width = new Float64Array(n);
  const height = new Float64Array(n);
  const layoutWidth = new Float64Array(n);
  const layoutHeight = new Float64Array(n);
  const kind = new Uint8Array(n);
  const font = new Float64Array(n);
  const weight = new Uint16Array(n);
  const labelWidth = new Float64Array(n);
  const showLabels = options.nodeLabels !== false;
  const labelFont = `${LABEL_FONT_SIZE}px ${fontFamily}`;

  const range = model.valueRange;
  const option = options.nodeSize;
  const [min, max] = Array.isArray(option)
    ? (option as readonly [number, number])
    : typeof option === "number"
      ? [option, option]
      : defaultCircle(type, !!range && range[1] > range[0]);
  const diameter = (i: number) => {
    const node = model.nodes[i];
    if (Number.isFinite(node.size) && node.size! > 0) return node.size!;
    const v = node.value;
    if (!range || !Number.isFinite(v) || range[1] <= range[0] || min === max)
      return range && Number.isFinite(v) && range[1] <= range[0]
        ? (min + max) / 2
        : min;
    const t = (v! - range[0]) / (range[1] - range[0]);
    return Math.sqrt(min * min + (max * max - min * min) * t);
  };

  const boxes = options.nodeShape
    ? options.nodeShape === "box"
    : defaultBoxes(type);
  const card = options.tree?.cardSize ?? [168, 60];
  let levelGap = 0;

  for (let i = 0; i < n; i++) {
    const node = model.nodes[i];
    const box = node.shape ? node.shape === "box" : boxes;
    const label = labelOf(model, i);
    if (!box) {
      const d = diameter(i);
      width[i] = height[i] = d;
      labelWidth[i] = showLabels ? measure(label, labelFont) : 0;
      kind[i] = NodeKind.Circle;
      continue;
    }
    if (type === "org") {
      kind[i] = NodeKind.Card;
      width[i] = card[0];
      height[i] = Number.isFinite(node.size) ? node.size! : card[1];
      font[i] = 13;
      weight[i] = 600;
      continue;
    }
    const d = depth ? depth[i] : 1;
    let size = 12;
    let pad = 14;
    let h = node.subtitle ? 44 : 32;
    kind[i] = NodeKind.Box;
    weight[i] = 500;
    if (type === "mindmap") {
      if (d === 0) {
        size = 16;
        pad = 20;
        h = 44;
        weight[i] = 600;
        kind[i] = NodeKind.Solid;
      } else if (d === 1) {
        size = 13;
        pad = 14;
        h = 32;
        weight[i] = 600;
      } else {
        size = 12.5;
        pad = 11;
        h = 26;
        weight[i] = 400;
      }
    }
    font[i] = size;
    const titleFont = `${weight[i]} ${size}px ${fontFamily}`;
    let w = measure(label, titleFont);
    if (node.subtitle)
      w = Math.max(w, measure(node.subtitle, `${size - 1}px ${fontFamily}`));
    width[i] = Math.max(
      type === "mindmap" ? 40 : 64,
      Math.min(240, w + pad * 2),
    );
    height[i] = Number.isFinite(node.size) ? node.size! : h;
  }

  // room for the labels of circles
  const horizontalTree =
    type === "tree" &&
    (options.direction === "LR" ||
      options.direction === "RL" ||
      !options.direction);
  for (let i = 0; i < n; i++) {
    layoutWidth[i] = width[i];
    layoutHeight[i] = height[i];
    if (kind[i] !== NodeKind.Circle || !showLabels) continue;
    if (type === "force" || type === "none") {
      layoutWidth[i] = layoutHeight[i] = width[i];
    } else if (type === "tree" && !horizontalTree) {
      layoutWidth[i] = Math.max(width[i], labelWidth[i] + 8);
      layoutHeight[i] = width[i] + LABEL_FONT_SIZE + 6;
    } else if (horizontalTree) {
      layoutHeight[i] = Math.max(width[i], LABEL_FONT_SIZE + 4);
      // labels of inner nodes sit between two levels
      if (model.outDegree[i] > 0)
        levelGap = Math.max(levelGap, labelWidth[i] + 28);
    } else if (type === "radial") {
      layoutWidth[i] = layoutHeight[i] = Math.max(
        width[i],
        LABEL_FONT_SIZE + 2,
      );
    }
  }
  return {
    width,
    height,
    layoutWidth,
    layoutHeight,
    kind,
    font,
    weight,
    labelWidth,
    levelGap: Math.min(280, levelGap),
  };
};
