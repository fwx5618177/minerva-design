# 面积图

用填充面积展示随时间变化的量：默认平滑，可相互重叠、堆叠成总量，或显示为 100% 占比。悬停可查看同一 x 处的所有系列；按住 Ctrl / ⌘ 滚动滚轮或双指捏合即可缩放。

Package: minerva-design@1.23.2

Renderer: wc

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.2",
  "sourceCommit": "c6618fd81b2d3c2a9016cfe13a1d15983d533ff7",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:8f6e89c1e214fedc2e52de014615037c54204a8ec5c0dbb40c58dc530906571e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.2/types.json) or getType() from minerva-design/contracts.

## Documentation

日活跃用户

2026 年 4 月至 6 月的日活跃用户

其他

2016 至 2026 年各厂商的市场份额

自然搜索

直接访问

外链引荐

社交媒体

按流量来源堆叠的每月访问量

运行中的实例

配额

一天内自动扩缩容启动的实例数

核能

水电

风电

光伏

燃气

{{value}} 吉瓦

功率

一天内按能源类型堆叠的发电量

实际

计划

本年度累计销售额与计划对比

下载

上传

两小时内的服务器带宽，下载在零线以上，上传在零线以下

太阳能发电量

{{value}} kWh

2026 年屋顶太阳能装置的每日发电量

重置缩放

{{from}} – {{to}}：合计 {{total}}，日均 {{average}}

按住 Ctrl / ⌘ 滚动滚轮或双指缩放来放大某个季节，拖动可平移。

工程

销售

客户支持

运营

财务与人力

2025 至 2026 年各部门每月人数

所选月份的人数

{{value}} 名员工

去年

今年

黑色星期五

网络星期一

最后发货日

11 月和 12 月的每日订单，今年与去年对比

本季共 {{total}} 笔订单，同比 {{change}}。

已用

趋势

{{value}} GB

容量 {{value}}

卷

数据库

日志

用户上传

约 {{days}} 后写满（{{date}} 前后）

未来 {{days}}内不会写满

60 天的磁盘用量及其到容量上限的趋势

## AreaChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/area-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "curve",
    "typeText": "\"linear\" | \"smooth\" | \"step\"",
    "attribute": "curve",
    "required": false
  },
  {
    "name": "stacked",
    "typeText": "boolean",
    "attribute": "stacked",
    "required": false
  },
  {
    "name": "percent",
    "typeText": "boolean",
    "attribute": "percent",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "series",
    "typeText": "readonly ChartSeries[] | undefined",
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

## Example: 百分比堆叠

percent 将每个堆叠缩放到 100%：一天中各能源的占比，使用直线边缘。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/area-chart/wc/percent.html

```html
<minerva-area-chart
  id="mix"
  percent
  curve="linear"
  height="280"
></minerva-area-chart>

```

### apps/docs/src/docs/pages/area-chart/wc/percent.ts

```tsx
// `percent` scales every stack to 100%: the share of each source over time.
import type { MinervaAreaChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    solar: "Solar",
    wind: "Wind",
    hydro: "Hydro",
    hours: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
  },
  zh: {
    solar: "太阳能",
    wind: "风能",
    hydro: "水电",
    hours: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
  },
  ja: {
    solar: "太陽光",
    wind: "風力",
    hydro: "水力",
    hours: ["0:00", "4:00", "8:00", "12:00", "16:00", "20:00"],
  },
  fr: {
    solar: "Solaire",
    wind: "Éolien",
    hydro: "Hydraulique",
    hours: ["0 h", "4 h", "8 h", "12 h", "16 h", "20 h"],
  },
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaAreaChart>("#mix")!;
  chart.series = [
    { name: text.solar, data: [0, 5, 40, 62, 35, 2] },
    { name: text.wind, data: [48, 52, 30, 22, 38, 55] },
    { name: text.hydro, data: [30, 30, 28, 26, 28, 30] },
  ];
  chart.options = { xAxis: { type: "category", categories: text.hours } };
}

```

## Example: 堆叠面积图

三个流量来源以平滑边缘（默认曲线）堆叠。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/area-chart/wc/stacked.html

```html
<minerva-area-chart id="traffic" stacked height="280"></minerva-area-chart>

```

### apps/docs/src/docs/pages/area-chart/wc/stacked.ts

```tsx
// `stacked` piles the areas up; the curve is smooth by default.
import type { MinervaAreaChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    organic: "Organic",
    paid: "Paid",
    referral: "Referral",
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  },
  zh: {
    organic: "自然流量",
    paid: "付费流量",
    referral: "推荐流量",
    months: ["1月", "2月", "3月", "4月", "5月", "6月"],
  },
  ja: {
    organic: "オーガニック",
    paid: "有料",
    referral: "参照元",
    months: ["1月", "2月", "3月", "4月", "5月", "6月"],
  },
  fr: {
    organic: "Naturel",
    paid: "Payant",
    referral: "Référents",
    months: ["janv.", "févr.", "mars", "avr.", "mai", "juin"],
  },
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaAreaChart>("#traffic")!;
  chart.series = [
    { name: text.organic, data: [320, 332, 301, 334, 390, 430] },
    { name: text.paid, data: [120, 132, 101, 134, 190, 230] },
    { name: text.referral, data: [60, 72, 71, 74, 90, 110] },
  ];
  chart.options = { xAxis: { type: "category", categories: text.months } };
}

```
