# DashboardColumns

Columns of cards on a dashboard, one per workflow stage, pipeline step or status (To do / Doing / Done): equal-width columns with a title, a count and an accent color, stacked cards, and horizontal scrolling. With draggable, DashboardCard children move between and within columns by mouse, touch or keyboard; the board stays controlled (onCardMove).

Package: minerva-design@1.23.1

Renderer: taro

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "6ccf4f2c7a65dd5b27e517c9a50ea4867f8e7980",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:3616b5d4e7cf7e0eb1fbe04c879d1630cc3dfd5c28f16762b8ad6f3f3525ef82"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## DashboardCard

Support: beta

Board of status columns in a horizontal ScrollView (scrollX): equal-width columns (columnWidth), fill when they fit, gap, height/maxHeight with vertically scrolling column bodies, translated region label; columns with an accent dot (theme color or CSS color), title, count badge announced with the title, description, actions, role=list cards wrapped in listitems, translated or custom empty content and a footer. draggable boards move DashboardCard children of keyed columns (value) with a long press and drag: columns and cards measured with createSelectorQuery (DOM rects on H5), drop line, highlighted target column, floating copy, canDrop, onCardMove. Native touch/view semantics differ from browser DOM semantics. Native devices do not expose document focus, inert, browser portals or File input APIs; H5 capabilities are specified separately. Device-runtime validation is still required. Drag and drop is touch only (no keyboard or screen-reader moves): offer your own move actions (menus, buttons) for accessibility. No auto-scroll near the edges: the board stops scrolling while a card is picked up, and the page may still scroll on hosts that cannot cancel touchmove. Cards are measured once when picked up. No scroll snapping on native hosts. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
  "exports": [
    "DashboardCard"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "source": "packages/taro/src/dashboard-columns.tsx",
    "kind": "string",
    "typeText": "string",
    "typeRef": "type:e15e314d298fc0d116fc",
    "required": true,
    "description": "Key of the card, reported as `cardKey` by a draggable board"
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

### slots

```json
[
  {
    "name": "children"
  }
]
```

## DashboardColumn

Support: beta

Board of status columns in a horizontal ScrollView (scrollX): equal-width columns (columnWidth), fill when they fit, gap, height/maxHeight with vertically scrolling column bodies, translated region label; columns with an accent dot (theme color or CSS color), title, count badge announced with the title, description, actions, role=list cards wrapped in listitems, translated or custom empty content and a footer. draggable boards move DashboardCard children of keyed columns (value) with a long press and drag: columns and cards measured with createSelectorQuery (DOM rects on H5), drop line, highlighted target column, floating copy, canDrop, onCardMove. Native touch/view semantics differ from browser DOM semantics. Native devices do not expose document focus, inert, browser portals or File input APIs; H5 capabilities are specified separately. Device-runtime validation is still required. Drag and drop is touch only (no keyboard or screen-reader moves): offer your own move actions (menus, buttons) for accessibility. No auto-scroll near the edges: the board stops scrolling while a card is picked up, and the page may still scroll on hosts that cannot cancel touchmove. Cards are measured once when picked up. No scroll snapping on native hosts. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
  "exports": [
    "DashboardColumn"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "title",
    "source": "packages/taro/src/dashboard-columns.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:a991edaa7809b6d75ba2",
    "required": true,
    "description": "Title of the column (also its accessible name)"
  },
  {
    "name": "value",
    "source": "packages/taro/src/dashboard-columns.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Key of the column, reported as `fromColumn` / `toColumn` by a draggable board"
  },
  {
    "name": "count",
    "source": "packages/taro/src/dashboard-columns.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Number of items shown as a badge (and announced with the title); omit to hide it"
  },
  {
    "name": "color",
    "source": "packages/taro/src/dashboard-columns.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accent (a dot before the title): a theme color or any CSS color"
  },
  {
    "name": "description",
    "source": "packages/taro/src/dashboard-columns.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:a991edaa7809b6d75ba2",
    "required": false,
    "description": "Supporting text under the header"
  },
  {
    "name": "actions",
    "source": "packages/taro/src/dashboard-columns.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:a991edaa7809b6d75ba2",
    "required": false,
    "description": "Header controls on the end side (e.g. an add button)"
  },
  {
    "name": "empty",
    "source": "packages/taro/src/dashboard-columns.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:a991edaa7809b6d75ba2",
    "required": false,
    "description": "Content shown when the column has no cards (default: translated \"No items\")"
  },
  {
    "name": "footer",
    "source": "packages/taro/src/dashboard-columns.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:a991edaa7809b6d75ba2",
    "required": false,
    "description": "Footer below the cards (e.g. an \"Add card\" button)"
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

### slots

```json
[
  {
    "name": "children"
  }
]
```

## DashboardColumns

Support: beta

Board of status columns in a horizontal ScrollView (scrollX): equal-width columns (columnWidth), fill when they fit, gap, height/maxHeight with vertically scrolling column bodies, translated region label; columns with an accent dot (theme color or CSS color), title, count badge announced with the title, description, actions, role=list cards wrapped in listitems, translated or custom empty content and a footer. draggable boards move DashboardCard children of keyed columns (value) with a long press and drag: columns and cards measured with createSelectorQuery (DOM rects on H5), drop line, highlighted target column, floating copy, canDrop, onCardMove. Native touch/view semantics differ from browser DOM semantics. Native devices do not expose document focus, inert, browser portals or File input APIs; H5 capabilities are specified separately. Device-runtime validation is still required. Drag and drop is touch only (no keyboard or screen-reader moves): offer your own move actions (menus, buttons) for accessibility. No auto-scroll near the edges: the board stops scrolling while a card is picked up, and the page may still scroll on hosts that cannot cancel touchmove. Cards are measured once when picked up. No scroll snapping on native hosts. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
  "exports": [
    "DashboardColumns"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "columnWidth",
    "source": "packages/taro/src/dashboard-columns.tsx",
    "kind": "union",
    "typeText": "DashboardLength | undefined",
    "typeRef": "type:f599dfc479dbce7e0d00",
    "required": false,
    "description": "Width of every column (a number is pixels; default 18rem / 288px); with `fill` the minimum width"
  },
  {
    "name": "fill",
    "source": "packages/taro/src/dashboard-columns.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Stretches the columns equally to fill the board when they fit (default false)"
  },
  {
    "name": "gap",
    "source": "packages/taro/src/dashboard-columns.tsx",
    "kind": "union",
    "typeText": "DashboardLength | undefined",
    "typeRef": "type:f599dfc479dbce7e0d00",
    "required": false,
    "description": "Space between the columns (a number is pixels; default 12px)"
  },
  {
    "name": "height",
    "source": "packages/taro/src/dashboard-columns.tsx",
    "kind": "union",
    "typeText": "DashboardLength | undefined",
    "typeRef": "type:f599dfc479dbce7e0d00",
    "required": false,
    "description": "Height of the board: the column bodies scroll vertically within it"
  },
  {
    "name": "maxHeight",
    "source": "packages/taro/src/dashboard-columns.tsx",
    "kind": "union",
    "typeText": "DashboardLength | undefined",
    "typeRef": "type:f599dfc479dbce7e0d00",
    "required": false,
    "description": "Maximum height of the board: the column bodies scroll vertically within it"
  },
  {
    "name": "draggable",
    "source": "packages/taro/src/dashboard-columns.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Lets the DashboardCard children of keyed columns (`value`) be dragged: a long press picks a card up (the board stops scrolling), moving the finger moves it, lifting the finger drops it (default false). The board is controlled: it reports the move (`onCardMove`)"
  },
  {
    "name": "canDrop",
    "source": "packages/taro/src/dashboard-columns.tsx",
    "kind": "function",
    "typeText": "((move: DashboardCardMove) => boolean) | undefined",
    "typeRef": "type:e5b4525677b5de9ceff0",
    "parameters": [
      {
        "name": "move",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "DashboardCardMove",
        "typeRef": "type:fd9302cfc7d74ff2894a"
      }
    ],
    "returnType": {
      "typeText": "boolean",
      "typeRef": "type:7087acd01ef7dd9f1d5c"
    },
    "required": false,
    "description": "Whether a card may be dropped at a position (refused positions show no drop line)"
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
    "name": "onCardMove",
    "source": "packages/taro/src/dashboard-columns.tsx",
    "kind": "function",
    "typeText": "((move: DashboardCardMove) => void) | undefined",
    "typeRef": "type:2f98477803460008f9c4",
    "parameters": [
      {
        "name": "move",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "DashboardCardMove",
        "typeRef": "type:fd9302cfc7d74ff2894a"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a card is dropped at a new position: move it in your data (`moveDashboardCard`)"
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

## CSS variables

```json
{
  "css:DashboardColumns": {
    "kind": "cssVars",
    "source": "react/src/components/DashboardColumns",
    "vars": [
      {
        "name": "--dashboard-column-width",
        "description": "Width of the columns (defaults to 18rem; the columnWidth prop sets it; with fill it is the minimum width)"
      },
      {
        "name": "--dashboard-gap",
        "description": "Space between the columns (defaults to 0.75rem; the gap prop sets it)"
      },
      {
        "name": "--dashboard-column-background",
        "description": "Background of a column (defaults to --surface-muted-color)"
      },
      {
        "name": "--dashboard-column-border-color",
        "description": "Border color of a column (defaults to --border-color)"
      },
      {
        "name": "--dashboard-column-radius",
        "description": "Corner radius of a column (defaults to --radius-lg)"
      },
      {
        "name": "--dashboard-column-color",
        "description": "Accent of a column: the dot before the title (the color prop sets it for a custom CSS color)"
      },
      {
        "name": "--dashboard-card-gap",
        "description": "Space between the cards of a column (defaults to --space-2)"
      },
      {
        "name": "--dashboard-count-background",
        "description": "Background of the count badge (defaults to --surface-color)"
      },
      {
        "name": "--dashboard-count-color",
        "description": "Text color of the count badge (defaults to --text-secondary-color)"
      },
      {
        "name": "--dashboard-drop-indicator-color",
        "description": "Color of the drop line and of the column a dragged card would land in (defaults to --primary-color)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
