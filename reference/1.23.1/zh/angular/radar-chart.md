# 雷达图

在多个量纲不同的指标上比较一个或少数几个对象（技能评估、产品评测、风味特征）。悬停多边形可高亮它及最近的指标；方向键在系列和指标之间移动，Esc 清除；点击图例项可隐藏系列。

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

问题解决

编码

系统设计

沟通

协作

责任心

候选人

{{value}} / {{max}}

候选人的面试评分卡

香气

酸度

甜度

醇厚度

苦味

余韵

埃塞俄比亚耶加雪菲

苏门答腊曼特宁

两款咖啡的风味轮廓

性能

续航

相机

屏幕

性价比

做工

三款手机的评测得分

悬停在多边形上或使用方向键比较各款手机

速度

射门

传球

盘带

防守

身体

两名足球运动员的能力值

安全

集成

报表

移动端

自动化

支持

价格

我们的产品

主要竞品

市场平均

要比较的产品

我们的产品、竞品与市场平均的能力评分

蛋白质

膳食纤维

糖

脂肪

钠

钙

水果燕麦粥

鸡蛋吐司

酸奶配格兰诺拉麦片

{{value}} NRV

{{meal}}：{{amount}}（{{share}}）

三种早餐的营养成分，以每日参考值的百分比表示

CPU

内存

磁盘 I/O

网络

延迟

错误

过去一小时平均

当前

实时更新

告警：{{metric}} 超过容量的 {{threshold}}。

负载最高的指标：{{metric}}。

服务当前负载与过去一小时平均值的对比

沟通

交付

专业能力

协作

指导

主动性

团队平均

人员

{{name}} 的 360 度评估评分与团队平均值的对比

最强项：{{strength}}（比团队 {{strengthGap}}）。待提升：{{growth}}（{{growthGap}}）。

收入

成交数

赢单率

平均订单金额

通话数

NPS

目标

实际

{{kpi}}：{{actual}}，目标 {{target}}（达成 {{attainment}}）。

一名销售代表的季度 KPI 与目标对比

点击某条轴附近查看对应 KPI。

## RadarChart

Support: beta

Native Angular: MnRadarChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnRadarChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "indicators",
    "typeText": "readonly RadarIndicator[]",
    "required": true,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "series",
    "typeText": "readonly RadarSeries[]",
    "required": true,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "shape",
    "typeText": "\"circle\" | \"polygon\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "levels",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "dots",
    "typeText": "boolean | undefined",
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

## Example: 产品对比

三个系列时自动显示图例；onHover 返回当前系列及离指针最近的指标。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnRadarChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnRadarChart],
  template: `
@let t = labels[language()];
<mn-radar-chart
  [indicators]="[
    { name: t.axes[0], max: 100 },
    { name: t.axes[1], max: 100 },
    { name: t.axes[2], max: 100 },
    { name: t.axes[3], max: 100 },
    { name: t.axes[4], max: 100 }
  ]"
  [series]="[
    { name: t.current, values: [72, 85, 64, 90, 58] },
    { name: t.next, values: [88, 80, 78, 92, 81] }
  ]"
  [height]="320"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": {
    "current": "Current model",
    "next": "Next model",
    "axes": ["Speed", "Reliability", "Comfort", "Safety", "Efficiency"]
  },
  "zh": {
    "current": "当前型号",
    "next": "新型号",
    "axes": ["速度", "可靠性", "舒适性", "安全性", "能效"]
  },
  "ja": {
    "current": "現行モデル",
    "next": "次期モデル",
    "axes": ["速度", "信頼性", "快適性", "安全性", "効率"]
  },
  "fr": {
    "current": "Modèle actuel",
    "next": "Nouveau modèle",
    "axes": ["Vitesse", "Fiabilité", "Confort", "Sécurité", "Efficacité"]
  }
};
}

```

## Example: 圆形网格

shape="circle" 绘制圆形网格，levels 设置环数，dots={false} 隐藏顶点；opacity 加深填充。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnRadarChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnRadarChart],
  template: `
@let t = labels[language()];
<mn-radar-chart
  [indicators]="[
    { name: t.skills[0], max: 10 },
    { name: t.skills[1], max: 10 },
    { name: t.skills[2], max: 10 },
    { name: t.skills[3], max: 10 },
    { name: t.skills[4], max: 10 },
    { name: t.skills[5], max: 10 }
  ]"
  [series]="[{ name: t.profile, values: [9, 6, 7, 8, 5, 6] }]"
  shape="circle"
  [levels]="5"
  [height]="320"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": {
    "profile": "Profile",
    "skills": ["Frontend", "Backend", "Design", "Testing", "DevOps", "Data"]
  },
  "zh": {
    "profile": "能力画像",
    "skills": ["前端", "后端", "设计", "测试", "运维", "数据"]
  },
  "ja": {
    "profile": "プロフィール",
    "skills": ["フロントエンド", "バックエンド", "デザイン", "テスト", "DevOps", "データ"]
  },
  "fr": {
    "profile": "Profil",
    "skills": ["Front-end", "Back-end", "Design", "Tests", "DevOps", "Données"]
  }
};
}

```
