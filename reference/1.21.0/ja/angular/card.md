# Card カード

関連するコンテンツと操作をまとめるコンテナ。CardHeader、CardTitle、CardDescription、CardContent、CardFooter で構成します。

Package: minerva-design@1.21.0

Renderer: angular

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "3e3fd42fed9bd7320e0095e9008ad52d1dd44024",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:bdc377ab7ed5f94120cdda24084c48e40370128fac18b85708e5f8b5fbaf5e95"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## Card

Support: beta

Native Angular: MnCard. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnCard"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "variant",
    "typeText": "\"outline\" | \"ghost\" | \"default\" | \"elevated\" | \"filled\"",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "padding",
    "typeText": "\"none\" | \"small\" | \"medium\" | \"large\"",
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

## CardContent

Support: beta

Native Angular: MnCardContent. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnCardContent"
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

## CardDescription

Support: beta

Native Angular: MnCardDescription. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnCardDescription"
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

## CardFooter

Support: beta

Native Angular: MnCardFooter. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnCardFooter"
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

## CardHeader

Support: beta

Native Angular: MnCardHeader. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnCardHeader"
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

## CardTitle

Support: beta

Native Angular: MnCardTitle. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnCardTitle"
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
  "css:Card": {
    "kind": "cssVars",
    "source": "react/src/components/Card",
    "vars": [
      {
        "name": "--card-bg-color",
        "description": "Background color of the card"
      },
      {
        "name": "--card-bg-color-content",
        "description": "Background color of the content section (sections layout)"
      },
      {
        "name": "--card-border-color",
        "description": "Color of the border and of the section dividers"
      },
      {
        "name": "--card-radius",
        "description": "Corner radius (defaults to --radius-sm, --radius-lg with the padding prop)"
      },
      {
        "name": "--card-shadow",
        "description": "Shadow of the default and elevated variants (defaults to --shadow-sm / --shadow-lg)"
      },
      {
        "name": "--card-padding",
        "description": "Padding of the header, content and footer sections (sections layout; the padding props win)"
      },
      {
        "name": "--card-header-bg-color",
        "description": "Background color of the header section (sections layout)"
      },
      {
        "name": "--card-title-font-size",
        "description": "Font size of the title"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Structured content

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnCard, MnCardHeader, MnCardTitle, MnCardDescription, MnCardContent, MnCardFooter, MnButton } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnCard, MnCardHeader, MnCardTitle, MnCardDescription, MnCardContent, MnCardFooter, MnButton],
  template: `
<article mnCard><mn-card-header><mn-card-title>Team workspace</mn-card-title><mn-card-description>Keep your project organized.</mn-card-description></mn-card-header><mn-card-content>12 projects · 8 members</mn-card-content><mn-card-footer><button mnButton (click)="joined=!joined">{{joined?'Joined':'Join workspace'}}</button></mn-card-footer></article>
  `,
})
export class Example {
  joined = false;
}

```

## Example: Surface variants

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnCard, MnStack } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnCard, MnStack],
  template: `
<mn-stack direction="row" wrap gap="3" align="center"><mn-card variant="outline">Outline card</mn-card><mn-card variant="elevated">Elevated card</mn-card><mn-card variant="filled">Filled card</mn-card></mn-stack>
  `,
})
export class Example {

}

```
