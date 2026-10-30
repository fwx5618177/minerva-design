// Radar (spider) layout: concentric grid with alternate bands, spokes,
// indicator labels placed by angle, series polygons with dots.

import { toCss } from "../color";
import { font } from "../overlay";
import { interpolate } from "./labels";
import {
  clamp,
  ellipsize,
  emptyLayout,
  finite,
  TAU,
  type LayoutContext,
  type LayoutResult,
  type ShapeItem,
  type ShapeNode,
  type ShapeRect,
} from "./scene";
import type { RadarChartOptions, ShapeChartLabels } from "./types";

/** Value range of every indicator (center, rim) */
export const radarRanges = (o: RadarChartOptions): [number, number][] =>
  o.indicators.map((ind, k) => {
    const min = finite(ind.min);
    let max = ind.max;
    if (max === undefined || !Number.isFinite(max)) {
      max = -Infinity;
      for (const s of o.series) {
        const v = s.values[k];
        if (Number.isFinite(v)) max = Math.max(max, v);
      }
    }
    if (!(max > min)) max = min + 1;
    return [min, max];
  });

/** Target values: hidden series shrink to the center */
export const radarValues = (
  o: RadarChartOptions,
  hidden: ReadonlySet<number>,
  out: Map<string, number>,
) => {
  const ranges = radarRanges(o);
  o.series.forEach((s, si) => {
    const on = !hidden.has(si);
    out.set(`~${si}`, on ? 1 : 0);
    ranges.forEach(([min], k) => {
      out.set(`${si}:${k}`, on ? finite(s.values[k], min) : min);
    });
  });
};

export const seriesName = (
  o: RadarChartOptions,
  si: number,
  labels: ShapeChartLabels,
) => o.series[si]?.name ?? interpolate(labels.series, { index: si + 1 });

