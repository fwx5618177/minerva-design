# NavTree 导航树

侧边栏导航：分组、可展开分支、当前项高亮以及仅图标的紧凑模式。方向键可在项目间移动并展开或收起分支。

Package: minerva-design@1.22.2

Renderer: angular

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "b19e53ff0733e666aa205d6fd5bebb89b1eef18d",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:2a0069aef643875e6528da29db3ea67e23924d3d3dcad8f2f45e0400ede619c0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

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
