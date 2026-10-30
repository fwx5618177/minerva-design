import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import { DepthChart, type DepthChartHandle } from "minerva-design/charts";
import { createMarketFeed, useFeedLoop } from "../../order-book/feed";

export default function LiveDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.depth-chart.data",
  });
  const chartRef = useRef<DepthChartHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [running, setRunning] = useState(true);
  const [feed] = useState(() => createMarketFeed({ seed: 2 }));
  const [book] = useState(() => feed.snapshot());

  // ~100 deltas a second: the chart eases to the latest book once per frame
  useFeedLoop(
    boxRef,
    (elapsed) => chartRef.current?.applyDeltas(feed.step(elapsed).delta),
    { interval: 10, running },
  );

  return (
    <div ref={boxRef} style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch
        checked={running}
        onChange={(checked) => setRunning(checked)}
        label={t("stream")}
      />
      <DepthChart
        ref={chartRef}
        book={book}
        height={340}
        pricePrecision={1}
        sizePrecision={4}
        ariaLabel={t("aria")}
      />
    </div>
  );
}
