import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import {
  SunburstChart,
  useTheme,
  type TreemapNode,
} from "minerva-design/native";

// Disk usage of a laptop, in GB. App names are proper nouns; the folder
// names come from the translations.
interface Entry {
  name?: string;
  folder?: string;
  size?: number;
  children?: Entry[];
}

const DISK: Entry[] = [
  {
    folder: "applications",
    children: [
      { name: "Xcode", size: 12.4 },
      { name: "Docker", size: 9.8 },
      { name: "Figma", size: 1.2 },
      { folder: "other", size: 5.1 },
    ],
  },
  {
    folder: "photos",
    children: [
      { name: "2024", size: 18.5 },
      { name: "2025", size: 22.1 },
      { name: "2026", size: 9.6 },
    ],
  },
  {
    folder: "developer",
    children: [
      { name: "node_modules", size: 14.2 },
      {
        folder: "caches",
        children: [
          { name: "npm", size: 3.1 },
          { name: "pnpm", size: 6.4 },
        ],
      },
      { folder: "simulators", size: 11.5 },
    ],
  },
  {
    folder: "documents",
    children: [
      { folder: "projects", size: 13 },
      { folder: "pdfs", size: 2.3 },
    ],
  },
  { folder: "system", size: 18 },
  { folder: "music", size: 7.4 },
];

export default function Basic() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sunburst-chart",
  });
  const { colors } = useTheme();
  const [path, setPath] = useState<string[]>([]);
  const number = useMemo(
    () => new Intl.NumberFormat(i18n.language, { maximumFractionDigits: 1 }),
    [i18n.language],
  );
  const data = useMemo((): TreemapNode[] => {
    const node = (entry: Entry): TreemapNode => ({
      name: entry.folder ? t(`data.disk.${entry.folder}`) : (entry.name ?? ""),
      value: entry.size,
      children: entry.children?.map(node),
    });
    return DISK.map(node);
  }, [t]);
  return (
    <View style={{ width: "100%", gap: 8 }}>
      <SunburstChart
        data={data}
        format={(value) => t("data.gb", { value: number.format(value) })}
        legend={false}
        height={320}
        onDrill={(event) => setPath(event.path)}
        ariaLabel={t("data.diskAria")}
      />
      <Text role="status" style={{ color: colors["text-secondary-color"] }}>
        {path.length
          ? t("native.data.path", { path: path.join(" › ") })
          : t("native.data.tapHint")}
      </Text>
    </View>
  );
}
