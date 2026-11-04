# Table 表格

展示数据行。常规场景用 Table（columns + data），自定义表头或合并单元格用 TableRoot 及其子组件，需要分页、加载与错误状态时用 DataTable。

Package: minerva-design@1.20.4

Renderer: react

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "5826c364a762ec5a1144b8eea89e5d7510e4099c",
  "sourceDigest": "sha256:38cfefdcb173c9a307526b9364c7a77acc74f713924006e65d94c6f3c5e94c61",
  "referenceSourceDigest": "sha256:8bb3a20ee069c63b8d85e6ccf29336af81fffa488ce873d14ee032291c18009f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

## Documentation

## DataTable

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
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
    "source": "packages/react/src/components/Table/types.ts",
    "kind": "object",
    "typeText": "PaginationProps | undefined",
    "typeRef": "type:2a2513511923d8af9f48",
    "required": false,
    "description": "Pagination rendered under the table. Rows are expected to be already paginated: fetching / slicing belongs to the data owner"
  },
  {
    "name": "error",
    "source": "packages/react/src/components/Table/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Error message; replaces the table (and pagination) with an alert"
  },
  {
    "name": "retryLabel",
    "source": "packages/react/src/components/Table/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Text of the retry button"
  },
  {
    "name": "columns",
    "source": "packages/react/src/components/Table/types.ts",
    "kind": "array",
    "typeText": "TableColumn<T>[]",
    "typeRef": "type:cacafa63f8f9eb946fb3",
    "required": true,
    "description": "Column definitions"
  },
  {
    "name": "data",
    "source": "packages/react/src/components/Table/types.ts",
    "kind": "array",
    "typeText": "T[]",
    "typeRef": "type:3d9da34274948c33cd13",
    "required": true,
    "description": "Rows to render"
  },
  {
    "name": "rowKey",
    "source": "packages/react/src/components/Table/types.ts",
    "kind": "function",
    "typeText": "((row: T, index: number) => TableRowKey) | undefined",
    "typeRef": "type:8b98f78ac0798c84b81a",
    "parameters": [
      {
        "name": "row",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "T",
        "typeRef": "type:a79036915bc105064def"
      },
      {
        "name": "index",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "TableRowKey",
      "typeRef": "type:7091edc537fa4b4dab31"
    },
    "required": false,
    "description": "Extracts a stable key from a row (defaults to the row index)"
  },
  {
    "name": "emptyText",
    "source": "packages/react/src/components/Table/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Content of the single row shown when `data` is empty"
  },
  {
    "name": "loading",
    "source": "packages/react/src/components/Table/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Renders placeholder skeleton rows instead of the data"
  },
  {
    "name": "loadingRows",
    "source": "packages/react/src/components/Table/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 5,
    "required": false,
    "description": "Number of skeleton rows rendered while loading"
  },
  {
    "name": "sortState",
    "source": "packages/react/src/components/Table/types.ts",
    "kind": "object",
    "typeText": "TableSortState | null | undefined",
    "typeRef": "type:7636d0dbd7650cd7b38e",
    "required": false,
    "description": "Sort state (controlled); `null` means unsorted. Use with `onSortChange`"
  },
  {
    "name": "defaultSortState",
    "source": "packages/react/src/components/Table/types.ts",
    "kind": "object",
    "typeText": "TableSortState | null | undefined",
    "typeRef": "type:7636d0dbd7650cd7b38e",
    "default": null,
    "required": false,
    "description": "Initial sort state (uncontrolled)"
  },
  {
    "name": "manualSort",
    "source": "packages/react/src/components/Table/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Skips local sorting: `data` is rendered as given (sorted by the data owner, e.g. a server) while the headers still reflect the sort state"
  },
  {
    "name": "rowSelection",
    "source": "packages/react/src/components/Table/types.ts",
    "kind": "object",
    "typeText": "TableRowSelection<T> | undefined",
    "typeRef": "type:0ee6b5ac76a6f044af89",
    "required": false,
    "description": "Adds a leading checkbox column to select rows"
  },
  {
    "name": "variant",
    "source": "packages/react/src/components/Table/types.ts",
    "kind": "enum",
    "values": [
      "bordered",
      "simple",
      "striped"
    ],
    "typeText": "TableVariant | undefined",
    "typeRef": "type:dc0dcef2ca1ab33a929f",
    "default": "simple",
    "required": false,
    "description": "Visual style: plain rows, zebra stripes or bordered cells"
  },
  {
    "name": "size",
    "source": "packages/react/src/components/Table/types.ts",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "TableSize | undefined",
    "typeRef": "type:6394c14d4994f200cc4d",
    "default": "medium",
    "required": false,
    "description": "Density of the cells"
  },
  {
    "name": "scroll",
    "source": "packages/react/src/components/Table/types.ts",
    "kind": "object",
    "typeText": "TableScrollConfig | undefined",
    "typeRef": "type:347c1de181bf3020a924",
    "required": false,
    "description": "Horizontal minimum width / vertical maximum height of the scroll area. When set (or when the content overflows), the scroll area becomes a focusable region named by the table's `aria-label` / `aria-labelledby` (default: \"Scrollable table\", localized) so keyboard users can scroll it"
  },
  {
    "name": "hoverable",
    "source": "packages/react/src/components/Table/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Highlights body rows on hover"
  }
]
```

### events

```json
[
  {
    "name": "onRetry",
    "source": "packages/react/src/components/Table/types.ts",
    "kind": "function",
    "typeText": "(() => void) | undefined",
    "typeRef": "type:a229483b51e41cab6e94",
    "parameters": [],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called by the retry button shown with `error` (no button when omitted)"
  },
  {
    "name": "onSortChange",
    "source": "packages/react/src/components/Table/types.ts",
    "kind": "function",
    "typeText": "((sortState: TableSortState) => void) | undefined",
    "typeRef": "type:35a99ae716c9ae08b7ff",
    "parameters": [
      {
        "name": "sortState",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "TableSortState",
        "typeRef": "type:6be50b5c7a5c129d4328"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the next sort state when a sortable header is activated"
  }
]
```

## Table

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
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
    "source": "packages/react/src/components/Table/types.ts",
    "kind": "array",
    "typeText": "TableColumn<T>[]",
    "typeRef": "type:23b4ba9f235974518146",
    "required": true,
    "description": "Column definitions"
  },
  {
    "name": "data",
    "source": "packages/react/src/components/Table/types.ts",
    "kind": "array",
    "typeText": "T[]",
    "typeRef": "type:4811dea976ddb967ecfb",
    "required": true,
    "description": "Rows to render"
  },
  {
    "name": "rowKey",
    "source": "packages/react/src/components/Table/types.ts",
    "kind": "function",
    "typeText": "((row: T, index: number) => TableRowKey) | undefined",
    "typeRef": "type:3162c14f7c0db8906993",
    "parameters": [
      {
        "name": "row",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "T",
        "typeRef": "type:7ec5a284d2788664820c"
      },
      {
        "name": "index",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "TableRowKey",
      "typeRef": "type:7091edc537fa4b4dab31"
    },
    "required": false,
    "description": "Extracts a stable key from a row (defaults to the row index)"
  },
  {
    "name": "emptyText",
    "source": "packages/react/src/components/Table/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Content of the single row shown when `data` is empty"
  },
  {
    "name": "loading",
    "source": "packages/react/src/components/Table/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Renders placeholder skeleton rows instead of the data"
  },
  {
    "name": "loadingRows",
    "source": "packages/react/src/components/Table/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 5,
    "required": false,
    "description": "Number of skeleton rows rendered while loading"
  },
  {
    "name": "sortState",
    "source": "packages/react/src/components/Table/types.ts",
    "kind": "object",
    "typeText": "TableSortState | null | undefined",
    "typeRef": "type:7636d0dbd7650cd7b38e",
    "required": false,
    "description": "Sort state (controlled); `null` means unsorted. Use with `onSortChange`"
  },
  {
    "name": "defaultSortState",
    "source": "packages/react/src/components/Table/types.ts",
    "kind": "object",
    "typeText": "TableSortState | null | undefined",
    "typeRef": "type:7636d0dbd7650cd7b38e",
    "default": null,
    "required": false,
    "description": "Initial sort state (uncontrolled)"
  },
  {
    "name": "manualSort",
    "source": "packages/react/src/components/Table/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Skips local sorting: `data` is rendered as given (sorted by the data owner, e.g. a server) while the headers still reflect the sort state"
  },
  {
    "name": "rowSelection",
    "source": "packages/react/src/components/Table/types.ts",
    "kind": "object",
    "typeText": "TableRowSelection<T> | undefined",
    "typeRef": "type:9b23c19f72d961312f1b",
    "required": false,
    "description": "Adds a leading checkbox column to select rows"
  },
  {
    "name": "variant",
    "source": "packages/react/src/components/Table/types.ts",
    "kind": "enum",
    "values": [
      "bordered",
      "simple",
      "striped"
    ],
    "typeText": "TableVariant | undefined",
    "typeRef": "type:dc0dcef2ca1ab33a929f",
    "default": "simple",
    "required": false,
    "description": "Visual style: plain rows, zebra stripes or bordered cells"
  },
  {
    "name": "size",
    "source": "packages/react/src/components/Table/types.ts",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "TableSize | undefined",
    "typeRef": "type:6394c14d4994f200cc4d",
    "default": "medium",
    "required": false,
    "description": "Density of the cells"
  },
  {
    "name": "scroll",
    "source": "packages/react/src/components/Table/types.ts",
    "kind": "object",
    "typeText": "TableScrollConfig | undefined",
    "typeRef": "type:347c1de181bf3020a924",
    "required": false,
    "description": "Horizontal minimum width / vertical maximum height of the scroll area. When set (or when the content overflows), the scroll area becomes a focusable region named by the table's `aria-label` / `aria-labelledby` (default: \"Scrollable table\", localized) so keyboard users can scroll it"
  },
  {
    "name": "hoverable",
    "source": "packages/react/src/components/Table/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Highlights body rows on hover"
  }
]
```

### events

```json
[
  {
    "name": "onSortChange",
    "source": "packages/react/src/components/Table/types.ts",
    "kind": "function",
    "typeText": "((sortState: TableSortState) => void) | undefined",
    "typeRef": "type:35a99ae716c9ae08b7ff",
    "parameters": [
      {
        "name": "sortState",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "TableSortState",
        "typeRef": "type:6be50b5c7a5c129d4328"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the next sort state when a sortable header is activated"
  }
]
```

## TableBody

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
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
    "name": "children"
  }
]
```

## TableCell

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
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
    "name": "children"
  }
]
```

