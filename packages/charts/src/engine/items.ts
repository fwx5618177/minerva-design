// Chart model -> GPU-ready buffers (positions relative to an origin).

import { packColor, type Rgba } from "./color";
import { curvePoints } from "./curve";
import { heatCellStyle } from "./layout";
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
  boxplot: 2,
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

/** CSS pixels per data unit along each axis (sizes the heatmap cells) */
export interface PixelDensity {
  x: number;
  y: number;
}

/**
 * Inset and radius of the cells of a heatmap at a pixel density; the
 * renderers fade small insets out and overlap tiny cells (no seams)
 */
const cellStyleOf = (s: SeriesModel, density?: PixelDensity) => {
  if (!density) return { inset: 0.5, radius: Math.min(s.radius, 2) };
  const style = heatCellStyle(
    s.cellHalf.x * 2 * density.x,
    s.cellHalf.y * 2 * density.y,
    s.radius,
  );
  return { inset: Math.max(0.5, style.inset), radius: style.radius };
};

/**
 * What the heatmap items depend on besides the model: their cell style at
 * the current pixel density (`""` without heatmaps)
 */
export const cellStyleKey = (
  model: ChartModel,
  density?: PixelDensity,
): string => {
  let key = "";
  for (const s of model.series) {
    if (s.type !== "heatmap" || s.hidden) continue;
    const style = cellStyleOf(s, density);
    key += `${style.inset}/${style.radius};`;
  }
  return key;
};

/**
 * Render items of the visible series, back to front; `density` sizes the
 * gaps and corners of heatmap cells
 */
