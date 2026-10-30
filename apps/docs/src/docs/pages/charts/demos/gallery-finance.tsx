import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  CandlestickChart,
  DepthChart,
  OrderBook,
  OrderBookHeatmap,
  TimeAndSales,
  TradingChart,
  type ChartSeries,
  type DepthChartHandle,
  type OrderBookHandle,
  type OrderBookHeatmapHandle,
  type TimeAndSalesHandle,
  type TradingIndicator,
  type TradingVolumeProfileOptions,
} from "minerva-design/charts";
import { GalleryCard, GalleryGrid } from "../gallery-card";
// simulated markets shared with the trading and order book pages
import { DAY, HOUR, generateBars } from "../../trading-chart/data";
import {
  createHistory,
  createMarketFeed,
  useFeedLoop,
} from "../../order-book/feed";

// 36 daily candles (local dates)
const candles = generateBars({ count: 36, timeframe: DAY, seed: 42 }).map(
  (bar, i) => ({
    x: new Date(2026, 8, 1 + i),
    open: bar.open,
    high: bar.high,
    low: bar.low,
    y: bar.close,
  }),
);
// hourly bars of a crypto pair, daily bars for the indicators
const hourly = generateBars({
  count: 240,
  timeframe: HOUR,
  seed: 7,
  price: 64_000,
  volatility: 0.006,
  volume: 400,
});
const daily = generateBars({
  count: 200,
  timeframe: DAY,
  seed: 36,
  price: 58_000,
  volatility: 0.024,
  volume: 3e4,
});
const hourlyIndicators: TradingIndicator[] = [
  { type: "ma", period: 20 },
  { type: "volume", overlay: true },
];
// traded volume per price level of the visible bars
const hourlyProfile: TradingVolumeProfileOptions = { rows: 24 };
const dailyIndicators: TradingIndicator[] = [
  { type: "supertrend", period: 10, multiplier: 3 },
  { type: "macd", height: 50 },
];

// the order book widgets stream a simulated market (paused off screen)
function LiveDepthChart({ ariaLabel }: { ariaLabel: string }) {
  const { i18n } = useTranslation();
  const chartRef = useRef<DepthChartHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [feed] = useState(() => createMarketFeed({ seed: 5 }));
  const [book] = useState(() => feed.snapshot());
  useFeedLoop(boxRef, (elapsed) =>
    chartRef.current?.applyDeltas(feed.step(elapsed).delta),
  );
  return (
    <div ref={boxRef} style={{ height: "100%" }}>
      <DepthChart
        ref={chartRef}
        book={book}
        range={0.003}
        legend={false}
        fontSize={10}
        pricePrecision={1}
        sizePrecision={3}
        locale={i18n.language}
        height="100%"
        ariaLabel={ariaLabel}
      />
    </div>
  );
}

function LiveOrderBook({ ariaLabel }: { ariaLabel: string }) {
  const { i18n } = useTranslation();
  const bookRef = useRef<OrderBookHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [feed] = useState(() => createMarketFeed({ seed: 9 }));
  const [book] = useState(() => feed.snapshot());
  useFeedLoop(boxRef, (elapsed) => {
    const { delta, trades } = feed.step(elapsed);
    bookRef.current?.applyDeltas(delta);
    if (trades.length) bookRef.current?.setLastPrice(feed.last());
  });
  return (
    <div ref={boxRef} style={{ height: "100%" }}>
      <OrderBook
        ref={bookRef}
        book={book}
        rowHeight={16}
        fontSize={11}
        imbalance={false}
        pricePrecision={1}
        sizePrecision={3}
        locale={i18n.language}
        height="100%"
        ariaLabel={ariaLabel}
      />
    </div>
  );
}

function LiveOrderBookHeatmap({ ariaLabel }: { ariaLabel: string }) {
  const { i18n } = useTranslation();
  const heatmapRef = useRef<OrderBookHeatmapHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  // 30 s of history, then live
  const [market] = useState(() => createHistory({ seed: 25 }, 30_000));
  useEffect(() => {
    const heatmap = heatmapRef.current;
    if (!heatmap) return;
    heatmap.setBook(market.snapshot);
    for (const { delta, trades } of market.updates) {
      heatmap.applyDeltas(delta);
      heatmap.addTrades(trades);
    }
  }, [market]);
  useFeedLoop(boxRef, (elapsed) => {
    const { delta, trades } = market.feed.step(elapsed);
    heatmapRef.current?.applyDeltas(delta);
    heatmapRef.current?.addTrades(trades);
  });
  return (
    <div ref={boxRef} style={{ height: "100%" }}>
      <OrderBookHeatmap
        ref={heatmapRef}
        interval={150}
        window={30_000}
        profile={false}
        bubbleSize={12}
        fontSize={10}
        pricePrecision={1}
        sizePrecision={3}
        locale={i18n.language}
        height="100%"
        ariaLabel={ariaLabel}
      />
    </div>
  );
}

