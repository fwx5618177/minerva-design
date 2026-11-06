# Table 表格

展示数据行。常规场景用 Table（columns + data），自定义表头或合并单元格用 TableRoot 及其子组件，需要分页、加载与错误状态时用 DataTable。

Package: minerva-design@1.22.0

Renderer: wc

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.0",
  "sourceCommit": "e2a31507ecfcdb5ffcd33b05b47404c7625bb883",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:2459da5f08881aec3d2ac2d940ce35e7a61d0e0e679c0c167d8b5fdf8330a456"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## DataTable

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/data-table",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "rowKey",
    "typeText": "string | ((row: T, index: number) => TableRowKey) | undefined",
    "attribute": "row-key",
    "required": false
  },
  {
    "name": "emptyText",
    "typeText": "string | undefined",
    "attribute": "empty-text",
    "required": false
  },
  {
    "name": "loading",
    "typeText": "boolean",
    "attribute": "loading",
    "required": false
  },
  {
    "name": "loadingRows",
    "typeText": "number",
    "attribute": "loading-rows",
    "required": false
  },
  {
    "name": "manualSort",
    "typeText": "boolean",
    "attribute": "manual-sort",
    "required": false
  },
  {
    "name": "selectable",
    "typeText": "boolean",
    "attribute": "selectable",
    "required": false
  },
  {
    "name": "size",
    "typeText": "\"small\" | \"medium\" | \"large\"",
    "attribute": "size",
    "required": false
  },
  {
    "name": "variant",
    "typeText": "\"simple\" | \"striped\" | \"bordered\"",
    "attribute": "variant",
    "required": false
  },
  {
    "name": "hoverable",
    "typeText": "boolean",
    "attribute": "hoverable",
    "required": false
  },
  {
    "name": "scrollX",
    "typeText": "string | number | undefined",
    "attribute": "scroll-x",
    "required": false
  },
  {
    "name": "scrollY",
    "typeText": "string | number | undefined",
    "attribute": "scroll-y",
    "required": false
  },
  {
    "name": "error",
    "typeText": "string | undefined",
    "attribute": "error",
    "required": false
  },
  {
    "name": "retryable",
    "typeText": "boolean",
    "attribute": "retryable",
    "required": false
  },
  {
    "name": "retryLabel",
    "typeText": "string | undefined",
    "attribute": "retry-label",
    "required": false
  },
  {
    "name": "columns",
    "typeText": "TableColumn<T>[]",
    "required": false
  },
  {
    "name": "rows",
    "typeText": "T[]",
    "required": false
  },
  {
    "name": "sortState",
    "typeText": "TableSortState | null",
    "required": false
  },
  {
    "name": "selectedRowKeys",
    "typeText": "TableRowKey[]",
    "required": false
  },
  {
    "name": "isRowDisabled",
    "typeText": "(row: T) => boolean | undefined",
    "required": false
  },
  {
    "name": "getRowLabel",
    "typeText": "(row: T, index: number) => string | undefined",
    "required": false
  },
  {
    "name": "pagination",
    "typeText": "DataTablePagination | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-sort-change",
    "typeText": "CustomEvent<TableSortState>",
    "detailType": {
      "typeText": "TableSortState",
      "typeRef": "type:db91c2a624e3335e1e4c"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": true,
    "description": "The user changed the sort (`detail: { key, order }`, order `null` = unsorted); cancelable: `preventDefault()` keeps the current sort"
  },
  {
    "name": "minerva-selection-change",
    "typeText": "CustomEvent<TableSelectionChangeDetail<T>>",
    "detailType": {
      "typeText": "TableSelectionChangeDetail<T>",
      "typeRef": "type:51682357021dfbdbbff5"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": true,
    "description": "The user changed the selected rows (`detail: { selectedRowKeys, selectedRows }`); cancelable: `preventDefault()` keeps the current selection"
  },
  {
    "name": "minerva-page-change",
    "typeText": "CustomEvent",
    "description": "Re-dispatched from the pagination (`detail: { page, pageSize }`); cancelable"
  },
  {
    "name": "minerva-retry",
    "typeText": "CustomEvent<undefined>",
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "The retry button of the error state was activated"
  }
]
```

### slots

```json
[
  {
    "name": "empty",
    "description": "Content of the empty state (default: `empty-text` or the localized \"No data\")"
  },
  {
    "name": "error",
    "description": "Content of the error state (default: the `error` text)"
  }
]
```

## Table

Support: n/a

React-only API (composition part or provider); the custom elements cover it with attributes or the parent element.

## TableBody

Support: n/a

React-only API (composition part or provider); the custom elements cover it with attributes or the parent element.

## TableCell

Support: n/a

React-only API (composition part or provider); the custom elements cover it with attributes or the parent element.

## TableCellContent

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/table-cell-content",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "primary",
    "typeText": "string",
    "attribute": "primary",
    "required": false
  },
  {
    "name": "secondary",
    "typeText": "string | undefined",
    "attribute": "secondary",
    "required": false
  },
  {
    "name": "monospace",
    "typeText": "boolean",
    "attribute": "monospace",
    "required": false
  },
  {
    "name": "maxWidth",
    "typeText": "string | number",
    "attribute": "max-width",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "Primary content (alternative to `primary`)"
  },
  {
    "name": "secondary",
    "description": "Secondary line (alternative to `secondary`)"
  }
]
```

## TableHead

Support: n/a

React-only API (composition part or provider); the custom elements cover it with attributes or the parent element.

## TableHeader

Support: n/a

React-only API (composition part or provider); the custom elements cover it with attributes or the parent element.

## TableRoot

Support: n/a

React-only API (composition part or provider); the custom elements cover it with attributes or the parent element.

## TableRow

Support: n/a

React-only API (composition part or provider); the custom elements cover it with attributes or the parent element.

## API

```json
{
  "wc:minerva-data-table": {
    "kind": "element",
    "source": "web-components/src/components/data-table/data-table.ts",
    "className": "MinervaDataTable",
    "summary": "Data table with sorting, row selection, fixed columns, states and pagination.",
    "description": "Declarative data table (`<Table>` / `<DataTable>` of React): `columns` and `rows` properties, sortable columns (`aria-sort`), row selection with checkboxes, sticky fixed columns, ellipsis columns, empty / loading (skeleton) / error states and an optional `<minerva-pagination>`. Cell `render` functions return a string, a DOM node or a Lit template. The scroll wrapper becomes a focusable, named region when it scrolls (keyboard scrolling). Sorting and selection are uncontrolled by default; cancel `minerva-sort-change` / `minerva-selection-change` and set `sortState` / `selectedRowKeys` yourself for the controlled pattern (or use `manual-sort` for server-side sorting).",
    "properties": [
      {
        "name": "rowKey",
        "attribute": "row-key",
        "type": "string | ((row: T, index: number) => TableRowKey) | undefined",
        "description": "Row key: a field name or a function (default: the row index). Keys keep the selection and the row DOM across sorting / data updates"
      },
      {
        "name": "emptyText",
        "attribute": "empty-text",
        "type": "string | undefined",
        "description": "Text of the empty state (default localized \"No data\")"
      },
      {
        "name": "loading",
        "attribute": "loading",
        "type": "boolean",
        "default": "false",
        "description": "Shows skeleton rows instead of the data (and marks the table busy)"
      },
      {
        "name": "loadingRows",
        "attribute": "loading-rows",
        "type": "number",
        "default": "5",
        "description": "Number of skeleton rows while loading"
      },
      {
        "name": "manualSort",
        "attribute": "manual-sort",
        "type": "boolean",
        "default": "false",
        "description": "Keeps the row order (server-side sorting): only the headers change"
      },
      {
        "name": "selectable",
        "attribute": "selectable",
        "type": "boolean",
        "default": "false",
        "description": "Adds a checkbox column to select rows"
      },
      {
        "name": "size",
        "attribute": "size",
        "type": "\"small\" | \"medium\" | \"large\"",
        "default": "\"medium\"",
        "description": "Cell padding / font size"
      },
      {
        "name": "variant",
        "attribute": "variant",
        "type": "\"simple\" | \"striped\" | \"bordered\"",
        "default": "\"simple\"",
        "description": "Visual style"
      },
      {
        "name": "hoverable",
        "attribute": "hoverable",
        "type": "boolean",
        "default": "false",
        "description": "Highlights the hovered row"
      },
      {
        "name": "scrollX",
        "attribute": "scroll-x",
        "type": "string | number | undefined",
        "description": "Horizontal scroll: minimum table width (px number or CSS length)"
      },
      {
        "name": "scrollY",
        "attribute": "scroll-y",
        "type": "string | number | undefined",
        "description": "Vertical scroll: maximum wrapper height; the header sticks"
      },
      {
        "name": "error",
        "attribute": "error",
        "type": "string | undefined",
        "description": "Error message: replaces the table (and the pagination) with an alert"
      },
      {
        "name": "retryable",
        "attribute": "retryable",
        "type": "boolean",
        "default": "false",
        "description": "Shows a retry button in the error state (fires `minerva-retry`)"
      },
      {
        "name": "retryLabel",
        "attribute": "retry-label",
        "type": "string | undefined",
        "description": "Label of the retry button (default localized \"Retry\")"
      },
      {
        "name": "columns",
        "type": "TableColumn<T>[]",
        "default": "[]",
        "description": "Column definitions"
      },
      {
        "name": "rows",
        "type": "T[]",
        "default": "[]",
        "description": "Row data"
      },
      {
        "name": "sortState",
        "type": "TableSortState | null",
        "default": "null",
        "description": "Current sort"
      },
      {
        "name": "selectedRowKeys",
        "type": "TableRowKey[]",
        "default": "[]",
        "description": "Keys of the selected rows"
      },
      {
        "name": "isRowDisabled",
        "type": "(row: T) => boolean | undefined",
        "description": "Rows whose checkbox is disabled"
      },
      {
        "name": "getRowLabel",
        "type": "(row: T, index: number) => string | undefined",
        "description": "Accessible label of a row checkbox (\"Select row {label}\"; default: the key)"
      },
      {
        "name": "pagination",
        "type": "DataTablePagination | undefined",
        "description": "Pagination below the table (properties of `<minerva-pagination>`)"
      }
    ],
    "methods": [],
    "events": [
      {
        "name": "minerva-sort-change",
        "description": "The user changed the sort (`detail: { key, order }`, order `null` = unsorted); cancelable: `preventDefault()` keeps the current sort"
      },
      {
        "name": "minerva-selection-change",
        "description": "The user changed the selected rows (`detail: { selectedRowKeys, selectedRows }`); cancelable: `preventDefault()` keeps the current selection"
      },
      {
        "name": "minerva-page-change",
        "description": "Re-dispatched from the pagination (`detail: { page, pageSize }`); cancelable"
      },
      {
        "name": "minerva-retry",
        "description": "The retry button of the error state was activated"
      }
    ],
    "slots": [
      {
        "name": "empty",
        "description": "Content of the empty state (default: `empty-text` or the localized \"No data\")"
      },
      {
        "name": "error",
        "description": "Content of the error state (default: the `error` text)"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The outer wrapper of the table, the error state and the pagination"
      },
      {
        "name": "viewport",
        "description": "The scroll wrapper of the table (a focusable region while it scrolls)"
      },
      {
        "name": "table",
        "description": "The `<table>`"
      },
      {
        "name": "row",
        "description": "A `<tr>` (header and body rows; selected rows have aria-selected=true)"
      },
      {
        "name": "row--selected",
        "description": "Item state of `row`: selected"
      },
      {
        "name": "header-cell",
        "description": "A `<th>` column header (sortable headers have aria-sort)"
      },
      {
        "name": "header-cell--sort-ascending",
        "description": "Item state of `header-cell`: sort ascending"
      },
      {
        "name": "header-cell--sort-descending",
        "description": "Item state of `header-cell`: sort descending"
      },
      {
        "name": "header-cell--sort-none",
        "description": "Item state of `header-cell`: sort none"
      },
      {
        "name": "cell",
        "description": "A `<td>` body cell"
      },
      {
        "name": "sort-button",
        "description": "The sort button of a sortable header"
      },
      {
        "name": "checkbox",
        "description": "A row / select-all selection checkbox"
      },
      {
        "name": "empty",
        "description": "The cell of the empty state"
      },
      {
        "name": "skeleton",
        "description": "A skeleton bar of the loading rows"
      },
      {
        "name": "error",
        "description": "The error state (role=alert)"
      },
      {
        "name": "retry-button",
        "description": "The retry button of the error state"
      },
      {
        "name": "pagination",
        "description": "The `<minerva-pagination>` (its root and item parts are exported as pagination-root / pagination-item)"
      }
    ],
    "cssProperties": [
      {
        "name": "--table-cell-padding-y",
        "description": "Vertical padding of the cells (every size; follows the density by default)"
      },
      {
        "name": "--table-cell-padding-x",
        "description": "Horizontal padding of the cells (every size; follows the density by default)"
      },
      {
        "name": "--table-font-size",
        "description": "Font size of the body cells (every size)"
      },
      {
        "name": "--table-header-bg",
        "description": "Background color of the header row"
      },
      {
        "name": "--table-border-color",
        "description": "Color of the row separators"
      },
      {
        "name": "--table-radius",
        "description": "Corner radius of the wrapper (defaults to --radius-lg)"
      },
      {
        "name": "--table-stripe-bg",
        "description": "Background color of the odd rows of a striped table"
      },
      {
        "name": "--table-hover-bg",
        "description": "Background color of the hovered row of a hoverable table"
      },
      {
        "name": "--table-selected-bg",
        "description": "Background color of the selected rows (row selection)"
      },
      {
        "name": "--table-sort-icon-color",
        "description": "Color of the sort indicator of an unsorted sortable column"
      },
      {
        "name": "--table-focus-ring-color",
        "description": "Outline color of the focused scroll region"
      },
      {
        "name": "--button-height",
        "description": "Minimum height (every size; defaults to the density's control height of the size)"
      },
      {
        "name": "--button-padding-x",
        "description": "Horizontal padding (every size)"
      },
      {
        "name": "--button-radius",
        "description": "Corner radius (defaults to --radius-md; the shape / borderRadius props win)"
      },
      {
        "name": "--button-font-size",
        "description": "Font size (every size)"
      },
      {
        "name": "--button-font-weight",
        "description": "Font weight"
      },
      {
        "name": "--button-gap",
        "description": "Space between the icons and the label"
      },
      {
        "name": "--button-label-white-space",
        "description": "White-space of the label: nowrap (default, truncates) or normal (wraps)"
      }
    ]
  },
  "wc:minerva-table-cell-content": {
    "kind": "element",
    "source": "web-components/src/components/data-table/data-table.ts",
    "className": "MinervaTableCellContent",
    "summary": "Two-line, bounded table cell content.",
    "description": "Bounded, wrapping content inside a table cell (`<TableCellContent>` of React), with an optional muted secondary line.",
    "properties": [
      {
        "name": "primary",
        "attribute": "primary",
        "type": "string",
        "default": "\"\"",
        "description": "Primary line"
      },
      {
        "name": "secondary",
        "attribute": "secondary",
        "type": "string | undefined",
        "description": "Muted secondary line"
      },
      {
        "name": "monospace",
        "attribute": "monospace",
        "type": "boolean",
        "default": "false",
        "description": "Renders the primary line as `<code>` in the monospace font"
      },
      {
        "name": "maxWidth",
        "attribute": "max-width",
        "type": "string | number",
        "default": "360",
        "description": "Maximum width (px number or CSS length)"
      }
    ],
    "methods": [],
    "events": [],
    "slots": [
      {
        "name": "",
        "description": "Primary content (alternative to `primary`)"
      },
      {
        "name": "secondary",
        "description": "Secondary line (alternative to `secondary`)"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The wrapper (bounded width)"
      },
      {
        "name": "primary",
        "description": "The primary line (`<code>` when monospace)"
      },
      {
        "name": "secondary",
        "description": "The muted secondary line"
      }
    ],
    "cssProperties": [
      {
        "name": "--table-cell-padding-y",
        "description": "Vertical padding of the cells (every size; follows the density by default)"
      },
      {
        "name": "--table-cell-padding-x",
        "description": "Horizontal padding of the cells (every size; follows the density by default)"
      },
      {
        "name": "--table-font-size",
        "description": "Font size of the body cells (every size)"
      },
      {
        "name": "--table-header-bg",
        "description": "Background color of the header row"
      },
      {
        "name": "--table-border-color",
        "description": "Color of the row separators"
      },
      {
        "name": "--table-radius",
        "description": "Corner radius of the wrapper (defaults to --radius-lg)"
      },
      {
        "name": "--table-stripe-bg",
        "description": "Background color of the odd rows of a striped table"
      },
      {
        "name": "--table-hover-bg",
        "description": "Background color of the hovered row of a hoverable table"
      },
      {
        "name": "--table-selected-bg",
        "description": "Background color of the selected rows (row selection)"
      },
      {
        "name": "--table-sort-icon-color",
        "description": "Color of the sort indicator of an unsorted sortable column"
      },
      {
        "name": "--table-focus-ring-color",
        "description": "Outline color of the focused scroll region"
      },
      {
        "name": "--button-height",
        "description": "Minimum height (every size; defaults to the density's control height of the size)"
      },
      {
        "name": "--button-padding-x",
        "description": "Horizontal padding (every size)"
      },
      {
        "name": "--button-radius",
        "description": "Corner radius (defaults to --radius-md; the shape / borderRadius props win)"
      },
      {
        "name": "--button-font-size",
        "description": "Font size (every size)"
      },
      {
        "name": "--button-font-weight",
        "description": "Font weight"
      },
      {
        "name": "--button-gap",
        "description": "Space between the icons and the label"
      },
      {
        "name": "--button-label-white-space",
        "description": "White-space of the label: nowrap (default, truncates) or normal (wraps)"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Table": {
    "kind": "cssVars",
    "source": "react/src/components/Table",
    "vars": [
      {
        "name": "--table-cell-padding-y",
        "description": "Vertical padding of the cells (every size; follows the density by default)"
      },
      {
        "name": "--table-cell-padding-x",
        "description": "Horizontal padding of the cells (every size; follows the density by default)"
      },
      {
        "name": "--table-font-size",
        "description": "Font size of the body cells (every size)"
      },
      {
        "name": "--table-header-bg",
        "description": "Background color of the header row"
      },
      {
        "name": "--table-border-color",
        "description": "Color of the row separators"
      },
      {
        "name": "--table-radius",
        "description": "Corner radius of the wrapper (defaults to --radius-lg)"
      },
      {
        "name": "--table-stripe-bg",
        "description": "Background color of the odd rows of a striped table"
      },
      {
        "name": "--table-hover-bg",
        "description": "Background color of the hovered row of a hoverable table"
      },
      {
        "name": "--table-selected-bg",
        "description": "Background color of the selected rows (row selection)"
      },
      {
        "name": "--table-sort-icon-color",
        "description": "Color of the sort indicator of an unsorted sortable column"
      },
      {
        "name": "--table-focus-ring-color",
        "description": "Outline color of the focused scroll region"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基础用法

columns 和 rows 是通过脚本设置的 JS 属性；row-key 指定作为键的字段。单元格的 render 函数可以返回 DOM 节点，这里返回一个两行的 <minerva-table-cell-content>。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/table/wc/basic.html

```html
<minerva-data-table
  id="services"
  row-key="id"
  variant="striped"
  hoverable
></minerva-data-table>

```

### apps/docs/src/docs/pages/table/wc/basic.ts

```tsx
// `columns` and `rows` are JS properties. A cell `render` function returns a
// string or a DOM node — here a two-line <minerva-table-cell-content>.
type Service = { id: string; name: string; image: string; replicas: number };
type Column = {
  key: string;
  header: string;
  align?: "left" | "center" | "right";
  width?: number;
  render?: (row: Service) => string | Node;
};

export function setup(root: HTMLElement) {
  const table = root.querySelector<
    HTMLElement & { columns: Column[]; rows: Service[] }
  >("#services")!;
  table.columns = [
    {
      key: "name",
      header: "Service",
      render: (row) => {
        const cell = document.createElement("minerva-table-cell-content");
        cell.setAttribute("primary", row.name);
        cell.setAttribute("secondary", row.id);
        return cell;
      },
    },
    { key: "image", header: "Image" },
    { key: "replicas", header: "Replicas", align: "right", width: 120 },
  ];
  table.rows = [
    { id: "svc-01", name: "API gateway", image: "nginx:1.27", replicas: 3 },
    { id: "svc-02", name: "Auth", image: "keycloak:25", replicas: 2 },
    { id: "svc-03", name: "Billing", image: "billing:4.2.0", replicas: 1 },
    { id: "svc-04", name: "Search", image: "opensearch:2.15", replicas: 5 },
  ];
}

```

## Example: 分页与加载

pagination 属性会在表格下方渲染一个 <minerva-pagination>。表格不会切分 rows：请在 minerva-page-change 时加载对应页的数据；期间 loading 显示骨架行。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/table/wc/pagination.html

```html
<minerva-data-table
  id="orders"
  row-key="id"
  size="small"
  loading-rows="5"
></minerva-data-table>

```

### apps/docs/src/docs/pages/table/wc/pagination.ts

```tsx
// The table does not slice `rows`: on `minerva-page-change` load the
// requested page (simulated server call, `loading` shows skeleton rows).
type Order = { id: number; item: string; amount: string };
type Column = { key: string; header: string; align?: "right" };
type Pagination = {
  current?: number;
  pageSize?: number;
  total?: number;
  showTotal?: boolean;
  showSizeChanger?: boolean;
  pageSizeOptions?: number[];
};
type PageDetail = { page: number; pageSize: number };

const TOTAL = 42;
const ITEMS = ["Keyboard", "Monitor", "Headset", "Webcam", "Dock", "Mouse"];

export function setup(root: HTMLElement) {
  const table = root.querySelector<
    HTMLElement & {
      columns: Column[];
      rows: Order[];
      loading: boolean;
      pagination: Pagination;
    }
  >("#orders")!;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const load = ({ page, pageSize }: PageDetail) => {
    table.loading = true;
    clearTimeout(timer);
    timer = setTimeout(() => {
      const first = (page - 1) * pageSize + 1;
      const count = Math.max(0, Math.min(pageSize, TOTAL - first + 1));
      table.rows = Array.from({ length: count }, (_, i) => ({
        id: first + i,
        item: ITEMS[(first + i) % ITEMS.length],
        amount: `$${((first + i) * 17.5).toFixed(2)}`,
      }));
      table.loading = false;
    }, 400);
  };
  table.columns = [
    { key: "id", header: "#" },
    { key: "item", header: "Item" },
    { key: "amount", header: "Amount", align: "right" },
  ];
  table.pagination = {
    current: 1,
    pageSize: 5,
    total: TOTAL,
    showTotal: true,
    showSizeChanger: true,
    pageSizeOptions: [5, 10, 20],
  };
  load({ page: 1, pageSize: 5 });
  const onPage = (event: Event) =>
    load((event as CustomEvent<PageDetail>).detail);
  table.addEventListener("minerva-page-change", onPage);
  return () => {
    clearTimeout(timer);
    table.removeEventListener("minerva-page-change", onPage);
  };
}

```

## Example: 行选择

selectable 会添加一列复选框，表头带全选。isRowDisabled 锁定已支付的发票，getRowLabel 为每个复选框提供名称，minerva-selection-change 报告选中的键。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/table/wc/selection.html

```html
<div style="display: grid; gap: 8px">
  <minerva-data-table
    id="invoices"
    row-key="number"
    selectable
    hoverable
  ></minerva-data-table>
  <output id="selection"></output>
</div>

```

### apps/docs/src/docs/pages/table/wc/selection.ts

```tsx
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

```

## Example: 排序

sortable: true 按行字段排序，传入函数则作为自定义比较器。点击表头在升序、降序和不排序之间循环，并触发 minerva-sort-change；sortState 设置初始排序。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/table/wc/sorting.html

```html
<div style="display: grid; gap: 8px">
  <minerva-data-table id="countries" row-key="code"></minerva-data-table>
  <output id="sort-state"></output>
</div>

```

### apps/docs/src/docs/pages/table/wc/sorting.ts

```tsx
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

```
