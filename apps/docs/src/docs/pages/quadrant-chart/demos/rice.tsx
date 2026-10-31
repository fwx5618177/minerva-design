import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import { QuadrantChart, type QuadrantPoint } from "minerva-design/charts";

type Item =
  | "bulkEdit"
  | "sso"
  | "offlineMode"
  | "onboardingTour"
  | "aiSummary"
  | "themes"
  | "auditLog"
  | "chatAlerts"
  | "apiV2"
  | "csvImport";

// RICE inputs: reach (thousand users a quarter), impact (0.25 to 3),
// confidence (0 to 1) and effort (person-months)
const BACKLOG: [Item, number, number, number, number][] = [
  ["bulkEdit", 6, 1, 0.8, 1.5],
  ["sso", 2.5, 3, 0.9, 5],
  ["offlineMode", 8, 2, 0.5, 9],
  ["onboardingTour", 12, 1, 0.8, 2],
  ["aiSummary", 10, 2, 0.5, 3],
  ["themes", 9, 0.5, 1, 1],
  ["auditLog", 1.5, 2, 0.8, 3],
  ["chatAlerts", 5, 1, 1, 1],
  ["apiV2", 3, 3, 0.8, 10],
  ["csvImport", 4, 0.5, 1, 0.5],
];

export default function RiceDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.quadrant-chart.data",
  });
  const [weighted, setWeighted] = useState(true);

  // y: reach × impact (× confidence); RICE score = y / effort
  const scored = useMemo(
    () =>
      BACKLOG.map(([key, reach, impact, confidence, effort]) => {
        const value = reach * impact * (weighted ? confidence : 1);
        return { key, reach, impact, confidence, effort, value };
      }).map((item) => ({ ...item, score: item.value / item.effort })),
    [weighted],
  );
  const points = useMemo(
    (): QuadrantPoint[] =>
      scored.map(({ key, effort, value, score }) => ({
        label: t(`rice.items.${key}`),
        x: effort,
        y: value,
        size: Math.round(8 + 6 * Math.sqrt(score)),
      })),
    [scored, t],
  );

  const decimal = useMemo(
    () => new Intl.NumberFormat(i18n.language, { maximumFractionDigits: 1 }),
    [i18n.language],
  );
  const percent = useMemo(
    () => new Intl.NumberFormat(i18n.language, { style: "percent" }),
    [i18n.language],
  );
  const top = [...scored]
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item) => t(`rice.items.${item.key}`));

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch
        checked={weighted}
        onChange={setWeighted}
        label={t("rice.weighted")}
      />
      <QuadrantChart
        points={points}
        xDomain={[0, 12]}
        yDomain={[0, 22]}
        xSplit={4}
        ySplit={9}
        quadrants={{
          topLeft: { label: t("quickWins") },
          topRight: { label: t("bigBets") },
          bottomLeft: { label: t("fillIns") },
          bottomRight: { label: t("moneyPits") },
        }}
        xLabel={t("rice.effort")}
        yLabel={t("rice.value")}
        renderTooltip={(_point, index) => {
          const item = scored[index];
          if (!item) return null;
          return (
            <div style={{ display: "grid", gap: 2 }}>
              <strong>{t(`rice.items.${item.key}`)}</strong>
              <span>
                {t("rice.inputs", {
                  reach: decimal.format(item.reach),
                  impact: decimal.format(item.impact),
                  confidence: percent.format(item.confidence),
                  effort: decimal.format(item.effort),
                })}
              </span>
              <span>
                {t("rice.score", { score: decimal.format(item.score) })}
              </span>
            </div>
          );
        }}
        height={380}
        ariaLabel={t("rice.aria")}
      />
      <output aria-live="polite">
        {t("rice.top", {
          list: new Intl.ListFormat(i18n.language, {
            type: "conjunction",
          }).format(top),
        })}
      </output>
    </div>
  );
}
