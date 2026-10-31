import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import {
  TreeChart,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type State = "pending" | "played" | "alive" | "out" | "champion";
type Round = "quarterFinal" | "semiFinal" | "final";

/** Small seeded PRNG so the results are the same on every render */
const mulberry32 = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let r = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
  return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
};

// region code and rating, in bracket order (seeds 1 v 8, 4 v 5, 2 v 7, 3 v 6)
const TEAMS: [string, number, number][] = [
  ["AR", 1, 92],
  ["MA", 8, 78],
  ["ES", 4, 85],
  ["NL", 5, 83],
  ["FR", 2, 90],
  ["JP", 7, 79],
  ["BR", 3, 88],
  ["DE", 6, 82],
];

// match, round, the two nodes it is played between
const MATCHES: [string, Round, string, string][] = [
  ["qf0", "quarterFinal", "AR", "MA"],
  ["qf1", "quarterFinal", "ES", "NL"],
  ["qf2", "quarterFinal", "FR", "JP"],
  ["qf3", "quarterFinal", "BR", "DE"],
  ["sf0", "semiFinal", "qf0", "qf1"],
  ["sf1", "semiFinal", "qf2", "qf3"],
  ["final", "final", "sf0", "sf1"],
];
const ROUNDS: Round[] = ["quarterFinal", "semiFinal", "final"];
const RATING = new Map(TEAMS.map(([code, , rating]) => [code, rating]));
const STATES: State[] = ["pending", "played", "alive", "out", "champion"];
const COLORS: Record<State, string> = {
  pending: "var(--text-secondary-color, #9ca3af)",
  played: "var(--primary-color, #4f46e5)",
  alive: "var(--success-color, #16a34a)",
  out: "var(--danger-color, #dc2626)",
  champion: "var(--warning-color, #d97706)",
};

interface Result {
  winner: string;
  loser: string;
  goals: [number, number];
}

/** Plays the whole tournament with a seed: the better rating wins more often */
const play = (seed: number) => {
  const random = mulberry32(seed);
  const results = new Map<string, Result>();
  const teamOf = (id: string) => results.get(id)?.winner ?? id;
  for (const [id, , a, b] of MATCHES) {
    const [home, away] = [teamOf(a), teamOf(b)];
    const odds = RATING.get(home)! / (RATING.get(home)! + RATING.get(away)!);
    const homeWins = random() < odds;
    const loserGoals = Math.floor(random() * 3);
    const winnerGoals = loserGoals + 1 + Math.floor(random() * 2);
    results.set(id, {
      winner: homeWins ? home : away,
      loser: homeWins ? away : home,
      goals: [winnerGoals, loserGoals],
    });
  }
  return results;
};

export default function BracketDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.tree-chart.data",
  });
  const [seed, setSeed] = useState(2026);
  const [played, setPlayed] = useState(0);
  const results = useMemo(() => play(seed), [seed]);
  const names = useMemo(
    () => new Intl.DisplayNames(i18n.language, { type: "region" }),
    [i18n.language],
  );
  const integer = useMemo(
    () => new Intl.NumberFormat(i18n.language),
    [i18n.language],
  );
  const country = (code: string) => names.of(code) ?? code;

  const nodes = useMemo((): GraphNode[] => {
    const isPlayed = (round: Round) => ROUNDS.indexOf(round) < played;
    const nameOf = (code: string) => names.of(code) ?? code;
    const out = new Set(
      MATCHES.filter(([, round]) => isPlayed(round)).map(
        ([id]) => results.get(id)!.loser,
      ),
    );
    return [
      ...MATCHES.map(([id, round]): GraphNode => {
        const result = results.get(id)!;
        if (!isPlayed(round)) {
          return {
            id,
            label: t(`rounds.${round}`),
            subtitle: t("tbd"),
            group: "pending",
          };
        }
        return {
          id,
          label: nameOf(result.winner),
          subtitle: t("score", {
            winner: integer.format(result.goals[0]),
            loser: integer.format(result.goals[1]),
          }),
          group: round === "final" ? "champion" : "played",
        };
      }),
      ...TEAMS.map(([code, seedNumber]): GraphNode => ({
        id: code,
        label: nameOf(code),
        subtitle: t("seed", { n: seedNumber }),
        group: out.has(code) ? "out" : "alive",
      })),
    ];
  }, [t, results, played, names, integer]);
  const edges = useMemo(
    (): GraphEdge[] =>
      MATCHES.flatMap(([id, , a, b]) => [
        { source: id, target: a },
        { source: id, target: b },
      ]),
    [],
  );
  const groups = useMemo(
    () =>
      STATES.map((id) => ({
        id,
        name: t(`bracketStates.${id}`),
        color: COLORS[id],
      })),
    [t],
  );

  const lastRound = played > 0 ? ROUNDS[played - 1] : null;
  const list = new Intl.ListFormat(i18n.language);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={8} wrap>
        <Button
          size="small"
          disabled={played === ROUNDS.length}
          onClick={() => setPlayed(played + 1)}
        >
          {t("nextRound")}
        </Button>
        <Button
          size="small"
          variant="outline"
          color="neutral"
          onClick={() => setPlayed(0)}
        >
          {t("restart")}
        </Button>
        <Button
          size="small"
          variant="outline"
          color="neutral"
          onClick={() => {
            setSeed(seed + 1);
            setPlayed(0);
          }}
        >
          {t("newSimulation")}
        </Button>
      </HStack>
      <TreeChart
        nodes={nodes}
        edges={edges}
        groups={groups}
        layout="tree"
        direction="RL"
        nodeShape="box"
        edgeStyle="orthogonal"
        tree={{ collapsible: false }}
        height={440}
        ariaLabel={t("bracketAria")}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {lastRound === "final"
          ? t("championResult", {
              team: country(results.get("final")!.winner),
            })
          : lastRound
            ? t("roundResult", {
                round: t(`rounds.${lastRound}`),
                teams: list.format(
                  MATCHES.filter(([, round]) => round === lastRound).map(
                    ([id]) => country(results.get(id)!.winner),
                  ),
                ),
              })
            : t("bracketHint")}
      </output>
    </div>
  );
}
