import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  ScatterChart,
  type ChartAnnotation,
  type ChartHoverEvent,
  type ChartSeries,
} from "minerva-design/charts";

// Basketball league: usage rate (% of the team's plays a player finishes),
// true shooting (%) and points per game of 16 (fictional) players
const players: [string, number, number, number][] = [
  ["A. Okafor", 31.5, 61.2, 29.8],
  ["L. Moreau", 29.8, 55.1, 27.1],
  ["K. Tanaka", 27.2, 63.4, 24.6],
  ["D. Silva", 33.1, 53.2, 28.4],
  ["M. Novak", 18.4, 66.8, 14.2],
  ["J. Reyes", 21.6, 59.7, 17.9],
  ["T. Brooks", 24.9, 52.4, 19.6],
  ["S. Ivanov", 16.2, 62.1, 10.4],
  ["R. Chen", 22.8, 57.3, 18.1],
  ["P. Mensah", 14.9, 54.8, 8.7],
  ["E. Larsen", 26.4, 58.9, 22.3],
  ["H. Kim", 19.7, 51.6, 12.9],
  ["F. Rossi", 28.6, 60.4, 25.7],
  ["O. Haddad", 17.3, 57.8, 11.6],
  ["N. Dubois", 23.5, 64.2, 20.2],
  ["C. Walker", 30.2, 57.9, 26.8],
];
const LEAGUE_USAGE = 20;
const LEAGUE_TS = 57.5;

export default function PlayersDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.scatter-chart.data",
  });
  const locale = i18n.language;
  const decimal = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const percent = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "percent",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
    return (value: number) => format.format(value / 100);
  }, [locale]);

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("players"),
        showLabels: true,
        // the dot grows with the points per game
        data: players.map(([name, usage, ts, points]) => ({
          x: usage,
          y: ts,
          label: name,
          size: 4 + points / 2.5,
        })),
        opacity: 0.8,
      },
    ],
    [t],
  );
  // league averages split the plot; a caption names each corner
  const annotations = useMemo(
    (): ChartAnnotation[] => [
      { type: "line", axis: "x", value: LEAGUE_USAGE, dash: [4, 4] },
      {
        type: "line",
        axis: "y",
        value: LEAGUE_TS,
        dash: [4, 4],
        label: t("leagueAverage"),
      },
      {
        type: "rect",
        x0: LEAGUE_USAGE,
        y0: LEAGUE_TS,
        color: "var(--success-color)",
        opacity: 0.08,
        label: t("efficientScorers"),
        labelPosition: "top-right",
      },
      {
        type: "rect",
        x0: LEAGUE_USAGE,
        y1: LEAGUE_TS,
        color: "var(--warning-color)",
        opacity: 0.08,
        label: t("volumeShooters"),
        labelPosition: "bottom-right",
      },
    ],
    [t],
  );

  // a rich tooltip from the demo data (the hovered index is the player's)
  const tooltip = (event: ChartHoverEvent) => {
    const player = players[event.items[0]?.index ?? -1];
    if (!player) return null;
    const [name, usage, ts, points] = player;
    return (
      <div style={{ display: "grid", gap: 2 }}>
        <strong>{name}</strong>
        <span>{t("pointsPerGame", { value: decimal.format(points) })}</span>
        <span>{t("usageRow", { value: percent(usage) })}</span>
        <span>{t("trueShootingRow", { value: percent(ts) })}</span>
      </div>
    );
  };

  return (
    <ScatterChart
      series={series}
      annotations={annotations}
      xAxis={{ title: t("usageRate"), format: percent, min: 12, max: 36 }}
      yAxis={{ title: t("trueShooting"), format: percent, min: 50, max: 68 }}
      renderTooltip={tooltip}
      legend={false}
      height={360}
      ariaLabel={t("playersAria")}
    />
  );
}
