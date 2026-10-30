// Layout of every shape chart type into a ShapeScene, plus what the hosts
// share: animated values, legend entries, tooltip content, hover events and
// accessible descriptions. Pure: no DOM, no canvas.

import { toCss } from "../color";
import { resolveLocale } from "../locale";
import { font } from "../overlay";
import type { ChartTheme } from "../theme";
import { bulletValues, layoutBullet } from "./bullet";
import {
  calendarLegend,
  calendarModel,
  calendarValues,
  layoutCalendar,
} from "./calendar";
import { funnelOrder, funnelValues, layoutFunnel } from "./funnel";
import { gaugeValues, layoutGauge } from "./gauge";
import {
  interpolate,
  localeFormat,
  localePercent,
  SHAPE_LABELS,
  shapeLabels,
} from "./labels";
import { layoutPie, pieValues } from "./pie";
import { layoutRadar, radarValues, seriesName } from "./radar";
import { layoutRadialBar, radialBarLabels, radialBarValues } from "./radialBar";
import { layoutSankey, resolveSankey, sankeyValues } from "./sankey";
import {
  clamp,
  inset,
  resolveWith,
  type LayoutContext,
  type LayoutResult,
  type MeasureText,
  type ShapeHover,
  type ShapeLegendEntry,
  type ShapeRect,
  type ShapeScene,
  type ShapeTooltipRow,
} from "./scene";
import { layoutSunburst, sunburstValues } from "./sunburst";
import { layoutTreemap, treemapValues } from "./treemap";
import type {
  ShapeChartOptions,
  ShapeHoverEvent,
  ShapeLegendOptions,
} from "./types";

export interface ShapeLayoutInput {
  options: ShapeChartOptions;
  theme: ChartTheme;
  /** Size of the whole drawing, CSS pixels */
  width: number;
  height: number;
  /** Area of the chart (legend excluded); the whole drawing by default */
  bounds?: ShapeRect;
  measure: MeasureText;
  /** Hidden slices / stages / series (treemap: top-level nodes) */
  hidden?: ReadonlySet<number>;
  /** Entry animation progress, eased (1 = done) */
  enter?: number;
  /** Values at the start of an update animation (`shapeValues`) */
  from?: ReadonlyMap<string, number> | null;
  /** Update animation progress, eased (1 = done) */
  t?: number;
  /** Sunburst: names from the root to the focused node */
  focus?: readonly string[];
}

const NO_HIDDEN: ReadonlySet<number> = new Set();
const NO_FOCUS: readonly string[] = [];

/** Lays a shape chart out */
export const layoutShapeScene = (input: ShapeLayoutInput): ShapeScene => {
  const { options: o, theme, width, height } = input;
  const bounds = input.bounds ?? { x: 0, y: 0, width, height };
  const from = input.from ?? null;
  const t = clamp(input.t ?? 1, 0, 1);
  const palette = theme.palette.length ? theme.palette : [theme.primary];
  const locale = resolveLocale(o.locale);
  const labels = shapeLabels(o);
  const c: LayoutContext = {
    theme,
    measure: input.measure,
    hidden: input.hidden ?? NO_HIDDEN,
    enter: clamp(input.enter ?? 1, 0, 1),
    value: (key, target) => {
      if (!from || t >= 1) return target;
      const start = from.get(key) ?? 0;
      return start + (target - start) * t;
    },
    format: o.format ?? localeFormat(locale),
    percent: o.percentFormat ?? localePercent(locale),
    labels,
    locale,
    color: (css, i) => resolveWith(theme, css, palette[i % palette.length]),
    area: inset(bounds, o.padding),
    focus: input.focus ?? NO_FOCUS,
  };
  let result: LayoutResult;
  switch (o.type) {
    case "pie":
      result = layoutPie(o, c);
      break;
    case "radar":
      result = layoutRadar(o, c);
      break;
    case "gauge":
      result = layoutGauge(o, c);
      break;
    case "funnel":
      result = layoutFunnel(o, c);
      break;
    case "sankey":
      result = layoutSankey(o, c);
      break;
    case "sunburst":
      result = layoutSunburst(o, c);
      break;
    case "radialBar":
      result = layoutRadialBar(o, c);
      break;
    case "calendarHeatmap":
      result = layoutCalendar(o, c);
      break;
    case "bullet":
      result = layoutBullet(o, c);
      break;
    default:
      result = layoutTreemap(o, c);
      break;
  }
  return { type: o.type, width, height, labels, locale, ...result };
};

