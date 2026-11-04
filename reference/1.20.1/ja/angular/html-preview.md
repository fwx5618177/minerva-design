# HtmlPreview HTML プレビュー

メールテンプレートなどの信頼できない HTML を、完全にサンドボックス化された iframe でプレビューします。マークアップは DOMPurify で無害化され（失敗時は空）、スクリプトとネットワークを遮断する CSP の下で描画されます。

Package: minerva-design@1.20.1

Renderer: angular

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.1",
  "sourceCommit": "d476a62793c47d802249dc9c5c91638ffe4210db",
  "sourceDigest": "sha256:2862a9e3a864c9423aed5d287db6fac7e8ddf58b9f5d144c61e7ff4a2630890e",
  "referenceSourceDigest": "sha256:172bbd44559732b657f1ae386911a43aedaffcdf4f5ab90b220a3f9b56302a2f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.1/types.json) or getType() from minerva-design/contracts.

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
