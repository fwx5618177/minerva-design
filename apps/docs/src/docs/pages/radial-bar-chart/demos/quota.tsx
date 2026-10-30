import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { RadialBarChart, type RadialBarDatum } from "minerva-design/charts";

// Quarterly sales against each region's quota, in thousands of dollars
const REGIONS: [key: string, sales: number, quota: number][] = [
  ["north", 1840, 2000],
  ["south", 1260, 1100],
  ["east", 980, 1400],
  ["west", 1520, 1600],
];

export default function QuotaDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.radial-bar-chart.data",
  });
  const locale = i18n.language;

  const data = useMemo(
    (): RadialBarDatum[] =>
      REGIONS.map(([key, sales, quota]) => ({
        name: t(`regions.${key}`),
        value: sales,
        max: quota,
      })),
    [t],
  );
  const format = useMemo(() => {
    const money = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 2,
    });
    return (value: number) => money.format(value * 1000);
  }, [locale]);
  const total = REGIONS.reduce((sum, [, sales]) => sum + sales, 0);
  const quota = REGIONS.reduce((sum, [, , q]) => sum + q, 0);

  return (
    <RadialBarChart
      data={data}
      sweep={180}
      startAngle={-90}
      innerRadius={0.45}
      gap={0.2}
      labels={false}
      format={format}
      centerValue={`${Math.round((total / quota) * 100)}%`}
      centerLabel={t("ofQuota")}
      padding={{ top: 8, bottom: 0, left: 8, right: 8 }}
      height={300}
      ariaLabel={t("quotaAria")}
    />
  );
}
