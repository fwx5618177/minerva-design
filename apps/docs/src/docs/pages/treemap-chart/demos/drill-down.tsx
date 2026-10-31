import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import {
  TreemapChart,
  type ShapeHoverEvent,
  type TreemapNode,
} from "minerva-design/charts";

// Quarterly revenue of an online store (thousand USD): categories,
// subcategories (translated) and brands (proper nouns)
const STORE: [category: string, [subcategory: string, [string, number][]][]][] =
  [
    [
      "electronics",
      [
        [
          "phones",
          [
            ["Aurora", 420],
            ["Nimbus", 260],
            ["Vertex", 180],
          ],
        ],
        [
          "laptops",
          [
            ["Aurora", 380],
            ["Kite", 240],
          ],
        ],
        [
          "audio",
          [
            ["Echo", 150],
            ["Pulse", 90],
          ],
        ],
      ],
    ],
    [
      "home",
      [
        [
          "kitchen",
          [
            ["Brava", 140],
            ["Cuisio", 95],
          ],
        ],
        [
          "furniture",
          [
            ["Loft", 210],
            ["Nordik", 160],
          ],
        ],
        [
          "decor",
          [
            ["Lumo", 70],
            ["Terra", 45],
          ],
        ],
      ],
    ],
    [
      "fashion",
      [
        [
          "women",
          [
            ["Mira", 230],
            ["Sola", 120],
          ],
        ],
        [
          "men",
          [
            ["Atlas", 150],
            ["Rivet", 80],
          ],
        ],
        ["kids", [["Pip", 75]]],
      ],
    ],
    [
      "sports",
      [
        [
          "outdoor",
          [
            ["Trek", 160],
            ["Summit", 90],
          ],
        ],
        [
          "fitness",
          [
            ["Core", 110],
            ["Stride", 65],
          ],
        ],
      ],
    ],
  ];

export default function DrillDownDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.treemap-chart.data",
  });
  const locale = i18n.language;
  // index of the opened category, null on the overview
  const [category, setCategory] = useState<number | null>(null);
  const [selected, setSelected] = useState<ShapeHoverEvent | null>(null);

  const tree = useMemo(
    (): TreemapNode[] =>
      STORE.map(([key, subcategories]) => ({
        name: t(`store.categories.${key}`),
        children: subcategories.map(([sub, brands]) => ({
          name: t(`store.subcategories.${sub}`),
          children: brands.map(([name, value]) => ({ name, value })),
        })),
      })),
    [t],
  );
  // inside a category, its subcategories become the top level
  const data = category === null ? tree : (tree[category].children ?? []);
  const format = useMemo(() => {
    const money = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    });
    return (value: number) => money.format(value * 1000);
  }, [locale]);
  const percentFormat = useMemo(() => {
    const percent = new Intl.NumberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 1,
    });
    return (share: number) => percent.format(share);
  }, [locale]);

  const open = (index: number | null) => {
    setCategory(index);
    setSelected(null);
  };
  const onClick = (cell: ShapeHoverEvent) => {
    if (category !== null) return setSelected(cell);
    // the first name of the path is the clicked cell's category
    const index = tree.findIndex((node) => node.name === cell.path?.[0]);
    if (index >= 0) open(index);
  };
  const path = (cell: ShapeHoverEvent) =>
    [
      ...(category === null ? [] : [tree[category].name]),
      ...(cell.path ?? [cell.name]),
    ].join(" › ");

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <HStack
        gap={4}
        align="center"
        wrap
        as="nav"
        aria-label={t("store.breadcrumb")}
      >
        <Button
          size="small"
          variant={category === null ? "solid" : "ghost"}
          aria-current={category === null ? "location" : undefined}
          onClick={() => open(null)}
        >
          {t("store.all")}
        </Button>
        {category !== null && (
          <>
            <span aria-hidden>/</span>
            <strong aria-current="location">{tree[category].name}</strong>
          </>
        )}
      </HStack>
      <TreemapChart
        data={data}
        format={format}
        percentFormat={percentFormat}
        renderTooltip={(cell) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{path(cell)}</strong>
            <span>
              {format(cell.value)} · {percentFormat(cell.percent)}
            </span>
          </div>
        )}
        onClick={onClick}
        height={380}
        ariaLabel={
          category === null
            ? t("store.aria")
            : t("store.categoryAria", { category: tree[category].name })
        }
      />
      <p role="status" style={{ margin: 0 }}>
        {selected
          ? t("store.selected", {
              path: path(selected),
              revenue: format(selected.value),
              share: percentFormat(selected.percent),
            })
          : category === null
            ? t("store.hint")
            : t("store.hintBrand")}
      </p>
    </div>
  );
}
