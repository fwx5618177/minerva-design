# 子弹图

紧凑的 KPI 条形图（Stephen Few）：每一行用条形表示实际值，背后是定性区间（不同深浅的灰色，越差越深），并用标记表示目标，每行使用各自的刻度。不同行可以使用不同单位，因此仪表盘能在很小的空间内展示许多 KPI。悬停某一行或使用方向键可查看其数值、目标和所在区间。

Package: minerva-design@1.23.1

Renderer: angular

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "a59b0af81a2f5c6e7f2de29a81878dc4a5af01f1",
  "sourceDigest": "sha256:5b7fa63ef8772ff533e1fc34d0784bfe651eb0b1be71712d0bbef057eec2b4cf",
  "referenceSourceDigest": "sha256:1019806d6e262e50fb4e804e528badf35a408ce0a47ef203c2c5d8930c0fb0f1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

收入

千美元

利润率

占收入的 %

平均订单金额

美元

新客户

人数

满意度

满分 5 分

差

中

好

违约

有风险

健康

本季度至今的销售 KPI 与目标对比

结算

搜索

移动端

平台

增长

数据

各团队交付的故事点与承诺值的对比

可用性

请求成功率 %

Apdex

得分，0–1

吞吐量

请求 / 秒

错误预算

剩余 %

本月 API 的服务等级目标

访客

千人

注册

账号数

激活率

占注册的 %

月经常性收入

千美元

月份

所选月份的增长 KPI 与目标对比

企业客户在签约后 30 天内完成上线部署的比例

新客户占比 %

优先级工单在一个工作小时内得到首次响应的比例

工单占比 %

未引发任何客户可感知故障的生产环境发布占比

发布占比 %

年度订阅合同的净收入留存率（含扩容与流失）

比率

名称较长的运营 KPI 与目标对比

市场

研发

销售

人力资源

行政后勤

差旅

年度预算：{{budget}}

宽裕

紧张

超出计划

有 {{over}} 个部门支出快于计划。点击某行查看其偏差。

{{department}}超出计划：截至第三季度末偏差 {{variance}}，已使用年度预算的 {{share}}，剩余 {{left}}。

{{department}}在计划之内：截至第三季度末偏差 {{variance}}，已使用年度预算的 {{share}}，剩余 {{left}}。

第三季度末各部门支出与当期计划预算的对比

进风温度

湿度

功耗

风扇转速

°C

相对湿度 %

每机柜 kW

最大转速的 %

正常

警告

严重

实时读数

机房传感器读数与设定值及阈值的对比

需要关注：{{sensors}}

所有传感器均在限值范围内。

周跑量

长距离跑

累计爬升

训练次数

睡眠

计划：{{plan}}

低于计划

符合计划

高于计划

跑者

阿玛拉

卢卡斯

小美

{{value}}，计划 {{plan}}（{{share}}）

{{runner}} 的每周训练与计划对比

{{runner}} 完成了 {{metrics}} 项每周目标中的 {{met}} 项。

研发

销售

客户支持

市场

产品

财务

今年计划 {{plan}} 人

落后

追赶中

按计划

排序

计划顺序

最落后的在前

最领先的在前

各团队招聘人数与年度编制计划的对比

所显示的 {{teams}} 个团队已招聘 {{hired}} 人，计划 {{planned}} 人（{{share}}）。

未显示任何团队。

## BulletChart

Support: beta

Native Angular: MnBulletChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnBulletChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "data",
    "typeText": "readonly BulletDatum[]",
    "required": true,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "orientation",
    "typeText": "\"horizontal\" | \"vertical\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "ranges",
    "typeText": "readonly number[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "rangeLabels",
    "typeText": "readonly string[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "rangeColors",
    "typeText": "readonly string[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "targetColor",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: KPIs against targets

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnBulletChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnBulletChart],
  template: `
@let t = labels[language()];
<mn-bullet-chart
  [data]="[
    { name: t.kpis[0], value: 270, target: 250, ranges: [150, 225, 300] },
    { name: t.kpis[1], value: 22.5, target: 26, ranges: [20, 25, 30] },
    { name: t.kpis[2], value: 1650, target: 2100, ranges: [1000, 2000, 2500] },
    { name: t.kpis[3], value: 4.4, target: 4.5, ranges: [3.5, 4.25, 5] }
  ]"
  [rangeLabels]="t.ranges"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": {
    "kpis": ["Revenue (k€)", "Profit (%)", "Orders", "Satisfaction"],
    "ranges": ["Poor", "Fair", "Good"]
  },
  "zh": {
    "kpis": ["营收（千欧元）", "利润率（%）", "订单数", "满意度"],
    "ranges": ["差", "一般", "良好"]
  },
  "ja": {
    "kpis": ["売上（千ユーロ）", "利益率（%）", "注文数", "満足度"],
    "ranges": ["不良", "普通", "良好"]
  },
  "fr": {
    "kpis": ["Chiffre d’affaires (k€)", "Marge (%)", "Commandes", "Satisfaction"],
    "ranges": ["Faible", "Correct", "Bon"]
  }
};
}

```

## Example: 纵向

orientation="vertical" 将行变为列，这里展示各团队交付的故事点与承诺值的对比。通过图表的 ranges 属性让所有列共用同一组区间；barSize 让条形更粗。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnBulletChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnBulletChart],
  template: `
@let q = quarters[language()];
<mn-bullet-chart
  [data]="[
    { name: q[0], value: 82, target: 90 },
    { name: q[1], value: 95, target: 90 },
    { name: q[2], value: 71, target: 100 },
    { name: q[3], value: 104, target: 100 }
  ]"
  orientation="vertical"
  [ranges]="[60, 90, 120]"
  targetColor="var(--danger-color, #dc2626)"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  quarters = {
  "en": ["Q1", "Q2", "Q3", "Q4"],
  "zh": ["第一季度", "第二季度", "第三季度", "第四季度"],
  "ja": ["第 1 四半期", "第 2 四半期", "第 3 四半期", "第 4 四半期"],
  "fr": ["T1", "T2", "T3", "T4"]
};
}

```
