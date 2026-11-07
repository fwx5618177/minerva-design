# SplitLayout

Main content with an optional aside that splits beside it once the layout's own width reaches a breakpoint.

Package: minerva-design@1.22.1

Renderer: native

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.1",
  "sourceCommit": "a07dc9a260690841cc0eea98acdc24ac32032a2c",
  "sourceDigest": "sha256:cbdfa6292d29dec33adda7a3e9cf0e027da50858956b8d08e3f7f3ed59c8d78a",
  "referenceSourceDigest": "sha256:6d534260f2c14247d5360acc167a35134052fa342938ee2bdd089ae303d95f7c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## SplitLayout

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
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
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": true
  },
  {
    "name": "asideWidth",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 320,
    "required": false
  },
  {
    "name": "collapseBelow",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "enum",
    "values": [
      "lg",
      "md"
    ],
    "typeText": "\"md\" | \"lg\" | undefined",
    "typeRef": "type:51c9861044412391667e",
    "default": "md",
    "required": false
  },
  {
    "name": "gap",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "union",
    "typeText": "BoxSpace | undefined",
    "typeRef": "type:2d45f657fce9c0797c96",
    "default": 6,
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
  "native:SplitLayoutProps": {
    "source": "native/src/components/Layout/index.tsx",
    "kind": "interface",
    "extends": [
      "ViewProps"
    ],
    "props": [
      {
        "name": "aside",
        "type": "ReactNode",
        "required": true
      },
      {
        "name": "asideWidth",
        "type": "number",
        "required": false,
        "default": "320"
      },
      {
        "name": "collapseBelow",
        "type": "\"md\" | \"lg\"",
        "required": false,
        "default": "\"md\""
      },
      {
        "name": "gap",
        "type": "BoxSpace",
        "required": false,
        "default": "6"
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

External dependencies: minerva-design, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/split-layout/native/basic.tsx

```tsx
import { Text } from "react-native";
import { SplitLayout } from "minerva-design/native";
export default function Basic() {
  return (
    <SplitLayout aside={<Text>Related information</Text>} asideWidth={160}>
      <Text>
        Main content. The aside stacks beneath this content on narrow screens.
      </Text>
    </SplitLayout>
  );
}

```
