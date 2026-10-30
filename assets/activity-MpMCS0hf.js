import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`// Activity rings: each bar has its own \`max\` (the goal), \`sweep="360"\` makes
// full rings and the center texts summarize them.
import type { MinervaRadialBarChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { rings: ["Move", "Exercise", "Stand"], today: "of today’s goals" },
  zh: { rings: ["活动", "锻炼", "站立"], today: "今日目标" },
  ja: { rings: ["ムーブ", "エクササイズ", "スタンド"], today: "今日の目標" },
  fr: {
    rings: ["Bouger", "M’entraîner", "Me lever"],
    today: "des objectifs du jour",
  },
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaRadialBarChart>("#activity")!;
  chart.data = [
    { name: text.rings[0], value: 420, max: 500, color: "#ef4444" },
    { name: text.rings[1], value: 24, max: 30, color: "#22c55e" },
    { name: text.rings[2], value: 9, max: 12, color: "#06b6d4" },
  ];
  chart.centerLabel = text.today;
  chart.options = { labelContent: ["name", "percent"] };
}
`})))()}n();export{t as default};