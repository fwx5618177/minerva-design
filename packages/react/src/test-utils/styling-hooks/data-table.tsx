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
    element: (
      <DataTable
        columns={columns}
        data={data}
        size="small"
        variant="bordered"
        defaultSortState={{ key: "name", order: "ascend" }}
        rowSelection={{ defaultSelectedRowKeys: [0] }}
        pagination={{ total: 20 }}
      />
    ),
  },
  {
    name: "keyboard: sorted descending, row selected",
    element: <DataTable columns={columns} data={data} rowSelection={{}} />,
    setup: async ({ user, view }) => {
      view.getByRole("button", { name: "Name" }).focus();
      // ascending, then descending
      await user.keyboard("{Enter}{Enter}");
      view.getByRole("checkbox", { name: "Select row 1" }).focus();
      await user.keyboard(" ");
    },
  },
  { name: "empty", element: <DataTable columns={columns} data={[]} /> },
  {
    name: "loading",
    element: (
      <DataTable columns={columns} data={[]} loading variant="striped" />
    ),
  },
  {
    name: "error",
    element: (
      <DataTable
        columns={columns}
        data={data}
        size="large"
        error="Failed"
        onRetry={() => {}}
      />
    ),
  },
] satisfies HookScenario[];
