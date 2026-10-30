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
  const bands = sortedBands(o.bands);
  const ticks =
    o.ticks === false
      ? []
      : [min, ...bands.map((b) => b.to), max].filter(
          (v, i, all) =>
            v >= min &&
            v <= max &&
            all.indexOf(v) === i &&
            !(sweep >= Math.PI * 2 - 1e-6 && v === max),
        );
  const tickFont = font(theme, 11);
  const tickTexts = ticks.map((v) => c.format(v));
  const angleOf = (v: number) =>
    a0 + sweep * clamp((v - min) / (max - min), 0, 1);
  const hasBandScale = (R: number) => bands.length > 0 && R - R * th - 6 > 12;
  /** Radius of the tick label anchors (inside the band scale or the track) */
  const tickRadius = (R: number) =>
    (hasBandScale(R) ? R - R * th - 7.5 : R - R * th) - 8;

  // With a needle, the value and the label go below the hub, in the opening
  // of the arc the needle never sweeps: the lowest the needle points is
  // `phi` below the horizontal, so the text block starts below the needle's
  // ray through its corners. Nearly closed gauges have no such opening:
  // their needle is a pointer on the rim and the text stays in the middle.
  const phi = Math.max(0, (sweep - Math.PI) / 2);
  const pointer = !!o.needle && phi > (70 * Math.PI) / 180;
  const below = !!o.needle && !pointer;
  const HUB = 7;

  /** Texts and their block at a radius (font sizes follow the radius) */
  const textBlock = (R: number) => {
    const size = below ? clamp(R * 0.24, 14, 34) : clamp(R * 0.28, 16, 40);
    const valueFont = font(theme, size, 600);
    const labelFont = font(theme, 12);
    const rc = R - (R * th) / 2;
    const maxW = rc * (semi || below ? 1.5 : 1.3);
    const label = o.label ? ellipsize(o.label, maxW, labelFont, measure) : "";
    // the widest of the ends and the value, so that the layout stays still
    // while the value changes
    const widest = Math.max(
      ...[min, max, raw].map((v) => measure(c.format(v), valueFont)),
    );
    const half =
      Math.max(Math.min(widest, maxW), label ? measure(label, labelFont) : 0) /
      2;
    return {
      size,
      valueFont,
      labelFont,
      maxW,
      label,
      half,
      height: size + (label ? 18 : 0),
    };
  };

  /** Top of the text block below the hub, relative to the center */
  const blockTop = (R: number, block: ReturnType<typeof textBlock>) => {
    const margin = 8;
    let top = Math.max(HUB + margin, R * 0.12);
    if (phi > 0)
      top = Math.max(
        top,
        margin / Math.cos(phi) + (block.half + 2) * Math.tan(phi),
      );
    // tick labels below the center and above the block
    if (R >= 48) {
      const rt = tickRadius(R);
      ticks.forEach((v, k) => {
        const a = angleOf(v);
        const cos = Math.cos(a);
        const sin = Math.sin(a);
        if (sin <= 0.05) return;
        const w = measure(tickTexts[k] ?? "", tickFont);
        const x = rt * cos;
        const x0 = cos > 0.35 ? x - w : cos < -0.35 ? x : x - w / 2;
        if (x0 > block.half + 4 || x0 + w < -block.half - 4) return;
        const y = rt * sin;
        const bottom = sin > 0.35 ? y : y + 6;
        top = Math.max(top, bottom + 4);
      });
    }
    return top;
  };

  /** Radius and center fitting the area, the texts reaching `bottom` (unit) */
  const fit = (bottom: number) => {
    const xs: number[] = [0];
    const ys: number[] = [bottom];
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
    return {
      R,
      cx: area.x + (area.width - (maxX - minX) * R) / 2 - minX * R,
      cy: area.y + (area.height - (maxY - minY) * R) / 2 - minY * R,
    };
  };

  let geometry = fit(below ? 0.62 : semi ? 0.26 : 0);
  let block = textBlock(geometry.R);
  let top = below ? blockTop(geometry.R, block) : 0;
  if (below)
    // the block size depends on the radius and the radius on the block
    for (let k = 0; k < 4; k++) {
      const bottom = (top + block.height + 2) / geometry.R;
      geometry = fit(bottom);
      block = textBlock(geometry.R);
      top = blockTop(geometry.R, block);
    }
  const { R, cx, cy } = geometry;
  const lw = R * th;
  const rc = R - lw / 2;

  const bandColors = bands.map((b, i) =>
    resolveWith(theme, b.color, theme.palette[i % theme.palette.length]),
  );
  const band = gaugeBandIndex(bands, clamp(animated, min, max));
  const color = band >= 0 ? bandColors[band] : c.color(o.color, 0);
  const css = toCss(color);

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
  if (hasBandScale(R)) {
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
  if (ticks.length && R >= 48) {
    const rt = tickRadius(R);
    ticks.forEach((v, k) => {
      const a = angleOf(v);
      const cos = Math.cos(a);
      const sin = Math.sin(a);
      nodes.push({
        kind: "text",
        x: cx + rt * cos,
        y: cy + rt * sin,
        text: tickTexts[k] ?? "",
        font: tickFont,
        color: toCss(theme.textMuted),
        align: cos > 0.35 ? "right" : cos < -0.35 ? "left" : "center",
        baseline: sin > 0.35 ? "bottom" : sin < -0.35 ? "top" : "middle",
      });
    });
  }

  // value and label: below the hub (needle), else in the middle
  const { size, valueFont, labelFont, maxW, label } = block;
  const valueText = ellipsize(c.format(shown), maxW, valueFont, measure);
  const blockY = below
    ? cy + top
    : semi && !pointer
      ? cy - size - 2
      : cy - block.height / 2;
  nodes.push({
    kind: "text",
    x: cx,
    y: blockY + size / 2,
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
      y: semi && !o.needle ? cy + 12 : blockY + size + 11,
      text: label,
      font: labelFont,
      color: toCss(theme.textMuted),
      align: "center",
      baseline: "middle",
    });

  // needle: from the hub, or a pointer on the rim around the centered texts
  if (o.needle) {
    const an = a0 + sweep * frac;
    const len = rc;
    const ux = Math.cos(an);
    const uy = Math.sin(an);
    const nx = -uy;
    const ny = ux;
    const tx = cx + len * ux;
    const ty = cy + len * uy;
    const inner = pointer
      ? clamp(
          Math.hypot(block.half, block.height / 2) + 6,
          rc * 0.35,
          Math.max(rc * 0.35, rc - 14),
        )
      : 0;
    const bx = cx + inner * ux;
    const by = cy + inner * uy;
    const base = pointer ? 2.5 : 3.5;
    nodes.push({
      kind: "polygon",
      points: [
        bx + nx * base,
        by + ny * base,
        tx + nx * 1,
        ty + ny * 1,
        tx - nx * 1,
        ty - ny * 1,
        bx - nx * base,
        by - ny * base,
      ],
      fill: toCss(theme.text, 0.85),
      radius: 1,
    });
    if (!pointer)
      nodes.push(
        { kind: "circle", cx, cy, r: HUB, fill: toCss(theme.text, 0.9) },
        { kind: "circle", cx, cy, r: 2.5, fill: toCss(theme.background) },
      );
  }

  const percent = clamp((raw - min) / (max - min), 0, 1);
  return {
    nodes,
    items: [
      {
        index: 0,
        name: o.label ?? c.labels.value,
        value: raw,
        percent,
        share: c.percent(percent),
        color: css,
        x: cx + rc * Math.cos(angleOf(raw)),
        y: cy + rc * Math.sin(angleOf(raw)),
        rows: [
          { name: c.labels.value, value: c.format(raw) },
          { name: c.labels.ofRange, value: c.percent(percent) },
        ],
      },
    ],
    dim: 1,
    empty: false,
  };
};
