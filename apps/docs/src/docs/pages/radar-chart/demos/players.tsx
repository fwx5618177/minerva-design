import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  RadarChart,
  type RadarIndicator,
  type RadarSeries,
} from "minerva-design/charts";

// Season ratings (0-99) of two forwards, the way football games show them
const attributes = [
  "pace",
  "shooting",
  "passing",
  "dribbling",
  "defending",
  "physical",
];
const players = [
  { name: "L. Moreau", values: [91, 86, 74, 89, 38, 70], color: "#2563eb" },
  { name: "K. Adeyemi", values: [78, 90, 82, 80, 52, 86], color: "#dc2626" },
];

export default function PlayersDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.radar-chart.data",
  });

  // the same scale on every axis: 30 at the center, 99 at the rim
  const indicators = useMemo(
    (): RadarIndicator[] =>
      attributes.map((key) => ({
        name: t(`football.${key}`),
        min: 30,
        max: 99,
      })),
    [t],
  );
  const series = useMemo(
    (): RadarSeries[] => players.map((player) => ({ ...player, opacity: 0.2 })),
    [],
  );

  return (
    <RadarChart
      indicators={indicators}
      series={series}
      levels={3}
      height={360}
      ariaLabel={t("playersAria")}
    />
  );
}