export const buildItems = (
  model: ChartModel,
  origin: Origin,
  version: number,
  density?: PixelDensity,
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
        if (s.lineWidth <= 0) break;
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
        if (s.type === "area" && s.cols.y0 && baseAt) {
          // range areas: the lower edge is drawn too
          const lower = new Float32Array(n * 2);
          for (let i = 0; i < n; i++) {
            lower[i * 2] = pts[i * 2];
            lower[i * 2 + 1] = rel(baseAt(i), origin.y);
          }
          outlines.push({
            kind: "line",
            key: `${s.key}:lower`,
            version,
            color: s.color,
            points: lower,
            count: n,
            width: s.lineWidth,
            sorted,
          });
        }
        break;
      }
      case "bar": {
        const base = s.barBase ?? new Float64Array(count);
        const top = s.barTop ?? y;
        const fade = (c: Rgba): Rgba =>
          s.opacity < 1 ? [c[0], c[1], c[2], c[3] * s.opacity] : c;
        const seriesColor = packColor(fade(s.color));
        // floating bars (ranges, Gantt progress) keep their corners
        const shared =
          !s.floating &&
          model.series.some(
            (o) =>
              o !== s &&
              !o.hidden &&
              o.type === "bar" &&
              !o.floating &&
              o.barOffset === s.barOffset,
          );
        const touching = s.barHalfWidth > 0 && isTouching(model, s);
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
              u[i * 4 + 3] = pc ? packColor(fade(pc)) : seriesColor;
            },
            {
              halfWidth: s.barHalfWidth,
              // stacked segments stay square so the stack reads as one bar
              radius: shared ? 0 : s.radius,
              // bars filling their category (histograms): a hairline apart
              inset: touching ? 0.5 : 0,
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
      case "boxplot":
        items.push(...boxItems(s, origin, version));
        break;
      case "heatmap": {
        const colors = s.cellColors;
        const hy = s.cellHalf.y;
        const style = cellStyleOf(s, density);
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
              radius: style.radius,
              inset: style.inset,
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

/** Bars of a series fill their whole category (`barWidth: 1`, histograms) */
const isTouching = (model: ChartModel, s: SeriesModel) => {
  let band = 1;
  if (model.x.type !== "category") {
    const { x, count } = s.cols;
    band = Infinity;
    for (let i = 1; i < Math.min(count, 64); i++) {
      const d = Math.abs(x[i] - x[i - 1]);
      if (d > 0 && d < band) band = d;
    }
    if (!Number.isFinite(band)) return false;
  }
  return s.barHalfWidth * 2 >= band * 0.98;
};

/**
 * Box plot: a translucent box, whiskers and box sides (zero-width bars of
 * the line width), caps, box edges and the median (zero-height bars), and
 * the outliers as dots
 */
const boxItems = (
  s: SeriesModel,
  origin: Origin,
  version: number,
): RenderItem[] => {
  const { x, y, count, high, low, q1, q3, outliers } = s.cols;
  const color = packColor(s.color);
  const fill = packColor([
    s.color[0],
    s.color[1],
    s.color[2],
    s.color[3] * s.opacity,
  ]);
  const colorAt = (i: number, alpha = false) => {
    const pc = s.pointColors?.[i];
    if (!pc) return alpha ? fill : color;
    return packColor(alpha ? [pc[0], pc[1], pc[2], pc[3] * s.opacity] : pc);
  };
  const half = s.barHalfWidth;
  const lw = Math.max(1, s.lineWidth);
  const at = (column: Float64Array | null, i: number) =>
    column && Number.isFinite(column[i]) ? column[i] : y[i];
  const ox = (i: number, dx = 0) => rel(x[i] + s.barOffset + dx, origin.x);
  const oy = (v: number) => v - origin.y;
  /** Several bars per point: `parts` gives their (x shift, from, to) */
  const multi = (
    key: string,
    parts: number,
    write: (i: number, k: number) => [number, number, number],
    extra: Pick<BarItem, "halfWidth" | "minHalf">,
  ): BarItem => {
    const buffer = new ArrayBuffer(count * parts * BAR_STRIDE);
    const f = new Float32Array(buffer);
    const u = new Uint32Array(buffer);
    for (let i = 0; i < count; i++) {
      const valid = Number.isFinite(y[i]) && Number.isFinite(x[i]);
      for (let k = 0; k < parts; k++) {
        const j = (i * parts + k) * 4;
        const [dx, a, b] = valid ? write(i, k) : [0, NaN, NaN];
        f[j] = valid ? ox(i, dx) : GAP;
        f[j + 1] = valid ? oy(a) : GAP;
        f[j + 2] = valid ? oy(b) : GAP;
        u[j + 3] = colorAt(i);
      }
    }
    return {
      kind: "bar",
      key: `${s.key}:${key}`,
      version,
      color: s.color,
      instances: buffer,
      count: count * parts,
      radius: 0,
      inset: 0,
      sorted: false,
      ...extra,
    };
  };
  const box = barItem(
    `${s.key}:box`,
    version,
    s,
    count,
    (i, f, u) => {
      const valid = Number.isFinite(y[i]) && Number.isFinite(x[i]);
      f[i * 4] = valid ? ox(i) : GAP;
      f[i * 4 + 1] = valid ? oy(at(q1, i)) : GAP;
      f[i * 4 + 2] = valid ? oy(at(q3, i)) : GAP;
      u[i * 4 + 3] = colorAt(i, true);
    },
    { halfWidth: half, radius: 0, inset: 0, minHalf: 0, sorted: false },
  );
  // whiskers and sides of the box
  const stems = multi(
    "stems",
    4,
    (i, k) =>
      k === 0
        ? [0, at(low, i), at(q1, i)]
        : k === 1
          ? [0, at(q3, i), at(high, i)]
          : [k === 2 ? -half : half, at(q1, i), at(q3, i)],
    { halfWidth: 0, minHalf: lw / 2 },
  );
  const caps = multi(
    "caps",
    2,
    (i, k) => {
      const v = at(k === 0 ? low : high, i);
      return [0, v, v];
    },
    { halfWidth: half / 2, minHalf: lw / 2 },
  );
  const edges = multi(
    "edges",
    2,
    (i, k) => {
      const v = at(k === 0 ? q1 : q3, i);
      return [0, v, v];
    },
    { halfWidth: half, minHalf: lw / 2 },
  );
  const median = multi("median", 1, (i) => [0, y[i], y[i]], {
    halfWidth: half,
    minHalf: Math.max(1, lw * 0.8),
  });
  const items: RenderItem[] = [box, stems, caps, edges, median];
  if (outliers) {
    let n = 0;
    for (let i = 0; i < count; i++) n += outliers[i]?.length ?? 0;
    if (n) {
      const buffer = new ArrayBuffer(n * SCATTER_STRIDE);
      const f = new Float32Array(buffer);
      const u = new Uint32Array(buffer);
      let j = 0;
      for (let i = 0; i < count; i++) {
        const list = outliers[i];
        if (!list) continue;
        for (const v of list) {
          const valid = Number.isFinite(v) && Number.isFinite(x[i]);
          f[j * 4] = valid ? ox(i) : GAP;
          f[j * 4 + 1] = valid ? oy(v) : GAP;
          f[j * 4 + 2] = s.outlierSize;
          u[j * 4 + 3] = colorAt(i);
          j++;
        }
      }
      items.push({
        kind: "scatter",
        key: `${s.key}:outliers`,
        version,
        color: s.color,
        instances: buffer,
        count: n,
        // rings of the series color (the box shows through), or dots
        opacity: s.outlierShape === "hollow" ? 0 : 0.85,
        stroke: s.outlierShape === "hollow" || n <= 5000 ? 1.25 : 0,
      });
    }
  }
  return items;
};
