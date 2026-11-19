# DescriptionList

Champs de métadonnées étiquetés rendus dans un dl natif ; les lignes s'empilent sur écran étroit.

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

## DescriptionItem

Support: n/a

Native Angular: MnDescriptionList.items entries { term, description } render semantic dt/dd pairs; there is no separate item element.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnDescriptionList"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "items",
    "typeText": "readonly DescriptionItem[]",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  }
]
```

## DescriptionList

Support: beta

Native Angular: MnDescriptionList. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnDescriptionList"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "items",
    "typeText": "readonly DescriptionItem[]",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  }
]
```

## CSS variables

```json
{
  "css:DescriptionList": {
    "kind": "cssVars",
    "source": "react/src/components/DescriptionList",
    "vars": [
      {
        "name": "--description-list-row-padding-y",
        "description": "Vertical padding of a row (follows the density's row padding)"
      },
      {
        "name": "--description-list-gap",
        "description": "Space between the term and the description"
      },
      {
        "name": "--description-list-term-color",
        "description": "Text color of the terms"
      },
      {
        "name": "--description-list-border-color",
        "description": "Color of the row separators"
      },
      {
        "name": "--description-list-font-size",
        "description": "Font size"
      },
      {
        "name": "--description-list-radius",
        "description": "Corner radius of a bordered list (defaults to --radius-lg)"
      },
      {
        "name": "--description-list-background",
        "description": "Background of a bordered list (defaults to --surface-color)"
      },
      {
        "name": "--description-list-padding-x",
        "description": "Horizontal padding of the rows of a bordered or striped list"
      },
      {
        "name": "--description-list-stripe-background",
        "description": "Background of every other row of a striped list (defaults to --surface-subtle-color)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Record metadata

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnDescriptionList } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnDescriptionList],
  template: `
<mn-description-list [items]="items"/>
  `,
})
export class Example {
  items = [
  {
    "term": "Owner",
    "description": "Ada Lovelace"
  },
  {
    "term": "Status",
    "description": "Active"
  },
  {
    "term": "Created",
    "description": "October 2026"
  }
];
}

```

## Example: Operational details

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnDescriptionList } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnDescriptionList],
  template: `
<mn-description-list [items]="items"/>
  `,
})
export class Example {
  items = [
  {
    "term": "Region",
    "description": "Europe"
  },
  {
    "term": "Environment",
    "description": "Production"
  }
];
}

```
