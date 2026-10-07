// `items` rows (data from JS) are rendered before the declarative
// <minerva-description-item> children; 0 is rendered as a value.
type Row = { key?: string; label: string; value: string | number };

export function setup(root: HTMLElement) {
  const list = root.querySelector<HTMLElement & { items: Row[] }>("#order")!;
  list.items = [
    { key: "id", label: "Order", value: "#10482" },
    { key: "date", label: "Placed on", value: "March 4, 2026" },
    { key: "total", label: "Total", value: "€129.00" },
    { key: "returns", label: "Returns", value: 0 },
  ];
}
