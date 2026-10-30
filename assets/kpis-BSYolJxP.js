import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`// One row per KPI: the bar is the value, the marker the target, the gray
// bands qualitative ranges (named by \`rangeLabels\` in the tooltip).
import type { MinervaBulletChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    kpis: ["Revenue (k€)", "Profit (%)", "Orders", "Satisfaction"],
    ranges: ["Poor", "Fair", "Good"],
  },
  zh: {
    kpis: ["营收（千欧元）", "利润率（%）", "订单数", "满意度"],
    ranges: ["差", "一般", "良好"],
  },
  ja: {
    kpis: ["売上（千ユーロ）", "利益率（%）", "注文数", "満足度"],
    ranges: ["不良", "普通", "良好"],
  },
  fr: {
    kpis: ["Chiffre d’affaires (k€)", "Marge (%)", "Commandes", "Satisfaction"],
    ranges: ["Faible", "Correct", "Bon"],
  },
};

// value, target, upper bounds of the ranges
const KPIS = [
  [270, 250, [150, 225, 300]],
  [22.5, 26, [20, 25, 30]],
  [1650, 2100, [1000, 2000, 2500]],
  [4.4, 4.5, [3.5, 4.25, 5]],
] as const;

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaBulletChart>("#kpis")!;
  chart.data = KPIS.map(([value, target, ranges], i) => ({
    name: text.kpis[i],
    value,
    target,
    ranges,
  }));
  chart.rangeLabels = text.ranges;
}
`})))()}n();export{t as default};