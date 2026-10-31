import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import { BubbleChart, type ChartSeries } from "minerva-design/charts";

// Store regions: sales per m² (k$), margin (%) and yearly revenue (M$);
// the 2026 network is about twice as big as in 2025
const regions = ["north", "south", "east", "west", "center"] as const;
const years = {
  2025: [
    [5.2, 18, 24],
    [4.1, 22, 15],
    [6.3, 15, 31],
    [3.8, 26, 9],
    [7.0, 20, 40],
  ],
  2026: [
    [5.9, 19, 52],
    [4.6, 24, 33],
    [6.8, 14, 61],
    [4.4, 27, 22],
    [7.6, 21, 88],
  ],
} as const;
type Year = keyof typeof years;
const largest = Math.max(
  ...Object.values(years).flatMap((rows) => rows.map((row) => row[2])),
);

export default function SharedScaleDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bubble-chart.data",
  });
  const locale = i18n.language;
  const [shared, setShared] = useState(true);

  const usd = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
    });
    return (value: number) => format.format(value * 1e6);
  }, [locale]);
  const perMeter = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
    });
    return (value: number) => format.format(value * 1000);
  }, [locale]);
  const percent = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 0,
    });
    return (value: number) => format.format(value / 100);
  }, [locale]);

  const seriesOf = useMemo(
    () =>
      (year: Year): ChartSeries[] =>
        regions.map((region, i) => {
          const [sales, margin, revenue] = years[year][i];
          return {
            name: t(`regions.${region}`),
            valueName: t("revenue"),
            format: usd,
            data: [{ x: sales, y: margin, value: revenue }],
          };
        }),
    [t, usd],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <Switch checked={shared} onChange={setShared} label={t("sharedScale")} />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {shared
          ? t("sharedScaleOn", { value: usd(largest) })
          : t("sharedScaleOff")}
      </output>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 16,
        }}
      >
        {(Object.keys(years) as unknown as Year[]).map((year) => (
          <figure key={year} style={{ margin: 0 }}>
            <figcaption style={{ fontWeight: 600, marginBottom: 4 }}>
              {new Intl.NumberFormat(locale, { useGrouping: false }).format(
                Number(year),
              )}
            </figcaption>
            <BubbleChart
              series={seriesOf(year)}
              maxSize={56}
              // the same maxValue draws the same revenue with the same area
              // in both charts; without it, each chart scales to its own max
              maxValue={shared ? largest : undefined}
              legend={{ position: "bottom" }}
              // same axis ranges, so the positions are comparable too
              xAxis={{
                title: t("salesPerMeter"),
                min: 3,
                max: 8.5,
                format: perMeter,
              }}
              yAxis={{ title: t("margin"), min: 10, max: 30, format: percent }}
              height={280}
              ariaLabel={t("sharedScaleAria", { year })}
            />
          </figure>
        ))}
      </div>
    </div>
  );
}
