# DescriptionList 説明リスト

ネイティブの dl で描画するラベル付きメタデータ。狭い画面では行が縦に並びます。

Package: minerva-design@1.21.0

Renderer: react

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "cf7fb249651cd06c89d0951ac2c3a3aa74dc835a",
  "sourceDigest": "sha256:e0f51a94cc5272baf2775327d83ba025ee09228cfc17f4d529188b1653c78892",
  "referenceSourceDigest": "sha256:563c9bec5d90807342a94c02317519b3da937907129bda2d25ea49762fa828fd"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## DescriptionItem

Support: n/a

Data object in React: an item of the parent component's items / entries prop.

## DescriptionList

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
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
    "source": "packages/react/src/components/DescriptionList/types.ts",
    "kind": "array",
    "typeText": "DescriptionListItem[]",
    "typeRef": "type:84d2ff01660982d6afed",
    "required": true,
    "description": "Rows to render, in order"
  },
  {
    "name": "bordered",
    "source": "packages/react/src/components/DescriptionList/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Frames the list as a card (full border, rounded corners, surface background, padded rows)"
  },
  {
    "name": "striped",
    "source": "packages/react/src/components/DescriptionList/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Tints every other row (replaces the row separators)"
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
  "DescriptionListProps": {
    "source": "react/src/components/DescriptionList/types.ts",
    "kind": "interface",
    "extends": [
      "HTMLAttributes<HTMLDListElement>"
    ],
    "props": [
      {
        "name": "items",
        "type": "DescriptionListItem[]",
        "required": true,
        "description": "Rows to render, in order"
      },
      {
        "name": "bordered",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Frames the list as a card (full border, rounded corners, surface background, padded rows)"
      },
      {
        "name": "striped",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Tints every other row (replaces the row separators)"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLDListElement>",
        "required": false,
        "description": "Ref to the <dl> element"
      }
    ]
  },
  "DescriptionListItem": {
    "source": "react/src/components/DescriptionList/types.ts",
    "description": "One term / description pair of a DescriptionList",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "key",
        "type": "string",
        "required": true,
        "description": "Stable React key of the row"
      },
      {
        "name": "label",
        "type": "React.ReactNode",
        "required": true,
        "description": "Term, rendered in a <dt>"
      },
      {
        "name": "value",
        "type": "React.ReactNode",
        "required": true,
        "description": "Description, rendered in a <dd> (0 is rendered)"
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

## Example: 基本的な使い方

ラベルと値には任意の ReactNode を使え、0 も表示されます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/description-list/demos/basic.tsx

```tsx
import { DescriptionList } from "minerva-design";

export default function BasicDemo() {
  return (
    <DescriptionList
      aria-label="Account"
      items={[
        { key: "name", label: "Display name", value: "Lu Xun" },
        {
          key: "id",
          label: "Account ID",
          value: <code>12345678-1234-4234-8234-123456789012</code>,
        },
        { key: "keys", label: "Passkeys", value: 0 },
      ]}
    />
  );
}

```

## Example: 枠付きとストライプ

bordered は項目をパディング付きの行を持つカードとして囲み、striped は区切り線の代わりに 1 行おきに色付けします。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/description-list/demos/variants.tsx

```tsx
import { DescriptionList } from "minerva-design";

const items = [
  { key: "project", label: "Project", value: "minerva-docs" },
  { key: "region", label: "Region", value: "Frankfurt (fra1)" },
  { key: "runtime", label: "Runtime", value: "Node.js 22" },
  { key: "updated", label: "Updated", value: "2 minutes ago" },
];

export default function VariantsDemo() {
  return (
    <div
      style={{
        display: "grid",
        gap: 24,
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        alignItems: "start",
      }}
    >
      <DescriptionList bordered items={items} />
      <DescriptionList striped items={items} />
    </div>
  );
}

```
