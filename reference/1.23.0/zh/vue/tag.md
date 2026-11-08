# Tag 标签

用于标记和分类内容的小标签，可关闭或可点击。

Package: minerva-design@1.23.0

Renderer: vue

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "413e3d54e2177f8469c443a6547c4472e608839c",
  "sourceDigest": "sha256:8c8e874e213d698b4d05cabed92eed392c90c5b0fa91c66def67eab19184e86c",
  "referenceSourceDigest": "sha256:e694adbf6015cdc21809df819193e0a84c030845fb2910749dbd1c4c15ccca99"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

### 无障碍

设置 clickable 后，标签具有 role="button" 和 tabIndex=0，Enter 或空格键会像鼠标点击一样触发 onClick。请用于操作或切换，而非页面跳转（跳转请使用链接）。

关闭按钮是原生 ，可单独聚焦。其无障碍名称默认为“Close”，请设置 closeLabel（如“Remove React”），让读屏用户知道移除的是哪个标签。

禁用的可点击标签保留 role="button" 并带有 aria-disabled="true"，Tab 键会跳过它。若选中状态很重要，请同时通过文字或 aria 属性表达，而不要只依赖颜色。

## Tag

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "Tag"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "color",
    "type": "ColorScheme",
    "default": "\"neutral\"",
    "required": false,
    "description": "Semantic color of the tag",
    "typeText": "ColorScheme"
  },
  {
    "name": "variant",
    "type": "\"subtle\" | \"outline\" | \"solid\"",
    "default": "\"subtle\"",
    "required": false,
    "description": "Visual style: `subtle` (tinted background), `outline` (tinted background\nwith a border) or `solid` (filled with the color, inverse text)",
    "typeText": "\"subtle\" | \"outline\" | \"solid\""
  },
  {
    "name": "size",
    "type": "TagSize",
    "default": "\"medium\"",
    "required": false,
    "description": "Tag size",
    "typeText": "TagSize"
  },
  {
    "name": "shape",
    "type": "TagShape",
    "default": "\"rounded\"",
    "required": false,
    "description": "Tag shape",
    "typeText": "TagShape"
  },
  {
    "name": "closable",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Shows a close button",
    "typeText": "boolean"
  },
  {
    "name": "clickable",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Renders the tag content as a native button (focusable, activated with\nEnter / Space). With closable, the close button is a sibling button",
    "typeText": "boolean"
  },
  {
    "name": "pressed",
    "type": "boolean",
    "required": false,
    "description": "Pressed (selected) state of a toggle tag, e.g. a selectable filter\n(requires clickable); sets aria-pressed and the selected style",
    "typeText": "boolean"
  },
  {
    "name": "loading",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Shows a spinner instead of the icon / avatar, marks the tag busy and\nblocks its action; the close button is hidden",
    "typeText": "boolean"
  },
  {
    "name": "elevation",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Shows a shadow",
    "typeText": "boolean"
  },
  {
    "name": "disabled",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Disables the tag and its close button",
    "typeText": "boolean"
  },
  {
    "name": "closeLabel",
    "type": "string | ((label: string) => string)",
    "required": false,
    "description": "Accessible label of the close button: a string, or a function of the\ntag's text label (the text of its children)",
    "typeText": "string | ((label: string) => string)"
  },
  {
    "name": "ripple",
    "type": "boolean",
    "default": "true",
    "required": false,
    "description": "Shows a ripple effect when a clickable tag is activated",
    "typeText": "boolean"
  }
]
```

### events

```json
[
  {
    "name": "close",
    "type": "[event: MouseEvent]",
    "typeText": "[event: MouseEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "MouseEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "click",
    "type": "[event: MouseEvent]",
    "typeText": "[event: MouseEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "MouseEvent",
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
    "type": "any",
    "description": "Content of the tag",
    "typeText": "any"
  },
  {
    "name": "icon",
    "type": "any",
    "description": "Icon displayed before the content",
    "typeText": "any"
  },
  {
    "name": "avatar",
    "type": "any",
    "description": "Avatar (e.g. a small Avatar or image) displayed before the content",
    "typeText": "any"
  },
  {
    "name": "close-icon",
    "type": "any",
    "description": "Custom close icon",
    "typeText": "any"
  }
]
```

## CSS variables

```json
{
  "css:Tag": {
    "kind": "cssVars",
    "source": "react/src/components/Tag",
    "vars": [
      {
        "name": "--tag-height",
        "description": "Minimum height (every size; default: the content height)"
      },
      {
        "name": "--tag-padding-x",
        "description": "Horizontal padding (every size)"
      },
      {
        "name": "--tag-font-size",
        "description": "Font size (every size)"
      },
      {
        "name": "--tag-radius",
        "description": "Corner radius of the rounded shape (defaults to --radius-sm)"
      },
      {
        "name": "--tag-gap",
        "description": "Space between the icon, the label and the close button"
      },
      {
        "name": "--tag-ring-color",
        "description": "Color of the hairline ring of the tinted (default) variant (defaults to the text color at 16%)"
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

### apps/docs/src/docs/pages/tag/vue/basic.vue

```vue
<script setup lang="ts">
import { Tag, HStack } from "minerva-design/vue";
</script>
<template>
  <HStack :gap="3" wrap
    ><Tag>Design</Tag><Tag color="success">Published</Tag
    ><Tag color="warning">Draft</Tag></HStack
  >
</template>

```

## Example: closable

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/tag/vue/closable.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Tag, Button, HStack } from "minerva-design/vue";
const initialTags = ["Tag 1", "Tag 2", "Tag 3"];
const tags = ref([...initialTags]);
const opened = ref("");
</script>
<template>
  <HStack :gap="2" wrap
    ><Tag
      v-for="(tag, index) in tags"
      :key="tag"
      closable
      :close-label="(label) => `Remove ${label}`"
      :clickable="index === 0"
      @close="tags = tags.filter((t) => t !== tag)"
      @click="opened = tag"
      >{{ tag }}<template v-if="index === 2" #close-icon>⊗</template></Tag
    ><span v-if="opened">Opened: {{ opened }}</span
    ><Button v-if="!tags.length" @click="tags = [...initialTags]"
      >Reset</Button
    ></HStack
  >
</template>

```

## Example: toggle

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/tag/vue/toggle.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Tag, HStack } from "minerva-design/vue";
const tags = ["All", "Design", "Engineering"];
const selected = ref("All");
</script>
<template>
  <HStack :gap="3" wrap
    ><Tag
      v-for="tag in tags"
      :key="tag"
      clickable
      :pressed="selected === tag"
      @click="selected = tag"
      >{{ tag }}</Tag
    ><output>Filter: {{ selected }}</output></HStack
  >
</template>

```

## Example: variants-sizes

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/tag/vue/variants-sizes.vue

```vue
<script setup lang="ts">
import { Tag, HStack } from "minerva-design/vue";
</script>
<template>
  <HStack :gap="3" wrap
    ><Tag size="small" variant="outline" shape="square">Small</Tag
    ><Tag color="primary" variant="solid">Solid</Tag
    ><Tag size="large" shape="circle" color="info">Large</Tag
    ><Tag loading>Working</Tag></HStack
  >
</template>

```
