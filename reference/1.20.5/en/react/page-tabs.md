# PageTabs

A strip of open application pages (route navigation, not an ARIA tablist): the application owns routes, closing and unsaved-change guards. Items are flat rounded surfaces; long titles are truncated and shown in full in a tooltip; the current page stays in view and scroll buttons appear when the list overflows.

Package: minerva-design@1.20.5

Renderer: react

Locale: en

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

## PageTab

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "PageTab"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "source": "packages/react/src/components/PageTabs/types.ts",
    "kind": "string",
    "typeText": "string",
    "typeRef": "type:e15e314d298fc0d116fc",
    "required": true,
    "description": "Identifier of the page (exposed as data-value)"
  },
  {
    "name": "label",
    "source": "packages/react/src/components/PageTabs/types.ts",
    "kind": "string",
    "typeText": "string",
    "typeRef": "type:e15e314d298fc0d116fc",
    "required": true,
    "description": "Title of the page; truncated with an ellipsis, shown in full in a tooltip"
  },
  {
    "name": "active",
    "source": "packages/react/src/components/PageTabs/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Marks the item as the current page (aria-current=\"page\")"
  },
  {
    "name": "disabled",
    "source": "packages/react/src/components/PageTabs/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the label button (the separate action keeps its own state)"
  },
  {
    "name": "icon",
    "source": "packages/react/src/components/PageTabs/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Icon displayed before the label"
  },
  {
    "name": "action",
    "source": "packages/react/src/components/PageTabs/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Separate control rendered next to the label (e.g. a close IconButton)"
  }
]
```

### events

```json
[
  {
    "name": "onSelect",
    "source": "packages/react/src/components/PageTabs/types.ts",
    "kind": "function",
    "typeText": "(() => void) | undefined",
    "typeRef": "type:3cf6c64b24d5483a2c59",
    "parameters": [],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the label button is activated"
  }
]
```

## PageTabs

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "PageTabs"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "aria-label",
    "source": "packages/react/src/components/PageTabs/types.ts",
    "kind": "string",
    "typeText": "string",
    "typeRef": "type:e15e314d298fc0d116fc",
    "required": true,
    "description": "Accessible label of the navigation landmark (e.g. \"Open pages\")"
  },
  {
    "name": "activeValue",
    "source": "packages/react/src/components/PageTabs/types.ts",
    "kind": "string",
    "typeText": "string",
    "typeRef": "type:e15e314d298fc0d116fc",
    "required": true,
    "description": "Value of the current route's item. When it (or the set of items) changes, the active item is scrolled into view"
  },
  {
    "name": "actions",
    "source": "packages/react/src/components/PageTabs/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Global actions shown after the scrollable list (e.g. a page menu)"
  },
  {
    "name": "scrollLeftLabel",
    "source": "packages/react/src/components/PageTabs/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the \"scroll left\" button"
  },
  {
    "name": "scrollRightLabel",
    "source": "packages/react/src/components/PageTabs/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the \"scroll right\" button"
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
  "PageTabsProps": {
    "source": "react/src/components/PageTabs/types.ts",
    "kind": "interface",
    "extends": [
      "Omit<HTMLAttributes<HTMLElement>, \"children\">"
    ],
    "props": [
      {
        "name": "aria-label",
        "type": "string",
        "required": true,
        "description": "Accessible label of the navigation landmark (e.g. \"Open pages\")"
      },
      {
        "name": "activeValue",
        "type": "string",
        "required": true,
        "description": "Value of the current route's item. When it (or the set of items) changes, the active item is scrolled into view"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": true,
        "description": "PageTab items"
      },
      {
        "name": "actions",
        "type": "ReactNode",
        "required": false,
        "description": "Global actions shown after the scrollable list (e.g. a page menu)"
      },
      {
        "name": "scrollLeftLabel",
        "type": "string",
        "required": false,
        "default": "\"Scroll pages left\" (localized)",
        "description": "Accessible label of the \"scroll left\" button"
      },
      {
        "name": "scrollRightLabel",
        "type": "string",
        "required": false,
        "default": "\"Scroll pages right\" (localized)",
        "description": "Accessible label of the \"scroll right\" button"
      }
    ]
  },
  "PageTabProps": {
    "source": "react/src/components/PageTabs/types.ts",
    "kind": "interface",
    "extends": [
      "Omit<HTMLAttributes<HTMLDivElement>, \"children\" | \"onSelect\">"
    ],
    "props": [
      {
        "name": "ref",
        "type": "Ref<HTMLDivElement>",
        "required": false,
        "description": "Ref to the item wrapper element"
      },
      {
        "name": "value",
        "type": "string",
        "required": true,
        "description": "Identifier of the page (exposed as data-value)"
      },
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Title of the page; truncated with an ellipsis, shown in full in a tooltip"
      },
      {
        "name": "active",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Marks the item as the current page (aria-current=\"page\")"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the label button (the separate action keeps its own state)"
      },
      {
        "name": "icon",
        "type": "ReactNode",
        "required": false,
        "description": "Icon displayed before the label"
      },
      {
        "name": "action",
        "type": "ReactNode",
        "required": false,
        "description": "Separate control rendered next to the label (e.g. a close IconButton)"
      },
      {
        "name": "onSelect",
        "type": "() => void",
        "required": false,
        "description": "Called when the label button is activated"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:PageTabs": {
    "kind": "cssVars",
    "source": "react/src/components/PageTabs",
    "vars": [
      {
        "name": "--page-tabs-height",
        "description": "Height of the tab bar"
      },
      {
        "name": "--page-tabs-background",
        "description": "Background of the tab bar"
      },
      {
        "name": "--page-tabs-gap",
        "description": "Space between the tabs"
      },
      {
        "name": "--page-tabs-item-height",
        "description": "Height of a tab"
      },
      {
        "name": "--page-tabs-item-min-width",
        "description": "Minimum width of a tab"
      },
      {
        "name": "--page-tabs-item-max-width",
        "description": "Maximum width of a tab (the label truncates)"
      },
      {
        "name": "--page-tabs-item-radius",
        "description": "Corner radius of a tab (defaults to --radius-lg)"
      },
      {
        "name": "--page-tabs-selected-background",
        "description": "Background of the active tab"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Basic usage

Each PageTab has a label button (aria-current="page" when active) and an optional separate action such as a close button. When the focused item is closed, focus moves to the current page.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/page-tabs/demos/basic.tsx

```tsx
import { useState } from "react";
import { IconButton, PageTab, PageTabs } from "minerva-design";
import { LuFileText, LuHouse, LuX } from "react-icons/lu";

