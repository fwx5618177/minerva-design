# SplitLayout

Contenu principal avec un panneau latéral facultatif placé à côté dès que la largeur de la mise en page atteint un seuil.

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
