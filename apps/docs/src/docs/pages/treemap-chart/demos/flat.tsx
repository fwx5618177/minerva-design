import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { TreemapChart, type TreemapNode } from "minerva-design/charts";

// Annual budget by department, in US dollars
const budget = [
  { key: "engineering", value: 4_200_000 },
  { key: "sales", value: 2_800_000 },
  { key: "marketing", value: 1_900_000 },
  { key: "success", value: 1_200_000 },
  { key: "operations", value: 900_000 },
  { key: "finance", value: 600_000 },
  { key: "people", value: 500_000 },
  { key: "legal", value: 300_000 },
];

export default function FlatDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.treemap-chart.data",
  });
  const locale = i18n.language;

  const data = useMemo(
    (): TreemapNode[] =>
      budget.map(({ key, value }) => ({
        name: t(`departments.${key}`),
        value,
      })),
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
  const percent = useMemo(
    () => new Intl.NumberFormat(locale, { style: "percent" }),
    [locale],
  );

  return (
    <TreemapChart
      data={data}
      format={(value) => currency.format(value)}
      percentFormat={(share) => percent.format(share)}
      renderTooltip={(cell) => (
        <div style={{ display: "grid", gap: 2 }}>
          <strong>{cell.name}</strong>
          <span>
            {currency.format(cell.value)} · {percent.format(cell.percent)}
          </span>
        </div>
      )}
      gap={4}
      height={320}
      ariaLabel={t("budgetAria")}
    />
  );
}
