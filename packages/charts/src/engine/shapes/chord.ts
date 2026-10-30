// Chord diagram layout: groups as arcs around a circle (sized by their
// flows), flows as ribbons between the arcs. Undirected: one ribbon per pair
// whose ends are as wide as the flow leaving each end; directed: one ribbon
// per direction, optionally with an arrowhead at the target. Ribbon ends are
// ordered along each arc so that ribbons cross as little as possible.

import { mix, toCss, type Rgba } from "../color";
import { font } from "../overlay";
import { localeFormat } from "./labels";
import {
  clamp,
  ellipsize,
  emptyLayout,
  finite,
  positive,
  TAU,
  uniqueKeys,
  upright,
  type LayoutContext,
  type LayoutResult,
  type ShapeItem,
  type ShapeNode,
} from "./scene";
import type { ChordChartOptions } from "./types";

/** Groups, flow matrix and ribbon colors of a chord diagram */
export interface ChordModel {
  names: string[];
  colors: (string | undefined)[];
  /** `matrix[i][j]`: flow from group i to group j (non-negative) */
  matrix: number[][];
  /** Custom ribbon colors, by `i * n + j` */
  cellColors: Map<number, string>;
}

/**
 * Resolves the groups (declared, then the ones only named by links) and
 * the square flow matrix (from `links`, else `matrix`)
 */
export const resolveChord = (o: ChordChartOptions): ChordModel => {
  const names: string[] = [];
  const colors: (string | undefined)[] = [];
  const byName = new Map<string, number>();
  for (const g of o.groups ?? []) {
    const group = typeof g === "string" ? { name: g } : g;
    if (!group || typeof group.name !== "string") continue;
    if (!byName.has(group.name)) byName.set(group.name, names.length);
    names.push(group.name);
    colors.push(group.color);
  }
  const cellColors = new Map<number, string>();
  if (o.links) {
    const declared = names.length;
    const resolve = (end: string | number): number => {
      if (typeof end === "number")
        return Number.isInteger(end) && end >= 0 && end < declared ? end : -1;
      if (typeof end !== "string") return -1;
      const known = byName.get(end);
      if (known !== undefined) return known;
      byName.set(end, names.length);
      names.push(end);
      colors.push(undefined);
      return names.length - 1;
    };
    const flows: [number, number, number, string | undefined][] = [];
    for (const l of o.links) {
      if (!l) continue;
      const s = resolve(l.source);
      const t = resolve(l.target);
      if (s < 0 || t < 0) continue;
      flows.push([s, t, positive(l.value), l.color]);
    }
    const n = names.length;
    const matrix = names.map(() => new Array<number>(n).fill(0));
    for (const [s, t, v, color] of flows) {
      matrix[s][t] += v;
      if (color) cellColors.set(s * n + t, color);
    }
    return { names, colors, matrix, cellColors };
  }
  const rows = o.matrix ?? [];
  const n = Math.max(names.length, rows.length);
  for (let i = names.length; i < n; i++) {
    names.push(String(i + 1));
    colors.push(undefined);
  }
  const matrix = names.map((_, i) =>
    names.map((__, j) => positive(rows[i]?.[j])),
  );
  return { names, colors, matrix, cellColors };
};

/** Keys of the animated quantities: `~group` (shown 0-1) and `group→group` */
const chordKeys = (m: ChordModel) => {
  const keys = uniqueKeys(m.names);
  return {
    group: (i: number) => `~${keys[i]}`,
    cell: (i: number, j: number) => `${keys[i]}\u2192${keys[j]}`,
  };
};

/** Whether a cell is a flow of the diagram (directed: self flows are ignored) */
const isFlow = (m: ChordModel, directed: boolean, i: number, j: number) =>
  m.matrix[i][j] > 0 && !(directed && i === j);

