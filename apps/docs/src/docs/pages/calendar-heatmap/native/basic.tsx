import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import {
  CalendarHeatmap,
  useTheme,
  type CalendarDatum,
  type ShapeHoverEvent,
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
const iso = (time: number) => new Date(time).toISOString().slice(0, 10);

// A developer's commits over the last four months (a phone fits ~17 weeks):
// busy weekdays, quiet weekends and a release crunch every few weeks
const END = Date.UTC(2026, 9, 24);
const START = END - 118 * DAY;
const random = mulberry32(7);
const COMMITS: CalendarDatum[] = [];
for (let time = START; time <= END; time += DAY) {
  const weekday = new Date(time).getUTCDay();
  const weekend = weekday === 0 || weekday === 6;
  const crunch = ((time - START) / DAY) % 40 < 5;
  if (random() < (weekend ? 0.2 : 0.82))
    COMMITS.push({
      date: iso(time),
      value: Math.max(
        1,
        Math.round(random() * (weekend ? 4 : 9) * (crunch ? 2.2 : 1)),
      ),
    });
}
const RANGE = [iso(START), iso(END)] as const;

export default function Basic() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.calendar-heatmap",
  });
  const { colors } = useTheme();
  const [selected, setSelected] = useState<ShapeHoverEvent | null>(null);
  const total = useMemo(() => COMMITS.reduce((sum, d) => sum + d.value, 0), []);
  return (
    <View style={{ width: "100%", gap: 8 }}>
      <Text style={{ color: colors["text-color"] }}>
        {t("native.data.total", { total })}
      </Text>
      <CalendarHeatmap
        data={COMMITS}
        range={RANGE}
        locale={i18n.language}
        color="#2da44e"
        onClick={setSelected}
        ariaLabel={t("data.commitsAria")}
      />
      <Text role="status" style={{ color: colors["text-secondary-color"] }}>
        {selected
          ? t("data.commitsDay", {
              date: selected.name,
              value: selected.value,
            })
          : t("native.data.tapDay")}
      </Text>
    </View>
  );
}
