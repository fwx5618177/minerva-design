# 3D 散点图

可环绕旋转的 3D 坐标盒中的点云：在 GPU 上绘制数十万到上百万个点，可按系列、按点或通过色阶着色，支持悬停拾取、图例和色条。Line3DChart 用于绘制 3D 轨迹。

Package: minerva-design@1.19.3

Renderer: taro

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:936b6b17ca037f9538a8c5d8447637951e27e8db3596add5e078bc5a51ef03ae"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

山鸢尾

变色鸢尾

维吉尼亚鸢尾

萼片长度（cm）

萼片宽度（cm）

花瓣长度（cm）

三种花按萼片长度、萼片宽度和花瓣长度绘制的 3D 散点图

核球与棒

老年星盘

年轻恒星

HII 区

星系晕

{{value}} kpc

由一百万颗恒星组成的棒旋星系：核球、年轻恒星构成的旋臂、HII 区与尘带、星盘和星系晕

曝光

曝光 ×{{value}}

传感器

传感器 {{id}} · 湿度 {{humidity}}%

{{value}} °C

长度（m）

宽度（m）

高度（m）

温度

仓库中 300 个传感器按位置和高度显示的温度

主链 1

主链 2

碱基对

自动旋转

投影

透视

正交

旋转的 DNA 双螺旋

环面纽结

环绕环面纽结的 200,000 个点，按高度着色

后端

自动

WebGPU

WebGL2

WebGL

Canvas2D

正在启动…

当前后端：{{backend}}

此处不支持 {{requested}}：改用 {{backend}} 绘制

轨迹

时间

{{value}} 秒

按时间着色的洛伦兹吸引子轨迹

瑞士卷

卷上的位置

正视

侧视

俯视

复位

方位角 {{azimuth}}°，仰角 {{elevation}}°，缩放 ×{{zoom}}

拖动旋转，Shift + 拖动平移，Ctrl / ⌘ + 滚轮缩放，双击复位。

按卷上位置着色的瑞士卷点云

体育

政治

科技

健康

财经

旅游

{{topic}}文章 #{{n}}

最近邻

主成分 {{n}}（{{variance}}）

新闻文章向量在前三个主成分上的分布，按主题区分

与{{doc}}最接近：{{list}}。

{{doc}}（{{distance}}）

点击一篇文章，查找与它最近的邻居。

激光雷达回波

着色依据

高度

强度

深色主题

包含建筑、树木和停放车辆的街道激光雷达点云

共 {{points}} 个点。悬停在点云上可读取回波。

高度 {{height}}，强度 {{intensity}}。

{{shell}} {{n}}

宽带（低轨）

对地成像（极轨）

导航（中轨）

地球静止轨道

地球

播放

千公里

四个轨道层的卫星环绕地球运行

{{shell}}：高度 {{altitude}}，速度 {{speed}}，每 {{period}}绕行一周。

悬停在卫星上查看其轨道。

科技

医疗

能源

金融

消费

{{ticker}} · {{cap}}

正交视图

波动率

贝塔系数

年化收益

按波动率、贝塔系数和年化收益分布的股票，点的大小表示市值

{{ticker}}（{{sector}}）：收益 {{ret}}，波动率 {{volatility}}，贝塔 {{beta}}，夏普比率 {{sharpe}}，市值 {{cap}}。

点击股票以固定显示其数据。

## Line3DChart

Support: n/a

Not exported: these components need a DOM and WebGPU / WebGL (virtualized DOM panels, GPU rendering), which mini-program views do not provide. Use a web-view page that renders the web component (minerva-design/charts) on mini-programs. Unsupported on this platform.

## Scatter3DChart

Support: n/a

Not exported: these components need a DOM and WebGPU / WebGL (virtualized DOM panels, GPU rendering), which mini-program views do not provide. Use a web-view page that renders the web component (minerva-design/charts) on mini-programs. Unsupported on this platform.

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
