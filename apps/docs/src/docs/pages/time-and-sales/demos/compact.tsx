import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { TimeAndSales, type TimeAndSalesHandle } from "minerva-design/charts";
import { createMarketFeed, useFeedLoop } from "../../order-book/feed";

export default function CompactDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.time-and-sales.data",
  });
  const tapeRef = useRef<TimeAndSalesHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [feed] = useState(() => createMarketFeed({ seed: 36 }));

  useFeedLoop(boxRef, (elapsed) => {
    const { trades } = feed.step(elapsed);
    if (trades.length) tapeRef.current?.addTrades(trades);
  });

  // phone-sized: seconds only, short rows; drag the scrollbar or swipe back
  return (
    <div ref={boxRef} style={{ width: "100%", maxWidth: 300 }}>
      <TimeAndSales
        ref={tapeRef}
        height={260}
        rowHeight={17}
        fontSize={11}
        milliseconds={false}
        aggregate
        pricePrecision={1}
        sizePrecision={3}
        ariaLabel={t("aria")}
      />
    </div>
  );
}
