import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { WaterfallChart, type WaterfallStep } from "minerva-design/charts";

// Price waterfall of one unit (€): from the list price to the pocket price
// the company really keeps, through the on- and off-invoice leakages
const LIST_PRICE = 120;
const LINES = [
  ["listPrice", "subtotal"],
  ["dealerDiscount", -12],
  ["promotion", -6],
  ["invoicePrice", "subtotal"],
  ["paymentTerms", -2.4],
  ["freight", -3.6],
  ["rebates", -4.8],
  ["pocketPrice", "total"],
] as const;

// value shown by every bar: the change, or the running total of a subtotal
const VALUES = LINES.reduce<{ running: number; values: number[] }>(
  (acc, [, value]) =>
    typeof value === "number"
      ? {
          running: acc.running + value,
          values: [...acc.values, value],
        }
      : { running: acc.running, values: [...acc.values, acc.running] },
  { running: LIST_PRICE, values: [] },
).values;

export default function PriceBridgeDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.waterfall-chart.data",
  });
  const locale = i18n.language;
  const [selected, setSelected] = useState<number | null>(null);

  const euros = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 2,
    });
    return (value: number) => format.format(value);
  }, [locale]);
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [locale],
  );

  const steps = useMemo(
    (): WaterfallStep[] =>
      LINES.map(([key, value]) =>
        typeof value === "number"
          ? { label: t(`price.${key}`), value }
          : { label: t(`price.${key}`), kind: value },
      ),
    [t],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <WaterfallChart
        steps={steps}
        start={LIST_PRICE}
        name={t("price.name")}
        format={euros}
        yAxis={{ format: euros, min: 60 }}
        onPointClick={(event) => {
          const index = event.items[0]?.index;
          if (index !== undefined && LINES[index]) setSelected(index);
        }}
        height={320}
        ariaLabel={t("price.aria")}
      />
      <output aria-live="polite" style={{ color: "var(--text-muted-color)" }}>
        {selected === null
          ? t("price.hint")
          : t("price.selected", {
              step: steps[selected].label,
              value: euros(VALUES[selected]),
              share: percent.format(Math.abs(VALUES[selected]) / LIST_PRICE),
            })}
      </output>
    </div>
  );
}
