import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import {
  PieChart,
  useTheme,
  type ShapeHoverEvent,
} from "minerva-design/native";

// Website sessions over the last 30 days, by traffic source
const sessions = [
  { key: "organic", value: 48200 },
  { key: "direct", value: 23100 },
  { key: "social", value: 16400 },
  { key: "paid", value: 12700 },
  { key: "referral", value: 9800 },
];

// Phones are narrow: the shares go inside the slices, the names in the legend
const labelContent = ["percent"] as const;

export default function Basic() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.pie-chart",
  });
  const { colors } = useTheme();
  const [selected, setSelected] = useState<ShapeHoverEvent | null>(null);
  const locale = i18n.language;
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const data = useMemo(
    () =>
      sessions.map(({ key, value }) => ({
        name: t(\`data.sources.\${key}\`),
        value,
      })),
    [t],
  );
  return (
    <View style={{ width: "100%", gap: 8 }}>
      <PieChart
        data={data}
        height={300}
        labels="inside"
        labelContent={labelContent}
        // Rounded slices, separated by a 2px gap
        cornerRadius={6}
        padAngle={2}
        format={(value) => number.format(value)}
        percentFormat={(share) => percent.format(share)}
        onClick={setSelected}
        ariaLabel={t("data.sessionsAria")}
      />
      <Text role="status" style={{ color: colors["text-secondary-color"] }}>
        {selected
          ? t("data.selectedSource", {
              source: selected.name,
              sessions: number.format(selected.value),
              share: percent.format(selected.percent),
            })
          : t("native.data.tapSlice")}
      </Text>
    </View>
  );
}
`})))()}n();export{t as default};