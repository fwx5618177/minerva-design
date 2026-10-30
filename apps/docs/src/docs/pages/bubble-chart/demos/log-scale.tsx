import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  BubbleChart,
  type ChartSeries,
  type ChartView,
} from "minerva-design/charts";

// GDP per capita (US$, PPP), life expectancy (years) and population
// (millions): incomes span two orders of magnitude, a log axis spreads them
const countries = {
  africa: [
    ["BI", 900, 62.0, 13],
    ["CD", 1_500, 59.7, 102],
    ["ET", 3_000, 66.6, 127],
    ["NG", 5_900, 54.5, 224],
    ["KE", 6_000, 62.7, 55],
    ["MA", 9_800, 75.0, 37],
    ["ZA", 15_000, 64.9, 60],
    ["EG", 17_000, 71.6, 113],
  ],
  asia: [
    ["PK", 6_400, 66.4, 240],
    ["BD", 8_600, 73.7, 173],
    ["IN", 9_200, 70.8, 1430],
    ["ID", 15_000, 71.9, 278],
    ["CN", 23_300, 78.6, 1410],
    ["JP", 47_000, 84.7, 124],
    ["SG", 133_000, 83.7, 6],
  ],
  europe: [
    ["UA", 15_000, 73.0, 37],
    ["PL", 45_000, 78.6, 37],
    ["FR", 58_000, 82.8, 68],
    ["DE", 66_000, 81.0, 84],
    ["NO", 90_000, 83.2, 5.5],
    ["LU", 140_000, 83.0, 0.7],
  ],
  americas: [
    ["HT", 3_200, 63.7, 12],
    ["BR", 20_000, 75.9, 216],
    ["MX", 23_000, 75.1, 129],
    ["AR", 27_000, 76.1, 46],
    ["CA", 58_000, 82.6, 40],
    ["US", 80_000, 77.5, 335],
  ],
} as const;

export default function LogScaleDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bubble-chart.data",
  });
  const locale = i18n.language;
  const [view, setView] = useState<ChartView | null>(null);

  const series = useMemo((): ChartSeries[] => {
    const names = new Intl.DisplayNames([locale], { type: "region" });
    const people = new Intl.NumberFormat(locale, { notation: "compact" });
    return (Object.keys(countries) as (keyof typeof countries)[]).map((c) => ({
      name: t(`continents.${c}`),
      valueName: t("population"),
      format: (value: number) => people.format(value * 1e6),
      data: countries[c].map(([code, gdp, life, population]) => ({
        x: gdp,
        y: life,
        value: population,
        label: names.of(code) ?? code,
      })),
    }));
  }, [t, locale]);
  const usd = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
    });
    return (value: number) => format.format(value);
  }, [locale]);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <BubbleChart
        series={series}
        maxSize={56}
        // ×10 income = the same distance anywhere on the axis
        xAxis={{
          type: "log",
          title: t("gdpLog"),
          format: usd,
          min: 500,
          max: 200_000,
          grid: true,
        }}
        yAxis={{ title: t("lifeExpectancy") }}
        annotations={[
          {
            type: "line",
            axis: "x",
            value: 13_845,
            label: t("highIncome"),
          },
        ]}
        // the view is in dollars, not in logarithms
        onZoom={setView}
        height={400}
        ariaLabel={t("logAria")}
      />
      <span style={{ fontSize: 13, color: "var(--text-secondary-color)" }}>
        {view
          ? t("visibleIncomes", { from: usd(view.x[0]), to: usd(view.x[1]) })
          : t("zoomHint")}
      </span>
    </div>
  );
}
