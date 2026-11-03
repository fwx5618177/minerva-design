# NavTree ナビゲーションツリー

セクション、展開できる分岐、アクティブ項目、アイコンのみのコンパクトモードを備えたサイドバーナビゲーションです。矢印キーで項目間を移動し、分岐を開閉できます。

Package: minerva-design@1.19.3

Renderer: wc

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "1b65455cccbdd71bb609d7d859b1ef90f9e604c6",
  "sourceDigest": "sha256:a8b34eea01e9133306bb1fde48e7966deaaaa35d87c2dfd2e181d891c65e01c1",
  "referenceSourceDigest": "sha256:d3ed05a4228bc39ff766871c13b5ba292792f934f6ebc3d0d29af28589be129c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## NavTree

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/nav-tree",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "activeId",
    "typeText": "string | undefined",
    "attribute": "active-id",
    "required": false
  },
  {
    "name": "collapsed",
    "typeText": "boolean",
    "attribute": "collapsed",
    "required": false
  },
  {
    "name": "wrapLabels",
    "typeText": "boolean",
    "attribute": "wrap-labels",
    "required": false
  },
  {
    "name": "sections",
    "typeText": "NavTreeSection[]",
    "required": false
  },
  {
    "name": "expandedIds",
    "typeText": "string[]",
    "required": false
  },
  {
    "name": "renderLink",
    "typeText": "(item: NavTreeItem, content: TemplateResult, state: NavTreeItemState) => TemplateResult | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-select",
    "typeText": "CustomEvent<NavTreeSelectDetail>",
    "detailType": {
      "typeText": "NavTreeSelectDetail",
      "typeRef": "type:4954f5590962b8d8316b"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": true,
    "description": "A leaf link / action or a branch was activated (`detail: { value, item }`); cancelable: `preventDefault()` also prevents the link navigation (client-side routing)"
  },
  {
    "name": "minerva-expanded-change",
    "typeText": "CustomEvent<NavTreeExpandedChangeDetail>",
    "detailType": {
      "typeText": "NavTreeExpandedChangeDetail",
      "typeRef": "type:31b2ed28c8fb78906e44"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": true,
    "description": "A branch was expanded / collapsed by the user (`detail: { expandedIds, item, expanded }`); cancelable: `preventDefault()` keeps the current state"
  }
]
```

## API

```json
{
  "wc:minerva-nav-tree": {
    "kind": "element",
    "source": "web-components/src/components/nav-tree/nav-tree.ts",
    "className": "MinervaNavTree",
    "summary": "Sidebar navigation tree with sections, expandable branches and a compact mode.",
    "description": "Sidebar navigation (`<NavTree>` of React) with sections, nested expandable branches, an active item and a compact (icon-only) mode. Data comes from the `sections` property. Disclosure navigation like React: every item is a link / button in the Tab sequence and branches are buttons with `aria-expanded`. ArrowDown / ArrowUp / Home / End move between the visible items, ArrowRight expands a branch (or enters it when expanded), ArrowLeft collapses a branch or moves to its parent (swapped in RTL), and typing a character moves to the next visible item starting with it (core typeahead).",
    "properties": [
      {
        "name": "activeId",
        "attribute": "active-id",
        "type": "string | undefined",
        "description": "Id of the active (current page) item; its ancestors expand"
      },
      {
        "name": "collapsed",
        "attribute": "collapsed",
        "type": "boolean",
        "default": "false",
        "description": "Compact mode: icons only (labels, trailing content and children hidden)"
      },
      {
        "name": "wrapLabels",
        "attribute": "wrap-labels",
        "type": "boolean",
        "default": "false",
        "description": "Wraps long labels and descriptions instead of truncating them"
      },
      {
        "name": "sections",
        "type": "NavTreeSection[]",
        "default": "[]",
        "description": "Sections of items"
      },
      {
        "name": "expandedIds",
        "type": "string[]",
        "default": "[]",
        "description": "Expanded branch ids"
      },
      {
        "name": "renderLink",
        "type": "(item: NavTreeItem, content: TemplateResult, state: NavTreeItemState) => TemplateResult | undefined",
        "description": "Custom rendering of leaf links (e.g. router links). Render `content` inside and put `state.className` on the link"
      }
    ],
    "methods": [],
    "events": [
      {
        "name": "minerva-select",
        "description": "A leaf link / action or a branch was activated (`detail: { value, item }`); cancelable: `preventDefault()` also prevents the link navigation (client-side routing)"
      },
      {
        "name": "minerva-expanded-change",
        "description": "A branch was expanded / collapsed by the user (`detail: { expandedIds, item, expanded }`); cancelable: `preventDefault()` keeps the current state"
      }
    ],
    "slots": [],
    "parts": [
      {
        "name": "root",
        "description": "The `<nav>` landmark"
      },
      {
        "name": "group",
        "description": "A section of items"
      },
      {
        "name": "group-label",
        "description": "The title of a section"
      },
      {
        "name": "item",
        "description": "A link / button row (aria-current=page when active, aria-expanded on branches; not rendered by renderLink)"
      },
      {
        "name": "item--current",
        "description": "Item state of `item`: current"
      },
      {
        "name": "item--expanded",
        "description": "Item state of `item`: expanded"
      },
      {
        "name": "item--disabled",
        "description": "Item state of `item`: disabled"
      },
      {
        "name": "icon",
        "description": "The icon of an item"
      },
      {
        "name": "label",
        "description": "The label of an item"
      },
      {
        "name": "description",
        "description": "The secondary text of an item"
      }
    ],
    "cssProperties": [
      {
        "name": "--nav-tree-gap",
        "description": "Space between the sections"
      },
      {
        "name": "--nav-tree-item-height",
        "description": "Minimum height of a top-level row (defaults to the density's control height)"
      },
      {
        "name": "--nav-tree-item-padding-x",
        "description": "Horizontal padding of a row (follows the density's row padding)"
      },
      {
        "name": "--nav-tree-item-radius",
        "description": "Corner radius of a row (defaults to --radius-md)"
      },
      {
        "name": "--nav-tree-indent",
        "description": "Indentation of nested rows"
      },
      {
        "name": "--nav-tree-active-background",
        "description": "Background of the active row"
      },
      {
        "name": "--nav-tree-active-color",
        "description": "Accent color of the active row's icon"
      },
      {
        "name": "--nav-tree-hover-background",
        "description": "Background of a hovered row (defaults to --hover-color)"
      },
      {
        "name": "--nav-tree-guide-color",
        "description": "Color of the indent guide of an expanded branch (defaults to --border-color)"
      },
      {
        "name": "--nav-tree-guide-active-color",
        "description": "Color of the indent guide of the branch holding the active row"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:NavTree": {
    "kind": "cssVars",
    "source": "react/src/components/NavTree",
    "vars": [
      {
        "name": "--nav-tree-gap",
        "description": "Space between the sections"
      },
      {
        "name": "--nav-tree-item-height",
        "description": "Minimum height of a top-level row (defaults to the density's control height)"
      },
      {
        "name": "--nav-tree-item-padding-x",
        "description": "Horizontal padding of a row (follows the density's row padding)"
      },
      {
        "name": "--nav-tree-item-radius",
        "description": "Corner radius of a row (defaults to --radius-md)"
      },
      {
        "name": "--nav-tree-indent",
        "description": "Indentation of nested rows"
      },
      {
        "name": "--nav-tree-active-background",
        "description": "Background of the active row"
      },
      {
        "name": "--nav-tree-active-color",
        "description": "Accent color of the active row's icon"
      },
      {
        "name": "--nav-tree-hover-background",
        "description": "Background of a hovered row (defaults to --hover-color)"
      },
      {
        "name": "--nav-tree-guide-color",
        "description": "Color of the indent guide of an expanded branch (defaults to --border-color)"
      },
      {
        "name": "--nav-tree-guide-active-color",
        "description": "Color of the indent guide of the branch holding the active row"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基本的な使い方

sections プロパティでセクション、アイコン、末尾の件数、ブランチを指定します。minerva-select をキャンセルしてクライアント側でルーティングし、active-id を移動します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/nav-tree/wc/basic.html

```html
<minerva-nav-tree
  id="nav"
  active-id="invoices"
  aria-label="Workspace"
  style="max-width: 280px"
></minerva-nav-tree>

```

### apps/docs/src/docs/pages/nav-tree/wc/basic.ts

```tsx
// Sections come from a JS property. minerva-select is cancelable: prevent the
// link navigation and route on the client, then move active-id.
type Item = {
  id: string;
  label: string;
  description?: string;
  href?: string;
  icon?: string;
  endContent?: string;
  disabled?: boolean;
  children?: Item[];
};
type NavTree = HTMLElement & {
  sections: { id: string; title?: string; items: Item[] }[];
  activeId?: string;
};

export function setup(root: HTMLElement) {
  const nav = root.querySelector<NavTree>("#nav")!;
  nav.sections = [
    {
      id: "main",
      items: [
        { id: "home", label: "Home", href: "/home", icon: "🏠" },
        {
          id: "inbox",
          label: "Inbox",
          href: "/inbox",
          icon: "✉️",
          endContent: "12",
        },
      ],
    },
    {
      id: "finance",
      title: "Finance",
      items: [
        {
          id: "billing",
          label: "Billing",
          description: "Invoices and payments",
          icon: "💳",
          children: [
            { id: "invoices", label: "Invoices", href: "/billing/invoices" },
            { id: "payments", label: "Payments", href: "/billing/payments" },
            {
              id: "refunds",
              label: "Refunds",
              href: "/billing/refunds",
              disabled: true,
            },
          ],
        },
        { id: "reports", label: "Reports", href: "/reports", icon: "📊" },
      ],
    },
  ];
  const onSelect = (e: Event) => {
    const { value, item } = (e as CustomEvent<{ value: string; item: Item }>)
      .detail;
    if (item.children) return; // a branch: it toggles
    e.preventDefault();
    nav.activeId = value;
  };
  nav.addEventListener("minerva-select", onSelect);
  return () => nav.removeEventListener("minerva-select", onSelect);
}

```

## Example: コンパクトモード

collapsed はアイコンだけを残し、幅の狭いサイドバーに使います。ラベルはアクセシブルな名前として残ります。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/nav-tree/wc/collapsed.html

```html
<div style="display: grid; gap: 12px; justify-items: start">
  <minerva-button id="toggle" size="small" variant="outline" color="neutral"
    >Expand sidebar</minerva-button
  >
  <minerva-nav-tree
    id="nav"
    collapsed
    active-id="dashboard"
    aria-label="Compact navigation"
  ></minerva-nav-tree>
</div>

```

### apps/docs/src/docs/pages/nav-tree/wc/collapsed.ts

```tsx
// collapsed keeps the icons only (labels stay the accessible names).
type Item = { id: string; label: string; href?: string; icon?: string };
type NavTree = HTMLElement & {
  sections: { id: string; items: Item[] }[];
  collapsed: boolean;
  activeId?: string;
};

export function setup(root: HTMLElement) {
  const nav = root.querySelector<NavTree>("#nav")!;
  const toggle = root.querySelector<HTMLElement>("#toggle")!;
  nav.sections = [
    {
      id: "main",
      items: [
        { id: "dashboard", label: "Dashboard", href: "/", icon: "📈" },
        { id: "projects", label: "Projects", href: "/projects", icon: "📁" },
        { id: "settings", label: "Settings", href: "/settings", icon: "⚙️" },
      ],
    },
  ];
  const onToggle = () => {
    nav.collapsed = !nav.collapsed;
    toggle.textContent = nav.collapsed ? "Expand sidebar" : "Collapse sidebar";
  };
  const onSelect = (e: Event) => {
    e.preventDefault();
    nav.activeId = (e as CustomEvent<{ value: string }>).detail.value;
  };
  toggle.addEventListener("click", onToggle);
  nav.addEventListener("minerva-select", onSelect);
  return () => {
    toggle.removeEventListener("click", onToggle);
    nav.removeEventListener("minerva-select", onSelect);
  };
}

```

## Example: 展開状態の制御

expandedIds で開いているブランチを指定し、minerva-expanded-change はキャンセル可能です（Getting started は開いたまま）。wrap-labels で長いラベルを折り返します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/nav-tree/wc/expansion.html

```html
<div style="display: grid; gap: 12px; max-width: 300px">
  <minerva-nav-tree
    id="nav"
    wrap-labels
    aria-label="Documentation"
  ></minerva-nav-tree>
  <output id="log">ArrowRight / ArrowLeft expand and collapse branches.</output>
</div>

```

### apps/docs/src/docs/pages/nav-tree/wc/expansion.ts

```tsx
// expandedIds is controlled through minerva-expanded-change (cancelable:
// here "Getting started" stays open). wrap-labels wraps long labels.
type Item = { id: string; label: string; href?: string; children?: Item[] };
type NavTree = HTMLElement & {
  sections: { id: string; title?: string; items: Item[] }[];
  expandedIds: string[];
};
type Detail = { expandedIds: string[]; item: Item; expanded: boolean };

export function setup(root: HTMLElement) {
  const nav = root.querySelector<NavTree>("#nav")!;
  const log = root.querySelector<HTMLOutputElement>("#log")!;
  nav.sections = [
    {
      id: "docs",
      title: "Guides",
      items: [
        {
          id: "start",
          label: "Getting started",
          children: [
            { id: "install", label: "Installation", href: "/install" },
            {
              id: "first",
              label: "Your first page with Web Components",
              href: "/first",
            },
          ],
        },
        {
          id: "theming",
          label: "Theming",
          children: [
            { id: "tokens", label: "Design tokens", href: "/tokens" },
            {
              id: "palettes",
              label: "Palettes and dark mode",
              href: "/palettes",
            },
          ],
        },
      ],
    },
  ];
  nav.expandedIds = ["start"];
  const onExpanded = (e: Event) => {
    const { item, expanded } = (e as CustomEvent<Detail>).detail;
    if (item.id === "start" && !expanded) {
      e.preventDefault();
      log.value = "Getting started stays open (event canceled).";
      return;
    }
    log.value = `${item.label} ${expanded ? "expanded" : "collapsed"}`;
  };
  const onSelect = (e: Event) => {
    const { item } = (e as CustomEvent<{ item: Item }>).detail;
    if (!item.children) e.preventDefault();
  };
  nav.addEventListener("minerva-expanded-change", onExpanded);
  nav.addEventListener("minerva-select", onSelect);
  return () => {
    nav.removeEventListener("minerva-expanded-change", onExpanded);
    nav.removeEventListener("minerva-select", onSelect);
  };
}

```
