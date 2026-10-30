import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { LineChart, useTheme } from "minerva-design/native";

const steps = [6200, 8400, 7100, 9800, 10400, 12800, 5600];

/** Short weekday names in the reader's language, Monday first */
const weekdays = (locale: string) => {
  const format = new Intl.DateTimeFormat(locale, { weekday: "short" });
  // 5 January 2026 is a Monday
  return Array.from({ length: 7 }, (_, i) =>
    format.format(new Date(2026, 0, 5 + i)),
  );
};

export default function Basic() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.line-chart.data",
  });
  const { colors } = useTheme();
  const [status, setStatus] = useState<string | null>(null);
  const days = weekdays(i18n.language);
  const number = new Intl.NumberFormat(i18n.language);
  const compact = new Intl.NumberFormat(i18n.language, { notation: "compact" });
  return (
    <View style={{ width: "100%", gap: 8 }}>
      <LineChart
        height={220}
        ariaLabel={t("stepsAria")}
        yAxis={{ format: (value) => compact.format(value) }}
        series={[
          {
            name: t("steps"),
            data: days.map((day, i) => [day, steps[i]] as const),
          },
        ]}
        onHover={(event) => {
          const item = event?.items[0];
          if (event && item)
            setStatus(
              t("stepsStatus", {
                day: event.xLabel,
                steps: number.format(item.y),
              }),
            );
        }}
      />
      <Text role="status" style={{ color: colors["text-secondary-color"] }}>
        {status ?? t("scrubHint")}
      </Text>
    </View>
  );
}
`})))()}n();export{t as default};