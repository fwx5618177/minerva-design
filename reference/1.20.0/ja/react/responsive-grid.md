# ResponsiveGrid レスポンシブグリッド

列数がビューポートではなく自身の幅（コンテナクエリ）に従う等幅カラムのグリッド。

Package: minerva-design@1.20.0

Renderer: react

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.0",
  "sourceCommit": "e5692a82f25163efee65ef771fb64a94e61cb359",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:07db3eb36ff2e4b5bb88e238b04c82819862c70d739534f627e7b6c73c0c6ef1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## GridItem

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "GridItem"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "fullWidth",
    "source": "packages/react/src/components/ResponsiveGrid/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Spans the full row of the surrounding grid"
  },
  {
    "name": "asChild",
    "source": "packages/react/src/components/ResponsiveGrid/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Merges the item props, classes and ref into its single child instead of rendering a wrapper div"
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

## ResponsiveGrid

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "ResponsiveGrid"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "as",
    "source": "packages/react/src/components/ResponsiveGrid/types.ts",
    "kind": "union",
    "typeText": "ElementType | undefined",
    "typeRef": "type:a576b79e37ed7758f7d3",
    "parameters": [
      {
        "name": "props",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "any",
        "typeRef": "type:60147dc54bd779d71e81"
      }
    ],
    "returnType": {
      "typeText": "ReactNode | Promise<ReactNode>",
      "typeRef": "type:e41c0ac1000472a34131"
    },
    "default": "div",
    "required": false,
    "description": "Element or component rendered as the outer container (div, section, nav...)"
  },
  {
    "name": "columns",
    "source": "packages/react/src/components/ResponsiveGrid/types.ts",
    "kind": "union",
    "typeText": "ResponsiveGridColumns | undefined",
    "typeRef": "type:6c395485ef74adec8007",
    "default": 1,
    "required": false,
    "description": "Column counts, responding to the grid's own width (container queries): a number, or `{ base, sm, md, lg }` (480 / 768 / 1200px). Integers 1-12; other values throw a RangeError."
  },
  {
    "name": "gap",
    "source": "packages/react/src/components/ResponsiveGrid/types.ts",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": 4,
    "required": false,
    "description": "Gap between rows and columns: numbers and numeric strings select spacing tokens, other strings are CSS values"
  },
  {
    "name": "rowGap",
    "source": "packages/react/src/components/ResponsiveGrid/types.ts",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "required": false,
    "description": "Gap between rows; defaults to `gap`"
  },
  {
    "name": "columnGap",
    "source": "packages/react/src/components/ResponsiveGrid/types.ts",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "required": false,
    "description": "Gap between columns; defaults to `gap`"
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

## API

```json
{
  "ResponsiveGridProps": {
    "source": "react/src/components/ResponsiveGrid/types.ts",
    "kind": "interface",
    "extends": [
      "HTMLAttributes<HTMLElement>"
    ],
    "props": [
      {
        "name": "ref",
        "type": "Ref<HTMLElement>",
        "required": false,
        "description": "Ref to the outer (query container) element"
      },
      {
        "name": "as",
        "type": "ElementType",
        "required": false,
        "default": "\"div\"",
        "description": "Element or component rendered as the outer container (div, section, nav...)"
      },
      {
        "name": "columns",
        "type": "ResponsiveGridColumns",
        "required": false,
        "default": "1",
        "description": "Column counts, responding to the grid's own width (container queries): a number, or `{ base, sm, md, lg }` (480 / 768 / 1200px). Integers 1-12; other values throw a RangeError."
      },
      {
        "name": "gap",
        "type": "string | number",
        "required": false,
        "default": "4",
        "description": "Gap between rows and columns: numbers and numeric strings select spacing tokens, other strings are CSS values"
      },
      {
        "name": "rowGap",
        "type": "string | number",
        "required": false,
        "description": "Gap between rows; defaults to `gap`"
      },
      {
        "name": "columnGap",
        "type": "string | number",
        "required": false,
        "description": "Gap between columns; defaults to `gap`"
      }
    ]
  },
  "GridItemProps": {
    "source": "react/src/components/ResponsiveGrid/types.ts",
    "kind": "interface",
    "extends": [
      "HTMLAttributes<HTMLDivElement>"
    ],
    "props": [
      {
        "name": "ref",
        "type": "Ref<HTMLDivElement>",
        "required": false,
        "description": "Ref to the item element (or to the slotted child with `asChild`)"
      },
      {
        "name": "fullWidth",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Spans the full row of the surrounding grid"
      },
      {
        "name": "asChild",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Merges the item props, classes and ref into its single child instead of rendering a wrapper div"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:ResponsiveGrid": {
    "kind": "cssVars",
    "source": "react/src/components/ResponsiveGrid",
    "vars": [
      {
        "name": "--responsive-grid-align-items",
        "description": "Vertical alignment of the items in their row (default: stretch)"
      },
      {
        "name": "--responsive-grid-justify-items",
        "description": "Horizontal alignment of the items in their column (default: stretch)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: レスポンシブな列

columns は利用可能幅 0・480・768・1200px に対応する base / sm / md / lg の列数を受け付けます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/responsive-grid/demos/basic.tsx

```tsx
import { Box, ResponsiveGrid } from "minerva-design";

export default function BasicDemo() {
  return (
    <ResponsiveGrid columns={{ base: 1, sm: 2, md: 4 }} gap={3}>
      {["One", "Two", "Three", "Four"].map((label) => (
        <Box key={label} p={4} bg="bg.subtle" rounded="md">
          {label}
        </Box>
      ))}
    </ResponsiveGrid>
  );
}

```

## Example: 全幅アイテム

GridItem の fullWidth は行全体にまたがります。rowGap と columnGap は独立しています。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/responsive-grid/demos/full-width.tsx

```tsx
import { Box, GridItem, ResponsiveGrid } from "minerva-design";

export default function FullWidthDemo() {
  return (
    <ResponsiveGrid columns={{ base: 1, sm: 2 }} rowGap={2} columnGap={4}>
      <Box p={3} bg="bg.subtle" rounded="md">
        Title
      </Box>
      <Box p={3} bg="bg.subtle" rounded="md">
        Author
      </Box>
      <GridItem fullWidth>
        <Box p={3} bg="bg.muted" rounded="md">
          Description spans the whole row
        </Box>
      </GridItem>
    </ResponsiveGrid>
  );
}

```
