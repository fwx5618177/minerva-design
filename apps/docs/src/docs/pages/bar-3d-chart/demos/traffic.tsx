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

// Visits per hour of the week on a shop website: a morning bump, an evening
// peak and busier weekends; heights and colors both show the visits
const random = mulberry32(14);
const visits = Array.from({ length: 7 }, (_, day) =>
  Array.from({ length: 24 }, (_, hour) => {
    const weekend = day >= 5 ? 1.35 : 1;
    const morning = Math.exp(-((hour - 10) ** 2) / 8) * 0.6;
    const evening = Math.exp(-((hour - 20) ** 2) / 6);
    const night = hour < 6 ? 0.08 : 0.2;
    return Math.round(
      1000 * weekend * (night + morning + evening) * (0.9 + random() * 0.2),
    );
  }),
).flatMap((hours, day) => hours.map((v, hour) => [hour, day, v] as const));

export default function TrafficDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-3d-chart.data",
  });
  const locale = i18n.language;
  // localized weekday names (Monday first) and hours
  const { days, hours } = useMemo(() => {
    const weekday = new Intl.DateTimeFormat(locale, {
      weekday: "short",
      timeZone: "UTC",
    });
    const hour = new Intl.DateTimeFormat(locale, {
      hour: "numeric",
      timeZone: "UTC",
    });
    return {
      // 2026-01-05 is a Monday
      days: Array.from({ length: 7 }, (_, d) =>
        weekday.format(Date.UTC(2026, 0, 5 + d)),
      ),
      hours: Array.from({ length: 24 }, (_, h) =>
        hour.format(Date.UTC(2026, 0, 5, h)),
      ),
    };
  }, [locale]);
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  const series = useMemo(
    (): Bar3DSeries[] => [
      { name: t("visits"), data: visits, colorBy: "z", barWidth: 0.82 },
    ],
    [t],
  );

  return (
    <Bar3DChart
      series={series}
      colorScale="plasma"
      xAxis={{ title: t("hour"), categories: hours }}
      yAxis={{ title: t("weekday"), categories: days }}
      zAxis={{ title: t("visits"), format: (value) => number.format(value) }}
      colorBar={{ title: t("visits") }}
      aspect={[1.6, 0.7, 0.45]}
      camera={{ azimuth: 20, elevation: 34 }}
      height={420}
      ariaLabel={t("trafficAria")}
    />
  );
}
