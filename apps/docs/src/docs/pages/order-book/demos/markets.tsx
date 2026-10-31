import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { OrderBook, type OrderBookLevel } from "minerva-design/charts";
import { mulberry32 } from "../feed";

type MarketId = "crypto" | "equity" | "fx" | "futures";

interface Market {
  id: MarketId;
  /** Price increment */
  tick: number;
  /** Decimals of the prices */
  decimals: number;
  /** Best bid, in ticks */
  bid: number;
  /** Spread, in ticks */
  spread: number;
  /** Size of a level, in base units (contracts, shares, euros, BTC) */
  size: (random: () => number, ticks: number) => number;
  /** Highlighted resting size */
  large: number;
  seed: number;
}

const MARKETS: Market[] = [
  {
    id: "crypto",
    tick: 0.1,
    decimals: 1,
    bid: 640_125,
    spread: 1,
    size: (random) =>
      Math.round(
        (0.002 + random() ** 4 * 3 + (random() < 0.03 ? 9 : 0)) * 1e4,
      ) / 1e4,
    large: 5,
    seed: 101,
  },
  {
    // one-cent ticks, round lots of 100 shares, more on whole dollars
    id: "equity",
    tick: 0.01,
    decimals: 2,
    bid: 22_844,
    spread: 2,
    size: (random, ticks) =>
      Math.ceil((0.2 + random() ** 3 * 10) * (ticks % 100 === 0 ? 6 : 1)) * 100,
    large: 3_000,
    seed: 102,
  },
  {
    // a tenth of a pip, sizes in whole millions of euros
    id: "fx",
    tick: 0.00001,
    decimals: 5,
    bid: 108_541,
    spread: 2,
    size: (random) => (1 + Math.floor(random() ** 2 * 12)) * 1_000_000,
    large: 10_000_000,
    seed: 103,
  },
  {
    // E-mini S&P 500: quarter-point ticks, hundreds of contracts per level
    id: "futures",
    tick: 0.25,
    decimals: 2,
    bid: 23_211,
    spread: 1,
    size: (random) => 20 + Math.floor(random() ** 2 * 260),
    large: 250,
    seed: 104,
  },
];

function marketBook(market: Market) {
  const random = mulberry32(market.seed);
  const side = (from: number, step: 1 | -1): OrderBookLevel[] =>
    Array.from({ length: 60 }, (_, i) => {
      const ticks = from + step * i;
      return [
        Number((ticks * market.tick).toFixed(market.decimals)),
        market.size(random, ticks),
      ];
    });
  return {
    bids: side(market.bid, -1),
    asks: side(market.bid + market.spread, 1),
  };
}

export default function MarketsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.order-book.data",
  });
  const locale = i18n.language;
  const [id, setId] = useState<MarketId>("crypto");
  const market = MARKETS.find((item) => item.id === id) ?? MARKETS[0];
  const book = useMemo(() => marketBook(market), [market]);

  // each market has its own price and size conventions
  const { formatPrice, formatSize, spread } = useMemo(() => {
    const price = new Intl.NumberFormat(locale, {
      ...(market.id === "equity" ? { style: "currency", currency: "USD" } : {}),
      minimumFractionDigits: market.decimals,
      maximumFractionDigits: market.decimals,
    });
    const size =
      market.id === "crypto"
        ? new Intl.NumberFormat(locale, { maximumFractionDigits: 4 })
        : market.id === "futures"
          ? new Intl.NumberFormat(locale)
          : new Intl.NumberFormat(locale, {
              notation: "compact",
              maximumFractionDigits: 1,
            });
    const ticks = market.spread;
    const width = ticks * market.tick;
    const unit = new Intl.NumberFormat(locale, { maximumFractionDigits: 2 });
    return {
      formatPrice: (value: number) => price.format(value),
      formatSize: (value: number) => size.format(value),
      // spreads are quoted in the unit of each market
      spread:
        market.id === "fx"
          ? t("spreadPips", { value: unit.format(width / 0.0001) })
          : market.id === "equity"
            ? t("spreadCents", { value: unit.format(width * 100) })
            : market.id === "futures"
              ? t("spreadTicks", { value: unit.format(ticks) })
              : t("spreadUsdt", { value: price.format(width) }),
    };
  }, [locale, market, t]);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("market")}
        direction="horizontal"
        value={id}
        onChange={(value) => setId(value as MarketId)}
      >
        {MARKETS.map((item) => (
          <Radio
            key={item.id}
            value={item.id}
            label={t(`markets.${item.id}.name`)}
          />
        ))}
      </RadioGroup>
      <OrderBook
        book={book}
        formatPrice={formatPrice}
        formatSize={formatSize}
        largeOrderThreshold={market.large}
        labels={{
          price: t(`markets.${id}.price`),
          size: t(`markets.${id}.size`),
          total: t(`markets.${id}.total`),
        }}
        height={400}
        ariaLabel={t(`markets.${id}.aria`)}
      />
      <span
        style={{
          color: "var(--text-secondary-color)",
          fontSize: 13,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {t("marketStatus", {
          tick: formatPrice(market.tick),
          spread,
          large: formatSize(market.large),
        })}
      </span>
    </div>
  );
}
