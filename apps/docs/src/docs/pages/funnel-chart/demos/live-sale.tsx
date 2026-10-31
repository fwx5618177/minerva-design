import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import { FunnelChart, type ShapeDatum } from "minerva-design/charts";

/** Small seeded random generator: the same "sale" on every visit */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// A one-hour flash sale, replayed fast: one tick is two minutes of the
// sale. Each tick brings new visitors, and a share of each stage's
// newcomers moves on to the next stage
const STAGES = ["visitors", "product", "cart", "checkout", "orders"];
const RATES = [0.62, 0.28, 0.6, 0.78];
const TICKS = 30;
const MINUTES_PER_TICK = 2;
const SEED = 2026;
// the first minutes of the sale, before the replay starts
const START = [420, 260, 74, 45, 35];

export default function LiveSaleDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.funnel-chart.data",
  });
  const locale = i18n.language;
  const [counts, setCounts] = useState(START);
  const [tick, setTick] = useState(0);
  const [running, setRunning] = useState(true);
  const random = useRef(mulberry32(SEED));
  const ended = tick >= TICKS;

  useEffect(() => {
    if (!running || ended) return;
    const timer = window.setInterval(() => {
      // draw the newcomers outside the state updaters
      const added: number[] = [];
      added[0] = Math.round(300 + random.current() * 500);
      for (let i = 1; i < STAGES.length; i++) {
        const rate = RATES[i - 1] * (0.85 + random.current() * 0.3);
        added[i] = Math.round(added[i - 1] * rate);
      }
      setCounts((current) => current.map((value, i) => value + added[i]));
      setTick((current) => current + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [running, ended]);

  const data = useMemo(
    (): ShapeDatum[] =>
      STAGES.map((stage, i) => ({
        name: t(`sale.stages.${stage}`),
        value: counts[i],
      })),
    [counts, t],
  );
  const formats = useMemo(() => {
    const number = new Intl.NumberFormat(locale);
    const percent = new Intl.NumberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 1,
    });
    const time = new Intl.DateTimeFormat(locale, {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "UTC",
    });
    return {
      number: (value: number) => number.format(value),
      percent: (share: number) => percent.format(share),
      // the sale starts at 10:00
      clock: (ticks: number) =>
        time.format(Date.UTC(2026, 10, 27, 10, ticks * MINUTES_PER_TICK)),
    };
  }, [locale]);

  const restart = () => {
    random.current = mulberry32(SEED);
    setCounts(START);
    setTick(0);
    setRunning(true);
  };
  const orders = counts[counts.length - 1];

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <FunnelChart
        data={data}
        format={formats.number}
        percentFormat={formats.percent}
        legend={false}
        height={320}
        ariaLabel={t("sale.aria")}
      />
      <HStack gap={8} wrap align="center">
        <Button
          size="small"
          variant="outline"
          disabled={ended}
          onClick={() => setRunning((current) => !current)}
        >
          {running ? t("sale.pause") : t("sale.resume")}
        </Button>
        <Button size="small" variant="ghost" onClick={restart}>
          {t("sale.restart")}
        </Button>
        <span>
          {t("sale.status", {
            time: formats.clock(tick),
            orders: formats.number(orders),
            rate: formats.percent(orders / counts[0]),
          })}
        </span>
      </HStack>
      {/* announced once, when the sale is over */}
      <output aria-live="polite">
        {ended && t("sale.ended", { orders: formats.number(orders) })}
      </output>
    </div>
  );
}
