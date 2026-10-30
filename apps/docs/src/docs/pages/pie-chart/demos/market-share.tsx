import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { DonutChart, type ShapeDatum } from "minerva-design/charts";

// Smartphone shipments by vendor (millions of units); the long tail is
// grouped into "Others" so the chart keeps a handful of readable slices
const shipments: [string, number][] = [
  ["Aurora", 231],
  ["Borealis", 226],
  ["Cobalt", 146],
  ["Dynamo", 92],
  ["Ember", 87],
  ["Flux", 38],
  ["Gale", 31],
  ["Halo", 22],
  ["Ion", 17],
  ["Juno", 12],
  ["Kepler", 9],
  ["Lumen", 6],
];
const TOP = 5;

export default function MarketShareDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.pie-chart.data",
  });
  const locale = i18n.language;

  const data = useMemo((): ShapeDatum[] => {
    const sorted = [...shipments].sort((a, b) => b[1] - a[1]);
    const others = sorted.slice(TOP).reduce((sum, [, value]) => sum + value, 0);
    return [
      ...sorted.slice(0, TOP).map(([name, value]) => ({ name, value })),
      // a neutral color: "Others" is not a competitor
      { name: t("others"), value: others, color: "var(--border-strong-color)" },
    ];
  }, [t]);
  const total = shipments.reduce((sum, [, value]) => sum + value, 0);
  // values are in millions of units
  const units = useMemo(() => {
    const format = new Intl.NumberFormat(locale, { notation: "compact" });
    return (value: number) => format.format(value * 1_000_000);
  }, [locale]);
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [locale],
  );

  return (
    <DonutChart
      data={data}
      format={units}
      percentFormat={(share) => percent.format(share)}
      centerValue={units(total)}
      centerLabel={t("unitsShipped")}
      renderTooltip={(slice) => (
        <div style={{ display: "grid", gap: 2 }}>
          <strong>{slice.name}</strong>
          <span>
            {t("unitsShare", {
              units: units(slice.value),
              share: percent.format(slice.percent),
            })}
          </span>
        </div>
      )}
      height={340}
      ariaLabel={t("marketAria")}
    />
  );
}
