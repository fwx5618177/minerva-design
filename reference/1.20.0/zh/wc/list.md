# List 列表

基于原生 ul / li 的简洁操作列表，包含主次文本、装饰图标和尾部操作。

Package: minerva-design@1.20.0

Renderer: wc

Locale: zh

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

## Cell

Support: n/a

Mobile component of minerva-design/native (React Native); on the web use the responsive web components.

## CellGroup

Support: n/a

Mobile component of minerva-design/native (React Native); on the web use the responsive web components.

## List

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/list",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "density",
    "typeText": "\"default\" | \"compact\" | \"comfortable\"",
    "attribute": "density",
    "required": false
  },
  {
    "name": "bordered",
    "typeText": "boolean",
    "attribute": "bordered",
    "required": false
  },
  {
    "name": "noDividers",
    "typeText": "boolean",
    "attribute": "no-dividers",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "`<minerva-list-item>` rows"
  }
]
```

## ListItem

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/list-item",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "primary",
    "typeText": "string",
    "attribute": "primary",
    "required": false
  },
  {
    "name": "secondary",
    "typeText": "string",
    "attribute": "secondary",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "Primary content (alternative to the `primary` attribute)"
  },
  {
    "name": "secondary",
    "description": "Supporting content (alternative to the `secondary` attribute)"
  },
  {
    "name": "icon",
    "description": "Decorative leading icon (hidden from assistive technologies)"
  },
  {
    "name": "actions",
    "description": "Trailing controls"
  }
]
```

## API

