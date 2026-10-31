import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  DepthChart,
  type DepthChartHandle,
  type OrderBookStore,
} from "minerva-design/charts";
import { useMarketStream } from "../../order-book/feed";

/** Bands around the mid, as fractions (0.001 = ±0.1%) */
const BANDS = [0.0005, 0.001, 0.002];

interface Reading {
  spread: number;
  spreadBp: number;
  bids: number;
  asks: number;
}

/** Size resting within `band` of the mid on each side */
function read(store: OrderBookStore, band: number): Reading | null {
  const mid = store.mid();
  if (Number.isNaN(mid)) return null;
  const sum = (side: "bid" | "ask") => {
    let total = 0;
    for (let i = 0; i < store.count(side); i++) {
      const price = store.priceAt(side, i);
      if (Math.abs(price / mid - 1) > band) break;
      total += store.sizeAt(side, i);
    }
    return total;
  };
  return {
    spread: store.spread(),
    spreadBp: (store.spread() / mid) * 1e4,
    bids: sum("bid"),
    asks: sum("ask"),
  };
}

export default function ImbalanceDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.depth-chart.data",
  });
  const locale = i18n.language;
  const chartRef = useRef<DepthChartHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [band, setBand] = useState(0.001);
  const [reading, setReading] = useState<Reading | null>(null);
  const readAt = useRef(0);
  const bandRef = useRef(band);
  useEffect(() => {
    bandRef.current = band;
  });

  // a fresh market on every mount; the readout comes from the chart's own
  // store (getInstance().getStore()), once a second
  useMarketStream(
    boxRef,
    { seed: 15 },
    {
      load: (feed) => chartRef.current?.setBook(feed.snapshot()),
      update: ({ delta }) => {
        chartRef.current?.applyDeltas(delta);
        const now = performance.now();
        if (now - readAt.current < 1000) return;
        readAt.current = now;
        const store = chartRef.current?.getInstance()?.getStore();
        if (store) setReading(read(store, bandRef.current));
      },
    },
  );

  const percent = new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 2,
  });
  const btc = new Intl.NumberFormat(locale, { maximumFractionDigits: 2 });
  const decimal = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  });
  const share = reading
    ? reading.bids / (reading.bids + reading.asks || 1)
    : 0.5;
  const imbalance = 2 * share - 1;

  return (
    <div ref={boxRef} style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("band")}
        direction="horizontal"
        value={band}
        onChange={(value) => {
          setBand(Number(value));
          const store = chartRef.current?.getInstance()?.getStore();
          if (store) setReading(read(store, Number(value)));
        }}
      >
        {BANDS.map((value) => (
          <Radio
            key={value}
            value={value}
            label={t("plusMinus", { value: percent.format(value) })}
          />
        ))}
      </RadioGroup>
      <DepthChart
        ref={chartRef}
        // the chart shows exactly the band that is measured
        range={band}
        height={300}
        pricePrecision={1}
        sizePrecision={4}
        ariaLabel={t("aria")}
      />
      {/* bid share of the liquidity within the band */}
      <div
        aria-hidden="true"
        style={{
          display: "flex",
          height: 8,
          borderRadius: 4,
          overflow: "hidden",
          background: "var(--border-color)",
        }}
      >
        <div
          style={{
            width: `${share * 100}%`,
            background: "var(--success-color)",
            transition: "width 0.4s",
          }}
        />
        <div style={{ flex: 1, background: "var(--danger-color)" }} />
      </div>
      <output
        aria-live="polite"
        style={{
          color: "var(--text-secondary-color)",
          fontSize: 13,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {reading
          ? t("imbalanceStatus", {
              band: t("plusMinus", { value: percent.format(band) }),
              bids: btc.format(reading.bids),
              asks: btc.format(reading.asks),
              imbalance: new Intl.NumberFormat(locale, {
                style: "percent",
                maximumFractionDigits: 0,
                signDisplay: "exceptZero",
              }).format(imbalance),
              spread: decimal.format(reading.spread),
              spreadBp: decimal.format(reading.spreadBp),
            })
          : t("imbalanceWaiting")}
      </output>
    </div>
  );
}
