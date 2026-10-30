// Bars and a line on two value axes: the series with `yAxis: "right"` use
// `options.yAxis2` (its ticks are aligned on the left grid).
import type { MinervaMixedChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { revenue: "Revenue (k€)", growth: "Growth" },
  zh: { revenue: "收入（千欧元）", growth: "增长率" },
  ja: { revenue: "売上（千ユーロ）", growth: "成長率" },
  fr: { revenue: "Chiffre d’affaires (k€)", growth: "Croissance" },
};
const MONTHS = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  zh: ["1月", "2月", "3月", "4月", "5月", "6月"],
  ja: ["1月", "2月", "3月", "4月", "5月", "6月"],
  fr: ["janv.", "févr.", "mars", "avr.", "mai", "juin"],
};

const REVENUE = [182, 196, 214, 205, 238, 261];
// month-over-month growth, %
const GROWTH = REVENUE.map((y, i) =>
  i ? Math.round((y / REVENUE[i - 1] - 1) * 1000) / 10 : 0,
);

export function setup(root: HTMLElement) {
  const lang = document.documentElement.lang as keyof typeof TEXT;
  const text = TEXT[lang] ?? TEXT.en;
  const months = MONTHS[lang] ?? MONTHS.en;
  const chart = root.querySelector<MinervaMixedChart>("#revenue")!;
  chart.series = [
    {
      name: text.revenue,
      type: "bar",
      data: REVENUE.map((y, i) => ({ x: months[i], y })),
    },
    {
      name: text.growth,
      type: "line",
      curve: "smooth",
      yAxis: "right",
      data: GROWTH.map((y, i) => ({ x: months[i], y })),
    },
  ];
  chart.options = {
    xAxis: { type: "category" },
    yAxis2: { format: (value) => `${value} %` },
  };
}