```json
{
  "wc:minerva-list": {
    "kind": "element",
    "source": "web-components/src/components/list/list.ts",
    "className": "MinervaList",
    "summary": "Operational list of rows with optional dividers.",
    "description": "A quiet operational list (`<List>` of React): `role=\"list\"` on the host, rows are `<minerva-list-item>` elements (`role=\"listitem\"`). Density and dividers are applied to the items from the list (dividers between adjacent items, a shorter row in `compact` density).",
    "properties": [
      {
        "name": "density",
        "attribute": "density",
        "type": "\"default\" | \"compact\" | \"comfortable\"",
        "default": "\"default\"",
        "description": "Minimum row height and vertical padding of the items"
      },
      {
        "name": "bordered",
        "attribute": "bordered",
        "type": "boolean",
        "default": "false",
        "description": "Frames the list as a card (full border, rounded corners) whose rows are tinted on hover / focus-within"
      },
      {
        "name": "noDividers",
        "attribute": "no-dividers",
        "type": "boolean",
        "default": "false",
        "description": "Removes the separators between items (the React library's `dividers={false}`)"
      }
    ],
    "methods": [],
    "events": [],
    "slots": [
      {
        "name": "",
        "description": "`<minerva-list-item>` rows"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The list (React: the <ul>; web components: its wrapper)"
      }
    ],
    "cssProperties": [
      {
        "name": "--list-item-min-height",
        "description": "Minimum height of an item (follows the density; compact lists are shorter)"
      },
      {
        "name": "--list-item-padding-y",
        "description": "Vertical padding of an item (follows the density's row padding)"
      },
      {
        "name": "--list-item-padding-x",
        "description": "Horizontal padding of an item (follows the density's row padding)"
      },
      {
        "name": "--list-item-gap",
        "description": "Space between the icon, the content and the actions"
      },
      {
        "name": "--list-divider-color",
        "description": "Color of the dividers between items"
      },
      {
        "name": "--list-icon-size",
        "description": "Size of the leading icon slot"
      },
      {
        "name": "--list-border-color",
        "description": "Border color of a bordered list (defaults to --border-color)"
      },
      {
        "name": "--list-radius",
        "description": "Corner radius of a bordered list (defaults to --radius-lg)"
      },
      {
        "name": "--list-background",
        "description": "Background of a bordered list (defaults to --surface-color)"
      },
      {
        "name": "--list-item-hover-background",
        "description": "Background of a row of a bordered list on hover / while a control inside it has the focus"
      }
    ]
  },
  "wc:minerva-list-item": {
    "kind": "element",
    "source": "web-components/src/components/list/list.ts",
    "className": "MinervaListItem",
    "summary": "Row of a list with text, icon and actions.",
    "description": "One row of a `<minerva-list>` (`<ListItem>` of React): primary / secondary text, a decorative leading icon and trailing actions. It adds no selection state, tab stop or row command (`role=\"listitem\"` on the host).",
    "properties": [
      {
        "name": "primary",
        "attribute": "primary",
        "type": "string",
        "default": "\"\"",
        "description": "Main content (medium weight); or use the default slot"
      },
      {
        "name": "secondary",
        "attribute": "secondary",
        "type": "string",
        "default": "\"\"",
        "description": "Supporting content (muted, smaller); or use the `secondary` slot"
      }
    ],
    "methods": [],
    "events": [],
    "slots": [
      {
        "name": "",
        "description": "Primary content (alternative to the `primary` attribute)"
      },
      {
        "name": "secondary",
        "description": "Supporting content (alternative to the `secondary` attribute)"
      },
      {
        "name": "icon",
        "description": "Decorative leading icon (hidden from assistive technologies)"
      },
      {
        "name": "actions",
        "description": "Trailing controls"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The row"
      },
      {
        "name": "icon",
        "description": "The decorative leading icon wrapper"
      },
      {
        "name": "label",
        "description": "The primary text"
      },
      {
        "name": "description",
        "description": "The secondary text"
      },
      {
        "name": "actions",
        "description": "The trailing actions wrapper"
      }
    ],
    "cssProperties": [
      {
        "name": "--list-item-min-height",
        "description": "Minimum height of an item (follows the density; compact lists are shorter)"
      },
      {
        "name": "--list-item-padding-y",
        "description": "Vertical padding of an item (follows the density's row padding)"
      },
      {
        "name": "--list-item-padding-x",
        "description": "Horizontal padding of an item (follows the density's row padding)"
      },
      {
        "name": "--list-item-gap",
        "description": "Space between the icon, the content and the actions"
      },
      {
        "name": "--list-divider-color",
        "description": "Color of the dividers between items"
      },
      {
        "name": "--list-icon-size",
        "description": "Size of the leading icon slot"
      },
      {
        "name": "--list-border-color",
        "description": "Border color of a bordered list (defaults to --border-color)"
      },
      {
        "name": "--list-radius",
        "description": "Corner radius of a bordered list (defaults to --radius-lg)"
      },
      {
        "name": "--list-background",
        "description": "Background of a bordered list (defaults to --surface-color)"
      },
      {
        "name": "--list-item-hover-background",
        "description": "Background of a row of a bordered list on hover / while a control inside it has the focus"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:List": {
    "kind": "cssVars",
    "source": "react/src/components/List",
    "vars": [
      {
        "name": "--list-item-min-height",
        "description": "Minimum height of an item (follows the density; compact lists are shorter)"
      },
      {
        "name": "--list-item-padding-y",
        "description": "Vertical padding of an item (follows the density's row padding)"
      },
      {
        "name": "--list-item-padding-x",
        "description": "Horizontal padding of an item (follows the density's row padding)"
      },
      {
        "name": "--list-item-gap",
        "description": "Space between the icon, the content and the actions"
      },
      {
        "name": "--list-divider-color",
        "description": "Color of the dividers between items"
      },
      {
        "name": "--list-icon-size",
        "description": "Size of the leading icon slot"
      },
      {
        "name": "--list-border-color",
        "description": "Border color of a bordered list (defaults to --border-color)"
      },
      {
        "name": "--list-radius",
        "description": "Corner radius of a bordered list (defaults to --radius-lg)"
      },
      {
        "name": "--list-background",
        "description": "Background of a bordered list (defaults to --surface-color)"
      },
      {
        "name": "--list-item-hover-background",
        "description": "Background of a row of a bordered list on hover / while a control inside it has the focus"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基础用法

使用 primary 和 secondary 属性的 <minerva-list-item> 行；相邻项之间有分隔线。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/list/wc/basic.html

```html
<minerva-list style="max-width: 420px">
  <minerva-list-item
    primary="Billing service"
    secondary="Deployed 2 hours ago"
  ></minerva-list-item>
  <minerva-list-item
    primary="Search indexer"
    secondary="Deployed yesterday"
  ></minerva-list-item>
  <minerva-list-item
    primary="Notifications"
    secondary="Deployed last week"
  ></minerva-list-item>
</minerva-list>

```

## Example: 带边框卡片

bordered 属性将列表包装为卡片（行在悬停 / 获得焦点时着色）；density="comfortable" 让行更高。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/list/wc/bordered.html

```html
<minerva-list
  bordered
  density="comfortable"
  aria-label="Branches"
  style="max-width: 560px"
>
  <minerva-list-item primary="main" secondary="Production · deployed 3 min ago">
    <minerva-button slot="actions" size="small" variant="outline"
      >Visit</minerva-button
    >
  </minerva-list-item>
  <minerva-list-item
    primary="feat/checkout"
    secondary="Preview · 2 commits ahead"
  >
    <minerva-button slot="actions" size="small" variant="outline"
      >Visit</minerva-button
    >
  </minerva-list-item>
  <minerva-list-item primary="docs/install" secondary="Preview · building">
    <minerva-button slot="actions" size="small" variant="outline"
      >Visit</minerva-button
    >
  </minerva-list-item>
</minerva-list>

```

## Example: 密度与分隔线

density="compact" 缩短行高，no-dividers 移除分隔线，CSS 变量可调整颜色和内边距。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/list/wc/density.html

```html
<div
  style="
    display: grid;
    gap: 24px;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  "
>
  <minerva-list density="compact" aria-label="Compact list">
    <minerva-list-item primary="Compact density"></minerva-list-item>
    <minerva-list-item primary="Shorter rows"></minerva-list-item>
    <minerva-list-item primary="Same dividers"></minerva-list-item>
  </minerva-list>
  <minerva-list no-dividers aria-label="List without dividers">
    <minerva-list-item primary="No dividers"></minerva-list-item>
    <minerva-list-item primary="Default density"></minerva-list-item>
    <minerva-list-item primary="Quiet grouping"></minerva-list-item>
  </minerva-list>
  <minerva-list
    aria-label="Customized list"
    style="
      --list-divider-color: var(--primary-color);
      --list-item-padding-x: 12px;
    "
  >
    <minerva-list-item primary="CSS variables"></minerva-list-item>
    <minerva-list-item primary="Divider color"></minerva-list-item>
    <minerva-list-item primary="Horizontal padding"></minerva-list-item>
  </minerva-list>
</div>

```

## Example: 图标、富文本与操作

icon、默认、secondary 和 actions 插槽。行本身不带命令：Remove 是 actions 插槽中的普通按钮。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/list/wc/slots.html

```html
<minerva-list id="members" style="max-width: 460px">
  <minerva-list-item>
    <span slot="icon">👩‍💼</span>
    Jane Cooper
    <span slot="secondary">Owner · <em>jane@example.com</em></span>
    <minerva-button slot="actions" size="small" variant="ghost" color="danger"
      >Remove</minerva-button
    >
  </minerva-list-item>
  <minerva-list-item>
    <span slot="icon">🧑‍💻</span>
    Wade Warren
    <span slot="secondary">Developer · <em>wade@example.com</em></span>
    <minerva-button slot="actions" size="small" variant="ghost" color="danger"
      >Remove</minerva-button
    >
  </minerva-list-item>
  <minerva-list-item>
    <span slot="icon">🎨</span>
    Esther Howard
    <span slot="secondary">Designer · <em>esther@example.com</em></span>
    <minerva-button slot="actions" size="small" variant="ghost" color="danger"
      >Remove</minerva-button
    >
  </minerva-list-item>
</minerva-list>

```

### apps/docs/src/docs/pages/list/wc/slots.ts

```tsx
// The list adds no row command: actions are regular controls in the
// `actions` slot. Dividers follow the remaining rows.
export function setup(root: HTMLElement) {
  const list = root.querySelector<HTMLElement>("#members")!;
  const onClick = (event: MouseEvent) => {
    const button = (event.target as Element).closest('[slot="actions"]');
    button?.closest("minerva-list-item")?.remove();
  };
  list.addEventListener("click", onClick);
  return () => list.removeEventListener("click", onClick);
}

```
