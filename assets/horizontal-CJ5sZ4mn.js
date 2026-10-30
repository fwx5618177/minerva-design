import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`// \`orientation="horizontal"\` lays the boxes out in rows; \`whisker="minmax"\`
// extends the whiskers to the extremes (no outliers).
import type { MinervaBoxPlotChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { score: "Score", classes: ["Class A", "Class B", "Class C"] },
  zh: { score: "分数", classes: ["一班", "二班", "三班"] },
  ja: { score: "得点", classes: ["A 組", "B 組", "C 組"] },
  fr: { score: "Note", classes: ["Classe A", "Classe B", "Classe C"] },
};

const SCORES = [
  [55, 61, 64, 68, 70, 72, 75, 78, 81, 86, 92],
  [40, 52, 58, 63, 66, 71, 73, 77, 84, 95],
  [62, 66, 69, 70, 72, 74, 75, 77, 79, 83],
];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaBoxPlotChart>("#scores")!;
  chart.groups = text.classes.map((x, i) => ({ x, values: SCORES[i] }));
  chart.valueName = text.score;
  chart.options = { xAxis: { type: "category" }, yAxis: { min: 0, max: 100 } };
}
`})))()}n();export{t as default};