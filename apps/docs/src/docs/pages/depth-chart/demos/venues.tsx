import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup, Table, type TableColumn } from "minerva-design";
import { DepthChart, type OrderBookLevel } from "minerva-design/charts";
import { createMarketFeed } from "../../order-book/feed";

/** Three venues quoting BTC/USDT: seed of the book and its liquidity scale */
const VENUES = [
  { id: "a", seed: 41, scale: 1.6 },
  { id: "b", seed: 42, scale: 1 },
  { id: "c", seed: 43, scale: 0.5 },
] as const;

type VenueId = (typeof VENUES)[number]["id"];
type Book = { bids: OrderBookLevel[]; asks: OrderBookLevel[] };

/** Sums the sizes of several books price by price */
function consolidate(books: readonly Book[]): Book {
  const merge = (side: "bids" | "asks") => {
    const sizes = new Map<number, number>();
    for (const book of books)
      for (const [price, size] of book[side])
        sizes.set(price, (sizes.get(price) ?? 0) + size);
    return [...sizes];
  };
  return { bids: merge("bids"), asks: merge("asks") };
}

/** Size resting within `band` of the mid */
const depthWithin = (
  levels: readonly OrderBookLevel[],
  mid: number,
  band = 0.001,
) =>
  levels.reduce(
    (sum, [price, size]) =>
      Math.abs(price / mid - 1) <= band ? sum + size : sum,
    0,
  );

interface Row {
  id: VenueId | "all";
  bid: number;
  ask: number;
  depth: number;
}

export default function VenuesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.depth-chart.data",
  });
  const locale = i18n.language;
  const [venue, setVenue] = useState<VenueId | "all">("all");

  const books = useMemo(() => {
    const venues = Object.fromEntries(
      VENUES.map(({ id, seed, scale }) => {
        const { bids, asks } = createMarketFeed({ seed }).snapshot();
        const scaled = (levels: OrderBookLevel[]): OrderBookLevel[] =>
          levels.map(([price, size]) => [price, size * scale]);
        return [id, { bids: scaled(bids), asks: scaled(asks) }];
      }),
    ) as Record<VenueId, Book>;
    return { ...venues, all: consolidate(Object.values(venues)) };
  }, []);

  const rows = useMemo(
    (): Row[] =>
      (["all", ...VENUES.map((v) => v.id)] as const).map((id) => {
        const { bids, asks } = books[id];
        const bid = Math.max(...bids.map(([price]) => price));
        const ask = Math.min(...asks.map(([price]) => price));
        const mid = (bid + ask) / 2;
        return {
          id,
          bid,
          ask,
          depth: depthWithin(bids, mid) + depthWithin(asks, mid),
        };
      }),
    [books],
  );

  const price = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const btc = new Intl.NumberFormat(locale, { maximumFractionDigits: 2 });
  const percent = new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 0,
  });
  const total = rows[0].depth;
  const name = (id: VenueId | "all") =>
    id === "all" ? t("consolidated") : t("venue", { name: id.toUpperCase() });

  const columns: TableColumn<Row>[] = [
    { key: "venue", header: t("venueColumn"), render: (row) => name(row.id) },
    {
      key: "bid",
      header: t("bestBid"),
      align: "right",
      render: (row) => price.format(row.bid),
    },
    {
      key: "ask",
      header: t("bestAsk"),
      align: "right",
      render: (row) => price.format(row.ask),
    },
    {
      key: "depth",
      header: t("depthNearMid"),
      align: "right",
      render: (row) =>
        row.id === "all"
          ? btc.format(row.depth)
          : t("depthShare", {
              value: btc.format(row.depth),
              share: percent.format(row.depth / total),
            }),
    },
  ];

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("venueColumn")}
        direction="horizontal"
        value={venue}
        onChange={(value) => setVenue(value as VenueId | "all")}
      >
        {rows.map((row) => (
          <Radio key={row.id} value={row.id} label={name(row.id)} />
        ))}
      </RadioGroup>
      <DepthChart
        // a new book object: the chart eases from one venue to the other
        book={books[venue]}
        range={0.002}
        height={300}
        pricePrecision={1}
        sizePrecision={4}
        ariaLabel={t("venuesAria", { name: name(venue) })}
      />
      <Table
        aria-label={t("venuesTable")}
        size="small"
        columns={columns}
        data={rows}
        rowKey={(row) => row.id}
      />
    </div>
  );
}
