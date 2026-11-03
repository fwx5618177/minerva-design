# Table

Displays rows of data. Use Table with columns and data for the common case, TableRoot and its parts for custom headers or merged cells, and DataTable for pagination, loading and error states.

Package: minerva-design@1.19.3

Renderer: taro

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "1b65455cccbdd71bb609d7d859b1ef90f9e604c6",
  "sourceDigest": "sha256:a8b34eea01e9133306bb1fde48e7966deaaaa35d87c2dfd2e181d891c65e01c1",
  "referenceSourceDigest": "sha256:d3ed05a4228bc39ff766871c13b5ba292792f934f6ebc3d0d29af28589be129c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## DataTable

Support: beta

Declarative or compound native tables, shared-core local/custom sorting, disabled-row selection, configurable loading skeleton rows, size/striping/selection colors, native touch row hover, empty/error/retry and pagination composition. Native touch/view semantics differ from browser DOM semantics. Native devices do not expose document focus, inert, browser portals or File input APIs; H5 capabilities are specified separately. Device-runtime validation is still required. Fixed column offsets use shared-core layout; native View cells replace browser table elements; arbitrary HTML cell attributes are not forwarded. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
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
    "source": "packages/taro/src/data.tsx",
    "kind": "array",
    "typeText": "TableColumn<T>[]",
    "typeRef": "type:940e9586c8c68ec98398",
    "required": true
  },
  {
    "name": "data",
    "source": "packages/taro/src/data.tsx",
    "kind": "array",
    "typeText": "T[]",
    "typeRef": "type:06933f291c550d5a5c54",
    "required": true
  },
  {
    "name": "rowKey",
    "source": "packages/taro/src/data.tsx",
    "kind": "function",
    "typeText": "((row: T, index: number) => TableRowKey) | undefined",
    "typeRef": "type:879e13726068d00a6085",
    "parameters": [
      {
        "name": "row",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "T",
        "typeRef": "type:6944d41289e0c556e050"
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
      "typeRef": "type:a2db9f2e556c03b8fb9b"
    },
    "required": false
  },
  {
    "name": "emptyText",
    "source": "packages/taro/src/data.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:a991edaa7809b6d75ba2",
    "required": false
  },
  {
    "name": "loading",
    "source": "packages/taro/src/data.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "loadingRows",
    "source": "packages/taro/src/data.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false
  },
  {
    "name": "sortState",
    "source": "packages/taro/src/data.tsx",
    "kind": "object",
    "typeText": "TableSortState | null | undefined",
    "typeRef": "type:c3de4a905353a45f4d22",
    "required": false
  },
  {
    "name": "defaultSortState",
    "source": "packages/taro/src/data.tsx",
    "kind": "object",
    "typeText": "TableSortState | null | undefined",
    "typeRef": "type:c3de4a905353a45f4d22",
    "required": false
  },
  {
    "name": "manualSort",
    "source": "packages/taro/src/data.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "rowSelection",
    "source": "packages/taro/src/data.tsx",
    "kind": "object",
    "typeText": "TableRowSelection<T> | undefined",
    "typeRef": "type:13d7317393409f54ffac",
    "required": false
  },
  {
    "name": "variant",
    "source": "packages/taro/src/data.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "size",
    "source": "packages/taro/src/data.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "hoverable",
    "source": "packages/taro/src/data.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "scroll",
    "source": "packages/taro/src/data.tsx",
    "kind": "object",
    "typeText": "{ x?: string | number | undefined; y?: string | number | undefined; } | undefined",
    "typeRef": "type:1168d3be98bbb4d12738",
    "required": false
  },
  {
    "name": "id",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-label",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-labelledby",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-describedby",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "pagination",
    "source": "packages/taro/src/data.tsx",
    "kind": "object",
    "typeText": "PaginationProps | undefined",
    "typeRef": "type:bf857f279d9c03e53a5b",
    "required": false
  },
  {
    "name": "error",
    "source": "packages/taro/src/data.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:a991edaa7809b6d75ba2",
    "required": false
  },
  {
    "name": "retryLabel",
    "source": "packages/taro/src/data.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "onSortChange",
    "source": "packages/taro/src/data.tsx",
    "kind": "function",
    "typeText": "((state: TableSortState) => void) | undefined",
    "typeRef": "type:8c0bbf5add991e290086",
    "parameters": [
      {
        "name": "state",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "TableSortState",
        "typeRef": "type:db91c2a624e3335e1e4c"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  },
  {
    "name": "onRetry",
    "source": "packages/taro/src/data.tsx",
    "kind": "function",
    "typeText": "(() => void) | undefined",
    "typeRef": "type:39bae33d625c14c3b009",
    "parameters": [],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
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

## Table

Support: beta

Declarative or compound native tables, shared-core local/custom sorting, disabled-row selection, configurable loading skeleton rows, size/striping/selection colors, native touch row hover, empty/error/retry and pagination composition. Native touch/view semantics differ from browser DOM semantics. Native devices do not expose document focus, inert, browser portals or File input APIs; H5 capabilities are specified separately. Device-runtime validation is still required. Fixed column offsets use shared-core layout; native View cells replace browser table elements; arbitrary HTML cell attributes are not forwarded. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
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
    "source": "packages/taro/src/data.tsx",
    "kind": "array",
    "typeText": "TableColumn<T>[]",
    "typeRef": "type:1d36082c0b05d496ab22",
    "required": true
  },
  {
    "name": "data",
    "source": "packages/taro/src/data.tsx",
    "kind": "array",
    "typeText": "T[]",
    "typeRef": "type:25f0c8753476f1482286",
    "required": true
  },
  {
    "name": "rowKey",
    "source": "packages/taro/src/data.tsx",
    "kind": "function",
    "typeText": "((row: T, index: number) => TableRowKey) | undefined",
    "typeRef": "type:b1a2c0de1d831f5a782a",
    "parameters": [
      {
        "name": "row",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "T",
        "typeRef": "type:037aa233d9afade80f8a"
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
      "typeRef": "type:a2db9f2e556c03b8fb9b"
    },
    "required": false
  },
  {
    "name": "emptyText",
    "source": "packages/taro/src/data.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:a991edaa7809b6d75ba2",
    "required": false
  },
  {
    "name": "loading",
    "source": "packages/taro/src/data.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "loadingRows",
    "source": "packages/taro/src/data.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false
  },
  {
    "name": "sortState",
    "source": "packages/taro/src/data.tsx",
    "kind": "object",
    "typeText": "TableSortState | null | undefined",
    "typeRef": "type:c3de4a905353a45f4d22",
    "required": false
  },
  {
    "name": "defaultSortState",
    "source": "packages/taro/src/data.tsx",
    "kind": "object",
    "typeText": "TableSortState | null | undefined",
    "typeRef": "type:c3de4a905353a45f4d22",
    "required": false
  },
  {
    "name": "manualSort",
    "source": "packages/taro/src/data.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "rowSelection",
    "source": "packages/taro/src/data.tsx",
    "kind": "object",
    "typeText": "TableRowSelection<T> | undefined",
    "typeRef": "type:52f6c164f79cd8a7d72f",
    "required": false
  },
  {
    "name": "variant",
    "source": "packages/taro/src/data.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "size",
    "source": "packages/taro/src/data.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "hoverable",
    "source": "packages/taro/src/data.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "scroll",
    "source": "packages/taro/src/data.tsx",
    "kind": "object",
    "typeText": "{ x?: string | number | undefined; y?: string | number | undefined; } | undefined",
    "typeRef": "type:1168d3be98bbb4d12738",
    "required": false
  },
  {
    "name": "id",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-label",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-labelledby",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-describedby",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "onSortChange",
    "source": "packages/taro/src/data.tsx",
    "kind": "function",
    "typeText": "((state: TableSortState) => void) | undefined",
    "typeRef": "type:8c0bbf5add991e290086",
    "parameters": [
      {
        "name": "state",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "TableSortState",
        "typeRef": "type:db91c2a624e3335e1e4c"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
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

## TableBody

Support: beta

Declarative or compound native tables, shared-core local/custom sorting, disabled-row selection, configurable loading skeleton rows, size/striping/selection colors, native touch row hover, empty/error/retry and pagination composition. Native touch/view semantics differ from browser DOM semantics. Native devices do not expose document focus, inert, browser portals or File input APIs; H5 capabilities are specified separately. Device-runtime validation is still required. Fixed column offsets use shared-core layout; native View cells replace browser table elements; arbitrary HTML cell attributes are not forwarded. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
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
    "name": "id",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-label",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-labelledby",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-describedby",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
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

## TableCell

Support: beta

Declarative or compound native tables, shared-core local/custom sorting, disabled-row selection, configurable loading skeleton rows, size/striping/selection colors, native touch row hover, empty/error/retry and pagination composition. Native touch/view semantics differ from browser DOM semantics. Native devices do not expose document focus, inert, browser portals or File input APIs; H5 capabilities are specified separately. Device-runtime validation is still required. Fixed column offsets use shared-core layout; native View cells replace browser table elements; arbitrary HTML cell attributes are not forwarded. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
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
    "name": "id",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-label",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-labelledby",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-describedby",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
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

## TableCellContent

Support: beta

Declarative or compound native tables, shared-core local/custom sorting, disabled-row selection, configurable loading skeleton rows, size/striping/selection colors, native touch row hover, empty/error/retry and pagination composition. Native touch/view semantics differ from browser DOM semantics. Native devices do not expose document focus, inert, browser portals or File input APIs; H5 capabilities are specified separately. Device-runtime validation is still required. Fixed column offsets use shared-core layout; native View cells replace browser table elements; arbitrary HTML cell attributes are not forwarded. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
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
    "name": "id",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-label",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-labelledby",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-describedby",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "primary",
    "source": "packages/taro/src/data.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:a991edaa7809b6d75ba2",
    "required": true
  },
  {
    "name": "secondary",
    "source": "packages/taro/src/data.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:a991edaa7809b6d75ba2",
    "required": false
  },
  {
    "name": "monospace",
    "source": "packages/taro/src/data.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "maxWidth",
    "source": "packages/taro/src/data.tsx",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "required": false
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

## TableHead

Support: beta

Declarative or compound native tables, shared-core local/custom sorting, disabled-row selection, configurable loading skeleton rows, size/striping/selection colors, native touch row hover, empty/error/retry and pagination composition. Native touch/view semantics differ from browser DOM semantics. Native devices do not expose document focus, inert, browser portals or File input APIs; H5 capabilities are specified separately. Device-runtime validation is still required. Fixed column offsets use shared-core layout; native View cells replace browser table elements; arbitrary HTML cell attributes are not forwarded. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
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
    "name": "id",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-label",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-labelledby",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-describedby",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
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

## TableHeader

Support: beta

Declarative or compound native tables, shared-core local/custom sorting, disabled-row selection, configurable loading skeleton rows, size/striping/selection colors, native touch row hover, empty/error/retry and pagination composition. Native touch/view semantics differ from browser DOM semantics. Native devices do not expose document focus, inert, browser portals or File input APIs; H5 capabilities are specified separately. Device-runtime validation is still required. Fixed column offsets use shared-core layout; native View cells replace browser table elements; arbitrary HTML cell attributes are not forwarded. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
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
    "name": "id",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-label",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-labelledby",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-describedby",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
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

## TableRoot

Support: beta

Declarative or compound native tables, shared-core local/custom sorting, disabled-row selection, configurable loading skeleton rows, size/striping/selection colors, native touch row hover, empty/error/retry and pagination composition. Native touch/view semantics differ from browser DOM semantics. Native devices do not expose document focus, inert, browser portals or File input APIs; H5 capabilities are specified separately. Device-runtime validation is still required. Fixed column offsets use shared-core layout; native View cells replace browser table elements; arbitrary HTML cell attributes are not forwarded. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
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
    "name": "id",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-label",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-labelledby",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-describedby",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "scroll",
    "source": "packages/taro/src/data.tsx",
    "kind": "object",
    "typeText": "{ x?: string | number | undefined; y?: string | number | undefined; } | undefined",
    "typeRef": "type:4d5d6da0235b3c2314f9",
    "required": false
  },
  {
    "name": "variant",
    "source": "packages/taro/src/data.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "size",
    "source": "packages/taro/src/data.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "hoverable",
    "source": "packages/taro/src/data.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
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

Support: beta

Declarative or compound native tables, shared-core local/custom sorting, disabled-row selection, configurable loading skeleton rows, size/striping/selection colors, native touch row hover, empty/error/retry and pagination composition. Native touch/view semantics differ from browser DOM semantics. Native devices do not expose document focus, inert, browser portals or File input APIs; H5 capabilities are specified separately. Device-runtime validation is still required. Fixed column offsets use shared-core layout; native View cells replace browser table elements; arbitrary HTML cell attributes are not forwarded. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
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
    "name": "id",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-label",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-labelledby",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-describedby",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
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
