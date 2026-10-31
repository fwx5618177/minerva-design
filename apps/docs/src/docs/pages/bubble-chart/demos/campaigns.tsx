import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BubbleChart, type ChartSeries } from "minerva-design/charts";

// Marketing campaigns of 2026: launch (month, day), return on ad spend and
// budget (k$), by channel
const campaigns = {
  search: [
    [0, 12, 3.4, 42],
    [2, 3, 2.9, 55],
    [4, 20, 3.8, 38],
    [7, 8, 3.1, 61],
    [9, 15, 4.2, 47],
  ],
  social: [
    [1, 6, 1.6, 70],
    [3, 18, 0.8, 85],
    [5, 2, 1.9, 52],
    [8, 11, 2.3, 64],
    [10, 24, 1.2, 90],
  ],
  video: [
    [2, 22, 0.6, 120],
    [6, 1, 1.4, 140],
    [9, 4, 0.9, 110],
  ],
  email: [
    [0, 28, 5.6, 8],
    [3, 9, 4.8, 12],
    [5, 27, 6.3, 6],
    [8, 2, 5.1, 10],
    [11, 1, 7.2, 14],
  ],
} as const;
type Channel = keyof typeof campaigns;

export default function CampaignsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bubble-chart.data",
  });
  const locale = i18n.language;

  const usd = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
    });
    return (value: number) => format.format(value * 1000);
  }, [locale]);
  const month = useMemo(() => {
    const format = new Intl.DateTimeFormat(locale, {
      month: "short",
      timeZone: "UTC",
    });
    return (value: number) => format.format(value);
  }, [locale]);
  const roas = useMemo(() => {
    const format = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
    return (value: number) => `${format.format(value)}×`;
  }, [locale]);

  const series = useMemo((): ChartSeries[] => {
    const day = new Intl.DateTimeFormat(locale, {
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });
    return (Object.keys(campaigns) as Channel[]).map((channel) => ({
      name: t(`channels.${channel}`),
      valueName: t("budget"),
      format: usd,
      data: campaigns[channel].map(([m, d, ratio, budget]) => {
        const launch = Date.UTC(2026, m, d);
        return {
          x: launch,
          y: ratio,
          value: budget,
          label: t("launchedOn", { date: day.format(launch) }),
        };
      }),
    }));
  }, [t, locale, usd]);

  // click the legend items to hide or show a channel
  return (
    <BubbleChart
      series={series}
      minSize={8}
      maxSize={48}
      legend={{ position: "bottom", toggle: true }}
      xAxis={{
        type: "time",
        min: Date.UTC(2025, 11, 15),
        max: Date.UTC(2026, 11, 20),
        format: month,
        title: t("launch"),
      }}
      yAxis={{ title: t("roas"), min: 0, max: 8, format: roas }}
      annotations={[
        {
          type: "rect",
          y1: 1,
          color: "var(--danger-color)",
          opacity: 0.08,
        },
        {
          type: "line",
          axis: "y",
          value: 1,
          color: "var(--danger-color)",
          dash: [4, 4],
          label: t("breakEven"),
        },
      ]}
      height={380}
      ariaLabel={t("campaignsAria")}
    />
  );
}
