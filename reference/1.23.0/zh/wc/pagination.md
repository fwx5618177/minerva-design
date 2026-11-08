# Pagination 分页

将较长的数据列表分页，并让用户在页面之间切换。

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

### 键盘支持

分页组件是由原生按钮组成的  地标；当前页带有 aria-current="page" 标记，不可用的项会被禁用。某一项获得焦点时，ArrowLeft/ArrowRight 切换到上一页/下一页，Home/End 跳到第一页/最后一页，焦点会跟随当前页。若获得焦点的按钮变为禁用，焦点会移到当前页。

## Pagination

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/pagination",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "current",
    "typeText": "number",
    "attribute": "current",
    "required": false
  },
  {
    "name": "total",
    "typeText": "number",
    "attribute": "total",
    "required": false
  },
  {
    "name": "pageSize",
    "typeText": "number",
    "attribute": "page-size",
    "required": false
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "attribute": "disabled",
    "required": false
  },
  {
    "name": "showQuickJumper",
    "typeText": "boolean",
    "attribute": "show-quick-jumper",
    "required": false
  },
  {
    "name": "showSizeChanger",
    "typeText": "boolean",
    "attribute": "show-size-changer",
    "required": false
  },
  {
    "name": "pageSizeOptions",
    "typeText": "number[]",
    "attribute": "page-size-options",
    "required": false
  },
  {
    "name": "showTotal",
    "typeText": "boolean",
    "attribute": "show-total",
    "required": false
  },
  {
    "name": "size",
    "typeText": "\"small\" | \"medium\" | \"large\"",
    "attribute": "size",
    "required": false
  },
  {
    "name": "shape",
    "typeText": "\"circle\" | \"rounded\" | \"square\"",
    "attribute": "shape",
    "required": false
  },
  {
    "name": "variant",
    "typeText": "\"solid\" | \"outline\" | \"ghost\"",
    "attribute": "variant",
    "required": false
  },
  {
    "name": "simple",
    "typeText": "boolean",
    "attribute": "simple",
    "required": false
  },
  {
    "name": "siblingCount",
    "typeText": "number | undefined",
    "attribute": "sibling-count",
    "required": false
  },
  {
    "name": "boundaryCount",
    "typeText": "number | undefined",
    "attribute": "boundary-count",
    "required": false
  },
  {
    "name": "hideEdges",
    "typeText": "boolean",
    "attribute": "hide-edges",
    "required": false
  },
  {
    "name": "hideNumbers",
    "typeText": "boolean",
    "attribute": "hide-numbers",
    "required": false
  },
  {
    "name": "responsive",
    "typeText": "boolean",
    "attribute": "responsive",
    "required": false
  },
  {
    "name": "totalRender",
    "typeText": "(total: number, range: [number, number]) => PaginationRenderResult | undefined",
    "required": false
  },
  {
    "name": "itemRender",
    "typeText": "(page: number, type: PaginationItemType) => PaginationRenderResult | undefined",
    "required": false
  },
  {
    "name": "labels",
    "typeText": "PaginationLabels | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-page-change",
    "typeText": "CustomEvent<PaginationChangeDetail>",
    "detailType": {
      "typeText": "PaginationChangeDetail",
      "typeRef": "type:471a98f18e5c772ee6df"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": true,
    "description": "The user changed the page or the page size (`detail: { page, pageSize }`); cancelable: `preventDefault()` keeps the current page and size (controlled pattern)"
  }
]
```

### slots

```json
[
  {
    "name": "prev-icon",
    "description": "Icon of the previous-page button"
  },
  {
    "name": "next-icon",
    "description": "Icon of the next-page button"
  },
  {
    "name": "jump-prev-icon",
    "description": "Icon of the jump-backward item"
  },
  {
    "name": "jump-next-icon",
    "description": "Icon of the jump-forward item"
  }
]
```

## API

```json
{
  "wc:minerva-pagination": {
    "kind": "element",
    "source": "web-components/src/components/pagination/pagination.ts",
    "className": "MinervaPagination",
    "summary": "Page navigation with jumper, page size selector and total.",
    "description": "Page navigation (`<Pagination>` of React): page buttons with jump items or a compact list with gaps, prev / next, a simple mode with a page input, a quick jumper, a native page-size select and a total. Arrow keys (swapped in RTL), Home and End on the page buttons change the page and move focus to it; focus never gets lost when the focused button is disabled or removed by a page change.",
    "properties": [
      {
        "name": "current",
        "attribute": "current",
        "type": "number",
        "default": "1",
        "description": "Current page (1-based)"
      },
      {
        "name": "total",
        "attribute": "total",
        "type": "number",
        "default": "0",
        "description": "Total number of items"
      },
      {
        "name": "pageSize",
        "attribute": "page-size",
        "type": "number",
        "default": "10",
        "description": "Number of items per page"
      },
      {
        "name": "disabled",
        "attribute": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables the pagination"
      },
      {
        "name": "showQuickJumper",
        "attribute": "show-quick-jumper",
        "type": "boolean",
        "default": "false",
        "description": "Shows an input to jump to a page"
      },
      {
        "name": "showSizeChanger",
        "attribute": "show-size-changer",
        "type": "boolean",
        "default": "false",
        "description": "Shows a page size selector (native `<select>`)"
      },
      {
        "name": "pageSizeOptions",
        "attribute": "page-size-options",
        "type": "number[]",
        "default": "[10, 20, 50, 100]",
        "description": "Options of the page size selector (attribute: `\"10,20,50\"`)"
      },
      {
        "name": "showTotal",
        "attribute": "show-total",
        "type": "boolean",
        "default": "false",
        "description": "Shows the total number of items (customize it with `totalRender`)"
      },
      {
        "name": "size",
        "attribute": "size",
        "type": "\"small\" | \"medium\" | \"large\"",
        "default": "\"medium\"",
        "description": "Pagination size"
      },
      {
        "name": "shape",
        "attribute": "shape",
        "type": "\"circle\" | \"rounded\" | \"square\"",
        "default": "\"rounded\"",
        "description": "Shape of the page items"
      },
      {
        "name": "variant",
        "attribute": "variant",
        "type": "\"solid\" | \"outline\" | \"ghost\"",
        "default": "\"solid\"",
        "description": "Visual style of the page items"
      },
      {
        "name": "simple",
        "attribute": "simple",
        "type": "boolean",
        "default": "false",
        "description": "Simple mode: prev / next buttons with a page input"
      },
      {
        "name": "siblingCount",
        "attribute": "sibling-count",
        "type": "number | undefined",
        "description": "Pages on each side of the current one; switches to the compact list"
      },
      {
        "name": "boundaryCount",
        "attribute": "boundary-count",
        "type": "number | undefined",
        "description": "Pages always shown at both ends of the compact list"
      },
      {
        "name": "hideEdges",
        "attribute": "hide-edges",
        "type": "boolean",
        "default": "false",
        "description": "Hides the prev / next buttons"
      },
      {
        "name": "hideNumbers",
        "attribute": "hide-numbers",
        "type": "boolean",
        "default": "false",
        "description": "Replaces the page buttons with a \"current / total\" counter"
      },
      {
        "name": "responsive",
        "attribute": "responsive",
        "type": "boolean",
        "default": "false",
        "description": "Adapts the layout to small screens"
      },
      {
        "name": "totalRender",
        "type": "(total: number, range: [number, number]) => PaginationRenderResult | undefined",
        "description": "Custom rendering of the total; `range` is the [first, last] item of the page"
      },
      {
        "name": "itemRender",
        "type": "(page: number, type: PaginationItemType) => PaginationRenderResult | undefined",
        "description": "Custom rendering of the page, prev / next and jump items"
      },
      {
        "name": "labels",
        "type": "PaginationLabels | undefined",
        "description": "Custom texts and accessible labels (override the localized defaults)"
      },
      {
        "name": "totalPages",
        "type": "number",
        "readonly": true,
        "description": "Number of pages (at least 1)."
      }
    ],
    "methods": [],
    "events": [
      {
        "name": "minerva-page-change",
        "description": "The user changed the page or the page size (`detail: { page, pageSize }`); cancelable: `preventDefault()` keeps the current page and size (controlled pattern)"
      }
    ],
    "slots": [
      {
        "name": "prev-icon",
        "description": "Icon of the previous-page button"
      },
      {
        "name": "next-icon",
        "description": "Icon of the next-page button"
      },
      {
        "name": "jump-prev-icon",
        "description": "Icon of the jump-backward item"
      },
      {
        "name": "jump-next-icon",
        "description": "Icon of the jump-forward item"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The `<nav>` landmark"
      },
      {
        "name": "item",
        "description": "A page / previous / next / jump button (the current page has aria-current=page)"
      },
      {
        "name": "item--current",
        "description": "Item state of `item`: current"
      },
      {
        "name": "item--disabled",
        "description": "Item state of `item`: disabled"
      },
      {
        "name": "total",
        "description": "The total text"
      },
      {
        "name": "jumper",
        "description": "The quick jumper label (wraps its input)"
      },
      {
        "name": "size-changer",
        "description": "The page size `<select>`"
      },
      {
        "name": "simple-input",
        "description": "The page input of the simple mode"
      }
    ],
    "cssProperties": [
      {
        "name": "--pagination-item-size",
        "description": "Height and minimum width of the page buttons (every size; defaults to the density's control height)"
      },
      {
        "name": "--pagination-item-radius",
        "description": "Corner radius of the page buttons (defaults to --radius-md; the shape prop wins)"
      },
      {
        "name": "--pagination-gap",
        "description": "Space between the items"
      },
      {
        "name": "--pagination-font-size",
        "description": "Font size"
      },
      {
        "name": "--pagination-active-background",
        "description": "Background of the current page (solid variant)"
      },
      {
        "name": "--pagination-active-color",
        "description": "Text color of the current page (solid variant)"
      },
      {
        "name": "--pagination-hover-background",
        "description": "Background of a hovered page button (defaults to --hover-color)"
      },
      {
        "name": "--pagination-subtle-background",
        "description": "Background of the current page of the ghost variant (defaults to --primary-color-subtle)"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Pagination": {
    "kind": "cssVars",
    "source": "react/src/components/Pagination",
    "vars": [
      {
        "name": "--pagination-item-size",
        "description": "Height and minimum width of the page buttons (every size; defaults to the density's control height)"
      },
      {
        "name": "--pagination-item-radius",
        "description": "Corner radius of the page buttons (defaults to --radius-md; the shape prop wins)"
      },
      {
        "name": "--pagination-gap",
        "description": "Space between the items"
      },
      {
        "name": "--pagination-font-size",
        "description": "Font size"
      },
      {
        "name": "--pagination-active-background",
        "description": "Background of the current page (solid variant)"
      },
      {
        "name": "--pagination-active-color",
        "description": "Text color of the current page (solid variant)"
      },
      {
        "name": "--pagination-hover-background",
        "description": "Background of a hovered page button (defaults to --hover-color)"
      },
      {
        "name": "--pagination-subtle-background",
        "description": "Background of the current page of the ghost variant (defaults to --primary-color-subtle)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 尺寸、形状与变体

size、shape 和 variant 设置页码项的样式；sibling-count / boundary-count 切换为紧凑页码列表；disabled 禁用所有交互。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/pagination/wc/appearance.html

```html
<div style="display: grid; gap: 12px">
  <minerva-pagination total="200" size="small"></minerva-pagination>
  <minerva-pagination
    total="200"
    current="4"
    shape="circle"
    variant="outline"
  ></minerva-pagination>
  <minerva-pagination
    total="200"
    current="10"
    size="large"
    shape="square"
    variant="ghost"
    sibling-count="1"
    boundary-count="1"
  ></minerva-pagination>
  <minerva-pagination total="200" current="2" disabled></minerva-pagination>
</div>

```

## Example: 基础用法

total 和 page-size 决定页数。元素会自行更新 current，并触发携带新页码和每页条数的 minerva-page-change；调用 preventDefault() 即可改为受控。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/pagination/wc/basic.html

```html
<div style="display: grid; gap: 12px">
  <minerva-pagination id="pager" total="50"></minerva-pagination>
  <output id="page" aria-live="polite">Page 1 of 5</output>
</div>

```

### apps/docs/src/docs/pages/pagination/wc/basic.ts

```tsx
// Without a listener cancelling it, the element updates `current` itself;
// minerva-page-change reports the new page and page size.
export function setup(root: HTMLElement) {
  const pager = root.querySelector<HTMLElement & { totalPages: number }>(
    "#pager",
  )!;
  const output = root.querySelector<HTMLOutputElement>("#page")!;
  const onChange = (event: Event) => {
    const { page } = (event as CustomEvent<{ page: number }>).detail;
    output.value = `Page ${page} of ${pager.totalPages}`;
  };
  pager.addEventListener("minerva-page-change", onChange);
  return () => pager.removeEventListener("minerva-page-change", onChange);
}

```

## Example: 简洁模式、计数器与图标

simple 显示上一页 / 下一页按钮和页码输入框，hide-numbers 显示“当前 / 总数”计数器。prev-icon、next-icon、jump-prev-icon 和 jump-next-icon 插槽可替换图标；responsive 适配小屏幕。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/pagination/wc/simple.html

```html
<div style="display: grid; gap: 12px">
  <minerva-pagination total="120" simple></minerva-pagination>
  <minerva-pagination total="120" current="3" hide-numbers></minerva-pagination>
  <minerva-pagination total="500" current="25" responsive>
    <span slot="prev-icon" aria-hidden="true">←</span>
    <span slot="next-icon" aria-hidden="true">→</span>
    <span slot="jump-prev-icon" aria-hidden="true">«</span>
    <span slot="jump-next-icon" aria-hidden="true">»</span>
  </minerva-pagination>
</div>

```

## Example: 总数、每页条数与快速跳转

show-total、show-size-changer（选项来自 page-size-options="10,20,50"）和 show-quick-jumper。JS 属性 totalRender 可自定义总数文本。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/pagination/wc/total-and-jumper.html

```html
<minerva-pagination
  id="results"
  total="485"
  page-size="20"
  page-size-options="10,20,50"
  show-total
  show-size-changer
  show-quick-jumper
></minerva-pagination>

```

### apps/docs/src/docs/pages/pagination/wc/total-and-jumper.ts

```tsx
// totalRender is a JS property: it receives the total and the
// [first, last] items of the current page.
export function setup(root: HTMLElement) {
  const pager = root.querySelector<
    HTMLElement & {
      totalRender?: (total: number, range: [number, number]) => string;
    }
  >("#results")!;
  pager.totalRender = (total, [first, last]) =>
    `${first}–${last} of ${total} results`;
}

```
