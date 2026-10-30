import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  OrderBook,
  type OrderBookHandle,
  type OrderBookLevelEvent,
} from "minerva-design/charts";
import { useMarketStream } from "../feed";

const THRESHOLDS = [2, 5, 10];

export default function LargeOrdersDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.order-book.data",
  });
  const bookRef = useRef<OrderBookHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [threshold, setThreshold] = useState(5);
  const [picked, setPicked] = useState<OrderBookLevelEvent | null>(null);
  // a fresh market on every mount: its snapshot, then its deltas; more
  // whales than usual: walls of 5 to 30 BTC
  useMarketStream(
    boxRef,
    { seed: 8, whales: 0.03 },
    {
      load: (feed) => bookRef.current?.setBook(feed.snapshot()),
      update: ({ delta, trades }, feed) => {
        bookRef.current?.applyDeltas(delta);
        if (trades.length) bookRef.current?.setLastPrice(feed.last());
      },
    },
  );

  const price = new Intl.NumberFormat(i18n.language, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const size = new Intl.NumberFormat(i18n.language, {
    maximumFractionDigits: 4,
  });
  return (
    <div ref={boxRef} style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("threshold")}
        direction="horizontal"
        value={threshold}
        onChange={(value) => setThreshold(Number(value))}
      >
        {THRESHOLDS.map((value) => (
          <Radio
            key={value}
            value={value}
            label={t("atLeast", { value: size.format(value) })}
          />
        ))}
      </RadioGroup>
      <OrderBook
        ref={bookRef}
        largeOrderThreshold={threshold}
        depthBars="level"
        height={420}
        pricePrecision={1}
        sizePrecision={4}
        onLevelClick={setPicked}
        ariaLabel={t("aria")}
      />
      <span style={{ color: "var(--text-secondary-color)", fontSize: 13 }}>
        {picked
          ? t(picked.side === "bid" ? "pickedBid" : "pickedAsk", {
              price: price.format(picked.price),
              size: size.format(picked.size),
              sum: size.format(picked.sum),
            })
          : t("pickHint")}
      </span>
    </div>
  );
}
