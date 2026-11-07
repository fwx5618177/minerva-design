# DashboardColumns

Des colonnes de cartes sur un tableau de bord, une par étape d’un workflow, d’un pipeline ou par statut (À faire / En cours / Terminé) : des colonnes de même largeur avec un titre, un compteur et une couleur d’accent, des cartes empilées et un défilement horizontal. Avec draggable, les DashboardCard se déplacent entre les colonnes et au sein d’une colonne à la souris, au toucher ou au clavier ; le tableau reste contrôlé (onCardMove).

Package: minerva-design@1.22.1

Renderer: wc

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

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/dashboard-card",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "value",
    "typeText": "string",
    "attribute": "value",
    "required": false
  },
  {
    "name": "label",
    "typeText": "string | undefined",
    "attribute": "label",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "The content of the card"
  }
]
```

## DashboardColumn

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/dashboard-column",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "heading",
    "typeText": "string",
    "attribute": "heading",
    "required": false
  },
  {
    "name": "value",
    "typeText": "string | undefined",
    "attribute": "value",
    "required": false
  },
  {
    "name": "count",
    "typeText": "number | undefined",
    "attribute": "count",
    "required": false
  },
  {
    "name": "color",
    "typeText": "DashboardColumnColor | undefined",
    "attribute": "color",
    "required": false
  },
  {
    "name": "description",
    "typeText": "string",
    "attribute": "description",
    "required": false
  },
  {
    "name": "emptyText",
    "typeText": "string | undefined",
    "attribute": "empty-text",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "The cards (each gets `role=\"listitem\"` unless it has a role)"
  },
  {
    "name": "heading",
    "description": "Rich title (alternative to the `heading` attribute)"
  },
  {
    "name": "actions",
    "description": "Header controls on the end side (e.g. an add button)"
  },
  {
    "name": "description",
    "description": "Supporting text (alternative to the `description` attribute)"
  },
  {
    "name": "empty",
    "description": "Content shown when there are no cards (default: `empty-text`, else localized \"No items\")"
  },
  {
    "name": "footer",
    "description": "Footer below the cards (e.g. an \"Add card\" button)"
  }
]
```

## DashboardColumns

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/dashboard-columns",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "columnWidth",
    "typeText": "DashboardLength",
    "attribute": "column-width",
    "required": false
  },
  {
    "name": "fill",
    "typeText": "boolean",
    "attribute": "fill",
    "required": false
  },
  {
    "name": "gap",
    "typeText": "DashboardLength",
    "attribute": "gap",
    "required": false
  },
  {
    "name": "height",
    "typeText": "DashboardLength | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "maxHeight",
    "typeText": "DashboardLength | undefined",
    "attribute": "max-height",
    "required": false
  },
  {
    "name": "draggable",
    "typeText": "boolean",
    "attribute": "draggable",
    "required": false
  },
  {
    "name": "canDrop",
    "typeText": "(move: DashboardCardMove) => boolean | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-card-move",
    "typeText": "CustomEvent<DashboardCardMove>",
    "detailType": {
      "typeText": "DashboardCardMove",
      "typeRef": "type:fd9302cfc7d74ff2894a"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "A card was dropped at a new position; `detail: { cardKey, fromColumn, fromIndex, toColumn, toIndex }` (`toIndex` counts the cards without the moved one)"
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "The columns (`minerva-dashboard-column`)"
  }
]
```

## API

