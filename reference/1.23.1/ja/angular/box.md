# Box ボックス

スペーシング・サイズ・背景・角丸・影のショートハンドを備えたポリモーフィックなコンテナ。

Package: minerva-design@1.23.1

Renderer: angular

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "a59b0af81a2f5c6e7f2de29a81878dc4a5af01f1",
  "sourceDigest": "sha256:5b7fa63ef8772ff533e1fc34d0784bfe651eb0b1be71712d0bbef057eec2b4cf",
  "referenceSourceDigest": "sha256:1019806d6e262e50fb4e804e528badf35a408ce0a47ef203c2c5d8930c0fb0f1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## Box

Support: beta

Native Angular: MnBox. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnBox"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "p",
    "typeText": "string | number | undefined",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "px",
    "typeText": "string | number | undefined",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "py",
    "typeText": "string | number | undefined",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "m",
    "typeText": "string | number | undefined",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "w",
    "typeText": "string | number | undefined",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "h",
    "typeText": "string | number | undefined",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "minW",
    "typeText": "string | number | undefined",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "maxW",
    "typeText": "string | number | undefined",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "bg",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "rounded",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "boxShadow",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "border",
    "typeText": "string | undefined",
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

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Spacing and surfaces

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnBox } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnBox],
  template: `
<section mnBox p="6" bg="var(--surface-subtle-color)" rounded="12px">A padded section using theme tokens.</section>
  `,
})
export class Example {

}

```

## Example: Bounded content

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnBox } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnBox],
  template: `
<div mnBox p="4" maxW="320px" border="1px solid var(--border-color)">This container stays within a readable width.</div>
  `,
})
export class Example {

}

```
