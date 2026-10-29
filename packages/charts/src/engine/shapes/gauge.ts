// Gauge layout: rounded track, value arc colored by its band, optional
// needle, thin band scale, tick labels and the value in the middle.

import { toCss } from "../color";
import { font } from "../overlay";
import {
  clamp,
  ellipsize,
  finite,
  resolveWith,
  type LayoutContext,
  type LayoutResult,
  type ShapeNode,
} from "./scene";
import type { GaugeBand, GaugeChartOptions } from "./types";

export const gaugeRange = (o: GaugeChartOptions): [number, number] => {
  const min = finite(o.min, 0);
  let max = finite(o.max, 100);
  if (!(max > min)) max = min + 1;
  return [min, max];
};

export const gaugeValues = (
  o: GaugeChartOptions,
  _hidden: ReadonlySet<number>,
  out: Map<string, number>,
) => {
  out.set("value", finite(o.value, gaugeRange(o)[0]));
};

/** Bands sorted by their upper bound */
const sortedBands = (bands: readonly GaugeBand[] | undefined) =>
  (bands ?? [])
    .filter((b) => Number.isFinite(b.to))
    .slice()
    .sort((a, b) => a.to - b.to);

/** Band of a value: the first whose `to` is not below it (the last one above all bounds); -1 without bands */
export const gaugeBandIndex = (
  bands: readonly GaugeBand[] | undefined,
  value: number,
): number => {
  if (!bands?.length) return -1;
  for (let i = 0; i < bands.length; i++) if (value <= bands[i].to) return i;
  return bands.length - 1;
};

const decimalsOf = (v: number) => {
  const text = String(v);
  const dot = text.indexOf(".");
  return dot < 0 || text.includes("e") ? 0 : Math.min(4, text.length - dot - 1);
};

