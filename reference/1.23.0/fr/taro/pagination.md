# Pagination

Découpe de longues listes de données en pages et permet de naviguer entre elles.

Package: minerva-design@1.23.0

Renderer: taro

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "19d3efc34af8ba4e23df0f24d9fbb0a587e1b452",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:ec29900df0d5b5c8d741436acb4a250ec29e5f40ce1f4110def33ac2d66baaa5"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

### Prise en charge du clavier

La pagination est un repère  composé de boutons natifs ; la page courante est marquée avec aria-current="page" et les éléments indisponibles sont désactivés. Lorsqu’un élément a le focus, ArrowLeft/ArrowRight passent à la page précédente/suivante et Home/End à la première/dernière page, et le focus suit la page courante. Si le bouton focalisé devient désactivé, le focus passe à la page courante.

## Pagination

Support: beta

Shared page bounds/visible ranges/items, controlled page and size rejection, one combined size-change event, simple draft rollback, hideEdges, item/total renderers, icons and responsive page-number collapse. Native touch/view semantics differ from browser DOM semantics. Native devices do not expose document focus, inert, browser portals or File input APIs; H5 capabilities are specified separately. Device-runtime validation is still required. Page-size choices use native buttons instead of a browser select; quick jump commits with the native input confirm event. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
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
    "source": "packages/taro/src/navigation.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false
  },
  {
    "name": "defaultCurrent",
    "source": "packages/taro/src/navigation.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false
  },
  {
    "name": "total",
    "source": "packages/taro/src/navigation.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false
  },
  {
    "name": "pageSize",
    "source": "packages/taro/src/navigation.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false
  },
  {
    "name": "defaultPageSize",
    "source": "packages/taro/src/navigation.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false
  },
  {
    "name": "disabled",
    "source": "packages/taro/src/navigation.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "siblingCount",
    "source": "packages/taro/src/navigation.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false
  },
  {
    "name": "boundaryCount",
    "source": "packages/taro/src/navigation.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false
  },
  {
    "name": "showTotal",
    "source": "packages/taro/src/navigation.tsx",
    "kind": "node",
    "typeText": "boolean | ((total: number, range: [number, number]) => ReactNode) | undefined",
    "typeRef": "type:ec1243f615ffa00c6ebf",
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
      "typeRef": "type:a991edaa7809b6d75ba2"
    },
    "required": false
  },
  {
    "name": "totalRender",
    "source": "packages/taro/src/navigation.tsx",
    "kind": "node",
    "typeText": "((total: number, range: [number, number]) => ReactNode) | undefined",
    "typeRef": "type:753381a1aafd7d9dc604",
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
      "typeRef": "type:a991edaa7809b6d75ba2"
    },
    "required": false
  },
  {
    "name": "itemRender",
    "source": "packages/taro/src/navigation.tsx",
    "kind": "node",
    "typeText": "((page: number, type: \"page\" | \"prev\" | \"next\" | \"jump-prev\" | \"jump-next\") => ReactNode) | undefined",
    "typeRef": "type:6f110cf59ecdb2e45fce",
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
      "typeRef": "type:a991edaa7809b6d75ba2"
    },
    "required": false
  },
  {
    "name": "showQuickJumper",
    "source": "packages/taro/src/navigation.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "showSizeChanger",
    "source": "packages/taro/src/navigation.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "pageSizeOptions",
    "source": "packages/taro/src/navigation.tsx",
    "kind": "array",
    "typeText": "number[] | undefined",
    "typeRef": "type:2a04a2225ac8229b1a84",
    "required": false
  },
  {
    "name": "hideEdges",
    "source": "packages/taro/src/navigation.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "hideNumbers",
    "source": "packages/taro/src/navigation.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "simple",
    "source": "packages/taro/src/navigation.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "responsive",
    "source": "packages/taro/src/navigation.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "size",
    "source": "packages/taro/src/navigation.tsx",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "\"small\" | \"medium\" | \"large\" | undefined",
    "typeRef": "type:8d5b6882dc615b54818b",
    "required": false
  },
  {
    "name": "shape",
    "source": "packages/taro/src/navigation.tsx",
    "kind": "enum",
    "values": [
      "circle",
      "rounded",
      "square"
    ],
    "typeText": "\"square\" | \"rounded\" | \"circle\" | undefined",
    "typeRef": "type:bc311df462bffff00236",
    "required": false
  },
  {
    "name": "variant",
    "source": "packages/taro/src/navigation.tsx",
    "kind": "enum",
    "values": [
      "ghost",
      "outline",
      "solid"
    ],
    "typeText": "\"solid\" | \"outline\" | \"ghost\" | undefined",
    "typeRef": "type:da3cbf1bd0de7cd633f9",
    "required": false
  },
  {
    "name": "labels",
    "source": "packages/taro/src/navigation.tsx",
    "kind": "object",
    "typeText": "PaginationLabels | undefined",
    "typeRef": "type:62fdbf5a01075c32dff2",
    "required": false
  },
  {
    "name": "icons",
    "source": "packages/taro/src/navigation.tsx",
    "kind": "node",
    "typeText": "{ prev?: ReactNode; next?: ReactNode; jumpPrev?: ReactNode; jumpNext?: ReactNode; } | undefined",
    "typeRef": "type:6b6a0e211f535ba093a0",
    "required": false
  },
  {
    "name": "id",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-label",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-labelledby",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-describedby",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/taro/src/navigation.tsx",
    "kind": "function",
    "typeText": "((page: number, pageSize: number) => void) | undefined",
    "typeRef": "type:6c0f7531e426ee1b5aa7",
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
    "required": false
  },
  {
    "name": "onPageSizeChange",
    "source": "packages/taro/src/navigation.tsx",
    "kind": "function",
    "typeText": "((size: number) => void) | undefined",
    "typeRef": "type:65a183f973c0fc462ced",
    "parameters": [
      {
        "name": "size",
        "position": 0,
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
    "required": false
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

### bindings

```json
[
  {
    "prop": "pageSize",
    "event": "onPageSizeChange",
    "syntax": "pageSize={pageSize} onPageSizeChange={handler}"
  }
]
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
