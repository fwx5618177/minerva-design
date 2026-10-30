import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  LineChart,
  type ChartCurve,
  type ChartSeries,
} from "minerva-design/charts";

// Average monthly temperatures (°C), January to December
const lisbon = [
  11.6, 12.6, 14.9, 16.2, 18.8, 21.9, 23.6, 24.0, 22.6, 19.4, 15.3, 12.7,
];
const oslo = [
  -4.3, -4.0, -0.2, 4.5, 10.8, 15.2, 16.4, 15.2, 10.8, 5.0, 0.6, -3.2,
];

/** Short month names in the reader's language */
const monthNames = (locale: string) => {
  const format = new Intl.DateTimeFormat(locale, { month: "short" });
  return Array.from({ length: 12 }, (_, m) =>
    format.format(new Date(2026, m, 1)),
  );
};

const CURVES: ChartCurve[] = ["linear", "smooth", "step"];

export default function CurvesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.line-chart.data",
  });
  const locale = i18n.language;
  const [curve, setCurve] = useState<ChartCurve>("smooth");

  const series = useMemo((): ChartSeries[] => {
    const months = monthNames(locale);
    return [
      {
        name: t("lisbon"),
        data: months.map((m, i) => [m, lisbon[i]] as const),
      },
      { name: t("oslo"), data: months.map((m, i) => [m, oslo[i]] as const) },
    ];
  }, [t, locale]);
  // "12 °C" with the reader's decimal separator
  const celsius = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "celsius",
        maximumFractionDigits: 1,
      }),
    [locale],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("curve")}
        direction="horizontal"
        value={curve}
        onChange={(value) => setCurve(value as ChartCurve)}
      >
        {CURVES.map((value) => (
          <Radio key={value} value={value} label={t(`curves.${value}`)} />
        ))}
      </RadioGroup>
      <LineChart
        series={series}
        curve={curve}
        yAxis={{ format: (value) => celsius.format(value) }}
        height={280}
        ariaLabel={t("temperatureAria")}
      />
    </div>
  );
}
