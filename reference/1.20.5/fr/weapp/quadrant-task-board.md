# QuadrantTaskBoard

Un tableau de tâches sur une matrice à quatre quadrants, comme une matrice d’Eisenhower : le + de l’en-tête d’un quadrant (ou un clic dans sa zone vide) ajoute une tâche, les boutons compacts modifier et supprimer de la tâche active (dans sa fiche, à côté de son nom, avec React) la modifient ou la suppriment, un panneau ouvert à côté du bouton + ou de la tâche la nomme et choisit son quadrant, chaque suppression est confirmée sur place, et les tâches se déplacent par glisser-déposer ou avec Maj + flèches (un double-clic les modifie). Le tableau est contrôlé : passez les tâches dans points et renvoyez la liste reçue par onPointsChange. Il accepte les autres props de QuadrantChart (axes, titres, pastilles et couleurs des quadrants, graduations, étiquettes…), et ses boutons et panneaux suivent la langue de l’application. Exporté par minerva-design, et non par minerva-design/charts.

Package: minerva-design@1.20.5

Renderer: weapp

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

Réparer la connexion

Planification trimestrielle

Réserver le voyage

Boîte de réception vide

À faire tout de suite

À planifier

À déléguer

À abandonner

Important

Pas important

Urgent

Pas urgent

Matrice des tâches : faites glisser les tâches entre les quadrants

Mode sombre

Authentification unique

Export CSV

Refonte de la facturation

Gains rapides

Paris ambitieux

Bouche-trous

Gouffres financiers

Effort

Impact

Feuille de route selon l’effort et l’impact

Ajouter une fonctionnalité

Modifier la fonctionnalité

Retirer la fonctionnalité

Fonctionnalité

« {name} » sera retirée de la feuille de route.

Fonctionnalités : {{features}} · modifications : {{changes}}

## QuadrantTaskBoard

Support: beta

