import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import {
  ChordChart,
  useTheme,
  type ShapeHoverEvent,
} from "minerva-design/native";

const TEAMS = ["design", "engineering", "product", "marketing"] as const;

// Messages sent in a week: row = sender, column = recipient
const MATRIX = [
  [0, 42, 28, 14],
  [36, 0, 54, 8],
  [30, 48, 0, 22],
  [12, 6, 26, 0],
];

export default function Basic() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.chord-chart",
  });
  const { colors } = useTheme();
  const [selected, setSelected] = useState<ShapeHoverEvent | null>(null);
  const groups = useMemo(
    () => TEAMS.map((team) => t(\`data.teams.\${team}\`)),
    [t],
  );
  return (
    <View style={{ width: "100%", gap: 8 }}>
      <ChordChart
        groups={groups}
        matrix={MATRIX}
        locale={i18n.language}
        legend={false}
        onClick={setSelected}
        height={340}
        ariaLabel={t("data.teamsAria")}
      />
      <Text role="status" style={{ color: colors["text-secondary-color"] }}>
        {selected
          ? selected.source && selected.target
            ? t("native.data.flow", {
                source: selected.source,
                target: selected.target,
                value: selected.value,
                reverse: selected.reverseValue ?? 0,
              })
            : t("native.data.team", {
                name: selected.name,
                value: selected.value,
              })
          : t("native.data.tapHint")}
      </Text>
    </View>
  );
}
`})))()}n();export{t as default};