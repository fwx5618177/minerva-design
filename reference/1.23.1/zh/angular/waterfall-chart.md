# 瀑布图

展示一系列增减如何把数值从起点带到终点，并带有小计和合计：利润桥、现金流、差异分析。细虚线连接每根柱子与下一根柱子。

Package: minerva-design@1.23.1

Renderer: angular

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "6ccf4f2c7a65dd5b27e517c9a50ea4867f8e7980",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:3616b5d4e7cf7e0eb1fbe04c879d1630cc3dfd5c28f16762b8ad6f3f3525ef82"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

收入

销售成本

毛利

研发费用

市场费用

管理费用

营业利润

利息

税费

净利润

金额

从收入到净利润的利润表

期初

期末

净现金流

从期初余额到期末余额的每月净现金流

预算

实际

销量

价格

产品组合

汇率

原材料

节约

差异

预算利润与实际利润之间差异的因素

年初

年末

招聘

内部调入

离职

内部调出

退休

人数

全年人数变动

期初 ARR

新业务

扩展

收缩

流失

期末 ARR

ARR

季度

第{{n}}季度

{{quarter}}：净新增 ARR {{net}} · 净收入留存率 {{nrr}}

{{quarter}}的 ARR 桥图

标价

经销商折扣

促销

发票价

付款条件

运费

批量返利

到手价

单价

点击柱子与标价比较

{{step}}：{{value}}，占标价的 {{share}}

从标价到到手价的价格瀑布

2019 年基准

业务增长

能效提升

可再生电力

电动车队

制冷剂

收购

2025 年

2030 年目标

{{value}} 千吨 CO₂e

排放量

变化：{{value}}

从 {{from}} 到 {{to}}

高于 2030 年目标 {{value}}

从 2019 年基准到 2025 年的排放桥图

订单录入

信用审核

拣货

质检

等待承运商

运输

清关

交付周期

耗时

作业

等待

作业占 {{total}} 中的 {{work}}（{{share}}）

按环节划分的订单交付周期

此前

当前

余额

客户付款

供应商发票

工资发放

刷卡手续费

退款

最新：{{time}} · {{kind}} {{amount}}

暂停

继续

当天资金头寸，实时更新

已承诺

新增

移除

重新估算

顺延

已完成

故事点

方向

纵向

横向

标签

连接线

冲刺范围：从承诺到完成的故事点

## WaterfallChart

Support: beta

Native Angular: MnWaterfallChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnWaterfallChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "steps",
    "typeText": "readonly WaterfallStep[]",
    "required": true,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "name",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "upColor",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "downColor",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "totalColor",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "start",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "labels",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "format",
    "typeText": "((value: number) => string) | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "connector",
    "typeText": "boolean | ChartConnectorOptions | undefined",
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

## Example: 损益桥

从收入到净利润：每个变动从上一个柱子的终点开始，小计和合计柱从零显示累计值；标签显示变动值。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnWaterfallChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnWaterfallChart],
  template: `
@let s = steps[language()];
<mn-waterfall-chart
  [steps]="[
    { label: s[0], value: 420 },
    { label: s[1], value: -180 },
    { label: s[2], kind: 'subtotal' },
    { label: s[3], value: -130 },
    { label: s[4], value: 25 },
    { label: s[5], value: -34 },
    { label: s[6], kind: 'total' }
  ]"
  [height]="320"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  steps = {
  "en": ["Revenue", "Cost of sales", "Gross profit", "Operating costs", "Other income", "Taxes", "Net income"],
  "zh": ["营业收入", "销售成本", "毛利润", "运营费用", "其他收入", "税费", "净利润"],
  "ja": ["売上高", "売上原価", "売上総利益", "営業費用", "その他収益", "税金", "純利益"],
  "fr": ["Chiffre d’affaires", "Coût des ventes", "Marge brute", "Charges d’exploitation", "Autres produits", "Impôts", "Résultat net"]
};
}

```

## Example: 现金流

start 设置期初余额，由第一个小计显示；各月加上净现金流，最后以期末余额结束；yAxis.min 放大变动部分。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnWaterfallChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnWaterfallChart],
  template: `
@let t = labels[language()];
@let m = months[language()];
<mn-waterfall-chart
  [steps]="[
    { label: t.opening, value: 120 },
    { label: m[0], value: 18 },
    { label: m[1], value: -12 },
    { label: m[2], value: 25 },
    { label: m[3], value: -30 },
    { label: m[4], value: 14 },
    { label: m[5], value: 9 },
    { label: t.closing, kind: 'total' }
  ]"
  [labels]="false"
  orientation="horizontal"
  [height]="360"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": {
    "opening": "Opening",
    "closing": "Closing"
  },
  "zh": {
    "opening": "期初",
    "closing": "期末"
  },
  "ja": {
    "opening": "期首",
    "closing": "期末"
  },
  "fr": {
    "opening": "Ouverture",
    "closing": "Clôture"
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
