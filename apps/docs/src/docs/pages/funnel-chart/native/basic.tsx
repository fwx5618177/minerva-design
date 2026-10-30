import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import {
  FunnelChart,
  useTheme,
  type ShapeHoverEvent,
} from "minerva-design/native";

// Sign-up funnel of a mobile app over one week
const stages = [
  { key: "install", value: 12400 },
  { key: "open", value: 9100 },
  { key: "signup", value: 4300 },
  { key: "trial", value: 1900 },
  { key: "paid", value: 640 },
] as const;

export default function Basic() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.funnel-chart.native.data",
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
    () => stages.map(({ key, value }) => ({ name: t(`stages.${key}`), value })),
    [t],
  );
  return (
    <View style={{ width: "100%", gap: 8 }}>
      <FunnelChart
        data={data}
        height={300}
        format={(value) => number.format(value)}
        percentFormat={(share) => percent.format(share)}
        onClick={setSelected}
        ariaLabel={t("signupAria")}
      />
      <Text role="status" style={{ color: colors["text-secondary-color"] }}>
        {selected
          ? t("selectedStage", {
              stage: selected.name,
              users: number.format(selected.value),
              share: percent.format(selected.percent),
            })
          : t("tapStage")}
      </Text>
    </View>
  );
}
