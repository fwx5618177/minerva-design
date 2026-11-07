# Icon 图标组件

图标集中的单个图标：默认为内联 SVG，也可以是由 WebGPU、WebGL2、WebGL 或 Canvas2D 绘制的画布。包括具名组件（SearchIcon…）、通用的 Icon、自定义图标以及按名称选择的图标。

Package: minerva-design@1.22.2

Renderer: wc

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "b19e53ff0733e666aa205d6fd5bebb89b1eef18d",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:2a0069aef643875e6528da29db3ea67e23924d3d3dcad8f2f45e0400ede619c0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

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

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/icon",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "name",
    "typeText": "string | undefined",
    "attribute": "name",
    "required": false
  },
  {
    "name": "size",
    "typeText": "number",
    "attribute": "size",
    "required": false
  },
  {
    "name": "color",
    "typeText": "string",
    "attribute": "color",
    "required": false
  },
  {
    "name": "strokeWidth",
    "typeText": "number",
    "attribute": "stroke-width",
    "required": false
  },
  {
    "name": "absoluteStrokeWidth",
    "typeText": "boolean",
    "attribute": "absolute-stroke-width",
    "required": false
  },
  {
    "name": "label",
    "typeText": "string | undefined",
    "attribute": "label",
    "required": false
  },
  {
    "name": "renderer",
    "typeText": "\"svg\" | \"auto\" | \"webgpu\" | \"webgl2\" | \"webgl\" | \"canvas2d\"",
    "attribute": "renderer",
    "required": false
  },
  {
    "name": "icon",
    "typeText": "IconDefinition | undefined",
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
    "description": "Canvas mode: the backend drew the icon (or fell back after a GPU loss); detail: { renderer }"
  }
]
```

## API

```json
{
  "wc:minerva-icon": {
    "kind": "element",
    "source": "web-components/src/components/icon/icon.ts",
    "className": "MinervaIcon",
    "summary": "Icon of the Minerva icon set, as inline SVG or on a GPU canvas.",
    "description": "An icon of minerva-design/icons (the `<Icon>` of React): inline SVG by default (crisp at any size, styled by CSS, server-renderable), or a canvas drawn with WebGPU, WebGL2, WebGL or Canvas2D (`renderer`) by a backend shared by every canvas icon of the page. Set a built-in icon by `name` (`search`, `arrow-up`...) or any icon, custom ones made with `defineIcon` included, as the `icon` property. The stroke follows the text color unless `color` is set. Without `label` the icon is decorative (hidden from assistive technologies); with one it is an image with that accessible name. In canvas mode the host gets `data-renderer` with the backend drawing. Published as the optional entry `minerva-design/web-components/icon` (not part of the all-in-one entry nor of `cdn/minerva.js`: it loads the icon set `minerva-design/icons/core`). Without a build step, load the self-contained `dist/web-components/cdn/icon.js` next to `minerva.js`.",
    "properties": [
      {
        "name": "name",
        "attribute": "name",
        "type": "string | undefined",
        "description": "Name of a built-in icon (`search`, `arrow-up`...); the `icon` property wins over it"
      },
      {
        "name": "size",
        "attribute": "size",
        "type": "number",
        "default": "24",
        "description": "Width and height in pixels"
      },
      {
        "name": "color",
        "attribute": "color",
        "type": "string",
        "default": "\"currentColor\"",
        "description": "Stroke color, any CSS color (`currentColor` follows the text color)"
      },
      {
        "name": "strokeWidth",
        "attribute": "stroke-width",
        "type": "number",
        "default": "2",
        "description": "Stroke width on the 24×24 grid (scales with the size unless `absolute-stroke-width`)"
      },
      {
        "name": "absoluteStrokeWidth",
        "attribute": "absolute-stroke-width",
        "type": "boolean",
        "default": "false",
        "description": "Keeps the stroke width in pixels whatever the size"
      },
      {
        "name": "label",
        "attribute": "label",
        "type": "string | undefined",
        "description": "Accessible name: the icon becomes an image (role=img); without it the icon is hidden from assistive technologies"
      },
      {
        "name": "renderer",
        "attribute": "renderer",
        "type": "\"svg\" | \"auto\" | \"webgpu\" | \"webgl2\" | \"webgl\" | \"canvas2d\"",
        "default": "\"svg\"",
        "description": "`svg` (inline SVG), or a canvas drawn with the backend preference (`auto` follows the page default)"
      },
      {
        "name": "icon",
        "type": "IconDefinition | undefined",
        "description": "Icon definition (a built-in icon constant, or a custom icon of `defineIcon`); wins over `name`; property only"
      }
    ],
    "methods": [
      {
        "name": "getRenderer",
        "signature": "() => IconRendererKind | null",
        "description": "Backend drawing the canvas (`webgpu`, `webgl2`, `webgl`, `canvas2d`); `null` in SVG mode or until drawn"
      }
    ],
    "events": [
      {
        "name": "minerva-renderer-change",
        "description": "Canvas mode: the backend drew the icon (or fell back after a GPU loss); detail: { renderer }"
      }
    ],
    "slots": [],
    "parts": [
      {
        "name": "icon",
        "description": "The <svg> (or the <canvas> in canvas mode) drawing the icon"
      }
    ],
    "cssProperties": []
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基础用法

<minerva-icon> 按名称绘制内置图标，可与文本并排，也可放入其他元素的插槽；设置 label 后，它会作为图像暴露给辅助技术。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/icon/wc/basic.html

```html
<div style="display: flex; flex-wrap: wrap; align-items: center; gap: 16px">
  <minerva-icon name="home"></minerva-icon>
  <minerva-icon name="search"></minerva-icon>
  <minerva-icon name="settings"></minerva-icon>
  <minerva-button>
    <minerva-icon slot="start" name="download" size="16"></minerva-icon>
    Download
  </minerva-button>
  <minerva-button color="danger" variant="outline">
    <minerva-icon slot="start" name="trash" size="16"></minerva-icon>
    Delete
  </minerva-button>
  <minerva-icon name="bell" size="32" label="Notifications"></minerva-icon>
</div>

```

## Example: 渲染器

renderer 属性让图标绘制在画布上；每个图标都会触发 minerva-renderer-change，带上实际绘制它的后端（显示在图标下方）。"auto" 跟随渲染器栏；浏览器不支持强制指定的后端时，会回退到下一个。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/icon/wc/canvas.html

```html
<div id="renderers" style="display: flex; flex-wrap: wrap; gap: 24px">
  <figure style="display: grid; justify-items: center; gap: 4px; margin: 0">
    <minerva-icon
      name="settings"
      size="40"
      color="var(--primary-color)"
    ></minerva-icon>
    <figcaption><code>svg</code> <small>SVG</small></figcaption>
  </figure>
  <figure style="display: grid; justify-items: center; gap: 4px; margin: 0">
    <minerva-icon
      name="settings"
      size="40"
      color="var(--primary-color)"
      renderer="auto"
    ></minerva-icon>
    <figcaption><code>auto</code> <small>…</small></figcaption>
  </figure>
  <figure style="display: grid; justify-items: center; gap: 4px; margin: 0">
    <minerva-icon
      name="settings"
      size="40"
      color="var(--primary-color)"
      renderer="webgpu"
    ></minerva-icon>
    <figcaption><code>webgpu</code> <small>…</small></figcaption>
  </figure>
  <figure style="display: grid; justify-items: center; gap: 4px; margin: 0">
    <minerva-icon
      name="settings"
      size="40"
      color="var(--primary-color)"
      renderer="webgl2"
    ></minerva-icon>
    <figcaption><code>webgl2</code> <small>…</small></figcaption>
  </figure>
  <figure style="display: grid; justify-items: center; gap: 4px; margin: 0">
    <minerva-icon
      name="settings"
      size="40"
      color="var(--primary-color)"
      renderer="webgl"
    ></minerva-icon>
    <figcaption><code>webgl</code> <small>…</small></figcaption>
  </figure>
  <figure style="display: grid; justify-items: center; gap: 4px; margin: 0">
    <minerva-icon
      name="settings"
      size="40"
      color="var(--primary-color)"
      renderer="canvas2d"
    ></minerva-icon>
    <figcaption><code>canvas2d</code> <small>…</small></figcaption>
  </figure>
</div>

```

### apps/docs/src/docs/pages/icon/wc/canvas.ts

```tsx
// Every canvas icon fires minerva-renderer-change with the backend that drew
// it ("auto" follows setDefaultIconRenderer; a forced backend that cannot
// start here falls back to the next one).
import type { MinervaIcon } from "minerva-design/web-components/icon";

export function setup(root: HTMLElement) {
  const onChange = (event: Event) => {
    const icon = event.target as MinervaIcon;
    const { renderer } = (event as CustomEvent<{ renderer: string }>).detail;
    const caption = icon.closest("figure")?.querySelector("small");
    if (caption) caption.textContent = renderer;
  };
  root.addEventListener("minerva-renderer-change", onChange);
  return () => root.removeEventListener("minerva-renderer-change", onChange);
}

```
