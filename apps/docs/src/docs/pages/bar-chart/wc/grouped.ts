// Series are grouped side by side; `labels` writes the value of every bar.
import type { MinervaBarChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    lastYear: "2024",
    thisYear: "2025",
    regions: ["North", "South", "East", "West"],
  },
  zh: {
    lastYear: "2024 年",
    thisYear: "2025 年",
    regions: ["华北", "华南", "华东", "西部"],
  },
  ja: {
    lastYear: "2024年",
    thisYear: "2025年",
    regions: ["北部", "南部", "東部", "西部"],
  },
  fr: {
    lastYear: "2024",
    thisYear: "2025",
    regions: ["Nord", "Sud", "Est", "Ouest"],
  },
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaBarChart>("#sales")!;
  chart.series = [
    { name: text.lastYear, data: [38, 52, 61, 45] },
    { name: text.thisYear, data: [44, 58, 72, 49] },
  ];
  chart.options = { xAxis: { type: "category", categories: text.regions } };
}
