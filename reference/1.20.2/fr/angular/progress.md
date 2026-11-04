# ProgressIndicator

Indique une progression : une progressbar indéterminée dessinée en spinner, cercle, vague, barre ou barre pointillée, ou — avec value — une barre ou un cercle déterminés.

Package: minerva-design@1.20.2

Renderer: angular

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.2",
  "sourceCommit": "8d5d0df3644b1fa1c267b3dd6809b0e7eb1ce75b",
  "sourceDigest": "sha256:2862a9e3a864c9423aed5d287db6fac7e8ddf58b9f5d144c61e7ff4a2630890e",
  "referenceSourceDigest": "sha256:b329acf9d5eb6cf4b4b42169ce925c67b033f581b616664bf07fc6d664de45f0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.2/types.json) or getType() from minerva-design/contracts.

## Documentation

## ProgressIndicator

Support: beta

Native Angular: MnProgressIndicator. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnProgressIndicator"
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
    "name": "icon",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "decorative",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "size",
    "typeText": "\"small\" | \"medium\" | \"large\" | \"xsmall\" | \"xlarge\"",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "variant",
    "typeText": "\"circle\" | \"spinner\" | \"bar\" | \"wave\" | \"dotted-bar\"",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "color",
    "typeText": "\"primary\" | \"success\" | \"warning\" | \"danger\" | \"info\" | \"current\" | \"neutral\"",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "value",
    "typeText": "number | undefined",
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
    "name": "showValue",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "format",
    "typeText": "((value: number, max: number) => string) | null",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  }
]
```

## CSS variables

```json
{
  "css:ProgressIndicator": {
    "kind": "cssVars",
    "source": "react/src/components/ProgressIndicator",
    "vars": [
      {
        "name": "--progress-width",
        "description": "Width of a linear indicator with the default width"
      },
      {
        "name": "--progress-bar-height",
        "description": "Thickness of the bar (every size)"
      },
      {
        "name": "--progress-track-color",
        "description": "Color of the bar track (and of the determinate circle track)"
      },
      {
        "name": "--progress-radius",
        "description": "Corner radius of the bar track (defaults to --radius-sm)"
      },
      {
        "name": "--progress-size",
        "description": "Size of the round indicators (spinner / circle / wave; every size)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Labeled loading

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnProgressIndicator } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnProgressIndicator],
  template: `
<mn-progress label="Uploading files"/>
  `,
})
export class Example {

}

```

## Example: Indicator variants

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnProgressIndicator, MnStack } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnProgressIndicator, MnStack],
  template: `
<mn-stack direction="row" wrap gap="3" align="center"><mn-progress variant="bar" label="Preparing"/><mn-progress variant="circle" size="large"/><mn-progress variant="wave"/><mn-progress variant="dotted-bar"/></mn-stack>
  `,
})
export class Example {

}

```

## Example: Determinate progress

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnProgressIndicator, MnStack } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnProgressIndicator, MnStack],
  template: `
<mn-stack direction="row" wrap gap="3" align="center"><mn-progress variant="bar" value="40" showValue label="Course progress"/><mn-progress variant="circle" size="large" color="success" value="75" showValue/></mn-stack>
  `,
})
export class Example {

}

```
