# HtmlPreview

Prévisualise du HTML non fiable, comme des modèles d'e-mail, dans une iframe entièrement isolée. Le balisage est assaini avec DOMPurify (échec sûr) et rendu derrière une Content-Security-Policy qui bloque les scripts et le réseau.

Package: minerva-design@1.20.3

Renderer: angular

Locale: fr

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

## HtmlPreview

Support: beta

Native Angular: MnHtmlPreview. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnHtmlPreview"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "html",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/data/index.ts"
  },
  {
    "name": "title",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/data/index.ts"
  },
  {
    "name": "viewport",
    "typeText": "\"desktop\" | \"mobile\"",
    "required": false,
    "source": "packages/angular/src/components/data/index.ts"
  },
  {
    "name": "mobileWidth",
    "typeText": "number",
    "required": false,
    "source": "packages/angular/src/components/data/index.ts"
  },
  {
    "name": "height",
    "typeText": "number",
    "required": false,
    "source": "packages/angular/src/components/data/index.ts"
  }
]
```

## CSS variables

```json
{
  "css:HtmlPreview": {
    "kind": "cssVars",
    "source": "react/src/components/HtmlPreview",
    "vars": [
      {
        "name": "--html-preview-bg",
        "description": "Background color around the frame"
      },
      {
        "name": "--html-preview-frame-bg",
        "description": "Background color of the frame"
      },
      {
        "name": "--html-preview-frame-border-color",
        "description": "Border color of the frame"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Sandboxed document

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnHtmlPreview } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnHtmlPreview],
  template: `
<mn-html-preview title="Email preview" [html]="html" [height]="200"/>
  `,
})
export class Example {
  html = "<h1>Welcome to Minerva</h1><p>Your workspace is ready.</p>";
}

```

## Example: Mobile viewport

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnHtmlPreview } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnHtmlPreview],
  template: `
<mn-html-preview title="Mobile preview" viewport="mobile" [mobileWidth]="280" [height]="200" [html]="html"/>
  `,
})
export class Example {
  html = "<h2>Monthly update</h2><p>A bounded preview of a mobile email.</p>";
}

```