```json
{
  "wc:minerva-dashboard-columns": {
    "kind": "element",
    "source": "web-components/src/components/dashboard-columns/dashboard-columns.ts",
    "className": "MinervaDashboardColumns",
    "summary": "Horizontally scrolling board of status columns.",
    "description": "A horizontally scrolling board of status columns (`<DashboardColumns>` of React): put `minerva-dashboard-column` elements in it. Columns share one width (`column-width`, 18rem by default); `fill` stretches them equally when they fit; `height` / `max-height` bound the board so that the column bodies scroll vertically. The board is a labelled `role=\"region\"` (name: the host's `aria-label` / `aria-labelledby`, else localized \"Board\") and a tab stop, so the keyboard can scroll it; on narrow screens the columns keep their width and snap while scrolling. `draggable` lets the `minerva-dashboard-card` children of keyed columns (`value`) be dragged with the mouse, touch (long press) or the keyboard (Space / Enter picks a focused card up, the arrows move it, Space / Enter drops it, Escape cancels). The board is controlled: it fires `minerva-card-move` and the app moves the card element (or re-renders). While dragging is on, the board holds a small layer (drop line, dragged copy, live region) as its last light DOM child.",
    "properties": [
      {
        "name": "columnWidth",
        "attribute": "column-width",
        "type": "DashboardLength",
        "default": "\"18rem\"",
        "description": "Width of every column (a number is pixels); with `fill` the minimum width"
      },
      {
        "name": "fill",
        "attribute": "fill",
        "type": "boolean",
        "default": "false",
        "description": "Stretches the columns equally to fill the board when they fit"
      },
      {
        "name": "gap",
        "attribute": "gap",
        "type": "DashboardLength",
        "default": "\"0.75rem\"",
        "description": "Space between the columns (a number is pixels)"
      },
      {
        "name": "height",
        "attribute": "height",
        "type": "DashboardLength | undefined",
        "description": "Height of the board: the column bodies scroll vertically within it (a number is pixels)"
      },
      {
        "name": "maxHeight",
        "attribute": "max-height",
        "type": "DashboardLength | undefined",
        "description": "Maximum height of the board: the column bodies scroll vertically within it (a number is pixels)"
      },
      {
        "name": "draggable",
        "attribute": "draggable",
        "type": "boolean",
        "default": "false",
        "description": "Lets the `minerva-dashboard-card` children of keyed columns be dragged (mouse, touch long press, keyboard); the board fires `minerva-card-move`. Replaces the native `draggable` (HTML drag and drop of the host): the attribute turns it on unless it is `\"false\"`."
      },
      {
        "name": "canDrop",
        "type": "(move: DashboardCardMove) => boolean | undefined",
        "description": "Whether a card may be dropped at a position (property only): refused positions show no drop indicator and the keyboard skips them"
      }
    ],
    "methods": [
      {
        "name": "focus",
        "signature": "(options?: FocusOptions) => void"
      }
    ],
    "events": [
      {
        "name": "minerva-card-move",
        "description": "A card was dropped at a new position; `detail: { cardKey, fromColumn, fromIndex, toColumn, toIndex }` (`toIndex` counts the cards without the moved one)"
      }
    ],
    "slots": [
      {
        "name": "",
        "description": "The columns (`minerva-dashboard-column`)"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The scrolling `role=region` row of columns"
      }
    ],
    "cssProperties": [
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
  },
  "wc:minerva-dashboard-column": {
    "kind": "element",
    "source": "web-components/src/components/dashboard-columns/dashboard-columns.ts",
    "className": "MinervaDashboardColumn",
    "summary": "Status column of a DashboardColumns: header, count, cards and footer.",
    "description": "A status column of a `minerva-dashboard-columns` (`<DashboardColumn>` of React). The header shows an optional accent dot (`color`: a theme color or any CSS color), the `heading`, a `count` badge and the `actions` slot; the cards (default slot) form a `role=\"list\"` that scrolls vertically within a bounded board (each slotted card without a role gets `role=\"listitem\"`; there is no wrapper); `empty-text` / the `empty` slot (default: localized \"No items\") replaces the list when there are no cards, and the `footer` slot sits below. The column is a `role=\"group\"` named by its heading and count (\"To do, 3 items\").",
    "properties": [
      {
        "name": "heading",
        "attribute": "heading",
        "type": "string",
        "default": "\"\"",
        "description": "Title of the column (also its accessible name; or use the `heading` slot)"
      },
      {
        "name": "value",
        "attribute": "value",
        "type": "string | undefined",
        "description": "Key of the column, reported as `fromColumn` / `toColumn` by a draggable board (columns without one take no cards)"
      },
      {
        "name": "count",
        "attribute": "count",
        "type": "number | undefined",
        "description": "Number of items shown as a badge (and announced with the title); unset hides it"
      },
      {
        "name": "color",
        "attribute": "color",
        "type": "DashboardColumnColor | undefined",
        "description": "Accent: a theme color (primary, success, warning, danger, info, neutral) or any CSS color"
      },
      {
        "name": "description",
        "attribute": "description",
        "type": "string",
        "default": "\"\"",
        "description": "Supporting text under the header (or use the `description` slot)"
      },
      {
        "name": "emptyText",
        "attribute": "empty-text",
        "type": "string | undefined",
        "description": "Text shown when there are no cards (default: localized \"No items\"; or use the `empty` slot)"
      }
    ],
    "methods": [],
    "events": [],
    "slots": [
      {
        "name": "",
        "description": "The cards (each gets `role=\"listitem\"` unless it has a role)"
      },
      {
        "name": "heading",
        "description": "Rich title (alternative to the `heading` attribute)"
      },
      {
        "name": "actions",
        "description": "Header controls on the end side (e.g. an add button)"
      },
      {
        "name": "description",
        "description": "Supporting text (alternative to the `description` attribute)"
      },
      {
        "name": "empty",
        "description": "Content shown when there are no cards (default: `empty-text`, else localized \"No items\")"
      },
      {
        "name": "footer",
        "description": "Footer below the cards (e.g. an \"Add card\" button)"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The `role=group` column (state `color-<name>` for a theme accent)"
      },
      {
        "name": "header",
        "description": "The header row (accent, title, count, actions)"
      },
      {
        "name": "indicator",
        "description": "The accent dot before the title (with `color`)"
      },
      {
        "name": "title",
        "description": "The title of the column"
      },
      {
        "name": "count",
        "description": "The count badge (with `count`)"
      },
      {
        "name": "actions",
        "description": "The header actions (with the `actions` slot)"
      },
      {
        "name": "description",
        "description": "The supporting text (with a description)"
      },
      {
        "name": "list",
        "description": "The `role=list` body holding the cards"
      },
      {
        "name": "empty",
        "description": "The empty content shown instead of the list"
      },
      {
        "name": "footer",
        "description": "The footer (with the `footer` slot)"
      }
    ],
    "cssProperties": [
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
  },
  "wc:minerva-dashboard-card": {
    "kind": "element",
    "source": "web-components/src/components/dashboard-columns/dashboard-columns.ts",
    "className": "MinervaDashboardCard",
    "summary": "Card of a dashboard column that a draggable board can move.",
    "description": "A card of a `minerva-dashboard-column` (`<DashboardCard>` of React), keyed by `value`. In a draggable board its content sits in a focusable `role=\"button\"` (the `root` part) described by the drag instructions; otherwise the part is a plain wrapper. The host is the list item of the column. Controls inside a draggable card keep working (a drag never starts on them), but keep them few: they sit inside the button.",
    "properties": [
      {
        "name": "value",
        "attribute": "value",
        "type": "string",
        "default": "\"\"",
        "description": "Key of the card, reported as `cardKey` by a draggable board"
      },
      {
        "name": "label",
        "attribute": "label",
        "type": "string | undefined",
        "description": "Name of the card in the drag announcements and, when draggable, its accessible name (default: its text)"
      }
    ],
    "methods": [],
    "events": [],
    "slots": [
      {
        "name": "",
        "description": "The content of the card"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The card wrapper (a focusable `role=button` in a draggable board)"
      }
    ],
    "cssProperties": [
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

## Example: Utilisation de base

Des éléments minerva-dashboard-column dans un minerva-dashboard-columns ; les cartes insérées reçoivent role="listitem". Ici chaque carte passe à la colonne suivante avec son propre bouton, et le script met à jour les attributs count ; voir Glisser-déposer pour les tableaux draggable.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/dashboard-columns/wc/basic.html

```html
<minerva-dashboard-columns id="board" aria-label="Sprint 12">
  <minerva-dashboard-column heading="To do" count="2" data-status="todo">
    <minerva-card padding="small" data-id="1"
      >Write the onboarding guide
      <minerva-button size="small" variant="ghost" data-move="1"
        >Move to Doing</minerva-button
      ></minerva-card
    >
    <minerva-card padding="small" data-id="2"
      >Audit color contrast
      <minerva-button size="small" variant="ghost" data-move="2"
        >Move to Doing</minerva-button
      ></minerva-card
    >
  </minerva-dashboard-column>
  <minerva-dashboard-column heading="Doing" count="1" data-status="doing">
    <minerva-card padding="small" data-id="3"
      >Ship the billing page
      <minerva-button size="small" variant="ghost" data-move="3"
        >Move to Done</minerva-button
      ></minerva-card
    >
  </minerva-dashboard-column>
  <minerva-dashboard-column heading="Done" count="1" data-status="done">
    <minerva-card padding="small" data-id="4"
      >Set up error tracking</minerva-card
    >
  </minerva-dashboard-column>
</minerva-dashboard-columns>

```

### apps/docs/src/docs/pages/dashboard-columns/wc/basic.ts

```tsx
// A card moves to the next column with its own button (draggable boards:
// drag-drop demo).
// The column gives each slotted card role="listitem"; update `count` after
// moving cards.
const ORDER = ["todo", "doing", "done"];
const TITLES: Record<string, string> = { doing: "Doing", done: "Done" };

export function setup(root: HTMLElement) {
  const board = root.querySelector<HTMLElement>("#board")!;
  const columns = () =>
    Array.from(board.querySelectorAll<HTMLElement>("minerva-dashboard-column"));
  const onClick = (event: Event) => {
    const button = (event.target as Element).closest<HTMLElement>(
      "[data-move]",
    );
    if (!button) return;
    const card = button.closest<HTMLElement>("minerva-card")!;
    const from = card.closest<HTMLElement>("minerva-dashboard-column")!;
    const status = ORDER[ORDER.indexOf(from.dataset.status!) + 1];
    const to = columns().find((column) => column.dataset.status === status);
    if (!to) return;
    to.append(card);
    const after = ORDER[ORDER.indexOf(status!) + 1];
    if (after) button.textContent = `Move to ${TITLES[after]}`;
    else button.remove();
    for (const column of columns())
      column.setAttribute(
        "count",
        String(column.querySelectorAll("minerva-card").length),
      );
  };
  board.addEventListener("click", onClick);
  return () => board.removeEventListener("click", onClick);
}

```

## Example: Couleurs et compteurs

color accepte une couleur du thème (avec aussi les états personnalisés :state(color-success) …) ou n’importe quelle couleur CSS ; count affiche un badge annoncé avec le titre. column-width et gap dimensionnent les colonnes.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/dashboard-columns/wc/colors.html

```html
<minerva-dashboard-columns
  aria-label="Product roadmap"
  column-width="220"
  gap="8"
>
  <minerva-dashboard-column heading="Backlog" count="1" color="neutral">
    <minerva-card padding="small">Collect feedback</minerva-card>
  </minerva-dashboard-column>
  <minerva-dashboard-column heading="Ready" count="1" color="info">
    <minerva-card padding="small">Pricing page copy</minerva-card>
  </minerva-dashboard-column>
  <minerva-dashboard-column heading="In progress" count="2" color="primary">
    <minerva-card padding="small">Search API</minerva-card>
    <minerva-card padding="small">Avatars</minerva-card>
  </minerva-dashboard-column>
  <minerva-dashboard-column heading="Review" count="1" color="warning">
    <minerva-card padding="small">Dark mode</minerva-card>
  </minerva-dashboard-column>
  <minerva-dashboard-column heading="Blocked" count="1" color="danger">
    <minerva-card padding="small">SSO with Okta</minerva-card>
  </minerva-dashboard-column>
  <minerva-dashboard-column heading="Done" count="1" color="success">
    <minerva-card padding="small">Release 2.4</minerva-card>
  </minerva-dashboard-column>
  <minerva-dashboard-column heading="Research" count="1" color="#7c3aed">
    <minerva-card padding="small">Interview users</minerva-card>
  </minerva-dashboard-column>
</minerva-dashboard-columns>

```

## Example: Glisser-déposer

Avec draggable, les éléments minerva-dashboard-card des colonnes identifiées (value) se déplacent à la souris, au toucher ou au clavier. Le tableau émet minerva-card-move ({ cardKey, fromColumn, fromIndex, toColumn, toIndex }) sans rien déplacer lui-même : le script déplace l’élément de la carte et met à jour les compteurs. La propriété canDrop limite « En cours » à 2 cartes.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/dashboard-columns/wc/drag-drop.html

```html
<minerva-dashboard-columns id="board" aria-label="Sprint 12" draggable>
  <minerva-dashboard-column heading="To do" value="todo" count="3">
    <minerva-dashboard-card value="guide" label="Write the onboarding guide"
      ><minerva-card padding="small"
        >Write the onboarding guide</minerva-card
      ></minerva-dashboard-card
    >
    <minerva-dashboard-card value="contrast" label="Audit color contrast"
      ><minerva-card padding="small"
        >Audit color contrast</minerva-card
      ></minerva-dashboard-card
    >
    <minerva-dashboard-card value="search" label="Index the docs search"
      ><minerva-card padding="small"
        >Index the docs search</minerva-card
      ></minerva-dashboard-card
    >
  </minerva-dashboard-column>
  <minerva-dashboard-column
    heading="Doing"
    value="doing"
    count="1"
    description="At most 2 cards"
  >
    <minerva-dashboard-card value="billing" label="Ship the billing page"
      ><minerva-card padding="small"
        >Ship the billing page</minerva-card
      ></minerva-dashboard-card
    >
  </minerva-dashboard-column>
  <minerva-dashboard-column heading="Done" value="done" count="1">
    <minerva-dashboard-card value="errors" label="Set up error tracking"
      ><minerva-card padding="small"
        >Set up error tracking</minerva-card
      ></minerva-dashboard-card
    >
  </minerva-dashboard-column>
</minerva-dashboard-columns>

```

### apps/docs/src/docs/pages/dashboard-columns/wc/drag-drop.ts

```tsx
// The board is controlled: on minerva-card-move the script moves the card
// element itself (toIndex counts the cards without the moved one) and
// updates the count attributes. canDrop keeps "Doing" at 2 cards.
import type {
  DashboardCardMove,
  MinervaDashboardColumns,
} from "minerva-design/web-components/dashboard-columns";

const LIMIT = 2;

export function setup(root: HTMLElement) {
  const board = root.querySelector<MinervaDashboardColumns>("#board")!;
  const column = (value: string) =>
    board.querySelector<HTMLElement>(
      `minerva-dashboard-column[value="${value}"]`,
    )!;
  const cardsOf = (element: HTMLElement) =>
    Array.from(
      element.querySelectorAll<HTMLElement>(":scope > minerva-dashboard-card"),
    );

  board.canDrop = (move) =>
    move.toColumn !== "doing" ||
    move.fromColumn === "doing" ||
    cardsOf(column("doing")).length < LIMIT;

  const onMove = (event: Event) => {
    const move = (event as CustomEvent<DashboardCardMove>).detail;
    const card = cardsOf(column(move.fromColumn))[move.fromIndex]!;
    const target = column(move.toColumn);
    const others = cardsOf(target).filter((other) => other !== card);
    target.insertBefore(card, others[move.toIndex] ?? null);
    for (const element of [column(move.fromColumn), target])
      element.setAttribute("count", String(cardsOf(element).length));
  };
  board.addEventListener("minerva-card-move", onMove);
  return () => {
    board.removeEventListener("minerva-card-move", onMove);
    board.canDrop = undefined;
  };
}

```

## Example: État vide et actions

Le slot actions se place au bout de l’en-tête ; empty-text (ou le slot empty) s’affiche tant que la colonne n’a aucune carte ; fill étire les colonnes quand elles tiennent.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/dashboard-columns/wc/empty-actions.html

```html
<minerva-dashboard-columns aria-label="Ideas" fill>
  <minerva-dashboard-column
    id="ideas"
    heading="Ideas"
    count="0"
    description="Anything worth exploring"
    empty-text="No ideas yet: use Add to create one."
  >
    <minerva-button slot="actions" id="add" size="small" variant="ghost"
      >Add</minerva-button
    >
  </minerva-dashboard-column>
  <minerva-dashboard-column
    heading="Archived"
    count="0"
  ></minerva-dashboard-column>
</minerva-dashboard-columns>

```

### apps/docs/src/docs/pages/dashboard-columns/wc/empty-actions.ts

```tsx
// The empty slot / empty-text shows while the column has no cards; the
// actions slot holds header controls.
export function setup(root: HTMLElement) {
  const column = root.querySelector<HTMLElement>("#ideas")!;
  const add = root.querySelector<HTMLElement>("#add")!;
  const onAdd = () => {
    const count = column.querySelectorAll("minerva-card").length + 1;
    const card = document.createElement("minerva-card");
    card.setAttribute("padding", "small");
    card.textContent = `Idea ${count}`;
    column.append(card);
    column.setAttribute("count", String(count));
  };
  add.addEventListener("click", onAdd);
  return () => add.removeEventListener("click", onAdd);
}

```

## Example: Hauteur fixe

height ou max-height bornent le tableau : le corps de chaque colonne défile verticalement pendant que le tableau défile horizontalement.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/dashboard-columns/wc/fixed-height.html

```html
<minerva-dashboard-columns id="queue" aria-label="Support queue" height="320">
  <minerva-dashboard-column
    heading="Inbox"
    color="info"
    data-prefix="Ticket"
    data-count="12"
  ></minerva-dashboard-column>
  <minerva-dashboard-column
    heading="Triaged"
    color="warning"
    data-prefix="Bug"
    data-count="5"
  ></minerva-dashboard-column>
  <minerva-dashboard-column
    heading="Fixed"
    color="success"
    data-prefix="Fix"
    data-count="8"
  ></minerva-dashboard-column>
</minerva-dashboard-columns>

```

### apps/docs/src/docs/pages/dashboard-columns/wc/fixed-height.ts

```tsx
// height (or max-height) bounds the board: each column body scrolls
// vertically within it while the board scrolls horizontally.
export function setup(root: HTMLElement) {
  const added: HTMLElement[] = [];
  for (const column of root.querySelectorAll<HTMLElement>(
    "minerva-dashboard-column",
  )) {
    const count = Number(column.dataset.count);
    for (let index = 1; index <= count; index++) {
      const card = document.createElement("minerva-card");
      card.setAttribute("padding", "small");
      card.textContent = `${column.dataset.prefix} ${index}`;
      column.append(card);
      added.push(card);
    }
    column.setAttribute("count", String(count));
  }
  return () => added.forEach((card) => card.remove());
}

```
