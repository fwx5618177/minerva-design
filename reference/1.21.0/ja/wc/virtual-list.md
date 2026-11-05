# VirtualList 仮想リスト

スクロールコンテナ内で表示されている行だけをマウントし、長いリストを効率よく描画します。

Package: minerva-design@1.21.0

Renderer: wc

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "3e3fd42fed9bd7320e0095e9008ad52d1dd44024",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:bdc377ab7ed5f94120cdda24084c48e40370128fac18b85708e5f8b5fbaf5e95"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## VirtualList

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/virtual-list",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "itemHeight",
    "typeText": "number | undefined",
    "attribute": "item-height",
    "required": false
  },
  {
    "name": "itemPadding",
    "typeText": "number",
    "attribute": "item-padding",
    "required": false
  },
  {
    "name": "overscan",
    "typeText": "number",
    "attribute": "overscan",
    "required": false
  },
  {
    "name": "maxHeight",
    "typeText": "number | undefined",
    "attribute": "max-height",
    "required": false
  },
  {
    "name": "loadMoreThreshold",
    "typeText": "number",
    "attribute": "load-more-threshold",
    "required": false
  },
  {
    "name": "highPerformance",
    "typeText": "boolean",
    "attribute": "high-performance",
    "required": false
  },
  {
    "name": "loading",
    "typeText": "boolean",
    "attribute": "loading",
    "required": false
  },
  {
    "name": "clickable",
    "typeText": "boolean",
    "attribute": "clickable",
    "required": false
  },
  {
    "name": "items",
    "typeText": "VirtualListItem[]",
    "required": false
  },
  {
    "name": "renderItem",
    "typeText": "VirtualListRenderItem | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-item-click",
    "typeText": "CustomEvent<{ item: VirtualListItem; index: number; }>",
    "detailType": {
      "typeText": "{ item: VirtualListItem; index: number; }",
      "typeRef": "type:5c7fefc2a49b2eddeb2a"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "A clickable row was clicked or activated with Enter / Space (`detail: { item, index }`)"
  },
  {
    "name": "minerva-load-more",
    "typeText": "CustomEvent<undefined>",
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "The list was scrolled within `load-more-threshold` px of the bottom"
  }
]
```

## API

```json
{
  "wc:minerva-virtual-list": {
    "kind": "element",
    "source": "web-components/src/components/virtual-list/virtual-list.ts",
    "className": "MinervaVirtualList",
    "summary": "Windowed list rendering only the visible rows.",
    "description": "A windowed (virtualized) list: only the rows in view (plus `overscan` rows above and below) are in the DOM (`<VirtualList>` of React). Rows have a fixed height (`item-height`, or measured from the first item). - Data: set the `items` property (`{ id, metadata? }[]`) and a `renderItem(item, index)` function property returning text, a Node or a Lit template. Rows are rendered in the shadow root: style their content with inline styles / your own elements, or through `::part(item)`. - The scroll container is a focusable `region` (keyboard scrolling) named by `aria-label`; rows are `listitem`s exposing their real position (`aria-setsize` / `aria-posinset`). The row holding focus stays rendered when scrolled out of the window (focus is never dropped). - `clickable` (React: passing `onItemClick`) makes rows focusable and activatable with Enter / Space: `minerva-item-click`. - Scrolling near the bottom fires `minerva-load-more` (once until `items` or `loading` change).",
    "properties": [
      {
        "name": "itemHeight",
        "attribute": "item-height",
        "type": "number | undefined",
        "description": "Fixed row height in pixels; measured from the first item when omitted"
      },
      {
        "name": "itemPadding",
        "attribute": "item-padding",
        "type": "number",
        "default": "8",
        "description": "Padding of each row in pixels"
      },
      {
        "name": "overscan",
        "attribute": "overscan",
        "type": "number",
        "default": "5",
        "description": "Number of rows rendered above and below the visible area"
      },
      {
        "name": "maxHeight",
        "attribute": "max-height",
        "type": "number | undefined",
        "description": "Maximum height of the scroll container in pixels"
      },
      {
        "name": "loadMoreThreshold",
        "attribute": "load-more-threshold",
        "type": "number",
        "default": "100",
        "description": "Distance from the bottom (px) at which `minerva-load-more` fires"
      },
      {
        "name": "highPerformance",
        "attribute": "high-performance",
        "type": "boolean",
        "default": "false",
        "description": "Batches scroll updates with requestAnimationFrame and requestIdleCallback"
      },
      {
        "name": "loading",
        "attribute": "loading",
        "type": "boolean",
        "default": "false",
        "description": "Shows a loading indicator at the bottom of the list (aria-busy)"
      },
      {
        "name": "clickable",
        "attribute": "clickable",
        "type": "boolean",
        "default": "false",
        "description": "Rows are clickable: focusable, pointer cursor, `minerva-item-click`"
      },
      {
        "name": "items",
        "type": "VirtualListItem[]",
        "default": "[]",
        "description": "Items to render"
      },
      {
        "name": "renderItem",
        "type": "VirtualListRenderItem | undefined",
        "description": "Renders the content of one row (text, Node or Lit template)"
      },
      {
        "name": "scrollContainer",
        "type": "HTMLElement | null",
        "readonly": true,
        "description": "The scroll container (e.g. to scroll programmatically)"
      }
    ],
    "methods": [
      {
        "name": "scrollToIndex",
        "signature": "(index: number) => void",
        "description": "Scrolls so that the row at `index` is at the top of the list"
      }
    ],
    "events": [
      {
        "name": "minerva-item-click",
        "description": "A clickable row was clicked or activated with Enter / Space (`detail: { item, index }`)"
      },
      {
        "name": "minerva-load-more",
        "description": "The list was scrolled within `load-more-threshold` px of the bottom"
      }
    ],
    "slots": [],
    "parts": [
      {
        "name": "root",
        "description": "The scroll container (`role=\"region\"`)"
      },
      {
        "name": "list",
        "description": "The list (`role=\"list\"`) sized to all the rows"
      },
      {
        "name": "item",
        "description": "A rendered row (`role=\"listitem\"`)"
      },
      {
        "name": "loading",
        "description": "The loading indicator row (while loading)"
      }
    ],
    "cssProperties": [
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
      },
      {
        "name": "--progress-width",
        "description": "Width of a linear indicator with the default width"
      },
      {
        "name": "--progress-bar-height",
        "description": "Thickness of the bar (every size)"
      },
      {
        "name": "--progress-track-color",
        "description": "Color of the bar track (and of the determinate circle track)"
      },
      {
        "name": "--progress-radius",
        "description": "Corner radius of the bar track (defaults to --radius-sm)"
      },
      {
        "name": "--progress-size",
        "description": "Size of the round indicators (spinner / circle / wave; every size)"
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

## Example: 基本的な使い方

JavaScript から items と renderItem プロパティを設定します。10,000 件あっても、表示中の行だけが描画されます。aria-label でリストに名前を付けてください。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/virtual-list/wc/basic.html

```html
<minerva-virtual-list
  style="width: 100%"
  id="list"
  aria-label="Contacts"
  item-height="40"
  max-height="280"
></minerva-virtual-list>

```

### apps/docs/src/docs/pages/virtual-list/wc/basic.ts

```tsx
// `items` and `renderItem` are JS properties: only the rows in view are in the
// DOM, even with 10,000 items.
type Item = { id: number; metadata?: Record<string, string | number> };
type VirtualList = HTMLElement & {
  items: Item[];
  renderItem: (item: Item, index: number) => string;
};

export function setup(root: HTMLElement) {
  const list = root.querySelector<VirtualList>("#list")!;
  list.items = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    metadata: { name: `Contact ${i + 1}` },
  }));
  list.renderItem = (item) => `${item.metadata?.name} · #${item.id}`;
}

```

## Example: クリック可能な行

clickable で行がフォーカス可能になり、クリック・Enter・Space で minerva-item-click を発火します。scrollToIndex() でプログラムからスクロールできます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/virtual-list/wc/clickable-rows.html

```html
<div style="display: grid; gap: 8px">
  <div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center">
    <minerva-button id="jump" size="small" variant="outline"
      >Scroll to row 500</minerva-button
    >
    <output id="picked">Click a row or press Enter on it</output>
  </div>
  <minerva-virtual-list
    id="list"
    aria-label="Tasks"
    clickable
    item-height="44"
    max-height="264"
  ></minerva-virtual-list>
</div>

```

### apps/docs/src/docs/pages/virtual-list/wc/clickable-rows.ts

```tsx
// `clickable` makes rows focusable and fires `minerva-item-click` on click,
// Enter or Space; scrollToIndex() scrolls programmatically.
type Item = { id: number };
type VirtualList = HTMLElement & {
  items: Item[];
  renderItem: (item: Item, index: number) => string;
  scrollToIndex: (index: number) => void;
};

export function setup(root: HTMLElement) {
  const list = root.querySelector<VirtualList>("#list")!;
  const jump = root.querySelector<HTMLElement>("#jump")!;
  const picked = root.querySelector<HTMLOutputElement>("#picked")!;
  list.items = Array.from({ length: 1000 }, (_, i) => ({ id: i + 1 }));
  list.renderItem = (item) => `Task ${item.id}`;
  const onItemClick = (event: Event) => {
    const { item, index } = (
      event as CustomEvent<{ item: Item; index: number }>
    ).detail;
    picked.value = `Picked task ${item.id} (index ${index})`;
  };
  const onJump = () => list.scrollToIndex(499);
  list.addEventListener("minerva-item-click", onItemClick);
  jump.addEventListener("click", onJump);
  return () => {
    list.removeEventListener("minerva-item-click", onItemClick);
    jump.removeEventListener("click", onJump);
  };
}

```

## Example: 無限スクロール

下端付近（load-more-threshold）で minerva-load-more が発火します。次のページを取得する間は loading を設定します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/virtual-list/wc/infinite-scroll.html

```html
<minerva-virtual-list
  style="width: 100%"
  id="list"
  aria-label="Activity feed"
  item-height="40"
  max-height="240"
  load-more-threshold="80"
></minerva-virtual-list>

```

### apps/docs/src/docs/pages/virtual-list/wc/infinite-scroll.ts

```tsx
// Scrolling near the bottom fires `minerva-load-more`; `loading` shows the
// indicator row while the next page is fetched.
type Item = { id: number };
type VirtualList = HTMLElement & {
  items: Item[];
  loading: boolean;
  renderItem: (item: Item, index: number) => string;
};

const PAGE = 30;
const LAST = 150;

export function setup(root: HTMLElement) {
  const list = root.querySelector<VirtualList>("#list")!;
  const page = (from: number) =>
    Array.from({ length: PAGE }, (_, i) => ({ id: from + i + 1 }));
  list.items = page(0);
  list.renderItem = (item) => `Event ${item.id}`;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const onLoadMore = () => {
    if (list.items.length >= LAST) return;
    list.loading = true;
    timer = setTimeout(() => {
      list.items = [...list.items, ...page(list.items.length)];
      list.loading = false;
    }, 800);
  };
  list.addEventListener("minerva-load-more", onLoadMore);
  return () => {
    clearTimeout(timer);
    list.removeEventListener("minerva-load-more", onLoadMore);
  };
}

```
