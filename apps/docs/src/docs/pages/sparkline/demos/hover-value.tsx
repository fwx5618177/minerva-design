import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Sparkline, type ChartHoverEvent } from "minerva-design/charts";

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
const START = Date.UTC(2026, 8, 1);

// Daily active users of an app over 61 days (Sept 1 to Oct 31): growing,
// with quieter weekends
const users = (() => {
  const random = mulberry32(61);
  return Array.from({ length: 61 }, (_, i) => {
    const weekday = new Date(START + i * DAY).getUTCDay();
    const weekend = weekday === 0 || weekday === 6 ? 0.82 : 1;
    return Math.round((18_000 + i * 120) * weekend * (0.96 + random() * 0.08));
  });
})();

export default function HoverValueDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sparkline.data",
  });
  const locale = i18n.language;
  // index of the hovered day, null when the pointer is outside
  const [hovered, setHovered] = useState<number | null>(null);

  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const date = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        weekday: "short",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      }),
    [locale],
  );
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
        signDisplay: "exceptZero",
      }),
    [locale],
  );

  // the readout shows the hovered day, and falls back to the latest one
  const index = hovered ?? users.length - 1;
  const value = users[index] ?? 0;
  const first = users[0] ?? 1;

  return (
    <div style={{ display: "grid", gap: 4, width: "100%", maxWidth: 420 }}>
      <span style={{ color: "var(--text-secondary-color)" }}>
        {t("dailyActiveUsers")}
      </span>
      <output aria-live="polite" style={{ display: "grid", gap: 2 }}>
        <span style={{ fontSize: 28, fontWeight: 600 }}>
          {number.format(value)}
        </span>
        <span style={{ color: "var(--text-secondary-color)" }}>
          {hovered === null
            ? t("latestDay", { date: date.format(START + index * DAY) })
            : t("hoveredDay", {
                date: date.format(START + index * DAY),
                change: percent.format(value / first - 1),
              })}
        </span>
      </output>
      <Sparkline
        data={users}
        type="area"
        name={t("dailyActiveUsers")}
        format={(v) => number.format(v)}
        // the readout replaces the tooltip
        tooltip={false}
        onHover={(event: ChartHoverEvent | null) =>
          setHovered(event?.items[0]?.index ?? null)
        }
        height={64}
        ariaLabel={t("dauAria")}
      />
    </div>
  );
}
