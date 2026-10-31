import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  OrderBookHeatmap,
  type OrderBookHeatmapHandle,
  type OrderBookHeatmapHoverEvent,
} from "minerva-design/charts";
import { useHeatmapReplay } from "../../order-book/feed";

/** One contract of the perpetual is worth 0.001 BTC */
const CONTRACT = 0.001;
/** Funding is exchanged every 8 hours: 00:00, 08:00 and 16:00 UTC */
const FUNDING = 8 * 3_600_000;
const FUNDING_RATE = 0.0001;

export default function PerpetualDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.order-book-heatmap.data",
  });
  const locale = i18n.language;
  const heatmapRef = useRef<OrderBookHeatmapHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<OrderBookHeatmapHoverEvent | null>(null);
  const [now, setNow] = useState<number | null>(null);
  useHeatmapReplay(boxRef, heatmapRef, { seed: 35 }, 90_000, {
    interval: 50,
  });

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  // the feed counts BTC; the venue quotes contracts and dollars
  const { formatPrice, formatSize, contracts, usd } = useMemo(() => {
    const price = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
    const count = new Intl.NumberFormat(locale, {
      notation: "compact",
      maximumFractionDigits: 1,
    });
    const compactUsd = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 2,
    });
    return {
      formatPrice: (value: number) => price.format(value),
      formatSize: (value: number) => count.format(value / CONTRACT),
      contracts: (btc: number) => count.format(Math.round(btc / CONTRACT)),
      usd: (value: number) => compactUsd.format(value),
    };
  }, [locale]);

  const next = now === null ? null : Math.ceil(now / FUNDING) * FUNDING;
  const utc = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
    timeZoneName: "short",
  });
  const countdown = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
    timeZone: "UTC",
  });
  const rate = new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: 4,
    signDisplay: "always",
  });

  return (
    <div ref={boxRef} style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "4px 16px",
          fontSize: 13,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        <strong>{t("perpName")}</strong>
        <span style={{ color: "var(--text-secondary-color)" }}>
          {t("contractSize", {
            value: new Intl.NumberFormat(locale).format(CONTRACT),
          })}
        </span>
        <span style={{ color: "var(--text-secondary-color)" }}>
          {next === null || now === null
            ? t("fundingRate", { rate: rate.format(FUNDING_RATE) })
            : t("funding", {
                rate: rate.format(FUNDING_RATE),
                time: utc.format(next),
                countdown: countdown.format(next - now),
              })}
        </span>
      </div>
      <OrderBookHeatmap
        ref={heatmapRef}
        height={380}
        interval={250}
        window={90_000}
        formatPrice={formatPrice}
        formatSize={formatSize}
        sizeUnit={t("contracts")}
        // exchanges run on UTC
        timeZone="utc"
        labels={{
          liquidity: t("restingContracts"),
          buys: t("takerBuys"),
          sells: t("takerSells"),
        }}
        onHover={setHover}
        ariaLabel={t("perpAria")}
      />
      <span
        style={{
          color: "var(--text-secondary-color)",
          fontSize: 13,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {hover
          ? t("perpReadout", {
              price: formatPrice(hover.price),
              contracts: contracts(hover.size),
              notional: usd(hover.size * hover.price),
            })
          : t("perpHint")}
      </span>
    </div>
  );
}