/** Target values of the animated quantities, by key */
export const shapeValues = (
  o: ShapeChartOptions,
  hidden: ReadonlySet<number> = NO_HIDDEN,
  focus: readonly string[] = NO_FOCUS,
): Map<string, number> => {
  const out = new Map<string, number>();
  switch (o.type) {
    case "pie":
      pieValues(o, hidden, out);
      break;
    case "radar":
      radarValues(o, hidden, out);
      break;
    case "gauge":
      gaugeValues(o, hidden, out);
      break;
    case "funnel":
      funnelValues(o, hidden, out);
      break;
    case "sankey":
      sankeyValues(o, hidden, out);
      break;
    case "sunburst":
      sunburstValues(o, hidden, focus, out);
      break;
    case "radialBar":
      radialBarValues(o, hidden, out);
      break;
    case "calendarHeatmap":
      calendarValues(o, hidden, out);
      break;
    case "bullet":
      bulletValues(o, hidden, out);
      break;
    default:
      treemapValues(o, hidden, out);
      break;
  }
  return out;
};

/** Values shown at progress `t` of an animation from `from` to `to` */
export const blendValues = (
  from: ReadonlyMap<string, number>,
  to: ReadonlyMap<string, number>,
  t: number,
): Map<string, number> => {
  const out = new Map<string, number>();
  to.forEach((v, key) => {
    const start = from.get(key) ?? 0;
    out.set(key, start + (v - start) * t);
  });
  return out;
};

export const sameValues = (
  a: ReadonlyMap<string, number>,
  b: ReadonlyMap<string, number>,
) => {
  if (a.size !== b.size) return false;
  for (const [key, v] of a) {
    const w = b.get(key);
    if (w === undefined || Math.abs(w - v) > 1e-12) return false;
  }
  return true;
};

/** Legend position and toggling */
export const legendConfig = (
  o: ShapeChartOptions,
): Required<ShapeLegendOptions> => {
  const config = typeof o.legend === "object" ? o.legend : {};
  return {
    position: config.position ?? "bottom",
    toggle: config.toggle ?? true,
  };
};

/** Legend entries, `null` when the legend is hidden */
export const shapeLegend = (
  o: ShapeChartOptions,
  theme: ChartTheme,
  hidden: ReadonlySet<number> = NO_HIDDEN,
): ShapeLegendEntry[] | null => {
  if (o.legend === false) return null;
  const palette = theme.palette.length ? theme.palette : [theme.primary];
  const color = (css: string | undefined, i: number) =>
    toCss(resolveWith(theme, css, palette[i % palette.length]));
  let entries: ShapeLegendEntry[] = [];
  let shown = o.legend !== undefined;
  switch (o.type) {
    case "pie":
      shown = true;
      entries = o.data.map((d, i) => ({
        index: i,
        name: d.name,
        color: color(d.color, i),
        hidden: hidden.has(i),
      }));
      break;
    case "funnel":
      shown = true;
      entries = funnelOrder(o, NO_HIDDEN).map((i) => ({
        index: i,
        name: o.data[i].name,
        color: color(o.data[i].color, i),
        hidden: hidden.has(i),
      }));
      break;
    case "radar":
      shown ||= o.series.length > 1;
      entries = o.series.map((s, i) => ({
        index: i,
        name: seriesName(o, i, shapeLabels(o)),
        color: color(s.color, i),
        hidden: hidden.has(i),
      }));
      break;
    case "treemap":
    case "sunburst":
      entries = o.data.map((d, i) => ({
        index: i,
        name: d.name,
        color: color(d.color, i),
        hidden: hidden.has(i),
      }));
      break;
    case "radialBar":
      shown ||= !radialBarLabels(o);
      entries = o.data.map((d, i) => ({
        index: i,
        name: d.name,
        color: color(d.color, i),
        hidden: hidden.has(i),
      }));
      break;
    case "bullet":
      entries = o.data.map((d, i) => ({
        index: i,
        name: d.name,
        color: color(d.color, i),
        hidden: hidden.has(i),
      }));
      break;
    case "sankey": {
      const g = resolveSankey(o);
      entries = g.names.map((name, i) => ({
        index: i,
        name,
        color: color(g.colors[i], i),
        hidden: hidden.has(i),
      }));
      break;
    }
    case "calendarHeatmap":
      shown = true;
      entries = calendarLegend(o, theme, hidden);
      break;
    default:
      break;
  }
  return shown && entries.length ? entries : null;
};

