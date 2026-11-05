# 图标

Minerva 的图标集：专为本组件库在 24×24 网格上绘制的原创图标，默认以内联 SVG 渲染，也可以绘制在 Canvas2D、WebGL、WebGL2 或 WebGPU 画布上。

Package: minerva-design@1.21.0

Renderer: taro

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "3e3fd42fed9bd7320e0095e9008ad52d1dd44024",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:bdc377ab7ed5f94120cdda24084c48e40370128fac18b85708e5f8b5fbaf5e95"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

## Documentation

### 概览

minerva-design/icons 提供 {{count}} 个图标，分为 {{categories}} 个类别，不依赖任何第三方图标集：每个图标都是组件库自有的 SVG 路径数据，所有渲染器、所有框架使用同一份数据。

统一的视觉语言：24×24 网格，约 2px 内边距，2px 描边，圆形线帽与连接，无填充，因此图标能与文字协调搭配，并可在 12 到 96 像素之间缩放。部分图标为每条描边指定颜色（colors），其余图标跟随 color 属性。

默认使用 SVG：任意尺寸下都清晰，支持服务端渲染，颜色跟随文字颜色（currentColor），未设置 title 时对辅助技术隐藏。

同样的几何图形也能在 GPU 上绘制：Icon 可通过 renderer="auto"、"webgpu"、"webgl2"、"webgl" 或 "canvas2d" 绘制在画布上，IconCanvas 则用少量实例化绘制调用画出成千上万个图标，回退链与图表相同：WebGPU -> WebGL2 -> WebGL -> Canvas2D。

用多少打包多少：每个图标都有独立的常量（searchIcon）和组件（SearchIcon），画布渲染器只在第一个画布图标出现时才加载。

不依赖框架的核心：minerva-design/icons/core 包含图标数据、SVG 字符串、Canvas2D 绘制和 GPU 画布，适用于任何框架；React 组件即基于它构建。

组件用法见 Icon，GPU 批量绘制见 IconCanvas，不依赖框架的 API 见 图标核心。

搜索图标

按名称或标签搜索…

类别

全部类别

尺寸

描边宽度

渲染方式

SVG

画布

复制 {{code}}

已复制 {{code}}

无法复制 {{code}}：剪贴板不可用

类型

全部类型

单色

彩色

颜色

文字颜色

主色

成功

警告

危险

{{n}} 个图标

没有与“{{query}}”匹配的图标

箭头

操作

界面

媒体

文件

通讯

数据与图表

金融

状态

设备

天气

自然

食物

人物

地点

形状

文本

教育

健康

购物

音乐

工具

运动

```tsx
import { SearchIcon, SettingsIcon } from "minerva-design/icons";

<SearchIcon />                                  // 24px, currentColor, 2px stroke
<SettingsIcon size={16} title="Settings" />     // labelled: role="img"
<SearchIcon renderer="webgl2" />               // drawn by the GPU on a canvas
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
