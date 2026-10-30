import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader } from "minerva-design";
import {
  AreaChart,
  BarChart,
  DonutChart,
  Sparkline,
  type ChartSeries,
  type ShapeDatum,
} from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const DAY = 24 * 60 * 60 * 1000;
const START = new Date(2026, 9, 1).getTime();

// 30 days of a web shop: visitors (new / returning), orders and revenue
const random = mulberry32(30);
const days = Array.from({ length: 30 }, (_, i) => {
  const weekend = [0, 6].includes(new Date(START + i * DAY).getDay());
  const base = (weekend ? 0.75 : 1) * (1 + i / 60);
  const fresh = Math.round(2400 * base * (0.9 + random() * 0.2));
  const returning = Math.round(1700 * base * (0.9 + random() * 0.2));
  const orders = Math.round((fresh + returning) * (0.028 + random() * 0.006));
  return {
    time: START + i * DAY,
    fresh,
    returning,
    orders,
    revenue: orders * 64,
  };
});
const sum = (key: "fresh" | "returning" | "orders" | "revenue") =>
  days.reduce((total, day) => total + day[key], 0);

const devices = [
  { key: "mobile", value: 58 },
  { key: "desktop", value: 35 },
  { key: "tablet", value: 7 },
];
const pages = [
  { path: "/", views: 41_200 },
  { path: "/sale", views: 26_900 },
  { path: "/shoes", views: 18_300 },
  { path: "/bags", views: 12_700 },
  { path: "/checkout", views: 9_800 },
];

export default function DashboardDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.charts.data",
  });
  const locale = i18n.language;

  const formats = useMemo(
    () => ({
      number: new Intl.NumberFormat(locale),
      compact: new Intl.NumberFormat(locale, { notation: "compact" }),
      usd: new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 1,
      }),
      percent: new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
      date: new Intl.DateTimeFormat(locale, { month: "short", day: "numeric" }),
    }),
    [locale],
  );
  const traffic = useMemo(
    (): ChartSeries[] => [
      {
        name: t("newVisitors"),
        data: days.map((d) => [d.time, d.fresh] as const),
      },
      {
        name: t("returningVisitors"),
        data: days.map((d) => [d.time, d.returning] as const),
      },
    ],
    [t],
  );
  const deviceData = useMemo(
    (): ShapeDatum[] =>
      devices.map(({ key, value }) => ({ name: t(`devices.${key}`), value })),
    [t],
  );
  const pageSeries = useMemo(
    (): ChartSeries[] => [
      {
        name: t("pageViews"),
        data: pages.map(({ path, views }) => [path, views] as const),
      },
    ],
    [t],
  );

  const visitors = sum("fresh") + sum("returning");
  const kpis = [
    {
      label: t("visitors"),
      value: formats.compact.format(visitors),
      data: days.map((d) => d.fresh + d.returning),
    },
    {
      label: t("ordersLabel"),
      value: formats.number.format(sum("orders")),
      data: days.map((d) => d.orders),
    },
    {
      label: t("revenueLabel"),
      value: formats.usd.format(sum("revenue")),
      data: days.map((d) => d.revenue),
    },
    {
      label: t("conversion"),
      value: formats.percent.format(sum("orders") / visitors),
      data: days.map((d) => d.orders / (d.fresh + d.returning)),
    },
  ];

  return (
    <div style={{ display: "grid", gap: 16, width: "100%" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: 12,
        }}
      >
        {kpis.map((kpi) => (
          <Card key={kpi.label} padding="small">
            <CardHeader>
              <CardDescription>{kpi.label}</CardDescription>
              <strong style={{ fontSize: 22 }}>{kpi.value}</strong>
            </CardHeader>
            <CardContent>
              <Sparkline
                data={kpi.data}
                type="area"
                height={36}
                name={kpi.label}
                tooltip={false}
                ariaLabel={t("last30Aria", { metric: kpi.label })}
              />
            </CardContent>
          </Card>
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 16,
        }}
      >
        <AreaChart
          series={traffic}
          stacked
          xAxis={{
            type: "time",
            format: (value) => formats.date.format(value),
            tickCount: 5,
          }}
          yAxis={{ format: (value) => formats.compact.format(value) }}
          legend={{ position: "bottom" }}
          height={260}
          ariaLabel={t("trafficAria")}
        />
        <DonutChart
          data={deviceData}
          labels="none"
          centerValue={formats.compact.format(visitors)}
          centerLabel={t("visitors")}
          format={(value) => formats.percent.format(value / 100)}
          renderTooltip={(slice) => (
            <span>
              {slice.name} · {formats.percent.format(slice.percent)}
            </span>
          )}
          legend={{ position: "bottom" }}
          height={260}
          ariaLabel={t("devicesAria")}
        />
      </div>
      <BarChart
        series={pageSeries}
        labels
        yAxis={{ format: (value) => formats.compact.format(value) }}
        legend={false}
        height={220}
        ariaLabel={t("topPagesAria")}
      />
    </div>
  );
}
