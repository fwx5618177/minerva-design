# ProgressIndicator 加载指示器

表示进度：以旋转图标、圆环、波浪、进度条或点状进度条呈现的不确定进度 progressbar；设置 value 后，进度条和圆环变为确定进度。

Package: minerva-design@1.20.3

Renderer: angular

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.3",
  "sourceCommit": "ea7fb3e1f55d184b7d737316e9ae829f4f7ff223",
  "sourceDigest": "sha256:c9540edc3908d226375a01cf5e6bfe8ca6a4e20440f736c0dd9b40ae9ff2e645",
  "referenceSourceDigest": "sha256:4cf6057856184f16240d0d22153ec370842fc7a2dfaaa66364e189fed89e6ca3"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.3/types.json) or getType() from minerva-design/contracts.

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
