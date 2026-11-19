# NavTree

Navigation latérale avec sections, branches dépliables, élément actif et mode compact à icônes. Les flèches déplacent le focus et ouvrent ou ferment les branches.

Package: minerva-design@1.24.1

Renderer: angular

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.24.1",
  "sourceCommit": "047f9c5959d145a99ef0fc64e0f45b2576a52272",
  "sourceDigest": "sha256:94a5fd0119213e1760835190bfd5a8871f02c56d20091b654fc378ab0e0e6331",
  "referenceSourceDigest": "sha256:6b85000d2c44f8f86c14aa56a8104e251bc0f90185b40c286ffbdc93cc63c2f6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.24.1/types.json) or getType() from minerva-design/contracts.

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
        "description": "Color of the optional indent guide of an expanded branch (defaults to transparent)"
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
