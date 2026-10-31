import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  MixedChart,
  type ChartAnnotation,
  type ChartHoverEvent,
  type ChartSeries,
} from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const DAY = 24 * 60 * 60 * 1000;
const START = new Date(2026, 6, 1).getTime();
const DAYS = 90;
const REORDER_POINT = 520;
const SAFETY_STOCK = 200;
const ORDER_QUANTITY = 1400;
const PROMO = [52, 58] as const; // a promotion doubles the demand

interface PurchaseOrder {
  id: string;
  ordered: number;
  arrives: number;
  quantity: number;
}

// Stock of one item at the end of each day: the warehouse orders a fixed
// quantity when the stock falls under the reorder point, and the supplier
// delivers after a lead time of 5 to 9 days
const random = mulberry32(7);
const { stock, orders } = (() => {
  const levels: number[] = [];
  const placed: PurchaseOrder[] = [];
  let level = 1250;
  for (let day = 0; day < DAYS; day++) {
    const promo = day >= PROMO[0] && day <= PROMO[1];
    const demand = Math.round((promo ? 95 : 48) * (0.7 + random() * 0.6));
    level += placed
      .filter((po) => po.arrives === day)
      .reduce((sum, po) => sum + po.quantity, 0);
    level = Math.max(0, level - demand);
    const pending = placed.some((po) => po.arrives > day);
    if (level <= REORDER_POINT && !pending) {
      placed.push({
        id: `PO-${4180 + placed.length * 7}`,
        ordered: day,
        arrives: day + 5 + Math.floor(random() * 5),
        quantity: ORDER_QUANTITY,
      });
    }
    levels.push(level);
  }
  return {
    stock: levels,
    orders: placed.filter((po) => po.arrives < DAYS),
  };
})();
const time = (day: number) => START + day * DAY;

export default function InventoryDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.mixed-chart.data",
  });
  const locale = i18n.language;
  const [picked, setPicked] = useState<number | null>(null);

  const formats = useMemo(
    () => ({
      units: new Intl.NumberFormat(locale),
      date: new Intl.DateTimeFormat(locale, { month: "short", day: "numeric" }),
      days: new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "day",
        unitDisplay: "long",
      }),
    }),
    [locale],
  );

  const series = useMemo(
    (): ChartSeries[] => [
      {
        id: "stock",
        name: t("stockLevel"),
        type: "area",
        curve: "step",
        color: "var(--chart-series-1, #4f46e5)",
        opacity: 0.18,
        data: stock.map((units, day) => [time(day), units] as const),
      },
      {
        id: "deliveries",
        name: t("deliveries"),
        type: "bar",
        color: "var(--success-color)",
        data: orders.map((po) => [time(po.arrives), po.quantity] as const),
      },
    ],
    [t],
  );
  const annotations = useMemo((): ChartAnnotation[] => {
    const promo: ChartAnnotation = {
      type: "rect",
      x0: time(PROMO[0]),
      x1: time(PROMO[1]),
      color: "var(--warning-color)",
      opacity: 0.1,
      label: t("promotion"),
      labelPosition: "top-right",
    };
    return [
      {
        type: "rect",
        y0: 0,
        y1: SAFETY_STOCK,
        color: "var(--danger-color)",
        opacity: 0.08,
        label: t("safetyStock"),
        labelPosition: "bottom-right",
      },
      {
        type: "line",
        axis: "y",
        value: REORDER_POINT,
        dash: [4, 4],
        color: "var(--warning-color)",
        label: t("reorderPoint"),
      },
      promo,
      ...(picked === null
        ? []
        : [
            {
              type: "line" as const,
              axis: "x" as const,
              value: time(picked),
              color: "var(--primary-color)",
            },
          ]),
    ];
  }, [t, picked]);

  const onPointClick = (event: ChartHoverEvent) => {
    const item = event.items[0];
    if (!item) return;
    setPicked(Math.round((item.x - START) / DAY));
  };

  const readout = () => {
    if (picked === null) return t("inventoryHint");
    const delivery = orders.find((po) => po.arrives === picked);
    if (delivery) {
      return t("deliveryDetails", {
        id: delivery.id,
        quantity: formats.units.format(delivery.quantity),
        ordered: formats.date.format(time(delivery.ordered)),
        arrived: formats.date.format(time(delivery.arrives)),
        lead: formats.days.format(delivery.arrives - delivery.ordered),
      });
    }
    const units = stock[picked] ?? 0;
    const values = {
      date: formats.date.format(time(picked)),
      units: formats.units.format(units),
    };
    return units <= SAFETY_STOCK ? t("stockLow", values) : t("stockOn", values);
  };

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <MixedChart
        series={series}
        annotations={annotations}
        onPointClick={onPointClick}
        onPlotClick={() => setPicked(null)}
        tooltip={{ mode: "axis" }}
        xAxis={{ type: "time" }}
        yAxis={{
          title: t("unitsInStock"),
          format: (y) => formats.units.format(y),
        }}
        locale={locale}
        height={320}
        ariaLabel={t("inventoryAria")}
      />
      <output aria-live="polite">{readout()}</output>
    </div>
  );
}
