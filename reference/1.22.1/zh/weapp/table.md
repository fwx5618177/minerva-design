# Table 表格

展示数据行。常规场景用 Table（columns + data），自定义表头或合并单元格用 TableRoot 及其子组件，需要分页、加载与错误状态时用 DataTable。

Package: minerva-design@1.22.1

Renderer: weapp

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.1",
  "sourceCommit": "3b95c464583d2e1bcf02999361aa6cf5481d519b",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:22ecb97acf4fac039a6d9a7e4a78b6bedc12dbbb8c1a14e3feeef3bcd47a7cef"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## DataTable

Support: beta

All Table contracts and configure callbacks, error/retry slots and label, declarative pagination options for total/range/quick jump/size/labels/visual axes; owner-paginated rows. Native generic Component replaces ReactNode cells; browser focus and scrolling differ. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/data-table/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "disabled",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "columns",
    "typeText": "array",
    "required": false
  },
  {
    "name": "data",
    "typeText": "array",
    "required": false
  },
  {
    "name": "rowKey",
    "typeText": "string",
    "required": false,
    "default": "id"
  },
  {
    "name": "selectable",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "selectedRowKeys",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "sortState",
    "typeText": "unknown",
    "required": false,
    "default": ""
  },
  {
    "name": "manualSort",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "loading",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "emptyText",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "error",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "current",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "pageSize",
    "typeText": "number",
    "required": false,
    "default": 10
  },
  {
    "name": "total",
    "typeText": "number",
    "required": false,
    "default": 0
  },
  {
    "name": "readOnly",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "disabledRowKeys",
    "typeText": "array",
    "required": false
  },
  {
    "name": "filters",
    "typeText": "object",
    "required": false,
    "default": null
  },
  {
    "name": "manualFilter",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "size",
    "typeText": "string",
    "required": false,
    "default": "medium"
  },
  {
    "name": "variant",
    "typeText": "string",
    "required": false,
    "default": "simple"
  },
  {
    "name": "serverPagination",
    "typeText": "boolean",
    "required": false,
    "default": true
  },
  {
    "name": "defaultSelectedRowKeys",
    "typeText": "unknown",
    "required": false
  },
  {
    "name": "rowSelection",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "defaultSortState",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "defaultCurrent",
    "typeText": "number",
    "required": false,
    "default": 1
  },
  {
    "name": "scroll",
    "typeText": "unknown",
    "required": false
  },
  {
    "name": "pagination",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "hoverable",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string",
    "required": false,
    "default": "Scrollable table"
  },
  {
    "name": "loadingRows",
    "typeText": "number",
    "required": false,
    "default": 5
  },
  {
    "name": "customCellRenderer",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "retryable",
    "typeText": "boolean",
    "required": false,
    "default": true
  },
  {
    "name": "retryLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  }
]
```

### events

```json
[
  {
    "name": "sortchange",
    "typeText": "{ sortState: { key: string; order: 'ascend' | 'descend' | null } }",
    "description": "Requested sort state."
  },
  {
    "name": "selectionchange",
    "typeText": "{ selectedRowKeys: Array<string | number>; selectedRows: Record<string, unknown>[] }",
    "description": "Requested row selection, excluding disabled rows from select-all."
  },
  {
    "name": "filterchange",
    "typeText": "{ filters: Record<string, string[]> }",
    "description": "Requested column filters."
  },
  {
    "name": "pagechange",
    "typeText": "{ current: number; pageSize: number }",
    "description": "Requested page and page size."
  },
  {
    "name": "rowclick",
    "typeText": "{ row: Record<string, unknown>; key: string | number; index: number }",
    "description": "Original row and source index."
  },
  {
    "name": "cellaction",
    "typeText": "{ row: Record<string, unknown>; key: string | number; index: number; columnKey: string; detail: unknown }",
    "description": "Action emitted from a native rich cell or custom cell-renderer Component."
  },
  {
    "name": "retry",
    "typeText": "{}",
    "description": "Retry requested from the error state."
  }
]
```

### slots

```json
[
  {
    "name": "error"
  },
  {
    "name": "empty"
  },
  {
    "name": "pagination"
  },
  {
    "name": "footer"
  }
]
```

## Table

Support: beta

Core sorting and fixed-column offsets, scroll extents, row selection defaults/controlled rejection/disabled callbacks, filtering and local paging, skeleton rows, variants/density; configure custom row keys/comparators/native rich cells and cell-renderer generic. Native generic Component receives row/value/column/index instead of a ReactNode render function; sticky scrolling requires device verification. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/table/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "disabled",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "columns",
    "typeText": "array",
    "required": false
  },
  {
    "name": "data",
    "typeText": "array",
    "required": false
  },
  {
    "name": "rowKey",
    "typeText": "string",
    "required": false,
    "default": "id"
  },
  {
    "name": "selectable",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "selectedRowKeys",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "sortState",
    "typeText": "unknown",
    "required": false,
    "default": ""
  },
  {
    "name": "manualSort",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "loading",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "emptyText",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "readOnly",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "disabledRowKeys",
    "typeText": "array",
    "required": false
  },
  {
    "name": "filters",
    "typeText": "object",
    "required": false,
    "default": null
  },
  {
    "name": "manualFilter",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "size",
    "typeText": "string",
    "required": false,
    "default": "medium"
  },
  {
    "name": "variant",
    "typeText": "string",
    "required": false,
    "default": "simple"
  },
  {
    "name": "current",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "pageSize",
    "typeText": "number",
    "required": false,
    "default": 0
  },
  {
    "name": "serverPagination",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "defaultSelectedRowKeys",
    "typeText": "unknown",
    "required": false
  },
  {
    "name": "rowSelection",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "defaultSortState",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "defaultCurrent",
    "typeText": "number",
    "required": false,
    "default": 1
  },
  {
    "name": "scroll",
    "typeText": "unknown",
    "required": false
  },
  {
    "name": "pagination",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "hoverable",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string",
    "required": false,
    "default": "Scrollable table"
  },
  {
    "name": "loadingRows",
    "typeText": "number",
    "required": false,
    "default": 5
  },
  {
    "name": "customCellRenderer",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "retryable",
    "typeText": "boolean",
    "required": false,
    "default": true
  },
  {
    "name": "retryLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  }
]
```

