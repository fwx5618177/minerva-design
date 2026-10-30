import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`// Tasks grouped by phase (one color and legend entry each), their progress
// drawn over the bars and a milestone as a dot; zoom and pan along the time.
import type { MinervaGanttChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    phases: ["Design", "Build", "Launch"],
    tasks: [
      "Research",
      "Wireframes",
      "Visual design",
      "Frontend",
      "Backend",
      "Testing",
      "Release",
    ],
    progress: "Progress",
    milestones: "Milestones",
  },
  zh: {
    phases: ["设计", "开发", "发布"],
    tasks: ["用户调研", "线框图", "视觉设计", "前端", "后端", "测试", "上线"],
    progress: "进度",
    milestones: "里程碑",
  },
  ja: {
    phases: ["設計", "開発", "リリース"],
    tasks: [
      "リサーチ",
      "ワイヤーフレーム",
      "ビジュアルデザイン",
      "フロントエンド",
      "バックエンド",
      "テスト",
      "公開",
    ],
    progress: "進捗",
    milestones: "マイルストーン",
  },
  fr: {
    phases: ["Conception", "Développement", "Lancement"],
    tasks: [
      "Recherche",
      "Maquettes",
      "Design visuel",
      "Front-end",
      "Back-end",
      "Tests",
      "Mise en ligne",
    ],
    progress: "Avancement",
    milestones: "Jalons",
  },
};

const DAY = 86_400_000;
const START = Date.UTC(2026, 2, 2);
// phase, first day, duration (days), share done
const PLAN = [
  [0, 0, 6, 1],
  [0, 4, 6, 1],
  [0, 8, 8, 0.7],
  [1, 12, 14, 0.4],
  [1, 12, 16, 0.3],
  [2, 26, 6, 0],
];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaGanttChart>("#project")!;
  chart.tasks = [
    ...PLAN.map(([phase, day, days, progress], i) => ({
      name: text.tasks[i],
      group: text.phases[phase],
      start: START + day * DAY,
      end: START + (day + days) * DAY,
      progress,
    })),
    { name: text.tasks[6], start: START + 33 * DAY, milestone: true },
  ];
  chart.progressName = text.progress;
  chart.milestoneName = text.milestones;
}
`})))()}n();export{t as default};