// Pie / donut / nightingale rose layout: slices with pixel gaps and rounded
// corners, outside labels with collision-free leader lines, inside labels
// when they fit, donut center text.

import { toCss } from "../color";
import { font } from "../overlay";
import {
  clamp,
  ellipsize,
  emptyLayout,
  finite,
  positive,
  sum,
  TAU,
  textOn,
  uniqueKeys,
  type LayoutContext,
  type LayoutResult,
  type ShapeItem,
  type ShapeNode,
} from "./scene";
import type { PieChartOptions } from "./types";

/** Distance a hovered slice moves out */
export const PIE_POP = 6;
const ELBOW = 14;
const HLEN = 12;
const TGAP = 4;
const LINE_H = 18;
const PART_GAP = 6;
/** Inside labels: line height and distance kept from the slice edges */
const INSIDE_LINE = 15;
const INSIDE_PAD = 4;

const keysOf = (o: PieChartOptions) => uniqueKeys(o.data.map((d) => d.name));

/** Target values (and visibilities, for the rose angles) */
export const pieValues = (
  o: PieChartOptions,
  hidden: ReadonlySet<number>,
  out: Map<string, number>,
) => {
  keysOf(o).forEach((key, i) => {
    const on = !hidden.has(i);
    out.set(key, on ? positive(o.data[i].value) : 0);
    out.set(`~${key}`, on ? 1 : 0);
  });
};

/** A part of a label (name, value or percent), in `labelContent` order */
interface Part {
  kind: "name" | "value" | "percent";
  text: string;
  name: boolean;
}

/** Consecutive numbers joined with " · " (a label reads "Email  1.2k · 32.6%") */
interface Segment {
  text: string;
  name: boolean;
}

const segmentsOf = (parts: readonly Part[]): Segment[] => {
  const out: Segment[] = [];
  for (const p of parts) {
    const last = out[out.length - 1];
    if (last && !last.name && !p.name) last.text += ` · ${p.text}`;
    else out.push({ text: p.text, name: p.name });
  }
  return out;
};

const lineText = (parts: readonly Part[]) =>
  segmentsOf(parts)
    .map((s) => s.text)
    .join(" ");

interface Label {
  i: number;
  side: 1 | -1;
  /** Start of the leader line (on the slice) and its elbow */
  p0: [number, number];
  elbow: [number, number];
  desired: number;
  /** Top-to-bottom order of the slice on its side */
  order: number;
  y: number;
  value: number;
}

/**
 * Spreads the labels of one side vertically, in their order (the angles of
 * their slices, top to bottom), at least LINE_H apart and as close as
 * possible to where they want to be (isotonic regression); drops the
 * smallest ones that cannot fit.
 */
export const spreadLabels = <
  T extends { desired: number; value: number; order?: number },
>(
  labels: readonly T[],
  top: number,
  bottom: number,
  gap = LINE_H,
): (T & { y: number })[] => {
  const rows = labels
    .slice()
    .sort((a, b) => (a.order ?? a.desired) - (b.order ?? b.desired));
  while (rows.length > 1 && (rows.length - 1) * gap > bottom - top) {
    let k = 0;
    for (let j = 1; j < rows.length; j++)
      if (rows[j].value < rows[k].value) k = j;
    rows.splice(k, 1);
  }
  // z_k = y_k - k * gap must be non-decreasing: pool adjacent violators
  const blocks: { sum: number; count: number }[] = [];
  rows.forEach((r, k) => {
    blocks.push({ sum: r.desired - k * gap, count: 1 });
    while (blocks.length > 1) {
      const b = blocks[blocks.length - 1];
      const a = blocks[blocks.length - 2];
      if (a.sum / a.count <= b.sum / b.count) break;
      a.sum += b.sum;
      a.count += b.count;
      blocks.pop();
    }
  });
  const hi = Math.max(top, bottom - (rows.length - 1) * gap);
  const out: (T & { y: number })[] = [];
  let k = 0;
  for (const b of blocks) {
    const z = clamp(b.sum / b.count, top, hi);
    for (let j = 0; j < b.count; j++, k++)
      out.push({ ...rows[k], y: z + k * gap });
  }
  return out;
};

