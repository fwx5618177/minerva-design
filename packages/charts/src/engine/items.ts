// Chart model -> GPU-ready buffers (positions relative to an origin).

import { packColor } from "./color";
import type { ChartModel } from "./model";
import { GAP, SCATTER_STRIDE, type RenderItem } from "./renderers/types";

export interface Origin {
  x: number;
  y: number;
}

const rel = (value: number, origin: number) =>
  Number.isFinite(value) ? value - origin : GAP;

const points = (x: Float64Array, y: Float64Array, count: number, o: Origin) => {
  const out = new Float32Array(count * 2);
  for (let i = 0; i < count; i++) {
    // x stays real at gaps so sorted data can be binary searched
    out[i * 2] = rel(x[i], o.x);
    out[i * 2 + 1] = Number.isFinite(y[i]) ? y[i] - o.y : GAP;
  }
  return out;
};

const DRAW_ORDER = { area: 0, bar: 1, line: 2, scatter: 3 } as const;

/** Render items of the visible series, back to front */
export const buildItems = (
  model: ChartModel,
  origin: Origin,
  version: number,
): RenderItem[] => {
  const items: RenderItem[] = [];
  /** Outlines of the areas are drawn with the lines, above the bars */
  const outlines: RenderItem[] = [];
  const ordered = model.series
    .filter((s) => !s.hidden)
    .sort(
      (a, b) => DRAW_ORDER[a.type] - DRAW_ORDER[b.type] || a.index - b.index,
    );
  for (const s of ordered) {
    const { x, y, count, sorted } = s.cols;
    if ((s.type === "line" || s.type === "scatter") && outlines.length) {
      items.push(...outlines.splice(0));
    }
    switch (s.type) {
      case "line":
      case "area": {
        const pts = points(x, y, count, origin);
        if (s.type === "area") {
          items.push({
            kind: "area",
            key: `${s.key}:area`,
            version,
            color: s.color,
            points: pts,
            count,
            baseline: model.baseline - origin.y,
            opacity: s.opacity,
            sorted,
          });
        }
        (s.type === "area" ? outlines : items).push({
          kind: "line",
          key: `${s.key}:line`,
          version,
          color: s.color,
          points: pts,
          count,
          width: s.lineWidth,
          sorted,
        });
        break;
      }
      case "bar": {
        const base = s.barBase ?? new Float64Array(count);
        const top = s.barTop ?? y;
        const instances = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
          const valid = Number.isFinite(top[i]) && Number.isFinite(base[i]);
          instances[i * 3] = rel(x[i] + s.barOffset, origin.x);
          instances[i * 3 + 1] = valid ? base[i] - origin.y : GAP;
          instances[i * 3 + 2] = valid ? top[i] - origin.y : GAP;
        }
        items.push({
          kind: "bar",
          key: `${s.key}:bar`,
          version,
          color: s.color,
          instances,
          count,
          halfWidth: s.barHalfWidth,
          sorted,
          radius: model.series.some(
            (o) =>
              o !== s &&
              !o.hidden &&
              o.type === "bar" &&
              o.barOffset === s.barOffset,
          )
            ? 0
            : 3,
        });
        break;
      }
      default: {
        const buffer = new ArrayBuffer(count * SCATTER_STRIDE);
        const f = new Float32Array(buffer);
        const u = new Uint32Array(buffer);
        const seriesColor = packColor(s.color);
        const sizes = s.cols.size;
        for (let i = 0; i < count; i++) {
          const valid = Number.isFinite(y[i]) && Number.isFinite(x[i]);
          f[i * 4] = valid ? x[i] - origin.x : GAP;
          f[i * 4 + 1] = valid ? y[i] - origin.y : GAP;
          const size = sizes ? sizes[i] : NaN;
          f[i * 4 + 2] = Number.isFinite(size) && size > 0 ? size : s.pointSize;
          const pc = s.pointColors?.[i];
          u[i * 4 + 3] = pc ? packColor(pc) : seriesColor;
        }
        items.push({
          kind: "scatter",
          key: `${s.key}:scatter`,
          version,
          color: s.color,
          instances: buffer,
          count,
          opacity: s.opacity,
          stroke: count <= 5000 ? 1.25 : 0,
        });
        break;
      }
    }
  }
  items.push(...outlines);
  return items;
};
