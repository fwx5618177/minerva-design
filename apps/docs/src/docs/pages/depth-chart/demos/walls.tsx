import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  DepthChart,
  type DepthChartHoverEvent,
  type OrderBookLevel,
} from "minerva-design/charts";
import { createMarketFeed } from "../../order-book/feed";

/** Large resting orders ("walls"): level index from the best → size in BTC */
const BID_WALLS = new Map([
  [80, 140],
  [330, 260],
]);
const ASK_WALLS = new Map([
  [140, 180],
  [420, 320],
]);

const withWalls = (
  levels: readonly OrderBookLevel[],
  walls: Map<number, number>,
): OrderBookLevel[] =>
  levels.map(([price, size], i) => [price, walls.get(i) ?? size]);

export default function WallsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.depth-chart.data",
  });
  const locale = i18n.language;
  // walls show up as cliffs of the curves
  const [book] = useState(() => {
    const { bids, asks } = createMarketFeed({ seed: 12 }).snapshot();
    return {
      bids: withWalls(bids, BID_WALLS),
      asks: withWalls(asks, ASK_WALLS),
    };
  });
  const [hover, setHover] = useState<DepthChartHoverEvent | null>(null);

  const price = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const size = new Intl.NumberFormat(locale, { maximumFractionDigits: 3 });
  const usd = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  });
  const percent = new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 3,
  });

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <DepthChart
        book={book}
        height={340}
        range={0.003}
        onHover={setHover}
        pricePrecision={1}
        sizePrecision={4}
        ariaLabel={t("aria")}
      />
      {/* what a market order sweeping to the hovered price would cost */}
      <span style={{ color: "var(--text-secondary-color)", fontSize: 13 }}>
        {hover
          ? t(hover.side === "ask" ? "sweepBuy" : "sweepSell", {
              amount: size.format(hover.amount),
              price: price.format(hover.price),
              total: usd.format(hover.total),
              average: price.format(hover.average),
              slippage: percent.format(Math.abs(hover.distance)),
            })
          : t("sweepHint")}
      </span>
    </div>
  );
}
