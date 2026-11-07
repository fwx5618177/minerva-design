# DashboardColumns

Des colonnes de cartes sur un tableau de bord, une par étape d’un workflow, d’un pipeline ou par statut (À faire / En cours / Terminé) : des colonnes de même largeur avec un titre, un compteur et une couleur d’accent, des cartes empilées et un défilement horizontal. Avec draggable, les DashboardCard se déplacent entre les colonnes et au sein d’une colonne à la souris, au toucher ou au clavier ; le tableau reste contrôlé (onCardMove).

Package: minerva-design@1.22.1

Renderer: weapp

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.1",
  "sourceCommit": "a07dc9a260690841cc0eea98acdc24ac32032a2c",
  "sourceDigest": "sha256:cbdfa6292d29dec33adda7a3e9cf0e027da50858956b8d08e3f7f3ed59c8d78a",
  "referenceSourceDigest": "sha256:6d534260f2c14247d5360acc167a35134052fa342938ee2bdd089ae303d95f7c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## DashboardCard

Support: beta

dashboard-card: a role=listitem wrapper keyed by value with a label for the dragged copy; in a draggable board a long press picks it up (bindlongpress), a capture-phase touchmove moves the copy and touchend drops it. Beta: needs device validation. Touch only; the floating copy shows the label text, not the card's content; interactive slotted content inside a draggable card can also start a drag on long press. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/dashboard-card/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "value",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "label",
    "typeText": "string",
    "required": false,
    "default": ""
  }
]
```

### slots

```json
[
  {
    "name": "default"
  }
]
```

## DashboardColumn

Support: beta

Status column: accent dot (theme or CSS color), title (property or title slot), count badge announced with the title, description, actions/footer slots, role=list body and translated or custom empty text; value keys it for dragging and drop-disabled refuses dropped cards (the drop target gets an outline). Slots cannot be inspected: the empty text shows when count is 0, and each card should carry role=listitem (dashboard-card does). Empty actions/footer slots keep their (collapsed) wrappers. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/dashboard-column/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "title",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "value",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "count",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "color",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "description",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "empty",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "dropDisabled",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  }
]
```

### slots

```json
[
  {
    "name": "title"
  },
  {
    "name": "actions"
  },
  {
    "name": "default"
  },
  {
    "name": "footer"
  }
]
```

## DashboardColumns

Support: beta

Region around a scroll-view scroll-x of equal-width status columns: columnWidth, gap, height/maxHeight with vertically scrolling column bodies and a translated label. draggable boards move dashboard-card components between keyed columns (value): board, columns and cards find each other through relations (linked / unlinked), a long press picks a card up, every column and card root is measured with its own createSelectorQuery boundingClientRect, the shared core functions hit-test the finger, a fixed copy showing the card label follows it, a drop line and the target column outline show the position, and the controlled board fires cardmove { cardKey, fromColumn, fromIndex, toColumn, toIndex } (toIndex counts the cards without the moved one; dropping in place fires nothing). DashboardColumn drop-disabled replaces the canDrop function, which WXML properties cannot carry. Beta: drag and drop needs device validation. Touch only (no keyboard dragging and no live-region announcements); the floating copy shows the label text, not the card's content; positions are measured once at pick-up (no auto-scroll while dragging, and the board or a column must not scroll during the drag); scrolling under the finger is stopped by a data-bound catchtouchmove on the picked-up card. No canDrop function: drop-disabled refuses a whole column. No scroll snapping, and fill does not stretch the columns (each column component host is the flex item); device geometry still requires validation. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/dashboard-columns/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "columnWidth",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "fill",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "gap",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "height",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "maxHeight",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "draggable",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  }
]
```

### events

```json
[
  {
    "name": "cardmove",
    "typeText": "{ cardKey: string; fromColumn: string; fromIndex: number; toColumn: string; toIndex: number }",
    "description": "A draggable board dropped a dashboard-card (long press, then move); toIndex counts the target column's cards without the moved one. Dropping in place emits nothing; the board stays controlled."
  }
]
```

### slots

```json
[
  {
    "name": "default"
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
