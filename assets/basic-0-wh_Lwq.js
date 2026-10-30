import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import {
  QuadrantChart,
  useTheme,
  type QuadrantPoint,
} from "minerva-design/native";

// x: effort, y: impact (0-10)
const features = [
  { key: "darkMode", x: 2, y: 8 },
  { key: "offlineSync", x: 8, y: 9 },
  { key: "newIcons", x: 2.5, y: 3 },
  { key: "rewrite", x: 8.5, y: 2.5 },
  { key: "search", x: 6, y: 7 },
];

export default function Basic() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.quadrant-chart.data",
  });
  const { colors } = useTheme();
  const [status, setStatus] = useState<string | null>(null);
  const points: QuadrantPoint[] = features.map(({ key, x, y }) => ({
    label: t(\`features.\${key}\`),
    x,
    y,
  }));
  return (
    <View style={{ width: "100%", gap: 8 }}>
      <QuadrantChart
        height={300}
        points={points}
        xLabel={t("effort")}
        yLabel={t("impact")}
        quadrants={{
          topLeft: { label: t("quickWins") },
          topRight: { label: t("bigBets") },
          bottomLeft: { label: t("fillIns") },
          bottomRight: { label: t("moneyPits") },
        }}
        ariaLabel={t("featuresAria")}
        onPointClick={(point) =>
          setStatus(
            t("featureStatus", {
              feature: point.label,
              effort: point.x,
              impact: point.y,
            }),
          )
        }
      />
      <Text role="status" style={{ color: colors["text-secondary-color"] }}>
        {status ?? t("tapFeature")}
      </Text>
    </View>
  );
}
`})))()}n();export{t as default};