// Radial bar layout: concentric progress rings (outermost first) on tinted
// tracks, rounded ends kept inside the sweep, labels in the empty part of the
// circle before the bars start, center text.

import { mix, toCss } from "../color";
import { font } from "../overlay";
import {
  clamp,
  ellipsize,
  emptyLayout,
  finite,
  positive,
  sum,
  TAU,
  uniqueKeys,
  upright,
  type LayoutContext,
  type LayoutResult,
  type ShapeItem,
  type ShapeNode,
} from "./scene";
import type { RadialBarChartOptions } from "./types";

const keysOf = (o: RadialBarChartOptions) =>
  uniqueKeys(o.data.map((d) => d.name));

/** Value of a full bar of every datum */
export const radialBarMax = (o: RadialBarChartOptions): number[] => {
  const largest = Math.max(0, ...o.data.map((d) => positive(d.value)));
  const shared = positive(o.max) || largest || 1;
  return o.data.map((d) => positive(d.max) || shared);
};

export const radialBarValues = (
  o: RadialBarChartOptions,
  hidden: ReadonlySet<number>,
  out: Map<string, number>,
) => {
  keysOf(o).forEach((key, i) => {
    const on = !hidden.has(i);
    out.set(key, on ? positive(o.data[i].value) : 0);
    out.set(`~${key}`, on ? 1 : 0);
  });
};

/** Whether the bars leave room for labels before their start */
export const radialBarLabels = (o: RadialBarChartOptions) =>
  o.labels ?? clamp(finite(o.sweep, 270), 30, 360) <= 300;

