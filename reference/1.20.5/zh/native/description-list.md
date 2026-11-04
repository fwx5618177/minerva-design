# DescriptionList 描述列表

以原生 dl 呈现的带标签元数据字段，窄屏下行会堆叠显示。

Package: minerva-design@1.20.5

Renderer: native

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:0dc58bd28a1a59067b94630bd49c5b94d839bdc57ee30a0eaa7de1d0a9681cfb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

## Documentation

## DescriptionItem

Support: n/a

No standalone native element: DescriptionList.items accepts { key, label, value } rows and renders each term and description, including numeric zero.

## DescriptionList

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "DescriptionList"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "items",
    "source": "packages/native/src/components/Display/index.tsx",
    "kind": "array",
    "typeText": "DescriptionListItem[]",
    "typeRef": "type:c3bf787b8f67823c5059",
    "required": true
  },
  {
    "name": "bordered",
    "source": "packages/native/src/components/Display/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false
  },
  {
    "name": "striped",
    "source": "packages/native/src/components/Display/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
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
  "native:DescriptionListProps": {
    "source": "native/src/components/Display/index.tsx",
    "kind": "interface",
    "extends": [
      "ViewProps"
    ],
    "props": [
      {
        "name": "items",
        "type": "DescriptionListItem[]",
        "required": true
      },
      {
        "name": "bordered",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "striped",
        "type": "boolean",
        "required": false,
        "default": "false"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:DescriptionList": {
    "kind": "cssVars",
    "source": "react/src/components/DescriptionList",
    "vars": [
      {
        "name": "--description-list-row-padding-y",
        "description": "Vertical padding of a row (follows the density's row padding)"
      },
      {
        "name": "--description-list-gap",
        "description": "Space between the term and the description"
      },
      {
        "name": "--description-list-term-color",
        "description": "Text color of the terms"
      },
      {
        "name": "--description-list-border-color",
        "description": "Color of the row separators"
      },
      {
        "name": "--description-list-font-size",
        "description": "Font size"
      },
      {
        "name": "--description-list-radius",
        "description": "Corner radius of a bordered list (defaults to --radius-lg)"
      },
      {
        "name": "--description-list-background",
        "description": "Background of a bordered list (defaults to --surface-color)"
      },
      {
        "name": "--description-list-padding-x",
        "description": "Horizontal padding of the rows of a bordered or striped list"
      },
      {
        "name": "--description-list-stripe-background",
        "description": "Background of every other row of a striped list (defaults to --surface-subtle-color)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基础用法

标签和值可以是任意 ReactNode，0 也会显示。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/description-list/native/basic.tsx

```tsx
import { DescriptionList } from "minerva-design/native";
export default function Basic() {
  return (
    <DescriptionList
      bordered
      striped
      items={[
        { key: "owner", label: "Owner", value: "Ada" },
        { key: "status", label: "Status", value: "Active" },
      ]}
    />
  );
}

```
