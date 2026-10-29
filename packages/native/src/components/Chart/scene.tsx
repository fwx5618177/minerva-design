// Draws a chart scene (`ChartController.getScene()`) with plain views: no
// canvas, SVG or native drawing module. The engine already resolves every
// position in pixels; this file only turns them into absolutely positioned
// <View> / <Text> elements, keeping the number of views bounded by the size
// of the chart (lines decimated per column, dots merged per cell, bars
// merged per pixel column), whatever the size of the data.

import type { ReactElement, ReactNode } from "react";
import {
  StyleSheet,
  Text,
  View,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import {
  scenePrimitives,
  toCss,
  type ChartPrimitive,
  type ChartRect,
  type ChartScene,
} from "@minerva/charts/canvas";
import { part } from "../../internal/parts";
import { measureChartText } from "./measure";

type Rgba = ChartScene["theme"]["text"];
type Annotation = ChartScene["annotations"][number];
type RectAnnotation = Extract<Annotation, { type: "rect" }>;
type TextAnnotation = Extract<Annotation, { type: "text" }>;
type Scales = ChartScene["layout"]["scales"];

/** Upper bounds of the views drawn for the data of a chart */
export const SHAPE_BUDGET = {
  /** Points of all the lines (one view per segment) */
  linePoints: 1200,
  /** Dots of one scatter series before they are merged per cell */
  dotsPerSeries: 800,
  /** Dots of all the series */
  dots: 2000,
  /** Bars of one series before neighbors are merged per pixel column */
  barsPerSeries: 600,
  /** Bars of all the series */
  bars: 1500,
  /** Vertical strips filling one area */
  areaColumns: 200,
  /** Dashes of one dashed line */
  dashes: 200,
} as const;

const C = "chart";

// ------------------------------------------------------------------ text

interface TextOptions {
  size: number;
  color: string;
  weight?: number;
  family?: string;
  /** Halo color: keeps the text readable over the data */
  halo?: string;
}

type Align = "left" | "center" | "right";
type VAlign = "top" | "middle" | "bottom";

const lineHeightOf = (size: number) => Math.ceil(size * 1.35);

/** Box wide enough for the estimated width (the real one may differ) */
const slack = (text: string, o: TextOptions) =>
  Math.ceil(
    measureChartText(text, `${o.weight ?? 400} ${o.size}px sans-serif`) * 1.4 +
      o.size * 2,
  );

/**
 * A one-line text anchored at (x, y) of a container `frameWidth` wide:
 * `left` starts there, `right` ends there, `center` is centered on it;
 * `top` / `bottom` place the em box like the canvas text baselines
 */
function label(
  key: string,
  text: string,
  x: number,
  y: number,
  align: Align,
  valign: VAlign,
  o: TextOptions,
  frameWidth: number,
  extra?: TextStyle,
): ReactElement {
  const lh = lineHeightOf(o.size);
  const pad = (lh - o.size) / 2;
  const w = slack(text, o);
  const top =
    valign === "top"
      ? y - pad
      : valign === "bottom"
        ? y - lh + pad
        : y - lh / 2;
  const horizontal: TextStyle =
    align === "left"
      ? { left: x, width: w }
      : align === "right"
        ? { right: frameWidth - x, width: w }
        : { left: x - w / 2, width: w };
  return (
    <Text
      key={key}
      numberOfLines={1}
      style={[
        {
          position: "absolute",
          top,
          ...horizontal,
          textAlign: align,
          fontSize: o.size,
          lineHeight: lh,
          color: o.color,
          fontWeight: String(o.weight ?? 400) as TextStyle["fontWeight"],
          includeFontPadding: false,
          ...(o.family ? { fontFamily: o.family } : null),
          ...(o.halo
            ? {
                textShadowColor: o.halo,
                textShadowRadius: 3,
                textShadowOffset: { width: 0, height: 0 },
              }
            : null),
        },
        extra,
      ]}
    >
      {text}
    </Text>
  );
}

// ---------------------------------------------------------------- shapes

const box = (
  key: string,
  x: number,
  y: number,
  width: number,
  height: number,
  color: string,
  extra?: ViewStyle,
): ReactElement => (
  <View
    key={key}
    style={[
      {
        position: "absolute",
        left: x,
        top: y,
        width,
        height,
        backgroundColor: color,
      },
      extra,
    ]}
  />
);

const dot = (
  key: string,
  cx: number,
  cy: number,
  d: number,
  color: string,
  extra?: ViewStyle,
) =>
  box(key, cx - d / 2, cy - d / 2, d, d, color, {
    borderRadius: d / 2,
    ...extra,
  });

/** A straight stroke: one view, rotated around its center */
const segment = (
  key: string,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  width: number,
  color: string,
) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.hypot(dx, dy) + width;
  return box(
    key,
    (x1 + x2) / 2 - length / 2,
    (y1 + y2) / 2 - width / 2,
    length,
    width,
    color,
    {
      borderRadius: width / 2,
      transform: [{ rotate: `${Math.atan2(dy, dx)}rad` }],
    },
  );
};

