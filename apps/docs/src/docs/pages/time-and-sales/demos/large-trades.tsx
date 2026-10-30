import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { TimeAndSales, type TimeAndSalesHandle } from "minerva-design/charts";
import { createMarketFeed, useFeedLoop } from "../../order-book/feed";

const THRESHOLDS = [0.5, 1, 5];

export default function LargeTradesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.time-and-sales.data",
  });
  const tapeRef = useRef<TimeAndSalesHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [threshold, setThreshold] = useState(1);
  const [feed] = useState(() =>
    createMarketFeed({ seed: 33, whales: 0.03, activity: 160 }),
  );

  useFeedLoop(boxRef, (elapsed) => {
    const { trades } = feed.step(elapsed);
    if (trades.length) tapeRef.current?.addTrades(trades);
  });

  const size = new Intl.NumberFormat(i18n.language);
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
      <TimeAndSales
        ref={tapeRef}
        height={360}
        // bold and tinted from the threshold, stronger up to 8x
        largeTradeThreshold={threshold}
        // one sweep of several levels = one row
        aggregate
        pricePrecision={1}
        sizePrecision={4}
        ariaLabel={t("aria")}
      />
    </div>
  );
}
