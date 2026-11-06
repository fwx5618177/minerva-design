# QuadrantTaskBoard

Un tableau de tâches sur une matrice à quatre quadrants, comme une matrice d’Eisenhower : le + de l’en-tête d’un quadrant (ou un clic dans sa zone vide) ajoute une tâche, les boutons compacts modifier et supprimer de la tâche active (dans sa fiche, à côté de son nom, avec React) la modifient ou la suppriment, un panneau ouvert à côté du bouton + ou de la tâche la nomme et choisit son quadrant, chaque suppression est confirmée sur place, et les tâches se déplacent par glisser-déposer ou avec Maj + flèches (un double-clic les modifie). Le tableau est contrôlé : passez les tâches dans points et renvoyez la liste reçue par onPointsChange. Il accepte les autres props de QuadrantChart (axes, titres, pastilles et couleurs des quadrants, graduations, étiquettes…), et ses boutons et panneaux suivent la langue de l’application. Exporté par minerva-design, et non par minerva-design/charts.

Package: minerva-design@1.21.1

Renderer: taro

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "8b898b8bac966669d23d1fba972e2a3289cdb5b5",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:8ed3473bb098d663e523782b06fce57a42cde419daa8bbcc5c6b1f0e37e3e50e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

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

Controlled task board on top of the Taro QuadrantChart (points in, onPointsChange out; every other QuadrantChart prop is forwarded, its chart `labels` excepted): a row of quadrant headers under the chart (badge, quadrant title, count unless showCounts={false}, plus-icon add button), an actions toolbar for the selected task (task name, Edit and Delete text buttons; selection is internal or the controlled selectedIndex), an inline panel opened under the headers or the actions toolbar (a caret points at its opener) with a required name Input (the keyboard confirm key saves) and a 2 x 2 quadrant radio grid with Cancel / Save (Save disabled until the name is not blank), an inline danger confirmation before a delete, tapping an empty quadrant area to add a task there, drag and drop of the dots and the chart's accessible "move to" actions. Add/edit/move/delete/selection logic and the localized texts (labels overrides) come from the shared minerva-design/charts quadrant task helpers. Native touch/view semantics differ from browser DOM semantics. Native devices do not expose document focus, inert, browser portals or File input APIs; H5 capabilities are specified separately. Device-runtime validation is still required. Beta: needs device validation. No keyboard moves (Shift + arrow keys) or double-tap to edit: mini-program views take no focus and the chart has no double tap; use the Edit button and the move to actions. The actions toolbar sits under the chart instead of floating on the selected dot, and the quadrant headers are a row under the chart instead of over the quadrants. The add buttons draw the plus icon as an SVG data URI image; Edit and Delete are text buttons. Input aria-label and the accessible point list are read on H5; native hosts expose aria-role/aria-label only where the host supports them. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
  "exports": [
    "QuadrantTaskBoard"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "labels",
    "source": "packages/taro/src/quadrant-task-board.tsx",
    "kind": "object",
    "typeText": "Partial<QuadrantTaskLabels> | undefined",
    "typeRef": "type:1844230c41d60923064b",
    "required": false,
    "description": "Texts of the buttons and panels (localized by default)"
  },
  {
    "name": "ariaLabel",
    "source": "packages/taro/src/charts.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the chart"
  },
  {
    "name": "id",
    "source": "packages/taro/src/charts.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Id of the `<Canvas>` (generated by default)"
  },
  {
    "name": "disableScroll",
    "source": "packages/taro/src/charts.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Keeps the page from scrolling while a finger moves on the chart"
  },
  {
    "name": "height",
    "source": "packages/taro/src/charts.tsx",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": 320,
    "required": false,
    "description": "Height of the chart (the legend included); numbers are pixels"
  },
  {
    "name": "width",
    "source": "packages/taro/src/charts.tsx",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": "100%",
    "required": false,
    "description": "Width of the chart; numbers are pixels"
  },
  {
    "name": "legend",
    "source": "packages/taro/src/charts.tsx",
    "kind": "union",
    "typeText": "boolean | ChartLegendOptions | undefined",
    "typeRef": "type:860fa553ee4deaac43f8",
    "required": false,
    "description": "Legend; shown by default when several series have a name (tap toggles a series)"
  },
  {
    "name": "tooltip",
    "source": "packages/taro/src/charts.tsx",
    "kind": "union",
    "typeText": "boolean | ChartTooltipOptions | undefined",
    "typeRef": "type:c08795b3492e4547d570",
    "required": false,
    "description": "Tooltip; `false` disables it"
  },
  {
    "name": "crosshair",
    "source": "packages/taro/src/charts.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Vertical guide line following the finger"
  },
  {
    "name": "annotations",
    "source": "packages/taro/src/charts.tsx",
    "kind": "array",
    "typeText": "readonly ChartAnnotation[] | undefined",
    "typeRef": "type:f440eb8a958892b1b0c2",
    "required": false,
    "description": "Background areas and reference lines"
  },
  {
    "name": "interaction",
    "source": "packages/taro/src/charts.tsx",
    "kind": "union",
    "typeText": "boolean | ChartInteractionOptions | undefined",
    "typeRef": "type:f4b160d7dd18649fd178",
    "default": true,
    "required": false,
    "description": "Pinch zoom, pan (drag when zoomed) and double-tap reset; `false` makes the chart static"
  },
  {
    "name": "padding",
    "source": "packages/taro/src/charts.tsx",
    "kind": "object",
    "typeText": "ChartPadding | undefined",
    "typeRef": "type:7c2c76b2d4d6c9fbf43a",
    "required": false,
    "description": "Space around the plot area, in pixels"
  },
  {
    "name": "palette",
    "source": "packages/taro/src/charts.tsx",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Series colors (defaults to the `--chart-series-1..8` tokens, then the theme colors)"
  },
  {
    "name": "locale",
    "source": "packages/taro/src/charts.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Locale of the texts and numbers the chart writes (tooltip rows, compact units `k` / `万`, separators, month and weekday names of time axes). Mini-programs have no `<html lang>`: pass the app language"
  },
  {
    "name": "accessiblePoints",
    "source": "packages/taro/src/charts.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Renders a visually hidden list of the points for the screen readers: one button per point (its name, quadrant and values; a tap is `onPointClick`) and, with `onPointDrop`, \"Move to …\" buttons moving it to the neighbouring quadrants (`onPointDrop` with the quadrant center)"
  }
]
```

### events

```json
[
  {
    "name": "onPointsChange",
    "source": "packages/taro/src/quadrant-task-board.tsx",
    "kind": "function",
    "typeText": "(points: QuadrantPoint[]) => void",
    "typeRef": "type:73c7057a55796f491c7a",
    "parameters": [
      {
        "name": "points",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "QuadrantPoint[]",
        "typeRef": "type:6712a3cf27568e0bb468"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": true,
    "description": "Called with the next list of tasks after an add, an edit, a delete, a drag and drop or a \"move to\" action (controlled: pass them back as `points`)"
  },
  {
    "name": "onPointClick",
    "source": "packages/taro/src/charts.tsx",
    "kind": "function",
    "typeText": "((point: QuadrantPoint, index: number) => void) | undefined",
    "typeRef": "type:b27cb5a6c62cedbcb19c",
    "parameters": [
      {
        "name": "point",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "QuadrantPoint",
        "typeRef": "type:a8f1c3191391a02e50c1"
      },
      {
        "name": "index",
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
    "description": "Called with the tapped point and its index"
  },
  {
    "name": "onHover",
    "source": "packages/taro/src/charts.tsx",
    "kind": "function",
    "typeText": "((event: ChartHoverEvent | null) => void) | undefined",
    "typeRef": "type:980cbee566a575ab834d",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartHoverEvent | null",
        "typeRef": "type:92ec77c4587c7e27430b"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the touched (or hovered) points change"
  },
  {
    "name": "onZoom",
    "source": "packages/taro/src/charts.tsx",
    "kind": "function",
    "typeText": "((view: ChartView) => void) | undefined",
    "typeRef": "type:6871f590139907a5872c",
    "parameters": [
      {
        "name": "view",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartView",
        "typeRef": "type:f1de933b453f8db86ff3"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the user zooms or pans"
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
