# SplitLayout 分栏布局

主内容加可选侧栏，布局自身宽度达到断点后并排显示。

Package: minerva-design@1.23.0

Renderer: native

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "19d3efc34af8ba4e23df0f24d9fbb0a587e1b452",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:ec29900df0d5b5c8d741436acb4a250ec29e5f40ce1f4110def33ac2d66baaa5"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

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

## Example: 基础用法

320px 侧栏在容器宽度 768px 时并排、以下时堆叠；主内容始终在 DOM 顺序中靠前。

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
