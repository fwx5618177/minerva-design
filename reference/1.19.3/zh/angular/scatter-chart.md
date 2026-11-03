# 散点图

由两个值定位的点，每个点可设置大小、颜色和标签。两个轴均可缩放。

Package: minerva-design@1.19.3

Renderer: angular

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "1b65455cccbdd71bb609d7d859b1ef90f9e604c6",
  "sourceDigest": "sha256:a8b34eea01e9133306bb1fde48e7966deaaaa35d87c2dfd2e181d891c65e01c1",
  "referenceSourceDigest": "sha256:d3ed05a4228bc39ff766871c13b5ba292792f934f6ebc3d0d29af28589be129c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

入门版

商业版

席位数

月度账单

各套餐的月度账单与席位数关系

国家

人均 GDP

预期寿命

预期寿命与人均 GDP 的关系；点的大小表示人口

簇 {{name}}

两个各含 100,000 个点的簇

{{points}} 个点 · 使用 {{renderer}} 绘制

会话时长与浏览页数的关系

分钟

页数

免费版

专业版

{{plan}}：{{minutes}} 分钟，{{pages}} 页

点按一个点

广告活动

趋势

每周广告支出

每周收入

R² = {{r2}} · 每投入 1 美元带来 +{{slope}} 收入

60 个广告活动的收入与广告支出关系，含趋势线

阿德利企鹅

帽带企鹅

巴布亚企鹅

鳍肢长度

体重

三种企鹅的鳍肢长度与体重

请求

异常值

预期

负载大小

响应时间

响应时间与负载大小的关系，异常值为红色

{{total}} 个请求中有 {{slow}} 个耗时超过预期的两倍。

读数

凉爽夜间

适宜生长区间

炎热午后

显示全部

温度

相对湿度

适宜生长区间

温室传感器的温度与湿度读数

可见范围：{{t0}} – {{t1}}，湿度 {{h0}} – {{h1}} · 视图内读数：{{points}}

选择一个区域，或使用 Ctrl / ⌘ + 滚轮缩放

工程

销售

客服

司龄

绩效评分（1–5）

公司平均

按部门划分的 90 名员工的司龄与绩效评分

{{id}} · {{department}} · {{tenure}} · 评分 {{score}} · 年薪 {{salary}}

点击圆点选中一名员工，点击空白绘图区清除选择

球员

联盟平均

高效得分手

高出手低效率

场均 {{value}} 分

球权使用率：{{value}}

真实命中率：{{value}}

球权使用率

真实命中率

16 名球员的球权使用率与投篮效率；圆点大小表示场均得分

正常

告警

最新

{{value}} mm/s

暂停

继续

最新样本：{{rpm}} rpm，{{value}} · 屏幕上的告警：{{alarms}}

转速（rpm）

振动

告警阈值

电机振动随转速变化的实时数据

哺乳动物

鼩鼱

小鼠

大鼠

兔

猫

狗

人

猪

马

牛

长颈鹿

大象

幂律拟合

{{value}} kg

{{value}} W

体重

基础代谢率

代谢率 ∝ 体重^{{exponent}}（克莱伯定律）

12 种哺乳动物的基础代谢率与体重，双对数坐标轴

## ScatterChart

Support: beta

Native Angular: MnScatterChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnScatterChart"
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

