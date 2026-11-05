# IconCanvas 图标画布

在一块画布上绘制大量图标，由 WebGPU、WebGL2 或 WebGL 通过少量实例化绘制调用完成，或由 Canvas2D 绘制：适用于密集图形、地图、粒子以及包含成千上万个图标的动画。

Package: minerva-design@1.21.1

Renderer: vue

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "fce5fba2180337e022f161113a8d4d5b12c50b7e",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:dd651b3ac3d2ec89388783f5919aefe9a683490b2f63c8d9a9142991a95a6b4c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

## Documentation

### 绘制原理

IconCanvas 以 CSS 像素为单位，按位置、尺寸、旋转、颜色和不透明度摆放图标，并用可用的最佳后端（WebGPU -> WebGL2 -> WebGL -> Canvas2D）将它们全部绘制在一块画布上。

几何：每个图标以四分之一设备像素的精度展平，其描边被转换为三角形（每段一个四边形，连接处和线帽使用圆形扇面），每种图标、描边宽度和细节级别只处理一次。

批处理：所有网格存放在同一个顶点缓冲区中，每个图标都是一个实例（位置、尺寸、旋转、颜色）；连续的相同图标合并为一次实例化绘制调用。

质量：4× MSAA 平滑边缘，逐图标的深度测试让图标的每个像素只绘制一次，因此半透明图标的混合效果与 SVG 描边完全一致。

健壮性：auto 会跳过软件 GPU，GPU 上下文丢失时会重启后端（丢失两次的后端会被跳过），画布根元素通过 data-renderer 报告当前后端。

界面中的图标请使用 Icon：SVG 更轻量、可访问，并支持服务端渲染。当图标本身就是画面时，再使用 IconCanvas。

图标数量

暂停

播放

已暂停

每秒 {{fps}} 帧

由 {{backend}} 绘制

正在启动渲染器…

{{n}} 个动画图标

由 {{backend}} 绘制的 40 个图标

由 {{backend}} 绘制

已回退到 {{backend}}

## IconCanvas

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue/icons",
  "exports": [
    "IconCanvas"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "renderer",
    "type": "IconRendererPreference",
    "default": "\"auto\"",
    "required": false,
    "description": "Backend preference; `auto` follows the global default",
    "typeText": "IconRendererPreference"
  },
  {
    "name": "width",
    "type": "string | number",
    "default": "\"100%\"",
    "required": false,
    "description": "Width (a number is in pixels)",
    "typeText": "string | number"
  },
  {
    "name": "height",
    "type": "string | number",
    "default": "240",
    "required": false,
    "description": "Height (a number is in pixels)",
    "typeText": "string | number"
  },
  {
    "name": "title",
    "type": "string",
    "required": false,
    "description": "Accessible name of the whole picture (`role=\"img\"`); without it the canvas is hidden from assistive technologies",
    "typeText": "string"
  },
  {
    "name": "items",
    "type": "readonly IconCanvasItem[]",
    "required": true,
    "description": "Icons to draw, in painting order (later ones on top), positions in CSS pixels",
    "typeText": "readonly IconCanvasItem[]"
  },
  {
    "name": "pixelRatio",
    "type": "number",
    "required": false,
    "description": "Device pixel ratio (`window.devicePixelRatio` by default)",
    "typeText": "number"
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

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/icon-canvas/vue/basic.vue

```vue
<script setup lang="ts">
// One canvas, one GPU draw per run of identical icons; positions in CSS px.
// The backend follows the global default (setDefaultIconRenderer).
import { ref } from "vue";
import { VStack } from "minerva-design/vue";
import {
  IconCanvas,
  bellIcon,
  homeIcon,
  mailIcon,
  searchIcon,
  settingsIcon,
  userIcon,
  type IconCanvasItem,
  type IconRendererKind,
} from "minerva-design/vue/icons";

const ICONS = [
  homeIcon,
  searchIcon,
  mailIcon,
  bellIcon,
  userIcon,
  settingsIcon,
];
const items: IconCanvasItem[] = [
  ...ICONS.map((icon, i) => ({ icon, x: 16 + i * 48, y: 16 })),
  ...ICONS.map((icon, i) => ({
    icon,
    x: 16 + i * 48,
    y: 64,
    size: 32,
    color: "var(--primary-color)",
    rotation: i * 15,
  })),
  ...ICONS.map((icon, i) => ({
    icon,
    x: 16 + i * 48,
    y: 112,
    strokeWidth: 1.5,
    opacity: 0.35 + i * 0.13,
  })),
];
const drawn = ref<IconRendererKind | null>(null);
</script>

<template>
  <VStack :gap="2">
    <IconCanvas
      :items="items"
      :height="160"
      title="Six icons, three ways"
      @renderer-change="(kind: IconRendererKind) => (drawn = kind)"
    />
    <small role="status">{{ drawn ? `Drawn with ${drawn}` : "…" }}</small>
  </VStack>
</template>

```
