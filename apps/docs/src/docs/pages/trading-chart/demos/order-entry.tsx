import { Fragment, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  TradingChart,
  type TradingOrderCreateEvent,
  type TradingOrderType,
  type TradingPriceLine,
} from "minerva-design/charts";
import { MINUTE, generateBars } from "../data";

const bars = generateBars(
  {
    count: 360,
    timeframe: 5 * MINUTE,
    seed: 909,
    price: 63_480,
    volatility: 0.0018,
    volume: 40,
  },
  1,
);

const last = bars[bars.length - 1].close;

interface Order {
  id: string;
  side: "buy" | "sell";
  type: TradingOrderType;
  price: number;
  quantity: number;
}

// keyboard order entry: focus the chart (Tab), then these keys
const SHORTCUTS = [
  "arm",
  "type",
  "move",
  "confirm",
  "cancel",
  "select",
  "remove",
];

const LINE_TITLES = {
  buy: { limit: "lines.limitBuy", stop: "lines.stopBuy" },
  sell: { limit: "lines.limitSell", stop: "lines.stopSell" },
} as const;

const PLACED = {
  buy: { limit: "orderPlacedBuy", stop: "orderPlacedBuyStop" },
  sell: { limit: "orderPlacedSell", stop: "orderPlacedSellStop" },
} as const;

const kbd: React.CSSProperties = {
  minWidth: 20,
  padding: "0 5px",
  border: "1px solid var(--border-color)",
  borderRadius: 4,
  background: "var(--surface-subtle-color)",
  font: "inherit",
  fontSize: 11,
  lineHeight: "18px",
  textAlign: "center",
};

const INITIAL: Order[] = [
  {
    id: "o1",
    side: "buy",
    type: "limit",
    price: Math.round(last * 0.996),
    quantity: 0.25,
  },
  {
    id: "o2",
    side: "sell",
    type: "limit",
    price: Math.round(last * 1.006),
    quantity: 0.1,
  },
  {
    id: "o3",
    side: "sell",
    type: "stop",
    price: Math.round(last * 0.991),
    quantity: 0.05,
  },
];

export default function OrderEntryDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.trading-chart.data",
  });
  const [orders, setOrders] = useState<Order[]>(INITIAL);
  const [log, setLog] = useState("");

  const usd = new Intl.NumberFormat(i18n.language, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 1,
  });

  const lines = useMemo(
    (): TradingPriceLine[] =>
      orders.map((order) => ({
        id: order.id,
        kind: "order",
        side: order.side,
        title: t(LINE_TITLES[order.side][order.type]),
        lineStyle: order.type === "stop" ? "dotted" : "dashed",
        price: order.price,
        quantity: order.quantity,
        draggable: true,
        cancellable: true,
      })),
    [orders, t],
  );

  const onCreate = (event: TradingOrderCreateEvent) => {
    const order = {
      id: `order-${Date.now().toString(36)}`,
      side: event.side,
      type: event.orderType,
      price: event.price,
      quantity: 0.1,
    };
    setOrders((list) => [...list, order]);
    setLog(
      t(PLACED[event.side][event.orderType], {
        price: usd.format(event.price),
      }),
    );
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, width: "100%" }}>
      <div style={{ flex: "1 1 520px", minWidth: 0 }}>
        <TradingChart
          bars={bars}
          timeframe="5m"
          symbol={t("btcPerp")}
          orderEntry
          priceLines={lines}
          onOrderCreate={onCreate}
          onOrderMove={(event) => {
            setOrders((list) =>
              list.map((order) =>
                order.id === event.id
                  ? { ...order, price: event.price }
                  : order,
              ),
            );
            setLog(
              t("orderModified", {
                from: usd.format(event.previousPrice),
                to: usd.format(event.price),
              }),
            );
          }}
          onOrderCancel={(event) => {
            setOrders((list) => list.filter((order) => order.id !== event.id));
            setLog(
              t("orderCancelled", { price: usd.format(event.line.price) }),
            );
          }}
          ariaLabel={t("orderEntryAria")}
          height={440}
        />
      </div>
      <div
        style={{
          flex: "1 1 220px",
          display: "grid",
          alignContent: "start",
          gap: 8,
          fontSize: 13,
        }}
      >
        <strong>{t("ordersTitle")}</strong>
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          <tbody>
            {orders.map((order, i) => (
              <tr
                key={order.id}
                style={{
                  background: i % 2 ? undefined : "var(--surface-subtle-color)",
                }}
              >
                <td
                  style={{
                    padding: "6px 8px",
                    color:
                      order.side === "buy"
                        ? "var(--success-color)"
                        : "var(--danger-color)",
                  }}
                >
                  {t(LINE_TITLES[order.side][order.type])}
                </td>
                <td
                  style={{
                    padding: "6px 8px",
                    textAlign: "end",
                    color: "var(--text-secondary-color)",
                  }}
                >
                  {order.quantity}
                </td>
                <td style={{ padding: "6px 8px", textAlign: "end" }}>
                  {usd.format(order.price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <span role="status" style={{ color: "var(--text-secondary-color)" }}>
          {log || t("orderEntryHint")}
        </span>
        <strong style={{ marginTop: 8 }}>{t("keyboard.title")}</strong>
        <dl
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            alignItems: "center",
            gap: "6px 10px",
            margin: 0,
          }}
        >
          {SHORTCUTS.map((name) => (
            <Fragment key={name}>
              <dt style={{ display: "flex", gap: 4 }}>
                {t(`keyboard.${name}Keys`)
                  .split(" ")
                  .map((key) => (
                    <kbd key={key} style={kbd}>
                      {key}
                    </kbd>
                  ))}
              </dt>
              <dd style={{ margin: 0, color: "var(--text-secondary-color)" }}>
                {t(`keyboard.${name}`)}
              </dd>
            </Fragment>
          ))}
        </dl>
      </div>
    </div>
  );
}
