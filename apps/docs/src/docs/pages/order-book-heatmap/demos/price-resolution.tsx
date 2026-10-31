import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  OrderBookHeatmap,
  type OrderBookHeatmapHandle,
  type OrderBookHeatmapHoverEvent,
} from "minerva-design/charts";
import {
  createHistory,
  useFeedLoop,
  type MarketFeed,
} from "../../order-book/feed";

/** Row heights, in USDT (0: about 0.1 basis point, chosen by the heatmap) */
const TICKS = [0, 1, 5];
/** Visible price spans, in USDT (0: fits the best bid and ask) */
const SPANS = [0, 60, 250];

export default function PriceResolutionDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.order-book-heatmap.data",
  });
  const locale = i18n.language;
  const heatmapRef = useRef<OrderBookHeatmapHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const marketRef = useRef<MarketFeed | null>(null);
  const [tickSize, setTickSize] = useState(0);
  const [priceSpan, setPriceSpan] = useState(0);
  const [hover, setHover] = useState<OrderBookHeatmapHoverEvent | null>(null);

  // a new tickSize resamples the book from scratch (the heatmap drops its
  // columns): the two recorded minutes are replayed at the new resolution
  useEffect(() => {
    const heatmap = heatmapRef.current;
    if (!heatmap) return;
    const { feed, snapshot, updates } = createHistory({ seed: 31 }, 120_000);
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
  }, [tickSize]);
  useFeedLoop(boxRef, (elapsed) => {
    const feed = marketRef.current;
    if (!feed) return;
    const { delta, trades } = feed.step(elapsed);
    heatmapRef.current?.applyDeltas(delta);
    heatmapRef.current?.addTrades(trades);
  });

  const usd = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const whole = new Intl.NumberFormat(locale);
  const btc = new Intl.NumberFormat(locale, { maximumFractionDigits: 3 });
  const clock = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div ref={boxRef} style={{ display: "grid", gap: 12, width: "100%" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px" }}>
        <RadioGroup
          aria-label={t("rowHeight")}
          direction="horizontal"
          value={tickSize}
          onChange={(value) => setTickSize(Number(value))}
        >
          {TICKS.map((value) => (
            <Radio
              key={value}
              value={value}
              label={
                value
                  ? t("usdtValue", { value: whole.format(value) })
                  : t("auto")
              }
            />
          ))}
        </RadioGroup>
        <RadioGroup
          aria-label={t("priceSpan")}
          direction="horizontal"
          value={priceSpan}
          onChange={(value) => setPriceSpan(Number(value))}
        >
          {SPANS.map((value) => (
            <Radio
              key={value}
              value={value}
              label={
                value
                  ? t("usdtValue", { value: whole.format(value) })
                  : t("fitBook")
              }
            />
          ))}
        </RadioGroup>
      </div>
      <OrderBookHeatmap
        ref={heatmapRef}
        height={400}
        interval={500}
        window={120_000}
        tickSize={tickSize || undefined}
        priceSpan={priceSpan || undefined}
        // the readout below replaces the built-in tooltip
        tooltip={false}
        onHover={setHover}
        pricePrecision={1}
        sizePrecision={3}
        sizeUnit="BTC"
        ariaLabel={t("aria")}
      />
      <span
        style={{
          color: "var(--text-secondary-color)",
          fontSize: 13,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {hover
          ? t("cellReadout", {
              time: clock.format(hover.time),
              price:
                hover.priceHigh > hover.price
                  ? t("priceRange", {
                      low: usd.format(hover.price),
                      high: usd.format(hover.priceHigh),
                    })
                  : usd.format(hover.price),
              size: btc.format(hover.size),
              side:
                hover.side === "bid"
                  ? t("sideBid")
                  : hover.side === "ask"
                    ? t("sideAsk")
                    : t("sideSpread"),
              buys: btc.format(hover.buyVolume),
              sells: btc.format(hover.sellVolume),
            })
          : t("cellHint")}
      </span>
    </div>
  );
}
