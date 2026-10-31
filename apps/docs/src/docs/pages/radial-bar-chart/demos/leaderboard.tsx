import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { RadialBarChart, type RadialBarDatum } from "minerva-design/charts";

type Stat = "goals" | "assists";

// Season statistics of a football league's top players
const PLAYERS: [key: string, goals: number, assists: number, games: number][] =
  [
    ["silva", 24, 7, 33],
    ["kowalski", 19, 12, 34],
    ["okafor", 17, 4, 30],
    ["moreau", 11, 15, 32],
    ["tanaka", 9, 13, 31],
    ["jensen", 14, 9, 28],
  ];
const STATS: Stat[] = ["goals", "assists"];
// gold, silver and bronze for the podium, a neutral color for the others
const PODIUM = ["#d4a72c", "#9ca3af", "#b4713d"];
const OTHERS = "#64748b";

export default function LeaderboardDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.radial-bar-chart.data",
  });
  const locale = i18n.language;
  const [stat, setStat] = useState<Stat>("goals");

  const ranked = useMemo(() => {
    const column = stat === "goals" ? 1 : 2;
    return [...PLAYERS].sort((a, b) => b[column] - a[column]);
  }, [stat]);
  // the leader is the outermost ring, and the scale is the leader's tally
  const data = useMemo(
    (): RadialBarDatum[] =>
      ranked.map(([key, goals, assists], rank) => ({
        name: t(`leaderboard.players.${key}`),
        value: stat === "goals" ? goals : assists,
        color: PODIUM[rank] ?? OTHERS,
      })),
    [ranked, stat, t],
  );
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const ratio = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    [locale],
  );

  const statName = t(`leaderboard.stats.${stat}`);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("leaderboard.stat")}
        direction="horizontal"
        value={stat}
        onChange={(value) => setStat(value as Stat)}
      >
        {STATS.map((key) => (
          <Radio key={key} value={key} label={t(`leaderboard.stats.${key}`)} />
        ))}
      </RadioGroup>
      <RadialBarChart
        data={data}
        startAngle={-90}
        sweep={270}
        innerRadius={0.25}
        gap={0.18}
        format={(value) => number.format(value)}
        renderTooltip={(bar) => {
          const games = ranked[bar.index][3];
          return (
            <div style={{ display: "grid", gap: 2 }}>
              <strong>
                {t("leaderboard.rank", {
                  rank: number.format(bar.index + 1),
                  name: bar.name,
                })}
              </strong>
              <span>
                {t("leaderboard.tally", {
                  value: number.format(bar.value),
                  stat: statName,
                  games: number.format(games),
                })}
              </span>
              <span>
                {t("leaderboard.perGame", {
                  ratio: ratio.format(bar.value / games),
                })}
              </span>
            </div>
          );
        }}
        height={360}
        ariaLabel={t("leaderboard.aria", { stat: statName })}
      />
      <output aria-live="polite">
        {t("leaderboard.leader", {
          name: data[0].name,
          value: number.format(data[0].value),
          stat: statName,
        })}
      </output>
    </div>
  );
}
