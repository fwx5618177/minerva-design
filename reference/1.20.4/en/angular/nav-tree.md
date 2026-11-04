# NavTree

Sidebar navigation with sections, expandable branches, an active item and a compact icon-only mode. Arrow keys move between items and open or close branches.

Package: minerva-design@1.20.4

Renderer: angular

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "c389776dc1aa3bf80277d9c47f2c62d8f235e947",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:96f9f31e7015b805e8eece3c05731306a461013443150c08b7b7a91a3bfc1bb6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

## Documentation

## NavTree

Support: beta

Native Angular: MnNavTree. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnNavTree"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "items",
    "typeText": "readonly NavTreeItem[]",
    "required": false,
    "source": "packages/angular/src/components/application/index.ts"
  },
  {
    "name": "label",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/application/index.ts"
  },
  {
    "name": "value",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/application/index.ts"
  },
  {
    "name": "expanded",
    "typeText": "readonly string[]",
    "required": false,
    "source": "packages/angular/src/components/application/index.ts"
  }
]
```

### events

```json
[
  {
    "name": "valueChange",
    "typeText": "string",
    "required": false
  },
  {
    "name": "expandedChange",
    "typeText": "readonly string[]",
    "required": false
  },
  {
    "name": "selected",
    "typeText": "NavTreeItem",
    "required": false,
    "source": "packages/angular/src/components/application/index.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "NavTreeItem",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

### bindings

```json
[
  {
    "prop": "value",
    "event": "valueChange",
    "syntax": "[(value)]"
  },
  {
    "prop": "expanded",
    "event": "expandedChange",
    "syntax": "[(expanded)]"
  }
]
```

## CSS variables

```json
{
  "css:NavTree": {
    "kind": "cssVars",
    "source": "react/src/components/NavTree",
    "vars": [
      {
        "name": "--nav-tree-gap",
        "description": "Space between the sections"
      },
      {
        "name": "--nav-tree-item-height",
        "description": "Minimum height of a top-level row (defaults to the density's control height)"
      },
      {
        "name": "--nav-tree-item-padding-x",
        "description": "Horizontal padding of a row (follows the density's row padding)"
      },
      {
        "name": "--nav-tree-item-radius",
        "description": "Corner radius of a row (defaults to --radius-md)"
      },
      {
        "name": "--nav-tree-indent",
        "description": "Indentation of nested rows"
      },
      {
        "name": "--nav-tree-active-background",
        "description": "Background of the active row"
      },
      {
        "name": "--nav-tree-active-color",
        "description": "Accent color of the active row's icon"
      },
      {
        "name": "--nav-tree-hover-background",
        "description": "Background of a hovered row (defaults to --hover-color)"
      },
      {
        "name": "--nav-tree-guide-color",
        "description": "Color of the indent guide of an expanded branch (defaults to --border-color)"
      },
      {
        "name": "--nav-tree-guide-active-color",
        "description": "Color of the indent guide of the branch holding the active row"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Hierarchical navigation

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnNavTree } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnNavTree],
  template: `
<mn-nav-tree [items]="items" [(value)]="value" [expanded]="['projects']"/><output>Selected: {{value}}</output>
  `,
})
export class Example {
  value = "overview";
  items = [
  {
    "id": "overview",
    "label": "Overview",
    "icon": "⌂"
  },
  {
    "id": "projects",
    "label": "Projects",
    "children": [
      {
        "id": "design",
        "label": "Design",
        "description": "Active project"
      },
      {
        "id": "engineering",
        "label": "Engineering"
      }
    ]
  }
];
}

```

## Example: Disabled destinations

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnNavTree } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnNavTree],
  template: `
<mn-nav-tree label="Administration" [items]="items"/>
  `,
})
export class Example {
  items = [
  {
    "id": "settings",
    "label": "Settings"
  },
  {
    "id": "billing",
    "label": "Billing",
    "disabled": true
  }
];
}

```
