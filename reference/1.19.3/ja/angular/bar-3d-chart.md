# 3D 棒グラフ

x × y のカテゴリ格子上の棒：ライティングされた箱、系列ごとの色、系列をまたぐ積み上げ、高さや別の値によるカラースケールの色、凡例とカラーバー。

Package: minerva-design@1.19.3

Renderer: angular

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

Support: beta

Native Angular: MnBar3DChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnBar3DChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "barWidth",
    "typeText": "number",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "series",
    "typeText": "readonly S[]",
    "required": true,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "xAxis",
    "typeText": "Chart3DAxisOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "yAxis",
    "typeText": "Chart3DAxisOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "zAxis",
    "typeText": "Chart3DAxisOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "camera",
    "typeText": "Chart3DCameraOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "autoRotate",
    "typeText": "number | boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "colorScale",
    "typeText": "Chart3DColorScale | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "colorBar",
    "typeText": "boolean | Chart3DColorBarOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "legend",
    "typeText": "boolean | Chart3DLegendOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "tooltip",
    "typeText": "boolean | Chart3DTooltipOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "options",
    "typeText": "Partial<Omit<Chart3DOptions, \"series\">> | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "typeText": "Chart3DHoverEvent | null",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "Chart3DHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "pointClick",
    "typeText": "Chart3DHoverEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "Chart3DHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "cameraChange",
    "typeText": "Chart3DCameraState",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "Chart3DCameraState",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "rendererChange",
    "typeText": "ChartRendererKind",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts",
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

## Example: 地域別・月別の売上

5 地域の月別売上：カテゴリ名はロケールから、月名は Intl.DateTimeFormat から取得し、金額はコンパクトな通貨表記。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnBar3DChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnBar3DChart],
  template: `
@let t = labels[language()];
<mn-bar-3d-chart
  [series]="[{ name: t.sales, colorBy: 'z', data: [
    { x: 0, y: 0, z: 120 }, { x: 0, y: 1, z: 135 }, { x: 0, y: 2, z: 150 }, { x: 0, y: 3, z: 180 },
    { x: 1, y: 0, z: 90 }, { x: 1, y: 1, z: 110 }, { x: 1, y: 2, z: 105 }, { x: 1, y: 3, z: 130 },
    { x: 2, y: 0, z: 160 }, { x: 2, y: 1, z: 170 }, { x: 2, y: 2, z: 190 }, { x: 2, y: 3, z: 220 },
    { x: 3, y: 0, z: 70 }, { x: 3, y: 1, z: 85 }, { x: 3, y: 2, z: 95 }, { x: 3, y: 3, z: 100 }
  ] }]"
  [xAxis]="{ categories: t.regions }"
  [yAxis]="{ categories: t.quarters }"
  [zAxis]="{ title: t.sales }"
  [height]="420"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": {
    "sales": "Sales (k€)",
    "regions": ["North", "South", "East", "West"],
    "quarters": ["Q1", "Q2", "Q3", "Q4"]
  },
  "zh": {
    "sales": "销售额（千欧元）",
    "regions": ["华北", "华南", "华东", "华西"],
    "quarters": ["第一季度", "第二季度", "第三季度", "第四季度"]
  },
  "ja": {
    "sales": "売上（千ユーロ）",
    "regions": ["北部", "南部", "東部", "西部"],
    "quarters": ["第 1 四半期", "第 2 四半期", "第 3 四半期", "第 4 四半期"]
  },
  "fr": {
    "sales": "Ventes (k€)",
    "regions": ["Nord", "Sud", "Est", "Ouest"],
    "quarters": ["T1", "T2", "T3", "T4"]
  }
};
}

```

## Example: 積み上げと凡例

3 つの製品ラインを四半期 × 市場の各セルで積み上げ。下部の凡例で系列を切り替えると積み上げが変わります。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnBar3DChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnBar3DChart],
  template: `
@let t = labels[language()];
<mn-bar-3d-chart
  [series]="[
    { name: t.channels[0], data: [
      { x: 0, y: 0, z: 40 }, { x: 0, y: 1, z: 38 }, { x: 0, y: 2, z: 35 },
      { x: 1, y: 0, z: 22 }, { x: 1, y: 1, z: 24 }, { x: 1, y: 2, z: 20 },
      { x: 2, y: 0, z: 15 }, { x: 2, y: 1, z: 14 }, { x: 2, y: 2, z: 12 }
    ] },
    { name: t.channels[1], data: [
      { x: 0, y: 0, z: 18 }, { x: 0, y: 1, z: 27 }, { x: 0, y: 2, z: 36 },
      { x: 1, y: 0, z: 9 }, { x: 1, y: 1, z: 14 }, { x: 1, y: 2, z: 21 },
      { x: 2, y: 0, z: 6 }, { x: 2, y: 1, z: 9 }, { x: 2, y: 2, z: 13 }
    ] }
  ]"
  [barWidth]="0.55"
  [xAxis]="{ categories: t.products }"
  [yAxis]="{ categories: t.years }"
  [height]="420"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": {
    "channels": ["Stores", "Online"],
    "years": ["2023", "2024", "2025"],
    "products": ["Shoes", "Bags", "Watches"]
  },
  "zh": {
    "channels": ["门店", "线上"],
    "years": ["2023", "2024", "2025"],
    "products": ["鞋子", "包袋", "手表"]
  },
  "ja": {
    "channels": ["店舗", "オンライン"],
    "years": ["2023", "2024", "2025"],
    "products": ["靴", "バッグ", "時計"]
  },
  "fr": {
    "channels": ["Magasins", "En ligne"],
    "years": ["2023", "2024", "2025"],
    "products": ["Chaussures", "Sacs", "Montres"]
  }
};
}

```
