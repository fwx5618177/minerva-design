import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  RadarChart,
  type RadarIndicator,
  type RadarSeries,
  type ShapeHoverEvent,
} from "minerva-design/charts";

type Kind = "currency" | "count" | "percent" | "score";

// Quarterly KPIs of a sales rep: every axis has its own unit and scale
// (min / max); the unfilled outline is the target
const KPIS: {
  key: string;
  kind: Kind;
  actual: number;
  target: number;
  max: number;
}[] = [
  {
    key: "revenue",
    kind: "currency",
    actual: 412_000,
    target: 450_000,
    max: 500_000,
  },
  { key: "deals", kind: "count", actual: 18, target: 20, max: 25 },
  { key: "winRate", kind: "percent", actual: 0.31, target: 0.3, max: 0.4 },
  {
    key: "dealSize",
    kind: "currency",
    actual: 22_900,
    target: 22_500,
    max: 30_000,
  },
  { key: "calls", kind: "count", actual: 240, target: 300, max: 350 },
  { key: "nps", kind: "score", actual: 46, target: 50, max: 70 },
];

export default function SalesTargetsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.radar-chart.data",
  });
  const locale = i18n.language;
  const [selected, setSelected] = useState<ShapeHoverEvent | null>(null);

  const indicators = useMemo(
    (): RadarIndicator[] =>
      KPIS.map(({ key, max }) => ({
        name: t(`sales.kpis.${key}`),
        min: 0,
        max,
      })),
    [t],
  );
  const series = useMemo(
    (): RadarSeries[] => [
      {
        name: t("sales.target"),
        values: KPIS.map((kpi) => kpi.target),
        color: "var(--text-secondary-color)",
        opacity: 0,
      },
      {
        name: t("sales.actual"),
        values: KPIS.map((kpi) => kpi.actual),
        color: "var(--primary-color)",
        opacity: 0.25,
      },
    ],
    [t],
  );
  const formats = useMemo(() => {
    const byKind: Record<Kind, Intl.NumberFormat> = {
      currency: new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 1,
      }),
      count: new Intl.NumberFormat(locale),
      percent: new Intl.NumberFormat(locale, { style: "percent" }),
      score: new Intl.NumberFormat(locale, { signDisplay: "exceptZero" }),
    };
    return {
      value: (kpi: number, value: number) =>
        byKind[KPIS[kpi].kind].format(value),
      attainment: (share: number) => byKind.percent.format(share),
    };
  }, [locale]);

  const line = (kpi: number) =>
    t("sales.line", {
      kpi: indicators[kpi].name,
      actual: formats.value(kpi, KPIS[kpi].actual),
      target: formats.value(kpi, KPIS[kpi].target),
      attainment: formats.attainment(KPIS[kpi].actual / KPIS[kpi].target),
    });

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <RadarChart
        indicators={indicators}
        series={series}
        renderTooltip={(event) =>
          event.indicator === undefined ? null : (
            <div style={{ display: "grid", gap: 2 }}>
              <strong>{indicators[event.indicator].name}</strong>
              <span>{line(event.indicator)}</span>
            </div>
          )
        }
        onClick={setSelected}
        height={380}
        ariaLabel={t("sales.aria")}
      />
      <p role="status" style={{ margin: 0 }}>
        {selected?.indicator !== undefined
          ? line(selected.indicator)
          : t("sales.hint")}
      </p>
    </div>
  );
}
