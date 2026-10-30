// Language of the shape charts: built-in texts (tooltip rows, accessible
// names, "No data") and locale-aware number / percent formatting. The locale
// is resolved on every layout, so a page language switch followed by a
// re-render updates the texts.

import {
  compactUnits,
  localeLabels,
  numberFormat,
  resolveLocale,
  type LabelDictionary,
} from "../locale";
import type { ShapeChartLabels, ShapeChartOptions } from "./types";

export const SHAPE_LABELS: LabelDictionary<ShapeChartLabels> = {
  en: {
    noData: "No data",
    value: "Value",
    share: "Share",
    ofFirstStage: "Of first stage",
    conversion: "Conversion",
    ofRange: "Of range",
    ofName: "Of {name}",
    incoming: "Incoming",
    outgoing: "Outgoing",
    max: "Max",
    progress: "Progress",
    target: "Target",
    ofTarget: "Of target",
    range: "Range",
    reverse: "Reverse",
    series: "Series {index}",
    pieChart: "Pie chart",
    donutChart: "Donut chart",
    roseChart: "Rose chart",
    radarChart: "Radar chart",
    gaugeChart: "Gauge",
    gaugeChartNamed: "Gauge: {label}",
    funnelChart: "Funnel chart",
    treemapChart: "Treemap",
    sankeyChart: "Sankey diagram",
    sunburstChart: "Sunburst chart",
    radialBarChart: "Radial bar chart",
    calendarHeatmap: "Calendar heatmap",
    bulletChart: "Bullet chart",
    chordChart: "Chord diagram",
  },
  zh: {
    noData: "暂无数据",
    value: "数值",
    share: "占比",
    ofFirstStage: "占首阶段",
    conversion: "转化率",
    ofRange: "占量程",
    ofName: "占{name}",
    incoming: "流入",
    outgoing: "流出",
    max: "最大值",
    progress: "进度",
    target: "目标",
    ofTarget: "目标达成",
    range: "区间",
    reverse: "反向",
    series: "系列 {index}",
    pieChart: "饼图",
    donutChart: "环形图",
    roseChart: "玫瑰图",
    radarChart: "雷达图",
    gaugeChart: "仪表盘",
    gaugeChartNamed: "仪表盘：{label}",
    funnelChart: "漏斗图",
    treemapChart: "矩形树图",
    sankeyChart: "桑基图",
    sunburstChart: "旭日图",
    radialBarChart: "径向条形图",
    calendarHeatmap: "日历热力图",
    bulletChart: "子弹图",
    chordChart: "弦图",
  },
  ja: {
    noData: "データなし",
    value: "値",
    share: "割合",
    ofFirstStage: "初段階比",
    conversion: "転換率",
    ofRange: "範囲比",
    ofName: "{name}比",
    incoming: "流入",
    outgoing: "流出",
    max: "最大",
    progress: "進捗",
    target: "目標",
    ofTarget: "目標達成率",
    range: "範囲",
    reverse: "逆方向",
    series: "系列 {index}",
    pieChart: "円グラフ",
    donutChart: "ドーナツグラフ",
    roseChart: "鶏頭図",
    radarChart: "レーダーチャート",
    gaugeChart: "ゲージ",
    gaugeChartNamed: "ゲージ：{label}",
    funnelChart: "ファネルチャート",
    treemapChart: "ツリーマップ",
    sankeyChart: "サンキー図",
    sunburstChart: "サンバースト図",
    radialBarChart: "円形棒グラフ",
    calendarHeatmap: "カレンダーヒートマップ",
    bulletChart: "ブレットグラフ",
    chordChart: "コードダイアグラム",
  },
  fr: {
    noData: "Aucune donnée",
    value: "Valeur",
    share: "Part",
    ofFirstStage: "Part de la 1re étape",
    conversion: "Conversion",
    ofRange: "Part de la plage",
    ofName: "Part de {name}",
    incoming: "Entrées",
    outgoing: "Sorties",
    max: "Max",
    progress: "Progression",
    target: "Objectif",
    ofTarget: "Atteinte de l’objectif",
    range: "Plage",
    reverse: "Sens inverse",
    series: "Série {index}",
    pieChart: "Graphique circulaire",
    donutChart: "Graphique en anneau",
    roseChart: "Diagramme de Nightingale",
    radarChart: "Graphique radar",
    gaugeChart: "Jauge",
    gaugeChartNamed: "Jauge : {label}",
    funnelChart: "Graphique en entonnoir",
    treemapChart: "Treemap",
    sankeyChart: "Diagramme de Sankey",
    sunburstChart: "Diagramme en rayons de soleil",
    radialBarChart: "Graphique à barres radiales",
    calendarHeatmap: "Calendrier thermique",
    bulletChart: "Graphique à puces",
    chordChart: "Diagramme d’accords",
  },
};

/** Texts of a chart: its `locale` (the page language by default) and `texts` overrides */
export const shapeLabels = (
  o: Pick<ShapeChartOptions, "locale" | "texts">,
): ShapeChartLabels => localeLabels(SHAPE_LABELS, o.locale, o.texts);

/** Replaces the `{key}` placeholders of a text */
export const interpolate = (
  template: string,
  values: Record<string, string | number>,
): string =>
  template.replace(/\{(\w+)\}/g, (all, key: string) =>
    key in values ? String(values[key]) : all,
  );

/**
 * Compact number of a locale: `1.23k` / `12.3万` / `1,2 k`; small values
 * keep enough decimals to be told apart
 */
export const localeFormat = (locale?: string) => {
  const tag = resolveLocale(locale);
  const units = compactUnits(tag);
  return (value: number): string => {
    if (!Number.isFinite(value)) return String(value);
    if (Object.is(value, -0) || value === 0) return "0";
    const abs = Math.abs(value);
    for (const [unit, suffix] of units)
      if (abs >= unit)
        return (
          numberFormat(tag, { maximumFractionDigits: 2 }).format(value / unit) +
          suffix
        );
    if (abs < 1e-4) return value.toExponential(1);
    // at least two decimals, two more than the magnitude (0.0123, 1.25)
    const magnitude = Math.floor(Math.log10(abs) + 1e-9);
    const decimals = Math.min(6, Math.max(0, -magnitude) + 2);
    return numberFormat(tag, { maximumFractionDigits: decimals }).format(value);
  };
};

/** Share 0-1 as a locale percent with one decimal: `40.0%`, `40,0 %` */
export const localePercent = (locale?: string) => {
  const tag = resolveLocale(locale);
  return (share: number): string =>
    Number.isFinite(share)
      ? numberFormat(tag, {
          style: "percent",
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        }).format(share)
      : "–";
};
