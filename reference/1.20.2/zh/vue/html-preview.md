# HtmlPreview HTML 预览

在完全沙箱化的 iframe 中预览不可信 HTML（如邮件模板）。标记经 DOMPurify 消毒（失败即清空），并在禁止脚本与网络访问的内容安全策略下渲染。

Package: minerva-design@1.20.2

Renderer: vue

Locale: zh

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