export const layoutGauge = (
  o: GaugeChartOptions,
  c: LayoutContext,
): LayoutResult => {
  const { theme, area, measure } = c;
  const [min, max] = gaugeRange(o);
  const raw = finite(o.value, min);
  const enter = clamp(c.enter, 0, 1);
  const animated = min + (c.value("value", raw) - min) * enter;
  const decimals = decimalsOf(raw);
  const shown = animated === raw ? raw : Number(animated.toFixed(decimals));
  const frac = clamp((animated - min) / (max - min), 0, 1);
  const sweep = (clamp(finite(o.sweep, 240), 30, 360) * Math.PI) / 180;
  const a0 = -Math.PI / 2 - sweep / 2;
  const a1 = a0 + sweep;
  const th = clamp(finite(o.thickness, 0.16), 0.04, 0.4);
  const semi = sweep <= (200 * Math.PI) / 180;

  // bounding box of the unit gauge: arc, round caps and the texts
  const xs: number[] = [0];
  const ys: number[] = [o.needle ? 0.62 : semi ? 0.26 : 0];
  for (const a of [a0, a1]) {
    const r = 1 - th / 2;
    xs.push(r * Math.cos(a) - th / 2, r * Math.cos(a) + th / 2);
    ys.push(r * Math.sin(a) - th / 2, r * Math.sin(a) + th / 2);
  }
  for (let k = -4; k <= 4; k++) {
    const a = (k * Math.PI) / 2;
    if (a > a0 && a < a1) {
      xs.push(Math.cos(a));
      ys.push(Math.sin(a));
    }
  }
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const R = Math.max(
    4,
    Math.min(area.width / (maxX - minX), area.height / (maxY - minY)),
  );
  const cx = area.x + (area.width - (maxX - minX) * R) / 2 - minX * R;
  const cy = area.y + (area.height - (maxY - minY) * R) / 2 - minY * R;
  const lw = R * th;
  const rc = R - lw / 2;

  const bands = sortedBands(o.bands);
  const bandColors = bands.map((b, i) =>
    resolveWith(theme, b.color, theme.palette[i % theme.palette.length]),
  );
  const band = gaugeBandIndex(bands, clamp(animated, min, max));
  const color = band >= 0 ? bandColors[band] : c.color(o.color, 0);
  const css = toCss(color);
  const angleOf = (v: number) =>
    a0 + sweep * clamp((v - min) / (max - min), 0, 1);

  const nodes: ShapeNode[] = [
    { kind: "circle", cx, cy, r: R, hit: 0 },
    {
      kind: "arc",
      cx,
      cy,
      r: rc,
      a0,
      a1,
      width: lw,
      color: toCss(theme.grid),
      cap: "round",
    },
  ];
  if (frac > 0.0005)
    nodes.push({
      kind: "arc",
      cx,
      cy,
      r: rc,
      a0,
      a1: a0 + sweep * frac,
      width: lw,
      color: css,
      cap: "round",
      hit: 0,
    });

  // thin band scale inside the track
  const rb = R - lw - 6;
  if (bands.length && rb > 12) {
    let from = min;
    bands.forEach((b, i) => {
      const lo = Math.max(from, min);
      const hi = Math.min(b.to, max);
      from = b.to;
      if (hi <= lo) return;
      const gap = i ? 1 / rb : 0;
      nodes.push({
        kind: "arc",
        cx,
        cy,
        r: rb,
        a0: angleOf(lo) + gap,
        a1: angleOf(hi) - (hi < max ? 1 / rb : 0),
        width: 3,
        color: toCss(bandColors[i], 0.9),
        cap: "butt",
      });
    });
  }

  // tick labels at the ends and the band bounds
  if (o.ticks !== false && R >= 48) {
    const rt = (bands.length && rb > 12 ? rb - 1.5 : R - lw) - 8;
    const values = [min, ...bands.map((b) => b.to), max].filter(
      (v, i, all) =>
        v >= min &&
        v <= max &&
        all.indexOf(v) === i &&
        !(sweep >= Math.PI * 2 - 1e-6 && v === max),
    );
    const tickFont = font(theme, 11);
    for (const v of values) {
      const a = angleOf(v);
      const cos = Math.cos(a);
      const sin = Math.sin(a);
      nodes.push({
        kind: "text",
        x: cx + rt * cos,
        y: cy + rt * sin,
        text: c.format(v),
        font: tickFont,
        color: toCss(theme.textMuted),
        align: cos > 0.35 ? "right" : cos < -0.35 ? "left" : "center",
        baseline: sin > 0.35 ? "bottom" : sin < -0.35 ? "top" : "middle",
      });
    }
  }

  // needle
  if (o.needle) {
    const an = a0 + sweep * frac;
    const len = rc;
    const nx = Math.cos(an + Math.PI / 2);
    const ny = Math.sin(an + Math.PI / 2);
    const tx = cx + len * Math.cos(an);
    const ty = cy + len * Math.sin(an);
    nodes.push(
      {
        kind: "polygon",
        points: [
          cx + nx * 3.5,
          cy + ny * 3.5,
          tx + nx * 1,
          ty + ny * 1,
          tx - nx * 1,
          ty - ny * 1,
          cx - nx * 3.5,
          cy - ny * 3.5,
        ],
        fill: toCss(theme.text, 0.85),
        radius: 1,
      },
      { kind: "circle", cx, cy, r: 7, fill: toCss(theme.text, 0.9) },
      { kind: "circle", cx, cy, r: 2.5, fill: toCss(theme.background) },
    );
  }

  // value and label
  const size = clamp(R * 0.28, 16, 40);
  const valueFont = font(theme, size, 600);
  const labelFont = font(theme, 12);
  const maxW = rc * (semi ? 1.5 : 1.3);
  const valueText = ellipsize(c.format(shown), maxW, valueFont, measure);
  const label = o.label ? ellipsize(o.label, maxW, labelFont, measure) : "";
  const blockH = size + (label ? 18 : 0);
  const top = o.needle
    ? cy + Math.max(14, R * 0.16)
    : semi
      ? cy - size - 2
      : cy - blockH / 2;
  nodes.push({
    kind: "text",
    x: cx,
    y: top + size / 2,
    text: valueText,
    font: valueFont,
    color: toCss(theme.text),
    align: "center",
    baseline: "middle",
  });
  if (label)
    nodes.push({
      kind: "text",
      x: cx,
      y: semi && !o.needle ? cy + 12 : top + size + 11,
      text: label,
      font: labelFont,
      color: toCss(theme.textMuted),
      align: "center",
      baseline: "middle",
    });

  const percent = clamp((raw - min) / (max - min), 0, 1);
  return {
    nodes,
    items: [
      {
        index: 0,
        name: o.label ?? "Value",
        value: raw,
        percent,
        share: c.percent(percent),
        color: css,
        x: cx + rc * Math.cos(angleOf(raw)),
        y: cy + rc * Math.sin(angleOf(raw)),
        rows: [
          { name: "Value", value: c.format(raw) },
          { name: "Of range", value: c.percent(percent) },
        ],
      },
    ],
    dim: 1,
    empty: false,
  };
};
