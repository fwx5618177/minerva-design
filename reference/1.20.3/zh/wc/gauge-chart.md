# 仪表盘

在弧线上展示单个数值及其所处的量程，可配合彩色阈值区间：KPI、资源使用率、评分等。value 变化时，弧线（和指针）会从当前位置平滑过渡。

Package: minerva-design@1.20.3

Renderer: wc

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.3",
  "sourceCommit": "af37b20099ab0383ddc1d9484d3d7847a8310d40",
  "sourceDigest": "sha256:38cfefdcb173c9a307526b9364c7a77acc74f713924006e65d94c6f3c5e94c61",
  "referenceSourceDigest": "sha256:1d36ef2823b3b425f00cf746f922b005435d17c9e4f13b0b40f620b32191d7a8"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.3/types.json) or getType() from minerva-design/contracts.

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

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/gauge-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "value",
    "typeText": "number",
    "attribute": "value",
    "required": false
  },
  {
    "name": "min",
    "typeText": "number",
    "attribute": "min",
    "required": false
  },
  {
    "name": "max",
    "typeText": "number",
    "attribute": "max",
    "required": false
  },
  {
    "name": "label",
    "typeText": "string | undefined",
    "attribute": "label",
    "required": false
  },
  {
    "name": "needle",
    "typeText": "boolean",
    "attribute": "needle",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "bands",
    "typeText": "readonly GaugeBand[] | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "Partial<Omit<GaugeChartOptions, \"type\">> | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-hover",
    "typeText": "CustomEvent",
    "description": "The hovered (or keyboard-focused) mark changed; detail: { index, name, value, share }, `null` when nothing is hovered"
  },
  {
    "name": "minerva-click",
    "typeText": "CustomEvent",
    "description": "A mark was clicked, tapped or activated with Enter; detail: { index, name, value, share }"
  },
  {
    "name": "minerva-toggle",
    "typeText": "CustomEvent",
    "description": "A legend item was clicked (or `toggle()` called); detail: { index, hidden, hiddenIndexes }"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 彩色区间

三个区间划分轨道；数值弧使用其终点所在区间的颜色。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/gauge-chart/wc/bands.html

```html
<minerva-gauge-chart id="cpu" value="72"></minerva-gauge-chart>

```

### apps/docs/src/docs/pages/gauge-chart/wc/bands.ts

```tsx
// Colored bands split the track; the value arc takes the color of its band.
import type { MinervaGaugeChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: "CPU load",
  zh: "CPU 负载",
  ja: "CPU 負荷",
  fr: "Charge CPU",
};

export function setup(root: HTMLElement) {
  const gauge = root.querySelector<MinervaGaugeChart>("#cpu")!;
  gauge.label =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  gauge.bands = [
    { to: 60, color: "var(--success-color, #16a34a)" },
    { to: 85, color: "var(--warning-color, #f59e0b)" },
    { to: 100, color: "var(--danger-color, #dc2626)" },
  ];
  gauge.options = { format: (value) => `${value}%` };
}

```

## Example: 指针与自定义刻度

0–200 刻度上的指针，扫描角更大，弧更细。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/gauge-chart/wc/needle.html

```html
<minerva-gauge-chart
  id="speed"
  value="128"
  max="200"
  needle
  height="260"
></minerva-gauge-chart>

```

### apps/docs/src/docs/pages/gauge-chart/wc/needle.ts

```tsx
// `needle` adds a pointer to the arc; `min` / `max` set the scale and the
// options a wider sweep and thinner arc.
import type { MinervaGaugeChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: "Speed (km/h)",
  zh: "速度（公里/小时）",
  ja: "速度（km/h）",
  fr: "Vitesse (km/h)",
};

export function setup(root: HTMLElement) {
  const gauge = root.querySelector<MinervaGaugeChart>("#speed")!;
  gauge.label =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  gauge.options = { sweep: 270, thickness: 0.1 };
}

```