## Example: Two clusters

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnScatterChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnScatterChart],
  template: `
@let t = labels[language()];
<mn-scatter-chart
  [series]="[
    { name: t.teamA, data: teamA },
    { name: t.teamB, data: teamB }
  ]"
  [xAxis]="{ title: t.hours }"
  [yAxis]="{ title: t.score }"
  [height]="300"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  teamA = [
  {
    "x": 17.05,
    "y": 66.86
  },
  {
    "x": 11.05,
    "y": 53.86
  },
  {
    "x": 8.21,
    "y": 59.23
  },
  {
    "x": 17.99,
    "y": 70.85
  },
  {
    "x": 7.8,
    "y": 62.49
  },
  {
    "x": 11.6,
    "y": 53.03
  },
  {
    "x": 16.73,
    "y": 63.83
  },
  {
    "x": 6.1,
    "y": 70.5
  },
  {
    "x": 15.14,
    "y": 57.98
  },
  {
    "x": 13.72,
    "y": 54.53
  },
  {
    "x": 6.57,
    "y": 67.94
  },
  {
    "x": 17.52,
    "y": 67.94
  },
  {
    "x": 10.08,
    "y": 54.53
  },
  {
    "x": 9.04,
    "y": 57.99
  },
  {
    "x": 17.86,
    "y": 70.51
  },
  {
    "x": 7.15,
    "y": 63.82
  }
];
  teamB = [
  {
    "x": 21.46,
    "y": 74.12
  },
  {
    "x": 26.1,
    "y": 87.51
  },
  {
    "x": 30.41,
    "y": 83.95
  },
  {
    "x": 20.03,
    "y": 71.47
  },
  {
    "x": 29.55,
    "y": 78.25
  },
  {
    "x": 27.24,
    "y": 88.98
  },
  {
    "x": 20.8,
    "y": 79.43
  },
  {
    "x": 31.69,
    "y": 71.17
  },
  {
    "x": 23.61,
    "y": 82.84
  },
  {
    "x": 23.48,
    "y": 88.1
  },
  {
    "x": 31.74,
    "y": 75.07
  },
  {
    "x": 20.87,
    "y": 73.17
  },
  {
    "x": 27.1,
    "y": 86.69
  },
  {
    "x": 29.67,
    "y": 85.11
  },
  {
    "x": 20.02,
    "y": 71.99
  },
  {
    "x": 30.31,
    "y": 76.96
  }
];
  labels = {
  "en": {
    "teamA": "Team A",
    "teamB": "Team B",
    "hours": "Hours",
    "score": "Score"
  },
  "zh": {
    "teamA": "A 组",
    "teamB": "B 组",
    "hours": "小时",
    "score": "得分"
  },
  "ja": {
    "teamA": "チームA",
    "teamB": "チームB",
    "hours": "時間",
    "score": "スコア"
  },
  "fr": {
    "teamA": "Équipe A",
    "teamB": "Équipe B",
    "hours": "Heures",
    "score": "Score"
  }
};
}

```

## Example: Clicked point

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnScatterChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnScatterChart],
  template: `
@let t = labels[language()];
<mn-scatter-chart
  [series]="[{ name: t.cities, pointSize: 12, data: [
    { x: 20.5, y: 31, label: t.names[0] },
    { x: 10.9, y: 17, label: t.names[1] },
    { x: 6.8, y: 15, label: t.names[2] },
    { x: 4.9, y: 15, label: t.names[3] },
    { x: 4.8, y: 21, label: t.names[4] },
    { x: 5.2, y: 16, label: t.names[5] }
  ] }]"
  [xAxis]="{ title: t.density }"
  [yAxis]="{ title: t.rent }"
  [height]="280"
  (pointClick)="selected = $event.items[0]?.label + ': ' + $event.items[0]?.x + ' · ' + $event.items[0]?.y + ' €/m²'"
/>
<output aria-live="polite">{{ selected || t.hint }}</output>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  selected = "";
  labels = {
  "en": {
    "cities": "Cities",
    "density": "Density (k/km²)",
    "rent": "Rent (€/m²)",
    "hint": "Click a city",
    "names": ["Paris", "Lyon", "Lille", "Nantes", "Nice", "Bordeaux"]
  },
  "zh": {
    "cities": "城市",
    "density": "人口密度（千人/km²）",
    "rent": "租金（欧元/m²）",
    "hint": "点击一个城市",
    "names": ["巴黎", "里昂", "里尔", "南特", "尼斯", "波尔多"]
  },
  "ja": {
    "cities": "都市",
    "density": "人口密度（千人/km²）",
    "rent": "家賃（€/m²）",
    "hint": "都市をクリックします",
    "names": ["パリ", "リヨン", "リール", "ナント", "ニース", "ボルドー"]
  },
  "fr": {
    "cities": "Villes",
    "density": "Densité (k/km²)",
    "rent": "Loyer (€/m²)",
    "hint": "Cliquez sur une ville",
    "names": ["Paris", "Lyon", "Lille", "Nantes", "Nice", "Bordeaux"]
  }
};
}

```
