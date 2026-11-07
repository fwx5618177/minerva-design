# ProgressIndicator プログレスインジケーター

進捗を示します。スピナー、サークル、ウェーブ、バー、ドットバーで描かれる不確定の progressbar、または value を指定した確定的なバー／サークルです。

Package: minerva-design@1.22.1

Renderer: vue

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.1",
  "sourceCommit": "3b95c464583d2e1bcf02999361aa6cf5481d519b",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:22ecb97acf4fac039a6d9a7e4a78b6bedc12dbbb8c1a14e3feeef3bcd47a7cef"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## ProgressIndicator

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "ProgressIndicator"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "variant",
    "type": "ProgressIndicatorVariant",
    "default": "\"spinner\"",
    "required": false,
    "description": "Indicator style",
    "typeText": "ProgressIndicatorVariant"
  },
  {
    "name": "size",
    "type": "ProgressIndicatorSize",
    "default": "\"medium\"",
    "required": false,
    "description": "Indicator size",
    "typeText": "ProgressIndicatorSize"
  },
  {
    "name": "color",
    "type": "ProgressIndicatorColor",
    "default": "\"primary\"",
    "required": false,
    "description": "Semantic color of the indicator: theme primary, neutral gray or a status\ncolor (success / warning / danger / info). \"current\" is a special value\nthat follows the surrounding text color (currentColor), e.g. inside\nbuttons or colored containers",
    "typeText": "ProgressIndicatorColor"
  },
  {
    "name": "value",
    "type": "number",
    "required": false,
    "description": "Current progress. Setting it switches the bar and circle variants to\ndeterminate mode (a filled bar / arc and aria-valuenow); the value is\nclamped between 0 and max. Other variants ignore it and stay\nindeterminate.",
    "typeText": "number"
  },
  {
    "name": "max",
    "type": "number",
    "default": "100",
    "required": false,
    "description": "Value that represents completion (determinate mode only); non-positive\nvalues fall back to 100",
    "typeText": "number"
  },
  {
    "name": "showValue",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Shows the formatted value (a percentage by default) next to a\ndeterminate indicator",
    "typeText": "boolean"
  },
  {
    "name": "format",
    "type": "((value: number, max: number) => string)",
    "required": false,
    "description": "Formats the value shown by showValue (or use the `value` slot); the\nresult is also used as aria-valuetext",
    "typeText": "((value: number, max: number) => string)"
  },
  {
    "name": "label",
    "type": "string",
    "required": false,
    "description": "Visible text shown next to the indicator (or the `label` slot); it also\nnames the progressbar unless aria-label is set",
    "typeText": "string"
  },
  {
    "name": "decorative",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Purely visual: drops the progressbar role and hides the indicator from\nassistive technologies. Use it when a surrounding element (a status\nregion, a busy button) already conveys the loading state.",
    "typeText": "boolean"
  },
  {
    "name": "width",
    "type": "string",
    "required": false,
    "description": "Custom width (ignored when full is set). Bars default to 200px; round\nindicators size to their content.",
    "typeText": "string"
  },
  {
    "name": "full",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Stretches the indicator to the full width of its container",
    "typeText": "boolean"
  }
]
```

### slots

```json
[
  {
    "name": "icon",
    "type": "any",
    "description": "Icon displayed before the indicator",
    "typeText": "any"
  },
  {
    "name": "label",
    "type": "any",
    "description": "Visible label (the `label` prop)",
    "typeText": "any"
  },
  {
    "name": "value",
    "type": "{ value: number; max: number; }",
    "description": "Custom rendering of the shown value (showValue)",
    "typeText": "{ value: number; max: number; }"
  }
]
```

## CSS variables

```json
{
  "css:ProgressIndicator": {
    "kind": "cssVars",
    "source": "react/src/components/ProgressIndicator",
    "vars": [
      {
        "name": "--progress-width",
        "description": "Width of a linear indicator with the default width"
      },
      {
        "name": "--progress-bar-height",
        "description": "Thickness of the bar (every size)"
      },
      {
        "name": "--progress-track-color",
        "description": "Color of the bar track (and of the determinate circle track)"
      },
      {
        "name": "--progress-radius",
        "description": "Corner radius of the bar track (defaults to --radius-sm)"
      },
      {
        "name": "--progress-size",
        "description": "Size of the round indicators (spinner / circle / wave; every size)"
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

### apps/docs/src/docs/pages/progress/vue/basic.vue

```vue
<script setup lang="ts">
import { ProgressIndicator, HStack } from "minerva-design/vue";
</script>
<template>
  <HStack :gap="3" wrap
    ><ProgressIndicator variant="spinner" label="Loading" /><ProgressIndicator
      variant="bar"
      label="Processing" /><ProgressIndicator variant="wave" label="Working"
  /></HStack>
</template>

```

## Example: determinate

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/progress/vue/determinate.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Button, HStack, ProgressIndicator, VStack } from "minerva-design/vue";

const lessons = ref(2);
const format = (value: number, max: number) => `${value} / ${max}`;
</script>
<template>
  <VStack :gap="4" align="stretch">
    <ProgressIndicator
      variant="bar"
      full
      :value="lessons"
      :max="5"
      show-value
      :format="format"
      label="Lessons completed"
    />
    <HStack :gap="4" wrap align="center">
      <ProgressIndicator
        variant="circle"
        size="xlarge"
        :value="(lessons / 5) * 100"
        show-value
        aria-label="Course progress"
      />
      <ProgressIndicator
        variant="bar"
        color="success"
        :value="100"
        show-value
        aria-label="Done"
      />
      <ProgressIndicator
        variant="bar"
        color="danger"
        :value="15"
        show-value
        aria-label="Overdue"
      />
    </HStack>
    <HStack :gap="2">
      <Button
        size="small"
        variant="outline"
        :disabled="lessons === 0"
        @click="lessons = Math.max(0, lessons - 1)"
        >Undo lesson</Button
      >
      <Button
        size="small"
        :disabled="lessons === 5"
        @click="lessons = Math.min(5, lessons + 1)"
        >Complete lesson</Button
      >
    </HStack>
  </VStack>
</template>

```

## Example: label-width

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/progress/vue/label-width.vue

```vue
<script setup lang="ts">
import { ProgressIndicator, VStack } from "minerva-design/vue";
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><ProgressIndicator
      variant="bar"
      width="240px"
      label="Uploading files…" /><ProgressIndicator
      variant="bar"
      full
      label="Synchronizing workspace…"
  /></VStack>
</template>

```

## Example: sizes-colors

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/progress/vue/sizes-colors.vue

```vue
<script setup lang="ts">
import { ProgressIndicator, HStack } from "minerva-design/vue";
</script>
<template>
  <HStack :gap="3" wrap
    ><ProgressIndicator
      size="small"
      color="neutral"
      label="Small" /><ProgressIndicator
      size="medium"
      color="primary"
      label="Medium" /><ProgressIndicator
      size="large"
      color="current"
      label="Large"
  /></HStack>
</template>

```
