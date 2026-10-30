import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  OrderBook,
  type OrderBookHandle,
  type OrderBookMode,
} from "minerva-design/charts";
import { useMarketStream } from "../feed";

export default function ModesDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.order-book.data",
  });
  const bookRef = useRef<OrderBookHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<OrderBookMode>("both");
  // a fresh market on every mount: its snapshot, then its deltas
  useMarketStream(
    boxRef,
    { seed: 9 },
    {
      load: (feed) => bookRef.current?.setBook(feed.snapshot()),
      update: ({ delta, trades }, feed) => {
        bookRef.current?.applyDeltas(delta);
        if (trades.length) bookRef.current?.setLastPrice(feed.last());
      },
    },
  );

  return (
    <div ref={boxRef} style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("mode")}
        direction="horizontal"
        value={mode}
        onChange={(value) => setMode(value as OrderBookMode)}
      >
        <Radio value="both" label={t("modeBoth")} />
        <Radio value="bids" label={t("modeBids")} />
        <Radio value="asks" label={t("modeAsks")} />
      </RadioGroup>
      <OrderBook
        ref={bookRef}
        // one side fills the whole height: twice the levels
        mode={mode}
        height={380}
        pricePrecision={1}
        sizePrecision={4}
        ariaLabel={t("aria")}
      />
    </div>
  );
}
