import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { CalendarHeatmap, type CalendarDatum } from "minerva-design/charts";

const DAY = 24 * 60 * 60 * 1000;

// Deploys of a team during the first half of 2026 (none on weekends)
const DEPLOYS: CalendarDatum[] = [];
for (
  let time = Date.UTC(2026, 0, 1);
  time <= Date.UTC(2026, 5, 30);
  time += DAY
) {
  const date = new Date(time);
  const weekday = date.getUTCDay();
  if (weekday === 0 || weekday === 6) continue;
  const day = date.getUTCDate();
  DEPLOYS.push({
    date: date.toISOString().slice(0, 10),
    value: (day * 7 + weekday * 3) % 9,
  });
}

const LOCALES = ["en-US", "fr-FR", "de-DE", "ja-JP", "zh-CN", "ar-EG"];

export default function LocaleDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.calendar-heatmap.data",
  });
  const [locale, setLocale] = useState("en-US");

  // locale names in the reader's language
  const names = useMemo(
    () => new Intl.DisplayNames([i18n.language], { type: "language" }),
    [i18n.language],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("localeLabel")}
        direction="horizontal"
        value={locale}
        onChange={(value) => setLocale(String(value))}
      >
        {LOCALES.map((tag) => (
          <Radio key={tag} value={tag} label={names.of(tag) ?? tag} />
        ))}
      </RadioGroup>
      <CalendarHeatmap
        data={DEPLOYS}
        range={["2026-01-01", "2026-06-30"]}
        locale={locale}
        color="#0ea5e9"
        maxCellSize={20}
        legend={false}
        ariaLabel={t("deploysAria")}
      />
    </div>
  );
}