/** Dash runs `[start, length]` along a line (canvas `setLineDash` pattern) */
export function dashRuns(
  length: number,
  dash: readonly number[],
  max: number = SHAPE_BUDGET.dashes,
): [number, number][] {
  let pattern = dash.filter((v) => Number.isFinite(v) && v >= 0);
  // odd patterns repeat twice, like the canvas
  if (pattern.length % 2) pattern = [...pattern, ...pattern];
  const period = pattern.reduce((a, b) => a + b, 0);
  if (!pattern.length || period <= 0) return [[0, length]];
  const runs = (length / period) * (pattern.length / 2);
  const scale = runs > max ? runs / max : 1;
  const out: [number, number][] = [];
  let at = 0;
  for (let i = 0; at < length; i = (i + 1) % pattern.length) {
    const step = pattern[i] * scale;
    if (i % 2 === 0 && step > 0) out.push([at, Math.min(step, length - at)]);
    at += Math.max(step, 0.5);
  }
  return out;
}

const dashedLine = (
  key: string,
  axis: "x" | "y",
  at: number,
  from: number,
  length: number,
  width: number,
  color: string,
  dash: readonly number[],
) =>
  dashRuns(length, dash).map(([start, run], i) =>
    axis === "y"
      ? box(`${key}-${i}`, from + start, at, run, width, color)
      : box(`${key}-${i}`, at, from + start, width, run, color),
  );

const crisp = (v: number, width = 1) => Math.round(v) + 0.5 - width / 2;

// ------------------------------------------------------------------ data

/** Thins a run of interleaved points to `max` points and drops sub-pixel steps */
function thin(run: readonly number[], max: number): number[] {
  const n = run.length / 2;
  const stride = n > max ? Math.ceil(n / max) : 1;
  const out: number[] = [];
  for (let i = 0; i < n; i += stride) {
    const x = run[i * 2];
    const y = run[i * 2 + 1];
    const k = out.length;
    if (k && Math.hypot(x - out[k - 2], y - out[k - 1]) < 1.5) continue;
    out.push(x, y);
  }
  const lx = run[n * 2 - 2];
  const ly = run[n * 2 - 1];
  const k = out.length;
  if (n > 1 && (out[k - 2] !== lx || out[k - 1] !== ly)) out.push(lx, ly);
  return out;
}

