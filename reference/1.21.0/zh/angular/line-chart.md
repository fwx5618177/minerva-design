# 折线图

基于数字、日期或类目的折线或填充面积图。借助 GPU 可处理百万级数据点。

Package: minerva-design@1.21.0

Renderer: angular

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

本周

上周

本周与上周每日访客数

已用存储

天

60 天内的存储用量

里斯本

奥斯陆

曲线

直线

平滑

阶梯

里斯本与奥斯陆的月平均气温

计算

存储

网络

数据库

堆叠方式

堆叠

按服务堆叠的每月云支出

页面浏览量

会话数

2026 年上半年每日页面浏览量与会话数

传感器

一百万条传感器读数

{{points}} 个点 · 使用 {{renderer}} 绘制 · Ctrl / ⌘ + 滚轮缩放，拖动平移，双击重置

访客

产品发布

服务故障

90 天内的每日访客数，含一次产品发布和一次故障

室内

室外

每小时室内外温度，含缺失读数

传感器离线了几个小时：线条在此断开，而不是凭空猜测。

中位数

第 95 百分位

临界

目标 {{value}}

六小时内的 API 延迟：中位数与第 95 百分位

收盘价

周期

1 个月

3 个月

6 个月

1 年

全部

两年内的每日收盘价

步数

每日步数

{{day}}：{{steps}} 步

点按或在线条上滑动

CPU

内存

{{hour}} 时

一天内的 CPU 与内存使用率

双指缩放，双击重置；点按图例可隐藏系列。

冷冻柜温度

高于 {{value}} 报警

暂停

继续

报警：门未关？

正常

最新读数 {{value}}（{{time}}）

最近一分钟超限读数：{{readings}}

最近一分钟的冷冻柜温度，每秒更新

野生型

突变株

加入抗生素

指数生长期

对数刻度

接种后时间

CFU / mL

三种细菌培养物 24 小时的生长曲线

直线段表示增长率恒定：野生型大约每 {{minutes}} 翻一番。

在线性刻度下，数量较少的培养物看起来几乎是平的：切回对数刻度即可比较。

投资组合市值

点击一个点开始测量，再点击第二个点。

起点 {{date}}（{{value}}）：请点击第二个点。

{{from}} → {{to}}：{{change}}（{{percent}}），历时 {{days}}

清除

2026 年投资组合每日市值；点击两个点测量变化

股票

债券

黄金

房地产

基期 = 100

四类资产以 100 为基期的表现，2021 至 2026 年

{{value}} µg/m³

德里

北京

巴黎

墨西哥城

东京

圣保罗

11 月细颗粒物（PM2.5）日均浓度；虚线为世卫组织指导值 {{value}}。

超标 {{days}}/{{total}} 天

{{city}} 30 天的每日 PM2.5

## LineChart

Support: beta

Native Angular: MnLineChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnLineChart"
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
    "name": "area",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "curve",
    "typeText": "ChartCurve | undefined",
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

## Example: Weekly trend

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnLineChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnLineChart],
  template: `
@let t = labels[language()];
<mn-line-chart
  [series]="[
    { name: t.thisWeek, data: thisWeek },
    { name: t.lastWeek, data: lastWeek }
  ]"
  curve="smooth"
  [xAxis]="{ type: 'category', categories: t.days }"
  [height]="280"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  thisWeek = [820, 932, 901, 934, 1290, 1330, 1320];
  lastWeek = [620, 732, 701, 834, 1090, 1130, 1020];
  labels = {
  "en": {
    "thisWeek": "This week",
    "lastWeek": "Last week",
    "days": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  },
  "zh": {
    "thisWeek": "本周",
    "lastWeek": "上周",
    "days": ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
  },
  "ja": {
    "thisWeek": "今週",
    "lastWeek": "先週",
    "days": ["月", "火", "水", "木", "金", "土", "日"]
  },
  "fr": {
    "thisWeek": "Cette semaine",
    "lastWeek": "Semaine dernière",
    "days": ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."]
  }
};
}

```

## Example: Zoom and reset

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnLineChart, MnButton, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnLineChart, MnButton],
  template: `
@let t = labels[language()];
<mn-line-chart
  #chart
  [series]="[{ name: t.sensor, data: sensor }]"
  crosshair
  [interaction]="{ zoom: 'x' }"
  [height]="260"
/>
<button mnButton variant="outline" size="small" (click)="chart.resetZoom()">{{ t.reset }}</button>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  sensor = [50, 58, 64, 69, 71, 70, 68, 66, 64, 64, 66, 70, 75, 81, 86, 89, 90, 88, 83, 78, 72, 67, 64, 64, 65, 67, 70, 71, 70, 67, 61, 53, 45, 38, 33, 30, 29, 31, 33, 35, 36, 35, 32, 27, 21, 16, 12, 10, 11, 15, 20, 26, 31, 35, 36, 36, 34, 31, 29, 29, 32, 37, 43, 51, 59, 65, 69, 71, 70, 68, 65, 64, 64, 66, 71, 76, 82, 87, 90, 90, 87, 82, 77, 71, 66, 64, 64, 65, 68, 70, 71, 70, 66, 60, 52, 44, 37, 32, 29, 29, 31, 34, 36, 36, 35, 31, 26, 20, 15, 11, 10, 11, 15, 21, 27, 32, 35, 36, 36, 33];
  labels = {
  "en": {
    "sensor": "Sensor",
    "reset": "Reset zoom"
  },
  "zh": {
    "sensor": "传感器",
    "reset": "重置缩放"
  },
  "ja": {
    "sensor": "センサー",
    "reset": "ズームをリセット"
  },
  "fr": {
    "sensor": "Capteur",
    "reset": "Réinitialiser le zoom"
  }
};
}

```
