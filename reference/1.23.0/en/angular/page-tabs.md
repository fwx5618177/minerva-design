# PageTabs

A strip of open application pages (route navigation, not an ARIA tablist): the application owns routes, closing and unsaved-change guards. Items are flat rounded surfaces; long titles are truncated and shown in full in a tooltip; the current page stays in view and scroll buttons appear when the list overflows.

Package: minerva-design@1.23.0

Renderer: angular

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "19d3efc34af8ba4e23df0f24d9fbb0a587e1b452",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:ec29900df0d5b5c8d741436acb4a250ec29e5f40ce1f4110def33ac2d66baaa5"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## PageTab

Support: beta

Native Angular: MnPageTab. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnPageTab"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "href",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/navigation/index.ts"
  },
  {
    "name": "label",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/navigation/index.ts"
  },
  {
    "name": "icon",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/navigation/index.ts"
  },
  {
    "name": "current",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/navigation/index.ts"
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/navigation/index.ts"
  }
]
```

### events

```json
[
  {
    "name": "selected",
    "typeText": "void",
    "required": false,
    "source": "packages/angular/src/components/navigation/index.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "void",
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
  },
  {
    "name": "[mnAction]"
  }
]
```

## PageTabs

Support: beta

Native Angular: MnPageTabs. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnPageTabs"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "label",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/navigation/index.ts"
  }
]
```

### slots

```json
[
  {
    "name": "default"
  },
  {
    "name": "[mnActions]"
  }
]
```

## CSS variables

```json
{
  "css:PageTabs": {
    "kind": "cssVars",
    "source": "react/src/components/PageTabs",
    "vars": [
      {
        "name": "--page-tabs-height",
        "description": "Height of the tab bar"
      },
      {
        "name": "--page-tabs-background",
        "description": "Background of the tab bar"
      },
      {
        "name": "--page-tabs-gap",
        "description": "Space between the tabs"
      },
      {
        "name": "--page-tabs-item-height",
        "description": "Height of a tab"
      },
      {
        "name": "--page-tabs-item-min-width",
        "description": "Minimum width of a tab"
      },
      {
        "name": "--page-tabs-item-max-width",
        "description": "Maximum width of a tab (the label truncates)"
      },
      {
        "name": "--page-tabs-item-radius",
        "description": "Corner radius of a tab (defaults to --radius-lg)"
      },
      {
        "name": "--page-tabs-selected-background",
        "description": "Background of the active tab"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Document navigation

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnPageTabs, MnPageTab } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnPageTabs, MnPageTab],
  template: `
<mn-page-tabs><mn-page-tab label="Overview" icon="▤" [current]="page==='overview'" (selected)="page='overview'"/><mn-page-tab label="Activity" [current]="page==='activity'" (selected)="page='activity'"/></mn-page-tabs><output>Current page: {{page}}</output>
  `,
})
export class Example {
  page = "overview";
}

```

## Example: Unavailable page

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnPageTabs, MnPageTab } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnPageTabs, MnPageTab],
  template: `
<mn-page-tabs><mn-page-tab label="Current" current/><mn-page-tab label="Restricted" disabled/></mn-page-tabs>
  `,
})
export class Example {

}

```
