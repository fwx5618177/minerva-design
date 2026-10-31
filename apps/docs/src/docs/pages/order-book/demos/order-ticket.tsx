import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, NumberInput, Radio, RadioGroup, Tag } from "minerva-design";
import {
  OrderBook,
  type OrderBookLevel,
  type OrderBookLevelEvent,
} from "minerva-design/charts";
import { createMarketFeed } from "../feed";

type Side = "buy" | "sell";

interface Order {
  id: number;
  side: Side;
  price: number;
  size: number;
}

/**
 * What a limit order would do against the book (best levels first): the
 * part that crosses fills at once, the rest joins the queue of its side
 */
function preview(
  bids: OrderBookLevel[],
  asks: OrderBookLevel[],
  side: Side,
  price: number,
  size: number,
) {
  const opposite = side === "buy" ? asks : bids;
  const crosses = (level: number) =>
    side === "buy" ? level <= price : level >= price;
  let filled = 0;
  let notional = 0;
  for (const [level, available] of opposite) {
    if (filled >= size || !crosses(level)) break;
    const fill = Math.min(available, size - filled);
    filled += fill;
    notional += fill * level;
  }
  // size resting at the same or a better price, filled before the order
  let ahead = 0;
  for (const [level, resting] of side === "buy" ? bids : asks) {
    if (side === "buy" ? level < price : level > price) break;
    ahead += resting;
  }
  return {
    filled,
    average: filled ? notional / filled : NaN,
    rest: Math.max(0, size - filled),
    ahead: filled ? 0 : ahead,
  };
}

export default function OrderTicketDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.order-book.data",
  });
  const locale = i18n.language;
  const book = useMemo(() => createMarketFeed({ seed: 23 }).snapshot(), []);
  const [side, setSide] = useState<Side>("buy");
  const [price, setPrice] = useState<number | null>(book.bids[0][0]);
  const [size, setSize] = useState<number | null>(1);
  const [orders, setOrders] = useState<Order[]>([]);
  const [status, setStatus] = useState("");

  // a click on an ask prepares a buy at that price for everything above
  // it down to the spread (sum), a click on a bid a sell
  const pick = (level: OrderBookLevelEvent) => {
    setSide(level.side === "ask" ? "buy" : "sell");
    setPrice(level.price);
    setSize(Math.round(level.sum * 1e4) / 1e4);
  };

  const result =
    price && size ? preview(book.bids, book.asks, side, price, size) : null;
  const usd = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const btc = new Intl.NumberFormat(locale, { maximumFractionDigits: 4 });
  const sideLabel = (value: Side) => (value === "buy" ? t("buy") : t("sell"));

  const place = () => {
    if (!price || !size) return;
    setOrders((list) => [
      ...list,
      { id: (list.at(-1)?.id ?? 0) + 1, side, price, size },
    ]);
    setStatus(
      t("orderPlaced", {
        side: sideLabel(side),
        size: btc.format(size),
        price: usd.format(price),
      }),
    );
  };

  return (
    <div
      style={{
        display: "grid",
        gap: 16,
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        width: "100%",
      }}
    >
      <OrderBook
        book={book}
        height={400}
        pricePrecision={1}
        sizePrecision={4}
        onLevelClick={pick}
        ariaLabel={t("aria")}
      />
      <div style={{ display: "grid", gap: 12, alignContent: "start" }}>
        <strong>{t("ticket")}</strong>
        <RadioGroup
          aria-label={t("side")}
          direction="horizontal"
          value={side}
          onChange={(value) => setSide(value as Side)}
        >
          <Radio value="buy" label={t("buy")} />
          <Radio value="sell" label={t("sell")} />
        </RadioGroup>
        <label style={{ display: "grid", gap: 4, fontSize: 13 }}>
          {t("limitPrice")}
          <NumberInput
            value={price}
            onChange={setPrice}
            min={0}
            step={0.1}
            precision={1}
          />
        </label>
        <label style={{ display: "grid", gap: 4, fontSize: 13 }}>
          {t("quantity")}
          <NumberInput
            value={size}
            onChange={setSize}
            min={0}
            step={0.1}
            precision={4}
          />
        </label>
        <span
          style={{
            color: "var(--text-secondary-color)",
            fontSize: 13,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {!result
            ? t("ticketHint")
            : result.filled > 0
              ? t(result.rest > 0 ? "previewPartial" : "previewFill", {
                  filled: btc.format(result.filled),
                  average: usd.format(result.average),
                  rest: btc.format(result.rest),
                  price: usd.format(price ?? 0),
                })
              : t("previewRest", {
                  price: usd.format(price ?? 0),
                  ahead: btc.format(result.ahead),
                })}
        </span>
        <Button disabled={!result} onClick={place}>
          {t("placeOrder", { side: sideLabel(side) })}
        </Button>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {orders.map((order) => (
            <Tag
              key={order.id}
              color={order.side === "buy" ? "success" : "danger"}
              closable
              closeLabel={t("cancelOrder")}
              onClose={() => {
                setOrders((list) => list.filter((o) => o.id !== order.id));
                setStatus(
                  t("orderCancelled", { price: usd.format(order.price) }),
                );
              }}
            >
              {t("orderTag", {
                side: sideLabel(order.side),
                size: btc.format(order.size),
                price: usd.format(order.price),
              })}
            </Tag>
          ))}
        </div>
        <output
          aria-live="polite"
          style={{ color: "var(--text-secondary-color)", fontSize: 13 }}
        >
          {orders.length === 0 && !status ? t("noOrders") : status}
        </output>
      </div>
    </div>
  );
}
