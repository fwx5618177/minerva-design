import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { OrderBook, type OrderBookHandle } from "minerva-design/charts";
import { useMarketStream } from "../feed";

export default function CompactDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.order-book.data",
  });
  const bookRef = useRef<OrderBookHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  // a fresh market on every mount: its snapshot, then its deltas
  useMarketStream(
    boxRef,
    { seed: 5 },
    {
      load: (feed) => bookRef.current?.setBook(feed.snapshot()),
      update: ({ delta, trades }, feed) => {
        bookRef.current?.applyDeltas(delta);
        if (trades.length) bookRef.current?.setLastPrice(feed.last());
      },
    },
  );

  // a phone-sized panel: two columns, smaller rows, as many as fit
  return (
    <div ref={boxRef} style={{ width: "100%", maxWidth: 300 }}>
      <OrderBook
        ref={bookRef}
        height={300}
        rowHeight={17}
        fontSize={11}
        columns={["price", "size"]}
        imbalance={false}
        pricePrecision={1}
        sizePrecision={3}
        ariaLabel={t("aria")}
      />
    </div>
  );
}
