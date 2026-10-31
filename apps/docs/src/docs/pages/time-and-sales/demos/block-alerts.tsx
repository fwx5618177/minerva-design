import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Tag } from "minerva-design";
import {
  TimeAndSales,
  type MarketTrade,
  type TimeAndSalesHandle,
} from "minerva-design/charts";
import { useMarketStream } from "../../order-book/feed";

/** A sweep of at least this size is a block trade (BTC) */
const BLOCK = 2;

interface Block {
  id: number;
  time: number;
  side: MarketTrade["side"];
  size: number;
  /** Average price of the sweep */
  price: number;
  /** Prints merged into the block */
  prints: number;
}

export default function BlockAlertsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.time-and-sales.data",
  });
  const locale = i18n.language;
  const tapeRef = useRef<TimeAndSalesHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [total, setTotal] = useState(0);
  const nextId = useRef(0);

  useMarketStream(
    boxRef,
    // whales: aggressive orders of several BTC sweeping the book
    { seed: 38, whales: 0.03 },
    {
      load: () => tapeRef.current?.clear(),
      update: ({ trades }) => {
        if (!trades.length) return;
        tapeRef.current?.addTrades(trades);
        // the prints of one sweep share a side and a millisecond, like the
        // rows merged by aggregate
        const found: Block[] = [];
        let open: Block | null = null;
        for (const trade of trades) {
          if (open && open.time === trade.time && open.side === trade.side) {
            open.price =
              (open.price * open.size + trade.price * trade.size) /
              (open.size + trade.size);
            open.size += trade.size;
            open.prints++;
            continue;
          }
          if (open && open.size >= BLOCK) found.push(open);
          open = { id: 0, ...trade, prints: 1 };
        }
        if (open && open.size >= BLOCK) found.push(open);
        if (!found.length) return;
        for (const block of found) block.id = nextId.current++;
        setBlocks((list) => [...found.reverse(), ...list].slice(0, 5));
        setTotal((count) => count + found.length);
      },
    },
  );

  const clock = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const btc = new Intl.NumberFormat(locale, { maximumFractionDigits: 2 });
  const usd = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const notional = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  });

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
      <TimeAndSales
        ref={tapeRef}
        height={360}
        columns={["time", "price", "size", "side"]}
        aggregate
        largeTradeThreshold={BLOCK}
        pricePrecision={1}
        sizePrecision={4}
        ariaLabel={t("aria")}
      />
      <div style={{ display: "grid", gap: 8, alignContent: "start" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <strong>{t("blocksTitle", { value: btc.format(BLOCK) })}</strong>
          <Button
            size="small"
            variant="outline"
            onClick={() => {
              tapeRef.current?.clear();
              setBlocks([]);
              setTotal(0);
            }}
          >
            {t("clearTape")}
          </Button>
        </div>
        <span style={{ color: "var(--text-secondary-color)", fontSize: 13 }}>
          {t("blocksSeen", {
            value: new Intl.NumberFormat(locale).format(total),
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
          {blocks.length === 0 && (
            <span style={{ color: "var(--text-secondary-color)" }}>
              {t("blocksWaiting")}
            </span>
          )}
          {blocks.map((block) => (
            <span
              key={block.id}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                alignItems: "center",
              }}
            >
              <Tag color={block.side === "buy" ? "success" : "danger"}>
                {block.side === "buy" ? t("blockBuy") : t("blockSell")}
              </Tag>
              {t("blockLine", {
                time: clock.format(block.time),
                size: btc.format(block.size),
                price: usd.format(block.price),
                notional: notional.format(block.size * block.price),
              })}
              <span style={{ color: "var(--text-secondary-color)" }}>
                {t("blockPrints", {
                  value: new Intl.NumberFormat(locale).format(block.prints),
                })}
              </span>
            </span>
          ))}
        </output>
      </div>
    </div>
  );
}
