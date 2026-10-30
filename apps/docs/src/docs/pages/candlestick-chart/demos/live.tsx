import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import {
  TradingChart,
  type TradingBar,
  type TradingChartHandle,
} from "minerva-design/charts";
import { createTradeFeed, generateBars } from "../../trading-chart/data";

const SECOND = 1000;
const FRAME = 5 * SECOND; // 5-second candles

/** 240 five-second candles ending now */
const history = () => {
  const now = Math.floor(Date.now() / FRAME) * FRAME;
  return generateBars(
    {
      count: 240,
      timeframe: FRAME,
      seed: 99,
      price: 0.6245,
      volatility: 0.0006,
      volume: 1.4e4,
      start: now - 239 * FRAME,
    },
    4,
  );
};

export default function LiveDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.candlestick-chart.data",
  });
  const chart = useRef<TradingChartHandle>(null);
  const [bars] = useState(history);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    const count = chart.current?.getBarCount() ?? 0;
    let bar: TradingBar = chart.current?.getBar(count - 1) ?? {
      ...bars[bars.length - 1],
    };
    const next = createTradeFeed(Date.now() % 997, bar.close, 0.0002);
    // ten trades a second
    const feed = setInterval(() => {
      const trade = next();
      const time = Math.floor(Date.now() / FRAME) * FRAME;
      const price = Math.round(trade.price * 1e4) / 1e4;
      const volume = trade.size * 4e3;
      bar =
        time === bar.time
          ? {
              ...bar,
              high: Math.max(bar.high, price),
              low: Math.min(bar.low, price),
              close: price,
              volume: (bar.volume ?? 0) + volume,
            }
          : {
              time,
              open: bar.close,
              high: price,
              low: price,
              close: price,
              volume,
            };
      chart.current?.update(bar);
    }, 100);
    return () => clearInterval(feed);
  }, [running, bars]);

  return (
    <div style={{ display: "grid", gap: 10, width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Button
          size="small"
          variant="outline"
          onClick={() => setRunning((value) => !value)}
        >
          {running ? t("pause") : t("resume")}
        </Button>
        <span
          role="status"
          style={{ fontSize: 13, color: "var(--text-secondary-color)" }}
        >
          {running ? t("liveStatus") : t("livePaused")}
        </span>
      </div>
      <TradingChart
        ref={chart}
        bars={bars}
        timeframe={FRAME}
        symbol={t("ada")}
        labels={{ timeframe: t("fiveSeconds") }}
        countdown
        indicators={[{ type: "volume", overlay: true }]}
        barSpacing={9}
        ariaLabel={t("liveAria")}
        height={380}
      />
    </div>
  );
}
