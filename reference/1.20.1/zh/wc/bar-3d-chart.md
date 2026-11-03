# 3D 柱状图

x × y 类别网格上的柱体：带光照的立方体、按系列着色、跨系列堆叠、按高度或其他值通过色阶着色，并支持图例和色条。

Package: minerva-design@1.20.1

Renderer: wc

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.1",
  "sourceCommit": "3a9f5cdaae706f14fe6d8c65c5481eba719a66c4",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:6c9ecba0079f25e53cd971e51f2be8604fc3d941c0ed1cfeec03c4a91913ad73"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.1/types.json) or getType() from minerva-design/contracts.

## Documentation

销售额

地区

月份

北部

南部

东部

西部

中部

五个地区的月度销售额

季度

第一季度

第二季度

第三季度

第四季度

市场

美洲

欧洲

亚洲

大洋洲

硬件

软件

服务

收入

三条产品线在四个市场的季度收入（堆叠）

女性

男性

年龄

{{from}}–{{to}} 岁

{{from}} 岁以上

普查年份

人口

{{value}} 百万

四个普查年份按年龄组和性别划分的人口

访问量

小时

星期

网站每周各小时的访问量

产品

笔记本电脑

手机

平板电脑

手表

音频设备

利润率

五种产品在四个市场的收入与利润率

库存充足

库存不足

{{value}} 件

实时更新

通道

{{id}} 通道

货架层

第 {{n}} 层

件数

按通道和货架层统计的仓库货位剩余件数，实时更新

库存 {{total}} 件 · 不足货位：{{low}} / {{bins}} · 已补货货位：{{restocked}}。

留存率

注册后月数

第 {{n}} 月

注册月份

按注册后月数统计的各月注册同期群留存率

{{cohort}}同期群，第 {{n}} 个月：{{retention}} 仍活跃（{{total}} 位用户中的 {{users}} 位）。

点击柱子查看同期群的留存率。

研发

销售

市场

运营

客服

财务

实际支出

财年

预算差异

部门

{{year}} 年六个部门的季度支出及预算差异

{{department}}，{{quarter}}：支出 {{actual}}，预算 {{budget}}（{{variance}}）。

{{year}} 年：支出 {{actual}}，预算 {{budget}}（{{variance}}）。超支最多：{{department}}，{{quarter}}（{{worst}}）。

{{value}} kW

进风温度

深色主题

3D 视图

平面图

机柜

排

{{id}} 排

功耗

按排和位置排列的服务器机柜，柱高为功耗，颜色为进风温度

机柜 {{rack}}：{{power}}，进风 {{inlet}}，超过 {{limit}} 上限。

机柜 {{rack}}：{{power}}，进风 {{inlet}}，未超过 {{limit}} 上限。

进风温度超过 {{limit}} 的机柜：{{total}} 个中有 {{hot}} 个（{{racks}}）。点击机柜查看读数。

