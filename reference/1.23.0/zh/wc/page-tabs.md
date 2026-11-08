# PageTabs 页面标签

已打开应用页面的标签栏（路由导航，而非 ARIA tablist）：路由、关闭和未保存更改的拦截由应用负责。条目为扁平的圆角表面；过长的标题会被截断并在提示中完整显示；当前页面始终保持可见，列表溢出时出现滚动按钮。

Package: minerva-design@1.23.0

Renderer: wc

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "413e3d54e2177f8469c443a6547c4472e608839c",
  "sourceDigest": "sha256:8c8e874e213d698b4d05cabed92eed392c90c5b0fa91c66def67eab19184e86c",
  "referenceSourceDigest": "sha256:e694adbf6015cdc21809df819193e0a84c030845fb2910749dbd1c4c15ccca99"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## PageTab

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/page-tab",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "value",
    "typeText": "string",
    "attribute": "value",
    "required": false
  },
  {
    "name": "label",
    "typeText": "string",
    "attribute": "label",
    "required": false
  },
  {
    "name": "active",
    "typeText": "boolean",
    "attribute": "active",
    "required": false
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "attribute": "disabled",
    "required": false
  },
  {
    "name": "closable",
    "typeText": "boolean",
    "attribute": "closable",
    "required": false
  },
  {
    "name": "closeLabel",
    "typeText": "string | undefined",
    "attribute": "close-label",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-select",
    "typeText": "CustomEvent<{ value: string; }>",
    "detailType": {
      "typeText": "{ value: string; }",
      "typeRef": "type:fa0107075cc9f561dc91"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": true,
    "description": "The label button was activated (`detail: { value }`); cancelable: `preventDefault()` keeps the strip's `active-value`"
  },
  {
    "name": "minerva-close",
    "typeText": "CustomEvent<{ value: string; }>",
    "detailType": {
      "typeText": "{ value: string; }",
      "typeRef": "type:1e55b2c77b6960f92a9f"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "The built-in close button was activated (`detail: { value }`); remove the element to close the page"
  }
]
```

### slots

```json
[
  {
    "name": "icon",
    "description": "Icon displayed before the label"
  },
  {
    "name": "action",
    "description": "Separate control next to the label (e.g. a close button)"
  }
]
```

## PageTabs

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/page-tabs",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "activeValue",
    "typeText": "string | undefined",
    "attribute": "active-value",
    "required": false
  },
  {
    "name": "scrollLeftLabel",
    "typeText": "string | undefined",
    "attribute": "scroll-left-label",
    "required": false
  },
  {
    "name": "scrollRightLabel",
    "typeText": "string | undefined",
    "attribute": "scroll-right-label",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-select",
    "typeText": "CustomEvent",
    "description": "Re-dispatched from `<minerva-page-tab>`: a page was chosen (`detail: { value }`)"
  },
  {
    "name": "minerva-close",
    "typeText": "CustomEvent",
    "description": "Re-dispatched from `<minerva-page-tab>`: the close button of a page was activated (`detail: { value }`)"
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "`<minerva-page-tab>` items"
  },
  {
    "name": "actions",
    "description": "Global actions after the scrollable list (e.g. a page menu)"
  }
]
```

## API

```json
{
  "wc:minerva-page-tabs": {
    "kind": "element",
    "source": "web-components/src/components/page-tabs/page-tabs.ts",
    "className": "MinervaPageTabs",
    "summary": "Strip of open pages with overflow scrolling and closable items.",
    "description": "A strip of open application pages (`<PageTabs>` of React): route navigation, not an ARIA tablist. The application owns routes, closing and leave guards. Overflowing items scroll horizontally with scroll buttons and the current item (`active-value`) is kept in view; when the focused item is removed, focus goes back to the current page.",
    "properties": [
      {
        "name": "activeValue",
        "attribute": "active-value",
        "type": "string | undefined",
        "description": "Value of the current route's item: it gets `active` and is scrolled into view when it (or the set of items) changes"
      },
      {
        "name": "scrollLeftLabel",
        "attribute": "scroll-left-label",
        "type": "string | undefined",
        "description": "Accessible label of the \"scroll left\" button (default localized)"
      },
      {
        "name": "scrollRightLabel",
        "attribute": "scroll-right-label",
        "type": "string | undefined",
        "description": "Accessible label of the \"scroll right\" button (default localized)"
      },
      {
        "name": "items",
        "type": "MinervaPageTab[]",
        "readonly": true,
        "description": "The `<minerva-page-tab>` items."
      }
    ],
    "methods": [],
    "events": [
      {
        "name": "minerva-select",
        "description": "Re-dispatched from `<minerva-page-tab>`: a page was chosen (`detail: { value }`)"
      },
      {
        "name": "minerva-close",
        "description": "Re-dispatched from `<minerva-page-tab>`: the close button of a page was activated (`detail: { value }`)"
      }
    ],
    "slots": [
      {
        "name": "",
        "description": "`<minerva-page-tab>` items"
      },
      {
        "name": "actions",
        "description": "Global actions after the scrollable list (e.g. a page menu)"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The <nav> landmark"
      },
      {
        "name": "viewport",
        "description": "The scrolling viewport of the items"
      },
      {
        "name": "list",
        "description": "The item list"
      },
      {
        "name": "scroll-button",
        "description": "The scroll left / right buttons (while the items overflow)"
      },
      {
        "name": "actions",
        "description": "The global actions after the list"
      }
    ],
    "cssProperties": [
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
      },
      {
        "name": "--icon-button-color",
        "description": "Icon color"
      },
      {
        "name": "--icon-button-hover-bg",
        "description": "Background on hover"
      },
      {
        "name": "--icon-button-pressed-color",
        "description": "Icon color of a pressed toggle"
      },
      {
        "name": "--icon-button-pressed-bg",
        "description": "Background of a pressed toggle"
      },
      {
        "name": "--icon-button-size",
        "description": "Width and height of the button (every size; defaults follow the density's control heights)"
      },
      {
        "name": "--icon-button-icon-size",
        "description": "Font size of the icon (every size)"
      },
      {
        "name": "--icon-button-radius",
        "description": "Corner radius of the square shape (defaults to --radius-lg)"
      }
    ]
  },
  "wc:minerva-page-tab": {
    "kind": "element",
    "source": "web-components/src/components/page-tabs/page-tabs.ts",
    "className": "MinervaPageTab",
    "summary": "An open page of `<minerva-page-tabs>`.",
    "description": "One open page of `<minerva-page-tabs>` (`<PageTab>` of React). The label button selects it (`aria-current=\"page\"` while `active`); the `action` slot (or the built-in close button of `closable`) is a separate control, never nested inside the label button.",
    "properties": [
      {
        "name": "value",
        "attribute": "value",
        "type": "string",
        "default": "\"\"",
        "description": "Identifier of the page"
      },
      {
        "name": "label",
        "attribute": "label",
        "type": "string",
        "default": "\"\"",
        "description": "Title of the page; truncated with an ellipsis (full text in `title`)"
      },
      {
        "name": "active",
        "attribute": "active",
        "type": "boolean",
        "default": "false",
        "description": "Marks the item as the current page (`aria-current=\"page\"`)"
      },
      {
        "name": "disabled",
        "attribute": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables the label button (the separate action keeps its own state)"
      },
      {
        "name": "closable",
        "attribute": "closable",
        "type": "boolean",
        "default": "false",
        "description": "Renders a built-in close button (fires `minerva-close`)"
      },
      {
        "name": "closeLabel",
        "attribute": "close-label",
        "type": "string | undefined",
        "description": "Accessible label of the close button (default localized \"Close <label>\")"
      }
    ],
    "methods": [
      {
        "name": "focus",
        "signature": "(options?: FocusOptions) => void",
        "description": "Focuses the label button."
      }
    ],
    "events": [
      {
        "name": "minerva-select",
        "description": "The label button was activated (`detail: { value }`); cancelable: `preventDefault()` keeps the strip's `active-value`"
      },
      {
        "name": "minerva-close",
        "description": "The built-in close button was activated (`detail: { value }`); remove the element to close the page"
      }
    ],
    "slots": [
      {
        "name": "icon",
        "description": "Icon displayed before the label"
      },
      {
        "name": "action",
        "description": "Separate control next to the label (e.g. a close button)"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The item wrapper"
      },
      {
        "name": "trigger",
        "description": "The label <button> (selects the page)"
      },
      {
        "name": "icon",
        "description": "The icon before the label"
      },
      {
        "name": "label",
        "description": "The (truncated) label"
      },
      {
        "name": "action",
        "description": "The wrapper of the separate control next to the label"
      },
      {
        "name": "close-button",
        "description": "The built-in close button (`closable`)"
      }
    ],
    "cssProperties": [
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
      },
      {
        "name": "--icon-button-color",
        "description": "Icon color"
      },
      {
        "name": "--icon-button-hover-bg",
        "description": "Background on hover"
      },
      {
        "name": "--icon-button-pressed-color",
        "description": "Icon color of a pressed toggle"
      },
      {
        "name": "--icon-button-pressed-bg",
        "description": "Background of a pressed toggle"
      },
      {
        "name": "--icon-button-size",
        "description": "Width and height of the button (every size; defaults follow the density's control heights)"
      },
      {
        "name": "--icon-button-icon-size",
        "description": "Font size of the icon (every size)"
      },
      {
        "name": "--icon-button-radius",
        "description": "Corner radius of the square shape (defaults to --radius-lg)"
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

## Example: 操作

actions 插槽在滚动列表之外渲染全局控件（此处为新建页面按钮）；项目的 action 插槽放置独立的控件，例如固定切换按钮。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/page-tabs/wc/actions.html

```html
<minerva-page-tabs id="tabs" aria-label="Open queries" active-value="q1">
  <minerva-page-tab value="q1" label="Query 1">
    <minerva-icon-button
      slot="action"
      size="small"
      toggle
      label="Pin Query 1"
      no-tooltip
      >★</minerva-icon-button
    >
  </minerva-page-tab>
  <minerva-page-tab value="q2" label="Query 2" closable></minerva-page-tab>
  <minerva-icon-button id="add" slot="actions" label="New query"
    >+</minerva-icon-button
  >
</minerva-page-tabs>

```

### apps/docs/src/docs/pages/page-tabs/wc/actions.ts

```tsx
// The actions slot sits outside the scrolling list: here it adds a page.
// The action slot holds any separate control next to a label (a pin toggle).
export function setup(root: HTMLElement) {
  const tabs = root.querySelector<HTMLElement & { activeValue?: string }>(
    "#tabs",
  )!;
  const add = root.querySelector<HTMLElement>("#add")!;
  let count = 2;
  const onAdd = () => {
    count += 1;
    const tab = document.createElement("minerva-page-tab") as HTMLElement & {
      value: string;
      label: string;
      closable: boolean;
    };
    tab.value = `q${count}`;
    tab.label = `Query ${count}`;
    tab.closable = true;
    tabs.insertBefore(tab, add);
    tabs.activeValue = tab.value;
  };
  const onClose = (event: Event) => {
    const { value } = (event as CustomEvent<{ value: string }>).detail;
    (event.target as HTMLElement).remove();
    if (tabs.activeValue === value) tabs.activeValue = "q1";
  };
  add.addEventListener("click", onAdd);
  tabs.addEventListener("minerva-close", onClose);
  return () => {
    add.removeEventListener("click", onAdd);
    tabs.removeEventListener("minerva-close", onClose);
  };
}

```

## Example: 基础用法

active-value 标记当前页面，并随 minerva-select 更新。closable 添加关闭按钮并触发 minerva-close：移除该元素即可关闭页面。icon 插槽在标签前显示图标。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/page-tabs/wc/basic.html

```html
<minerva-page-tabs id="pages" aria-label="Open pages" active-value="books">
  <minerva-page-tab value="home" label="Dashboard">
    <span slot="icon">⌂</span>
  </minerva-page-tab>
  <minerva-page-tab value="books" label="Books" closable></minerva-page-tab>
  <minerva-page-tab
    value="article"
    label="A very long article title that gets truncated"
    closable
  ></minerva-page-tab>
</minerva-page-tabs>
<output id="log" aria-live="polite"></output>

```

### apps/docs/src/docs/pages/page-tabs/wc/basic.ts

```tsx
// The strip follows minerva-select (active-value); minerva-close only
// reports the click: remove the element to close the page.
export function setup(root: HTMLElement) {
  const strip = root.querySelector<HTMLElement & { activeValue?: string }>(
    "#pages",
  )!;
  const log = root.querySelector<HTMLOutputElement>("#log")!;
  const onSelect = (event: Event) => {
    log.value = `Opened ${(event as CustomEvent<{ value: string }>).detail.value}`;
  };
  const onClose = (event: Event) => {
    const { value } = (event as CustomEvent<{ value: string }>).detail;
    (event.target as HTMLElement).remove();
    if (strip.activeValue === value) strip.activeValue = "home";
    log.value = `Closed ${value}`;
  };
  strip.addEventListener("minerva-select", onSelect);
  strip.addEventListener("minerva-close", onClose);
  return () => {
    strip.removeEventListener("minerva-select", onSelect);
    strip.removeEventListener("minerva-close", onClose);
  };
}

```

## Example: 溢出与禁用

页面溢出时会出现滚动按钮（由 scroll-left-label / scroll-right-label 命名），当前页面会自动滚动到可见区域。禁用的页面无法选中。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/page-tabs/wc/overflow.html

```html
<minerva-page-tabs
  aria-label="Open files"
  active-value="file-9"
  scroll-left-label="Earlier files"
  scroll-right-label="Later files"
  style="max-width: 480px"
>
  <minerva-page-tab value="file-1" label="index.ts"></minerva-page-tab>
  <minerva-page-tab value="file-2" label="router.ts"></minerva-page-tab>
  <minerva-page-tab value="file-3" label="store.ts" disabled></minerva-page-tab>
  <minerva-page-tab value="file-4" label="theme.scss"></minerva-page-tab>
  <minerva-page-tab value="file-5" label="README.md"></minerva-page-tab>
  <minerva-page-tab value="file-6" label="package.json"></minerva-page-tab>
  <minerva-page-tab value="file-7" label="vite.config.ts"></minerva-page-tab>
  <minerva-page-tab value="file-8" label="tsconfig.json"></minerva-page-tab>
  <minerva-page-tab value="file-9" label="CHANGELOG.md"></minerva-page-tab>
  <minerva-page-tab value="file-10" label="LICENSE"></minerva-page-tab>
</minerva-page-tabs>

```
