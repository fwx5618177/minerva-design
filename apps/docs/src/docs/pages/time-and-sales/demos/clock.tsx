import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { TimeAndSales } from "minerva-design/charts";
import { createHistory } from "../../order-book/feed";

type Zone = "local" | "utc" | "newYork" | "tokyo";

const ZONES: { id: Zone; timeZone?: string }[] = [
  { id: "local" },
  { id: "utc", timeZone: "UTC" },
  { id: "newYork", timeZone: "America/New_York" },
  { id: "tokyo", timeZone: "Asia/Tokyo" },
];

export default function ClockDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.time-and-sales.data",
  });
  const locale = i18n.language;
  const [zone, setZone] = useState<Zone>("utc");
  // the trades of the last minute, oldest first
  const [trades] = useState(() =>
    createHistory({ seed: 36 }, 60_000).updates.flatMap((u) => u.trades),
  );

  // the tape's own clock is local or UTC; formatTime shows any time zone,
  // in the page language, still with milliseconds
  const timeZone = ZONES.find((item) => item.id === zone)?.timeZone;
  const formatTime = useMemo(() => {
    const format = new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      fractionalSecondDigits: 3,
      hourCycle: "h23",
      timeZone,
    });
    return (time: number) => format.format(time);
  }, [locale, timeZone]);
  const formatPrice = useMemo(() => {
    const usd = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
    return (value: number) => usd.format(value);
  }, [locale]);
  const zoneName = useMemo(() => {
    const parts = new Intl.DateTimeFormat(locale, {
      timeZone,
      timeZoneName: "short",
    }).formatToParts(trades.at(-1)?.time ?? 0);
    return parts.find((part) => part.type === "timeZoneName")?.value ?? "";
  }, [locale, timeZone, trades]);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("timeZone")}
        direction="horizontal"
        value={zone}
        onChange={(value) => setZone(value as Zone)}
      >
        {ZONES.map((item) => (
          <Radio key={item.id} value={item.id} label={t(`zones.${item.id}`)} />
        ))}
      </RadioGroup>
      <TimeAndSales
        trades={trades}
        height={340}
        columns={["time", "price", "size", "side"]}
        formatTime={formatTime}
        formatPrice={formatPrice}
        sizePrecision={4}
        // the header says which clock the times are in
        labels={{ time: t("timeIn", { zone: zoneName }) }}
        ariaLabel={t("aria")}
      />
    </div>
  );
}