export const layoutRadialBar = (
  o: RadialBarChartOptions,
  c: LayoutContext,
): LayoutResult => {
  const { theme, area, measure, hidden } = c;
  const keys = keysOf(o);
  const n = o.data.length;
  const weights = keys.map((key, i) =>
    clamp(c.value(`~${key}`, hidden.has(i) ? 0 : 1), 0, 1),
  );
  if (!n || sum(weights) <= 1e-6) return emptyLayout(c);
  const maxes = radialBarMax(o);
  const targets = o.data.map((d, i) => (hidden.has(i) ? 0 : positive(d.value)));
  const values = targets.map((t, i) => Math.max(0, c.value(keys[i], t)));

  const sweep = (clamp(finite(o.sweep, 270), 30, 360) * Math.PI) / 180;
  const full = sweep >= TAU - 1e-6;
  const start = (finite(o.startAngle) * Math.PI) / 180 - Math.PI / 2;
  // bounding box of the unit rings (partial sweeps need less room)
  const xs = [0];
  const ys = [0];
  for (const a of [start, start + sweep]) {
    xs.push(Math.cos(a));
    ys.push(Math.sin(a));
  }
  for (let k = -8; k <= 8; k++) {
    const a = (k * Math.PI) / 2;
    if (full || (a > start && a < start + sweep)) {
      xs.push(Math.cos(a));
      ys.push(Math.sin(a));
    }
  }
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  // room under the center for its texts when the rings are open there
  const maxY = Math.max(...ys, o.centerValue || o.centerLabel ? 0.12 : 0);
  const R = Math.max(
    4,
    Math.min(
      (area.width - 4) / Math.max(1e-6, maxX - minX),
      (area.height - 4) / Math.max(1e-6, maxY - minY),
    ),
  );
  const cx = area.x + (area.width - (maxX - minX) * R) / 2 - minX * R;
  const cy = area.y + (area.height - (maxY - minY) * R) / 2 - minY * R;
  /** The rings are open below the center (half circles): texts go above it */
  const openBelow = maxY < 0.5;
  const R0 = R * clamp(finite(o.innerRadius, 0.3), 0, 0.9);
  const gap = clamp(finite(o.gap, 0.28), 0, 0.9);
  const slot = (R - R0) / sum(weights);
  const rounded = o.rounded !== false;
  const enter = clamp(c.enter, 0, 1);
  const showLabels = radialBarLabels(o) && !full;
  const content = [...new Set(o.labelContent ?? ["name", "value"])];
  const gapAngle = TAU - sweep;
  // labels run back from the start of the bars, along the tangent
  const labelAngle = upright(start + Math.PI / 2);
  const flipped = Math.cos(labelAngle - (start + Math.PI / 2)) < 0;

  const nodes: ShapeNode[] = [];
  const texts: ShapeNode[] = [];
  const items: ShapeItem[] = [];
  let outer = R;
  o.data.forEach((d, i) => {
    const w = weights[i];
    const r1 = outer;
    outer -= w * slot;
    if (w <= 1e-3) return;
    const thick = w * slot * (1 - gap);
    const rm = r1 - (w * slot) / 2;
    if (thick < 0.5 || rm <= 0) return;
    const color = c.color(d.color, i);
    const css = toCss(color);
    // round caps reach half the thickness beyond the ends of the arc
    const capA = rounded && !full ? Math.min(sweep / 2, thick / 2 / rm) : 0;
    const t0 = start + capA;
    const t1 = start + sweep - capA;
    const pad = (w * slot * gap) / 2 + 1;
    if (o.track !== false)
      nodes.push({
        kind: "arc",
        cx,
        cy,
        r: rm,
        a0: full ? 0 : t0,
        a1: full ? TAU : t1,
        width: thick,
        color: toCss(mix(color, theme.background, 0.86)),
        cap: rounded && !full ? "round" : "butt",
        hit: i,
        hitPad: pad,
      });
    const frac = clamp(values[i] / maxes[i], 0, 1) * enter;
    if (frac > 1e-4) {
      const end = start + capA + Math.max(0, sweep - 2 * capA) * frac;
      if (rounded && end - (start + capA) < 1e-3)
        nodes.push({
          kind: "circle",
          cx: cx + rm * Math.cos(start + capA),
          cy: cy + rm * Math.sin(start + capA),
          r: thick / 2,
          fill: css,
          hit: i,
        });
      else
        nodes.push({
          kind: "arc",
          cx,
          cy,
          r: rm,
          a0: rounded ? start + capA : start,
          a1: rounded ? end : start + sweep * frac,
          width: thick,
          color: css,
          cap: rounded ? "round" : "butt",
          hit: i,
          hitPad: pad,
        });
    }

    const percent = maxes[i] > 0 ? targets[i] / maxes[i] : 0;
    if (showLabels && w > 0.99) {
      const size = clamp(Math.round(thick * 0.62), 9, 12);
      if (thick >= 9) {
        const labelFont = font(theme, size, 500);
        const numbers = content
          .filter((k) => k !== "name")
          .map((k) =>
            k === "value" ? c.format(targets[i]) : c.percent(percent),
          );
        const text = [
          content.includes("name") ? d.name : "",
          numbers.join(" \u00b7 "),
        ]
          .filter(Boolean)
          .join("  ");
        // a little before the start of the bar, on its center line; the
        // text runs backward along the tangent, into the open part
        const back = rounded ? thick / 2 + 6 : 6;
        const px = cx + rm * Math.cos(start) - back * -Math.sin(start);
        const py = cy + rm * Math.sin(start) - back * Math.cos(start);
        const dx = Math.sin(start);
        const dy = -Math.cos(start);
        // distance to the edge of the drawing along that direction
        let edge = Infinity;
        if (dx > 1e-6) edge = Math.min(edge, (area.x + area.width - px) / dx);
        if (dx < -1e-6) edge = Math.min(edge, (area.x - px) / dx);
        if (dy > 1e-6) edge = Math.min(edge, (area.y + area.height - py) / dy);
        if (dy < -1e-6) edge = Math.min(edge, (area.y - py) / dy);
        const room = Math.min(
          edge - 2,
          gapAngle >= Math.PI / 2 - 1e-6
            ? Infinity
            : rm * Math.tan(gapAngle) - back - 4,
        );
        const fitted = ellipsize(text, room, labelFont, measure);
        if (fitted) {
          texts.push({
            kind: "text",
            x: px,
            y: py,
            text: fitted,
            font: labelFont,
            color: toCss(theme.text, 0.86),
            align: flipped ? "left" : "right",
            baseline: "middle",
            rotate: labelAngle,
            hit: i,
          });
        }
      }
    }

    const shown = Math.max(0, Math.min(frac, 1));
    const a = start + capA + Math.max(0, sweep - 2 * capA) * shown;
    if (targets[i] > 0 || !hidden.has(i))
      items.push({
        index: i,
        name: d.name,
        value: targets[i],
        percent,
        share: c.percent(percent),
        color: css,
        x: cx + rm * Math.cos(a),
        y: cy + rm * Math.sin(a),
        rows: [
          { name: c.labels.value, value: c.format(targets[i]) },
          { name: c.labels.max, value: c.format(maxes[i]) },
          { name: c.labels.progress, value: c.percent(percent) },
        ],
      });
  });
  nodes.push(...texts);

  // center text
  const room = R0 * 1.9 - 8;
  if (o.centerValue && room > 24) {
    const size = clamp(R0 * 0.36, 14, 32);
    const valueFont = font(theme, size, 600);
    const label = o.centerLabel
      ? ellipsize(o.centerLabel, room, font(theme, 12), measure)
      : "";
    const blockH = size + (label ? 18 : 0);
    const top = openBelow ? cy - blockH - 2 : cy - blockH / 2;
    nodes.push({
      kind: "text",
      x: cx,
      y: top + size / 2,
      text: ellipsize(o.centerValue, room, valueFont, measure),
      font: valueFont,
      color: toCss(theme.text),
      align: "center",
      baseline: "middle",
    });
    if (label)
      nodes.push({
        kind: "text",
        x: cx,
        y: top + blockH - 7,
        text: label,
        font: font(theme, 12),
        color: toCss(theme.textMuted),
        align: "center",
        baseline: "middle",
      });
  } else if (o.centerLabel && room > 24) {
    nodes.push({
      kind: "text",
      x: cx,
      y: openBelow ? cy - 12 : cy,
      text: ellipsize(o.centerLabel, room, font(theme, 12), measure),
      font: font(theme, 12),
      color: toCss(theme.textMuted),
      align: "center",
      baseline: "middle",
    });
  }

  return { nodes, items, dim: 0.35, empty: false };
};
