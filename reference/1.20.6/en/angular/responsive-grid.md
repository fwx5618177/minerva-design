# ResponsiveGrid

An equal-column grid whose column count follows its own width (container queries), not the viewport.

Package: minerva-design@1.20.6

Renderer: angular

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.6",
  "sourceCommit": "63ce45656d8f3d1bfbee71026e84674640ae9abf",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:fa9a782f68a5d5b512762e2152b2ad065da3de6937bac96eef63709ddba3b95b"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.6/types.json) or getType() from minerva-design/contracts.

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
