import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { WaterfallChart, type WaterfallStep } from "minerva-design/charts";

// Headcount of the engineering department over the year
const movements = [
  ["hires", 46],
  ["internalIn", 9],
  ["resignations", -21],
  ["internalOut", -7],
  ["retirements", -3],
] as const;

export default function HeadcountDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.waterfall-chart.data",
  });
  const locale = i18n.language;
  const integer = useMemo(() => {
    const format = new Intl.NumberFormat(locale, { signDisplay: "auto" });
    return (value: number) => format.format(value);
  }, [locale]);

  const steps = useMemo(
    (): WaterfallStep[] => [
      { label: t("startOfYear"), kind: "subtotal" },
      ...movements.map(([key, value]) => ({
        label: t(`movements.${key}`),
        value,
      })),
      { label: t("endOfYear"), kind: "total" },
    ],
    [t],
  );

  // custom colors: arrivals in blue, departures in amber
  return (
    <WaterfallChart
      steps={steps}
      start={212}
      name={t("people")}
      format={integer}
      upColor="var(--chart-series-1, #4f46e5)"
      downColor="var(--warning-color, #f59e0b)"
      totalColor="var(--text-secondary-color, #64748b)"
      yAxis={{ min: 150 }}
      height={300}
      ariaLabel={t("headcountAria")}
    />
  );
}
