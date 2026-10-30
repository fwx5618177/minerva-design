import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { HorizontalBarChart, useTheme } from "minerva-design/native";

// Monthly active users per app (millions)
const apps = [
  ["messages", 48],
  ["photos", 35],
  ["maps", 27],
  ["music", 19],
  ["notes", 12],
] as const;

export default function Basic() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.horizontal-bar-chart.data",
  });
  const { colors } = useTheme();
  const [status, setStatus] = useState<string | null>(null);
  const number = new Intl.NumberFormat(i18n.language);
  return (
    <View style={{ width: "100%", gap: 8 }}>
      <HorizontalBarChart
        height={260}
        labels
        ariaLabel={t("appsAria")}
        series={[
          {
            name: t("activeUsers"),
            data: apps.map(
              ([key, value]) => [t(\`apps.\${key}\`), value] as const,
            ),
          },
        ]}
        onPointClick={(event) => {
          const item = event.items[0];
          if (item)
            setStatus(
              t("usersStatus", {
                app: event.xLabel,
                users: number.format(item.y),
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