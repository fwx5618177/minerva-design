import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  QuadrantChart,
  type QuadrantPoint,
  type QuadrantRegions,
} from "minerva-design/charts";

// Project risks scored from 1 to 5. x: likelihood, y: impact
const risks = [
  { key: "keyPerson", likelihood: 2, impact: 4.5 },
  { key: "vendorDelay", likelihood: 4, impact: 3.5 },
  { key: "dataBreach", likelihood: 1.5, impact: 5 },
  { key: "scopeCreep", likelihood: 4.5, impact: 2.5 },
  { key: "budgetCut", likelihood: 2.5, impact: 3.5 },
  { key: "regulation", likelihood: 3.5, impact: 4.2 },
  { key: "outage", likelihood: 3, impact: 2 },
  { key: "turnover", likelihood: 1.5, impact: 1.5 },
];

export default function RiskDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.quadrant-chart.data",
  });
  const [selected, setSelected] = useState<string | null>(null);

  const points = useMemo(
    (): QuadrantPoint[] =>
      risks.map(({ key, likelihood, impact }) => ({
        label: t(`risks.${key}`),
        x: likelihood,
        y: impact,
      })),
    [t],
  );
  const quadrants = useMemo(
    (): QuadrantRegions => ({
      topLeft: { label: t("monitor"), color: "var(--warning-color)" },
      topRight: { label: t("actNow"), color: "var(--danger-color)" },
      bottomLeft: { label: t("accept"), color: "var(--success-color)" },
      bottomRight: { label: t("mitigate"), color: "var(--warning-color)" },
    }),
    [t],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <QuadrantChart
        points={points}
        quadrants={quadrants}
        xDomain={[1, 5]}
        yDomain={[1, 5]}
        xSplit={3}
        ySplit={3}
        xLabel={t("likelihood")}
        yLabel={t("severity")}
        name={t("risk")}
        onPointClick={(point) => setSelected(point.label ?? null)}
        onQuadrantClick={() => setSelected(null)}
        height={340}
        ariaLabel={t("riskAria")}
      />
      <p role="status">
        {selected ? t("riskSelected", { risk: selected }) : t("clickRisk")}
      </p>
    </div>
  );
}
