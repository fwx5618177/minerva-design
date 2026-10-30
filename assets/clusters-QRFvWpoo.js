import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`// Points are [x, y] pairs; Ctrl / ⌘ + wheel zooms on both axes.
import type { MinervaScatterChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { teamA: "Team A", teamB: "Team B", hours: "Hours", score: "Score" },
  zh: { teamA: "A 组", teamB: "B 组", hours: "小时", score: "得分" },
  ja: { teamA: "チームA", teamB: "チームB", hours: "時間", score: "スコア" },
  fr: { teamA: "Équipe A", teamB: "Équipe B", hours: "Heures", score: "Score" },
};

// deterministic pseudo-random clusters
const cluster = (cx: number, cy: number, seed: number) =>
  Array.from({ length: 40 }, (_, i): [number, number] => [
    Math.round((cx + 6 * Math.sin(seed + i * 2.3)) * 10) / 10,
    Math.round((cy + 9 * Math.cos(seed + i * 1.7)) * 10) / 10,
  ]);

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaScatterChart>("#clusters")!;
  chart.series = [
    { name: text.teamA, data: cluster(12, 62, 1) },
    { name: text.teamB, data: cluster(26, 80, 4) },
  ];
  chart.options = {
    xAxis: { title: text.hours },
    yAxis: { title: text.score },
  };
}
`})))()}n();export{t as default};