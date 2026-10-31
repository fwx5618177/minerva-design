import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Radio, RadioGroup, Switch } from "minerva-design";
import {
  OrderBookHeatmap,
  type OrderBookHeatmapHandle,
} from "minerva-design/charts";
import {
  createHistory,
  useFeedLoop,
  type MarketFeed,
} from "../../order-book/feed";

/** Visible spans, in ms */
const WINDOWS = [30_000, 120_000, 300_000];

export default function TimeWindowDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.order-book-heatmap.data",
  });
  const locale = i18n.language;
  const heatmapRef = useRef<OrderBookHeatmapHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const marketRef = useRef<MarketFeed | null>(null);
  const [span, setSpan] = useState(120_000);
  const [running, setRunning] = useState(true);
  const [status, setStatus] = useState("");

  // five minutes of recorded market: all of it fits in `history`, the
  // window only picks how much of it is on screen
  useEffect(() => {
    const heatmap = heatmapRef.current;
    if (!heatmap) return;
    const { feed, snapshot, updates } = createHistory(
      { seed: 33 },
      300_000,
      200,
    );
    heatmap.clear();
    heatmap.setBook(snapshot);
    for (const { delta, trades } of updates) {
      heatmap.applyDeltas(delta);
      heatmap.addTrades(trades);
    }
    marketRef.current = feed;
    return () => {
      marketRef.current = null;
      heatmap.clear();
    };
  }, []);
  // paused, the market stops too: it resumes where it was, without a gap
  useFeedLoop(
    boxRef,
    (elapsed) => {
      const feed = marketRef.current;
      if (!feed) return;
      const { delta, trades } = feed.step(elapsed);
      heatmapRef.current?.applyDeltas(delta);
      heatmapRef.current?.addTrades(trades);
    },
    { running },
  );

  const clock = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const duration = (ms: number) =>
    ms < 60_000
      ? new Intl.NumberFormat(locale, { style: "unit", unit: "second" }).format(
          ms / 1000,
        )
      : new Intl.NumberFormat(locale, { style: "unit", unit: "minute" }).format(
          ms / 60_000,
        );
  const marketTime = () => clock.format(marketRef.current?.time() ?? 0);

  return (
    <div ref={boxRef} style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "8px 24px",
        }}
      >
        <RadioGroup
          aria-label={t("timeWindow")}
          direction="horizontal"
          value={span}
          onChange={(value) => {
            setSpan(Number(value));
            setStatus("");
          }}
        >
          {WINDOWS.map((value) => (
            <Radio key={value} value={value} label={duration(value)} />
          ))}
        </RadioGroup>
        <Switch
          checked={running}
          onChange={(checked) => {
            setRunning(checked);
            setStatus(
              t(checked ? "resumedAt" : "pausedAt", { time: marketTime() }),
            );
          }}
          label={t("liveFeed")}
        />
        <Button
          size="small"
          variant="outline"
          onClick={() => {
            const feed = marketRef.current;
            if (!feed) return;
            // drop the history, keep the current book as the first column
            heatmapRef.current?.clear();
            heatmapRef.current?.setBook(feed.snapshot());
            setStatus(t("clearedAt", { time: marketTime() }));
          }}
        >
          {t("clearHistory")}
        </Button>
      </div>
      <OrderBookHeatmap
        ref={heatmapRef}
        height={400}
        interval={250}
        window={span}
        history={300_000}
        pricePrecision={1}
        sizePrecision={3}
        sizeUnit="BTC"
        ariaLabel={t("aria")}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)", fontSize: 13 }}
      >
        {status ||
          t("windowStatus", {
            window: duration(span),
            history: duration(300_000),
          })}
      </output>
    </div>
  );
}
