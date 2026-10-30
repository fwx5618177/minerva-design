import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  TimeAndSales,
  type OrderBookColorConvention,
  type TimeAndSalesHandle,
} from "minerva-design/charts";
import { createMarketFeed, useFeedLoop } from "../../order-book/feed";

export default function RedUpDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.time-and-sales.data",
  });
  const tapeRef = useRef<TimeAndSalesHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [convention, setConvention] =
    useState<OrderBookColorConvention>("red-up");
  const [feed] = useState(() => createMarketFeed({ seed: 37 }));

  useFeedLoop(boxRef, (elapsed) => {
    const { trades } = feed.step(elapsed);
    if (trades.length) tapeRef.current?.addTrades(trades);
  });

  return (
    <div ref={boxRef} style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("colors")}
        direction="horizontal"
        value={convention}
        onChange={(value) => setConvention(value as OrderBookColorConvention)}
      >
        <Radio value="red-up" label={t("redUp")} />
        <Radio value="green-up" label={t("greenUp")} />
      </RadioGroup>
      <TimeAndSales
        ref={tapeRef}
        // red buys, green sells
        colorConvention={convention}
        height={340}
        columns={["time", "price", "size", "side"]}
        largeTradeThreshold={1}
        pricePrecision={1}
        sizePrecision={4}
        ariaLabel={t("aria")}
      />
    </div>
  );
}
