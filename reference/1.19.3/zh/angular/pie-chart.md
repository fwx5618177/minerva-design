# 饼图 / 环形图

展示整体中各部分的占比：饼图、环形图（中心可显示总计）和南丁格尔玫瑰图。适合少量类别（建议不超过 8 个）、更关注占比而非精确比较的场景。悬停或使用方向键高亮扇区，Esc 清除；点击图例项可隐藏对应扇区。

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

自然搜索

直接访问

社交媒体

付费广告

外链引荐

电子邮件

{{sessions}} 次会话 · {{share}}

最近 30 天按流量来源统计的网站会话

{{source}}：{{sessions}} 次会话（占流量的 {{share}}）

点击一个扇区（或聚焦图表后按 Enter）以选择来源

企业版

商业版

专业版

入门版

月收入

按套餐统计的月度经常性收入

电子邮件

在线客服

网页表单

电话

社交媒体

社区

标签位置

外部

内部

无

标签内容

名称

数值

百分比

{{tickets}} 个工单 · {{share}}

按渠道统计的支持工单

月平均降水量

其他

出货量

{{units}} 台 · {{share}}

各厂商的智能手机市场份额

居住

饮食

交通

休闲

房租

水电燃气

保险

食品杂货

餐馆

公共交通

汽车

旅行

订阅

运动

按明细项统计的月度预算

按类别统计的月度预算

{{name}}：{{amount}}（{{share}}）

悬停在环上查看类别或明细项

亚太

欧洲

北美

拉丁美洲

手机

桌面

平板

{{region}}按设备统计的会话

美国股票

国际股票

债券

房地产

大宗商品

现金

显示的资产类别

全部显示

所选

总市值

占投资组合的 {{share}}

按资产类别划分的投资组合

显示 {{total}} 个资产类别中的 {{shown}} 个：{{value}}，占投资组合的 {{share}}。

深色模式

离线模式

公开 API

更多集成

自定义报表

我们接下来应该开发哪个功能？

票

{{votes}} 票 · {{share}}

按选项划分的实时投票结果

暂停

继续

重置

领先：{{answer}}

计算

数据库

存储

网络

虚拟机

Kubernetes

无服务器函数

SQL 数据库

NoSQL 数据库

内存缓存

对象存储

块存储

备份

数据传输

CDN

负载均衡器

云账单

全部类别

点击查看其服务

按服务划分的{{category}}费用

按类别划分的月度云账单

{{service}}：{{amount}}，占{{category}}的 {{share}}。

{{category}}：{{amount}}，占账单的 {{share}}。点击某项服务查看其占比。

月度账单：{{total}}。点击某个类别查看其服务。

非常不满意

不满意

一般

满意

非常满意

第 {{n}} 季度

季度

CSAT

{{answers}} 份回答 · {{share}}

{{quarter}}的客户满意度回答

CSAT 为 {{csat}}，共 {{respondents}} 位受访者。

CSAT 为 {{csat}}，较{{previous}}变化 {{delta}} 个百分点，共 {{respondents}} 位受访者。

## DonutChart

Support: beta

Native Angular: MnDonutChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnDonutChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "data",
    "typeText": "readonly ShapeDatum[]",
    "required": true,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "innerRadius",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "startAngle",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "padAngle",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "cornerRadius",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "rose",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "labels",
    "typeText": "\"none\" | \"outside\" | \"inside\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "labelContent",
    "typeText": "readonly (\"value\" | \"percent\" | \"name\")[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "centerValue",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "centerLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "renderer",
    "typeText": "ChartRendererPreference | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "palette",
    "typeText": "readonly string[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "legend",
    "typeText": "boolean | ShapeLegendOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "tooltip",
    "typeText": "boolean | ShapeTooltipOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "format",
    "typeText": "((value: number) => string) | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "percentFormat",
    "typeText": "((share: number) => string) | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "hidden",
    "typeText": "readonly number[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "animation",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "padding",
    "typeText": "ChartPadding | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "texts",
    "typeText": "Partial<ShapeChartLabels> | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "typeText": "ShapeHoverEvent | null",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ShapeHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "itemClick",
    "typeText": "ShapeHoverEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ShapeHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "visibilityChange",
    "typeText": "ShapeToggleEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ShapeToggleEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## PieChart

Support: beta

Native Angular: MnPieChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnPieChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "data",
    "typeText": "readonly ShapeDatum[]",
    "required": true,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "innerRadius",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "startAngle",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "padAngle",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "cornerRadius",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "rose",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "labels",
    "typeText": "\"none\" | \"outside\" | \"inside\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "labelContent",
    "typeText": "readonly (\"value\" | \"percent\" | \"name\")[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "centerValue",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "centerLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "renderer",
    "typeText": "ChartRendererPreference | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "palette",
    "typeText": "readonly string[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "legend",
    "typeText": "boolean | ShapeLegendOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "tooltip",
    "typeText": "boolean | ShapeTooltipOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "format",
    "typeText": "((value: number) => string) | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "percentFormat",
    "typeText": "((share: number) => string) | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "hidden",
    "typeText": "readonly number[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "animation",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "padding",
    "typeText": "ChartPadding | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "texts",
    "typeText": "Partial<ShapeChartLabels> | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "typeText": "ShapeHoverEvent | null",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ShapeHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "itemClick",
    "typeText": "ShapeHoverEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ShapeHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "visibilityChange",
    "typeText": "ShapeToggleEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ShapeToggleEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Traffic sources

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnPieChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnPieChart],
  template: `
@let t = labels[language()];
<mn-pie-chart
  [data]="[
    { name: t[0], value: 1048 },
    { name: t[1], value: 735 },
    { name: t[2], value: 580 },
    { name: t[3], value: 484 },
    { name: t[4], value: 300 }
  ]"
  [height]="300"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": ["Search", "Direct", "Social", "Email", "Referral"],
  "zh": ["搜索", "直接访问", "社交媒体", "邮件", "推荐"],
  "ja": ["検索", "ダイレクト", "ソーシャル", "メール", "参照元"],
  "fr": ["Recherche", "Direct", "Réseaux sociaux", "E-mail", "Référents"]
};
}

```

## Example: 带总计的环形图

centerValue 和 centerLabel 在中心显示总计；onHover 将其替换为当前悬停的套餐，因此关闭了提示框。legend.toggle 设为 false，保证总计始终与可见扇区一致。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnDonutChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnDonutChart],
  template: `
@let t = labels[language()];
<mn-donut-chart
  [data]="[
    { name: t.plans[0], value: 2 },
    { name: t.plans[1], value: 18 },
    { name: t.plans[2], value: 46 },
    { name: t.plans[3], value: 34 }
  ]"
  centerValue="€100k"
  [centerLabel]="t.total"
  [height]="300"
  (itemClick)="selected = $event.name + ': €' + $event.value + 'k'"
/>
<output aria-live="polite">{{ selected || t.hint }}</output>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  selected = "";
  labels = {
  "en": {
    "total": "monthly revenue",
    "hint": "Click a slice",
    "plans": ["Free", "Starter", "Pro", "Enterprise"]
  },
  "zh": {
    "total": "月收入",
    "hint": "点击一个扇区",
    "plans": ["免费版", "入门版", "专业版", "企业版"]
  },
  "ja": {
    "total": "月間売上",
    "hint": "スライスをクリックします",
    "plans": ["無料", "スターター", "プロ", "エンタープライズ"]
  },
  "fr": {
    "total": "revenu mensuel",
    "hint": "Cliquez sur une part",
    "plans": ["Gratuit", "Starter", "Pro", "Entreprise"]
  }
};
}

```