export const chordValues = (
  o: ChordChartOptions,
  hidden: ReadonlySet<number>,
  out: Map<string, number>,
) => {
  const m = resolveChord(o);
  const k = chordKeys(m);
  const directed = !!o.directed;
  m.names.forEach((_, i) => {
    out.set(k.group(i), hidden.has(i) ? 0 : 1);
    m.names.forEach((__, j) => {
      if (isFlow(m, directed, i, j))
        out.set(
          k.cell(i, j),
          hidden.has(i) || hidden.has(j) ? 0 : m.matrix[i][j],
        );
    });
  });
};

/** Totals of a matrix: outgoing, incoming and arc value of every group */
const totals = (matrix: readonly (readonly number[])[], directed: boolean) => {
  const n = matrix.length;
  const out = new Array<number>(n).fill(0);
  const inc = new Array<number>(n).fill(0);
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++) {
      if (directed && i === j) continue;
      out[i] += matrix[i][j];
      inc[j] += matrix[i][j];
    }
  return {
    out,
    inc,
    value: out.map((v, i) => (directed ? v + inc[i] : v)),
  };
};

/** Smallest of 1, 2, 5 × 10^k not below `raw` */
const niceCeil = (raw: number) => {
  if (!(raw > 0) || !Number.isFinite(raw)) return 0;
  const base = Math.pow(10, Math.floor(Math.log10(raw)));
  for (const f of [1, 2, 5, 10])
    if (f * base >= raw * (1 - 1e-9)) return f * base;
  return 10 * base;
};

/** An end of a ribbon on an arc */
interface Segment {
  /** Other group of the flow */
  j: number;
  /** `out`: flow from this group to `j`; `in`: flow from `j` to this group */
  dir: "out" | "in";
  /** Target (not animated) size, used to sort */
  raw: number;
  a0: number;
  a1: number;
}

const LABEL_FONT_SIZE = 12;
const TICK_BAND = 22;

