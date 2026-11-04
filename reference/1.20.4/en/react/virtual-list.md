# VirtualList

Renders long lists efficiently by only mounting the rows that are visible in the scroll container.

Package: minerva-design@1.20.4

Renderer: react

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "5826c364a762ec5a1144b8eea89e5d7510e4099c",
  "sourceDigest": "sha256:38cfefdcb173c9a307526b9364c7a77acc74f713924006e65d94c6f3c5e94c61",
  "referenceSourceDigest": "sha256:8bb3a20ee069c63b8d85e6ccf29336af81fffa488ce873d14ee032291c18009f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

## Documentation

## VirtualList

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "VirtualList"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "items",
    "source": "packages/react/src/components/VirtualList/types.ts",
    "kind": "array",
    "typeText": "VirtualListItem[]",
    "typeRef": "type:b8a2f2c2f40ea9bcd157",
    "required": true,
    "description": "Items to render"
  },
  {
    "name": "itemHeight",
    "source": "packages/react/src/components/VirtualList/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Fixed row height in pixels; measured from the first item when omitted"
  },
  {
    "name": "itemPadding",
    "source": "packages/react/src/components/VirtualList/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 8,
    "required": false,
    "description": "Padding of each row in pixels"
  },
  {
    "name": "overscan",
    "source": "packages/react/src/components/VirtualList/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 5,
    "required": false,
    "description": "Number of rows rendered above and below the visible area"
  },
  {
    "name": "maxHeight",
    "source": "packages/react/src/components/VirtualList/types.ts",
    "kind": "number",
    "typeText": "number",
    "typeRef": "type:7d1137535c313783dadd",
    "required": true,
    "description": "Maximum height of the scroll container in pixels"
  },
  {
    "name": "renderItem",
    "source": "packages/react/src/components/VirtualList/types.ts",
    "kind": "node",
    "typeText": "(item: VirtualListItem, index: number) => ReactNode",
    "typeRef": "type:cad4453a0f22b64d9e00",
    "parameters": [
      {
        "name": "item",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "VirtualListItem",
        "typeRef": "type:12a873f75ef425b7d447"
      },
      {
        "name": "index",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "ReactNode",
      "typeRef": "type:d947e2db6b7ed3e4c192"
    },
    "required": true,
    "description": "Renders the content of one row"
  },
  {
    "name": "loadMoreThreshold",
    "source": "packages/react/src/components/VirtualList/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 100,
    "required": false,
    "description": "Distance from the bottom (px) at which onLoadMore is triggered"
  },
  {
    "name": "highPerformance",
    "source": "packages/react/src/components/VirtualList/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Batches scroll updates with requestAnimationFrame and requestIdleCallback"
  },
  {
    "name": "loading",
    "source": "packages/react/src/components/VirtualList/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows a loading indicator at the bottom of the list"
  },
  {
    "name": "aria-label",
    "source": "packages/react/src/components/VirtualList/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the list"
  }
]
```

### events

```json
[
  {
    "name": "onLoadMore",
    "source": "packages/react/src/components/VirtualList/types.ts",
    "kind": "function",
    "typeText": "(() => void | Promise<void>) | undefined",
    "typeRef": "type:bccdd5aa65175b189545",
    "parameters": [],
    "returnType": {
      "typeText": "void | Promise<void>",
      "typeRef": "type:3c4871f2062b3b734ba0"
    },
    "required": false,
    "description": "Called when scrolling near the bottom; return a promise that resolves once new items are loaded (no new call happens until it settles)"
  },
  {
    "name": "onItemClick",
    "source": "packages/react/src/components/VirtualList/types.ts",
    "kind": "function",
    "typeText": "((item: VirtualListItem, index: number, event: MouseEvent<HTMLDivElement, MouseEvent> | KeyboardEvent<HTMLDivElement>) => void) | undefined",
    "typeRef": "type:7a3235be216761be3142",
    "parameters": [
      {
        "name": "item",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "VirtualListItem",
        "typeRef": "type:12a873f75ef425b7d447"
      },
      {
        "name": "index",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      },
      {
        "name": "event",
        "position": 2,
        "required": true,
        "rest": false,
        "typeText": "MouseEvent<HTMLDivElement, MouseEvent> | KeyboardEvent<HTMLDivElement>",
        "typeRef": "type:0a28660bc09f1fd51bc4"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a row is clicked, or activated with Enter / Space while the row itself has focus. Makes the rows clickable: focusable and shown with a pointer cursor"
  }
]
```

## API

```json
{
  "VirtualListProps": {
    "source": "react/src/components/VirtualList/types.ts",
    "description": "VirtualList props. Other native <div> attributes (id, data-*, aria-*, event handlers...) are forwarded to the root (scroll container) element",
    "kind": "interface",
    "extends": [
      "Omit<HTMLAttributes<HTMLDivElement>, \"children\" | \"role\" | \"tabIndex\">"
    ],
    "props": [
      {
        "name": "items",
        "type": "VirtualListItem[]",
        "required": true,
        "description": "Items to render"
      },
      {
        "name": "itemHeight",
        "type": "number",
        "required": false,
        "description": "Fixed row height in pixels; measured from the first item when omitted"
      },
      {
        "name": "itemPadding",
        "type": "number",
        "required": false,
        "default": "8",
        "description": "Padding of each row in pixels"
      },
      {
        "name": "overscan",
        "type": "number",
        "required": false,
        "default": "5",
        "description": "Number of rows rendered above and below the visible area"
      },
      {
        "name": "maxHeight",
        "type": "number",
        "required": true,
        "description": "Maximum height of the scroll container in pixels"
      },
      {
        "name": "renderItem",
        "type": "(item: VirtualListItem, index: number) => React.ReactNode",
        "required": true,
        "description": "Renders the content of one row"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "default": "\"\"",
        "description": "Additional class name"
      },
      {
        "name": "style",
        "type": "React.CSSProperties",
        "required": false,
        "description": "Inline styles of the scroll container"
      },
      {
        "name": "onLoadMore",
        "type": "() => Promise<void> | void",
        "required": false,
        "description": "Called when scrolling near the bottom; return a promise that resolves once new items are loaded (no new call happens until it settles)"
      },
      {
        "name": "loadMoreThreshold",
        "type": "number",
        "required": false,
        "default": "100",
        "description": "Distance from the bottom (px) at which onLoadMore is triggered"
      },
      {
        "name": "highPerformance",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Batches scroll updates with requestAnimationFrame and requestIdleCallback"
      },
      {
        "name": "loading",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows a loading indicator at the bottom of the list"
      },
      {
        "name": "onItemClick",
        "type": "(item: VirtualListItem, index: number, event: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) => void",
        "required": false,
        "description": "Called when a row is clicked, or activated with Enter / Space while the row itself has focus. Makes the rows clickable: focusable and shown with a pointer cursor"
      },
      {
        "name": "aria-label",
        "type": "string",
        "required": false,
        "description": "Accessible name of the list"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLDivElement>",
        "required": false,
        "description": "Ref to the root (scroll container) <div> element"
      }
    ]
  },
  "VirtualListItem": {
    "source": "react/src/components/VirtualList/types.ts",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "id",
        "type": "string | number",
        "required": true,
        "description": "Unique key of the item"
      },
      {
        "name": "metadata",
        "type": "Record<string, string | number | boolean>",
        "required": false,
        "description": "Arbitrary data for renderItem"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:VirtualList": {
    "kind": "cssVars",
    "source": "react/src/components/VirtualList",
    "vars": [
      {
        "name": "--virtual-list-radius",
        "description": "Corner radius (defaults to --radius-sm)"
      },
      {
        "name": "--virtual-list-shadow",
        "description": "Shadow at rest (defaults to --shadow-sm)"
      },
      {
        "name": "--virtual-list-hover-shadow",
        "description": "Shadow while hovered (defaults to --shadow-md)"
      },
      {
        "name": "--virtual-list-scrollbar-size",
        "description": "Width of the scrollbar (WebKit / Blink)"
      },
      {
        "name": "--virtual-list-loading-padding",
        "description": "Padding of the loading indicator row"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Measured row height

Omit itemHeight to measure it from the first rendered item; itemPadding is added around each row.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/virtual-list/demos/auto-height.tsx

```tsx
import { VirtualList, type VirtualListItem } from "minerva-design";

const items: VirtualListItem[] = Array.from({ length: 1000 }, (_, i) => ({
  id: `user-${i}`,
  metadata: { name: `User ${i + 1}`, email: `user${i + 1}@example.com` },
}));

export default function AutoHeightDemo() {
  return (
    <div style={{ width: "100%" }}>
      <VirtualList
        items={items}
        maxHeight={300}
        itemPadding={12}
        renderItem={(item) => (
          <div>
            <strong>{item.metadata?.name}</strong>
            <div style={{ fontSize: 12, opacity: 0.7 }}>
              {item.metadata?.email}
            </div>
          </div>
        )}
      />
    </div>
  );
}

```

## Example: Basic usage

10,000 rows with a fixed itemHeight; only the visible rows (plus overscan) are in the DOM.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/virtual-list/demos/basic.tsx

```tsx
import { VirtualList, type VirtualListItem } from "minerva-design";

const items: VirtualListItem[] = Array.from({ length: 10000 }, (_, i) => ({
  id: i,
  metadata: { title: `Row ${i + 1}` },
}));

export default function BasicDemo() {
  return (
    <div style={{ width: "100%" }}>
      <VirtualList
        items={items}
        itemHeight={40}
        maxHeight={300}
        aria-label="Rows"
        renderItem={(item) => <span>{item.metadata?.title}</span>}
      />
    </div>
  );
}

```

## Example: Clickable rows and native attributes

onItemClick makes the rows clickable (pointer cursor, focusable, activated with Enter / Space); without it rows keep the default cursor. Native attributes such as id, data-* and aria-* are forwarded to the root.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/virtual-list/demos/clickable-rows.tsx

```tsx
import { useState } from "react";
import { VirtualList, type VirtualListItem } from "minerva-design";

const items: VirtualListItem[] = Array.from({ length: 1000 }, (_, i) => ({
  id: i,
  metadata: { title: `Invoice #${1000 + i}` },
}));

export default function ClickableRowsDemo() {
  const [selected, setSelected] = useState<string>();

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <VirtualList
        items={items}
        itemHeight={40}
        maxHeight={240}
        aria-label="Invoices"
        id="invoice-list"
        data-section="billing"
        onItemClick={(item) => setSelected(String(item.metadata?.title))}
        renderItem={(item) => <span>{item.metadata?.title}</span>}
      />
      <span aria-live="polite">Selected: {selected ?? "none"}</span>
    </div>
  );
}

```

## Example: High performance mode

highPerformance batches scroll updates with requestAnimationFrame and requestIdleCallback, here with 100,000 rows.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/virtual-list/demos/high-performance.tsx

```tsx
import { VirtualList, type VirtualListItem } from "minerva-design";

const items: VirtualListItem[] = Array.from({ length: 100000 }, (_, i) => ({
  id: i,
  metadata: { title: `Item ${i + 1}`, value: Math.round(Math.random() * 1000) },
}));

export default function HighPerformanceDemo() {
  return (
    <div style={{ width: "100%" }}>
      <VirtualList
        items={items}
        itemHeight={36}
        maxHeight={300}
        overscan={10}
        highPerformance
        renderItem={(item, index) => (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>
              #{index + 1} {item.metadata?.title}
            </span>
            <code>{item.metadata?.value}</code>
          </div>
        )}
      />
    </div>
  );
}

```

## Example: Infinite scroll

onLoadMore is called near the bottom of the list; show a loading indicator while it resolves.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/virtual-list/demos/infinite-scroll.tsx

```tsx
import { useCallback, useState } from "react";
import { VirtualList, type VirtualListItem } from "minerva-design";

const PAGE_SIZE = 30;
const MAX_ITEMS = 300;

const createPage = (start: number): VirtualListItem[] =>
  Array.from({ length: PAGE_SIZE }, (_, i) => ({
    id: start + i,
    metadata: { title: `Message ${start + i + 1}` },
  }));

export default function InfiniteScrollDemo() {
  const [items, setItems] = useState(() => createPage(0));
  const [loading, setLoading] = useState(false);

  const loadMore = useCallback(async () => {
    if (items.length >= MAX_ITEMS) return;
    setLoading(true);
    // Simulate a network request
    await new Promise((resolve) => setTimeout(resolve, 800));
    setItems((prev) => [...prev, ...createPage(prev.length)]);
    setLoading(false);
  }, [items.length]);

  return (
    <div style={{ width: "100%" }}>
      <p style={{ marginTop: 0 }}>
        {items.length} / {MAX_ITEMS} loaded
      </p>
      <VirtualList
        items={items}
        itemHeight={40}
        maxHeight={300}
        loading={loading}
        onLoadMore={loadMore}
        loadMoreThreshold={120}
        renderItem={(item) => <span>{item.metadata?.title}</span>}
      />
    </div>
  );
}

```
