import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  BoxPlotChart,
  BulletChart,
  CalendarHeatmap,
  GanttChart,
  GaugeChart,
  HeatmapChart,
  HistogramChart,
  RadialBarChart,
  WaterfallChart,
  type BoxplotGroup,
  type BulletDatum,
  type CalendarDatum,
  type GanttTask,
  type HeatmapCell,
  type RadialBarDatum,
  type WaterfallStep,
} from "minerva-design/charts";
import { GalleryCard, GalleryGrid } from "../gallery-card";

/** Small deterministic pseudo-random generator (same picture on every load) */
const random = (seed: number) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};
/** Log-normal samples around a median (Box-Muller) */
const logNormal = (seed: number, median: number, spread: number, n: number) => {
  const next = random(seed);
  return Float64Array.from({ length: n }, () => {
    const z =
      Math.sqrt(-2 * Math.log(next() || 1e-9)) * Math.cos(2 * Math.PI * next());
    return median * Math.exp(spread * z);
  });
};

// response times (ms) of all the requests, then per service
const latencies = logNormal(1, 60, 0.45, 5000);
const services = [
  ["gateway", 20, 0.35],
  ["search", 90, 0.45],
  ["checkout", 140, 0.38],
  ["images", 60, 0.6],
] as const;
const serviceSamples = services.map(([, median, spread], i) =>
  logNormal(10 + i, median, spread, 400),
);

// annual recurring revenue bridge (M$), from last year to this year
const bridge = [
  ["lastYear", "subtotal"],
  ["newCustomers", 38],
  ["expansion", 17],
  ["churn", -21],
  ["pricing", 9],
  ["thisYear", "total"],
] as const;

// load per weekday (Monday first) and 4-hour slot
const load = (() => {
  const next = random(3);
  return Array.from({ length: 7 }, (_, d) =>
    Array.from({ length: 6 }, (_, s) =>
      Math.round((d < 5 ? 40 : 15) + (s >= 2 && s <= 4 ? 40 : 0) + next() * 20),
    ),
  );
})();

// commits per day over 20 weeks (local dates, quiet weekends)
const commits: CalendarDatum[] = (() => {
  const next = random(11);
  const days: CalendarDatum[] = [];
  for (let i = 0; i < 140; i++) {
    const date = new Date(2026, 5, 1 + i);
    const weekend = date.getDay() === 0 || date.getDay() === 6;
    if (next() < (weekend ? 0.2 : 0.85)) {
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      days.push({
        date: `${date.getFullYear()}-${month}-${day}`,
        value: 1 + Math.round(next() * (weekend ? 3 : 9)),
      });
    }
  }
  return days;
})();

const gaugeBands = [
  { to: 60, color: "var(--danger-color)" },
  { to: 85, color: "var(--warning-color)" },
  { to: 100, color: "var(--success-color)" },
];

// quarter-to-date KPIs: poor / fair / good ranges and the target
const kpis = [
  { key: "revenue", value: 270, target: 250, ranges: [150, 225, 300] },
  { key: "profit", value: 22, target: 26, ranges: [15, 22, 30] },
  { key: "satisfaction", value: 4.6, target: 4.4, ranges: [3.5, 4.2, 5] },
] as const;

// quarterly objectives: progress against each goal
const objectives = [
  ["revenue", 82, 100],
  ["users", 64, 100],
  ["retention", 91, 100],
] as const;

// a release plan (local dates)
const plan = [
  ["research", 1, 6, 1],
  ["design", 5, 13, 1],
  ["build", 10, 27, 0.6],
  ["test", 22, 31, 0.2],
] as const;
const today = new Date(2026, 10, 18);

