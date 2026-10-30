import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`// Messages sent between teams in a week, from a square matrix (row: the
// sender, column: the recipient); hovering a team highlights its ribbons.
import type { MinervaChordChart } from "minerva-design/web-components/chart";

const TEAMS = {
  en: ["Design", "Engineering", "Product", "Marketing"],
  zh: ["设计", "研发", "产品", "市场"],
  ja: ["デザイン", "エンジニアリング", "プロダクト", "マーケティング"],
  fr: ["Design", "Ingénierie", "Produit", "Marketing"],
};
const MATRIX = [
  [0, 42, 28, 14],
  [36, 0, 54, 8],
  [30, 48, 0, 22],
  [12, 6, 26, 0],
];

export function setup(root: HTMLElement) {
  const chart = root.querySelector<MinervaChordChart>("#teams")!;
  chart.groups =
    TEAMS[document.documentElement.lang as keyof typeof TEAMS] ?? TEAMS.en;
  chart.matrix = MATRIX;
}
`})))()}n();export{t as default};