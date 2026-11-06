# Pagination

Découpe de longues listes de données en pages et permet de naviguer entre elles.

Package: minerva-design@1.22.0

Renderer: wc

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.0",
  "sourceCommit": "e2a31507ecfcdb5ffcd33b05b47404c7625bb883",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:2459da5f08881aec3d2ac2d940ce35e7a61d0e0e679c0c167d8b5fdf8330a456"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.0/types.json) or getType() from minerva-design/contracts.

## Documentation

### Prise en charge du clavier

La pagination est un repère  composé de boutons natifs ; la page courante est marquée avec aria-current="page" et les éléments indisponibles sont désactivés. Lorsqu’un élément a le focus, ArrowLeft/ArrowRight passent à la page précédente/suivante et Home/End à la première/dernière page, et le focus suit la page courante. Si le bouton focalisé devient désactivé, le focus passe à la page courante.

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

## Example: Tailles, formes et variantes

size, shape et variant stylent les éléments ; sibling-count / boundary-count passent à une liste de pages compacte ; disabled bloque toute interaction.

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

## Example: Utilisation de base

total et page-size déterminent le nombre de pages. L’élément met à jour current lui-même et émet minerva-page-change avec la nouvelle page et la taille de page ; appelez preventDefault() pour le contrôler.

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

## Example: Mode simple, compteur et icônes

simple affiche précédent / suivant avec un champ de page, hide-numbers un compteur « page / total ». Les slots prev-icon, next-icon, jump-prev-icon et jump-next-icon remplacent les icônes ; responsive s’adapte aux petits écrans.

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

## Example: Total, taille de page et saut rapide

show-total, show-size-changer (options issues de page-size-options="10,20,50") et show-quick-jumper. totalRender, une propriété JS, personnalise le texte du total.

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