export default function GalleryStatisticsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.charts.data",
  });
  const locale = i18n.language;

  const formats = useMemo(() => {
    const number = new Intl.NumberFormat(locale);
    const ms = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "millisecond",
      maximumFractionDigits: 0,
    });
    const usd = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
    });
    const percent = new Intl.NumberFormat(locale, { style: "percent" });
    return {
      number: (value: number) => number.format(Math.round(value)),
      ms: (value: number) => ms.format(value),
      // values in millions of dollars
      millions: (value: number) => usd.format(value * 1e6),
      percent: (share: number) => percent.format(share),
    };
  }, [locale]);

  const data = useMemo(() => {
    const groups: BoxplotGroup[] = services.map(([key], i) => ({
      x: t(`services.${key}`),
      values: serviceSamples[i],
    }));
    const steps: WaterfallStep[] = bridge.map(([key, value]) =>
      typeof value === "number"
        ? { label: t(`bridge.${key}`), value }
        : { label: t(`bridge.${key}`), kind: value },
    );
    const dayFormat = new Intl.DateTimeFormat(locale, { weekday: "short" });
    // 5 January 2026 is a Monday
    const days = load.map((_, d) => dayFormat.format(new Date(2026, 0, 5 + d)));
    const hourFormat = new Intl.DateTimeFormat(locale, { hour: "numeric" });
    const slots = load[0].map((_, s) =>
      hourFormat.format(new Date(2026, 0, 5, s * 4)),
    );
    const cells: HeatmapCell[] = days.flatMap((day, d) =>
      slots.map((slot, s) => ({ x: day, y: slot, value: load[d][s] })),
    );
    const bullets: BulletDatum[] = kpis.map(({ key, ...kpi }) => ({
      name: t(`kpis.${key}`),
      ...kpi,
      ranges: [...kpi.ranges],
    }));
    const rings: RadialBarDatum[] = objectives.map(([key, value, max]) => ({
      name: t(`objectives.${key}`),
      value,
      max,
    }));
    const tasks: GanttTask[] = plan.map(([key, start, end, progress]) => ({
      name: t(`plan.${key}`),
      start: new Date(2026, 10, start),
      end: new Date(2026, 10, end),
      progress,
    }));
    return { groups, steps, days, slots, cells, bullets, rings, tasks };
  }, [t, locale]);

  const rangeLabels = useMemo(
    () => [t("ranges.poor"), t("ranges.fair"), t("ranges.good")],
    [t],
  );
  const boxLabels = useMemo(
    () => ({
      max: t("stats.max"),
      q3: t("stats.q3"),
      median: t("stats.median"),
      q1: t("stats.q1"),
      min: t("stats.min"),
      outliers: t("stats.outliers"),
    }),
    [t],
  );

  return (
    <GalleryGrid>
      <GalleryCard
        title={t("cards.histogram.title")}
        component="HistogramChart"
        page="histogram-chart"
        description={t("cards.histogram.description")}
      >
        <HistogramChart
          values={latencies}
          domain={[0, 200]}
          bins={40}
          name={t("requests")}
          formatBin={formats.ms}
          xAxis={{ format: formats.ms }}
          yAxis={{ format: formats.number }}
          height="100%"
          legend={false}
          ariaLabel={t("cards.histogram.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.boxplot.title")}
        component="BoxPlotChart"
        page="boxplot-chart"
        description={t("cards.boxplot.description")}
      >
        <BoxPlotChart
          groups={data.groups}
          name={t("responseTime")}
          yAxis={{ format: formats.ms }}
          tooltip={{ labels: boxLabels }}
          height="100%"
          legend={false}
          ariaLabel={t("cards.boxplot.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.waterfall.title")}
        component="WaterfallChart"
        page="waterfall-chart"
        description={t("cards.waterfall.description")}
      >
        <WaterfallChart
          steps={data.steps}
          start={120}
          name={t("amount")}
          format={formats.millions}
          yAxis={{ format: formats.millions }}
          height="100%"
          legend={false}
          ariaLabel={t("cards.waterfall.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.heatmap.title")}
        component="HeatmapChart"
        page="heatmap-chart"
        description={t("cards.heatmap.description")}
      >
        <HeatmapChart
          data={data.cells}
          xCategories={data.days}
          yCategories={data.slots}
          name={t("load")}
          radius={2}
          height="100%"
          ariaLabel={t("cards.heatmap.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.calendar.title")}
        component="CalendarHeatmap"
        page="calendar-heatmap"
        description={t("cards.calendar.description")}
      >
        <CalendarHeatmap
          data={commits}
          range={["2026-06-01", "2026-10-18"]}
          locale={locale}
          format={formats.number}
          height="100%"
          ariaLabel={t("cards.calendar.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.gauge.title")}
        component="GaugeChart"
        page="gauge-chart"
        description={t("cards.gauge.description")}
      >
        <GaugeChart
          value={78}
          label={t("uptimeScore")}
          bands={gaugeBands}
          format={formats.number}
          tooltip={false}
          height="100%"
          ariaLabel={t("uptimeScore")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.bullet.title")}
        component="BulletChart"
        page="bullet-chart"
        description={t("cards.bullet.description")}
      >
        <BulletChart
          data={data.bullets}
          rangeLabels={rangeLabels}
          percentFormat={formats.percent}
          height="100%"
          ariaLabel={t("cards.bullet.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.radialBar.title")}
        component="RadialBarChart"
        page="radial-bar-chart"
        description={t("cards.radialBar.description")}
      >
        <RadialBarChart
          data={data.rings}
          sweep={270}
          innerRadius={0.3}
          percentFormat={formats.percent}
          legend={false}
          height="100%"
          ariaLabel={t("cards.radialBar.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.gantt.title")}
        component="GanttChart"
        page="gantt-chart"
        description={t("cards.gantt.description")}
      >
        <GanttChart
          tasks={data.tasks}
          today={today}
          todayLabel={t("today")}
          taskName={t("taskName")}
          progressName={t("progress")}
          height="100%"
          legend={false}
          ariaLabel={t("cards.gantt.aria")}
        />
      </GalleryCard>
    </GalleryGrid>
  );
}
