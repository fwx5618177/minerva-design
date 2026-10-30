import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { CalendarHeatmap, type CalendarDatum } from "minerva-design/charts";

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

// Orders of a bakery's online shop in 2026: busier weekends and holidays
const random = mulberry32(11);
const ORDERS: CalendarDatum[] = [];
for (
  let time = Date.UTC(2026, 0, 1);
  time <= Date.UTC(2026, 11, 31);
  time += DAY
) {
  const date = new Date(time);
  const weekday = date.getUTCDay();
  const month = date.getUTCMonth();
  const weekend = weekday === 0 || weekday === 6;
  const closed = weekday === 1;
  const festive = month === 11 || (month === 1 && date.getUTCDate() <= 14);
  if (closed) continue;
  ORDERS.push({
    date: date.toISOString().slice(0, 10),
    value: Math.round(
      (12 + random() * 18) * (weekend ? 1.8 : 1) * (festive ? 1.6 : 1),
    ),
  });
}

type Start = "locale" | "0" | "1" | "6";
const STARTS: Start[] = ["locale", "0", "1", "6"];

export default function MonthsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.calendar-heatmap.data",
  });
  const [start, setStart] = useState<Start>("locale");
  const locale = i18n.language;

  // the reader's names of Sunday, Monday and Saturday (2026-03-01 is a Sunday)
  const names = useMemo(() => {
    const format = new Intl.DateTimeFormat(locale, {
      weekday: "long",
      timeZone: "UTC",
    });
    return (day: number) => format.format(Date.UTC(2026, 2, 1 + day));
  }, [locale]);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("weekStartLabel")}
        direction="horizontal"
        value={start}
        onChange={(value) => setStart(value as Start)}
      >
        {STARTS.map((value) => (
          <Radio
            key={value}
            value={value}
            label={value === "locale" ? t("fromLocale") : names(Number(value))}
          />
        ))}
      </RadioGroup>
      <CalendarHeatmap
        data={ORDERS}
        range={2026}
        layout="months"
        weekStart={start === "locale" ? undefined : Number(start)}
        locale={locale}
        color="#d97706"
        levels={5}
        height={600}
        ariaLabel={t("ordersAria")}
      />
    </div>
  );
}
