# Badge

A small count or status indicator attached to the corner of another element.

Package: minerva-design@1.22.1

Renderer: angular

Locale: en

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

## Badge

Support: beta

Native Angular: MnBadge. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnBadge"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "typeText": "string | number",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "max",
    "typeText": "number",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "icon",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "attached",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "size",
    "typeText": "\"small\" | \"medium\" | \"large\"",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "variant",
    "typeText": "\"subtle\" | \"outline\" | \"solid\"",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "color",
    "typeText": "\"primary\" | \"success\" | \"warning\" | \"danger\" | \"info\" | \"neutral\"",
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
  "css:Badge": {
    "kind": "cssVars",
    "source": "react/src/components/Badge",
    "vars": [
      {
        "name": "--badge-bg",
        "description": "Background color (overrides the color and variant)"
      },
      {
        "name": "--badge-fg",
        "description": "Text color (overrides the color and variant)"
      },
      {
        "name": "--badge-border",
        "description": "Border color of the subtle and outline variants"
      },
      {
        "name": "--badge-radius",
        "description": "Corner radius (defaults to --radius-sm)"
      },
      {
        "name": "--badge-padding-y",
        "description": "Vertical padding (every size)"
      },
      {
        "name": "--badge-padding-x",
        "description": "Horizontal padding (every size)"
      },
      {
        "name": "--badge-font-size",
        "description": "Font size (every size)"
      },
      {
        "name": "--badge-dot-size",
        "description": "Diameter of the dot badge"
      },
      {
        "name": "--badge-ring-color",
        "description": "Color of the ring separating an attached (corner) badge from its content (defaults to --surface-color)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Counts and status

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnBadge, MnStack } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnBadge, MnStack],
  template: `
<mn-stack direction="row" wrap gap="3" align="center"><mn-badge [value]="12"/><mn-badge value="Active" color="success"/><mn-badge [value]="120" color="danger" attached><span style="padding:20px">Inbox</span></mn-badge></mn-stack>
  `,
})
export class Example {

}

```

## Example: Subtle and outlined

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnBadge, MnStack } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnBadge, MnStack],
  template: `
<mn-stack direction="row" wrap gap="3" align="center"><mn-badge value="New" variant="subtle"/><mn-badge value="Review" variant="outline" color="warning"/></mn-stack>
  `,
})
export class Example {

}

```
