// Bullet chart layout (Stephen Few): per row, qualitative ranges as shades
// of gray, the measure as a bar and the target as a marker, on the row's own
// scale; name and subtitle on the left (below when vertical), value on the
// right (above when vertical), tick labels when there is room.

import { mix, toCss, type Rgba } from "../color";
import { font } from "../overlay";
import { linearTicks, niceDomain } from "../scale";
import {
  clamp,
  ellipsize,
  emptyLayout,
  finite,
  resolveWith,
  sum,
  uniqueKeys,
  type LayoutContext,
  type LayoutResult,
  type ShapeItem,
  type ShapeNode,
} from "./scene";
import type { BulletChartOptions, BulletDatum } from "./types";

const keysOf = (o: BulletChartOptions) => uniqueKeys(o.data.map((d) => d.name));

const num = (v: number | undefined) =>
  typeof v === "number" && Number.isFinite(v) ? v : undefined;

/** Qualitative ranges of a row: finite upper bounds, ascending */
const rangesOf = (o: BulletChartOptions, d: BulletDatum) =>
  (d.ranges ?? o.ranges ?? [])
    .filter((r) => typeof r === "number" && Number.isFinite(r))
    .slice()
    .sort((a, b) => a - b);

/** Scale of a row: `[min, max]` */
export const bulletScale = (
  o: BulletChartOptions,
  d: BulletDatum,
): [number, number] => {
  const ranges = rangesOf(o, d);
  const value = finite(d.value);
  const target = num(d.target);
  const lows = [0, value, ...(target !== undefined ? [target] : [])];
  let min = num(d.min) ?? Math.min(...lows);
  const highs = [value, ...(target !== undefined ? [target] : []), ...ranges];
  let max = num(d.max);
  if (max === undefined) {
    const top = Math.max(...highs);
    const last = ranges.length ? ranges[ranges.length - 1] : -Infinity;
    max = top <= last ? last : niceDomain(min, top, 5)[1];
  }
  if (!(max > min)) {
    if (max === min) max = min + 1;
    else [min, max] = [max, min];
  }
  return [min, max];
};

export const bulletValues = (
  o: BulletChartOptions,
  hidden: ReadonlySet<number>,
  out: Map<string, number>,
) => {
  keysOf(o).forEach((key, i) => {
    const d = o.data[i];
    out.set(key, finite(d.value));
    const target = num(d.target);
    if (target !== undefined) out.set(`>${key}`, target);
    out.set(`~${key}`, hidden.has(i) ? 0 : 1);
  });
};

/** Default fills of the ranges: grays, the lowest (poorest) darkest */
const rangeFills = (
  o: BulletChartOptions,
  c: LayoutContext,
  count: number,
): Rgba[] => {
  const { theme } = c;
  return Array.from({ length: Math.max(1, count) }, (_, k) => {
    const gray = mix(
      theme.background,
      theme.text,
      count <= 1 ? 0.09 : 0.24 - (0.16 * k) / (count - 1),
    );
    const own = o.rangeColors?.[k];
    return own ? resolveWith(theme, own, gray) : gray;
  });
};

