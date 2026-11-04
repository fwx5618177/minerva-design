# 箱线图

用中位数、四分位数、须线和离群值比较分布，可基于原始样本或已计算的统计量。离群值显示为系列颜色的空心圆环，悬停即可查看其数值和所属分组。

Package: minerva-design@1.20.6

Renderer: angular

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.6",
  "sourceCommit": "63ce45656d8f3d1bfbee71026e84674640ae9abf",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:fa9a782f68a5d5b512762e2152b2ad065da3de6937bac96eef63709ddba3b95b"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.6/types.json) or getType() from minerva-design/contracts.

## Documentation

网关

认证

搜索

结账

推荐

图片

响应时间

最大值

上四分位数

中位数

下四分位数

最小值

离群值

各服务响应时间的分布

年薪

初级开发

开发工程师

高级开发

技术负责人

研发经理

各职位的薪资分布

工作日

周末

巴黎

里昂

马赛

里尔

配送时长（小时）

各城市工作日与周末的配送时长

日最高气温

平均值

每月日最高气温的分布

代码检查

单元测试

集成测试

端到端测试

发布

须线范围

1.5 × IQR

3 × IQR

最小 – 最大

离群值形状

空心

实心

{{value}} 次构建显示为离群值

构建时长

各 CI 流水线构建时长的分布

点击箱体或离群值。

{{day}}：一位患者等待了 {{value}}。

{{day}}：等待时间中位数 {{median}}，一半患者等待 {{q1}} 至 {{q3}}，离群值 {{outliers}} 个。

等待时间

四小时目标

急诊室每周各天等待时间的分布

样式表

脚本

字体

图片

视频

对数刻度

{{value}} 个文件超过 {{budget}} 的预算。

文件大小

预算

网站文件大小按类型的分布

美国东部

美国西部

欧洲西部

亚太南部

南美东部

暂停

继续

{{regions}} 的 SLA 存在风险

所有区域均满足 SLA

延迟

SLA

各区域请求延迟的实时分布

## BoxPlotChart

Support: beta

Native Angular: MnBoxPlotChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnBoxPlotChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "series",
    "typeText": "readonly ChartSeries[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "groups",
    "typeText": "readonly BoxplotGroup[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "name",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "whisker",
    "typeText": "number | \"minmax\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "outlierShape",
    "typeText": "\"filled\" | \"hollow\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "outlierSize",
    "typeText": "number | undefined",
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

## Example: 各服务的响应时间

groups 接收每个箱子的原始样本：自动计算四分位数、须线（1.5 倍四分位距）和离群值；tooltip.labels 翻译提示框中的各行名称。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnBoxPlotChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnBoxPlotChart],
  template: `
@let t = labels[language()];
<mn-box-plot-chart
  [groups]="[
    { x: t.services[0], values: samples[0] },
    { x: t.services[1], values: samples[1] },
    { x: t.services[2], values: samples[2] },
    { x: t.services[3], values: samples[3] }
  ]"
  [name]="t.time"
  [xAxis]="{ type: 'category' }"
  [yAxis]="{ title: t.time }"
  [height]="300"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  samples = [
  [42, 48, 51, 55, 57, 60, 62, 66, 70, 75, 140],
  [120, 135, 150, 160, 168, 175, 190, 210, 230, 380],
  [30, 32, 35, 36, 38, 40, 41, 43, 47, 52],
  [60, 75, 88, 96, 105, 118, 126, 140, 160, 190, 260]
];
  labels = {
  "en": {
    "time": "Response time (ms)",
    "services": ["Search", "Checkout", "Profile", "Images"]
  },
  "zh": {
    "time": "响应时间（毫秒）",
    "services": ["搜索", "结账", "个人资料", "图片"]
  },
  "ja": {
    "time": "応答時間（ms）",
    "services": ["検索", "決済", "プロフィール", "画像"]
  },
  "fr": {
    "time": "Temps de réponse (ms)",
    "services": ["Recherche", "Paiement", "Profil", "Images"]
  }
};
}

```

## Example: 水平

已计算好的统计量（每个箱子一个数据点，含 low、q1、作为中位数的 y、q3、high 和 outliers），通过 orientation: "horizontal" 按行排列。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnBoxPlotChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnBoxPlotChart],
  template: `
@let t = labels[language()];
<mn-box-plot-chart
  [groups]="[
    { x: t.classes[0], values: scores[0] },
    { x: t.classes[1], values: scores[1] },
    { x: t.classes[2], values: scores[2] }
  ]"
  [name]="t.score"
  orientation="horizontal"
  whisker="minmax"
  [xAxis]="{ type: 'category' }"
  [yAxis]="{ min: 0, max: 100 }"
  [height]="240"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  scores = [
  [55, 61, 64, 68, 70, 72, 75, 78, 81, 86, 92],
  [40, 52, 58, 63, 66, 71, 73, 77, 84, 95],
  [62, 66, 69, 70, 72, 74, 75, 77, 79, 83]
];
  labels = {
  "en": {
    "score": "Score",
    "classes": ["Class A", "Class B", "Class C"]
  },
  "zh": {
    "score": "分数",
    "classes": ["一班", "二班", "三班"]
  },
  "ja": {
    "score": "得点",
    "classes": ["A 組", "B 組", "C 組"]
  },
  "fr": {
    "score": "Note",
    "classes": ["Classe A", "Classe B", "Classe C"]
  }
};
}

```
