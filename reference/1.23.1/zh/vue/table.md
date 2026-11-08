# Table 表格

展示数据行。常规场景用 Table（columns + data），自定义表头或合并单元格用 TableRoot 及其子组件，需要分页、加载与错误状态时用 DataTable。

Package: minerva-design@1.23.1

Renderer: vue

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "88873864837dbcb61b99fdcbc6ca81fca447df74",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:d9f3f7ce5f1caadfe236e584eab7825ceb958644c20320519e6bf9a2d1daf523"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## DataTable

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "DataTable"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "pagination",
    "type": "DataTablePagination",
    "required": false,
    "description": "Pagination rendered under the table (or the `pagination` slot). Rows\nare expected to be already paginated: fetching / slicing belongs to the\ndata owner",
    "typeText": "DataTablePagination"
  },
  {
    "name": "error",
    "type": "string",
    "required": false,
    "description": "Error message (or the `error` slot); replaces the table (and\npagination) with an alert",
    "typeText": "string"
  },
  {
    "name": "onRetry",
    "type": "(() => void)",
    "required": false,
    "description": "Called by the retry button shown with `error` (`@retry`; no button\nwithout a listener)",
    "typeText": "(() => void)"
  },
  {
    "name": "retryLabel",
    "type": "string",
    "required": false,
    "description": "Text of the retry button",
    "typeText": "string"
  },
  {
    "name": "columns",
    "type": "TableColumn<T>[]",
    "required": true,
    "description": "Column definitions",
    "typeText": "TableColumn<T>[]"
  },
  {
    "name": "data",
    "type": "T[]",
    "required": true,
    "description": "Rows to render",
    "typeText": "T[]"
  },
  {
    "name": "rowKey",
    "type": "((row: T, index: number) => TableRowKey)",
    "required": false,
    "description": "Extracts a stable key from a row (defaults to the row index)",
    "typeText": "((row: T, index: number) => TableRowKey)"
  },
  {
    "name": "emptyText",
    "type": "string",
    "required": false,
    "description": "Content of the single row shown when `data` is empty (or the `empty`\nslot)",
    "typeText": "string"
  },
  {
    "name": "loading",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Renders placeholder skeleton rows instead of the data",
    "typeText": "boolean"
  },
  {
    "name": "loadingRows",
    "type": "number",
    "default": "5",
    "required": false,
    "description": "Number of skeleton rows rendered while loading",
    "typeText": "number"
  },
  {
    "name": "sortState",
    "type": "TableSortState | null",
    "required": false,
    "description": "Sort state (controlled, `v-model:sortState`); `null` means unsorted",
    "typeText": "TableSortState | null"
  },
  {
    "name": "defaultSortState",
    "type": "TableSortState | null",
    "default": "null",
    "required": false,
    "description": "Initial sort state (uncontrolled)",
    "typeText": "TableSortState | null"
  },
  {
    "name": "manualSort",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Skips local sorting: `data` is rendered as given (sorted by the data\nowner, e.g. a server) while the headers still reflect the sort state",
    "typeText": "boolean"
  },
  {
    "name": "rowSelection",
    "type": "TableRowSelection<T>",
    "required": false,
    "description": "Adds a leading checkbox column to select rows",
    "typeText": "TableRowSelection<T>"
  },
  {
    "name": "selectedRowKeys",
    "type": "TableRowKey[]",
    "required": false,
    "description": "Keys of the selected rows (controlled, `v-model:selectedRowKeys`; wins\nover `rowSelection.selectedRowKeys`). Setting it (or\n`defaultSelectedRowKeys`) also enables the selection column",
    "typeText": "TableRowKey[]"
  },
  {
    "name": "defaultSelectedRowKeys",
    "type": "TableRowKey[]",
    "required": false,
    "description": "Keys of the initially selected rows (uncontrolled; wins over\n`rowSelection.defaultSelectedRowKeys`)",
    "typeText": "TableRowKey[]"
  },
  {
    "name": "size",
    "type": "TableSize",
    "default": "\"medium\"",
    "required": false,
    "description": "Density of the cells",
    "typeText": "TableSize"
  },
  {
    "name": "variant",
    "type": "TableVariant",
    "default": "\"simple\"",
    "required": false,
    "description": "Visual style: plain rows, zebra stripes or bordered cells",
    "typeText": "TableVariant"
  },
  {
    "name": "hoverable",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Highlights body rows on hover",
    "typeText": "boolean"
  },
  {
    "name": "scroll",
    "type": "TableScrollConfig",
    "required": false,
    "description": "Horizontal minimum width / vertical maximum height of the scroll area.\nWhen set (or when the content overflows), the scroll area becomes a\nfocusable region named by the table's `aria-label` / `aria-labelledby`\n(default: \"Scrollable table\", localized) so keyboard users can scroll it",
    "typeText": "TableScrollConfig"
  }
]
```

### events

```json
[
  {
    "name": "update:sortState",
    "type": "[sortState: TableSortState | null]",
    "typeText": "[sortState: TableSortState | null]",
    "parameters": [
      {
        "name": "sortState",
        "position": 0,
        "typeText": "TableSortState | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "sortChange",
    "type": "[sortState: TableSortState]",
    "typeText": "[sortState: TableSortState]",
    "parameters": [
      {
        "name": "sortState",
        "position": 0,
        "typeText": "TableSortState",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "update:selectedRowKeys",
    "type": "[selectedRowKeys: TableRowKey[]]",
    "typeText": "[selectedRowKeys: TableRowKey[]]",
    "parameters": [
      {
        "name": "selectedRowKeys",
        "position": 0,
        "typeText": "TableRowKey[]",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "selectionChange",
    "type": "[selectedRowKeys: TableRowKey[], selectedRows: T[]]",
    "typeText": "[selectedRowKeys: TableRowKey[], selectedRows: T[]]",
    "parameters": [
      {
        "name": "selectedRowKeys",
        "position": 0,
        "typeText": "TableRowKey[]",
        "required": true,
        "rest": false
      },
      {
        "name": "selectedRows",
        "position": 1,
        "typeText": "T[]",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

### slots

```json
[
  {
    "name": "error",
    "type": "any",
    "description": "Error message (the `error` prop); shows the error state",
    "typeText": "any"
  },
  {
    "name": "pagination",
    "type": "any",
    "description": "Content under the table, replacing the `pagination` prop",
    "typeText": "any"
  },
  {
    "name": "empty",
    "type": "any",
    "description": "Content of the empty row (the `emptyText` prop)",
    "typeText": "any"
  }
]
```

### bindings

```json
[
  {
    "prop": "sortState",
    "event": "update:sortState",
    "syntax": "v-model:sortState"
  },
  {
    "prop": "selectedRowKeys",
    "event": "update:selectedRowKeys",
    "syntax": "v-model:selectedRowKeys"
  }
]
```

## Table

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "Table"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "columns",
    "type": "TableColumn<T>[]",
    "required": true,
    "description": "Column definitions",
    "typeText": "TableColumn<T>[]"
  },
  {
    "name": "data",
    "type": "T[]",
    "required": true,
    "description": "Rows to render",
    "typeText": "T[]"
  },
  {
    "name": "rowKey",
    "type": "((row: T, index: number) => TableRowKey)",
    "required": false,
    "description": "Extracts a stable key from a row (defaults to the row index)",
    "typeText": "((row: T, index: number) => TableRowKey)"
  },
  {
    "name": "emptyText",
    "type": "string",
    "required": false,
    "description": "Content of the single row shown when `data` is empty (or the `empty`\nslot)",
    "typeText": "string"
  },
  {
    "name": "loading",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Renders placeholder skeleton rows instead of the data",
    "typeText": "boolean"
  },
  {
    "name": "loadingRows",
    "type": "number",
    "default": "5",
    "required": false,
    "description": "Number of skeleton rows rendered while loading",
    "typeText": "number"
  },
  {
    "name": "sortState",
    "type": "TableSortState | null",
    "required": false,
    "description": "Sort state (controlled, `v-model:sortState`); `null` means unsorted",
    "typeText": "TableSortState | null"
  },
  {
    "name": "defaultSortState",
    "type": "TableSortState | null",
    "default": "null",
    "required": false,
    "description": "Initial sort state (uncontrolled)",
    "typeText": "TableSortState | null"
  },
  {
    "name": "manualSort",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Skips local sorting: `data` is rendered as given (sorted by the data\nowner, e.g. a server) while the headers still reflect the sort state",
    "typeText": "boolean"
  },
  {
    "name": "rowSelection",
    "type": "TableRowSelection<T>",
    "required": false,
    "description": "Adds a leading checkbox column to select rows",
    "typeText": "TableRowSelection<T>"
  },
  {
    "name": "selectedRowKeys",
    "type": "TableRowKey[]",
    "required": false,
    "description": "Keys of the selected rows (controlled, `v-model:selectedRowKeys`; wins\nover `rowSelection.selectedRowKeys`). Setting it (or\n`defaultSelectedRowKeys`) also enables the selection column",
    "typeText": "TableRowKey[]"
  },
  {
    "name": "defaultSelectedRowKeys",
    "type": "TableRowKey[]",
    "required": false,
    "description": "Keys of the initially selected rows (uncontrolled; wins over\n`rowSelection.defaultSelectedRowKeys`)",
    "typeText": "TableRowKey[]"
  },
  {
    "name": "size",
    "type": "TableSize",
    "default": "\"medium\"",
    "required": false,
    "description": "Density of the cells",
    "typeText": "TableSize"
  },
  {
    "name": "variant",
    "type": "TableVariant",
    "default": "\"simple\"",
    "required": false,
    "description": "Visual style: plain rows, zebra stripes or bordered cells",
    "typeText": "TableVariant"
  },
  {
    "name": "hoverable",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Highlights body rows on hover",
    "typeText": "boolean"
  },
  {
    "name": "scroll",
    "type": "TableScrollConfig",
    "required": false,
    "description": "Horizontal minimum width / vertical maximum height of the scroll area.\nWhen set (or when the content overflows), the scroll area becomes a\nfocusable region named by the table's `aria-label` / `aria-labelledby`\n(default: \"Scrollable table\", localized) so keyboard users can scroll it",
    "typeText": "TableScrollConfig"
  }
]
```

### events

```json
[
  {
    "name": "update:sortState",
    "type": "[sortState: TableSortState | null]",
    "typeText": "[sortState: TableSortState | null]",
    "parameters": [
      {
        "name": "sortState",
        "position": 0,
        "typeText": "TableSortState | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "sortChange",
    "type": "[sortState: TableSortState]",
    "typeText": "[sortState: TableSortState]",
    "parameters": [
      {
        "name": "sortState",
        "position": 0,
        "typeText": "TableSortState",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "update:selectedRowKeys",
    "type": "[selectedRowKeys: TableRowKey[]]",
    "typeText": "[selectedRowKeys: TableRowKey[]]",
    "parameters": [
      {
        "name": "selectedRowKeys",
        "position": 0,
        "typeText": "TableRowKey[]",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "selectionChange",
    "type": "[selectedRowKeys: TableRowKey[], selectedRows: T[]]",
    "typeText": "[selectedRowKeys: TableRowKey[], selectedRows: T[]]",
    "parameters": [
      {
        "name": "selectedRowKeys",
        "position": 0,
        "typeText": "TableRowKey[]",
        "required": true,
        "rest": false
      },
      {
        "name": "selectedRows",
        "position": 1,
        "typeText": "T[]",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

### slots

```json
[
  {
    "name": "empty",
    "type": "any",
    "description": "Content of the empty row (the `emptyText` prop)",
    "typeText": "any"
  }
]
```

### bindings

```json
[
  {
    "prop": "sortState",
    "event": "update:sortState",
    "syntax": "v-model:sortState"
  },
  {
    "prop": "selectedRowKeys",
    "event": "update:selectedRowKeys",
    "syntax": "v-model:selectedRowKeys"
  }
]
```

## TableBody

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "TableBody"
  ],
  "kind": "named"
}
```

### slots

```json
[
  {
    "name": "default",
    "type": "any",
    "typeText": "any"
  }
]
```

## TableCell

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "TableCell"
  ],
  "kind": "named"
}
```

### slots

```json
[
  {
    "name": "default",
    "type": "any",
    "typeText": "any"
  }
]
```

## TableCellContent

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "TableCellContent"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "primary",
    "type": "string | number",
    "required": false,
    "description": "Main content (or the default slot)",
    "typeText": "string | number"
  },
  {
    "name": "secondary",
    "type": "string | number",
    "required": false,
    "description": "Secondary, muted content rendered under the primary content (or the `secondary` slot)",
    "typeText": "string | number"
  },
  {
    "name": "monospace",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Renders the primary content as `<code>` in the monospace font",
    "typeText": "boolean"
  },
  {
    "name": "maxWidth",
    "type": "string | number",
    "default": "360",
    "required": false,
    "description": "Maximum width (numbers are pixels); long content wraps",
    "typeText": "string | number"
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "type": "any",
    "description": "Main content (the `primary` prop)",
    "typeText": "any"
  },
  {
    "name": "secondary",
    "type": "any",
    "description": "Secondary, muted line (the `secondary` prop)",
    "typeText": "any"
  }
]
```

## TableHead

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "TableHead"
  ],
  "kind": "named"
}
```

### slots

```json
[
  {
    "name": "default",
    "type": "any",
    "typeText": "any"
  }
]
```

## TableHeader

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "TableHeader"
  ],
  "kind": "named"
}
```

### slots

```json
[
  {
    "name": "default",
    "type": "any",
    "typeText": "any"
  }
]
```

## TableRoot

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "TableRoot"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "size",
    "type": "TableSize",
    "default": "\"medium\"",
    "required": false,
    "description": "Density of the cells",
    "typeText": "TableSize"
  },
  {
    "name": "variant",
    "type": "TableVariant",
    "default": "\"simple\"",
    "required": false,
    "description": "Visual style: plain rows, zebra stripes or bordered cells",
    "typeText": "TableVariant"
  },
  {
    "name": "hoverable",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Highlights body rows on hover",
    "typeText": "boolean"
  },
  {
    "name": "scroll",
    "type": "TableScrollConfig",
    "required": false,
    "description": "Horizontal minimum width / vertical maximum height of the scroll area.\nWhen set (or when the content overflows), the scroll area becomes a\nfocusable region named by the table's `aria-label` / `aria-labelledby`\n(default: \"Scrollable table\", localized) so keyboard users can scroll it",
    "typeText": "TableScrollConfig"
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "type": "any",
    "description": "Table sections (`TableHead`, `TableBody`...)",
    "typeText": "any"
  }
]
```

## TableRow

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "TableRow"
  ],
  "kind": "named"
}
```

### slots

```json
[
  {
    "name": "default",
    "type": "any",
    "typeText": "any"
  }
]
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

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/table/vue/basic.vue

```vue
<script setup lang="ts">
import { Table } from "minerva-design/vue";
const columns = [
  { key: "name", header: "Name" },
  { key: "role", header: "Role" },
];
const data = [
  { id: 1, name: "Ada", role: "Designer" },
  { id: 2, name: "Grace", role: "Engineer" },
  { id: 3, name: "Alan", role: "Researcher" },
];
</script>
<template>
  <Table
    :columns="columns"
    :data="data"
    :row-key="(row) => row.id"
    variant="striped"
    aria-label="Team members"
  />
</template>

```

## Example: cell-content

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/table/vue/cell-content.vue

```vue
<script setup lang="ts">
import {
  Table,
  TableCellContent,
  Badge,
  type TableColumn,
} from "minerva-design/vue";
type Row = { id: number; name: string; role: string; email: string };
const data: Row[] = [
  { id: 1, name: "Ada Lovelace", role: "Designer", email: "ada@example.com" },
  { id: 2, name: "Grace Hopper", role: "Engineer", email: "grace@example.com" },
  { id: 3, name: "Alan Turing", role: "Researcher", email: "alan@example.com" },
];
const columns: TableColumn<Row>[] = [
  { key: "name", header: "Name" },
  { key: "role", header: "Role" },
];
</script>
<template>
  <Table
    :columns="columns"
    :data="data"
    :row-key="(row) => row.id"
    aria-label="Rich team cells"
    ><template #cell-name="{ row }"
      ><TableCellContent
        :primary="row.name"
        :secondary="row.email"
        :max-width="260" /></template
    ><template #cell-role="{ row }"><Badge :content="row.role" /></template
  ></Table>
</template>

```

## Example: compound

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/table/vue/compound.vue

```vue
<script setup lang="ts">
import {
  TableRoot,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
  TableCellContent,
} from "minerva-design/vue";
</script>
<template>
  <TableRoot variant="bordered" aria-label="Release checklist"
    ><TableHead
      ><TableRow
        ><TableHeader scope="col">Package</TableHeader
        ><TableHeader scope="col">Status</TableHeader></TableRow
      ></TableHead
    ><TableBody
      ><TableRow
        ><TableCell
          ><TableCellContent
            primary="Core"
            secondary="Shared contracts and tokens" /></TableCell
        ><TableCell>Ready</TableCell></TableRow
      ><TableRow
        ><TableCell
          ><TableCellContent
            primary="Vue"
            secondary="Accessible browser components" /></TableCell
        ><TableCell>Ready</TableCell></TableRow
      ></TableBody
    ></TableRoot
  >
</template>

```

## Example: data-table

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/table/vue/data-table.vue

```vue
<script setup lang="ts">
import { ref, computed } from "vue";
import { DataTable, Button } from "minerva-design/vue";
const page = ref(1);
const error = ref("");
const rows = Array.from({ length: 18 }, (_, index) => ({
  id: index + 1,
  name: `Project ${index + 1}`,
  status: index % 3 === 0 ? "Review" : "Ready",
}));
const data = computed(() => rows.slice((page.value - 1) * 5, page.value * 5));
const columns = [
  { key: "name", header: "Project" },
  { key: "status", header: "Status" },
];
</script>
<template>
  <div style="display: grid; gap: 12px">
    <Button
      variant="outline"
      @click="error = 'The request failed. Retry to restore the projects.'"
      >Simulate request failure</Button
    ><DataTable
      :columns="columns"
      :data="data"
      :row-key="(row) => row.id"
      :error="error"
      :pagination="{
        total: rows.length,
        current: page,
        pageSize: 5,
        onChange: (next: number) => (page = next),
      }"
      aria-label="Projects"
      @retry="error = ''"
    />
  </div>
</template>

```

## Example: fixed-columns

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/table/vue/fixed-columns.vue

```vue
<script setup lang="ts">
import { Table, Button, type TableColumn } from "minerva-design/vue";
type Row = { id: number; name: string; role: string; email: string };
const data: Row[] = [
  { id: 1, name: "Ada Lovelace", role: "Designer", email: "ada@example.com" },
  { id: 2, name: "Grace Hopper", role: "Engineer", email: "grace@example.com" },
  { id: 3, name: "Alan Turing", role: "Researcher", email: "alan@example.com" },
];
const columns: TableColumn<Row>[] = [
  { key: "name", header: "Name" },
  { key: "role", header: "Role" },
];
const fixed: TableColumn<Row>[] = [
  { key: "name", header: "Name", width: 180, fixed: "left" },
  { key: "email", header: "Email", width: 350 },
  { key: "role", header: "Role", width: 250 },
  { key: "id", header: "ID", width: 100, fixed: "right" },
];
</script>
<template>
  <div style="max-width: 520px">
    <Table
      :columns="fixed"
      :data="data"
      :row-key="(row) => row.id"
      :scroll="{ x: 880, y: 240 }"
      hoverable
      aria-label="Horizontally scrollable team"
    />
  </div>
</template>

```

## Example: pagination

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/table/vue/pagination.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { DataTable } from "minerva-design/vue";
const columns = [
  { key: "name", header: "Name" },
  { key: "role", header: "Role" },
];
const data = [
  { id: 1, name: "Ada", role: "Designer" },
  { id: 2, name: "Grace", role: "Engineer" },
  { id: 3, name: "Alan", role: "Researcher" },
];
const page = ref(1);
const rows = Array.from({ length: 24 }, (_, index) => ({
  id: index + 1,
  name: `Member ${index + 1}`,
  role: index % 2 ? "Designer" : "Engineer",
}));
</script>
<template>
  <DataTable
    :columns="columns"
    :data="rows.slice((page - 1) * 5, page * 5)"
    :row-key="(row) => row.id"
    :pagination="{
      current: page,
      pageSize: 5,
      total: rows.length,
      onChange: (next) => (page = next),
    }"
    aria-label="Paginated members"
  />
</template>

```

## Example: selection

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/table/vue/selection.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Table, VStack } from "minerva-design/vue";
const columns = [
  { key: "name", header: "Name" },
  { key: "role", header: "Role" },
];
const data = [
  { id: 1, name: "Ada", role: "Designer" },
  { id: 2, name: "Grace", role: "Engineer" },
  { id: 3, name: "Alan", role: "Researcher" },
];
const selected = ref<(string | number)[]>([]);
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><Table
      v-model:selected-row-keys="selected"
      :columns="columns"
      :data="data"
      :row-key="(row) => row.id"
      :row-selection="{ getRowLabel: (row) => row.name }"
      aria-label="Select members"
    /><output>Selected IDs: {{ selected.join(", ") || "none" }}</output></VStack
  >
</template>

```

## Example: sorting

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/table/vue/sorting.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Table, VStack } from "minerva-design/vue";
import type { TableSortState } from "minerva-design/vue";
const sort = ref<TableSortState | null>(null);
const columns = [
  { key: "name", header: "Name", sortable: true },
  { key: "score", header: "Score", sortable: true },
];
const data = [
  { id: 1, name: "Grace", score: 92 },
  { id: 2, name: "Ada", score: 98 },
  { id: 3, name: "Alan", score: 87 },
];
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><Table
      v-model:sort-state="sort"
      :columns="columns"
      :data="data"
      :row-key="(row) => row.id"
      aria-label="Sortable members"
    /><output
      >{{ sort?.key || "No column" }}: {{ sort?.order || "unsorted" }}</output
    ></VStack
  >
</template>

```

## Example: states

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/table/vue/states.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Table, Button, type TableColumn } from "minerva-design/vue";
const loading = ref(true);
const columns = [
  { key: "name", header: "Name" },
  { key: "status", header: "Status" },
];
</script>
<template>
  <div style="display: grid; gap: 12px">
    <Button variant="outline" @click="loading = !loading">{{
      loading ? "Show empty state" : "Show loading state"
    }}</Button
    ><Table
      :columns="columns"
      :data="[]"
      :loading="loading"
      :loading-rows="3"
      empty-text="No jobs yet"
      aria-label="Jobs"
    />
  </div>
</template>

```

## Example: variants

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/table/vue/variants.vue

```vue
<script setup lang="ts">
import { Table, Button, type TableColumn } from "minerva-design/vue";
type Row = { id: number; name: string; role: string; email: string };
const data: Row[] = [
  { id: 1, name: "Ada Lovelace", role: "Designer", email: "ada@example.com" },
  { id: 2, name: "Grace Hopper", role: "Engineer", email: "grace@example.com" },
  { id: 3, name: "Alan Turing", role: "Researcher", email: "alan@example.com" },
];
const columns: TableColumn<Row>[] = [
  { key: "name", header: "Name" },
  { key: "role", header: "Role" },
];
const variants = ["simple", "striped", "bordered"] as const;
</script>
<template>
  <div style="display: grid; gap: 20px">
    <section v-for="variant in variants" :key="variant">
      <h4>{{ variant }}</h4>
      <Table
        :columns="columns"
        :data="data"
        :row-key="(row) => row.id"
        :variant="variant"
        hoverable
        :aria-label="`${variant} team table`"
      />
    </section>
  </div>
</template>

```
