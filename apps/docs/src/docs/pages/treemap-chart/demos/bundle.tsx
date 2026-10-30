import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { TreemapChart, type TreemapNode } from "minerva-design/charts";

// Minified size (KB) of a web application's JavaScript bundle, by module
const bundle: TreemapNode[] = [
  {
    name: "node_modules",
    children: [
      { name: "react-dom", value: 131 },
      { name: "lodash", value: 72 },
      { name: "moment", value: 67 },
      { name: "moment/locale", value: 160 },
      { name: "chart.js", value: 204 },
      { name: "axios", value: 14 },
      { name: "zod", value: 57 },
      { name: "react", value: 7 },
    ],
  },
  {
    name: "src",
    children: [
      {
        name: "pages",
        children: [
          { name: "dashboard", value: 48 },
          { name: "settings", value: 22 },
          { name: "reports", value: 36 },
        ],
      },
      { name: "components", value: 61 },
      { name: "i18n", value: 28 },
      { name: "utils", value: 9 },
    ],
  },
];

// what a bundle analyzer would point out
const HEAVY = 100; // KB

const total = (node: TreemapNode): number =>
  node.value ?? (node.children ?? []).reduce((sum, c) => sum + total(c), 0);

export default function BundleDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.treemap-chart.data",
  });
  const locale = i18n.language;
  const kilobytes = useMemo(
    () => new Intl.NumberFormat(locale, { style: "unit", unit: "kilobyte" }),
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
  const size = bundle.reduce((sum, node) => sum + total(node), 0);
  const heavy = (bundle[0].children ?? []).filter((m) => total(m) >= HEAVY);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <TreemapChart
        data={bundle}
        format={(value) => kilobytes.format(value)}
        percentFormat={(share) => percent.format(share)}
        renderTooltip={(cell) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{(cell.path ?? [cell.name]).join("/")}</strong>
            <span>
              {kilobytes.format(cell.value)} ·{" "}
              {t("ofBundle", { share: percent.format(cell.percent) })}
            </span>
          </div>
        )}
        height={360}
        ariaLabel={t("bundleAria")}
      />
      <p>
        {t("bundleSummary", {
          size: kilobytes.format(size),
          modules: heavy.map((m) => m.name).join(", "),
        })}
      </p>
    </div>
  );
}
