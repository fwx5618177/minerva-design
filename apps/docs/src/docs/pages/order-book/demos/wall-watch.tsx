import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Tag } from "minerva-design";
import {
  OrderBook,
  type OrderBookHandle,
  type OrderBookLevel,
} from "minerva-design/charts";
import { useMarketStream, type MarketFeed } from "../feed";

/** A level growing by at least this much at once is a new wall (BTC) */
const WALL = 5;

type Side = "bid" | "ask";

interface Wall {
  id: number;
  side: Side;
  price: number;
  /** Size the wall added */
  size: number;
  /** Size of the level before the wall */
  base: number;
  /** Volume traded at the wall's price since it appeared */
  traded: number;
  time: number;
}

interface WallEvent {
  id: number;
  kind: "new" | "pulled" | "filled";
  side: Side;
  price: number;
  size: number;
  /** Seconds the wall rested (when it left) */
  rested: number;
}

export default function WallWatchDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.order-book.data",
  });
  const locale = i18n.language;
  const bookRef = useRef<OrderBookHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [events, setEvents] = useState<WallEvent[]>([]);
  const [counts, setCounts] = useState({ resting: 0, pulled: 0, filled: 0 });
  // our own copy of the book, to see each level's change, and the walls
  const sizes = useRef<Record<Side, Map<number, number>>>({
    bid: new Map(),
    ask: new Map(),
  });
  const walls = useRef<Wall[]>([]);
  const nextId = useRef(0);

  const load = (feed: MarketFeed) => {
    const snapshot = feed.snapshot();
    sizes.current = {
      bid: new Map(snapshot.bids),
      ask: new Map(snapshot.asks),
    };
    walls.current = [];
    setEvents([]);
    setCounts({ resting: 0, pulled: 0, filled: 0 });
    bookRef.current?.setBook(snapshot);
  };

  useMarketStream(
    boxRef,
    // more whales than usual, and some of their walls are spoofs
    { seed: 18, whales: 0.03 },
    {
      load,
      update: ({ delta, trades }, feed) => {
        bookRef.current?.applyDeltas(delta);
        if (trades.length) bookRef.current?.setLastPrice(feed.last());
        for (const trade of trades)
          for (const wall of walls.current)
            if (trade.price === wall.price) wall.traded += trade.size;

        const found: WallEvent[] = [];
        const scan = (side: Side, levels: OrderBookLevel[]) => {
          const map = sizes.current[side];
          for (const [price, size] of levels) {
            const before = map.get(price) ?? 0;
            if (size - before >= WALL) {
              const wall: Wall = {
                id: nextId.current++,
                side,
                price,
                size: size - before,
                base: before,
                traded: 0,
                time: delta.time,
              };
              walls.current.push(wall);
              found.push({ ...wall, kind: "new", rested: 0 });
            }
            if (size === 0) map.delete(price);
            else map.set(price, size);
          }
        };
        scan("bid", delta.bids);
        scan("ask", delta.asks);

        // a wall is gone once 70% of it left the level: eaten by trades at
        // its price, or pulled before the price got there (spoofing)
        let pulled = 0;
        let filled = 0;
        walls.current = walls.current.filter((wall) => {
          const now = sizes.current[wall.side].get(wall.price) ?? 0;
          if (now > wall.base + wall.size * 0.3) return true;
          const kind = wall.traded >= wall.size * 0.3 ? "filled" : "pulled";
          if (kind === "filled") filled++;
          else pulled++;
          found.push({
            ...wall,
            kind,
            id: nextId.current++,
            rested: (delta.time - wall.time) / 1000,
          });
          return false;
        });
        if (!found.length) return;
        setEvents((list) => [...found.reverse(), ...list].slice(0, 6));
        setCounts((c) => ({
          resting: walls.current.length,
          pulled: c.pulled + pulled,
          filled: c.filled + filled,
        }));
      },
    },
  );

  const price = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const btc = new Intl.NumberFormat(locale, { maximumFractionDigits: 2 });
  const seconds = new Intl.NumberFormat(locale, {
    style: "unit",
    unit: "second",
    maximumFractionDigits: 0,
  });
  const percent = new Intl.NumberFormat(locale, { style: "percent" });
  const integer = new Intl.NumberFormat(locale);
  const gone = counts.pulled + counts.filled;
  const tags = {
    new: { color: "info", label: t("wallNew") },
    pulled: { color: "warning", label: t("wallPulled") },
    filled: { color: "success", label: t("wallFilled") },
  } as const;

  return (
    <div
      ref={boxRef}
      style={{
        display: "grid",
        gap: 16,
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        width: "100%",
      }}
    >
      <OrderBook
        ref={bookRef}
        largeOrderThreshold={WALL}
        depthBars="level"
        height={420}
        pricePrecision={1}
        sizePrecision={4}
        ariaLabel={t("aria")}
      />
      <div style={{ display: "grid", gap: 8, alignContent: "start" }}>
        <strong>{t("wallLog")}</strong>
        <span
          style={{
            color: "var(--text-secondary-color)",
            fontSize: 13,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {t("wallStats", {
            size: btc.format(WALL),
            resting: integer.format(counts.resting),
            pulled: integer.format(counts.pulled),
            filled: integer.format(counts.filled),
            ratio: percent.format(gone ? counts.pulled / gone : 0),
          })}
        </span>
        <output
          aria-live="polite"
          style={{
            display: "grid",
            gap: 6,
            fontSize: 13,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {events.length === 0 && (
            <span style={{ color: "var(--text-secondary-color)" }}>
              {t("wallWaiting")}
            </span>
          )}
          {events.map((event) => (
            <span
              key={event.id}
              style={{ display: "flex", gap: 8, alignItems: "center" }}
            >
              <Tag color={tags[event.kind].color}>{tags[event.kind].label}</Tag>
              {t(event.side === "bid" ? "wallBid" : "wallAsk", {
                price: price.format(event.price),
                size: btc.format(event.size),
              })}
              {event.kind !== "new" && (
                <span style={{ color: "var(--text-secondary-color)" }}>
                  {t("wallRested", { value: seconds.format(event.rested) })}
                </span>
              )}
            </span>
          ))}
        </output>
      </div>
    </div>
  );
}
