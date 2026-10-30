import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AreaChart, type ChartSeries } from "minerva-design/charts";

const hours = Array.from({ length: 24 }, (_, hour) => hour);

// Electricity generation of a grid over one spring day, in gigawatts
const generation = {
  nuclear: hours.map(() => 38),
  hydro: hours.map((h) => 6 + 3 * Math.exp(-((h - 19) ** 2) / 6)),
  wind: hours.map((h) => 9 + 4 * Math.sin((h + 3) / 4)),
  solar: hours.map((h) => Math.max(0, 22 * Math.sin(((h - 6) / 14) * Math.PI))),
  gas: hours.map((h) => 4 + 6 * Math.exp(-((h - 20) ** 2) / 5)),
};
const colors = {
  nuclear: "#8b5cf6",
  hydro: "#0ea5e9",
  wind: "#14b8a6",
  solar: "#f59e0b",
  gas: "#94a3b8",
};

export default function EnergyMixDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.area-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const time = new Intl.DateTimeFormat(locale, { hour: "numeric" });
    const label = (hour: number) => time.format(new Date(2026, 3, 20, hour));
    const names = {
      nuclear: t("energy.nuclear"),
      hydro: t("energy.hydro"),
      wind: t("energy.wind"),
      solar: t("energy.solar"),
      gas: t("energy.gas"),
    };
    return (Object.keys(generation) as (keyof typeof generation)[]).map(
      (key) => ({
        name: names[key],
        color: colors[key],
        data: hours.map((h) => [label(h), generation[key][h]] as const),
      }),
    );
  }, [t, locale]);
  const gigawatts = useMemo(() => {
    const number = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
    return (value: number) => t("gw", { value: number.format(value) });
  }, [t, locale]);

  return (
    <AreaChart
      series={series}
      stacked
      yAxis={{ format: gigawatts, title: t("power") }}
      height={320}
      ariaLabel={t("energyAria")}
    />
  );
}