export const layoutPie = (
  o: PieChartOptions,
  c: LayoutContext,
): LayoutResult => {
  const { theme, area, measure, hidden } = c;
  const keys = keysOf(o);
  const n = o.data.length;
  const inner = clamp(finite(o.innerRadius), 0, 0.95);
  const donut = inner > 0;
  const padPx = Math.max(0, finite(o.padAngle, donut ? 2 : 1));
  const cornerPx = Math.max(0, finite(o.cornerRadius, donut ? 4 : 0));
  const targets = o.data.map((d, i) => (hidden.has(i) ? 0 : positive(d.value)));
  const values = targets.map((t, i) => Math.max(0, c.value(keys[i], t)));
  const weights = o.rose
    ? targets.map((_, i) =>
        clamp(c.value(`~${keys[i]}`, hidden.has(i) ? 0 : 1), 0, 1),
      )
    : values;
  const total = sum(targets);
  const totalWeight = sum(weights);
  if (totalWeight <= 1e-9 || sum(values) <= 1e-9) return emptyLayout(c);

  const colors = o.data.map((d, i) => c.color(d.color, i));
  const css = colors.map((col) => toCss(col));
  const cx = area.x + area.width / 2;
  const cy = area.y + area.height / 2;

  // angles: the whole circle sweeps in during the entry
  const sweepAll = TAU * clamp(c.enter, 0, 1);
  const a0s: number[] = [];
  const a1s: number[] = [];
  let a = (finite(o.startAngle) * Math.PI) / 180 - Math.PI / 2;
  for (let i = 0; i < n; i++) {
    const s = (sweepAll * weights[i]) / totalWeight;
    a0s.push(a);
    a1s.push(a + s);
    a += s;
  }
  const drawnCount = weights.filter((w) => w > 1e-6).length;

  // label parts, in the order of `labelContent`
  const mode = o.labels ?? (n <= 12 ? "outside" : "none");
  const content = [...new Set(o.labelContent ?? ["name", "percent"])];
  const shares = targets.map((t) => (total > 0 ? t / total : 0));
  const partsOf = o.data.map((d, i): Part[] =>
    content.flatMap((kind): Part[] => {
      if (kind === "name")
        return d.name ? [{ kind, text: d.name, name: true }] : [];
      if (kind === "value")
        return [{ kind, text: c.format(targets[i]), name: false }];
      if (kind === "percent")
        return [{ kind, text: c.percent(shares[i]), name: false }];
      return [];
    }),
  );
  const labelFont = font(theme, 12);
  const segmentsWidth = (segments: readonly Segment[]) =>
    segments.reduce(
      (w, s, k) => w + measure(s.text, labelFont) + (k ? PART_GAP : 0),
      0,
    );

  // radius: leave room for the outside labels
  const half = Math.min(area.width, area.height) / 2;
  let outside = mode === "outside";
  let radius = half - PIE_POP;
  if (outside) {
    let maxW = 0;
    partsOf.forEach((parts, i) => {
      if (targets[i] > 0)
        maxW = Math.max(maxW, segmentsWidth(segmentsOf(parts)));
    });
    radius = Math.min(
      area.height / 2 - LINE_H / 2,
      area.width / 2 - ELBOW - HLEN - TGAP - maxW - 2,
    );
    radius = Math.max(radius, half * 0.42);
    // short labels ("Jan") need less than 28px
    if (area.width / 2 - radius - ELBOW - HLEN - TGAP < Math.min(28, maxW)) {
      outside = false;
      radius = half - PIE_POP;
    }
  }
  radius = Math.max(radius, 2);
  const r0 = radius * inner;
  let vmax = 0;
  for (const v of values) vmax = Math.max(vmax, v);
  const outer = (i: number) =>
    o.rose && vmax > 0 ? r0 + ((radius - r0) * values[i]) / vmax : radius;

  const nodes: ShapeNode[] = [];
  const items: ShapeItem[] = [];
  const shiftOf = (m: number): [number, number] => [
    PIE_POP * Math.cos(m),
    PIE_POP * Math.sin(m),
  ];

  for (let i = 0; i < n; i++) {
    const a0 = a0s[i];
    const a1 = a1s[i];
    const r1 = outer(i);
    const m = (a0 + a1) / 2;
    if (a1 - a0 > 1e-6 && r1 - r0 > 0.25) {
      nodes.push({
        kind: "sector",
        cx,
        cy,
        r0,
        r1,
        a0,
        a1,
        pad: drawnCount > 1 ? padPx : 0,
        corner: cornerPx,
        fill: css[i],
        hit: i,
        shift: shiftOf(m),
      });
    }
    if (targets[i] > 0) {
      items.push({
        index: i,
        name: o.data[i].name,
        value: targets[i],
        percent: shares[i],
        share: c.percent(shares[i]),
        color: css[i],
        x: cx + r1 * Math.cos(m),
        y: cy + r1 * Math.sin(m),
        rows: [
          { name: "Value", value: c.format(targets[i]) },
          { name: "Share", value: c.percent(shares[i]) },
        ],
      });
    }
  }

  const labelAlpha = clamp((c.enter - 0.6) / 0.4, 0, 1);
  if (outside && labelAlpha > 0) {
    // outline of the slices (popped out when hovered), to keep the labels off
    const outline: [number, number][] = [];
    for (let i = 0; i < n; i++) {
      const span = a1s[i] - a0s[i];
      if (span <= 1e-6) continue;
      const r = outer(i) + PIE_POP + 2;
      const steps = Math.max(1, Math.ceil(span / 0.03));
      for (let s = 0; s <= steps; s++) {
        const t = a0s[i] + (span * s) / steps;
        outline.push([cx + r * Math.cos(t), cy + r * Math.sin(t)]);
      }
    }
    /** Horizontal distance from the center the slices reach around `y`, on a side */
    const clearance = (y: number, side: 1 | -1) => {
      let d = 0;
      for (const [px, py] of outline)
        if (Math.abs(py - y) <= LINE_H / 2) d = Math.max(d, side * (px - cx));
      return d;
    };
    const top = area.y + LINE_H / 2;
    const bottom = area.y + area.height - LINE_H / 2;

    // each label starts at its own slice and goes outward along it until a
    // horizontal leader is clear of the other slices
    const labels: Label[] = [];
    for (let i = 0; i < n; i++) {
      if (!(targets[i] > 0) || a1s[i] - a0s[i] <= 1e-6) continue;
      if (!partsOf[i].length) continue;
      const m = (a0s[i] + a1s[i]) / 2;
      const cos = Math.cos(m);
      const sin = Math.sin(m);
      const side: 1 | -1 = cos >= 0 ? 1 : -1;
      const r1 = outer(i);
      const at = (r: number): [number, number] => [cx + r * cos, cy + r * sin];
      const inBounds = (y: number) => y >= top && y <= bottom;
      // longest elbow along the slice that stays inside the drawing
      const rMax =
        Math.abs(sin) < 1e-6 ? Infinity : ((sin < 0 ? top : bottom) - cy) / sin;
      let r = Math.min(r1 + ELBOW, Math.max(r1 + 2, rMax));
      let [ex, ey] = at(r);
      // rose: further out while the other slices block a horizontal leader
      while (
        o.rose &&
        side * (ex - cx) < clearance(ey, side) &&
        r < r1 + radius
      ) {
        const next = at(r + 3);
        if (!inBounds(next[1])) break;
        r += 3;
        [ex, ey] = next;
      }
      ey = clamp(ey, top, bottom);
      labels.push({
        i,
        side,
        p0: [cx + (r1 + 2) * cos, cy + (r1 + 2) * sin],
        elbow: [ex, ey],
        desired: ey,
        order: Math.atan2(sin, Math.abs(cos)),
        y: ey,
        value: targets[i],
      });
    }

    const placed = [
      ...spreadLabels(
        labels.filter((l) => l.side === 1),
        top,
        bottom,
      ),
      ...spreadLabels(
        labels.filter((l) => l.side === -1),
        top,
        bottom,
      ),
    ];
    for (const l of placed) {
      const { i, side, y } = l;
      const m = (a0s[i] + a1s[i]) / 2;
      const [ex, ey] = l.elbow;
      const reach = Math.max(side * (ex - cx), clearance(y, side));
      const lineEnd = cx + side * (reach + HLEN);
      const textX = lineEnd + side * TGAP;
      const room = side === 1 ? area.x + area.width - textX : textX - area.x;

      // the numbers always, the name shortened (or dropped) to fit
      let segments = segmentsOf(partsOf[i]);
      let width = segmentsWidth(segments);
      if (width > room) {
        const others = segmentsWidth(segments.filter((s) => !s.name));
        const nameRoom = room - others - (segments.length - 1) * PART_GAP;
        // a name cut to one or two letters says nothing: the numbers only
        const shorten = (text: string) => {
          const short =
            nameRoom > 0 ? ellipsize(text, nameRoom, labelFont, measure) : "";
          return short.endsWith("…") && short.length < 4 ? "" : short;
        };
        segments = segments
          .map((s) => (s.name ? { ...s, text: shorten(s.text) } : s))
          .filter((s) => s.text);
        width = segmentsWidth(segments);
        if (!segments.length || width > room + 0.5) continue;
      }

      nodes.push({
        kind: "line",
        // at its own height a label hangs off the radial elbow; moved labels
        // get a bend at their height, clear of the slices, so that the
        // leaders of neighbouring labels do not cross
        points:
          Math.abs(y - ey) < 0.5
            ? [l.p0[0], l.p0[1], ex, ey, lineEnd, y]
            : o.rose
              ? [l.p0[0], l.p0[1], ex, ey, cx + side * reach, y, lineEnd, y]
              : [l.p0[0], l.p0[1], cx + side * reach, y, lineEnd, y],
        color: toCss(colors[i], 0.7),
        width: 1,
        hit: i,
        alpha: labelAlpha,
        shift: shiftOf(m),
      });
      let x = side === 1 ? textX : textX - width;
      segments.forEach((s) => {
        nodes.push({
          kind: "text",
          x,
          y,
          text: s.text,
          font: labelFont,
          color: toCss(s.name ? theme.text : theme.textMuted),
          align: "left",
          baseline: "middle",
          hit: i,
          alpha: labelAlpha,
        });
        x += measure(s.text, labelFont) + PART_GAP;
      });
    }
  }

  if (mode === "inside" && labelAlpha > 0) {
    const insideFont = font(theme, 12, 500);
    const pad = drawnCount > 1 ? padPx : 0;
    for (let i = 0; i < n; i++) {
      const span = a1s[i] - a0s[i];
      const parts = partsOf[i];
      if (!(targets[i] > 0) || span <= 1e-6 || !parts.length) continue;
      const r1 = outer(i);
      const m = (a0s[i] + a1s[i]) / 2;
      const full = span >= TAU - 1e-6;

      /** Whether a w x h box centered at (x, y) stays inside the slice, with padding */
      const fits = (x: number, y: number, w: number, h: number) => {
        for (let gx = 0; gx <= 4; gx++) {
          for (let gy = 0; gy <= 2; gy++) {
            const px = x - w / 2 + (w * gx) / 4 - cx;
            const py = y - h / 2 + (h * gy) / 2 - cy;
            const rho = Math.hypot(px, py);
            if (rho > r1 - INSIDE_PAD) return false;
            if (r0 > 0 && rho < r0 + INSIDE_PAD) return false;
            if (full) continue;
            let d0 = (Math.atan2(py, px) - a0s[i]) % TAU;
            if (d0 < 0) d0 += TAU;
            if (d0 > span) return false;
            const d1 = span - d0;
            const edge = (d: number) =>
              d >= Math.PI / 2 ? rho : rho * Math.sin(d);
            const min = INSIDE_PAD + pad / 2;
            if (edge(d0) < min || edge(d1) < min) return false;
          }
        }
        return true;
      };

      // candidates: everything on one line, on two lines, then fewer parts
      const numbers = parts.filter((p) => !p.name);
      const candidates: Part[][][] = [[parts]];
      if (parts.length > 1)
        candidates.push([parts.slice(0, 1), parts.slice(1)]);
      if (parts.length > 2) candidates.push(parts.map((p) => [p]));
      if (numbers.length && numbers.length < parts.length) {
        candidates.push([numbers]);
        if (numbers.length > 1)
          candidates.push([numbers.slice(0, 1), numbers.slice(1)]);
      }
      if (numbers.length > 1) {
        const main = numbers.find((p) => p.kind === "percent") ?? numbers[0];
        candidates.push([[main]]);
      }

      // radial positions: middle of the ring (donut) or near the centroid (pie)
      const base =
        r0 > 0
          ? (r0 + r1) / 2
          : full
            ? 0
            : clamp(
                (2 * r1 * Math.sin(Math.min(span, Math.PI) / 2)) /
                  ((3 * Math.min(span, Math.PI)) / 2),
                r1 * 0.5,
                r1 * 0.65,
              );
      const step = (r1 - r0) * 0.1;
      const radii = full ? [0] : [base, base + step, base - step];
      let chosen: { lines: string[]; x: number; y: number } | null = null;
      for (const lines of candidates) {
        const texts = lines.map(lineText);
        const w = Math.max(...texts.map((t) => measure(t, insideFont)));
        const h = texts.length * INSIDE_LINE;
        for (const rm of radii) {
          const x = cx + rm * Math.cos(m);
          const y = cy + rm * Math.sin(m);
          if (fits(x, y, w, h)) {
            chosen = { lines: texts, x, y };
            break;
          }
        }
        if (chosen) break;
      }
      if (!chosen) continue;
      const ink = textOn(colors[i]);
      const { lines, x, y } = chosen;
      lines.forEach((text, k) => {
        nodes.push({
          kind: "text",
          x,
          y: y + (k - (lines.length - 1) / 2) * INSIDE_LINE,
          text,
          font: insideFont,
          color: ink,
          align: "center",
          baseline: "middle",
          hit: i,
          alpha: labelAlpha,
          shift: shiftOf(m),
        });
      });
    }
  }

  if (r0 > 12 && (o.centerValue || o.centerLabel)) {
    const size = clamp(r0 * 0.36, 14, 30);
    const valueFont = font(theme, size, 600);
    const centerFont = font(theme, 12);
    const maxW = r0 * 1.6;
    const value = o.centerValue
      ? ellipsize(o.centerValue, maxW, valueFont, measure)
      : "";
    const label = o.centerLabel
      ? ellipsize(o.centerLabel, maxW, centerFont, measure)
      : "";
    const blockH =
      (value ? size : 0) + (value && label ? 4 : 0) + (label ? 14 : 0);
    const top = cy - blockH / 2;
    const alpha = clamp(c.enter * 1.5, 0, 1);
    if (value)
      nodes.push({
        kind: "text",
        x: cx,
        y: top + size / 2,
        text: value,
        font: valueFont,
        color: toCss(theme.text),
        align: "center",
        baseline: "middle",
        alpha,
      });
    if (label)
      nodes.push({
        kind: "text",
        x: cx,
        y: top + (value ? size + 4 : 0) + 7,
        text: label,
        font: centerFont,
        color: toCss(theme.textMuted),
        align: "center",
        baseline: "middle",
        alpha,
      });
  }

  return { nodes, items, dim: 0.5, empty: false };
};
