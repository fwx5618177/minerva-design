import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  TimeAndSales,
  type TimeAndSalesHandle,
  type TimeAndSalesRowEvent,
} from "minerva-design/charts";
import { createMarketFeed, useFeedLoop } from "../../order-book/feed";

export default function LiveDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.time-and-sales.data",
  });
  const tapeRef = useRef<TimeAndSalesHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [feed] = useState(() => createMarketFeed({ seed: 32, activity: 220 }));
  const [paused, setPaused] = useState(false);
  const [picked, setPicked] = useState<TimeAndSalesRowEvent | null>(null);

  // trades go to the tape through the ref: React does not re-render
  useFeedLoop(boxRef, (elapsed) => {
    const { trades } = feed.step(elapsed);
    if (trades.length) tapeRef.current?.addTrades(trades);
  });

  const price = new Intl.NumberFormat(i18n.language, {
    minimumFractionDigits: 1,
  });
  const size = new Intl.NumberFormat(i18n.language, {
    maximumFractionDigits: 4,
  });
  return (
    <div ref={boxRef} style={{ display: "grid", gap: 12, width: "100%" }}>
      <TimeAndSales
        ref={tapeRef}
        height={380}
        columns={["time", "price", "size", "side"]}
        // freezes while hovered: new trades are counted in the badge
        pauseOnHover
        onPause={setPaused}
        onTradeClick={setPicked}
        pricePrecision={1}
        sizePrecision={4}
        ariaLabel={t("aria")}
      />
      <span style={{ color: "var(--text-secondary-color)", fontSize: 13 }}>
        {picked
          ? t(picked.trade.side === "buy" ? "pickedBuy" : "pickedSell", {
              size: size.format(picked.trade.size),
              price: price.format(picked.trade.price),
            })
          : paused
            ? t("pausedHint")
            : t("liveHint")}
      </span>
    </div>
  );
}
