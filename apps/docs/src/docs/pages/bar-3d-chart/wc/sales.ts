// <minerva-bar-3d-chart>: a bar per region × quarter cell, colored by
// height (`colorBy: "z"`); the axes name the categories.
import type { MinervaBar3DChart } from "minerva-design/web-components/chart-3d";

const TEXT = {
  en: {
    sales: "Sales (k€)",
    regions: ["North", "South", "East", "West"],
    quarters: ["Q1", "Q2", "Q3", "Q4"],
  },
  zh: {
    sales: "销售额（千欧元）",
    regions: ["华北", "华南", "华东", "华西"],
    quarters: ["第一季度", "第二季度", "第三季度", "第四季度"],
  },
  ja: {
    sales: "売上（千ユーロ）",
    regions: ["北部", "南部", "東部", "西部"],
    quarters: ["第 1 四半期", "第 2 四半期", "第 3 四半期", "第 4 四半期"],
  },
  fr: {
    sales: "Ventes (k€)",
    regions: ["Nord", "Sud", "Est", "Ouest"],
    quarters: ["T1", "T2", "T3", "T4"],
  },
};

// sales per region (rows) and quarter (columns), k€
const SALES = [
  [120, 135, 150, 180],
  [90, 110, 105, 130],
  [160, 170, 190, 220],
  [70, 85, 95, 100],
];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaBar3DChart>("#sales")!;
  chart.series = [
    {
      name: text.sales,
      colorBy: "z",
      data: SALES.flatMap((row, i) =>
        row.map((z, j) => ({ x: text.regions[i], y: text.quarters[j], z })),
      ),
    },
  ];
  chart.options = {
    xAxis: { categories: text.regions },
    yAxis: { categories: text.quarters },
    zAxis: { title: text.sales },
  };
}
