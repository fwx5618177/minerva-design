# 图标核心

minerva-design/icons/core：不依赖框架的图标集。包括 SVG 字符串、Canvas2D 绘制、GPU 画布、自定义图标、全局默认渲染器，以及 GPU 后端背后的几何处理流程。

Package: minerva-design@1.22.2

Renderer: vue

Locale: zh

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

### 不依赖框架

导入核心模块没有副作用，在真正绘制之前不会访问任何浏览器 API，因此可用于服务端代码、Worker、任何框架和普通脚本。图标就是普通对象：{ name, paths, category, tags }。

React、Vue、Angular、Web Components、React Native（minerva-design/native/icons）和 Taro（minerva-design/taro/icons）组件都是这个核心之上的薄封装；其他框架可以使用 toSvg 和 createIconCanvas。

由 {{backend}} 绘制

正在启动渲染器…

下一组图标

由 createIconCanvas 绘制的三十个图标

图标

容差

{{name}} 图标的三角形

{{triangles}} 个三角形，{{points}} 个中心线点

```ts
// Any framework (or none): the core only needs an element
import { createIconCanvas, searchIcon, toSvg } from "minerva-design/icons/core";

// markup: a string of SVG for templates, innerHTML, server rendering
element.innerHTML = toSvg(searchIcon, { size: 20, title: "Search" });

// many icons on the GPU, following the global default renderer
const canvas = createIconCanvas(container, {
  items: [{ icon: searchIcon, x: 8, y: 8, size: 24 }],
});
canvas.setItems(nextItems); // redrawn on the next animation frame
canvas.destroy(); // releases the GPU context
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
