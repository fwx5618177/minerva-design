# Pagination

Découpe de longues listes de données en pages et permet de naviguer entre elles.

Package: minerva-design@1.20.5

Renderer: native

Locale: fr

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

### Prise en charge du clavier

La pagination est un repère  composé de boutons natifs ; la page courante est marquée avec aria-current="page" et les éléments indisponibles sont désactivés. Lorsqu’un élément a le focus, ArrowLeft/ArrowRight passent à la page précédente/suivante et Home/End à la première/dernière page, et le focus suit la page courante. Si le bouton focalisé devient désactivé, le focus passe à la page courante.

## Pagination

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
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
    "source": "packages/native/src/components/Pagination/Pagination.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Current page (1-based, controlled); update it in onChange"
  },
  {
    "name": "defaultCurrent",
    "source": "packages/native/src/components/Pagination/Pagination.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 1,
    "required": false,
    "description": "Initial page when uncontrolled (current not set)"
  },
  {
    "name": "total",
    "source": "packages/native/src/components/Pagination/Pagination.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 0,
    "required": false,
    "description": "Total number of items"
  },
  {
    "name": "pageSize",
    "source": "packages/native/src/components/Pagination/Pagination.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Number of items per page (controlled); update it in onChange"
  },
  {
    "name": "defaultPageSize",
    "source": "packages/native/src/components/Pagination/Pagination.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 10,
    "required": false,
    "description": "Initial number of items per page when uncontrolled (pageSize not set)"
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/Pagination/Pagination.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the pagination"
  },
  {
    "name": "size",
    "source": "packages/native/src/components/Pagination/Pagination.tsx",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "PaginationSize | undefined",
    "typeRef": "type:83cf102378f0fbef88ef",
    "default": "medium",
    "required": false,
    "description": "Pagination size (page items of the `--control-height-xs|sm|md` heights; touch areas always reach 44pt)"
  },
  {
    "name": "shape",
    "source": "packages/native/src/components/Pagination/Pagination.tsx",
    "kind": "enum",
    "values": [
      "circle",
      "rounded",
      "square"
    ],
    "typeText": "PaginationShape | undefined",
    "typeRef": "type:0436d06111ea9ef961a0",
    "default": "rounded",
    "required": false,
    "description": "Shape of the page items"
  },
  {
    "name": "variant",
    "source": "packages/native/src/components/Pagination/Pagination.tsx",
    "kind": "enum",
    "values": [
      "ghost",
      "outline",
      "solid"
    ],
    "typeText": "PaginationVariant | undefined",
    "typeRef": "type:651e27e97cc11c5303c0",
    "default": "solid",
    "required": false,
    "description": "Visual style of the page items: `solid` (current page filled with the primary color), `outline` (current page bordered) or `ghost` (tinted)"
  },
  {
    "name": "simple",
    "source": "packages/native/src/components/Pagination/Pagination.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Simple mode: prev / next buttons around a \"2 / 5\" counter (best on narrow phone screens)"
  },
  {
    "name": "siblingCount",
    "source": "packages/native/src/components/Pagination/Pagination.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Pages shown on each side of the current page; setting it (or boundaryCount) switches to the compact list with ellipses (try 1 on phones)"
  },
  {
    "name": "boundaryCount",
    "source": "packages/native/src/components/Pagination/Pagination.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Pages always shown at both ends of the compact list"
  },
  {
    "name": "hideEdges",
    "source": "packages/native/src/components/Pagination/Pagination.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Hides the prev / next buttons"
  },
  {
    "name": "hideNumbers",
    "source": "packages/native/src/components/Pagination/Pagination.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Replaces the page buttons with a read-only \"current / total\" counter, keeping the prev / next buttons"
  },
  {
    "name": "showTotal",
    "source": "packages/native/src/components/Pagination/Pagination.tsx",
    "kind": "node",
    "typeText": "boolean | ((total: number, range: [number, number]) => ReactNode) | undefined",
    "typeRef": "type:51324877387476e0482a",
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
    "description": "Shows the total number of items (\"Total N items\", localized); a function renders it from the total and the `[first, last]` item range"
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/native/src/components/Pagination/Pagination.tsx",
    "kind": "function",
    "typeText": "((page: number, pageSize: number) => void) | undefined",
    "typeRef": "type:b826af51727cd6c548f2",
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
    "description": "Called with the requested page and page size"
  }
]
```

## API

```json
{
  "native:PaginationProps": {
    "source": "native/src/components/Pagination/Pagination.tsx",
    "kind": "interface",
    "extends": [
      "Omit<ViewProps, \"style\" | \"children\">"
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
        "description": "Called with the requested page and page size"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the pagination"
      },
      {
        "name": "size",
        "type": "PaginationSize",
        "required": false,
        "default": "\"medium\"",
        "description": "Pagination size (page items of the `--control-height-xs|sm|md` heights; touch areas always reach 44pt)"
      },
      {
        "name": "shape",
        "type": "PaginationShape",
        "required": false,
        "default": "\"rounded\"",
        "description": "Shape of the page items"
      },
      {
        "name": "variant",
        "type": "PaginationVariant",
        "required": false,
        "default": "\"solid\"",
        "description": "Visual style of the page items: `solid` (current page filled with the primary color), `outline` (current page bordered) or `ghost` (tinted)"
      },
      {
        "name": "simple",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Simple mode: prev / next buttons around a \"2 / 5\" counter (best on narrow phone screens)"
      },
      {
        "name": "siblingCount",
        "type": "number",
        "required": false,
        "description": "Pages shown on each side of the current page; setting it (or boundaryCount) switches to the compact list with ellipses (try 1 on phones)"
      },
      {
        "name": "boundaryCount",
        "type": "number",
        "required": false,
        "description": "Pages always shown at both ends of the compact list"
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
        "description": "Replaces the page buttons with a read-only \"current / total\" counter, keeping the prev / next buttons"
      },
      {
        "name": "showTotal",
        "type": "boolean | ((total: number, range: [number, number]) => ReactNode)",
        "required": false,
        "default": "false",
        "description": "Shows the total number of items (\"Total N items\", localized); a function renders it from the total and the `[first, last]` item range"
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Style of the container"
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

## Example: Utilisation de base

50 éléments, 10 par page : départ à la page 1 sur 5, puis passage à la page 2.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/pagination/native/basic.tsx

```tsx
import { Pagination } from "minerva-design/native";
export default function Basic() {
  return <Pagination defaultCurrent={1} total={50} />;
}

```

## Example: Mode simple

120 éléments sur 12 pages. Précédent et Suivant mettent à jour la page contrôlée.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/pagination/native/simple.tsx

```tsx
import { useState } from "react";
import { Pagination } from "minerva-design/native";
export default function Simple() {
  const [page, setPage] = useState(1);
  return <Pagination simple current={page} total={120} onChange={setPage} />;
}

```
