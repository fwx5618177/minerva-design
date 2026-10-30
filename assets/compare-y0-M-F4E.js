import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`// One polygon per series, one value per indicator (axes clockwise from 12
// o'clock); the legend hides / shows a series.
import type { MinervaRadarChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    current: "Current model",
    next: "Next model",
    axes: ["Speed", "Reliability", "Comfort", "Safety", "Efficiency"],
  },
  zh: {
    current: "当前型号",
    next: "新型号",
    axes: ["速度", "可靠性", "舒适性", "安全性", "能效"],
  },
  ja: {
    current: "現行モデル",
    next: "次期モデル",
    axes: ["速度", "信頼性", "快適性", "安全性", "効率"],
  },
  fr: {
    current: "Modèle actuel",
    next: "Nouveau modèle",
    axes: ["Vitesse", "Fiabilité", "Confort", "Sécurité", "Efficacité"],
  },
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaRadarChart>("#products")!;
  chart.indicators = text.axes.map((name) => ({ name, max: 100 }));
  chart.series = [
    { name: text.current, values: [72, 85, 64, 90, 58] },
    { name: text.next, values: [88, 80, 78, 92, 81] },
  ];
}
`})))()}n();export{t as default};