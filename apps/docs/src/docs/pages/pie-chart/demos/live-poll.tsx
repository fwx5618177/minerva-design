import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import { DonutChart, type ShapeDatum } from "minerva-design/charts";

/** Small seeded random generator: the same "votes" on every visit */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Answers of a live product poll; each new vote picks an answer with
// these probabilities
const ANSWERS = ["darkMode", "offline", "api", "integrations", "reports"];
const WEIGHTS = [0.31, 0.18, 0.22, 0.17, 0.12];
const START = [42, 25, 31, 22, 16];
const SEED = 7;

const labelContent = ["percent"] as const;
const legend = { toggle: false } as const;

export default function LivePollDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.pie-chart.data",
  });
  const locale = i18n.language;
  const [votes, setVotes] = useState(START);
  const [running, setRunning] = useState(true);
  const random = useRef(mulberry32(SEED));

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      // 1 to 4 new votes per tick, drawn outside the state updater
      const added = ANSWERS.map(() => 0);
      const batch = 1 + Math.floor(random.current() * 4);
      for (let n = 0; n < batch; n++) {
        let r = random.current();
        let i = 0;
        while (i < WEIGHTS.length - 1 && r >= WEIGHTS[i]) {
          r -= WEIGHTS[i];
          i++;
        }
        added[i] += 1;
      }
      setVotes((current) => current.map((value, i) => value + added[i]));
    }, 1200);
    return () => window.clearInterval(timer);
  }, [running]);

  const data = useMemo(
    (): ShapeDatum[] =>
      ANSWERS.map((key, i) => ({
        name: t(`poll.answers.${key}`),
        value: votes[i],
      })),
    [t, votes],
  );
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const total = votes.reduce((sum, value) => sum + value, 0);
  const leader = votes.indexOf(Math.max(...votes));

  const reset = () => {
    random.current = mulberry32(SEED);
    setVotes(START);
  };

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <strong>{t("poll.question")}</strong>
      <DonutChart
        data={data}
        labelContent={labelContent}
        legend={legend}
        percentFormat={(share) => percent.format(share)}
        centerValue={number.format(total)}
        centerLabel={t("poll.votes")}
        renderTooltip={(slice) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{slice.name}</strong>
            <span>
              {t("poll.votesShare", {
                votes: number.format(slice.value),
                share: percent.format(slice.percent),
              })}
            </span>
          </div>
        )}
        height={340}
        ariaLabel={t("poll.aria")}
      />
      <HStack gap={8} wrap align="center">
        <Button
          size="small"
          variant="outline"
          onClick={() => setRunning((current) => !current)}
        >
          {running ? t("poll.pause") : t("poll.resume")}
        </Button>
        <Button size="small" variant="ghost" onClick={reset}>
          {t("poll.reset")}
        </Button>
        {/* only the leader is announced, not every new vote */}
        <output aria-live="polite">
          {t("poll.leading", { answer: data[leader].name })}
        </output>
      </HStack>
    </div>
  );
}
