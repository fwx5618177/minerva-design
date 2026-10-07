// `selectable` adds the checkbox column (with a select-all header). Paid
// invoices are disabled through `isRowDisabled`; `getRowLabel` names each
// checkbox for screen readers.
type Invoice = { number: string; customer: string; status: string };
type Column = { key: string; header: string };
type SelectionDetail = { selectedRowKeys: string[]; selectedRows: Invoice[] };

export function setup(root: HTMLElement) {
  const table = root.querySelector<
    HTMLElement & {
      columns: Column[];
      rows: Invoice[];
      selectedRowKeys: string[];
      isRowDisabled: (row: Invoice) => boolean;
      getRowLabel: (row: Invoice) => string;
    }
  >("#invoices")!;
  const output = root.querySelector<HTMLOutputElement>("#selection")!;
  table.columns = [
    { key: "number", header: "Invoice" },
    { key: "customer", header: "Customer" },
    { key: "status", header: "Status" },
  ];
  table.rows = [
    { number: "INV-1001", customer: "Acme", status: "Overdue" },
    { number: "INV-1002", customer: "Globex", status: "Paid" },
    { number: "INV-1003", customer: "Initech", status: "Open" },
    { number: "INV-1004", customer: "Umbrella", status: "Open" },
  ];
  table.isRowDisabled = (row) => row.status === "Paid";
  table.getRowLabel = (row) => row.number;
  table.selectedRowKeys = ["INV-1001"];
  output.value = "1 selected";
  const onSelect = (event: Event) => {
    const { selectedRowKeys } = (event as CustomEvent<SelectionDetail>).detail;
    output.value = `${selectedRowKeys.length} selected: ${selectedRowKeys.join(", ")}`;
  };
  table.addEventListener("minerva-selection-change", onSelect);
  return () => table.removeEventListener("minerva-selection-change", onSelect);
}
