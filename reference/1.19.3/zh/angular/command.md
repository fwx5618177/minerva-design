# Command 命令面板

模态框中的可搜索命令面板。输入即可按标题、描述、分组和关键字过滤，方向键移动，回车或点击选择。可选的全局快捷键可打开它。

Package: minerva-design@1.19.3

Renderer: angular

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:ed8b6b1bf30e9055934099f84afd6b8369eee155b0404de5e8db004c3d91bce6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

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
