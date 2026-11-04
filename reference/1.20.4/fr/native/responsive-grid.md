# ResponsiveGrid

Grille à colonnes égales dont le nombre suit sa propre largeur (requêtes de conteneur), et non la fenêtre.

Package: minerva-design@1.20.4

Renderer: native

Locale: fr

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

## GridItem

Support: beta

Native GridItem supports fullWidth rows in ResponsiveGrid, asChild layout/press composition, and icon/text shortcuts in Grid; it renders actual native content and optional press actions.

### Import

```json
{
  "specifier": "minerva-design/native",
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
    "source": "packages/native/src/components/Grid/Grid.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Span every column inside ResponsiveGrid or Grid."
  },
  {
    "name": "asChild",
    "source": "packages/native/src/components/Grid/Grid.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Apply layout and press behavior to a single child."
  },
  {
    "name": "icon",
    "source": "packages/native/src/components/Grid/Grid.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Icon (any element)"
  },
  {
    "name": "text",
    "source": "packages/native/src/components/Grid/Grid.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Text under (or next to) the icon"
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/Grid/Grid.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the cell's press"
  }
]
```

### events

```json
[
  {
    "name": "onPress",
    "source": "packages/native/src/components/Grid/Grid.tsx",
    "kind": "function",
    "typeText": "((event: GestureResponderEvent) => void) | undefined",
    "typeRef": "type:0e2d006d81fe888d6442",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "GestureResponderEvent",
        "typeRef": "type:2a25eb9466bc75075bdf"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called on press: the cell becomes a button"
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

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
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
    "name": "columns",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "union",
    "typeText": "ResponsiveGridColumns | undefined",
    "typeRef": "type:1d3e65882e6ca5b766bb",
    "default": 1,
    "required": false
  },
  {
    "name": "gap",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "union",
    "typeText": "BoxSpace | undefined",
    "typeRef": "type:2d45f657fce9c0797c96",
    "default": 4,
    "required": false
  },
  {
    "name": "rowGap",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "union",
    "typeText": "BoxSpace | undefined",
    "typeRef": "type:2d45f657fce9c0797c96",
    "required": false
  },
  {
    "name": "columnGap",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "union",
    "typeText": "BoxSpace | undefined",
    "typeRef": "type:2d45f657fce9c0797c96",
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

## API

```json
{
  "native:ResponsiveGridProps": {
    "source": "native/src/components/Layout/index.tsx",
    "kind": "interface",
    "extends": [
      "ViewProps"
    ],
    "props": [
      {
        "name": "columns",
        "type": "ResponsiveGridColumns",
        "required": false,
        "default": "1"
      },
      {
        "name": "gap",
        "type": "BoxSpace",
        "required": false,
        "default": "4"
      },
      {
        "name": "rowGap",
        "type": "BoxSpace",
        "required": false
      },
      {
        "name": "columnGap",
        "type": "BoxSpace",
        "required": false
      }
    ]
  },
  "native:GridItemProps": {
    "source": "native/src/components/Grid/Grid.tsx",
    "kind": "interface",
    "extends": [
      "Omit<PressableProps, \"children\" | \"style\" | \"disabled\">"
    ],
    "props": [
      {
        "name": "fullWidth",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Span every column inside ResponsiveGrid or Grid."
      },
      {
        "name": "asChild",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Apply layout and press behavior to a single child."
      },
      {
        "name": "icon",
        "type": "ReactNode",
        "required": false,
        "description": "Icon (any element)"
      },
      {
        "name": "text",
        "type": "ReactNode",
        "required": false,
        "description": "Text under (or next to) the icon"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "Custom content, replacing icon and text"
      },
      {
        "name": "onPress",
        "type": "(event: GestureResponderEvent) => void",
        "required": false,
        "description": "Called on press: the cell becomes a button"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the cell's press"
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Style of the cell content"
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

## Example: Colonnes adaptatives

columns accepte des nombres base / sm / md / lg pour 0, 480, 768 et 1200px de largeur disponible.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/responsive-grid/native/basic.tsx

```tsx
import { useState } from "react";
import { ResponsiveGrid, GridItem, Button } from "minerva-design/native";
export default function Basic() {
  const [count, setCount] = useState(0);
  return (
    <ResponsiveGrid columns={{ base: 1, sm: 2 }} gap={3}>
      <GridItem text="Project A" />
      <GridItem text="Project B" />
      <GridItem fullWidth text="Spans the complete row" />
      <GridItem fullWidth asChild>
        <Button onPress={() => setCount((value) => value + 1)}>
          {`Slotted full row: ${count}`}
        </Button>
      </GridItem>
    </ResponsiveGrid>
  );
}

```
