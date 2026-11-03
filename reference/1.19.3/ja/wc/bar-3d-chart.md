# 3D 棒グラフ

x × y のカテゴリ格子上の棒：ライティングされた箱、系列ごとの色、系列をまたぐ積み上げ、高さや別の値によるカラースケールの色、凡例とカラーバー。

Package: minerva-design@1.19.3

Renderer: wc

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:ed8b6b1bf30e9055934099f84afd6b8369eee155b0404de5e8db004c3d91bce6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

売上

地域

月

北部

南部

東部

西部

中部

5 地域の月別売上

四半期

第1四半期

第2四半期

第3四半期

第4四半期

市場

米州

欧州

アジア

オセアニア

ハードウェア

ソフトウェア

サービス

売上高

4 市場における 3 製品ラインの四半期売上高（積み上げ）

女性

男性

年齢

{{from}}〜{{to}} 歳

{{from}} 歳以上

調査年

人口

{{value}} 百万人

4 回の国勢調査における年齢層・性別ごとの人口

訪問数

時刻

曜日

曜日・時間帯別のウェブサイト訪問数

製品

ノート PC

スマートフォン

タブレット

腕時計

オーディオ

利益率

4 市場における 5 製品の売上高と利益率

在庫あり

在庫僅少

{{value}} 個

ライブ更新

通路

通路 {{id}}

棚段

{{n}} 段目

数量

通路と棚段ごとの倉庫ロケーションの残り数量（ライブ更新）

在庫 {{total}} 個 · 僅少ロケーション: {{low}} / {{bins}} · 補充済み: {{restocked}}。

継続率

登録からの月数

{{n}} か月目

登録月

登録からの月数ごとの月次登録コホートの継続率

{{cohort}}コホートの {{n}} か月目: {{retention}} が継続中（{{total}} 人中 {{users}} 人）。

棒をクリックするとコホートの継続率を表示します。

開発

営業

マーケティング

オペレーション

サポート

経理

実績支出

会計年度

予算差異

部門

{{year}} 年度の 6 部門の四半期支出と予算差異

{{department}}・{{quarter}}: 予算 {{budget}} に対し支出 {{actual}}（{{variance}}）。

{{year}} 年度: 予算 {{budget}} に対し支出 {{actual}}（{{variance}}）。最大の超過: {{department}}・{{quarter}}（{{worst}}）。

{{value}} kW

吸気温度

ダークテーマ

3D 表示

平面図

ラック

列

{{id}} 列

消費電力

列と位置ごとのサーバーラック（高さは消費電力、色は吸気温度）

ラック {{rack}}: {{power}}、吸気 {{inlet}}、上限 {{limit}} を超えています。

ラック {{rack}}: {{power}}、吸気 {{inlet}}、上限 {{limit}} 以内です。

吸気温度が {{limit}} を超えるラック: {{total}} 台中 {{hot}} 台（{{racks}}）。ラックをクリックすると測定値を表示します。

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

## Example: 地域・四半期別の売上

地域 × 四半期のセルごとに 1 本のバーを高さで色分けし、軸にカテゴリ名を表示します。

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

## Example: 積み上げた販売チャネル

同じセルの 2 系列（店舗とオンライン）が積み上がります。細いバーで、凡例で切り替えられます。

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
