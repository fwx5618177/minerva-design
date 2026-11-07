# DescriptionList 描述列表

以原生 dl 呈现的带标签元数据字段，窄屏下行会堆叠显示。

Package: minerva-design@1.23.0

Renderer: react

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "9a519eee781183dcbac39a62a86bec9e0bd877a9",
  "sourceDigest": "sha256:0d31b0bc3c28394756a1142132ddf7b2beac9f7ce2f5b2253e04712431d7c736",
  "referenceSourceDigest": "sha256:0a033a9f6bc21722c87a78202ae3fce0d891270ea8a01d043a5a748c0439d696"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

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

## Example: 基础用法

标签和值可以是任意 ReactNode，0 也会显示。

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

## Example: 带边框与条纹

bordered 将字段包装为带内边距行的卡片；striped 隔行着色以替代分隔线。

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
