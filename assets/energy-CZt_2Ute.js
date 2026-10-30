import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`// Energy flows from the sources to the uses through the grid: link
// thickness is the flow, colored from the source to the target.
import type { MinervaSankeyChart } from "minerva-design/web-components/chart";

const NODES = {
  en: [
    "Solar",
    "Wind",
    "Gas",
    "Grid",
    "Homes",
    "Industry",
    "Transport",
    "Losses",
  ],
  zh: ["太阳能", "风能", "天然气", "电网", "居民", "工业", "交通", "损耗"],
  ja: ["太陽光", "風力", "ガス", "送電網", "家庭", "産業", "運輸", "損失"],
  fr: [
    "Solaire",
    "Éolien",
    "Gaz",
    "Réseau",
    "Foyers",
    "Industrie",
    "Transports",
    "Pertes",
  ],
};

// source, target (node indexes), TWh
const LINKS = [
  [0, 3, 32],
  [1, 3, 48],
  [2, 3, 70],
  [3, 4, 52],
  [3, 5, 61],
  [3, 6, 22],
  [3, 7, 15],
];

export function setup(root: HTMLElement) {
  const names =
    NODES[document.documentElement.lang as keyof typeof NODES] ?? NODES.en;
  const chart = root.querySelector<MinervaSankeyChart>("#energy")!;
  chart.nodes = names.map((name) => ({ name }));
  chart.links = LINKS.map(([source, target, value]) => ({
    source,
    target,
    value,
  }));
  chart.options = { format: (value) => \`\${value} TWh\` };
}
`})))()}n();export{t as default};