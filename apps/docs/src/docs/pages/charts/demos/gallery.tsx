import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  AreaChart,
  BarChart,
  BubbleChart,
  HorizontalBarChart,
  LineChart,
  MixedChart,
  RangeAreaChart,
  ScatterChart,
  Sparkline,
  type ChartSeries,
} from "minerva-design/charts";
import { GalleryCard, GalleryGrid } from "../gallery-card";

// The numbers live at module level; the names are translated in the
// component (memoized, so the charts only update when the language changes)

/** Small deterministic pseudo-random generator (same picture on every load) */
const random = (seed: number) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

const visits = [32, 41, 38, 52, 49, 61, 66, 72];
const signups = [12, 15, 19, 18, 24, 27, 26, 34];
const platforms = {
  web: [20, 24, 22, 30, 34, 31, 38, 42],
  ios: [12, 14, 18, 17, 20, 24, 23, 27],
  android: [8, 11, 10, 14, 16, 15, 19, 22],
};
// average daily low and high of each month (°C)
const lows = [-1, 0, 3, 6, 10, 13, 15, 15, 12, 8, 4, 1];
const highs = [5, 7, 12, 16, 20, 24, 26, 26, 21, 16, 10, 6];
const orders = [128, 164, 212, 187];
// share of developers using each language (%)
const languages: [string, number][] = [
  ["JavaScript", 62],
  ["Python", 51],
  ["TypeScript", 43],
  ["Java", 30],
  ["Go", 18],
];
// quarterly revenue (M$) and growth over the previous quarter
const quarterRevenue = [18, 21, 24, 31];
const growth = [0.04, 0.17, 0.14, 0.29];

const scatterGroups = (() => {
  const next = random(7);
  const group = (cx: number, cy: number) =>
    Array.from({ length: 40 }, () => ({
      x: cx + (next() - 0.5) * 30,
      y: cy + (next() - 0.5) * 30,
    }));
  return [group(35, 60), group(65, 35)];
})();

// marketing campaigns: cost (k$), sign-ups and reach (people)
const campaigns = {
  email: [
    [4, 320, 12_000],
    [6, 410, 18_000],
    [9, 380, 15_000],
  ],
  social: [
    [12, 520, 90_000],
    [18, 760, 140_000],
    [25, 690, 210_000],
  ],
} as const;

const revenueTrend = [18, 22, 19, 26, 24, 31, 29, 35, 33, 41, 38, 46];
const errorTrend = [9, 7, 8, 5, 6, 4, 5, 3, 4, 2, 3, 2];

