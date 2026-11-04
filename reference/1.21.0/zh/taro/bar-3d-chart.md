# 3D 柱状图

x × y 类别网格上的柱体：带光照的立方体、按系列着色、跨系列堆叠、按高度或其他值通过色阶着色，并支持图例和色条。

Package: minerva-design@1.21.0

Renderer: taro

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "cf7fb249651cd06c89d0951ac2c3a3aa74dc835a",
  "sourceDigest": "sha256:e0f51a94cc5272baf2775327d83ba025ee09228cfc17f4d529188b1653c78892",
  "referenceSourceDigest": "sha256:563c9bec5d90807342a94c02317519b3da937907129bda2d25ea49762fa828fd"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

## Documentation

销售额

地区

月份

北部

南部

东部

西部

中部

五个地区的月度销售额

季度

第一季度

第二季度

第三季度

第四季度

市场

美洲

欧洲

亚洲

大洋洲

硬件

软件

服务

收入

三条产品线在四个市场的季度收入（堆叠）

女性

男性

年龄

{{from}}–{{to}} 岁

{{from}} 岁以上

普查年份

人口

{{value}} 百万

四个普查年份按年龄组和性别划分的人口

访问量

小时

星期

网站每周各小时的访问量

产品

笔记本电脑

手机

平板电脑

手表

音频设备

利润率

五种产品在四个市场的收入与利润率

库存充足

库存不足

{{value}} 件

实时更新

通道

{{id}} 通道

货架层

第 {{n}} 层

件数

按通道和货架层统计的仓库货位剩余件数，实时更新

库存 {{total}} 件 · 不足货位：{{low}} / {{bins}} · 已补货货位：{{restocked}}。

留存率

注册后月数

第 {{n}} 月

注册月份

按注册后月数统计的各月注册同期群留存率

{{cohort}}同期群，第 {{n}} 个月：{{retention}} 仍活跃（{{total}} 位用户中的 {{users}} 位）。

点击柱子查看同期群的留存率。

研发

销售

市场

运营

客服

财务

实际支出

财年

预算差异

部门

{{year}} 年六个部门的季度支出及预算差异

{{department}}，{{quarter}}：支出 {{actual}}，预算 {{budget}}（{{variance}}）。

{{year}} 年：支出 {{actual}}，预算 {{budget}}（{{variance}}）。超支最多：{{department}}，{{quarter}}（{{worst}}）。

{{value}} kW

进风温度

深色主题

3D 视图

平面图

机柜

排

{{id}} 排

功耗

按排和位置排列的服务器机柜，柱高为功耗，颜色为进风温度

机柜 {{rack}}：{{power}}，进风 {{inlet}}，超过 {{limit}} 上限。

机柜 {{rack}}：{{power}}，进风 {{inlet}}，未超过 {{limit}} 上限。

进风温度超过 {{limit}} 的机柜：{{total}} 个中有 {{hot}} 个（{{racks}}）。点击机柜查看读数。

## Bar3DChart

Support: n/a

Not exported: these components need a DOM and WebGPU / WebGL (virtualized DOM panels, GPU rendering), which mini-program views do not provide. Use a web-view page that renders the web component (minerva-design/charts) on mini-programs. Unsupported on this platform.

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
