import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { WaterfallChart, type WaterfallStep } from "minerva-design/charts";

const WORK = "var(--chart-series-1, #4f46e5)";
const WAIT = "var(--warning-color, #f59e0b)";

// Order-to-delivery lead time (days): each stage adds its duration; the
// stages where the order only waits get their own color
const STAGES = [
  ["orderEntry", 0.5, "work"],
  ["creditCheck", 1, "wait"],
  ["picking", 1.5, "work"],
  ["quality", 0.5, "work"],
  ["carrierWait", 2, "wait"],
  ["transit", 3.5, "work"],
  ["customs", 1, "wait"],
] as const;

const TOTAL = STAGES.reduce((sum, [, days]) => sum + days, 0);
const WORKING = STAGES.reduce(
  (sum, [, days, kind]) => (kind === "work" ? sum + days : sum),
  0,
);

export default function LeadTimeDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.waterfall-chart.data",
  });
  const locale = i18n.language;

  const days = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "day",
      unitDisplay: "short",
      maximumFractionDigits: 1,
    });
    return (value: number) => format.format(value);
  }, [locale]);
  const percent = new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 0,
  });

  const steps = useMemo(
    (): WaterfallStep[] => [
      ...STAGES.map(([key, value, kind]) => ({
        label: t(`lead.${key}`),
        value,
        color: kind === "work" ? WORK : WAIT,
      })),
      { label: t("lead.total"), kind: "total" },
    ],
    [t],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <WaterfallChart
        steps={steps}
        name={t("lead.name")}
        format={days}
        totalColor="var(--text-secondary-color, #64748b)"
        connector={{ dash: [], color: "var(--border-color, #cbd5e1)" }}
        yAxis={{ format: days }}
        height={320}
        ariaLabel={t("lead.aria")}
      />
      <p style={{ margin: 0, color: "var(--text-muted-color)" }}>
        <span aria-hidden style={{ color: WORK }}>
          ■
        </span>{" "}
        {t("lead.work")}{" "}
        <span aria-hidden style={{ color: WAIT }}>
          ■
        </span>{" "}
        {t("lead.wait")} ·{" "}
        {t("lead.summary", {
          work: days(WORKING),
          total: days(TOTAL),
          share: percent.format(WORKING / TOTAL),
        })}
      </p>
    </div>
  );
}
