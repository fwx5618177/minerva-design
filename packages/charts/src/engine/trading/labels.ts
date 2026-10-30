// Built-in texts of the trading chart, per language (see ../locale.ts).

import type { LabelDictionary } from "../locale";
import type { TradingChartLabels } from "./types";

/** Every text of the chart but the timeframe (taken from the options) */
export type TradingTexts = Required<Omit<TradingChartLabels, "timeframe">>;

export const TRADING_LABELS: LabelDictionary<TradingTexts> = {
  en: {
    open: "O",
    high: "H",
    low: "L",
    close: "C",
    change: "",
    volume: "Vol",
    limit: "Limit",
    position: "Position",
    takeProfit: "TP",
    stopLoss: "SL",
    alert: "Alert",
    scrollToRealtime: "Scroll to the latest bar",
    toggleIndicator: "Show or hide {name}",
    bars: "{count} bars",
    days: "{count}d",
    hours: "{count}h",
    minutes: "{count}m",
    chart: "{symbol} price chart",
    announcement: "{time}: open {open}, high {high}, low {low}, close {close}",
  },
  zh: {
    open: "开",
    high: "高",
    low: "低",
    close: "收",
    change: "涨跌幅",
    volume: "成交量",
    limit: "限价",
    position: "持仓",
    takeProfit: "止盈",
    stopLoss: "止损",
    alert: "预警",
    scrollToRealtime: "回到最新 K 线",
    toggleIndicator: "显示或隐藏 {name}",
    bars: "{count} 根 K 线",
    days: "{count}天",
    hours: "{count}小时",
    minutes: "{count}分",
    chart: "{symbol} 价格图表",
    announcement: "{time}：开盘 {open}，最高 {high}，最低 {low}，收盘 {close}",
  },
  ja: {
    open: "始",
    high: "高",
    low: "安",
    close: "終",
    change: "騰落率",
    volume: "出来高",
    limit: "指値",
    position: "建玉",
    takeProfit: "利確",
    stopLoss: "損切",
    alert: "アラート",
    scrollToRealtime: "最新の足へ移動",
    toggleIndicator: "{name} の表示を切り替え",
    bars: "{count} 本",
    days: "{count}日",
    hours: "{count}時間",
    minutes: "{count}分",
    chart: "{symbol} 価格チャート",
    announcement: "{time}：始値 {open}、高値 {high}、安値 {low}、終値 {close}",
  },
  fr: {
    open: "O",
    high: "H",
    low: "B",
    close: "C",
    change: "Var.",
    volume: "Vol",
    limit: "Limite",
    position: "Position",
    takeProfit: "TP",
    stopLoss: "SL",
    alert: "Alerte",
    scrollToRealtime: "Revenir à la dernière bougie",
    toggleIndicator: "Afficher ou masquer {name}",
    bars: "{count} barres",
    days: "{count} j",
    hours: "{count} h",
    minutes: "{count} min",
    chart: "Graphique de cours {symbol}",
    announcement:
      "{time} : ouverture {open}, plus haut {high}, plus bas {low}, clôture {close}",
  },
};

/** `"{count} bars"` -> `"24 bars"` */
export const fill = (
  template: string,
  values: Record<string, string | number>,
): string =>
  template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
