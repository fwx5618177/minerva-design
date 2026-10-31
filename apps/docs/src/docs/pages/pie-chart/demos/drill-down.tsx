import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import {
  PieChart,
  type ShapeDatum,
  type ShapeHoverEvent,
} from "minerva-design/charts";

// Monthly cloud bill (USD): categories, then the services of each
const BILL = [
  {
    key: "compute",
    color: "#6366f1",
    services: [
      ["vms", 8200],
      ["kubernetes", 5400],
      ["serverless", 1300],
    ],
  },
  {
    key: "databases",
    color: "#10b981",
    services: [
      ["sql", 4300],
      ["nosql", 2100],
      ["cache", 900],
    ],
  },
  {
    key: "storage",
    color: "#0ea5e9",
    services: [
      ["objects", 3100],
      ["blocks", 1900],
      ["backups", 800],
    ],
  },
  {
    key: "network",
    color: "#f59e0b",
    services: [
      ["egress", 2600],
      ["cdn", 1400],
      ["loadBalancers", 600],
    ],
  },
] as const;

const sumOf = (services: readonly (readonly [string, number])[]) =>
  services.reduce((sum, [, value]) => sum + value, 0);
const TOTAL = BILL.reduce((sum, category) => sum + sumOf(category.services), 0);

/** Mixes a #rrggbb color with white: 0 = unchanged, 1 = white */
const lighten = (hex: string, amount: number) => {
  const channel = (i: number) => {
    const value = parseInt(hex.slice(i, i + 2), 16);
    return Math.round(value + (255 - value) * amount)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${channel(1)}${channel(3)}${channel(5)}`;
};

export default function DrillDownDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.pie-chart.data",
  });
  const locale = i18n.language;
  // index of the opened category, null on the overview
  const [category, setCategory] = useState<number | null>(null);
  const [selected, setSelected] = useState<ShapeHoverEvent | null>(null);

  const data = useMemo((): ShapeDatum[] => {
    if (category === null)
      return BILL.map((c) => ({
        name: t(`cloud.categories.${c.key}`),
        value: sumOf(c.services),
        color: c.color,
      }));
    // the services take shades of their category's color
    const { color, services } = BILL[category];
    return services.map(([key, value], i) => ({
      name: t(`cloud.services.${key}`),
      value,
      color: lighten(color, i * 0.3),
    }));
  }, [category, t]);
  const format = useMemo(() => {
    const currency = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
    return (value: number) => currency.format(value);
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
  const onClick = (event: ShapeHoverEvent) =>
    category === null ? open(event.index) : setSelected(event);

  const categoryName =
    category === null ? null : t(`cloud.categories.${BILL[category].key}`);
  const categoryTotal = category === null ? 0 : sumOf(BILL[category].services);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <HStack
        gap={4}
        align="center"
        wrap
        as="nav"
        aria-label={t("cloud.breadcrumb")}
      >
        <Button
          size="small"
          variant={category === null ? "solid" : "ghost"}
          aria-current={category === null ? "location" : undefined}
          onClick={() => open(null)}
        >
          {t("cloud.all")}
        </Button>
        {categoryName && (
          <>
            <span aria-hidden>/</span>
            <strong aria-current="location">{categoryName}</strong>
          </>
        )}
      </HStack>
      <PieChart
        data={data}
        legend={false}
        format={format}
        percentFormat={percentFormat}
        renderTooltip={(slice) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{slice.name}</strong>
            <span>
              {format(slice.value)} · {percentFormat(slice.percent)}
            </span>
            {category === null && <span>{t("cloud.clickToOpen")}</span>}
          </div>
        )}
        onClick={onClick}
        height={320}
        ariaLabel={
          categoryName
            ? t("cloud.servicesAria", { category: categoryName })
            : t("cloud.aria")
        }
      />
      <p role="status" style={{ margin: 0 }}>
        {selected && categoryName
          ? t("cloud.serviceLine", {
              service: selected.name,
              amount: format(selected.value),
              share: percentFormat(selected.percent),
              category: categoryName,
            })
          : categoryName
            ? t("cloud.categoryLine", {
                category: categoryName,
                amount: format(categoryTotal),
                share: percentFormat(categoryTotal / TOTAL),
              })
            : t("cloud.hint", { total: format(TOTAL) })}
      </p>
    </div>
  );
}