/** Vertical strips between the line and the baseline, one per column */
function areaStrips(
  key: string,
  run: readonly number[],
  baseline: number,
  color: string,
  opacity: number,
  plot: ChartRect,
): ReactElement[] {
  const n = run.length / 2;
  if (n < 2) return [];
  // left to right (reversed axes list their points right to left)
  const forward = run[0] <= run[n * 2 - 2];
  const xs = (i: number) => run[(forward ? i : n - 1 - i) * 2];
  const ys = (i: number) => run[(forward ? i : n - 1 - i) * 2 + 1];
  const from = Math.max(plot.x, xs(0));
  const to = Math.min(plot.x + plot.width, xs(n - 1));
  if (to <= from) return [];
  const column = Math.max(2, plot.width / SHAPE_BUDGET.areaColumns);
  const out: ReactElement[] = [];
  let j = 0;
  for (let left = Math.floor(from), c = 0; left < to; c++) {
    const right = Math.min(Math.ceil(to), Math.round(left + column));
    const mid = (left + right) / 2;
    while (j < n - 2 && xs(j + 1) < mid) j++;
    const x0 = xs(j);
    const x1 = xs(j + 1);
    const t = x1 === x0 ? 0 : Math.max(0, Math.min(1, (mid - x0) / (x1 - x0)));
    const y = ys(j) + (ys(j + 1) - ys(j)) * t;
    if (Number.isFinite(y)) {
      const top = Math.min(y, baseline);
      out.push(
        box(
          `${key}-${c}`,
          left - plot.x,
          top - plot.y,
          right - left,
          Math.abs(baseline - y),
          color,
          {
            opacity,
          },
        ),
      );
    }
    left = right;
  }
  return out;
}

/** Limits of `scenePrimitives` for the views budget */
export function primitiveLimits(scene: ChartScene) {
  const { plot } = scene.layout;
  const visible = scene.model.series.filter((s) => !s.hidden);
  const lines = visible.filter(
    (s) => s.type === "line" || s.type === "area",
  ).length;
  const scatters = visible.filter((s) => s.type === "scatter").length;
  const perLine = Math.max(150, SHAPE_BUDGET.linePoints / Math.max(1, lines));
  const maxDots = Math.max(
    100,
    Math.min(
      SHAPE_BUDGET.dotsPerSeries,
      SHAPE_BUDGET.dots / Math.max(1, scatters),
    ),
  );
  return {
    perLine,
    options: {
      // decimation keeps up to 4 points per column
      columnWidth: Math.max(3, (plot.width * 4) / perLine),
      maxDots,
      maxBars: SHAPE_BUDGET.barsPerSeries,
      dotCell: Math.max(
        4,
        Math.sqrt((plot.width * plot.height) / maxDots) * 1.15 + 1,
      ),
    },
  };
}

function drawData(scene: ChartScene): ReactElement[] {
  const { plot } = scene.layout;
  const { perLine, options } = primitiveLimits(scene);
  const primitives: ChartPrimitive[] = scenePrimitives(scene, options);
  const ox = plot.x;
  const oy = plot.y;
  const out: ReactElement[] = [];
  let dotsLeft: number = SHAPE_BUDGET.dots;
  let barsLeft: number = SHAPE_BUDGET.bars;
  primitives.forEach((p, k) => {
    const key = `${p.kind}${p.seriesIndex}-${k}`;
    if (p.kind === "area") {
      p.segments.forEach((run, r) =>
        out.push(
          ...areaStrips(
            `${key}-${r}`,
            run,
            p.baseline,
            p.color,
            p.opacity,
            plot,
          ),
        ),
      );
      return;
    }
    if (p.kind === "line") {
      let total = 0;
      for (const run of p.segments) total += run.length / 2;
      p.segments.forEach((run, r) => {
        const pts = thin(
          run,
          Math.max(
            2,
            Math.round((perLine * run.length) / 2 / Math.max(1, total)),
          ),
        );
        if (pts.length === 2) {
          out.push(
            dot(
              `${key}-${r}`,
              pts[0] - ox,
              pts[1] - oy,
              p.width * 1.5,
              p.color,
            ),
          );
          return;
        }
        for (let i = 0; i + 3 < pts.length; i += 2) {
          out.push(
            segment(
              `${key}-${r}-${i}`,
              pts[i] - ox,
              pts[i + 1] - oy,
              pts[i + 2] - ox,
              pts[i + 3] - oy,
              p.width,
              p.color,
            ),
          );
        }
      });
      return;
    }
    if (p.kind === "bars") {
      const count = p.rects.length / 4;
      const stride =
        count > barsLeft ? Math.ceil(count / Math.max(1, barsLeft)) : 1;
      for (let i = 0; i < count; i += stride) {
        const [x, y, w, h] = p.rects.slice(i * 4, i * 4 + 4);
        out.push(
          box(`${key}-${i}`, x - ox, y - oy, Math.max(w, 0.5), h, p.color),
        );
      }
      barsLeft = Math.max(0, barsLeft - Math.ceil(count / stride));
      return;
    }
    const count = p.dots.length / 3;
    const stride =
      count > dotsLeft ? Math.ceil(count / Math.max(1, dotsLeft)) : 1;
    for (let i = 0; i < count; i += stride) {
      out.push(
        dot(
          `${key}-${i}`,
          p.dots[i * 3] - ox,
          p.dots[i * 3 + 1] - oy,
          p.dots[i * 3 + 2],
          p.colors[i],
          {
            opacity: p.opacity,
          },
        ),
      );
    }
    dotsLeft = Math.max(0, dotsLeft - Math.ceil(count / stride));
  });
  return out;
}