function LiveTimeAndSales({ ariaLabel }: { ariaLabel: string }) {
  const { i18n } = useTranslation();
  const tapeRef = useRef<TimeAndSalesHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  // 10 s of trades, then live
  const [market] = useState(() => createHistory({ seed: 36 }, 10_000));
  const [history] = useState(() =>
    market.updates.flatMap((update) => update.trades),
  );
  useFeedLoop(boxRef, (elapsed) => {
    const { trades } = market.feed.step(elapsed);
    if (trades.length) tapeRef.current?.addTrades(trades);
  });
  return (
    <div ref={boxRef} style={{ height: "100%" }}>
      <TimeAndSales
        ref={tapeRef}
        trades={history}
        rowHeight={16}
        fontSize={11}
        milliseconds={false}
        aggregate
        pricePrecision={1}
        sizePrecision={3}
        locale={i18n.language}
        height="100%"
        ariaLabel={ariaLabel}
      />
    </div>
  );
}

export default function GalleryFinanceDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.charts.data",
  });
  const locale = i18n.language;

  const candleSeries = useMemo(
    (): ChartSeries[] => [{ name: t("price"), data: candles }],
    [t],
  );
  const ohlcLabels = useMemo(
    () => ({
      open: t("ohlcLabels.open"),
      high: t("ohlcLabels.high"),
      low: t("ohlcLabels.low"),
      close: t("ohlcLabels.close"),
    }),
    [t],
  );

  // wheel="modifier": the page scrolls over the thumbnails, Ctrl / ⌘ + wheel zooms
  return (
    <GalleryGrid>
      <GalleryCard
        title={t("cards.candlestick.title")}
        component="CandlestickChart"
        page="candlestick-chart"
        description={t("cards.candlestick.description")}
      >
        <CandlestickChart
          series={candleSeries}
          tooltip={{ labels: ohlcLabels }}
          height="100%"
          legend={false}
          ariaLabel={t("cards.candlestick.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.trading.title")}
        component="TradingChart"
        page="trading-chart"
        description={t("cards.trading.description")}
      >
        <TradingChart
          bars={hourly}
          timeframe="1H"
          symbol="BTC/USDT"
          indicators={hourlyIndicators}
          volumeProfile={hourlyProfile}
          legend={false}
          highLowMarkers={false}
          barSpacing={5}
          wheel="modifier"
          locale={locale}
          height="100%"
          ariaLabel={t("cards.trading.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.indicators.title")}
        component="TradingChart"
        page="technical-indicators"
        description={t("cards.indicators.description")}
      >
        <TradingChart
          bars={daily}
          timeframe="1D"
          symbol="BTC/USDT"
          indicators={dailyIndicators}
          legend={false}
          highLowMarkers={false}
          barSpacing={4}
          wheel="modifier"
          locale={locale}
          height="100%"
          ariaLabel={t("cards.indicators.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.depth.title")}
        component="DepthChart"
        page="depth-chart"
        description={t("cards.depth.description")}
      >
        <LiveDepthChart ariaLabel={t("cards.depth.aria")} />
      </GalleryCard>

      <GalleryCard
        title={t("cards.orderBook.title")}
        component="OrderBook"
        page="order-book"
        description={t("cards.orderBook.description")}
      >
        <LiveOrderBook ariaLabel={t("cards.orderBook.aria")} />
      </GalleryCard>

      <GalleryCard
        title={t("cards.orderBookHeatmap.title")}
        component="OrderBookHeatmap"
        page="order-book-heatmap"
        description={t("cards.orderBookHeatmap.description")}
      >
        <LiveOrderBookHeatmap ariaLabel={t("cards.orderBookHeatmap.aria")} />
      </GalleryCard>

      <GalleryCard
        title={t("cards.timeSales.title")}
        component="TimeAndSales"
        page="time-and-sales"
        description={t("cards.timeSales.description")}
      >
        <LiveTimeAndSales ariaLabel={t("cards.timeSales.aria")} />
      </GalleryCard>
    </GalleryGrid>
  );
}
