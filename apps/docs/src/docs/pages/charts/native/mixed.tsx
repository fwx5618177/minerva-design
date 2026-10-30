import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { Chart, useTheme } from "minerva-design/native";

// Thousand USD per month, January to June
const revenue = [42, 51, 48, 69, 74, 88];
const target = [45, 50, 55, 60, 65, 70];

export default function Mixed() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.charts.data",
  });
  const { colors } = useTheme();
  const [status, setStatus] = useState<string | null>(null);
  const month = new Intl.DateTimeFormat(i18n.language, { month: "short" });
  const months = revenue.map((_, m) => month.format(new Date(2026, m, 1)));
  const usd = new Intl.NumberFormat(i18n.language, {
    style: "currency",
    currency: "USD",
    notation: "compact",
  });
  const format = (value: number) => usd.format(value * 1000);
  return (
    <View style={{ width: "100%", gap: 8 }}>
      <Chart
        height={240}
        ariaLabel={t("revenueAria")}
        series={[
          {
            name: t("revenue"),
            type: "bar",
            data: months.map((m, i) => [m, revenue[i]] as const),
          },
          {
            name: t("target"),
            type: "line",
            data: months.map((m, i) => [m, target[i]] as const),
          },
        ]}
        yAxis={{ format }}
        onPointClick={(event) => {
          const item = event.items[0];
          if (item)
            setStatus(
              t("pointStatus", {
                month: event.xLabel,
                value: format(item.y),
                series: item.seriesName,
              }),
            );
        }}
      />
      <Text role="status" style={{ color: colors["text-secondary-color"] }}>
        {status ?? t("tapHint")}
      </Text>
    </View>
  );
}
