# SplitLayout

Contenu principal avec un panneau latéral facultatif placé à côté dès que la largeur de la mise en page atteint un seuil.

Package: minerva-design@1.20.6

Renderer: angular

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.6",
  "sourceCommit": "63ce45656d8f3d1bfbee71026e84674640ae9abf",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:fa9a782f68a5d5b512762e2152b2ad065da3de6937bac96eef63709ddba3b95b"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.6/types.json) or getType() from minerva-design/contracts.

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
