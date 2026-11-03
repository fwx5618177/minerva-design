# ResponsiveGrid レスポンシブグリッド

列数がビューポートではなく自身の幅（コンテナクエリ）に従う等幅カラムのグリッド。

Package: minerva-design@1.20.1

Renderer: wc

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.1",
  "sourceCommit": "3a9f5cdaae706f14fe6d8c65c5481eba719a66c4",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:6c9ecba0079f25e53cd971e51f2be8604fc3d941c0ed1cfeec03c4a91913ad73"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## GridItem

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/grid-item",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "fullWidth",
    "typeText": "boolean",
    "attribute": "full-width",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "Content"
  }
]
```

## ResponsiveGrid

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/responsive-grid",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "columns",
    "typeText": "ResponsiveGridColumns",
    "attribute": "columns",
    "required": false
  },
  {
    "name": "gap",
    "typeText": "string | number",
    "attribute": "gap",
    "required": false
  },
  {
    "name": "rowGap",
    "typeText": "string | number | undefined",
    "attribute": "row-gap",
    "required": false
  },
  {
    "name": "columnGap",
    "typeText": "string | number | undefined",
    "attribute": "column-gap",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "Grid items"
  }
]
```

## API

```json
{
  "wc:minerva-responsive-grid": {
    "kind": "element",
    "source": "web-components/src/components/responsive-grid/responsive-grid.ts",
    "className": "MinervaResponsiveGrid",
    "summary": "Container-query column grid.",
    "description": "An equal-width column grid whose column count follows its own available width (container queries at 480 / 768 / 1200px), not the viewport (`<ResponsiveGrid>` of React). Children are the grid items (wrap them in `<minerva-grid-item>` to span a full row). the React library's `.layout > *` rule reaches them through `::slotted(*)`.",
    "properties": [
      {
        "name": "columns",
        "attribute": "columns",
        "type": "ResponsiveGridColumns",
        "default": "1",
        "description": "Column counts (integers 1-12): a number, `\"1 2 3 4\"` (base sm md lg) or `{ base, sm, md, lg }` (container widths 480 / 768 / 1200px)"
      },
      {
        "name": "gap",
        "attribute": "gap",
        "type": "string | number",
        "default": "4",
        "description": "Gap between rows and columns (spacing token number or CSS value)"
      },
      {
        "name": "rowGap",
        "attribute": "row-gap",
        "type": "string | number | undefined",
        "description": "Gap between rows; defaults to `gap`"
      },
      {
        "name": "columnGap",
        "attribute": "column-gap",
        "type": "string | number | undefined",
        "description": "Gap between columns; defaults to `gap`"
      }
    ],
    "methods": [],
    "events": [],
    "slots": [
      {
        "name": "",
        "description": "Grid items"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The query container"
      },
      {
        "name": "layout",
        "description": "The grid (its children are the grid items)"
      }
    ],
    "cssProperties": [
      {
        "name": "--responsive-grid-align-items",
        "description": "Vertical alignment of the items in their row (default: stretch)"
      },
      {
        "name": "--responsive-grid-justify-items",
        "description": "Horizontal alignment of the items in their column (default: stretch)"
      }
    ]
  },
  "wc:minerva-grid-item": {
    "kind": "element",
    "source": "web-components/src/components/responsive-grid/responsive-grid.ts",
    "className": "MinervaGridItem",
    "summary": "Grid cell, optionally spanning the full row.",
    "description": "A cell of a `<minerva-responsive-grid>` (or any CSS grid) (`<GridItem>` of React); `full-width` spans the whole row. The element itself is the grid item (the React library's `asChild` has no equivalent: style the element).",
    "properties": [
      {
        "name": "fullWidth",
        "attribute": "full-width",
        "type": "boolean",
        "default": "false",
        "description": "Spans the full row of the surrounding grid"
      }
    ],
    "methods": [],
    "events": [],
    "slots": [
      {
        "name": "",
        "description": "Content"
      }
    ],
    "parts": [],
    "cssProperties": [
      {
        "name": "--responsive-grid-align-items",
        "description": "Vertical alignment of the items in their row (default: stretch)"
      },
      {
        "name": "--responsive-grid-justify-items",
        "description": "Horizontal alignment of the items in their column (default: stretch)"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:ResponsiveGrid": {
    "kind": "cssVars",
    "source": "react/src/components/ResponsiveGrid",
    "vars": [
      {
        "name": "--responsive-grid-align-items",
        "description": "Vertical alignment of the items in their row (default: stretch)"
      },
      {
        "name": "--responsive-grid-justify-items",
        "description": "Horizontal alignment of the items in their column (default: stretch)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基本的な使い方

columns="1 2 3 4" は base、sm、md、lg のコンテナ幅ごとの列数を設定します。グリッドはビューポートではなく自身の幅に従います。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/responsive-grid/wc/basic.html

```html
<minerva-responsive-grid columns="1 2 3 4" gap="3">
  <minerva-box p="4" bg="bg.muted" rounded="md">1</minerva-box>
  <minerva-box p="4" bg="bg.muted" rounded="md">2</minerva-box>
  <minerva-box p="4" bg="bg.muted" rounded="md">3</minerva-box>
  <minerva-box p="4" bg="bg.muted" rounded="md">4</minerva-box>
  <minerva-box p="4" bg="bg.muted" rounded="md">5</minerva-box>
  <minerva-box p="4" bg="bg.muted" rounded="md">6</minerva-box>
  <minerva-box p="4" bg="bg.muted" rounded="md">7</minerva-box>
  <minerva-box p="4" bg="bg.muted" rounded="md">8</minerva-box>
</minerva-responsive-grid>

```

## Example: コンテナのブレークポイント

columns は JSON（{"base": 1, "sm": 2, "lg": 4}、指定のないブレークポイントは前の値を継承）も受け付け、row-gap / column-gap で間隔を個別に指定できます。スライダーでコンテナの幅を変えてみてください。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/responsive-grid/wc/container.html

```html
<label style="display: flex; gap: 8px; align-items: center">
  Container width
  <input id="width" type="range" min="280" max="1300" step="10" value="1300" />
  <output id="value">1300px</output>
</label>
<div
  id="frame"
  style="
    max-width: 100%;
    width: 1300px;
    margin-top: 12px;
    padding: 8px;
    border: 1px dashed var(--border-color);
  "
>
  <minerva-responsive-grid
    columns='{"base": 1, "sm": 2, "lg": 4}'
    row-gap="2"
    column-gap="6"
  >
    <minerva-box p="4" bg="bg.muted" rounded="md">A</minerva-box>
    <minerva-box p="4" bg="bg.muted" rounded="md">B</minerva-box>
    <minerva-box p="4" bg="bg.muted" rounded="md">C</minerva-box>
    <minerva-box p="4" bg="bg.muted" rounded="md">D</minerva-box>
  </minerva-responsive-grid>
</div>

```

### apps/docs/src/docs/pages/responsive-grid/wc/container.ts

```tsx
// Columns follow the grid's own width (container queries), not the viewport:
// 1 column below 480px, 2 from 480px (md inherits sm), 4 from 1200px.
export function setup(root: HTMLElement) {
  const input = root.querySelector<HTMLInputElement>("#width")!;
  const value = root.querySelector<HTMLOutputElement>("#value")!;
  const frame = root.querySelector<HTMLElement>("#frame")!;
  const onInput = () => {
    frame.style.width = `${input.value}px`;
    value.value = `${input.value}px`;
  };
  input.addEventListener("input", onInput);
  return () => input.removeEventListener("input", onInput);
}

```

## Example: 全幅のアイテム

子要素を <minerva-grid-item full-width> で囲むと行全体に広がります。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/responsive-grid/wc/full-width.html

```html
<minerva-responsive-grid columns="2 3" gap="3">
  <minerva-grid-item full-width>
    <minerva-box
      p="3"
      bg="bg.subtle"
      rounded="md"
      border="1px solid var(--border-color)"
    >
      Full-width header row
    </minerva-box>
  </minerva-grid-item>
  <minerva-grid-item
    ><minerva-box p="4" bg="bg.muted" rounded="md"
      >1</minerva-box
    ></minerva-grid-item
  >
  <minerva-grid-item
    ><minerva-box p="4" bg="bg.muted" rounded="md"
      >2</minerva-box
    ></minerva-grid-item
  >
  <minerva-grid-item
    ><minerva-box p="4" bg="bg.muted" rounded="md"
      >3</minerva-box
    ></minerva-grid-item
  >
  <minerva-grid-item full-width>
    <minerva-box
      p="3"
      bg="bg.subtle"
      rounded="md"
      border="1px solid var(--border-color)"
    >
      Full-width footer row
    </minerva-box>
  </minerva-grid-item>
</minerva-responsive-grid>

```
