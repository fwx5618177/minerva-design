# IconCanvas 图标画布

在一块画布上绘制大量图标，由 WebGPU、WebGL2 或 WebGL 通过少量实例化绘制调用完成，或由 Canvas2D 绘制：适用于密集图形、地图、粒子以及包含成千上万个图标的动画。

Package: minerva-design@1.20.4

Renderer: wc

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

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/icon-canvas",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "renderer",
    "typeText": "\"auto\" | \"webgpu\" | \"webgl2\" | \"webgl\" | \"canvas2d\"",
    "attribute": "renderer",
    "required": false
  },
  {
    "name": "width",
    "typeText": "number | string",
    "attribute": "width",
    "required": false
  },
  {
    "name": "height",
    "typeText": "number | string",
    "attribute": "height",
    "required": false
  },
  {
    "name": "pixelRatio",
    "typeText": "number | undefined",
    "attribute": "pixel-ratio",
    "required": false
  },
  {
    "name": "label",
    "typeText": "string | undefined",
    "attribute": "label",
    "required": false
  },
  {
    "name": "items",
    "typeText": "readonly IconCanvasItem[]",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-renderer-change",
    "typeText": "CustomEvent",
    "description": "The backend started (or fell back after a GPU loss); detail: { renderer }"
  }
]
```

## API

```json
{
  "wc:minerva-icon-canvas": {
    "kind": "element",
    "source": "web-components/src/components/icon/icon-canvas.ts",
    "className": "MinervaIconCanvas",
    "summary": "Thousands of icons on one GPU canvas.",
    "description": "Many icons of minerva-design/icons on one canvas (the `<IconCanvas>` of React): one instanced GPU draw per run of identical icons (WebGPU, WebGL2, WebGL) or Canvas2D, for dense pictures, maps, particles or animations of thousands of icons; for icons in the UI use `<minerva-icon>`. Set the icons (`IconCanvasItem`: `icon`, `x`, `y`, `size`, `color`, `rotation`, `opacity`...) as the `items` property; replace the array to redraw. The canvas fills a box of `width` × `height` (100% × 240 pixels by default; a number is in pixels, any CSS size works) and follows its size. With `renderer` `auto` it follows the page default (`setDefaultIconRenderer`) live. The host gets `data-renderer` with the backend drawing. Published as the optional entry `minerva-design/web-components/icon`.",
    "properties": [
      {
        "name": "renderer",
        "attribute": "renderer",
        "type": "\"auto\" | \"webgpu\" | \"webgl2\" | \"webgl\" | \"canvas2d\"",
        "default": "\"auto\"",
        "description": "Backend preference (`auto` follows the page default)"
      },
      {
        "name": "width",
        "attribute": "width",
        "type": "number | string",
        "default": "\"100%\"",
        "description": "Width of the canvas box: a number is in pixels, or any CSS size"
      },
      {
        "name": "height",
        "attribute": "height",
        "type": "number | string",
        "default": "240",
        "description": "Height of the canvas box: a number is in pixels, or any CSS size"
      },
      {
        "name": "pixelRatio",
        "attribute": "pixel-ratio",
        "type": "number | undefined",
        "description": "Device pixel ratio of the canvas; by default the screen's"
      },
      {
        "name": "label",
        "attribute": "label",
        "type": "string | undefined",
        "description": "Accessible name of the picture (role=img); without it the canvas is hidden from assistive technologies"
      },
      {
        "name": "items",
        "type": "readonly IconCanvasItem[]",
        "default": "[]",
        "description": "Icons to draw, in painting order (later ones on top); replace the array to redraw; property only"
      },
      {
        "name": "canvas",
        "type": "HTMLCanvasElement | null",
        "readonly": true,
        "description": "The `<canvas>` drawn into, `null` until the element is rendered and connected"
      }
    ],
    "methods": [
      {
        "name": "getRenderer",
        "signature": "() => IconRendererKind | null",
        "description": "Backend drawing (`webgpu`, `webgl2`, `webgl`, `canvas2d`), `null` until it started"
      },
      {
        "name": "ready",
        "signature": "() => Promise<IconRendererKind>",
        "description": "Resolves with the backend once it started and the current items are drawn; rejects when the element is not connected or no backend can start"
      }
    ],
    "events": [
      {
        "name": "minerva-renderer-change",
        "description": "The backend started (or fell back after a GPU loss); detail: { renderer }"
      }
    ],
    "slots": [],
    "parts": [
      {
        "name": "surface",
        "description": "The box the canvas is drawn in (role=img when labelled)"
      }
    ],
    "cssProperties": []
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基础用法

items 是 JavaScript 属性：图标按 CSS 像素定位，各自设置尺寸、颜色、旋转、描边宽度和不透明度，绘制在同一个画布上。minerva-renderer-change 会报告所用的后端。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/icon-canvas/wc/basic.html

```html
<div style="display: grid; gap: 8px">
  <minerva-icon-canvas
    id="icons"
    height="160"
    label="Six icons, three ways"
  ></minerva-icon-canvas>
  <small id="status" role="status">…</small>
</div>

```

### apps/docs/src/docs/pages/icon-canvas/wc/basic.ts

```tsx
// `items` is a JS property (positions in CSS px); one canvas, one GPU draw per
// run of identical icons. The backend follows setDefaultIconRenderer.
import {
  bellIcon,
  homeIcon,
  mailIcon,
  searchIcon,
  settingsIcon,
  userIcon,
} from "minerva-design/icons/core";
import type { MinervaIconCanvas } from "minerva-design/web-components/icon";

const ICONS = [
  homeIcon,
  searchIcon,
  mailIcon,
  bellIcon,
  userIcon,
  settingsIcon,
];

export function setup(root: HTMLElement) {
  const canvas = root.querySelector<MinervaIconCanvas>("#icons")!;
  const status = root.querySelector<HTMLElement>("#status")!;
  canvas.items = [
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
  const onChange = (event: Event) => {
    const { renderer } = (event as CustomEvent<{ renderer: string }>).detail;
    status.textContent = `Drawn with ${renderer}`;
  };
  canvas.addEventListener("minerva-renderer-change", onChange);
  return () => canvas.removeEventListener("minerva-renderer-change", onChange);
}

```
