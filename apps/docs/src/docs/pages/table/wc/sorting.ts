// `sortable: true` sorts by row[key]; a function is a custom comparator.
// Each header click cycles ascending -> descending -> unsorted and fires the
// cancelable `minerva-sort-change`.
type Country = { code: string; name: string; population: number };
type Column = {
  key: string;
  header: string;
  align?: "left" | "center" | "right";
  sortable?: boolean | ((a: Country, b: Country) => number);
  render?: (row: Country) => string;
};
type SortState = { key: string; order: "ascend" | "descend" | null };

export function setup(root: HTMLElement) {
  const table = root.querySelector<
    HTMLElement & {
      columns: Column[];
      rows: Country[];
      sortState: SortState | null;
    }
  >("#countries")!;
  const output = root.querySelector<HTMLOutputElement>("#sort-state")!;
  table.columns = [
    { key: "code", header: "Code" },
    { key: "name", header: "Country", sortable: true },
    {
      key: "population",
      header: "Population (M)",
      align: "right",
      sortable: (a, b) => a.population - b.population,
      render: (row) => row.population.toFixed(1),
    },
  ];
  table.rows = [
    { code: "BR", name: "Brazil", population: 216.4 },
    { code: "FR", name: "France", population: 68.2 },
    { code: "JP", name: "Japan", population: 124.5 },
    { code: "NG", name: "Nigeria", population: 223.8 },
    { code: "CN", name: "China", population: 1409.7 },
  ];
  table.sortState = { key: "name", order: "ascend" };
  const onSort = (event: Event) => {
    const { key, order } = (event as CustomEvent<SortState>).detail;
    output.value = order ? `Sorted by ${key} (${order})` : "Unsorted";
  };
  table.addEventListener("minerva-sort-change", onSort);
  return () => table.removeEventListener("minerva-sort-change", onSort);
}
