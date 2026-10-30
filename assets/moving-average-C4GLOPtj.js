import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`// A series with \`type: "line"\` is drawn over the candles: a 5-day moving
// average of the closes.
import type { MinervaCandlestickChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { price: "Price", average: "5-day average" },
  zh: { price: "价格", average: "5 日均线" },
  ja: { price: "価格", average: "5日移動平均" },
  fr: { price: "Cours", average: "Moyenne 5 jours" },
};

const candles = Array.from({ length: 40 }, (_, i) => {
  const open = 80 + 0.6 * i + 6 * Math.sin(i / 3);
  const close = open + 4 * Math.sin(i * 1.7);
  return {
    x: i + 1,
    open: Math.round(open * 100) / 100,
    y: Math.round(close * 100) / 100,
    high: Math.round((Math.max(open, close) + 1.5) * 100) / 100,
    low: Math.round((Math.min(open, close) - 1.5) * 100) / 100,
  };
});
const average = candles.map((candle, i) => {
  const window = candles.slice(Math.max(0, i - 4), i + 1);
  const mean = window.reduce((sum, c) => sum + c.y, 0) / window.length;
  return [candle.x, Math.round(mean * 100) / 100] as [number, number];
});

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaCandlestickChart>("#trend")!;
  chart.series = [
    { name: text.price, data: candles },
    { name: text.average, type: "line", curve: "smooth", data: average },
  ];
  chart.options = { yAxis: { zero: false } };
}
`})))()}n();export{t as default};