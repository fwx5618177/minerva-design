import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import {
  TradingChart,
  type TradingBar,
  type TradingChartHandle,
  type TradingClickEvent,
  type TradingMarker,
  type TradingPriceLine,
} from "minerva-design/charts";
import { MINUTE, createTradeFeed, generateBars } from "../data";

const MAX_ALERTS = 5;

interface Alert {
  id: string;
  price: number;
  /** Fires when the price rises to it (`up`) or falls to it */
  direction: "up" | "down";
}

interface Fired {
  id: string;
  price: number;
  direction: Alert["direction"];
  time: number;
}

/** 300 one-minute bars ending at the current minute */
const history = () => {
  const now = Math.floor(Date.now() / MINUTE) * MINUTE;
  return generateBars({
    count: 300,
    timeframe: MINUTE,
    seed: 404,
    price: 152,
    volatility: 0.0011,
    volume: 900,
    start: now - 299 * MINUTE,
  });
};

const round = (price: number) => Math.round(price * 100) / 100;

export default function PriceAlertsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.trading-chart.data",
  });
  const locale = i18n.language;
  const chart = useRef<TradingChartHandle>(null);
  const [bars] = useState(history);
  const [running, setRunning] = useState(true);
  // two alerts to start with, 0.15% around the last close
  const [alerts, setAlerts] = useState<Alert[]>(() => {
    const last = bars[bars.length - 1].close;
    return [
      { id: "a1", price: round(last * 1.0015), direction: "up" },
      { id: "a2", price: round(last * 0.9985), direction: "down" },
    ];
  });
  const [fired, setFired] = useState<Fired[]>([]);
  const [status, setStatus] = useState("");
  const alertsRef = useRef(alerts);
  const nextId = useRef(3);
  useEffect(() => {
    alertsRef.current = alerts;
  });

  useEffect(() => {
    if (!running) return;
    // a simulated feed: ten trades a second build the current bar
    const lastBar = chart.current?.getBar(
      (chart.current?.getBarCount() ?? 0) - 1,
    );
    let bar: TradingBar = lastBar
      ? { ...lastBar }
      : { ...bars[bars.length - 1] };
    const next = createTradeFeed(405, bar.close, 0.00005);
    const id = setInterval(() => {
      const trade = next();
      const time = Math.floor(Date.now() / MINUTE) * MINUTE;
      const price = round(trade.price);
      const before = bar.close;
      bar =
        time === bar.time
          ? {
              ...bar,
              high: Math.max(bar.high, price),
              low: Math.min(bar.low, price),
              close: price,
              volume: (bar.volume ?? 0) + trade.size,
            }
          : {
              time,
              open: before,
              high: price,
              low: price,
              close: price,
              volume: trade.size,
            };
      chart.current?.update(bar);
      // an alert fires once, when the price reaches it from its side
      const hit = alertsRef.current.filter((alert) =>
        alert.direction === "up"
          ? before < alert.price && price >= alert.price
          : before > alert.price && price <= alert.price,
      );
      if (!hit.length) return;
      alertsRef.current = alertsRef.current.filter(
        (alert) => !hit.includes(alert),
      );
      setAlerts(alertsRef.current);
      setFired((list) => [
        ...list,
        ...hit.map((alert) => ({ ...alert, time: bar.time })),
      ]);
    }, 100);
    return () => clearInterval(id);
  }, [running, bars]);

  const usd = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
  });
  const clock = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
  });
  const lastClose = () =>
    chart.current?.getBar((chart.current?.getBarCount() ?? 0) - 1)?.close ??
    bars[bars.length - 1].close;

  const onClick = (event: TradingClickEvent) => {
    if (event.pane !== "price") return;
    if (alerts.length >= MAX_ALERTS) {
      setStatus(t("alertLimit", { value: MAX_ALERTS }));
      return;
    }
    const price = round(event.price);
    const direction = price >= lastClose() ? "up" : "down";
    setAlerts((list) => [
      ...list,
      { id: `a${nextId.current++}`, price, direction },
    ]);
    setStatus(t("alertAdded", { price: usd.format(price) }));
  };

  const priceLines = useMemo(
    (): TradingPriceLine[] =>
      alerts.map((alert) => ({
        id: alert.id,
        price: alert.price,
        kind: "alert",
        title: alert.direction === "up" ? t("alertUp") : t("alertDown"),
        draggable: true,
        cancellable: true,
      })),
    [alerts, t],
  );
  const markers = useMemo(
    (): TradingMarker[] =>
      fired.map((alert) => ({
        id: alert.id,
        time: alert.time,
        price: alert.price,
        side: alert.direction === "up" ? "buy" : "sell",
        color: "var(--warning-color)",
        text: t("alertMarker"),
      })),
    [fired, t],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <Button
          size="small"
          variant="outline"
          onClick={() => setRunning((value) => !value)}
        >
          {running ? t("pause") : t("resume")}
        </Button>
        <span style={{ color: "var(--text-secondary-color)", fontSize: 13 }}>
          {t("alertHint")}
        </span>
      </div>
      <TradingChart
        ref={chart}
        bars={bars}
        timeframe="1m"
        symbol={t("aapl")}
        priceLines={priceLines}
        markers={markers}
        onClick={onClick}
        onOrderMove={(event) => {
          const direction = event.price >= lastClose() ? "up" : "down";
          setAlerts((list) =>
            list.map((alert) =>
              alert.id === event.id
                ? { ...alert, price: event.price, direction }
                : alert,
            ),
          );
          setStatus(t("alertMoved", { price: usd.format(event.price) }));
        }}
        onOrderCancel={(event) => {
          setAlerts((list) => list.filter((alert) => alert.id !== event.id));
          setStatus(t("alertRemoved", { price: usd.format(event.line.price) }));
        }}
        countdown
        barSpacing={7}
        ariaLabel={t("alertsAria")}
        height={400}
      />
      <output
        aria-live="polite"
        style={{
          display: "grid",
          gap: 4,
          color: "var(--text-secondary-color)",
          fontSize: 13,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        <span>
          {status ||
            t("alertCount", {
              active: new Intl.NumberFormat(locale).format(alerts.length),
              fired: new Intl.NumberFormat(locale).format(fired.length),
            })}
        </span>
        {fired
          .slice(-3)
          .reverse()
          .map((alert) => (
            <span key={alert.id}>
              {t(alert.direction === "up" ? "alertFiredUp" : "alertFiredDown", {
                price: usd.format(alert.price),
                time: clock.format(alert.time),
              })}
            </span>
          ))}
      </output>
    </div>
  );
}
