import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  RadarChart,
  type RadarIndicator,
  type RadarSeries,
  type ShapeHoverEvent,
} from "minerva-design/charts";

// Review scores (0-100) of three phones
const criteria = [
  "performance",
  "battery",
  "camera",
  "display",
  "value",
  "build",
];
const series: RadarSeries[] = [
  { name: "Aurora X", values: [92, 68, 88, 90, 55, 86] },
  { name: "Nimbus 5", values: [74, 91, 70, 78, 88, 72] },
  { name: "Vertex Pro", values: [85, 80, 94, 84, 66, 93] },
];

export default function CompareDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.radar-chart.data",
  });
  const [hovered, setHovered] = useState<ShapeHoverEvent | null>(null);

  const indicators = useMemo(
    (): RadarIndicator[] =>
      criteria.map((key) => ({ name: t(`criteria.${key}`), max: 100 })),
    [t],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <RadarChart
        indicators={indicators}
        series={series}
        onHover={setHovered}
        height={380}
        ariaLabel={t("phonesAria")}
      />
      <p role="status">
        {hovered && hovered.indicator !== undefined
          ? `${hovered.name} · ${indicators[hovered.indicator].name}: ${t(
              "outOf",
              { value: hovered.value, max: 100 },
            )}`
          : t("hoverPolygon")}
      </p>
    </div>
  );
}
