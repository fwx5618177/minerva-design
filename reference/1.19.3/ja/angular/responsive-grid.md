# ResponsiveGrid レスポンシブグリッド

列数がビューポートではなく自身の幅（コンテナクエリ）に従う等幅カラムのグリッド。

Package: minerva-design@1.19.3

Renderer: angular

Locale: ja

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

## GridItem

Support: beta

Native Angular: MnGridItem. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnGridItem"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "span",
    "typeText": "number",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "fullWidth",
    "typeText": "boolean",
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

## ResponsiveGrid

Support: beta

Native Angular: MnResponsiveGrid. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnResponsiveGrid"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "minColumnWidth",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "gap",
    "typeText": "string | number",
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

## CSS variables

```json
{
  "css:ResponsiveGrid": {
    "kind": "cssVars",
    "source": "react/src/components/ResponsiveGrid",
    "vars": [
      {
        "name": "--responsive-grid-align-items",
        "description": "Vertical alignment of the items in their row (default: stretch)"
      },
      {
        "name": "--responsive-grid-justify-items",
        "description": "Horizontal alignment of the items in their column (default: stretch)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Automatic columns

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnResponsiveGrid, MnCard } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnResponsiveGrid, MnCard],
  template: `
<mn-responsive-grid minColumnWidth="160px"><mn-card>Design</mn-card><mn-card>Engineering</mn-card><mn-card>Research</mn-card></mn-responsive-grid>
  `,
})
export class Example {

}

```

## Example: Spanning a row

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnResponsiveGrid, MnGridItem, MnCard } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnResponsiveGrid, MnGridItem, MnCard],
  template: `
<mn-responsive-grid minColumnWidth="140px"><mn-grid-item fullWidth><mn-card>Full-width summary</mn-card></mn-grid-item><mn-card>Left</mn-card><mn-card>Right</mn-card></mn-responsive-grid>
  `,
})
export class Example {

}

```
