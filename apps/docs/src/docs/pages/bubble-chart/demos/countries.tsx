import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BubbleChart, type ChartSeries } from "minerva-design/charts";

// GDP per capita (k$, PPP), life expectancy (years) and population
// (millions) of a few countries, by continent
const countries = {
  asia: [
    ["CN", 23.3, 78.6, 1410],
    ["IN", 9.2, 70.8, 1430],
    ["JP", 47.0, 84.7, 124],
    ["ID", 15.0, 71.9, 278],
    ["KR", 51.0, 83.7, 52],
  ],
  europe: [
    ["DE", 66.0, 81.0, 84],
    ["FR", 58.0, 82.8, 68],
    ["GB", 54.0, 81.3, 68],
    ["PL", 45.0, 78.6, 37],
  ],
  americas: [
    ["US", 80.0, 77.5, 335],
    ["BR", 20.0, 75.9, 216],
    ["MX", 23.0, 75.1, 129],
    ["CA", 58.0, 82.6, 40],
  ],
  africa: [
    ["NG", 5.9, 54.5, 224],
    ["EG", 17.0, 71.6, 113],
    ["ZA", 15.0, 64.9, 60],
    ["ET", 3.0, 66.6, 127],
  ],
} as const;

export default function CountriesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bubble-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const names = new Intl.DisplayNames([locale], { type: "region" });
    const millions = new Intl.NumberFormat(locale, { notation: "compact" });
    return (Object.keys(countries) as (keyof typeof countries)[]).map((c) => ({
      name: t(`continents.${c}`),
      valueName: t("population"),
      format: (value: number) => millions.format(value * 1e6),
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
    return (value: number) => format.format(value * 1000);
  }, [locale]);

  // the bubble areas are proportional to the populations
  return (
    <BubbleChart
      series={series}
      maxSize={64}
      xAxis={{ title: t("gdp"), format: usd, min: 0, max: 90 }}
      yAxis={{ title: t("lifeExpectancy") }}
      height={380}
      ariaLabel={t("countriesAria")}
    />
  );
}
