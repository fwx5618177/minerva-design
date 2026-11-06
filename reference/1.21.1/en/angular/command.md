# Command

A searchable command palette in a modal. Type to filter by title, description, group and keywords, move with the arrow keys, choose with Enter or a click. An optional global shortcut opens it.

Package: minerva-design@1.21.1

Renderer: angular

Locale: en

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

## CommandDialog

Support: beta

Native Angular: MnCommandDialog. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnCommandDialog"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "title",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "description",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "items",
    "typeText": "readonly CommandItem[]",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "query",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  }
]
```

### events

```json
[
  {
    "name": "selected",
    "typeText": "CommandItem",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "CommandItem",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "queryChange",
    "typeText": "string",
    "required": false
  }
]
```

### bindings

```json
[
  {
    "prop": "query",
    "event": "queryChange",
    "syntax": "[(query)]"
  }
]
```

## CSS variables

```json
{
  "css:Command": {
    "kind": "cssVars",
    "source": "react/src/components/Command",
    "vars": [
      {
        "name": "--command-search-height",
        "description": "Minimum height of the search field (defaults to --control-height-md)"
      },
      {
        "name": "--command-results-max-height",
        "description": "Maximum height of the scrolling result list"
      },
      {
        "name": "--command-item-min-height",
        "description": "Minimum height of a result row"
      },
      {
        "name": "--command-item-padding-y",
        "description": "Vertical padding of a result row (follows the density's row padding)"
      },
      {
        "name": "--command-item-padding-x",
        "description": "Horizontal padding of a result row (follows the density's row padding)"
      },
      {
        "name": "--command-item-active-background",
        "description": "Background of the hovered / active row (defaults to a 10% primary tint)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Search and run commands

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnButton, MnCommandDialog } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnButton, MnCommandDialog],
  template: `
<button mnButton (click)="open=true">Open commands</button><mn-command-dialog [(open)]="open" [items]="items" (selected)="result=$event.label ?? ''"/><output>{{result}}</output>
  `,
})
export class Example {
  open = false;
  result = "";
  items = [
  {
    "id": "new",
    "label": "Create project",
    "keywords": "add new"
  },
  {
    "id": "search",
    "label": "Search files"
  },
  {
    "id": "settings",
    "label": "Open settings"
  }
];
}

```

## Example: Unavailable commands

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnButton, MnCommandDialog } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnButton, MnCommandDialog],
  template: `
<button mnButton variant="outline" (click)="open=true">Workspace commands</button><mn-command-dialog title="Workspace" [(open)]="open" [items]="items"/>
  `,
})
export class Example {
  open = false;
  items = [
  {
    "id": "view",
    "label": "View workspace"
  },
  {
    "id": "delete",
    "label": "Delete workspace",
    "disabled": true
  }
];
}

```