## TableCellContent

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
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
    "source": "packages/react/src/components/Table/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": true,
    "description": "Main content"
  },
  {
    "name": "secondary",
    "source": "packages/react/src/components/Table/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Secondary, muted content rendered under the primary content"
  },
  {
    "name": "monospace",
    "source": "packages/react/src/components/Table/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Renders the primary content as `<code>` in the monospace font"
  },
  {
    "name": "maxWidth",
    "source": "packages/react/src/components/Table/types.ts",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": 360,
    "required": false,
    "description": "Maximum width (numbers are pixels); long content wraps"
  }
]
```

## TableHead

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
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
    "name": "children"
  }
]
```

## TableHeader

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
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
    "name": "children"
  }
]
```

## TableRoot

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
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
    "source": "packages/react/src/components/Table/types.ts",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "TableSize | undefined",
    "typeRef": "type:6394c14d4994f200cc4d",
    "default": "medium",
    "required": false,
    "description": "Density of the cells"
  },
  {
    "name": "variant",
    "source": "packages/react/src/components/Table/types.ts",
    "kind": "enum",
    "values": [
      "bordered",
      "simple",
      "striped"
    ],
    "typeText": "TableVariant | undefined",
    "typeRef": "type:dc0dcef2ca1ab33a929f",
    "default": "simple",
    "required": false,
    "description": "Visual style: plain rows, zebra stripes or bordered cells"
  },
  {
    "name": "hoverable",
    "source": "packages/react/src/components/Table/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Highlights body rows on hover"
  },
  {
    "name": "scroll",
    "source": "packages/react/src/components/Table/types.ts",
    "kind": "object",
    "typeText": "TableScrollConfig | undefined",
    "typeRef": "type:347c1de181bf3020a924",
    "required": false,
    "description": "Horizontal minimum width / vertical maximum height of the scroll area. When set (or when the content overflows), the scroll area becomes a focusable region named by the table's `aria-label` / `aria-labelledby` (default: \"Scrollable table\", localized) so keyboard users can scroll it"
  }
]
```

