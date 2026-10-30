// A profit and loss bridge: changes float from the running total,
// `subtotal` / `total` steps start from zero; the values are written on the bars.
import type { MinervaWaterfallChart } from "minerva-design/web-components/chart";

const STEPS = {
  en: [
    "Revenue",
    "Cost of sales",
    "Gross profit",
    "Operating costs",
    "Other income",
    "Taxes",
    "Net income",
  ],
  zh: [
    "营业收入",
    "销售成本",
    "毛利润",
    "运营费用",
    "其他收入",
    "税费",
    "净利润",
  ],
  ja: [
    "売上高",
    "売上原価",
    "売上総利益",
    "営業費用",
    "その他収益",
    "税金",
    "純利益",
  ],
  fr: [
    "Chiffre d’affaires",
    "Coût des ventes",
    "Marge brute",
    "Charges d’exploitation",
    "Autres produits",
    "Impôts",
    "Résultat net",
  ],
};

export function setup(root: HTMLElement) {
  const steps =
    STEPS[document.documentElement.lang as keyof typeof STEPS] ?? STEPS.en;
  const chart = root.querySelector<MinervaWaterfallChart>("#pnl")!;
  chart.steps = [
    { label: steps[0], value: 420 },
    { label: steps[1], value: -180 },
    { label: steps[2], kind: "subtotal" },
    { label: steps[3], value: -130 },
    { label: steps[4], value: 25 },
    { label: steps[5], value: -34 },
    { label: steps[6], kind: "total" },
  ];
  chart.format = (value) => `${value} k€`;
}
