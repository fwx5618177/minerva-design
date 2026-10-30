import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import {
  TreemapChart,
  useTheme,
  type ShapeHoverEvent,
  type TreemapNode,
} from "minerva-design/native";

// Storage used on a phone, in megabytes
const usage = [
  {
    key: "media",
    children: [
      { key: "photos", value: 38400 },
      { key: "videos", value: 21800 },
      { key: "music", value: 6200 },
    ],
  },
  {
    key: "apps",
    children: [
      { key: "games", value: 14600 },
      { key: "social", value: 7900 },
      { key: "maps", value: 3100 },
    ],
  },
  { key: "system", value: 11800 },
  { key: "messages", value: 4700 },
];

type Usage = { key: string; value?: number; children?: Usage[] };

export default function Basic() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.treemap-chart.native.data",
  });
  const { colors } = useTheme();
  const [selected, setSelected] = useState<ShapeHoverEvent | null>(null);
  const locale = i18n.language;
  const size = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "gigabyte",
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const data = useMemo((): TreemapNode[] => {
    const node = ({ key, value, children }: Usage): TreemapNode => ({
      name: t(`items.${key}`),
      value,
      children: children?.map(node),
    });
    return usage.map(node);
  }, [t]);
  return (
    <View style={{ width: "100%", gap: 8 }}>
      <TreemapChart
        data={data}
        height={300}
        format={(mb) => size.format(mb / 1024)}
        onClick={setSelected}
        ariaLabel={t("storageAria")}
      />
      <Text role="status" style={{ color: colors["text-secondary-color"] }}>
        {selected
          ? t("selectedItem", {
              path: (selected.path ?? [selected.name]).join(" › "),
              size: size.format(selected.value / 1024),
            })
          : t("tapCell")}
      </Text>
    </View>
  );
}