### slots

```json
[
  {
    "name": "children"
  }
]
```

## TableRow

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
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
    "name": "children"
  }
]
```

## API

```json
{
  "TableProps": {
    "source": "react/src/components/Table/types.ts",
    "description": "Props of the declarative `Table`",
    "kind": "interface",
    "extends": [
      "Omit<TableRootProps, \"children\">"
    ],
    "props": [
      {
        "name": "columns",
        "type": "TableColumn<T>[]",
        "required": true,
        "description": "Column definitions"
      },
      {
        "name": "data",
        "type": "T[]",
        "required": true,
        "description": "Rows to render"
      },
      {
        "name": "rowKey",
        "type": "(row: T, index: number) => TableRowKey",
        "required": false,
        "description": "Extracts a stable key from a row (defaults to the row index)"
      },
      {
        "name": "emptyText",
        "type": "ReactNode",
        "required": false,
        "default": "\"No data\" (localized)",
        "description": "Content of the single row shown when `data` is empty"
      },
      {
        "name": "loading",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Renders placeholder skeleton rows instead of the data"
      },
      {
        "name": "loadingRows",
        "type": "number",
        "required": false,
        "default": "5",
        "description": "Number of skeleton rows rendered while loading"
      },
      {
        "name": "sortState",
        "type": "TableSortState | null",
        "required": false,
        "description": "Sort state (controlled); `null` means unsorted. Use with `onSortChange`"
      },
      {
        "name": "defaultSortState",
        "type": "TableSortState | null",
        "required": false,
        "default": "null",
        "description": "Initial sort state (uncontrolled)"
      },
      {
        "name": "onSortChange",
        "type": "(sortState: TableSortState) => void",
        "required": false,
        "description": "Called with the next sort state when a sortable header is activated"
      },
      {
        "name": "manualSort",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Skips local sorting: `data` is rendered as given (sorted by the data owner, e.g. a server) while the headers still reflect the sort state"
      },
      {
        "name": "rowSelection",
        "type": "TableRowSelection<T>",
        "required": false,
        "description": "Adds a leading checkbox column to select rows"
      }
    ]
  },
  "TableColumn": {
    "source": "react/src/components/Table/types.ts",
    "description": "A column of the declarative `Table`",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "key",
        "type": "string",
        "required": true,
        "description": "Unique key of the column; also the default field read from each row"
      },
      {
        "name": "header",
        "type": "ReactNode",
        "required": true,
        "description": "Header content"
      },
      {
        "name": "render",
        "type": "(row: T, rowIndex: number) => ReactNode",
        "required": false,
        "description": "Renders a cell; defaults to `row[key]`"
      },
      {
        "name": "width",
        "type": "string | number",
        "required": false,
        "description": "Column width (numbers are pixels). Applied as both width and min-width so narrow containers scroll instead of squeezing the column. Required for fixed columns (their offsets are the sum of the previous widths)"
      },
      {
        "name": "align",
        "type": "TableColumnAlign",
        "required": false,
        "description": "Horizontal alignment of the header and cells"
      },
      {
        "name": "ellipsis",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Truncates the content on a single line with an ellipsis"
      },
      {
        "name": "fixed",
        "type": "TableColumnFixed",
        "required": false,
        "description": "Sticks the column to the left or right edge while scrolling horizontally. Fixed columns must be declared contiguously at the start (left) or end (right) of `columns`"
      },
      {
        "name": "sortable",
        "type": "boolean | TableSortCompare<T>",
        "required": false,
        "default": "false",
        "description": "Makes the column sortable: its header becomes a button cycling ascending → descending → unsorted. `true` compares `row[key]` (numbers, dates, then strings with a locale / numeric collation; empty values last); a function `(a, b) => number` compares two rows for the ascending order"
      }
    ]
  },
  "DataTableProps": {
    "source": "react/src/components/Table/types.ts",
    "description": "Props of `DataTable`: a `Table` with pagination and error / retry states",
    "kind": "interface",
    "extends": [
      "TableProps<T>"
    ],
    "props": [
      {
        "name": "pagination",
        "type": "PaginationProps",
        "required": false,
        "description": "Pagination rendered under the table. Rows are expected to be already paginated: fetching / slicing belongs to the data owner"
      },
      {
        "name": "error",
        "type": "ReactNode",
        "required": false,
        "description": "Error message; replaces the table (and pagination) with an alert"
      },
      {
        "name": "onRetry",
        "type": "() => void",
        "required": false,
        "description": "Called by the retry button shown with `error` (no button when omitted)"
      },
      {
        "name": "retryLabel",
        "type": "string",
        "required": false,
        "default": "\"Retry\" (localized)",
        "description": "Text of the retry button"
      }
    ]
  },
  "TableRootProps": {
    "source": "react/src/components/Table/types.ts",
    "description": "Props of `TableRoot`, the styled `<table>` (wrapped in a scroll container)",
    "kind": "interface",
    "extends": [
      "Omit<TableHTMLAttributes<HTMLTableElement>, \"size\">"
    ],
    "props": [
      {
        "name": "size",
        "type": "TableSize",
        "required": false,
        "default": "\"medium\"",
        "description": "Density of the cells"
      },
      {
        "name": "variant",
        "type": "TableVariant",
        "required": false,
        "default": "\"simple\"",
        "description": "Visual style: plain rows, zebra stripes or bordered cells"
      },
      {
        "name": "hoverable",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Highlights body rows on hover"
      },
      {
        "name": "scroll",
        "type": "TableScrollConfig",
        "required": false,
        "description": "Horizontal minimum width / vertical maximum height of the scroll area. When set (or when the content overflows), the scroll area becomes a focusable region named by the table's `aria-label` / `aria-labelledby` (default: \"Scrollable table\", localized) so keyboard users can scroll it"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLTableElement>",
        "required": false,
        "description": "Ref to the `<table>` element"
      }
    ]
  },
  "TableScrollConfig": {
    "source": "react/src/components/Table/types.ts",
    "description": "Scroll configuration (same model as antd / arco / mantine). Numbers are pixels, strings are any CSS length.",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "x",
        "type": "number | string",
        "required": false,
        "description": "Minimum width of the table. The wrapper already scrolls horizontally, so the table scrolls as soon as its container is narrower than this value"
      },
      {
        "name": "y",
        "type": "number | string",
        "required": false,
        "description": "Maximum visible height of the table. The wrapper scrolls vertically and the header row stays sticky"
      }
    ]
  },
  "TableSortState": {
    "source": "react/src/components/Table/types.ts",
    "description": "Sort state of a `Table`",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "key",
        "type": "string",
        "required": true,
        "description": "Key of the sorted column"
      },
      {
        "name": "order",
        "type": "TableSortOrder | null",
        "required": true,
        "description": "Sort direction; `null` means unsorted"
      }
    ]
  },
  "TableRowSelection": {
    "source": "react/src/components/Table/types.ts",
    "description": "Row selection configuration of a `Table` (leading checkbox column)",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "type",
        "type": "\"checkbox\"",
        "required": false,
        "default": "\"checkbox\"",
        "description": "Selection mode (multiple selection with checkboxes)"
      },
      {
        "name": "selectedRowKeys",
        "type": "TableRowKey[]",
        "required": false,
        "description": "Keys of the selected rows (controlled)"
      },
      {
        "name": "defaultSelectedRowKeys",
        "type": "TableRowKey[]",
        "required": false,
        "default": "[]",
        "description": "Keys of the initially selected rows (uncontrolled)"
      },
      {
        "name": "onChange",
        "type": "(selectedRowKeys: TableRowKey[], selectedRows: T[]) => void",
        "required": false,
        "description": "Called with the new selected keys and the matching rows of `data`"
      },
      {
        "name": "getCheckboxProps",
        "type": "(row: T) => { disabled?: boolean }",
        "required": false,
        "description": "Per-row checkbox options; disabled rows cannot be toggled and are skipped by the select-all checkbox"
      },
      {
        "name": "getRowLabel",
        "type": "(row: T, index: number) => string",
        "required": false,
        "default": "the row key",
        "description": "Names a row in the accessible label of its checkbox (\"Select row {name}\")"
      }
    ]
  },
  "TableCellContentProps": {
    "source": "react/src/components/Table/types.ts",
    "description": "Props of `TableCellContent`: bounded primary / secondary content of a cell",
    "kind": "interface",
    "extends": [
      "Omit<HTMLAttributes<HTMLDivElement>, \"children\">"
    ],
    "props": [
      {
        "name": "primary",
        "type": "ReactNode",
        "required": true,
        "description": "Main content"
      },
      {
        "name": "secondary",
        "type": "ReactNode",
        "required": false,
        "description": "Secondary, muted content rendered under the primary content"
      },
      {
        "name": "monospace",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Renders the primary content as `<code>` in the monospace font"
      },
      {
        "name": "maxWidth",
        "type": "string | number",
        "required": false,
        "default": "360",
        "description": "Maximum width (numbers are pixels); long content wraps"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLDivElement>",
        "required": false,
        "description": "Ref to the root `<div>` element"
      }
    ]
  },
  "FixedColumnLayout": {
    "source": "react/src/components/Table/types.ts",
    "description": "Sticky offsets computed by `computeFixedColumnLayout`",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "leftOffsets",
        "type": "Record<string, number>",
        "required": true,
        "description": "Left offset (px) of every left-fixed column, by column key"
      },
      {
        "name": "rightOffsets",
        "type": "Record<string, number>",
        "required": true,
        "description": "Right offset (px) of every right-fixed column, by column key"
      },
      {
        "name": "lastLeftFixedKey",
        "type": "string | undefined",
        "required": true,
        "description": "Last column of the leading left-fixed block (gets the edge shadow)"
      },
      {
        "name": "firstRightFixedKey",
        "type": "string | undefined",
        "required": true,
        "description": "First column of the trailing right-fixed block (gets the edge shadow)"
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

每列默认读取 row[key]，也可提供 render 函数。请为行提供稳定的 rowKey。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/table/demos/basic.tsx

```tsx
import { Table, type TableColumn } from "minerva-design";

interface Book {
  id: number;
  title: string;
  author: string;
  score: number;
}

const books: Book[] = [
  { id: 1, title: "Dune", author: "Frank Herbert", score: 9.1 },
  { id: 2, title: "Solaris", author: "Stanisław Lem", score: 8.7 },
  { id: 3, title: "Hyperion", author: "Dan Simmons", score: 8.9 },
];

const columns: TableColumn<Book>[] = [
  { key: "title", header: "Title" },
  { key: "author", header: "Author" },
  { key: "score", header: "Score", align: "right" },
];

export default function BasicDemo() {
  return (
    <Table
      aria-label="Books"
      columns={columns}
      data={books}
      rowKey={(book) => book.id}
      hoverable
    />
  );
}

```

## Example: 单元格内容

TableCellContent 限制宽度并换行长内容，可附带弱化的第二行或等宽主文本。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/table/demos/cell-content.tsx

```tsx
import { Table, TableCellContent } from "minerva-design";

const pages = [
  {
    id: 1,
    title: "Getting started",
    description:
      "Install the package, load the stylesheet and render your first component.",
    url: "https://example.com/docs/getting-started/installation?ref=sidebar",
  },
  {
    id: 2,
    title: "Theming",
    description: "Customize tokens, palettes and the dark theme.",
    url: "https://example.com/docs/theming",
  },
];

export default function CellContentDemo() {
  return (
    <Table
      aria-label="Pages"
      rowKey={(row) => row.id}
      data={pages}
      columns={[
        {
          key: "title",
          header: "Page",
          render: (row) => (
            <TableCellContent primary={row.title} secondary={row.description} />
          ),
        },
        {
          key: "url",
          header: "URL",
          render: (row) => (
            <TableCellContent primary={row.url} monospace maxWidth={260} />
          ),
        },
      ]}
    />
  );
}

```

## Example: 组合子组件

TableRoot、TableHead、TableBody、TableRow、TableHeader 与 TableCell 渲染原生表格元素，可实现多行表头或合并单元格。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/table/demos/compound.tsx

```tsx
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRoot,
  TableRow,
} from "minerva-design";

export default function CompoundDemo() {
  return (
    <TableRoot aria-label="Quarterly sales" variant="bordered" size="small">
      <TableHead>
        <TableRow>
          <TableHeader scope="col" rowSpan={2}>
            Region
          </TableHeader>
          <TableHeader scope="colgroup" colSpan={2}>
            2025
          </TableHeader>
        </TableRow>
        <TableRow>
          <TableHeader scope="col">H1</TableHeader>
          <TableHeader scope="col">H2</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Europe</TableCell>
          <TableCell>1.2M</TableCell>
          <TableCell>1.5M</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Asia</TableCell>
          <TableCell colSpan={2}>2.9M (full year)</TableCell>
        </TableRow>
      </TableBody>
    </TableRoot>
  );
}

```

## Example: DataTable

在表格下方添加分页；设置 error 时以提示和重试按钮替换表格。行数据需预先分页。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/table/demos/data-table.tsx

```tsx
import { useState } from "react";
import { Button, DataTable } from "minerva-design";

const all = Array.from({ length: 42 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
}));

const columns = [
  { key: "id", header: "ID", width: 60 },
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
];

export default function DataTableDemo() {
  const [page, setPage] = useState(1);
  const [failed, setFailed] = useState(false);
  // Rows are paginated by the data owner (here: a slice of a local array).
  const rows = all.slice((page - 1) * 5, page * 5);
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <Button
        color="neutral"
        variant="outline"
        size="small"
        onClick={() => setFailed(true)}
      >
        Simulate an error
      </Button>
      <DataTable
        aria-label="Users"
        columns={columns}
        data={rows}
        rowKey={(row) => row.id}
        error={failed ? "Could not load the users." : undefined}
        onRetry={() => setFailed(false)}
        pagination={{
          current: page,
          pageSize: 5,
          total: all.length,
          onChange: setPage,
        }}
      />
    </div>
  );
}

```

## Example: 固定列与滚动

scroll.x 设置最小宽度，scroll.y 限制高度并固定表头。固定列必须设置 width，并连续声明在开头（left）或末尾（right）；ellipsis 截断长文本。 当固定列的实测总宽度使滚动区域不足 120px 时，组件自动取消固定，所有字段和操作仍可通过横向滚动访问。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/table/demos/fixed-columns.tsx

```tsx
import { Button, Table, type TableColumn } from "minerva-design";

interface Order {
  id: string;
  customer: string;
  address: string;
  note: string;
  total: string;
}

const orders: Order[] = Array.from({ length: 6 }, (_, i) => ({
  id: `#10${i + 1}`,
  customer: ["Alice", "Bob", "Carol"][i % 3],
  address: "221B Baker Street, Marylebone, London NW1 6XE, United Kingdom",
  note: "Leave the parcel with the concierge if nobody answers the door",
  total: `€${(i + 1) * 42}.00`,
}));

