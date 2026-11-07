# 范围面积图

在下边界与上边界之间填充的带状区域：适合置信区间、预测、最小-最大范围和百分位扇形图。

Package: minerva-design@1.22.3

Renderer: angular

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.3",
  "sourceCommit": "05d8029dbc66b57df26a3da7707f0fa0e4a02bde",
  "sourceDigest": "sha256:0d31b0bc3c28394756a1142132ddf7b2beac9f7ce2f5b2253e04712431d7c736",
  "referenceSourceDigest": "sha256:98c68657ee3e6708d0ba87e44b497d1aba974e208ad5676dbbb9902bc229d648"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.3/types.json) or getType() from minerva-design/contracts.

## Documentation

95% 区间

80% 区间

实际

预测

订单

今天

月度订单及未来 12 个月的预测和置信区间

最低 – 最高

季节常年值

一年中每天的最低和最高气温

第 5 – 95 百分位

第 25 – 75 百分位

中位数

一天中响应时间的百分位

最低 – 最高

收盘价

六个月内每日交易区间与收盘价

预期值 ± {{k}}σ

实测值

异常

灵敏度

{{k}}σ 区间

每分钟请求数

一周内每分钟的 API 请求数，含预期区间及其之外的异常点

没有落在区间外的点。

异常：{{n}} 个，最近一次在 {{latest}}。

买价 – 卖价

中间价

暂停

继续

买价 {{bid}} · 卖价 {{ask}}

价差 {{value}} 个基点

某货币对过去一分钟的实时买价和卖价，以及中间价

低排放（SSP1-2.6）

低排放，可能范围

极高排放（SSP5-8.5）

极高排放，可能范围

观测值

{{value}} 限值

相对 1850–1900 年的升温

1950 年以来观测到的全球升温，以及低排放和极高排放情景下到 2100 年的预测

在低排放情景下，中位值约在 {{low}} 年超过 {{lowLimit}}，并稳定在 {{peak}}；在极高排放情景下，约在 {{high}} 年超过 {{highLimit}}。

{{level}} 置信区间

提升

无差异

显著

置信水平

测试天数

B 相对 A 的转化率提升

28 天测试期间变体 B 相对变体 A 的累计转化率提升及其置信区间

B 领先 {{lift}}，但 {{level}} 置信区间仍包含零。

B 的转化率高出 {{lift}}（{{level}} 置信区间为 {{low}} 至 {{high}}），自第 {{day}} 天起显著。

## RangeAreaChart

Support: beta

Native Angular: MnRangeAreaChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnRangeAreaChart"
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
    "name": "curve",
    "typeText": "ChartCurve",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 带置信区间的预测

面积图的每个点用 y0 设置下边界：80% 和 95% 区间随预测期变宽，历史值与预测值为折线；lineWidth: 0 隐藏带状区域的边线。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnRangeAreaChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnRangeAreaChart],
  template: `
@let t = labels[language()];
@let m = months[language()];
<mn-range-area-chart
  [series]="[
    { name: t.band, data: [{ x: m[5], y0: 158, y: 158 }, { x: m[6], y0: 159, y: 167 }, { x: m[7], y0: 161, y: 177 }, { x: m[8], y0: 160, y: 184 }, { x: m[9], y0: 162, y: 194 }, { x: m[10], y0: 165, y: 205 }, { x: m[11], y0: 166, y: 214 }] },
    { name: t.actual, type: 'line', data: [{ x: m[0], y: 120 }, { x: m[1], y: 132 }, { x: m[2], y: 128 }, { x: m[3], y: 141 }, { x: m[4], y: 150 }, { x: m[5], y: 158 }] },
    { name: t.forecast, type: 'line', lineWidth: 1, data: [{ x: m[5], y: 158 }, { x: m[6], y: 163 }, { x: m[7], y: 169 }, { x: m[8], y: 172 }, { x: m[9], y: 178 }, { x: m[10], y: 185 }, { x: m[11], y: 190 }] }
  ]"
  [xAxis]="{ type: 'category', categories: m }"
  [height]="300"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": {
    "actual": "Actual",
    "forecast": "Forecast",
    "band": "80 % interval"
  },
  "zh": {
    "actual": "实际",
    "forecast": "预测",
    "band": "80% 置信区间"
  },
  "ja": {
    "actual": "実績",
    "forecast": "予測",
    "band": "80% 予測区間"
  },
  "fr": {
    "actual": "Réel",
    "forecast": "Prévision",
    "band": "Intervalle à 80 %"
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

## Example: 每日最低与最高气温

一年中每天的气温范围及季节常年值：提示框显示带状区域的两端，Ctrl / ⌘ + 滚轮可放大到单日。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnRangeAreaChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnRangeAreaChart],
  template: `
@let t = labels[language()];
@let d = days[language()];
<mn-range-area-chart
  [series]="[
    { name: t.range, data: [{ x: d[0], y0: 8, y: 16 }, { x: d[1], y0: 9, y: 18 }, { x: d[2], y0: 7, y: 15 }, { x: d[3], y0: 11, y: 21 }, { x: d[4], y0: 13, y: 24 }, { x: d[5], y0: 12, y: 22 }, { x: d[6], y0: 10, y: 19 }] },
    { name: t.mean, type: 'line', data: [{ x: d[0], y: 12 }, { x: d[1], y: 13.5 }, { x: d[2], y: 11 }, { x: d[3], y: 16 }, { x: d[4], y: 18.5 }, { x: d[5], y: 17 }, { x: d[6], y: 14.5 }] }
  ]"
  curve="linear"
  [xAxis]="{ type: 'category' }"
  [height]="280"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": {
    "range": "Min – max",
    "mean": "Average"
  },
  "zh": {
    "range": "最低 – 最高",
    "mean": "平均"
  },
  "ja": {
    "range": "最低 – 最高",
    "mean": "平均"
  },
  "fr": {
    "range": "Min – max",
    "mean": "Moyenne"
  }
};
  days = {
  "en": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  "zh": ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  "ja": ["月", "火", "水", "木", "金", "土", "日"],
  "fr": ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."]
};
}

```
