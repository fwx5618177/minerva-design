import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import {
  Bar3DChart,
  type Bar3DDatum,
  type Bar3DSeries,
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

// Units in the bins of a warehouse: 6 aisles × 5 shelf levels. Every
// second a few orders are picked; a bin below 20% of its capacity is low,
// and an empty bin is restocked.
const AISLES = ["A", "B", "C", "D", "E", "F"];
const SHELVES = 5;
const CAPACITY = 120;
const LOW = CAPACITY * 0.2;

const initialStock = () => {
  const random = mulberry32(8);
  return Array.from({ length: AISLES.length * SHELVES }, () =>
    Math.round(CAPACITY * (0.35 + random() * 0.65)),
  );
};

export default function InventoryLiveDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-3d-chart.data",
  });
  const [playing, setPlaying] = useState(true);
  const [stock, setStock] = useState(initialStock);
  const [restocked, setRestocked] = useState(0);
  // one generator for the whole session, so the picks follow a fixed sequence
  const random = useRef(mulberry32(31));

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      const next = random.current;
      // draw the picks outside the state updater, which must stay pure
      const picks = Array.from({ length: 6 }, () => {
        // the lower shelves are picked more often
        const aisle = Math.floor(next() * AISLES.length);
        const shelf = Math.floor(next() ** 1.6 * SHELVES);
        return [aisle * SHELVES + shelf, 1 + Math.floor(next() * 8)] as const;
      });
      setStock((previous) => {
        const bins = [...previous];
        for (const [i, units] of picks) bins[i] = Math.max(0, bins[i]! - units);
        return bins;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [playing]);

  // empty bins are refilled on the next update
  useEffect(() => {
    if (!stock.includes(0)) return;
    const timer = window.setTimeout(() => {
      setStock((previous) =>
        previous.map((units) => (units === 0 ? CAPACITY : units)),
      );
      setRestocked((n) => n + stock.filter((units) => units === 0).length);
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [stock]);

  const integer = useMemo(
    () => new Intl.NumberFormat(i18n.language),
    [i18n.language],
  );
  const series = useMemo((): Bar3DSeries[] => {
    // one series per state: a bin has a bar in exactly one of them
    const binsOf = (lowStock: boolean): Bar3DDatum[] =>
      stock.map((units, i) => ({
        x: Math.floor(i / SHELVES),
        y: i % SHELVES,
        z: units < LOW === lowStock ? units : null,
      }));
    const format = (value: number) =>
      t("unitsValue", { value: integer.format(value) });
    return [
      {
        name: t("inStock"),
        data: binsOf(false),
        color: "var(--chart-series-1, #4f46e5)",
        format,
      },
      {
        name: t("lowStock"),
        data: binsOf(true),
        color: "var(--danger-color, #dc2626)",
        format,
      },
    ];
  }, [t, stock, integer]);
  const low = stock.filter((units) => units < LOW).length;

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch
        size="small"
        checked={playing}
        label={t("liveUpdates")}
        onChange={setPlaying}
      />
      <Bar3DChart
        series={series}
        xAxis={{
          title: t("aisle"),
          categories: AISLES.map((id) => t("aisleLabel", { id })),
        }}
        yAxis={{
          title: t("shelf"),
          categories: Array.from({ length: SHELVES }, (_, n) =>
            t("shelfLabel", { n: n + 1 }),
          ),
        }}
        zAxis={{ title: t("units"), min: 0, max: CAPACITY }}
        barWidth={0.6}
        camera={{ azimuth: 32, elevation: 26 }}
        height={420}
        ariaLabel={t("inventoryAria")}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {t("inventoryStatus", {
          total: integer.format(stock.reduce((sum, units) => sum + units, 0)),
          low,
          bins: stock.length,
          restocked,
        })}
      </output>
    </div>
  );
}
