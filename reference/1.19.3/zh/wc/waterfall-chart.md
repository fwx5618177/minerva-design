# 瀑布图

展示一系列增减如何把数值从起点带到终点，并带有小计和合计：利润桥、现金流、差异分析。细虚线连接每根柱子与下一根柱子。

Package: minerva-design@1.19.3

Renderer: wc

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

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/waterfall-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "valueName",
    "typeText": "string | undefined",
    "attribute": "value-name",
    "required": false
  },
  {
    "name": "upColor",
    "typeText": "string | undefined",
    "attribute": "up-color",
    "required": false
  },
  {
    "name": "downColor",
    "typeText": "string | undefined",
    "attribute": "down-color",
    "required": false
  },
  {
    "name": "totalColor",
    "typeText": "string | undefined",
    "attribute": "total-color",
    "required": false
  },
  {
    "name": "start",
    "typeText": "number",
    "attribute": "start",
    "required": false
  },
  {
    "name": "hideLabels",
    "typeText": "boolean",
    "attribute": "hide-labels",
    "required": false
  },
  {
    "name": "hideConnectors",
    "typeText": "boolean",
    "attribute": "hide-connectors",
    "required": false
  },
  {
    "name": "orientation",
    "typeText": "\"vertical\" | \"horizontal\"",
    "attribute": "orientation",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "steps",
    "typeText": "readonly WaterfallStep[] | undefined",
    "required": false
  },
  {
    "name": "format",
    "typeText": "(value: number) => string | undefined",
    "required": false
  },
  {
    "name": "connector",
    "typeText": "ChartConnectorOptions | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "ChartBaseOptions | undefined",
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
    "description": "The hovered (or keyboard-focused) points changed; detail: { x, xLabel, items }, `null` when nothing is hovered"
  },
  {
    "name": "minerva-point-click",
    "typeText": "CustomEvent",
    "description": "A point or a bar was clicked; detail: { x, xLabel, items }"
  },
  {
    "name": "minerva-plot-click",
    "typeText": "CustomEvent",
    "description": "The plot area was clicked where there is no point; detail: { x, y }"
  },
  {
    "name": "minerva-zoom",
    "typeText": "CustomEvent",
    "description": "The user zoomed or panned; detail: { x, y } (the visible ranges)"
  },
  {
    "name": "minerva-renderer-change",
    "typeText": "CustomEvent",
    "description": "The backend is ready (or fell back after a GPU loss); detail: { renderer }"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 从期初余额出发的现金流

按行显示每月的流入与流出，从期初余额到期末合计；数值显示在提示框中。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/waterfall-chart/wc/cash-flow.html

```html
<minerva-waterfall-chart
  id="cash"
  hide-labels
  orientation="horizontal"
  height="360"
></minerva-waterfall-chart>

```

### apps/docs/src/docs/pages/waterfall-chart/wc/cash-flow.ts

```tsx
// Monthly cash flows from an opening balance: rows instead of
// columns (`orientation="horizontal"`), values in the tooltip only (`hide-labels`).
import type { MinervaWaterfallChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { opening: "Opening", closing: "Closing" },
  zh: { opening: "期初", closing: "期末" },
  ja: { opening: "期首", closing: "期末" },
  fr: { opening: "Ouverture", closing: "Clôture" },
};
const MONTHS = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  zh: ["1月", "2月", "3月", "4月", "5月", "6月"],
  ja: ["1月", "2月", "3月", "4月", "5月", "6月"],
  fr: ["janv.", "févr.", "mars", "avr.", "mai", "juin"],
};

const FLOWS = [18, -12, 25, -30, 14, 9];

export function setup(root: HTMLElement) {
  const lang = document.documentElement.lang as keyof typeof TEXT;
  const text = TEXT[lang] ?? TEXT.en;
  const months = MONTHS[lang] ?? MONTHS.en;
  const chart = root.querySelector<MinervaWaterfallChart>("#cash")!;
  chart.steps = [
    { label: text.opening, value: 120 },
    ...FLOWS.map((value, i) => ({ label: months[i], value })),
    { label: text.closing, kind: "total" },
  ];
}

```

## Example: 损益桥图

各项变化从累计值处浮动；毛利润为小计，净利润为合计。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/waterfall-chart/wc/pnl.html

```html
<minerva-waterfall-chart id="pnl" height="320"></minerva-waterfall-chart>

```

### apps/docs/src/docs/pages/waterfall-chart/wc/pnl.ts

```tsx
// A profit and loss bridge: changes float from the running total,
// `subtotal` / `total` steps start from zero; the values are written on the bars.
import type { MinervaWaterfallChart } from "minerva-design/web-components/chart";

const STEPS = {
  en: [
    "Revenue",
    "Cost of sales",
    "Gross profit",
    "Operating costs",
    "Other income",
    "Taxes",
    "Net income",
  ],
  zh: [
    "营业收入",
    "销售成本",
    "毛利润",
    "运营费用",
    "其他收入",
    "税费",
    "净利润",
  ],
  ja: [
    "売上高",
    "売上原価",
    "売上総利益",
    "営業費用",
    "その他収益",
    "税金",
    "純利益",
  ],
  fr: [
    "Chiffre d’affaires",
    "Coût des ventes",
    "Marge brute",
    "Charges d’exploitation",
    "Autres produits",
    "Impôts",
    "Résultat net",
  ],
};

export function setup(root: HTMLElement) {
  const steps =
    STEPS[document.documentElement.lang as keyof typeof STEPS] ?? STEPS.en;
  const chart = root.querySelector<MinervaWaterfallChart>("#pnl")!;
  chart.steps = [
    { label: steps[0], value: 420 },
    { label: steps[1], value: -180 },
    { label: steps[2], kind: "subtotal" },
    { label: steps[3], value: -130 },
    { label: steps[4], value: 25 },
    { label: steps[5], value: -34 },
    { label: steps[6], kind: "total" },
  ];
  chart.format = (value) => `${value} k€`;
}

```
