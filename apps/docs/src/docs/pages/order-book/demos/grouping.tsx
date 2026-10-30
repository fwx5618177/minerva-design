import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { OrderBook, type OrderBookHandle } from "minerva-design/charts";
import { createMarketFeed, useFeedLoop } from "../feed";

const STEPS = [0.1, 0.5, 1, 10, 50];

export default function GroupingDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.order-book.data",
  });
  const bookRef = useRef<OrderBookHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [grouping, setGrouping] = useState(1);
  const [bars, setBars] = useState<"cumulative" | "level">("cumulative");
  const [feed] = useState(() => createMarketFeed({ seed: 3 }));
  const [book] = useState(() => feed.snapshot());

  useFeedLoop(boxRef, (elapsed) => {
    const { delta, trades } = feed.step(elapsed);
    bookRef.current?.applyDeltas(delta);
    if (trades.length) bookRef.current?.setLastPrice(feed.last());
  });

  return (
    <div ref={boxRef} style={{ display: "grid", gap: 12, width: "100%" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px" }}>
        <RadioGroup
          aria-label={t("grouping")}
          direction="horizontal"
          value={grouping}
          onChange={(value) => setGrouping(Number(value))}
        >
          {STEPS.map((step) => (
            <Radio
              key={step}
              value={step}
              label={new Intl.NumberFormat(i18n.language).format(step)}
            />
          ))}
        </RadioGroup>
        <RadioGroup
          aria-label={t("depthBars")}
          direction="horizontal"
          value={bars}
          onChange={(value) => setBars(value as "cumulative" | "level")}
        >
          <Radio value="cumulative" label={t("barsCumulative")} />
          <Radio value="level" label={t("barsLevel")} />
        </RadioGroup>
      </div>
      <OrderBook
        ref={bookRef}
        book={book}
        // bids are rounded down to the step, asks up: buckets never cross
        grouping={grouping}
        depthBars={bars}
        // the price decimals follow the step (1 → "64,012")
        sizePrecision={3}
        height={420}
        ariaLabel={t("aria")}
      />
    </div>
  );
}
