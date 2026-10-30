import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FunnelChart,
  type ShapeDatum,
  type ShapeHoverEvent,
} from "minerva-design/charts";

// Hiring pipeline of one engineering role, with the typical time per stage
const pipeline = [
  { key: "applied", value: 640, days: 0 },
  { key: "screened", value: 212, days: 4 },
  { key: "technical", value: 74, days: 9 },
  { key: "onsite", value: 21, days: 12 },
  { key: "offer", value: 6, days: 5 },
  { key: "hired", value: 4, days: 7 },
];
// cool to warm colors along the process
const colors = [
  "#64748b",
  "#6366f1",
  "#8b5cf6",
  "#d946ef",
  "#f43f5e",
  "#16a34a",
];

export default function RecruitingDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.funnel-chart.data",
  });
  const locale = i18n.language;
  const [selected, setSelected] = useState<ShapeHoverEvent | null>(null);

  const data = useMemo(
    (): ShapeDatum[] =>
      pipeline.map(({ key, value }, i) => ({
        name: t(`hiring.${key}`),
        value,
        color: colors[i],
      })),
    [t],
  );
  const percent = new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 1,
  });
  const days = new Intl.NumberFormat(locale, { style: "unit", unit: "day" });
  const totalDays = pipeline.reduce((sum, stage) => sum + stage.days, 0);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <FunnelChart
        data={data}
        shape="bar"
        gap={6}
        legend={false}
        percentFormat={(share) => percent.format(share)}
        renderTooltip={(event) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{event.name}</strong>
            <span>{t("candidates", { candidates: event.value })}</span>
            <span>
              {t("stageTime", {
                days: days.format(pipeline[event.index].days),
              })}
            </span>
          </div>
        )}
        onClick={setSelected}
        height={340}
        ariaLabel={t("hiringAria")}
      />
      <p role="status">
        {selected
          ? t("hiringSelected", {
              stage: selected.name,
              candidates: selected.value,
              share: percent.format(selected.percent),
            })
          : t("hiringSummary", {
              rate: percent.format(pipeline[5].value / pipeline[0].value),
              days: days.format(totalDays),
            })}
      </p>
    </div>
  );
}