const initial = [
  { value: "home", label: "Dashboard" },
  { value: "books", label: "Books" },
  { value: "article", label: "A very long article title that gets truncated" },
];

export default function BasicDemo() {
  const [pages, setPages] = useState(initial);
  const [active, setActive] = useState("books");

  const close = (value: string) => {
    const rest = pages.filter((page) => page.value !== value);
    setPages(rest);
    if (value === active) setActive(rest[0]?.value ?? "");
  };

  return (
    <PageTabs aria-label="Open pages" activeValue={active}>
      {pages.map((page) => (
        <PageTab
          key={page.value}
          value={page.value}
          label={page.label}
          icon={page.value === "home" ? <LuHouse /> : <LuFileText />}
          active={page.value === active}
          onSelect={() => setActive(page.value)}
          action={
            page.value !== "home" && (
              <IconButton
                size="small"
                aria-label={`Close ${page.label}`}
                icon={<LuX />}
                onClick={() => close(page.value)}
              />
            )
          }
        />
      ))}
    </PageTabs>
  );
}

```

## Example: Context menu and actions

Wrap items in a ContextMenu for per-page commands; actions renders global controls outside the scrolling list.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/page-tabs/demos/context-menu.tsx

```tsx
import { useState } from "react";
import {
  ContextMenu,
  IconButton,
  Menu,
  PageTab,
  PageTabs,
} from "minerva-design";
import { LuEllipsis } from "react-icons/lu";

const all = ["Overview", "Reports", "Settings", "Users", "Billing"];

export default function ContextMenuDemo() {
  const [pages, setPages] = useState(all);
  const [active, setActive] = useState("Reports");

  const closeOthers = (keep: string) => {
    setPages([keep]);
    setActive(keep);
  };

  return (
    <PageTabs
      aria-label="Open pages"
      activeValue={active}
      actions={
        <Menu
          items={[{ key: "reset", label: "Reopen all pages" }]}
          onSelect={() => setPages(all)}
        >
          <IconButton
            size="small"
            aria-label="Page menu"
            icon={<LuEllipsis />}
          />
        </Menu>
      }
    >
      {pages.map((page) => (
        <ContextMenu
          key={page}
          items={[{ key: "close-others", label: "Close other pages" }]}
          onSelect={() => closeOthers(page)}
        >
          <PageTab
            value={page}
            label={page}
            active={page === active}
            onSelect={() => setActive(page)}
          />
        </ContextMenu>
      ))}
    </PageTabs>
  );
}

```

## Example: Overflow and disabled

When the pages overflow, scroll buttons appear and the active page is scrolled into view. Disabled pages cannot be selected and show no tooltip.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/page-tabs/demos/overflow.tsx

```tsx
import { useState } from "react";
import { PageTab, PageTabs } from "minerva-design";

const pages = Array.from({ length: 12 }, (_, i) => `Chapter ${i + 1}`);

export default function OverflowDemo() {
  const [active, setActive] = useState(pages[9]);
  return (
    <div style={{ maxWidth: 520 }}>
      <PageTabs aria-label="Chapters" activeValue={active}>
        {pages.map((page) => (
          <PageTab
            key={page}
            value={page}
            label={page}
            active={page === active}
            disabled={page === "Chapter 3"}
            onSelect={() => setActive(page)}
          />
        ))}
      </PageTabs>
    </div>
  );
}

```
