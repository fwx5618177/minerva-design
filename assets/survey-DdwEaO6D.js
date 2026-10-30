import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`// \`stacked percent\`: every row adds up to 100 %, a survey answered on a
// three-point scale; the legend toggles an answer.
import type { MinervaHorizontalBarChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    answers: ["Agree", "Neutral", "Disagree"],
    questions: [
      "Easy to set up",
      "Good documentation",
      "Fast enough",
      "Would recommend",
    ],
  },
  zh: {
    answers: ["同意", "中立", "不同意"],
    questions: ["易于上手", "文档完善", "速度够快", "愿意推荐"],
  },
  ja: {
    answers: ["そう思う", "どちらでもない", "そう思わない"],
    questions: [
      "導入が簡単",
      "ドキュメントが充実",
      "十分に速い",
      "人に勧めたい",
    ],
  },
  fr: {
    answers: ["D’accord", "Neutre", "Pas d’accord"],
    questions: [
      "Facile à installer",
      "Bonne documentation",
      "Assez rapide",
      "Je recommande",
    ],
  },
};

// answers per question: agree, neutral, disagree
const ANSWERS = [
  [72, 18, 10],
  [58, 27, 15],
  [64, 21, 15],
  [81, 12, 7],
];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaHorizontalBarChart>("#survey")!;
  chart.series = text.answers.map((name, k) => ({
    name,
    data: text.questions.map((x, i) => ({ x, y: ANSWERS[i][k] })),
  }));
  chart.options = {
    xAxis: { type: "category" },
    palette: [
      "var(--success-color, #16a34a)",
      "var(--text-secondary-color, #9ca3af)",
      "var(--danger-color, #dc2626)",
    ],
  };
}
`})))()}n();export{t as default};