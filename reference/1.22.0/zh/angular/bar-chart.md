# 柱状图

并排分组或堆叠的柱状图，可叠加折线。

Package: minerva-design@1.22.0

Renderer: angular

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.0",
  "sourceCommit": "330c90a7382a7141543dcdad732a4da31d58a37e",
  "sourceDigest": "sha256:cbdfa6292d29dec33adda7a3e9cf0e027da50858956b8d08e3f7f3ed59c8d78a",
  "referenceSourceDigest": "sha256:e3be8c06635194769da4944bbccaf8bcffec3fe4bddbd369b74caf5e4553345b"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.0/types.json) or getType() from minerva-design/contracts.

## Documentation

第{{n}}季度

已关闭工单

每季度关闭的支持工单数

订单

7 日均值

天

每日订单数及其 7 日均值

2025 与 2026 年的季度收入

推荐者

被动者

贬损者

北美

欧洲

亚太

拉丁美洲

中东

各地区推荐者、被动者与贬损者的占比

网站

移动应用

合作伙伴

按渠道堆叠的每月订单数

销量

每季度销量

{{quarter}}：{{units}} 件

点按一根柱子

堆叠

分组

按渠道和月份的订单数

伦敦

东京

巴黎

伦敦、东京与巴黎的月平均降水量

净利润

每月净利润，盈利在零线以上，亏损在零线以下

销量

各国线上销量，从高到低

新客户

第{{n}}周

每周目标

每周新客户数与每周目标对比

{{total}} 周中有 {{reached}} 周达标（{{rate}}）。

收入

{{month}}：{{value}}

返回季度

点击某个季度查看其各月数据。

{{quarter}}：合计 {{value}}。点击某个月份查看其收入。

2026 年各季度收入；点击某个季度查看其各月数据

2026 年 {{quarter}} 各月收入

工程

产品

设计

销售

市场

支持

去年

今年

变化

与去年对比

各部门今年与去年的招聘人数

成功

已回滚

变更冻结

八周内每天的生产部署次数，分为成功与回滚

每个工作日 {{perDay}} 次部署，变更失败率 {{failure}}。

低谷

平段

高峰

充电

日均价

充电时长

{{energy}} kWh · {{duration}}

建议在 {{start}} 至 {{end}} 充电，费用 {{cost}}，比 {{plugIn}} 插上电立即充电节省 {{saving}}。

每 MWh 电价

明天每小时的日前电价，并突出显示电动车最便宜的充电时段

## BarChart

Support: beta

Native Angular: MnBarChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnBarChart"
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
    "name": "labels",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "orientation",
    "typeText": "ChartOrientation | undefined",
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

## Example: 分组

未设置 stacked 时，多个系列在每个类目中并排显示，这里是三座城市的月降水量；单位由 Intl.NumberFormat 书写。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnBarChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnBarChart],
  template: `
@let t = labels[language()];
<mn-bar-chart
  [series]="[
    { name: t.lastYear, data: lastYear },
    { name: t.thisYear, data: thisYear }
  ]"
  labels
  [xAxis]="{ type: 'category', categories: t.regions }"
  [height]="280"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  lastYear = [38, 52, 61, 45];
  thisYear = [44, 58, 72, 49];
  labels = {
  "en": {
    "lastYear": "2024",
    "thisYear": "2025",
    "regions": ["North", "South", "East", "West"]
  },
  "zh": {
    "lastYear": "2024 年",
    "thisYear": "2025 年",
    "regions": ["华北", "华南", "华东", "西部"]
  },
  "ja": {
    "lastYear": "2024年",
    "thisYear": "2025年",
    "regions": ["北部", "南部", "東部", "西部"]
  },
  "fr": {
    "lastYear": "2024",
    "thisYear": "2025",
    "regions": ["Nord", "Sud", "Est", "Ouest"]
  }
};
}

```

## Example: 堆叠

stacked 将各系列逐层堆叠。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnBarChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnBarChart],
  template: `
@let t = labels[language()];
<mn-bar-chart
  [series]="[
    { name: t.desktop, data: desktop },
    { name: t.mobile, data: mobile },
    { name: t.tablet, data: tablet }
  ]"
  stacked
  [xAxis]="{ type: 'category', categories: t.days }"
  [height]="280"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  desktop = [320, 302, 341, 374, 390, 210, 180];
  mobile = [420, 432, 401, 454, 490, 630, 610];
  tablet = [80, 72, 71, 84, 90, 130, 120];
  labels = {
  "en": {
    "desktop": "Desktop",
    "mobile": "Mobile",
    "tablet": "Tablet",
    "days": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  },
  "zh": {
    "desktop": "桌面端",
    "mobile": "移动端",
    "tablet": "平板",
    "days": ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
  },
  "ja": {
    "desktop": "デスクトップ",
    "mobile": "モバイル",
    "tablet": "タブレット",
    "days": ["月", "火", "水", "木", "金", "土", "日"]
  },
  "fr": {
    "desktop": "Ordinateur",
    "mobile": "Mobile",
    "tablet": "Tablette",
    "days": ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."]
  }
};
}

```
