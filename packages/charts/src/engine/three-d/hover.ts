// Hover helpers of the 3D charts: pick hit -> public event, tooltip rows
// and highlight shape.

import { toCss, type Rgba } from "../color";
import { lutIndex, type ColorLut } from "./colormap";
import { packedCss, type PickTarget } from "./geometry";
import type { Vec3 } from "./math";
import type { Model3D } from "./model";
import type { HighlightShape } from "./overlay";
import type { PickHit } from "./pick";
import type { Chart3DHoverEvent } from "./types";

export interface HoverColors {
  series: readonly Rgba[];
  lut: ColorLut;
  resolve: (value: string) => Rgba;
}

const finite = (v: number | undefined): v is number =>
  v !== undefined && Number.isFinite(v);

const scaleCss = (
  model: Model3D,
  colors: HoverColors,
  value: number | undefined,
  fallback: Rgba,
) => {
  const domain = model.colorDomain;
  if (!domain || !finite(value)) return toCss(fallback);
  return toCss(
    colors.lut.rgba[lutIndex(value, domain[0], domain[1])] ?? fallback,
  );
};

/** Public event of a pick hit (`null` when the hit no longer matches the model) */
export const hoverEvent = (
  model: Model3D,
  targets: readonly PickTarget[],
  hit: PickHit,
  colors: HoverColors,
  offset: { x: number; y: number } = { x: 0, y: 0 },
): Chart3DHoverEvent | null => {
  const m = model.series[hit.series];
  if (!m) return null;
  const target = targets.find(
    (t) => t.series === hit.series && t.kind === hit.kind,
  );
  if (!target) return null;
  const seriesColor = colors.series[m.index] ?? [0.5, 0.5, 0.5, 1];
  const base = {
    seriesIndex: m.index,
    seriesId: m.id,
    seriesName: m.name,
    type: m.type,
    clientX: hit.x + offset.x,
    clientY: hit.y + offset.y,
  };
  if (target.kind === "points" && (m.type === "scatter" || m.type === "line")) {
    const index = target.source ? target.source[hit.item] : hit.item;
    if (index === undefined) return null;
    const { cols } = m;
    const packed = target.packed?.[hit.item * target.stride + 4];
    const value = cols.value ? cols.value[index] : undefined;
    const label = cols.labels?.[index];
    return {
      ...base,
      index,
      x: cols.x[index] ?? NaN,
      y: cols.y[index] ?? NaN,
      z: cols.z[index] ?? NaN,
      ...(finite(value) ? { value } : {}),
      color: packed !== undefined ? packedCss(packed) : toCss(seriesColor),
      ...(label ? { label } : {}),
    };
  }
  if (target.kind === "surface" && m.type === "surface") {
    const r = Math.floor(hit.item / target.cols);
    const c = hit.item % target.cols;
    const row = target.rowIndex[r];
    const col = target.colIndex[c];
    if (row === undefined || col === undefined) return null;
    const { grid } = m;
    const index = row * grid.cols + col;
    const z = grid.z[index] ?? NaN;
    const value = grid.value ? grid.value[index] : undefined;
    const colored =
      m.colorBy === "series"
        ? toCss(seriesColor)
        : scaleCss(
            model,
            colors,
            m.colorBy === "value" && grid.value ? value : z,
            seriesColor,
          );
    return {
      ...base,
      index,
      row,
      col,
      x: grid.x[col] ?? NaN,
      y: grid.y[row] ?? NaN,
      z,
      ...(finite(value) ? { value } : {}),
      color: colored,
    };
  }
  if (target.kind === "bars" && m.type === "bar") {
    const { bars } = m;
    const i = hit.item;
    const xi = bars.xi[i] ?? 0;
    const yi = bars.yi[i] ?? 0;
    const z = bars.z[i] ?? NaN;
    const value = bars.value ? bars.value[i] : undefined;
    const own = bars.colors?.[i];
    const color = own
      ? toCss(colors.resolve(own))
      : m.colorBy === "series"
        ? toCss(seriesColor)
        : scaleCss(
            model,
            colors,
            m.colorBy === "value" && bars.value ? value : z,
            seriesColor,
          );
    const label = bars.labels?.[i];
    return {
      ...base,
      index: bars.source[i] ?? i,
      x: xi,
      y: yi,
      z,
      ...(finite(value) ? { value } : {}),
      xCategory: model.x.categories?.[xi] ?? String(xi),
      yCategory: model.y.categories?.[yi] ?? String(yi),
      color,
      ...(label ? { label } : {}),
    };
  }
  return null;
};

export interface TooltipRow {
  name: string;
  value: string;
}

/** Rows of the default tooltip: the coordinates, the value and the label */
export const tooltipRows = (
  model: Model3D,
  event: Chart3DHoverEvent,
  valueName: string,
): TooltipRow[] => {
  const m = model.series[event.seriesIndex];
  const format = m?.format;
  const { labels } = model.locale;
  const name = (axis: "x" | "y" | "z") => model[axis].title || labels[axis];
  const rows: TooltipRow[] = [];
  if (event.label) rows.push({ name: "", value: event.label });
  rows.push({
    name: name("x"),
    value: event.xCategory ?? model.x.format(event.x),
  });
  rows.push({
    name: name("y"),
    value: event.yCategory ?? model.y.format(event.y),
  });
  rows.push({
    name: name("z"),
    value:
      format && event.value === undefined
        ? format(event.z)
        : model.z.format(event.z),
  });
  if (event.value !== undefined) {
    rows.push({
      name: valueName || labels.value,
      value: format ? format(event.value) : model.locale.value(event.value),
    });
  }
  return rows;
};

/** Shape drawn over the hovered item */
export const highlightShape = (
  targets: readonly PickTarget[],
  hit: PickHit,
  color: string,
): HighlightShape | null => {
  const target = targets.find(
    (t) => t.series === hit.series && t.kind === hit.kind,
  );
  if (!target) return null;
  if (target.kind === "bars") {
    const o = hit.item * 6;
    const b = target.boxes;
    const min: Vec3 = [b[o] ?? 0, b[o + 1] ?? 0, b[o + 2] ?? 0];
    const max: Vec3 = [b[o + 3] ?? 0, b[o + 4] ?? 0, b[o + 5] ?? 0];
    return { kind: "box", min, max, color };
  }
  if (target.kind === "surface")
    return { kind: "vertex", world: hit.world, color };
  const size = target.sized
    ? target.positions[hit.item * target.stride + 3] || target.defaultSize
    : target.defaultSize;
  return {
    kind: "point",
    x: hit.x,
    y: hit.y,
    radius: Math.max(2, size / 2),
    color,
  };
};
