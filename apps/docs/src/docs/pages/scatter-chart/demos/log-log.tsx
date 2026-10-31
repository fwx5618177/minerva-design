import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ScatterChart, type ChartSeries } from "minerva-design/charts";

// Body mass (kg) and basal metabolic rate (W) of mammals: six orders of
// magnitude of mass, only log axes show them all
const animals: [string, number, number][] = [
  ["shrew", 0.004, 0.06],
  ["mouse", 0.025, 0.21],
  ["rat", 0.3, 1.45],
  ["rabbit", 2.5, 6.7],
  ["cat", 4, 9.8],
  ["dog", 20, 35],
  ["human", 70, 83],
  ["pig", 150, 138],
  ["horse", 500, 380],
  ["cow", 600, 420],
  ["giraffe", 1_200, 640],
  ["elephant", 4_000, 1_700],
];

// Least-squares fit of log B = log a + b · log M: Kleiber's law, b ≈ 3/4
const logs = animals.map(([, m, b]) => [Math.log10(m), Math.log10(b)]);
const n = logs.length;
const mx = logs.reduce((s, [x]) => s + x, 0) / n;
const my = logs.reduce((s, [, y]) => s + y, 0) / n;
const exponent =
  logs.reduce((s, [x, y]) => s + (x - mx) * (y - my), 0) /
  logs.reduce((s, [x]) => s + (x - mx) ** 2, 0);
const coefficient = 10 ** (my - exponent * mx);
const fit = (mass: number) => coefficient * mass ** exponent;

export default function LogLogDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.scatter-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("mammals"),
        showLabels: true,
        pointSize: 9,
        data: animals.map(([key, mass, rate]) => ({
          x: mass,
          y: rate,
          label: t(`animals.${key}`),
        })),
      },
      {
        // a power law is a straight line on log-log axes: two points draw it
        name: t("powerLaw"),
        type: "line",
        lineWidth: 1.5,
        color: "var(--text-secondary-color)",
        tooltip: false,
        data: [
          [0.002, fit(0.002)],
          [8_000, fit(8_000)],
        ],
      },
    ],
    [t],
  );
  const compact = useMemo(
    () => new Intl.NumberFormat(locale, { maximumSignificantDigits: 3 }),
    [locale],
  );
  const kg = (value: number) => t("kg", { value: compact.format(value) });
  const watts = (value: number) => t("watts", { value: compact.format(value) });

  return (
    <ScatterChart
      series={series}
      xAxis={{ type: "log", title: t("bodyMass"), format: kg, grid: true }}
      yAxis={{ type: "log", title: t("metabolicRate"), format: watts }}
      annotations={[
        {
          type: "text",
          x: 0.004,
          y: 1_000,
          anchor: "left",
          text: t("kleiber", {
            exponent: new Intl.NumberFormat(locale, {
              maximumFractionDigits: 2,
            }).format(exponent),
          }),
        },
      ]}
      height={360}
      ariaLabel={t("kleiberAria")}
    />
  );
}
