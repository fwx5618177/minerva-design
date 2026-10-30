import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import {
  CandlestickChart,
  useTheme,
  type ChartHoverEvent,
  type ChartPointDatum,
} from "minerva-design/native";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const DAY = 24 * 60 * 60 * 1000;

// 40 trading days of ACME (weekends skipped)
function dailyCandles(date: Intl.DateTimeFormat) {
  const random = mulberry32(42);
  const candles: ChartPointDatum[] = [];
  let close = 182;
  for (let time = Date.UTC(2026, 2, 2); candles.length < 40; time += DAY) {
    if (new Date(time).getUTCDay() % 6 === 0) continue;
    const open = close * (1 + (random() - 0.5) * 0.012);
    close = open * (1 + (random() + random() - 1) * 0.035 + 0.001);
    const high = Math.max(open, close) * (1 + random() * 0.012);
    const low = Math.min(open, close) * (1 - random() * 0.012);
    candles.push({ x: date.format(time), open, high, low, y: close });
  }
  return candles;
}

export default function Basic() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.candlestick-chart",
  });
  const { colors } = useTheme();
  const locale = i18n.language;
  const [candle, setCandle] = useState<ChartHoverEvent | null>(null);
  const usd = useMemo(
    () => new Intl.NumberFormat(locale, { style: "currency", currency: "USD" }),
    [locale],
  );
  const candles = useMemo(
    () =>
      dailyCandles(
        new Intl.DateTimeFormat(locale, {
          month: "short",
          day: "numeric",
          timeZone: "UTC",
        }),
      ),
    [locale],
  );
  const item = candle?.items[0];
  return (
    <View style={{ width: "100%", gap: 8 }}>
      <CandlestickChart
        series={[{ name: "ACME", data: candles }]}
        locale={locale}
        yAxis={{ format: (value) => usd.format(value) }}
        height={280}
        onHover={setCandle}
        ariaLabel={t("data.acmeAria")}
      />
      <Text role="status" style={{ color: colors["text-secondary-color"] }}>
        {item && item.open !== undefined
          ? [
              candle?.xLabel,
              `${t("data.open")} ${usd.format(item.open)}`,
              `${t("data.close")} ${usd.format(item.y)}`,
            ].join(" · ")
          : t("native.data.scrub")}
      </Text>
    </View>
  );
}
