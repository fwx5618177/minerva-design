import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { WaterfallChart, type WaterfallStep } from "minerva-design/charts";

// Net cash flow of every month (k€) from an opening balance of 250 k€
const flows = [38, -22, 54, -61, 12, 47, -15, 66, -40, 29, 18, -9];

export default function CashFlowDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.waterfall-chart.data",
  });
  const locale = i18n.language;
  const euros = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
      notation: "compact",
    });
    return (value: number) => format.format(value * 1000);
  }, [locale]);

  const steps = useMemo((): WaterfallStep[] => {
    const month = new Intl.DateTimeFormat(locale, { month: "short" });
    return [
      // start: the first bar shows the opening balance from zero
      { label: t("opening"), kind: "subtotal" },
      ...flows.map((value, m) => ({
        label: month.format(new Date(2026, m, 1)),
        value,
      })),
      { label: t("closing"), kind: "total" },
    ];
  }, [t, locale]);

  return (
    <WaterfallChart
      steps={steps}
      start={250}
      labels={false}
      name={t("cashFlow")}
      format={euros}
      totalColor="var(--chart-series-5, #0ea5e9)"
      yAxis={{ format: euros, min: 200 }}
      height={320}
      ariaLabel={t("cashAria")}
    />
  );
}
