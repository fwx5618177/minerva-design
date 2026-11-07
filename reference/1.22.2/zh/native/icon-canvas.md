# IconCanvas 图标画布

在一块画布上绘制大量图标，由 WebGPU、WebGL2 或 WebGL 通过少量实例化绘制调用完成，或由 Canvas2D 绘制：适用于密集图形、地图、粒子以及包含成千上万个图标的动画。

Package: minerva-design@1.22.2

Renderer: native

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

Support: n/a

Web icon component (inline SVG or a WebGPU / WebGL / Canvas2D canvas): no native counterpart yet; draw the same icon data of minerva-design/icons/core (iconPathData, toSvg, toSvgDataUri, toSvgBase64DataUri) with the platform's SVG or image support.

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
