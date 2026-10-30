// `stacked` piles the areas up; the curve is smooth by default.
import type { MinervaAreaChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    organic: "Organic",
    paid: "Paid",
    referral: "Referral",
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  },
  zh: {
    organic: "自然流量",
    paid: "付费流量",
    referral: "推荐流量",
    months: ["1月", "2月", "3月", "4月", "5月", "6月"],
  },
  ja: {
    organic: "オーガニック",
    paid: "有料",
    referral: "参照元",
    months: ["1月", "2月", "3月", "4月", "5月", "6月"],
  },
  fr: {
    organic: "Naturel",
    paid: "Payant",
    referral: "Référents",
    months: ["janv.", "févr.", "mars", "avr.", "mai", "juin"],
  },
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaAreaChart>("#traffic")!;
  chart.series = [
    { name: text.organic, data: [320, 332, 301, 334, 390, 430] },
    { name: text.paid, data: [120, 132, 101, 134, 190, 230] },
    { name: text.referral, data: [60, 72, 71, 74, 90, 110] },
  ];
  chart.options = { xAxis: { type: "category", categories: text.months } };
}
