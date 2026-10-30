import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { BarChart, Switch } from "minerva-design/native";

const channels = [
  { name: "Web", values: [40, 52, 48, 61, 70] },
  { name: "iOS", values: [28, 30, 35, 41, 44] },
  { name: "Android", values: [22, 27, 31, 30, 38] },
];

/** Short month names in the reader's language */
const monthNames = (locale: string, count: number) => {
  const format = new Intl.DateTimeFormat(locale, { month: "short" });
  return Array.from({ length: count }, (_, m) =>
    format.format(new Date(2026, m, 1)),
  );
};

export default function Stacked() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-chart.data",
  });
  const [stacked, setStacked] = useState(true);
  const months = monthNames(i18n.language, 5);
  return (
    <View style={{ width: "100%", gap: 12 }}>
      <Switch
        checked={stacked}
        onChange={setStacked}
        label={stacked ? t("stacked") : t("grouped")}
      />
      <BarChart
        stacked={stacked}
        height={240}
        ariaLabel={t("ordersPerChannelAria")}
        series={channels.map((channel) => ({
          name: channel.name,
          data: months.map((month, i) => [month, channel.values[i]] as const),
        }))}
      />
    </View>
  );
}
`})))()}n();export{t as default};