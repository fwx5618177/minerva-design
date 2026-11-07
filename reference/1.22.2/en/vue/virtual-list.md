# VirtualList

Renders long lists efficiently by only mounting the rows that are visible in the scroll container.

Package: minerva-design@1.22.2

Renderer: vue

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "93eaa8e002773e63a78341d4424f9e832b7305a9",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:10025b0c7fa1af3c2b0e9de9a1b6d51e6e81c9a41c96e7fcba66a58604dda51c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

## Documentation

## VirtualList

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "VirtualList"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "items",
    "type": "readonly T[]",
    "required": true,
    "description": "Items to render",
    "typeText": "readonly T[]"
  },
  {
    "name": "itemHeight",
    "type": "number",
    "required": false,
    "description": "Fixed row height in pixels; measured from the first item when omitted",
    "typeText": "number"
  },
  {
    "name": "itemPadding",
    "type": "number",
    "default": "8",
    "required": false,
    "description": "Padding of each row in pixels",
    "typeText": "number"
  },
  {
    "name": "overscan",
    "type": "number",
    "default": "5",
    "required": false,
    "description": "Number of rows rendered above and below the visible area",
    "typeText": "number"
  },
  {
    "name": "maxHeight",
    "type": "number",
    "required": true,
    "description": "Maximum height of the scroll container in pixels",
    "typeText": "number"
  },
  {
    "name": "renderItem",
    "type": "((item: T, index: number) => VNodeChild)",
    "required": false,
    "description": "Renders the content of one row (the default scoped slot wins when both\nare given)",
    "typeText": "((item: T, index: number) => VNodeChild)"
  },
  {
    "name": "onLoadMore",
    "type": "(() => void | Promise<void>)",
    "required": false,
    "description": "`@load-more` listener: called when scrolling near the bottom; return a\npromise that resolves once new items are loaded (no new call happens\nuntil it settles). A function prop (not an emit) so its promise is seen",
    "typeText": "(() => void | Promise<void>)"
  },
  {
    "name": "loadMoreThreshold",
    "type": "number",
    "default": "100",
    "required": false,
    "description": "Distance from the bottom (px) at which `load-more` is triggered",
    "typeText": "number"
  },
  {
    "name": "highPerformance",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Batches scroll updates with requestAnimationFrame and requestIdleCallback",
    "typeText": "boolean"
  },
  {
    "name": "loading",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Shows a loading indicator at the bottom of the list",
    "typeText": "boolean"
  },
  {
    "name": "aria-label",
    "type": "string",
    "required": false,
    "description": "Accessible name of the list",
    "typeText": "string"
  }
]
```

### events

```json
[
  {
    "name": "itemClick",
    "type": "[item: T, index: number, event: MouseEvent | KeyboardEvent]",
    "typeText": "[item: T, index: number, event: MouseEvent | KeyboardEvent]",
    "parameters": [
      {
        "name": "item",
        "position": 0,
        "typeText": "T",
        "required": true,
        "rest": false
      },
      {
        "name": "index",
        "position": 1,
        "typeText": "number",
        "required": true,
        "rest": false
      },
      {
        "name": "event",
        "position": 2,
        "typeText": "MouseEvent | KeyboardEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "type": "{ item: T; index: number; }",
    "description": "Content of one row (wins over `renderItem`)",
    "typeText": "{ item: T; index: number; }"
  }
]
```

## CSS variables

```json
{
  "css:VirtualList": {
    "kind": "cssVars",
    "source": "react/src/components/VirtualList",
    "vars": [
      {
        "name": "--virtual-list-radius",
        "description": "Corner radius (defaults to --radius-sm)"
      },
      {
        "name": "--virtual-list-shadow",
        "description": "Shadow at rest (defaults to --shadow-sm)"
      },
      {
        "name": "--virtual-list-hover-shadow",
        "description": "Shadow while hovered (defaults to --shadow-md)"
      },
      {
        "name": "--virtual-list-scrollbar-size",
        "description": "Width of the scrollbar (WebKit / Blink)"
      },
      {
        "name": "--virtual-list-loading-padding",
        "description": "Padding of the loading indicator row"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: auto-height

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/virtual-list/vue/auto-height.vue

```vue
<script setup lang="ts">
import { VirtualList } from "minerva-design/vue";
const items = Array.from({ length: 1000 }, (_, i) => ({
  id: i,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
}));
</script>
<template>
  <VirtualList
    :items="items"
    :max-height="300"
    :item-padding="12"
    aria-label="Automatically measured users"
    ><template #default="{ item }"
      ><div>
        <strong>{{ item.name }}</strong>
        <div style="font-size: 12px; opacity: 0.7">{{ item.email }}</div>
      </div></template
    ></VirtualList
  >
</template>

```

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/virtual-list/vue/basic.vue

```vue
<script setup lang="ts">
import { VirtualList } from "minerva-design/vue";
const items = Array.from({ length: 1000 }, (_, index) => ({
  id: index + 1,
  label: `Record ${index + 1}`,
}));
</script>
<template>
  <VirtualList
    :items="items"
    :item-height="40"
    :max-height="240"
    aria-label="Records"
    ><template #default="{ item, index }"
      >{{ index + 1 }}. {{ item.label }}</template
    ></VirtualList
  >
</template>

```

## Example: clickable-rows

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/virtual-list/vue/clickable-rows.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { VirtualList, Button, VStack } from "minerva-design/vue";
const items = Array.from({ length: 1000 }, (_, index) => ({
  id: index + 1,
  label: `Record ${index + 1}`,
}));
const selected = ref("");
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><VirtualList
      :items="items"
      :item-height="48"
      :max-height="240"
      aria-label="Selectable records"
      ><template #default="{ item }"
        ><Button variant="ghost" @click="selected = item.label">{{
          item.label
        }}</Button></template
      ></VirtualList
    ><output>{{ selected || "Select a record" }}</output></VStack
  >
</template>

```

## Example: high-performance

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/virtual-list/vue/high-performance.vue

```vue
<script setup lang="ts">
import { VirtualList } from "minerva-design/vue";
const items = Array.from({ length: 100000 }, (_, i) => ({
  id: i,
  title: `Item ${i + 1}`,
  value: (i * 37) % 1000,
}));
</script>
<template>
  <div>
    <p>100,000 records with a small rendered viewport.</p>
    <VirtualList
      :items="items"
      :item-height="36"
      :max-height="300"
      :overscan="10"
      high-performance
      aria-label="High performance records"
      ><template #default="{ item, index }"
        ><div style="display: flex; justify-content: space-between">
          <span>#{{ index + 1 }} {{ item.title }}</span
          ><code>{{ item.value }}</code>
        </div></template
      ></VirtualList
    >
  </div>
</template>

```

## Example: infinite-scroll

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/virtual-list/vue/infinite-scroll.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { VirtualList, VStack } from "minerva-design/vue";
const items = ref(
  Array.from({ length: 30 }, (_, index) => ({
    id: index + 1,
    label: `Record ${index + 1}`,
  })),
);
const loading = ref(false);
async function load() {
  if (loading.value || items.value.length >= 150) return;
  loading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 500));
  const start = items.value.length;
  items.value.push(
    ...Array.from({ length: 30 }, (_, index) => ({
      id: start + index + 1,
      label: `Record ${start + index + 1}`,
    })),
  );
  loading.value = false;
}
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><VirtualList
      :items="items"
      :item-height="40"
      :max-height="240"
      :loading="loading"
      :on-load-more="load"
      aria-label="Infinite records"
      ><template #default="{ item }">{{ item.label }}</template></VirtualList
    ><output>{{ items.length }} records loaded</output></VStack
  >
</template>

```