const columns: TableColumn<Order>[] = [
  { key: "id", header: "Order", width: 90, fixed: "left" },
  { key: "customer", header: "Customer", width: 120, fixed: "left" },
  { key: "address", header: "Address", width: 320 },
  { key: "note", header: "Note", width: 240, ellipsis: true },
  { key: "total", header: "Total", width: 100, align: "right" },
  {
    key: "actions",
    header: "Actions",
    width: 110,
    fixed: "right",
    render: () => (
      <Button size="small" color="neutral" variant="outline">
        Details
      </Button>
    ),
  },
];

export default function FixedColumnsDemo() {
  return (
    <Table
      aria-label="Orders"
      columns={columns}
      data={orders}
      rowKey={(order) => order.id}
      scroll={{ x: 1100, y: 240 }}
    />
  );
}

```

## Example: 行选择

rowSelection 添加复选框列和全选复选框（部分选中时为半选状态）。全选会跳过禁用行；选中行带有 aria-selected 和高亮。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/table/demos/selection.tsx

```tsx
import { useState } from "react";
import { Table, type TableRowKey } from "minerva-design";

interface Member {
  id: number;
  name: string;
  role: string;
}

const members: Member[] = [
  { id: 1, name: "Ada Lovelace", role: "Owner" },
  { id: 2, name: "Alan Turing", role: "Admin" },
  { id: 3, name: "Grace Hopper", role: "Editor" },
  { id: 4, name: "Linus Torvalds", role: "Viewer" },
];

