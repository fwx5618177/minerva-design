import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { WaterfallChart, type WaterfallStep } from "minerva-design/native";

// Income statement of the year (M$), from the revenue to the net income
const lines = [
  ["revenue", "subtotal"],
  ["costOfSales", -191],
  ["grossProfit", "subtotal"],
  ["research", -74],
  ["marketing", -63],
  ["admin", -38],
  ["operatingIncome", "subtotal"],
  ["tax", -27],
  ["netIncome", "total"],
] as const;

export default function Basic() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.waterfall-chart.data",
  });
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
      height={300}
      locale={i18n.language}
      steps={steps}
      start={482}
      name={t("amount")}
      orientation="horizontal"
      ariaLabel={t("pnlAria")}
    />
  );
}
