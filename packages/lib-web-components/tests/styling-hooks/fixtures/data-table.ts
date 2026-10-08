import userEvent from "@testing-library/user-event";
import type { WcHookScenario } from "../types";
import { settle } from "../../utils";

const columns = [
  { key: "name", header: "Name", sortable: true },
  { key: "age", header: "Age", sortable: true },
  { key: "id", header: "ID" },
];
const rows = [
  { name: "Ada", age: 36, id: 1 },
  { name: "Alan", age: 41, id: 2 },
];
const configure = (props: Record<string, unknown>) => (root: HTMLElement) => {
  Object.assign(root.querySelector("minerva-data-table")!, {
    columns,
    ...props,
  });
};

export default [
  {
    name: "sorted ascending, unsorted sortable column, selected row, paginated",
    html: `<minerva-data-table size="small" variant="bordered" selectable></minerva-data-table>`,
    setup: configure({
      rows,
      sortState: { key: "name", order: "ascend" },
      selectedRowKeys: [0],
      pagination: { total: 20 },
    }),
  },
  {
    name: "keyboard: sorted descending, row selected",
    html: `<minerva-data-table selectable></minerva-data-table>`,
    setup: async (root) => {
      configure({ rows })(root);
      await settle();
      const shadow = root.querySelector("minerva-data-table")!.shadowRoot!;
      const user = userEvent.setup();
      shadow.querySelector<HTMLElement>('[part="sort-button"]')!.focus();
      // ascending, then descending
      await user.keyboard("{Enter}");
      await settle();
      await user.keyboard("{Enter}");
      await settle();
      shadow.querySelector<HTMLElement>('tbody [part="checkbox"]')!.focus();
      await user.keyboard(" ");
    },
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
