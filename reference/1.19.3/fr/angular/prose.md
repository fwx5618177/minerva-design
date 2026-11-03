# Prose

Typographie sans cadre et adaptée au thème pour du HTML sémantique : articles, Markdown rendu, éditeurs de texte riche. Les mêmes règles sont publiées en mixin Sass : @use "minerva-design/prose.scss" as typography; puis @include typography.prose; sur votre propre sélecteur.

Package: minerva-design@1.19.3

Renderer: angular

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "1b65455cccbdd71bb609d7d859b1ef90f9e604c6",
  "sourceDigest": "sha256:a8b34eea01e9133306bb1fde48e7966deaaaa35d87c2dfd2e181d891c65e01c1",
  "referenceSourceDigest": "sha256:d3ed05a4228bc39ff766871c13b5ba292792f934f6ebc3d0d29af28589be129c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## Prose

Support: beta

Native Angular: MnProse. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnProse"
  ],
  "kind": "named"
}
```

### slots

```json
[
  {
    "name": "default"
  }
]
```

## CSS variables

```json
{
  "css:Prose": {
    "kind": "cssVars",
    "source": "react/src/components/Prose",
    "vars": [
      {
        "name": "--prose-font-size",
        "description": "Base font size of the body text"
      },
      {
        "name": "--prose-border-color",
        "description": "Color of the blockquote, table, code block and rule borders"
      },
      {
        "name": "--prose-code-bg",
        "description": "Background color of inline code and table headers"
      },
      {
        "name": "--prose-pre-bg",
        "description": "Background color of code blocks"
      },
      {
        "name": "--prose-radius",
        "description": "Corner radius of code blocks (defaults to --radius-sm)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Semantic typography

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnProse } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnProse],
  template: `
<article mnProse><h2>A readable article</h2><p>Use semantic HTML for content that follows your theme.</p><ul><li>Clear headings</li><li>Comfortable spacing</li></ul><blockquote>Good interfaces make information easy to understand.</blockquote></article>
  `,
})
export class Example {

}

```

## Example: Code and tables

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnProse } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnProse],
  template: `
<article mnProse><h3>Configuration</h3><p>Set <code>theme="dark"</code> on your provider.</p><table><thead><tr><th>Option</th><th>Value</th></tr></thead><tbody><tr><td>Locale</td><td>English</td></tr></tbody></table></article>
  `,
})
export class Example {

}

```
