import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { LineChart, useTheme } from "minerva-design/native";

const hours = Array.from({ length: 24 }, (_, i) => i);
const wave = (phase: number, base: number) =>
  hours.map(
    (hour) =>
      [
        hour,
        Math.round(base + 20 * Math.sin((hour + phase) / 3.5) + hour),
      ] as const,
  );

export default function Area() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.line-chart.data",
  });
  const { colors } = useTheme();
  const percent = new Intl.NumberFormat(i18n.language, { style: "percent" });
  return (
    <View style={{ width: "100%", gap: 8 }}>
      <LineChart
        area
        height={220}
        crosshair
        ariaLabel={t("usageAria")}
        xAxis={{ format: (hour) => t("hour", { hour }) }}
        yAxis={{ format: (value) => percent.format(value / 100) }}
        series={[
          { name: t("cpu"), data: wave(0, 35) },
          { name: t("memory"), data: wave(4, 25) },
        ]}
      />
      <Text style={{ color: colors["text-secondary-color"] }}>
        {t("pinchHint")}
      </Text>
    </View>
  );
}
