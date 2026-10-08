import type { WcHookScenario } from "../types";

const columns = [
  { key: "name", header: "Name", sortable: true },
  { key: "age", header: "Age" },
];
const rows = [
  { name: "Ada", age: 36 },
  { name: "Alan", age: 41 },
];
const configure = (props: Record<string, unknown>) => (root: HTMLElement) => {
  Object.assign(root.querySelector("minerva-data-table")!, {
    columns,
    ...props,
  });
};

export default [
  {
    name: "sortable, selectable, paginated",
    html: `<minerva-data-table size="small" variant="bordered" selectable></minerva-data-table>`,
    setup: configure({ rows, selectedRowKeys: [0], pagination: { total: 20 } }),
  },
  {
    name: "empty",
    html: `<minerva-data-table></minerva-data-table>`,
    setup: configure({ rows: [] }),
  },
  {
    name: "loading",
    html: `<minerva-data-table loading variant="striped"></minerva-data-table>`,
    setup: configure({ rows: [] }),
  },
  {
    name: "error",
    html: `<minerva-data-table size="large" error="Failed" retryable></minerva-data-table>`,
    setup: configure({ rows }),
  },
] satisfies WcHookScenario[];
