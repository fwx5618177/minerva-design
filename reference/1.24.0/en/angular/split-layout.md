# SplitLayout

Main content with an optional aside that splits beside it once the layout's own width reaches a breakpoint.

Package: minerva-design@1.24.0

Renderer: angular

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.24.0",
  "sourceCommit": "1ec7f8c462afcd58cce98803534b965221e88a0b",
  "sourceDigest": "sha256:b7c3468445a6a9337f252a14f73347509078e26d4ed34efcf08034d5d4d49c91",
  "referenceSourceDigest": "sha256:8a812cab75521530ab1b07dd5007874119a188b16270406440b165747fa6efc7"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.24.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## SplitLayout

Support: beta

Native Angular: MnSplitLayout. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnSplitLayout"
  ],
  "kind": "named"
}
```

### slots

```json
[
  {
    "name": "default"
  },
  {
    "name": "[mnAside]"
  }
]
```

## CSS variables

```json
{
  "css:SplitLayout": {
    "kind": "cssVars",
    "source": "react/src/components/SplitLayout",
    "vars": [
      {
        "name": "--split-layout-align-items",
        "description": "Vertical alignment of the main and aside columns (default: start)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Content and aside

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnSplitLayout } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnSplitLayout],
  template: `
<mn-split-layout><article><h3>Main content</h3><p>The primary reading area grows with its container.</p></article><aside mnAside>Related details and navigation.</aside></mn-split-layout>
  `,
})
export class Example {

}

```

## Example: Operational sidebar

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnSplitLayout, MnCard } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnSplitLayout, MnCard],
  template: `
<mn-split-layout><mn-card>Project overview</mn-card><mn-card mnAside variant="filled">Status: Active</mn-card></mn-split-layout>
  `,
})
export class Example {

}

```
