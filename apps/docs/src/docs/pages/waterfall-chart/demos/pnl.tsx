import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { WaterfallChart, type WaterfallStep } from "minerva-design/charts";

// Income statement of the year (M$): from the revenue (482 M$, the start)
// to the net income
const lines = [
  ["revenue", "subtotal"],
  ["costOfSales", -191],
  ["grossProfit", "subtotal"],
  ["research", -74],
  ["marketing", -63],
  ["admin", -38],
  ["operatingIncome", "subtotal"],
  ["interest", 6],
  ["tax", -27],
  ["netIncome", "total"],
] as const;

export default function PnlDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.waterfall-chart.data",
  });
  const locale = i18n.language;
  const usd = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
    });
    return (value: number) => format.format(value * 1e6);
  }, [locale]);

  // changes start where the previous bar ended; subtotals and totals
  // show the running total from zero
  const steps = useMemo(
    (): WaterfallStep[] =>
      lines.map(([key, value]) =>
        typeof value === "number"
          ? { label: t(`pnl.${key}`), value }
          : { label: t(`pnl.${key}`), kind: value },
      ),
    [t],
  );

  return (
    <WaterfallChart
      steps={steps}
      start={482}
      name={t("amount")}
      format={usd}
      yAxis={{ format: usd }}
      height={340}
      ariaLabel={t("pnlAria")}
    />
  );
}
