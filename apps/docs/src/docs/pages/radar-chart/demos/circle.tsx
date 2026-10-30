import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  RadarChart,
  type RadarIndicator,
  type RadarSeries,
} from "minerva-design/charts";

// Cupping notes of two coffees, each attribute scored from 0 to 5
const attributes = [
  "aroma",
  "acidity",
  "sweetness",
  "body",
  "bitterness",
  "aftertaste",
];
const coffees = [
  { key: "ethiopia", values: [4.6, 4.4, 3.8, 2.4, 1.6, 3.9] },
  { key: "sumatra", values: [3.6, 1.8, 3.1, 4.7, 3.9, 4.2] },
];

export default function CircleDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.radar-chart.data",
  });
  const locale = i18n.language;

  const indicators = useMemo(
    (): RadarIndicator[] =>
      attributes.map((key) => ({ name: t(`flavor.${key}`), max: 5 })),
    [t],
  );
  const series = useMemo(
    (): RadarSeries[] =>
      coffees.map(({ key, values }) => ({
        name: t(`coffees.${key}`),
        values,
        opacity: 0.25,
      })),
    [t],
  );
  const decimal = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  return (
    <RadarChart
      indicators={indicators}
      series={series}
      shape="circle"
      levels={5}
      dots={false}
      format={(value) => decimal.format(value)}
      height={360}
      ariaLabel={t("coffeeAria")}
    />
  );
}
