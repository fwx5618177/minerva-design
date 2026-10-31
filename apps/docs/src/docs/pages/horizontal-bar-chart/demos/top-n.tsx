import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup, Select, SelectItem } from "minerva-design";
import { HorizontalBarChart, type ChartSeries } from "minerva-design/charts";

type Metric = "revenue" | "units";

// Sales of the online shop last month: revenue in dollars and units sold
const products = {
  headphones: { revenue: 184200, units: 921 },
  smartwatch: { revenue: 162800, units: 592 },
  speaker: { revenue: 95400, units: 1060 },
  keyboard: { revenue: 71300, units: 713 },
  charger: { revenue: 48900, units: 1956 },
  webcam: { revenue: 45200, units: 502 },
  mouse: { revenue: 39800, units: 995 },
  tablet: { revenue: 138500, units: 277 },
  cable: { revenue: 21600, units: 2160 },
  stand: { revenue: 33700, units: 674 },
} as const;
type Product = keyof typeof products;
const keys = Object.keys(products) as Product[];

export default function TopNDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.horizontal-bar-chart.data",
  });
  const locale = i18n.language;
  const [metric, setMetric] = useState<Metric>("revenue");
  const [limit, setLimit] = useState("5");

  const format = useMemo(() => {
    const usd = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    });
    const number = new Intl.NumberFormat(locale);
    return (value: number) =>
      metric === "revenue" ? usd.format(value) : number.format(value);
  }, [locale, metric]);

  // sorted from the highest value, then cut: the first row is drawn at the top
  const ranked = useMemo(
    () =>
      [...keys]
        .sort((a, b) => products[b][metric] - products[a][metric])
        .slice(0, Number(limit)),
    [metric, limit],
  );
  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: metric === "revenue" ? t("revenue") : t("unitsSold"),
        color:
          metric === "revenue"
            ? "var(--chart-series-1, #4f46e5)"
            : "var(--chart-series-3, #f59e0b)",
        data: ranked.map(
          (key) => [t(`products.${key}`), products[key][metric]] as const,
        ),
      },
    ],
    [t, metric, ranked],
  );
  const share =
    ranked.reduce((sum, key) => sum + products[key][metric], 0) /
    keys.reduce((sum, key) => sum + products[key][metric], 0);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 16,
        }}
      >
        <RadioGroup
          aria-label={t("rankBy")}
          direction="horizontal"
          value={metric}
          onChange={(value) => setMetric(value as Metric)}
        >
          <Radio value="revenue">{t("revenue")}</Radio>
          <Radio value="units">{t("unitsSold")}</Radio>
        </RadioGroup>
        <Select
          size="small"
          style={{ width: 140 }}
          aria-label={t("show")}
          value={limit}
          onChange={setLimit}
        >
          <SelectItem value="3">{t("topN", { n: 3 })}</SelectItem>
          <SelectItem value="5">{t("topN", { n: 5 })}</SelectItem>
          <SelectItem value={String(keys.length)}>
            {t("allProducts")}
          </SelectItem>
        </Select>
      </div>
      <HorizontalBarChart
        series={series}
        labels
        legend={false}
        yAxis={{ format }}
        height={Math.max(160, 48 + ranked.length * 30)}
        ariaLabel={t("topProductsAria")}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {t("topShare", {
          n: ranked.length,
          share: new Intl.NumberFormat(locale, {
            style: "percent",
            maximumFractionDigits: 0,
          }).format(share),
        })}
      </output>
    </div>
  );
}
