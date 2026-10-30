import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ScatterChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Weekly ad spend against revenue (thousand USD) for 60 campaigns
const random = mulberry32(42);
const campaigns = Array.from({ length: 60 }, () => {
  const spend = 2 + random() * 28;
  return [spend, 15 + spend * 3.1 + (random() - 0.5) * 30] as const;
});

// Least-squares fit y = a + b·x and the coefficient of determination
const n = campaigns.length;
const meanX = campaigns.reduce((sum, [x]) => sum + x, 0) / n;
const meanY = campaigns.reduce((sum, [, y]) => sum + y, 0) / n;
const sxy = campaigns.reduce((s, [x, y]) => s + (x - meanX) * (y - meanY), 0);
const sxx = campaigns.reduce((s, [x]) => s + (x - meanX) ** 2, 0);
const syy = campaigns.reduce((s, [, y]) => s + (y - meanY) ** 2, 0);
const slope = sxy / sxx;
const intercept = meanY - slope * meanX;
const r2 = (sxy * sxy) / (sxx * syy);
const top = Math.max(...campaigns.map(([, y]) => y));

export default function TrendDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.scatter-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo(
    (): ChartSeries[] => [
      { name: t("campaigns"), data: campaigns, opacity: 0.75 },
      {
        name: t("trend"),
        type: "line",
        lineWidth: 2,
        color: "var(--danger-color)",
        data: [
          [0, intercept],
          [32, intercept + slope * 32],
        ],
      },
    ],
    [t],
  );
  const usd = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
    });
    return (value: number) => format.format(value * 1000);
  }, [locale]);
  const decimal = new Intl.NumberFormat(locale, { maximumFractionDigits: 2 });

  return (
    <ScatterChart
      series={series}
      xAxis={{ title: t("adSpend"), min: 0, max: 32, format: usd }}
      yAxis={{ title: t("revenue"), format: usd }}
      annotations={[
        {
          type: "text",
          x: 1,
          y: top,
          anchor: "left",
          text: t("fit", {
            r2: decimal.format(r2),
            slope: decimal.format(slope),
          }),
        },
      ]}
      height={320}
      ariaLabel={t("trendAria")}
    />
  );
}
