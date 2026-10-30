// <minerva-chart> takes the engine options as its `options` property: any
// mix of series types (here bars and a line) on shared axes.
import type { MinervaChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    revenue: "Revenue",
    target: "Target",
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  },
  zh: {
    revenue: "收入",
    target: "目标",
    months: ["1月", "2月", "3月", "4月", "5月", "6月"],
  },
  ja: {
    revenue: "売上",
    target: "目標",
    months: ["1月", "2月", "3月", "4月", "5月", "6月"],
  },
  fr: {
    revenue: "Chiffre d'affaires",
    target: "Objectif",
    months: ["janv.", "févr.", "mars", "avr.", "mai", "juin"],
  },
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaChart>("#mixed")!;
  chart.options = {
    series: [
      { name: text.revenue, type: "bar", data: [42, 51, 48, 63, 72, 80] },
      {
        name: text.target,
        type: "line",
        curve: "smooth",
        data: [45, 50, 55, 60, 65, 70],
      },
    ],
    xAxis: { type: "category", categories: text.months },
    yAxis: { format: (value) => `${value}k` },
  };
}
