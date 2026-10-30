// Built-in texts and number formatting of the 3D charts, per language
// (`locale` option, else the page language).

import {
  compactUnits,
  localeLabels,
  numberFormat,
  resolveLocale,
  type LabelDictionary,
} from "../locale";
import { stepDecimals } from "../scale";
import type { Chart3DLabels } from "./types";

export const CHART3D_LABELS: LabelDictionary<Chart3DLabels> = {
  en: {
    chart: "3D chart",
    chartNamed: "3D chart: {names}",
    series: "Series {n}",
    seriesCount: "{count} series.",
    seriesSummary: "{name} ({type}): {size}.",
    seriesSummaryHidden: "{name} ({type}): {size}, hidden.",
    scatter: "scatter",
    line: "line",
    surface: "surface",
    bar: "bar",
    points: "{count} points",
    vertices: "{count} vertices",
    grid: "{rows} × {cols} grid",
    bars: "{count} bars",
    axis: "{axis} axis: {range}.",
    axisTitled: "{axis} axis ({title}): {range}.",
    range: "{min} to {max}",
    listSeparator: ", ",
    shown: "{name}: shown",
    hidden: "{name}: hidden",
    value: "value",
    x: "x",
    y: "y",
    z: "z",
  },
  zh: {
    chart: "3D 图表",
    chartNamed: "3D 图表：{names}",
    series: "系列 {n}",
    seriesCount: "共 {count} 个系列。",
    seriesSummary: "{name}（{type}）：{size}。",
    seriesSummaryHidden: "{name}（{type}）：{size}，已隐藏。",
    scatter: "散点",
    line: "折线",
    surface: "曲面",
    bar: "柱状",
    points: "{count} 个点",
    vertices: "{count} 个顶点",
    grid: "{rows} × {cols} 网格",
    bars: "{count} 根柱",
    axis: "{axis} 轴：{range}。",
    axisTitled: "{axis} 轴（{title}）：{range}。",
    range: "{min} 至 {max}",
    listSeparator: "、",
    shown: "{name}：已显示",
    hidden: "{name}：已隐藏",
    value: "数值",
  },
  ja: {
    chart: "3D チャート",
    chartNamed: "3D チャート：{names}",
    series: "系列 {n}",
    seriesCount: "{count} 系列。",
    seriesSummary: "{name}（{type}）：{size}。",
    seriesSummaryHidden: "{name}（{type}）：{size}、非表示。",
    scatter: "散布図",
    line: "折れ線",
    surface: "曲面",
    bar: "棒",
    points: "{count} 点",
    vertices: "{count} 頂点",
    grid: "{rows} × {cols} グリッド",
    bars: "{count} 本の棒",
    axis: "{axis} 軸：{range}。",
    axisTitled: "{axis} 軸（{title}）：{range}。",
    range: "{min}～{max}",
    listSeparator: "、",
    shown: "{name}：表示",
    hidden: "{name}：非表示",
    value: "値",
  },
  fr: {
    chart: "Graphique 3D",
    chartNamed: "Graphique 3D : {names}",
    series: "Série {n}",
    seriesCount: "Séries : {count}.",
    seriesSummary: "{name} ({type}) : {size}.",
    seriesSummaryHidden: "{name} ({type}) : {size}, masquée.",
    scatter: "nuage de points",
    line: "ligne",
    surface: "surface",
    bar: "barres",
    points: "{count} points",
    vertices: "{count} sommets",
    grid: "grille {rows} × {cols}",
    bars: "{count} barres",
    axis: "Axe {axis} : {range}.",
    axisTitled: "Axe {axis} ({title}) : {range}.",
    range: "de {min} à {max}",
    listSeparator: ", ",
    shown: "{name} : affichée",
    hidden: "{name} : masquée",
    value: "valeur",
  },
};

/** Texts and number formats of one locale */
export interface Locale3D {
  locale: string;
  labels: Chart3DLabels;
  /** Integer counts (`1,000,000`, `1 000 000`…) */
  count: (value: number) => string;
  /** Tooltip value: up to 4 significant decimals, compact above a million */
  value: (value: number) => string;
  /** Formatter of evenly spaced ticks */
  ticks: (step: number, maxAbs: number) => (value: number) => string;
}

/** Replaces the `{key}` placeholders of a template */
export const fill = (
  template: string,
  values: Record<string, string | number>,
): string =>
  template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );

/** `decimals` digits at most (exactly with `fixed`); never prints `-0` */
const plain = (
  locale: string,
  value: number,
  decimals: number,
  fixed = false,
): string => {
  const v = Math.abs(value) < 0.5 * 10 ** -decimals ? 0 : value;
  return numberFormat(locale, {
    minimumFractionDigits: fixed ? decimals : 0,
    maximumFractionDigits: decimals,
  }).format(v);
};

/** `1234567` -> `1.23M` (en), `123.46万` (zh); small values printed plainly */
export const formatCompact3D = (
  locale: string,
  value: number,
  maxDecimals = 2,
): string => {
  if (!Number.isFinite(value)) return String(value);
  if (value === 0) return "0";
  const abs = Math.abs(value);
  for (const [unit, suffix] of compactUnits(locale)) {
    if (abs >= unit) return plain(locale, value / unit, maxDecimals) + suffix;
  }
  if (abs < 1e-4) return value.toExponential(1);
  const decimals = Math.min(6, Math.max(maxDecimals, stepDecimals(abs) + 2));
  return plain(locale, value, decimals);
};

/**
 * Locale of the options: built-in texts of its language completed with
 * English, then the `labels` overrides
 */
export const locale3D = (
  locale?: string,
  overrides?: Partial<Chart3DLabels>,
): Locale3D => {
  const resolved = resolveLocale(locale);
  return {
    locale: resolved,
    labels: localeLabels(CHART3D_LABELS, resolved, overrides),
    count: (value) => numberFormat(resolved).format(value),
    value: (value) => {
      if (!Number.isFinite(value)) return "–";
      const abs = Math.abs(value);
      if (abs >= 1e6) return formatCompact3D(resolved, value, 2);
      if (Number.isInteger(value)) return numberFormat(resolved).format(value);
      if (abs < 1e-4) return value.toExponential(2);
      return plain(resolved, value, abs >= 100 ? 2 : abs >= 1 ? 3 : 4);
    },
    ticks: (step, maxAbs) => {
      if (maxAbs >= 1e4) {
        const unit =
          compactUnits(resolved).find(([u]) => maxAbs >= u)?.[0] ?? 1;
        const decimals = Math.min(3, stepDecimals(step / unit));
        return (value) => formatCompact3D(resolved, value, decimals);
      }
      const decimals = stepDecimals(step);
      return (value) => plain(resolved, value, decimals, true);
    },
  };
};
