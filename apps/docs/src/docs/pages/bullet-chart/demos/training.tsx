import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Select, SelectItem } from "minerva-design";
import { BulletChart, type BulletDatum } from "minerva-design/charts";

type Runner = "amara" | "lucas" | "mei";
type Metric = "distance" | "longRun" | "elevation" | "sessions" | "sleep";

// Weekly training of three marathon runners against their coach's plan
const METRICS: Metric[] = [
  "distance",
  "longRun",
  "elevation",
  "sessions",
  "sleep",
];
// unit of each metric, formatted with Intl.NumberFormat (null: a plain count)
const UNITS: Record<Metric, string | null> = {
  distance: "kilometer",
  longRun: "kilometer",
  elevation: "meter",
  sessions: null,
  sleep: "hour",
};
const PLANS: Record<Runner, Record<Metric, number>> = {
  amara: { distance: 85, longRun: 30, elevation: 900, sessions: 6, sleep: 56 },
  lucas: { distance: 60, longRun: 24, elevation: 500, sessions: 5, sleep: 52 },
  mei: { distance: 72, longRun: 28, elevation: 1200, sessions: 6, sleep: 56 },
};
const WEEKS: Record<Runner, Record<Metric, number>> = {
  amara: { distance: 88, longRun: 31, elevation: 760, sessions: 6, sleep: 49 },
  lucas: { distance: 47, longRun: 18, elevation: 540, sessions: 4, sleep: 54 },
  mei: { distance: 74, longRun: 26, elevation: 1310, sessions: 5, sleep: 58 },
};
const RUNNERS = Object.keys(PLANS) as Runner[];

export default function TrainingDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bullet-chart.data",
  });
  const locale = i18n.language;
  const [runner, setRunner] = useState<Runner>("amara");

  const formats = useMemo(
    () =>
      Object.fromEntries(
        METRICS.map((metric) => {
          const unit = UNITS[metric];
          return [
            metric,
            new Intl.NumberFormat(
              locale,
              unit ? { style: "unit", unit, unitDisplay: "short" } : {},
            ),
          ];
        }),
      ) as Record<Metric, Intl.NumberFormat>,
    [locale],
  );
  const percent = useMemo(
    () => new Intl.NumberFormat(locale, { style: "percent" }),
    [locale],
  );

  // every row is scaled on its own plan: below 80 %, 80-100 %, above
  const data = useMemo(
    (): BulletDatum[] =>
      METRICS.map((metric) => {
        const plan = PLANS[runner][metric];
        return {
          name: t(`training.metrics.${metric}`),
          subtitle: t("training.plan", {
            plan: formats[metric].format(plan),
          }),
          value: WEEKS[runner][metric],
          target: plan,
          ranges: [plan * 0.8, plan, plan * 1.25],
        };
      }),
    [formats, runner, t],
  );
  const rangeLabels = useMemo(
    () => [
      t("training.ranges.under"),
      t("training.ranges.onPlan"),
      t("training.ranges.above"),
    ],
    [t],
  );
  const met = METRICS.filter(
    (metric) => WEEKS[runner][metric] >= PLANS[runner][metric],
  ).length;

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Select
        size="small"
        style={{ width: 200 }}
        aria-label={t("training.runner")}
        value={runner}
        onChange={(value) => setRunner(value as Runner)}
      >
        {RUNNERS.map((key) => (
          <SelectItem key={key} value={key}>
            {t(`training.runners.${key}`)}
          </SelectItem>
        ))}
      </Select>
      <BulletChart
        data={data}
        rangeLabels={rangeLabels}
        ticks={false}
        renderTooltip={(row) => {
          const metric = METRICS[row.index];
          return (
            <div style={{ display: "grid", gap: 2 }}>
              <strong>{row.name}</strong>
              <span>
                {t("training.tooltip", {
                  value: formats[metric].format(row.value),
                  plan: formats[metric].format(PLANS[runner][metric]),
                  share: percent.format(row.percent),
                })}
              </span>
            </div>
          );
        }}
        height={320}
        ariaLabel={t("training.aria", {
          runner: t(`training.runners.${runner}`),
        })}
      />
      <output aria-live="polite">
        {t("training.summary", {
          runner: t(`training.runners.${runner}`),
          met,
          metrics: METRICS.length,
        })}
      </output>
    </div>
  );
}
