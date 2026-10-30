import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { WaterfallChart, type WaterfallStep } from "minerva-design/charts";

// From the budgeted to the actual operating margin (M€): the drivers of
// the variance, one row each
const drivers = [
  ["volume", 4.2],
  ["price", 2.6],
  ["mix", -1.1],
  ["exchangeRates", -2.4],
  ["rawMaterials", -3.3],
  ["savings", 1.8],
] as const;

export default function VarianceDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.waterfall-chart.data",
  });
  const locale = i18n.language;
  const euros = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 1,
      notation: "compact",
    });
    return (value: number) => format.format(value * 1e6);
  }, [locale]);

  const steps = useMemo(
    (): WaterfallStep[] => [
      { label: t("budget"), kind: "subtotal" },
      ...drivers.map(([key, value]) => ({ label: t(`drivers.${key}`), value })),
      { label: t("actual"), kind: "total" },
    ],
    [t],
  );

  return (
    <WaterfallChart
      steps={steps}
      start={38}
      orientation="horizontal"
      name={t("variance")}
      format={euros}
      yAxis={{ format: euros, min: 30 }}
      height={340}
      ariaLabel={t("varianceAria")}
    />
  );
}
