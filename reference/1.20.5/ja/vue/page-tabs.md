# PageTabs ページタブ

開いているアプリのページを並べたバー（ルートナビゲーションであり ARIA の tablist ではありません）。ルート、クローズ、未保存の変更のガードはアプリ側が担います。項目はフラットな角丸の面で、長いタイトルは省略されツールチップで全文が表示されます。現在のページは常に表示範囲内に保たれ、リストがはみ出すとスクロールボタンが現れます。

Package: minerva-design@1.20.5

Renderer: vue

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:49d7ff5e7a649e86d07ff0f6e5da47ae57bc234041d4b820a629aeca119fd0cb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

## Documentation

## PageTab

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "PageTab"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "type": "string",
    "required": true,
    "description": "Identifier of the page (exposed as data-value)",
    "typeText": "string"
  },
  {
    "name": "label",
    "type": "string",
    "required": true,
    "description": "Title of the page; truncated with an ellipsis, shown in full in a tooltip",
    "typeText": "string"
  },
  {
    "name": "active",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Marks the item as the current page (aria-current=\"page\")",
    "typeText": "boolean"
  },
  {
    "name": "disabled",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Disables the label button (the separate action keeps its own state)",
    "typeText": "boolean"
  }
]
```

### events

```json
[
  {
    "name": "select",
    "type": "[]",
    "typeText": "[]",
    "parameters": []
  }
]
```

### slots

```json
[
  {
    "name": "icon",
    "type": "any",
    "description": "Icon displayed before the label",
    "typeText": "any"
  },
  {
    "name": "action",
    "type": "any",
    "description": "Separate control rendered next to the label (e.g. a close IconButton)",
    "typeText": "any"
  }
]
```

## PageTabs

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "PageTabs"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "activeValue",
    "type": "string",
    "required": true,
    "description": "Value of the current route's item. When it (or the set of items)\nchanges, the active item is scrolled into view",
    "typeText": "string"
  },
  {
    "name": "scrollLeftLabel",
    "type": "string",
    "required": false,
    "description": "Accessible label of the \"scroll left\" button",
    "typeText": "string"
  },
  {
    "name": "scrollRightLabel",
    "type": "string",
    "required": false,
    "description": "Accessible label of the \"scroll right\" button",
    "typeText": "string"
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "type": "any",
    "description": "PageTab items",
    "typeText": "any"
  },
  {
    "name": "actions",
    "type": "any",
    "description": "Global actions shown after the scrollable list (e.g. a page menu)",
    "typeText": "any"
  }
]
```

## CSS variables

```json
{
  "css:PageTabs": {
    "kind": "cssVars",
    "source": "react/src/components/PageTabs",
    "vars": [
      {
        "name": "--page-tabs-height",
        "description": "Height of the tab bar"
      },
      {
        "name": "--page-tabs-background",
        "description": "Background of the tab bar"
      },
      {
        "name": "--page-tabs-gap",
        "description": "Space between the tabs"
      },
      {
        "name": "--page-tabs-item-height",
        "description": "Height of a tab"
      },
      {
        "name": "--page-tabs-item-min-width",
        "description": "Minimum width of a tab"
      },
      {
        "name": "--page-tabs-item-max-width",
        "description": "Maximum width of a tab (the label truncates)"
      },
      {
        "name": "--page-tabs-item-radius",
        "description": "Corner radius of a tab (defaults to --radius-lg)"
      },
      {
        "name": "--page-tabs-selected-background",
        "description": "Background of the active tab"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: actions

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/page-tabs/vue/actions.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { PageTabs, PageTab, Button } from "minerva-design/vue";
const active = ref("overview");
const pages = ref([
  { value: "overview", label: "Overview" },
  { value: "activity", label: "Activity" },
  { value: "settings", label: "Settings" },
]);
function add() {
  const value = `page-${pages.value.length + 1}`;
  pages.value.push({ value, label: `Page ${pages.value.length + 1}` });
  active.value = value;
}
</script>
<template>
  <PageTabs :active-value="active" aria-label="Open documents"
    ><PageTab
      v-for="page in pages"
      :key="page.value"
      :value="page.value"
      :label="page.label"
      :active="active === page.value"
      @select="active = page.value"
    /><template #actions
      ><Button size="small" @click="add">New page</Button></template
    ></PageTabs
  ><output>{{ pages.length }} open pages</output>
</template>

```

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/page-tabs/vue/basic.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { PageTabs, PageTab } from "minerva-design/vue";
const active = ref("overview");
const pages = ref([
  { value: "overview", label: "Overview" },
  { value: "activity", label: "Activity" },
  { value: "settings", label: "Settings" },
]);
</script>
<template>
  <PageTabs :active-value="active" aria-label="Project pages"
    ><PageTab
      v-for="page in pages"
      :key="page.value"
      :value="page.value"
      :label="page.label"
      :active="active === page.value"
      @select="active = page.value" /></PageTabs
  ><output>Current page: {{ active }}</output>
</template>

```

## Example: overflow

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/page-tabs/vue/overflow.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { PageTabs, PageTab, Box } from "minerva-design/vue";
const active = ref("1");
</script>
<template>
  <Box max-w="560px"
    ><PageTabs :active-value="active" aria-label="Many documents"
      ><PageTab
        v-for="n in 12"
        :key="n"
        :value="String(n)"
        :label="`Document ${n}`"
        :active="active === String(n)"
        @select="active = String(n)" /></PageTabs
  ></Box>
</template>

```
