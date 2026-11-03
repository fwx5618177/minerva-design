# 气泡图

用点的大小表示第三个数值的散点图：气泡面积与数值成正比。

Package: minerva-design@1.19.3

Renderer: angular

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

亚洲

欧洲

美洲

非洲

人口

人均 GDP

预期寿命（岁）

各国人均 GDP、预期寿命与人口

产品

收入

云存储

数据分析

移动 SDK

支付

桌面应用

硬件

咨询

相对市场份额

市场增长率

市场领先

高增长

各产品的市场份额、增长率与收入

已确认

方案

谈判

金额

商机 #{{id}}

在管道中的天数

赢单概率

{{deal}}（{{stage}}）：{{amount}}

点击一个气泡

按时长、赢单概率和金额展示的进行中商机

人均 GDP（对数坐标）

高收入

对数坐标下的人均 GDP 与预期寿命，气泡大小表示人口

可见收入范围：{{from}} – {{to}}

缩放后显示以美元计的可见范围

基础设施

安全

人员

预算

敞口

停电

硬件交付延迟

网络割接

数据泄露

权限审查积压

关键人员离职

供应商技能不足

培训缺口

许可费用上涨

汇率波动

可接受

严重

可能性 {{likelihood}} × 影响 {{impact}} = {{score}}

敞口：{{value}}

可能性

影响

按可能性、影响和成本敞口排列的项目风险

搜索

社交

视频

邮件

预算

上线于 {{date}}

上线日期

广告支出回报率

盈亏平衡

按上线日期、广告支出回报率和预算排列的营销活动

北区

南区

东区

西区

中区

两个图表使用相同的大小比例

两个图表都用最大的气泡表示 {{value}}。

每个图表都用最大的气泡表示自身的最高营收。

每平方米销售额

利润率

{{year}} 年各门店区域的每平方米销售额、利润率和营收

播放

暂停

重播

重新开始

年份：{{year}}

生育率（每名女性生育子女数）

1990 年至 2025 年各国的生育率、预期寿命和人口

## BubbleChart

Support: beta

Native Angular: MnBubbleChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnBubbleChart"
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
    "name": "minSize",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "maxSize",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "maxValue",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 国家对比

人均 GDP 与预期寿命，气泡大小表示人口，颜色区分大洲；valueName 和 format 设置提示框中数值的名称和格式。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnBubbleChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnBubbleChart],
  template: `
@let t = labels[language()];
<mn-bubble-chart
  [series]="[{ name: t.life, showLabels: true, data: [
    { x: 34, y: 84.5, value: 124, label: t.names[0] },
    { x: 44, y: 82.5, value: 68, label: t.names[1] },
    { x: 12.6, y: 78.6, value: 1410, label: t.names[2] },
    { x: 9, y: 75.9, value: 216, label: t.names[3] },
    { x: 2.5, y: 70.8, value: 1430, label: t.names[4] },
    { x: 2.2, y: 53.6, value: 224, label: t.names[5] },
    { x: 52, y: 81.2, value: 84, label: t.names[6] },
    { x: 11.5, y: 75, value: 128, label: t.names[7] }
  ] }]"
  [xAxis]="{ title: t.gdp }"
  [yAxis]="{ title: t.life, min: 50 }"
  [maxSize]="64"
  [height]="320"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": {
    "gdp": "GDP per capita (k$)",
    "life": "Life expectancy",
    "names": ["Japan", "France", "China", "Brazil", "India", "Nigeria", "Germany", "Mexico"]
  },
  "zh": {
    "gdp": "人均 GDP（千美元）",
    "life": "预期寿命",
    "names": ["日本", "法国", "中国", "巴西", "印度", "尼日利亚", "德国", "墨西哥"]
  },
  "ja": {
    "gdp": "1 人あたり GDP（千ドル）",
    "life": "平均寿命",
    "names": ["日本", "フランス", "中国", "ブラジル", "インド", "ナイジェリア", "ドイツ", "メキシコ"]
  },
  "fr": {
    "gdp": "PIB par habitant (k$)",
    "life": "Espérance de vie",
    "names": ["Japon", "France", "Chine", "Brésil", "Inde", "Nigeria", "Allemagne", "Mexique"]
  }
};
}

```

## Example: 产品组合

各产品的市场份额、市场增长率和收入，两条参考线把图分成四个象限；showLabels 在气泡周围写出名称。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnBubbleChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnBubbleChart],
  template: `
@let t = labels[language()];
<mn-bubble-chart
  [series]="[
    { name: t.assets[0], data: [{ x: 4, y: 3, value: 30 }] },
    { name: t.assets[1], data: [{ x: 15, y: 7, value: 25 }] },
    { name: t.assets[2], data: [{ x: 12, y: 6, value: 20 }] },
    { name: t.assets[3], data: [{ x: 28, y: 12, value: 15 }] },
    { name: t.assets[4], data: [{ x: 16, y: 4, value: 5 }] },
    { name: t.assets[5], data: [{ x: 45, y: 18, value: 5 }] }
  ]"
  [xAxis]="{ title: t.risk }"
  [yAxis]="{ title: t.return }"
  [height]="300"
  (pointClick)="selected = $event.items[0] ? $event.items[0].seriesName + ': ' + $event.items[0].value + ' %' : selected"
/>
<output aria-live="polite">{{ selected || t.hint }}</output>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  selected = "";
  labels = {
  "en": {
    "risk": "Risk (volatility %)",
    "return": "Expected return %",
    "hint": "Click a bubble",
    "assets": ["Bonds", "Index fund", "Real estate", "Tech stocks", "Gold", "Start-ups"]
  },
  "zh": {
    "risk": "风险（波动率 %）",
    "return": "预期收益 %",
    "hint": "点击一个气泡",
    "assets": ["债券", "指数基金", "房地产", "科技股", "黄金", "初创企业"]
  },
  "ja": {
    "risk": "リスク（ボラティリティ %）",
    "return": "期待リターン %",
    "hint": "バブルをクリックします",
    "assets": ["債券", "インデックスファンド", "不動産", "ハイテク株", "金", "スタートアップ"]
  },
  "fr": {
    "risk": "Risque (volatilité %)",
    "return": "Rendement attendu %",
    "hint": "Cliquez sur une bulle",
    "assets": ["Obligations", "Fonds indiciel", "Immobilier", "Actions tech", "Or", "Start-up"]
  }
};
}

```
