import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { DepthChart, type OrderBookLevel } from "minerva-design/charts";
import { createMarketFeed } from "../../order-book/feed";

/** Market order sizes, in BTC */
const SIZES = [1, 5, 25, 100];

interface Fill {
  /** Size the book can fill */
  filled: number;
  /** Notional paid (buy) or received (sell) */
  cost: number;
  /** Average fill price */
  average: number;
  /** Price of the last level touched */
  worst: number;
  /** Levels consumed */
  levels: number;
}

/** Walks one side of the book from the best level until `size` is filled */
function sweep(levels: readonly OrderBookLevel[], size: number): Fill {
  let filled = 0;
  let cost = 0;
  let worst = Number.NaN;
  let count = 0;
  for (const [price, available] of levels) {
    if (filled >= size) break;
    const take = Math.min(available, size - filled);
    filled += take;
    cost += take * price;
    worst = price;
    count++;
  }
  return {
    filled,
    cost,
    average: filled ? cost / filled : Number.NaN,
    worst,
    levels: count,
  };
}

export default function SlippageDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.depth-chart.data",
  });
  const locale = i18n.language;
  // a BTC/USDT book, best levels first
  const book = useMemo(() => createMarketFeed({ seed: 14 }).snapshot(), []);
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [size, setSize] = useState(5);

  const mid = (book.bids[0][0] + book.asks[0][0]) / 2;
  // a buy lifts the asks, a sell hits the bids
  const fill = useMemo(
    () => sweep(side === "buy" ? book.asks : book.bids, size),
    [book, side, size],
  );
  const complete = fill.filled >= size - 1e-9;
  const impact = Math.abs(fill.worst / mid - 1);

  const averageLabel = t("averageFill");
  const worstLabel = t("worstFill");
  const priceLines = useMemo(
    () => [
      {
        price: fill.average,
        label: averageLabel,
        color: "var(--primary-color)",
      },
      { price: fill.worst, label: worstLabel, color: "var(--warning-color)" },
    ],
    [fill, averageLabel, worstLabel],
  );

  const price = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const btc = new Intl.NumberFormat(locale, { maximumFractionDigits: 4 });
  const usd = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
  const bp = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
  // distance of the average fill from the mid, in basis points
  const slippage = Math.abs(fill.average / mid - 1) * 1e4;

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px" }}>
        <RadioGroup
          aria-label={t("orderSide")}
          direction="horizontal"
          value={side}
          onChange={(value) => setSide(value as "buy" | "sell")}
        >
          <Radio value="buy" label={t("marketBuy")} />
          <Radio value="sell" label={t("marketSell")} />
        </RadioGroup>
        <RadioGroup
          aria-label={t("orderSize")}
          direction="horizontal"
          value={size}
          onChange={(value) => setSize(Number(value))}
        >
          {SIZES.map((value) => (
            <Radio
              key={value}
              value={value}
              label={t("btcAmount", { value: btc.format(value) })}
            />
          ))}
        </RadioGroup>
      </div>
      <DepthChart
        book={book}
        // wide enough to show the last level the order reaches
        range={Math.max(0.0005, impact * 1.4)}
        priceLines={priceLines}
        height={320}
        pricePrecision={1}
        sizePrecision={4}
        ariaLabel={t("aria")}
      />
      <output
        aria-live="polite"
        style={{
          color: "var(--text-secondary-color)",
          fontSize: 13,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {t(complete ? "fillSummary" : "fillPartial", {
          size: btc.format(size),
          filled: btc.format(fill.filled),
          levels: fill.levels,
          average: price.format(fill.average),
          worst: price.format(fill.worst),
          cost: usd.format(fill.cost),
          slippage: bp.format(slippage),
        })}
      </output>
    </div>
  );
}
