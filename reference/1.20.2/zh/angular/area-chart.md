# 面积图

用填充面积展示随时间变化的量：默认平滑，可相互重叠、堆叠成总量，或显示为 100% 占比。悬停可查看同一 x 处的所有系列；按住 Ctrl / ⌘ 滚动滚轮或双指捏合即可缩放。

Package: minerva-design@1.20.2

Renderer: angular

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.2",
  "sourceCommit": "ae023a943266e631be23485d1daf0a21591499a1",
  "sourceDigest": "sha256:c9540edc3908d226375a01cf5e6bfe8ca6a4e20440f736c0dd9b40ae9ff2e645",
  "referenceSourceDigest": "sha256:7bf77141c64cfa04bf3140efe18348e2eef528dbd35f817eea65bdca81f687b1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.2/types.json) or getType() from minerva-design/contracts.

## Documentation

日活跃用户

2026 年 4 月至 6 月的日活跃用户

其他

2016 至 2026 年各厂商的市场份额

自然搜索

直接访问

外链引荐

社交媒体

按流量来源堆叠的每月访问量

运行中的实例

配额

一天内自动扩缩容启动的实例数

核能

水电

风电

光伏

燃气

{{value}} 吉瓦

功率

一天内按能源类型堆叠的发电量

实际

计划

本年度累计销售额与计划对比

下载

上传

两小时内的服务器带宽，下载在零线以上，上传在零线以下

太阳能发电量

{{value}} kWh

2026 年屋顶太阳能装置的每日发电量

重置缩放

{{from}} – {{to}}：合计 {{total}}，日均 {{average}}

按住 Ctrl / ⌘ 滚动滚轮或双指缩放来放大某个季节，拖动可平移。

工程

销售

客户支持

运营

财务与人力

2025 至 2026 年各部门每月人数

所选月份的人数

{{value}} 名员工

去年

今年

黑色星期五

网络星期一

最后发货日

11 月和 12 月的每日订单，今年与去年对比

本季共 {{total}} 笔订单，同比 {{change}}。

已用

趋势

{{value}} GB

容量 {{value}}

卷

数据库

日志

用户上传

约 {{days}} 后写满（{{date}} 前后）

未来 {{days}}内不会写满

60 天的磁盘用量及其到容量上限的趋势

## AreaChart

Support: beta

Native Angular: MnAreaChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnAreaChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "series",
    "typeText": "readonly ChartSeries[]",
    "required": true,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "curve",
    "typeText": "ChartCurve",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "stacked",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "percent",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "xAxis",
    "typeText": "ChartAxisOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "yAxis",
    "typeText": "ChartAxisOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "renderer",
    "typeText": "ChartRendererPreference | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "legend",
    "typeText": "boolean | ChartLegendOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "tooltip",
    "typeText": "boolean | ChartTooltipOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "crosshair",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "annotations",
    "typeText": "readonly ChartAnnotation[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "interaction",
    "typeText": "boolean | ChartInteractionOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "padding",
    "typeText": "ChartPadding | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "palette",
    "typeText": "readonly string[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  }
]
```

### events

```json
[
  {
    "name": "pointClick",
    "typeText": "ChartHoverEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "plotClick",
    "typeText": "ChartPlotClickEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartPlotClickEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "hover",
    "typeText": "ChartHoverEvent | null",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "zoom",
    "typeText": "ChartView",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartView",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "rendererChange",
    "typeText": "ChartRendererKind",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartRendererKind",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 堆叠

stacked 将各面积逐层堆叠，顶部边缘即为总量；适合各部分之和有实际意义的场景。点击图例项可隐藏某个来源，其余系列会重新堆叠。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnAreaChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnAreaChart],
  template: `
@let t = labels[language()];
<mn-area-chart
  [series]="[
    { name: t.organic, data: organic },
    { name: t.paid, data: paid },
    { name: t.referral, data: referral }
  ]"
  stacked
  [xAxis]="{ type: 'category', categories: t.months }"
  [height]="280"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  organic = [320, 332, 301, 334, 390, 430];
  paid = [120, 132, 101, 134, 190, 230];
  referral = [60, 72, 71, 74, 90, 110];
  labels = {
  "en": {
    "organic": "Organic",
    "paid": "Paid",
    "referral": "Referral",
    "months": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
  },
  "zh": {
    "organic": "自然流量",
    "paid": "付费流量",
    "referral": "推荐流量",
    "months": ["1月", "2月", "3月", "4月", "5月", "6月"]
  },
  "ja": {
    "organic": "オーガニック",
    "paid": "有料",
    "referral": "参照元",
    "months": ["1月", "2月", "3月", "4月", "5月", "6月"]
  },
  "fr": {
    "organic": "Naturel",
    "paid": "Payant",
    "referral": "Référents",
    "months": ["janv.", "févr.", "mars", "avr.", "mai", "juin"]
  }
};
}

```

## Example: 百分比堆叠

percent 将每个 x 处的总量缩放为 100%，用于比较占比而非绝对值（如市场份额）；提示框同时显示各项数值及其占比。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnAreaChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnAreaChart],
  template: `
@let t = labels[language()];
<mn-area-chart
  [series]="[
    { name: t.solar, data: solar },
    { name: t.wind, data: wind },
    { name: t.hydro, data: hydro }
  ]"
  percent
  curve="linear"
  [xAxis]="{ type: 'category', categories: t.hours }"
  [height]="280"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  solar = [0, 5, 40, 62, 35, 2];
  wind = [48, 52, 30, 22, 38, 55];
  hydro = [30, 30, 28, 26, 28, 30];
  labels = {
  "en": {
    "solar": "Solar",
    "wind": "Wind",
    "hydro": "Hydro",
    "hours": ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"]
  },
  "zh": {
    "solar": "太阳能",
    "wind": "风能",
    "hydro": "水电",
    "hours": ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"]
  },
  "ja": {
    "solar": "太陽光",
    "wind": "風力",
    "hydro": "水力",
    "hours": ["0:00", "4:00", "8:00", "12:00", "16:00", "20:00"]
  },
  "fr": {
    "solar": "Solaire",
    "wind": "Éolien",
    "hydro": "Hydraulique",
    "hours": ["0 h", "4 h", "8 h", "12 h", "16 h", "20 h"]
  }
};
}

```