/**
 * Number of toggleable entries (slices, stages, series, top-level nodes,
 * sankey nodes, bars, rows, calendar levels)
 */
export const toggleCount = (o: ShapeChartOptions): number => {
  switch (o.type) {
    case "radar":
      return o.series.length;
    case "gauge":
      return 0;
    case "sankey":
      return resolveSankey(o).names.length;
    case "calendarHeatmap":
      return calendarModel(o)?.count ?? 0;
    default:
      return o.data.length;
  }
};

/** Event of a hovered item */
export const hoverEvent = (
  scene: ShapeScene,
  hover: ShapeHover | null,
): ShapeHoverEvent | null => {
  if (!hover) return null;
  const item = scene.items.find((it) => it.index === hover.index);
  if (!item) return null;
  if (item.indicators) {
    const k = clamp(hover.indicator ?? 0, 0, item.indicators.length - 1);
    const ind = item.indicators[k];
    return {
      index: item.index,
      indicator: k,
      name: item.name,
      value: ind.value,
      percent: ind.percent,
      color: item.color,
    };
  }
  return {
    index: item.index,
    name: item.name,
    value: item.value,
    percent: item.percent,
    color: item.color,
    ...(item.path ? { path: item.path } : {}),
    ...item.event,
  };
};

export const sameHover = (a: ShapeHover | null, b: ShapeHover | null) =>
  a === b || (!!a && !!b && a.index === b.index && a.indicator === b.indicator);

export interface ShapeTooltipContent {
  title: string;
  color?: string;
  rows: ShapeTooltipRow[];
}

/** Default tooltip of a hovered item */
export const tooltipContent = (
  scene: ShapeScene,
  hover: ShapeHover,
): ShapeTooltipContent | null => {
  const item = scene.items.find((it) => it.index === hover.index);
  if (!item) return null;
  const rows = item.indicators
    ? item.rows.map((row, k) =>
        k === (hover.indicator ?? -1) ? { ...row, strong: true } : row,
      )
    : item.rows;
  return {
    title: item.path ? item.path.join(" / ") : item.name,
    color: item.color,
    rows,
  };
};

/** Text read by screen readers for a focused item */
export const describeItem = (scene: ShapeScene, hover: ShapeHover) => {
  const item = scene.items.find((it) => it.index === hover.index);
  if (!item) return "";
  if (item.indicators) {
    const k = clamp(hover.indicator ?? 0, 0, item.indicators.length - 1);
    return `${item.name}, ${item.indicators[k].name}: ${item.rows[k]?.value ?? item.indicators[k].value}`;
  }
  const name = item.path ? item.path.join(" / ") : item.name;
  return `${name}: ${item.rows[0]?.value ?? item.value} (${item.share ?? localePercent(scene.locale)(item.percent)})`;
};

