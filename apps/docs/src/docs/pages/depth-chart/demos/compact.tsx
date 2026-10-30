import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { DepthChart, type DepthChartHandle } from "minerva-design/charts";
import { useMarketStream } from "../../order-book/feed";

export default function CompactDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.depth-chart.data",
  });
  const chartRef = useRef<DepthChartHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  // a fresh market on every mount: its snapshot, then its deltas
  useMarketStream(
    boxRef,
    { seed: 5 },
    {
      load: (feed) => chartRef.current?.setBook(feed.snapshot()),
      update: ({ delta }) => chartRef.current?.applyDeltas(delta),
    },
  );

  // a phone-sized card: no legend, smaller texts; pinch to zoom, tap to read
  return (
    <div ref={boxRef} style={{ width: "100%", maxWidth: 360 }}>
      <DepthChart
        ref={chartRef}
        height={190}
        legend={false}
        fontSize={10}
        range={0.003}
        pricePrecision={1}
        sizePrecision={3}
        ariaLabel={t("aria")}
      />
    </div>
  );
}
