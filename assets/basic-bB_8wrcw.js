import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { ScatterChart, useTheme } from "minerva-design/native";

// Deterministic pseudo-random clusters
const cluster = (cx: number, cy: number, seed: number) =>
  Array.from({ length: 40 }, (_, i) => {
    const a = Math.sin(seed * 97 + i * 12.9898) * 43758.5453;
    const b = Math.sin(seed * 31 + i * 78.233) * 12543.123;
    return [
      Math.round((cx + (a - Math.floor(a) - 0.5) * 20) * 10) / 10,
      Math.round((cy + (b - Math.floor(b) - 0.5) * 20) * 10) / 10,
    ] as const;
  });

export default function Basic() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.scatter-chart.data",
  });
  const { colors } = useTheme();
  const [status, setStatus] = useState<string | null>(null);
  return (
    <View style={{ width: "100%", gap: 8 }}>
      <ScatterChart
        height={240}
        ariaLabel={t("sessionAria")}
        xAxis={{ title: t("minutes") }}
        yAxis={{ title: t("pages") }}
        series={[
          { name: t("free"), data: cluster(20, 25, 1) },
          { name: t("pro"), data: cluster(45, 50, 2) },
        ]}
        onPointClick={(event) => {
          const item = event.items[0];
          if (item)
            setStatus(
              t("sessionStatus", {
                plan: item.seriesName,
                minutes: event.xLabel,
                pages: item.y,
              }),
            );
        }}
      />
      <Text role="status" style={{ color: colors["text-secondary-color"] }}>
        {status ?? t("tapDot")}
      </Text>
    </View>
  );
}
`})))()}n();export{t as default};