quadrant-task-board: controlled task board composing the native quadrant-chart, button and icon-button components (usingComponents in its JSON). points in, pointschange { points } out; every quadrant-chart property is forwarded except the chart's own labels (labels are the board texts, partial overrides of the localized defaults). A 2 x 2 grid of quadrant headers above the chart (badge, title, count unless showCounts is false, plus-icon add button), a toolbar for the selected task (name, Edit and Delete buttons; selection is internal or the controlled selectedIndex), an inline panel opened under the headers or the actions toolbar (a caret points at its opener) with a name input (the keyboard confirm key saves) and a 2 x 2 quadrant radio grid with Cancel / Save (Save disabled while the name is blank), an inline danger confirmation before a delete, tapping an empty quadrant area adds a task there, and draggable dots (default true) or the chart's accessible Move to buttons move a task. Add/edit/move/delete/selection logic and texts come from the shared minerva-design/charts quadrant task helpers. Chart methods (configure, resize, resetZoom, getView, setView, getPlotRect, toPixel, fromPixel) are forwarded to the inner chart; pointclick, pointdrag, hover, zoom and layout are re-emitted. Beta: needs device validation. The canvas has no view overlays: the quadrant headers are a grid above the chart (the chart still draws its own quadrant titles) and the actions toolbar sits under the chart instead of floating on the selected dot. No double-tap to edit and no keyboard moves (Shift + arrow keys): mini-program views take no focus; use the Edit button and the Move to actions. The add buttons draw the plus icon as an SVG data URI image; Edit and Delete keep text glyphs (✎, ✕). Layout styles are inline (no dedicated stylesheet yet). The inner components are in the board's shadow tree: the config-provider / theme-provider relation across that boundary (theme tokens and messages of the inline panel) needs device validation; the board's locale is forwarded to the chart explicitly. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/quadrant-task-board/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "width",
    "typeText": "unknown",
    "required": false,
    "default": "100%"
  },
  {
    "name": "height",
    "typeText": "unknown",
    "required": false,
    "default": 320
  },
  {
    "name": "legend",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "tooltip",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "crosshair",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "annotations",
    "typeText": "array",
    "required": false
  },
  {
    "name": "interaction",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "padding",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "palette",
    "typeText": "array",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "locale",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "disableScroll",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "points",
    "typeText": "array",
    "required": false
  },
  {
    "name": "xDomain",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "yDomain",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "xSplit",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "ySplit",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "quadrants",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "xLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "yLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "axisLabels",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "showTicks",
    "typeText": "boolean",
    "required": false,
    "default": true
  },
  {
    "name": "reverseX",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "showLabels",
    "typeText": "boolean",
    "required": false,
    "default": true
  },
  {
    "name": "pointSize",
    "typeText": "number",
    "required": false,
    "default": 12
  },
  {
    "name": "name",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "draggable",
    "typeText": "boolean",
    "required": false,
    "default": true
  },
  {
    "name": "showCounts",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "selectedIndex",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "selectedIndices",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "accessiblePoints",
    "typeText": "boolean",
    "required": false,
    "default": true
  },
  {
    "name": "labels",
    "typeText": "unknown",
    "required": false,
    "default": null
  }
]
```

### events

```json
[
  {
    "name": "pointschange",
    "typeText": "{ points: NativeQuadrantPoint[] }",
    "description": "Tasks after an add, an edit, a delete or a move (controlled: update points)."
  },
  {
    "name": "pointclick",
    "typeText": "{ point: NativeQuadrantPoint; index: number }",
    "description": "A task dot was tapped (it becomes the selected task)."
  },
  {
    "name": "pointdrag",
    "typeText": "{ point: NativeQuadrantPoint; index: number; target: NativeQuadrantDropTarget }",
    "description": "A task dot is dragged (draggable)."
  },
  {
    "name": "hover",
    "typeText": "{ items: NativeChartHoverItem[]; x: number | null; xLabel: string }",
    "description": "Highlighted points after a tap or a finger scrub; items is empty when cleared."
  },
  {
    "name": "zoom",
    "typeText": "{ x: [number, number]; y: [number, number] }",
    "description": "Visible range after a pinch, a pan or a double-tap reset."
  },
  {
    "name": "layout",
    "typeText": "{ x: number; y: number; width: number; height: number }",
    "description": "The plot area moved or was resized (px of the chart)."
  }
]
```

## CSS variables

```json
{
  "css:QuadrantTaskBoard": {
    "kind": "cssVars",
    "source": "react/src/components/QuadrantTaskBoard",
    "vars": [
      {
        "name": "--quadrant-task-board-header-color",
        "description": "Text color of the quadrant titles (defaults to --text-color)"
      },
      {
        "name": "--quadrant-task-board-header-background",
        "description": "Background of the quadrant headers (defaults to a translucent surface)"
      },
      {
        "name": "--quadrant-task-board-count-background",
        "description": "Background of the task count chips (defaults to --surface-muted-color)"
      },
      {
        "name": "--quadrant-task-board-count-color",
        "description": "Text color of the task count chips (defaults to --text-secondary-color)"
      },
      {
        "name": "--quadrant-task-board-actions-background",
        "description": "Background of the toolbar of the active task (defaults to --surface-elevated-color)"
      },
      {
        "name": "--quadrant-task-board-actions-radius",
        "description": "Corner radius of the toolbar of the active task (defaults to --radius-md)"
      },
      {
        "name": "--quadrant-task-board-panel-background",
        "description": "Background of the inline add / edit / delete panel (defaults to a translucent elevated surface)"
      },
      {
        "name": "--quadrant-task-board-panel-border",
        "description": "Border color of the inline panel (defaults to a translucent --border-color)"
      },
      {
        "name": "--quadrant-task-board-panel-radius",
        "description": "Corner radius of the inline panel (defaults to --radius-lg)"
      },
      {
        "name": "--quadrant-task-board-panel-width",
        "description": "Width of the inline panel (defaults to 288px)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
