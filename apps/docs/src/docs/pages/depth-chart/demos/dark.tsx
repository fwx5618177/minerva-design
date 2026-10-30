import { useMemo, useRef, type CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { DepthChart, type DepthChartHandle } from "minerva-design/charts";
import { useMarketStream } from "../../order-book/feed";

/** Price the simulated market starts at (BTC/USDT) */
const PRICE = 64000;

// a trading terminal palette, read by the chart from these variables
const TERMINAL = {
  "--background-color": "#0b0e11",
  "--surface-color": "#0b0e11",
  "--surface-elevated-color": "#1b2028",
  "--text-color": "#eaecef",
  "--text-secondary-color": "#848e9c",
  "--border-color": "#2b3139",
  "--success-color": "#0ecb81",
  "--danger-color": "#f6465d",
  "--primary-color": "#f0b90b",
  background: "#0b0e11",
  color: "#eaecef",
  borderRadius: 12,
  padding: 12,
  width: "100%",
  boxSizing: "border-box",
} as CSSProperties;

export default function DarkDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.depth-chart.data",
  });
  const chartRef = useRef<DepthChartHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  // a fresh market on every mount: its snapshot, then its deltas
  useMarketStream(
    boxRef,
    { seed: 4, price: PRICE },
    {
      load: (feed) => chartRef.current?.setBook(feed.snapshot()),
      update: ({ delta }) => chartRef.current?.applyDeltas(delta),
    },
  );

  // your resting orders and the liquidation price of a position
  const myBid = t("myBid");
  const myAsk = t("myAsk");
  const liquidation = t("liquidation");
  const priceLines = useMemo(
    () => [
      { price: Math.round(PRICE * 0.9992), label: myBid, color: "#0ecb81" },
      { price: Math.round(PRICE * 1.0012), label: myAsk, color: "#f6465d" },
      {
        price: Math.round(PRICE * 0.9978),
        label: liquidation,
        color: "#f0b90b",
      },
    ],
    [myBid, myAsk, liquidation],
  );

  return (
    <div ref={boxRef} style={TERMINAL}>
      <DepthChart
        ref={chartRef}
        height={360}
        range={0.003}
        priceLines={priceLines}
        fillOpacity={0.35}
        pricePrecision={1}
        sizePrecision={4}
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        ariaLabel={t("aria")}
      />
    </div>
  );
}
