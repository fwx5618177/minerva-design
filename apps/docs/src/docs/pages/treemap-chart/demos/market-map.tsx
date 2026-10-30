import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { TreemapChart, type TreemapNode } from "minerva-design/charts";

// Stocks by sector: the area is the market capitalization (billion USD),
// the color the change of the day (%), like the market maps of finance sites
const market: { sector: string; stocks: [string, number, number][] }[] = [
  {
    sector: "technology",
    stocks: [
      ["ACME", 2_950, 1.8],
      ["LUMA", 2_610, -0.6],
      ["QBIT", 1_420, 3.2],
      ["NOVA", 610, -2.4],
      ["CHIP", 380, 0.4],
    ],
  },
  {
    sector: "finance",
    stocks: [
      ["BANK", 540, -0.3],
      ["PAYX", 470, 0.9],
      ["SAFE", 260, -1.1],
    ],
  },
  {
    sector: "health",
    stocks: [
      ["CURE", 720, -1.7],
      ["GENE", 410, 2.6],
      ["MEDI", 300, 0.1],
    ],
  },
  {
    sector: "energy",
    stocks: [
      ["PETR", 450, -3.1],
      ["SOLR", 120, 4.4],
    ],
  },
  {
    sector: "consumer",
    stocks: [
      ["SHOP", 1_850, 0.7],
      ["DRNK", 280, -0.4],
      ["CARS", 690, -2.2],
    ],
  },
];

const RED = [246, 53, 56];
const GREY = [65, 69, 84];
const GREEN = [48, 204, 90];

/** -3% (or less) = red, 0 = grey, +3% (or more) = green */
const changeColor = (change: number) => {
  const amount = Math.min(1, Math.abs(change) / 3);
  const end = change < 0 ? RED : GREEN;
  const rgb = GREY.map((c, i) => Math.round(c + (end[i] - c) * amount));
  return `rgb(${rgb.join(", ")})`;
};

export default function MarketMapDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.treemap-chart.data",
  });
  const locale = i18n.language;
  const change = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
        signDisplay: "exceptZero",
      }),
    [locale],
  );
  const capitalization = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    });
    return (billions: number) => format.format(billions * 1e9);
  }, [locale]);

  // the change is part of the name, so the cells show "ACME +1.8%"
  const data = useMemo(
    (): TreemapNode[] =>
      market.map(({ sector, stocks }) => ({
        name: t(`sectors.${sector}`),
        color: "#262931",
        children: stocks.map(([symbol, cap, pct]) => ({
          name: `${symbol} ${change.format(pct / 100)}`,
          value: cap,
          color: changeColor(pct),
        })),
      })),
    [t, change],
  );

  return (
    <TreemapChart
      data={data}
      gap={1}
      format={capitalization}
      renderTooltip={(cell) => (
        <div style={{ display: "grid", gap: 2 }}>
          <strong>{(cell.path ?? [cell.name]).join(" › ")}</strong>
          <span>{t("marketCap", { value: capitalization(cell.value) })}</span>
        </div>
      )}
      legend={false}
      height={400}
      ariaLabel={t("marketAria")}
    />
  );
}
