import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { HStack, Input } from "minerva-design";
import {
  DependencyGraph,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type InputCell = "price" | "quantity" | "discountRate";
type Cell =
  | InputCell
  | "taxRate"
  | "subtotal"
  | "discount"
  | "net"
  | "tax"
  | "shipping"
  | "total"
  | "unitCost";
type Kind = "input" | "formula";

// cell, address, kind, display format
const CELLS: [Cell, string, Kind, "currency" | "percent" | "integer"][] = [
  ["price", "B1", "input", "currency"],
  ["quantity", "B2", "input", "integer"],
  ["discountRate", "B3", "input", "percent"],
  ["taxRate", "B4", "input", "percent"],
  ["subtotal", "C1", "formula", "currency"],
  ["discount", "C2", "formula", "currency"],
  ["net", "C3", "formula", "currency"],
  ["tax", "C4", "formula", "currency"],
  ["shipping", "C5", "formula", "currency"],
  ["total", "D1", "formula", "currency"],
  ["unitCost", "D2", "formula", "currency"],
];

// precedent → dependent cell
const REFERENCES: [Cell, Cell][] = [
  ["price", "subtotal"],
  ["quantity", "subtotal"],
  ["subtotal", "discount"],
  ["discountRate", "discount"],
  ["subtotal", "net"],
  ["discount", "net"],
  ["net", "tax"],
  ["taxRate", "tax"],
  ["net", "shipping"],
  ["net", "total"],
  ["tax", "total"],
  ["shipping", "total"],
  ["total", "unitCost"],
  ["quantity", "unitCost"],
];

const KINDS: Kind[] = ["input", "formula"];
const INPUTS: InputCell[] = ["price", "quantity", "discountRate"];

const evaluate = (price: number, quantity: number, discountRate: number) => {
  const taxRate = 0.08;
  const subtotal = price * quantity;
  const discount = subtotal * discountRate;
  const net = subtotal - discount;
  const tax = net * taxRate;
  const shipping = net >= 500 ? 0 : 25;
  const total = net + tax + shipping;
  const unitCost = quantity > 0 ? total / quantity : 0;
  return {
    price,
    quantity,
    discountRate,
    taxRate,
    subtotal,
    discount,
    net,
    tax,
    shipping,
    total,
    unitCost,
  } satisfies Record<Cell, number>;
};

/** Cells that depend on `cell`, directly or not */
const dependents = (cell: Cell) => {
  const seen = new Set<Cell>();
  const queue = [cell];
  while (queue.length) {
    const current = queue.shift()!;
    for (const [a, b] of REFERENCES) {
      if (a === current && !seen.has(b)) {
        seen.add(b);
        queue.push(b);
      }
    }
  }
  return seen;
};

export default function SpreadsheetDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.dependency-graph.data",
  });
  const [inputs, setInputs] = useState<Record<InputCell, string>>({
    price: "42",
    quantity: "12",
    discountRate: "10",
  });
  const [changed, setChanged] = useState<InputCell>("discountRate");
  const values = evaluate(
    Number(inputs.price) || 0,
    Number(inputs.quantity) || 0,
    (Number(inputs.discountRate) || 0) / 100,
  );
  const formats = useMemo(
    () => ({
      currency: new Intl.NumberFormat(i18n.language, {
        style: "currency",
        currency: "USD",
      }),
      percent: new Intl.NumberFormat(i18n.language, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
      integer: new Intl.NumberFormat(i18n.language),
    }),
    [i18n.language],
  );

  const nodes = CELLS.map(([id, address, kind, format]): GraphNode => ({
    id,
    label: `${address} · ${t(`cells.${id}`)}`,
    subtitle: formats[format].format(values[id]),
    group: kind,
  }));
  const edges = useMemo(
    (): GraphEdge[] =>
      REFERENCES.map(([source, target]) => ({ source, target })),
    [],
  );
  const groups = useMemo(
    () => KINDS.map((id) => ({ id, name: t(`cellKinds.${id}`) })),
    [t],
  );
  const recalculated = [...dependents(changed)];

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={12} wrap align="end">
        {INPUTS.map((id) => (
          <label key={id} style={{ display: "grid", gap: 4 }}>
            <span>{t(`cells.${id}`)}</span>
            <Input
              type="number"
              min={0}
              step={id === "price" ? 0.5 : 1}
              value={inputs[id]}
              style={{ width: 120 }}
              onChange={(event) => {
                setInputs({ ...inputs, [id]: event.target.value });
                setChanged(id);
              }}
            />
          </label>
        ))}
      </HStack>
      <DependencyGraph
        nodes={nodes}
        edges={edges}
        groups={groups}
        direction="LR"
        highlight="lineage"
        selected={[changed]}
        interaction={{ select: false }}
        animation={false}
        height={380}
        ariaLabel={t("spreadsheetAria")}
        onItemClick={(event) => {
          if (event.type === "node" && INPUTS.includes(event.id as InputCell)) {
            setChanged(event.id as InputCell);
          }
        }}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {t("recalculated", {
          cell: t(`cells.${changed}`),
          total: recalculated.length,
          list: new Intl.ListFormat(i18n.language).format(
            recalculated.map((id) => t(`cells.${id}`)),
          ),
          value: formats.currency.format(values.total),
        })}
      </output>
    </div>
  );
}
