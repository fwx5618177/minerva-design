// A portfolio: risk against return, bubbles sized by the share of each
// asset; minerva-point-click reports the clicked asset.
import type {
  ChartHoverEvent,
  MinervaBubbleChart,
} from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    risk: "Risk (volatility %)",
    return: "Expected return %",
    hint: "Click a bubble",
    assets: [
      "Bonds",
      "Index fund",
      "Real estate",
      "Tech stocks",
      "Gold",
      "Start-ups",
    ],
  },
  zh: {
    risk: "风险（波动率 %）",
    return: "预期收益 %",
    hint: "点击一个气泡",
    assets: ["债券", "指数基金", "房地产", "科技股", "黄金", "初创企业"],
  },
  ja: {
    risk: "リスク（ボラティリティ %）",
    return: "期待リターン %",
    hint: "バブルをクリックします",
    assets: [
      "債券",
      "インデックスファンド",
      "不動産",
      "ハイテク株",
      "金",
      "スタートアップ",
    ],
  },
  fr: {
    risk: "Risque (volatilité %)",
    return: "Rendement attendu %",
    hint: "Cliquez sur une bulle",
    assets: [
      "Obligations",
      "Fonds indiciel",
      "Immobilier",
      "Actions tech",
      "Or",
      "Start-up",
    ],
  },
};

// risk, return, share of the portfolio (%)
const ASSETS = [
  [4, 3, 30],
  [15, 7, 25],
  [12, 6, 20],
  [28, 12, 15],
  [16, 4, 5],
  [45, 18, 5],
];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaBubbleChart>("#portfolio")!;
  const asset = root.querySelector<HTMLOutputElement>("#asset")!;
  chart.series = text.assets.map((name, i) => ({
    name,
    data: [{ x: ASSETS[i][0], y: ASSETS[i][1], value: ASSETS[i][2] }],
  }));
  chart.options = {
    xAxis: { title: text.risk },
    yAxis: { title: text.return },
  };
  asset.textContent = text.hint;
  const onClick = (event: Event) => {
    const item = (event as CustomEvent<ChartHoverEvent>).detail.items[0];
    if (item) asset.textContent = `${item.seriesName}: ${item.value} %`;
  };
  chart.addEventListener("minerva-point-click", onClick);
  return () => chart.removeEventListener("minerva-point-click", onClick);
}
