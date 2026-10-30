import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { BarChart, useTheme } from "minerva-design/native";

const sales = [120, 180, 150, 220];

export default function Basic() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-chart.data",
  });
  const { colors } = useTheme();
  const [status, setStatus] = useState<string | null>(null);
  const number = new Intl.NumberFormat(i18n.language);
  return (
    <View style={{ width: "100%", gap: 8 }}>
      <BarChart
        height={220}
        ariaLabel={t("salesAria")}
        series={[
          {
            name: t("sales"),
            data: sales.map(
              (value, i) => [t("quarter", { n: i + 1 }), value] as const,
            ),
          },
        ]}
        onPointClick={(event) => {
          const item = event.items[0];
          if (item)
            setStatus(
              t("unitsStatus", {
                quarter: event.xLabel,
                units: number.format(item.y),
              }),
            );
        }}
      />
      <Text role="status" style={{ color: colors["text-secondary-color"] }}>
        {status ?? t("tapBar")}
      </Text>
    </View>
  );
}
`})))()}n();export{t as default};