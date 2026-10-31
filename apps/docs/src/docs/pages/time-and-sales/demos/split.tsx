import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { TimeAndSales, type TimeAndSalesHandle } from "minerva-design/charts";
import { useMarketStream } from "../../order-book/feed";

interface Totals {
  buys: number;
  sells: number;
  bought: number;
  sold: number;
}

const EMPTY: Totals = { buys: 0, sells: 0, bought: 0, sold: 0 };

export default function SplitDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.time-and-sales.data",
  });
  const locale = i18n.language;
  const boxRef = useRef<HTMLDivElement>(null);
  const buyTapeRef = useRef<TimeAndSalesHandle>(null);
  const sellTapeRef = useRef<TimeAndSalesHandle>(null);
  const [totals, setTotals] = useState<Totals>(EMPTY);
  const running = useRef<Totals>({ ...EMPTY });
  const shownAt = useRef(0);

  // one market, its trades split by aggressor side into two tapes
  useMarketStream(
    boxRef,
    { seed: 39, activity: 200 },
    {
      load: () => {
        buyTapeRef.current?.clear();
        sellTapeRef.current?.clear();
        running.current = { ...EMPTY };
        setTotals(EMPTY);
      },
      update: ({ trades }) => {
        if (!trades.length) return;
        const buys = trades.filter((trade) => trade.side === "buy");
        const sells = trades.filter((trade) => trade.side === "sell");
        if (buys.length) buyTapeRef.current?.addTrades(buys);
        if (sells.length) sellTapeRef.current?.addTrades(sells);
        const sum = running.current;
        sum.buys += buys.length;
        sum.sells += sells.length;
        for (const trade of buys) sum.bought += trade.size;
        for (const trade of sells) sum.sold += trade.size;
        const now = performance.now();
        if (now - shownAt.current < 500) return;
        shownAt.current = now;
        setTotals({ ...sum });
      },
    },
  );

  const integer = new Intl.NumberFormat(locale);
  const btc = new Intl.NumberFormat(locale, { maximumFractionDigits: 2 });
  const delta = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 2,
    signDisplay: "exceptZero",
  });
  const header = (
    color: string,
    title: string,
    count: number,
    size: number,
  ) => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 8,
        fontSize: 13,
        fontVariantNumeric: "tabular-nums",
      }}
    >
      <strong style={{ color }}>{title}</strong>
      <span style={{ color: "var(--text-secondary-color)" }}>
        {t("sideTotals", {
          count: integer.format(count),
          size: btc.format(size),
        })}
      </span>
    </div>
  );

  return (
    <div ref={boxRef} style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "grid",
          gap: 16,
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        }}
      >
        <div style={{ display: "grid", gap: 8 }}>
          {header(
            "var(--success-color)",
            t("buysTape"),
            totals.buys,
            totals.bought,
          )}
          <TimeAndSales
            ref={buyTapeRef}
            height={300}
            aggregate
            largeTradeThreshold={1}
            pricePrecision={1}
            sizePrecision={4}
            ariaLabel={t("buysAria")}
          />
        </div>
        <div style={{ display: "grid", gap: 8 }}>
          {header(
            "var(--danger-color)",
            t("sellsTape"),
            totals.sells,
            totals.sold,
          )}
          <TimeAndSales
            ref={sellTapeRef}
            height={300}
            aggregate
            largeTradeThreshold={1}
            pricePrecision={1}
            sizePrecision={4}
            ariaLabel={t("sellsAria")}
          />
        </div>
      </div>
      <span
        style={{
          color: "var(--text-secondary-color)",
          fontSize: 13,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {t("netFlow", { value: delta.format(totals.bought - totals.sold) })}
      </span>
    </div>
  );
}
