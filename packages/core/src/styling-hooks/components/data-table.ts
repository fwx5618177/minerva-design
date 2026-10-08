import { defineHooks } from "../types";

export default defineHooks({
  description:
    "A data table with sortable columns, row selection, fixed columns, empty / loading / error states and pagination",
  react: [
    "DataTable",
    "Table",
    "TableRoot",
    "TableRow",
    "TableHeader",
    "TableCell",
  ],
  wc: "minerva-data-table",
  parts: {
    root: {
      description:
        "The outer wrapper of the table, the error state and the pagination (React: rendered by DataTable only)",
    },
    viewport: {
      description:
        "The scroll wrapper of the table (a focusable region while it scrolls)",
    },
    table: {
      description: "The <table>",
      states: ["size", "variant"],
    },
    row: {
      description:
        "A <tr> (header and body rows; selected rows have aria-selected=true). Item state: selected (body rows)",
      itemStates: { selected: true },
    },
    "header-cell": {
      description:
        "A <th> column header (sortable headers have aria-sort). Item state: sort (sortable headers only)",
      itemStates: { sort: ["ascending", "descending", "none"] },
    },
    cell: { description: "A <td> body cell" },
    "sort-button": { description: "The sort button of a sortable header" },
    checkbox: { description: "A row / select-all selection checkbox" },
    empty: { description: "The cell of the empty state" },
    skeleton: { description: "A skeleton bar of the loading rows" },
    error: { description: "The error state (role=alert)" },
    "retry-button": {
      description:
        "The retry button of the error state. Web components only: React renders a Button, which has its own hooks",
      only: "wc",
    },
    pagination: {
      description:
        "The <minerva-pagination> (its root and item parts are exported as pagination-root / pagination-item). Web components only: React renders a Pagination, which has its own hooks",
      only: "wc",
    },
  },
  states: {
    loading: true,
    size: ["small", "medium", "large"],
    variant: ["simple", "striped", "bordered"],
  },
});
