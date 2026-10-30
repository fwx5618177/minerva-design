import { useRef, type CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { TimeAndSales, type TimeAndSalesHandle } from "minerva-design/charts";
import { useMarketStream } from "../../order-book/feed";

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
  padding: "8px 4px 4px",
  width: "100%",
  boxSizing: "border-box",
} as CSSProperties;

export default function DarkDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.time-and-sales.data",
  });
  const tapeRef = useRef<TimeAndSalesHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useMarketStream(
    boxRef,
    { seed: 35, activity: 180 },
    {
      // a fresh market on every mount: the tape starts empty
      load: () => tapeRef.current?.clear(),
      update: ({ trades }) => {
        if (trades.length) tapeRef.current?.addTrades(trades);
      },
    },
  );

  return (
    <div ref={boxRef} style={TERMINAL}>
      <TimeAndSales
        ref={tapeRef}
        height={380}
        rowHeight={19}
        largeTradeThreshold={1}
        // tick coloring: green on an uptick, red on a downtick
        priceColor="tick"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        pricePrecision={1}
        sizePrecision={4}
        ariaLabel={t("aria")}
      />
    </div>
  );
}
