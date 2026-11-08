# Divider

A thin line that separates content, horizontally or vertically, optionally with text.

Package: minerva-design@1.23.2

Renderer: angular

Locale: en

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

## Divider

Support: beta

Native Angular: MnDivider. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnDivider"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "orientation",
    "typeText": "\"horizontal\" | \"vertical\"",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "variant",
    "typeText": "\"solid\" | \"dashed\" | \"dotted\"",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "align",
    "typeText": "\"right\" | \"left\" | \"center\"",
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
  "css:Divider": {
    "kind": "cssVars",
    "source": "react/src/components/Divider",
    "vars": [
      {
        "name": "--divider-color",
        "description": "Line color (defaults to --border-color)"
      },
      {
        "name": "--divider-thickness",
        "description": "Line thickness"
      },
      {
        "name": "--divider-spacing",
        "description": "Inline margin around a vertical divider"
      },
      {
        "name": "--divider-text-gap",
        "description": "Space between the text and the lines"
      },
      {
        "name": "--divider-text-font-size",
        "description": "Font size of the text"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Labeled separator

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnDivider } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnDivider],
  template: `
<p>Continue with your account</p><mn-divider>or</mn-divider><p>Create a new account</p>
  `,
})
export class Example {

}

```

## Example: Line styles

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnDivider } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnDivider],
  template: `
<mn-divider variant="dashed">Dashed</mn-divider><mn-divider variant="dotted" align="left">Dotted</mn-divider>
  `,
})
export class Example {

}

```
