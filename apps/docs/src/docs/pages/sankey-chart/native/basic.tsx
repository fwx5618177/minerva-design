import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import {
  SankeyChart,
  useTheme,
  type SankeyLink,
  type ShapeHoverEvent,
} from "minerva-design/native";

// Yearly budget of a software company, in millions of dollars: revenue
// streams, then the departments it is split between
const ALLOCATIONS: [string, string, number][] = [
  ["licenses", "budget", 18.4],
  ["subscriptions", "budget", 42.6],
  ["services", "budget", 9.2],
  ["grants", "budget", 2.8],
  ["budget", "rnd", 29.5],
  ["budget", "sales", 21.3],
  ["budget", "operations", 13.7],
  ["budget", "admin", 8.5],
];

export default function Basic() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sankey-chart",
  });
  const { colors } = useTheme();
  const [selected, setSelected] = useState<ShapeHoverEvent | null>(null);
  const money = useMemo(
    () =>
      new Intl.NumberFormat(i18n.language, {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 1,
      }),
    [i18n.language],
  );
  const links = useMemo(
    (): SankeyLink[] =>
      ALLOCATIONS.map(([source, target, value]) => ({
        source: t(`data.budget.${source}`),
        target: t(`data.budget.${target}`),
        value: value * 1e6,
      })),
    [t],
  );
  return (
    <View style={{ width: "100%", gap: 8 }}>
      <SankeyChart
        links={links}
        nodeWidth={10}
        labelValues={false}
        format={(value) => money.format(value)}
        onClick={setSelected}
        height={320}
        ariaLabel={t("data.budgetAria")}
      />
      <Text role="status" style={{ color: colors["text-secondary-color"] }}>
        {selected
          ? selected.source && selected.target
            ? `${selected.source} → ${selected.target}: ${money.format(selected.value)}`
            : `${selected.name}: ${money.format(selected.value)}`
          : t("native.data.tapHint")}
      </Text>
    </View>
  );
}
