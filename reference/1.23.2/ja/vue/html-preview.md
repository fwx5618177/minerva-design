# HtmlPreview HTML プレビュー

メールテンプレートなどの信頼できない HTML を、完全にサンドボックス化された iframe でプレビューします。マークアップは DOMPurify で無害化され（失敗時は空）、スクリプトとネットワークを遮断する CSP の下で描画されます。

Package: minerva-design@1.23.2

Renderer: vue

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.2",
  "sourceCommit": "c6618fd81b2d3c2a9016cfe13a1d15983d533ff7",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:8f6e89c1e214fedc2e52de014615037c54204a8ec5c0dbb40c58dc530906571e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.2/types.json) or getType() from minerva-design/contracts.

## Documentation

## HtmlPreview

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "HtmlPreview"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "html",
    "type": "string",
    "required": true,
    "description": "Untrusted HTML to preview (sanitized with DOMPurify in the browser)",
    "typeText": "string"
  },
  {
    "name": "title",
    "type": "string",
    "required": true,
    "description": "Accessible title of the iframe",
    "typeText": "string"
  },
  {
    "name": "viewport",
    "type": "HtmlPreviewViewport",
    "default": "\"desktop\"",
    "required": false,
    "description": "Full-width desktop preview or a fixed-width mobile preview",
    "typeText": "HtmlPreviewViewport"
  },
  {
    "name": "mobileWidth",
    "type": "number",
    "default": "375",
    "required": false,
    "description": "Width of the mobile preview in pixels (invalid values fall back to 375)",
    "typeText": "number"
  },
  {
    "name": "height",
    "type": "number",
    "default": "600",
    "required": false,
    "description": "Height of the iframe in pixels (invalid values fall back to 600)",
    "typeText": "number"
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

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/html-preview/vue/basic.vue

```vue
<script setup lang="ts">
import { HtmlPreview } from "minerva-design/vue";
</script>
<template>
  <HtmlPreview
    html="<h1>Hello Minerva</h1><p>A sandboxed document preview.</p>"
    title="Welcome document"
    :height="220"
  />
</template>

```

## Example: sanitized

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/html-preview/vue/sanitized.vue

```vue
<script setup lang="ts">
import { HtmlPreview, VStack } from "minerva-design/vue";
const html =
  '<h2>Safe preview</h2><img src="x" onerror="alert(1)"><a href="javascript:alert(1)">Unsafe link</a><p>Ordinary content remains visible.</p>';
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><HtmlPreview :html="html" title="Sanitized document" :height="220" />
    <p>
      Unsafe scripts and event handlers are removed; the preview stays
      sandboxed.
    </p></VStack
  >
</template>

```

## Example: viewport

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/html-preview/vue/viewport.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { HtmlPreview, Button, VStack } from "minerva-design/vue";
const mobile = ref(true);
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><Button @click="mobile = !mobile">{{
      mobile ? "Switch to desktop" : "Switch to mobile"
    }}</Button
    ><HtmlPreview
      html="<h2>Responsive preview</h2><p>Inspect content at different viewport widths.</p>"
      title="Responsive document"
      :viewport="mobile ? 'mobile' : 'desktop'"
      :mobile-width="320"
      :height="220"
  /></VStack>
</template>

```
