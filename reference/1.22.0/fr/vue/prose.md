# Prose

Typographie sans cadre et adaptée au thème pour du HTML sémantique : articles, Markdown rendu, éditeurs de texte riche. Les mêmes règles sont publiées en mixin Sass : @use "minerva-design/prose.scss" as typography; puis @include typography.prose; sur votre propre sélecteur.

Package: minerva-design@1.22.0

Renderer: vue

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.0",
  "sourceCommit": "e2a31507ecfcdb5ffcd33b05b47404c7625bb883",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:2459da5f08881aec3d2ac2d940ce35e7a61d0e0e679c0c167d8b5fdf8330a456"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## Prose

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "Prose"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "asChild",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Merges the prose class onto its single child (e.g. an editor host)\ninstead of rendering a wrapper <div>",
    "typeText": "boolean"
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "type": "any",
    "typeText": "any"
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

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/prose/vue/basic.vue

```vue
<script setup lang="ts">
import { Prose } from "minerva-design/vue";
</script>
<template>
  <Prose
    ><h2>Readable by default</h2>
    <p>Prose provides consistent rhythm for articles and documentation.</p>
    <p>
      Use <strong>emphasis</strong> and <a href="#examples">links</a> naturally.
    </p></Prose
  >
</template>

```

## Example: rich-content

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/prose/vue/rich-content.vue

```vue
<script setup lang="ts">
import { Prose } from "minerva-design/vue";
</script>
<template>
  <Prose
    ><h2>Publishing checklist</h2>
    <ul>
      <li>Review content</li>
      <li>Check keyboard navigation</li>
    </ul>
    <blockquote>Good writing starts with clarity.</blockquote>
    <pre><code>npm install minerva-design</code></pre>
    <table>
      <thead>
        <tr>
          <th>Stage</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Review</td>
          <td>Ready</td>
        </tr>
      </tbody>
    </table></Prose
  >
</template>

```

## Example: scopes

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/prose/vue/scopes.vue

```vue
<script setup lang="ts">
import { Prose, Card, CardContent } from "minerva-design/vue";
</script>
<template>
  <Card
    ><CardContent
      ><Prose
        ><h3>Scoped article</h3>
        <p>
          Only content inside this prose scope receives article typography.
        </p></Prose
      >
      <p>This paragraph follows the surrounding card style.</p></CardContent
    ></Card
  >
</template>

```
