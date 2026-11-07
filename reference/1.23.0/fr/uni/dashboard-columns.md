# DashboardColumns

Des colonnes de cartes sur un tableau de bord, une par étape d’un workflow, d’un pipeline ou par statut (À faire / En cours / Terminé) : des colonnes de même largeur avec un titre, un compteur et une couleur d’accent, des cartes empilées et un défilement horizontal. Avec draggable, les DashboardCard se déplacent entre les colonnes et au sein d’une colonne à la souris, au toucher ou au clavier ; le tableau reste contrôlé (onCardMove).

Package: minerva-design@1.23.0

Renderer: uni

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "9a519eee781183dcbac39a62a86bec9e0bd877a9",
  "sourceDigest": "sha256:0d31b0bc3c28394756a1142132ddf7b2beac9f7ce2f5b2253e04712431d7c736",
  "referenceSourceDigest": "sha256:0a033a9f6bc21722c87a78202ae3fce0d891270ea8a01d043a5a748c0439d696"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## DashboardCard

Support: beta

Card of a DashboardColumn (role=listitem) keyed by value; in a draggable board a long press picks it up and a copy showing its label follows the finger. Touch only; the floating copy shows the label text, not the card's content. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
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
    "typeText": "string",
    "required": true
  },
  {
    "name": "label",
    "typeText": "string | undefined",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "typeText": "{}"
  }
]
```

## DashboardColumn

Support: beta

Status column: accent dot (theme or CSS color), title (prop or slot), count badge announced with the title, description, actions slot, role=list body, translated or custom empty content and a footer slot. Mini-program slots cannot be wrapped card by card: use DashboardCard or give each card role=listitem. The empty content shows without a default slot or with count 0. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
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
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "value",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "count",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "color",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "description",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "empty",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "title",
    "typeText": "{}"
  },
  {
    "name": "actions",
    "typeText": "{}"
  },
  {
    "name": "description",
    "typeText": "{}"
  },
  {
    "name": "default",
    "typeText": "{}"
  },
  {
    "name": "empty",
    "typeText": "{}"
  },
  {
    "name": "footer",
    "typeText": "{}"
  }
]
```

## DashboardColumns

Support: beta

Board of status columns in a scroll-view scroll-x: equal-width columns (columnWidth), fill when they fit, gap, height/maxHeight with vertically scrolling column bodies and a translated region label. draggable boards move the DashboardCard children of keyed columns (value) with a long press and drag (cards and columns measure themselves when a card is picked up), with a drop line, a highlighted target column, canDrop and a card-move event. Drag and drop is touch only (no keyboard or screen-reader moves): offer your own move actions for accessibility. The floating copy shows the card's label (slots cannot be duplicated), there is no auto-scroll near the edges and the page may still scroll on hosts that cannot cancel touchmove. No scroll snapping; device geometry still requires validation. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
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
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "fill",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "gap",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "maxHeight",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "draggable",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "canDrop",
    "typeText": "((move: DashboardCardMove) => boolean) | undefined",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "card-move",
    "typeText": "[move: DashboardCardMove]",
    "parameters": [
      {
        "name": "move",
        "position": 0,
        "typeText": "DashboardCardMove",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "typeText": "{}"
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
