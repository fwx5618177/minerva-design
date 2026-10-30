import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { OrderBook, type OrderBookHandle } from "minerva-design/charts";
import { createMarketFeed, useFeedLoop } from "../feed";

export default function CompactDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.order-book.data",
  });
  const bookRef = useRef<OrderBookHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [feed] = useState(() => createMarketFeed({ seed: 5 }));
  const [book] = useState(() => feed.snapshot());

  useFeedLoop(boxRef, (elapsed) => {
    const { delta, trades } = feed.step(elapsed);
    bookRef.current?.applyDeltas(delta);
    if (trades.length) bookRef.current?.setLastPrice(feed.last());
  });

  // a phone-sized panel: two columns, smaller rows, as many as fit
  return (
    <div ref={boxRef} style={{ width: "100%", maxWidth: 300 }}>
      <OrderBook
        ref={bookRef}
        book={book}
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
