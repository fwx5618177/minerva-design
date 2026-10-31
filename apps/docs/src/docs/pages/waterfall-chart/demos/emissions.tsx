import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { WaterfallChart, type WaterfallStep } from "minerva-design/charts";

// Greenhouse gas emissions of a manufacturer (kt CO₂e), from the 2019
// baseline to 2025, against the 2030 reduction target
const BASELINE = 5.2;
const TARGET = 2.6;
const DRIVERS = [
  ["growth", 0.9],
  ["efficiency", -0.7],
  ["renewables", -1.1],
  ["fleet", -0.4],
  ["refrigerants", -0.2],
  ["acquisition", 0.3],
] as const;

export default function EmissionsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.waterfall-chart.data",
  });
  const locale = i18n.language;

  const kt = useMemo(() => {
    const number = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
    return (value: number) =>
      t("emissions.kt", { value: number.format(value) });
  }, [locale, t]);
  const signed = useMemo(() => {
    const number = new Intl.NumberFormat(locale, {
      maximumFractionDigits: 1,
      signDisplay: "exceptZero",
    });
    return (value: number) =>
      t("emissions.kt", { value: number.format(value) });
  }, [locale, t]);

  const steps = useMemo(
    (): WaterfallStep[] => [
      { label: t("emissions.baseline"), kind: "subtotal" },
      ...DRIVERS.map(([key, value]) => ({
        label: t(`emissions.${key}`),
        value,
      })),
      { label: t("emissions.current"), kind: "total" },
    ],
    [t],
  );

  // more emissions are bad news: increases in red, reductions in green
  return (
    <WaterfallChart
      steps={steps}
      start={BASELINE}
      name={t("emissions.name")}
      format={kt}
      upColor="var(--danger-color, #dc2626)"
      downColor="var(--success-color, #16a34a)"
      totalColor="var(--text-secondary-color, #64748b)"
      yAxis={{ format: kt, min: 0 }}
      annotations={[
        {
          type: "line",
          axis: "y",
          value: TARGET,
          color: "var(--success-color, #16a34a)",
          dash: [6, 4],
          label: t("emissions.target"),
        },
      ]}
      renderTooltip={(event) => {
        const item = event.items[0];
        if (!item) return null;
        const step = steps[item.index];
        const change = item.y0 === undefined ? null : item.y - item.y0;
        return (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{step?.label ?? event.xLabel}</strong>
            {change === null ? (
              <span>{kt(item.y)}</span>
            ) : (
              <>
                <span>{t("emissions.change", { value: signed(change) })}</span>
                <span>
                  {t("emissions.range", {
                    from: kt(item.y0 ?? 0),
                    to: kt(item.y),
                  })}
                </span>
              </>
            )}
            <span style={{ color: "var(--text-muted-color)" }}>
              {t("emissions.gap", { value: kt(item.y - TARGET) })}
            </span>
          </div>
        );
      }}
      height={340}
      ariaLabel={t("emissions.aria")}
    />
  );
}
