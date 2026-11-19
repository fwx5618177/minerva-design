# AppShell 应用外壳

应用外壳：可折叠或浮动的侧边栏、吸顶头部和唯一的 main 地标；768px 及以下时导航移入抽屉。

Package: minerva-design@1.24.2

Renderer: angular

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.24.2",
  "sourceCommit": "2d9157080afa96d568e1ab5dd5ebf85bbe169957",
  "sourceDigest": "sha256:94a5fd0119213e1760835190bfd5a8871f02c56d20091b654fc378ab0e0e6331",
  "referenceSourceDigest": "sha256:35a4364a093ce8ba3112a6866b1ac14e75de4497c8a2778617ef119cb4e030b2"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.24.2/types.json) or getType() from minerva-design/contracts.

## Documentation

## AppShell

Support: beta

Native Angular: MnAppShell. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnAppShell"
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
    "source": "packages/angular/src/components/application/index.ts"
  }
]
```

### slots

```json
[
  {
    "name": "[mnHeader]"
  },
  {
    "name": "default"
  }
]
```

## CSS variables

```json
{
  "css:AppShell": {
    "kind": "cssVars",
    "source": "react/src/components/AppShell",
    "vars": [
      {
        "name": "--app-shell-sidebar-width",
        "description": "Width of the expanded sidebar"
      },
      {
        "name": "--app-shell-rail-width",
        "description": "Width of the compact / floating rail"
      },
      {
        "name": "--app-shell-header-height",
        "description": "Minimum height of the header and the sidebar brand row"
      },
      {
        "name": "--app-shell-background",
        "description": "Background of the page area"
      },
      {
        "name": "--app-shell-sidebar-background",
        "description": "Background of the sidebar and the mobile navigation drawer"
      },
      {
        "name": "--app-shell-header-background",
        "description": "Background of the sticky header"
      },
      {
        "name": "--app-shell-drawer-width",
        "description": "Width of the mobile navigation drawer"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Workspace navigation

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnAppShell, MnNavTree } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnAppShell, MnNavTree],
  template: `
<div style="position:relative;isolation:isolate;transform:translateZ(0);height:360px;overflow:auto"><mn-app-shell title="Workspace"><ng-template><mn-nav-tree [items]="items"/></ng-template><p style="padding:24px">Open navigation to inspect the mobile drawer and keyboard focus behavior.</p></mn-app-shell></div>
  `,
})
export class Example {
  items = [
  {
    "id": "home",
    "label": "Overview",
    "href": "#overview"
  },
  {
    "id": "projects",
    "label": "Projects",
    "href": "#projects"
  }
];
}

```

## Example: Controlled navigation drawer

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnButton, MnDrawer } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnButton, MnDrawer],
  template: `
<button mnButton (click)="open=true">Open navigation</button><mn-drawer title="Workspace" [(open)]="open" side="left"><nav><a href="#overview">Overview</a></nav></mn-drawer>
  `,
})
export class Example {
  open = false;
}

```