export default function GalleryDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.charts.data",
  });
  const locale = i18n.language;

  const formats = useMemo(() => {
    const number = new Intl.NumberFormat(locale);
    const usd = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
    });
    const percent = new Intl.NumberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 0,
    });
    const celsius = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "celsius",
    });
    return {
      number: (value: number) => number.format(value),
      // values in millions of dollars
      millions: (value: number) => usd.format(value * 1e6),
      thousands: (value: number) => usd.format(value * 1e3),
      percent: (value: number) => percent.format(value),
      // values given in percent (62 = 62%)
      percentOf100: (value: number) => percent.format(value / 100),
      celsius: (value: number) => celsius.format(value),
    };
  }, [locale]);

  const data = useMemo(() => {
    // "Jan", "janv.", "1月"...
    const monthFormat = new Intl.DateTimeFormat(locale, { month: "short" });
    const months = lows.map((_, m) => monthFormat.format(new Date(2026, m, 1)));
    const pairs = (values: readonly number[]) =>
      values.map((value, i) => [months[i], value] as const);
    const quarters = quarterRevenue.map((_, i) => t("quarter", { n: i + 1 }));

    const line: ChartSeries[] = [
      { name: t("visits"), data: pairs(visits) },
      { name: t("signups"), data: pairs(signups) },
    ];
    const area: ChartSeries[] = [
      { name: t("web"), data: pairs(platforms.web) },
      { name: "iOS", data: pairs(platforms.ios) },
      { name: "Android", data: pairs(platforms.android) },
    ];
    const rangeArea: ChartSeries[] = [
      {
        name: t("temperature"),
        format: formats.celsius,
        data: months.map((x, i) => ({ x, y0: lows[i], y: highs[i] })),
      },
    ];
    const bar: ChartSeries[] = [
      {
        name: t("orders"),
        data: orders.map((y, i) => ({
          x: quarters[i],
          y,
          color: i === 2 ? "var(--success-color)" : undefined,
        })),
      },
    ];
    const horizontalBar: ChartSeries[] = [
      { name: t("developers"), format: formats.percentOf100, data: languages },
    ];
    const mixed: ChartSeries[] = [
      {
        name: t("revenue"),
        type: "bar",
        format: formats.millions,
        data: quarters.map((q, i) => [q, quarterRevenue[i]] as const),
      },
      {
        name: t("growth"),
        type: "line",
        yAxis: "right",
        format: formats.percent,
        color: "var(--chart-series-3, #f59e0b)",
        data: quarters.map((q, i) => [q, growth[i]] as const),
      },
    ];
    const scatter: ChartSeries[] = scatterGroups.map((group, i) => ({
      name: t("team", { name: i === 0 ? "A" : "B" }),
      data: group,
    }));
    const bubble: ChartSeries[] = (["email", "social"] as const).map(
      (channel) => ({
        name: t(`channels.${channel}`),
        valueName: t("reach"),
        format: (value: number) => formats.number(value),
        data: campaigns[channel].map(([x, y, value]) => ({ x, y, value })),
      }),
    );
    return {
      line,
      area,
      rangeArea,
      bar,
      horizontalBar,
      mixed,
      scatter,
      bubble,
    };
  }, [t, locale, formats]);

  return (
    <GalleryGrid>
      <GalleryCard
        title={t("cards.line.title")}
        component="LineChart"
        page="line-chart"
        description={t("cards.line.description")}
      >
        <LineChart
          series={data.line}
          height="100%"
          legend={false}
          ariaLabel={t("cards.line.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.area.title")}
        component="AreaChart"
        page="area-chart"
        description={t("cards.area.description")}
      >
        <AreaChart
          series={data.area}
          stacked
          height="100%"
          legend={false}
          ariaLabel={t("cards.area.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.rangeArea.title")}
        component="RangeAreaChart"
        page="range-area-chart"
        description={t("cards.rangeArea.description")}
      >
        <RangeAreaChart
          series={data.rangeArea}
          yAxis={{ format: formats.celsius }}
          height="100%"
          legend={false}
          ariaLabel={t("cards.rangeArea.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.bar.title")}
        component="BarChart"
        page="bar-chart"
        description={t("cards.bar.description")}
      >
        <BarChart
          series={data.bar}
          labels
          yAxis={{ format: formats.number }}
          height="100%"
          legend={false}
          ariaLabel={t("cards.bar.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.horizontalBar.title")}
        component="HorizontalBarChart"
        page="horizontal-bar-chart"
        description={t("cards.horizontalBar.description")}
      >
        <HorizontalBarChart
          series={data.horizontalBar}
          labels
          yAxis={{ format: formats.percentOf100 }}
          height="100%"
          legend={false}
          ariaLabel={t("cards.horizontalBar.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.mixed.title")}
        component="MixedChart"
        page="mixed-chart"
        description={t("cards.mixed.description")}
      >
        <MixedChart
          series={data.mixed}
          yAxis={{ format: formats.millions }}
          yAxis2={{ format: formats.percent }}
          height="100%"
          legend={false}
          ariaLabel={t("cards.mixed.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.scatter.title")}
        component="ScatterChart"
        page="scatter-chart"
        description={t("cards.scatter.description")}
      >
        <ScatterChart
          series={data.scatter}
          height="100%"
          legend={false}
          ariaLabel={t("cards.scatter.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.bubble.title")}
        component="BubbleChart"
        page="bubble-chart"
        description={t("cards.bubble.description")}
      >
        <BubbleChart
          series={data.bubble}
          maxSize={36}
          xAxis={{ format: formats.thousands }}
          yAxis={{ format: formats.number }}
          height="100%"
          legend={false}
          ariaLabel={t("cards.bubble.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.sparkline.title")}
        component="Sparkline"
        page="sparkline"
        description={t("cards.sparkline.description")}
      >
        <div style={{ display: "grid", gap: 12 }}>
          <div>
            <strong style={{ fontSize: 22 }}>{formats.thousands(46)}</strong>{" "}
            {t("revenueLabel")}
            <Sparkline
              data={revenueTrend}
              type="area"
              reference={30}
              name={t("revenueLabel")}
              format={formats.thousands}
              ariaLabel={t("revenueTrendAria")}
            />
          </div>
          <div>
            <strong style={{ fontSize: 22 }}>{formats.number(2)}</strong>{" "}
            {t("errorsLabel")}
            <Sparkline
              data={errorTrend}
              type="bar"
              name={t("errorsLabel")}
              color="var(--danger-color)"
              ariaLabel={t("errorsTrendAria")}
            />
          </div>
        </div>
      </GalleryCard>
    </GalleryGrid>
  );
}
