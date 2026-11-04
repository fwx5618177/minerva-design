# DescriptionList 描述列表

以原生 dl 呈现的带标签元数据字段，窄屏下行会堆叠显示。

Package: minerva-design@1.20.3

Renderer: wc

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.3",
  "sourceCommit": "ea7fb3e1f55d184b7d737316e9ae829f4f7ff223",
  "sourceDigest": "sha256:c9540edc3908d226375a01cf5e6bfe8ca6a4e20440f736c0dd9b40ae9ff2e645",
  "referenceSourceDigest": "sha256:4cf6057856184f16240d0d22153ec370842fc7a2dfaaa66364e189fed89e6ca3"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## DescriptionItem

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/description-item",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "label",
    "typeText": "string",
    "attribute": "label",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "The description"
  }
]
```

## DescriptionList

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/description-list",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "bordered",
    "typeText": "boolean",
    "attribute": "bordered",
    "required": false
  },
  {
    "name": "striped",
    "typeText": "boolean",
    "attribute": "striped",
    "required": false
  },
  {
    "name": "items",
    "typeText": "DescriptionListItem[]",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "`<minerva-description-item>` rows"
  }
]
```

## API

```json
{
  "wc:minerva-description-item": {
    "kind": "element",
    "source": "web-components/src/components/description-list/description-list.ts",
    "className": "MinervaDescriptionItem",
    "summary": "Declarative term / description row of a description list.",
    "description": "One declarative row of a `<minerva-description-list>`: the `label` attribute is the term, the content of the element the description. It renders its content as-is; the list places it in the `<dd>` of its row.",
    "properties": [
      {
        "name": "label",
        "attribute": "label",
        "type": "string",
        "default": "\"\"",
        "description": "Term of the row (reflected: the list re-renders when it changes)"
      }
    ],
    "methods": [],
    "events": [],
    "slots": [
      {
        "name": "",
        "description": "The description"
      }
    ],
    "parts": [],
    "cssProperties": [
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
  },
  "wc:minerva-description-list": {
    "kind": "element",
    "source": "web-components/src/components/description-list/description-list.ts",
    "className": "MinervaDescriptionList",
    "summary": "Native description list of labeled fields.",
    "description": "Labeled metadata fields as a native `<dl>` (`<DescriptionList>` of React). Each item is a row (`<div>`) holding one `<dt>` / `<dd>` pair; rows stack on narrow screens. Rows come from the `items` property and / or from `<minerva-description-item label=\"...\">` children (rendered after the `items`). Each child is assigned into the `<dd>` of its row (manual slot assignment), so the native `<dl>` structure is kept.",
    "properties": [
      {
        "name": "bordered",
        "attribute": "bordered",
        "type": "boolean",
        "default": "false",
        "description": "Frames the list as a card (full border, rounded corners, surface background, padded rows)"
      },
      {
        "name": "striped",
        "attribute": "striped",
        "type": "boolean",
        "default": "false",
        "description": "Tints every other row (replaces the row separators)"
      },
      {
        "name": "items",
        "type": "DescriptionListItem[]",
        "default": "[]",
        "description": "Rows rendered before the declarative `<minerva-description-item>` children"
      }
    ],
    "methods": [],
    "events": [],
    "slots": [
      {
        "name": "",
        "description": "`<minerva-description-item>` rows"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The `<dl>`"
      },
      {
        "name": "row",
        "description": "Each row (one term / description pair)"
      },
      {
        "name": "term",
        "description": "Each `<dt>`"
      },
      {
        "name": "description",
        "description": "Each `<dd>`"
      }
    ],
    "cssProperties": [
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

声明式的 <minerva-description-item label> 行；内容（文本、徽章、链接）放入原生 <dl> 的 <dd> 中。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/description-list/wc/basic.html

```html
<minerva-description-list style="max-width: 480px">
  <minerva-description-item label="Customer"
    >Acme Corporation</minerva-description-item
  >
  <minerva-description-item label="Plan"
    >Business, billed yearly</minerva-description-item
  >
  <minerva-description-item label="Status">
    <minerva-badge color="success" badge-role="presentation"
      >Active</minerva-badge
    >
  </minerva-description-item>
  <minerva-description-item label="Owner">
    <minerva-text-link href="mailto:jane@example.com"
      >Jane Cooper</minerva-text-link
    >
  </minerva-description-item>
</minerva-description-list>

```

## Example: 数据驱动的行

items 属性根据 JS 数据渲染行，位于声明式子元素之前；0 也会作为值渲染。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/description-list/wc/items.html

```html
<minerva-description-list id="order" style="max-width: 480px">
  <minerva-description-item label="Notes"
    >Leave the parcel at the reception desk.</minerva-description-item
  >
</minerva-description-list>

```

### apps/docs/src/docs/pages/description-list/wc/items.ts

```tsx
// `items` rows (data from JS) are rendered before the declarative
// <minerva-description-item> children; 0 is rendered as a value.
type Row = { key?: string; label: string; value: string | number };

export function setup(root: HTMLElement) {
  const list = root.querySelector<HTMLElement & { items: Row[] }>("#order")!;
  list.items = [
    { key: "id", label: "Order", value: "#10482" },
    { key: "date", label: "Placed on", value: "March 4, 2026" },
    { key: "total", label: "Total", value: "€129.00" },
    { key: "returns", label: "Returns", value: 0 },
  ];
}

```

## Example: 样式定制

CSS 变量设置密度、间距和分隔线；::part(term) 和 ::part(row) 用于定制原生单元格样式。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/description-list/wc/styling.html

```html
<style>
  .compact-specs::part(term) {
    font-weight: 600;
  }
  .compact-specs::part(row):hover {
    background: var(--primary-color-subtle);
  }
</style>
<minerva-description-list
  class="compact-specs"
  style="
    max-width: 480px;
    --description-list-row-padding-y: 4px;
    --description-list-gap: 24px;
    --description-list-font-size: 0.875rem;
    --description-list-border-color: transparent;
  "
>
  <minerva-description-item label="CPU">8 vCPU</minerva-description-item>
  <minerva-description-item label="Memory">32 GiB</minerva-description-item>
  <minerva-description-item label="Region">eu-west-3</minerva-description-item>
</minerva-description-list>

```

## Example: 带边框与条纹

bordered 与 striped 布尔属性：带内边距行的卡片框，或以隔行着色替代分隔线。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/description-list/wc/variants.html

```html
<div
  style="
    display: grid;
    gap: 24px;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    align-items: start;
  "
>
  <minerva-description-list bordered>
    <minerva-description-item label="Project"
      >minerva-docs</minerva-description-item
    >
    <minerva-description-item label="Region"
      >Frankfurt (fra1)</minerva-description-item
    >
    <minerva-description-item label="Runtime"
      >Node.js 22</minerva-description-item
    >
    <minerva-description-item label="Updated"
      >2 minutes ago</minerva-description-item
    >
  </minerva-description-list>
  <minerva-description-list striped>
    <minerva-description-item label="Project"
      >minerva-docs</minerva-description-item
    >
    <minerva-description-item label="Region"
      >Frankfurt (fra1)</minerva-description-item
    >
    <minerva-description-item label="Runtime"
      >Node.js 22</minerva-description-item
    >
    <minerva-description-item label="Updated"
      >2 minutes ago</minerva-description-item
    >
  </minerva-description-list>
</div>

```
