import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  DonutChart,
  type ShapeDatum,
  type ShapeHoverEvent,
} from "minerva-design/charts";

// Monthly recurring revenue by plan, in US dollars
const revenue = [
  { key: "enterprise", value: 48200 },
  { key: "business", value: 31500 },
  { key: "pro", value: 22800 },
  { key: "starter", value: 9400 },
];
const total = revenue.reduce((sum, d) => sum + d.value, 0);

const labelContent = ["name", "value"] as const;
// The total in the hole always covers every plan, so slices stay visible
const legend = { toggle: false } as const;

export default function DonutDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.pie-chart.data",
  });
  const locale = i18n.language;
  // The hovered (or keyboard-highlighted) plan replaces the total in the hole
  const [hovered, setHovered] = useState<ShapeHoverEvent | null>(null);

  const data = useMemo(
    (): ShapeDatum[] =>
      revenue.map(({ key, value }) => ({ name: t(`plans.${key}`), value })),
    [t],
  );
  const currency = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const percent = new Intl.NumberFormat(locale, { style: "percent" });
  const format = (value: number) => currency.format(value);

  return (
    <DonutChart
      data={data}
      format={format}
      centerValue={format(hovered ? hovered.value : total)}
      centerLabel={
        hovered
          ? `${hovered.name} · ${percent.format(hovered.percent)}`
          : t("monthlyRevenue")
      }
      onHover={setHovered}
      tooltip={false}
      legend={legend}
      labelContent={labelContent}
      height={320}
      ariaLabel={t("mrrAria")}
    />
  );
}
