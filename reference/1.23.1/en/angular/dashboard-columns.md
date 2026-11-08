# DashboardColumns

Columns of cards on a dashboard, one per workflow stage, pipeline step or status (To do / Doing / Done): equal-width columns with a title, a count and an accent color, stacked cards, and horizontal scrolling. With draggable, DashboardCard children move between and within columns by mouse, touch or keyboard; the board stays controlled (onCardMove).

Package: minerva-design@1.23.1

Renderer: angular

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

Native Angular: MnDashboardCard. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnDashboardCard"
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
    "required": true,
    "source": "packages/angular/src/components/data/dashboard-columns.ts"
  },
  {
    "name": "label",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/data/dashboard-columns.ts"
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

Native Angular: MnDashboardColumn. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnDashboardColumn"
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
    "required": false,
    "source": "packages/angular/src/components/data/dashboard-columns.ts"
  },
  {
    "name": "value",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/data/dashboard-columns.ts"
  },
  {
    "name": "count",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/data/dashboard-columns.ts"
  },
  {
    "name": "color",
    "typeText": "DashboardColumnColor | undefined",
    "required": false,
    "source": "packages/angular/src/components/data/dashboard-columns.ts"
  },
  {
    "name": "description",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/data/dashboard-columns.ts"
  },
  {
    "name": "empty",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/data/dashboard-columns.ts"
  },
  {
    "name": "aria-label",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/data/dashboard-columns.ts"
  }
]
```

### slots

```json
[
  {
    "name": "[mnDashboardTitle]"
  },
  {
    "name": "[mnDashboardActions]"
  },
  {
    "name": "default"
  },
  {
    "name": "[mnDashboardEmpty]"
  },
  {
    "name": "[mnDashboardFooter]"
  }
]
```

## DashboardColumns

Support: beta

Native Angular: MnDashboardColumns. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnDashboardColumns"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "columnWidth",
    "typeText": "DashboardLength | undefined",
    "required": false,
    "source": "packages/angular/src/components/data/dashboard-columns.ts"
  },
  {
    "name": "fill",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/data/dashboard-columns.ts"
  },
  {
    "name": "gap",
    "typeText": "DashboardLength | undefined",
    "required": false,
    "source": "packages/angular/src/components/data/dashboard-columns.ts"
  },
  {
    "name": "height",
    "typeText": "DashboardLength | undefined",
    "required": false,
    "source": "packages/angular/src/components/data/dashboard-columns.ts"
  },
  {
    "name": "maxHeight",
    "typeText": "DashboardLength | undefined",
    "required": false,
    "source": "packages/angular/src/components/data/dashboard-columns.ts"
  },
  {
    "name": "draggable",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/data/dashboard-columns.ts"
  },
  {
    "name": "canDrop",
    "typeText": "((move: DashboardCardMove) => boolean) | undefined",
    "required": false,
    "source": "packages/angular/src/components/data/dashboard-columns.ts"
  },
  {
    "name": "aria-label",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/data/dashboard-columns.ts"
  },
  {
    "name": "aria-labelledby",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/data/dashboard-columns.ts"
  }
]
```

### events

```json
[
  {
    "name": "cardMove",
    "typeText": "DashboardCardMove",
    "required": false,
    "source": "packages/angular/src/components/data/dashboard-columns.ts",
    "parameters": [
      {
        "name": "$event",
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

## Example: Board with cards

Projected cards form the column's role=list (each gets role=listitem). Here cards move with their own actions and the data is updated; see Drag and drop for draggable boards.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnDashboardColumns, MnDashboardColumn, MnCard, MnButton } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnDashboardColumns, MnDashboardColumn, MnCard, MnButton],
  template: `
<mn-dashboard-columns aria-label="Sprint 12">@for (column of columns; track column.title; let i = $index) {<mn-dashboard-column [title]="column.title" [count]="column.tasks.length">@for (task of column.tasks; track task.id; let j = $index) {<mn-card padding="small">{{task.title}} @if (i < columns.length - 1) {<button mnButton size="small" variant="ghost" (click)="columns[i + 1].tasks.push(task); column.tasks.splice(j, 1)">Move to {{columns[i + 1].title}}</button>}</mn-card>}</mn-dashboard-column>}</mn-dashboard-columns>
  `,
})
export class Example {
  columns = [
  {
    "title": "To do",
    "tasks": [
      {
        "id": 1,
        "title": "Write the onboarding guide"
      }
    ]
  },
  {
    "title": "Doing",
    "tasks": [
      {
        "id": 2,
        "title": "Ship the billing page"
      }
    ]
  },
  {
    "title": "Done",
    "tasks": [
      {
        "id": 3,
        "title": "Set up error tracking"
      }
    ]
  }
];
}

```

