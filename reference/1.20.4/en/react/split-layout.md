# SplitLayout

Main content with an optional aside that splits beside it once the layout's own width reaches a breakpoint.

Package: minerva-design@1.20.4

Renderer: react

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

## SplitLayout

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "SplitLayout"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "aside",
    "source": "packages/react/src/components/SplitLayout/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": true,
    "description": "Secondary content rendered after the main slot. `null`, `undefined` and `false` omit the slot (single full-width column); `0` is valid content."
  },
  {
    "name": "asideWidth",
    "source": "packages/react/src/components/SplitLayout/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 320,
    "required": false,
    "description": "Requested aside width in pixels in split mode (the track is `min(asideWidth, 50%)`); must be finite and positive, otherwise a RangeError is thrown"
  },
  {
    "name": "collapseBelow",
    "source": "packages/react/src/components/SplitLayout/types.ts",
    "kind": "enum",
    "values": [
      "lg",
      "md"
    ],
    "typeText": "SplitLayoutCollapseBelow | undefined",
    "typeRef": "type:704c2e6478f7f6a00876",
    "default": "md",
    "required": false,
    "description": "Splits at container widths of at least 768px (`md`) or 1200px (`lg`) and stacks below"
  },
  {
    "name": "gap",
    "source": "packages/react/src/components/SplitLayout/types.ts",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": 6,
    "required": false,
    "description": "Gap between the slots: numbers and numeric strings select spacing tokens, other strings are CSS values"
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
  "SplitLayoutProps": {
    "source": "react/src/components/SplitLayout/types.ts",
    "kind": "interface",
    "extends": [
      "HTMLAttributes<HTMLDivElement>"
    ],
    "props": [
      {
        "name": "ref",
        "type": "Ref<HTMLDivElement>",
        "required": false,
        "description": "Ref to the outer div"
      },
      {
        "name": "aside",
        "type": "ReactNode",
        "required": true,
        "description": "Secondary content rendered after the main slot. `null`, `undefined` and `false` omit the slot (single full-width column); `0` is valid content."
      },
      {
        "name": "asideWidth",
        "type": "number",
        "required": false,
        "default": "320",
        "description": "Requested aside width in pixels in split mode (the track is `min(asideWidth, 50%)`); must be finite and positive, otherwise a RangeError is thrown"
      },
      {
        "name": "collapseBelow",
        "type": "SplitLayoutCollapseBelow",
        "required": false,
        "default": "\"md\"",
        "description": "Splits at container widths of at least 768px (`md`) or 1200px (`lg`) and stacks below"
      },
      {
        "name": "gap",
        "type": "string | number",
        "required": false,
        "default": "6",
        "description": "Gap between the slots: numbers and numeric strings select spacing tokens, other strings are CSS values"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:SplitLayout": {
    "kind": "cssVars",
    "source": "react/src/components/SplitLayout",
    "vars": [
      {
        "name": "--split-layout-align-items",
        "description": "Vertical alignment of the main and aside columns (default: start)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Basic usage

A 320px aside splits at 768px of container width and stacks below; main stays first in DOM order.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/split-layout/demos/basic.tsx

```tsx
import { Box, SplitLayout } from "minerva-design";

export default function BasicDemo() {
  return (
    <SplitLayout
      aside={
        <Box
          as="section"
          aria-label="Properties"
          p={4}
          bg="bg.muted"
          rounded="md"
        >
          Properties
        </Box>
      }
    >
      <Box as="section" aria-label="Content" p={4} bg="bg.subtle" rounded="md">
        Main content comes first in reading order.
      </Box>
    </SplitLayout>
  );
}

```

## Example: Width, breakpoint and gap

asideWidth, collapseBelow="lg" (1200px) and gap customize the split.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/split-layout/demos/options.tsx

```tsx
import { Box, SplitLayout } from "minerva-design";

export default function OptionsDemo() {
  return (
    <SplitLayout
      asideWidth={200}
      collapseBelow="lg"
      gap={3}
      aside={
        <Box p={4} bg="bg.muted" rounded="md">
          200px aside
        </Box>
      }
    >
      <Box p={4} bg="bg.subtle" rounded="md">
        Splits only when the layout is at least 1200px wide.
      </Box>
    </SplitLayout>
  );
}

```
