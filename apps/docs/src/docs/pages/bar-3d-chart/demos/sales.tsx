import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Bar3DChart, type Bar3DSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const REGIONS = ["north", "south", "east", "west", "central"] as const;
// monthly sales in k$: a seasonal curve peaking in December, scaled per region
const SCALE = [1.3, 0.8, 1.1, 0.95, 0.6];
const random = mulberry32(8);
const sales = REGIONS.flatMap((_, r) =>
  Array.from({ length: 12 }, (_, month) => {
    const season = 1 + 0.35 * Math.cos(((month - 11) / 12) * Math.PI * 2);
    return [
      r,
      month,
      Math.round(120 * SCALE[r]! * season * (0.85 + random() * 0.3)),
    ] as const;
  }),
);

export default function SalesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-3d-chart.data",
  });
  const locale = i18n.language;
  // "Jan", "janv.", "1月", ...
  const months = useMemo(() => {
    const format = new Intl.DateTimeFormat(locale, {
      month: "short",
      timeZone: "UTC",
    });
    return Array.from({ length: 12 }, (_, m) =>
      format.format(Date.UTC(2026, m, 1)),
    );
  }, [locale]);
  const usd = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        notation: "compact",
      }),
    [locale],
  );

  const series = useMemo(
    (): Bar3DSeries[] => [{ name: t("sales"), data: sales }],
    [t],
  );

  return (
    <Bar3DChart
      series={series}
      xAxis={{
        title: t("region"),
        categories: REGIONS.map((key) => t(`regions.${key}`)),
      }}
      yAxis={{ title: t("month"), categories: months }}
      zAxis={{ title: t("sales"), format: (value) => usd.format(value * 1000) }}
      aspect={[0.75, 1.2, 0.6]}
      camera={{ azimuth: 50, elevation: 28 }}
      height={440}
      ariaLabel={t("salesAria")}
    />
  );
}
