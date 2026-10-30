// Built-in texts of the cartesian engine (tooltip rows, accessible names).

import { localeLabels, type LabelDictionary } from "./locale";
import type { ChartLabels } from "./types";

export const CHART_LABELS: LabelDictionary<ChartLabels> = {
  en: {
    open: "Open",
    high: "High",
    low: "Low",
    close: "Close",
    max: "Max",
    q3: "Q3",
    median: "Median",
    q1: "Q1",
    min: "Min",
    outliers: "Outliers",
    value: "Value",
    x: "x",
    y: "y",
    series: "Series",
    chart: "Chart",
    chartOf: "Chart: {series}",
    start: "Start",
    end: "End",
    duration: "Duration",
    progress: "Progress",
    dependencies: "Depends on",
    outlier: "Outlier",
  },
  zh: {
    open: "开盘",
    high: "最高",
    low: "最低",
    close: "收盘",
    max: "最大值",
    q3: "上四分位",
    median: "中位数",
    q1: "下四分位",
    min: "最小值",
    outliers: "异常值",
    value: "数值",
    series: "系列",
    chart: "图表",
    chartOf: "图表：{series}",
    start: "开始",
    end: "结束",
    duration: "时长",
    progress: "进度",
    dependencies: "前置任务",
    outlier: "异常值",
  },
  ja: {
    open: "始値",
    high: "高値",
    low: "安値",
    close: "終値",
    max: "最大値",
    q3: "第3四分位",
    median: "中央値",
    q1: "第1四分位",
    min: "最小値",
    outliers: "外れ値",
    value: "値",
    series: "系列",
    chart: "グラフ",
    chartOf: "グラフ：{series}",
    start: "開始",
    end: "終了",
    duration: "期間",
    progress: "進捗",
    dependencies: "先行タスク",
    outlier: "外れ値",
  },
  fr: {
    open: "Ouverture",
    high: "Plus haut",
    low: "Plus bas",
    close: "Clôture",
    max: "Max",
    q3: "Q3",
    median: "Médiane",
    q1: "Q1",
    min: "Min",
    outliers: "Valeurs aberrantes",
    value: "Valeur",
    series: "Série",
    chart: "Graphique",
    chartOf: "Graphique : {series}",
    start: "Début",
    end: "Fin",
    duration: "Durée",
    progress: "Avancement",
    dependencies: "Dépend de",
    outlier: "Valeur aberrante",
  },
};

/** Texts of a locale with the overrides */
export const chartLabels = (
  locale: string,
  overrides?: Partial<ChartLabels>,
): ChartLabels => localeLabels(CHART_LABELS, locale, overrides);

/** Separator of the list of series names in accessible names */
const listSeparator = (locale: string) =>
  /^(zh|ja)\b/i.test(locale) ? "、" : ", ";

/** Default accessible name of a chart model: "Chart: Revenue, Costs" */
export const chartAriaLabel = (model: {
  labels: ChartLabels;
  locale: string;
  series: readonly { name: string }[];
}): string =>
  model.series.length
    ? model.labels.chartOf.replace(
        "{series}",
        model.series.map((s) => s.name).join(listSeparator(model.locale)),
      )
    : model.labels.chart;
