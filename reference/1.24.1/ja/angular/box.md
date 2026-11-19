# Box ボックス

スペーシング・サイズ・背景・角丸・影のショートハンドを備えたポリモーフィックなコンテナ。

Package: minerva-design@1.24.1

Renderer: angular

Locale: ja

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
