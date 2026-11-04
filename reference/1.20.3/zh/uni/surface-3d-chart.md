# 3D 曲面图

规则网格上的曲面 z = f(x, y)：光照、内置色带（viridis、plasma、terrain…）、线框、投影到底面的等高线以及透明度。拖动旋转，Ctrl / ⌘ + 滚轮缩放。

Package: minerva-design@1.20.3

Renderer: uni

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.3",
  "sourceCommit": "af37b20099ab0383ddc1d9484d3d7847a8310d40",
  "sourceDigest": "sha256:38cfefdcb173c9a307526b9364c7a77acc74f713924006e65d94c6f3c5e94c61",
  "referenceSourceDigest": "sha256:1d36ef2823b3b425f00cf746f922b005435d17c9e4f13b0b40f620b32191d7a8"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.3/types.json) or getType() from minerva-design/contracts.

## Documentation

sinc

Peaks

马鞍面

函数

{{name}} 函数的 3D 曲面

x

y

z

岛屿

{{value}} km

{{value}} 米

东向

北向

海拔

宽 20 公里的岛屿地形

隐含波动率

{{value}}%

行权价（现价的 %）

距到期天数

{{value}} 天

按行权价和到期时间的隐含波动率曲面

面

线框

底面等高线

曲面等高线

带线框和等高线的 peaks 曲面

碗面

倾斜平面

透明碗面与透明倾斜平面相交

波

播放动画

振幅

从中心扩散的动画涟漪

金属板

重置

厘米

温度

被点热源加热的金属板温度

热源：{{sources}} 个 · 最高温度 {{max}} · 平均温度 {{mean}}。点击金属板可添加或移除热源。

国债收益率

期限

月份

收益率

24 个月内各期限国债收益率

{{date}} {{maturity}}期收益率：{{yield}}。

悬停在曲面上读取收益率。

{{date}}收益率曲线倒挂（10 年期 − 2 年期：{{spread}}）。

{{date}}收益率曲线向上倾斜（10 年期 − 2 年期：{{spread}}）。

损失

({{x}}, {{y}})

色阶

Viridis

Plasma

Magma

Cividis

Turbo

权重 1

权重 2

log₁₀(1 + 损失)

有四个极小值的 Himmelblau 函数损失曲面

从 {{start}}（损失 {{loss}}）出发，梯度下降经过 {{steps}} 步到达位于 {{minimum}} 的第 {{n}} 个极小值。

点击曲面，从该处开始梯度下降。

{{value}} dBm

信号

接入点

大堂

开放办公区

会议室

茶水间

3D 视图

俯视图

米

办公楼层的 Wi-Fi 信号强度

{{good}} 的区域信号不低于 {{goodLevel}}（可视频通话），{{usable}} 的区域不低于 {{usableLevel}}。

所有接入点均已关闭：无覆盖。

## Surface3DChart

Support: n/a

Not exported: needs a DOM and WebGPU / WebGL (virtualized DOM panels, GPU rendering), which mini-program views do not provide. Use a web-view page that renders the web component (minerva-design/charts) on mini-programs. Unsupported on this platform.

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