// ------------------------------------------------------------ background

const rectOf = (a: RectAnnotation, s: Scales): ChartRect => {
  const { plot } = s;
  const xa = a.x0 === undefined ? -Infinity : s.xToPx(a.x0);
  const xb = a.x1 === undefined ? Infinity : s.xToPx(a.x1);
  const ya = a.y0 === undefined ? Infinity : s.yToPx(a.y0);
  const yb = a.y1 === undefined ? -Infinity : s.yToPx(a.y1);
  const left = Math.max(plot.x, Math.min(xa, xb));
  const right = Math.min(plot.x + plot.width, Math.max(xa, xb));
  const top = Math.max(plot.y, Math.min(ya, yb));
  const bottom = Math.min(plot.y + plot.height, Math.max(ya, yb));
  return { x: left, y: top, width: right - left, height: bottom - top };
};

/** Box of a text annotation, kept inside the plot (engine `textBox`) */
const textBox = (
  a: TextAnnotation,
  s: Scales,
  width: number,
  height: number,
): ChartRect => {
  const { plot } = s;
  const px = a.x === undefined ? plot.x + plot.width / 2 : s.xToPx(a.x);
  const py = a.y === undefined ? plot.y + plot.height / 2 : s.yToPx(a.y);
  const gap = 6;
  let x = px - width / 2;
  let y = py - height / 2;
  if (a.anchor === "top") y = py + gap;
  else if (a.anchor === "bottom") y = py - gap - height;
  else if (a.anchor === "left") x = px + gap;
  else if (a.anchor === "right") x = px - gap - width;
  x = Math.max(plot.x + gap, Math.min(x, plot.x + plot.width - gap - width));
  y = Math.max(plot.y + 2, Math.min(y, plot.y + plot.height - 2 - height));
  return { x, y, width, height };
};

const css = (c: Rgba, alpha?: number) => toCss(c, alpha);

