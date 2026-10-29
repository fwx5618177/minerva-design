// Funnel layout: centered trapezoids (or bars) narrowing to the next stage,
// labels inside (or beside when too narrow), conversion rates between stages.

import { toCss } from "../color";
import { font } from "../overlay";
import {
  clamp,
  ellipsize,
  emptyLayout,
  finite,
  positive,
  textOn,
  uniqueKeys,
  type LayoutContext,
  type LayoutResult,
  type ShapeItem,
  type ShapeNode,
  type ShapeTooltipRow,
} from "./scene";
import type { FunnelChartOptions } from "./types";

const keysOf = (o: FunnelChartOptions) => uniqueKeys(o.data.map((d) => d.name));

export const funnelValues = (
  o: FunnelChartOptions,
  hidden: ReadonlySet<number>,
  out: Map<string, number>,
) => {
  keysOf(o).forEach((key, i) => {
    out.set(key, hidden.has(i) ? 0 : positive(o.data[i].value));
  });
};

/** Data indexes of the visible stages, top to bottom */
export const funnelOrder = (
  o: FunnelChartOptions,
  hidden: ReadonlySet<number>,
): number[] => {
  const order = o.data.map((_, i) => i).filter((i) => !hidden.has(i));
  const v = (i: number) => positive(o.data[i].value);
  if (o.sort === "descending") order.sort((a, b) => v(b) - v(a));
  else if (o.sort === "ascending") order.sort((a, b) => v(a) - v(b));
  return order;
};

