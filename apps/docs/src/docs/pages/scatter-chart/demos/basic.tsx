import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ScatterChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Customers of two plans: seats against monthly bill (USD)
const random = mulberry32(9);
const plan = (price: number, slope: number) =>
  Array.from({ length: 40 }, () => {
    const seats = 1 + Math.round(random() * 49);
    return [
      seats,
      Math.round(price + seats * slope * (0.8 + random() * 0.4)),
    ] as const;
  });
const starter = plan(20, 9);
const business = plan(60, 14);

export default function BasicDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.scatter-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo(
    (): ChartSeries[] => [
      { name: t("starter"), data: starter },
      { name: t("business"), data: business },
    ],
    [t],
  );
  const usd = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }),
    [locale],
  );

  return (
    <ScatterChart
      series={series}
      xAxis={{ title: t("seats") }}
      yAxis={{ title: t("monthlyBill"), format: (value) => usd.format(value) }}
      height={300}
      ariaLabel={t("billAria")}
    />
  );
}