function drawBackground(scene: ChartScene, family?: string): ReactElement[] {
  const { width, theme, model, layout, annotations } = scene;
  const { plot, scales, xTicks, yTicks } = layout;
  const fs = theme.fontSize;
  const out: ReactElement[] = [];

  annotations.forEach((a, i) => {
    if (a.type !== "rect") return;
    const r = rectOf(a, scales);
    if (r.width <= 0 || r.height <= 0) return;
    out.push(
      box(`area-${i}`, r.x, r.y, r.width, r.height, css(a.color, a.opacity)),
    );
  });

  const grid = css(theme.grid);
  if (model.y.grid) {
    yTicks.values.forEach((v, i) => {
      const py = scales.yToPx(v);
      if (py < plot.y - 1 || py > plot.y + plot.height + 1) return;
      out.push(box(`ygrid-${i}`, plot.x, crisp(py), plot.width, 1, grid));
    });
  }
  if (model.x.grid) {
    xTicks.values.forEach((v, i) => {
      const px = scales.xToPx(v);
      if (px < plot.x - 1 || px > plot.x + plot.width + 1) return;
      out.push(box(`xgrid-${i}`, crisp(px), plot.y, 1, plot.height, grid));
    });
  }

  const line = Math.ceil(fs * 1.4);
  const tick: TextOptions = { size: fs, color: css(theme.textMuted), family };
  const title: TextOptions = {
    size: fs + 1,
    weight: 500,
    color: css(theme.text, 0.8),
    family,
  };
  const bottom = plot.y + plot.height;

  if (model.x.visible) {
    out.push(
      box("xaxis", plot.x, crisp(bottom), plot.width, 1, css(theme.axis)),
    );
    let lastRight = -Infinity;
    xTicks.values
      .map((v, i) => ({ px: scales.xToPx(v), text: xTicks.labels[i] ?? "" }))
      .sort((a, b) => a.px - b.px)
      .forEach(({ px, text }, i) => {
        if (!text || px < plot.x - 0.5 || px > plot.x + plot.width + 0.5)
          return;
        const w = measureChartText(text, `400 ${fs}px sans-serif`);
        const left = Math.max(0, Math.min(width - w, px - w / 2));
        if (left < lastRight + 6) return;
        lastRight = left + w;
        out.push(
          label(
            `xtick-${i}`,
            text,
            left + w / 2,
            bottom + 7,
            "center",
            "top",
            tick,
            width,
          ),
        );
      });
    if (model.x.title)
      out.push(
        label(
          "xtitle",
          model.x.title,
          plot.x + plot.width / 2,
          bottom + line + 10,
          "center",
          "top",
          title,
          width,
        ),
      );
  }

  if (model.y.visible) {
    yTicks.values.forEach((v, i) => {
      const py = scales.yToPx(v);
      const text = yTicks.labels[i];
      if (!text || py < plot.y - 0.5 || py > plot.y + plot.height + 0.5) return;
      out.push(
        label(
          `ytick-${i}`,
          text,
          plot.x - 8,
          py,
          "right",
          "middle",
          tick,
          width,
        ),
      );
    });
    if (model.y.title)
      out.push(
        label(
          "ytitle",
          model.y.title,
          line / 2 + 4,
          plot.y + plot.height / 2,
          "center",
          "middle",
          title,
          width,
          {
            transform: [{ rotate: "-90deg" }],
          },
        ),
      );
  }

  if (scene.legend) {
    for (const e of scene.legend.entries) {
      // coordinates relative to the entry box
      const cy = e.box.height / 2;
      const swatch =
        e.shape === "dot"
          ? dot("swatch", 5, cy, 8, e.color)
          : e.shape === "line"
            ? box("swatch", 0, cy - 1, 10, 2, e.color)
            : box("swatch", 1, cy - 4, 8, 8, e.color);
      out.push(
        <View
          key={`legend-${e.id}`}
          style={{
            position: "absolute",
            left: e.box.x,
            top: e.box.y,
            width: e.box.width,
            height: e.box.height,
            opacity: e.hidden ? 0.45 : 1,
          }}
          {...part(C, "legend-item", { hidden: e.hidden })}
        >
          {swatch}
          {label(
            "name",
            e.name,
            14,
            cy,
            "left",
            "middle",
            { size: 12, color: css(theme.textMuted), family },
            e.box.width,
            e.hidden ? { textDecorationLine: "line-through" } : undefined,
          )}
        </View>,
      );
    }
  }
  return out;
}

// ------------------------------------------------------------ foreground

