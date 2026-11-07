# Skeleton

Formes de remplacement affichées pendant le chargement du contenu.

Package: minerva-design@1.22.1

Renderer: angular

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.1",
  "sourceCommit": "3b95c464583d2e1bcf02999361aa6cf5481d519b",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:22ecb97acf4fac039a6d9a7e4a78b6bedc12dbbb8c1a14e3feeef3bcd47a7cef"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## Skeleton

Support: beta

Native Angular: MnSkeleton. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnSkeleton"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "variant",
    "typeText": "\"image\" | \"rounded\" | \"card\" | \"button\" | \"text\" | \"circular\" | \"rectangular\"",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "count",
    "typeText": "number",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "label",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  }
]
```

## SkeletonText

Support: beta

Native Angular: MnSkeletonText. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnSkeletonText"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "count",
    "typeText": "number",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  }
]
```

## CSS variables

```json
{
  "css:Skeleton": {
    "kind": "cssVars",
    "source": "react/src/components/Skeleton",
    "vars": [
      {
        "name": "--skeleton-color",
        "description": "Base color of the placeholder blocks"
      },
      {
        "name": "--skeleton-highlight-color",
        "description": "Color of the moving highlight (wave animation)"
      },
      {
        "name": "--skeleton-radius",
        "description": "Corner radius of the lines and blocks (circles stay round, rectangular blocks square)"
      },
      {
        "name": "--skeleton-text-height",
        "description": "Height of a text line"
      },
      {
        "name": "--skeleton-gap",
        "description": "Space between the lines of a paragraph and next to the avatar"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Content loading

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnSkeleton } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnSkeleton],
  template: `
<mn-skeleton variant="card"/>
  `,
})
export class Example {

}

```

## Example: Text placeholders

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnSkeletonText, MnSkeleton } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnSkeletonText, MnSkeleton],
  template: `
<mn-skeleton-text [count]="4"/><mn-skeleton variant="rounded" [count]="1"/>
  `,
})
export class Example {

}

```
