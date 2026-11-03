# Table 表格

展示数据行。常规场景用 Table（columns + data），自定义表头或合并单元格用 TableRoot 及其子组件，需要分页、加载与错误状态时用 DataTable。

Package: minerva-design@1.19.3

Renderer: native

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:936b6b17ca037f9538a8c5d8447637951e27e8db3596add5e078bc5a51ef03ae"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## DataTable

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
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
    "source": "packages/native/src/components/Table/index.tsx",
    "kind": "object",
    "typeText": "PaginationProps | undefined",
    "typeRef": "type:b44ba81159f90eb56adc",
    "required": false
  },
  {
    "name": "error",
    "source": "packages/native/src/components/Table/index.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false
  },
  {
    "name": "retryLabel",
    "source": "packages/native/src/components/Table/index.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "columns",
    "source": "packages/native/src/components/Table/index.tsx",
    "kind": "array",
    "typeText": "TableColumn<T>[]",
    "typeRef": "type:2cff1f3e22fb4d90b2bf",
    "required": true
  },
  {
    "name": "data",
    "source": "packages/native/src/components/Table/index.tsx",
    "kind": "array",
    "typeText": "T[]",
    "typeRef": "type:20200e745cc85bc9a314",
    "required": true
  },
  {
    "name": "rowKey",
    "source": "packages/native/src/components/Table/index.tsx",
    "kind": "function",
    "typeText": "((row: T, index: number) => TableRowKey) | undefined",
    "typeRef": "type:c49fcaa99bb35875d0e9",
    "parameters": [
      {
        "name": "row",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "T",
        "typeRef": "type:b3438710ea76e93708b7"
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
      "typeRef": "type:80d8ed2cc879d836162f"
    },
    "required": false
  },
  {
    "name": "emptyText",
    "source": "packages/native/src/components/Table/index.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false
  },
  {
    "name": "loading",
    "source": "packages/native/src/components/Table/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false
  },
  {
    "name": "size",
    "source": "packages/native/src/components/Table/index.tsx",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "\"small\" | \"medium\" | \"large\" | undefined",
    "typeRef": "type:8d5b6882dc615b54818b",
    "default": "medium",
    "required": false
  },
  {
    "name": "variant",
    "source": "packages/native/src/components/Table/index.tsx",
    "kind": "enum",
    "values": [
      "bordered",
      "simple",
      "striped"
    ],
    "typeText": "\"simple\" | \"striped\" | \"bordered\" | undefined",
    "typeRef": "type:73fba31381c2a852323a",
    "default": "simple",
    "required": false
  },
  {
    "name": "scroll",
    "source": "packages/native/src/components/Table/index.tsx",
    "kind": "object",
    "typeText": "{ x?: number | undefined; y?: number | undefined; } | undefined",
    "typeRef": "type:4b0e34acd99bc48f8933",
    "required": false
  },
  {
    "name": "sortState",
    "source": "packages/native/src/components/Table/index.tsx",
    "kind": "object",
    "typeText": "TableSortState | null | undefined",
    "typeRef": "type:c3de4a905353a45f4d22",
    "required": false
  },
  {
    "name": "defaultSortState",
    "source": "packages/native/src/components/Table/index.tsx",
    "kind": "object",
    "typeText": "TableSortState | null | undefined",
    "typeRef": "type:c3de4a905353a45f4d22",
    "default": null,
    "required": false
  },
  {
    "name": "manualSort",
    "source": "packages/native/src/components/Table/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false
  },
  {
    "name": "rowSelection",
    "source": "packages/native/src/components/Table/index.tsx",
    "kind": "object",
    "typeText": "TableRowSelection<T> | undefined",
    "typeRef": "type:f984bb8a4da81b85ba62",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "onRetry",
    "source": "packages/native/src/components/Table/index.tsx",
    "kind": "function",
    "typeText": "(() => void) | undefined",
    "typeRef": "type:578e9bb01824ed41ac21",
    "parameters": [],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  },
  {
    "name": "onSortChange",
    "source": "packages/native/src/components/Table/index.tsx",
    "kind": "function",
    "typeText": "((state: TableSortState) => void) | undefined",
    "typeRef": "type:3bf4aece4c7dfca3c840",
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

## Table

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
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
    "source": "packages/native/src/components/Table/index.tsx",
    "kind": "array",
    "typeText": "TableColumn<T>[]",
    "typeRef": "type:a90743d0b566554d2691",
    "required": true
  },
  {
    "name": "data",
    "source": "packages/native/src/components/Table/index.tsx",
    "kind": "array",
    "typeText": "T[]",
    "typeRef": "type:33e4ae66ef8a36b4c5d4",
    "required": true
  },
  {
    "name": "rowKey",
    "source": "packages/native/src/components/Table/index.tsx",
    "kind": "function",
    "typeText": "((row: T, index: number) => TableRowKey) | undefined",
    "typeRef": "type:50e1334b1722b181c4c0",
    "parameters": [
      {
        "name": "row",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "T",
        "typeRef": "type:565763637d0a2c3cf692"
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
      "typeRef": "type:80d8ed2cc879d836162f"
    },
    "required": false
  },
  {
    "name": "emptyText",
    "source": "packages/native/src/components/Table/index.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false
  },
  {
    "name": "loading",
    "source": "packages/native/src/components/Table/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false
  },
  {
    "name": "size",
    "source": "packages/native/src/components/Table/index.tsx",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "\"small\" | \"medium\" | \"large\" | undefined",
    "typeRef": "type:8d5b6882dc615b54818b",
    "default": "medium",
    "required": false
  },
  {
    "name": "variant",
    "source": "packages/native/src/components/Table/index.tsx",
    "kind": "enum",
    "values": [
      "bordered",
      "simple",
      "striped"
    ],
    "typeText": "\"simple\" | \"striped\" | \"bordered\" | undefined",
    "typeRef": "type:73fba31381c2a852323a",
    "default": "simple",
    "required": false
  },
  {
    "name": "scroll",
    "source": "packages/native/src/components/Table/index.tsx",
    "kind": "object",
    "typeText": "{ x?: number | undefined; y?: number | undefined; } | undefined",
    "typeRef": "type:4b0e34acd99bc48f8933",
    "required": false
  },
  {
    "name": "sortState",
    "source": "packages/native/src/components/Table/index.tsx",
    "kind": "object",
    "typeText": "TableSortState | null | undefined",
    "typeRef": "type:c3de4a905353a45f4d22",
    "required": false
  },
  {
    "name": "defaultSortState",
    "source": "packages/native/src/components/Table/index.tsx",
    "kind": "object",
    "typeText": "TableSortState | null | undefined",
    "typeRef": "type:c3de4a905353a45f4d22",
    "default": null,
    "required": false
  },
  {
    "name": "manualSort",
    "source": "packages/native/src/components/Table/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false
  },
  {
    "name": "rowSelection",
    "source": "packages/native/src/components/Table/index.tsx",
    "kind": "object",
    "typeText": "TableRowSelection<T> | undefined",
    "typeRef": "type:e127c5aed51fb1fe9bbf",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "onSortChange",
    "source": "packages/native/src/components/Table/index.tsx",
    "kind": "function",
    "typeText": "((state: TableSortState) => void) | undefined",
    "typeRef": "type:3bf4aece4c7dfca3c840",
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

## TableBody

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
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

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
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

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
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
    "name": "secondary",
    "source": "packages/native/src/components/Parts/index.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
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

### Import

```json
{
  "specifier": "minerva-design/native",
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

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
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

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "TableRoot"
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

## TableRow

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
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
  "native:TableProps": {
    "source": "native/src/components/Table/index.tsx",
    "kind": "interface",
    "extends": [
      "Omit<ViewProps, \"children\">"
    ],
    "props": [
      {
        "name": "columns",
        "type": "TableColumn<T>[]",
        "required": true
      },
      {
        "name": "data",
        "type": "T[]",
        "required": true
      },
      {
        "name": "rowKey",
        "type": "(row: T, index: number) => TableRowKey",
        "required": false
      },
      {
        "name": "emptyText",
        "type": "ReactNode",
        "required": false
      },
      {
        "name": "loading",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "size",
        "type": "\"small\" | \"medium\" | \"large\"",
        "required": false,
        "default": "\"medium\""
      },
      {
        "name": "variant",
        "type": "\"simple\" | \"striped\" | \"bordered\"",
        "required": false,
        "default": "\"simple\""
      },
      {
        "name": "scroll",
        "type": "{ x?: number; y?: number }",
        "required": false
      },
      {
        "name": "sortState",
        "type": "TableSortState | null",
        "required": false
      },
      {
        "name": "defaultSortState",
        "type": "TableSortState | null",
        "required": false,
        "default": "null"
      },
      {
        "name": "onSortChange",
        "type": "(state: TableSortState) => void",
        "required": false
      },
      {
        "name": "manualSort",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "rowSelection",
        "type": "TableRowSelection<T>",
        "required": false
      }
    ]
  },
  "native:TableCellContentProps": {
    "source": "native/src/components/Parts/index.tsx",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "children",
        "type": "ReactNode",
        "required": false
      },
      {
        "name": "secondary",
        "type": "ReactNode",
        "required": false
      }
    ]
  },
  "native:DataTableProps": {
    "source": "native/src/components/Table/index.tsx",
    "kind": "interface",
    "extends": [
      "TableProps<T>"
    ],
    "props": [
      {
        "name": "pagination",
        "type": "PaginationProps",
        "required": false
      },
      {
        "name": "error",
        "type": "ReactNode",
        "required": false
      },
      {
        "name": "onRetry",
        "type": "() => void",
        "required": false
      },
      {
        "name": "retryLabel",
        "type": "string",
        "required": false
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

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/table/native/basic.tsx

```tsx
import { useState } from "react";
import { Text, View } from "react-native";
import { DataTable } from "minerva-design/native";
export default function Basic() {
  const [selected, setSelected] = useState<readonly string[]>([]);
  return (
    <View>
      <DataTable
        data={[
          { id: "a", name: "Ada", score: 9 },
          { id: "b", name: "Grace", score: 10 },
        ]}
        rowKey={(row) => row.id}
        columns={[
          { key: "name", header: "Name", sortable: true },
          { key: "score", header: "Score", sortable: true },
        ]}
        rowSelection={{ onChange: (keys) => setSelected(keys.map(String)) }}
        pagination={{ total: 2, pageSize: 2 }}
      />
      <Text>Selected: {selected.join(", ")}</Text>
    </View>
  );
}

```
