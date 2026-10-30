import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import {
  Sparkline,
  useTheme,
  type SparklineProps,
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

/** 30 daily values drifting from `from` to `to`, with some day-to-day wobble */
const trend = (seed: number, from: number, to: number, noise: number) => {
  const random = mulberry32(seed);
  const values: number[] = [];
  let wobble = 0;
  for (let i = 0; i < 30; i++) {
    wobble = wobble * 0.6 + (random() - 0.5) * noise;
    values.push(Math.round((from + ((to - from) * i) / 29) * (1 + wobble)));
  }
  return values;
};

// KPI rows of a dashboard: the value of today and the trend of 30 days
export default function Basic() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sparkline.data",
  });
  const { colors } = useTheme();
  const locale = i18n.language;
  const rows = useMemo(() => {
    const number = new Intl.NumberFormat(locale);
    const compact = new Intl.NumberFormat(locale, { notation: "compact" });
    const ms = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "millisecond",
    });
    const kpis: {
      label: string;
      data: number[];
      format: Intl.NumberFormat;
      spark: Partial<SparklineProps>;
    }[] = [
      {
        label: t("activeUsers"),
        data: trend(2, 9_800, 12_600, 0.1),
        format: compact,
        spark: { type: "area" },
      },
      {
        label: t("signups"),
        data: trend(3, 180, 240, 0.4),
        format: number,
        spark: { type: "bar" },
      },
      {
        label: t("p95"),
        data: trend(4, 240, 205, 0.15),
        format: ms,
        spark: { color: "var(--success-color)" },
      },
    ];
    return kpis;
  }, [t, locale]);
  return (
    <View style={{ width: "100%", gap: 16 }}>
      {rows.map(({ label, data, format, spark }) => (
        <View
          key={label}
          style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
        >
          <View style={{ width: 120 }}>
            <Text style={{ color: colors["text-secondary-color"] }}>
              {label}
            </Text>
            <Text
              style={{
                color: colors["text-color"],
                fontSize: 18,
                fontWeight: "600",
              }}
            >
              {format.format(data[data.length - 1] ?? 0)}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Sparkline
              data={data}
              name={label}
              locale={locale}
              format={(value) => format.format(value)}
              height={44}
              ariaLabel={t("last30Aria", { metric: label })}
              {...spark}
            />
          </View>
        </View>
      ))}
    </View>
  );
}
