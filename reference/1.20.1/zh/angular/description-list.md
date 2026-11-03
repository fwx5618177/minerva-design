# DescriptionList 描述列表

以原生 dl 呈现的带标签元数据字段，窄屏下行会堆叠显示。

Package: minerva-design@1.20.1

Renderer: angular

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.1",
  "sourceCommit": "3a9f5cdaae706f14fe6d8c65c5481eba719a66c4",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:6c9ecba0079f25e53cd971e51f2be8604fc3d941c0ed1cfeec03c4a91913ad73"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.1/types.json) or getType() from minerva-design/contracts.

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
