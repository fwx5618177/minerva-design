# Icon 图标组件

图标集中的单个图标：默认为内联 SVG，也可以是由 WebGPU、WebGL2、WebGL 或 Canvas2D 绘制的画布。包括具名组件（SearchIcon…）、通用的 Icon、自定义图标以及按名称选择的图标。

Package: minerva-design@1.20.4

Renderer: vue

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "5826c364a762ec5a1144b8eea89e5d7510e4099c",
  "sourceDigest": "sha256:38cfefdcb173c9a307526b9364c7a77acc74f713924006e65d94c6f3c5e94c61",
  "referenceSourceDigest": "sha256:8bb3a20ee069c63b8d85e6ccf29336af81fffa488ce873d14ee032291c18009f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

## Documentation

### SVG 还是画布

默认情况下，图标是一个内联 ：它可在服务端渲染，通过 currentColor 跟随文字颜色，设置 size="1em" 时跟随字号；除非设置了 title 或 aria-label，否则对辅助技术隐藏。

将 renderer 设为 "auto"、"webgpu"、"webgl2"、"webgl" 或 "canvas2d" 时，同一个图标会绘制在画布上。浏览器将同时存活的 WebGL 上下文限制在 16 个左右，因此同一页面的画布图标共享一个后端：发生变化的图标被打包进一张图集，一次绘制完成后再复制到各自的画布。"auto" 跟随全局默认值（setDefaultIconRenderer），在本页即渲染器栏。

只打包你导入的内容：SearchIcon 只带上自己的路径数据，画布渲染器随第一个画布图标加载，而 DynamicIcon（名称在运行时决定）是唯一会打包整套图标的组件。

### React Native 与小程序

minerva-design/native/icons 为 React Native 提供同一套组件（Icon、createIcon、DynamicIcon、SearchIcon…），使用 react-native-svg 绘制相同的 24×24 路径数据。react-native-svg 是可选的 peer 依赖，只有这个入口需要它（minerva-design/native 从不导入它）：在 Expo 中用 npx expo install react-native-svg 安装，其他项目用 npm install react-native-svg。图标默认使用主题的文字颜色描边（可用 color 覆盖），size 的单位是 dp，设置 title 后图标成为可访问的图片。

minerva-design/taro/icons 为 Taro 提供这些组件。小程序无法渲染内联 SVG，微信的  也不接受百分号编码的 SVG，因此每个图标都是一个 Image，其 src 为 base64 编码的 SVG data URI（toSvgBase64DataUri，不依赖 btoa）。图片没有 currentColor：颜色直接写入 SVG，默认是当前浅色或深色模式下主题的文字颜色，颜色或模式变化时会重新生成图片。size 的单位是 px，也可以是任意 CSS 长度，例如 "48rpx"。

小程序的 tabBar 只接受 PNG 或 JPG 文件：请在构建时用你选择的 SVG 光栅化工具，从 toSvg 的输出生成这些文件（每个图标、颜色和状态各一个）。Minerva 不内置光栅化工具。

启动中…

```tsx
// npx expo install react-native-svg (optional peer dependency of this entry)
import { DynamicIcon, Icon, SearchIcon, searchIcon } from "minerva-design/native/icons";

<SearchIcon />                                          // 24dp, theme text color
<SearchIcon size={20} color="#2563eb" title="Search" /> // accessible image
<Icon icon={searchIcon} strokeWidth={1.5} absoluteStrokeWidth />
<DynamicIcon name={item.icon} />                        // bundles the whole set
```

```tsx
import { Icon, SearchIcon, settingsIcon } from "minerva-design/taro/icons";

<SearchIcon />                                          // 24px base64 SVG image
<SearchIcon size="48rpx" color="#2563eb" title="Search" />
<Icon icon={settingsIcon} strokeWidth={1.5} />          // theme text color, per mode
```

```ts
// build-time Node script: the tabBar only takes PNG / JPG files
import { writeFileSync } from "node:fs";
import { homeIcon, toSvg } from "minerva-design/icons/core";

for (const [state, color] of [["normal", "#6b7280"], ["active", "#2563eb"]]) {
  const svg = toSvg(homeIcon, { size: 81, color });
  // rasterize: the SVG -> PNG converter of your choice
  writeFileSync(`src/assets/tab-home-${state}.png`, await rasterize(svg));
}
```

