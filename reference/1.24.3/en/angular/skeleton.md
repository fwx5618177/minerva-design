# Skeleton

Placeholder shapes shown while content is loading.

Package: minerva-design@1.24.3

Renderer: angular

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.24.3",
  "sourceCommit": "bbcef3f0abff568d08e734ec3e117c8cd10b017e",
  "sourceDigest": "sha256:94a5fd0119213e1760835190bfd5a8871f02c56d20091b654fc378ab0e0e6331",
  "referenceSourceDigest": "sha256:aa4b50ed4e7a53906ab6f39a3da2bbb4024583714e780e0cf99a262437a2babd"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.24.3/types.json) or getType() from minerva-design/contracts.

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