export const layoutFunnel = (
  o: FunnelChartOptions,
  c: LayoutContext,
): LayoutResult => {
  const { theme, area, measure, hidden } = c;
  const keys = keysOf(o);
  const order = funnelOrder(o, hidden);
  const targets = order.map((i) => positive(o.data[i].value));
  if (!order.length || targets.every((v) => v <= 0)) return emptyLayout(c);

  const n = order.length;
  const gap = Math.max(0, finite(o.gap, 4));
  const bar = o.shape === "bar";
  const nameFont = font(theme, 12, 500);
  const valueFont = font(theme, 12);
  const smallFont = font(theme, 11);
  const stageH = Math.max(1, (area.height - gap * (n - 1)) / n);
  const shown = order.map((i, k) => Math.max(0, c.value(keys[i], targets[k])));
  const vmax = Math.max(...shown) || 1;
  const first = targets[0];
  const narrowing = n < 2 || shown[n - 2] >= shown[n - 1];

  // texts
  const names = order.map((i) => o.data[i].name);
  const valueTexts = targets.map((v) => c.format(v));
  const nameWs = names.map((s) => measure(s, nameFont));
  const valueWs = valueTexts.map((s) => measure(s, valueFont));
  const rates = targets.map((v, k) =>
    k > 0 ? (targets[k - 1] > 0 ? v / targets[k - 1] : 0) : 1,
  );
  const showConversion = o.conversion !== false;
  const convTexts = rates.map((r, k) => (k ? `↓ ${c.percent(r)}` : ""));
  const convWs = convTexts.map((s) => (s ? measure(s, smallFont) : 0));

  /** Widths of the stages (top, bottom) for a widest stage of `maxW` */
  const shapeOf = (maxW: number) => {
    const tops = shown.map((v) => Math.max(2, (maxW * v) / vmax));
    const bottoms = tops.map((wt, k) =>
      bar ? wt : k < n - 1 ? tops[k + 1] : narrowing ? wt * 0.72 : wt,
    );
    return { tops, bottoms };
  };
  /** Width of stage `k` at `dy` pixels below its top */
  const widthAt = (
    s: ReturnType<typeof shapeOf>,
    k: number,
    dy: number,
  ): number =>
    s.tops[k] + ((s.bottoms[k] - s.tops[k]) * clamp(dy, 0, stageH)) / stageH;

  const LINE = 16;
  const PAD = 10;
  const NAME_GAP = 8;
  type Placement =
    | { kind: "inline" }
    | { kind: "stacked" }
    | { kind: "outside"; half: number }
    | { kind: "none" };
  /** Inside on one line, on two lines, else beside the stage (left) */
  const placementOf = (s: ReturnType<typeof shapeOf>, k: number): Placement => {
    if (stageH < 10) return { kind: "none" };
    const mid = stageH / 2;
    // the narrowest width over the text's height (the bottom for narrowing stages)
    const inner = (h: number) =>
      Math.min(widthAt(s, k, mid - h / 2), widthAt(s, k, mid + h / 2));
    if (
      stageH >= 18 &&
      nameWs[k] + NAME_GAP + valueWs[k] + 2 * PAD <= inner(LINE)
    )
      return { kind: "inline" };
    if (
      stageH >= 2 * LINE + 6 &&
      Math.max(nameWs[k], valueWs[k]) + 2 * PAD <= inner(2 * LINE)
    )
      return { kind: "stacked" };
    const half =
      Math.max(widthAt(s, k, mid - LINE / 2), widthAt(s, k, mid + LINE / 2)) /
      2;
    return { kind: "outside", half };
  };
  const outsideWidth = (k: number) => nameWs[k] + 6 + valueWs[k];

  // largest funnel leaving room for the outside labels (left) and the
  // conversion rates (right); centered when the margins allow it
  const right = area.x + area.width;
  let maxW = Math.max(20, area.width * 0.78);
  const minW = Math.max(20, area.width * 0.35);
  let shape = shapeOf(maxW);
  let places: Placement[] = [];
  let cx = area.x + area.width / 2;
  for (;;) {
    shape = shapeOf(maxW);
    places = order.map((_, k) => placementOf(shape, k));
    let reqL = maxW / 2;
    let reqR = maxW / 2;
    places.forEach((p, k) => {
      if (p.kind === "outside")
        reqL = Math.max(reqL, p.half + 10 + outsideWidth(k));
      if (showConversion && k > 0) {
        const boundary = bar
          ? Math.max(shape.tops[k - 1], shape.tops[k])
          : shape.tops[k];
        reqR = Math.max(reqR, boundary / 2 + 10 + convWs[k]);
      }
    });
    if (reqL + reqR <= area.width || maxW <= minW) {
      const center = area.x + area.width / 2;
      cx =
        reqL + reqR <= area.width
          ? clamp(center, area.x + reqL, right - reqR)
          : area.x + Math.max(maxW / 2, area.width - reqR);
      break;
    }
    maxW = Math.max(minW, maxW * 0.92);
  }
  const widths = shape.tops;

  const nodes: ShapeNode[] = [];
  const labels: ShapeNode[] = [];
  const items: ShapeItem[] = [];
  order.forEach((i, k) => {
    const datum = o.data[i];
    const color = c.color(datum.color, i);
    const css = toCss(color);
    const y = area.y + k * (stageH + gap);
    const wt = widths[k];
    const wb = shape.bottoms[k];
    if (bar) {
      nodes.push({
        kind: "rect",
        x: cx - wt / 2,
        y,
        width: wt,
        height: stageH,
        radius: Math.min(4, stageH / 2, wt / 2),
        fill: css,
        hit: i,
        brighten: true,
      });
    } else {
      nodes.push({
        kind: "polygon",
        points: [
          cx - wt / 2,
          y,
          cx + wt / 2,
          y,
          cx + wb / 2,
          y + stageH,
          cx - wb / 2,
          y + stageH,
        ],
        fill: css,
        radius: Math.min(3, stageH / 3),
        hit: i,
        brighten: true,
      });
    }

    const midY = y + stageH / 2;
    const place = places[k];
    const ink = textOn(color);
    const text = (
      x: number,
      ty: number,
      value: string,
      f: string,
      textColor: string,
      align: "left" | "center" | "right",
    ): ShapeNode => ({
      kind: "text",
      x,
      y: ty,
      text: value,
      font: f,
      color: textColor,
      align,
      baseline: "middle",
      hit: i,
    });
    if (place.kind === "inline") {
      const x0 = cx - (nameWs[k] + NAME_GAP + valueWs[k]) / 2;
      labels.push(
        text(x0, midY, names[k], nameFont, ink, "left"),
        text(
          x0 + nameWs[k] + NAME_GAP,
          midY,
          valueTexts[k],
          valueFont,
          ink,
          "left",
        ),
      );
    } else if (place.kind === "stacked") {
      labels.push(
        text(cx, midY - LINE / 2, names[k], nameFont, ink, "center"),
        text(cx, midY + LINE / 2, valueTexts[k], valueFont, ink, "center"),
      );
    } else if (place.kind === "outside") {
      // beside the stage: the value always, the name shortened if needed
      const x = cx - place.half - 10;
      const room = x - area.x;
      const vw = valueWs[k];
      if (vw <= room) {
        labels.push(
          text(
            x,
            midY,
            valueTexts[k],
            valueFont,
            toCss(theme.textMuted),
            "right",
          ),
        );
        const name = ellipsize(names[k], room - vw - 6, nameFont, measure);
        if (name)
          labels.push(
            text(x - vw - 6, midY, name, nameFont, toCss(theme.text), "right"),
          );
      }
    }

    const percent = first > 0 ? targets[k] / first : 0;
    const rows: ShapeTooltipRow[] = [
      { name: "Value", value: valueTexts[k] },
      { name: "Of first stage", value: c.percent(percent) },
    ];
    if (k > 0) {
      rows.push({ name: "Conversion", value: c.percent(rates[k]) });
      if (showConversion) {
        const boundary = bar ? Math.max(widths[k - 1], wt) : wt;
        labels.push({
          kind: "text",
          x: cx + boundary / 2 + 10,
          y: y - gap / 2,
          text: convTexts[k],
          font: smallFont,
          color: toCss(theme.textMuted),
          align: "left",
          baseline: "middle",
        });
      }
    }
    items.push({
      index: i,
      name: datum.name,
      value: targets[k],
      percent,
      share: c.percent(percent),
      color: css,
      x: cx,
      y: midY,
      rows,
    });
  });
  nodes.push(...labels);

  const enter = clamp(c.enter, 0, 1);
  return {
    nodes,
    items,
    dim: 0.5,
    empty: false,
    ...(enter < 1
      ? {
          enter: {
            alpha: enter,
            scale: 0.94 + 0.06 * enter,
            cx,
            cy: area.y + area.height / 2,
          },
        }
      : {}),
  };
};
