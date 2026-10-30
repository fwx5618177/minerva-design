import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { HeatmapChart, type HeatmapCell } from "minerva-design/native";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const bump = (hour: number, center: number, width: number) =>
  Math.exp(-((hour - center) ** 2) / (2 * width ** 2));

// Sessions by weekday and by 3-hour slot (a phone fits 8 columns)
const SLOTS = [0, 3, 6, 9, 12, 15, 18, 21];

export default function Basic() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.heatmap-chart.data",
  });
  const locale = i18n.language;
  const days = useMemo(() => {
    const format = new Intl.DateTimeFormat(locale, { weekday: "short" });
    // 5 January 2026 is a Monday
    return Array.from({ length: 7 }, (_, i) =>
      format.format(new Date(2026, 0, 5 + i)),
    );
  }, [locale]);
  const hours = useMemo(() => {
    const format = new Intl.DateTimeFormat(locale, { hour: "numeric" });
    return SLOTS.map((h) => format.format(new Date(2026, 0, 5, h)));
  }, [locale]);
  const data = useMemo((): HeatmapCell[] => {
    const random = mulberry32(24);
    return days.flatMap((day, d) =>
      SLOTS.map((h, s) => {
        const activity =
          d >= 5
            ? 0.55 * bump(h, 13, 4) + 0.3 * bump(h, 21, 2)
            : bump(h, 10.5, 2.5) + 0.9 * bump(h, 15, 2.5);
        return {
          x: hours[s] ?? String(h),
          y: day,
          value: Math.round(Math.max(0, activity) * 1200 + 40 + random() * 90),
        };
      }),
    );
  }, [days, hours]);
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  return (
    <HeatmapChart
      data={data}
      xCategories={hours}
      // rows go from bottom to top: reverse them to read Monday first
      yCategories={[...days].reverse()}
      name={t("sessions")}
      format={(value) => number.format(value)}
      locale={locale}
      height={280}
      ariaLabel={t("sessionsAria")}
    />
  );
}
