import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { TreemapChart, type TreemapNode } from "minerva-design/charts";

type Metric = "revenue" | "orders" | "profit";
const METRICS: Metric[] = ["revenue", "orders", "profit"];

// Yearly sales by region and country (ISO code): revenue and profit in
// thousand USD, orders in units. The metrics rank the countries differently
const SALES: [
  region: string,
  [country: string, revenue: number, orders: number, profit: number][],
][] = [
  [
    "europe",
    [
      ["FR", 1840, 21_400, 310],
      ["DE", 2260, 19_800, 420],
      ["GB", 1630, 24_900, 190],
      ["ES", 780, 12_300, 95],
      ["IT", 910, 11_100, 160],
    ],
  ],
  [
    "americas",
    [
      ["US", 4120, 38_600, 690],
      ["CA", 960, 9_800, 170],
      ["BR", 720, 15_200, 60],
      ["MX", 540, 10_400, 70],
    ],
  ],
  [
    "asiaPacific",
    [
      ["JP", 1480, 13_200, 330],
      ["AU", 870, 8_100, 150],
      ["KR", 690, 9_900, 120],
      ["SG", 420, 3_600, 110],
    ],
  ],
];
const COLUMN: Record<Metric, 1 | 2 | 3> = { revenue: 1, orders: 2, profit: 3 };

export default function MetricSwitchDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.treemap-chart.data",
  });
  const locale = i18n.language;
  const [metric, setMetric] = useState<Metric>("revenue");

  // country names in the reader's language; the same tree for every
  // metric, so the cells move and resize instead of being redrawn
  const { data, byName } = useMemo(() => {
    const regions = new Intl.DisplayNames([locale], { type: "region" });
    const byName = new Map<string, [number, number, number]>();
    const data: TreemapNode[] = SALES.map(([region, countries]) => ({
      name: t(`sales.regions.${region}`),
      children: countries.map(([code, ...values]) => {
        const name = regions.of(code) ?? code;
        byName.set(name, values);
        return { name, value: values[COLUMN[metric] - 1] };
      }),
    }));
    return { data, byName };
  }, [locale, metric, t]);
  const formats = useMemo(() => {
    const money = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    });
    const number = new Intl.NumberFormat(locale, {
      notation: "compact",
      maximumFractionDigits: 1,
    });
    return {
      revenue: (value: number) => money.format(value * 1000),
      orders: (value: number) => number.format(value),
      profit: (value: number) => money.format(value * 1000),
    };
  }, [locale]);
  const percent = useMemo(
    () => new Intl.NumberFormat(locale, { style: "percent" }),
    [locale],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("sales.metric")}
        direction="horizontal"
        value={metric}
        onChange={(value) => setMetric(value as Metric)}
      >
        {METRICS.map((m) => (
          <Radio key={m} value={m} label={t(`sales.metrics.${m}`)} />
        ))}
      </RadioGroup>
      <TreemapChart
        data={data}
        format={formats[metric]}
        renderTooltip={(cell) => {
          const values = byName.get(cell.name);
          return (
            <div style={{ display: "grid", gap: 2 }}>
              <strong>{(cell.path ?? [cell.name]).join(" › ")}</strong>
              {values ? (
                METRICS.map((m, i) => (
                  <span
                    key={m}
                    style={{ fontWeight: m === metric ? 600 : undefined }}
                  >
                    {t(`sales.metrics.${m}`)}: {formats[m](values[i])}
                  </span>
                ))
              ) : (
                <span>{formats[metric](cell.value)}</span>
              )}
              <span>
                {t("sales.shareOf", {
                  share: percent.format(cell.percent),
                  metric: t(`sales.metrics.${metric}`),
                })}
              </span>
            </div>
          );
        }}
        height={380}
        ariaLabel={t("sales.aria", { metric: t(`sales.metrics.${metric}`) })}
      />
    </div>
  );
}