export const layoutRadar = (
  o: RadarChartOptions,
  c: LayoutContext,
): LayoutResult => {
  const { theme, area, measure, hidden } = c;
  const n = o.indicators.length;
  if (!n) return emptyLayout(c);
  const ranges = radarRanges(o);
  const levels = Math.round(clamp(finite(o.levels, 4), 1, 12));
  const circle = o.shape === "circle";
  const angles = o.indicators.map((_, k) => -Math.PI / 2 + (TAU * k) / n);
  const labelFont = font(theme, 12);
  const strongFont = font(theme, 12, 600);

  // largest radius leaving room for every label, given its direction
  const LABEL_GAP = 10;
  const LABEL_H = 16;
  const halfW = area.width / 2;
  const halfH = area.height / 2;
  let radius = Math.min(halfW, halfH) - 4;
  o.indicators.forEach((ind, k) => {
    const cos = Math.abs(Math.cos(angles[k]));
    const sin = Math.abs(Math.sin(angles[k]));
    const w = measure(ind.name, strongFont);
    if (cos > 0.15)
      radius = Math.min(radius, (halfW - w - 4) / cos - LABEL_GAP);
    else radius = Math.min(radius, halfW - w / 2 - 4);
    if (sin > 0.3)
      radius = Math.min(radius, (halfH - LABEL_H - 2) / sin - LABEL_GAP);
    else radius = Math.min(radius, halfH - LABEL_H / 2 - 2);
  });
  const half = Math.min(area.width, area.height) / 2;
  radius = Math.max(radius, half * 0.45, 4);
  const cx = area.x + area.width / 2;
  const cy = area.y + area.height / 2;
  const at = (k: number, r: number): [number, number] => [
    cx + r * Math.cos(angles[k]),
    cy + r * Math.sin(angles[k]),
  ];
  const ring = (r: number) => {
    const points: number[] = [];
    for (let k = 0; k < n; k++) points.push(...at(k, r));
    return points;
  };

  const nodes: ShapeNode[] = [];
  const band = toCss(theme.grid, 0.45);
  const line = toCss(theme.grid);

  // grid: alternate bands from the rim, ring outlines, spokes
  for (let l = levels; l >= 1; l--) {
    const r = (radius * l) / levels;
    const rIn = (radius * (l - 1)) / levels;
    if ((levels - l) % 2 === 0) {
      if (circle)
        nodes.push({
          kind: "sector",
          cx,
          cy,
          r0: rIn,
          r1: r,
          a0: 0,
          a1: TAU,
          pad: 0,
          corner: 0,
          fill: band,
        });
      else if (n >= 3)
        nodes.push({
          kind: "polygon",
          points: ring(r),
          ...(l > 1 ? { hole: ring(rIn) } : {}),
          fill: band,
        });
    }
  }
  for (let l = 1; l <= levels; l++) {
    const r = (radius * l) / levels;
    const color = l === levels ? toCss(theme.axis, 0.9) : line;
    if (circle || n < 3)
      nodes.push({
        kind: "arc",
        cx,
        cy,
        r,
        a0: 0,
        a1: TAU,
        width: 1,
        color,
        cap: "butt",
      });
    else
      nodes.push({
        kind: "polygon",
        points: ring(r),
        stroke: color,
        lineWidth: 1,
      });
  }
  const ends = angles.map((_, k) => at(k, radius));
  for (const [x, y] of ends)
    nodes.push({ kind: "line", points: [cx, cy, x, y], color: line, width: 1 });
  nodes.push({
    kind: "guide",
    cx,
    cy,
    ends,
    color: toCss(theme.textMuted, 0.55),
  });

  // series
  const enter = clamp(c.enter, 0, 1);
  const items: ShapeItem[] = [];
  const dots: ShapeNode[] = [];
  const geometry: { index: number; points: number[] }[] = [];
  o.series.forEach((s, si) => {
    const isHidden = hidden.has(si);
    const visibility = clamp(c.value(`~${si}`, isHidden ? 0 : 1), 0, 1);
    if (isHidden && visibility <= 0.001) return;
    const color = c.color(s.color, si);
    const css = toCss(color);
    const opacity = clamp(finite(s.opacity, 0.18), 0, 1);
    const points: number[] = [];
    ranges.forEach(([min, max], k) => {
      const target = isHidden ? min : finite(s.values[k], min);
      const v = c.value(`${si}:${k}`, target);
      const frac = clamp((v - min) / (max - min), 0, 1);
      points.push(...at(k, radius * frac * enter));
    });
    nodes.push({
      kind: "polygon",
      points,
      fill: toCss(color, opacity),
      stroke: css,
      lineWidth: 2,
      hit: si,
      hoverFill: toCss(color, Math.min(0.5, opacity * 2 + 0.06)),
      hoverLineWidth: 3,
    });
    if (o.dots !== false) {
      for (let k = 0; k < n; k++)
        dots.push({
          kind: "circle",
          cx: points[k * 2],
          cy: points[k * 2 + 1],
          r: 3,
          fill: css,
          stroke: toCss(theme.background),
          lineWidth: 1.5,
          hit: si,
          indicator: k,
          hoverR: 5,
          halo: toCss(color, 0.2),
        });
    }
    if (isHidden) return;
    geometry.push({ index: si, points });
    const indicators = ranges.map(([min, max], k) => {
      const value = finite(s.values[k]);
      return {
        name: o.indicators[k].name,
        value,
        percent: clamp((value - min) / (max - min), 0, 1),
        x: points[k * 2],
        y: points[k * 2 + 1],
      };
    });
    items.push({
      index: si,
      name: seriesName(o, si, c.labels),
      value: indicators[0].value,
      percent: indicators[0].percent,
      color: css,
      x: indicators[0].x,
      y: indicators[0].y,
      rows: indicators.map((ind) => ({
        name: ind.name,
        value: c.format(ind.value),
      })),
      indicators,
    });
  });
  nodes.push(...dots);

  // indicator labels
  const labelBoxes: ShapeRect[] = [];
  o.indicators.forEach((ind, k) => {
    const cos = Math.cos(angles[k]);
    const sin = Math.sin(angles[k]);
    const [x, y] = at(k, radius + LABEL_GAP);
    const room =
      Math.abs(cos) < 0.15
        ? area.width
        : halfW - Math.abs(cos) * (radius + LABEL_GAP) - 2;
    const text = ellipsize(ind.name, Math.max(0, room), strongFont, measure);
    if (!text) return;
    const align = cos > 0.15 ? "left" : cos < -0.15 ? "right" : "center";
    const baseline = sin < -0.3 ? "bottom" : sin > 0.3 ? "top" : "middle";
    const w = measure(text, strongFont);
    labelBoxes.push({
      x: align === "left" ? x : align === "right" ? x - w : x - w / 2,
      y:
        baseline === "top"
          ? y
          : baseline === "bottom"
            ? y - LABEL_H
            : y - LABEL_H / 2,
      width: w,
      height: LABEL_H,
    });
    nodes.push({
      kind: "text",
      x,
      y,
      text,
      font: labelFont,
      color: toCss(theme.textMuted),
      align,
      baseline,
      indicator: k,
      hoverColor: toCss(theme.text),
      hoverFont: strongFont,
    });
  });

  return {
    nodes,
    items,
    dim: 0.35,
    empty: false,
    radar: { cx, cy, radius, angles, series: geometry, labels: labelBoxes },
  };
};