export const layoutChord = (
  o: ChordChartOptions,
  c: LayoutContext,
): LayoutResult => {
  const { theme, area, measure, hidden } = c;
  const model = resolveChord(o);
  const { names, matrix: raw } = model;
  const n = names.length;
  if (!n) return emptyLayout(c);
  const directed = !!o.directed;
  const keys = chordKeys(model);
  const flow = (i: number, j: number) => isFlow(model, directed, i, j);

  // displayed (animated) flows, and the targets (hidden groups count as 0)
  const shown = raw.map((row, i) =>
    row.map((v, j) =>
      flow(i, j)
        ? Math.max(
            0,
            c.value(keys.cell(i, j), hidden.has(i) || hidden.has(j) ? 0 : v),
          )
        : 0,
    ),
  );
  const target = raw.map((row, i) =>
    row.map((v, j) => (flow(i, j) && !hidden.has(i) && !hidden.has(j) ? v : 0)),
  );
  const now = totals(shown, directed);
  const goal = totals(target, directed);
  const whole = goal.value.reduce((a, b) => a + b, 0);
  const visibleWeight = names.map((_, i) =>
    goal.value[i] > 0 || now.value[i] > 1e-9
      ? clamp(c.value(keys.group(i), hidden.has(i) ? 0 : 1), 0, 1)
      : 0,
  );
  const sumNow = now.value.reduce((a, b) => a + b, 0);
  if (sumNow <= 1e-12) return emptyLayout(c);

  // order of the groups around the circle
  const allGoal = totals(
    raw.map((row, i) => row.map((v, j) => (flow(i, j) ? v : 0))),
    directed,
  ).value;
  const order = names.map((_, i) => i);
  if (o.sortGroups === "ascending" || o.sortGroups === "descending") {
    const sign = o.sortGroups === "ascending" ? 1 : -1;
    order.sort((a, b) => sign * (allGoal[a] - allGoal[b]) || a - b);
  }
  const pos = new Array<number>(n);
  order.forEach((g, p) => (pos[g] = p));

  // radii: arcs, ticks and labels from the center out
  const cx = area.x + area.width / 2;
  const cy = area.y + area.height / 2;
  const half = Math.min(area.width, area.height) / 2;
  const labelMode = o.labels ?? "auto";
  const nameFont = font(theme, LABEL_FONT_SIZE, 500);
  const tickFont = font(theme, 10);
  const tickOption = o.ticks;
  const showTicks =
    tickOption === false
      ? false
      : typeof tickOption === "number"
        ? tickOption > 0
        : half >= 150;
  const tickBand = showTicks ? TICK_BAND : 0;
  const pad = clamp(finite(o.padAngle, 2), 0, 45) * (Math.PI / 180);
  const padTotal = pad * visibleWeight.reduce((a, b) => a + b, 0);
  const padScale = padTotal > TAU * 0.5 ? (TAU * 0.5) / padTotal : 1;
  const k = (TAU - padTotal * padScale) / sumNow;
  const start = -Math.PI / 2 + (finite(o.startAngle) * Math.PI) / 180;

  // group arcs (angles only; the radius comes with the labels)
  const arcs: { a0: number; a1: number }[] = new Array(n);
  {
    let a = start + (pad * padScale * (visibleWeight[order[0]] ?? 0)) / 2;
    for (const g of order) {
      const a0 = a;
      const a1 = a0 + now.value[g] * k;
      arcs[g] = { a0, a1 };
      a = a1 + pad * padScale * visibleWeight[g];
    }
  }
  const drawnGroup = (g: number) => arcs[g].a1 - arcs[g].a0 > 1e-6;

  // labels: tangential when every name fits its arc (auto), else radial
  const nameW = names.map((name) => measure(name, nameFont));
  const fitsTangential = (r: number) =>
    order.every(
      (g) =>
        !drawnGroup(g) ||
        nameW[g] + 6 <= (arcs[g].a1 - arcs[g].a0 + pad * padScale * 0.8) * r,
    );
  let mode: "tangential" | "radial" | "none" =
    labelMode === "none"
      ? "none"
      : labelMode === "radial"
        ? "radial"
        : "tangential";
  const tangentialRoom = LABEL_FONT_SIZE + 10;
  if (labelMode === "auto" && !fitsTangential(Math.max(1, half - 12)))
    mode = "radial";
  // distance from the center to the edge of the area along an angle
  const reach = (a: number) => {
    const cos = Math.abs(Math.cos(a));
    const sin = Math.abs(Math.sin(a));
    return Math.min(
      cos > 1e-6 ? (area.width / 2 - 2) / cos : Infinity,
      sin > 1e-6 ? (area.height / 2 - LABEL_FONT_SIZE / 2 - 1) / sin : Infinity,
    );
  };
  const midOf = (g: number) => (arcs[g].a0 + arcs[g].a1) / 2;
  // radial names near 12 and 6 o'clock are written horizontally: they then
  // need one line of height instead of their whole width
  const horizontal = (a: number) => Math.abs(Math.sin(a)) > 0.92;
  let outer: number;
  if (mode === "radial") {
    // the largest radius leaving each name room along its ray (a wide area
    // gives the names on the sides more room), but not below half the size;
    // names that still do not fit are shortened
    outer = half - tickBand - 8;
    for (const g of order)
      if (drawnGroup(g) && visibleWeight[g] > 0.5) {
        const a = midOf(g);
        const need = horizontal(a) ? LABEL_FONT_SIZE + 2 : nameW[g];
        outer = Math.min(outer, reach(a) - need - tickBand - 10);
      }
    outer = Math.max(half * 0.5, outer);
  } else {
    outer = half - tickBand - (mode === "none" ? 0 : tangentialRoom) - 2;
  }
  outer = Math.max(16, outer);
  const arcWidth = clamp(
    finite(o.arcWidth, clamp(outer * 0.06, 8, 18)),
    2,
    outer * 0.5,
  );
  const inner = outer - arcWidth;
  const ribbonR = Math.max(4, inner - 2);

  // ribbon ends along each arc
  const segments: Segment[][] = names.map(() => []);
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++) {
      if (directed) {
        if (flow(i, j)) {
          segments[i].push({ j, dir: "out", raw: raw[i][j], a0: 0, a1: 0 });
          segments[j].push({ j: i, dir: "in", raw: raw[i][j], a0: 0, a1: 0 });
        }
      } else if (flow(i, j) || flow(j, i)) {
        segments[i].push({ j, dir: "out", raw: raw[i][j], a0: 0, a1: 0 });
      }
    }
  const sortSub = o.sortSubgroups ?? "auto";
  segments.forEach((list, i) => {
    // `auto`: flows toward the groups just after this one (clockwise) end
    // the arc, those toward the groups just before start it
    const offset = (j: number) => {
      const d = (pos[j] - pos[i] + n) % n;
      return d === 0 ? n / 2 : d;
    };
    list.sort((a, b) => {
      const dir = Number(a.dir === "in") - Number(b.dir === "in");
      if (sortSub === "ascending" || sortSub === "descending") {
        const s = sortSub === "ascending" ? 1 : -1;
        return s * (a.raw - b.raw) || pos[a.j] - pos[b.j] || dir;
      }
      if (sortSub === "none") return pos[a.j] - pos[b.j] || dir;
      return offset(b.j) - offset(a.j) || dir;
    });
    let a = arcs[i].a0;
    for (const s of list) {
      const v = s.dir === "out" ? shown[i][s.j] : shown[s.j][i];
      s.a0 = a;
      s.a1 = a + v * k;
      a = s.a1;
    }
  });
  const segment = (g: number, j: number, dir: "out" | "in") =>
    segments[g].find((s) => s.j === j && s.dir === dir);

  // colors
  const colors: Rgba[] = names.map((_, i) => c.color(model.colors[i], i));
  const css = colors.map((col) => toCss(col));
  const neutral = toCss(mix(theme.grid, theme.textMuted, 0.45));
  const colorMode = o.ribbonColor ?? "gradient";
  const opacity = clamp(finite(o.ribbonOpacity, 0.65), 0.02, 1);
  const activeAlpha = Math.min(1, opacity + 0.25);
  const head = (o.arrows ?? directed) ? clamp(ribbonR * 0.07, 5, 12) : 0;

  // ribbons: [source, target] by item index
  interface Ribbon {
    index: number;
    s: number;
    t: number;
    src: Segment;
    tgt: Segment;
  }
  const ribbons: Ribbon[] = [];
  const ribbonIndex = (s: number, t: number) => n + s * n + t;
  for (let i = 0; i < n; i++)
    for (let j = directed ? 0 : i; j < n; j++) {
      if (directed) {
        if (!flow(i, j)) continue;
        const src = segment(i, j, "out");
        const tgt = segment(j, i, "in");
        if (src && tgt)
          ribbons.push({ index: ribbonIndex(i, j), s: i, t: j, src, tgt });
      } else {
        if (!flow(i, j) && !flow(j, i)) continue;
        // the larger direction is the source
        const [s, t] = raw[j][i] > raw[i][j] ? [j, i] : [i, j];
        const src = segment(s, t, "out");
        const tgt = segment(t, s, "out");
        if (src && tgt)
          ribbons.push({ index: ribbonIndex(s, t), s, t, src, tgt });
      }
    }
  const ribbonsOf = names.map(() => [] as number[]);
  for (const r of ribbons) {
    ribbonsOf[r.s].push(r.index);
    if (r.t !== r.s) ribbonsOf[r.t].push(r.index);
  }

  const nodes: ShapeNode[] = [];
  const width = (r: Ribbon) => r.src.a1 - r.src.a0 + (r.tgt.a1 - r.tgt.a0);
  for (const r of ribbons.slice().sort((a, b) => width(b) - width(a))) {
    if (width(r) <= 1e-6) continue;
    const own =
      model.cellColors.get(r.s * n + r.t) ??
      (directed ? undefined : model.cellColors.get(r.t * n + r.s));
    let c0: string;
    let c1: string;
    if (own) c0 = c1 = toCss(c.color(own, r.s));
    else if (colorMode === "source") c0 = c1 = css[r.s];
    else if (colorMode === "target") c0 = c1 = css[r.t];
    else if (colorMode === "neutral") c0 = c1 = neutral;
    else {
      c0 = css[r.s];
      c1 = css[r.t];
    }
    nodes.push({
      kind: "ribbon",
      cx,
      cy,
      r: ribbonR,
      s0: r.src.a0,
      s1: r.src.a1,
      t0: r.tgt.a0,
      t1: r.tgt.a1,
      head: r.s === r.t ? 0 : head,
      color0: c0,
      color1: c1,
      alpha: opacity,
      activeAlpha,
      hit: r.index,
      also: r.s === r.t ? [r.s] : [r.s, r.t],
    });
  }

  // group arcs
  for (const g of order) {
    if (!drawnGroup(g)) continue;
    nodes.push({
      kind: "sector",
      cx,
      cy,
      r0: inner,
      r1: outer,
      a0: arcs[g].a0,
      a1: arcs[g].a1,
      pad: 0,
      corner: Math.min(2, arcWidth / 4),
      fill: css[g],
      hit: g,
      also: ribbonsOf[g],
      alpha: visibleWeight[g],
    });
  }

  // value ticks: minor ticks, labelled major ticks where the labels fit
  const muted = toCss(theme.textMuted);
  const tickColor = toCss(theme.textMuted, 0.7);
  if (showTicks) {
    const unitPx = k * outer;
    const tickFormat = o.tickFormat ?? localeFormat(c.locale);
    const sample = tickFormat(Math.max(...allGoal));
    const labelPx = measure(sample, tickFont) + 14;
    let major =
      typeof tickOption === "number"
        ? tickOption
        : niceCeil(labelPx / Math.max(unitPx, 1e-12));
    // keep the number of ticks reasonable
    const count = sumNow / Math.max(major, 1e-12);
    if (!(major > 0) || count > 240) major = niceCeil(sumNow / 240);
    const minor =
      (major / 5) * unitPx >= 5
        ? major / 5
        : (major / 2) * unitPx >= 5
          ? major / 2
          : major;
    const perMajor = Math.round(major / minor);
    const tickR = outer + 2;
    const labelR = outer + 15;
    let lastEnd = -Infinity;
    let firstStart: number | null = null;
    for (const g of order) {
      if (!drawnGroup(g)) continue;
      const { a0, a1 } = arcs[g];
      const also = ribbonsOf[g];
      for (let m = 0; ; m++) {
        const a = a0 + m * minor * k;
        if (a > a1 + 1e-9) break;
        const isMajor = m % perMajor === 0;
        const len = isMajor ? 5 : 3;
        if (unitPx * minor >= 3 || isMajor)
          nodes.push({
            kind: "line",
            points: [
              cx + tickR * Math.cos(a),
              cy + tickR * Math.sin(a),
              cx + (tickR + len) * Math.cos(a),
              cy + (tickR + len) * Math.sin(a),
            ],
            color: tickColor,
            width: 1,
            hit: g,
            also,
          });
        if (!isMajor) continue;
        const text = tickFormat(m * minor);
        const halfAngle = (measure(text, tickFont) / 2 + 3) / labelR;
        if (a - halfAngle < lastEnd) continue;
        if (firstStart !== null && a + halfAngle > firstStart + TAU) continue;
        if (firstStart === null) firstStart = a - halfAngle;
        lastEnd = a + halfAngle;
        nodes.push({
          kind: "text",
          x: cx + labelR * Math.cos(a),
          y: cy + labelR * Math.sin(a),
          text,
          font: tickFont,
          color: muted,
          align: "center",
          baseline: "middle",
          rotate: upright(a + Math.PI / 2),
          hit: g,
          also,
        });
      }
    }
  }

  // group names
  if (mode !== "none") {
    const nameR = outer + tickBand + 6;
    const color = toCss(theme.text);
    // placed names as sample points along their baseline: two names collide
    // when samples are closer than a line height (works for any rotation)
    const placed: [number, number][][] = [];
    const lineGap = LABEL_FONT_SIZE + 3;
    const samples = (
      x: number,
      y: number,
      dx: number,
      dy: number,
      length: number,
    ) => {
      const pts: [number, number][] = [];
      const steps = Math.max(1, Math.ceil(length / 6));
      for (let s = 0; s <= steps; s++)
        pts.push([
          x + (dx * length * s) / steps,
          y + (dy * length * s) / steps,
        ]);
      return pts;
    };
    const collides = (pts: [number, number][]) =>
      placed.some((other) =>
        other.some(([x, y]) =>
          pts.some(([u, v]) => Math.hypot(x - u, y - v) < lineGap),
        ),
      );
    // biggest first, so collisions drop the small groups
    const byValue = order
      .filter((g) => drawnGroup(g) && visibleWeight[g] > 0.5)
      .sort((a, b) => now.value[b] - now.value[a]);
    for (const g of byValue) {
      const { a0, a1 } = arcs[g];
      const mid = (a0 + a1) / 2;
      if (mode === "tangential") {
        const room = (a1 - a0 + pad * padScale * 0.8) * (nameR + 6) - 6;
        const text = ellipsize(names[g], room, nameFont, measure);
        if (!text) continue;
        nodes.push({
          kind: "text",
          x: cx + (nameR + 6) * Math.cos(mid),
          y: cy + (nameR + 6) * Math.sin(mid),
          text,
          font: nameFont,
          color,
          align: "center",
          baseline: "middle",
          rotate: upright(mid + Math.PI / 2),
          hit: g,
          also: ribbonsOf[g],
        });
        continue;
      }
      const ax = cx + nameR * Math.cos(mid);
      const ay = cy + nameR * Math.sin(mid);
      if (horizontal(mid)) {
        // above (12 o'clock) or below (6 o'clock): centered on the arc, else
        // extending away from the vertical axis, else toward it; the text must
        // clear the tick ring and the names already placed
        const y = ay + Math.sign(Math.sin(mid)) * (LABEL_FONT_SIZE / 2 + 1);
        const outward = Math.cos(mid) >= 0 ? "left" : "right";
        const aligns: ("center" | "left" | "right")[] = [
          "center",
          outward,
          outward === "left" ? "right" : "left",
        ];
        const clear = (pts: [number, number][]) =>
          pts.every(([x, py]) => Math.hypot(x - cx, py - cy) >= nameR + 2);
        for (const align of aligns) {
          const room =
            align === "center"
              ? 2 * Math.min(ax - area.x, area.x + area.width - ax) - 4
              : align === "left"
                ? area.x + area.width - ax - 2
                : ax - area.x - 2;
          const text = ellipsize(names[g], room, nameFont, measure);
          if (!text) continue;
          const w = measure(text, nameFont);
          const x0 =
            align === "left" ? ax : align === "right" ? ax - w : ax - w / 2;
          const pts = samples(x0, y, 1, 0, w);
          if (!clear(pts) || collides(pts)) continue;
          placed.push(pts);
          nodes.push({
            kind: "text",
            x: ax,
            y,
            text,
            font: nameFont,
            color,
            align,
            baseline: "middle",
            hit: g,
            also: ribbonsOf[g],
          });
          break;
        }
        continue;
      }
      const text = ellipsize(
        names[g],
        reach(mid) - nameR - 2,
        nameFont,
        measure,
      );
      if (!text) continue;
      const pts = samples(
        ax,
        ay,
        Math.cos(mid),
        Math.sin(mid),
        measure(text, nameFont),
      );
      if (collides(pts)) continue;
      placed.push(pts);
      const right = Math.cos(mid) >= 0;
      nodes.push({
        kind: "text",
        x: ax,
        y: ay,
        text,
        font: nameFont,
        color,
        align: right ? "left" : "right",
        baseline: "middle",
        rotate: right ? mid : mid + Math.PI,
        hit: g,
        also: ribbonsOf[g],
      });
    }
  }

  // items: groups around the circle, then the ribbons by source
  const items: ShapeItem[] = [];
  const asymmetric =
    directed ||
    raw.some((row, i) => row.some((v, j) => Math.abs(v - raw[j][i]) > 1e-12));
  for (const g of order) {
    const value = goal.value[g];
    if (!(value > 0) || hidden.has(g)) continue;
    const percent = whole > 0 ? value / whole : 0;
    const mid = (arcs[g].a0 + arcs[g].a1) / 2;
    items.push({
      index: g,
      name: names[g],
      value,
      percent,
      share: c.percent(percent),
      color: css[g],
      x: cx + outer * Math.cos(mid),
      y: cy + outer * Math.sin(mid),
      rows: [
        ...(directed || !asymmetric
          ? [{ name: c.labels.value, value: c.format(value) }]
          : []),
        ...(asymmetric
          ? [
              { name: c.labels.outgoing, value: c.format(goal.out[g]) },
              { name: c.labels.incoming, value: c.format(goal.inc[g]) },
            ]
          : []),
        { name: c.labels.share, value: c.percent(percent) },
      ],
    });
  }
  const flowTotal = target.reduce(
    (s, row) => s + row.reduce((a, b) => a + b, 0),
    0,
  );
  const ribbonItems = ribbons
    .filter((r) => target[r.s][r.t] > 0 || target[r.t][r.s] > 0)
    .sort(
      (a, b) =>
        pos[a.s] - pos[b.s] || a.src.a0 - b.src.a0 || pos[a.t] - pos[b.t],
    );
  for (const r of ribbonItems) {
    const value = target[r.s][r.t];
    const reverse =
      r.s !== r.t && target[r.s][r.t] + target[r.t][r.s] > 0
        ? raw[r.t][r.s]
        : 0;
    const percent = flowTotal > 0 ? value / flowTotal : 0;
    const source = names[r.s];
    const tgt = names[r.t];
    const ms = (r.src.a0 + r.src.a1) / 2;
    const mt = (r.tgt.a0 + r.tgt.a1) / 2;
    // middle of the quadratic curve between the two ends
    const x =
      r.s === r.t
        ? cx + ribbonR * 0.7 * Math.cos(ms)
        : 0.25 * (cx + ribbonR * Math.cos(ms)) +
          0.5 * cx +
          0.25 * (cx + ribbonR * Math.cos(mt));
    const y =
      r.s === r.t
        ? cy + ribbonR * 0.7 * Math.sin(ms)
        : 0.25 * (cy + ribbonR * Math.sin(ms)) +
          0.5 * cy +
          0.25 * (cy + ribbonR * Math.sin(mt));
    items.push({
      index: r.index,
      name: r.s === r.t ? source : `${source} \u2192 ${tgt}`,
      value,
      percent,
      share: c.percent(percent),
      color: css[r.s],
      x,
      y,
      rows: [
        { name: c.labels.value, value: c.format(value) },
        ...(r.s !== r.t && (!directed || reverse > 0)
          ? [{ name: c.labels.reverse, value: c.format(reverse) }]
          : []),
        { name: c.labels.share, value: c.percent(percent) },
      ],
      event: { source, target: tgt, reverseValue: reverse },
    });
  }

  const enter = clamp(c.enter, 0, 1);
  return {
    nodes,
    items,
    dim: 0.25,
    empty: false,
    ...(enter < 1
      ? { enter: { alpha: enter, scale: 0.94 + 0.06 * enter, cx, cy } }
      : {}),
  };
};
