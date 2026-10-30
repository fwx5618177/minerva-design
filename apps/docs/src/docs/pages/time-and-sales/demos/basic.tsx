import { useState } from "react";
import { useTranslation } from "react-i18next";
import { TimeAndSales } from "minerva-design/charts";
import { createHistory } from "../../order-book/feed";

export default function BasicDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.time-and-sales.data",
  });
  // the trades of the last minute, oldest first
  const [trades] = useState(() =>
    createHistory({ seed: 31 }, 60_000).updates.flatMap((u) => u.trades),
  );
  return (
    <TimeAndSales
      trades={trades}
      height={360}
      columns={["time", "price", "size", "side"]}
      pricePrecision={1}
      sizePrecision={4}
      ariaLabel={t("aria")}
    />
  );
}