/** Default accessible name of a chart (in its `locale`) */
export const describeChart = (o: ShapeChartOptions) => {
  const l = shapeLabels(o);
  switch (o.type) {
    case "pie":
      return o.rose
        ? l.roseChart
        : (o.innerRadius ?? 0) > 0
          ? l.donutChart
          : l.pieChart;
    case "radar":
      return l.radarChart;
    case "gauge":
      return o.label
        ? interpolate(l.gaugeChartNamed, { label: o.label })
        : l.gaugeChart;
    case "funnel":
      return l.funnelChart;
    case "sankey":
      return l.sankeyChart;
    case "sunburst":
      return l.sunburstChart;
    case "radialBar":
      return l.radialBarChart;
    case "calendarHeatmap":
      return l.calendarHeatmap;
    case "bullet":
      return l.bulletChart;
    default:
      return l.treemapChart;
  }
};

/** Text summary of the data (screen readers) */
export const describeScene = (scene: ShapeScene) =>
  scene.empty
    ? (scene.labels ?? SHAPE_LABELS.en).noData
    : scene.items
        .slice(0, 12)
        .map((item) =>
          item.indicators
            ? `${item.name}: ${item.indicators
                .map(
                  (ind, k) => `${ind.name} ${item.rows[k]?.value ?? ind.value}`,
                )
                .join(", ")}`
            : describeItem(scene, { index: item.index }),
        )
        .join("; ");

// ------------------------------------------------- canvas legend & tooltip

export interface ShapeLegendBox extends ShapeLegendEntry {
  x: number;
  y: number;
  width: number;
  height: number;
}

const LEGEND_ROW = 20;

/** Centered legend rows drawn on a canvas; `height` includes the gap with the chart */
export const layoutShapeLegend = (
  entries: readonly ShapeLegendEntry[],
  width: number,
  position: "top" | "bottom",
  chartHeight: number,
  theme: ChartTheme,
  measure: MeasureText,
): { boxes: ShapeLegendBox[]; height: number } => {
  const f = font(theme, 12);
  const gap = 14;
  const rows: ShapeLegendBox[][] = [[]];
  let x = 0;
  for (const e of entries) {
    const w = Math.min(width - 8, 16 + measure(e.name, f));
    let row = rows[rows.length - 1];
    if (row.length && x + gap + w > width - 8) {
      rows.push((row = []));
      x = 0;
    }
    if (row.length) x += gap;
    row.push({ ...e, x, y: 0, width: w, height: LEGEND_ROW });
    x += w;
  }
  const height = rows.length * LEGEND_ROW + 8;
  const top = position === "top" ? 2 : chartHeight - height + 6;
  const boxes: ShapeLegendBox[] = [];
  rows.forEach((row, r) => {
    const last = row[row.length - 1];
    const used = last ? last.x + last.width : 0;
    const offset = (width - used) / 2;
    for (const box of row) {
      boxes.push({ ...box, x: box.x + offset, y: top + r * LEGEND_ROW });
    }
  });
  return { boxes, height };
};

export interface ShapeTooltipBox {
  x: number;
  y: number;
  width: number;
  height: number;
  padding: number;
  lineHeight: number;
  /** Default content */
  content?: ShapeTooltipContent;
  /** Custom text (`tooltip.render` returning a string) */
  text?: string[];
}

/** Margin between a tooltip and the edges of the drawing */
const TIP_MARGIN = 6;
/** Distance between a tooltip and its anchor */
const TIP_GAP = 14;

const overlapArea = (a: ShapeRect, b: ShapeRect) =>
  Math.max(0, Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x)) *
  Math.max(0, Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y));

/**
 * Top-left corner of a `w` x `h` tooltip anchored at `anchor`, inside a
 * `width` x `height` drawing. Beside the anchor (right, else left) by
 * default; radar tooltips go outward, off the hovered vertex and, when
 * possible, off the indicator labels.
 */
