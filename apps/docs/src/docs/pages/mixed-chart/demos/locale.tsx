import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { MixedChart, type ChartSeries } from "minerva-design/charts";

// 90 days of page views (hundreds of thousands) and the conversion rate (%)
const DAY = 86_400_000;
const start = new Date(2026, 0, 1).getTime();
const days = Array.from({ length: 90 }, (_, i) => {
  const weekly = Math.sin((i / 7) * Math.PI * 2) * 0.12;
  const trend = 1 + i / 120;
  return {
    x: start + i * DAY,
    views: Math.round(186_000 * trend * (1 + weekly) + ((i * 7919) % 21_000)),
    rate: Number(
      (2.4 + Math.sin(i / 11) * 0.45 + ((i * 31) % 7) / 25).toFixed(2),
    ),
  };
});

// The same chart in two locales: compact units (万 / k), separators and dates
const LOCALES = [
  { locale: "zh-CN", key: "chinese" },
  { locale: "fr-FR", key: "french" },
] as const;

export default function LocaleDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.mixed-chart.data",
  });
  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("pageViews"),
        type: "bar",
        data: days.map((d) => ({ x: d.x, y: d.views })),
      },
      {
        name: t("conversionRate"),
        type: "line",
        yAxis: "right",
        color: "var(--chart-series-3, #f59e0b)",
        lineWidth: 2,
        data: days.map((d) => ({ x: d.x, y: d.rate })),
      },
    ],
    [t],
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: 16,
        width: "100%",
      }}
    >
      {LOCALES.map(({ locale, key }) => (
        <figure key={locale} style={{ margin: 0, minWidth: 0 }}>
          <figcaption
            style={{
              marginBottom: 4,
              fontSize: 13,
              color: "var(--text-secondary-color)",
            }}
          >
            {t(`locales.${key}`)}
          </figcaption>
          <MixedChart
            locale={locale}
            series={series}
            xAxis={{ type: "time" }}
            yAxis2={{ zero: true }}
            legend={{ position: "bottom" }}
            height={280}
            ariaLabel={t("localeAria", { locale: t(`locales.${key}`) })}
          />
        </figure>
      ))}
    </div>
  );
}
