import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import { RangeAreaChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Quote {
  i: number;
  mid: number;
  spread: number;
}
const TICK = 500; // ms between two quotes
const WINDOW = 120; // quotes kept on screen: one minute
const START = new Date(2026, 9, 30, 15, 59, 0).getTime();

// next quote of a currency pair: a random walk of the mid price and a spread
// that widens now and then when liquidity dries up; seeded by the index so
// that the stream is the same on every visit
const next = (quote: Quote): Quote => {
  const random = mulberry32(quote.i + 1);
  const mid = quote.mid + (random() - 0.5) * 0.0004;
  const shock = random() < 0.04 ? 0.0006 + random() * 0.0006 : 0;
  const spread = Math.max(0.00008, quote.spread * 0.8 + 0.00002 + shock);
  return { i: quote.i + 1, mid, spread };
};
const initial = (() => {
  const quotes: Quote[] = [{ i: 0, mid: 1.0842, spread: 0.0001 }];
  for (let k = 1; k < WINDOW; k++) {
    const last = quotes[quotes.length - 1];
    if (last) quotes.push(next(last));
  }
  return quotes;
})();

export default function BidAskDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.range-area-chart.data",
  });
  const locale = i18n.language;
  const [quotes, setQuotes] = useState(initial);
  const [paused, setPaused] = useState(false);

  // a new quote every 500 ms, the oldest one drops out; cleared on pause and
  // on unmount
  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setQuotes((current) => {
        const last = current[current.length - 1];
        return last ? [...current.slice(1), next(last)] : current;
      });
    }, TICK);
    return () => window.clearInterval(id);
  }, [paused]);

  const series = useMemo((): ChartSeries[] => {
    const time = (q: Quote) => START + q.i * TICK;
    return [
      {
        name: t("bidAsk"),
        color: "var(--chart-series-5, #0ea5e9)",
        opacity: 0.3,
        lineWidth: 1,
        data: quotes.map((q) => ({
          x: time(q),
          y0: q.mid - q.spread / 2,
          y: q.mid + q.spread / 2,
        })),
      },
      {
        name: t("mid"),
        type: "line",
        color: "var(--text-color, #1f2937)",
        lineWidth: 1.25,
        data: quotes.map((q) => [time(q), q.mid] as const),
      },
    ];
  }, [t, quotes]);
  const formats = useMemo(
    () => ({
      price: new Intl.NumberFormat(locale, {
        minimumFractionDigits: 5,
        maximumFractionDigits: 5,
      }),
      bps: new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }),
      time: new Intl.DateTimeFormat(locale, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    }),
    [locale],
  );

  const last = quotes[quotes.length - 1] ?? initial[0];
  const spreadBps = last ? (last.spread / last.mid) * 10000 : 0;
  const wide = spreadBps > 3;

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Button
          size="small"
          variant="outline"
          onClick={() => setPaused((value) => !value)}
        >
          {paused ? t("resume") : t("pause")}
        </Button>
        {last && (
          <output
            aria-live="off"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {t("quote", {
              bid: formats.price.format(last.mid - last.spread / 2),
              ask: formats.price.format(last.mid + last.spread / 2),
            })}
            {" · "}
            <span
              style={{
                color: wide ? "var(--danger-color)" : "var(--success-color)",
              }}
            >
              {t("spreadBps", { value: formats.bps.format(spreadBps) })}
            </span>
          </output>
        )}
      </div>
      <RangeAreaChart
        series={series}
        curve="step"
        xAxis={{ type: "time", format: (x) => formats.time.format(x) }}
        yAxis={{ zero: false, format: (y) => formats.price.format(y) }}
        tooltip={{ mode: "axis" }}
        height={300}
        ariaLabel={t("bidAskAria")}
      />
    </div>
  );
}
