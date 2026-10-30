import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  TreemapChart,
  type ShapeHoverEvent,
  type TreemapNode,
} from "minerva-design/charts";

// Disk usage of a laptop, in gigabytes. `key`s are translated, the
// application and project names are kept as they are
type Folder = {
  key?: string;
  name?: string;
  value?: number;
  children?: Folder[];
};
const disk: Folder[] = [
  {
    key: "media",
    children: [
      { key: "videos", value: 31.2 },
      { key: "photos", value: 24.3 },
      { key: "music", value: 6.4 },
    ],
  },
  {
    key: "applications",
    children: [
      { name: "Xcode", value: 12.4 },
      { name: "Docker", value: 9.8 },
      { name: "Figma", value: 1.2 },
      { name: "Chrome", value: 1.1 },
      { name: "Slack", value: 0.6 },
    ],
  },
  {
    key: "projects",
    children: [
      { name: "monorepo", value: 14.2 },
      { name: "design-assets", value: 4.3 },
      { name: "side-project", value: 1.6 },
    ],
  },
  {
    key: "system",
    children: [
      { key: "library", value: 11.8 },
      { key: "caches", value: 7.6 },
      { key: "logs", value: 2.1 },
    ],
  },
  {
    key: "downloads",
    children: [
      { key: "installers", value: 5.3 },
      { key: "archives", value: 3.9 },
    ],
  },
];

export default function BasicDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.treemap-chart.data",
  });
  const locale = i18n.language;
  const [selected, setSelected] = useState<ShapeHoverEvent | null>(null);

  const data = useMemo((): TreemapNode[] => {
    const translate = (folder: Folder): TreemapNode => ({
      name: folder.key ? t(`folders.${folder.key}`) : (folder.name ?? ""),
      value: folder.value,
      children: folder.children?.map(translate),
    });
    return disk.map(translate);
  }, [t]);
  const gigabytes = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "gigabyte",
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [locale],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <TreemapChart
        data={data}
        format={(value) => gigabytes.format(value)}
        percentFormat={(share) => percent.format(share)}
        renderTooltip={(cell) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{(cell.path ?? [cell.name]).join(" › ")}</strong>
            <span>
              {gigabytes.format(cell.value)} · {percent.format(cell.percent)}
            </span>
          </div>
        )}
        onClick={setSelected}
        height={380}
        ariaLabel={t("diskAria")}
      />
      <p role="status">
        {selected
          ? t("diskSelected", {
              path: (selected.path ?? [selected.name]).join(" › "),
              size: gigabytes.format(selected.value),
              share: percent.format(selected.percent),
            })
          : t("clickCell")}
      </p>
    </div>
  );
}
