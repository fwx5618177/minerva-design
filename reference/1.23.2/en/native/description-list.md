# DescriptionList

Labeled metadata fields rendered as a native dl; rows stack on narrow screens.

Package: minerva-design@1.23.2

Renderer: native

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.2",
  "sourceCommit": "c6618fd81b2d3c2a9016cfe13a1d15983d533ff7",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:8f6e89c1e214fedc2e52de014615037c54204a8ec5c0dbb40c58dc530906571e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.2/types.json) or getType() from minerva-design/contracts.

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

## Example: Basic usage

Labels and values accept any ReactNode, and 0 is rendered.

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