export default function SelectionDemo() {
  const [selected, setSelected] = useState<TableRowKey[]>([2]);
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <Table
        aria-label="Members"
        rowKey={(row) => row.id}
        data={members}
        hoverable
        rowSelection={{
          selectedRowKeys: selected,
          onChange: (keys) => setSelected(keys),
          // The owner cannot be selected (skipped by "select all")
          getCheckboxProps: (row) => ({ disabled: row.role === "Owner" }),
          getRowLabel: (row) => row.name,
        }}
        columns={[
          { key: "name", header: "Name", sortable: true },
          { key: "role", header: "Role" },
        ]}
      />
      <small>{`${selected.length} selected`}</small>
    </div>
  );
}

```

## Example: 排序

sortable 让表头变成按钮，依次切换升序、降序和不排序（aria-sort 同步）。true 比较 row[key]；函数则比较两行。通过 sortState 和 onSortChange 受控，或用 manualSort 交由服务端排序。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/table/demos/sorting.tsx

```tsx
import { useState } from "react";
import { Table, type TableSortState } from "minerva-design";

interface Service {
  id: number;
  name: string;
  region: string;
  latency: number;
}

const services: Service[] = [
  { id: 1, name: "auth-api", region: "eu-west", latency: 42 },
  { id: 2, name: "billing", region: "us-east", latency: 118 },
  { id: 3, name: "search", region: "ap-south", latency: 73 },
  { id: 4, name: "gateway", region: "eu-west", latency: 9 },
];

