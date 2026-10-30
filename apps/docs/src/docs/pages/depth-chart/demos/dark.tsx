import { useMemo, useRef, useState, type CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { DepthChart, type DepthChartHandle } from "minerva-design/charts";
import { createMarketFeed, useFeedLoop } from "../../order-book/feed";

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
  const [feed] = useState(() => createMarketFeed({ seed: 4 }));
  const [book] = useState(() => feed.snapshot());

  useFeedLoop(boxRef, (elapsed) =>
    chartRef.current?.applyDeltas(feed.step(elapsed).delta),
  );

  // your resting orders and the liquidation price of a position
  const mid = feed.last();
  const myBid = t("myBid");
  const myAsk = t("myAsk");
  const liquidation = t("liquidation");
  const priceLines = useMemo(
    () => [
      { price: Math.round(mid * 0.9992), label: myBid, color: "#0ecb81" },
      { price: Math.round(mid * 1.0012), label: myAsk, color: "#f6465d" },
      { price: Math.round(mid * 0.9978), label: liquidation, color: "#f0b90b" },
    ],
    [mid, myBid, myAsk, liquidation],
  );

  return (
    <div ref={boxRef} style={TERMINAL}>
      <DepthChart
        ref={chartRef}
        book={book}
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
