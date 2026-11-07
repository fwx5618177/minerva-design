# 仪表盘

在弧线上展示单个数值及其所处的量程，可配合彩色阈值区间：KPI、资源使用率、评分等。value 变化时，弧线（和指针）会从当前位置平滑过渡。

Package: minerva-design@1.22.2

Renderer: angular

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "93eaa8e002773e63a78341d4424f9e832b7305a9",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:10025b0c7fa1af3c2b0e9de9a1b6d51e6e81c9a41c96e7fcba66a58604dda51c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

## Documentation

CPU

内存

磁盘

{{metric}}使用率

净推荐值

请求数 / 秒

实时更新的每秒请求数

暂停更新

继续更新

车速

速度表：{{speed}}

刹车

加速

存储

API 调用

席位

构建分钟数

{{used}} / {{limit}}

{{quota}}：已使用配额的 {{share}}

30 天可用性

目标：{{value}}

30 天可用性与目标对比

剩余错误预算

停机 {{used}}，允许 {{budget}}

本月剩余的错误预算

温度单位

°C

°F

目标

室温：{{value}}

温控器目标温度

降低目标温度

提高目标温度

正在制热至 {{target}}（室温：{{room}}）

正在制冷至 {{target}}（室温：{{room}}）

保持 {{target}}（室温：{{room}}）

申请人

信用评分

差

一般

良好

很好

优秀

位于量程的 {{share}} 处

{{name}} 的信用评分

{{name}}：{{score}}。{{advice}}

大多数贷款机构会拒绝申请。

可能获批，但利率较高。

可按标准利率申请大多数贷款。

可获得优于平均水平的利率。

可获得最优惠的利率。

已充电

续航：{{range}}

汽车电池电量

已插电

重置

已充满

已拔出

快速充电中

超过 80%，慢速充电中

{{minutes}}后达到 80%

{{value}} 转/分

{{value}} 兆瓦

深色面板

转子转速

输出功率

机舱温度

风力发电机的{{reading}}：{{value}}

## GaugeChart

Support: beta

Native Angular: MnGaugeChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnGaugeChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "typeText": "number",
    "required": true,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "min",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "max",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "label",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "sweep",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "thickness",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "bands",
    "typeText": "readonly GaugeBand[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "color",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "needle",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "ticks",
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

## Example: 区间与指针

bands 按区间为轨道着色（红、黄、绿），数值弧取所在区间的颜色；needle 指向当前值，min 可以为负数。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnGaugeChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnGaugeChart],
  template: `
<mn-gauge-chart
  [value]="72"
  [label]="labels[language()]"
  [bands]="[
    { to: 60, color: 'var(--success-color, #16a34a)' },
    { to: 85, color: 'var(--warning-color, #f59e0b)' },
    { to: 100, color: 'var(--danger-color, #dc2626)' }
  ]"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": "CPU load",
  "zh": "CPU 负载",
  "ja": "CPU 負荷",
  "fr": "Charge CPU"
};
}

```

## Example: Needle and custom scale

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnGaugeChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnGaugeChart],
  template: `
<mn-gauge-chart
  [value]="128"
  [max]="200"
  [label]="labels[language()]"
  needle
  [sweep]="270"
  [thickness]="0.1"
  [height]="260"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": "Speed (km/h)",
  "zh": "速度（公里/小时）",
  "ja": "速度（km/h）",
  "fr": "Vitesse (km/h)"
};
}

```
