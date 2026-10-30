import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { OrderBook } from "minerva-design/charts";
import { createMarketFeed } from "../feed";

export default function BasicDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.order-book.data",
  });
  // a BTC/USDT book: 0.1 USDT price tick, sizes in BTC
  const book = useMemo(() => createMarketFeed({ seed: 1 }).snapshot(), []);
  return (
    <OrderBook
      book={book}
      height={420}
      pricePrecision={1}
      sizePrecision={4}
      labels={{ price: t("price"), size: t("size"), total: t("total") }}
      ariaLabel={t("aria")}
    />
  );
}
