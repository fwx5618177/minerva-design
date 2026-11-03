# 图标核心

minerva-design/icons/core：不依赖框架的图标集。包括 SVG 字符串、Canvas2D 绘制、GPU 画布、自定义图标、全局默认渲染器，以及 GPU 后端背后的几何处理流程。

Package: minerva-design@1.19.3

Renderer: taro

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "1b65455cccbdd71bb609d7d859b1ef90f9e604c6",
  "sourceDigest": "sha256:a8b34eea01e9133306bb1fde48e7966deaaaa35d87c2dfd2e181d891c65e01c1",
  "referenceSourceDigest": "sha256:d3ed05a4228bc39ff766871c13b5ba292792f934f6ebc3d0d29af28589be129c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

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
