# Table

Displays rows of data. Use Table with columns and data for the common case, TableRoot and its parts for custom headers or merged cells, and DataTable for pagination, loading and error states.

Package: minerva-design@1.20.4

Renderer: uni

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "c389776dc1aa3bf80277d9c47f2c62d8f235e947",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:96f9f31e7015b805e8eece3c05731306a461013443150c08b7b7a91a3bfc1bb6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

## Documentation

## DataTable

Support: beta

Full shared TableProps forwarding and every table scoped slot; complete sort/selection/row/filter/page event payloads; loading overrides error, retry only when handled, parent pagination and pagination slots. DOM table render functions map to Table native scoped slots. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
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
    "name": "columns",
    "typeText": "Column[] | undefined",
    "required": false
  },
  {
    "name": "data",
    "typeText": "Row[] | undefined",
    "required": false
  },
  {
    "name": "rowKey",
    "typeText": "string | ((row: Row, index: number) => Key) | undefined",
    "required": false
  },
  {
    "name": "selectable",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "selectedRowKeys",
    "typeText": "Key[] | undefined",
    "required": false
  },
  {
    "name": "rowSelection",
    "typeText": "{ selectedRowKeys?: Key[] | undefined; defaultSelectedRowKeys?: Key[] | undefined; getCheckboxProps?: ((row: Row) => { disabled?: boolean | undefined; }) | undefined; onChange?: ((keys: Key[], rows: Row[]) => void) | undefined; } | undefined",
    "required": false
  },
  {
    "name": "sortState",
    "typeText": "{ key: string; order: string | null; } | null | undefined",
    "required": false
  },
  {
    "name": "defaultSortState",
    "typeText": "{ key: string; order: string | null; } | null | undefined",
    "required": false
  },
  {
    "name": "manualSort",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "loading",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "emptyText",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "disabled",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "readOnly",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "size",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "variant",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "hoverable",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "scroll",
    "typeText": "{ x?: string | number | undefined; y?: string | number | undefined; } | undefined",
    "required": false
  },
  {
    "name": "filters",
    "typeText": "Record<string, string[]> | undefined",
    "required": false
  },
  {
    "name": "manualFilter",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "current",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "defaultCurrent",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "pageSize",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "error",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "retryLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "pagination",
    "typeText": "Record<string, any> | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "retry",
    "typeText": "any[]"
  },
  {
    "name": "pageChange",
    "typeText": "any[]"
  },
  {
    "name": "sortChange",
    "typeText": "any[]"
  },
  {
    "name": "selectionChange",
    "typeText": "any[]"
  },
  {
    "name": "rowClick",
    "typeText": "any[]"
  },
  {
    "name": "filterChange",
    "typeText": "any[]"
  }
]
```

### slots

```json
[
  {
    "name": "error",
    "typeText": "{ error: string; }"
  },
  {
    "name": "header",
    "typeText": "{ column: Column; }"
  },
  {
    "name": "cell",
    "typeText": "{ row: Row; column: Column; }"
  },
  {
    "name": "loading",
    "typeText": "{}"
  },
  {
    "name": "empty",
    "typeText": "{}"
  },
  {
    "name": "footer",
    "typeText": "{}"
  },
  {
    "name": "pagination-total",
    "typeText": "{ total: number; range: [number, number]; }"
  },
  {
    "name": "pagination-item",
    "typeText": "{ page: number; type: \"prev\" | \"next\" | \"page\" | \"jump-prev\" | \"jump-next\"; active: boolean; }"
  }
]
```

## Table

Support: beta

Column/row table; numeric/localized sorting; filters; page controls; select-all skipping disabled rows; controlled selection rejection; loading/empty; uni sticky columns and scoped cell/header slots. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
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
    "typeText": "Column[] | undefined",
    "required": false
  },
  {
    "name": "data",
    "typeText": "Row[] | undefined",
    "required": false
  },
  {
    "name": "rowKey",
    "typeText": "string | ((row: Row, index: number) => Key) | undefined",
    "required": false
  },
  {
    "name": "selectable",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "selectedRowKeys",
    "typeText": "Key[] | undefined",
    "required": false
  },
  {
    "name": "rowSelection",
    "typeText": "{ selectedRowKeys?: Key[] | undefined; defaultSelectedRowKeys?: Key[] | undefined; getCheckboxProps?: ((row: Row) => { disabled?: boolean | undefined; }) | undefined; onChange?: ((keys: Key[], rows: Row[]) => void) | undefined; } | undefined",
    "required": false
  },
  {
    "name": "sortState",
    "typeText": "{ key: string; order: string | null; } | null | undefined",
    "required": false
  },
  {
    "name": "defaultSortState",
    "typeText": "{ key: string; order: string | null; } | null | undefined",
    "required": false
  },
  {
    "name": "manualSort",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "loading",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "emptyText",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "disabled",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "readOnly",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "size",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "variant",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "hoverable",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "scroll",
    "typeText": "{ x?: string | number | undefined; y?: string | number | undefined; } | undefined",
    "required": false
  },
  {
    "name": "filters",
    "typeText": "Record<string, string[]> | undefined",
    "required": false
  },
  {
    "name": "manualFilter",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "current",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "defaultCurrent",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "pageSize",
    "typeText": "number | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "pageChange",
    "typeText": "any[]"
  },
  {
    "name": "sortChange",
    "typeText": "any[]"
  },
  {
    "name": "selectionChange",
    "typeText": "any[]"
  },
  {
    "name": "rowClick",
    "typeText": "any[]"
  },
  {
    "name": "filterChange",
    "typeText": "any[]"
  }
]
```

### slots

```json
[
  {
    "name": "header",
    "typeText": "{ column: Column; }"
  },
  {
    "name": "loading",
    "typeText": "{}"
  },
  {
    "name": "empty",
    "typeText": "{}"
  },
  {
    "name": "cell",
    "typeText": "{ row: Row; column: Column; }"
  },
  {
    "name": "footer",
    "typeText": "{}"
  }
]
```

## TableBody

Support: beta

Native Table semantic section with dedicated class, props and slots. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "TableBody"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "label",
    "typeText": "string | undefined",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "typeText": "{}"
  }
]
```

## TableCell

Support: beta

Native Table semantic section with dedicated class, props and slots. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "TableCell"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "label",
    "typeText": "string | undefined",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "typeText": "{}"
  }
]
```

## TableCellContent

Support: beta

Native Table semantic section with dedicated class, props and slots. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
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
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "secondary",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "monospace",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "maxWidth",
    "typeText": "string | number | undefined",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "typeText": "{}"
  }
]
```

## TableHead

Support: beta

Native Table semantic section with dedicated class, props and slots. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "TableHead"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "label",
    "typeText": "string | undefined",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "typeText": "{}"
  }
]
```

## TableHeader

Support: beta

Native Table semantic section with dedicated class, props and slots. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "TableHeader"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "label",
    "typeText": "string | undefined",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "typeText": "{}"
  }
]
```

## TableRoot

Support: beta

Native Table semantic section with dedicated class, props and slots. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
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
    "name": "variant",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "size",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "scroll",
    "typeText": "{ x?: number | undefined; y?: number | undefined; } | undefined",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "typeText": "{}"
  }
]
```

## TableRow

Support: beta

Native Table semantic section with dedicated class, props and slots. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "TableRow"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "label",
    "typeText": "string | undefined",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "typeText": "{}"
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