export const placeShapeTooltip = (
  scene: ShapeScene | null,
  hover: ShapeHover | null,
  anchor: { x: number; y: number },
  w: number,
  h: number,
  width: number,
  height: number,
): { x: number; y: number } => {
  const m = TIP_MARGIN;
  const fit = (x: number, y: number) => ({
    x: Math.max(m, Math.min(x, width - w - m)),
    y: Math.max(m, Math.min(y, height - h - m)),
  });
  const { x: ax, y: ay } = anchor;
  const radar = scene?.radar;
  if (!radar || !scene || !hover) {
    let x = ax + 16;
    if (x + w > width - m) x = ax - 16 - w;
    return fit(x, ay - h / 2);
  }

  // points the tooltip must not cover: the anchor and the hovered vertex
  const avoid: [number, number][] = [[ax, ay]];
  const item = scene.items.find((it) => it.index === hover.index);
  const vertex =
    item?.indicators && hover.indicator !== undefined
      ? item.indicators[hover.indicator]
      : undefined;
  if (vertex) avoid.push([vertex.x, vertex.y]);
  const labels = radar.labels ?? [];
  // outward direction, from the center through the anchor
  let dx = ax - radar.cx;
  let dy = ay - radar.cy;
  const len = Math.hypot(dx, dy);
  if (len > 1) {
    dx /= len;
    dy /= len;
  } else {
    dx = 1;
    dy = 0;
  }
  const g = TIP_GAP;
  const candidates: [number, number][] = [
    [ax + g, ay - h / 2],
    [ax - g - w, ay - h / 2],
    [ax - w / 2, ay - g - h],
    [ax - w / 2, ay + g],
    [ax + g, ay - g - h],
    [ax + g, ay + g],
    [ax - g - w, ay - g - h],
    [ax - g - w, ay + g],
  ];
  let best = fit(candidates[0][0], candidates[0][1]);
  let bestScore = Infinity;
  for (const [cx0, cy0] of candidates) {
    const p = fit(cx0, cy0);
    const box = { x: p.x, y: p.y, width: w, height: h };
    let score = 0;
    for (const [px, py] of avoid) {
      const covers =
        px > box.x - 8 &&
        px < box.x + w + 8 &&
        py > box.y - 8 &&
        py < box.y + h + 8;
      if (covers) score += 1e6;
    }
    for (const label of labels) score += overlapArea(box, label) * 4;
    const ox = p.x + w / 2 - ax;
    const oy = p.y + h / 2 - ay;
    const dist = Math.hypot(ox, oy) || 1;
    score += dist * 0.5;
    // prefer going outward, and candidates that fit without being pushed in
    score -= ((ox * dx + oy * dy) / dist) * 40;
    score += Math.abs(p.x - cx0) + Math.abs(p.y - cy0);
    if (score < bestScore) {
      bestScore = score;
      best = p;
    }
  }
  return best;
};

/** Box of a tooltip drawn on a canvas, next to the anchor and inside the drawing */
export const layoutShapeTooltip = (
  value: ShapeTooltipContent | string,
  anchorX: number,
  anchorY: number,
  width: number,
  height: number,
  theme: ChartTheme,
  measure: MeasureText,
  scene: ShapeScene | null = null,
  hover: ShapeHover | null = null,
): ShapeTooltipBox => {
  const padding = 9;
  const lineHeight = 18;
  let w = 0;
  let lines: number;
  let content: ShapeTooltipContent | undefined;
  let text: string[] | undefined;
  if (typeof value === "string") {
    text = value.split("\n");
    const f = font(theme, 12);
    for (const line of text) w = Math.max(w, measure(line, f));
    lines = text.length;
  } else {
    content = value;
    w = (value.color ? 14 : 0) + measure(value.title, font(theme, 12, 600));
    for (const row of value.rows) {
      w = Math.max(
        w,
        (row.color ? 14 : 0) +
          measure(row.name, font(theme, 12)) +
          16 +
          measure(row.value, font(theme, 12, 600)),
      );
    }
    lines = 1 + value.rows.length;
  }
  const bw = Math.max(96, Math.ceil(w + padding * 2 + 4));
  const bh = lines * lineHeight + padding * 2;
  const { x, y } = placeShapeTooltip(
    scene,
    hover,
    { x: anchorX, y: anchorY },
    bw,
    bh,
    width,
    height,
  );
  return {
    x,
    y,
    width: bw,
    height: bh,
    padding,
    lineHeight,
    ...(content ? { content } : {}),
    ...(text ? { text } : {}),
  };
};
