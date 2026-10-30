import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Button, GaugeChart, type GaugeBand } from "minerva-design/native";

// Net Promoter Score: -100 (everyone detracts) to +100 (everyone promotes)
const bands: GaugeBand[] = [
  { to: 0, color: "var(--danger-color)" },
  { to: 30, color: "var(--warning-color)" },
  { to: 100, color: "var(--success-color)" },
];

const signed = (value: number) => {
  const rounded = Math.round(value);
  return rounded > 0 ? \`+\${rounded}\` : \`\${rounded}\`;
};

export default function Bands() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.gauge-chart.native.data",
  });
  const [score, setScore] = useState(42);
  const change = (step: number) =>
    setScore((value) => Math.max(-100, Math.min(100, value + step)));
  return (
    <View style={{ width: "100%", gap: 12 }}>
      <GaugeChart
        value={score}
        min={-100}
        max={100}
        bands={bands}
        needle
        label={t("nps")}
        format={signed}
        height={240}
        ariaLabel={t("nps")}
      />
      <View style={{ flexDirection: "row", gap: 8, justifyContent: "center" }}>
        <Button variant="outline" onPress={() => change(-20)}>
          {t("lower")}
        </Button>
        <Button variant="outline" onPress={() => change(20)}>
          {t("raise")}
        </Button>
      </View>
    </View>
  );
}
`})))()}n();export{t as default};