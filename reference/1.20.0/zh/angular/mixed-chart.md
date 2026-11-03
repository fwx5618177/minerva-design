# 组合图 / 双轴图

在一张图中组合柱、线和面积，可使用一个或两个数值轴：收入与增长率、降雨量与气温、帕累托图。

Package: minerva-design@1.20.0

Renderer: angular

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.0",
  "sourceCommit": "09013eec9b429ff5907c596bcb5edf1281361bc0",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:b368e6fa7c621870e513621690cab70035abb6a658e8344f3df3b0cb0be55a18"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.0/types.json) or getType() from minerva-design/contracts.

## Documentation

{{year}} 年第 {{n}} 季度

收入

同比增长

季度收入及其同比增长

降雨量

气温

东京每月降雨量和气温

访问量

转化率

营销活动

两个月内每日访问量与转化率

退货

累计占比

尺码不合适

商品损坏

与描述不符

送达过晚

改变主意

发错商品

其他

按原因统计的退货及其累计占比

页面浏览量

中文（zh-CN）

法语（fr-FR）

每日页面浏览量与转化率，{{locale}}

营收

用户数

用户数（对数）

2016 至 2025 年的年营收与对数轴上的用户数

{{value}} kWh

光伏发电

用电量

电池电量

夜间

{{value}} 电池

两天内自给率为 {{share}}，从电网购电 {{imported}}。

每小时电量

某住宅两天内每小时的光伏发电量和用电量，以及电池电量

库存水平

到货

促销

安全库存

再订货点

点击某一天或某次到货。

{{id}}：{{ordered}} 订购 {{quantity}} 件，经过 {{lead}} 于 {{arrived}} 到货。

{{date}} 库存 {{units}} 件。

{{date}} 库存仅 {{units}} 件，低于安全库存。

件数

某商品三个月内的每日库存水平，含到货、再订货点和安全库存

请求数

错误率

发布

每 30 分钟请求数

某 Web API 一天内的请求数和错误率，以及发布记录

发布 {{version}} 后，错误率于 {{time}} 达到峰值 {{peak}}，直到回滚至 {{rollback}}。

{{value}} 点

开始

剩余工作量

已完成

理想进度

新增 {{value}}

理想：剩余 {{value}}

剩余 {{value}}

当天完成 {{value}}

落后理想进度 {{value}}

领先理想进度 {{value}}

故事点

迭代燃尽图：十个工作日内的剩余工作量、每日完成点数和理想燃尽线

剩余 {{left}}，按每天 {{velocity}} 的速度，迭代结束时约有 {{forecast}} 无法完成。

剩余 {{left}}，按每天 {{velocity}} 的速度，迭代进度正常。

## MixedChart

Support: beta

Native Angular: MnMixedChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnMixedChart"
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
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "yAxis2",
    "typeText": "ChartAxisOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "stackMode",
    "typeText": "\"normal\" | \"percent\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "orientation",
    "typeText": "ChartOrientation | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 收入与增长率

增长率折线设置 yAxis: "right"，以自身的格式绘制在 yAxis2 上；右轴范围与左轴刻度对齐，网格对两个轴都适用。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnMixedChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnMixedChart],
  template: `
@let t = labels[language()];
@let m = months[language()];
<mn-mixed-chart
  [series]="[
    { name: t.revenue, type: 'bar', data: [{ x: m[0], y: 182 }, { x: m[1], y: 196 }, { x: m[2], y: 214 }, { x: m[3], y: 205 }, { x: m[4], y: 238 }, { x: m[5], y: 261 }] },
    { name: t.growth, type: 'line', curve: 'smooth', yAxis: 'right', data: [{ x: m[0], y: 0 }, { x: m[1], y: 7.7 }, { x: m[2], y: 9.2 }, { x: m[3], y: -4.2 }, { x: m[4], y: 16.1 }, { x: m[5], y: 9.7 }] }
  ]"
  [xAxis]="{ type: 'category' }"
  [height]="300"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": {
    "revenue": "Revenue (k€)",
    "growth": "Growth"
  },
  "zh": {
    "revenue": "收入（千欧元）",
    "growth": "增长率"
  },
  "ja": {
    "revenue": "売上（千ユーロ）",
    "growth": "成長率"
  },
  "fr": {
    "revenue": "Chiffre d’affaires (k€)",
    "growth": "Croissance"
  }
};
  months = {
  "en": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  "zh": ["1月", "2月", "3月", "4月", "5月", "6月"],
  "ja": ["1月", "2月", "3月", "4月", "5月", "6月"],
  "fr": ["janv.", "févr.", "mars", "avr.", "mai", "juin"]
};
}

```

## Example: 气候图

降雨量柱使用左轴，气温曲线使用右轴；zero: true 让右轴范围包含零。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnMixedChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnMixedChart],
  template: `
@let t = labels[language()];
@let m = months[language()];
<mn-mixed-chart
  [series]="[
    { name: t.rain, type: 'bar', color: 'var(--chart-series-2, #0ea5e9)', data: [{ x: m[0], y: 52 }, { x: m[1], y: 41 }, { x: m[2], y: 48 }, { x: m[3], y: 55 }, { x: m[4], y: 68 }, { x: m[5], y: 71 }, { x: m[6], y: 64 }, { x: m[7], y: 62 }, { x: m[8], y: 55 }, { x: m[9], y: 64 }, { x: m[10], y: 63 }, { x: m[11], y: 60 }] },
    { name: t.temperature, type: 'line', curve: 'smooth', yAxis: 'right', color: 'var(--chart-series-4, #ef4444)', data: [{ x: m[0], y: 3.5 }, { x: m[1], y: 4.2 }, { x: m[2], y: 7.6 }, { x: m[3], y: 10.7 }, { x: m[4], y: 14.5 }, { x: m[5], y: 17.6 }, { x: m[6], y: 19.8 }, { x: m[7], y: 19.6 }, { x: m[8], y: 16.4 }, { x: m[9], y: 12.3 }, { x: m[10], y: 7.6 }, { x: m[11], y: 4.4 }] }
  ]"
  [xAxis]="{ type: 'category' }"
  crosshair
  [height]="300"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": {
    "rain": "Precipitation (mm)",
    "temperature": "Temperature (°C)"
  },
  "zh": {
    "rain": "降水量（毫米）",
    "temperature": "气温（°C）"
  },
  "ja": {
    "rain": "降水量（mm）",
    "temperature": "気温（°C）"
  },
  "fr": {
    "rain": "Précipitations (mm)",
    "temperature": "Température (°C)"
  }
};
  months = {
  "en": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  "zh": ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
  "ja": ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
  "fr": ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."]
};
}

```
