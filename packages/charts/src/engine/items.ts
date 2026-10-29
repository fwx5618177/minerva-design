// Chart model -> GPU-ready buffers (positions relative to an origin).

import { packColor } from "./color";
import { curvePoints } from "./curve";
import type { ChartModel, SeriesModel } from "./model";
import {
  AREA_STRIDE,
  BAR_STRIDE,
  GAP,
  SCATTER_STRIDE,
  type BarItem,
  type RenderItem,
} from "./renderers/types";

export interface Origin {
  x: number;
  y: number;
}

const rel = (value: number, origin: number) =>
  Number.isFinite(value) ? value - origin : GAP;

const DRAW_ORDER = {
  heatmap: 0,
  area: 1,
  bar: 2,
  candlestick: 3,
  line: 4,
  scatter: 5,
} as const;

/** Line (and area) points of a series: stacked, curved; interleaved x, y */
const linePoints = (s: SeriesModel) => {
  const { x, count } = s.cols;
  const top = s.stackTop ?? s.cols.y;
  const stackBase = s.stackBase;
  if (s.curve === "linear") {
    // no copy: the hot path of large series
    return {
      n: count,
      xAt: (i: number) => x[i],
      yAt: (i: number) => top[i],
      baseAt: stackBase ? (i: number) => stackBase[i] : null,
    };
  }
  const curved = curvePoints(x, top, 0, count, s.curve);
  const base = stackBase
    ? curvePoints(x, stackBase, 0, count, s.curve).points
    : null;
  const points = curved.points;
  return {
    // the buffers are allocated for the worst case: only `length` are written
    n: curved.length,
    xAt: (i: number) => points[i * 2],
    yAt: (i: number) => points[i * 2 + 1],
    baseAt: base ? (i: number) => base[i * 2 + 1] : null,
  };
};

const barItem = (
  key: string,
  version: number,
  s: SeriesModel,
  count: number,
  write: (i: number, f: Float32Array, u: Uint32Array) => void,
  extra: Pick<BarItem, "halfWidth" | "radius" | "inset" | "minHalf" | "sorted">,
): BarItem => {
  const instances = new ArrayBuffer(count * BAR_STRIDE);
  const f = new Float32Array(instances);
  const u = new Uint32Array(instances);
  for (let i = 0; i < count; i++) write(i, f, u);
  return {
    kind: "bar",
    key,
    version,
    color: s.color,
    instances,
    count,
    ...extra,
  };
};

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
        const { n, xAt, yAt, baseAt } = linePoints(s);
        const pts = new Float32Array(n * 2);
        if (s.curve === "linear") {
          // direct loop: the hot path of very large series
          const top = s.stackTop ?? y;
          const ox = origin.x;
          const oy = origin.y;
          for (let i = 0; i < n; i++) {
            const xv = x[i];
            const yv = top[i];
            pts[i * 2] = Number.isFinite(xv) ? xv - ox : GAP;
            pts[i * 2 + 1] = Number.isFinite(yv) ? yv - oy : GAP;
          }
        } else {
          for (let i = 0; i < n; i++) {
            // x stays real at gaps so sorted data can be binary searched
            pts[i * 2] = rel(xAt(i), origin.x);
            pts[i * 2 + 1] = rel(yAt(i), origin.y);
          }
        }
        if (s.type === "area") {
          const area = new Float32Array(n * AREA_STRIDE);
          const baseline = model.baseline - origin.y;
          for (let i = 0; i < n; i++) {
            area[i * 3] = pts[i * 2];
            area[i * 3 + 1] = pts[i * 2 + 1];
            area[i * 3 + 2] = baseAt ? rel(baseAt(i), origin.y) : baseline;
          }
          items.push({
            kind: "area",
            key: `${s.key}:area`,
            version,
            color: s.color,
            points: area,
            count: n,
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
          count: n,
          width: s.lineWidth,
          sorted,
        });
        break;
      }
      case "bar": {
        const base = s.barBase ?? new Float64Array(count);
        const top = s.barTop ?? y;
        const seriesColor = packColor(s.color);
        const shared = model.series.some(
          (o) =>
            o !== s &&
            !o.hidden &&
            o.type === "bar" &&
            o.barOffset === s.barOffset,
        );
        items.push(
          barItem(
            `${s.key}:bar`,
            version,
            s,
            count,
            (i, f, u) => {
              const valid = Number.isFinite(top[i]) && Number.isFinite(base[i]);
              f[i * 4] = rel(x[i] + s.barOffset, origin.x);
              f[i * 4 + 1] = valid ? base[i] - origin.y : GAP;
              f[i * 4 + 2] = valid ? top[i] - origin.y : GAP;
              const pc = s.pointColors?.[i];
              u[i * 4 + 3] = pc ? packColor(pc) : seriesColor;
            },
            {
              halfWidth: s.barHalfWidth,
              // stacked segments stay square so the stack reads as one bar
              radius: shared ? 0 : s.radius,
              inset: 0,
              minHalf: 0,
              sorted,
            },
          ),
        );
        break;
      }
      case "candlestick": {
        const { open, high, low } = s.cols;
        const up = packColor(s.upColor);
        const down = packColor(s.downColor);
        const colorAt = (i: number) =>
          open && Number.isFinite(open[i]) && y[i] < open[i] ? down : up;
        // wicks first, the bodies cover them
        items.push(
          barItem(
            `${s.key}:wick`,
            version,
            s,
            count,
            (i, f, u) => {
              const hi = high ? high[i] : y[i];
              const lo = low ? low[i] : y[i];
              const valid =
                Number.isFinite(hi) &&
                Number.isFinite(lo) &&
                Number.isFinite(y[i]);
              f[i * 4] = rel(x[i], origin.x);
              f[i * 4 + 1] = valid ? lo - origin.y : GAP;
              f[i * 4 + 2] = valid ? hi - origin.y : GAP;
              u[i * 4 + 3] = colorAt(i);
            },
            {
              halfWidth: 0,
              radius: 0,
              inset: 0,
              minHalf: s.lineWidth / 2,
              sorted,
            },
          ),
          barItem(
            `${s.key}:body`,
            version,
            s,
            count,
            (i, f, u) => {
              const o = open ? open[i] : y[i];
              const valid = Number.isFinite(o) && Number.isFinite(y[i]);
              f[i * 4] = rel(x[i], origin.x);
              f[i * 4 + 1] = valid ? o - origin.y : GAP;
              f[i * 4 + 2] = valid ? y[i] - origin.y : GAP;
              u[i * 4 + 3] = colorAt(i);
            },
            {
              halfWidth: s.barHalfWidth,
              radius: Math.min(s.radius, 1.5),
              inset: 0,
              minHalf: 0.5,
              sorted,
            },
          ),
        );
        break;
      }
      case "heatmap": {
        const colors = s.cellColors;
        const hy = s.cellHalf.y;
        items.push(
          barItem(
            `${s.key}:cells`,
            version,
            s,
            count,
            (i, f, u) => {
              const c = colors ? colors[i] : 0;
              const valid = c !== 0 && Number.isFinite(x[i]);
              f[i * 4] = rel(x[i], origin.x);
              f[i * 4 + 1] = valid ? y[i] - hy - origin.y : GAP;
              f[i * 4 + 2] = valid ? y[i] + hy - origin.y : GAP;
              u[i * 4 + 3] = c;
            },
            {
              halfWidth: s.cellHalf.x,
              radius: s.radius,
              inset: 1,
              minHalf: 0,
              sorted,
            },
          ),
        );
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
