import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { DepthChart } from "minerva-design/charts";
import { createMarketFeed } from "../../order-book/feed";

export default function BasicDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.depth-chart.data",
  });
  // a BTC/USDT book: [price, size] levels, best first
  const book = useMemo(() => createMarketFeed({ seed: 1 }).snapshot(), []);
  return (
    <DepthChart
      book={book}
      height={340}
      pricePrecision={1}
      sizePrecision={4}
      ariaLabel={t("aria")}
    />
  );
}
