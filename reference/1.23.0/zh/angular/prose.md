# Prose 排版

为文章、渲染后的 Markdown、富文本编辑器等语义化 HTML 提供无边框、跟随主题的排版。同样的规则以 Sass mixin 发布：@use "minerva-design/prose.scss" as typography; 然后在你自己的选择器中 @include typography.prose;。

Package: minerva-design@1.23.0

Renderer: angular

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "19d3efc34af8ba4e23df0f24d9fbb0a587e1b452",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:ec29900df0d5b5c8d741436acb4a250ec29e5f40ce1f4110def33ac2d66baaa5"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

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
