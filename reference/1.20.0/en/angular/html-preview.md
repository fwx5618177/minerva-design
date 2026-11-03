# HtmlPreview

Previews untrusted HTML such as email templates in a fully sandboxed iframe. The markup is sanitized with DOMPurify (fail-closed) and rendered behind a Content-Security-Policy that blocks scripts and network access.

Package: minerva-design@1.20.0

Renderer: angular

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.0",
  "sourceCommit": "09013eec9b429ff5907c596bcb5edf1281361bc0",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:b368e6fa7c621870e513621690cab70035abb6a658e8344f3df3b0cb0be55a18"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.0/types.json) or getType() from minerva-design/contracts.

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
