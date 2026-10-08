import { h } from "vue";
import { DataTable } from "../../components/Table";
import type { HookScenario } from "./types";

const columns = [
  { key: "name", header: "Name", sortable: true },
  { key: "age", header: "Age", sortable: true },
  { key: "id", header: "ID" },
];
const data = [
  { name: "Ada", age: 36, id: 1 },
  { name: "Alan", age: 41, id: 2 },
];

export default [
  {
    name: "sorted ascending, unsorted sortable column, selected row, paginated",
    render: () =>
      h(DataTable, {
        columns,
        data,
        size: "small",
        variant: "bordered",
        defaultSortState: { key: "name", order: "ascend" },
        rowSelection: { defaultSelectedRowKeys: [0] },
        pagination: { total: 20 },
      }),
  },
  {
    name: "keyboard: sorted descending, row selected",
    render: () => h(DataTable, { columns, data, rowSelection: {} }),
    setup: async ({ user, container }) => {
      const sort = Array.from(container.querySelectorAll("button")).find(
        (button) => button.textContent === "Name",
      )!;
      sort.focus();
      // ascending, then descending
      await user.keyboard("{Enter}{Enter}");
      container
        .querySelector<HTMLInputElement>('[aria-label="Select row 1"]')!
        .focus();
      await user.keyboard(" ");
    },
  },
  { name: "empty", render: () => h(DataTable, { columns, data: [] }) },
  {
    name: "loading",
    render: () =>
      h(DataTable, { columns, data: [], loading: true, variant: "striped" }),
  },
  {
    name: "error",
    render: () =>
      h(DataTable, {
        columns,
        data,
        size: "large",
        error: "Failed",
        onRetry: () => {},
      }),
  },
] satisfies HookScenario[];