## Icon

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue/icons",
  "exports": [
    "Icon"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "color",
    "type": "string",
    "default": "\"currentColor\"",
    "required": false,
    "description": "Stroke color, any CSS color",
    "typeText": "string"
  },
  {
    "name": "size",
    "type": "string | number",
    "default": "24",
    "required": false,
    "description": "Width and height (a number is in pixels; canvas renderers also follow CSS sizes such as `\"1em\"`)",
    "typeText": "string | number"
  },
  {
    "name": "renderer",
    "type": "IconRenderer",
    "default": "\"svg\"",
    "required": false,
    "description": "Inline SVG (default), or a `<canvas>` drawn by a backend shared by every\ncanvas icon of the page: `auto` (the global default, see\n`setDefaultIconRenderer`), `webgpu`, `webgl2`, `webgl` or `canvas2d`",
    "typeText": "IconRenderer"
  },
  {
    "name": "strokeWidth",
    "type": "number",
    "default": "2",
    "required": false,
    "description": "Stroke width on the 24×24 grid (scales with the size)",
    "typeText": "number"
  },
  {
    "name": "absoluteStrokeWidth",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Keeps `strokeWidth` in pixels whatever the size",
    "typeText": "boolean"
  },
  {
    "name": "title",
    "type": "string",
    "required": false,
    "description": "Accessible name: the icon becomes `role=\"img\"`; without it (or an `aria-label`) the icon is hidden from assistive technologies",
    "typeText": "string"
  },
  {
    "name": "icon",
    "type": "IconDefinition",
    "required": true,
    "description": "The icon to draw: a built-in one (e.g. `searchIcon`) or a `defineIcon` result",
    "typeText": "IconDefinition"
  }
]
```

### events

```json
[
  {
    "name": "rendererChange",
    "type": "[kind: IconRendererKind]",
    "typeText": "[kind: IconRendererKind]",
    "parameters": [
      {
        "name": "kind",
        "position": 0,
        "typeText": "IconRendererKind",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/icon/vue/basic.vue

```vue
<script setup lang="ts">
import { Button, HStack } from "minerva-design/vue";
import {
  DownloadIcon,
  HomeIcon,
  SearchIcon,
  SettingsIcon,
  TrashIcon,
} from "minerva-design/vue/icons";
</script>

<template>
  <HStack :gap="4" align="center" wrap>
    <HomeIcon />
    <SearchIcon />
    <SettingsIcon />
    <Button>
      <template #start-icon><DownloadIcon :size="16" /></template>
      Download
    </Button>
    <Button color="danger" variant="outline">
      <template #start-icon><TrashIcon :size="16" /></template>
      Delete
    </Button>
  </HStack>
</template>

```

## Example: canvas

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/icon/vue/canvas.vue

```vue
<script setup lang="ts">
// "auto" follows the global default (setDefaultIconRenderer); a forced
// backend that cannot start here falls back to the next one.
import { reactive } from "vue";
import { HStack, VStack } from "minerva-design/vue";
import {
  Icon,
  settingsIcon,
  type IconRenderer,
  type IconRendererKind,
} from "minerva-design/vue/icons";

const RENDERERS: IconRenderer[] = [
  "svg",
  "auto",
  "webgpu",
  "webgl2",
  "webgl",
  "canvas2d",
];
const drawn = reactive<Partial<Record<IconRenderer, IconRendererKind>>>({});
</script>

<template>
  <HStack :gap="5" wrap>
    <VStack
      v-for="renderer in RENDERERS"
      :key="renderer"
      :gap="1"
      align="center"
    >
      <Icon
        :icon="settingsIcon"
        :size="40"
        color="var(--primary-color)"
        :renderer="renderer"
        @renderer-change="(kind: IconRendererKind) => (drawn[renderer] = kind)"
      />
      <code>{{ renderer }}</code>
      <small>{{ renderer === "svg" ? "SVG" : (drawn[renderer] ?? "…") }}</small>
    </VStack>
  </HStack>
</template>

```
