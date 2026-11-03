# Pagination

Splits long lists of data into pages and lets users move between them.

Package: minerva-design@1.19.3

Renderer: react

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:ed8b6b1bf30e9055934099f84afd6b8369eee155b0404de5e8db004c3d91bce6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

### Keyboard support

The pagination is a  landmark made of native buttons; the current page is marked with aria-current="page" and unavailable items are disabled. When an item has focus, ArrowLeft/ArrowRight go to the previous/next page and Home/End to the first/last page, and focus follows the current page. If the focused button becomes disabled, focus moves to the current page.

## Pagination

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "Pagination"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "current",
    "source": "packages/react/src/components/Pagination/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Current page (1-based, controlled); update it in onChange"
  },
  {
    "name": "defaultCurrent",
    "source": "packages/react/src/components/Pagination/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 1,
    "required": false,
    "description": "Initial page when uncontrolled (current not set)"
  },
  {
    "name": "total",
    "source": "packages/react/src/components/Pagination/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 0,
    "required": false,
    "description": "Total number of items"
  },
  {
    "name": "pageSize",
    "source": "packages/react/src/components/Pagination/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Number of items per page (controlled); update it in onChange"
  },
  {
    "name": "defaultPageSize",
    "source": "packages/react/src/components/Pagination/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 10,
    "required": false,
    "description": "Initial number of items per page when uncontrolled (pageSize not set)"
  },
  {
    "name": "disabled",
    "source": "packages/react/src/components/Pagination/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the pagination"
  },
  {
    "name": "showQuickJumper",
    "source": "packages/react/src/components/Pagination/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows an input to jump to a page"
  },
  {
    "name": "showSizeChanger",
    "source": "packages/react/src/components/Pagination/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows a page size selector"
  },
  {
    "name": "pageSizeOptions",
    "source": "packages/react/src/components/Pagination/types.ts",
    "kind": "array",
    "typeText": "number[] | undefined",
    "typeRef": "type:2a04a2225ac8229b1a84",
    "required": false,
    "description": "Options of the page size selector"
  },
  {
    "name": "itemRender",
    "source": "packages/react/src/components/Pagination/types.ts",
    "kind": "node",
    "typeText": "((page: number, type: \"page\" | \"prev\" | \"next\" | \"jump-prev\" | \"jump-next\") => ReactNode) | undefined",
    "typeRef": "type:0b3e8cbe60dd72cd4dba",
    "parameters": [
      {
        "name": "page",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      },
      {
        "name": "type",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "\"page\" | \"prev\" | \"next\" | \"jump-prev\" | \"jump-next\"",
        "typeRef": "type:23db8ff175454c93cb85"
      }
    ],
    "returnType": {
      "typeText": "ReactNode",
      "typeRef": "type:d947e2db6b7ed3e4c192"
    },
    "required": false,
    "description": "Custom rendering of the page, prev/next and jump items"
  },
  {
    "name": "showTotal",
    "source": "packages/react/src/components/Pagination/types.ts",
    "kind": "node",
    "typeText": "boolean | ((total: number, range: [number, number]) => ReactNode) | undefined",
    "typeRef": "type:dc0ced254e74816047bb",
    "parameters": [
      {
        "name": "total",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      },
      {
        "name": "range",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "[number, number]",
        "typeRef": "type:d0a9da0989240a301afe"
      }
    ],
    "returnType": {
      "typeText": "ReactNode",
      "typeRef": "type:d947e2db6b7ed3e4c192"
    },
    "default": false,
    "required": false,
    "description": "Shows the total number of items; a function renders it (same signature as totalRender)"
  },
  {
    "name": "totalRender",
    "source": "packages/react/src/components/Pagination/types.ts",
    "kind": "node",
    "typeText": "((total: number, range: [number, number]) => ReactNode) | undefined",
    "typeRef": "type:f255bb544728c8075ad0",
    "parameters": [
      {
        "name": "total",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      },
      {
        "name": "range",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "[number, number]",
        "typeRef": "type:d0a9da0989240a301afe"
      }
    ],
    "returnType": {
      "typeText": "ReactNode",
      "typeRef": "type:d947e2db6b7ed3e4c192"
    },
    "required": false,
    "description": "Custom rendering of the total (default \"Total N items\", localized); range is the [first, last] item index of the current page"
  },
  {
    "name": "size",
    "source": "packages/react/src/components/Pagination/types.ts",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "\"small\" | \"medium\" | \"large\" | undefined",
    "typeRef": "type:8d5b6882dc615b54818b",
    "default": "medium",
    "required": false,
    "description": "Pagination size"
  },
  {
    "name": "shape",
    "source": "packages/react/src/components/Pagination/types.ts",
    "kind": "enum",
    "values": [
      "circle",
      "rounded",
      "square"
    ],
    "typeText": "\"circle\" | \"square\" | \"rounded\" | undefined",
    "typeRef": "type:76849e9a145c5140e0b1",
    "default": "rounded",
    "required": false,
    "description": "Shape of the page items"
  },
  {
    "name": "variant",
    "source": "packages/react/src/components/Pagination/types.ts",
    "kind": "enum",
    "values": [
      "ghost",
      "outline",
      "solid"
    ],
    "typeText": "\"solid\" | \"outline\" | \"ghost\" | undefined",
    "typeRef": "type:da3cbf1bd0de7cd633f9",
    "default": "solid",
    "required": false,
    "description": "Visual style of the page items: `solid` (current page filled with the primary color), `outline` (current page with a primary border and text) or `ghost` (borderless transparent items, current page in primary text, tinted on hover)"
  },
  {
    "name": "simple",
    "source": "packages/react/src/components/Pagination/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Simple mode: prev/next buttons with a page input"
  },
  {
    "name": "siblingCount",
    "source": "packages/react/src/components/Pagination/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Number of pages shown on each side of the current page. Setting it (or boundaryCount) switches the page list to the compact layout: first / last pages, the pages around the current one and non-interactive \"…\" gaps, e.g. [1][…][4][5][6][…][10]"
  },
  {
    "name": "boundaryCount",
    "source": "packages/react/src/components/Pagination/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Number of pages always shown at the start and the end of the compact page list (see siblingCount)"
  },
  {
    "name": "hideEdges",
    "source": "packages/react/src/components/Pagination/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Hides the prev / next buttons"
  },
  {
    "name": "hideNumbers",
    "source": "packages/react/src/components/Pagination/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Replaces the page buttons with a read-only \"current / total\" counter (announced politely), keeping the prev / next buttons"
  },
  {
    "name": "responsive",
    "source": "packages/react/src/components/Pagination/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Adapts the layout to small screens"
  },
  {
    "name": "icons",
    "source": "packages/react/src/components/Pagination/types.ts",
    "kind": "node",
    "typeText": "{ prev?: ReactNode; next?: ReactNode; jumpPrev?: ReactNode; jumpNext?: ReactNode; } | undefined",
    "typeRef": "type:9bd5ea750bbfe20fa823",
    "required": false,
    "description": "Custom icons for the prev, next and jump items; omitted ones keep the default icon"
  },
  {
    "name": "labels",
    "source": "packages/react/src/components/Pagination/types.ts",
    "kind": "object",
    "typeText": "PaginationLabels | undefined",
    "typeRef": "type:08115e33f33fff3e17a0",
    "required": false,
    "description": "Custom texts and accessible labels. Each one overrides the localized default (English defaults shown below)"
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/react/src/components/Pagination/types.ts",
    "kind": "function",
    "typeText": "((page: number, pageSize: number) => void) | undefined",
    "typeRef": "type:36291e0fc665b43fc9f1",
    "parameters": [
      {
        "name": "page",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      },
      {
        "name": "pageSize",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the new page and page size when the page or page size changes (changing the page size resets to page 1)"
  }
]
```

## API

```json
{
  "PaginationProps": {
    "source": "react/src/components/Pagination/types.ts",
    "kind": "interface",
    "extends": [
      "Omit<HTMLAttributes<HTMLElement>, \"onChange\" | \"children\">"
    ],
    "props": [
      {
        "name": "current",
        "type": "number",
        "required": false,
        "description": "Current page (1-based, controlled); update it in onChange"
      },
      {
        "name": "defaultCurrent",
        "type": "number",
        "required": false,
        "default": "1",
        "description": "Initial page when uncontrolled (current not set)"
      },
      {
        "name": "total",
        "type": "number",
        "required": false,
        "default": "0",
        "description": "Total number of items"
      },
      {
        "name": "pageSize",
        "type": "number",
        "required": false,
        "description": "Number of items per page (controlled); update it in onChange"
      },
      {
        "name": "defaultPageSize",
        "type": "number",
        "required": false,
        "default": "10",
        "description": "Initial number of items per page when uncontrolled (pageSize not set)"
      },
      {
        "name": "onChange",
        "type": "(page: number, pageSize: number) => void",
        "required": false,
        "description": "Called with the new page and page size when the page or page size changes (changing the page size resets to page 1)"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the pagination"
      },
      {
        "name": "showQuickJumper",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows an input to jump to a page"
      },
      {
        "name": "showSizeChanger",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows a page size selector"
      },
      {
        "name": "pageSizeOptions",
        "type": "number[]",
        "required": false,
        "default": "[10, 20, 50, 100]",
        "description": "Options of the page size selector"
      },
      {
        "name": "itemRender",
        "type": "(page: number, type: \"page\" | \"prev\" | \"next\" | \"jump-prev\" | \"jump-next\") => ReactNode",
        "required": false,
        "description": "Custom rendering of the page, prev/next and jump items"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional class name"
      },
      {
        "name": "style",
        "type": "CSSProperties",
        "required": false,
        "description": "Inline styles"
      },
      {
        "name": "showTotal",
        "type": "boolean | ((total: number, range: [number, number]) => ReactNode)",
        "required": false,
        "default": "false",
        "description": "Shows the total number of items; a function renders it (same signature as totalRender)"
      },
      {
        "name": "totalRender",
        "type": "(total: number, range: [number, number]) => ReactNode",
        "required": false,
        "description": "Custom rendering of the total (default \"Total N items\", localized); range is the [first, last] item index of the current page"
      },
      {
        "name": "size",
        "type": "\"small\" | \"medium\" | \"large\"",
        "required": false,
        "default": "\"medium\"",
        "description": "Pagination size"
      },
      {
        "name": "shape",
        "type": "\"circle\" | \"rounded\" | \"square\"",
        "required": false,
        "default": "\"rounded\"",
        "description": "Shape of the page items"
      },
      {
        "name": "variant",
        "type": "\"solid\" | \"outline\" | \"ghost\"",
        "required": false,
        "default": "\"solid\"",
        "description": "Visual style of the page items: `solid` (current page filled with the primary color), `outline` (current page with a primary border and text) or `ghost` (borderless transparent items, current page in primary text, tinted on hover)"
      },
      {
        "name": "simple",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Simple mode: prev/next buttons with a page input"
      },
      {
        "name": "siblingCount",
        "type": "number",
        "required": false,
        "description": "Number of pages shown on each side of the current page. Setting it (or boundaryCount) switches the page list to the compact layout: first / last pages, the pages around the current one and non-interactive \"…\" gaps, e.g. [1][…][4][5][6][…][10]"
      },
      {
        "name": "boundaryCount",
        "type": "number",
        "required": false,
        "description": "Number of pages always shown at the start and the end of the compact page list (see siblingCount)"
      },
      {
        "name": "hideEdges",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Hides the prev / next buttons"
      },
      {
        "name": "hideNumbers",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Replaces the page buttons with a read-only \"current / total\" counter (announced politely), keeping the prev / next buttons"
      },
      {
        "name": "responsive",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Adapts the layout to small screens"
      },
      {
        "name": "icons",
        "type": "{ prev?: ReactNode; next?: ReactNode; jumpPrev?: ReactNode; jumpNext?: ReactNode; }",
        "required": false,
        "description": "Custom icons for the prev, next and jump items; omitted ones keep the default icon"
      },
      {
        "name": "labels",
        "type": "PaginationLabels",
        "required": false,
        "description": "Custom texts and accessible labels. Each one overrides the localized default (English defaults shown below)"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLElement>",
        "required": false,
        "description": "Ref to the root <nav> element"
      }
    ]
  },
  "PaginationLabels": {
    "source": "react/src/components/Pagination/types.ts",
    "description": "Texts of Pagination; every omitted entry uses the localized default",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "prev",
        "type": "string",
        "required": false,
        "default": "\"Previous page\" (localized)",
        "description": "Accessible label of the previous-page button"
      },
      {
        "name": "next",
        "type": "string",
        "required": false,
        "default": "\"Next page\" (localized)",
        "description": "Accessible label of the next-page button"
      },
      {
        "name": "jumpPrev",
        "type": "string",
        "required": false,
        "default": "\"Previous 5 pages\" (localized)",
        "description": "Label of the jump-backward item"
      },
      {
        "name": "jumpNext",
        "type": "string",
        "required": false,
        "default": "\"Next 5 pages\" (localized)",
        "description": "Label of the jump-forward item"
      },
      {
        "name": "page",
        "type": "(page: number) => string",
        "required": false,
        "default": "(page) => `Page ${page}` (localized)",
        "description": "Accessible label of a page button"
      },
      {
        "name": "jumpTo",
        "type": "ReactNode",
        "required": false,
        "default": "\"Go to\" (localized)",
        "description": "Visible text of the quick jumper"
      },
      {
        "name": "jumpToInput",
        "type": "string",
        "required": false,
        "default": "\"Jump to page\" (localized)",
        "description": "Accessible label of the quick jumper input"
      },
      {
        "name": "pageSize",
        "type": "string",
        "required": false,
        "default": "\"Items per page\" (localized)",
        "description": "Accessible label of the page size selector"
      },
      {
        "name": "pageSizeOption",
        "type": "(size: number) => string",
        "required": false,
        "default": "(size) => `${size} / page` (localized)",
        "description": "Text of a page size option"
      },
      {
        "name": "currentPage",
        "type": "string",
        "required": false,
        "default": "\"Current page\" (localized)",
        "description": "Accessible label of the simple-mode page input"
      },
      {
        "name": "total",
        "type": "(total: number) => string",
        "required": false,
        "default": "(total) => `Total ${total} items` (localized)",
        "description": "Text of the total (when showTotal is true and there is no totalRender)"
      },
      {
        "name": "nav",
        "type": "string",
        "required": false,
        "default": "\"Pagination\" (localized)",
        "description": "Accessible label of the <nav> landmark"
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

## Example: Basic usage

Starts on page 1 of 5: 50 items with 10 items per page. Next page advances to page 2.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/pagination/demos/basic.tsx

```tsx
import { Pagination } from "minerva-design";

export default function BasicDemo() {
  return <Pagination defaultCurrent={1} total={50} />;
}

```

## Example: Compact page list and counter

siblingCount / boundaryCount switch to a compact list with non-interactive gaps; hideNumbers shows a "current / total" counter and hideEdges removes prev / next.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/pagination/demos/compact.tsx

```tsx
import { Pagination } from "minerva-design";

export default function CompactDemo() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <Pagination
        total={300}
        defaultCurrent={8}
        siblingCount={1}
        boundaryCount={1}
      />
      <Pagination
        total={300}
        defaultCurrent={8}
        siblingCount={2}
        boundaryCount={2}
      />
      <Pagination total={300} defaultCurrent={3} hideNumbers showTotal />
      <Pagination total={70} defaultCurrent={2} hideEdges />
    </div>
  );
}

```

## Example: Custom rendering

Replace the icons, or render every item yourself with itemRender.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/pagination/demos/custom-render.tsx

```tsx
import { useState } from "react";
import { Pagination } from "minerva-design";
import {
  IoArrowBack,
  IoArrowForward,
  IoPlayBack,
  IoPlayForward,
} from "react-icons/io5";

export default function CustomRenderDemo() {
  const [page, setPage] = useState(1);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Pagination
        current={page}
        total={100}
        onChange={setPage}
        icons={{
          prev: <IoArrowBack />,
          next: <IoArrowForward />,
          jumpPrev: <IoPlayBack />,
          jumpNext: <IoPlayForward />,
        }}
      />
      <Pagination
        current={page}
        total={100}
        onChange={setPage}
        itemRender={(p, type) =>
          type === "prev"
            ? "Prev"
            : type === "next"
              ? "Next"
              : type === "page"
                ? p
                : "…"
        }
      />
    </div>
  );
}

```

## Example: Disabled

Disable all interaction.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/pagination/demos/disabled.tsx

```tsx
import { Pagination } from "minerva-design";

export default function DisabledDemo() {
  return <Pagination current={2} total={50} disabled />;
}

```

## Example: Many pages

With many pages, the first and last pages stay visible and ellipsis items jump 5 pages at a time.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/pagination/demos/many-pages.tsx

```tsx
import { useState } from "react";
import { Pagination } from "minerva-design";

export default function ManyPagesDemo() {
  const [page, setPage] = useState(6);

  return <Pagination current={page} total={500} onChange={setPage} />;
}

```

## Example: Responsive

responsive adapts the layout on small screens.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/pagination/demos/responsive.tsx

```tsx
import { useState } from "react";
import { Pagination } from "minerva-design";

export default function ResponsiveDemo() {
  const [page, setPage] = useState(1);

  return (
    <Pagination
      responsive
      current={page}
      total={300}
      onChange={setPage}
      showTotal
      showSizeChanger
    />
  );
}

```

## Example: Shapes and variants

Combine a shape (rounded, circle, square) with a variant (solid, outline, ghost).

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/pagination/demos/shapes-and-variants.tsx

```tsx
import { useState } from "react";
import { Pagination } from "minerva-design";

export default function ShapesAndVariantsDemo() {
  const [page, setPage] = useState(2);
  const common = { current: page, total: 50, onChange: setPage };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Pagination {...common} shape="rounded" variant="solid" />
      <Pagination {...common} shape="circle" variant="outline" />
      <Pagination {...common} shape="square" variant="ghost" />
    </div>
  );
}

```

## Example: Simple mode

Starts on page 1 of 12 with 120 items. Previous and Next change the controlled current page.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/pagination/demos/simple.tsx

```tsx
import { useState } from "react";
import { Pagination } from "minerva-design";

export default function SimpleDemo() {
  const [page, setPage] = useState(1);

  return <Pagination simple current={page} total={120} onChange={setPage} />;
}

```

## Example: Page size changer

showSizeChanger adds a page size selector; onChange then receives page 1 and the new page size.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/pagination/demos/size-changer.tsx

```tsx
import { useState } from "react";
import { Pagination } from "minerva-design";

export default function SizeChangerDemo() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  return (
    <Pagination
      current={page}
      pageSize={pageSize}
      total={500}
      showSizeChanger
      pageSizeOptions={[10, 20, 50]}
      onChange={(nextPage, nextSize) => {
        setPage(nextPage);
        setPageSize(nextSize);
      }}
    />
  );
}

```

## Example: Sizes

Three sizes: small, medium (default) and large.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/pagination/demos/sizes.tsx

```tsx
import { useState } from "react";
import { Pagination } from "minerva-design";

const sizes = ["small", "medium", "large"] as const;

export default function SizesDemo() {
  const [page, setPage] = useState(2);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {sizes.map((size) => (
        <Pagination
          key={size}
          size={size}
          current={page}
          total={50}
          onChange={setPage}
        />
      ))}
    </div>
  );
}

```

## Example: Total and quick jumper

showTotal displays the number of items (customizable with totalRender); showQuickJumper adds a "Go to" input.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/pagination/demos/total-and-jumper.tsx

```tsx
import { useState } from "react";
import { Pagination } from "minerva-design";

export default function TotalAndJumperDemo() {
  const [page, setPage] = useState(1);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Pagination
        current={page}
        total={200}
        onChange={setPage}
        showTotal
        showQuickJumper
      />
      <Pagination
        current={page}
        total={200}
        onChange={setPage}
        showTotal
        totalRender={(total, [from, to]) => `${from}-${to} of ${total} items`}
      />
    </div>
  );
}

```