### events

```json
[
  {
    "name": "sortchange",
    "typeText": "{ sortState: { key: string; order: 'ascend' | 'descend' | null } }",
    "description": "Requested sort state."
  },
  {
    "name": "selectionchange",
    "typeText": "{ selectedRowKeys: Array<string | number>; selectedRows: Record<string, unknown>[] }",
    "description": "Requested row selection, excluding disabled rows from select-all."
  },
  {
    "name": "filterchange",
    "typeText": "{ filters: Record<string, string[]> }",
    "description": "Requested column filters."
  },
  {
    "name": "pagechange",
    "typeText": "{ current: number; pageSize: number }",
    "description": "Requested page and page size."
  },
  {
    "name": "rowclick",
    "typeText": "{ row: Record<string, unknown>; key: string | number; index: number }",
    "description": "Original row and source index."
  },
  {
    "name": "cellaction",
    "typeText": "{ row: Record<string, unknown>; key: string | number; index: number; columnKey: string; detail: unknown }",
    "description": "Action emitted from a native rich cell or custom cell-renderer Component."
  }
]
```

### slots

```json
[
  {
    "name": "empty"
  },
  {
    "name": "pagination"
  },
  {
    "name": "footer"
  }
]
```

## TableBody

Support: n/a

Native composition uses Table: data records. No standalone placeholder component is exported. Native serialized props, slots and parent-owned events replace DOM compound child context. Use Table props/slots for the native equivalent.

## TableCell

Support: n/a

Native composition uses Table: row field keyed by column. No standalone placeholder component is exported. Native serialized props, slots and parent-owned events replace DOM compound child context. Use Table props/slots for the native equivalent.

## TableCellContent

Support: beta

Native bounded primary/secondary text and monospace content; default Table cell-renderer generic. Arbitrary ReactNode content uses native slots. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/table-cell-content/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "primary",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "secondary",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "monospace",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "maxWidth",
    "typeText": "unknown",
    "required": false,
    "default": 360
  },
  {
    "name": "value",
    "typeText": "unknown",
    "required": false,
    "default": ""
  },
  {
    "name": "row",
    "typeText": "object",
    "required": false
  },
  {
    "name": "column",
    "typeText": "object",
    "required": false
  },
  {
    "name": "rowKey",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "rowIndex",
    "typeText": "number",
    "required": false,
    "default": 0
  }
]
```

### slots

```json
[
  {
    "name": "default"
  }
]
```

## TableHead

Support: n/a

Native composition uses Table: columns[].header. No standalone placeholder component is exported. Native serialized props, slots and parent-owned events replace DOM compound child context. Use Table props/slots for the native equivalent.

## TableHeader

Support: n/a

Native composition uses Table: column header label. No standalone placeholder component is exported. Native serialized props, slots and parent-owned events replace DOM compound child context. Use Table props/slots for the native equivalent.

## TableRoot

Support: n/a

Native composition uses Table: columns/data. No standalone placeholder component is exported. Native serialized props, slots and parent-owned events replace DOM compound child context. Use Table props/slots for the native equivalent.

## TableRow

Support: n/a

Native composition uses Table: one data record. No standalone placeholder component is exported. Native serialized props, slots and parent-owned events replace DOM compound child context. Use Table props/slots for the native equivalent.

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
