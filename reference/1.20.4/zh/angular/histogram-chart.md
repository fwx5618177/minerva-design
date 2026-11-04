# 直方图

把原始样本按等宽区间统计分布，从几百个值到数百万个值都适用。

Package: minerva-design@1.20.4

Renderer: angular

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "c389776dc1aa3bf80277d9c47f2c62d8f235e947",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:96f9f31e7015b805e8eece3c05731306a461013443150c08b7b7a91a3bfc1bb6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

## Documentation

请求数

一百万个请求延迟的分布及 p50、p95 和 p99

分箱规则

自动

Sturges

10 个分箱

40 个分箱

学生

分数

考试分数的分布

客户

年龄

客户的年龄分布

对照组

新版引导

会话时长（分钟）

A/B 测试两组的会话时长

正态拟合

规格下限

规格上限

名义值

已调整刀具

均值 {{mean}}，σ {{sd}}，Cpk {{cpk}}，超差 {{ppm}} ppm：

能力充足

能力不足

零件

直径

轴直径分布，含规格界限和拟合的正态曲线

包邮

中位数 {{value}}

p99 {{value}}

{{share}} 的订单达到 {{threshold}} 的包邮门槛。

订单

订单金额（对数刻度）

对数刻度下的订单金额分布

暂停

继续

重置

{{share}} 的电话在 {{target}} 内接听，p90 为 {{p90}}：

达到目标

未达目标

电话

等待时间

目标

p90

最近 600 通客服电话等待时间的实时分布

{{share}} 的员工

{{value}} 名员工（{{share}}）

点击查看累计占比

点击柱子，查看通勤时间更短的员工占比。

{{share}} 的员工（{{employees}} 人）通勤时间不超过 {{limit}}。

员工

单程通勤时间

员工通勤时间分布

## HistogramChart

Support: beta

Native Angular: MnHistogramChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnHistogramChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "values",
    "typeText": "ArrayLike<number>",
    "required": true,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "bins",
    "typeText": "HistogramBinning | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "domain",
    "typeText": "readonly [number, number] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "nice",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "name",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "color",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "formatBin",
    "typeText": "((value: number) => string) | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "series",
    "typeText": "readonly ChartSeries[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 延迟分布

一百万个请求延迟在几毫秒内完成分箱；quantiles 计算精确的 p50、p95 和 p99，并绘制为 x 参考线。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnHistogramChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnHistogramChart],
  template: `
@let t = labels[language()];
<mn-histogram-chart
  [values]="latency"
  [name]="t.requests"
  [xAxis]="{ title: t.ms }"
  [height]="300"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  latency = Array.from({ length: 5000 }, (_, i) => Math.round(Math.exp(4.8 + 0.35 * Math.sqrt(-2 * Math.log(1 - (Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1))) * Math.cos(2 * Math.PI * (Math.abs(Math.sin(i * 78.233) * 43758.5453) % 1)))));
  labels = {
  "en": {
    "requests": "Requests",
    "ms": "Response time (ms)"
  },
  "zh": {
    "requests": "请求数",
    "ms": "响应时间（毫秒）"
  },
  "ja": {
    "requests": "リクエスト数",
    "ms": "応答時間（ms）"
  },
  "fr": {
    "requests": "Requêtes",
    "ms": "Temps de réponse (ms)"
  }
};
}

```

## Example: 分箱规则

bins 接受数量或规则：auto（Freedman-Diaconis，对离群值稳健）、sturges（log2 n + 1）或固定数量；分箱足够多时能看出两组水平。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnHistogramChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnHistogramChart],
  template: `
@let t = labels[language()];
<div style="display: flex; gap: 8px; align-items: center">
  <span>{{ t.bins }}</span>
  <button type="button" (click)="bins = 'sturges'">Sturges</button>
  <button type="button" (click)="bins = 10">10</button>
  <button type="button" (click)="bins = 40">40</button>
</div>
<mn-histogram-chart
  [values]="ages"
  [bins]="bins"
  [name]="t.count"
  [xAxis]="{ title: t.age }"
  [height]="280"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  bins: number | 'sturges' = "sturges";
  ages = Array.from({ length: 2000 }, (_, i) => Math.round((i % 3 ? 42 : 22) + ((Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1) + (Math.abs(Math.sin(i * 78.233) * 43758.5453) % 1) - 1) * (i % 3 ? 16 : 6)));
  labels = {
  "en": {
    "count": "Count",
    "bins": "Bins:",
    "age": "Age"
  },
  "zh": {
    "count": "人数",
    "bins": "分箱：",
    "age": "年龄"
  },
  "ja": {
    "count": "人数",
    "bins": "ビン：",
    "age": "年齢"
  },
  "fr": {
    "count": "Effectif",
    "bins": "Classes :",
    "age": "Âge"
  }
};
}

```