export const layoutBullet = (
  o: BulletChartOptions,
  c: LayoutContext,
): LayoutResult => {
  const { theme, area, measure, hidden } = c;
  const keys = keysOf(o);
  const n = o.data.length;
  const weights = keys.map((key, i) =>
    clamp(c.value(`~${key}`, hidden.has(i) ? 0 : 1), 0, 1),
  );
  const total = sum(weights);
  if (!n || total <= 1e-6) return emptyLayout(c);
  const vertical = o.orientation === "vertical";
  const enter = clamp(c.enter, 0, 1);
  const barSize = clamp(finite(o.barSize, 0.4), 0.1, 1);
  const nameFont = font(theme, 12, 600);
  const subFont = font(theme, 11);
  const valueFont = font(theme, 12, 600);
  const tickFont = font(theme, 10);
  const muted = toCss(theme.textMuted);
  const text = toCss(theme.text);
  const transparent = "rgba(0, 0, 0, 0)";
  const markColor = toCss(resolveWith(theme, o.targetColor, theme.text));
  const showTicks = o.ticks !== false;

  const nodes: ShapeNode[] = [];
  const items: ShapeItem[] = [];
  const hasSubtitle = o.data.some((d, i) => !!d.subtitle && weights[i] > 0);
  const valueText = o.data.map((d) => c.format(finite(d.value)));

  // shared columns (horizontal) / bands (vertical) of the labels and values
  const labelW = vertical
    ? 0
    : Math.min(
        area.width * 0.32,
        Math.max(
          0,
          ...o.data.map((d) =>
            Math.max(
              measure(d.name, nameFont),
              d.subtitle ? measure(d.subtitle, subFont) : 0,
            ),
          ),
        ) + 14,
      );
  const valueW = vertical
    ? 0
    : Math.min(
        area.width * 0.2,
        Math.max(0, ...valueText.map((t) => measure(t, valueFont))) + 12,
      );
  const labelH = vertical ? 22 + (hasSubtitle ? 14 : 0) : 0;
  const valueH = vertical ? 20 : 0;
  const unit = (vertical ? area.width : area.height) / total;

  let offset = 0;
  o.data.forEach((d, i) => {
    const w = weights[i];
    const slot = unit * w;
    const from = offset;
    offset += slot;
    if (w <= 1e-3) return;
    const key = keys[i];
    const alpha = w;
    const [min, max] = bulletScale(o, d);
    const ranges = rangesOf(o, d).filter((r) => r > min);
    const fills = rangeFills(o, c, ranges.length);
    const value = c.value(key, finite(d.value));
    const target0 = num(d.target);
    const target =
      target0 !== undefined ? c.value(`>${key}`, target0) : undefined;
    const color = c.color(d.color, i);
    const css = toCss(color);
    const thick = clamp(slot * (vertical ? 0.3 : 0.42), 8, 28);
    const span = vertical
      ? Math.max(1, area.height - labelH - valueH)
      : Math.max(1, area.width - labelW - valueW);
    const ticks = showTicks
      ? linearTicks(min, max, Math.max(2, Math.floor(span / 70)))
      : [];
    const tickRoom = vertical ? slot / 2 - thick / 2 - 6 : slot - thick - 10;
    const tickW = Math.max(
      0,
      ...ticks.map((t) => measure(c.format(t), tickFont)),
    );
    const drawTicks =
      ticks.length > 1 && (vertical ? tickRoom >= tickW : tickRoom >= 14);

    // position along the scale, and across it
    const p0 = vertical ? area.y + area.height - labelH : area.x + labelW;
    const along = (v: number) =>
      p0 + (vertical ? -1 : 1) * span * clamp((v - min) / (max - min), 0, 1);
    const mid = vertical
      ? area.x + from + slot / 2
      : area.y + from + (slot - (drawTicks ? 14 : 0)) / 2;
    /** Rectangle from `a` to `b` along the scale, `t` thick across it */
    const band = (a: number, b: number, t: number) => {
      const lo = Math.min(along(a), along(b));
      const hi = Math.max(along(a), along(b));
      return vertical
        ? { x: mid - t / 2, y: lo, width: t, height: hi - lo }
        : { x: lo, y: mid - t / 2, width: hi - lo, height: t };
    };

    // the whole row / column is a hover target
    nodes.push({
      kind: "rect",
      ...(vertical
        ? { x: area.x + from, y: area.y, width: slot, height: area.height }
        : { x: area.x, y: area.y + from, width: area.width, height: slot }),
      radius: 0,
      fill: transparent,
      hit: i,
      alpha,
    });
    // ranges: disjoint segments (translucent colors must not add up)
    const bounds = ranges.length ? ranges : [max];
    let edge = min;
    bounds.forEach((bound, k) => {
      const to = Math.min(bound, max);
      if (to > edge)
        nodes.push({
          kind: "rect",
          ...band(edge, to, thick),
          radius: 0,
          fill: toCss(fills[k]),
          hit: i,
          alpha,
        });
      edge = Math.max(edge, to);
    });
    if (edge < max)
      nodes.push({
        kind: "rect",
        ...band(edge, max, thick),
        radius: 0,
        fill: toCss(fills[fills.length - 1]),
        hit: i,
        alpha,
      });
    // measure
    const base = clamp(0, min, max);
    const shownValue = base + (value - base) * enter;
    nodes.push({
      kind: "rect",
      ...band(base, shownValue, thick * barSize),
      radius: 1,
      fill: css,
      hit: i,
      alpha,
      brighten: true,
    });
    // target
    if (target !== undefined && target >= min && target <= max) {
      const at = along(target);
      const len = thick * 0.82;
      nodes.push({
        kind: "rect",
        ...(vertical
          ? { x: mid - len / 2, y: at - 1.5, width: len, height: 3 }
          : { x: at - 1.5, y: mid - len / 2, width: 3, height: len }),
        radius: 1,
        fill: markColor,
        hit: i,
        alpha: alpha * enter,
      });
    }
    // ticks
    if (drawTicks)
      for (const t of ticks) {
        const at = along(t);
        nodes.push({
          kind: "text",
          x: vertical ? mid - thick / 2 - 5 : at,
          y: vertical ? at : mid + thick / 2 + 4,
          text: c.format(t),
          font: tickFont,
          color: muted,
          align: vertical ? "right" : "center",
          baseline: vertical ? "middle" : "top",
          hit: i,
          alpha,
        });
      }

    // name, subtitle and value
    if (vertical) {
      const room = Math.max(0, slot - 8);
      const name = ellipsize(d.name, room, nameFont, measure);
      const bottom = area.y + area.height;
      if (name)
        nodes.push({
          kind: "text",
          x: mid,
          y: bottom - labelH + 16,
          text: name,
          font: nameFont,
          color: text,
          align: "center",
          baseline: "middle",
          hit: i,
          alpha,
        });
      const sub = d.subtitle
        ? ellipsize(d.subtitle, room, subFont, measure)
        : "";
      if (sub)
        nodes.push({
          kind: "text",
          x: mid,
          y: bottom - labelH + 31,
          text: sub,
          font: subFont,
          color: muted,
          align: "center",
          baseline: "middle",
          hit: i,
          alpha,
        });
      const value = ellipsize(valueText[i], room, valueFont, measure);
      if (value)
        nodes.push({
          kind: "text",
          x: mid,
          y: area.y + valueH / 2,
          text: value,
          font: valueFont,
          color: text,
          align: "center",
          baseline: "middle",
          hit: i,
          alpha,
        });
    } else {
      const room = Math.max(0, labelW - 14);
      const name = ellipsize(d.name, room, nameFont, measure);
      const sub =
        d.subtitle && slot >= 34
          ? ellipsize(d.subtitle, room, subFont, measure)
          : "";
      const x = area.x + labelW - 14;
      if (name)
        nodes.push({
          kind: "text",
          x,
          y: sub ? mid - 7 : mid,
          text: name,
          font: nameFont,
          color: text,
          align: "right",
          baseline: "middle",
          hit: i,
          alpha,
        });
      if (sub)
        nodes.push({
          kind: "text",
          x,
          y: mid + 8,
          text: sub,
          font: subFont,
          color: muted,
          align: "right",
          baseline: "middle",
          hit: i,
          alpha,
        });
      const value = ellipsize(valueText[i], valueW - 8, valueFont, measure);
      if (value)
        nodes.push({
          kind: "text",
          x: area.x + area.width,
          y: mid,
          text: value,
          font: valueFont,
          color: text,
          align: "right",
          baseline: "middle",
          hit: i,
          alpha,
        });
    }

    if (hidden.has(i)) return;
    const v = finite(d.value);
    const percent =
      target0 !== undefined && target0 !== 0
        ? v / target0
        : (v - min) / (max - min);
    const rangeIndex = ranges.findIndex((r) => v <= r);
    const rangeName = rangeIndex >= 0 ? o.rangeLabels?.[rangeIndex] : undefined;
    const end = along(v);
    items.push({
      index: i,
      name: d.name,
      value: v,
      percent,
      share: c.percent(percent),
      color: css,
      x: vertical ? mid : end,
      y: vertical ? end : mid,
      rows: [
        { name: c.labels.value, value: c.format(v) },
        ...(target0 !== undefined
          ? [
              { name: c.labels.target, value: c.format(target0) },
              { name: c.labels.ofTarget, value: c.percent(percent) },
            ]
          : []),
        ...(rangeName ? [{ name: c.labels.range, value: rangeName }] : []),
      ],
    });
  });

  return { nodes, items, dim: 0.4, empty: false };
};
