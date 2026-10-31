import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import { DepthChart, type OrderBookLevel } from "minerva-design/charts";
import { mulberry32 } from "../../order-book/feed";

/**
 * A US equity book: one-cent ticks, sizes in round lots of 100 shares,
 * more shares resting on whole and half dollars
 */
function equityBook(seed: number, bidCents: number, levels: number) {
  const random = mulberry32(seed);
  const side = (from: number, step: 1 | -1): OrderBookLevel[] =>
    Array.from({ length: levels }, (_, i) => {
      const cents = from + step * i;
      const round = cents % 100 === 0 ? 8 : cents % 50 === 0 ? 4 : 1;
      const lots = Math.ceil((0.2 + random() ** 3 * 12) * round);
      return [cents / 100, lots * 100];
    });
  return { bids: side(bidCents, -1), asks: side(bidCents + 2, 1) };
}

export default function EquityDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.depth-chart.data",
  });
  const locale = i18n.language;
  // bid $228.44, ask $228.46
  const book = useMemo(() => equityBook(17, 22844, 300), []);
  const [notional, setNotional] = useState(false);

  // dollars with cents and compact share counts, in the page language
  const formatPrice = useMemo(() => {
    const usd = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
    });
    return (value: number) => usd.format(value);
  }, [locale]);
  const formatSize = useMemo(() => {
    const compact = new Intl.NumberFormat(locale, {
      notation: "compact",
      maximumFractionDigits: 1,
    });
    return (value: number) => compact.format(value);
  }, [locale]);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch
        checked={notional}
        onChange={(checked) => setNotional(checked)}
        label={t("showNotional")}
      />
      <DepthChart
        book={book}
        range={0.008}
        // cumulate shares, or dollars (price × shares)
        amount={notional ? "quote" : "base"}
        formatPrice={formatPrice}
        formatSize={formatSize}
        labels={{ amount: notional ? t("notionalUsd") : t("shares") }}
        height={320}
        ariaLabel={t("equityAria")}
      />
    </div>
  );
}
