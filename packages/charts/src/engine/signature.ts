// Signature of what the render items (GPU buffers) of a model depend on:
// when it is unchanged, the items of the previous model can be kept.

import type { ChartModel } from "./model";

const ids = new WeakMap<object, number>();
let counter = 0;

/** Stable id of an object (data columns compare by identity) */
const idOf = (value: object): number => {
  let id = ids.get(value);
  if (id === undefined) ids.set(value, (id = ++counter));
  return id;
};

/**
 * Every input of `buildItems` (and of the origin of its positions): data
 * identity, types, colors, visibility, widths, bar layout, stacks, curves,
 * radii, candlestick and heatmap colors. `themeKey` covers the colors resolved
 * from the theme that the model doesn't spell out (per-point colors);
 * `stackOf` gives the `stack` option of a series.
 */
export const itemsSignature = (
  model: ChartModel,
  themeKey: number | string,
  stackOf: (index: number) => string | undefined,
): string => {
  const { base } = model;
  let signature = `${themeKey}|${model.baseline}|${model.percent}|${base.x[0]},${base.x[1]}|${base.y[0]},${base.y[1]}`;
  for (const s of model.series) {
    signature += `\n${s.key}|${s.type}|${idOf(s.cols)}|${s.colorCss}|${s.hidden}|${s.lineWidth}|${s.pointSize}|${s.opacity}|${s.barOffset}|${s.barHalfWidth}|${stackOf(s.index) ?? ""}|${s.curve}|${s.radius}`;
    if (s.type === "candlestick") signature += `|${s.upColor}/${s.downColor}`;
    else if (s.type === "heatmap")
      signature += `|${s.colorScale.join(";")}/${s.valueRange[0]},${s.valueRange[1]}/${s.cellHalf.x},${s.cellHalf.y}`;
  }
  return signature;
};
