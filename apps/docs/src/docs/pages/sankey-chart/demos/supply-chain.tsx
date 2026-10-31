import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import {
  SankeyChart,
  type SankeyLink,
  type SankeyNode,
  type ShapeHoverEvent,
} from "minerva-design/charts";

type Site =
  | "brazil"
  | "colombia"
  | "ethiopia"
  | "vietnam"
  | "hamburg"
  | "rotterdam"
  | "north"
  | "central"
  | "south"
  | "cafes"
  | "supermarkets"
  | "online";

const SITES: Site[] = [
  "brazil",
  "colombia",
  "ethiopia",
  "vietnam",
  "hamburg",
  "rotterdam",
  "north",
  "central",
  "south",
  "cafes",
  "supermarkets",
  "online",
];

// Green coffee shipped in a month, in tonnes: origins, roasteries,
// warehouses and sales channels
const SHIPMENTS: [Site, Site, number][] = [
  ["brazil", "hamburg", 180],
  ["brazil", "rotterdam", 140],
  ["colombia", "hamburg", 95],
  ["colombia", "rotterdam", 70],
  ["ethiopia", "hamburg", 60],
  ["vietnam", "rotterdam", 125],
  ["hamburg", "north", 160],
  ["hamburg", "central", 120],
  ["hamburg", "south", 55],
  ["rotterdam", "central", 150],
  ["rotterdam", "south", 185],
  ["north", "cafes", 70],
  ["north", "supermarkets", 60],
  ["north", "online", 30],
  ["central", "cafes", 85],
  ["central", "supermarkets", 140],
  ["central", "online", 45],
  ["south", "cafes", 60],
  ["south", "supermarkets", 155],
  ["south", "online", 25],
];

// event.index of the selected mark: a node, or SITES.length + link index
type Selection = number;

// Links on every path through a node: walks upstream and downstream
function pathThrough(site: number) {
  const on = new Set<number>();
  const walk = (start: number, up: boolean) => {
    const queue = [start];
    while (queue.length) {
      const current = queue.shift()!;
      SHIPMENTS.forEach(([from, to], i) => {
        const near = SITES.indexOf(up ? to : from);
        if (near !== current || on.has(i)) return;
        on.add(i);
        queue.push(SITES.indexOf(up ? from : to));
      });
    }
  };
  walk(site, true);
  walk(site, false);
  return on;
}

export default function SupplyChainDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sankey-chart.data",
  });
  const [selection, setSelection] = useState<Selection | null>(null);
  const number = useMemo(
    () => new Intl.NumberFormat(i18n.language),
    [i18n.language],
  );
  // tonnes are not an Intl unit: the number is localized, the unit translated
  const format = useMemo(
    () => (value: number) =>
      t("supply.tonnes", { value: number.format(value) }),
    [t, number],
  );

  const highlighted = useMemo(() => {
    if (selection === null) return null;
    if (selection >= SITES.length) return new Set([selection - SITES.length]);
    return pathThrough(selection);
  }, [selection]);

  const nodes = useMemo(
    (): SankeyNode[] => SITES.map((site) => ({ name: t(`supply.${site}`) })),
    [t],
  );
  const links = useMemo(
    (): SankeyLink[] =>
      SHIPMENTS.map(([from, to, value], i) => ({
        source: SITES.indexOf(from),
        target: SITES.indexOf(to),
        value,
        ...(highlighted && !highlighted.has(i)
          ? { color: "var(--border-color)" }
          : {}),
      })),
    [highlighted],
  );

  const onClick = (event: ShapeHoverEvent) =>
    setSelection((current) => (current === event.index ? null : event.index));

  let readout = t("supply.hint");
  if (selection !== null && selection < SITES.length) {
    const site = SITES[selection]!;
    const inbound = SHIPMENTS.filter(([, to]) => to === site);
    const outbound = SHIPMENTS.filter(([from]) => from === site);
    const sum = (list: typeof SHIPMENTS) =>
      list.reduce((total, [, , value]) => total + value, 0);
    readout = t("supply.node", {
      name: t(`supply.${site}`),
      inbound: format(sum(inbound)),
      from: number.format(inbound.length),
      outbound: format(sum(outbound)),
      to: number.format(outbound.length),
    });
  } else if (selection !== null) {
    const [from, to, value] = SHIPMENTS[selection - SITES.length]!;
    const sent = SHIPMENTS.filter(([source]) => source === from).reduce(
      (total, [, , v]) => total + v,
      0,
    );
    readout = t("supply.link", {
      source: t(`supply.${from}`),
      target: t(`supply.${to}`),
      value: format(value),
      share: new Intl.NumberFormat(i18n.language, {
        style: "percent",
        maximumFractionDigits: 0,
      }).format(value / sent),
    });
  }

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <SankeyChart
        nodes={nodes}
        links={links}
        format={format}
        linkColor="source"
        onClick={onClick}
        height={420}
        ariaLabel={t("supply.aria")}
      />
      <HStack gap={12} wrap align="center" justify="between">
        <output aria-live="polite">{readout}</output>
        <Button
          variant="outline"
          size="small"
          disabled={selection === null}
          onClick={() => setSelection(null)}
        >
          {t("supply.clear")}
        </Button>
      </HStack>
    </div>
  );
}
