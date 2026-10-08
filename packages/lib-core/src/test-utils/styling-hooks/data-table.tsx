import { DataTable } from "../../components/Table";
import type { HookScenario } from "./types";

const columns = [
  { key: "name", header: "Name", sortable: true },
  { key: "age", header: "Age" },
];
const data = [
  { name: "Ada", age: 36 },
  { name: "Alan", age: 41 },
];

export default [
  {
    name: "sortable, selectable, paginated",
    element: (
      <DataTable
        columns={columns}
        data={data}
        size="small"
        variant="bordered"
        rowSelection={{ defaultSelectedRowKeys: [0] }}
        pagination={{ total: 20 }}
      />
    ),
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
