import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import { ChordChart, type ShapeToggleEvent } from "minerva-design/charts";

const HUBS = [
  "london",
  "paris",
  "frankfurt",
  "istanbul",
  "dubai",
  "singapore",
  "tokyo",
  "newYork",
] as const;
const EAST = new Set<string>(["dubai", "singapore", "tokyo", "istanbul"]);

// Yearly passengers between airport hubs, in millions (both directions)
const ROUTES: [number, number, number][] = [
  [0, 1, 2.1],
  [0, 2, 1.6],
  [0, 3, 1.9],
  [0, 4, 3.4],
  [0, 5, 1.2],
  [0, 6, 0.9],
  [0, 7, 3.9],
  [1, 2, 1.1],
  [1, 3, 1.4],
  [1, 4, 1.8],
  [1, 5, 0.8],
  [1, 6, 1.0],
  [1, 7, 2.6],
  [2, 3, 1.7],
  [2, 4, 1.5],
  [2, 5, 0.9],
  [2, 6, 0.8],
  [2, 7, 1.9],
  [3, 4, 1.3],
  [3, 7, 0.7],
  [4, 5, 1.6],
  [4, 6, 0.9],
  [4, 7, 1.1],
  [5, 6, 1.4],
  [6, 7, 1.2],
];

export default function LegendDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.chord-chart.data",
  });
  const [hidden, setHidden] = useState<readonly number[]>([]);
  const groups = useMemo(() => HUBS.map((hub) => t(`hubs.${hub}`)), [t]);
  const links = useMemo(
    () => ROUTES.map(([source, target, value]) => ({ source, target, value })),
    [],
  );
  const decimal = useMemo(
    () => new Intl.NumberFormat(i18n.language, { maximumFractionDigits: 1 }),
    [i18n.language],
  );
  const format = useMemo(
    () => (value: number) =>
      t("hubs.millions", { value: decimal.format(value) }),
    [decimal, t],
  );

  // the legend only reports the toggle: the hidden list lives here
  const onToggle = (event: ShapeToggleEvent) => setHidden(event.hiddenIndexes);

  const shown = HUBS.length - hidden.length;
  const visible = ROUTES.filter(
    ([a, b]) => !hidden.includes(a) && !hidden.includes(b),
  );
  const passengers = visible.reduce((sum, [, , value]) => sum + value, 0);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={8} wrap align="center">
        <Button
          variant="outline"
          size="small"
          disabled={hidden.length === 0}
          onClick={() => setHidden([])}
        >
          {t("hubs.showAll")}
        </Button>
        <Button
          variant="outline"
          size="small"
          onClick={() =>
            setHidden(HUBS.flatMap((hub, i) => (EAST.has(hub) ? [] : [i])))
          }
        >
          {t("hubs.eastOnly")}
        </Button>
        <Button
          variant="outline"
          size="small"
          onClick={() =>
            setHidden(HUBS.flatMap((hub, i) => (EAST.has(hub) ? [i] : [])))
          }
        >
          {t("hubs.westOnly")}
        </Button>
      </HStack>
      <ChordChart
        groups={groups}
        links={links}
        legend={{ position: "top" }}
        hidden={hidden}
        onToggle={onToggle}
        format={format}
        padAngle={2}
        height={460}
        ariaLabel={t("hubs.aria")}
      />
      <output aria-live="polite">
        {shown < 2
          ? t("hubs.tooFew")
          : t("hubs.summary", {
              shown,
              total: HUBS.length,
              routes: visible.length,
              passengers: format(passengers),
            })}
      </output>
    </div>
  );
}
