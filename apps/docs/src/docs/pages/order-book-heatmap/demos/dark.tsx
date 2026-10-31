import { useRef, type CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import {
  OrderBookHeatmap,
  type OrderBookHeatmapHandle,
} from "minerva-design/charts";
import { useHeatmapReplay } from "../../order-book/feed";

const TERMINAL = {
  "--background-color": "#06080d",
  "--surface-color": "#06080d",
  "--surface-elevated-color": "#151a22",
  "--text-color": "#e6e8eb",
  "--text-secondary-color": "#7d8590",
  "--border-color": "#262c36",
  "--success-color": "#26d07c",
  "--danger-color": "#ff4d6a",
  background: "#06080d",
  color: "#e6e8eb",
  borderRadius: 12,
  padding: 8,
  width: "100%",
  boxSizing: "border-box",
} as CSSProperties;

// a classic liquidity ramp: from the empty field (near black navy) through
// deep blue, cyan, yellow and orange to red
const RAMP = [
  "#050b18",
  "#0a2a5c",
  "#0f6fb5",
  "#19c2d6",
  "#f5e663",
  "#ff9a1f",
  "#ff3b1f",
];

export default function DarkDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.order-book-heatmap.data",
  });
  const heatmapRef = useRef<OrderBookHeatmapHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  // recorded history (backfilled), then the same market live
  useHeatmapReplay(boxRef, heatmapRef, { seed: 24, whales: 0.012 }, 90_000);

  return (
    <div ref={boxRef} style={TERMINAL}>
      <OrderBookHeatmap
        ref={heatmapRef}
        height={420}
        colors={RAMP}
        contrast={0.7}
        // exchange clock
        timeZone="utc"
        interval={200}
        window={90_000}
        pricePrecision={1}
        sizePrecision={3}
        sizeUnit="BTC"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        ariaLabel={t("aria")}
      />
    </div>
  );
}
