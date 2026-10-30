import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { RadarChart, useTheme } from "minerva-design/native";

// Two phones rated out of 5 by a review site
const criteria = [
  "battery",
  "camera",
  "display",
  "performance",
  "price",
] as const;
const phones = [
  { name: "Nova X", values: [4.5, 3.5, 4, 3, 4.5] },
  { name: "Pixelon 9", values: [3.5, 5, 4.5, 4.5, 2.5] },
];

export default function Compare() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.radar-chart.native.data",
  });
  const { colors } = useTheme();
  const [hidden, setHidden] = useState<number[]>([]);
  const indicators = useMemo(
    () => criteria.map((key) => ({ name: t(\`criteria.\${key}\`), max: 5 })),
    [t],
  );
  const visible = phones.filter((_, i) => !hidden.includes(i));
  return (
    <View style={{ width: "100%", gap: 8 }}>
      <RadarChart
        indicators={indicators}
        series={phones}
        shape="circle"
        levels={5}
        height={320}
        hidden={hidden}
        onToggle={(event) => setHidden(event.hiddenIndexes)}
        ariaLabel={t("phonesAria")}
      />
      <Text role="status" style={{ color: colors["text-secondary-color"] }}>
        {t("comparing", {
          phones: visible.map((phone) => phone.name).join(" · ") || "—",
        })}
      </Text>
    </View>
  );
}
`})))()}n();export{t as default};