function drawForeground(scene: ChartScene, family?: string): ReactElement[] {
  const { theme, annotations, layout } = scene;
  const { plot, scales } = layout;
  const fs = theme.fontSize;
  const ox = plot.x;
  const oy = plot.y;
  const fw = plot.width;
  const halo = css(theme.background, 0.9);
  const labelHeight = fs + 4;
  const out: ReactElement[] = [];

  annotations.forEach((a, i) => {
    if (a.type !== "line") return;
    const color = css(a.color);
    if (a.axis === "y") {
      const py = scales.yToPx(a.value);
      out.push(
        ...dashedLine(
          `line-${i}`,
          "y",
          crisp(py, a.width) - oy,
          0,
          plot.width,
          a.width,
          color,
          a.dash,
        ),
      );
      if (a.label)
        out.push(
          label(
            `line-label-${i}`,
            a.label,
            plot.width - 6,
            py - 3 - oy,
            "right",
            "bottom",
            { size: fs, weight: 500, color, halo, family },
            fw,
          ),
        );
    } else {
      const px = scales.xToPx(a.value);
      out.push(
        ...dashedLine(
          `line-${i}`,
          "x",
          crisp(px, a.width) - ox,
          0,
          plot.height,
          a.width,
          color,
          a.dash,
        ),
      );
      if (a.label)
        out.push(
          label(
            `line-label-${i}`,
            a.label,
            px + 5 - ox,
            5,
            "left",
            "top",
            { size: fs, weight: 500, color, halo, family },
            fw,
          ),
        );
    }
  });

  annotations.forEach((a, i) => {
    if (a.type !== "rect" || !a.label) return;
    const r = rectOf(a, scales);
    if (r.width <= 0 || r.height <= 0) return;
    const pad = 10;
    const pos = a.labelPosition;
    const align: Align = pos.endsWith("left")
      ? "left"
      : pos.endsWith("right")
        ? "right"
        : "center";
    const tx =
      align === "left"
        ? r.x + pad
        : align === "right"
          ? r.x + r.width - pad
          : r.x + r.width / 2;
    const ty = pos.startsWith("top")
      ? r.y + pad
      : pos.startsWith("bottom")
        ? r.y + r.height - pad - labelHeight
        : r.y + (r.height - labelHeight) / 2;
    out.push(
      label(
        `area-label-${i}`,
        a.label,
        tx - ox,
        ty - oy,
        align,
        "top",
        { size: fs + 1, weight: 600, color: css(a.labelColor), family },
        fw,
      ),
    );
  });

  annotations.forEach((a, i) => {
    if (a.type !== "text" || !a.text) return;
    const w = measureChartText(a.text, `${a.weight} ${fs}px sans-serif`);
    const b = textBox(a, scales, w, labelHeight);
    out.push(
      label(
        `text-${i}`,
        a.text,
        b.x - ox,
        b.y + b.height / 2 - oy,
        "left",
        "middle",
        { size: fs, weight: a.weight, color: css(a.color), halo, family },
        fw,
      ),
    );
  });

  const pointColor = css(theme.text, 0.85);
  scene.pointLabels.forEach(({ label: l, box: b }, i) => {
    out.push(
      label(
        `point-label-${i}`,
        l.text,
        b.x - ox,
        b.y + b.height / 2 - oy,
        "left",
        "middle",
        { size: fs, color: pointColor, halo, family },
        fw,
      ),
    );
  });
  return out;
}

const clip = (plot: ChartRect): ViewStyle => ({
  position: "absolute",
  left: plot.x,
  top: plot.y,
  width: plot.width,
  height: plot.height,
  overflow: "hidden",
});

/**
 * Everything but the hover state: axes, grid, legend, annotations, data and
 * labels (cached by the caller while the model, view and size are the same)
 */
export function drawStatic(scene: ChartScene, family?: string): ReactNode {
  const { plot } = scene.layout;
  return (
    <>
      {drawBackground(scene, family)}
      <View key="data" style={clip(plot)} {...part(C, "data")}>
        {drawData(scene)}
      </View>
      <View key="labels" style={clip(plot)} {...part(C, "labels")}>
        {drawForeground(scene, family)}
      </View>
    </>
  );
}

