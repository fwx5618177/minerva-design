import { useRef, useState, type CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { OrderBook, type OrderBookHandle } from "minerva-design/charts";
import { createMarketFeed, useFeedLoop } from "../feed";

// a trading terminal palette: the ladder reads its colors from these
// variables (a dark site theme works the same way, without the wrapper)
const TERMINAL = {
  "--background-color": "#0b0e11",
  "--surface-color": "#0b0e11",
  "--surface-elevated-color": "#1b2028",
  "--text-color": "#eaecef",
  "--text-secondary-color": "#848e9c",
  "--border-color": "#2b3139",
  "--success-color": "#0ecb81",
  "--danger-color": "#f6465d",
  "--primary-color": "#f0b90b",
  background: "#0b0e11",
  color: "#eaecef",
  borderRadius: 12,
  padding: "12px 4px 4px",
  width: "100%",
  boxSizing: "border-box",
} as CSSProperties;

export default function DarkDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.order-book.data",
  });
  const bookRef = useRef<OrderBookHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [feed] = useState(() => createMarketFeed({ seed: 4 }));
  const [book] = useState(() => feed.snapshot());

  useFeedLoop(boxRef, (elapsed) => {
    const { delta, trades } = feed.step(elapsed);
    bookRef.current?.applyDeltas(delta);
    if (trades.length) bookRef.current?.setLastPrice(feed.last());
  });

  return (
    <div ref={boxRef} style={TERMINAL}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 10px 8px",
          fontSize: 13,
        }}
      >
        <strong>{t("pair")}</strong>
        <span style={{ color: "#848e9c" }}>{t("title")}</span>
      </div>
      <OrderBook
        ref={bookRef}
        book={book}
        height={440}
        pricePrecision={1}
        sizePrecision={4}
        // the total column in USDT, bars per level
        total="quote"
        depthBars="level"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        ariaLabel={t("aria")}
      />
    </div>
  );
}
