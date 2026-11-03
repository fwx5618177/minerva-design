# Page ページ

ページの骨組み：一貫した画面のための Page、PageHeader、PageSection、StatCard、Toolbar。

Package: minerva-design@1.19.3

Renderer: angular

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "1b65455cccbdd71bb609d7d859b1ef90f9e604c6",
  "sourceDigest": "sha256:a8b34eea01e9133306bb1fde48e7966deaaaa35d87c2dfd2e181d891c65e01c1",
  "referenceSourceDigest": "sha256:d3ed05a4228bc39ff766871c13b5ba292792f934f6ebc3d0d29af28589be129c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## Page

Support: beta

Native Angular: MnPage. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnPage"
  ],
  "kind": "named"
}
```

### slots

```json
[
  {
    "name": "default"
  }
]
```

## PageHeader

Support: beta

Native Angular: MnPageHeader. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnPageHeader"
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
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "description",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
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

## PageSection

Support: beta

Native Angular: MnPageSection. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnPageSection"
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
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "description",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "icon",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  }
]
```

### slots

```json
[
  {
    "name": "[mnActions]"
  },
  {
    "name": "default"
  }
]
```

## StatCard

Support: beta

Native Angular: MnStatCard. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnStatCard"
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
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "value",
    "typeText": "string | number",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "description",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "icon",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  }
]
```

## Toolbar

Support: beta

Native Angular: MnToolbar. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnToolbar"
  ],
  "kind": "named"
}
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
  "css:Page": {
    "kind": "cssVars",
    "source": "react/src/components/Page",
    "vars": [
      {
        "name": "--page-padding",
        "description": "Padding around the page content (smaller on narrow screens by default)"
      },
      {
        "name": "--page-gap",
        "description": "Space between the header and the sections"
      },
      {
        "name": "--page-title-font-size",
        "description": "Font size of the page title"
      },
      {
        "name": "--page-section-gap",
        "description": "Space between the blocks of a section"
      },
      {
        "name": "--page-stat-card-padding",
        "description": "Inner padding of a stat card"
      },
      {
        "name": "--page-stat-card-radius",
        "description": "Corner radius of a stat card (defaults to --radius-lg)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Structured screen

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnPage, MnPageHeader, MnPageSection, MnStatCard } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnPage, MnPageHeader, MnPageSection, MnStatCard],
  template: `
<mn-page><mn-page-header title="Overview" description="Your team's activity"/><mn-page-section title="Metrics" description="Updated just now" icon="★"><mn-stat-card label="Active projects" [value]="12" description="3 added this week"/></mn-page-section></mn-page>
  `,
})
export class Example {

}

```

## Example: Related actions

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnToolbar, MnButton } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnToolbar, MnButton],
  template: `
<mn-toolbar aria-label="Project actions"><button mnButton (click)="result='Created'">Create</button><button mnButton variant="outline" (click)="result='Exported'">Export</button></mn-toolbar><output>{{result}}</output>
  `,
})
export class Example {
  result = "";
}

```