## Example: Drag and drop

draggable moves the mn-dashboard-card children of keyed columns (value) with the mouse, a touch long press or the keyboard (Space / Enter picks up and drops, the arrows move, Escape cancels). The board is controlled: (cardMove) reports { cardKey, fromColumn, fromIndex, toColumn, toIndex } and the app moves the card (here: remove it, then insert it at toIndex).

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnDashboardColumns, MnDashboardColumn, MnDashboardCard, MnCard } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnDashboardColumns, MnDashboardColumn, MnDashboardCard, MnCard],
  template: `
<mn-dashboard-columns aria-label="Sprint 12" draggable (cardMove)="$any(lists)[$event.toColumn].splice($event.toIndex, 0, $any(lists)[$event.fromColumn].splice($event.fromIndex, 1)[0])">@for (column of columns; track column.key) {<mn-dashboard-column [title]="column.title" [value]="column.key" [count]="$any(lists)[column.key].length">@for (task of $any(lists)[column.key]; track task.id) {<mn-dashboard-card [value]="task.id" [label]="task.title"><mn-card padding="small">{{task.title}}</mn-card></mn-dashboard-card>}</mn-dashboard-column>}</mn-dashboard-columns>
  `,
})
export class Example {
  columns = [
  {
    "key": "todo",
    "title": "To do"
  },
  {
    "key": "doing",
    "title": "Doing"
  },
  {
    "key": "done",
    "title": "Done"
  }
];
  lists = {
  "todo": [
    {
      "id": "guide",
      "title": "Write the onboarding guide"
    },
    {
      "id": "contrast",
      "title": "Audit color contrast"
    }
  ],
  "doing": [
    {
      "id": "billing",
      "title": "Ship the billing page"
    }
  ],
  "done": [
    {
      "id": "errors",
      "title": "Set up error tracking"
    }
  ]
};
}

```

## Example: Colors, counts and actions

color takes a theme color or any CSS color (the dot before the title); [mnDashboardActions], [mnDashboardEmpty] and [mnDashboardFooter] project header actions, empty content and a footer.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnDashboardColumns, MnDashboardColumn, MnCard, MnButton } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnDashboardColumns, MnDashboardColumn, MnCard, MnButton],
  template: `
<mn-dashboard-columns aria-label="Roadmap" [columnWidth]="220" fill><mn-dashboard-column title="Ready" color="info" [count]="1" description="Groomed and estimated"><button mnButton mnDashboardActions size="small" variant="ghost">Add</button><mn-card padding="small">Pricing page copy</mn-card></mn-dashboard-column><mn-dashboard-column title="Blocked" color="danger" [count]="1"><mn-card padding="small">SSO with Okta</mn-card></mn-dashboard-column><mn-dashboard-column title="Research" color="#7c3aed" [count]="0" empty="Nothing to research"/></mn-dashboard-columns>
  `,
})
export class Example {

}

```

## Example: Fixed height

height or maxHeight bound the board: each column body scrolls vertically while the board scrolls horizontally.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnDashboardColumns, MnDashboardColumn, MnCard } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnDashboardColumns, MnDashboardColumn, MnCard],
  template: `
<mn-dashboard-columns aria-label="Support queue" [height]="280"><mn-dashboard-column title="Inbox" color="info" [count]="tickets.length">@for (ticket of tickets; track ticket) {<mn-card padding="small">{{ticket}}</mn-card>}</mn-dashboard-column><mn-dashboard-column title="Fixed" color="success" [count]="0"/></mn-dashboard-columns>
  `,
})
export class Example {
  tickets = ["Ticket 1", "Ticket 2", "Ticket 3", "Ticket 4", "Ticket 5", "Ticket 6", "Ticket 7", "Ticket 8", "Ticket 9", "Ticket 10"];
}

```