## Bar3DChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/bar-3d-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "barWidth",
    "typeText": "number",
    "attribute": "bar-width",
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
    "typeText": "readonly S[] | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "Chart3DBaseOptions | undefined",
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
    "description": "The hovered point, cell or bar changed; detail: { seriesIndex, seriesName, type, index, x, y, z, value, color, label }, `null` when nothing is hovered"
  },
  {
    "name": "minerva-point-click",
    "typeText": "CustomEvent",
    "description": "A point, cell or bar was clicked; detail: { seriesIndex, seriesName, type, index, x, y, z, value, color, label }"
  },
  {
    "name": "minerva-camera-change",
    "typeText": "CustomEvent",
    "description": "The user rotated, zoomed, panned or reset the camera; detail: { azimuth, elevation, zoom, pan, projection }"
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

## Example: 按地区和季度的销售额

每个地区 × 季度单元格一根柱子，按高度着色；坐标轴显示类别名称。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/bar-3d-chart/wc/sales.html

```html
<minerva-bar-3d-chart id="sales" height="420"></minerva-bar-3d-chart>

```

### apps/docs/src/docs/pages/bar-3d-chart/wc/sales.ts

```tsx
// <minerva-bar-3d-chart>: a bar per region × quarter cell, colored by
// height (`colorBy: "z"`); the axes name the categories.
import type { MinervaBar3DChart } from "minerva-design/web-components/chart-3d";

const TEXT = {
  en: {
    sales: "Sales (k€)",
    regions: ["North", "South", "East", "West"],
    quarters: ["Q1", "Q2", "Q3", "Q4"],
  },
  zh: {
    sales: "销售额（千欧元）",
    regions: ["华北", "华南", "华东", "华西"],
    quarters: ["第一季度", "第二季度", "第三季度", "第四季度"],
  },
  ja: {
    sales: "売上（千ユーロ）",
    regions: ["北部", "南部", "東部", "西部"],
    quarters: ["第 1 四半期", "第 2 四半期", "第 3 四半期", "第 4 四半期"],
  },
  fr: {
    sales: "Ventes (k€)",
    regions: ["Nord", "Sud", "Est", "Ouest"],
    quarters: ["T1", "T2", "T3", "T4"],
  },
};

// sales per region (rows) and quarter (columns), k€
const SALES = [
  [120, 135, 150, 180],
  [90, 110, 105, 130],
  [160, 170, 190, 220],
  [70, 85, 95, 100],
];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaBar3DChart>("#sales")!;
  chart.series = [
    {
      name: text.sales,
      colorBy: "z",
      data: SALES.flatMap((row, i) =>
        row.map((z, j) => ({ x: text.regions[i], y: text.quarters[j], z })),
      ),
    },
  ];
  chart.options = {
    xAxis: { categories: text.regions },
    yAxis: { categories: text.quarters },
    zAxis: { title: text.sales },
  };
}

```

## Example: 堆叠的销售渠道

同一单元格上的两个系列会堆叠（门店与线上）；柱子更细，可通过图例切换。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/bar-3d-chart/wc/stacked.html

```html
<minerva-bar-3d-chart
  id="channels"
  bar-width="0.55"
  height="420"
></minerva-bar-3d-chart>

```

### apps/docs/src/docs/pages/bar-3d-chart/wc/stacked.ts

```tsx
// Two series on the same cells are stacked: sales in stores and online per
// product and year; `bar-width` thins the bars, the legend toggles a channel.
import type { MinervaBar3DChart } from "minerva-design/web-components/chart-3d";

const TEXT = {
  en: {
    channels: ["Stores", "Online"],
    years: ["2023", "2024", "2025"],
    products: ["Shoes", "Bags", "Watches"],
  },
  zh: {
    channels: ["门店", "线上"],
    years: ["2023", "2024", "2025"],
    products: ["鞋子", "包袋", "手表"],
  },
  ja: {
    channels: ["店舗", "オンライン"],
    years: ["2023", "2024", "2025"],
    products: ["靴", "バッグ", "時計"],
  },
  fr: {
    channels: ["Magasins", "En ligne"],
    years: ["2023", "2024", "2025"],
    products: ["Chaussures", "Sacs", "Montres"],
  },
};

// per channel: products (rows) × years (columns), k units
const CHANNELS = [
  [
    [40, 38, 35],
    [22, 24, 20],
    [15, 14, 12],
  ],
  [
    [18, 27, 36],
    [9, 14, 21],
    [6, 9, 13],
  ],
];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaBar3DChart>("#channels")!;
  chart.series = text.channels.map((name, c) => ({
    name,
    data: CHANNELS[c].flatMap((row, i) =>
      row.map((z, j) => ({ x: i, y: j, z })),
    ),
  }));
  chart.options = {
    xAxis: { categories: text.products },
    yAxis: { categories: text.years },
  };
}

```