export default function SortingDemo() {
  // Controlled: the sort state lives here (a server could sort with manualSort).
  const [sort, setSort] = useState<TableSortState | null>({
    key: "latency",
    order: "ascend",
  });
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <Table
        aria-label="Services"
        rowKey={(row) => row.id}
        data={services}
        sortState={sort}
        onSortChange={setSort}
        columns={[
          { key: "name", header: "Service", sortable: true },
          { key: "region", header: "Region", sortable: true },
          {
            key: "latency",
            header: "Latency",
            align: "right",
            // Custom compare: ascending order of two rows
            sortable: (a, b) => a.latency - b.latency,
            render: (row) => `${row.latency} ms`,
          },
        ]}
      />
      <small>
        {sort?.order ? `Sorted by ${sort.key} (${sort.order})` : "Unsorted"}
      </small>
    </div>
  );
}

```

## Example: 加载与空状态

loading 渲染骨架行（对辅助技术隐藏）；data 为空时渲染 emptyText。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/table/demos/states.tsx

```tsx
import { useState } from "react";
import { Button, Table } from "minerva-design";

const columns = [
  { key: "name", header: "Name" },
  { key: "status", header: "Status" },
];

export default function StatesDemo() {
  const [loading, setLoading] = useState(true);
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <Button
        color="neutral"
        variant="outline"
        size="small"
        onClick={() => setLoading((v) => !v)}
      >
        {loading ? "Show empty state" : "Show loading state"}
      </Button>
      <Table
        aria-label="Jobs"
        columns={columns}
        data={[]}
        loading={loading}
        loadingRows={3}
        emptyText="No jobs yet"
      />
    </div>
  );
}

```

## Example: 变体与尺寸

普通、斑马纹或带边框的行，三种密度（small / medium / large），可选悬停高亮。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/table/demos/variants.tsx

```tsx
import { Table } from "minerva-design";

const rows = [
  { id: 1, name: "Alice", role: "Admin" },
  { id: 2, name: "Bob", role: "Editor" },
  { id: 3, name: "Carol", role: "Viewer" },
];

const columns = [
  { key: "name", header: "Name" },
  { key: "role", header: "Role" },
];

export default function VariantsDemo() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <Table
        aria-label="Striped"
        columns={columns}
        data={rows}
        variant="striped"
        size="small"
      />
      <Table
        aria-label="Bordered"
        columns={columns}
        data={rows}
        variant="bordered"
      />
      <Table
        aria-label="Large"
        columns={columns}
        data={rows}
        size="large"
        hoverable
      />
    </div>
  );
}

```
