// A diverging color scale over a fixed value range (-1 to 1): negative
// correlations in blue, positive ones in red.
import type { MinervaHeatmapChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    correlation: "Correlation",
    metrics: ["Price", "Rating", "Delivery", "Returns", "Sales"],
  },
  zh: {
    correlation: "相关系数",
    metrics: ["价格", "评分", "配送", "退货", "销量"],
  },
  ja: {
    correlation: "相関係数",
    metrics: ["価格", "評価", "配送", "返品", "売上"],
  },
  fr: {
    correlation: "Corrélation",
    metrics: ["Prix", "Note", "Livraison", "Retours", "Ventes"],
  },
};

const MATRIX = [
  [1, -0.32, 0.12, 0.41, -0.58],
  [-0.32, 1, -0.44, -0.61, 0.72],
  [0.12, -0.44, 1, 0.35, -0.27],
  [0.41, -0.61, 0.35, 1, -0.49],
  [-0.58, 0.72, -0.27, -0.49, 1],
];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaHeatmapChart>("#correlation")!;
  chart.data = MATRIX.flatMap((row, r) =>
    row.map((value, c) => ({
      x: text.metrics[c],
      y: text.metrics[r],
      value,
    })),
  );
  chart.colorScale = ["#2563eb", "#f8fafc", "#dc2626"];
  chart.valueRange = [-1, 1];
  chart.valueName = text.correlation;
  chart.format = (value) => value.toFixed(2);
}
