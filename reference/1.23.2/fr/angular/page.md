# Page

Structure de page : Page, PageHeader, PageSection, StatCard et Toolbar pour des écrans cohérents.

Package: minerva-design@1.23.2

Renderer: angular

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.2",
  "sourceCommit": "c6618fd81b2d3c2a9016cfe13a1d15983d533ff7",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:8f6e89c1e214fedc2e52de014615037c54204a8ec5c0dbb40c58dc530906571e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.2/types.json) or getType() from minerva-design/contracts.

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
        "name": "--page-max-width",
        "description": "Maximum readable page width (defaults to 90rem)"
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
        "name": "--page-section-padding",
        "description": "Inner spacing of a framed page section"
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