/** Crosshair, highlighted points, dragged point and the default tooltip */
export function drawHover(
  scene: ChartScene,
  family: string | undefined,
  customTooltip: boolean,
): ReactNode {
  const { theme, layout, hover, dragging } = scene;
  const { plot } = layout;
  const background = css(theme.background);
  const out: ReactElement[] = [];
  if (hover && hover.crosshairX !== null) {
    out.push(
      <View
        key="crosshair"
        style={StyleSheet.absoluteFill}
        {...part(C, "crosshair")}
      >
        {dashedLine(
          "dash",
          "x",
          Math.round(hover.crosshairX),
          plot.y,
          plot.height,
          1,
          css(theme.textMuted, 0.55),
          [3, 3],
        )}
      </View>,
    );
  }
  hover?.marks.forEach((m, i) => {
    out.push(
      m.kind === "bar"
        ? box(
            `mark-${i}`,
            m.x - 2,
            m.y - 2,
            m.width + 4,
            m.height + 2,
            css(theme.text, 0.08),
          )
        : dot(`mark-${i}`, m.x, m.y, m.size + 2, m.color, {
            borderWidth: 2,
            borderColor: background,
          }),
    );
  });
  if (dragging) {
    out.push(
      <View key="drag" {...part(C, "drag")} style={StyleSheet.absoluteFill}>
        {dot(
          "ghost",
          dragging.x,
          dragging.y,
          dragging.size + 2,
          dragging.color,
          {
            opacity: 0.85,
            borderWidth: 2,
            borderColor: background,
          },
        )}
      </View>,
    );
  }
  const tip = hover?.tooltip;
  if (tip && !customTooltip) {
    const { box: b, lineHeight, padding, content } = tip;
    const text = css(theme.text);
    const muted = css(theme.textMuted);
    const font = (weight: number, color: string): TextStyle => ({
      fontSize: 12,
      lineHeight,
      color,
      fontWeight: String(weight) as TextStyle["fontWeight"],
      includeFontPadding: false,
      ...(family ? { fontFamily: family } : null),
    });
    const swatch = (color: string) => (
      <View
        style={{
          width: 8,
          height: 8,
          borderRadius: 4,
          marginRight: 6,
          backgroundColor: color,
        }}
      />
    );
    const row: ViewStyle = {
      height: lineHeight,
      flexDirection: "row",
      alignItems: "center",
    };
    out.push(
      <View
        key="tooltip"
        {...part(C, "tooltip")}
        style={[
          tooltipCard(scene),
          {
            left: b.x,
            top: b.y,
            width: b.width,
            height: b.height,
            paddingHorizontal: padding + 1,
            paddingVertical: padding - 1,
          },
        ]}
      >
        {tip.text
          ? tip.text.map((t, i) => (
              <Text key={i} numberOfLines={1} style={font(400, text)}>
                {t}
              </Text>
            ))
          : [
              <View key="title" style={row}>
                {content.titleColor ? swatch(content.titleColor) : null}
                <Text
                  numberOfLines={1}
                  style={[font(600, text), { flexShrink: 1 }]}
                >
                  {content.title}
                </Text>
              </View>,
              ...content.rows.map((r, i) => (
                <View key={i} style={row}>
                  {r.color ? swatch(r.color) : null}
                  <Text
                    numberOfLines={1}
                    style={[font(400, muted), { flexShrink: 1 }]}
                  >
                    {r.name}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={[
                      font(600, text),
                      { flexGrow: 1, marginLeft: 16, textAlign: "right" },
                    ]}
                  >
                    {r.value}
                  </Text>
                </View>
              )),
            ]}
      </View>,
    );
  }
  return out;
}

/** Look of the tooltips (default and `renderTooltip` content) */
export const tooltipCard = (scene: ChartScene): ViewStyle => ({
  position: "absolute",
  backgroundColor: css(scene.theme.background),
  borderColor: css(scene.theme.axis),
  borderWidth: 1,
  borderRadius: 8,
  shadowColor: "#0f172a",
  shadowOpacity: 0.18,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 6 },
  elevation: 6,
});
